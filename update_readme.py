import json
import re

# 1. Leer versión del package.json
try:
    with open('package.json', 'r') as f:
        version = json.load(f).get('version', '1.0.0')
except FileNotFoundError:
    version = '1.0.0'

# 2. Leer el contenido actual del README.md
with open('README.md', 'r', encoding='utf-8') as f:
    content = f.read()

# 3. El bloque exacto que queremos mantener
nuevo_bloque = f"\nVersión actual: **{version}**\n"

# 4. Lógica de reemplazo segura
if "" in content and "" in content:
    content = re.sub(r'.*?', nuevo_bloque, content, flags=re.DOTALL)
else:
    content = content + "\n\n" + nuevo_bloque

# 5. Guardar el archivo
with open('README.md', 'w', encoding='utf-8') as f:
    f.write(content)
