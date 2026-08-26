const topic4_questions = [
  {
    "question": "How do you bind a SQL NULL value into a PreparedStatement parameter placeholder?",
    "shortAnswer": "Using the pstmt.setNull(int parameterIndex, int sqlType) method, passing the parameter index and the corresponding constant from java.sql.Types (e.g. pstmt.setNull(3, Types.VARCHAR)).",
    "explanation": "Ensures database engines correctly bind NULL to strongly typed columns.",
    "hint": "pstmt.setNull(index, Types.TYPE_CONSTANT)",
    "level": "Beginner",
    "codeExample": "pstmt.setNull(2, java.sql.Types.VARCHAR);"
  },
  {
    "question": "What happens if you bind a java.time.Instant or LocalDateTime to a JDBC parameter in modern JDBC 4.2+?",
    "shortAnswer": "JDBC 4.2 introduced direct support for java.time types using pstmt.setObject(index, localDateTime), eliminating the need to manually convert to java.sql.Timestamp.",
    "explanation": "Modern JDBC 4.2+ natively understands JSR-310 java.time API.",
    "hint": "pstmt.setObject(index, localDateTime)",
    "level": "Intermediate",
    "codeExample": "pstmt.setObject(1, LocalDateTime.now());"
  }
];

export default topic4_questions;
