const questions = [
  {
    question: "What is the syntax of AVERAGEIFS?",
    shortAnswer: "AVERAGEIFS(average_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)",
    explanation: "average_range is the range to average. Each criteria_range is evaluated with its corresponding criteria. All ranges must be same size.",
    level: "basic",
    codeExample: "=AVERAGEIFS(C2:C100, A2:A100, \"Rice\", B2:B100, \"North\")"
  },
  {
    question: "How does AVERAGEIFS differ from AVERAGEIF?",
    shortAnswer: "AVERAGEIFS handles multiple conditions (AND logic) and puts average_range first; AVERAGEIF handles one condition and puts range first.",
    explanation: "AVERAGEIF: range, criteria, [average_range]; AVERAGEIFS: average_range, criteria_range1, criteria1, ...",
    level: "basic",
    codeExample: "AVERAGEIF(A:A,\"Rice\",B:B) vs AVERAGEIFS(B:B, A:A, \"Rice\")"
  },
  {
    question: "What does AVERAGEIFS return if no cells meet all criteria?",
    shortAnswer: "#DIV/0! error",
    explanation: "Because there are no numbers to average, Excel cannot compute the average and returns division by zero.",
    level: "basic",
    codeExample: "=AVERAGEIFS(B:B, A:A, \"Zebra\", C:C, \">100\") → #DIV/0!"
  },
  {
    question: "Can AVERAGEIFS use the same criteria range multiple times?",
    shortAnswer: "Yes, for example to average numbers between two values: =AVERAGEIFS(A:A, A:A, \">=10\", A:A, \"<=20\")",
    explanation: "This averages numbers 10 to 20 inclusive.",
    level: "intermediate",
    codeExample: "Average test scores between 70 and 90."
  },
  {
    question: "Is AVERAGEIFS case-sensitive?",
    shortAnswer: "No, it treats \"Apple\", \"apple\", \"APPLE\" as the same.",
    explanation: "For case‑sensitive, use array formula with EXACT inside AVERAGE.",
    level: "intermediate",
    codeExample: "=AVERAGE(IF(EXACT(A1:A10,\"Apple\"), B1:B10))"
  },
  {
    question: "How to average sales where product is \"Laptop\" and region is either North or South?",
    shortAnswer: "You cannot use OR directly inside AVERAGEIFS. Instead, add two AVERAGEIFS: =(AVERAGEIFS(Sales, Product,\"Laptop\",Region,\"North\") + AVERAGEIFS(Sales, Product,\"Laptop\",Region,\"South\")) / 2? But careful: that averages the two averages incorrectly if counts differ. Better to use array formula or helper column.",
    explanation: "For OR, use SUMIFS/COUNTIFS combination or SUMPRODUCT.",
    level: "expert",
    codeExample: "=SUMPRODUCT((Product=\"Laptop\")*((Region=\"North\")+(Region=\"South\")), Sales)/SUMPRODUCT((Product=\"Laptop\")*((Region=\"North\")+(Region=\"South\")))"
  },
  {
    question: "What wildcards can be used in AVERAGEIFS criteria?",
    shortAnswer: "* (any characters) and ? (single character).",
    explanation: "Example: \"*Phone*\" matches any product containing \"Phone\".",
    level: "advanced",
    codeExample: "=AVERAGEIFS(Sales, Product, \"*Phone*\", Region, \"East\")"
  },
  {
    question: "What error occurs if criteria ranges are not the same size?",
    shortAnswer: "#VALUE! error.",
    explanation: "All criteria ranges and the average_range must have identical dimensions.",
    level: "basic",
    codeExample: "=AVERAGEIFS(B2:B100, A2:A99, \"x\") → #VALUE!"
  },
  {
    question: "How to average values based on a date range?",
    shortAnswer: "=AVERAGEIFS(Sales, DateRange, \">=\"&StartDate, DateRange, \"<=\"&EndDate)",
    explanation: "Use two criteria on the same date range – one for lower bound, one for upper bound.",
    level: "intermediate",
    codeExample: "=AVERAGEIFS(C:C, A:A, \">=\"&E1, A:A, \"<=\"&E2)"
  },
  {
    question: "Can AVERAGEIFS be used with cell references for criteria values?",
    shortAnswer: "Yes, e.g., =AVERAGEIFS(Sales, Product, F1, Region, G1). For operators: =AVERAGEIFS(Sales, Qty, \">\"&H1).",
    explanation: "Use & to concatenate operators with cell references.",
    level: "intermediate",
    codeExample: "=AVERAGEIFS(C:C, A:A, D1, B:B, \">\"&E1)"
  },
  {
    question: "What is the maximum number of criteria pairs in AVERAGEIFS?",
    shortAnswer: "127 pairs.",
    explanation: "More than sufficient for real‑world use.",
    level: "expert",
    codeExample: "Rarely exceed 5."
  },
  {
    question: "How does AVERAGEIFS treat blank cells in average_range?",
    shortAnswer: "Blanks are ignored (not counted). Only numeric cells are included.",
    explanation: "Zeros are included, blanks are skipped.",
    level: "intermediate",
    codeExample: "Important when dealing with incomplete data."
  },
  {
    question: "What is the difference between AVERAGEIFS and SUMPRODUCT for conditional averaging?",
    shortAnswer: "AVERAGEIFS is faster, more readable, and specific for AND logic; SUMPRODUCT is more flexible (OR, complex conditions) but slower.",
    explanation: "Use AVERAGEIFS when possible; SUMPRODUCT for advanced cases.",
    level: "advanced",
    codeExample: "Prefer AVERAGEIFS for readability."
  },
  {
    question: "Can AVERAGEIFS be used across multiple sheets?",
    shortAnswer: "Not in a single formula; you must add AVERAGEIFS from each sheet or use 3D references (which don't work with conditions).",
    explanation: "Use VBA or Power Query for cross‑sheet conditional averaging.",
    level: "advanced",
    codeExample: "Manual addition is common: =AVERAGEIFS(Sheet1!C:C,...)+AVERAGEIFS(Sheet2!C:C,...) – but that sums averages, not correct overall average."
  },
  {
    question: "Why does AVERAGEIFS return #DIV/0! even though I see matching rows?",
    shortAnswer: "Possible reasons: average_range contains no numbers (only text/blanks) for those rows, or criteria ranges contain errors.",
    explanation: "Use COUNTIFS to verify that at least one number exists in average_range for the matching rows.",
    level: "advanced",
    codeExample: "Check =COUNTIFS(criteria1, criteria1, ...) and ensure average_range is numeric."
  },
  {
    question: "How to average values excluding zeros using AVERAGEIFS?",
    shortAnswer: "=AVERAGEIFS(average_range, average_range, \"<>0\", other criteria ranges, ...)",
    explanation: "Add a condition on the average_range itself: exclude zero.",
    level: "intermediate",
    codeExample: "=AVERAGEIFS(B:B, B:B, \"<>0\", A:A, \"Rice\")"
  },
  {
    question: "Can AVERAGEIFS handle conditions based on text length?",
    shortAnswer: "No, but you can use a helper column with LEN and then AVERAGEIFS on that column.",
    explanation: "Helper columns make complex criteria possible.",
    level: "advanced",
    codeExample: "=LEN(A2) then average where helper >5."
  },
  {
    question: "What is the result of =AVERAGEIFS(B:B, A:A, \"*\", C:C, \">0\")?",
    shortAnswer: "Average of B where A contains any text (non‑blank) and C is greater than 0.",
    explanation: "The * wildcard matches any text, not numbers. So if A has numbers but stored as text, they are also matched.",
    level: "expert",
    codeExample: "Useful for filtering out blank rows."
  },
  {
    question: "How to average the top 3 values that meet multiple criteria?",
    shortAnswer: "Use array formula: =AVERAGE(LARGE(IF((criteria_range1=crit1)*(criteria_range2=crit2), average_range), {1,2,3}))",
    explanation: "Requires array entry (Ctrl+Shift+Enter in older Excel).",
    level: "expert",
    codeExample: "Powerful but complex."
  },
  {
    question: "Does AVERAGEIFS ignore errors in average_range?",
    shortAnswer: "No, any error in average_range causes the entire AVERAGEIFS to return that error.",
    explanation: "Errors propagate. Clean data with IFERROR before averaging.",
    level: "advanced",
    codeExample: "Use =IFERROR(cell,0) in helper column."
  },
  {
    question: "Can AVERAGEIFS be used with dynamic named ranges?",
    shortAnswer: "Yes, as long as the named ranges refer to same‑size areas.",
    explanation: "=AVERAGEIFS(SalesData, ProductList, \"Rice\", RegionList, \"North\")",
    level: "intermediate",
    codeExample: "Named ranges improve readability."
  },
  {
    question: "What is the difference between using \"=\" and omitting it in criteria?",
    shortAnswer: "For equality, \"=Apple\" is the same as \"Apple\". The equals sign is optional.",
    explanation: "For other operators (>, <, >=, <=, <>), you must include them.",
    level: "basic",
    codeExample: "=AVERAGEIFS(B:B, A:A, \"Apple\") works fine."
  },
  {
    question: "How to average values where a date is in the current month?",
    shortAnswer: "=AVERAGEIFS(Sales, Date, \">=\"&EOMONTH(TODAY(),-1)+1, Date, \"<=\"&EOMONTH(TODAY(),0))",
    explanation: "EOMONTH gives last day of previous/current month.",
    level: "expert",
    codeExample: "Dynamic monthly average."
  },
  {
    question: "Is there a performance penalty for using many criteria in AVERAGEIFS?",
    shortAnswer: "Very small overhead; Excel is well optimised. Up to 10 criteria is fine for millions of rows.",
    explanation: "Still faster than array formulas.",
    level: "advanced",
    codeExample: "Use AVERAGEIFS over SUMPRODUCT for speed."
  },
  {
    question: "Can AVERAGEIFS be used with table structured references?",
    shortAnswer: "Yes, it works beautifully: =AVERAGEIFS(Table1[Sales], Table1[Product], \"Rice\", Table1[Region], \"North\")",
    explanation: "Structured references auto‑expand with the table.",
    level: "intermediate",
    codeExample: "Highly recommended."
  },
  {
    question: "Why might AVERAGEIFS return a value different from a manual filter average?",
    shortAnswer: "Possible issues: hidden rows, different treatment of blanks/zeros, or criteria not matching exactly due to spaces.",
    explanation: "AVERAGEIFS always includes all rows (unless filtered via other means). Check for leading/trailing spaces.",
    level: "advanced",
    codeExample: "Use TRIM and CLEAN on data."
  },
  {
    question: "How to average values based on two conditions in the same column (e.g., between two dates)?",
    shortAnswer: "Use two criteria on the same column: =AVERAGEIFS(Sales, Date, \">=\"&Start, Date, \"<=\"&End)",
    explanation: "That's the standard way to create a range condition.",
    level: "intermediate",
    codeExample: "Works for numbers, dates, times."
  },
  {
    question: "What is the output of =AVERAGEIFS(A:A, B:B, \"<>\"&C1) where C1 is blank?",
    shortAnswer: "If C1 is blank, \"<>\"&C1 becomes \"<>\", which means not blank. So it averages A where B is not blank.",
    explanation: "Dynamic exclusion based on cell value.",
    level: "expert",
    codeExample: "Be careful with blank criteria cells."
  },
  {
    question: "Can AVERAGEIFS be used to average numbers based on a condition that is a formula itself?",
    shortAnswer: "Not directly; the criteria range must be a cell range, not a calculated array. Use a helper column for formula results and then average on that column.",
    explanation: "Helper columns are the standard solution.",
    level: "expert",
    codeExample: "Add column =MOD(A2,2)=0, then AVERAGEIFS on that."
  },
  {
    question: "What is a quick way to avoid #DIV/0! with AVERAGEIFS?",
    shortAnswer: "Wrap in IFERROR: =IFERROR(AVERAGEIFS(...), 0) or =IFERROR(AVERAGEIFS(...), \"No data\").",
    explanation: "Keeps your sheet clean and prevents error propagation.",
    level: "basic",
    codeExample: "=IFERROR(AVERAGEIFS(C:C, A:A, \"Rice\", B:B, \"North\"), 0)"
  }
];

export default questions;