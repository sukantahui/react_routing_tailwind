const topic12_questions = [
  {
    question: "Why is 'Favor Composition over Inheritance' (Effective Java Item 18 / GoF) a premier software engineering principle?",
    shortAnswer: "Composition provides loose coupling, allows dynamic runtime behavior swapping, prevents the Fragile Base Class problem, and avoids exposing unnecessary superclass methods.",
    explanation: "Inheritance is rigid and breaks encapsulation (subclasses depend on superclass implementation details). Composition wraps behaviors flexibly.",
    hint: "Enables loose coupling, runtime strategy swapping, and avoids fragile base class issues.",
    level: "Advanced",
    codeExample: "// Flexible Strategy Pattern using Composition"
  }
];

export default topic12_questions;