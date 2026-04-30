const questions = [
  {
    question: "What does PERCENTRANK.EXC do?",
    shortAnswer: "Returns the exclusive percentile rank (0 < rank < 1) of a value in a dataset.",
    explanation: "It calculates the percentage of data points strictly less than the given value, adjusted so that extremes never become 0 or 1.",
    level: "basic",
    codeExample: "=PERCENTRANK.EXC(A1:A100, 85)"
  },
  {
    question: "What range of values does PERCENTRANK.EXC return?",
    shortAnswer: "Between 0 and 1 exclusive (never exactly 0 or 1).",
    explanation: "The smallest value returns a rank >0, the largest returns <1.",
    level: "basic",
    codeExample: "For {1,2,3}, rank of 1 ≈ 0.2, rank of 3 ≈ 0.8."
  },
  {
    question: "What is the main difference between PERCENTRANK.INC and PERCENTRANK.EXC?",
    shortAnswer: "PERCENTRANK.INC includes extremes (min=0, max=1), while PERCENTRANK.EXC excludes them (min>0, max<1).",
    explanation: "Exclusive ranks are often used in statistical inference to avoid boundary bias.",
    level: "intermediate",
    codeExample: "For the same dataset, .INC of the minimum is 0, .EXC is >0."
  },
  {
    question: "What does PERCENTRANK.EXC return if x is less than the minimum value?",
    shortAnswer: "#N/A (not available).",
    explanation: "Values outside the dataset range cannot be given an exclusive rank.",
    level: "basic",
    codeExample: "=PERCENTRANK.EXC({10,20,30}, 5) → #N/A"
  },
  {
    question: "What does PERCENTRANK.EXC return if x is greater than the maximum?",
    shortAnswer: "#N/A.",
    explanation: "Similar to values below minimum, out‑of‑range values are not rankable.",
    level: "basic",
    codeExample: "=PERCENTRANK.EXC({10,20,30}, 40) → #N/A"
  },
  {
    question: "How is the exclusive rank calculated for a value that appears in the dataset?",
    shortAnswer: "It uses the formula (R - 1) / (N + 1), where R is the rank (position) when duplicates are averaged.",
    explanation: "If duplicates exist, ranks are averaged before applying the formula.",
    level: "advanced",
    codeExample: "For sorted distinct data, the rank of the i-th smallest = (i-1)/(n+1)."
  },
  {
    question: "Does PERCENTRANK.EXC interpolate for values between data points?",
    shortAnswer: "Yes, it linearly interpolates between the ranks of the two nearest data points.",
    explanation: "This gives a smooth estimate for any intermediate value.",
    level: "intermediate",
    codeExample: "If 85 is between 80 (rank 0.3) and 90 (rank 0.5), its rank is interpolated."
  },
  {
    question: "What does the optional `significance` argument control?",
    shortAnswer: "The number of significant digits in the returned rank (default 3).",
    explanation: "Increase significance if you need more precision.",
    level: "basic",
    codeExample: "=PERCENTRANK.EXC(A2:A100, 85, 5)"
  },
  {
    question: "Why might PERCENTRANK.EXC return #N/A even for a value inside the dataset?",
    shortAnswer: "If the dataset has fewer than 3 distinct values, the exclusive rank may not be defined for some positions. Also, if the value is the minimum or maximum, it returns #N/A.",
    explanation: "For n=2, min and max are the only points; exclusive rank returns #N/A for both.",
    level: "intermediate",
    codeExample: "=PERCENTRANK.EXC({1,2},1) → #N/A."
  },
  {
    question: "Does PERCENTRANK.EXC ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored, allowing headers in the range.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "Is PERCENTRANK.EXC the inverse of PERCENTILE.EXC?",
    shortAnswer: "Yes, they are approximate inverses: if p = PERCENTRANK.EXC(data, x), then PERCENTILE.EXC(data, p) ≈ x.",
    explanation: "Due to interpolation, the relationship is exact for data points, approximate otherwise.",
    level: "advanced",
    codeExample: "Use together for verification."
  },
  {
    question: "Can PERCENTRANK.EXC be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so you can find exclusive rank of a date within a list.",
    explanation: "Useful for continuous time ranks.",
    level: "intermediate",
    codeExample: "=PERCENTRANK.EXC(date_range, TODAY())"
  },
  {
    question: "What is the result of =PERCENTRANK.EXC({1,2,3,4,5}, 3)?",
    shortAnswer: "Approximately 0.5 (since 3 is the median).",
    explanation: "For odd size, the middle value has rank 0.5 exactly? Actually (3rd of 5, rank = (3-1)/(5+1)=2/6≈0.3333? Wait: The rank for a data point itself is (i-1)/(n+1). For 3 (3rd smallest), i=3 → (3-1)/(6)=2/6=0.3333. So 0.333, not 0.5. Good! So the median is not 0.5 in exclusive rank. That is important.",
    level: "expert",
    codeExample: "Exclusive rank of median is (mid -1)/(n+1)."
  },
  {
    question: "What is the range of possible exclusive ranks for a dataset of size n?",
    shortAnswer: "From 1/(n+1) to n/(n+1).",
    explanation: "The smallest data point gets rank ≈1/(n+1), the largest ≈ n/(n+1).",
    level: "advanced",
    codeExample: "For n=9, ranks range from 0.1 to 0.9."
  },
  {
    question: "Can PERCENTRANK.EXC be used with array constants?",
    shortAnswer: "Yes, e.g., =PERCENTRANK.EXC({1,2,3,4,5}, 2.5).",
    explanation: "Array constants work as the dataset.",
    level: "intermediate",
    codeExample: "=PERCENTRANK.EXC({1,2,3,4,5}, 2.5) → returns interpolated rank."
  },
  {
    question: "What is the maximum number of arguments PERCENTRANK.EXC accepts?",
    shortAnswer: "Three: array, x, significance.",
    explanation: "Only three arguments.",
    level: "basic",
    codeExample: "Simple."
  },
  {
    question: "How to handle #N/A errors from PERCENTRANK.EXC?",
    shortAnswer: "Wrap with IFERROR: =IFERROR(PERCENTRANK.EXC(data, x), \"Extreme\").",
    explanation: "Prevents formula errors in reports.",
    level: "intermediate",
    codeExample: "=IFERROR(PERCENTRANK.EXC(A2:A100, D2), \"Below/Above range\")"
  },
  {
    question: "Why might a researcher prefer PERCENTRANK.EXC over .INC?",
    shortAnswer: "Because many non‑parametric statistical tests assume a continuous distribution and can't handle ranks exactly 0 or 1.",
    explanation: "Exclusive ranks avoid boundary issues in inference.",
    level: "advanced",
    codeExample: "Used in Wilcoxon signed‑rank and Mann‑Whitney tests."
  },
  {
    question: "Does PERCENTRANK.EXC treat zeros as valid numbers?",
    shortAnswer: "Yes, zero is a number and will be ranked accordingly.",
    explanation: "If zero is the smallest, it gets a rank >0, not #N/A.",
    level: "basic",
    codeExample: "Works as expected."
  },
  {
    question: "How to convert the result of PERCENTRANK.EXC to a percentage?",
    shortAnswer: "Multiply by 100 and format as percent: =PERCENTRANK.EXC(range, x)*100 & \"%\".",
    explanation: "Or simply format the cell as Percentage.",
    level: "basic",
    codeExample: "=PERCENTRANK.EXC(A2:A100, B2)*100"
  },
  {
    question: "What is the output of =PERCENTRANK.EXC({1,2,3,4,5}, 1)?",
    shortAnswer: "#N/A (because 1 is the minimum and exclusive rank does not include extremes).",
    explanation: "The smallest data point is not rankable in exclusive method.",
    level: "basic",
    codeExample: "Returns #N/A."
  },
  {
    question: "Can PERCENTRANK.EXC be used with Excel Tables?",
    shortAnswer: "Yes: =PERCENTRANK.EXC(Table1[Score], [@Score])",
    explanation: "Structured references work well.",
    level: "basic",
    codeExample: "Auto‑updates."
  },
  {
    question: "What is the significance of the interpolation method for exclusive rank?",
    shortAnswer: "It ensures that ranks are continuous and monotonic, matching the definition of a distribution function.",
    explanation: "Without interpolation, the rank function would be a step function.",
    level: "expert",
    codeExample: "Interpolation makes the function invertible."
  },
  {
    question: "Is PERCENTRANK.EXC a volatile function?",
    shortAnswer: "No, it recalculates only when data changes.",
    explanation: "Non‑volatile, safe for large workbooks.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "How to compute exclusive rank for each row in a table?",
    shortAnswer: "Add a calculated column: =PERCENTRANK.EXC([Score], [@Score])",
    explanation: "This will compute the exclusive rank for each row relative to the whole column.",
    level: "intermediate",
    codeExample: "Use with care on small tables."
  },
  {
    question: "What is the relationship between PERCENTRANK.EXC and the empirical CDF?",
    shortAnswer: "It is a smoothed version of the empirical cumulative distribution function (ECDF), often called the ‘plotting position’.",
    explanation: "Common formulas: (i-0.5)/n or i/(n+1) for exclusive rank.",
    level: "expert",
    codeExample: "PERCENTRANK.EXC uses i/(n+1)."
  },
  {
    question: "What happens if the array contains error values?",
    shortAnswer: "PERCENTRANK.EXC returns that error.",
    explanation: "Errors propagate; clean data first.",
    level: "intermediate",
    codeExample: "Use IFERROR in helper column."
  },
  {
    question: "Does PERCENTRANK.EXC work with negative numbers?",
    shortAnswer: "Yes, negative numbers are handled correctly; the most negative gets the smallest (positive) rank.",
    explanation: "Numerical order respects sign.",
    level: "basic",
    codeExample: "Works fine."
  },
  {
    question: "How does PERCENTRANK.EXC handle duplicate values?",
    shortAnswer: "It assigns the same rank to all duplicates (the average of their exclusive ranks) and uses that for interpolation.",
    explanation: "Ties are handled consistently with the inclusive method.",
    level: "advanced",
    codeExample: "Duplicates get identical exclusive rank."
  },
  {
    question: "If n=3, what is the rank of the median value using PERCENTRANK.EXC?",
    shortAnswer: "For {1,2,3}, median=2, i=2, rank = (2-1)/(3+1)=1/4=0.25.",
    explanation: "The exclusive rank of the middle value is 0.25, not 0.5 as many expect.",
    level: "expert",
    codeExample: "Important for understanding."
  }
];

export default questions;