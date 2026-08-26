const topic11_questions = [
  {
    question: "What are the 3 mandatory design rules for writing a professional Utility Class in Java?",
    shortAnswer: "1. Declare the class 'public final'. 2. Declare a 'private' no-arg constructor that throws an AssertionError/UnsupportedOperationException. 3. Make all methods and fields 'static'.",
    explanation: "This prevents subclassing, prevents instantiation (even via reflection), and exposes stateless toolkits.",
    hint: "final class, private throwing constructor, all static methods.",
    level: "Intermediate",
    codeExample: "public final class StringUtils { private StringUtils() { throw new AssertionError(); } }"
  }
];

export default topic11_questions;