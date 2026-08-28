// Memoization (Caching)
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log('Returning from cache');
            return cache[key];
        }
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const fib = memoize(function(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});

console.log(fib(40)); // fast due to memoization
