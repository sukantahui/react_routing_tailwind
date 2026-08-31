const topic3_questions = [
  {
    "question": "What operations does the database engine perform during the prepareStatement() call before executeQuery() is invoked?",
    "shortAnswer": "The database parses SQL syntax, verifies schema objects and user permissions, optimizes the query execution plan (index selection), and stores the pre-compiled plan in the server's Statement Plan Cache.",
    "explanation": "Pre-compiles the query structure prior to receiving parameter data.",
    "hint": "Parses syntax, checks permissions, generates execution plan, and caches it.",
    "level": "Intermediate",
    "codeExample": "conn.prepareStatement(sql) → Generates & caches DB execution plan."
  },
  {
    "question": "Why does re-executing the same PreparedStatement inside a loop with different parameter values provide a massive performance boost?",
    "shortAnswer": "Because the database avoids repeating expensive SQL string parsing, AST generation, and query plan optimization for every iteration, reusing the pre-compiled execution plan with only the new parameter values.",
    "explanation": "Drastically reduces database CPU and latency.",
    "hint": "Reuses the cached query execution plan across all loop iterations.",
    "level": "Beginner",
    "codeExample": "for (Student s : list) { pstmt.setInt(1, s.id); pstmt.executeUpdate(); }"
  }
];

export default topic3_questions;
