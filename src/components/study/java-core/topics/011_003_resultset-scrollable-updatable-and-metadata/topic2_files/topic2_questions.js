const topic2_questions = [
  {
    "question": "If a query is written as 'SELECT s.student_name AS full_name FROM students s', what string should be passed to rs.getString()?",
    "shortAnswer": "rs.getString('full_name') (Column label aliases take precedence when retrieving data by name).",
    "explanation": "JDBC specifies that getColumnLabel() aliases match named getters.",
    "hint": "Use the alias name: 'full_name'.",
    "level": "Beginner",
    "codeExample": "rs.getString('full_name');"
  },
  {
    "question": "What is the primary risk of using 1-based column indices (e.g. rs.getString(1)) in enterprise applications?",
    "shortAnswer": "High code fragility. If a developer refactors the SQL query by adding, removing, or reordering columns in the SELECT clause, the numeric indices will point to wrong columns, causing silent data corruption or ClassCastExceptions at runtime.",
    "explanation": "Named column getters are immune to column order refactoring.",
    "hint": "Query refactoring or column reordering causes silent data corruption or type errors.",
    "level": "Intermediate",
    "codeExample": "SELECT name, id -> rs.getInt(1) fails because index 1 is now name."
  }
];

export default topic2_questions;
