const topic2_questions = [
  {
    "question": "What does PreparedStatement.executeBatch() return upon successful execution?",
    "shortAnswer": "An integer array (int[]) containing the number of rows affected by each individual statement in the batch.",
    "explanation": "Each element corresponds to one statement in the batch sequence.",
    "hint": "An array of integer update counts (int[]).",
    "level": "Beginner",
    "codeExample": "int[] results = pstmt.executeBatch();"
  },
  {
    "question": "What does the constant Statement.SUCCESS_NO_INFO (-2) mean in the int[] returned by executeBatch()?",
    "shortAnswer": "It indicates that the command executed successfully on the database server, but the server or driver does not provide the exact count of modified rows.",
    "explanation": "Common when MySQL rewrites batch inserts into multi-value statements.",
    "hint": "The statement executed successfully, but affected row count is unavailable.",
    "level": "Intermediate",
    "codeExample": "if (results[i] == Statement.SUCCESS_NO_INFO) { /* Success */ }"
  }
];

export default topic2_questions;
