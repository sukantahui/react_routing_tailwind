const topic6_questions = [
  {
    question: "Why does having 'class Square extends Rectangle' violate the Liskov Substitution Principle (LSP)?",
    shortAnswer: "Because a Rectangle assumes its width and height can be mutated independently. Overriding setters in Square to keep sides equal unexpectedly couples width and height, causing clients expecting Rectangle invariants (e.g. Area = 10 * 5 = 50) to fail.",
    explanation: "Mathematical relationships do not always translate to mutable software class hierarchies.",
    hint: "Mutating square width unexpectedly alters height, breaking rectangular area expectations.",
    level: "Intermediate",
    codeExample: "// Solution: interface Shape { int getArea(); }"
  }
];

export default topic6_questions;