const questions = [
  {
    question: "What does QUARTILE.INC do?",
    shortAnswer: "Returns the quartile of a dataset (0=min, 1=Q1, 2=median, 3=Q3, 4=max) using inclusive interpolation.",
    explanation: "It computes the same values as PERCENTILE.INC with quart*0.25.",
    level: "basic",
    codeExample: "=QUARTILE.INC(A1:A100, 1) → first quartile"
  },
  {
    question: "What percentile corresponds to quart=1?",
    shortAnswer: "25th percentile.",
    explanation: "First quartile = 25% of data below this point.",
    level: "basic",
    codeExample: "=PERCENTILE.INC(data, 0.25) same as QUARTILE.INC(data,1)."
  },
  {
    question: "What does quart=2 return?",
    shortAnswer: "Median (50th percentile).",
    explanation: "Second quartile = median = 50% of data below.",
    level: "basic",
    codeExample: "Same as MEDIAN."
  },
  {
    question: "What is the difference between QUARTILE.INC and QUARTILE.EXC?",
    shortAnswer: "QUARTILE.INC includes min and max as quartiles 0 and 4; QUARTILE.EXC excludes them (uses percentiles 0.25 and 0.75 differently, often giving slightly different values).",
    explanation: "QUARTILE.EXC uses exclusive interpolation, often used in some statistical packages.",
    level: "intermediate",
    codeExample: "For small datasets, they differ."
  },
  {
    question: "What error occurs if quart is not between 0 and 4?",
    shortAnswer: "#NUM!",
    explanation: "Valid quart values are 0,1,2,3,4.",
    level: "basic",
    codeExample: "=QUARTILE.INC(A1:A10, 5) → #NUM!"
  },
  {
    question: "Does QUARTILE.INC ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks do not affect quartile calculation.",
    level: "basic",
    codeExample: "Safe to include headers in the array."
  },
  {
    question: "How to calculate Interquartile Range (IQR) using QUARTILE.INC?",
    shortAnswer: "=QUARTILE.INC(data,3) - QUARTILE.INC(data,1)",
    explanation: "IQR measures the middle 50% spread.",
    level: "basic",
    codeExample: "Used for outlier detection."
  },
  {
    question: "What is the minimum value of a dataset using QUARTILE.INC?",
    shortAnswer: "QUARTILE.INC(data,0)",
    explanation: "This is the same as MIN.",
    level: "basic",
    codeExample: "=QUARTILE.INC(A2:A100,0) = MIN(A2:A100)"
  },
  {
    question: "Is QUARTILE.INC the same as PERCENTILE.INC with 0.25?",
    shortAnswer: "Yes, =QUARTILE.INC(data,1) = PERCENTILE.INC(data,0.25).",
    explanation: "QUARTILE.INC is a convenience wrapper.",
    level: "intermediate",
    codeExample: "Same result."
  },
  {
    question: "What does QUARTILE.INC return for a single number?",
    shortAnswer: "That number for all quart values (0,1,2,3,4).",
    explanation: "With one number, all quartiles equal that number.",
    level: "basic",
    codeExample: "=QUARTILE.INC({5},2) → 5"
  },
  {
    question: "How does QUARTILE.INC handle even-sized datasets?",
    shortAnswer: "It interpolates between values when needed, e.g., median may be average of two middle numbers.",
    explanation: "Follows inclusive percentile method.",
    level: "intermediate",
    codeExample: "{1,2,3,4}: QUARTILE.INC(,2) → 2.5"
  },
  {
    question: "What is the relationship between QUARTILE.INC and MEDIAN?",
    shortAnswer: "QUARTILE.INC(data,2) equals MEDIAN(data).",
    explanation: "Median is the second quartile.",
    level: "basic",
    codeExample: "Yes."
  },
  {
    question: "Can QUARTILE.INC be used with dates?",
    shortAnswer: "Yes, because dates are serial numbers; the result is a date (format as date).",
    explanation: "Useful for finding quartiles of completion dates.",
    level: "intermediate",
    codeExample: "Formatted appropriately."
  },
  {
    question: "What is the output of =QUARTILE.INC({1,3,5,7,9}, 1)?",
    shortAnswer: "3 (the 25th percentile of this odd-sized set).",
    explanation: "25th percentile falls at second element.",
    level: "basic",
    codeExample: "Interpolation may be used depending on data."
  },
  {
    question: "How to find outliers using QUARTILE.INC?",
    shortAnswer: "Compute IQR = Q3 - Q1. Any value below Q1 - 1.5*IQR or above Q3 + 1.5*IQR is an outlier.",
    explanation: "Standard outlier detection rule.",
    level: "advanced",
    codeExample: "Use in conditional formatting."
  },
  {
    question: "What is the maximum number of arguments QUARTILE.INC accepts?",
    shortAnswer: "Two: array and quart.",
    explanation: "Only two arguments.",
    level: "basic",
    codeExample: "Simple."
  },
  {
    question: "Can QUARTILE.INC be used with array constants?",
    shortAnswer: "Yes, e.g., =QUARTILE.INC({1,2,3,4}, 2).",
    explanation: "Array constants work.",
    level: "intermediate",
    codeExample: "=QUARTILE.INC({1,2,3,4}, 1) → 1.75."
  },
  {
    question: "Why might QUARTILE.INC return a value not in the dataset?",
    shortAnswer: "Because it interpolates between data points to give a precise percentile value.",
    explanation: "This matches the definition of percentile (the value below which a certain percentage falls).",
    level: "intermediate",
    codeExample: "Common in statistics."
  },
  {
    question: "Is QUARTILE.INC a volatile function?",
    shortAnswer: "No, it recalculates only when data changes.",
    explanation: "Non‑volatile.",
    level: "basic",
    codeExample: "Safe for large workbooks."
  },
  {
    question: "What is the difference between QUARTILE.INC and the older QUARTILE function?",
    shortAnswer: "They are identical; QUARTILE.INC was introduced for clarity alongside QUARTILE.EXC.",
    explanation: "The old QUARTILE uses the inclusive method.",
    level: "basic",
    codeExample: "Same result."
  },
  {
    question: "Can QUARTILE.INC be used with logical values?",
    shortAnswer: "No, they are ignored (treated as non‑numeric). Use QUARTILE.INC(--(range)) if needed.",
    explanation: "Convert logicals with double unary.",
    level: "advanced",
    codeExample: "Complex."
  },
  {
    question: "What is the result of =QUARTILE.INC({1,1,1,1}, 1)?",
    shortAnswer: "1 (all quartiles are 1).",
    explanation: "All values identical.",
    level: "basic",
    codeExample: "No variation."
  },
  {
    question: "How to compute quartiles for each group (e.g., by city) using QUARTILE.INC?",
    shortAnswer: "Use array formula: =QUARTILE.INC(IF(city=this_city, sales), 2).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel.",
    level: "advanced",
    codeExample: "Conditional quartiles."
  },
  {
    question: "What does QUARTILE.INC(data, 0.5) do?",
    shortAnswer: "Invalid because quart must be integer 0-4. It will return #NUM!.",
    explanation: "Only integers allowed.",
    level: "basic",
    codeExample: "Use PERCENTILE.INC for fractional percentiles."
  },
  {
    question: "Is there a built‑in function to compute all quartiles at once?",
    shortAnswer: "No, but you can use an array constant: =QUARTILE.INC(data, {0,1,2,3,4})",
    explanation: "In Excel 365, this spills five values.",
    level: "advanced",
    codeExample: "Very convenient."
  },
  {
    question: "How can QUARTILE.INC be used in hypothesis testing?",
    shortAnswer: "Indirectly – it helps understand data distribution, which influences choice of test (parametric vs non‑parametric).",
    explanation: "Skewness and outliers detected via quartiles can guide test selection.",
    level: "expert",
    codeExample: "Data exploration."
  },
  {
    question: "What is the formula equivalent of QUARTILE.INC(data,1) using PERCENTILE.INC?",
    shortAnswer: "=PERCENTILE.INC(data, 0.25)",
    explanation: "Exactly the same.",
    level: "intermediate",
    codeExample: "Use whichever you prefer."
  },
  {
    question: "Can QUARTILE.INC be used with a 3D reference across sheets?",
    shortAnswer: "Not directly; you'd need to stack ranges with VSTACK in 365.",
    explanation: "=QUARTILE.INC(VSTACK(Sheet1!A:A, Sheet2!A:A), 2).",
    level: "advanced",
    codeExample: "Works in 365."
  },
  {
    question: "What happens if the array is empty?",
    shortAnswer: "Returns #NUM! error.",
    explanation: "No numbers to compute quartiles.",
    level: "basic",
    codeExample: "Check with COUNT."
  },
  {
    question: "How to get the third quartile using PERCENTILE.EXC?",
    shortAnswer: "=PERCENTILE.EXC(data, 0.75), but that differs from QUARTILE.INC(data,3). QUARTILE.EXC uses exclusive method.",
    explanation: "Be consistent in your method.",
    level: "expert",
    codeExample: "Different results."
  }
];

export default questions;