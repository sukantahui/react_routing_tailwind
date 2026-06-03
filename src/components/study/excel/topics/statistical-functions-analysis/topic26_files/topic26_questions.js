const questions = [
  {
    question: "What does PERCENTILE.EXC do?",
    shortAnswer: "Returns the value at a given percentile using exclusive interpolation; k must be between 0 and 1 exclusive.",
    explanation: "It never returns the minimum or maximum of the dataset and matches definitions used by many statistical packages.",
    level: "basic",
    codeExample: "=PERCENTILE.EXC(A1:A100, 0.9) → 90th exclusive percentile"
  },
  {
    question: "What k values are allowed in PERCENTILE.EXC?",
    shortAnswer: "Any number strictly between 0 and 1 (0 < k < 1).",
    explanation: "k = 0 or 1 returns #NUM! because the exclusive method cannot return extremes.",
    level: "basic",
    codeExample: "=PERCENTILE.EXC(data, 0) → #NUM!"
  },
  {
    question: "How does PERCENTILE.EXC differ from PERCENTILE.INC?",
    shortAnswer: "PERCENTILE.EXC excludes the min and max (k cannot be 0 or 1) and uses a different index formula: k*(n+1). PERCENTILE.INC includes extremes and uses k*(n-1)+1.",
    explanation: "Differences are notable for small datasets; for large n they converge.",
    level: "intermediate",
    codeExample: "For {1,2,3,4,5}, PERCENTILE.EXC(data,0.25) ≈ 1.5; PERCENTILE.INC(data,0.25)=2."
  },
  {
    question: "What error does PERCENTILE.EXC return if k is outside (0,1)?",
    shortAnswer: "#NUM!",
    explanation: "k must be strictly between 0 and 1.",
    level: "basic",
    codeExample: "=PERCENTILE.EXC(A1:A10, 1.2) → #NUM!"
  },
  {
    question: "Why might PERCENTILE.EXC return #NUM! even for k=0.25?",
    shortAnswer: "If the dataset has too few numbers to compute the requested percentile exclusively, e.g., n=2 → index=0.25*3=0.75, which is <1 → no data point to interpolate, returns #NUM!.",
    explanation: "Requires sufficient sample size.",
    level: "intermediate",
    codeExample: "=PERCENTILE.EXC({1,2}, 0.25) → #NUM!"
  },
  {
    question: "Does PERCENTILE.EXC ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored, allowing headers in the range.",
    level: "basic",
    codeExample: "Safe to use with column headers."
  },
  {
    question: "How is the index calculated in PERCENTILE.EXC?",
    shortAnswer: "index = k * (n + 1), where n is the count of numbers.",
    explanation: "The index is a position in the sorted list (1‑based). If integer, returns that data point; otherwise interpolates.",
    level: "advanced",
    codeExample: "For n=9, k=0.5 → index=5 → median = 5th smallest."
  },
  {
    question: "What does PERCENTILE.EXC return for a single number?",
    shortAnswer: "It returns #NUM! because k*(n+1) would be between 0 and 2, but cannot interpolate. Actually, for n=1, any 0<k<1 gives index between 0 and 2, but with one value interpolation fails → #NUM!.",
    explanation: "Need at least 2 data points for any meaningful percentile.",
    level: "basic",
    codeExample: "=PERCENTILE.EXC({5},0.5) → #NUM!"
  },
  {
    question: "Is PERCENTILE.EXC the same as QUARTILE.EXC for k=0.25?",
    shortAnswer: "Yes, =PERCENTILE.EXC(data,0.25) = QUARTILE.EXC(data,1).",
    explanation: "QUARTILE.EXC is a special case.",
    level: "basic",
    codeExample: "They are equivalent."
  },
  {
    question: "Can PERCENTILE.EXC be used with dates?",
    shortAnswer: "Yes, dates are serial numbers; the result is a date (format as date).",
    explanation: "Useful for exclusive percentiles in time analysis.",
    level: "intermediate",
    codeExample: "=PERCENTILE.EXC(date_range, 0.9)"
  },
  {
    question: "What is the maximum number of arguments PERCENTILE.EXC accepts?",
    shortAnswer: "Two: array and k.",
    explanation: "Only two arguments.",
    level: "basic",
    codeExample: "Simple."
  },
  {
    question: "How to compute the 10th exclusive percentile for a subset (e.g., only North region)?",
    shortAnswer: "Use array formula: =PERCENTILE.EXC(IF(region=this_region, sales), 0.1).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel; in 365 works normally.",
    level: "advanced",
    codeExample: "Conditional exclusive percentile."
  },
  {
    question: "Why would a statistician prefer PERCENTILE.EXC over PERCENTILE.INC?",
    shortAnswer: "Because many statistical packages (R, SPSS) use an exclusive definition for percentiles in their default functions.",
    explanation: "It helps reproduce academic results and ensures consistency across tools.",
    level: "intermediate",
    codeExample: "Common in peer‑reviewed research."
  },
  {
    question: "Is PERCENTILE.EXC a volatile function?",
    shortAnswer: "No, it recalculates only when data changes.",
    explanation: "Non‑volatile.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "What does PERCENTILE.EXC return when all numbers are identical?",
    shortAnswer: "That same number for any valid k.",
    explanation: "If all values are equal, interpolation still yields that same number.",
    level: "basic",
    codeExample: "=PERCENTILE.EXC({5,5,5}, 0.5) → 5"
  },
  {
    question: "How to get multiple exclusive percentiles at once in Excel 365?",
    shortAnswer: "=PERCENTILE.EXC(data, {0.1,0.2,0.3,0.4,0.5})",
    explanation: "This spills an array of percentiles.",
    level: "advanced",
    codeExample: "Powerful for dashboards."
  },
  {
    question: "Does PERCENTILE.EXC work with negative numbers?",
    shortAnswer: "Yes, negative numbers are handled correctly (more negative is smaller).",
    explanation: "Percentiles respect numeric order.",
    level: "basic",
    codeExample: "Works fine."
  },
  {
    question: "What is the result of =PERCENTILE.EXC({1,2,3,4,5}, 0.5)?",
    shortAnswer: "3 (the median).",
    explanation: "For odd n, median is the middle value, and with exclusive definition it still gives 3.",
    level: "basic",
    codeExample: "Matches PERCENTILE.INC here."
  },
  {
    question: "Can PERCENTILE.EXC be used in conditional formatting to highlight top 10% exclusive?",
    shortAnswer: "Yes: =A1 > PERCENTILE.EXC($A$1:$A$100, 0.9).",
    explanation: "This highlights values above the exclusive 90th percentile.",
    level: "intermediate",
    codeExample: "Works well."
  },
  {
    question: "What is the output of =PERCENTILE.EXC({1,2,3,4,5,6}, 0.5)?",
    shortAnswer: "3.5 (average of 3 and 4).",
    explanation: "n=6, index=0.5*7=3.5 → between 3rd (3) and 4th (4) → interpolated 3.5.",
    level: "advanced",
    codeExample: "Same as inclusive here? PERCENTILE.INC also 3.5."
  },
  {
    question: "Why does PERCENTILE.EXC return a different value than PERCENTILE.INC for k=0.25 with n=10?",
    shortAnswer: "Because the index formula differs: PERCENTILE.EXC uses 0.25*(10+1)=2.75; PERCENTILE.INC uses 0.25*(10-1)+1=3.25. The interpolation points are different.",
    explanation: "Results will generally differ, especially for small n.",
    level: "expert",
    codeExample: "Test with sample data."
  },
  {
    question: "How to handle #NUM! errors from PERCENTILE.EXC?",
    shortAnswer: "Wrap with IFERROR: =IFERROR(PERCENTILE.EXC(data, k), \"N/A\") or use a conditional check on n.",
    explanation: "Prevent formula errors from breaking dashboards.",
    level: "intermediate",
    codeExample: "=IF(COUNT(data)>2, PERCENTILE.EXC(data,0.25), \"Insufficient data\")"
  },
  {
    question: "Does PERCENTILE.EXC work with array constants?",
    shortAnswer: "Yes, e.g., =PERCENTILE.EXC({1,2,3,4,5,6}, 0.9).",
    explanation: "Array constants can be used directly.",
    level: "intermediate",
    codeExample: "=PERCENTILE.EXC({1,2,3,4,5,6}, 0.9) → 5.5 (interpolated)."
  },
  {
    question: "What is the relationship between PERCENTILE.EXC and NORM.S.INV?",
    shortAnswer: "No direct relationship; one gives percentiles of empirical data, the other gives z‑scores for normal distribution.",
    explanation: "Different purposes.",
    level: "expert",
    codeExample: "Not interchangeable."
  },
  {
    question: "Can PERCENTILE.EXC be used with a frequency table?",
    shortAnswer: "Not directly; you would need to expand the data or use a weighted percentile formula.",
    explanation: "Expand the dataset or use advanced techniques.",
    level: "expert",
    codeExample: "Use REPT to expand."
  },
  {
    question: "What is the minimum number of data points needed for PERCENTILE.EXC to compute Q1 (25th percentile)?",
    shortAnswer: "n such that 0.25*(n+1) >= 2 and <= n, roughly n >= 7 to get an index between 2 and n.",
    explanation: "For n=3, index=1 → invalid; n=4, index=1.25 → still <2? Actually 1.25 <2, interpolation fails -> #NUM!. So need n at least 5? Let's test: n=5 → index=1.5 → <2 → still #NUM!; n=6 → index=1.75 → <2 → #NUM!; n=7 → index=2.0 → works (exact data point). So minimum n=7 for Q1 with exclusive.",
    level: "expert",
    codeExample: "Check with COUNT."
  },
  {
    question: "Does PERCENTILE.EXC ignore hidden rows?",
    shortAnswer: "No, it considers all rows; use AGGREGATE with function 17 (PERCENTILE.EXC? AGGREGATE does not have exclusive percentile). For visible‑only, you need a helper column.",
    explanation: "Limited native support.",
    level: "expert",
    codeExample: "Workaround required."
  },
  {
    question: "What is the exclusive percentile equivalent of the median?",
    shortAnswer: "PERCENTILE.EXC(data, 0.5) gives the median, which for even n is the average of the two middle numbers (same as inclusive method).",
    explanation: "For odd n, it's the exact middle value; for even, it's the average.",
    level: "advanced",
    codeExample: "Both functions yield the same median."
  },
  {
    question: "Why might PERCENTILE.EXC be more robust than PERCENTILE.INC for outlier detection?",
    shortAnswer: "Because it never takes the extreme values (min or max), so it is less affected by a single outlier.",
    explanation: "However, both methods can be influenced; exclusive is just a different perspective.",
    level: "intermediate",
    codeExample: "Choose based on outlier tolerance."
  },
  {
    question: "Can PERCENTILE.EXC be used with Excel Tables?",
    shortAnswer: "Yes: =PERCENTILE.EXC(Table1[Score], 0.9)",
    explanation: "Structured references work.",
    level: "basic",
    codeExample: "Clean and readable."
  }
];

export default questions;