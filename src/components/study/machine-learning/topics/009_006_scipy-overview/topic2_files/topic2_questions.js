const questions = [
  {
    id: 1,
    question: "How does `scipy.linalg` differ from `numpy.linalg`?",
    options: [
      "numpy.linalg is faster and has more algorithms",
      "scipy.linalg contains all functions in numpy.linalg plus advanced decompositions (LU, Schur) and is always compiled with full LAPACK/BLAS support",
      "scipy.linalg only works with 1D vectors",
      "scipy.linalg does not support matrix inversion"
    ],
    correctAnswer: 1,
    explanation: "`scipy.linalg` is a superset of `numpy.linalg` that provides full access to LAPACK/BLAS routines and advanced matrix factorizations."
  },
  {
    id: 2,
    question: "Which SciPy module provides sparse matrix representations (such as CSR and CSC) crucial for text mining and recommendation systems?",
    options: [
      "scipy.sparse",
      "scipy.compact",
      "scipy.memory",
      "scipy.zeros"
    ],
    correctAnswer: 0,
    explanation: "`scipy.sparse` provides memory-efficient 2D matrix formats like CSR (Compressed Sparse Row) and CSC (Compressed Sparse Column) that only store non-zero entries."
  },
  {
    id: 3,
    question: "Can SciPy functions accept standard NumPy arrays directly as inputs?",
    options: [
      "No, arrays must be converted to SciPy objects first",
      "Yes, SciPy is designed to operate seamlessly on NumPy ndarrays",
      "Only if they are 1-dimensional",
      "Only after saving to a CSV file"
    ],
    correctAnswer: 1,
    explanation: "SciPy uses NumPy's `ndarray` as its fundamental data structure, so any standard NumPy array can be passed directly into SciPy functions."
  }
];

export default questions;
