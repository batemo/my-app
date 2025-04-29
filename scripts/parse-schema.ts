const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const SCHEMA_DIR = path.join(__dirname, '../schema');
const OUT_DIR = path.join(__dirname, '../convex/generated');

function parseYamlFile(filePath: any) {
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.parse(content);
}

function generateTsFromDbModel(model: any, name: any) {
  const fields = Object.entries(model.fields)
    .map(([key, value]: [any, any]) => `${key}: ${mapType((value as any).type)};`)
    .join('\n  ');
  return `export type ${capitalize(name)} = {\n  ${fields}\n}`;
}

function mapType(type: any) {
  switch (type) {
    case 'string': return 'string';
    case 'number': return 'number';
    case 'datetime': return 'Date';
    default: return 'any';
  }
}

function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  // Database models
  const dbDir = path.join(SCHEMA_DIR, 'database');
  for (const file of fs.readdirSync(dbDir)) {
    if (file.endsWith('.yaml')) {
      const model = parseYamlFile(path.join(dbDir, file));
      const ts = generateTsFromDbModel(model, model.name);
      fs.writeFileSync(path.join(OUT_DIR, `${model.name}.ts`), ts);
    }
  }
  // Add similar logic for api and types as needed
}

main(); 