const topic5_questions = [
  {
    "question": "Why is new BigDecimal(\"0.1\") safe while new BigDecimal(0.1) creates a flawed value?",
    "shortAnswer": "Because new BigDecimal(0.1) passes a binary double that is already imprecise (0.1000000000000000055511151231257827021181583404541015625), whereas the String constructor parses exact base-10 characters.",
    "explanation": "Essential Java fundamental for financial developers.",
    "hint": "The double constructor passes pre-existing binary floating point errors.",
    "level": "Beginner",
    "codeExample": "Always use new BigDecimal(\"0.1\") or BigDecimal.valueOf(0.1)."
  },
  {
    "question": "What is Banker's Rounding (RoundingMode.HALF_EVEN) and why is it preferred in banking?",
    "shortAnswer": "It rounds towards the nearest neighbor unless both are equidistant, in which case it rounds towards the nearest even integer. Over millions of transactions, this eliminates the upward statistical bias introduced by standard round-half-up rounding.",
    "explanation": "IEEE 754 and GAAP accounting standard.",
    "hint": "Rounds to nearest even number when equidistant, preventing statistical inflation.",
    "level": "Intermediate",
    "codeExample": "setScale(2, RoundingMode.HALF_EVEN)"
  }
];

export default topic5_questions;
