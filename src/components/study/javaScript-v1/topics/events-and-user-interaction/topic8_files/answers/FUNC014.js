// Function Factories (Returning Functions)
function multiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
