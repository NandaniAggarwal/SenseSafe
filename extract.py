import json
import os

# apna saved JSON file ka path
with open("project.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# naya folder jaha project recreate hoga
output_dir = "lovable_project"
os.makedirs(output_dir, exist_ok=True)

for file in data["files"]:
    file_path = os.path.join(output_dir, file["name"])
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f_out:
        f_out.write(file["contents"] if file.get("contents") else "")

print(f"✅ Project saved in {output_dir}")
