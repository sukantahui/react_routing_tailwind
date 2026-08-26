const topic7_questions = [
  {
    question: "How does 'java.math.BigDecimal' represent arbitrary precision decimal numbers internally?",
    shortAnswer: "'BigDecimal' consists of two main components: an arbitrary-precision integer unscaled value ('BigInteger') and a 32-bit integer 'scale' representing the number of digits to the right of the decimal point (value = unscaledValue * 10^(-scale)).",
    explanation: "BigDecimal is completely immune to base-2 binary floating point roundoff errors.",
    hint: "Consists of an unscaled BigInteger value and an integer scale factor.",
    level: "Intermediate",
    codeExample: "BigDecimal b = new BigDecimal(\"123.45\"); // unscaled=12345, scale=2"
  }
];

export default topic7_questions;
