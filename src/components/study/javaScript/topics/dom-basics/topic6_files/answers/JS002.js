// Select Elements Practice
// Assume the HTML contains:
// <div id="main">Hello</div>
// <p class="info">First info</p>
// <p class="info">Second info</p>
// <div data-custom="example">Data attribute</div>

// getElementById
const mainDiv = document.getElementById('main');
console.log('getElementById:', mainDiv);

// querySelector (first match)
const firstInfo = document.querySelector('.info');
console.log('querySelector (.info):', firstInfo);

// querySelectorAll (NodeList)
const allInfos = document.querySelectorAll('.info');
console.log('querySelectorAll (.info) count:', allInfos.length);
allInfos.forEach((p, idx) => console.log(`  Info ${idx+1}:`, p));

// querySelector by attribute
const dataDiv = document.querySelector('[data-custom]');
console.log('querySelector ([data-custom]):', dataDiv);
