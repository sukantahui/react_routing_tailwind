const topic4_questions = [
  {
    question: "What are the 4 primary reasons why Java Strings are designed to be immutable?",
    shortAnswer: "1. String Constant Pool integrity (shared pool references don't corrupt each other). 2. Security (prevents tampering with DB URLs, passwords, or ClassLoader paths). 3. Thread Safety (naturally safe without locking). 4. HashCode Caching (hash is cached after 1st calculation for O(1) HashMap lookup).",
    explanation: "Declared 'final' to prevent subclasses from breaking immutability.",
    hint: "SCP sharing, Security, Thread-safety, and HashCode caching.",
    level: "Intermediate",
    codeExample: "// Immutability enables caching: private int hash; // cached hash code"
  }
];

export default topic4_questions;