const questions = [
  {
    question: "What is the syntax of AVERAGEIF?",
    shortAnswer: "AVERAGEIF(range, criteria, [average_range])",
    explanation: "range is evaluated against criteria; average_range (optional) specifies which cells to average. If omitted, range itself is averaged.",
    level: "basic",
    codeExample: "=AVERAGEIF(A1:A10, \">80\")"
  },
  {
    question: "What does AVERAGEIF return if no cells meet the criteria?",
    shortAnswer: "#DIV/0! error",
    explanation: "Unlike SUMIF which returns 0, AVERAGEIF returns division by zero because there are no values to average.",
    level: "basic",
    codeExample: "=AVERAGEIF(A:A, \"Zebra\", B:B) → #DIV/0!"
  },
  {
    question: "How to average values in column B where column A equals \"Rice\"?",
    shortAnswer: "=AVERAGEIF(A:A, \"Rice\", B:B)",
    explanation: "A:A is the criteria range, \"Rice\" is the condition, B:B is the average range.",
    level: "basic",
    codeExample: "=AVERAGEIF(Product, \"Rice\", Sales)"
  },
  {
    question: "Can AVERAGEIF be used with numeric operators like greater than?",
    shortAnswer: "Yes, e.g., =AVERAGEIF(A:A, \">100\", B:B)",
    explanation: "Operators must be inside double quotes: \">100\". For cell references: \">\"&amp;C1.",
    level: "intermediate",
    codeExample: "=AVERAGEIF(Sales, \">\"&D1, Profit)"
  },
  {
    question: "What happens if you omit average_range in AVERAGEIF?",
    shortAnswer: "Excel averages the range itself (the same range used for criteria).",
    explanation: "So =AVERAGEIF(A:A, \">50\") averages numbers greater than 50 in column A.",
    level: "basic",
    codeExample: "Useful for simple conditions on the same column."
  },
  {
    question: "Is AVERAGEIF case-sensitive?",
    shortAnswer: "No, it treats \"Apple\", \"apple\", \"APPLE\" the same.",
    explanation: "For case‑sensitive, use array formula with EXACT inside AVERAGE.",
    level: "intermediate",
    codeExample: "=AVERAGE(IF(EXACT(A1:A10,\"Apple\"), B1:B10))"
  },
  {
    question: "How to average cells that contain any text (not numbers) in the criteria range?",
    shortAnswer: "=AVERAGEIF(range, \"*\", average_range) averages where range contains any text (including numbers stored as text).",
    explanation: "The * wildcard matches any text. It does not match pure numbers.",
    level: "advanced",
    codeExample: "=AVERAGEIF(Product, \"*\", Sales) averages sales for all products (non‑blank text)."
  },
  {
    question: "What error does AVERAGEIF return if average_range contains no numbers?",
    shortAnswer: "#DIV/0! because there are no numbers to average (even if criteria are satisfied, if average_range has only text/blanks, result is #DIV/0!).",
    explanation: "AVERAGEIF ignores text/blanks in average_range, so if all cells in the filtered set are non‑numeric, it returns the error.",
    level: "advanced",
    codeExample: "Check that average_range contains numbers."
  },
  {
    question: "Can you use AVERAGEIF with dates?",
    shortAnswer: "Yes, dates are numbers. Example: =AVERAGEIF(DateRange, \">\"&DATE(2025,1,1), Sales)",
    explanation: "Use operators with date serial numbers or DATE function.",
    level: "intermediate",
    codeExample: "Average sales after Jan 1, 2025."
  },
  {
    question: "How to average numbers greater than the value in cell E1?",
    shortAnswer: "=AVERAGEIF(range, \">\"&E1, average_range)",
    explanation: "Concatenate the operator with the cell reference using &.",
    level: "intermediate",
    codeExample: "=AVERAGEIF(A:A, \">\"&B1, C:C)"
  },
  {
    question: "What is the difference between AVERAGEIF and AVERAGE?",
    shortAnswer: "AVERAGE averages all numbers; AVERAGEIF averages only numbers that meet a condition.",
    explanation: "AVERAGEIF is conditional, AVERAGE is unconditional.",
    level: "basic",
    codeExample: "AVERAGE(A:A) vs AVERAGEIF(A:A,\">0\")"
  },
  {
    question: "Does AVERAGEIF treat blank cells in average_range as zero?",
    shortAnswer: "No, blank cells are ignored (not included in the count).",
    explanation: "Zeros are averaged, blanks are skipped. This can be confusing.",
    level: "intermediate",
    codeExample: "If average_range has blank and 100, average is 100 (not 50)."
  },
  {
    question: "How to average values except those that are zero?",
    shortAnswer: "=AVERAGEIF(range, \"<>0\", average_range)",
    explanation: "\"<>0\" excludes zeros but includes positive and negative numbers.",
    level: "intermediate",
    codeExample: "=AVERAGEIF(Sales, \"<>0\")"
  },
  {
    question: "Can AVERAGEIF be used across multiple sheets?",
    shortAnswer: "Not directly; you would need to add multiple AVERAGEIFs: =AVERAGEIF(Sheet1!A:A,\"x\",Sheet1!B:B) – only one sheet at a time.",
    explanation: "To average across sheets, combine with AVERAGE or SUM/COUNT.",
    level: "advanced",
    codeExample: "Doable but manual."
  },
  {
    question: "What wildcards work in AVERAGEIF criteria?",
    shortAnswer: "* (any characters) and ? (single character).",
    explanation: "Useful for partial text matches: \"*North*\" matches any cell containing \"North\".",
    level: "advanced",
    codeExample: "=AVERAGEIF(Product, \"*Phone*\", Sales)"
  },
  {
    question: "Why does AVERAGEIF sometimes return a wrong average?",
    shortAnswer: "Possible reasons: numbers stored as text in average_range (ignored), criteria incorrectly typed, wrong range sizes, or hidden rows affecting visual expectation.",
    explanation: "Check data types and criteria syntax.",
    level: "advanced",
    codeExample: "Use COUNTIF to verify how many cells meet criteria."
  },
  {
    question: "How to average only visible rows after filtering using AVERAGEIF?",
    shortAnswer: "AVERAGEIF cannot; use SUBTOTAL(101, range) or AGGREGATE.",
    explanation: "SUBTOTAL with function number 101 (AVERAGE) works on visible rows only.",
    level: "advanced",
    codeExample: "=SUBTOTAL(101, B2:B100)"
  },
  {
    question: "What is the maximum number of arguments AVERAGEIF can accept?",
    shortAnswer: "Three arguments: range, criteria, average_range (optional).",
    explanation: "For multiple conditions, use AVERAGEIFS.",
    level: "basic",
    codeExample: "Always exactly 2 or 3 arguments."
  },
  {
    question: "Can AVERAGEIF be nested inside other functions?",
    shortAnswer: "Yes, e.g., =IF(AVERAGEIF(A:A,\"Rice\",B:B)>500, \"High\", \"Low\")",
    explanation: "Useful for conditional formatting or decision making.",
    level: "intermediate",
    codeExample: "Any function that expects a number."
  },
  {
    question: "What is the result of =AVERAGEIF(A1:A5, \"=0\", B1:B5) if no cell equals 0?",
    shortAnswer: "#DIV/0! because nothing meets the criteria.",
    explanation: "No match leads to division by zero.",
    level: "basic",
    codeExample: "Always test with COUNTIF first."
  },
  {
    question: "How to average values based on partial text match (e.g., \"Phone\" anywhere in product name)?",
    shortAnswer: "=AVERAGEIF(Product, \"*Phone*\", Sales)",
    explanation: "Wildcards * before and after the substring.",
    level: "intermediate",
    codeExample: "Works for case‑insensitive match."
  },
  {
    question: "Does AVERAGEIF ignore text in the average_range?",
    shortAnswer: "Yes, text cells in average_range are ignored (not converted to 0).",
    explanation: "Only numeric values are considered in the average calculation.",
    level: "basic",
    codeExample: "Safe to use with mixed data types."
  },
  {
    question: "How to average values in column B where column A is blank?",
    shortAnswer: "=AVERAGEIF(A:A, \"\", B:B)",
    explanation: "Criteria \"\" (empty string) matches blank cells in the criteria range.",
    level: "intermediate",
    codeExample: "Useful for incomplete data analysis."
  },
  {
    question: "What is the difference between AVERAGEIF and AVERAGEIFS?",
    shortAnswer: "AVERAGEIF handles one condition; AVERAGEIFS handles multiple (AND logic) and has different argument order.",
    explanation: "AVERAGEIFS: =AVERAGEIFS(average_range, criteria_range1, criteria1, ...).",
    level: "basic",
    codeExample: "Use AVERAGEIFS when you need multiple conditions."
  },
  {
    question: "Can AVERAGEIF be used with an array constant as criteria?",
    shortAnswer: "Not directly, but you can embed inside AVERAGE: =AVERAGE(AVERAGEIF(range,{\"A\",\"B\"},avg_range)).",
    explanation: "This averages the two conditional averages, not what you might want.",
    level: "expert",
    codeExample: "Use SUMIF/COUNTIF combination instead."
  },
  {
    question: "How to average numbers that are between 10 and 20 using AVERAGEIF?",
    shortAnswer: "You cannot directly; use two criteria with AVERAGEIFS or =AVERAGE(IF((range>=10)*(range<=20), range)) array formula.",
    explanation: "AVERAGEIF only supports one condition. For range conditions, use AVERAGEIFS.",
    level: "advanced",
    codeExample: "=AVERAGEIFS(A:A, A:A, \">=10\", A:A, \"<=20\")"
  },
  {
    question: "What happens if criteria_range and average_range have different sizes?",
    shortAnswer: "Excel uses only the first cell of the smaller range and may produce incorrect results. Best to keep them the same size.",
    explanation: "It does not error, but results are unpredictable.",
    level: "expert",
    codeExample: "Always match dimensions."
  },
  {
    question: "Does AVERAGEIF count logical values (TRUE/FALSE) in average_range?",
    shortAnswer: "No, they are ignored (they are considered non‑numeric).",
    explanation: "Only numbers are averaged; TRUE/FALSE are not coerced to 1/0 in average_range (unlike in SUMIF).",
    level: "advanced",
    codeExample: "Use --(range) to convert if needed."
  },
  {
    question: "How to average the top 3 values meeting a condition?",
    shortAnswer: "Use array formula: =AVERAGE(LARGE(IF(criteria_range=condition, average_range), {1,2,3}))",
    explanation: "Requires array entry (Ctrl+Shift+Enter in older Excel).",
    level: "expert",
    codeExample: "Advanced but powerful."
  },
  {
    question: "What is a quick way to avoid #DIV/0! with AVERAGEIF?",
    shortAnswer: "Wrap in IFERROR: =IFERROR(AVERAGEIF(...), 0) or =IFERROR(AVERAGEIF(...), \"No data\").",
    explanation: "Prevents error propagation and keeps sheets clean.",
    level: "basic",
    codeExample: "=IFERROR(AVERAGEIF(A:A, \"Rice\", B:B), 0)"
  }
];

export default questions;