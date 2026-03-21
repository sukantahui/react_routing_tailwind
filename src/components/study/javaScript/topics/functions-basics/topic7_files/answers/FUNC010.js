// Higher-Order Functions
function applyTwice(f, x) {
    return f(f(x));
}

const double = n => n * 2;
console.log(applyTwice(double, 3)); // 12 (3*2*2)
