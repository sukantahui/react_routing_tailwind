const topic9_questions = [
  {
    "question": "Why should catch blocks in transaction managers catch general Exception rather than only SQLException?",
    "shortAnswer": "Because a business logic exception (such as NullPointerException, IllegalArgumentException, or a custom DomainException) could be thrown after database updates have executed. If only SQLException is caught, the transaction would remain un-rolled-back in an inconsistent state.",
    "explanation": "Ensures rollback is triggered on all failure conditions.",
    "hint": "Prevents business logic runtime exceptions from leaving uncommitted transactions hanging.",
    "level": "Intermediate",
    "codeExample": "catch (Exception e) { conn.rollback(); throw e; }"
  },
  {
    "question": "What internal database structure does the database engine use to undo changes during a rollback?",
    "shortAnswer": "The Undo Log (or Rollback Segment), which records the inverse operations needed to restore original data values.",
    "explanation": "Maintains before-images of modified data blocks.",
    "hint": "Undo Log (Rollback Segment).",
    "level": "Intermediate",
    "codeExample": "Database Undo Log restores pre-image data pages."
  }
];

export default topic9_questions;
