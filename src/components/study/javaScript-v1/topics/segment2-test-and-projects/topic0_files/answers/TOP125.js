// Project: Advanced: Filter() With Multiple Conditions And Nested Object Filtering
// Description: This project demonstrates advanced: filter() with multiple conditions and nested object filtering in JavaScript.


const products = [
    { name: 'Laptop', price: 800, inStock: true },
    { name: 'Mouse', price: 25, inStock: true },
    { name: 'Keyboard', price: 45, inStock: false },
    { name: 'Monitor', price: 300, inStock: true }
];
const cheapInStock = products.filter(p => p.price < 50 && p.inStock);
console.log('Cheap in-stock products:', cheapInStock);

