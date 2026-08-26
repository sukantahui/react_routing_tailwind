const questions = [
  {
    question: "What is the first step when you receive a new dataset for analysis?",
    shortAnswer: "Explore the data: check for blanks, errors, range of values, and what each column represents.",
    explanation: "Understanding data quality and structure prevents wrong conclusions.",
    level: "basic",
    codeExample: "Use COUNTBLANK, MIN, MAX, and visual inspection."
  },
  {
    question: "Why is it important to look at the distribution before computing a mean?",
    shortAnswer: "If the data is skewed or contains outliers, the mean may not represent the centre accurately.",
    explanation: "Median or trimmed mean may be better for skewed data.",
    level: "intermediate",
    codeExample: "Plot a histogram or box plot first."
  },
  {
    question: "What would you do if you find missing values in a critical column?",
    shortAnswer: "Investigate the cause: if they represent zero, replace them; if unknown, consider removing those rows or using median imputation.",
    explanation: "Document the decision.",
    level: "intermediate",
    codeExample: "Use IF(ISBLANK(...), ...) to treat blanks."
  },
  {
    question: "When evaluating a correlation between two variables, what should you also look at?",
    shortAnswer: "A scatter plot to see if the relationship is linear and to spot outliers.",
    explanation: "A single outlier can drastically inflate or deflate correlation.",
    level: "basic",
    codeExample: "Insert > Scatter chart."
  },
  {
    question: "How can you check if a product’s sales are consistent over time?",
    shortAnswer: "Calculate the standard deviation of sales for that product across periods; a small stdev indicates consistency.",
    explanation: "You can also use coefficient of variation = stdev/mean.",
    level: "intermediate",
    codeExample: "=STDEV.S(IF(product_range=\"Rice\", sales_range)) array."
  },
  {
    question: "What does a FORECAST.LINEAR prediction beyond the range of known_x's assume?",
    shortAnswer: "That the linear trend continues exactly the same way outside the observed data.",
    explanation: "This is risky; use subject matter knowledge to decide.",
    level: "advanced",
    codeExample: "Extrapolation should be done cautiously."
  },
  {
    question: "Why might you prefer AVERAGEIFS over an array formula {=AVERAGE(IF(...))}?",
    shortAnswer: "AVERAGEIFS is faster, easier to read, and does not require Ctrl+Shift+Enter.",
    explanation: "It is a dedicated function for multi‑condition averages.",
    level: "basic",
    codeExample: "=AVERAGEIFS(score, city, \"North\", score, \">80\")"
  },
  {
    question: "If you see a high negative correlation between Price and Quantity, what might that mean?",
    shortAnswer: "As price increases, quantity sold tends to decrease – typical demand behaviour.",
    explanation: "Economists expect a negative relationship (law of demand).",
    level: "basic",
    codeExample: "Scatter plot would show a downward slope."
  },
  {
    question: "How can you quickly detect outliers using Excel functions without manual sorting?",
    shortAnswer: "Compute lower and upper fences using QUARTILE.INC, then use an IF formula to flag any value outside those fences.",
    explanation: "=IF(OR(value < lower, value > upper), \"Outlier\", \"\")",
    level: "intermediate",
    codeExample: "IQR method."
  },
  {
    question: "What is the difference between COUNT and COUNTA when interpreting a dataset?",
    shortAnswer: "COUNT counts only numbers; COUNTA counts any non‑blank cell (including text).",
    explanation: "Use COUNT for numeric columns; COUNTA for checking data completeness.",
    level: "basic",
    codeExample: "Review columns separately."
  },
  {
    question: "After cleaning data and computing statistics, what should you do before presenting to management?",
    shortAnswer: "Validate results with simple sanity checks (e.g., total sales by month match known figures).",
    explanation: "Also create visualisations to make insights clear.",
    level: "intermediate",
    codeExample: "Pivot tables and charts."
  },
  {
    question: "If two products have the same mean sales but very different standard deviations, what can you infer?",
    shortAnswer: "The product with higher stdev has more volatile sales; the lower stdev is more consistent.",
    explanation: "Choose based on risk preference.",
    level: "basic",
    codeExample: "Low stdev = stable; high stdev = unpredictable."
  },
  {
    question: "How can you create a dynamic summary that updates when new rows are added to the dataset?",
    shortAnswer: "Convert the range to an Excel Table (Ctrl+T) and use structured references in your formulas.",
    explanation: "Tables automatically expand when you add rows.",
    level: "advanced",
    codeExample: "=SUM(Table1[Sales])"
  },
  {
    question: "Why might you see #DIV/0! when using AVERAGEIFS even though there are numbers?",
    shortAnswer: "Because no row satisfies all the criteria, so there are no numbers to average.",
    explanation: "Use COUNTIFS to see if any rows match the criteria.",
    level: "intermediate",
    codeExample: "=IFERROR(AVERAGEIFS(...), 0)"
  },
  {
    question: "What is a practical use of the CORREL function in a retail business context?",
    shortAnswer: "To see if advertising spend correlates with sales, or if store footfall correlates with revenue.",
    explanation: "Helps allocate budget or staff.",
    level: "advanced",
    codeExample: "=CORREL(ad_spend, sales)"
  }
];

export default questions;