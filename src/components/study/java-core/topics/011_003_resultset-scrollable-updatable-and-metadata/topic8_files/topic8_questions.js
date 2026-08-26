const topic8_questions = [
  {
    "question": "What crucial method must be called after rs.updateDouble('score', 95.0) to actually commit the change to the database table?",
    "shortAnswer": "rs.updateRow() (Calling rs.updateXxx() only modifies the in-memory row buffer; rs.updateRow() issues the SQL UPDATE to the database server).",
    "explanation": "Moving to another row without calling updateRow() discards the changes.",
    "hint": "rs.updateRow()",
    "level": "Beginner",
    "codeExample": "rs.updateDouble('score', 95.0); rs.updateRow();"
  },
  {
    "question": "Why must the SELECT query include the primary key column when using CONCUR_UPDATABLE?",
    "shortAnswer": "Because the JDBC driver requires the primary key column to generate the underlying SQL 'WHERE primary_key = ?' clause when executing rs.updateRow() or rs.deleteRow().",
    "explanation": "Without a unique primary key, the driver cannot uniquely identify which row to mutate.",
    "hint": "The driver needs the primary key to generate the WHERE clause for updateRow().",
    "level": "Intermediate",
    "codeExample": "SELECT student_id, name, score FROM students"
  }
];

export default topic8_questions;
