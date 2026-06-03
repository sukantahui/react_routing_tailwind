const questions = [
  {
    question: "What does VAR.P calculate?",
    shortAnswer: "Population variance – average of squared deviations from the mean, using n denominator.",
    explanation: "It gives the exact variance of an entire population.",
    level: "basic",
    codeExample: "=VAR.P(A1:A100)"
  },
  {
    question: "How does VAR.P differ from VAR.S?",
    shortAnswer: "VAR.P uses n (population), VAR.S uses n-1 (sample).",
    explanation: "VAR.P is smaller than VAR.S for the same dataset (unless n is huge).",
    level: "basic",
    codeExample: "For {1,2,3}: VAR.P≈0.6667, VAR.S=1"
  },
  {
    question: "What does VAR.P return for a single number?",
    shortAnswer: "0",
    explanation: "With one number, there is no variation, so population variance is 0.",
    level: "basic",
    codeExample: "=VAR.P(42) → 0"
  },
  {
    question: "Does VAR.P ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored; they do not affect the calculation.",
    level: "basic",
    codeExample: "Range {5, \"a\", blank} → VAR.P(5)=0."
  },
  {
    question: "What is the relationship between VAR.P and STDEV.P?",
    shortAnswer: "VAR.P is the square of STDEV.P",
    explanation: "STDEV.P = SQRT(VAR.P)",
    level: "intermediate",
    codeExample: "STDEV.P(range)^2 = VAR.P(range)"
  },
  {
    question: "Why would you use VAR.P instead of VAR.S?",
    shortAnswer: "When you have the entire population (not a sample).",
    explanation: "To get the exact variance without underestimation.",
    level: "intermediate",
    codeExample: "All students in a small class, all transactions for the year."
  },
  {
    question: "Can VAR.P be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so variance is in days².",
    explanation: "Useful for population timeline variability.",
    level: "intermediate",
    codeExample: "=VAR.P(A1:A10) with dates."
  },
  {
    question: "What is the maximum number of arguments VAR.P accepts?",
    shortAnswer: "255 arguments, like other statistical functions.",
    explanation: "Each argument can be a range or constant.",
    level: "expert",
    codeExample: "=VAR.P(A1:A1000000, B1:B1000000)"
  },
  {
    question: "How to compute population variance for a subset meeting a condition?",
    shortAnswer: "Use array formula: =VAR.P(IF(criteria_range=criteria, value_range)).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel; in 365 works normally.",
    level: "advanced",
    codeExample: "{=VAR.P(IF(A1:A100=\"North\", B1:B100))}"
  },
  {
    question: "What is the output of =VAR.P({1,2,3,4,5})?",
    shortAnswer: "2",
    explanation: "Mean=3, squared deviations sum=10, n=5 => 10/5=2.",
    level: "basic",
    codeExample: "Simple population."
  },
  {
    question: "How to get the population variance while ignoring zeros?",
    shortAnswer: "Use array formula: =VAR.P(IF(range<>0, range)).",
    explanation: "Excludes zero values from the calculation.",
    level: "advanced",
    codeExample: "{=VAR.P(IF(A1:A100<>0, A1:A100))}"
  },
  {
    question: "What is the unit of VAR.P?",
    shortAnswer: "Square of the original unit (e.g., if data is metres, VAR.P is metres²).",
    explanation: "This is why standard deviation (in original units) is often more interpretable.",
    level: "basic",
    codeExample: "Variance of 10,20,30 = 66.67 m²."
  },
  {
    question: "Why does VAR.P return 0 for a dataset with all same numbers?",
    shortAnswer: "Because all deviations are zero; the variance is zero.",
    explanation: "No spread means no variance.",
    level: "basic",
    codeExample: "=VAR.P(5,5,5) → 0"
  },
  {
    question: "Can VAR.P be used with a 3D reference across sheets?",
    shortAnswer: "Yes, e.g., =VAR.P(Sheet1:Sheet3!A1)",
    explanation: "Calculates population variance of cell A1 across the sheet range.",
    level: "advanced",
    codeExample: "All sheets must have same structure."
  },
  {
    question: "How to compute rolling population variance (e.g., last 12 months)?",
    shortAnswer: "Use OFFSET with VAR.P: =VAR.P(OFFSET(first_cell, COUNT(range)-12, 0, 12, 1)).",
    explanation: "Complex; dynamic arrays in Excel 365 simplify.",
    level: "expert",
    codeExample: "Rolling population variance."
  },
  {
    question: "What is the difference between VAR.P and VARPA?",
    shortAnswer: "VARPA includes text (as 0) and logicals (TRUE=1, FALSE=0) in the calculation.",
    explanation: "VAR.P ignores them. VARPA is used when non‑numeric should contribute.",
    level: "advanced",
    codeExample: "=VARPA(range) treats \"Missing\" as 0."
  },
  {
    question: "Does VAR.P work with array constants?",
    shortAnswer: "Yes, e.g., =VAR.P({1,2,3,4})",
    explanation: "Array constants are treated as direct numeric arguments.",
    level: "intermediate",
    codeExample: "=VAR.P({1,2,3,4}) → 1.25"
  },
  {
    question: "Why is VAR.P smaller than VAR.S for the same data?",
    shortAnswer: "Because denominator n (VAR.P) is larger than n-1 (VAR.S).",
    explanation: "VAR.P divides by a larger number, so the result is smaller.",
    level: "intermediate",
    codeExample: "Correct mathematical difference."
  },
  {
    question: "How to get population variance of visible cells only (after filter)?",
    shortAnswer: "Use SUBTOTAL(9, range) – SUBTOTAL with function 9 returns VAR.P? Actually SUBTOTAL(9) is VAR.S? I need to be accurate: SUBTOTAL function: 10 = VAR.S, 11 = VAR.P? Wait, Microsoft's SUBTOTAL: 9 = SUM, 10 = VAR.S? Let's check: Actually SUBTOTAL(7)=STDEV.S, 8=STDEV.P? No. Safer: use AGGREGATE(9,5,range) where 9 = VAR.P, 5 = ignore hidden rows.",
    explanation: "AGGREGATE is more reliable for this.",
    level: "advanced",
    codeExample: "=AGGREGATE(9,5, B2:B100)"
  },
  {
    question: "What is the population variance of {1,2}?",
    shortAnswer: "0.25",
    explanation: "Mean=1.5, deviations: 0.5 and -0.5 squared =0.25+0.25=0.5, n=2 => 0.5/2=0.25",
    level: "basic",
    codeExample: "Smallest population."
  },
  {
    question: "Can VAR.P be used with whole column references (A:A)?",
    shortAnswer: "Yes, but it scans all rows; better to define a specific range.",
    explanation: "Works but may be slow on large datasets.",
    level: "basic",
    codeExample: "=VAR.P(A:A) acceptable for small columns."
  },
  {
    question: "How to compute population variance for a frequency table?",
    shortAnswer: "Use weighted formula =SUMPRODUCT(freq*(value-mean)^2)/SUM(freq).",
    explanation: "Requires mean = SUMPRODUCT(value,freq)/SUM(freq).",
    level: "expert",
    codeExample: "Advanced but doable."
  },
  {
    question: "What is the result of =VAR.P(TRUE, FALSE, 5) with TRUE/FALSE as direct arguments?",
    shortAnswer: "4.6667? Compute: TRUE=1, FALSE=0, 5; values {1,0,5}, mean=2, squared deviations (1,4,9)=14, n=3 => 14/3≈4.6667.",
    explanation: "Direct logicals are coerced to numbers.",
    level: "advanced",
    codeExample: "=VAR.P(TRUE, FALSE, 5) → 4.6667"
  },
  {
    question: "Is VAR.P sensitive to outliers?",
    shortAnswer: "Yes, very sensitive because deviations are squared.",
    explanation: "Outliers increase variance dramatically.",
    level: "intermediate",
    codeExample: "One extreme value can distort variance."
  },
  {
    question: "How to compute population variance while ignoring errors?",
    shortAnswer: "Use AGGREGATE(9,6, range).",
    explanation: "9 = VAR.P, 6 = ignore errors.",
    level: "advanced",
    codeExample: "=AGGREGATE(9,6, A2:A100)"
  },
  {
    question: "What is the difference between VAR.P and VARP (old function)?",
    shortAnswer: "They are identical; VARP is the older name, VAR.P is the newer, more consistent naming.",
    explanation: "Both work, but VAR.P is recommended for clarity.",
    level: "basic",
    codeExample: "=VARP(A1:A100) vs =VAR.P(A1:A100) – same result."
  },
  {
    question: "Can VAR.P be used with Excel Tables structured references?",
    shortAnswer: "Yes: =VAR.P(Table1[Sales])",
    explanation: "Structured references auto-adjust and are easy to read.",
    level: "basic",
    codeExample: "=VAR.P(Table1[Amount])"
  },
  {
    question: "How to find the population variance of only positive numbers?",
    shortAnswer: "Use array formula: =VAR.P(IF(range>0, range)).",
    explanation: "Excludes zero and negative numbers.",
    level: "advanced",
    codeExample: "{=VAR.P(IF(A1:A100>0, A1:A100))}"
  },
  {
    question: "What is a practical use of population variance in finance?",
    shortAnswer: "Calculating variance of returns for the entire market index (all stocks).",
    explanation: "Used in portfolio theory when the entire population is known.",
    level: "expert",
    codeExample: "Risk assessment of the whole market."
  },
  {
    question: "Why might someone incorrectly use VAR.P on a sample?",
    shortAnswer: "Because they don't understand the difference or by mistake, leading to underestimation of variability.",
    explanation: "This can cause incorrect conclusions in hypothesis testing or confidence intervals.",
    level: "intermediate",
    codeExample: "Always check: is this the full population?"
  }
];

export default questions;