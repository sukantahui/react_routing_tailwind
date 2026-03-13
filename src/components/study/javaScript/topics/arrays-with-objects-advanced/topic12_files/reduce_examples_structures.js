// ===============================================
// Examples 11–15: Building and transforming structures
// ===============================================

const numbers = [1, 2, 2, 3, 4, 4, 5];

const students = [
  { name: "Swadeep", marks: 85 },
  { name: "Tuhina", marks: 92 },
  { name: "Abhronila", marks: 78 },
  { name: "Debangshu", marks: 88 },
];


// ======================================================
// 11. Remove duplicates (Dedupe)
// ======================================================

// Goal: Keep only unique numbers

const unique = numbers.reduce((acc, n) => {
  // If number is not already in accumulator
  if (!acc.includes(n)) {
    acc.push(n); // Add it
  }

  return acc;
}, []); // Start with empty array

console.log("11. Unique numbers:", unique);
// Output: [1, 2, 3, 4, 5]

// NOTE:
// This works, but Set is more efficient:
// [...new Set(numbers)]



// ======================================================
// 12. Partition into two arrays (even / odd)
// ======================================================

// Goal:
// {
//   even: [...],
//   odd: [...]
// }

const partitioned = numbers.reduce(
  (acc, n) => {
    // If even → push into acc.even
    // If odd → push into acc.odd
    acc[n % 2 === 0 ? "even" : "odd"].push(n);

    return acc;
  },
  { even: [], odd: [] } // Initial object structure
);

console.log("12. Partitioned:", partitioned);
// Example Output:
// { even: [2,2,4,4], odd: [1,3,5] }



// ======================================================
// 13. Running total (Cumulative Sum)
// ======================================================

// Goal:
// [1,2,2,3,4,4,5]
// → [1,3,5,8,12,16,21]

const runningTotal = numbers.reduce((acc, n, i) => {
  // Previous total = last element in accumulator
  const previousTotal = acc[i - 1] || 0;

  // Push new cumulative value
  acc.push(previousTotal + n);

  return acc;
}, []);

console.log("13. Running total:", runningTotal);



// ======================================================
// 14. Frequency map of marks
// ======================================================

// Goal:
// Count how many times each mark appears

const marksFrequency = students.reduce((acc, s) => {
  // s.marks is key
  acc[s.marks] = (acc[s.marks] || 0) + 1;

  return acc;
}, {}); // Start with empty object

console.log("14. Marks frequency:", marksFrequency);

// Example Output:
// { 85:1, 92:1, 78:1, 88:1 }



// ======================================================
// 15. Statistics (Mean, Median, Mode)
// ======================================================

// Step 1: Sort numbers for median
const sorted = [...numbers].sort((a, b) => a - b);

// ----------------------------------
// Mean (Average)
// ----------------------------------
const mean =
  numbers.reduce((acc, n) => acc + n, 0) / numbers.length;

// ----------------------------------
// Median
// ----------------------------------
const median =
  sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] +
        sorted[sorted.length / 2]) /
      2
    : sorted[Math.floor(sorted.length / 2)];

// ----------------------------------
// Mode (Most frequent number)
// ----------------------------------

// First build frequency object
const frequency = numbers.reduce((acc, n) => {
  acc[n] = (acc[n] || 0) + 1;
  return acc;
}, {});

// Then find highest frequency
const mode = Object.entries(frequency)
  .reduce((a, b) => (a[1] > b[1] ? a : b))[0];

console.log("15. Mean:", mean);
console.log("    Median:", median);
console.log("    Mode:", mode);
