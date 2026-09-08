const questions = [
  {
    id: 1,
    question: "When applying `np.mean(X, axis=0)` on a feature matrix of shape (100, 5), what is the resulting shape?",
    options: [
      "(100,)",
      "(5,)",
      "(1, 5)",
      "(100, 5)"
    ],
    correctAnswer: "(5,)",
    explanation: "axis=0 collapses the 100 rows, computing the mean across all samples for each of the 5 features, yielding a 1D vector of shape (5,)."
  },
  {
    id: 2,
    question: "Why is `keepdims=True` crucial when computing row-wise sums on a 2D matrix before division?",
    options: [
      "It makes the computation execute 10x faster on CUDA GPUs.",
      "It preserves the 2D rank (e.g. shape (N, 1)), allowing automatic broadcasting across columns (N, p).",
      "It converts integers to floating-point numbers automatically.",
      "It replaces NaN values with 0."
    ],
    correctAnswer: "It preserves the 2D rank (e.g. shape (N, 1)), allowing automatic broadcasting across columns (N, p).",
    explanation: "Without keepdims=True, row reduction drops the second dimension to shape (N,), which fails to broadcast across (N, p). keepdims=True retains shape (N, 1)."
  },
  {
    id: 3,
    question: "How does `np.argmax(probs, axis=1)` function in multi-class neural network predictions?",
    options: [
      "It calculates the global maximum probability across all images and classes.",
      "For each sample row, it returns the index of the highest probability class.",
      "It sorts the probability matrix in ascending order.",
      "It normalizes the logits so they sum to 1.0."
    ],
    correctAnswer: "For each sample row, it returns the index of the highest probability class.",
    explanation: "axis=1 operates across the class columns for each individual sample row, returning the discrete class label with highest confidence."
  },
  {
    id: 4,
    question: "What is the default degree of freedom (`ddof`) setting in `np.std()` versus Pandas `df.std()`?",
    options: [
      "NumPy uses ddof=1 (sample std) while Pandas uses ddof=0 (population std).",
      "NumPy uses ddof=0 (population std, divides by N) while Pandas uses ddof=1 (sample std, divides by N-1).",
      "Both default to ddof=0.",
      "Both default to ddof=1."
    ],
    correctAnswer: "NumPy uses ddof=0 (population std, divides by N) while Pandas uses ddof=1 (sample std, divides by N-1).",
    explanation: "By default, NumPy's np.std calculates population standard deviation (dividing by N with ddof=0). Pandas uses sample standard deviation (Bessel's correction, ddof=1)."
  },
  {
    id: 5,
    question: "If an array contains `np.nan`, what does standard `np.mean(arr)` return?",
    options: [
      "0.0",
      "The average of all non-NaN numbers",
      "nan",
      "Throws a ValueError"
    ],
    correctAnswer: "nan",
    explanation: "Standard arithmetic ufuncs and aggregations propagate NaN. To ignore NaNs and calculate the mean of valid entries, use `np.nanmean(arr)`."
  }
];

export default questions;
