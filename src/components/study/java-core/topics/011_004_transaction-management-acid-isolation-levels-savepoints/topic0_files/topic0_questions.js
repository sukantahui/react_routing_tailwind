const topic0_questions = [
  {
    "question": "What is the core definition of a database transaction?",
    "shortAnswer": "A logical unit of work comprising one or more database operations that must execute with all-or-nothing atomicity, ensuring that either all changes are permanently persisted (commit) or all changes are completely reverted (rollback).",
    "explanation": "The foundation of enterprise data integrity.",
    "hint": "An indivisible unit of work where all operations succeed or all are rolled back.",
    "level": "Beginner",
    "codeExample": "Transaction: Step 1 (Debit) + Step 2 (Credit) → Commit together."
  },
  {
    "question": "What happens to uncommitted database modifications if a Java application crashes during an active transaction?",
    "shortAnswer": "The database server detects the severed TCP connection and automatically executes an internal ROLLBACK, discarding all uncommitted modifications and restoring data integrity.",
    "explanation": "Preserves database consistency even across sudden client/server crashes.",
    "hint": "The database automatically rolls back all uncommitted changes.",
    "level": "Intermediate",
    "codeExample": "Crash → Automatic server rollback."
  }
];

export default topic0_questions;
