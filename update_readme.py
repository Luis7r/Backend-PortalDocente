import json

# 1. Obtenemos la versión
with open('package.json', 'r') as f:
    data = json.load(f)
    version = data.get('version', '1.0.0')

# 2. Leemos el contenido actual
with open('README.md', 'r') as f:
    content = f.read()

# 3. Reemplazamos la etiqueta por la versión
# Si no encuentra la etiqueta, no hace nada, por eso es vital que esté en el README
new_content = content.replace("", f"Versión actual: {version} ")

# 4. Guardamos
with open('README.md', 'w') as f:
    f.write(new_content)
