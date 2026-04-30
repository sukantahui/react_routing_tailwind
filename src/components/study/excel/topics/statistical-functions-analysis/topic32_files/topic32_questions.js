const questions = [
  {
    question: "What does IFERROR do?",
    shortAnswer: "Returns a custom value when a formula results in an error; otherwise returns the formula's result.",
    explanation: "IFERROR(value, value_if_error) traps any error (#N/A, #VALUE!, #DIV/0!, etc.) and substitutes the second argument.",
    level: "basic",
    codeExample: "=IFERROR(AVERAGEIF(A:A,\"x\",B:B), 0)"
  },
  {
    question: "What types of errors does IFERROR catch?",
    shortAnswer: "All Excel error types: #N/A, #VALUE!, #DIV/0!, #REF!, #NUM!, #NAME?, #NULL!.",
    explanation: "It does not differentiate; any error triggers the fallback.",
    level: "basic",
    codeExample: "Works for any error."
  },
  {
    question: "How is IFERROR different from IFNA?",
    shortAnswer: "IFERROR catches any error; IFNA only catches #N/A.",
    explanation: "Use IFNA when you only want to handle missing lookups, not other errors.",
    level: "intermediate",
    codeExample: "=IFNA(VLOOKUP(...), \"Not found\")"
  },
  {
    question: "What would =IFERROR(5/0, \"Error\") return?",
    shortAnswer: "Error",
    explanation: "5/0 returns #DIV/0!, so IFERROR returns the second argument.",
    level: "basic",
    codeExample: "Returns \"Error\"."
  },
  {
    question: "What would =IFERROR(10/2, \"Error\") return?",
    shortAnswer: "5",
    explanation: "No error occurs, so the result of 10/2 (5) is returned.",
    level: "basic",
    codeExample: "Returns 5."
  },
  {
    question: "Why is IFERROR useful for statistical formulas like AVERAGEIF?",
    shortAnswer: "AVERAGEIF returns #DIV/0! when no cells meet the criteria. IFERROR can replace that with 0 or a custom message.",
    explanation: "Makes dashboards cleaner and prevents downstream errors.",
    level: "intermediate",
    codeExample: "=IFERROR(AVERAGEIF(range, \">100\"), 0)"
  },
  {
    question: "What is a potential downside of using IFERROR?",
    shortAnswer: "It can hide genuine errors that you should fix, such as a misspelled range or missing data source.",
    explanation: "Use IFERROR as a protective wrapper, not as a substitute for data cleaning.",
    level: "intermediate",
    codeExample: "Investigate the root cause."
  },
  {
    question: "Can IFERROR be nested?",
    shortAnswer: "Yes, you can nest IFERROR functions to try multiple formula options before returning a final default.",
    explanation: "Example: =IFERROR(formula1, IFERROR(formula2, \"All failed\")).",
    level: "advanced",
    codeExample: "Alternative approach."
  },
  {
    question: "Is IFERROR a volatile function?",
    shortAnswer: "No, it is not volatile; it recalculates only when the underlying formula changes.",
    explanation: "Safe for large workbooks.",
    level: "basic",
    codeExample: "Non‑volatile."
  },
  {
    question: "How would you use IFERROR with STDEV.S to avoid #DIV/0!?",
    shortAnswer: "=IFERROR(STDEV.S(A2:A100), 0) or =IFERROR(STDEV.S(A2:A100), \"Insufficient data\").",
    explanation: "When fewer than 2 numbers, STDEV.S gives #DIV/0!.",
    level: "intermediate",
    codeExample: "Use a meaningful fallback."
  },
  {
    question: "Can IFERROR return a blank cell?",
    shortAnswer: "Yes, use \"\" as the second argument: =IFERROR(formula, \"\").",
    explanation: "The cell will appear empty, which is sometimes cleaner than 0.",
    level: "basic",
    codeExample: "=IFERROR(VLOOKUP(...), \"\")"
  },
  {
    question: "What does =IFERROR(SUMIF(A:A, \"z\", B:B), \"none\") return if there are no 'z'?",
    shortAnswer: "0 (SUMIF returns 0 when no match, not an error, so IFERROR returns 0).",
    explanation: "SUMIF does not error; it returns 0. IFERROR only triggers on errors.",
    level: "intermediate",
    codeExample: "Important distinction."
  },
  {
    question: "What is the difference between IFERROR and IF(ISERROR(...))?",
    shortAnswer: "IFERROR is shorter and more efficient; the old ISERROR approach required two functions and array entry in some contexts.",
    explanation: "IFERROR is the modern replacement.",
    level: "basic",
    codeExample: "Use IFERROR in new workbooks."
  },
  {
    question: "How to use IFERROR to handle division by zero in an array?",
    shortAnswer: "Wrap the division: =IFERROR(A2/B2, 0). This avoids #DIV/0! propagation.",
    explanation: "Common in ratio calculations.",
    level: "basic",
    codeExample: "=IFERROR(A2/B2, 0)"
  },
  {
    question: "Can IFERROR be used with INDEX-MATCH?",
    shortAnswer: "Yes, to return a default when the lookup fails: =IFERROR(INDEX(B:B, MATCH(E2, A:A, 0)), \"Not found\").",
    explanation: "VLOOKUP alternative.",
    level: "intermediate",
    codeExample: "Cleaner than wrapping in IFNA."
  },
  {
    question: "What is a typical value_if_error when averaging?",
    shortAnswer: "Often 0, but it depends on context. For ratings, 0 might be acceptable; for test scores, you may want \"No data\".",
    explanation: "Consider your audience and downstream formulas.",
    level: "intermediate",
    codeExample: "Use text if numbers would mislead."
  },
  {
    question: "Does IFERROR work with array formulas?",
    shortAnswer: "Yes, it works with array formulas (both legacy and dynamic arrays).",
    explanation: "It will trap errors within the array and return the fallback for each erroneous element.",
    level: "advanced",
    codeExample: "Useful for robust dynamic arrays."
  },
  {
    question: "What is the output of =IFERROR(AVERAGE(1,2,3), 0) if no error?",
    shortAnswer: "2 (the average).",
    explanation: "No error → returns the average.",
    level: "basic",
    codeExample: "Simple."
  },
  {
    question: "How can IFERROR be used to create a default value for a missing VLOOKUP?",
    shortAnswer: "=IFERROR(VLOOKUP(id, table, 2, FALSE), \"Missing ID\").",
    explanation: "Common in data reconciliation.",
    level: "basic",
    codeExample: "Better than seeing #N/A."
  },
  {
    question: "Why might some analysts avoid IFERROR in critical calculations?",
    shortAnswer: "Because it can mask errors that should be fixed at source, leading to incorrect results.",
    explanation: "If an error indicates a data problem, IFERROR hides it and you might never notice.",
    level: "advanced",
    codeExample: "Use with caution."
  },
  {
    question: "What is the advantage of IFERROR over ISERROR for large data sets?",
    shortAnswer: "IFERROR is slightly faster because it stops evaluation on the first error, and the formula is simpler.",
    explanation: "Performance difference is minor but noticeable in thousands of cells.",
    level: "expert",
    codeExample: "Prefer IFERROR for readability."
  },
  {
    question: "Can IFERROR be used in a PivotTable calculated field?",
    shortAnswer: "Yes, but the fallback value must be a constant that is valid in the pivot context (usually numeric).",
    explanation: "Works like any other formula.",
    level: "advanced",
    codeExample: "Test in a pivot first."
  },
  {
    question: "What does =IFERROR(5, 0) return?",
    shortAnswer: "5 (no error, so 5 is returned).",
    explanation: "No error, first argument returned.",
    level: "basic",
    codeExample: "Trivial example."
  },
  {
    question: "How to use IFERROR to avoid #NUM! in statistical functions?",
    shortAnswer: "=IFERROR(STDEV.S(range_of_one_number), 0) or =IFERROR(RANK.EQ(value, range), \"Cannot rank\").",
    explanation: "Some functions error with insufficient data.",
    level: "intermediate",
    codeExample: "Wrap appropriately."
  },
  {
    question: "What is the difference between IFERROR and IFNA for VLOOKUP?",
    shortAnswer: "IFNA only catches #N/A, leaving other errors (like #REF!) to appear. IFERROR catches all errors.",
    explanation: "Use IFNA when you expect missing lookups but want to see other errors.",
    level: "intermediate",
    codeExample: "Choose based on error handling needs."
  },
  {
    question: "Can IFERROR be used to handle errors in conditional formatting?",
    shortAnswer: "Yes, you can use IFERROR inside the conditional formatting formula to avoid CF errors.",
    explanation: "Example: =IFERROR(A1>100, FALSE) prevents CF from failing.",
    level: "expert",
    codeExample: "Use to keep formatting consistent."
  },
  {
    question: "What is the result of =IFERROR(5/0, \"\")?",
    shortAnswer: "An empty string (blank).",
    explanation: "#DIV/0! is replaced by \"\".",
    level: "basic",
    codeExample: "Cell appears blank."
  },
  {
    question: "How would you use IFERROR with PERCENTILE to handle small datasets?",
    shortAnswer: "=IFERROR(PERCENTILE.INC(data, 0.9), \"Insufficient data\").",
    explanation: "PERCENTILE needs at least one data point; it returns #NUM! if data is empty.",
    level: "intermediate",
    codeExample: "Graceful failure."
  },
  {
    question: "What is the best practice for value_if_error when the formula is part of a larger calculation?",
    shortAnswer: "Choose a neutral value (e.g., 0 for sums, 1 for ratios where appropriate, or '' for concatenation).",
    explanation: "Avoid breaking the larger calculation.",
    level: "intermediate",
    codeExample: "Test the impact."
  },
  {
    question: "Can IFERROR be used with multiple arguments?",
    shortAnswer: "No, it only takes two arguments: the expression to test and the fallback.",
    explanation: "For multiple fallbacks, nest IFERRORs.",
    level: "basic",
    codeExample: "=IFERROR(a, IFERROR(b, c))"
  }
];

export default questions;