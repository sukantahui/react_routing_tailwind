const topic5_questions = [
  {
    question: "Why does '0.1 + 0.2 == 0.3' evaluate to 'false' and print '0.30000000000000004' in Java?",
    shortAnswer: "Because computers use base-2 binary representation (IEEE 754 standard). Numbers like 0.1 and 0.2 cannot be represented as exact finite fractions in binary (similar to 1/3 in base-10) and produce infinitely repeating binary fractions that are truncated after 53 mantissa bits.",
    explanation: "This fundamental limitation affects all programming languages implementing IEEE 754.",
    hint: "Base-2 binary representation cannot store 0.1 or 0.2 as finite binary fractions.",
    level: "Intermediate",
    codeExample: "double d = 0.1 + 0.2; // Evaluates to 0.30000000000000004"
  }
];

export default topic5_questions;