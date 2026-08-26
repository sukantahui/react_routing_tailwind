const topic22_questions = [
  {
    "question": "Why is 'SELECT ... FOR UPDATE' critical when reading account balances in a financial transfer transaction?",
    "shortAnswer": "It acquires an exclusive pessimistic lock (X-Lock) on the account row, preventing concurrent transactions from reading or modifying the same balance until this transaction commits, eliminating race conditions and double-spending bugs.",
    "explanation": "Pessimistic concurrency control for financial integrity.",
    "hint": "Acquires an exclusive lock on the row to prevent concurrent race conditions.",
    "level": "Intermediate",
    "codeExample": "SELECT balance FROM accounts WHERE id = ? FOR UPDATE;"
  },
  {
    "question": "Why should the financial audit log INSERT be included in the same transaction as the transfer operations?",
    "shortAnswer": "To guarantee atomicity between the balance modification and the audit record: if the transfer fails and rolls back, the audit record is also rolled back; if the transfer succeeds, the audit trail is guaranteed to exist.",
    "explanation": "Preserves 1-to-1 correspondence between ledger movements and audit logs.",
    "hint": "Guarantees audit records exist if and only if the transfer actually committed.",
    "level": "Intermediate",
    "codeExample": "Debit + Credit + Audit Log = Single Atomic Transaction."
  }
];

export default topic22_questions;
