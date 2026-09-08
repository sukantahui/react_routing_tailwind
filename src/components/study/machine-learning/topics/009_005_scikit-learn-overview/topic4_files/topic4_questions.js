const topic4Questions = [
  {
    id: 1,
    question: "Which scaler from `sklearn.preprocessing` is best suited for datasets containing severe outliers because it relies on the median and Interquartile Range (IQR)?",
    options: [
      "StandardScaler",
      "MinMaxScaler",
      "RobustScaler",
      "Normalizer"
    ],
    correctAnswer: 2,
    explanation: "RobustScaler removes the median and scales the data according to the Interquartile Range (IQR between the 25th and 75th quantiles), making it far less sensitive to outliers than mean-based scalers."
  },
  {
    id: 2,
    question: "What is data leakage in the context of preprocessing?",
    options: [
      "When training data is accidentally deleted from disk during transformation",
      "When information from the test dataset (e.g. mean, variance, max) is learned by the preprocessor during `.fit()`",
      "When memory overflows due to high-dimensional polynomial features",
      "When categorical variables are encoded with negative integers"
    ],
    correctAnswer: 1,
    explanation: "Data leakage occurs when parameters (such as mean, std dev, or min/max bounds) are calculated across the entire dataset or test dataset, allowing test set knowledge to contaminate model training."
  },
  {
    id: 3,
    question: "If `X` has two features `[x1, x2]`, what features will `PolynomialFeatures(degree=2, include_bias=False)` produce?",
    options: [
      "[x1, x2, x1 + x2]",
      "[x1, x2, x1^2, x1*x2, x2^2]",
      "[x1^2, x2^2]",
      "[1, x1, x2, x1^2]"
    ],
    correctAnswer: 1,
    explanation: "PolynomialFeatures of degree 2 without bias generates the original terms `[x1, x2]`, interaction terms `[x1*x2]`, and squared terms `[x1^2, x2^2]`, yielding 5 total features."
  },
  {
    id: 4,
    question: "What utility class in `sklearn.preprocessing` allows wrapping an arbitrary custom Python function (like `np.log1p`) into a Scikit-learn transformer?",
    options: [
      "FunctionTransformer",
      "CustomPreprocessor",
      "LambdaTransformer",
      "UserDefinedEstimator"
    ],
    correctAnswer: 0,
    explanation: "sklearn.preprocessing.FunctionTransformer constructs a transformer from an arbitrary callable, enabling easy integration of stateless transformations into Scikit-learn pipelines."
  }
];

export default topic4Questions;
