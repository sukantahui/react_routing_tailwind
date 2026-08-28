// Object.keys with Sorting and Grouping
const scores = {
    Alice: 85,
    Bob: 92,
    Charlie: 78,
    Diana: 88
};

// Sort keys alphabetically
const sortedKeys = Object.keys(scores).sort();
console.log('Sorted keys:', sortedKeys);

// Group scores: pass (>80) vs fail
const grouped = Object.entries(scores).reduce((acc, [name, score]) => {
    if (score > 80) acc.pass.push(name);
    else acc.fail.push(name);
    return acc;
}, { pass: [], fail: [] });

console.log('Pass (score > 80):', grouped.pass);
console.log('Fail (score <= 80):', grouped.fail);
