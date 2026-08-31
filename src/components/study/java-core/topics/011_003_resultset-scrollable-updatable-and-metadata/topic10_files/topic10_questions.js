const topic10_questions = [
  {
    "question": "What is the difference between meta.getColumnLabel(i) and meta.getColumnName(i) in ResultSetMetaData?",
    "shortAnswer": "getColumnName(i) returns the underlying physical table column name, whereas getColumnLabel(i) returns the SQL alias name provided in the query (e.g. 'AS full_name') or default display header.",
    "explanation": "Always use getColumnLabel() when printing dynamic tables or exporting CSVs.",
    "hint": "getColumnLabel() returns the SQL alias (AS alias); getColumnName() returns the table column name.",
    "level": "Intermediate",
    "codeExample": "SELECT s_name AS student_name → getColumnLabel returns 'student_name'."
  },
  {
    "question": "How do you obtain the total number of columns in a dynamic query result?",
    "shortAnswer": "rs.getMetaData().getColumnCount()",
    "explanation": "Essential for iterating dynamic result set columns.",
    "hint": "meta.getColumnCount()",
    "level": "Beginner",
    "codeExample": "int numCols = rs.getMetaData().getColumnCount();"
  }
];

export default topic10_questions;
