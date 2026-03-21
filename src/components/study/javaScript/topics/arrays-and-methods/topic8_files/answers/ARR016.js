// Remove Duplicates
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = removeDuplicates(numbers);
console.log('Unique:', unique); // [1, 2, 3, 4, 5]
