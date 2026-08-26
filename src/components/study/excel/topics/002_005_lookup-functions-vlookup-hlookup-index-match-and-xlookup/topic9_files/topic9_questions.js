const questions = [
  {
    question: "What is the advantage of INDEX-MATCH over VLOOKUP?",
    shortAnswer: "It can look left, survive column insertions, and is often faster.",
    explanation: "VLOOKUP is limited to returning values only from columns to the right. INDEX-MATCH can return from any column. It also uses MATCH to find column positions dynamically, so inserting columns doesn't break it.",
    hint: "Think of INDEX-MATCH as 'find the row, then get the value from any column'.",
    level: "basic",
    codeExample: "=INDEX(A:A, MATCH(\"Swadeep\", B:B, 0)) – returns ID from column A (left of name)."
  },
  {
    question: "What does each part of =INDEX(C:C, MATCH(E2, A:A, 0)) do?",
    shortAnswer: "MATCH finds the row of E2 in column A; INDEX returns the value from column C at that row.",
    explanation: "MATCH returns a number (e.g., 5). INDEX then takes that number as the row argument and returns the value in column C at that row.",
    hint: "Break it down: MATCH gives the position; INDEX uses that position.",
    level: "basic",
    codeExample: "If E2 = 'P103' and P103 is in row 10 of column A, MATCH returns 10, then INDEX returns C10."
  },
  {
    question: "Can INDEX-MATCH look up values from a column to the left of the lookup column?",
    shortAnswer: "Yes – that's one of its main advantages over VLOOKUP.",
    explanation: "Because INDEX can reference any column, you are not forced to place the lookup column first. MATCH finds the row, then INDEX pulls from whatever column you specify.",
    hint: "VLOOKUP can't go left; INDEX-MATCH can.",
    level: "basic",
    codeExample: "=INDEX(A2:A10, MATCH(\"Mouse\", B2:B10, 0)) – finds product ID from product name."
  },
  {
    question: "How do you perform a two‑way lookup (both row and column) with INDEX-MATCH?",
    shortAnswer: "Use two MATCH functions – one for the row, one for the column.",
    explanation: "=INDEX(data_range, MATCH(row_value, row_labels, 0), MATCH(col_value, col_labels, 0)) finds the intersection of the found row and column.",
    hint: "Think of it as coordinates: MATCH(row) gives Y, MATCH(column) gives X.",
    level: "intermediate",
    codeExample: "=INDEX(B2:E10, MATCH(\"Abhronila\", A2:A10, 0), MATCH(\"Science\", B1:E1, 0))"
  },
  {
    question: "What happens if MATCH returns #N/A inside INDEX?",
    shortAnswer: "INDEX also returns #N/A because the row number is invalid.",
    explanation: "If MATCH can't find the lookup value, it returns #N/A. INDEX cannot use #N/A as a row number, so the whole formula returns #N/A.",
    hint: "Wrap with IFERROR to handle missing values.",
    level: "basic",
    codeExample: "=IFERROR(INDEX(C:C, MATCH(E2, A:A, 0)), \"Not found\")"
  },
  {
    question: "Why might INDEX-MATCH be faster than VLOOKUP on large datasets?",
    shortAnswer: "VLOOKUP scans entire columns; INDEX-MATCH with exact match uses an optimised search.",
    explanation: "VLOOKUP with FALSE does a linear search. INDEX-MATCH with MATCH(...,0) also does a linear search, but VLOOKUP must also read the entire table range each time. In practice, INDEX-MATCH can be 10-20% faster on large data, especially if you limit ranges to specific columns.",
    hint: "Avoid whole‑column references in both functions for large data.",
    level: "advanced",
    codeExample: "Use =INDEX(C2:C100000, MATCH(E2, A2:A100000, 0)) instead of whole columns."
  },
  {
    question: "Can INDEX-MATCH be used with approximate match (like TRUE in VLOOKUP)?",
    shortAnswer: "Yes, change the match_type in MATCH to 1 (or -1).",
    explanation: "=INDEX(return_range, MATCH(lookup_value, lookup_range, 1)) performs an approximate match (requires lookup_range sorted ascending).",
    hint: "Same sorting rule applies as VLOOKUP approximate.",
    level: "intermediate",
    codeExample: "=INDEX(GradeCol, MATCH(85, ScoreCol, 1)) – returns grade for score 85."
  },
  {
    question: "How do you make INDEX-MATCH case‑sensitive?",
    shortAnswer: "Use EXACT inside MATCH as an array formula: =INDEX(return, MATCH(TRUE, EXACT(lookup_value, lookup_range), 0)).",
    explanation: "EXACT returns an array of TRUE/FALSE. MATCH(TRUE, ...) finds the position of the first TRUE. In Excel 365, this works without array entry.",
    hint: "In older Excel, press Ctrl+Shift+Enter.",
    level: "advanced",
    codeExample: "=INDEX(C:C, MATCH(TRUE, EXACT(\"Swadeep\", A:A), 0))"
  },
  {
    question: "Can INDEX-MATCH handle multiple criteria (e.g., find price where product = 'Laptop' and region = 'North')?",
    shortAnswer: "Yes, using an array formula or helper column.",
    explanation: "Use =INDEX(return, MATCH(1, (criteria1=range1)*(criteria2=range2), 0)). This multiplies boolean arrays; 1 means all criteria true.",
    hint: "In Excel 365, this works as a normal formula.",
    level: "advanced",
    codeExample: "=INDEX(D2:D100, MATCH(1, (A2:A100=\"Laptop\")*(B2:B100=\"North\"), 0))"
  },
  {
    question: "What is the typical mistake when copying INDEX-MATCH formulas?",
    shortAnswer: "Forgetting to lock ranges with $, causing the lookup range to shift.",
    explanation: "If you copy =INDEX(C2:C10, MATCH(E2, A2:A10, 0)) down, the ranges become C3:C11 and A3:A11. Use absolute references: $C$2:$C$10 and $A$2:$A$10.",
    hint: "Press F4 after selecting the range to add $ quickly.",
    level: "basic",
    codeExample: "=INDEX($C$2:$C$10, MATCH(E2, $A$2:$A$10, 0)) – safe to copy."
  },
  // Additional questions to reach 30 (pattern continues)
  {
    question: "How does INDEX-MATCH handle duplicate lookup values?",
    shortAnswer: "MATCH returns the first match (topmost), same as VLOOKUP.",
    explanation: "If duplicates exist, MATCH with match_type=0 returns the position of the first occurrence. Use XMATCH with search mode -1 to get the last.",
    hint: "Ensure lookup column has unique values for reliable results.",
    level: "intermediate",
    codeExample: "MATCH(\"John\", A:A, 0) returns the first John row."
  },
  {
    question: "What is the difference between INDEX-MATCH and XLOOKUP?",
    shortAnswer: "XLOOKUP is simpler and replaces both, but INDEX-MATCH is compatible with all Excel versions.",
    explanation: "XLOOKUP(lookup_value, lookup_range, return_range) does everything INDEX-MATCH does in one function. However, older Excel versions don't have XLOOKUP.",
    hint: "Use INDEX-MATCH for compatibility; XLOOKUP for newer workbooks.",
    level: "intermediate",
    codeExample: "XLOOKUP(E2, A:A, C:C) is equivalent to INDEX(C:C, MATCH(E2, A:A, 0))."
  },
  // ... continue to 30
];

export default questions;