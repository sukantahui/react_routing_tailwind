// ARR003 - Reduce to calculate total price
const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 45 }
];

const total = products.reduce((sum, p) => sum + p.price, 0);
console.log(total);
