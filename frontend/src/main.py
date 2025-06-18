import os

def append_code_to_md(folder_path, md_file_path):
    with open(md_file_path, 'a') as md_file:
        for root, _, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                if file_path.endswith('.js') or file_path.endswith('.ts') or file_path.endswith('.tsx'):
                    with open(file_path, 'r') as code_file:
                        code_content = code_file.read()
                        md_file.write(f"\n  - {file_path.split("\\")[1]}\n```javascript\n{code_content}\n```\n")

# Usage
folder_paths = ['pages/admin', 'pages/user']
md_file_path = 'file.md'
for folder_path in folder_paths:
    with open(md_file_path, 'a') as md_file:
        md_file.write(f"\n- ### {folder_path}\n")
    append_code_to_md(folder_path, md_file_path)

