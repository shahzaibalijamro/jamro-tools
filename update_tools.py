import os
import re

txt_file = r"C:\Users\user\3D Objects\Website Content.txt"
components_dir = r"c:\Users\user\Desktop\jamro-tools\components\tools\calculators\custom"

def parse_txt():
    with open(txt_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if content.startswith('\ufeff'):
        content = content[1:]
        
    tools = [
        "Mortgage Calculator",
        "Percentage Decrease Calculator",
        "Age Difference Calculator",
        "Cylinder Volume Calculator",
        "APUSH Score Calculator",
        "Scientific Calculator",
        "Basic Calculator",
        "Middle School GPA Calculator",
        "Triple Integral Calculator",
        "Word Counter"
    ]
    
    parsed = {}
    current_tool = None
    lines = content.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        is_tool_header = False
        for t in tools:
            if line.lower() == t.lower():
                current_tool = t
                parsed[current_tool] = {"content": [], "faqs": [], "current_section": "content"}
                is_tool_header = True
                break
                
        if is_tool_header:
            continue
            
        if not current_tool:
            continue
            
        if line.lower() == "faqs" or line.lower() == "faq":
            parsed[current_tool]["current_section"] = "faq"
            continue
            
        if parsed[current_tool]["current_section"] == "content":
            parsed[current_tool]["content"].append(line)
        elif parsed[current_tool]["current_section"] == "faq":
            if re.match(r'^Q\d+:', line):
                q = line.split(":", 1)[1].strip()
                parsed[current_tool]["faqs"].append({"q": q, "a": ""})
            else:
                if parsed[current_tool]["faqs"]:
                    if parsed[current_tool]["faqs"][-1]["a"]:
                        parsed[current_tool]["faqs"][-1]["a"] += "\n" + line
                    else:
                        parsed[current_tool]["faqs"][-1]["a"] = line

    return parsed

def update_tsx(file_path, tool_data):
    with open(file_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # Replace faqs
    faq_str = "const faqItems = [\n"
    for faq in tool_data['faqs']:
        # We will use backticks instead of double quotes to allow literal newlines.
        q = faq['q'].replace('`', '\\`')
        a = faq['a'].replace('`', '\\`')
        faq_str += f'  {{\n    q: `{q}`,\n    a: `{a}`,\n  }},\n'
    faq_str += "];"

    code = re.sub(r'(?:const\s+faqItems\s*=\s*\[\s*\{.*?\}\s*\];)', lambda m: faq_str, code, flags=re.DOTALL)
                      
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(code)

def main():
    parsed = parse_txt()
    
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
        if tool in parsed:
            path = os.path.join(components_dir, filename)
            if os.path.exists(path):
                print(f"Fixing {filename}...")
                update_tsx(path, parsed[tool])
            else:
                print(f"File {filename} not found.")
        else:
            print(f"Tool {tool} not found in txt.")

if __name__ == "__main__":
    main()
