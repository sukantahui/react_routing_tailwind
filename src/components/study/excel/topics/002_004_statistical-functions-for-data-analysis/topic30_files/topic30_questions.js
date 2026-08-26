const questions = [
  {
    question: "What does FORECAST.LINEAR do?",
    shortAnswer: "Predicts a future y‑value using linear regression (least squares).",
    explanation: "It fits a straight line to existing data and returns the predicted y for a given x.",
    level: "basic",
    codeExample: "=FORECAST.LINEAR(12, B2:B10, A2:A10)"
  },
  {
    question: "What is the difference between FORECAST.LINEAR and the older FORECAST function?",
    shortAnswer: "They are identical; FORECAST.LINEAR was introduced to be explicit about the linear method.",
    explanation: "The old FORECAST still works, but FORECAST.LINEAR is recommended for clarity.",
    level: "basic",
    codeExample: "=FORECAST(...) = FORECAST.LINEAR(...)"
  },
  {
    question: "What happens if the known data is not linear?",
    shortAnswer: "The forecast will still be a straight line and may be inaccurate.",
    explanation: "Always check linearity with a scatter plot before relying on FORECAST.LINEAR.",
    level: "intermediate",
    codeExample: "Consider using FORECAST.ETS for seasonal data."
  },
  {
    question: "Can FORECAST.LINEAR be used with dates?",
    shortAnswer: "Yes, dates are serial numbers; you can predict a y-value for a future date.",
    explanation: "The function will work correctly, and you can format the result as needed.",
    level: "intermediate",
    codeExample: "=FORECAST.LINEAR(DATE(2025,12,31), sales_range, date_range)"
  },
  {
    question: "What does FORECAST.LINEAR return if known_x's has zero variance (all same value)?",
    shortAnswer: "#DIV/0! because slope cannot be calculated.",
    explanation: "You cannot fit a line when the independent variable is constant.",
    level: "basic",
    codeExample: "The function will error."
  },
  {
    question: "Is FORECAST.LINEAR the same as using SLOPE and INTERCEPT manually?",
    shortAnswer: "Yes, FORECAST.LINEAR(x, y, x) = INTERCEPT(y,x) + SLOPE(y,x)*x.",
    explanation: "It's a convenient wrapper.",
    level: "intermediate",
    codeExample: "=INTERCEPT(B2:B10, A2:A10) + SLOPE(B2:B10, A2:A10)*12"
  },
  {
    question: "What is the maximum number of arguments FORECAST.LINEAR accepts?",
    shortAnswer: "Three: x, known_y's, known_x's.",
    explanation: "Exactly three arguments.",
    level: "basic",
    codeExample: "Always three arguments."
  },
  {
    question: "How does FORECAST.LINEAR treat text or blanks?",
    shortAnswer: "It ignores rows where either known_y's or known_x's contain non‑numeric values (pairwise deletion).",
    explanation: "Text and blanks are skipped; only complete pairs are used.",
    level: "basic",
    codeExample: "Safe to use with headers."
  },
  {
    question: "What does extrapolation mean in forecasting?",
    shortAnswer: "Predicting a y-value for an x outside the range of known_x's.",
    explanation: "Extrapolation is risky because the linear trend may not continue outside the observed data.",
    level: "intermediate",
    codeExample: "Forecasting sales for a spend of 100 when known data is only 0-50."
  },
  {
    question: "Can FORECAST.LINEAR be used for time series with more than one predictor?",
    shortAnswer: "No, it only handles one independent variable (simple linear regression). Use LINEST for multiple regression.",
    explanation: "Multiple regression requires array formulas or the Data Analysis Toolpak.",
    level: "advanced",
    codeExample: "Multiple predictors: use LINEST."
  },
  {
    question: "Why might the forecast for a date far in the future be unreliable?",
    shortAnswer: "Because the linear trend may change, and uncertainty grows with distance.",
    explanation: "Small changes in slope produce large differences in long‑term forecasts.",
    level: "intermediate",
    codeExample: "Use with caution."
  },
  {
    question: "How can you display the linear forecast equation on a chart?",
    shortAnswer: "Insert a scatter plot, add a trendline, and check 'Display Equation on chart'.",
    explanation: "The equation shows slope and intercept, same as used by FORECAST.LINEAR.",
    level: "basic",
    codeExample: "Right‑click trendline → Format Trendline → Display Equation."
  },
  {
    question: "What is the difference between FORECAST.LINEAR and TREND?",
    shortAnswer: "FORECAST.LINEAR predicts a single y for a given x; TREND can predict multiple y's for multiple x's simultaneously.",
    explanation: "TREND is an array function that returns predicted values for a range of x's.",
    level: "advanced",
    codeExample: "=TREND(known_y's, known_x's, new_x's)"
  },
  {
    question: "Can FORECAST.LINEAR be used to predict the x given a y (inverse prediction)?",
    shortAnswer: "Not directly. You would need to reverse the roles of x and y or use GOAL SEEK.",
    explanation: "For inverse prediction, swap the arrays in FORECAST.LINEAR, but that's not symmetric.",
    level: "expert",
    codeExample: "=FORECAST.LINEAR(y_target, known_x's, known_y's) gives x, but assumes linearity in the other direction."
  },
  {
    question: "What does FORECAST.LINEAR return if there are fewer than two valid data points?",
    shortAnswer: "#N/A (need at least two points to define a line).",
    explanation: "A line requires at least two distinct points.",
    level: "basic",
    codeExample: "Check COUNT of valid pairs."
  },
  {
    question: "How to forecast multiple future periods using FORECAST.LINEAR?",
    shortAnswer: "Enter the x values in a column and copy the FORECAST.LINEAR formula down, using relative references.",
    explanation: "Each cell will predict for its corresponding x.",
    level: "intermediate",
    codeExample: "=FORECAST.LINEAR(A10, $B$2:$B$8, $A$2:$A$8) copied down."
  },
  {
    question: "What is the statistical assumption behind FORECAST.LINEAR?",
    shortAnswer: "That the relationship is linear, errors are normally distributed, homoscedastic, and independent.",
    explanation: "Violating these assumptions may affect forecast quality.",
    level: "expert",
    codeExample: "Check residuals for patterns."
  },
  {
    question: "Is FORECAST.LINEAR a volatile function?",
    shortAnswer: "No, it recalculates only when input data changes.",
    explanation: "Non‑volatile, safe for large workbooks.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "Can FORECAST.LINEAR be used with array constants?",
    shortAnswer: "Yes, e.g., =FORECAST.LINEAR(5, {10,20,30}, {1,2,3}).",
    explanation: "Array constants can be used as known arrays.",
    level: "intermediate",
    codeExample: "=FORECAST.LINEAR(4, {2,4,6}, {1,2,3}) → 8"
  },
  {
    question: "What is the output of =FORECAST.LINEAR(3, {2,3,5}, {1,2,4})?",
    shortAnswer: "It predicts the y when x=3 based on line through (1,2), (2,3), (4,5). Calculation: slope≈1, intercept≈1, predicted=4.",
    explanation: "The line roughly y = x+1, so at x=3, y=4.",
    level: "advanced",
    codeExample: "Manual check."
  },
  {
    question: "How to handle outliers that affect the forecast?",
    shortAnswer: "Identify and potentially remove them, or use a robust regression method. Outliers can skew the regression line significantly.",
    explanation: "Check scatter plot for influential points.",
    level: "intermediate",
    codeExample: "Consider if the outlier is a data entry error."
  },
  {
    question: "Can FORECAST.LINEAR be used with a 3D reference across sheets?",
    shortAnswer: "Not directly; you would need to combine ranges using VSTACK in 365 or use multiple formulas.",
    explanation: "Example: =FORECAST.LINEAR(x, VSTACK(Sheet1!B:B, Sheet2!B:B), VSTACK(Sheet1!A:A, Sheet2!A:A)).",
    level: "expert",
    codeExample: "Only in 365."
  },
  {
    question: "What is the difference between FORECAST.LINEAR and FORECAST.ETS?",
    shortAnswer: "FORECAST.LINEAR assumes a linear trend; FORECAST.ETS can handle seasonality and non‑linear trends (exponential smoothing).",
    explanation: "Use ETS for seasonal data like monthly sales with peaks.",
    level: "advanced",
    codeExample: "FORECAST.ETS is more advanced."
  },
  {
    question: "How does FORECAST.LINEAR treat paired missing data?",
    shortAnswer: "It uses pairwise deletion: rows where either y or x is non‑numeric are ignored.",
    explanation: "Only complete pairs contribute to the regression.",
    level: "basic",
    codeExample: "Ensure you have enough complete pairs."
  },
  {
    question: "What is the coefficient of determination (R²) for a forecast?",
    shortAnswer: "R² = CORREL(known_y's, known_x's)^2; it measures how well the line fits the data.",
    explanation: "High R² indicates that most variation in y is explained by x.",
    level: "intermediate",
    codeExample: "=RSQ(known_y's, known_x's) gives R²."
  },
  {
    question: "Can FORECAST.LINEAR be used in conjunction with scenario analysis?",
    shortAnswer: "Yes, create different x inputs (e.g., optimistic, pessimistic) and see how the forecast changes.",
    explanation: "Use a data table to perform sensitivity analysis.",
    level: "advanced",
    codeExample: "=FORECAST.LINEAR(B2, sales, ads) with B2 varying."
  },
  {
    question: "What happens if known_x's and known_y's have different lengths?",
    shortAnswer: "Excel uses only the overlapping part after removing non‑numeric cells, but if the lengths differ substantially you may get #N/A.",
    explanation: "Better to use ranges of equal size before filtering.",
    level: "intermediate",
    codeExample: "Ensure same number of rows."
  },
  {
    question: "How to forecast values when the independent variable is time?",
    shortAnswer: "Use dates or sequential numbers as x. FORECAST.LINEAR will treat time as a numeric series.",
    explanation: "Works well for regular time intervals without seasonality.",
    level: "basic",
    codeExample: "=FORECAST.LINEAR(7, sales, {1,2,3,4,5,6})"
  },
  {
    question: "Can FORECAST.LINEAR be used to predict beyond the maximum x in the data?",
    shortAnswer: "Yes, that's extrapolation, but it's not recommended if the new x is far outside the range.",
    explanation: "Extrapolation risks large errors.",
    level: "intermediate",
    codeExample: "Use with caution."
  },
  {
    question: "What is the difference between FORECAST.LINEAR and GROWTH?",
    shortAnswer: "FORECAST.LINEAR assumes linear relationship; GROWTH assumes exponential relationship.",
    explanation: "GROWTH fits a curve y = b * m^x.",
    level: "advanced",
    codeExample: "Use GROWTH for exponential trends."
  }
];

export default questions;