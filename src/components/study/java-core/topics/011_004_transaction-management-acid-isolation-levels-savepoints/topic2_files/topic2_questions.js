const topic2_questions = [
  {
    "question": "How is Atomicity achieved in JDBC application code?",
    "shortAnswer": "By calling connection.setAutoCommit(false) before executing operations, calling connection.commit() when all statements succeed, and calling connection.rollback() inside the catch block if an exception occurs.",
    "explanation": "Ensures no partial updates are committed to the database.",
    "hint": "setAutoCommit(false) → execute statements → commit() / rollback().",
    "level": "Beginner",
    "codeExample": "conn.setAutoCommit(false); try { ... conn.commit(); } catch(e) { conn.rollback(); }"
  },
  {
    "question": "What happens if a developer forgets to call conn.rollback() in the catch block when auto-commit is disabled?",
    "shortAnswer": "The connection retains uncommitted locks on database rows. When the connection is returned to the pool or re-used, subsequent transactions might accidentally commit the aborted changes or block other threads due to unreleased row locks.",
    "explanation": "Always invoke rollback() in catch blocks to release locks.",
    "hint": "Leaves database row locks active and risks dirty commits on subsequent queries.",
    "level": "Intermediate",
    "codeExample": "catch (SQLException e) { conn.rollback(); throw e; }"
  }
];

export default topic2_questions;
