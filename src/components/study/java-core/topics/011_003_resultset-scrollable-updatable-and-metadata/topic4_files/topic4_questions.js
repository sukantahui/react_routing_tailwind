const topic4_questions = [
  {
    "question": "What are the default ResultSet type and concurrency modes if not explicitly specified when creating a Statement?",
    "shortAnswer": "ResultSet.TYPE_FORWARD_ONLY and ResultSet.CONCUR_READ_ONLY.",
    "explanation": "Provides the highest performance and lowest memory footprint.",
    "hint": "TYPE_FORWARD_ONLY and CONCUR_READ_ONLY.",
    "level": "Beginner",
    "codeExample": "conn.createStatement(); // Defaults to TYPE_FORWARD_ONLY, CONCUR_READ_ONLY"
  },
  {
    "question": "What happens if you attempt to call rs.previous() on a ResultSet created with the default TYPE_FORWARD_ONLY setting?",
    "shortAnswer": "The JDBC driver throws a java.sql.SQLException because backward navigation is not supported on forward-only cursors.",
    "explanation": "Must configure TYPE_SCROLL_INSENSITIVE or TYPE_SCROLL_SENSITIVE to enable backward navigation.",
    "hint": "Throws java.sql.SQLException because backward navigation is disabled.",
    "level": "Beginner",
    "codeExample": "rs.previous(); // Throws SQLException on TYPE_FORWARD_ONLY"
  }
];

export default topic4_questions;
