const topic1_questions = [
  {
    question: "Why is Method Overloading classified as Compile-Time Polymorphism (Static Binding)?",
    shortAnswer: "Because the compiler examines the arguments at compile time and binds the call directly to a specific method descriptor in the bytecode, requiring zero runtime dispatch lookup.",
    explanation: "Static binding means the method target is fixed before the program runs.",
    hint: "Target method is resolved by the compiler during code compilation.",
    level: "Beginner",
    codeExample: "// Bytecode: invokevirtual calculateFee:(DD)D"
  }
];

export default topic1_questions;