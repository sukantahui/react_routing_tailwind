// Project: Advanced: Sort() With Custom Comparator Functions (Marks, Price, Name)
// Description: This project demonstrates advanced: sort() with custom comparator functions (marks, price, name) in JavaScript.


const products = [
    { name: 'Laptop', price: 800, rating: 4.5 },
    { name: 'Mouse', price: 25, rating: 4.8 },
    { name: 'Keyboard', price: 45, rating: 4.2 }
];
// Sort by price ascending
products.sort((a, b) => a.price - b.price);
console.log('Sorted by price:', products);
// Sort by rating descending
products.sort((a, b) => b.rating - a.rating);
console.log('Sorted by rating:', products);

