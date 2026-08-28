// Project: filter() – Select Products
// Description: Filter an array of product objects to keep only those with price < 50 and in stock.


const products = [
    { name: 'Laptop', price: 800, inStock: true },
    { name: 'Mouse', price: 25, inStock: true },
    { name: 'Keyboard', price: 45, inStock: false },
    { name: 'Monitor', price: 300, inStock: true }
];
const cheapInStock = products.filter(p => p.price < 50 && p.inStock);
console.log('Cheap in-stock products:', cheapInStock);

