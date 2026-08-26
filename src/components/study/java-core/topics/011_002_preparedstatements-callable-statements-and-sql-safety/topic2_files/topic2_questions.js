const topic2_questions = [
  {
    "question": "What index number corresponds to the first parameter placeholder (?) in a PreparedStatement?",
    "shortAnswer": "Index 1 (JDBC parameters use 1-based indexing, not 0-based indexing).",
    "explanation": "Passing 0 causes java.sql.SQLException: Parameter index out of range.",
    "hint": "Index 1 (1-based indexing).",
    "level": "Beginner",
    "codeExample": "pstmt.setString(1, 'Swadeep'); // 1st placeholder is index 1"
  },
  {
    "question": "Why does PreparedStatement prevent SQL injection even if an attacker passes malicious characters like quotes or boolean operators?",
    "shortAnswer": "Because the SQL query template is pre-compiled by the database engine before parameter values are sent. Parameter values are sent separately as pure literal data values over the binary wire protocol and are never evaluated as SQL command syntax.",
    "explanation": "Separation of command syntax from data values.",
    "hint": "The database pre-compiles query structure separately from data values.",
    "level": "Intermediate",
    "codeExample": "pstmt.setString(1, 'admin' OR '1'='1'); // Treated literally as a username string!"
  }
];

export default topic2_questions;
