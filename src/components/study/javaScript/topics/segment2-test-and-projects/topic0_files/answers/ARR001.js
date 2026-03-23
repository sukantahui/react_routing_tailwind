// Project: Basic Array Operations
// Description: Create an array, access elements, use push/pop, shift/unshift, splice.


let fruits = ['apple', 'banana', 'orange'];
console.log('Original:', fruits);
fruits.push('grape');
console.log('After push:', fruits);
fruits.pop();
console.log('After pop:', fruits);
fruits.unshift('mango');
console.log('After unshift:', fruits);
fruits.shift();
console.log('After shift:', fruits);
fruits.splice(1, 1, 'kiwi');
console.log('After splice:', fruits);

