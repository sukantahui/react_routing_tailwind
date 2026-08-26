const topic12_questions = [
  {
    question: "What is 'java.math.BigInteger' and what is the maximum number of digits it can store?",
    shortAnswer: "'BigInteger' is an immutable arbitrary-precision integer representation in Java. It is not constrained by 32-bit or 64-bit hardware limits—it can hold integers with millions of digits, limited only by available JVM heap RAM.",
    explanation: "Powers RSA public-key encryption, blockchain signatures, and astronomical math.",
    hint: "Arbitrary-precision immutable integer limited only by JVM heap memory.",
    level: "Beginner",
    codeExample: "BigInteger huge = new BigInteger(\"123456789012345678901234567890\");"
  }
];

export default topic12_questions;
