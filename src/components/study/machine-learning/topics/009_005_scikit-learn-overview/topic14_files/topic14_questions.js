const topic14Questions = [
  {
    id: 1,
    question: "What physical unit does Root Mean Squared Error (RMSE) have relative to target variable y?",
    options: [
      "Dimensionless ratio in [0, 1]",
      "The squared units of y (e.g. dollars squared)",
      "The exact same physical unit as y (e.g. dollars or marks)",
      "Logarithmic decibels"
    ],
    correctAnswer: 2,
    explanation: "Taking the square root of MSE restores the error metric back to the original physical scale of the target variable $y$, making it directly interpretable while retaining heavy quadratic penalty for large deviations."
  },
  {
    id: 2,
    question: "What does a negative R-squared ($R^2 < 0$) score on a test dataset indicate?",
    options: [
      "The model has achieved 100% negative correlation with the features",
      "The model performs worse than a naive baseline that simply predicts the constant mean of the target variable",
      "A bug in Python's floating point arithmetic",
      "The dataset contains negative numbers"
    ],
    correctAnswer: 1,
    explanation: "Because $R^2 = 1 - (SS_{res} / SS_{tot})$, if the residual sum of squares exceeds the total variance from the mean, $R^2$ becomes negative, meaning the model is less accurate than a horizontal line through the dataset mean."
  },
  {
    id: 3,
    question: "Why is Mean Absolute Error (MAE) considered more robust to extreme dataset outliers than Mean Squared Error (MSE)?",
    options: [
      "Because MAE penalizes residuals linearly ($|e_i|$), whereas MSE squares errors ($e_i^2$), causing extreme outliers to dominate the loss",
      "Because MAE automatically drops the top 5% highest errors",
      "Because MAE is an unsupervised clustering algorithm",
      "Because MAE relies on gradient descent"
    ],
    correctAnswer: 0,
    explanation: "MSE squares the residuals, meaning an error of 100 contributes $10,000$ to the sum, whereas MAE contributes only $100$. MAE's linear penalty prevents single outliers from exploding the total metric."
  },
  {
    id: 4,
    question: "If a regression model achieves an $R^2$ of 0.85, what does this mathematically represent?",
    options: [
      "85% of test samples were predicted with 0 error",
      "85% of the total variance in the target variable is explained by the regression model",
      "The model has an 85% probability of passing production tests",
      "The average prediction error is 15%"
    ],
    correctAnswer: 1,
    explanation: "The coefficient of determination $R^2$ quantifies the proportion of the total target variance ($SS_{tot}$) that is successfully captured and explained by the regression model ($1 - SS_{res}/SS_{tot}$)."
  }
];

export default topic14Questions;
