const topic0_questions = [
  {
    "question": "Where is the ResultSet cursor positioned immediately after executeQuery() returns?",
    "shortAnswer": "Positioned BEFORE the first row (in the 'before-first' position). You must call rs.next() at least once to move the cursor onto the first valid row of data.",
    "explanation": "Attempting to call rs.getString() before calling rs.next() throws SQLException: Before start of result set.",
    "hint": "Positioned before the first row; requires calling rs.next() to advance.",
    "level": "Beginner",
    "codeExample": "ResultSet rs = stmt.executeQuery(); while (rs.next()) { ... }"
  },
  {
    "question": "What does rs.setFetchSize(int rows) do?",
    "shortAnswer": "It gives the JDBC driver a hint as to how many rows to fetch across the network from the database server in a single round-trip batch, optimizing network I/O and RAM usage for large queries.",
    "explanation": "Crucial for processing millions of rows without OutOfMemoryError.",
    "hint": "Controls the batch size of rows fetched per network round-trip.",
    "level": "Intermediate",
    "codeExample": "pstmt.setFetchSize(100); // Fetch 100 rows per network packet"
  }
];

export default topic0_questions;
