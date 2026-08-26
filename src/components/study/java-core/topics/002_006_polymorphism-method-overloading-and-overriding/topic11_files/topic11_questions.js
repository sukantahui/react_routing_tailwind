const topic11_questions = [
  {
    question: "What is Downcasting in Java and what runtime exception can it trigger?",
    shortAnswer: "Downcasting is casting a supertype reference down to a more specific subtype reference using explicit cast syntax ('(Child) parentRef'). If the actual Heap object is not an instance of the target subtype, the JVM throws a 'ClassCastException'.",
    explanation: "Always guard downcasts with 'instanceof' checks to prevent runtime crashes.",
    hint: "Superclass to subclass reference; requires explicit cast and risks ClassCastException.",
    level: "Intermediate",
    codeExample: "Dog d = (Dog) animal; // Throws ClassCastException if animal is Cat"
  }
];

export default topic11_questions;