// Project: sort() with Comparator
// Description: Sort an array of products by price ascending, then by rating descending.


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

