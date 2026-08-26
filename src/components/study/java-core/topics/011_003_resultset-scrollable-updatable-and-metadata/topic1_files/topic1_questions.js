const topic1_questions = [
  {
    "question": "What does rs.getRow() return when the cursor is positioned on the third row of the ResultSet?",
    "shortAnswer": "3 (Row numbering is 1-based in JDBC).",
    "explanation": "Returns 0 if the cursor is before the first row or after the last row.",
    "hint": "3 (1-based row numbering).",
    "level": "Beginner",
    "codeExample": "rs.next(); rs.next(); rs.next(); System.out.println(rs.getRow()); // 3"
  },
  {
    "question": "How do you check if a query designed to fetch a single unique primary key found a matching record?",
    "shortAnswer": "Using an 'if (rs.next())' statement. If true, read the column values; if false, handle the record-not-found case.",
    "explanation": "Standard pattern for unique primary key lookups.",
    "hint": "Use if (rs.next()) for single-row lookups.",
    "level": "Beginner",
    "codeExample": "if (rs.next()) { return mapRow(rs); } else { throw new StudentNotFoundException(); }"
  }
];

export default topic1_questions;
