// ===============================================
// Examples 6–10: Statistical and grouping operations
// ===============================================

const numbers = [15, 22, 15, 30, 22, 45, 30, 30];

const students = [
  { name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
  { name: "Tuhina", marks: 92, city: "Naihati CNAT" },
  { name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
  { name: "Debangshu", marks: 88, city: "Naihati CNAT" },
];


// ======================================================
// 6. Find minimum
// ======================================================

// Goal: Find smallest number in array

const min = numbers.reduce(
  (acc, n) => {
    // acc = current minimum
    // n = current number

    return n < acc ? n : acc;
  },
  Infinity // Start with largest possible number
);

console.log("6. Minimum:", min);
// Output: 15

// Why Infinity?
// So first number will always replace it.



// ======================================================
// 7. Count occurrences of each number (Frequency Map)
// ======================================================

// Goal: Count how many times each number appears

const occurrences = numbers.reduce((acc, n) => {
  // If acc[n] exists, increment it
  // Otherwise initialize with 0 and then add 1
  acc[n] = (acc[n] || 0) + 1;

  return acc;
}, {}); // Start with empty object

console.log("7. Occurrences:", occurrences);
// Example Output:
// { 15: 2, 22: 2, 30: 3, 45: 1 }



// ======================================================
// 8. Group students by city
// ======================================================

// Goal: Create object where keys = city
// and values = array of student names

const groupedByCity = students.reduce((acc, s) => {
  const city = s.city;

  // If city does not exist in accumulator,
  // create an empty array first
  if (!acc[city]) {
    acc[city] = [];
  }

  // Push student name into correct city group
  acc[city].push(s.name);

  return acc;
}, {}); // Start with empty object

console.log("8. Grouped by city:", groupedByCity);

// Example Output:
// {
//   "Barrackpore CNAT": ["Swadeep", "Abhronila"],
//   "Naihati CNAT": ["Tuhina", "Debangshu"]
// }



// ======================================================
// 9. Flatten array of arrays
// ======================================================

// Goal: Convert [[1,2],[3,4],[5]]
// into [1,2,3,4,5]

const arrays = [[1, 2], [3, 4], [5]];

const flattened = arrays.reduce((acc, arr) => {
  // concat merges arrays
  return acc.concat(arr);
}, []); // Start with empty array

console.log("9. Flattened:", flattened);
// Output: [1, 2, 3, 4, 5]

// Modern shortcut:
// const flattened = arrays.flat();



// ======================================================
// 10. Convert array to object (key-value pairs)
// ======================================================

// Goal: Convert:
// [["name","Ritaja"],["city","Barrackpore"],["marks",95]]
// into:
// { name:"Ritaja", city:"Barrackpore", marks:95 }

const pairs = [
  ["name", "Ritaja"],
  ["city", "Barrackpore CNAT"],
  ["marks", 95],
];

const obj = pairs.reduce((acc, [key, value]) => {
  // Destructuring: [key, value]
  // Assign property to object
  acc[key] = value;

  return acc;
}, {}); // Start with empty object

console.log("10. Object from pairs:", obj);

// Output:
// { name: "Ritaja", city: "Barrackpore CNAT", marks: 95 }
