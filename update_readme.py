import json
import re

# 1. Leer versión
with open('package.json', 'r') as f:
    version = json.load(f).get('version', '1.0.0')

# 2. Leer README
with open('README.md', 'r') as f:
    content = f.read()

# 3. Reemplazar usando expresiones regulares
# Esto busca todo lo que esté entre START y END y lo reemplaza por la versión limpia
new_text = f"\nVersión actual: {version}\n"
new_content = re.sub(r'.*', new_text, content, flags=re.DOTALL)

# 4. Guardar
with open('README.md', 'w') as f:
    f.write(new_content)
