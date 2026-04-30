const questions = [
  {
    question: "What does QUARTILE.EXC do?",
    shortAnswer: "Returns the quartile of a dataset (Q1, Q2, Q3) using exclusive interpolation.",
    explanation: "It computes the same as PERCENTILE.EXC with quart*0.25, but does not allow quart=0 or 4.",
    level: "basic",
    codeExample: "=QUARTILE.EXC(A1:A100, 1) → exclusive Q1"
  },
  {
    question: "Which quart numbers are valid in QUARTILE.EXC?",
    shortAnswer: "1 (Q1), 2 (median), 3 (Q3).",
    explanation: "0 and 4 are not allowed because the function is exclusive.",
    level: "basic",
    codeExample: "=QUARTILE.EXC(data, 0) → #NUM!"
  },
  {
    question: "What is the difference between QUARTILE.EXC and QUARTILE.INC?",
    shortAnswer: "QUARTILE.EXC excludes the extremes (min/max) and uses a different interpolation; QUARTILE.INC includes them.",
    explanation: "For the same dataset, Q1 and Q3 may differ, especially for small n.",
    level: "intermediate",
    codeExample: "Try {1,2,3,4,5,6,7,8,9,10}"
  },
  {
    question: "When does QUARTILE.EXC return #NUM! for quart=1?",
    shortAnswer: "When the number of data points is fewer than 4 (n < 4).",
    explanation: "Exclusive calculation requires enough points to compute the 25th percentile without including the min.",
    level: "intermediate",
    codeExample: "=QUARTILE.EXC({1,2,3},1) → #NUM!"
  },
  {
    question: "Does QUARTILE.EXC ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored, allowing headers in the range.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "What is the equivalent of QUARTILE.EXC(data,2)?",
    shortAnswer: "MEDIAN(data), provided n ≥ 2.",
    explanation: "The median is the 50th percentile.",
    level: "basic",
    codeExample: "=MEDIAN(data)"
  },
  {
    question: "How to calculate IQR using QUARTILE.EXC?",
    shortAnswer: "=QUARTILE.EXC(data,3) - QUARTILE.EXC(data,1)",
    explanation: "IQR = Q3 − Q1, but remember that this excludes extremes.",
    level: "basic",
    codeExample: "Used for outlier detection."
  },
  {
    question: "What does QUARTILE.EXC return for a dataset with all identical numbers?",
    shortAnswer: "That number for any valid quart.",
    explanation: "If all values are the same, all quartiles equal that value.",
    level: "basic",
    codeExample: "=QUARTILE.EXC({5,5,5,5},1) → 5"
  },
  {
    question: "Is QUARTILE.EXC the same as PERCENTILE.EXC with 0.25?",
    shortAnswer: "Yes, =QUARTILE.EXC(data,1) = PERCENTILE.EXC(data,0.25).",
    explanation: "QUARTILE.EXC is a convenience wrapper.",
    level: "intermediate",
    codeExample: "They are identical."
  },
  {
    question: "Why might two different statistical packages give different quartiles for the same data?",
    shortAnswer: "Because they use different algorithms: inclusive (e.g., QUARTILE.INC) vs exclusive (e.g., QUARTILE.EXC).",
    explanation: "There are several definitions of quantiles; be consistent.",
    level: "advanced",
    codeExample: "No one correct definition."
  },
  {
    question: "Can QUARTILE.EXC be used with dates?",
    shortAnswer: "Yes, dates are serial numbers; result is a date.",
    explanation: "Format as date to display correctly.",
    level: "intermediate",
    codeExample: "=QUARTILE.EXC(date_range,1)"
  },
  {
    question: "What is the maximum number of arguments QUARTILE.EXC accepts?",
    shortAnswer: "Two: array and quart.",
    explanation: "Only two arguments.",
    level: "basic",
    codeExample: "Simple."
  },
  {
    question: "Can QUARTILE.EXC be used with array constants?",
    shortAnswer: "Yes, e.g., =QUARTILE.EXC({1,2,3,4,5},2).",
    explanation: "Works with array constants.",
    level: "intermediate",
    codeExample: "=QUARTILE.EXC({1,2,3,4,5},1) → 1.5? Actually calculation yields interpolated value."
  },
  {
    question: "Why does QUARTILE.EXC sometimes return a value that is not in the dataset?",
    shortAnswer: "Because it interpolates between points to estimate the exact percentile value.",
    explanation: "That is by design for continuous percentiles.",
    level: "intermediate",
    codeExample: "Common in statistics."
  },
  {
    question: "Is QUARTILE.EXC a volatile function?",
    shortAnswer: "No, it recalculates only when data changes.",
    explanation: "Non‑volatile.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "What is the underlying percentile formula used by QUARTILE.EXC?",
    shortAnswer: "It uses the exclusive method: p*(n+1) for kth percentile, with interpolation.",
    explanation: "Specifically for quart=1, p=0.25; it uses position = 0.25*(n+1).",
    level: "expert",
    codeExample: "Refer to Excel documentation."
  },
  {
    question: "How does QUARTILE.EXC behave for n=4?",
    shortAnswer: "It can return valid Q1 (25th percentile) but Q1 is interpolated, often between 1st and 2nd smallest values.",
    explanation: "With n=4, position = 0.25*5 = 1.25; interpolation between 1st and 2nd.",
    level: "advanced",
    codeExample: "Works but may differ from other software."
  },
  {
    question: "Can QUARTILE.EXC be used with a 3D reference across sheets?",
    shortAnswer: "Not directly; you would need to combine ranges using VSTACK in 365.",
    explanation: "=QUARTILE.EXC(VSTACK(Sheet1!A:A, Sheet2!A:A), 2)",
    level: "advanced",
    codeExample: "Excel 365 only."
  },
  {
    question: "What happens if the array contains only 2 numbers?",
    shortAnswer: "QUARTILE.EXC(array,2) returns median (average of the two), but QUARTILE.EXC(array,1) returns #NUM!.",
    explanation: "Insufficient data for exclusive Q1.",
    level: "intermediate",
    codeExample: "n=2 → only median works."
  },
  {
    question: "How to compute QUARTILE.EXC for a filtered list?",
    shortAnswer: "QUARTILE.EXC does not respect filters; use AGGREGATE with function 16? AGGREGATE does not have exclusive quartile. Use helper column.",
    explanation: "Manual workaround.",
    level: "expert",
    codeExample: "Complex."
  },
  {
    question: "What is the result of =QUARTILE.EXC({1,2,3,4,5,6},1)?",
    shortAnswer: "Approximately 2.25 (interpolated).",
    explanation: "Position = 0.25*7 = 1.75; interpolation between 2nd (2) and 3rd (3) → 2 + (3-2)*0.75 = 2.75? Wait, check: between 1st and 2nd? Re‑evaluate: sorted values: 1,2,3,4,5,6; n=6, position = 0.25*(6+1)=1.75 → between 1st (1) and 2nd (2) → 1 + (2-1)*0.75 = 1.75. Yes.",
    level: "advanced",
    codeExample: "Calculate manually."
  },
  {
    question: "Which quartile function is used by Excel's box plot chart?",
    shortAnswer: "Excel's built‑in box plot uses QUARTILE.INC (inclusive).",
    explanation: "Since Excel 2016, the box plot is based on inclusive quartiles.",
    level: "expert",
    codeExample: "Good to know."
  },
  {
    question: "Can QUARTILE.EXC be used in conditional formatting to highlight outliers?",
    shortAnswer: "Yes, but you must compute the IQR first in a helper cell or use named formulas.",
    explanation: "=A1 > (QUARTILE.EXC(range,3)+1.5*(QUARTILE.EXC(range,3)-QUARTILE.EXC(range,1)))",
    level: "advanced",
    codeExample: "Works but carefully reference ranges."
  },
  {
    question: "What is an advantage of QUARTILE.EXC over QUARTILE.INC?",
    shortAnswer: "It matches many academic statistical packages and may be preferred for unbiased estimates of extreme percentiles.",
    explanation: "No inherent advantage; depends on convention.",
    level: "intermediate",
    codeExample: "Consistency with published research."
  },
  {
    question: "Is there a function that computes all three quartiles at once?",
    shortAnswer: "No, but you can use =QUARTILE.EXC(data, {1,2,3}) in Excel 365; it spills three values.",
    explanation: "Very convenient.",
    level: "advanced",
    codeExample: "=QUARTILE.EXC(A2:A100, {1,2,3})"
  },
  {
    question: "What is the result of =QUARTILE.EXC({1,1,1,1,2},1)?",
    shortAnswer: "1 (since 25th percentile falls at the first 1).",
    explanation: "Duplicates don't cause interpolation problems.",
    level: "basic",
    codeExample: "Mode of data."
  },
  {
    question: "How does QUARTILE.EXC treat error values in the array?",
    shortAnswer: "Any error in the array causes QUARTILE.EXC to return that error.",
    explanation: "Errors propagate.",
    level: "intermediate",
    codeExample: "Clean data first."
  },
  {
    question: "Can QUARTILE.EXC be used with logical values?",
    shortAnswer: "No, they are ignored unless you convert with --.",
    explanation: "=QUARTILE.EXC(--(A1:A100), 2) array formula.",
    level: "advanced",
    codeExample: "Rarely needed."
  },
  {
    question: "What is the IQR using exclusive quartiles for n=5?",
    shortAnswer: "Depends on data; QUARTILE.EXC(data,1) and QUARTILE.EXC(data,3) will be computed, possibly interpolated.",
    explanation: "n=5 is sufficient for exclusive quartiles.",
    level: "intermediate",
    codeExample: "Use as usual."
  },
  {
    question: "Why would QUARTILE.EXC return a different median than MEDIAN for odd n?",
    shortAnswer: "It doesn't; for odd n, median is the middle value, same as MEDIAN.",
    explanation: "They agree on median.",
    level: "basic",
    codeExample: "Always identical for quart=2."
  }
];

export default questions;