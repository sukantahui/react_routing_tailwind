// generate-component.js
import fs from "fs";

const name = process.argv[2];
if (!name) {
  console.error("❌ Please provide a component name!");
  process.exit(1);
}

const dir = `./src/components/${name}`;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const component = `
export default function ${name}() {
  return (
    <div className="${name}">
      <h2>${name} Component</h2>
    </div>
  );
}
`;

fs.writeFileSync(`${dir}/${name}.jsx`, component.trim());
console.log(`✅ Component ${name} created at src/components/${name}/${name}.jsx`);
