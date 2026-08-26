const topic16_questions = [
  {
    question: "What does 'Object.getClass()' return in Java, and why is it marked 'final'?",
    shortAnswer: "'getClass()' returns the 'java.lang.Class' reflection descriptor representing the exact runtime class of the living Heap object. It is marked 'final' so that no subclass can override or tamper with JVM runtime type identification.",
    explanation: "Powers runtime reflection, Spring dependency injection, and JPA entity mapping.",
    hint: "Returns the runtime Class object; final to prevent tampering with type identification.",
    level: "Intermediate",
    codeExample: "Class<?> clazz = obj.getClass();"
  }
];

export default topic16_questions;