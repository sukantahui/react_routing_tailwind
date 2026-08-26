const topic15_questions = [
  {
    question: "How does Strong Encapsulation in the Java 9 Module System redefine the meaning of 'public' in Java?",
    shortAnswer: "In Java 9+, a 'public' class is ONLY accessible to other modules if its containing package is explicitly declared in an 'exports' directive in 'module-info.java'. If the package is not exported, its public classes remain strictly internal and inaccessible to outside modules.",
    explanation: "This introduces a true 5th layer of encapsulation beyond private, default, protected, and public.",
    hint: "Public classes in unexported packages are completely hidden from external modules.",
    level: "Advanced",
    codeExample: "// Package not exported -> Public classes inside are inaccessible outside"
  }
];

export default topic15_questions;