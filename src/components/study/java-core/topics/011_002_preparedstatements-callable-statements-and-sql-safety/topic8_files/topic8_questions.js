const topic8_questions = [
  {
    "question": "What parameter must be passed to conn.prepareStatement() to enable auto-generated primary key retrieval?",
    "shortAnswer": "Statement.RETURN_GENERATED_KEYS (e.g. conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)).",
    "explanation": "Informs the driver to return server-generated identity keys.",
    "hint": "Statement.RETURN_GENERATED_KEYS",
    "level": "Beginner",
    "codeExample": "PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);"
  },
  {
    "question": "Why is calling 'SELECT MAX(id)' after an insert dangerous in multi-threaded production environments?",
    "shortAnswer": "Because in a concurrent system, another thread or process could insert a newer record between your INSERT and your SELECT, returning another user's generated ID (a critical race condition bug).",
    "explanation": "getGeneratedKeys() is scoped strictly to the current connection session.",
    "hint": "Causes race conditions with concurrent transactions returning the wrong ID.",
    "level": "Intermediate",
    "codeExample": "Anti-pattern: SELECT MAX(id) FROM students;"
  }
];

export default topic8_questions;
