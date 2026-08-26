const topic0_questions = [
  {
    "question": "What is the Double-Entry Bookkeeping principle in financial ledger systems?",
    "shortAnswer": "Every financial transaction must affect at least two accounts with equal and opposite entries: every debit to an account must be balanced by an exact matching credit to another account, ensuring total system balance is always zero.",
    "explanation": "The foundational law of financial accounting.",
    "hint": "Total debits must strictly equal total credits.",
    "level": "Beginner",
    "codeExample": "Debit(SourceAccount, 500) == Credit(TargetAccount, 500)"
  },
  {
    "question": "Why is float or double strictly forbidden in financial calculation engines?",
    "shortAnswer": "Because binary floating-point numbers cannot accurately represent base-10 fractional values (e.g. 0.1 + 0.2 = 0.30000000000000004), accumulating compounding precision errors that violate banking compliance laws.",
    "explanation": "BigDecimal is mandatory for all monetary values.",
    "hint": "Binary IEEE 754 precision loss causes compounding monetary discrepancies.",
    "level": "Beginner",
    "codeExample": "Always use BigDecimal.valueOf(100.50) with explicit RoundingMode."
  }
];

export default topic0_questions;
