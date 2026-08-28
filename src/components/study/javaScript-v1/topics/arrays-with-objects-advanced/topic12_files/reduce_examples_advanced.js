// ===============================================
// Examples 16–20: Advanced reduce patterns
// ===============================================

// Sample dataset
const students = [
  { name: "Swadeep", marks: 85, city: "Barrackpore CNAT" },
  { name: "Tuhina", marks: 92, city: "Naihati CNAT" },
  { name: "Abhronila", marks: 78, city: "Barrackpore CNAT" },
  { name: "Ritaja", marks: 95, city: "Barrackpore CNAT" },
];


// ======================================================
// 16. Merge objects (combine multiple objects into one)
// ======================================================

// Step 1: Define multiple separate objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { d: 5 };

// Step 2: Put them inside an array
// We want to combine all objects into one single object
const merged = [obj1, obj2, obj3].reduce(
  (acc, obj) => {
    // acc = accumulator (starts as {})
    // obj = current object from the array

    // Spread operator merges properties
    // If keys overlap (like 'b'), later values override earlier ones
    return { ...acc, ...obj };
  },
  {} // Step 3: Initial value → empty object
);

console.log("16. Merged objects:", merged);
// Output: { a:1, b:3, c:4, d:5 }
// Note: b becomes 3 because obj2 overwrites obj1



// ======================================================
// 17. Build a lookup table (object keyed by name)
// ======================================================

// Goal: Convert array of students into an object like:
// {
//   Swadeep: { ... },
//   Tuhina: { ... },
//   ...
// }

const lookup = students.reduce((acc, s) => {
  // acc starts as {}
  // s = current student object

  // Use student's name as key
  acc[s.name] = s;

  // Always return accumulator
  return acc;
}, {});

console.log("17. Lookup by name:", lookup);

// Access becomes very fast:
console.log("   Ritaja's marks:", lookup["Ritaja"]?.marks);
// Instead of searching the whole array,
// we directly access by key (O(1) lookup)



// ======================================================
// 18. Validate all items (like every)
// Check if ALL students have marks > 80
// ======================================================

const allAbove80 = students.reduce(
  (acc, s) => {
    // acc starts as true
    // For every student:
    // If any mark <= 80, result becomes false
    return acc && s.marks > 80;
  },
  true // Initial assumption: all are above 80
);

console.log("18. All marks > 80?", allAbove80);
// Stops logically when one condition fails



// ======================================================
// 19. Check any item (like some)
// Check if ANY student is from Naihati CNAT
// ======================================================

const anyFromNaihati = students.reduce(
  (acc, s) => {
    // acc starts as false
    // If any student matches condition,
    // result becomes true
    return acc || s.city === "Naihati CNAT";
  },
  false // Initial assumption: none found
);

console.log("19. Any from Naihati CNAT?", anyFromNaihati);



// ======================================================
// 20. Chaining inside reduce (filter + map in one pass)
// Get names of students with marks > 80
// ======================================================

const topStudents = students.reduce((acc, s) => {
  // acc starts as empty array []

  // Step 1: Filter condition
  if (s.marks > 80) {
    // Step 2: Push only the name (mapping part)
    acc.push(s.name);
  }

  // Step 3: Return accumulator
  return acc;
}, []);

console.log("20. Top students (marks > 80):", topStudents);

// This replaces:
// students.filter(...).map(...)
// But does everything in ONE iteration.
