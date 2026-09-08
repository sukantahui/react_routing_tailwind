const questions = [
  {
    id: 1,
    question: "Given a 2D array X of shape (4, 3) and a 1D column-mean vector `mu` of shape (3,), how does NumPy execute `X - mu`?",
    options: [
      "It raises a ValueError because the arrays have different dimensions (2D vs 1D).",
      "It aligns the trailing dimension 3 == 3, prepends a singleton dimension to mu (1, 3), and broadcasts it across all 4 rows.",
      "It flattens X to 12 elements and subtracts mu 4 times.",
      "It modifies the array X in-place to save memory."
    ],
    correctAnswer: 1,
    explanation: "According to NumPy broadcasting rules, dimensions are aligned from right to left. The trailing dimension (3) matches, and the missing left dimension is padded with 1 (making shape (1, 3)), which then broadcasts across all 4 rows."
  },
  {
    id: 2,
    question: "Why does subtracting a 1D row-mean vector of shape (4,) from a matrix of shape (4, 3) raise a ValueError?",
    options: [
      "Because row means cannot be negative numbers.",
      "Because from right to left, the trailing dimension 3 of (4, 3) does not match dimension 4 of (4,), violating broadcasting rule 2.",
      "Because 4 is greater than 3.",
      "Because NumPy requires both arrays to be converted to lists first."
    ],
    correctAnswer: 1,
    explanation: "When comparing (4, 3) with (4,), right-to-left alignment compares 3 with 4. Since neither is 1 and 3 != 4, broadcasting fails. To fix it, reshape the 1D vector to (4, 1)."
  },
  {
    id: 3,
    question: "How can you safely reshape a 1D row vector `row_stats` of shape (N,) so it can broadcast row-wise against a matrix of shape (N, D)?",
    options: [
      "row_stats.reshape(1, N)",
      "row_stats[:, np.newaxis] or row_stats.reshape(-1, 1)",
      "np.transpose(row_stats)",
      "row_stats.flatten()"
    ],
    correctAnswer: 1,
    explanation: "`row_stats[:, np.newaxis]` or `.reshape(-1, 1)` transforms the 1D array of shape (N,) into a 2D column vector of shape (N, 1). The 1 expands along Axis 1 to match D."
  },
  {
    id: 4,
    question: "When subtracting 3-element channel means `rgb_mean = np.array([123.68, 116.78, 103.94])` from an image batch `X` of shape (8, 224, 224, 3), how many total pixels are modified without memory replication?",
    options: [
      "8 * 224 * 224 = 401,408 pixels (1,204,224 total channel values).",
      "Only the first 3 pixels.",
      "3 * 8 = 24 values.",
      "None, broadcasting creates a full copy of the entire batch."
    ],
    correctAnswer: 0,
    explanation: "Broadcasting modifies all 8 * 224 * 224 * 3 = 1,204,224 floating-point values in C-speed vectorized loops without ever duplicating the 3-element mean vector in RAM!"
  },
  {
    id: 5,
    question: "What will be the column-wise mean of any feature matrix X after computing `X_centered = X - np.mean(X, axis=0)`?",
    options: [
      "1.0 for each column.",
      "0.0 for each column (within floating-point precision).",
      "Equal to the original standard deviation.",
      "Undetermined until normalized by variance."
    ],
    correctAnswer: 1,
    explanation: "Subtracting the column mean shifts the distribution center to zero: sum(X_i - mu) = sum(X_i) - N*mu = N*mu - N*mu = 0."
  }
];

export default questions;
