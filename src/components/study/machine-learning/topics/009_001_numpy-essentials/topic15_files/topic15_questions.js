const questions = [
  {
    id: 1,
    question: "Given two 1D NumPy arrays `a = np.array([1, 2, 3])` and `b = np.array([4, 5, 6])`, what are the resulting shapes of `np.vstack((a, b))` and `np.hstack((a, b))`?",
    options: [
      "vstack gives (2, 3), while hstack gives (6,).",
      "vstack gives (6,), while hstack gives (2, 3).",
      "Both return 2D arrays of shape (2, 3).",
      "Both return 1D arrays of shape (6,)."
    ],
    correctAnswer: 0,
    explanation: "For 1D arrays, np.vstack upgrades each array to shape (1, 3) and joins them row-wise to make shape (2, 3). In contrast, np.hstack concatenates them along the 1D axis, resulting in a single 1D array of shape (6,)."
  },
  {
    id: 2,
    question: "What is the fundamental difference between `np.concatenate` and `np.stack`?",
    options: [
      "np.concatenate only works on 1D arrays, whereas np.stack works on any dimension.",
      "np.concatenate joins arrays along an EXISTING dimension, while np.stack creates a NEW dimension.",
      "np.stack modifies arrays in-place, whereas np.concatenate creates a copy.",
      "np.concatenate is for floating-point data, while np.stack is for integers."
    ],
    correctAnswer: 1,
    explanation: "np.concatenate joins arrays along an existing axis (ndim remains the same). np.stack joins equal-shaped arrays along a brand new axis, increasing the number of dimensions by 1 (e.g. two (2, 3) arrays stacked along axis=0 produce (2, 2, 3))."
  },
  {
    id: 3,
    question: "If you have a dataset matrix of shape (10, 4) and you want to split it into 3 cross-validation folds, why should you use `np.array_split(data, 3)` instead of `np.split(data, 3)`?",
    options: [
      "np.split raises a ValueError because 10 is not evenly divisible by 3, whereas np.array_split handles unequal chunks gracefully.",
      "np.split shuffles the rows, which ruins cross validation.",
      "np.array_split converts numerical data into pandas DataFrames.",
      "There is no difference; both produce the same output."
    ],
    correctAnswer: 0,
    explanation: "np.split requires the array size to be evenly divisible by the number of sections. Since 10 % 3 != 0, np.split fails with ValueError. np.array_split allows unequal division (yielding shapes (4, 4), (3, 4), (3, 4))."
  },
  {
    id: 4,
    question: "To add a bias term (column of 1s) to an existing feature matrix X of shape (N, D), which NumPy operation is standard?",
    options: [
      "np.vstack((np.ones((1, D)), X))",
      "np.hstack((np.ones((N, 1)), X))",
      "np.dstack((np.ones(N), X))",
      "np.split(X, [1])"
    ],
    correctAnswer: 1,
    explanation: "To prepend a column of 1s horizontally along the feature dimension (Axis 1), we create a column vector of ones with shape (N, 1) and combine it with X of shape (N, D) using np.hstack (or np.column_stack), giving shape (N, D+1)."
  },
  {
    id: 5,
    question: "Given a 2D matrix representing an image dataset with shape (100, 5), how can you separate the first 4 feature columns (X) from the final target column (y) using `np.hsplit`?",
    options: [
      "X, y = np.hsplit(data, [4])",
      "X, y = np.vsplit(data, [4])",
      "X, y = np.hsplit(data, 4)",
      "X, y = np.split(data, axis=0)"
    ],
    correctAnswer: 0,
    explanation: "np.hsplit(data, [4]) splits horizontally along columns at column index 4. This produces two sub-arrays: data[:, :4] with shape (100, 4) and data[:, 4:] with shape (100, 1)."
  }
];

export default questions;
