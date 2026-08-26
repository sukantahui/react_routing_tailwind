const topic9_questions = [
  {
    "question": "What is the standard JDBC escape syntax used to invoke a database stored procedure with CallableStatement?",
    "shortAnswer": "{call procedure_name(?, ?, ...)}",
    "explanation": "The curly braces indicate standard JDBC escape syntax translated by vendor drivers.",
    "hint": "{call procedure_name(?, ?)}",
    "level": "Beginner",
    "codeExample": "CallableStatement cs = conn.prepareCall('{call enroll_student(?, ?)}');"
  },
  {
    "question": "How do you invoke a database stored Function that returns a value using CallableStatement?",
    "shortAnswer": "Using the syntax '{? = call function_name(?)}', where the first placeholder (?) represents the return value registered as an OUT parameter.",
    "explanation": "Register placeholder 1 via registerOutParameter() to capture the function return value.",
    "hint": "{? = call function_name(?)}",
    "level": "Intermediate",
    "codeExample": "cstmt = conn.prepareCall('{? = call get_discount(?)}'); cstmt.registerOutParameter(1, Types.DOUBLE);"
  }
];

export default topic9_questions;
