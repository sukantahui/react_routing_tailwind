const topic0_questions = [
  {
    question: "What is 'java.lang.String' under the hood and what major internal optimization was introduced in Java 9?",
    shortAnswer: "'java.lang.String' is an immutable sequence of characters. In Java 9 (Compact Strings / JEP 254), the internal representation was changed from 'char[]' (16-bit) to 'byte[]' with a 1-byte coder flag (Latin-1 or UTF-16), reducing String memory footprint by up to 50%.",
    explanation: "Strings are final and immutable objects located in java.lang.",
    hint: "Immutable character sequence; optimized to byte[] in Java 9 for 50% memory savings.",
    level: "Beginner",
    codeExample: "String s = \"Barrackpore\"; // Stored as byte[] in Java 9+"
  }
];

export default topic0_questions;
