const topic20Questions = [
  {
    id: 1,
    question: "When applying `StandardScaler` to a train/test partitioned dataset, what is the correct method call sequence?",
    options: [
      "`scaler.fit_transform(X_train)` followed by `scaler.transform(X_test)`",
      "`scaler.fit_transform(X_train)` followed by `scaler.fit_transform(X_test)`",
      "`scaler.fit(X_test)` followed by `scaler.transform(X_train)`",
      "`scaler.fit_transform(X)` before calling `train_test_split()`"
    ],
    correctAnswer: 0,
    explanation: "To strictly prevent data leakage, `.fit_transform()` is called only on `X_train` so that the mean and standard deviation of the training distribution are learned. Then, `X_test` is transformed using `scaler.transform(X_test)` without re-estimating parameters."
  },
  {
    id: 2,
    question: "In `GridSearchCV`, what does setting `n_jobs=-1` achieve?",
    options: [
      "It suppresses all console warning messages",
      "It utilizes all available CPU cores in parallel to accelerate cross-validation search",
      "It disables cross-validation to save RAM",
      "It limits search to a single thread"
    ],
    correctAnswer: 1,
    explanation: "`n_jobs=-1` instructs Scikit-learn (via Joblib) to spawn worker processes across all available logical CPU processors, parallelizing fold evaluation."
  },
  {
    id: 3,
    question: "When comparing two classifiers where Model A achieves 92.0% ± 1.0% and Model B achieves 93.5% ± 9.5%, which model is generally preferred for stable production deployment?",
    options: [
      "Model B, because its maximum possible score is higher",
      "Model A, because its performance is consistent and reliable across folds with very low variance (±1.0%)",
      "Neither, as both are below 95%",
      "Whichever model uses fewer lines of code"
    ],
    correctAnswer: 1,
    explanation: "Model A offers high stability and consistency. A large standard deviation in Model B (±9.5%) indicates high sensitivity to data partitions and high risk of catastrophic failure on certain production cohorts."
  },
  {
    id: 4,
    question: "Which Scikit-learn function is used to automatically search over specified parameter values for an estimator using cross-validation?",
    options: [
      "sklearn.model_selection.GridSearchCV",
      "sklearn.model_selection.ParameterSearcher",
      "sklearn.pipeline.HyperOptimizer",
      "sklearn.metrics.cross_search"
    ],
    correctAnswer: 0,
    explanation: "`GridSearchCV` performs an exhaustive search over a specified grid of parameter values, evaluating every combination across cross-validation folds."
  }
];

export default topic20Questions;
