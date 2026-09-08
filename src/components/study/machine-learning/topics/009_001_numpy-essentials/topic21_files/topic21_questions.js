const questions = [
  {
    id: 1,
    question: "Why does the expression `np.eye(4)[np.array([2, 0, 1])]` successfully create a 3x4 one-hot encoded matrix?",
    options: [
      "Because np.eye(4) creates a 4x4 identity matrix where row i has a 1 at column i, and integer fancy indexing retrieves rows 2, 0, and 1.",
      "Because np.eye automatically trains a softmax classifier.",
      "Because 4 is divisible by 2.",
      "Because NumPy converts negative numbers to one-hot vectors."
    ],
    correctAnswer: 0,
    explanation: "np.eye(4) creates a 4x4 identity matrix. Fancy indexing with `[2, 0, 1]` extracts rows 2, 0, and 1, producing `[[0,0,1,0], [1,0,0,0], [0,1,0,0]]`."
  },
  {
    id: 2,
    question: "In the vectorized pairwise Euclidean distance calculation between A (M, D) and B (N, D), what shape does `A[:, np.newaxis, :] - B[np.newaxis, :, :]` have before sum reduction?",
    options: [
      "(M, N, D)",
      "(M, N)",
      "(M, D)",
      "(D, M, N)"
    ],
    correctAnswer: 0,
    explanation: "A has shape (M, 1, D) and B has shape (1, N, D). Broadcasting expands both arrays to shape (M, N, D), holding all pairwise element differences."
  },
  {
    id: 3,
    question: "When applying `np.convolve(series, kernel, mode='valid')` with a 10-element time series and a 3-element moving average filter, what is the length of the resulting output array?",
    options: [
      "8 (formula: N - w + 1 = 10 - 3 + 1 = 8)",
      "10 (same length)",
      "12 (formula: N + w - 1)",
      "3"
    ],
    correctAnswer: 0,
    explanation: "'valid' mode only computes values where the window completely overlaps the data without padding, giving length `10 - 3 + 1 = 8`."
  },
  {
    id: 4,
    question: "Why must you shuffle feature matrix X and label vector y using the EXACT SAME index permutation array `indices = rng.permutation(len(X))`?",
    options: [
      "To prevent data leakage.",
      "To ensure that each sample's features remain paired with its correct corresponding target label.",
      "Because NumPy does not allow shuffling 1D arrays.",
      "To sort the dataset in ascending order."
    ],
    correctAnswer: 1,
    explanation: "If X and y were shuffled independently, sample features would become mismatched with incorrect target labels, destroying the underlying predictive relationship."
  },
  {
    id: 5,
    question: "In algebraic pairwise Euclidean distance calculation `||a - b||^2 = ||a||^2 + ||b||^2 - 2(a @ b.T)`, why is `np.maximum(dist_sq, 0.0)` applied before taking `np.sqrt`?",
    options: [
      "To convert integers to float.",
      "To prevent tiny negative numbers caused by floating-point rounding errors from producing NaN when calling np.sqrt.",
      "To normalize distances between 0 and 1.",
      "To invert the matrix."
    ],
    correctAnswer: 1,
    explanation: "Due to numerical rounding inaccuracies in floating-point operations, identical vectors can sometimes yield values like `-1e-16`. Clipping to `0.0` prevents `np.sqrt` from returning `NaN`."
  }
];

export default questions;
