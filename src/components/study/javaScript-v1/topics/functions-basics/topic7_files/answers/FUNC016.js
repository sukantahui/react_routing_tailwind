// Recursion – Fibonacci
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

console.log(fib(6));  // 8
console.log(fib(10)); // 55
// Note: This is inefficient for large n; memoization would help.
