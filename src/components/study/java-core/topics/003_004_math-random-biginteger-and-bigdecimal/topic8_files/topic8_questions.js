const topic8_questions = [
  {
    question: "Why should you NEVER use 'new BigDecimal(0.1)' with a double parameter in Java?",
    shortAnswer: "Because the primitive 'double 0.1' is ALREADY corrupted by IEEE 754 binary floating-point inaccuracy before it ever enters the BigDecimal constructor, creating '0.1000000000000000055511151231257827021181583404541015625'. Always use 'new BigDecimal(\"0.1\")' or 'BigDecimal.valueOf(0.1)'.",
    explanation: "Effective Java Item 60 strongly emphasizes using String constructor for BigDecimal.",
    hint: "The double argument is already imprecise before the constructor runs.",
    level: "Intermediate",
    codeExample: "BigDecimal safe = new BigDecimal(\"0.1\"); // Exact\nBigDecimal alsoSafe = BigDecimal.valueOf(0.1);"
  }
];

export default topic8_questions;