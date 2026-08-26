const topic3_questions = [
  {
    "question": "What value is returned by rs.getInt('scholarship') if the database column contains a SQL NULL value?",
    "shortAnswer": "0 (Java primitives cannot be null, so JDBC getters default to primitive zero/false).",
    "explanation": "Must use rs.wasNull() to differentiate between genuine 0 and SQL NULL.",
    "hint": "Returns 0.",
    "level": "Beginner",
    "codeExample": "int val = rs.getInt('col'); if (rs.wasNull()) { /* genuine null */ }"
  },
  {
    "question": "How can you read a nullable integer column directly as an Integer object without calling rs.wasNull() in JDBC 4.1+?",
    "shortAnswer": "By calling rs.getObject(columnLabel, Integer.class) (e.g. Integer score = rs.getObject('score', Integer.class)), which returns null natively if the SQL column is NULL.",
    "explanation": "Introduced in JDBC 4.1 for clean type conversion.",
    "hint": "rs.getObject(columnLabel, Integer.class)",
    "level": "Intermediate",
    "codeExample": "Integer score = rs.getObject('score', Integer.class);"
  }
];

export default topic3_questions;
