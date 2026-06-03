const questions = [
  {
    question: "What does LARGE function do?",
    shortAnswer: "Returns the k‑th largest value in a dataset.",
    explanation: "It sorts numbers in descending order and picks the k‑th position.",
    level: "basic",
    codeExample: "=LARGE(A1:A10, 2) → second largest"
  },
  {
    question: "What is the result of =LARGE({10,20,30}, 1)?",
    shortAnswer: "30",
    explanation: "k=1 gives the maximum value.",
    level: "basic",
    codeExample: "Same as MAX."
  },
  {
    question: "What error does LARGE return if k > number of numeric values?",
    shortAnswer: "#NUM!",
    explanation: "Because there is no k‑th largest value.",
    level: "basic",
    codeExample: "=LARGE(A1:A10, 11) if only 10 numbers → #NUM!"
  },
  {
    question: "Does LARGE ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored; they are not counted in the ranking.",
    level: "basic",
    codeExample: "Range with {5, \"a\", blank, 10} → LARGE(range,2) returns 5."
  },
  {
    question: "How to get the top 3 values using LARGE?",
    shortAnswer: "Use array constant: =LARGE(range, {1,2,3}).",
    explanation: "In older Excel, enter as array formula; in 365, it spills automatically.",
    level: "intermediate",
    codeExample: "=LARGE(A2:A100, {1,2,3})"
  },
  {
    question: "Can LARGE be used with a cell reference for k?",
    shortAnswer: "Yes, e.g., =LARGE(range, E1).",
    explanation: "This makes the rank dynamic.",
    level: "intermediate",
    codeExample: "=LARGE(Sales, E2)"
  },
  {
    question: "What is the difference between LARGE and MAX?",
    shortAnswer: "MAX returns only the largest value; LARGE can return any rank (1st, 2nd, etc.).",
    explanation: "LARGE is a generalisation of MAX.",
    level: "basic",
    codeExample: "MAX(range) = LARGE(range, 1)."
  },
  {
    question: "How to sum the top 5 values using LARGE?",
    shortAnswer: "=SUM(LARGE(range, {1,2,3,4,5})).",
    explanation: "Array constant inside LARGE, then SUM.",
    level: "advanced",
    codeExample: "=SUM(LARGE(A2:A100, {1,2,3,4,5}))"
  },
  {
    question: "What does LARGE return if there are duplicate values?",
    shortAnswer: "The same value for consecutive ranks. Example: {5,5,3} → LARGE(…,1)=5, LARGE(…,2)=5, LARGE(…,3)=3.",
    explanation: "Duplicates occupy multiple rank positions.",
    level: "intermediate",
    codeExample: "Ties are handled consistently."
  },
  {
    question: "Can LARGE be used with date values?",
    shortAnswer: "Yes, dates are numeric, so it returns the latest (largest) date for k=1, second latest for k=2, etc.",
    explanation: "Useful for finding most recent dates.",
    level: "intermediate",
    codeExample: "=LARGE(OrderDates, 1) → most recent date."
  },
  {
    question: "What is the maximum number of arguments LARGE can accept?",
    shortAnswer: "LARGE takes exactly two arguments: array and k.",
    explanation: "The array can be a range, named range, or array constant.",
    level: "basic",
    codeExample: "Only two arguments."
  },
  {
    question: "How to get the k‑th largest value excluding zeros?",
    shortAnswer: "Use array formula: =LARGE(IF(range<>0, range), k).",
    explanation: "Excludes zero values before ranking.",
    level: "advanced",
    codeExample: "{=LARGE(IF(A1:A100<>0, A1:A100), 3)}"
  },
  {
    question: "Why does LARGE sometimes return #NUM! even when k seems valid?",
    shortAnswer: "The range may contain fewer numbers than you think (due to text, blanks, errors).",
    explanation: "Check with COUNT(range) to see how many numeric values exist.",
    level: "intermediate",
    codeExample: "Use =COUNT(range) to debug."
  },
  {
    question: "Can LARGE work with a 3D reference across sheets?",
    shortAnswer: "Not directly; you would need to combine ranges using VSTACK in 365 or multiple LARGE calls.",
    explanation: "In older Excel, use helper sheet.",
    level: "advanced",
    codeExample: "=LARGE(VSTACK(Sheet1!A:A, Sheet2!A:A), 2) in Excel 365."
  },
  {
    question: "What is the output of =LARGE({5,5,5,5}, 3)?",
    shortAnswer: "5",
    explanation: "All values are 5, so any k returns 5.",
    level: "basic",
    codeExample: "Identical values."
  },
  {
    question: "How to get the top 3 values with RANK (without SORT)?",
    shortAnswer: "Use LARGE with array constant {1,2,3}.",
    explanation: "That's the standard approach.",
    level: "intermediate",
    codeExample: "=LARGE(range, {1,2,3})"
  },
  {
    question: "Can LARGE be used with a table structured reference?",
    shortAnswer: "Yes: =LARGE(Table1[Sales], 2).",
    explanation: "Structured references work seamlessly.",
    level: "basic",
    codeExample: "=LARGE(Table1[Amount], 3)"
  },
  {
    question: "What happens if k is negative?",
    shortAnswer: "Returns #NUM! error.",
    explanation: "k must be a positive integer.",
    level: "basic",
    codeExample: "=LARGE(range, -1) → #NUM!"
  },
  {
    question: "How to get the largest value from a filtered list (visible rows only)?",
    shortAnswer: "Use SUBTOTAL(4, range) for MAX, but for LARGE with visibility, you need AGGREGATE(14,5,range,k).",
    explanation: "AGGREGATE(14,5,range,k) returns the k‑th largest ignoring hidden rows.",
    level: "advanced",
    codeExample: "=AGGREGATE(14,5, B2:B100, 2)"
  },
  {
    question: "Is LARGE faster than SORT+INDEX for a single value?",
    shortAnswer: "Yes, LARGE is optimised for this and is usually faster.",
    explanation: "For extracting a single rank, LARGE is the right tool.",
    level: "advanced",
    codeExample: "Use LARGE for performance."
  },
  {
    question: "How to find the top 3 products by sales using LARGE and XLOOKUP?",
    shortAnswer: "First get the top 3 sales values with LARGE, then use XLOOKUP to find product names. Beware of duplicates.",
    explanation: "For duplicates, use techniques to break ties (e.g., helper column).",
    level: "expert",
    codeExample: "=XLOOKUP(LARGE(Sales,1), Sales, Products)"
  },
  {
    question: "What is the result of =LARGE({1,2,3}, 0)?",
    shortAnswer: "#NUM! (k must be ≥ 1).",
    explanation: "k=0 is invalid.",
    level: "basic",
    codeExample: "k must be a positive integer."
  },
  {
    question: "Can LARGE be used with array constants inside SUMPRODUCT?",
    shortAnswer: "Yes: =SUMPRODUCT(LARGE(range, {1,2,3}))",
    explanation: "Works in modern Excel, but careful with older versions.",
    level: "advanced",
    codeExample: "Alternative to SUM(array formula)."
  },
  {
    question: "What does LARGE return if there are less than k numeric values?",
    shortAnswer: "#NUM! error.",
    explanation: "Because there aren't enough numbers to extract the k‑th largest.",
    level: "basic",
    codeExample: "Check count with COUNT(range)."
  },
  {
    question: "How to use LARGE to find the 3rd largest unique value (ignoring duplicates)?",
    shortAnswer: "Use array formula: =LARGE(IF(FREQUENCY(range, range), range), 3).",
    explanation: "This is advanced; usually simpler to remove duplicates first.",
    level: "expert",
    codeExample: "Complex but possible."
  },
  {
    question: "Is LARGE volatile?",
    shortAnswer: "No, it is not volatile (it recalculates only when data changes).",
    explanation: "Safe for large workbooks.",
    level: "intermediate",
    codeExample: "No unnecessary recalculation."
  },
  {
    question: "How can LARGE be used to label top performers?",
    shortAnswer: "Combine with IF: =IF(A1>=LARGE($A$1:$A$100,5), \"Top 5\", \"\")",
    explanation: "Highlights values that are top 5.",
    level: "intermediate",
    codeExample: "Conditional formatting or helper column."
  },
  {
    question: "Can LARGE be used with a dynamic array?",
    shortAnswer: "Yes, in Excel 365, you can pass a dynamic array to LARGE directly.",
    explanation: "Eg: =LARGE(FILTER(A:A, A:A>0), 2).",
    level: "advanced",
    codeExample: "Works without array formula entry."
  },
  {
    question: "What is the difference between LARGE and QUARTILE for outliers?",
    shortAnswer: "QUARTILE returns data at specific percentiles; LARGE returns the k‑th largest (rank).",
    explanation: "They serve different purposes.",
    level: "intermediate",
    codeExample: "QUARTILE is for distribution; LARGE for ranking."
  },
  {
    question: "How to get the top N values and ignore #N/A errors?",
    shortAnswer: "Use array formula: =LARGE(IF(NOT(ISERROR(range)), range), k).",
    explanation: "First exclude errors, then find k‑th largest.",
    level: "expert",
    codeExample: "{=LARGE(IF(ISNUMBER(A1:A100), A1:A100), 3)}"
  }
];

export default questions;