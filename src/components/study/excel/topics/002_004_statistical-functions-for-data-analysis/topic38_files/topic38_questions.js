// topic38_questions.js - 30 Comprehensive Statistical Mastery & Viva Questions
// Topic 38: Test Your Skill: Statistical Functions For Data Analysis
// Module: 002_004_statistical-functions-for-data-analysis

const questions = [
  {
    question: "What is the fundamental mathematical difference between `STDEV.S` and `STDEV.P` in Excel?",
    shortAnswer: "`STDEV.S` uses Bessel's correction with denominator (n - 1) for sample data, while `STDEV.P` uses denominator (N) for full populations.",
    explanation: "Sample standard deviation applies (n-1) to produce an unbiased estimator of population variance from a sample subset.",
    hint: "STDEV.S divides by (n - 1); STDEV.P divides by N.",
    level: "moderate",
    codeExample: "=STDEV.S(C2:C50) vs =STDEV.P(C2:C50)"
  },
  {
    question: "When is reporting the `MEDIAN` statistically superior to reporting the `AVERAGE` (Mean)?",
    shortAnswer: "When datasets contain extreme outliers or exhibit heavy skewness (e.g. executive salaries, housing prices).",
    explanation: "The median is a robust metric that resists outlier distortion, whereas the mean is heavily pulled by extreme values.",
    hint: "Median resists outlier distortion in skewed distributions.",
    level: "basic",
    codeExample: "=MEDIAN(Salaries) vs =AVERAGE(Salaries)"
  },
  {
    question: "How does `MODE.MULT` differ from `MODE.SNGL` in Excel 365?",
    shortAnswer: "`MODE.MULT` is a dynamic array function that returns a vertical spill range of all multimodal values; `MODE.SNGL` returns only the first mode found.",
    explanation: "If a dataset has multiple equally frequent modes (e.g. 15 and 22), `MODE.MULT` spills both.",
    hint: "MODE.MULT spills multiple modes as a dynamic array.",
    level: "moderate",
    codeExample: "=MODE.MULT(A2:A100)"
  },
  {
    question: "What is the difference between `QUARTILE.INC` and `QUARTILE.EXC`?",
    shortAnswer: "`QUARTILE.INC` includes 0 and 4 as quartile arguments (Min and Max) with percentile range 0 to 1; `QUARTILE.EXC` excludes extremes with range (0, 1).",
    explanation: "Quartile.exc calculates quartiles based on strict population rank exclusions where quartiles 1-3 partition the inner distribution.",
    hint: "INC includes bounds 0 and 4; EXC requires quartile between 1 and 3.",
    level: "advanced",
    codeExample: "=QUARTILE.INC(Data, 1) vs =QUARTILE.EXC(Data, 1)"
  },
  {
    question: "How do you calculate the Pearson Correlation Coefficient between advertising spend and revenue?",
    shortAnswer: "Use `=CORREL(Array1, Array2)`.",
    explanation: "CORREL returns a value between -1 and +1, quantifying linear association strength.",
    hint: "=CORREL(AdSpend, Revenue)",
    level: "basic",
    codeExample: "=CORREL(B2:B50, C2:C50)"
  },
  {
    question: "What does a correlation coefficient of -0.87 indicate between two business variables?",
    shortAnswer: "A strong inverse (negative) linear relationship: as one variable increases, the other decreases consistently.",
    explanation: "Values close to -1 represent strong negative correlation.",
    hint: "Negative sign = inverse relationship; magnitude 0.87 = strong.",
    level: "basic",
    codeExample: "CORREL = -0.87 (Strong Inverse Relationship)"
  },
  {
    question: "How do you extract the 3rd highest sales figure from a data column?",
    shortAnswer: "Use `=LARGE(Range, 3)`.",
    explanation: "`LARGE(array, k)` extracts the k-th largest value; `SMALL(array, k)` extracts the k-th smallest.",
    hint: "=LARGE(Range, k)",
    level: "basic",
    codeExample: "=LARGE(tbl_Sales[Revenue], 3)"
  },
  {
    question: "What is the difference between `RANK.EQ` and `RANK.AVG` when two students achieve identical scores?",
    shortAnswer: "`RANK.EQ` assigns both students the top shared rank (e.g. 2nd); `RANK.AVG` assigns both the average rank (e.g. 2.5).",
    explanation: "RANK.AVG produces non-integer fractional ranks to preserve sum of rank properties for statistical testing.",
    hint: "RANK.EQ gives duplicate integer ranks; RANK.AVG averages tied ranks.",
    level: "moderate",
    codeExample: "=RANK.AVG(C2, C$2:C$50, 0)"
  },
  {
    question: "How do you calculate a linear forecast for month 13 using historical monthly sales?",
    shortAnswer: "Use `=FORECAST.LINEAR(x, known_y's, known_x's)`.",
    explanation: "Computes predicted Y using least-squares linear regression: Y = a + bX.",
    hint: "=FORECAST.LINEAR(13, Sales_Range, Month_Range)",
    level: "moderate",
    codeExample: "=FORECAST.LINEAR(13, B2:B13, A2:A13)"
  },
  {
    question: "How does `TREND` differ from `FORECAST.LINEAR`?",
    shortAnswer: "`TREND` can calculate multiple future points simultaneously as a dynamic array and supports multiple regression with multiple X variables.",
    explanation: "TREND returns a spilled array of forecasted values across a whole timeline vector.",
    hint: "TREND is a dynamic array function supporting multivariate regression.",
    level: "advanced",
    codeExample: "=TREND(Known_Y, Known_X, New_X)"
  },
  {
    question: "How do you calculate the conditional average of sales in Barrackpore where order value exceeds ₹50,000?",
    shortAnswer: "Use `=AVERAGEIFS(SalesRange, BranchRange, \"Barrackpore\", SalesRange, \">50000\")`.",
    explanation: "AVERAGEIFS takes average_range first, followed by criteria_range/criteria pairs.",
    hint: "AVERAGEIFS(avg_range, crit_range1, crit1, crit_range2, crit2)",
    level: "moderate",
    codeExample: "=AVERAGEIFS(D2:D100, B2:B100, \"Barrackpore\", D2:D100, \">50000\")"
  },
  {
    question: "How do you count transactions occurring between 01-Jan-2026 and 31-Mar-2026?",
    shortAnswer: "Use `=COUNTIFS(DateRange, \">=2026-01-01\", DateRange, \"<=2026-03-31\")`.",
    explanation: "Multi-condition COUNTIFS bounds the date interval using comparison operators.",
    hint: "COUNTIFS with >= start_date and <= end_date.",
    level: "moderate",
    codeExample: "=COUNTIFS(A2:A100, \">=2026-01-01\", A2:A100, \"<=2026-03-31\")"
  },
  {
    question: "What is an Interquartile Range (IQR) and how is it used to detect statistical outliers?",
    shortAnswer: "IQR = Q3 - Q1; values falling below `Q1 - 1.5*IQR` or above `Q3 + 1.5*IQR` are flagged as Tukey outliers.",
    explanation: "Tukey's 1.5*IQR rule is the gold standard for robust statistical anomaly detection.",
    hint: "Lower Fence = Q1 - 1.5*IQR; Upper Fence = Q3 + 1.5*IQR.",
    level: "advanced",
    codeExample: "=[@Sales] > (Q3 + 1.5*(Q3 - Q1))"
  },
  {
    question: "What is `PERCENTRANK.INC` and what value does it return?",
    shortAnswer: "Returns the relative rank of a value in a dataset as a percentage between 0.0 (0%) and 1.0 (100%), inclusive.",
    explanation: "Useful for student percentile standing and credit score distribution tiers.",
    hint: "Returns a decimal percentage rank between 0 and 1.",
    level: "moderate",
    codeExample: "=PERCENTRANK.INC(tbl_Scores[Marks], [@Marks])"
  },
  {
    question: "How do you calculate the standard error of the mean (SEM) in Excel?",
    shortAnswer: "`=STDEV.S(DataRange) / SQRT(COUNT(DataRange))`.",
    explanation: "SEM measures the precision of the sample mean as an estimate of the population mean.",
    hint: "STDEV.S divided by the square root of COUNT.",
    level: "advanced",
    codeExample: "=STDEV.S(C2:C100) / SQRT(COUNT(C2:C100))"
  },
  {
    question: "How does `COUNT` differ from `COUNTA` in statistical preprocessing?",
    shortAnswer: "`COUNT` counts cells containing numbers only; `COUNTA` counts all non-empty cells (text, numbers, booleans, errors).",
    explanation: "Using COUNTA on numeric columns can corrupt sample size (n) if text notes or error strings are present.",
    hint: "COUNT = numbers only; COUNTA = all non-blank cells.",
    level: "basic",
    codeExample: "n = COUNT(Range) [For numeric calculations]"
  },
  {
    question: "How do you ignore text errors in statistical formulas automatically?",
    shortAnswer: "Wrap expressions in `IFERROR(...)` or use `AGGREGATE(function_num, 6, array)`.",
    explanation: "AGGREGATE option 6 explicitly ignores error values like #N/A, #DIV/0! in calculations.",
    hint: "AGGREGATE with option 6 ignores all errors.",
    level: "moderate",
    codeExample: "=AGGREGATE(4, 6, DataRange) [Max ignoring errors]"
  },
  {
    question: "Why does `=CORREL(X, Y)` return `#DIV/0!` error?",
    shortAnswer: "Because the standard deviation of array X or array Y is zero (all values in that array are constant/identical).",
    explanation: "Correlation formula divides by the product of both standard deviations; if variance is zero, division by zero occurs.",
    hint: "One of the arrays has zero variance (constant values).",
    level: "advanced",
    codeExample: "Fix: Ensure both series have non-zero variance."
  },
  {
    question: "What is the formula to standardize a data point into a Z-Score in Excel?",
    shortAnswer: "Use `=STANDARDIZE(x, mean, standard_dev)`.",
    explanation: "Calculates Z = (X - μ) / σ to evaluate how many standard deviations a value lies from the mean.",
    hint: "=STANDARDIZE(x, mean, stdev)",
    level: "moderate",
    codeExample: "=STANDARDIZE(C2, AVERAGE(C$2:C$50), STDEV.S(C$2:C$50))"
  },
  {
    question: "What Z-score threshold typically indicates a severe statistical outlier in a normal distribution?",
    shortAnswer: "Z &gt; +3.0 or Z &lt; -3.0 (representing values outside 99.73% of normal distribution).",
    explanation: "The 3-sigma rule flags data points beyond ±3 standard deviations as statistical anomalies.",
    hint: "|Z| > 3 represents a rare 3-sigma event.",
    level: "moderate",
    codeExample: "=ABS([@Z_Score]) > 3"
  },
  {
    question: "How do you calculate the geometric mean of investment return multipliers?",
    shortAnswer: "Use `=GEOMEAN(MultipliersRange) - 1`.",
    explanation: "GEOMEAN accurately measures compound annual growth rates (CAGR) without arithmetic bias.",
    hint: "=GEOMEAN(Return_Multipliers) - 1",
    level: "advanced",
    codeExample: "=GEOMEAN(1+R2:R10) - 1"
  },
  {
    question: "What is the purpose of `TRIMMEAN` in corporate performance evaluation?",
    shortAnswer: "Computes the mean after discarding a specified percentage of data from the top and bottom tails (e.g. Olympic scoring).",
    explanation: "TRIMMEAN(array, 0.2) removes the highest 10% and lowest 10% to eliminate outlier distortion.",
    hint: "TRIMMEAN trims top and bottom tail extremes.",
    level: "advanced",
    codeExample: "=TRIMMEAN(Scores, 0.2)"
  },
  {
    question: "How do you sum the top 5 highest sales values in a single dynamic formula?",
    shortAnswer: "`=SUM(LARGE(SalesRange, {1, 2, 3, 4, 5}))` or `=SUM(TAKE(SORT(SalesRange, , -1), 5))`.",
    explanation: "Passes an array constant to LARGE and sums the resulting top 5 values.",
    hint: "SUM of LARGE with array {1,2,3,4,5}.",
    level: "moderate",
    codeExample: "=SUM(LARGE(tbl_Sales[Revenue], {1,2,3,4,5}))"
  },
  {
    question: "What does `VAR.S` calculate and what are its measurement units?",
    shortAnswer: "Calculates sample variance (s²), measuring data dispersion in squared units of the original metric.",
    explanation: "Taking the square root of VAR.S yields STDEV.S, returning units to the original scale.",
    hint: "VAR.S is variance in squared units; STDEV is its square root.",
    level: "moderate",
    codeExample: "=VAR.S(C2:C100)"
  },
  {
    question: "How do you dynamically calculate the percentile of a test score without sorting the data?",
    shortAnswer: "Use `=PERCENTILE.INC(ScoresRange, 0.90)` for the 90th percentile value.",
    explanation: "Calculates interpolated percentile cutoffs directly across unsorted arrays.",
    hint: "=PERCENTILE.INC(Range, k) where k is 0 to 1.",
    level: "basic",
    codeExample: "=PERCENTILE.INC(tbl_Scores[Marks], 0.90)"
  },
  {
    question: "Why does `MODE.SNGL` return `#N/A` error?",
    shortAnswer: "Because no duplicate values exist in the dataset (all numbers appear exactly once).",
    explanation: "When there is no repeating value, Excel correctly indicates no mode exists with #N/A.",
    hint: "All numbers in the range are unique.",
    level: "basic",
    codeExample: "Fix: Wrap in IFERROR(=MODE.SNGL(...), \"No Mode\")"
  },
  {
    question: "How do you calculate the coefficient of variation (CV) in Excel?",
    shortAnswer: "`=STDEV.S(DataRange) / AVERAGE(DataRange)`.",
    explanation: "Measures relative risk/variability normalized against the dataset's scale, allowing comparison across disparate currencies.",
    hint: "CV = Standard Deviation / Mean.",
    level: "advanced",
    codeExample: "=STDEV.S(C2:C50) / AVERAGE(C2:C50)"
  },
  {
    question: "How do you calculate the covariance between two regional revenue streams?",
    shortAnswer: "Use `=COVARIANCE.S(Array1, Array2)` for sample data.",
    explanation: "Measures joint variability direction; dividing covariance by the product of standard deviations gives CORREL.",
    hint: "=COVARIANCE.S(Array1, Array2)",
    level: "advanced",
    codeExample: "=COVARIANCE.S(tbl_BKP[Rev], tbl_SHY[Rev])"
  },
  {
    question: "What is the difference between descriptive statistics and inferential statistics in Excel?",
    shortAnswer: "Descriptive statistics summarize observed sample metrics (Mean, Median, STDEV.S); inferential statistics draw conclusions and hypotheses about entire populations.",
    explanation: "Excel Data Analysis ToolPak provides both descriptive summaries and inferential t-tests/ANOVA.",
    hint: "Descriptive = summarize sample; Inferential = conclude about population.",
    level: "basic",
    codeExample: "Descriptive: Mean/Median | Inferential: t-Test/ANOVA"
  },
  {
    question: "What is the ultimate golden rule of statistical modeling in Excel?",
    shortAnswer: "Always check data distribution shape, clean anomalies with IQR/Z-scores, choose robust central metrics (Median vs Mean), and use appropriate sample formulas (STDEV.S).",
    explanation: "Statistical discipline guarantees accurate, unbiased business intelligence and executive decision support.",
    hint: "Clean data, verify distribution shape, and use unbiased sample estimators.",
    level: "basic",
    codeExample: "Statistical Rigor = Distribution Check + Outlier Cleaning + Robust Estimators"
  }
];

export default questions;
