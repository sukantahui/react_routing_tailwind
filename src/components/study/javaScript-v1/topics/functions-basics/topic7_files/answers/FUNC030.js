// Comprehensive Function Practice: Utility Library
const utils = (function() {
    // Compose
    const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

    // Memoize
    const memoize = fn => {
        const cache = {};
        return (...args) => {
            const key = JSON.stringify(args);
            if (cache[key]) return cache[key];
            const result = fn(...args);
            cache[key] = result;
            return result;
        };
    };

    // Throttle
    const throttle = (fn, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                fn(...args);
            }
        };
    };

    // Debounce
    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    return { compose, memoize, throttle, debounce };
})();

// Example usage
const add = a => b => a + b;
const add5 = add(5);
const double = x => x * 2;
const add5ThenDouble = utils.compose(double, add5);
console.log(add5ThenDouble(3)); // (3+5)*2 = 16

const factorial = utils.memoize(n => n <= 1 ? 1 : n * factorial(n-1));
console.log(factorial(5)); // 120, cached for future calls

const log = utils.throttle(() => console.log('Throttled'), 1000);
log(); // will run at most once per second
