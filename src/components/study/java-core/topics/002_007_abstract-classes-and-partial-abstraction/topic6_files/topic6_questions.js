const topic6_questions = [
  {
    question: "What is 'Partial Abstraction' and how does an abstract class achieve it?",
    shortAnswer: "Partial abstraction is providing some implemented methods (concrete logic) alongside unimplemented method contracts (abstract methods), achieving between 1% and 99% abstraction.",
    explanation: "Unlike Interfaces (which traditionally represented 100% pure abstraction), abstract classes allow a flexible mix of implementation and abstraction.",
    hint: "A mix of concrete implemented methods and abstract method contracts.",
    level: "Beginner",
    codeExample: "abstract class Pipeline { void common() {} abstract void custom(); }"
  }
];

export default topic6_questions;