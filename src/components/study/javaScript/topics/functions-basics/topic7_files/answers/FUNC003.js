// Return Values and Early Returns
function divide(a, b) {
    if (b === 0) {
        return 'Error: division by zero'; // early return
    }
    return a / b;
}

console.log(divide(10, 5)); // 2
console.log(divide(10, 0)); // Error: division by zero
