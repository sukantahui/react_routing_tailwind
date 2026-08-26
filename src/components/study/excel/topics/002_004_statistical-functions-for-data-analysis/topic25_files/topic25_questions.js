const questions = [
  {
    question: "What does PERCENTILE.INC do?",
    shortAnswer: "Returns the value at a given percentile (0 to 1 inclusive) using inclusive interpolation.",
    explanation: "It calculates the value below which a given percentage of data falls, including minimum (0) and maximum (1).",
    level: "basic",
    codeExample: "=PERCENTILE.INC(A1:A100, 0.9) → 90th percentile"
  },
  {
    question: "What range of k is allowed in PERCENTILE.INC?",
    shortAnswer: "0 to 1 inclusive.",
    explanation: "k = 0 gives the minimum, k = 1 gives the maximum.",
    level: "basic",
    codeExample: "=PERCENTILE.INC(data, 0.5) = MEDIAN(data)"
  },
  {
    question: "How does PERCENTILE.INC differ from PERCENTILE.EXC?",
    shortAnswer: "PERCENTILE.INC includes k=0 and k=1 (min/max) and uses a different interpolation formula; PERCENTILE.EXC excludes extremes and uses exclusive interpolation.",
    explanation: "For small datasets, results will differ; for large datasets, they converge.",
    level: "intermediate",
    codeExample: "For {1,2,3}, PERCENTILE.INC(data,0.25) ≈ 1.5; PERCENTILE.EXC(data,0.25) = #NUM! because n insufficient."
  },
  {
    question: "What error does PERCENTILE.INC return if k is outside [0,1]?",
    shortAnswer: "#NUM!",
    explanation: "k must be a fraction between 0 and 1 inclusive.",
    level: "basic",
    codeExample: "=PERCENTILE.INC(A1:A10, 1.2) → #NUM!"
  },
  {
    question: "What does PERCENTILE.INC return for an empty array?",
    shortAnswer: "#NUM!",
    explanation: "No numbers to compute percentile.",
    level: "basic",
    codeExample: "=PERCENTILE.INC(A1:A10, 0.5) where all blank → #NUM!"
  },
  {
    question: "Is PERCENTILE.INC the same as QUARTILE.INC for k=0.25?",
    shortAnswer: "Yes, PERCENTILE.INC(data, 0.25) = QUARTILE.INC(data, 1).",
    explanation: "QUARTILE.INC is a special case of PERCENTILE.INC.",
    level: "basic",
    codeExample: "Interchangeable."
  },
  {
    question: "Does PERCENTILE.INC ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored, allowing headers in the range.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "How is the percentile value computed when the index is not an integer?",
    shortAnswer: "It interpolates between the two nearest data points.",
    explanation: "For example, index = 2.3 → returns value at position 2 + (value3-value2)*0.3.",
    level: "intermediate",
    codeExample: "Common in statistics."
  },
  {
    question: "What is the formula for the index position used by PERCENTILE.INC?",
    shortAnswer: "p = k*(n-1) + 1, where n is the count of numbers.",
    explanation: "This gives the position in the sorted list (1‑based).",
    level: "advanced",
    codeExample: "Used internally."
  },
  {
    question: "Can PERCENTILE.INC be used with dates?",
    shortAnswer: "Yes, dates are serial numbers; result is a date (format as date).",
    explanation: "Useful for finding percentile dates (e.g., 90% of orders shipped by a certain date).",
    level: "intermediate",
    codeExample: "=PERCENTILE.INC(date_range, 0.9)"
  },
  {
    question: "What is the maximum number of arguments PERCENTILE.INC accepts?",
    shortAnswer: "Two: array and k.",
    explanation: "Only two arguments.",
    level: "basic",
    codeExample: "Simple."
  },
  {
    question: "How to get the 90th percentile for a subset (e.g., only North region)?",
    shortAnswer: "Use array formula: =PERCENTILE.INC(IF(region=this_region, sales), 0.9).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel; in 365 works normally.",
    level: "advanced",
    codeExample: "Conditional percentile."
  },
  {
    question: "What does PERCENTILE.INC return for a single number?",
    shortAnswer: "That number for any k between 0 and 1.",
    explanation: "With one number, all percentiles equal that number.",
    level: "basic",
    codeExample: "=PERCENTILE.INC({5}, 0.5) → 5"
  },
  {
    question: "Is PERCENTILE.INC a volatile function?",
    shortAnswer: "No, it recalculates only when data changes.",
    explanation: "Non‑volatile.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "How does PERCENTILE.INC handle duplicate values?",
    shortAnswer: "Duplicates are handled naturally; interpolation will often pick a value that matches repeated values.",
    explanation: "If many duplicates, the percentile may equal that repeated value.",
    level: "intermediate",
    codeExample: "Works fine."
  },
  {
    question: "What is the result of =PERCENTILE.INC({1,2,3,4,5}, 0.5)?",
    shortAnswer: "3 (the median).",
    explanation: "k=0.5 gives median.",
    level: "basic",
    codeExample: "Middle value."
  },
  {
    question: "Can PERCENTILE.INC be used with array constants?",
    shortAnswer: "Yes, e.g., =PERCENTILE.INC({1,2,3,4,5}, 0.9).",
    explanation: "Array constants work.",
    level: "intermediate",
    codeExample: "=PERCENTILE.INC({1,2,3,4,5},0.9) → 4.6 (interpolated)."
  },
  {
    question: "Why does PERCENTILE.INC sometimes return a value not present in the dataset?",
    shortAnswer: "Because it interpolates between actual data points to give an exact percentile estimate.",
    explanation: "This is standard practice in statistics.",
    level: "intermediate",
    codeExample: "Use for continuous distributions."
  },
  {
    question: "How to compute multiple percentiles at once in Excel 365?",
    shortAnswer: "=PERCENTILE.INC(data, {0.1,0.2,0.3,0.4,0.5})",
    explanation: "This spills an array of percentiles horizontally or vertically depending on shape.",
    level: "advanced",
    codeExample: "Very powerful."
  },
  {
    question: "Does PERCENTILE.INC work with negative numbers?",
    shortAnswer: "Yes, negatively works normally (more negative is smaller).",
    explanation: "Percentiles are computed on the sorted order.",
    level: "basic",
    codeExample: "Works fine."
  },
  {
    question: "What is the difference between PERCENTILE.INC and PERCENTRANK.INC?",
    shortAnswer: "PERCENTILE.INC gives the value at a given percentile; PERCENTRANK.INC gives the percentile rank of a given value.",
    explanation: "They are inverse functions (approximately).",
    level: "intermediate",
    codeExample: "PERCENTRANK.INC(data, PERCENTILE.INC(data,0.9)) ≈ 0.9."
  },
  {
    question: "Can PERCENTILE.INC be used in conditional formatting to highlight top 10%?",
    shortAnswer: "Yes: =A1 > PERCENTILE.INC($A$1:$A$100, 0.9)",
    explanation: "Highlights values above the 90th percentile.",
    level: "intermediate",
    codeExample: "Works well."
  },
  {
    question: "What is the output of =PERCENTILE.INC({1,2,3,4,5,6}, 0.25)?",
    shortAnswer: "2.25 (interpolated between 2 and 3).",
    explanation: "Index = 0.25*(6-1)+1 = 2.25 → between 2nd (2) and 3rd (3).",
    level: "advanced",
    codeExample: "Manual check."
  },
  {
    question: "Is there a built‑in function to compute the 95th percentile?",
    shortAnswer: "Yes: =PERCENTILE.INC(data, 0.95).",
    explanation: "Commonly used for outlier detection.",
    level: "basic",
    codeExample: "Often used in performance testing."
  },
  {
    question: "What happens if the array contains errors?",
    shortAnswer: "PERCENTILE.INC returns that error.",
    explanation: "Errors propagate; clean data first.",
    level: "intermediate",
    codeExample: "Use IFERROR in helper column."
  },
  {
    question: "Can PERCENTILE.INC be used with a 3D reference across sheets?",
    shortAnswer: "Not directly; in 365 you can use VSTACK: =PERCENTILE.INC(VSTACK(Sheet1!A:A, Sheet2!A:A), 0.5).",
    explanation: "Workaround with dynamic arrays.",
    level: "advanced",
    codeExample: "Only in 365."
  },
  {
    question: "How to get the 10th and 90th percentiles in one formula?",
    shortAnswer: "=PERCENTILE.INC(data, {0.1,0.9})",
    explanation: "Spills two values.",
    level: "advanced",
    codeExample: "Use in Excel 365."
  },
  {
    question: "What is the minimum number of data points needed for PERCENTILE.INC to not return #NUM!?",
    shortAnswer: "At least one number.",
    explanation: "With one number, all k return that number.",
    level: "basic",
    codeExample: "n=1 works."
  },
  {
    question: "Why would you use PERCENTILE.INC instead of PERCENTILE.EXC?",
    shortAnswer: "When you want inclusive extremes (min/max) and a definition that matches common business reporting.",
    explanation: "No right answer; depends on convention.",
    level: "intermediate",
    codeExample: "Choose based on audience."
  },
  {
    question: "Does PERCENTILE.INC treat logical values in cells as numbers?",
    shortAnswer: "No, logicals are ignored. Use --(range) to convert to 1/0.",
    explanation: "Convert if needed.",
    level: "advanced",
    codeExample: "Rare."
  }
];

export default questions;