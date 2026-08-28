// Student Profile Analyzer

// Variables with different data types
let name = "Alice";
let age = "25"; // string (will convert)
let marks = [85, 90, 78];
let isEnrolled = true;
let extra = null;
let notAssigned;

// Type conversion
let numericAge = Number(age);

// Calculate average marks
let total = 0;
for (let i = 0; i < marks.length; i++) {
  total += marks[i];
}
let average = total / marks.length;

// Boolean logic
let isAdult = numericAge >= 18;

// Type checking
console.log("Type of name:", typeof name);
console.log("Type of age before conversion:", typeof age);
console.log("Type of age after conversion:", typeof numericAge);
console.log("Type of marks:", typeof marks);
console.log("Type of isEnrolled:", typeof isEnrolled);
console.log("Type of extra:", typeof extra);
console.log("Type of notAssigned:", typeof notAssigned);

// Final formatted output
console.log(
  `Name: ${name} | Age: ${numericAge} | Average Marks: ${average.toFixed(
    2
  )} | Adult: ${isAdult}`
);