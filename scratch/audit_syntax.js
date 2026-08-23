const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');

let errorCount = 0;

function scan(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git') {
        scan(full);
      }
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      const code = fs.readFileSync(full, 'utf8');
      try {
        babelParser.parse(code, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript']
        });
      } catch (e) {
        console.error(`ERROR in file: ${full}\n  Line ${e.loc ? e.loc.line : '?'}:${e.loc ? e.loc.column : '?'}: ${e.message}\n`);
        errorCount++;
      }
    }
  }
}

console.log("Starting full syntax audit of src/ ...");
scan('e:/React Project/react_routing_tailwind/src');
console.log(`\nAudit Complete! Total Syntax Errors: ${errorCount}`);
