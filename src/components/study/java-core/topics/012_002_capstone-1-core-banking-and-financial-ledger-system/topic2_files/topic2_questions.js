const topic2_questions = [
  {
    "question": "Why should SQL DECIMAL(15, 2) or NUMERIC data types be used for financial balance columns instead of FLOAT or REAL?",
    "shortAnswer": "DECIMAL and NUMERIC store exact decimal digits without binary rounding errors, perfectly mapping to Java's BigDecimal.",
    "explanation": "Preserves exact financial precision in the persistence tier.",
    "hint": "DECIMAL stores exact fixed-point numbers without precision loss.",
    "level": "Beginner",
    "codeExample": "balance DECIMAL(15, 2) NOT NULL"
  },
  {
    "question": "Why is a database CHECK (balance >= 0.00) constraint recommended even if Java code validates balance?",
    "shortAnswer": "Defense in Depth: it guarantees at the database storage engine level that balance cannot go negative, even if a race condition or bug slips through the application layer.",
    "explanation": "Database-enforced invariant protection.",
    "hint": "Guarantees data integrity even if application-level checks fail.",
    "level": "Intermediate",
    "codeExample": "CHECK (balance >= 0.00)"
  }
];

export default topic2_questions;
