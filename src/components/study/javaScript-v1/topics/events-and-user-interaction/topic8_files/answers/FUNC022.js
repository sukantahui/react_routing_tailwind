// Currying
const curry = fn => a => b => fn(a, b);

const add = (a, b) => a + b;
const curriedAdd = curry(add);

console.log(curriedAdd(5)(3)); // 8
const add5 = curriedAdd(5);
console.log(add5(10)); // 15
