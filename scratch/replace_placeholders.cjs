const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const targetDir = path.resolve(__dirname, '../src/components/study/cyber-security');

let count = 0;
walkDir(targetDir, filePath => {
  if (/\.(jsx|js|txt|py)$/.test(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace simulation internal test domains with attacker-c2.net and standard non-operational placeholders
    content = content.replace(/c2-simulator\.test\.internal/g, 'attacker-c2.net');
    content = content.replace(/stresser-simulator\.test\.internal/g, 'attacker-stresser.net');
    content = content.replace(/botnet-simulator\.test\.internal/g, 'attacker-botnet.net');
    content = content.replace(/gateway-simulator\.test\.internal/g, 'attacker-gateway.net');
    content = content.replace(/host-simulator\.test\.internal/g, 'attacker-host.net');
    content = content.replace(/harvester-simulator\.test\.internal/g, 'attacker-harvester.net');
    content = content.replace(/exfil-simulator\.test\.internal/g, 'attacker-exfil.net');
    content = content.replace(/harvest-simulator\.test\.internal/g, 'attacker-harvest.net');
    content = content.replace(/exploit-simulator\.test\.internal/g, 'attacker-exploit.net');
    content = content.replace(/phish-simulator\.test\.internal/g, 'attacker-phish.net');
    content = content.replace(/server-simulator\.test\.internal/g, 'attacker-server.net');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
      console.log(`Updated: ${filePath}`);
    }
  }
});

console.log(`Total files updated: ${count}`);
