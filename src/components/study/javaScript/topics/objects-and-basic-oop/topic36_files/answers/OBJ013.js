// Deep Copy: JSON and structuredClone
const original = {
    a: 1,
    b: { c: 2, d: 3 }
};

// JSON method
const deepCopyJSON = JSON.parse(JSON.stringify(original));
console.log('Deep copy (JSON):', deepCopyJSON);

// structuredClone (modern)
const deepCopyClone = structuredClone(original);
console.log('Deep copy (structuredClone):', deepCopyClone);

// Modify nested property in copies
deepCopyJSON.b.c = 999;
deepCopyClone.b.c = 888;

console.log('\nAfter modifications:');
console.log('original.b.c:', original.b.c); // 2 (unchanged)
console.log('JSON copy b.c:', deepCopyJSON.b.c);
console.log('structuredClone copy b.c:', deepCopyClone.b.c);
