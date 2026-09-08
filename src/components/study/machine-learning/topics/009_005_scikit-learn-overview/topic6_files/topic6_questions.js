const topic6Questions = [
  {
    id: 1,
    question: "According to Scikit-learn design guidelines, what is the intended use case for `LabelEncoder`?",
    options: [
      "Encoding 2D input feature matrices (X) with nominal values",
      "Encoding 1D target vectors (y) for classification labels",
      "Hashing high-cardinality text documents into dense embeddings",
      "Generating dummy binary matrices for linear models"
    ],
    correctAnswer: 1,
    explanation: "LabelEncoder is explicitly designed to transform 1-dimensional target labels `y` into integer classes (0 to n_classes-1). For input features `X`, `OrdinalEncoder` or `OneHotEncoder` should be used."
  },
  {
    id: 2,
    question: "Why is nominal categorical data (e.g. City: ['Kolkata', 'Delhi', 'Mumbai']) typically encoded using `OneHotEncoder` rather than integer encoding?",
    options: [
      "Because integer encoding introduces an artificial numerical ordering/magnitude that biases linear and distance-based algorithms",
      "Because Python integers consume more RAM than sparse matrices",
      "Because Decision Trees cannot split on numerical integers",
      "Because OneHotEncoder automatically normalizes the variance to 1"
    ],
    correctAnswer: 0,
    explanation: "Integer encoding creates an artificial magnitude (e.g. Mumbai=2 > Kolkata=0), implying arithmetic relationships that do not exist. OneHotEncoder creates independent binary columns, eliminating this bias."
  },
  {
    id: 3,
    question: "What parameter in `OneHotEncoder` prevents throwing an exception when an unseen category appears during inference/test time?",
    options: [
      "ignore_nan=True",
      "handle_unknown='ignore'",
      "allow_novel=True",
      "drop_unseen=True"
    ],
    correctAnswer: 1,
    explanation: "`handle_unknown='ignore'` instructs OneHotEncoder to set all one-hot encoded columns to 0 when transforming a category that was not present in the training data, avoiding runtime errors."
  },
  {
    id: 4,
    question: "Why is `drop='first'` frequently configured in `OneHotEncoder` when training Linear Regression models?",
    options: [
      "To speed up execution by dropping 50% of the dataset",
      "To prevent multicollinearity (the dummy variable trap) caused by linearly dependent binary columns",
      "To ensure all matrix rows sum to 1",
      "To automatically remove target outliers"
    ],
    correctAnswer: 1,
    explanation: "Dropping one dummy column removes linear dependency among the one-hot columns (since the sum of all K dummy columns is 1), preventing multicollinearity issues in linear models."
  }
];

export default topic6Questions;
