const questions = [
  {
    question: "What does STDEV.P calculate?",
    shortAnswer: "Population standard deviation – measure of spread for an entire population.",
    explanation: "It uses n denominator (no Bessel's correction), giving the exact standard deviation of the dataset.",
    level: "basic",
    codeExample: "=STDEV.P(A1:A100)"
  },
  {
    question: "How does STDEV.P differ from STDEV.S?",
    shortAnswer: "STDEV.P uses n (population), STDEV.S uses n-1 (sample).",
    explanation: "STDEV.P is appropriate when you have all possible values; STDEV.S is for samples.",
    level: "basic",
    codeExample: "For {1,2,3}: STDEV.P=0.816, STDEV.S=1.0"
  },
  {
    question: "What does STDEV.P return for a single number?",
    shortAnswer: "0 (zero).",
    explanation: "With only one value, there is no variation, so population standard deviation is 0.",
    level: "basic",
    codeExample: "=STDEV.P(42) → 0"
  },
  {
    question: "Does STDEV.P ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text, logical values, and blanks are ignored.",
    level: "basic",
    codeExample: "Range {5, \"a\", blank} → STDEV.P(5) = 0."
  },
  {
    question: "Why is STDEV.P smaller than STDEV.S for the same data?",
    shortAnswer: "Because denominator n is larger than n-1, making the variance slightly smaller.",
    explanation: "The square root of a smaller variance gives a smaller standard deviation.",
    level: "intermediate",
    codeExample: "Data {1,2,3}: STDEV.P≈0.816, STDEV.S≈1.000."
  },
  {
    question: "Can STDEV.P be used with a sample of a larger population?",
    shortAnswer: "No, it would underestimate the true population variability; use STDEV.S instead.",
    explanation: "STDEV.P assumes your data is the whole population, which is rarely true for samples.",
    level: "intermediate",
    codeExample: "Always ask: do I have all possible observations?"
  },
  {
    question: "What is the relationship between STDEV.P and VAR.P?",
    shortAnswer: "STDEV.P is the square root of VAR.P.",
    explanation: "Variance is squared deviation; stdev brings it back to original units.",
    level: "intermediate",
    codeExample: "STDEV.P(range)^2 = VAR.P(range)"
  },
  {
    question: "What error does STDEV.P return with no numbers?",
    shortAnswer: "#DIV/0! error.",
    explanation: "Cannot compute standard deviation of an empty set.",
    level: "basic",
    codeExample: "=STDEV.P(A1:A10) all blank or text → #DIV/0!"
  },
  {
    question: "How to calculate population standard deviation for a subset meeting a condition?",
    shortAnswer: "Use array formula: =STDEV.P(IF(criteria_range=criteria, value_range)).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel; in 365 works normally.",
    level: "advanced",
    codeExample: "{=STDEV.P(IF(A1:A100=\"North\", B1:B100))}"
  },
  {
    question: "Does STDEV.P treat TRUE/FALSE in cell references as 1/0?",
    shortAnswer: "No, they are ignored. Use STDEVPA to include them.",
    explanation: "STDEV.P ignores logicals; STDEVPA treats TRUE=1, FALSE=0.",
    level: "advanced",
    codeExample: "=STDEVPA(range) includes logicals."
  },
  {
    question: "What is the maximum number of arguments STDEV.P accepts?",
    shortAnswer: "255 arguments.",
    explanation: "Each argument can be a cell, range, or constant.",
    level: "expert",
    codeExample: "=STDEV.P(A1:A1000000, B1:B1000000)"
  },
  {
    question: "Can STDEV.P be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so stdev is in days.",
    explanation: "Useful for measuring spread of completion dates.",
    level: "intermediate",
    codeExample: "=STDEV.P(A1:A10) with dates → standard deviation in days."
  },
  {
    question: "What is the population standard deviation of identical numbers?",
    shortAnswer: "0 (zero).",
    explanation: "No variation means standard deviation is zero.",
    level: "basic",
    codeExample: "=STDEV.P(10,10,10) → 0"
  },
  {
    question: "How to get the population standard deviation of a filtered list?",
    shortAnswer: "Use SUBTOTAL(7, range) or AGGREGATE(7,5,range) – but SUBTOTAL with 7 is STDEV.S? Actually SUBTOTAL(7) is STDEV.S. For STDEV.P, need to use AGGREGATE(8,5,range) – 8 is STDEV.P.",
    explanation: "AGGREGATE(8,5,range) ignores hidden rows and calculates population stdev.",
    level: "advanced",
    codeExample: "=AGGREGATE(8,5, B2:B100)"
  },
  {
    question: "Why might STDEV.P be more appropriate than STDEV.S for some business reports?",
    shortAnswer: "When the dataset is the entire population of interest (e.g., all stores, all transactions in a closed period).",
    explanation: "Examples: annual sales of all branches, test scores of all students in a small school.",
    level: "intermediate",
    codeExample: "Full year data = population; last month = sample of the year."
  },
  {
    question: "What is the output of =STDEV.P({1,2,3,4,5})?",
    shortAnswer: "1.41421356 (sqrt(2)).",
    explanation: "Manual: mean=3, variance=((1-3)^2+...)/5=10/5=2, stdev=√2≈1.414.",
    level: "basic",
    codeExample: "Standard deviation of 1 through 5."
  },
  {
    question: "How to compute population standard deviation while ignoring zero values?",
    shortAnswer: "Use array formula: =STDEV.P(IF(range<>0, range)).",
    explanation: "Excludes zeros from the calculation.",
    level: "advanced",
    codeExample: "{=STDEV.P(IF(A1:A100<>0, A1:A100))}"
  },
  {
    question: "What is the difference between STDEV.P and STDEVP (old function)?",
    shortAnswer: "They are identical; STDEV.P is the newer name introduced for clarity.",
    explanation: "STDEVP still works for compatibility, but STDEV.P is recommended.",
    level: "basic",
    codeExample: "Both return same result."
  },
  {
    question: "Can STDEV.P be used with a 3D reference across sheets?",
    shortAnswer: "Yes, e.g., =STDEV.P(Sheet1:Sheet3!A1).",
    explanation: "Calculates population stdev of cell A1 across the range of sheets.",
    level: "advanced",
    codeExample: "All sheets must have same structure."
  },
  {
    question: "What does a small population standard deviation indicate?",
    shortAnswer: "Data points are close to the mean (low variability).",
    explanation: "Small stdev means consistency; large stdev means spread out.",
    level: "basic",
    codeExample: "Quality control: small stdev → stable process."
  },
  {
    question: "How to get the population standard deviation of only positive numbers?",
    shortAnswer: "Use array formula: =STDEV.P(IF(range>0, range)).",
    explanation: "Excludes negative numbers and zero.",
    level: "advanced",
    codeExample: "{=STDEV.P(IF(A1:A100>0, A1:A100))}"
  },
  {
    question: "Why does STDEV.P return 0 for a dataset with two identical numbers?",
    shortAnswer: "Because there is no variation between the numbers.",
    explanation: "If all values are the same, the standard deviation is zero.",
    level: "basic",
    codeExample: "=STDEV.P(5,5) → 0"
  },
  {
    question: "Is STDEV.P affected by outliers?",
    shortAnswer: "Yes, very sensitive – a single extreme value increases standard deviation significantly.",
    explanation: "Consider robust measures like median absolute deviation for skewed data.",
    level: "intermediate",
    codeExample: "Data {1,2,3,100} has much larger stdev than {1,2,3,4}."
  },
  {
    question: "What is the unit of measurement of STDEV.P?",
    shortAnswer: "Same as the original data (e.g., if data is rupees, stdev is rupees).",
    explanation: "Unlike variance (squared units), standard deviation is in original units.",
    level: "basic",
    codeExample: "Makes interpretation easier."
  },
  {
    question: "How to calculate the population standard deviation of a frequency table?",
    shortAnswer: "Expand data or use weighted formula: =SQRT(SUMPRODUCT(freq, (value-mean)^2)/SUM(freq)).",
    explanation: "Requires mean = SUMPRODUCT(value, freq)/SUM(freq).",
    level: "expert",
    codeExample: "Advanced but doable."
  },
  {
    question: "What is the result of =STDEV.P(--(A1:A10))?",
    shortAnswer: "Population stdev of 1s and 0s after converting logicals/booleans.",
    explanation: "The double unary converts TRUE/FALSE to 1/0.",
    level: "advanced",
    codeExample: "Array formula needed."
  },
  {
    question: "Can STDEV.P be used with Excel Tables structured references?",
    shortAnswer: "Yes: =STDEV.P(Table1[Sales]).",
    explanation: "Structured references auto-adjust and are easy to read.",
    level: "basic",
    codeExample: "=STDEV.P(Table1[Amount])"
  },
  {
    question: "What is the difference between STDEV.P and STDEVPA?",
    shortAnswer: "STDEVPA includes text (as 0) and logicals (TRUE=1, FALSE=0) in the calculation.",
    explanation: "STDEV.P ignores them. STDEVPA is used when non‑numeric should contribute.",
    level: "advanced",
    codeExample: "=STDEVPA(A1:A100) treats \"Missing\" as 0."
  },
  {
    question: "How to compute population standard deviation for a moving window (e.g., last 12 months)?",
    shortAnswer: "Use OFFSET and STDEV.P: =STDEV.P(OFFSET(first_cell, COUNT(range)-12, 0, 12, 1)).",
    explanation: "Complex; dynamic arrays in Excel 365 simplify with TAKE, DROP, etc.",
    level: "expert",
    codeExample: "Rolling population stdev."
  },
  {
    question: "Is there a built‑in function to compute population standard deviation while ignoring errors?",
    shortAnswer: "Yes: AGGREGATE(8,6, range) where 8=STDEV.P and 6=ignore errors.",
    explanation: "AGGREGATE is the most robust function for such needs.",
    level: "advanced",
    codeExample: "=AGGREGATE(8,6, A2:A100)"
  }
];

export default questions;