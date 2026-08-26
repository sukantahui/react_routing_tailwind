const topic5_questions = [
  {
    "question": "Why should TYPE_FORWARD_ONLY always be preferred over scrollable result sets when exporting massive datasets (e.g. 10 million rows)?",
    "shortAnswer": "Because forward-only result sets do not retain previously read rows in memory, allowing the JVM to stream and garbage-collect rows continuously in constant O(1) memory, preventing OutOfMemoryErrors.",
    "explanation": "Scrollable result sets buffer rows in client RAM to allow backward seeking.",
    "hint": "Streams data in constant O(1) memory without buffering history.",
    "level": "Intermediate",
    "codeExample": "conn.createStatement(ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);"
  },
  {
    "question": "How do you enable true row-by-row streaming in MySQL Connector/J with TYPE_FORWARD_ONLY?",
    "shortAnswer": "By setting stmt.setFetchSize(Integer.MIN_VALUE) on a forward-only, read-only statement.",
    "explanation": "Special MySQL Connector/J driver convention for stream processing.",
    "hint": "stmt.setFetchSize(Integer.MIN_VALUE)",
    "level": "Advanced",
    "codeExample": "stmt.setFetchSize(Integer.MIN_VALUE); // MySQL streaming trigger"
  }
];

export default topic5_questions;
