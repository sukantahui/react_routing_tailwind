const topic16_questions = [
  {
    "question": "What integer constant represents TRANSACTION_READ_COMMITTED in java.sql.Connection?",
    "shortAnswer": "2 (Connection.TRANSACTION_READ_COMMITTED == 2).",
    "explanation": "Standard JDBC isolation constant value.",
    "hint": "2",
    "level": "Beginner",
    "codeExample": "int level = Connection.TRANSACTION_READ_COMMITTED; // 2"
  },
  {
    "question": "What is the default isolation level in PostgreSQL and Oracle vs MySQL InnoDB?",
    "shortAnswer": "PostgreSQL and Oracle default to TRANSACTION_READ_COMMITTED. MySQL InnoDB defaults to TRANSACTION_REPEATABLE_READ.",
    "explanation": "Essential knowledge when migrating enterprise database schemas.",
    "hint": "Postgres/Oracle = READ COMMITTED; MySQL InnoDB = REPEATABLE READ.",
    "level": "Intermediate",
    "codeExample": "PostgreSQL: READ COMMITTED | MySQL: REPEATABLE READ"
  }
];

export default topic16_questions;
