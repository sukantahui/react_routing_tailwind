const topic21Questions = [
  {
    id: 1,
    question: "Which of the following attributes is an estimated learned parameter (as indicated by the Scikit-learn trailing underscore convention)?",
    options: [
      "`model.fit_intercept`",
      "`model.coef_`",
      "`model.max_depth`",
      "`model.random_state`"
    ],
    correctAnswer: 1,
    explanation: "`model.coef_` has a trailing underscore, marking it as a learned parameter calculated during `.fit()`. The others are hyperparameters passed by the user during object instantiation."
  },
  {
    id: 2,
    question: "Why does calling `scaler.fit_transform(X_test)` on a testing dataset constitute a serious methodological error?",
    options: [
      "Because test data contains missing values",
      "Because it causes Data Leakage by re-estimating mean and variance from the test set rather than evaluating the model on true out-of-sample data",
      "Because Scikit-learn does not allow two calls to fit_transform() in the same script",
      "Because test sets must always remain unscaled"
    ],
    correctAnswer: 1,
    explanation: "Re-fitting the scaler on test data recalculates the mean and scale based on test observations, contaminating the evaluation with test set statistics and causing data leakage."
  },
  {
    id: 3,
    question: "When evaluating an email spam filter where flagging an important work email as Spam (False Positive) is unacceptable, which metric must be prioritized?",
    options: [
      "Recall",
      "Precision",
      "Mean Squared Error",
      "Silhouette Score"
    ],
    correctAnswer: 1,
    explanation: "Precision is $TP / (TP + FP)$. Maximizing precision minimizes False Positives ($FP$), ensuring legitimate non-spam emails are not mistakenly routed to the spam folder."
  },
  {
    id: 4,
    question: "What does an $R^2$ score of -0.25 mean for a regression model?",
    options: [
      "The model has a 25% negative correlation",
      "The model makes worse predictions than a simple naive baseline predicting the dataset mean",
      "The model's error is exactly 25%",
      "The target variable values are all negative"
    ],
    correctAnswer: 1,
    explanation: "A negative $R^2$ means that the model's Residual Sum of Squares ($SS_{res}$) is greater than the total variance ($SS_{tot}$), performing worse than a horizontal mean line."
  }
];

export default topic21Questions;
