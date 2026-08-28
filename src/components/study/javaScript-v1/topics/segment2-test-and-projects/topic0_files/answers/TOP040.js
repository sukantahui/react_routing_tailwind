// Project: Optional Chaining (?.) And Nullish Coalescing (??)
// Description: This project demonstrates optional chaining (?.) and nullish coalescing (??) in JavaScript.


const products = [
    { name: 'Laptop', price: 800, discount: 0.1 },
    { name: 'Mouse', price: 25, discount: 0 },
    { name: 'Keyboard', price: 45, discount: 0.05 }
];
const total = products
    .filter(p => p.discount > 0)
    .map(p => p.price * (1 - p.discount))
    .reduce((sum, val) => sum + val, 0);
console.log('Total discounted price:', total);

