const topic7_questions = [
  {
    "question": "Why should custom domain exceptions carry contextual fields rather than just a String message?",
    "shortAnswer": "Because structured fields (e.g. account number, attempted amount, error code) allow upstream callers, REST controllers, and automated monitoring systems to programmatically inspect the failure details and generate localized error messages without brittle string parsing.",
    "explanation": "Standard enterprise domain exception design pattern.",
    "hint": "Allows programmatic inspection of error details without brittle string parsing.",
    "level": "Intermediate",
    "codeExample": "public BigDecimal getAttemptedAmount() { return attemptedAmount; }"
  },
  {
    "question": "Should domain exceptions like InsufficientFundsException be checked or unchecked?",
    "shortAnswer": "In modern Java frameworks (Spring/Jakarta), unchecked exceptions (extending RuntimeException) are standard because they trigger automatic transaction rollbacks without cluttering every method signature with throws clauses.",
    "explanation": "Spring @Transactional rolls back on unchecked exceptions by default.",
    "hint": "Unchecked exceptions trigger automatic transaction rollbacks in modern frameworks.",
    "level": "Intermediate",
    "codeExample": "public class InsufficientFundsException extends RuntimeException { ... }"
  }
];

export default topic7_questions;
