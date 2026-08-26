const topic3_questions = [
  {
    "question": "Why should DAO methods in transactional systems accept a Connection object from the Service layer?",
    "shortAnswer": "Because a single business transaction often spans multiple DAO calls (e.g. update balance on AccountDao, then write entries on LedgerDao); passing the shared Connection allows the Service layer to manage setAutoCommit(false), commit(), and rollback() across all operations.",
    "explanation": "Essential pattern for manual JDBC transaction boundaries.",
    "hint": "Allows a single transactional Connection to be shared across multiple DAO operations.",
    "level": "Intermediate",
    "codeExample": "void update(Connection conn, String accNo, BigDecimal bal);"
  },
  {
    "question": "What does 'SELECT balance FROM accounts WHERE account_number = ? FOR UPDATE' do?",
    "shortAnswer": "It acquires an exclusive pessimistic row lock on the matching account record, blocking other concurrent transactions from modifying that account until the current transaction commits or rolls back.",
    "explanation": "Pessimistic locking to prevent race conditions during balance deductions.",
    "hint": "Acquires an exclusive row-level lock on the account record.",
    "level": "Advanced",
    "codeExample": "SELECT ... FOR UPDATE"
  }
];

export default topic3_questions;
