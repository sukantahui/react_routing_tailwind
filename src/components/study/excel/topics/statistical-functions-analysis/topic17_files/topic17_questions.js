const questions = [
  {
    question: "What does VAR.S calculate?",
    shortAnswer: "Sample variance – average of squared deviations from the mean, using n-1 denominator.",
    explanation: "It gives an unbiased estimate of the population variance from a sample.",
    level: "basic",
    codeExample: "=VAR.S(A1:A100)"
  },
  {
    question: "How does VAR.S differ from VAR.P?",
    shortAnswer: "VAR.S uses n-1 (sample), VAR.P uses n (population).",
    explanation: "VAR.S is larger than VAR.P for the same data (except when n is huge).",
    level: "basic",
    codeExample: "For {1,2,3}: VAR.S=1, VAR.P=0.666..."
  },
  {
    question: "What error does VAR.S return for a single number?",
    shortAnswer: "#DIV/0! (cannot compute variance with n<2).",
    explanation: "Because n-1 = 0, division by zero occurs.",
    level: "basic",
    codeExample: "=VAR.S(42) → #DIV/0!"
  },
  {
    question: "Does VAR.S ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Non‑numeric cells do not affect the calculation.",
    level: "basic",
    codeExample: "Range {5, \"a\", blank, 10} → VAR.S of {5,10}."
  },
  {
    question: "What is the relationship between VAR.S and STDEV.S?",
    shortAnswer: "VAR.S is the square of STDEV.S.",
    explanation: "STDEV.S = SQRT(VAR.S).",
    level: "intermediate",
    codeExample: "STDEV.S(range)^2 = VAR.S(range)"
  },
  {
    question: "Why is VAR.S called 'sample' variance?",
    shortAnswer: "Because it uses n-1 to estimate population variance from a sample.",
    explanation: "It corrects the bias that would occur if we used n denominator.",
    level: "intermediate",
    codeExample: "Without correction, variance would be too small."
  },
  {
    question: "Can VAR.S be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so variance is in days².",
    explanation: "Useful for variability in project timelines.",
    level: "intermediate",
    codeExample: "=VAR.S(A1:A10) with dates → variance in days squared."
  },
  {
    question: "What is the maximum number of arguments VAR.S can accept?",
    shortAnswer: "255 arguments, like other statistical functions.",
    explanation: "Each argument can be a range or constant.",
    level: "expert",
    codeExample: "=VAR.S(A1:A1000000, B1:B1000000)"
  },
  {
    question: "How to compute sample variance for a subset meeting a condition?",
    shortAnswer: "Use array formula: =VAR.S(IF(criteria_range=criteria, value_range)).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel.",
    level: "advanced",
    codeExample: "{=VAR.S(IF(A1:A100=\"North\", B1:B100))}"
  },
  {
    question: "What is the output of =VAR.S({1,2,3,4,5})?",
    shortAnswer: "2.5",
    explanation: "Mean=3, squared deviations: 4,1,0,1,4 sum=10, divided by 4 = 2.5.",
    level: "basic",
    codeExample: "Manual calculation matches."
  },
  {
    question: "How to get the sample variance while ignoring zeros?",
    shortAnswer: "Use array formula: =VAR.S(IF(range<>0, range)).",
    explanation: "Excludes zero values from the dataset.",
    level: "advanced",
    codeExample: "{=VAR.S(IF(A1:A100<>0, A1:A100))}"
  },
  {
    question: "What is the unit of measurement of VAR.S?",
    shortAnswer: "Square of the original units (e.g., if data is ₹, VAR.S is ₹²).",
    explanation: "That's why standard deviation (in original units) is often preferred.",
    level: "basic",
    codeExample: "Variance of 10,20,30 = 100 ₹²."
  },
  {
    question: "Why might professionals use VAR.S instead of STDEV.S?",
    shortAnswer: "Variance is used in many statistical calculations (ANOVA, regression, variance components).",
    explanation: "It has additive properties that standard deviation does not have.",
    level: "advanced",
    codeExample: "Often kept in squared form for mathematical convenience."
  },
  {
    question: "Can VAR.S be used with a 3D reference across sheets?",
    shortAnswer: "Yes, e.g., =VAR.S(Sheet1:Sheet3!A1)",
    explanation: "Computes sample variance of cell A1 across the sheet range.",
    level: "advanced",
    codeExample: "All sheets must have same structure."
  },
  {
    question: "What is the sample variance of identical numbers?",
    shortAnswer: "0",
    explanation: "No variation → variance = 0.",
    level: "basic",
    codeExample: "=VAR.S(10,10,10) → 0"
  },
  {
    question: "How to compute rolling variance (e.g., last 12 months)?",
    shortAnswer: "Use OFFSET with VAR.S: =VAR.S(OFFSET(first_cell, COUNT(range)-12, 0, 12, 1)).",
    explanation: "Complex; dynamic arrays simplify in Excel 365.",
    level: "expert",
    codeExample: "Rolling sample variance."
  },
  {
    question: "What is the difference between VAR.S and VARA?",
    shortAnswer: "VARA includes text (as 0) and logicals (TRUE=1, FALSE=0) in the calculation.",
    explanation: "VAR.S ignores them. VARA is less common.",
    level: "advanced",
    codeExample: "=VARA(range) treats \"Missing\" as 0."
  },
  {
    question: "Does VAR.S work with array constants?",
    shortAnswer: "Yes, e.g., =VAR.S({1,2,3,4}).",
    explanation: "Array constants are treated as direct numeric arguments.",
    level: "intermediate",
    codeExample: "=VAR.S({1,2,3,4}) → 1.6667"
  },
  {
    question: "Why does VAR.S return a larger value than VAR.P?",
    shortAnswer: "Because denominator n-1 is smaller than n, making the quotient larger.",
    explanation: "This correction prevents underestimation of population variance.",
    level: "intermediate",
    codeExample: "Correct but often small difference with large n."
  },
  {
    question: "How to get sample variance of visible cells only (after filter)?",
    shortAnswer: "Use SUBTOTAL(10, range) – SUBTOTAL with function 10 is VAR.S? Actually SUBTOTAL(10) returns VAR.S on visible rows.",
    explanation: "SUBTOTAL(10, range) works on filtered data.",
    level: "advanced",
    codeExample: "=SUBTOTAL(10, B2:B100)"
  },
  {
    question: "What is the population variance of the same data if it were the entire population?",
    shortAnswer: "Use VAR.P to get that value.",
    explanation: "For {1,2,3,4,5}, VAR.P = 2 (denominator 5).",
    level: "basic",
    codeExample: "VAR.S=2.5, VAR.P=2."
  },
  {
    question: "Can VAR.S be used with whole column references (A:A)?",
    shortAnswer: "Yes, but it will scan all rows; better to define a specific range.",
    explanation: "Works but may be slow on large datasets.",
    level: "basic",
    codeExample: "=VAR.S(A:A) acceptable."
  },
  {
    question: "How to compute sample variance for a frequency table?",
    shortAnswer: "Expand data or use weighted variance formula =SUMPRODUCT(freq*(value-mean)^2)/(SUM(freq)-1).",
    explanation: "Requires mean = SUMPRODUCT(value,freq)/SUM(freq).",
    level: "expert",
    codeExample: "Advanced but doable."
  },
  {
    question: "What is the result of =VAR.S(TRUE, FALSE, 5) with TRUE/FALSE as direct arguments?",
    shortAnswer: "5.555? Let's compute: TRUE=1, FALSE=0, 5. Values {1,0,5}, mean=2, squared deviations (1,4,9)=14, n=3, VAR.S=14/2=7.",
    explanation: "Direct logicals are coerced to numbers (TRUE=1, FALSE=0).",
    level: "advanced",
    codeExample: "=VAR.S(TRUE, FALSE, 5) → 7"
  },
  {
    question: "Is VAR.S sensitive to outliers?",
    shortAnswer: "Yes, very sensitive because deviations are squared.",
    explanation: "Outliers have a large impact on variance.",
    level: "intermediate",
    codeExample: "One extreme value can inflate variance dramatically."
  },
  {
    question: "How to compute sample variance while ignoring errors?",
    shortAnswer: "Use AGGREGATE(10,6, range).",
    explanation: "10 = VAR.S, 6 = ignore errors.",
    level: "advanced",
    codeExample: "=AGGREGATE(10,6, A2:A100)"
  },
  {
    question: "What is the sample variance of {1,2}?",
    shortAnswer: "0.5",
    explanation: "Mean=1.5, deviations: 0.5 and -0.5 squared =0.25+0.25=0.5, divided by 1 =0.5.",
    level: "basic",
    codeExample: "Smallest possible n."
  },
  {
    question: "Can VAR.S be used with Excel Tables structured references?",
    shortAnswer: "Yes: =VAR.S(Table1[Sales]).",
    explanation: "Structured references auto-adjust.",
    level: "basic",
    codeExample: "=VAR.S(Table1[Amount])"
  },
  {
    question: "How to find the variance of only positive numbers in a range?",
    shortAnswer: "Use array formula: =VAR.S(IF(range>0, range)).",
    explanation: "Excludes zero and negative numbers.",
    level: "advanced",
    codeExample: "{=VAR.S(IF(A1:A100>0, A1:A100))}"
  },
  {
    question: "What is a practical use of sample variance in finance?",
    shortAnswer: "Calculating portfolio risk – variance of returns is used to compute volatility.",
    explanation: "Variance is a key input in modern portfolio theory.",
    level: "expert",
    codeExample: "Financial models use variance for risk assessment."
  }
];

export default questions;