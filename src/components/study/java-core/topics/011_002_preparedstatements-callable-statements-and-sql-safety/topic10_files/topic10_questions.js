const topic10_questions = [
  {
    "question": "What method must be invoked to register a parameter as an OUT parameter on a CallableStatement before execution?",
    "shortAnswer": "cstmt.registerOutParameter(int parameterIndex, int sqlType), using the type constants from java.sql.Types.",
    "explanation": "Tells JDBC driver which SQL data type to expect when reading output buffers.",
    "hint": "cstmt.registerOutParameter(index, Types.SQL_TYPE)",
    "level": "Beginner",
    "codeExample": "cstmt.registerOutParameter(2, java.sql.Types.INTEGER);"
  },
  {
    "question": "How do you handle an INOUT parameter in CallableStatement?",
    "shortAnswer": "You must call both setXxx(index, value) (to provide the input value) and registerOutParameter(index, sqlType) (to declare the expected output type) on the exact same parameter index before calling execute().",
    "explanation": "Allows a single parameter to pass data into the procedure and receive updated data back.",
    "hint": "Call both setXxx() and registerOutParameter() on the same index.",
    "level": "Intermediate",
    "codeExample": "cs.setInt(1, 50); cs.registerOutParameter(1, Types.INTEGER); cs.execute(); int res = cs.getInt(1);"
  }
];

export default topic10_questions;
