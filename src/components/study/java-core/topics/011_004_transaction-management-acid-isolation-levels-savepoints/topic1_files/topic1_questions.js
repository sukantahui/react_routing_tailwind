const topic1_questions = [
  {
    "question": "What does the acronym ACID stand for in database transaction management?",
    "shortAnswer": "Atomicity, Consistency, Isolation, and Durability.",
    "explanation": "The universal benchmark for relational database reliability.",
    "hint": "Atomicity, Consistency, Isolation, Durability.",
    "level": "Beginner",
    "codeExample": "ACID = Atomicity + Consistency + Isolation + Durability"
  },
  {
    "question": "Which of the ACID properties is directly controlled in JDBC by setting the Transaction Isolation Level?",
    "shortAnswer": "Isolation (via connection.setTransactionIsolation(level)).",
    "explanation": "Controls the visibility of uncommitted and concurrently committed changes.",
    "hint": "Isolation.",
    "level": "Beginner",
    "codeExample": "conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);"
  }
];

export default topic1_questions;
