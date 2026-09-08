const topic7Questions = [
  {
    id: 1,
    question: "What is the primary objective of using `stratify=y` inside `train_test_split()`?",
    options: [
      "To automatically sort the feature columns alphabetically",
      "To guarantee that the train and test subsets contain identical proportions of each class label as the original dataset",
      "To normalize numerical features to have 0 mean and unit variance",
      "To perform k-fold cross-validation instead of a single split"
    ],
    correctAnswer: 1,
    explanation: "`stratify=y` forces the random split to maintain the exact class label distribution across both training and testing partitions, preventing imbalanced class starvation in smaller folds."
  },
  {
    id: 2,
    question: "If neither `test_size` nor `train_size` is explicitly passed to `train_test_split()`, what is the default test size fraction?",
    options: [
      "0.10 (10%)",
      "0.20 (20%)",
      "0.25 (25%)",
      "0.50 (50%)"
    ],
    correctAnswer: 2,
    explanation: "In Scikit-learn, if unspecified, `test_size` defaults to 0.25 (25% for test, 75% for train)."
  },
  {
    id: 3,
    question: "Why should `shuffle=False` be explicitly passed to `train_test_split()` when working with Time Series or financial stock price data?",
    options: [
      "Because shuffling time series data leaks future timestamps into past training windows (Look-ahead bias)",
      "Because time series data arrays cannot be stored in RAM if shuffled",
      "Because Scikit-learn will raise a NotFittedError",
      "Because pandas DataFrames do not support random indexing"
    ],
    correctAnswer: 0,
    explanation: "In time-series forecasting, temporal ordering must be preserved. Shuffling causes data from the future to leak into the training partition, creating unrealistic and overly optimistic model performance."
  },
  {
    id: 4,
    question: "What is the purpose of setting `random_state=42`?",
    options: [
      "It limits the execution time to 42 milliseconds",
      "It guarantees deterministic, identical data partitioning across different runs and machines for reproducibility",
      "It restricts the number of CPU threads to 42",
      "It ensures exactly 42 samples are allocated to the test set"
    ],
    correctAnswer: 1,
    explanation: "`random_state` seeds the internal pseudo-random number generator, ensuring that anyone running the script gets the exact same train/test split."
  }
];

export default topic7Questions;
