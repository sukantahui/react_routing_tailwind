// Closure Basics
function outer(x) {
    return function inner(y) {
        return x + y;
    };
}

const add5 = outer(5);
console.log(add5(3)); // 8
console.log(outer(10)(2)); // 12
