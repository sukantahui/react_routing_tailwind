const questions = [
  {
    id: 1,
    question: "What is the primary relationship between SciPy and NumPy?",
    options: [
      "SciPy is a complete replacement for NumPy and does not use ndarrays",
      "SciPy builds on top of NumPy, using NumPy ndarrays as its primary data structure while providing advanced scientific algorithms",
      "SciPy is only used for GUI creation in Python",
      "SciPy cannot interoperate with NumPy arrays"
    ],
    correctAnswer: 1,
    explanation: "SciPy extends NumPy by providing specialized mathematical, statistical, and engineering routines that operate directly on NumPy ndarrays."
  },
  {
    id: 2,
    question: "Which SciPy subpackage is primarily used for hypothesis testing, probability distributions, and z-score calculations in ML?",
    options: [
      "scipy.stats",
      "scipy.ndimage",
      "scipy.integrate",
      "scipy.fft"
    ],
    correctAnswer: 0,
    explanation: "`scipy.stats` contains exhaustive modules for descriptive statistics, continuous/discrete distributions, and hypothesis tests (like t-tests, KS-tests, ANOVA)."
  },
  {
    id: 3,
    question: "Which SciPy subpackage provides distance metrics like Euclidean, Manhattan, and Cosine distance needed for KNN and clustering?",
    options: [
      "scipy.optimize",
      "scipy.spatial",
      "scipy.cluster",
      "scipy.io"
    ],
    correctAnswer: 1,
    explanation: "`scipy.spatial` (and `scipy.spatial.distance`) provides efficient implementations for point distances, KD-trees, and spatial queries."
  },
  {
    id: 4,
    question: "Why are SciPy routines significantly faster than pure Python implementations?",
    options: [
      "SciPy uses just-in-time JavaScript compilation",
      "SciPy routines are wrapped over compiled, high-performance C and Fortran libraries like BLAS and LAPACK",
      "SciPy only runs in cloud supercomputers",
      "SciPy avoids using memory altogether"
    ],
    correctAnswer: 1,
    explanation: "SciPy wraps highly optimized low-level numerical libraries like LAPACK and BLAS written in C and Fortran."
  }
];

export default questions;
