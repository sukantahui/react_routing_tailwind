const questions = [
  {
    question: "What is the basic syntax of SUMIF?",
    shortAnswer: "SUMIF(range, criteria, [sum_range])",
    explanation: "Range is the cells to test against criteria; criteria defines the condition; sum_range (optional) is the cells to sum.",
    level: "basic",
    codeExample: "=SUMIF(A1:A10, \"Yes\", B1:B10)"
  },
  {
    question: "What happens if you omit sum_range in SUMIF?",
    shortAnswer: "Excel sums the cells in range that meet the criteria.",
    explanation: "When sum_range is omitted, the range is used both for criteria testing and summing.",
    level: "basic",
    codeExample: "=SUMIF(A1:A10, \">10\") adds numbers greater than 10 in A1:A10."
  },
  {
    question: "Can you use a cell reference for the criteria?",
    shortAnswer: "Yes, but you need to concatenate operators if used.",
    explanation: "For numeric operators: =SUMIF(range, \">\"&E1, sum_range). For equal to: =SUMIF(range, E1, sum_range).",
    level: "intermediate",
    codeExample: "=SUMIF(A2:A100, \">\"&B2, C2:C100)"
  },
  {
    question: "How would you sum values in column B where column A equals \"Apples\"?",
    shortAnswer: "=SUMIF(A:A, \"Apples\", B:B)",
    explanation: "A:A is the criteria range, \"Apples\" is the text condition, B:B is the sum range.",
    level: "basic",
    codeExample: "=SUMIF(Products, \"Apples\", Sales)"
  },
  {
    question: "Is SUMIF case-sensitive?",
    shortAnswer: "No, SUMIF treats \"apple\", \"Apple\", \"APPLE\" the same.",
    explanation: "For case‑sensitive sum, use SUMPRODUCT with EXACT.",
    level: "intermediate",
    codeExample: "=SUMPRODUCT(--EXACT(A1:A10,\"Apple\"), B1:B10)"
  },
  {
    question: "What wildcards can be used in SUMIF?",
    shortAnswer: "Asterisk (*) for any sequence, question mark (?) for a single character.",
    explanation: "Examples: \"A*\" starts with A; \"???\" exactly three characters.",
    level: "advanced",
    codeExample: "=SUMIF(A:A, \"*North*\", B:B) sums where text contains \"North\"."
  },
  {
    question: "What does =SUMIF(A1:A10, \"<>0\") do?",
    shortAnswer: "Sums all non‑zero numbers in A1:A10.",
    explanation: "\"<>0\" means not equal to zero. It includes positive and negative numbers, excludes zero.",
    level: "intermediate",
    codeExample: "Works with text? No, criteria only applies to numbers; text is ignored in sum."
  },
  {
    question: "Can SUMIF handle dates as criteria?",
    shortAnswer: "Yes, dates are numbers; use date serial or DATE function.",
    explanation: "=SUMIF(A1:A100, \">\"&DATE(2025,1,1), B1:B100).",
    level: "advanced",
    codeExample: "=SUMIF(OrderDates, \">=\"&TODAY(), Amounts)"
  },
  {
    question: "What error occurs if range and sum_range have different sizes?",
    shortAnswer: "No error; SUMIF uses only the first cell of sum_range and assumes the same shape.",
    explanation: "For example, range A1:A10 and sum_range B1:B5 – SUMIF sums B1:B5 but aligns incorrectly. Best to use same size.",
    level: "expert",
    codeExample: "Always ensure sum_range has same number of rows/cols as range."
  },
  {
    question: "How to sum values where the criteria range is blank?",
    shortAnswer: "=SUMIF(range, \"\", sum_range)",
    explanation: "Criteria \"\" (empty string) matches blank cells. Note: cells with formula returning \"\" are considered blank by SUMIF.",
    level: "advanced",
    codeExample: "=SUMIF(A1:A10, \"\", B1:B10) sums B where A is blank."
  },
  {
    question: "What is the result of =SUMIF(A1:A5, \">5\", B1:B5) if some B cells are text?",
    shortAnswer: "Text in sum_range is ignored; only numbers are summed.",
    explanation: "SUMIF behaves like SUM in the sum_range – it skips non‑numeric values.",
    level: "intermediate",
    codeExample: "No error, just ignores text."
  },
  {
    question: "Can you use SUMIF across multiple sheets?",
    shortAnswer: "Not directly; you would need to use SUM over multiple SUMIFs or 3D references with limitations.",
    explanation: "=SUMIF(Sheet1!A:A,\"x\",Sheet1!B:B)+SUMIF(Sheet2!A:A,\"x\",Sheet2!B:B).",
    level: "advanced",
    codeExample: "Sum across sheets manually."
  },
  {
    question: "How to sum values based on partial text match in the criteria column?",
    shortAnswer: "Use wildcards: =SUMIF(range, \"*partial*\", sum_range)",
    explanation: "The asterisk matches any characters before and after \"partial\".",
    level: "intermediate",
    codeExample: "=SUMIF(A:A, \"*Rice*\", B:B) finds any cell containing \"Rice\"."
  },
  {
    question: "What is the maximum number of arguments SUMIF can accept?",
    shortAnswer: "Three: range, criteria, sum_range (optional).",
    explanation: "Unlike SUMIFS, SUMIF cannot accept multiple condition pairs.",
    level: "basic",
    codeExample: "Always exactly 2 or 3 arguments."
  },
  {
    question: "How would you sum values where the criteria range contains a number greater than the value in cell E5?",
    shortAnswer: "=SUMIF(range, \">\"&E5, sum_range)",
    explanation: "Concatenate the operator with the cell reference inside quotes.",
    level: "intermediate",
    codeExample: "=SUMIF(A2:A100, \">\"&E5, B2:B100)"
  },
  {
    question: "What does SUMIF return if no cells meet the criteria?",
    shortAnswer: "0 (zero)",
    explanation: "No error; it simply returns 0.",
    level: "basic",
    codeExample: "=SUMIF(A:A, \"=Zebra\", B:B) → 0 if no Zebra."
  },
  {
    question: "Can SUMIF be used with OR logic?",
    shortAnswer: "Not directly; use multiple SUMIFs added together: =SUMIF(range,\"A\",sum)+SUMIF(range,\"B\",sum).",
    explanation: "SUMIFS is for AND logic, not OR. For OR, sum multiple SUMIFs.",
    level: "advanced",
    codeExample: "=SUMIF(A:A,\"Red\",B:B)+SUMIF(A:A,\"Blue\",B:B)"
  },
  {
    question: "Why does =SUMIF(A1:A10, \">5\") sometimes include text?",
    shortAnswer: "It doesn't; text is ignored. The >5 operator only compares numbers; text is excluded from summation.",
    explanation: "The condition \" >5\" fails for text, so text is not counted.",
    level: "basic",
    codeExample: "Safe to use with mixed data."
  },
  {
    question: "How can you sum values where the criteria range is not empty?",
    shortAnswer: "=SUMIF(range, \"<>\", sum_range)",
    explanation: "\"<>\" means not blank. It includes any cell with any content (text, number, error, logical).",
    level: "intermediate",
    codeExample: "Useful for summing only rows with complete data."
  },
  {
    question: "Does SUMIF support array criteria?",
    shortAnswer: "Not directly; you would need to use SUM over SUMIF with an array constant or use SUMPRODUCT.",
    explanation: "Older Excel versions may require array formulas.",
    level: "expert",
    codeExample: "{=SUM(SUMIF(range,{\"A\",\"B\"},sum_range))}"
  },
  {
    question: "What is the difference between SUMIF and SUMIFS?",
    shortAnswer: "SUMIF handles one condition; SUMIFS handles multiple conditions and has a different argument order (sum_range first).",
    explanation: "SUMIFS: =SUMIFS(sum_range, criteria_range1, criteria1, ...).",
    level: "intermediate",
    codeExample: "For one condition, either works; for multiple, use SUMIFS."
  },
  {
    question: "Can we use SUMIF with the TODAY() function in criteria?",
    shortAnswer: "Yes, but must concatenate: =SUMIF(DateRange, \">=\"&TODAY(), AmountRange)",
    explanation: "TODAY() returns a serial number; concatenation creates a string like \">=45678\".",
    level: "advanced",
    codeExample: "Sums amounts for dates today or later."
  },
  {
    question: "What is the output of =SUMIF(A1:A5, \"=0\", B1:B5) when all A1:A5 are non‑zero numbers?",
    shortAnswer: "0 (since no cell equals 0).",
    explanation: "If criteria not met, SUMIF returns 0.",
    level: "basic",
    codeExample: "No match → 0."
  },
  {
    question: "How to sum values in column B where column A contains any text (i.e., is not numeric)?",
    shortAnswer: "=SUMIF(A:A, \"*\", B:B) – the * matches any text. But it also matches numbers stored as text.",
    explanation: "Better to use =SUMPRODUCT(--ISTEXT(A:A), B:B) for true text only.",
    level: "expert",
    codeExample: "Wildcard * counts everything non‑blank? Actually * matches any text, not numbers. So numbers are excluded. Good."
  },
  {
    question: "If range contains errors, does SUMIF work?",
    shortAnswer: "No, any error in the criteria range causes SUMIF to return an error.",
    explanation: "Errors in the criteria range are not ignored; they propagate.",
    level: "intermediate",
    codeExample: "Clean errors before using SUMIF."
  },
  {
    question: "Can you use a named range in SUMIF?",
    shortAnswer: "Yes, absolutely. =SUMIF(Products, \"Apples\", Sales)",
    explanation: "Named ranges improve readability and are absolute by default.",
    level: "basic",
    codeExample: "Define names via Formulas → Name Manager."
  },
  {
    question: "How would you sum values for all items except \"Apples\"?",
    shortAnswer: "=SUMIF(Items, \"<>Apples\", Values)",
    explanation: "\"<>Apples\" means not equal to Apples. Works for text.",
    level: "intermediate",
    codeExample: "Excludes one category."
  },
  {
    question: "What does =SUMIF(A1:A10, \">5\", B1:B10) do if sum_range has fewer rows?",
    shortAnswer: "Excel tries to align, but results are unpredictable. Always use same‑size ranges.",
    explanation: "It sums only the overlapping cells. Best to avoid.",
    level: "expert",
    codeExample: "Potential for wrong totals."
  },
  {
    question: "Is there a performance difference between SUMIF and SUMPRODUCT for conditional sums?",
    shortAnswer: "Yes, SUMIF is faster for large datasets because it is optimised for single‑condition aggregation.",
    explanation: "SUMPRODUCT evaluates every cell individually, which can be slower.",
    level: "advanced",
    codeExample: "Use SUMIF when possible."
  },
  {
    question: "Can you use SUMIF on a table with structured references?",
    shortAnswer: "Yes, e.g., =SUMIF(Table1[Product], \"Rice\", Table1[Sales])",
    explanation: "Structured references auto‑adjust when table grows.",
    level: "intermediate",
    codeExample: "Preferences over A1 style for tables."
  }
];

export default questions;