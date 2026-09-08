const questions = [
  {
    id: 1,
    question: "What is the key difference between A * B and A @ B for two 2D NumPy arrays of shape (3, 3)?",
    options: [
      "A * B computes element-wise multiplication, whereas A @ B performs true matrix multiplication (row-dot-column).",
      "A * B performs matrix multiplication, whereas A @ B performs scalar addition.",
      "Both operators perform identical operations in modern NumPy.",
      "A @ B is only valid for 1D arrays, while A * B is for 2D arrays."
    ],
    correctAnswer: 0,
    explanation: "In NumPy, the asterisk (*) operator represents the Hadamard (element-wise) product where C[i, j] = A[i, j] * B[i, j]. The @ operator (or np.matmul / np.dot for 2D) represents matrix multiplication where C[i, j] is the dot product of row i of A with column j of B."
  },
  {
    id: 2,
    question: "Given matrix A of shape (100, 10) and matrix B of shape (20, 10), why does `A @ B` raise a ValueError, and how should it be fixed to calculate sample similarities?",
    options: [
      "Because arrays must be 1D; use A.flatten() @ B.flatten().",
      "Because the inner dimensions (10 and 20) do not match; fix it by transposing B as `A @ B.T`, resulting in shape (100, 20).",
      "Because 100 is greater than 20; swap the matrices to `B @ A`.",
      "Because NumPy requires np.multiply for matrices of different row counts."
    ],
    correctAnswer: 1,
    explanation: "For matrix multiplication (M, K) @ (P, N), the inner dimensions K and P must match. Here K=10 and P=20. Transposing B yields shape (10, 20), making `A @ B.T` valid with shape (100, 20)."
  },
  {
    id: 3,
    question: "In a Neural Network dense layer forward pass with input X (batch size N=32, features D=128) and weights W (D=128, units M=64) plus bias b (shape (64,)), what is the shape of Z = X @ W + b?",
    options: [
      "(128, 64)",
      "(32, 128)",
      "(32, 64)",
      "(64, 32)"
    ],
    correctAnswer: 2,
    explanation: "X @ W has shape (32, 128) @ (128, 64) = (32, 64). Adding bias b of shape (64,) broadcasts across the batch dimension, yielding final output logits of shape (32, 64)."
  },
  {
    id: 4,
    question: "What does the dot product of two normalized unit vectors (||u|| = 1, ||v|| = 1) evaluate to geometrically?",
    options: [
      "The Euclidean distance between the two points.",
      "The Cosine Similarity (cos θ) between the two vectors.",
      "The determinant of the 2x2 matrix formed by u and v.",
      "The projection length divided by pi."
    ],
    correctAnswer: 1,
    explanation: "Since u · v = ||u|| * ||v|| * cos(θ), when ||u|| = 1 and ||v|| = 1, the dot product u · v simplifies directly to cos(θ), which is the Cosine Similarity metric."
  },
  {
    id: 5,
    question: "In Ordinary Least Squares (OLS) regression, what is the closed-form Normal Equation to compute optimal weights θ?",
    options: [
      "θ = (X @ X.T)^(-1) @ X @ y",
      "θ = (X.T @ X)^(-1) @ X.T @ y",
      "θ = X.T @ (X @ y)^(-1)",
      "θ = (X.T @ y) / (X.T @ X)"
    ],
    correctAnswer: 1,
    explanation: "The normal equation for Linear Regression is θ = (X.T @ X)^(-1) @ X.T @ y, derived by setting the gradient of the sum of squared residuals with respect to θ equal to zero."
  }
];

export default questions;
