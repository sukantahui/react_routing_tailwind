// ARR002 - Map product names to uppercase
const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 45 }
];

const uppercaseNames = products.map(p => p.name.toUpperCase());
console.log(uppercaseNames);
