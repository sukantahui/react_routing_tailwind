const topic6_questions = [
  {
    "question": "How do you jump directly to the last row of a scrollable ResultSet and obtain the total number of rows returned?",
    "shortAnswer": "Call rs.last() to move the cursor to the final row, and then call rs.getRow() to obtain the total row count.",
    "explanation": "Standard pattern for calculating row counts in desktop GUI tables.",
    "hint": "Call rs.last() followed by rs.getRow().",
    "level": "Intermediate",
    "codeExample": "if (rs.last()) { int total = rs.getRow(); }"
  },
  {
    "question": "What happens if you pass a negative integer to rs.absolute(int row), such as rs.absolute(-1)?",
    "shortAnswer": "The cursor positions itself relative to the end of the ResultSet: -1 moves to the last row, -2 moves to the second-to-last row, and so forth.",
    "explanation": "Negative indices provide backward absolute positioning.",
    "hint": "-1 positions the cursor on the last row of the result set.",
    "level": "Intermediate",
    "codeExample": "rs.absolute(-1); // Positions on the last row"
  }
];

export default topic6_questions;
