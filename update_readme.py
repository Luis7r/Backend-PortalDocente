import json

# Leer versiones del package.json
with open('package.json', 'r') as f:
    data = json.load(f)
    version = data.get('version', '1.0.0')

# Leer y actualizar el README
with open('README.md', 'r') as f:
    lines = f.readlines()

with open('README.md', 'w') as f:
    for line in lines:
        if "<!-- VERSION -->" in line:
            f.write(f"Version actual: {version} <!-- VERSION -->\n")
        else:
            f.write(line)
