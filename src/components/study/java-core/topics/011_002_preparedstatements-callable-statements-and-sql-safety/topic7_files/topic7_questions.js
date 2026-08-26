const topic7_questions = [
  {
    "question": "What integer value does pstmt.executeUpdate() return when an UPDATE or DELETE query matches zero rows in the database?",
    "shortAnswer": "It returns 0, indicating that the query executed successfully on the database server, but zero rows met the WHERE condition criteria.",
    "explanation": "Does not throw an exception; returns 0 rows affected.",
    "hint": "Returns 0.",
    "level": "Beginner",
    "codeExample": "int rows = pstmt.executeUpdate(); // 0 if no matching records found"
  },
  {
    "question": "Why should each CRUD method encapsulate its PreparedStatement inside a try-with-resources statement?",
    "shortAnswer": "To guarantee that the PreparedStatement is closed immediately upon completing the operation, preventing statement handle leaks in the underlying database connection.",
    "explanation": "Ensures prompt statement resource deallocation.",
    "hint": "Guarantees PreparedStatement closure and prevents statement handle leaks.",
    "level": "Beginner",
    "codeExample": "try (PreparedStatement ps = conn.prepareStatement(sql)) { ... }"
  }
];

export default topic7_questions;
