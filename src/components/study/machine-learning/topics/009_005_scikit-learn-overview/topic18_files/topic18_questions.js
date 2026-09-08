const topic18Questions = [
  {
    id: 1,
    question: "Why does Scikit-learn prefix regression loss scoring metrics with 'neg_' (e.g. `scoring='neg_mean_squared_error'`) during cross-validation?",
    options: [
      "Because Scikit-learn algorithms only optimize negative numbers",
      "Because Scikit-learn enforces a unified convention where higher scores are always considered better for model selection and grid search optimization",
      "To prevent division by zero in gradient descent",
      "Because mean squared error is always negative in Python"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn design rules dictate that higher score values represent better performance. By negating loss metrics like MSE or RMSE, minimizing positive loss becomes equivalent to maximizing negative loss."
  },
  {
    id: 2,
    question: "In residual analysis of a regression model, what visual pattern on a residual plot ($y - \\hat{y}$ vs $\\hat{y}$) indicates a healthy, well-fitted linear model?",
    options: [
      "A clear parabolic U-shaped curve",
      "A random, symmetric cloud of points scattered evenly around the zero horizontal line without discernible patterns or funneling",
      "All residuals lined up along a 45-degree diagonal",
      "Residuals strictly positive across all predictions"
    ],
    correctAnswer: 1,
    explanation: "A well-specified regression model generates residuals that are randomly distributed around zero with constant variance (homoscedasticity) and no systematic patterns."
  },
  {
    id: 3,
    question: "Why is `drop='first'` commonly configured in `OneHotEncoder` when training a linear regression model on multi-category features?",
    options: [
      "To drop 50% of the training dataset rows to speed up fitting",
      "To eliminate linear dependency among dummy columns, avoiding the Dummy Variable Trap (multicollinearity)",
      "Because LinearRegression does not accept more than 1 column",
      "To force all coefficients to equal 1.0"
    ],
    correctAnswer: 1,
    explanation: "Since the sum of all one-hot columns equals 1, keeping all K columns creates exact multicollinearity with the intercept term. Dropping the first column removes this linear dependency."
  },
  {
    id: 4,
    question: "What is the primary difference between Ridge regression and Ordinary Least Squares (OLS) Linear Regression?",
    options: [
      "Ridge regression adds an L2 regularization penalty ($\alpha \sum w_i^2$) to shrink weights and prevent overfitting on correlated features",
      "Ridge regression outputs categorical classifications",
      "OLS requires GPU acceleration while Ridge runs on CPU",
      "Ridge regression automatically drops missing values"
    ],
    correctAnswer: 0,
    explanation: "Ridge regression introduces an L2 penalty on coefficient magnitudes, keeping weights small and stable even when input features are highly correlated or noisy."
  }
];

export default topic18Questions;
