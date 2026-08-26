const questions = [
  {
    question: "What is the correct syntax of COUNTIFS?",
    shortAnswer: "COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    explanation: "It counts rows where all specified criteria are met. Ranges must have same dimensions.",
    level: "basic",
    codeExample: "=COUNTIFS(A2:A100, \"Rice\", B2:B100, \">5\")"
  },
  {
    question: "How does COUNTIFS differ from COUNTIF?",
    shortAnswer: "COUNTIF handles one condition; COUNTIFS handles multiple (AND logic).",
    explanation: "COUNTIFS also has different argument order: there is no optional sum_range.",
    level: "basic",
    codeExample: "COUNTIF(range, \"x\") vs COUNTIFS(range1,\"x\", range2,\"y\")"
  },
  {
    question: "Can COUNTIFS use the same criteria range multiple times?",
    shortAnswer: "Yes, for example to count numbers between two values: =COUNTIFS(A:A, \">=10\", A:A, \"<=20\")",
    explanation: "This counts numbers 10 to 20 inclusive.",
    level: "intermediate",
    codeExample: "=COUNTIFS(Score, \">=80\", Score, \"<=90\")"
  },
  {
    question: "What will COUNTIFS return if no cell meets all criteria?",
    shortAnswer: "0",
    explanation: "It does not return an error; just zero.",
    level: "basic",
    codeExample: "=COUNTIFS(A:A, \"Zebra\", B:B, \">100\") → 0"
  },
  {
    question: "Is COUNTIFS case‑sensitive?",
    shortAnswer: "No, it treats \"APPLE\", \"Apple\", \"apple\" the same.",
    explanation: "For case‑sensitive counting, use SUMPRODUCT with EXACT.",
    level: "intermediate",
    codeExample: "=SUMPRODUCT(--EXACT(A1:A10, \"Apple\"), --(B1:B10>5))"
  },
  {
    question: "How to count cells where product is \"Rice\" and quantity is not blank?",
    shortAnswer: "=COUNTIFS(ProductRange, \"Rice\", QtyRange, \"<>\")",
    explanation: "\"<>\" means not empty. Works for text or numbers.",
    level: "intermediate",
    codeExample: "=COUNTIFS(A:A, \"Rice\", B:B, \"<>\")"
  },
  {
    question: "What wildcards can be used in COUNTIFS?",
    shortAnswer: "* (any characters) and ? (single character).",
    explanation: "Works for text criteria: \"*Phone*\" matches any product containing \"Phone\".",
    level: "advanced",
    codeExample: "=COUNTIFS(Product, \"*Phone*\", Qty, \">5\")"
  },
  {
    question: "Can COUNTIFS count cells with OR logic across different columns?",
    shortAnswer: "Not directly; you would add multiple COUNTIFS: =COUNTIFS(region,\"North\",sales,\">1000\") + COUNTIFS(region,\"South\",sales,\">1000\")",
    explanation: "This counts rows where (region = North AND sales > 1000) OR (region = South AND sales > 1000).",
    level: "advanced",
    codeExample: "Use + for OR between independent condition sets."
  },
  {
    question: "What error does COUNTIFS return if criteria ranges have different sizes?",
    shortAnswer: "#VALUE! error.",
    explanation: "All criteria ranges must have the same number of rows and columns.",
    level: "basic",
    codeExample: "=COUNTIFS(A2:A100, \"x\", B2:B99, \"y\") → #VALUE!"
  },
  {
    question: "How to count orders that occurred between two dates?",
    shortAnswer: "=COUNTIFS(DateRange, \">=\"&StartDate, DateRange, \"<=\"&EndDate)",
    explanation: "Use two criteria on the same date range.",
    level: "intermediate",
    codeExample: "=COUNTIFS(OrderDate, \">=\"&E1, OrderDate, \"<=\"&E2)"
  },
  {
    question: "Can COUNTIFS be used with cell references for both value and operator?",
    shortAnswer: "Yes, e.g., =COUNTIFS(Score, \">\"&E1, Grade, F1)",
    explanation: "Concatenate operator with cell reference using &.",
    level: "intermediate",
    codeExample: "=COUNTIFS(A:A, \">\"&B1, C:C, D1)"
  },
  {
    question: "What is the maximum number of criteria pairs in COUNTIFS?",
    shortAnswer: "127 pairs.",
    explanation: "More than enough for any practical use.",
    level: "expert",
    codeExample: "Rarely need more than 5."
  },
  {
    question: "How does COUNTIFS handle errors within criteria ranges?",
    shortAnswer: "If any cell in a criteria range contains an error, COUNTIFS returns that error.",
    explanation: "Errors are not ignored; clean data first.",
    level: "advanced",
    codeExample: "Use IFERROR inside helper column."
  },
  {
    question: "Can COUNTIFS be used with 3D references across sheets?",
    shortAnswer: "Not directly; you would need to sum COUNTIFS from each sheet.",
    explanation: "=COUNTIFS(Sheet1!A:A,\"x\",Sheet1!B:B,\"y\") + COUNTIFS(Sheet2!...).",
    level: "expert",
    codeExample: "Workaround but manual."
  },
  {
    question: "How to count rows where a column is not equal to a specific value?",
    shortAnswer: "Use \"<>\" operator: =COUNTIFS(Product, \"<>Rice\", Qty, \">5\")",
    explanation: "Excludes Rice but includes other products.",
    level: "basic",
    codeExample: "=COUNTIFS(A:A, \"<>Laptop\", B:B, \">1000\")"
  },
  {
    question: "What is the difference between COUNTIFS and SUMPRODUCT for multiple criteria?",
    shortAnswer: "COUNTIFS is faster and clearer for counting with AND logic; SUMPRODUCT is more flexible (OR, formulas, arrays).",
    explanation: "Use COUNTIFS when possible; SUMPRODUCT for complex conditions like case‑sensitive or OR.",
    level: "advanced",
    codeExample: "Prefer COUNTIFS for readability."
  },
  {
    question: "How to count cells that contain a question mark (literal) using COUNTIFS?",
    shortAnswer: "Escape with tilde: =COUNTIFS(range, \"~?\")",
    explanation: "Tilde negates wildcard interpretation.",
    level: "expert",
    codeExample: "=COUNTIFS(A:A, \"~?\") counts cells with a single question mark character."
  },
  {
    question: "Does COUNTIFS count cells that are blank if criteria is \"\"?",
    shortAnswer: "Yes, =COUNTIFS(range, \"\") counts truly blank cells and cells with formula that returns \"\".",
    explanation: "Be aware of this nuance.",
    level: "intermediate",
    codeExample: "=COUNTIFS(A:A, \"\") counts blanks."
  },
  {
    question: "Can COUNTIFS accept arrays as criteria?",
    shortAnswer: "Not directly, but you can embed it inside SUM to simulate multiple values: =SUM(COUNTIFS(range1, {\"A\",\"B\"}, range2, \">5\"))",
    explanation: "This counts rows where range1 = A OR B, AND range2 >5.",
    level: "expert",
    codeExample: "{=SUM(COUNTIFS(A:A,{\"Rice\",\"Wheat\"},B:B,\">5\"))}"
  },
  {
    question: "How to count rows where the score is between 70 and 90 exclusive?",
    shortAnswer: "=COUNTIFS(Score, \">70\", Score, \"<90\")",
    explanation: "Excludes 70 and 90. Use >= and <= for inclusive.",
    level: "intermediate",
    codeExample: "=COUNTIFS(C2:C100, \">70\", C2:C100, \"<90\")"
  },
  {
    question: "What happens if criteria_range has mixed data types?",
    shortAnswer: "COUNTIFS works, but criteria must match the data type. Text criteria ignores numbers; numeric criteria ignores text.",
    explanation: "Text stored as numbers may not be counted correctly.",
    level: "advanced",
    codeExample: "Convert text numbers with VALUE."
  },
  {
    question: "Can COUNTIFS count based on row colour?",
    shortAnswer: "No, it only works with cell values.",
    explanation: "For formatting-based counting, use VBA or special add‑ins.",
    level: "advanced",
    codeExample: "Not possible with built-in functions."
  },
  {
    question: "Why does COUNTIFS return 0 even though I see matches?",
    shortAnswer: "Possible reasons: ranges not same size, case mismatch (though not case‑sensitive, spaces matter), numbers stored as text, or operators used incorrectly.",
    explanation: "Debug by testing each criterion separately with COUNTIF.",
    level: "intermediate",
    codeExample: "Use =COUNTIF(range1, criteria1) alone, then combine."
  },
  {
    question: "How to count rows where product is either Rice or Wheat (in one column) and quantity >5?",
    shortAnswer: "=COUNTIFS(Product, \"Rice\", Qty, \">5\") + COUNTIFS(Product, \"Wheat\", Qty, \">5\")",
    explanation: "OR logic across categories requires addition.",
    level: "advanced",
    codeExample: "Two COUNTIFS added."
  },
  {
    question: "Is there a performance difference between COUNTIFS and multiple COUNTIFs added?",
    shortAnswer: "COUNTIFS is generally faster because Excel optimises multiple criteria evaluation.",
    explanation: "For a single condition, COUNTIF is fine; for multiple, prefer COUNTIFS.",
    level: "advanced",
    codeExample: "COUNTIFS is recommended."
  },
  {
    question: "How to count cells that contain a specific substring in a range?",
    shortAnswer: "Use wildcard: =COUNTIFS(TextRange, \"*substring*\")",
    explanation: "Works case‑insensitively.",
    level: "basic",
    codeExample: "=COUNTIFS(A:A, \"*urgent*\")"
  },
  {
    question: "Can COUNTIFS be used with named ranges and Excel Tables?",
    shortAnswer: "Yes, it works perfectly: =COUNTIFS(Table1[Product], \"Rice\", Table1[Qty], \">5\")",
    explanation: "Structured references auto‑adjust when table expands.",
    level: "intermediate",
    codeExample: "Much cleaner than A1 references."
  },
  {
    question: "What is the result of =COUNTIFS(A:A, \"*\", B:B, \"\")?",
    shortAnswer: "Counts rows where column A has any text (or numbers stored as text) and column B is blank.",
    explanation: "* matches any text (including empty string? Actually * does not match empty; but in COUNTIFS it will count non‑blank text. So careful).",
    level: "expert",
    codeExample: "Test with sample data."
  },
  {
    question: "How to count only visible rows after filtering using COUNTIFS?",
    shortAnswer: "COUNTIFS cannot; use SUBTOTAL(3, range) for visible count.",
    explanation: "SUBTOTAL with function number 3 (COUNTA) works on visible rows only.",
    level: "advanced",
    codeExample: "SUBTOTAL(3, A2:A100) counts visible non‑blank."
  }
];

export default questions;