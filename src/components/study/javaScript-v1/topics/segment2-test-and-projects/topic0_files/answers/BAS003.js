// Project: Comparison and Logical Operators
// Description: Compare values (== vs ===), use logical operators to combine conditions, and demonstrate truthy/falsy.


let a = 5, b = '5';
console.log('==', a == b);
console.log('===', a === b);
console.log('&&', true && false);
console.log('||', true || false);
console.log('!', !true);
console.log('Truthy values:', Boolean('hello'), Boolean(1), Boolean([]));
console.log('Falsy values:', Boolean(''), Boolean(0), Boolean(null));

