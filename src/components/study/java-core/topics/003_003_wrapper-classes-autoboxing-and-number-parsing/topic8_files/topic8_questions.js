const topic8_questions = [
  {
    question: "Why does assigning a 'null' Integer wrapper variable to a primitive 'int' throw a NullPointerException at runtime?",
    shortAnswer: "Because auto-unboxing generates a method call: 'studentScore.intValue()'. When 'studentScore' is null, invoking any instance method on it immediately triggers a java.lang.NullPointerException at runtime.",
    explanation: "This is one of the most common production NPE causes in Java backend systems.",
    hint: "Auto-unboxing calls .intValue() on the object; calling methods on null throws NPE.",
    level: "Intermediate",
    codeExample: "Integer x = null; int y = x; // Throws NullPointerException!"
  }
];

export default topic8_questions;