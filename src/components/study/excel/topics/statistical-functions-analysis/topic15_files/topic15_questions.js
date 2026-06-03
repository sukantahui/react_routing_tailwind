const questions = [
  {
    question: "What does STDEV.S calculate?",
    shortAnswer: "The sample standard deviation – measure of spread of a data sample.",
    explanation: "It quantifies how much individual numbers deviate from the mean, using n-1 denominator.",
    level: "basic",
    codeExample: "=STDEV.S(A1:A100)"
  },
  {
    question: "What is the difference between STDEV.S and STDEV.P?",
    shortAnswer: "STDEV.S uses n-1 (sample), STDEV.P uses n (population).",
    explanation: "STDEV.S provides an unbiased estimate of the population standard deviation when working with a sample.",
    level: "basic",
    codeExample: "Same dataset: STDEV.S usually slightly larger than STDEV.P."
  },
  {
    question: "What error does STDEV.S return if there is only one number?",
    shortAnswer: "#DIV/0!",
    explanation: "Standard deviation requires at least two observations to estimate variability.",
    level: "basic",
    codeExample: "=STDEV.S(5) → #DIV/0!"
  },
  {
    question: "Does STDEV.S ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered; text and blanks are ignored.",
    explanation: "Non‑numeric cells do not participate in the calculation.",
    level: "basic",
    codeExample: "Range with {5, \"a\", blank, 10} → STDEV.S of {5,10}."
  },
  {
    question: "How to calculate the standard deviation of a subset (e.g., only scores above 80)?",
    shortAnswer: "Use array formula: =STDEV.S(IF(range>80, range)).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel; in 365 it works normally.",
    level: "advanced",
    codeExample: "{=STDEV.S(IF(A1:A100>80, A1:A100))}"
  },
  {
    question: "What is the relationship between STDEV.S and VAR.S?",
    shortAnswer: "STDEV.S is the square root of VAR.S.",
    explanation: "Variance is the squared deviation; standard deviation brings it back to the original units.",
    level: "intermediate",
    codeExample: "STDEV.S(range)^2 = VAR.S(range)"
  },
  {
    question: "Can STDEV.S be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so the standard deviation of dates can be calculated (in days).",
    explanation: "Useful for measuring variability in project completion dates.",
    level: "intermediate",
    codeExample: "=STDEV.S(A1:A10) where A contains dates."
  },
  {
    question: "Why does STDEV.S for a set of identical numbers return 0?",
    shortAnswer: "Because there is no variation – all numbers equal the mean.",
    explanation: "If every value is the same, standard deviation is zero.",
    level: "basic",
    codeExample: "=STDEV.S(10,10,10) → 0"
  },
  {
    question: "What is the maximum number of arguments STDEV.S can accept?",
    shortAnswer: "255 arguments (like most statistical functions).",
    explanation: "Each argument can be a range or constant.",
    level: "expert",
    codeExample: "=STDEV.S(A1:A1000000, B1:B1000000)"
  },
  {
    question: "How to get the standard deviation of a filtered list (visible rows only)?",
    shortAnswer: "Use SUBTOTAL(7, range) or AGGREGATE(7,5,range).",
    explanation: "SUBTOTAL with 7 calculates STDEV.S on visible rows; AGGREGATE with 7 and option 5 ignores hidden rows.",
    level: "advanced",
    codeExample: "=SUBTOTAL(7, B2:B100)"
  },
  {
    question: "What is the meaning of a high standard deviation?",
    shortAnswer: "Data points are spread out widely from the mean (high variability).",
    explanation: "High stdev indicates inconsistent values; low stdev indicates consistent (clustered) values.",
    level: "basic",
    codeExample: "Quality control: high stdev → poor process control."
  },
  {
    question: "Is STDEV.S affected by outliers?",
    shortAnswer: "Yes, very sensitive to outliers – a single extreme value can inflate standard deviation significantly.",
    explanation: "Consider using median absolute deviation or trimming outliers first.",
    level: "intermediate",
    codeExample: "Dataset {1,2,3,100} has much higher stdev than {1,2,3,4}."
  },
  {
    question: "What is the difference between STDEV.S and STDEVA?",
    shortAnswer: "STDEVA includes text and logicals in the calculation (text=0, TRUE=1, FALSE=0).",
    explanation: "STDEV.S ignores them. Use STDEVA if you want to treat non‑numeric as numeric.",
    level: "advanced",
    codeExample: "=STDEVA(5, \"a\", TRUE) treats \"a\" as 0, TRUE as 1 → stdev of {5,0,1}."
  },
  {
    question: "Can STDEV.S be used with an entire column (A:A)?",
    shortAnswer: "Yes, but it will examine all 1M+ rows, which may be slow.",
    explanation: "Define a specific range for better performance.",
    level: "basic",
    codeExample: "=STDEV.S(A:A) works but avoid on large data."
  },
  {
    question: "How to calculate standard deviation for multiple groups (e.g., by region)?",
    shortAnswer: "Use a pivot table (no built-in stdev for samples? Actually PivotTable has StdDev (sample) as a summary function).",
    explanation: "In PivotTable, value field settings → StdDev (sample) uses STDEV.S.",
    level: "intermediate",
    codeExample: "Drag Region to rows, Sales to values, set summary = StdDev."
  },
  {
    question: "What is an acceptable standard deviation in manufacturing?",
    shortAnswer: "Depends on specification limits; often six sigma aims for process stdev small enough to fit 6 stdevs within tolerance.",
    explanation: "Lower is better; use process capability indices (Cp, Cpk).",
    level: "expert",
    codeExample: "Quality control uses standard deviation to monitor consistency."
  },
  {
    question: "Why does STDEV.S sometimes return a different value than manual calculation?",
    shortAnswer: "Probably because of rounding or because you used n instead of n-1.",
    explanation: "Manual formula should use denominator (n-1) for sample.",
    level: "intermediate",
    codeExample: "Check your manual steps."
  },
  {
    question: "Can STDEV.S be used with boolean values (TRUE/FALSE) in cell references?",
    shortAnswer: "No, they are ignored. To include them, convert with -- or use STDEVA.",
    explanation: "STDEV.S treats them as non‑numeric; use STDEVA if you want TRUE=1, FALSE=0.",
    level: "intermediate",
    codeExample: "=STDEV.S(--(A1:A10)) array formula."
  },
  {
    question: "What is the relationship between standard deviation and confidence interval?",
    shortAnswer: "Confidence interval = mean ± (critical value * (stdev / sqrt(n))).",
    explanation: "Standard deviation is a component of margin of error in statistics.",
    level: "advanced",
    codeExample: "Use CONFIDENCE.NORM function which internally uses STDEV.S."
  },
  {
    question: "How to compute rolling standard deviation (e.g., last 12 months)?",
    shortAnswer: "Use OFFSET combined with STDEV.S: =STDEV.S(OFFSET(first_cell, COUNT(range)-window, 0, window, 1)).",
    explanation: "Complex but doable; dynamic arrays simplify in Excel 365.",
    level: "expert",
    codeExample: "Rolling 12‑month standard deviation."
  },
  {
    question: "Does STDEV.S work with negative numbers?",
    shortAnswer: "Yes, standard deviation is always non‑negative regardless of signs.",
    explanation: "Deviations are squared, so negatives don't cause issues.",
    level: "basic",
    codeExample: "=STDEV.S(-10, -20, -30) → same as STDEV.S(10,20,30)."
  },
  {
    question: "What is the output of =STDEV.S({1,2})?",
    shortAnswer: "0.7071 (sample standard deviation of two numbers).",
    explanation: "With two numbers, the denominator is 1, so it's the absolute difference divided by sqrt(2).",
    level: "basic",
    codeExample: "Manual: sqrt(((1-1.5)^2+(2-1.5)^2)/(2-1)) = sqrt(0.5) = 0.7071."
  },
  {
    question: "How to ignore errors in a range when calculating STDEV.S?",
    shortAnswer: "Use AGGREGATE(7,6, range). The second argument 6 tells it to ignore error values.",
    explanation: "AGGREGATE is a modern function that can skip errors, hidden rows, etc.",
    level: "advanced",
    codeExample: "=AGGREGATE(7,6, A2:A100)"
  },
  {
    question: "Why is STDEV.S called 'sample' standard deviation?",
    shortAnswer: "Because it uses n‑1 correction to estimate the true population standard deviation from a sample.",
    explanation: "It is an unbiased estimator; STDEV.P is biased for smaller samples.",
    level: "intermediate",
    codeExample: "Use STDEV.S when you have only a subset of the total population."
  },
  {
    question: "Can STDEV.S be used in conditional formatting to highlight outliers?",
    shortAnswer: "Yes, with formula: =ABS(A1 - AVERAGE($A$1:$A$100)) > 2*STDEV.S($A$1:$A$100).",
    explanation: "Highlights values more than two standard deviations from the mean.",
    level: "advanced",
    codeExample: "Common in statistical process control."
  },
  {
    question: "What is the standard deviation of a constant array (all same number)?",
    shortAnswer: "0 (zero).",
    explanation: "No variation, so stdev = 0.",
    level: "basic",
    codeExample: "=STDEV.S(5,5,5,5) → 0"
  },
  {
    question: "How to find the standard deviation of the top 10 values in a range?",
    shortAnswer: "Use =STDEV.S(LARGE(range, ROW(INDIRECT(\"1:10\")))) as array formula.",
    explanation: "LARGE returns an array of the top 10 values; STDEV.S computes their standard deviation.",
    level: "expert",
    codeExample: "{=STDEV.S(LARGE(A2:A100, {1,2,3,4,5,6,7,8,9,10}))}"
  },
  {
    question: "Does STDEV.S treat zero as a valid number?",
    shortAnswer: "Yes, zero is considered and contributes to the calculation.",
    explanation: "Zeros are included, which can reduce the mean and affect stdev.",
    level: "basic",
    codeExample: "STDEV.S of {0,10} is larger than STDEV.S of {5,10}."
  },
  {
    question: "What is the numeric range of standard deviation?",
    shortAnswer: "From 0 to +∞ (non‑negative).",
    explanation: "It cannot be negative because it's a square root of variance.",
    level: "basic",
    codeExample: "Always ≥ 0."
  },
  {
    question: "How to compute the standard deviation of a frequency table (grouped data)?",
    shortAnswer: "Expand the data or use weighted variance formula with SUMPRODUCT.",
    explanation: "Standard approach: =SQRT(SUMPRODUCT(freq, (midpoints-mean)^2) / (n-1)).",
    level: "expert",
    codeExample: "Complex but doable with helper columns."
  }
];

export default questions;