const fs = require('fs');
const path = require('path');

const baseDir = 'src/components/study/cyber-security/topics';
const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let under25Files = [];

dirs.forEach(d => {
  const modDir = path.join(baseDir, d);
  let qFiles = [];
  function scan(p) {
    fs.readdirSync(p, { withFileTypes: true }).forEach(e => {
      const full = path.join(p, e.name);
      if (e.isDirectory()) scan(full);
      else if (e.name.endsWith('.js') && (e.name.includes('question') || e.name.includes('faq'))) {
        qFiles.push(full);
      }
    });
  }
  scan(modDir);

  qFiles.forEach(qf => {
    const c = fs.readFileSync(qf, 'utf8');
    const m = c.match(/["']?question["']?\s*:/gi) || [];
    if (m.length < 25) {
      under25Files.push({
        module: d,
        file: qf,
        relPath: path.relative(baseDir, qf),
        current: m.length,
        needed: 25 - m.length
      });
    }
  });
});

console.log('Total files under 25 questions:', under25Files.length);
const byModule = {};
under25Files.forEach(f => {
  byModule[f.module] = byModule[f.module] || [];
  byModule[f.module].push(f);
});

Object.keys(byModule).forEach(m => {
  console.log(`\n--- ${m} (${byModule[m].length} files) ---`);
  byModule[m].forEach(f => {
    const folder = path.basename(path.dirname(f.file));
    const fname = path.basename(f.file);
    console.log(`  ${folder}/${fname} : ${f.current} (needs +${f.needed})`);
  });
});
