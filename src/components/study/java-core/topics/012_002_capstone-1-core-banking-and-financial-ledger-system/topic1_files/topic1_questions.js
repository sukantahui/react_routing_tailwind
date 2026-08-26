const topic1_questions = [
  {
    "question": "Why should ledger entry domain entities be modeled as immutable Java Records rather than mutable JavaBeans?",
    "shortAnswer": "Because financial transaction ledger entries are historical facts that must never be modified or tampered with after creation; immutability guarantees audit trail integrity and thread safety.",
    "explanation": "Essential requirement for financial compliance.",
    "hint": "Financial ledger entries are historical facts that must never mutate.",
    "level": "Beginner",
    "codeExample": "public record LedgerEntry(UUID id, BigDecimal amount, Instant time) {}"
  },
  {
    "question": "Why is java.time.Instant preferred over java.util.Date for financial transaction timestamps?",
    "shortAnswer": "Instant is immutable, thread-safe, represents an unambiguous UTC timestamp on the epoch timeline with nanosecond precision, and does not carry confusing timezone offsets.",
    "explanation": "Standard Java 8+ Date/Time best practice.",
    "hint": "Instant is immutable, thread-safe, and uses unambiguous UTC timestamps.",
    "level": "Beginner",
    "codeExample": "Instant transactionTime = Instant.now();"
  }
];

export default topic1_questions;
