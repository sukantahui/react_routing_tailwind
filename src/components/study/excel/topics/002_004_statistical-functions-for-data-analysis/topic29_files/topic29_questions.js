const questions = [
  {
    question: "What does the CORREL function compute?",
    shortAnswer: "The Pearson correlation coefficient r, measuring the strength and direction of a linear relationship between two variables.",
    explanation: "Values range from -1 (perfect negative) to +1 (perfect positive), with 0 indicating no linear relationship.",
    level: "basic",
    codeExample: "=CORREL(A2:A100, B2:B100)"
  },
  {
    question: "What does a correlation coefficient of +0.85 indicate?",
    shortAnswer: "A strong positive linear relationship: as one variable increases, the other tends to increase.",
    explanation: "The closer to +1, the stronger the positive association.",
    level: "basic",
    codeExample: "Example: study hours and exam scores."
  },
  {
    question: "What does a correlation coefficient of -0.9 indicate?",
    shortAnswer: "A strong negative linear relationship: as one variable increases, the other decreases.",
    explanation: "Example: price and demand (higher price, lower demand).",
    level: "basic",
    codeExample: "Negative correlation."
  },
  {
    question: "What does r = 0 mean?",
    shortAnswer: "No linear relationship between the two variables.",
    explanation: "However, a non‑linear relationship (e.g., U‑shaped) may still exist.",
    level: "basic",
    codeExample: "Scatter plot looks random or curved."
  },
  {
    question: "What is the range of possible values for CORREL?",
    shortAnswer: "Between -1 and 1 inclusive.",
    explanation: "Values outside this range are impossible.",
    level: "basic",
    codeExample: "Always within [-1,1]."
  },
  {
    question: "Does CORREL ignore text and blanks?",
    shortAnswer: "Yes, it only uses numeric cells in both arrays; corresponding rows with text or blanks in either array are ignored.",
    explanation: "The function pairs numeric cells and ignores missing data.",
    level: "basic",
    codeExample: "Safe with headers."
  },
  {
    question: "What happens if one of the arrays has zero variance (all values identical)?",
    shortAnswer: "CORREL returns #DIV/0! because standard deviation is zero.",
    explanation: "Correlation is undefined when there is no variation in a variable.",
    level: "intermediate",
    codeExample: "=CORREL(A2:A10, B2:B10) where A2:A10 all 5 → #DIV/0!"
  },
  {
    question: "What is the difference between CORREL and COVARIANCE.P?",
    shortAnswer: "CORREL gives a standardised measure (unitless, between -1 and 1), while COVARIANCE.P gives the raw covariance (units depend on the variables).",
    explanation: "Correlation is more interpretable for comparing relationships across different units.",
    level: "advanced",
    codeExample: "CORREL = COVARIANCE.P / (STDEV.P1 * STDEV.P2)."
  },
  {
    question: "Can CORREL be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so you can correlate dates with other numeric data.",
    explanation: "Be careful: correlation with dates often requires careful interpretation.",
    level: "intermediate",
    codeExample: "=CORREL(A2:A100, B2:B100) where A contains dates."
  },
  {
    question: "What is the maximum number of arguments CORREL accepts?",
    shortAnswer: "Two: array1 and array2.",
    explanation: "Each array can be a range, named range, or array constant.",
    level: "basic",
    codeExample: "Exactly two arrays."
  },
  {
    question: "How to compute correlation for a subset (e.g., only North region) in older Excel?",
    shortAnswer: "Use array formula: =CORREL(IF(region='North', values1), IF(region='North', values2)).",
    explanation: "Enter with Ctrl+Shift+Enter; in 365 it works normally.",
    level: "advanced",
    codeExample: "{=CORREL(IF(A2:A100='North', B2:B100), IF(A2:A100='North', C2:C100))}"
  },
  {
    question: "What is the coefficient of determination (r²)?",
    shortAnswer: "r² = (CORREL(...))^2; it describes the proportion of variance in one variable explained by the other (in a linear regression).",
    explanation: "An r=0.9 gives r²=0.81, meaning 81% of variance is explained.",
    level: "intermediate",
    codeExample: "=CORREL(A2:A100, B2:B100)^2"
  },
  {
    question: "Why might two variables have a high correlation but no causation?",
    shortAnswer: "Confounding variables, coincidence, or reverse causation (the effect may cause the cause).",
    explanation: "Classic example: ice cream sales and drowning incidents correlate due to hot weather.",
    level: "intermediate",
    codeExample: "Always consider third variables."
  },
  {
    question: "What is a common cause of a correlation coefficient of exactly 1 or -1?",
    shortAnswer: "Perfect linear relationship, which in real data usually occurs only when one variable is a linear transformation of the other (e.g., temperature in Celsius vs Fahrenheit).",
    explanation: "In real-world datasets, perfect correlation is rare.",
    level: "advanced",
    codeExample: "F° = (C° * 9/5) + 32 gives r=1."
  },
  {
    question: "Does CORREL assume a normal distribution?",
    shortAnswer: "No, it does not assume normality. It is a measure of linear association regardless of distribution.",
    explanation: "However, significance testing of correlation often assumes normality.",
    level: "expert",
    codeExample: "Use with any continuous numeric data."
  },
  {
    question: "How to visualise correlation in Excel?",
    shortAnswer: "Create a scatter plot (Insert > Scatter). Then add a trendline and display R² on the chart.",
    explanation: "Scatter plots reveal if the relationship is linear, curved, or has outliers.",
    level: "basic",
    codeExample: "Right‑click trendline → Format Trendline → Display R‑squared."
  },
  {
    question: "Can CORREL be used with non‑numeric data?",
    shortAnswer: "No, it ignores non‑numeric entries. For categorical variables, use other association measures (e.g., Chi‑square).",
    explanation: "Pearson correlation is for numeric data only.",
    level: "basic",
    codeExample: "Not appropriate for categories."
  },
  {
    question: "What is the sample size requirement for reliable correlation?",
    shortAnswer: "There is no fixed rule, but larger samples produce more stable estimates. For n < 10, the correlation can be very unstable.",
    explanation: "Even a moderate correlation may not be statistically significant with small n.",
    level: "advanced",
    codeExample: "Check significance with p‑value using a formula."
  },
  {
    question: "How does CORREL handle missing pairs?",
    shortAnswer: "It uses pairwise deletion: if either array has a non‑numeric at a specific row, that entire row is omitted.",
    explanation: "Only complete pairs contribute to the calculation.",
    level: "intermediate",
    codeExample: "Ensure aligned data."
  },
  {
    question: "Can CORREL be used with Excel Tables?",
    shortAnswer: "Yes: =CORREL(Table1[Hours], Table1[Scores])",
    explanation: "Structured references are recommended.",
    level: "basic",
    codeExample: "Clean and auto‑updating."
  },
  {
    question: "What is the output of =CORREL({1,2,3,4,5}, {2,4,6,8,10})?",
    shortAnswer: "1 (perfect positive correlation).",
    explanation: "The second set is exactly 2 times the first, so perfect linear relationship.",
    level: "basic",
    codeExample: "r = 1."
  },
  {
    question: "Why might CORREL return a value close to 0 even if variables are strongly related?",
    shortAnswer: "Because the relationship might be non‑linear (curved, exponential, etc.).",
    explanation: "Test with scatter plot and consider other measures (e.g., Spearman rank correlation).",
    level: "intermediate",
    codeExample: "U‑shaped pattern yields r ≈ 0."
  },
  {
    question: "What is the difference between Pearson (CORREL) and Spearman correlation?",
    shortAnswer: "Pearson measures linear relationships; Spearman measures monotonic relationships (based on ranks).",
    explanation: "Excel does not have built‑in Spearman, but you can use rank and then CORREL.",
    level: "advanced",
    codeExample: "Convert values to ranks, then CORREL."
  },
  {
    question: "How to calculate the p‑value for a correlation coefficient in Excel?",
    shortAnswer: "Use =TDIST(t, df, 2) where t = r*SQRT((n-2)/(1-r²)), df = n-2. Not built‑in directly.",
    explanation: "Advanced users may use Data Analysis Toolpak for significance.",
    level: "expert",
    codeExample: "Manual calculation or Toolpak."
  },
  {
    question: "Is CORREL a volatile function?",
    shortAnswer: "No, it recalculates only when input data changes.",
    explanation: "Non‑volatile, safe for large workbooks.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "What does CORREL return if the two arrays have different lengths after ignoring non‑numeric?",
    shortAnswer: "It uses only the complete pairs; if no complete pair, returns #DIV/0!.",
    explanation: "The function internally aligns by position.",
    level: "intermediate",
    codeExample: "Lengths must be same after filtering blanks – but Excel handles it internally."
  },
  {
    question: "How can you compute rolling correlation (e.g., correlation over last 12 months)?",
    shortAnswer: "Use OFFSET with CORREL: =CORREL(OFFSET(x_range, COUNT(x)-12,0,12,1), OFFSET(y_range, COUNT(y)-12,0,12,1)).",
    explanation: "Complex; dynamic arrays in 365 simplify.",
    level: "expert",
    codeExample: "Rolling correlation."
  },
  {
    question: "What is the effect of outliers on CORREL?",
    shortAnswer: "Outliers can dramatically change the correlation, either inflating or deflating it.",
    explanation: "Always check scatter plots and consider robust methods or outlier removal.",
    level: "intermediate",
    codeExample: "One extreme point can change r from 0 to 0.8."
  },
  {
    question: "Can CORREL be used to compare more than two variables at once?",
    shortAnswer: "You need to compute pairwise correlations; in Excel 365, you can use a correlation matrix with multiple CORREL formulas.",
    explanation: "Use absolute references to create a table.",
    level: "advanced",
    codeExample: "Matrix of cross‑correlations."
  },
  {
    question: "Why does CORREL sometimes return a value slightly above 1 or below -1 due to floating point?",
    shortAnswer: "Computational rounding may cause values like 1.0000000002. Use ROUND to fix.",
    explanation: "Theoretical bounds are strictly -1 to 1, but floating errors happen.",
    level: "basic",
    codeExample: "=ROUND(CORREL(A:A,B:B), 10)"
  }
];

export default questions;