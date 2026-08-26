const topic4_questions = [
  {
    "question": "How does sorting account numbers before acquiring locks prevent deadlocks during concurrent reciprocal transfers (A->B and B->A)?",
    "shortAnswer": "By always acquiring locks in a globally consistent order (e.g. Account A then Account B), neither thread can ever hold one lock while waiting for the other in reverse order, breaking the circular wait condition necessary for deadlocks.",
    "explanation": "Standard resource hierarchy deadlock prevention technique.",
    "hint": "Breaks circular wait condition by imposing a global lock acquisition order.",
    "level": "Advanced",
    "codeExample": "String first = accA.compareTo(accB) < 0 ? accA : accB;"
  },
  {
    "question": "What must always be called in the catch block of a multi-statement JDBC financial transaction?",
    "shortAnswer": "conn.rollback() to undo all intermediate uncommitted operations and restore the database to its pristine pre-transaction state.",
    "explanation": "Ensures the Atomicity property of ACID.",
    "hint": "conn.rollback() to revert partial writes.",
    "level": "Beginner",
    "codeExample": "catch (SQLException e) { conn.rollback(); }"
  }
];

export default topic4_questions;
