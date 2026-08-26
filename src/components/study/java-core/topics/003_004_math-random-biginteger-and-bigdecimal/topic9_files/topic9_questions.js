const topic9_questions = [
  {
    question: "Why does calling 'a.divide(b)' without specifying scale and RoundingMode throw an ArithmeticException?",
    shortAnswer: "If division results in a non-terminating repeating decimal fraction (e.g. 10 / 3 = 3.33333...), Java cannot represent an infinite number of digits. Therefore, the JVM throws 'ArithmeticException: Non-terminating decimal expansion'. Specifying scale and RoundingMode (e.g. 'divide(b, 2, RoundingMode.HALF_UP)') is mandatory for non-terminating divisions.",
    explanation: "Always supply explicit scale and RoundingMode to divide().",
    hint: "Non-terminating repeating decimals (like 10/3) throw ArithmeticException unless scale is defined.",
    level: "Intermediate",
    codeExample: "BigDecimal emi = total.divide(months, 2, RoundingMode.HALF_UP);"
  }
];

export default topic9_questions;