const topic5_questions = [
  {
    question: "What is the core rule of the Liskov Substitution Principle (LSP)?",
    shortAnswer: "LSP states that objects of a superclass should be replaceable with objects of its subclasses without breaking application correctness, altering expected behavior, or throwing unexpected UnsupportedOperationExceptions.",
    explanation: "Named after Turing Award winner Barbara Liskov.",
    hint: "Subclasses must behave correctly in place of their parent classes without throwing unexpected exceptions.",
    level: "Intermediate",
    codeExample: "void process(Parent p) { p.doWork(); /* Works with any valid child! */ }"
  }
];

export default topic5_questions;