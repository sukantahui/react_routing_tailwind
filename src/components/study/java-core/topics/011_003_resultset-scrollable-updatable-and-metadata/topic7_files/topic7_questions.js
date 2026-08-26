const topic7_questions = [
  {
    "question": "How does a TYPE_SCROLL_SENSITIVE ResultSet differ from TYPE_SCROLL_INSENSITIVE?",
    "shortAnswer": "TYPE_SCROLL_SENSITIVE dynamically reflects updates and deletions made to the underlying database rows by concurrent transactions while the ResultSet remains open, whereas TYPE_SCROLL_INSENSITIVE displays a static snapshot taken at query execution time.",
    "explanation": "Requires database server lock/keyset cursor support.",
    "hint": "Reflects live concurrent updates and deletions made to the database.",
    "level": "Intermediate",
    "codeExample": "conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);"
  },
  {
    "question": "What method on DatabaseMetaData checks if the connected database driver supports sensitive scrollable cursors?",
    "shortAnswer": "meta.supportsResultSetType(ResultSet.TYPE_SCROLL_SENSITIVE)",
    "explanation": "Many drivers (like SQLite) only support TYPE_FORWARD_ONLY.",
    "hint": "meta.supportsResultSetType(ResultSet.TYPE_SCROLL_SENSITIVE)",
    "level": "Advanced",
    "codeExample": "boolean ok = conn.getMetaData().supportsResultSetType(ResultSet.TYPE_SCROLL_SENSITIVE);"
  }
];

export default topic7_questions;
