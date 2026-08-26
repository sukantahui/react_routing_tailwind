const topic2_questions = [
  {
    question: "Why were exact arithmetic methods like 'Math.addExact()' and 'Math.multiplyExact()' introduced in Java 8?",
    shortAnswer: "Standard primitive arithmetic (+, *, -) overflows silently by wrapping around (e.g. Integer.MAX_VALUE + 1 becomes negative) without throwing errors. Java 8 exact methods actively detect overflow and throw 'ArithmeticException', preventing silent financial calculation corruption.",
    explanation: "Use Math.toIntExact(long) to safely cast longs to ints without data loss.",
    hint: "Prevents silent integer wraparound overflow by throwing ArithmeticException.",
    level: "Intermediate",
    codeExample: "int result = Math.addExact(Integer.MAX_VALUE, 1); // Throws ArithmeticException"
  }
];

export default topic2_questions;