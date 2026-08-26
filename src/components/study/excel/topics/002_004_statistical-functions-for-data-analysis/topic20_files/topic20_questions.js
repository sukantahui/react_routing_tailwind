const questions = [
  {
    question: "What does SMALL function do?",
    shortAnswer: "Returns the k‑th smallest value in a dataset.",
    explanation: "It sorts numbers ascending and picks the k‑th position.",
    level: "basic",
    codeExample: "=SMALL(A1:A10, 2) → second smallest"
  },
  {
    question: "What is the result of =SMALL({10,20,30}, 1)?",
    shortAnswer: "10",
    explanation: "k=1 gives the minimum value.",
    level: "basic",
    codeExample: "Same as MIN."
  },
  {
    question: "What error does SMALL return if k > number of numeric values?",
    shortAnswer: "#NUM!",
    explanation: "Because there is no k‑th smallest value.",
    level: "basic",
    codeExample: "=SMALL(A1:A10, 11) if only 10 numbers → #NUM!"
  },
  {
    question: "Does SMALL ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored; they are not counted in the ranking.",
    level: "basic",
    codeExample: "Range {5, \"a\", blank, 10} → SMALL(range,1)=5."
  },
  {
    question: "How to get the bottom 3 values using SMALL?",
    shortAnswer: "Use array constant: =SMALL(range, {1,2,3}).",
    explanation: "In older Excel, enter as array formula; in 365, it spills automatically.",
    level: "intermediate",
    codeExample: "=SMALL(A2:A100, {1,2,3})"
  },
  {
    question: "Can SMALL be used with a cell reference for k?",
    shortAnswer: "Yes, e.g., =SMALL(range, E1).",
    explanation: "Makes the rank dynamic.",
    level: "intermediate",
    codeExample: "=SMALL(Scores, E2)"
  },
  {
    question: "What is the difference between SMALL and MIN?",
    shortAnswer: "MIN returns only the minimum; SMALL can return any rank (1st, 2nd, etc.).",
    explanation: "SMALL is a generalisation of MIN.",
    level: "basic",
    codeExample: "MIN(range) = SMALL(range, 1)."
  },
  {
    question: "How to sum the bottom 5 values using SMALL?",
    shortAnswer: "=SUM(SMALL(range, {1,2,3,4,5})).",
    explanation: "Array constant inside SMALL, then SUM.",
    level: "advanced",
    codeExample: "=SUM(SMALL(A2:A100, {1,2,3,4,5}))"
  },
  {
    question: "What does SMALL return if there are duplicate values?",
    shortAnswer: "The same value for consecutive ranks. Example: {3,3,5} → SMALL(…,1)=3, SMALL(…,2)=3, SMALL(…,3)=5.",
    explanation: "Duplicates occupy multiple rank positions.",
    level: "intermediate",
    codeExample: "Ties are handled consistently."
  },
  {
    question: "Can SMALL be used with date values?",
    shortAnswer: "Yes, dates are numeric, so it returns the earliest (smallest) date for k=1, second earliest for k=2, etc.",
    explanation: "Useful for finding earliest dates.",
    level: "intermediate",
    codeExample: "=SMALL(OrderDates, 1) → earliest date."
  },
  {
    question: "What is the maximum number of arguments SMALL can accept?",
    shortAnswer: "SMALL takes exactly two arguments: array and k.",
    explanation: "The array can be a range, named range, or array constant.",
    level: "basic",
    codeExample: "Only two arguments."
  },
  {
    question: "How to get the k‑th smallest value excluding zeros?",
    shortAnswer: "Use array formula: =SMALL(IF(range<>0, range), k).",
    explanation: "Excludes zero values before ranking.",
    level: "advanced",
    codeExample: "{=SMALL(IF(A1:A100<>0, A1:A100), 3)}"
  },
  {
    question: "Why does SMALL sometimes return #NUM! even when k seems valid?",
    shortAnswer: "The range may contain fewer numbers than you think (due to text, blanks, errors).",
    explanation: "Check with COUNT(range) to see how many numeric values exist.",
    level: "intermediate",
    codeExample: "Use =COUNT(range) to debug."
  },
  {
    question: "Can SMALL work with a 3D reference across sheets?",
    shortAnswer: "Not directly; you would need to combine ranges using VSTACK in 365 or multiple SMALL calls.",
    explanation: "In older Excel, use helper sheet.",
    level: "advanced",
    codeExample: "=SMALL(VSTACK(Sheet1!A:A, Sheet2!A:A), 2) in Excel 365."
  },
  {
    question: "What is the output of =SMALL({5,5,5,5}, 3)?",
    shortAnswer: "5",
    explanation: "All values are 5, so any k returns 5.",
    level: "basic",
    codeExample: "Identical values."
  },
  {
    question: "How to get the bottom 3 values with RANK (without SORT)?",
    shortAnswer: "Use SMALL with array constant {1,2,3}.",
    explanation: "That's the standard approach.",
    level: "intermediate",
    codeExample: "=SMALL(range, {1,2,3})"
  },
  {
    question: "Can SMALL be used with a table structured reference?",
    shortAnswer: "Yes: =SMALL(Table1[Sales], 2).",
    explanation: "Structured references work seamlessly.",
    level: "basic",
    codeExample: "=SMALL(Table1[Amount], 3)"
  },
  {
    question: "What happens if k is negative?",
    shortAnswer: "Returns #NUM! error.",
    explanation: "k must be a positive integer.",
    level: "basic",
    codeExample: "=SMALL(range, -1) → #NUM!"
  },
  {
    question: "How to get the smallest value from a filtered list (visible rows only)?",
    shortAnswer: "Use SUBTOTAL(5, range) for MIN, but for SMALL with visibility, you need AGGREGATE(15,5,range,k).",
    explanation: "AGGREGATE(15,5,range,k) returns the k‑th smallest ignoring hidden rows.",
    level: "advanced",
    codeExample: "=AGGREGATE(15,5, B2:B100, 2)"
  },
  {
    question: "Is SMALL faster than SORT+INDEX for a single value?",
    shortAnswer: "Yes, SMALL is optimised and usually faster.",
    explanation: "For extracting a single rank, SMALL is the right tool.",
    level: "advanced",
    codeExample: "Use SMALL for performance."
  },
  {
    question: "How to find the bottom 3 products by sales using SMALL and XLOOKUP?",
    shortAnswer: "First get the bottom 3 sales values with SMALL, then use XLOOKUP to find product names. Beware of duplicates.",
    explanation: "For duplicates, use tie‑breaking techniques (helper column).",
    level: "expert",
    codeExample: "=XLOOKUP(SMALL(Sales,1), Sales, Products)"
  },
  {
    question: "What is the relationship between SMALL and LARGE?",
    shortAnswer: "SMALL(array, k) = -LARGE(-array, k).",
    explanation: "Negating the array flips the order.",
    level: "intermediate",
    codeExample: "Check with sample data."
  },
  {
    question: "What is the result of =SMALL({1,2,3}, 0)?",
    shortAnswer: "#NUM! (k must be ≥ 1).",
    explanation: "k=0 is invalid.",
    level: "basic",
    codeExample: "k must be a positive integer."
  },
  {
    question: "Can SMALL be used with array constants inside SUMPRODUCT?",
    shortAnswer: "Yes: =SUMPRODUCT(SMALL(range, {1,2,3}))",
    explanation: "Works in modern Excel, but careful with older versions.",
    level: "advanced",
    codeExample: "Alternative to SUM(array formula)."
  },
  {
    question: "What does SMALL return if there are less than k numeric values?",
    shortAnswer: "#NUM! error.",
    explanation: "Because there aren't enough numbers to extract the k‑th smallest.",
    level: "basic",
    codeExample: "Check count with COUNT(range)."
  },
  {
    question: "How to use SMALL to find the 3rd smallest unique value (ignoring duplicates)?",
    shortAnswer: "Use array formula: =SMALL(IF(FREQUENCY(range, range), range), 3).",
    explanation: "This is advanced; usually simpler to remove duplicates first.",
    level: "expert",
    codeExample: "Complex but possible."
  },
  {
    question: "Is SMALL volatile?",
    shortAnswer: "No, it is not volatile (it recalculates only when data changes).",
    explanation: "Safe for large workbooks.",
    level: "intermediate",
    codeExample: "No unnecessary recalculation."
  },
  {
    question: "How can SMALL be used to label bottom performers?",
    shortAnswer: "Combine with IF: =IF(A1<=SMALL($A$1:$A$100,5), \"Bottom 5\", \"\")",
    explanation: "Highlights values that are in the bottom 5.",
    level: "intermediate",
    codeExample: "Conditional formatting or helper column."
  },
  {
    question: "Can SMALL be used with a dynamic array?",
    shortAnswer: "Yes, in Excel 365, you can pass a dynamic array to SMALL directly.",
    explanation: "Eg: =SMALL(FILTER(A:A, A:A>0), 2).",
    level: "advanced",
    codeExample: "Works without array formula entry."
  },
  {
    question: "What is the difference between SMALL and QUARTILE for outliers?",
    shortAnswer: "QUARTILE returns data at specific percentiles; SMALL returns the k‑th smallest (rank).",
    explanation: "They serve different purposes.",
    level: "intermediate",
    codeExample: "QUARTILE for distribution; SMALL for ranking."
  }
];

export default questions;