const questions = [
  {
    id: 1,
    question: "When computing z-scores across a 2D dataset matrix with `scipy.stats.zscore(matrix, axis=0)`, what does `axis=0` specify?",
    options: [
      "Compute z-scores across columns (each feature standardized independently)",
      "Compute z-scores across rows",
      "Compute a single z-score for the entire table",
      "Sort the table in ascending order"
    ],
    correctAnswer: 0,
    explanation: "`axis=0` calculates the mean and standard deviation down each column, ensuring that each feature is normalized independently on its own scale."
  },
  {
    id: 2,
    question: "Why is outlier removal via Z-Score filtering crucial before training a Linear Regression model?",
    options: [
      "Because Python code will not compile with outliers",
      "Because extreme outliers exert disproportionate leverage on the Mean Squared Error loss function, distorting slope and intercept coefficients",
      "Because outliers increase hard drive storage",
      "Because Linear Regression only works with numbers between 0 and 1"
    ],
    correctAnswer: 1,
    explanation: "OLS minimizes squared errors $(y - \hat{y})^2$. Extreme outliers produce massive squared penalties, pivoting regression planes away from the true data trend."
  },
  {
    id: 3,
    question: "What is the standard conservative threshold often used with Z-Scores for detecting anomalies under the 3-sigma empirical rule?",
    options: [
      "|Z| > 0.5",
      "|Z| > 1.0",
      "|Z| > 3.0",
      "|Z| > 10.0"
    ],
    correctAnswer: 2,
    explanation: "Under the empirical rule, 99.73% of normal data falls within ±3 standard deviations. Values exceeding $|Z| > 3.0$ are statistically anomalous."
  }
];

export default questions;
