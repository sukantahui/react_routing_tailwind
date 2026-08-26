const topic6_questions = [
  {
    question: "Why is it strictly forbidden to use 'float' or 'double' for currency, banking, or tax computations?",
    shortAnswer: "Because binary floating-point roundoff errors accumulate over millions of transactions. Balances will drift, taxes will calculate improperly by fractional cents, and financial audits will fail. 'java.math.BigDecimal' must always be used for monetary calculations.",
    explanation: "Item 60 of Effective Java strictly mandates avoiding float and double for exact monetary results.",
    hint: "Floating point roundoff errors accumulate and destroy financial ledger precision.",
    level: "Beginner",
    codeExample: "BigDecimal price = new BigDecimal(\"19.99\"); // Exact monetary representation"
  }
];

export default topic6_questions;
