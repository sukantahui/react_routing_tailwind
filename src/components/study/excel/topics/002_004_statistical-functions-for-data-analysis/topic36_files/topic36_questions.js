const questions = [
  {
    question: "Which function would you use to sum sales where product = 'Rice' and region = 'North'?",
    shortAnswer: "SUMIFS(sales_range, product_range, \"Rice\", region_range, \"North\")",
    explanation: "SUMIFS is the correct function for multiple criteria (AND logic).",
    level: "basic",
    codeExample: "=SUMIFS(C2:C100, A2:A100, \"Rice\", B2:B100, \"North\")"
  },
  {
    question: "What is the argument order difference between SUMIF and SUMIFS?",
    shortAnswer: "SUMIF: range, criteria, [sum_range]; SUMIFS: sum_range, criteria_range1, criteria1, …",
    explanation: "SUMIFS puts the sum_range first because it can have many condition pairs.",
    level: "intermediate",
    codeExample: "SUMIF(A:A,\"Rice\",B:B) vs SUMIFS(B:B,A:A,\"Rice\")"
  },
  {
    question: "If you want to count rows where Score > 80 and City = 'Barrackpore', which function do you use?",
    shortAnswer: "COUNTIFS(Score_range, \">80\", City_range, \"Barrackpore\")",
    explanation: "COUNTIFS handles multiple AND conditions.",
    level: "basic",
    codeExample: "=COUNTIFS(D2:D100, \">80\", E2:E100, \"Barrackpore\")"
  },
  {
    question: "What does AVERAGEIFS return if no rows meet all criteria?",
    shortAnswer: "#DIV/0!",
    explanation: "Because there are no numbers to average.",
    level: "basic",
    codeExample: "Always handle with IFERROR if needed."
  },
  {
    question: "How can you use a cell reference for a dynamic threshold in SUMIFS?",
    shortAnswer: "=SUMIFS(sales, qty, \">\"&E1)",
    explanation: "Concatenate the operator with the cell reference using &.",
    level: "intermediate",
    codeExample: "=SUMIFS(C2:C100, B2:B100, \">\"&F2)"
  },
  {
    question: "All ranges in SUMIFS must have the same number of rows. What error occurs if they don't?",
    shortAnswer: "#VALUE!",
    explanation: "Excel cannot align ranges of different sizes.",
    level: "basic",
    codeExample: "Check that each criteria_range has the same length."
  },
  {
    question: "Can you use SUMIFS with OR logic (e.g., product = 'Rice' OR product = 'Wheat')?",
    shortAnswer: "Not directly. Use two SUMIFS added together: =SUMIFS(…, product, \"Rice\") + SUMIFS(…, product, \"Wheat\").",
    explanation: "SUMIFS uses AND inside a single function. For OR, add multiple SUMIFS.",
    level: "advanced",
    codeExample: "=SUMIFS(Sales, Product, \"Rice\") + SUMIFS(Sales, Product, \"Wheat\")"
  },
  {
    question: "What wildcard can you use in critiera to match any text containing 'Phone'?",
    shortAnswer: "*Phone* (asterisks on both sides).",
    explanation: "* matches any sequence of characters.",
    level: "intermediate",
    codeExample: "=SUMIFS(Sales, Product, \"*Phone*\")"
  },
  {
    question: "How would you sum sales where quantity is between 10 and 20 inclusive using SUMIFS?",
    shortAnswer: "=SUMIFS(Sales, Qty, \">=10\", Qty, \"<=20\")",
    explanation: "Two criteria on the same column – both must be true.",
    level: "intermediate",
    codeExample: "=SUMIFS(C2:C100, B2:B100, \">=10\", B2:B100, \"<=20\")"
  },
  {
    question: "Does COUNTIFS count blanks when criteria is \"\"?",
    shortAnswer: "Yes, it counts cells that look blank, including those with a formula returning empty string.",
    explanation: "COUNTIFS(range, \"\") counts truly blank cells and cells with \"\".",
    level: "advanced",
    codeExample: "=COUNTIFS(A2:A100, \"\")"
  },
  {
    question: "What is the advantage of using Excel Tables for multi‑condition formulas?",
    shortAnswer: "Structured references auto‑expand and are easier to read: =SUMIFS(Table1[Sales], Table1[Product], \"Rice\").",
    explanation: "Less risk of misaligned ranges.",
    level: "basic",
    codeExample: "=SUMIFS(Table1[Sales], Table1[Region], \"North\")"
  },
  {
    question: "Why does =AVERAGEIFS(scores, scores, \">0\") sometimes return 0?",
    shortAnswer: "If all scores are zero or negative, the average is 0. If no positive scores, it returns #DIV/0!.",
    explanation: "AVERAGEIFS returns 0 only when the average is exactly zero.",
    level: "intermediate",
    codeExample: "Check with COUNTIFS first."
  },
  {
    question: "Can you use SUMIFS with 3D references (multiple sheets)?",
    shortAnswer: "Not directly; you would need to sum SUMIFS from each sheet: =SUMIFS(Sheet1!…)+SUMIFS(Sheet2!…).",
    explanation: "3D references work with SUM but not with SUMIFS.",
    level: "advanced",
    codeExample: "Workaround."
  },
  {
    question: "What does =COUNTIFS(A2:A100, \"*\", B2:B100, \"\") count?",
    shortAnswer: "Rows where column A contains any text (including numbers stored as text) and column B is blank.",
    explanation: "* matches any text, not numbers; \"\" matches blanks.",
    level: "advanced",
    codeExample: "Useful for data profiling."
  },
  {
    question: "How can you sum sales for the top 5 products by revenue using SUMIFS?",
    shortAnswer: "First find the top 5 product names (using LARGE or SORT), then use SUMIFS with those names as criteria in an array formula.",
    explanation: "Complex; often easier to use a pivot table.",
    level: "expert",
    codeExample: "{=SUM(SUMIFS(Sales, Product, {\"A\",\"B\",\"C\",\"D\",\"E\"}))}"
  },
  {
    question: "What is the result of =SUMIFS(C2:C10, A2:A10, \"Apple\", B2:B10, \"\") if no Apple rows have blank in B?",
    shortAnswer: "0.",
    explanation: "SUMIFS returns 0 when no rows satisfy all criteria.",
    level: "basic",
    codeExample: "Not an error."
  },
  {
    question: "How to apply multiple conditions on the same column with OR logic?",
    shortAnswer: "Use array formula: {=SUM(SUMIFS(sales, product, {\"Rice\",\"Wheat\"}))}",
    explanation: "The array constant { } creates OR behaviour inside SUM.",
    level: "expert",
    codeExample: "Enter with Ctrl+Shift+Enter in older Excel."
  },
  {
    question: "What error does AVERAGEIFS return if any cell in the average_range is an error?",
    shortAnswer: "The same error is returned (e.g., #N/A).",
    explanation: "Errors propagate; use IFERROR in each cell or clean data first.",
    level: "intermediate",
    codeExample: "=IFERROR(AVERAGEIFS(…),0)"
  },
  {
    question: "Can you nest IFS functions (SUMIFS inside SUMIFS)?",
    shortAnswer: "No, but you can use the result of one SUMIFS as an argument to another SUMIFS? Not directly; you usually sum multiple SUMIFS or use array formulas.",
    explanation: "Not necessary; combine all criteria in a single SUMIFS.",
    level: "advanced",
    codeExample: "Use multiple criteria pairs."
  },
  {
    question: "What is a quick way to debug a COUNTIFS that returns 0 unexpectedly?",
    shortAnswer: "Test each criterion separately with COUNTIF (or filtered count in the worksheet) to see which condition fails.",
    explanation: "Often a typo or space issue.",
    level: "intermediate",
    codeExample: "=COUNTIF(product_range, \"Rice\") etc."
  },
  {
    question: "Does COUNTIFS treat the same range twice with different criteria as AND?",
    shortAnswer: "Yes, e.g., =COUNTIFS(A:A, \">10\", A:A, \"<20\") counts numbers between 10 and 20 exclusive (if using >10 and <20).",
    explanation: "Each pair adds a condition; all must be true.",
    level: "basic",
    codeExample: "Range condition."
  },
  {
    question: "How can you sum values where the corresponding date is in the current month?",
    shortAnswer: "Use =SUMIFS(Sales, Date, \">=\"&EOMONTH(TODAY(),-1)+1, Date, \"<=\"&EOMONTH(TODAY(),0)).",
    explanation: "EOMONTH gives last day of month.",
    level: "advanced",
    codeExample: "Dynamic month summary."
  },
  {
    question: "What is the difference between SUMIFS and SUMPRODUCT for multi‑condition sums?",
    shortAnswer: "SUMIFS is faster and more readable for AND conditions; SUMPRODUCT can handle OR logic and more complex formulas but is slower.",
    explanation: "Use SUMIFS whenever possible.",
    level: "advanced",
    codeExample: "Prefer SUMIFS."
  },
  {
    question: "What does =AVERAGEIFS(scores, scores, \"<>0\") do?",
    shortAnswer: "Averages scores excluding zero and non‑numeric values (zeros are already numbers, so this excludes zero). Actually \"<>0\" excludes zero, not blanks (blanks ignored anyway).",
    explanation: "It includes all non‑zero numbers.",
    level: "intermediate",
    codeExample: "=AVERAGEIFS(B2:B100, B2:B100, \"<>0\")"
  },
  {
    question: "Can you use named ranges with multi‑condition functions?",
    shortAnswer: "Yes, absolutely: =SUMIFS(Sales, Product, \"Rice\", Region, \"North\").",
    explanation: "Named ranges make formulas clearer and absolute automatically.",
    level: "basic",
    codeExample: "Define names via Formulas tab."
  },
  {
    question: "How to sum values based on a partial text match in a different column?",
    shortAnswer: "=SUMIFS(Sales, Product, \"*Phone*\") – uses wildcard.",
    explanation: "Works for any criteria that contains 'Phone'.",
    level: "intermediate",
    codeExample: "=SUMIFS(D2:D100, A2:A100, \"*Pro*\")"
  },
  {
    question: "What happens if you misspell a criteria range in SUMIFS?",
    shortAnswer: "Excel will give a #NAME? error if the range name is invalid, or it may treat as a cell reference if it looks like one.",
    explanation: "Always double‑check range names.",
    level: "basic",
    codeExample: "Use Formula Auditing tools."
  },
  {
    question: "How to count rows where city is either 'Barrackpore' or 'Shyamnagar' and sales > 1000?",
    shortAnswer: "=COUNTIFS(sales, \">1000\", city, \"Barrackpore\") + COUNTIFS(sales, \">1000\", city, \"Shyamnagar\")",
    explanation: "OR within same column requires addition of two COUNTIFS.",
    level: "advanced",
    codeExample: "No single COUNTIFS for OR."
  },
  {
    question: "Is it possible to use a cell reference as the entire criteria with > operator?",
    shortAnswer: "Yes: =SUMIFS(sales, sales, \">\"&E1).",
    explanation: "The criteria string is built dynamically.",
    level: "intermediate",
    codeExample: "E1 contains the threshold number."
  },
  {
    question: "Why does SUMIFS sometimes return a decimal with many digits?",
    shortAnswer: "Because the sum of numbers may include fractions; format the cell to fewer decimals.",
    explanation: "Not an error; just a formatting choice.",
    level: "basic",
    codeExample: "Use ROUND if needed."
  }
];

export default questions;