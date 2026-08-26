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
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist') {
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

const targetDir = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(__dirname, '../src/components/study/java-core/topics');
console.log(`Starting full syntax audit of ${targetDir} ...`);
scan(targetDir);
console.log(`\nAudit Complete! Total Syntax Errors: ${errorCount}`);
