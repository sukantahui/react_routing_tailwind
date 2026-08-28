/**
 * JS019: Automatic Semicolon Insertion (ASI): The Restricted return Trap
 * Module: 001_001_getting-started-with-javascript (Topic 7)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

// Function 1: Buggy return due to ASI newline insertion rule
function getStudentScoreBroken() {
  return // <-- ASI automatically inserts a semicolon here: 'return;'
  {
    student: "Swadeep",
    score: 98,
    status: "Passed"
  };
}

// Function 2: Correct formatting with opening brace on same line
function getStudentScoreCorrect() {
  return {
    student: "Swadeep",
    score: 98,
    status: "Passed"
  };
}

// Function 3: Defensive parenthesized multiline return (Common in React JSX)
function getStudentScoreParenthesized() {
  return (
    {
      student: "Swadeep",
      score: 98,
      status: "Passed"
    }
  );
}

console.log("=== Automatic Semicolon Insertion (ASI) Return Comparison ===");
console.log("Broken Return Result (ASI returned undefined):", getStudentScoreBroken());           // undefined
console.log("Correct Same-Line Return Result:", getStudentScoreCorrect());                       // Object { student: 'Swadeep', ... }
console.log("Parenthesized Multiline Return Result:", getStudentScoreParenthesized());           // Object { student: 'Swadeep', ... }
