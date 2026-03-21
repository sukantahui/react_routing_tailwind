// Shallow Copy: Spread and Object.assign
const original = {
    a: 1,
    b: { c: 2, d: 3 }
};

// Spread operator
const copySpread = { ...original };
console.log('Spread copy:', copySpread);

// Object.assign
const copyAssign = Object.assign({}, original);
console.log('Object.assign copy:', copyAssign);

// Modify nested property in copy
copySpread.b.c = 999;
console.log('\nAfter copySpread.b.c = 999:');
console.log('original.b.c:', original.b.c); // 999 (changed!)
console.log('copySpread.b.c:', copySpread.b.c);
