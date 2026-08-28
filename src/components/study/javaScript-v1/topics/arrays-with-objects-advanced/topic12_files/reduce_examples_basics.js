// ===============================================
// Examples 1–5: Basic reduce operations
// ===============================================

const numbers = [10, 20, 30, 40, 50];

const students = [
  { name: "Swadeep", marks: 85 },
  { name: "Tuhina", marks: 92 },
  { name: "Abhronila", marks: 78 },
];


// ======================================================
// 1. Sum of numbers
// ======================================================

// Goal: Add all numbers together

const sum = numbers.reduce(
  (acc, n) => {
    // acc = accumulator (running total)
    // n = current number

    // Add current number to accumulator
    return acc + n;
  },
  0 // Initial value → start from 0
);

console.log("1. Sum:", sum);
// Final result: 150



// ======================================================
// 2. Average
// ======================================================

// Goal: Calculate average using reduce
// Formula: total / length

const avg = numbers.reduce(
  (acc, n, index, arr) => {
    // acc = running result
    // n = current number
    // arr = original array

    // Divide each number by total length
    // Then keep adding
    return acc + n / arr.length;
  },
  0 // Start from 0
);

console.log("2. Average:", avg);
// Final result: 30

// NOTE:
// Another common method:
// const avg = numbers.reduce((a, n) => a + n, 0) / numbers.length;



// ======================================================
// 3. Product
// ======================================================

// Goal: Multiply all numbers together

const product = numbers.reduce(
  (acc, n) => {
    // Multiply accumulator with current number
    return acc * n;
  },
  1 // IMPORTANT: Start from 1 (not 0!)
);

console.log("3. Product:", product);
// Final result: 12000000



// ======================================================
// 4. Concatenate strings
// ======================================================

// Goal: Join words into a sentence

const words = ["Hello", " ", "World", "!"];

const sentence = words.reduce(
  (acc, w) => {
    // acc = accumulated string
    // w = current word

    return acc + w;
  },
  "" // Start with empty string
);

console.log("4. Concatenated:", sentence);
// Output: "Hello World!"



// ======================================================
// 5. Find maximum
// ======================================================

// Goal: Find largest number

const max = numbers.reduce(
  (acc, n) => {
    // Compare current number with accumulator
    return n > acc ? n : acc;
  },
  -Infinity // Start with smallest possible number
);

console.log("5. Maximum:", max);
// Output: 50

// Why -Infinity?
// So first comparison always replaces it.
