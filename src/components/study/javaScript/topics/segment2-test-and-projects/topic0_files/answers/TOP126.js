// Project: Advanced: Reduce() For Totals, Grouping, Counting And Analytics
// Description: This project demonstrates advanced: reduce() for totals, grouping, counting and analytics in JavaScript.


const cart = [
    { name: 'Apple', price: 0.5, qty: 4 },
    { name: 'Banana', price: 0.3, qty: 6 },
    { name: 'Orange', price: 0.8, qty: 3 }
];
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log('Total cost:', total);

