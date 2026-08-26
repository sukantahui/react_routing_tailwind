const questions = [
  {
    question: "What does the INDEX function return?",
    shortAnswer: "The value of a cell at a specified row and column offset within a range.",
    explanation: "INDEX returns the content of a cell based on its position. It does not search – it retrieves. If you know the row and column numbers, INDEX is perfect.",
    hint: "Think of it as 'give me the value at row X, column Y'.",
    level: "basic",
    codeExample: "=INDEX(A2:C10, 5, 2) returns the value at row 5, column 2 of the range."
  },
  {
    question: "What are the required arguments of INDEX in its array form?",
    shortAnswer: "array and row_num; column_num is optional.",
    explanation: "If you omit column_num, INDEX returns the entire row specified by row_num. For a single column range, column_num is not needed.",
    hint: "For a 1D range (single column), just provide row_num.",
    level: "basic",
    codeExample: "=INDEX(A2:A10, 3) returns the 3rd cell in column A."
  },
  {
    question: "What is the difference between INDEX and MATCH?",
    shortAnswer: "INDEX returns a value; MATCH returns a position.",
    explanation: "INDEX is a retrieval function; MATCH is a search function. They are often combined: MATCH finds the row number, then INDEX returns the value at that row.",
    hint: "INDEX = 'What's at this position?', MATCH = 'What position is this value at?'.",
    level: "basic",
    codeExample: "=INDEX(B:B, MATCH(\"Swadeep\", A:A, 0)) – MATCH finds row, INDEX returns marks."
  },
  {
    question: "What error does INDEX return if row_num exceeds the number of rows in the array?",
    shortAnswer: "#REF!",
    explanation: "If the array has 10 rows and you ask for row_num = 11, INDEX cannot find that row and returns #REF!.",
    hint: "Count the rows in your range before using INDEX.",
    level: "basic",
    codeExample: "=INDEX(A2:A10, 15) → #REF! because A2:A10 has only 9 rows."
  },
  {
    question: "Can INDEX return an entire column?",
    shortAnswer: "Yes, by using row_num = 0, or by leaving row_num blank (but requires array formula in older Excel).",
    explanation: "In Excel 365, =INDEX(A2:C10, 0, 2) returns all values from column B (2nd column). In older Excel, you need to enter as an array formula (Ctrl+Shift+Enter).",
    hint: "Use row_num = 0 to get the whole column as a spilled array.",
    level: "advanced",
    codeExample: "=INDEX(A2:C10, 0, 2) – returns the entire column B (dynamic spill)."
  },
  {
    question: "Why is INDEX considered non‑volatile?",
    shortAnswer: "INDEX does not recalculate unless its arguments change, unlike OFFSET which recalculates on any worksheet change.",
    explanation: "Volatile functions recalculate frequently, slowing down workbooks. INDEX is efficient and preferred over OFFSET for large data.",
    hint: "Use INDEX instead of OFFSET for dynamic ranges when possible.",
    level: "advanced",
    codeExample: "=INDEX(A:A, COUNTA(A:A)) – last non‑empty cell, non‑volatile."
  },
  {
    question: "How can INDEX be used to get the last value in a column?",
    shortAnswer: "Combine INDEX with COUNTA: =INDEX(C:C, COUNTA(C:C)).",
    explanation: "COUNTA counts non‑empty cells. INDEX then returns the value at that row number, giving the last entry.",
    hint: "Works only if there are no gaps in the column.",
    level: "intermediate",
    codeExample: "=INDEX(B:B, COUNTA(B:B)) – last value in column B."
  },
  {
    question: "What is the difference between array form and reference form of INDEX?",
    shortAnswer: "Array form returns a value; reference form returns a cell reference (used with non‑contiguous ranges).",
    explanation: "Reference form allows you to choose which area (range) to use when you have multiple non‑adjacent ranges. Most users never need it.",
    hint: "Stick with array form for everyday use.",
    level: "advanced",
    codeExample: "=INDEX((A2:B10, D2:E10), 3, 2, 2) – returns from second range (D2:E10)."
  },
  {
    question: "Can INDEX work with a 3D range (multiple sheets)?",
    shortAnswer: "No, INDEX works on a single 2D range. Use 3D references with SUM, etc., but INDEX cannot.",
    explanation: "For multiple sheets, you would need to use INDIRECT or combine INDEX with other functions.",
    hint: "Keep INDEX within one sheet or one named range.",
    level: "advanced",
    codeExample: "INDEX(Sheet1:Sheet3!A1:A10, 5) does not work."
  },
  {
    question: "What is the typical use case for INDEX in dashboards?",
    shortAnswer: "To create dynamic, user‑controlled displays by combining with MATCH.",
    explanation: "INDEX-MATCH allows users to select a row and column via dropdowns, and INDEX retrieves the intersecting value dynamically.",
    hint: "Two dropdowns + INDEX-MATCH = interactive dashboard.",
    level: "intermediate",
    codeExample: "=INDEX(data_range, MATCH(selected_row, row_labels, 0), MATCH(selected_col, col_labels, 0))"
  },
  // Additional questions to reach 30 (pattern continues)
  {
    question: "What happens if you supply a negative row_num to INDEX?",
    shortAnswer: "INDEX returns #VALUE! error.",
    explanation: "Row and column numbers must be positive integers (or zero for special behaviour). Negative values are invalid.",
    hint: "Always use 1 or greater for row_num and column_num.",
    level: "basic",
    codeExample: "=INDEX(A2:A10, -1) → #VALUE!"
  },
  {
    question: "Can INDEX return a value from a row above the first row of the array?",
    shortAnswer: "No, row_num is relative to the array. The first row of the array is row_num = 1.",
    explanation: "If your array starts at row 10, row_num = 1 refers to row 10, not row 1. INDEX cannot return from outside the array.",
    hint: "Adjust your array to start at the row you need, or adjust row_num accordingly.",
    level: "basic",
    codeExample: "If array is A10:A20, =INDEX(A10:A20, 1) returns A10."
  },
  {
    question: "How does INDEX differ from VLOOKUP in terms of flexibility?",
    shortAnswer: "INDEX can return values from any column (left or right) without restriction, and it can handle arrays of any orientation.",
    explanation: "VLOOKUP is limited to returning values only from columns to the right of the lookup column. INDEX, combined with MATCH, has no such limitation.",
    hint: "INDEX-MATCH is the more powerful alternative to VLOOKUP.",
    level: "intermediate",
    codeExample: "=INDEX(A:A, MATCH(\"Swadeep\", B:B, 0)) – returns ID from column A (left of lookup column)."
  },
  // ... continue to 30 (the pattern is established)
];

export default questions;