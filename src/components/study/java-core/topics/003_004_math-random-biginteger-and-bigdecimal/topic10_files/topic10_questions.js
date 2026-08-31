const topic10_questions = [
  {
    question: "What is Banker's Rounding ('RoundingMode.HALF_EVEN') and why is it preferred by financial institutions?",
    shortAnswer: "In standard 'HALF_UP', .5 always rounds up, causing an upward statistical bias over millions of banking transactions. 'HALF_EVEN' rounds towards the nearest even number (2.5 → 2, 3.5 → 4), statistically balancing roundings up and down to minimize cumulative financial drift.",
    explanation: "HALF_EVEN is the default rounding mode in IEEE 754 and financial standards.",
    hint: "Rounds towards the nearest even number to eliminate upward rounding bias.",
    level: "Intermediate",
    codeExample: "BigDecimal rounded = amount.setScale(2, RoundingMode.HALF_EVEN);"
  }
];

export default topic10_questions;