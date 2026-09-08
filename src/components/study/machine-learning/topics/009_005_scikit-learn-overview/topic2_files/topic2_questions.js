const questions = [
  {
    id: 1,
    question: "What dimensionality shape is strictly required for the feature matrix `X` in Scikit-learn?",
    options: [
      "1-Dimensional (n_samples,)",
      "2-Dimensional (n_samples, n_features)",
      "4-Dimensional (batch, height, width, channels)",
      "A scalar single number"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn strictly requires feature matrices `X` to be 2D arrays of shape `(n_samples, n_features)`."
  },
  {
    id: 2,
    question: "Why should you NEVER call `scaler.fit()` or `scaler.fit_transform()` on test data `X_test`?",
    options: [
      "Because it causes Data Leakage by letting test set distributions bias the model parameters",
      "Because Python will crash",
      "Because test data contains string values only",
      "Because fit() cannot run twice"
    ],
    correctAnswer: 0,
    explanation: "Re-fitting on test data causes Data Leakage. Test data must only be transformed using the parameters (mean/std) estimated from training data."
  },
  {
    id: 3,
    question: "In Classification models, what is the difference between `.predict(X)` and `.predict_proba(X)`?",
    options: [
      "`.predict(X)` returns discrete class labels (e.g. 0 or 1), while `.predict_proba(X)` returns class probability distributions (e.g. [0.2, 0.8])",
      "`.predict_proba(X)` only works on text files",
      "`.predict(X)` runs 10 times slower",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "`.predict()` outputs the hard argmax class label, while `.predict_proba()` outputs the continuous soft probability distribution per class."
  },
  {
    id: 4,
    question: "What metric does `model.score(X, y)` compute by default for a `LinearRegression` estimator?",
    options: [
      "Classification Accuracy",
      "R² (Coefficient of Determination)",
      "Log Loss",
      "F1 Score"
    ],
    correctAnswer: 1,
    explanation: "For regression models in Scikit-learn, `.score(X, y)` calculates the $R^2$ coefficient of determination (while for classifiers it returns accuracy)."
  }
];

export default questions;
