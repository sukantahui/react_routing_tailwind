const questions = [
  {
    id: 1,
    question: "Which distance metric is calculated as the sum of absolute coordinate differences: $\\sum |x_i - y_i|$?",
    options: [
      "Euclidean distance (L2)",
      "Manhattan / Cityblock distance (L1)",
      "Cosine distance",
      "Chebyshev distance"
    ],
    correctAnswer: 1,
    explanation: "Manhattan distance (implemented as `scipy.spatial.distance.cityblock`) sums the absolute differences along each dimension."
  },
  {
    id: 2,
    question: "What function in `scipy.spatial.distance` computes cross-pairwise distances between two matrices XA (size M) and XB (size N)?",
    options: [
      "distance.cdist(XA, XB)",
      "distance.pdist(XA)",
      "distance.cross(XA, XB)",
      "distance.matrix_diff(XA, XB)"
    ],
    correctAnswer: 0,
    explanation: "`cdist(XA, XB)` generates an (M x N) matrix containing pairwise distances between all pairs of rows in XA and XB."
  },
  {
    id: 3,
    question: "What is the primary advantage of building a `scipy.spatial.KDTree` over brute-force pairwise distance comparisons for KNN queries?",
    options: [
      "KDTree eliminates all memory usage",
      "KDTree reduces nearest-neighbor search complexity from $O(N)$ to $O(\\log N)$ by partitioning spatial search space",
      "KDTree only works with 1D data",
      "KDTree converts coordinates to text strings"
    ],
    correctAnswer: 1,
    explanation: "A KDTree organizes spatial coordinates in a k-dimensional binary search tree, enabling sub-linear $O(\\log N)$ nearest neighbor queries."
  }
];

export default questions;
