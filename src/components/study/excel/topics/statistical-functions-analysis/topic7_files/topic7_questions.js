const questions = [
  {
    question: "What is the correct syntax of SUMIFS?",
    shortAnswer: "SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    explanation: "sum_range is summed where all criteria are met. Each criteria range must be same size as sum_range.",
    level: "basic",
    codeExample: "=SUMIFS(C2:C100, A2:A100, \"Rice\", B2:B100, \">5\")"
  },
  {
    question: "What is the key difference between SUMIF and SUMIFS argument order?",
    shortAnswer: "SUMIF: range, criteria, [sum_range]; SUMIFS: sum_range, criteria_range1, criteria1.",
    explanation: "SUMIFS puts the sum range first because it can have many condition pairs.",
    level: "basic",
    codeExample: "SUMIF(A:A,\"x\",B:B) vs SUMIFS(B:B,A:A,\"x\")"
  },
  {
    question: "Can SUMIFS handle multiple criteria that are OR logic?",
    shortAnswer: "No, all criteria are AND. For OR logic, add multiple SUMIFS together.",
    explanation: "Example: =SUMIFS(...)+SUMIFS(...) for either condition.",
    level: "intermediate",
    codeExample: "=SUMIFS(Sales,Region,\"North\")+SUMIFS(Sales,Region,\"South\")"
  },
  {
    question: "What happens if criteria ranges are not the same size as sum_range?",
    shortAnswer: "SUMIFS returns #VALUE! error.",
    explanation: "All ranges (sum_range and each criteria_range) must have identical dimensions.",
    level: "advanced",
    codeExample: "Ensure same number of rows."
  },
  {
    question: "How to sum sales where product = \"Laptop\" and region = \"East\"?",
    shortAnswer: "=SUMIFS(SalesRange, ProductRange, \"Laptop\", RegionRange, \"East\")",
    explanation: "Both conditions must be true.",
    level: "basic",
    codeExample: "=SUMIFS(D2:D100, A2:A100, \"Laptop\", B2:B100, \"East\")"
  },
  {
    question: "Can you use wildcards (* ?) in SUMIFS criteria?",
    shortAnswer: "Yes, for text criteria. Example: \"*Phone*\" matches any product containing \"Phone\".",
    explanation: "Works for text or numbers stored as text, not for numeric operators.",
    level: "intermediate",
    codeExample: "=SUMIFS(Amount, Product, \"*Pro*\")"
  },
  {
    question: "How to sum values where date is between two dates using SUMIFS?",
    shortAnswer: "=SUMIFS(Sales, DateRange, \">=\"&StartDate, DateRange, \"<=\"&EndDate)",
    explanation: "Use two criteria on the same date range.",
    level: "advanced",
    codeExample: "=SUMIFS(C:C, A:A, \">=\"&E1, A:A, \"<=\"&E2)"
  },
  {
    question: "What does SUMIFS return when no cell meets all criteria?",
    shortAnswer: "0 (zero)",
    explanation: "Unlike some functions, it does not return an error.",
    level: "basic",
    codeExample: "=SUMIFS(B:B, A:A, \"NonExistent\") → 0."
  },
  {
    question: "Can you use cell references for criteria values?",
    shortAnswer: "Yes, but operators must be in quotes concatenated with &.",
    explanation: "Example: =SUMIFS(Sales, Qty, \">\"&E1). For equality: =SUMIFS(Sales, Product, G1).",
    level: "intermediate",
    codeExample: "=SUMIFS(C2:C100, A2:A100, G2, B2:B100, \">\"&H2)"
  },
  {
    question: "How many criteria pairs can SUMIFS handle?",
    shortAnswer: "Up to 127 pairs (criteria_range + criteria).",
    explanation: "This is more than enough for practical use.",
    level: "expert",
    codeExample: "You rarely need more than 5."
  },
  {
    question: "Is SUMIFS case-sensitive?",
    shortAnswer: "No, it treats \"APPLE\", \"Apple\", \"apple\" the same.",
    explanation: "For case-sensitive, use SUMPRODUCT with EXACT.",
    level: "advanced",
    codeExample: "=SUMPRODUCT(--EXACT(Product,\"Apple\"), Sales)"
  },
  {
    question: "Can you use SUMIFS with entire column references (e.g., A:A)?",
    shortAnswer: "Yes, but it may slow calculation on very large datasets.",
    explanation: "It's acceptable for small data; better to use exact ranges or Tables.",
    level: "basic",
    codeExample: "=SUMIFS(C:C, A:A, \"Rice\", B:B, \">5\")"
  },
  {
    question: "Why does SUMIFS return #VALUE! when using different sized ranges?",
    shortAnswer: "Because Excel cannot align unequal ranges for the AND operation.",
    explanation: "All ranges must have the same number of rows and columns.",
    level: "intermediate",
    codeExample: "Always check range dimensions."
  },
  {
    question: "What is the advantage of SUMIFS over SUMPRODUCT for multiple criteria?",
    shortAnswer: "SUMIFS is faster and more readable, especially on large datasets.",
    explanation: "SUMPRODUCT evaluates every cell; SUMIFS is optimised.",
    level: "advanced",
    codeExample: "Prefer SUMIFS for performance."
  },
  {
    question: "How to sum values where criteria is blank cells?",
    shortAnswer: "=SUMIFS(sum_range, criteria_range, \"\")",
    explanation: "Criteria \"\" (empty string) matches blank cells.",
    level: "intermediate",
    codeExample: "=SUMIFS(Amount, Status, \"\") sums where Status is blank."
  },
  {
    question: "Can SUMIFS be used on a filtered list?",
    shortAnswer: "It sums based on criteria, not filter state. Use SUBTOTAL if you need visible rows only.",
    explanation: "SUMIFS ignores manual filtering.",
    level: "advanced",
    codeExample: "For filtered sums, use SUBTOTAL(9, range)."
  },
  {
    question: "What error does SUMIFS return if a criteria range contains an error?",
    shortAnswer: "The entire SUMIFS returns that error.",
    explanation: "Errors are not ignored; clean data before using SUMIFS.",
    level: "expert",
    codeExample: "Use IFERROR inside each cell to clean."
  },
  {
    question: "How to sum based on partial text match in the product name?",
    shortAnswer: "Use wildcards: =SUMIFS(Sales, Product, \"*Smart*\")",
    explanation: "Matches any product containing \"Smart\" anywhere.",
    level: "intermediate",
    codeExample: "=SUMIFS(C:C, A:A, \"*Phone*\")"
  },
  {
    question: "Can I use SUMIFS with a criterion like \"<>Apples\"?",
    shortAnswer: "Yes, that excludes Apples: =SUMIFS(Sales, Product, \"<>Apples\")",
    explanation: "Works for text and numbers.",
    level: "basic",
    codeExample: "Exclude a specific category."
  },
  {
    question: "How to sum values where the date is in the current month?",
    shortAnswer: "Use =SUMIFS(Sales, Date, \">=\"&EOMONTH(TODAY(),-1)+1, Date, \"<=\"&EOMONTH(TODAY(),0))",
    explanation: "EOMONTH gives last day of month; adjust for first day.",
    level: "expert",
    codeExample: "Complex but powerful."
  },
  {
    question: "Does SUMIFS ignore text in the sum_range?",
    shortAnswer: "Yes, text within sum_range is ignored (same as SUM).",
    explanation: "Only numeric values are summed.",
    level: "basic",
    codeExample: "Safe to use with mixed data types."
  },
  {
    question: "Can you use SUMIFS across different sheets?",
    shortAnswer: "Not directly; you need to refer to each sheet separately: =SUMIFS(Sheet1!C:C, Sheet1!A:A, \"x\")+SUMIFS(Sheet2!C:C, Sheet2!A:A, \"x\")",
    explanation: "Works, but not as elegant.",
    level: "advanced",
    codeExample: "Sum across sheets manually."
  },
  {
    question: "What is the difference between using \"=\" vs omitting operator?",
    shortAnswer: "\"=Apples\" is the same as \"Apples\". The equals sign is optional for equality.",
    explanation: "For other operators (>, <, >=, etc.) you must include them.",
    level: "basic",
    codeExample: "=SUMIFS(Sales, Product, \"Apples\") works fine."
  },
  {
    question: "How to sum sales where product is either \"Rice\" or \"Wheat\"?",
    shortAnswer: "Add two SUMIFS: =SUMIFS(Sales, Product, \"Rice\") + SUMIFS(Sales, Product, \"Wheat\")",
    explanation: "Cannot do OR inside single SUMIFS.",
    level: "intermediate",
    codeExample: "Works for limited alternatives."
  },
  {
    question: "Why might SUMIFS return 0 even when you expect a positive sum?",
    shortAnswer: "Possible reasons: no match, criteria ranges misspelled, numbers stored as text, or operators wrong.",
    explanation: "Debug by testing each criterion with COUNTIFS.",
    level: "intermediate",
    codeExample: "Use COUNTIFS to see if any rows meet the criteria."
  },
  {
    question: "Can we use SUMIFS with arrays as criteria?",
    shortAnswer: "Not directly, but you can use SUMPRODUCT or array constants inside SUM function.",
    explanation: "Advanced users may do =SUM(SUMIFS(Sales, Product, {\"A\",\"B\"})).",
    level: "expert",
    codeExample: "{=SUM(SUMIFS(C:C, A:A, {\"Rice\",\"Wheat\"}))}"
  },
  {
    question: "How does SUMIFS treat criteria like \">5\" and \">5\"?",
    shortAnswer: "They are text strings; ensure correct syntax. Spaces matter: \"> 5\" is different from \">5\".",
    explanation: "Excel tries to parse; \">5\" is standard; avoid spaces inside the operator.",
    level: "basic",
    codeExample: "Always use \">5\" not \"> 5\"."
  },
  {
    question: "What is the performance impact of using many criteria in SUMIFS?",
    shortAnswer: "Minimal; Excel is highly optimised. Up to 10 criteria is fine for millions of rows.",
    explanation: "Each additional criterion adds a small overhead.",
    level: "advanced",
    codeExample: "Still faster than array formulas."
  },
  {
    question: "Can I use a named range for sum_range?",
    shortAnswer: "Yes, absolutely: =SUMIFS(SalesData, ProductRange, \"Rice\")",
    explanation: "Named ranges make formulas self‑documenting.",
    level: "basic",
    codeExample: "Define names via Formulas tab."
  },
  {
    question: "How would you sum values where the date is not blank?",
    shortAnswer: "=SUMIFS(Sales, DateRange, \"<>\")",
    explanation: "\"<>\" means not blank; it includes cells with any date.",
    level: "intermediate",
    codeExample: "Excludes blank cells."
  }
];

export default questions;