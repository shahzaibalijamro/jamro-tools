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

def get_tool_info_card_str(tool_data):
    content_str = "[\n"
    for p in tool_data['content']:
        p_escaped = p.replace('`', '\\`')
        content_str += f'          `{p_escaped}`,\n'
    content_str += "        ]"
    
    return f"""      {{/* Tool Info Section */}}
      <ToolInfoCard 
        title="Your all-in-one digital workshop."
        content={{{content_str}}}
      />
"""

def get_faq_str(tool_data):
    faq_str = "const faqItems = [\n"
    for faq in tool_data['faqs']:
        q = faq['q'].replace('`', '\\`')
        a = faq['a'].replace('`', '\\`')
        faq_str += f'  {{\n    q: `{q}`,\n    a: `{a}`,\n  }},\n'
    faq_str += "];\n"
    return faq_str

def fix_word_counter(parsed):
    path = os.path.join(components_dir, "word-counter-calculator.tsx")
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()
    
    if 'ToolInfoCard title=' in code:
        return
        
    tool_data = parsed["Word Counter"]
    
    # word-counter-calculator.tsx has:
    #             {/* FAQ Section */}
    #             <FaqSection items={[
    #                 {
    # ...
    #             ]} />
    #         </>
    #     );
    # }
    
    # We will replace everything from `{/* FAQ Section */}` onwards with our new code
    
    faq_items = get_faq_str(tool_data)
    info_card = get_tool_info_card_str(tool_data)
    
    idx = code.find("{/* FAQ Section */}")
    if idx == -1: return
    
    new_code = code[:idx]
    
    # We also need to add the `const faqItems = ...` before the `return (`
    return_idx = new_code.rfind("return (")
    if return_idx == -1: return
    
    final_code = new_code[:return_idx] + faq_items + "\n    " + new_code[return_idx:]
    final_code += info_card + "\n      {/* FAQ Section */}\n      <FaqSection items={faqItems} />\n        </>\n    );\n}\n"
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(final_code)
        
def fix_scientific_calculator(parsed):
    path = os.path.join(components_dir, "scientific-calculator.tsx")
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()
        
    if 'ToolInfoCard title=' in code:
        return
        
    tool_data = parsed["Scientific Calculator"]
    faq_items = get_faq_str(tool_data)
    info_card = get_tool_info_card_str(tool_data)
    
    # Add imports
    if 'import { FaqSection }' not in code:
        code = code.replace('"use client";', '"use client";\nimport { FaqSection } from "@/components/ui/faq-section";\nimport { ToolInfoCard } from "@/components/tools/tool-info-card";')
        
    return_idx = code.rfind("return (")
    if return_idx == -1: return
    
    new_code = code[:return_idx] + faq_items + "\n  " + code[return_idx:]
    
    # replace the closing `</div>\n  );\n}` with our new sections
    end_idx = new_code.rfind("</div>\n  );\n}")
    if end_idx == -1: return
    
    final_code = new_code[:end_idx] + "\n" + info_card + "\n      {/* FAQ Section */}\n      <FaqSection items={faqItems} />\n    </div>\n  );\n}\n"
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(final_code)
        
def fix_basic_calculator(parsed):
    path = os.path.join(components_dir, "basic-calculator.tsx")
    with open(path, 'r', encoding='utf-8') as f:
        code = f.read()
        
    if 'ToolInfoCard title=' in code:
        return
        
    tool_data = parsed["Basic Calculator"]
    faq_items = get_faq_str(tool_data)
    info_card = get_tool_info_card_str(tool_data)
    
    # Add imports
    if 'import { FaqSection }' not in code:
        code = code.replace('"use client";', '"use client";\nimport { FaqSection } from "@/components/ui/faq-section";\nimport { ToolInfoCard } from "@/components/tools/tool-info-card";')
        
    return_idx = code.rfind("return (")
    if return_idx == -1: return
    
    new_code = code[:return_idx] + faq_items + "\n  " + code[return_idx:]
    
    end_idx = new_code.rfind("</div>\n  );\n}")
    if end_idx == -1: return
    
    final_code = new_code[:end_idx] + "\n" + info_card + "\n      {/* FAQ Section */}\n      <FaqSection items={faqItems} />\n    </div>\n  );\n}\n"
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(final_code)

def main():
    parsed = parse_txt()
    fix_word_counter(parsed)
    fix_scientific_calculator(parsed)
    fix_basic_calculator(parsed)
    print("Fixed the remaining 3 calculators.")

if __name__ == "__main__":
    main()
