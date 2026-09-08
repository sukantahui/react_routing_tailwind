const topic15Questions = [
  {
    id: 1,
    question: "What does `cross_val_score(estimator, X, y, cv=5)` return?",
    options: [
      "The best fitted estimator instance after 5 iterations",
      "A 1-dimensional NumPy array containing the 5 evaluation scores (one per test fold)",
      "A single float scalar representing the average accuracy",
      "A dictionary containing execution logs"
    ],
    correctAnswer: 1,
    explanation: "`cross_val_score()` returns an array of float scores representing the performance metric calculated on each of the K validation folds."
  },
  {
    id: 2,
    question: "How does `cross_validate()` differ from `cross_val_score()`?",
    options: [
      "cross_validate() supports evaluating multiple scoring metrics simultaneously and returns fit/score timing metrics",
      "cross_validate() only works for unsupervised clustering",
      "cross_validate() trains deep neural networks on GPUs",
      "cross_val_score() does not support StratifiedKFold"
    ],
    correctAnswer: 0,
    explanation: "`cross_validate` provides a richer dictionary output containing `fit_time`, `score_time`, `test_score` for multiple metrics, and optionally `train_score`."
  },
  {
    id: 3,
    question: "Why does Scikit-learn's `cross_val_score` automatically use `StratifiedKFold` when passed a classification estimator?",
    options: [
      "To speed up matrix multiplication",
      "To ensure that each of the K folds contains approximately the same percentage of samples of each target class as the complete dataset",
      "To normalize features before training",
      "To reduce tree depth"
    ],
    correctAnswer: 1,
    explanation: "For classifiers, maintaining representative class proportions across each test fold is essential to prevent class starvation in imbalanced datasets."
  },
  {
    id: 4,
    question: "What is the key advantage of using `cross_val_predict()`?",
    options: [
      "It makes test predictions twice as fast",
      "It generates clean, out-of-fold predictions for every sample in the dataset, which can be passed to confusion_matrix() or used in stacking ensembles",
      "It trains on 100% of the data without holding any folds out",
      "It exports models to ONNX format"
    ],
    correctAnswer: 1,
    explanation: "`cross_val_predict` returns out-of-fold predictions where each sample is evaluated by an estimator that was not trained on that sample, making it ideal for constructing global confusion matrices and stacking features."
  }
];

export default topic15Questions;
