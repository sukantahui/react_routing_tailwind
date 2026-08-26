const questions = [
  {
    question: "What does the MEDIAN function do?",
    shortAnswer: "Returns the middle value after sorting numbers.",
    explanation: "For an odd count, it's the centre number; for even count, it averages the two middle numbers.",
    level: "basic",
    codeExample: "=MEDIAN(1,2,3) → 2; =MEDIAN(1,2,3,4) → 2.5"
  },
  {
    question: "How does MEDIAN differ from AVERAGE?",
    shortAnswer: "AVERAGE is influenced by outliers; MEDIAN is robust and gives the central value.",
    explanation: "In skewed data, median is often a better representation of 'typical' than mean.",
    level: "basic",
    codeExample: "Data {1,2,3,100}: AVERAGE=26.5, MEDIAN=2.5"
  },
  {
    question: "What does MEDIAN return for an even number of values?",
    shortAnswer: "The average of the two middle numbers after sorting.",
    explanation: "Example: {10,20,30,40} sorted → middle numbers 20 and 30, average = 25.",
    level: "basic",
    codeExample: "=MEDIAN(10,20,30,40) → 25"
  },
  {
    question: "Does MEDIAN ignore blank cells and text?",
    shortAnswer: "Yes, both are ignored completely (not treated as zero).",
    explanation: "Only numbers are considered; blanks and text do not affect the count or the median value.",
    level: "intermediate",
    codeExample: "Range A1:A5 containing {5, , \"a\", 10, 15} → MEDIAN(5,10,15) = 10"
  },
  {
    question: "What error does MEDIAN return if there are no numbers?",
    shortAnswer: "#NUM! error",
    explanation: "Because there is no numeric data to compute a median.",
    level: "basic",
    codeExample: "=MEDIAN(A1:A10) where all are text → #NUM!"
  },
  {
    question: "Can MEDIAN be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so MEDIAN returns the middle date.",
    explanation: "Format the result cell as a date to see the date value.",
    level: "intermediate",
    codeExample: "=MEDIAN(A1:A10) where A1:A10 contain dates → middle date."
  },
  {
    question: "How to compute the conditional median (median of numbers that meet a condition)?",
    shortAnswer: "Use an array formula: =MEDIAN(IF(range=criteria, median_range)).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel; in 365, it works normally.",
    level: "advanced",
    codeExample: "{=MEDIAN(IF(A1:A100=\"Rice\", B1:B100))}"
  },
  {
    question: "Is MEDIAN case‑sensitive in conditional arrays?",
    shortAnswer: "No, the condition using = is case‑insensitive. Use EXACT for case‑sensitive.",
    explanation: "Combine with EXACT inside IF.",
    level: "advanced",
    codeExample: "{=MEDIAN(IF(EXACT(A1:A100,\"Rice\"), B1:B100))}"
  },
  {
    question: "What is the median of {5,5,5,5}?",
    shortAnswer: "5",
    explanation: "Even count: middle numbers are both 5, average = 5.",
    level: "basic",
    codeExample: "All numbers same → median = that number."
  },
  {
    question: "Does MEDIAN treat logical values (TRUE/FALSE) differently when they are in cell references vs direct arguments?",
    shortAnswer: "In cell references, they are ignored; as direct arguments, TRUE=1, FALSE=0.",
    explanation: "Direct arguments coerce; cell references do not.",
    level: "advanced",
    codeExample: "=MEDIAN(TRUE, FALSE, 5) → (0+1+5)/3 = 2? Actually median of {0,1,5} = 1. But =MEDIAN(A1:A3) with TRUE in A1 gives 5 (ignores TRUE)."
  },
  {
    question: "How to get the median while ignoring zeros?",
    shortAnswer: "Use array formula: =MEDIAN(IF(range<>0, range))",
    explanation: "This excludes zeros from the set before calculating median.",
    level: "advanced",
    codeExample: "{=MEDIAN(IF(A1:A100<>0, A1:A100))}"
  },
  {
    question: "What is the maximum number of arguments MEDIAN accepts?",
    shortAnswer: "255 arguments, like most aggregation functions.",
    explanation: "Each argument can be a cell, range, or constant.",
    level: "expert",
    codeExample: "=MEDIAN(A1:A1000000, B1:B1000000) works."
  },
  {
    question: "Can MEDIAN be used with 3D references?",
    shortAnswer: "Yes, e.g., =MEDIAN(Sheet1:Sheet3!A1) gives median of A1 across those sheets.",
    explanation: "All sheets between Sheet1 and Sheet3 inclusive.",
    level: "advanced",
    codeExample: "=MEDIAN(Jan:Dec!B5)"
  },
  {
    question: "Why might MEDIAN return a decimal even when all inputs are integers?",
    shortAnswer: "Because the two middle numbers average may be a fraction (e.g., (5+6)/2 = 5.5).",
    explanation: "That's mathematically correct.",
    level: "basic",
    codeExample: "=MEDIAN(1,2,3,4) → 2.5"
  },
  {
    question: "What is the difference between MEDIAN and MODE?",
    shortAnswer: "MEDIAN is the middle value; MODE is the most frequent value.",
    explanation: "They are different measures of central tendency.",
    level: "basic",
    codeExample: "{1,2,2,3} → MEDIAN=2, MODE=2 (coincidence), but generally different."
  },
  {
    question: "How to compute median for a grouped dataset (e.g., salary by department)?",
    shortAnswer: "Use pivot table (Add to Data Model? Not directly) or helper columns. In Excel, you can use array formula with IF per department.",
    explanation: "Pivot tables do not offer median directly; use Power Pivot or array formulas.",
    level: "expert",
    codeExample: "{=MEDIAN(IF(DeptRange=\"IT\", SalaryRange))}"
  },
  {
    question: "Can MEDIAN be used across filtered rows only?",
    shortAnswer: "Not directly; MEDIAN includes all rows. Use SUBTOTAL with function 12? SUBTOTAL does not have median. Use AGGREGATE(12,5,range) to ignore hidden rows.",
    explanation: "AGGREGATE function offers median while respecting filters and hidden rows.",
    level: "advanced",
    codeExample: "=AGGREGATE(12,5, A2:A100)"
  },
  {
    question: "What is the median of an empty range?",
    shortAnswer: "#NUM! error.",
    explanation: "No numbers to evaluate.",
    level: "basic",
    codeExample: "=MEDIAN(A1:A10) all blank → #NUM!"
  },
  {
    question: "How to quickly compare mean vs median in a dataset?",
    shortAnswer: "Calculate both; if they differ significantly, the data is skewed.",
    explanation: "Use conditional formatting to highlight large differences.",
    level: "intermediate",
    codeExample: "=IF(ABS(AVERAGE(data)-MEDIAN(data)) > threshold, \"Skewed\", \"Symmetric\")"
  },
  {
    question: "Does MEDIAN treat numbers stored as text (e.g., '5') as numbers?",
    shortAnswer: "No, they are ignored because they are text, not numbers.",
    explanation: "Convert using VALUE() or multiply by 1.",
    level: "intermediate",
    codeExample: "If A1='5' as text, =MEDIAN(A1,10) → 10 (ignores '5')."
  },
  {
    question: "Can MEDIAN be used with dynamic arrays in Excel 365?",
    shortAnswer: "Yes, you can pass a dynamic array to MEDIAN directly.",
    explanation: "Example: =MEDIAN(FILTER(A2:A100, B2:B100=\"Yes\")) works without Ctrl+Shift+Enter.",
    level: "advanced",
    codeExample: "=MEDIAN(FILTER(Salary, Dept=\"Sales\"))"
  },
  {
    question: "What is the median of {1,2,2,3,4}?",
    shortAnswer: "2 (the third value in sorted order: 1,2,2,3,4 → middle = 2).",
    explanation: "Even with duplicates, the position defines the median.",
    level: "basic",
    codeExample: "=MEDIAN(1,2,2,3,4) → 2"
  },
  {
    question: "Why do some analysts prefer median over average for income data?",
    shortAnswer: "Income data is often right‑skewed (high incomes pull the average up), so median better reflects 'typical' earner.",
    explanation: "The median is not distorted by extreme values.",
    level: "intermediate",
    codeExample: "Median household income is reported more often than mean."
  },
  {
    question: "How to calculate median while ignoring errors in the range?",
    shortAnswer: "Use AGGREGATE(12,6,range). The second argument 6 tells it to ignore errors.",
    explanation: "AGGREGATE is a robust function that can skip errors, hidden rows, etc.",
    level: "expert",
    codeExample: "=AGGREGATE(12,6, A2:A100)"
  },
  {
    question: "Does MEDIAN work with decimal numbers?",
    shortAnswer: "Yes, any numeric value, including decimals, is handled correctly.",
    explanation: "It uses standard numeric sorting.",
    level: "basic",
    codeExample: "=MEDIAN(1.5, 2.7, 3.2) → 2.7"
  },
  {
    question: "What is the median of a single number?",
    shortAnswer: "That number itself.",
    explanation: "With one value, it's both the minimum, median, and maximum.",
    level: "basic",
    codeExample: "=MEDIAN(42) → 42"
  },
  {
    question: "How can you find the median of the top 5 values in a range?",
    shortAnswer: "Use =MEDIAN(LARGE(range, {1,2,3,4,5})).",
    explanation: "LARGE returns an array of the top 5 values; MEDIAN then finds their median.",
    level: "advanced",
    codeExample: "=MEDIAN(LARGE(A1:A100, {1,2,3,4,5}))"
  },
  {
    question: "Is there a performance penalty for using MEDIAN on a whole column (e.g., A:A)?",
    shortAnswer: "It must examine all 1M+ rows, so it can be slow. Prefer a defined range or Table.",
    explanation: "Works, but not recommended for large datasets.",
    level: "intermediate",
    codeExample: "Better =MEDIAN(A2:A10000) than =MEDIAN(A:A)."
  },
  {
    question: "Can MEDIAN be used in conditional formatting to highlight values above the median?",
    shortAnswer: "Yes, use formula rule: =A1>MEDIAN($A$1:$A$100)",
    explanation: "Conditional formatting can refer to the MEDIAN function, but absolute range is needed.",
    level: "advanced",
    codeExample: "Highlights cells above median."
  },
  {
    question: "What is the median of {1,2,3,4,5}?",
    shortAnswer: "3",
    explanation: "Odd count, centre value.",
    level: "basic",
    codeExample: "Sorted: 1,2,3,4,5 → middle = 3."
  }
];

export default questions;