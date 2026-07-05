import os
import re

components_dir = r"c:\Users\user\Desktop\jamro-tools\components\tools\calculators\custom"

def fix_newlines(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # The problem is that the python script wrote literal newlines inside "..."
    # We can use regex to find double-quoted strings and replace literal newlines with \n
    # But it's easier to just re-parse the files and replace \n with \\n
    
    # Actually, the error was because I had:
    # parsed[current_tool]["faqs"][-1]["a"] += "\n" + line
    # Wait, in the second python script I wrote:
    # parsed[current_tool]["faqs"][-1]["a"] += "\\n" + line
    # Ah, in python "\\n" is a backslash and an n. When formatted into f'  {{ q: "{q}", a: "{a}" }}', it becomes literal backslash and n.
    # WAIT! f'{a}' with a="\\n" becomes \n in the string. But wait, `re.sub` uses the string as a replacement!
    # In `re.sub`, backslashes are processed! So `\n` in the replacement string becomes a literal newline!
    # YES! `re.sub` processes escapes! So `\\n` becomes `\n` (newline)!
    
    # We need to escape backslashes for re.sub.
    
    pass

def main():
    file_map = {
        "Mortgage Calculator": "mortgage-calculator.tsx",
        "Percentage Decrease Calculator": "percentage-decrease-calculator.tsx",
        "Age Difference Calculator": "age-difference-calculator.tsx",
        "Cylinder Volume Calculator": "cylinder-volume-calculator.tsx",
        "APUSH Score Calculator": "apush-score-calculator.tsx",
        "Middle School GPA Calculator": "middle-school-gpa-calculator.tsx",
        "Triple Integral Calculator": "triple-integral-calculator.tsx",
        "Word Counter": "word-counter-calculator.tsx",
        "Scientific Calculator": "scientific-calculator.tsx",
        "Basic Calculator": "basic-calculator.tsx"
    }
    
    for tool, filename in file_map.items():
        path = os.path.join(components_dir, filename)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                code = f.read()
            
            # Find the faqItems array and replace any literal newline inside quotes with \\n
            
            # Simple approach: since we know the structure:
            # q: "...",
            # a: "...",
            # We can just change all literal newlines inside the faqItems array to \n
            # Or better, let's just find `a: "..."` and replace newlines with \n
            
            in_faq = False
            new_code = []
            for line in code.split('\n'):
                if "const faqItems = [" in line:
                    in_faq = True
                if in_faq and "return (" in line:
                    in_faq = False
                    
                if in_faq:
                    # If line has no quotes but is inside faq, it might be a continuation of a string
                    pass
            
            # Let's use a simpler regex: replace all literal newlines that occur between `a: "` and `",`
            # Actually, let's just use backticks for the strings!
            def replacer(match):
                # Replace double quotes with backticks and escape any existing backticks
                content = match.group(1).replace('`', '\\`')
                return f'a: `{content}`'
                
            code = re.sub(r'a:\s*"([^"]*)"', replacer, code, flags=re.DOTALL)
            
            # Wait, `([^"]*)` won't match if there are escaped quotes inside the string. But we didn't have any except what we escaped.
            # But the python script did: a = a.replace('"', '\\"')
            # Let's just fix all literal newlines in the file that are between a: " and ",
            
            # A safer fix: re-run the `update_tools.py` but with `re.escape()` on the replacement string for `re.sub`!
            pass

if __name__ == "__main__":
    main()
