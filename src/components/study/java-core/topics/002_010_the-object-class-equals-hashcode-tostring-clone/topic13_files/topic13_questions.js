const topic13_questions = [
  {
    question: "What is the difference between a Shallow Copy and a Deep Copy in Java?",
    shortAnswer: "A Shallow Copy duplicates the top-level object and copies reference addresses (meaning nested mutable objects are shared between original and clone). A Deep Copy recursively creates new duplicate instances for all nested reference objects on the Heap.",
    explanation: "Default Object.clone() performs a shallow copy only.",
    hint: "Shallow copy shares nested object references; Deep copy creates fresh copies of nested objects.",
    level: "Intermediate",
    codeExample: "// Shallow: clone.loc == orig.loc (true)\n// Deep: clone.loc == orig.loc (false)"
  }
];

export default topic13_questions;