const questions = [
  {
    "question": "What does LINEST calculate in Excel?",
    "options": [
      "Ordinary Least Squares multiple regression statistics",
      "Moving averages",
      "Rank correlation",
      "Linear interpolation"
    ],
    "correctAnswer": 0,
    "explanation": "LINEST calculates OLS regression statistics."
  },
  {
    "question": "When stats=TRUE, what matrix dimensions does LINEST return for 1 X variable?",
    "options": [
      "5 rows by 2 columns",
      "2x2",
      "1x5",
      "10x1"
    ],
    "correctAnswer": 0,
    "explanation": "Returns a 5-row by 2-column statistical ANOVA matrix."
  },
  {
    "question": "Which cell in LINEST output contains R-squared?",
    "options": [
      "Row 3, Column 1",
      "Row 1, Column 1",
      "Row 5, Column 2",
      "Row 2, Column 1"
    ],
    "correctAnswer": 0,
    "explanation": "Row 3, Col 1 displays R^2."
  },
  {
    "question": "Which cell in LINEST output contains the F-statistic?",
    "options": [
      "Row 4, Column 1",
      "Row 1, Column 2",
      "Row 3, Column 1",
      "Row 5, Column 1"
    ],
    "correctAnswer": 0,
    "explanation": "Row 4, Col 1 contains the F-statistic."
  },
  {
    "question": "What does Row 4, Column 2 represent?",
    "options": [
      "Degrees of Freedom (df)",
      "P-value",
      "Observations",
      "Correlation"
    ],
    "correctAnswer": 0,
    "explanation": "Row 4, Col 2 contains residual degrees of freedom."
  },
  {
    "question": "How are slope coefficients ordered in multiple regression LINEST output?",
    "options": [
      "Reverse order [m_k, ..., m_1, b]",
      "Forward order [m_1, ..., m_k, b]",
      "Sorted by value",
      "Alphabetical"
    ],
    "correctAnswer": 0,
    "explanation": "Coefficients appear right-to-left in reverse order."
  },
  {
    "question": "Which function fits exponential models (y = b * m^x)?",
    "options": [
      "LOGEST()",
      "EXPONEST()",
      "GROWTH()",
      "LOGREG()"
    ],
    "correctAnswer": 0,
    "explanation": "LOGEST fits exponential curves via log transform."
  },
  {
    "question": "What does const = FALSE enforce in LINEST?",
    "options": [
      "Forces y-intercept b = 0",
      "Forces slope = 1",
      "Disables stats",
      "Normalizes x"
    ],
    "correctAnswer": 0,
    "explanation": "Forces the regression through the origin (b = 0)."
  },
  {
    "question": "What does Row 5, Column 1 contain?",
    "options": [
      "Regression Sum of Squares (SS_reg)",
      "Residual Sum of Squares",
      "Variance",
      "Covariance"
    ],
    "correctAnswer": 0,
    "explanation": "Row 5, Col 1 contains SS_reg."
  },
  {
    "question": "How does LINEST return its multi-cell matrix in Excel 365?",
    "options": [
      "Spills automatically as dynamic array",
      "Requires CSE",
      "Returns only 1 cell",
      "Requires VBA"
    ],
    "correctAnswer": 0,
    "explanation": "LINEST spills automatically in Excel 365."
  },
  {
    "question": "How do you extract R-squared from spilled LINEST in A10#?",
    "options": [
      "=INDEX(A10#, 3, 1)",
      "=A10#R2",
      "=CHOOSE(A10#, 3)",
      "=VLOOKUP()"
    ],
    "correctAnswer": 0,
    "explanation": "=INDEX(A10#, 3, 1) extracts Row 3, Col 1 (R^2)."
  },
  {
    "question": "How do you calculate the regression model P-value?",
    "options": [
      "=F.DIST.RT(F_stat, df1, df2)",
      "=PVALUE()",
      "=T.DIST()",
      "=CHISQ.TEST()"
    ],
    "correctAnswer": 0,
    "explanation": "F.DIST.RT evaluates the F-statistic significance."
  },
  {
    "question": "What happens if independent variables are collinear?",
    "options": [
      "LINEST drops redundant columns and sets slope to 0",
      "Crashes",
      "#DIV/0!",
      "Negative R^2"
    ],
    "correctAnswer": 0,
    "explanation": "Collinear predictors are zeroed out."
  },
  {
    "question": "What does Row 2 contain?",
    "options": [
      "Standard errors for each coefficient",
      "P-values",
      "Residuals",
      "Medians"
    ],
    "correctAnswer": 0,
    "explanation": "Row 2 contains standard errors."
  },
  {
    "question": "How do you compute t-statistic for a slope?",
    "options": [
      "=Slope / Standard_Error",
      "=Slope * SE",
      "=R2 / df",
      "=F / 2"
    ],
    "correctAnswer": 0,
    "explanation": "t = coefficient / standard error."
  },
  {
    "question": "What formula extracts intercept for single X regression?",
    "options": [
      "=INDEX(A10#, 1, 2)",
      "=INDEX(A10#, 1, 1)",
      "=INDEX(A10#, 2, 1)",
      "=INDEX(A10#, 5, 2)"
    ],
    "correctAnswer": 0,
    "explanation": "Row 1, Col 2 contains intercept b."
  },
  {
    "question": "How does LOGEST differ from LINEST mathematically?",
    "options": [
      "LOGEST models exponential growth on ln(y)",
      "Binary only",
      "Log of headers",
      "1 variable only"
    ],
    "correctAnswer": 0,
    "explanation": "LOGEST fits exponential curves via log linearization."
  },
  {
    "question": "What is the relationship between SS_tot, SS_reg, and SS_resid?",
    "options": [
      "SS_tot = SS_reg + SS_resid",
      "SS_tot = SS_reg * SS_resid",
      "SS_tot = SS_reg / SS_resid",
      "SS_tot = SS_reg - SS_resid"
    ],
    "correctAnswer": 0,
    "explanation": "Total SS equals Explained SS plus Residual SS."
  },
  {
    "question": "What does R-squared = 0.85 indicate?",
    "options": [
      "85% of variance in Y is explained by predictors",
      "85% error",
      "Slope is 0.85",
      "85 rows"
    ],
    "correctAnswer": 0,
    "explanation": "R^2 indicates explained variance proportion."
  },
  {
    "question": "Which function directly computes exponential trendline predictions?",
    "options": [
      "GROWTH()",
      "TREND()",
      "LINEST()",
      "FORECAST()"
    ],
    "correctAnswer": 0,
    "explanation": "GROWTH calculates exponential projections."
  },
  {
    "question": "Which function computes linear trendline predictions directly?",
    "options": [
      "TREND()",
      "GROWTH()",
      "SLOPE()",
      "INTERCEPT()"
    ],
    "correctAnswer": 0,
    "explanation": "TREND evaluates linear projections directly."
  },
  {
    "question": "What error occurs if Y values are <= 0 in LOGEST?",
    "options": [
      "#NUM!",
      "#VALUE!",
      "#N/A",
      "#REF!"
    ],
    "correctAnswer": 0,
    "explanation": "Non-positive Y values cause #NUM! in LOGEST."
  },
  {
    "question": "What is the maximum number of X variables LINEST supports?",
    "options": [
      "Up to 64 independent variables",
      "2",
      "16",
      "Unlimited"
    ],
    "correctAnswer": 0,
    "explanation": "LINEST handles up to 64 predictors."
  },
  {
    "question": "How to test slope significance at alpha = 0.05?",
    "options": [
      "Compute 2-tailed p-value with T.DIST and check < 0.05",
      "Check slope > 0",
      "Check R^2 > 0.5",
      "Check F > 1"
    ],
    "correctAnswer": 0,
    "explanation": "Two-tailed t-test confirms statistical significance."
  },
  {
    "question": "How to run polynomial regression in LINEST?",
    "options": [
      "=LINEST(y, x^{1, 2})",
      "=LINEST(y, x * 2)",
      "=LINEST(y, SQRT(x))",
      "=LINEST(y, POWER(x))"
    ],
    "correctAnswer": 0,
    "explanation": "Array exponent x^{1,2} fits quadratic polynomials."
  },
  {
    "question": "What does standard error of estimate (se_y) measure?",
    "options": [
      "Standard deviation of residuals around regression line",
      "CPU error",
      "Header error",
      "Mean"
    ],
    "correctAnswer": 0,
    "explanation": "se_y measures residual dispersion."
  },
  {
    "question": "Why is LINEST superior to SLOPE and INTERCEPT?",
    "options": [
      "Provides multi-variable support and full ANOVA diagnostics",
      "Rounds faster",
      "SLOPE is deprecated",
      "No negatives"
    ],
    "correctAnswer": 0,
    "explanation": "LINEST provides multi-variable models with full inferential statistics."
  },
  {
    "question": "What is the relation between F and t in single-variable regression?",
    "options": [
      "F = t^2",
      "F = t / 2",
      "F = 2*t",
      "F = SQRT(t)"
    ],
    "correctAnswer": 0,
    "explanation": "In simple linear regression, F = t^2."
  },
  {
    "question": "How to extract slope coefficients vertically in Excel 365?",
    "options": [
      "=TOCOL(CHOOSEROWS(LINEST(y, x), 1))",
      "=TRANSPOSE()",
      "=FILTER()",
      "=TAKE()"
    ],
    "correctAnswer": 0,
    "explanation": "CHOOSEROWS and TOCOL extract coefficients vertically."
  },
  {
    "question": "Why check SS_resid (Row 5, Col 2)?",
    "options": [
      "Lower SS_resid indicates closer descriptive fit",
      "Higher is better",
      "Determines tax",
      "Must equal 100"
    ],
    "correctAnswer": 0,
    "explanation": "Lower residual sum of squares indicates better fit."
  }
];

export default questions;
