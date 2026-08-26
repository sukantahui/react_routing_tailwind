const topic12_questions = [
  {
    "question": "How do you obtain the DatabaseMetaData instance for an active connection?",
    "shortAnswer": "conn.getMetaData()",
    "explanation": "Factory method on java.sql.Connection.",
    "hint": "conn.getMetaData()",
    "level": "Beginner",
    "codeExample": "DatabaseMetaData meta = conn.getMetaData();"
  },
  {
    "question": "How do you discover all primary key column names of a specific table using DatabaseMetaData?",
    "shortAnswer": "By calling meta.getPrimaryKeys(catalog, schemaPattern, tableName), which returns a ResultSet where each row represents a primary key column with the column name in 'COLUMN_NAME'.",
    "explanation": "Crucial for automated ORM schema reverse engineering.",
    "hint": "meta.getPrimaryKeys(null, null, tableName)",
    "level": "Intermediate",
    "codeExample": "ResultSet pks = meta.getPrimaryKeys(null, null, 'students');"
  }
];

export default topic12_questions;
