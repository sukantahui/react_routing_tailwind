const topic11_questions = [
  {
    question: "Can an abstract class in Java have zero abstract methods, and what is the primary use case?",
    shortAnswer: "Yes! An abstract class can have zero abstract methods. The primary use case is to prevent developers from directly instantiating the class ('new BaseClass()') while providing completely implemented shared logic.",
    explanation: "Commonly used in framework adapter classes and base context models.",
    hint: "Legal in Java; used solely to prevent direct instantiation of a base class.",
    level: "Intermediate",
    codeExample: "public abstract class Adapter { public void onClick() {} }"
  }
];

export default topic11_questions;