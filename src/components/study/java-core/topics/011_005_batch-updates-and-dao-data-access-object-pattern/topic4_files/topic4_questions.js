const topic4_questions = [
  {
    "question": "What does PreparedStatement.clearBatch() do?",
    "shortAnswer": "It removes all buffered statements and parameter sets currently queued in the Statement's batch list, resetting the batch buffer to an empty state.",
    "explanation": "Frees statement memory and discards queued commands.",
    "hint": "Empties the queued statement batch buffer.",
    "level": "Beginner",
    "codeExample": "pstmt.clearBatch(); // Clears all buffered batch commands"
  },
  {
    "question": "Why should clearBatch() be called inside the catch block when a batch operation fails?",
    "shortAnswer": "To ensure that failed or unexecuted parameter sets remaining in the driver's memory buffer are discarded before reusing the PreparedStatement, preventing accidental re-execution of corrupt statements.",
    "explanation": "Prevents buffer pollution across retry attempts.",
    "hint": "Prevents re-executing corrupt or failed commands when the statement is reused.",
    "level": "Intermediate",
    "codeExample": "catch(SQLException e) { pstmt.clearBatch(); conn.rollback(); }"
  }
];

export default topic4_questions;
