const questions = [
  {
    id: 1,
    question: "Why is `scipy.linalg.solve(A, b)` preferred over `scipy.linalg.inv(A) @ b` when solving linear systems?",
    options: [
      "`solve()` does not require NumPy",
      "`solve()` uses LU factorization directly, avoiding explicit matrix inversion, making it ~2x faster and significantly more numerically stable",
      "`inv()` only works on integer values",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Direct solving via LU/Cholesky decomposition avoids computing matrix inverses explicitly, preventing floating-point truncation errors and reducing compute time."
  },
  {
    id: 2,
    question: "Which linear algebra decomposition in `scipy.linalg` factorizes a matrix into $U \\Sigma V^T$ and forms the foundation of PCA and TruncatedSVD?",
    options: [
      "linalg.svd()",
      "linalg.det()",
      "linalg.inv()",
      "linalg.norm()"
    ],
    correctAnswer: 0,
    explanation: "`linalg.svd()` computes the Singular Value Decomposition $U \\Sigma V^T$, which decomposes data into orthogonal principal singular directions."
  },
  {
    id: 3,
    question: "What is required for a square matrix $A$ to be invertible via `scipy.linalg.inv(A)`?",
    options: [
      "All entries must be positive",
      "The determinant must be non-zero (\\det(A) != 0), meaning columns/rows are linearly independent",
      "Matrix dimensions must be prime numbers",
      "The trace must be equal to 1"
    ],
    correctAnswer: 1,
    explanation: "A matrix is invertible (non-singular) if and only if its determinant is non-zero."
  }
];

export default questions;
