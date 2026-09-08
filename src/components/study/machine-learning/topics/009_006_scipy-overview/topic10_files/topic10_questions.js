const questions = [
  {
    id: 1,
    question: "Which optimization algorithm in `scipy.optimize.minimize` is a Quasi-Newton method that approximates the Hessian matrix and is used inside Scikit-learn's LogisticRegression?",
    options: [
      "BFGS / L-BFGS-B",
      "BubbleSort",
      "K-Means",
      "RandomSearch"
    ],
    correctAnswer: 0,
    explanation: "BFGS (and memory-bounded L-BFGS-B) uses first derivatives to build an approximation of second-order curvature (Hessian), enabling rapid quadratic convergence."
  },
  {
    id: 2,
    question: "When should the Nelder-Mead optimization method be chosen in `scipy.optimize.minimize`?",
    options: [
      "When the objective function is smooth and has easily computable analytical gradients",
      "When the objective function is non-differentiable, noisy, or gradient evaluation is impossible (direct search simplex algorithm)",
      "When optimizing quantum computers",
      "Only for linear equations"
    ],
    correctAnswer: 1,
    explanation: "Nelder-Mead is a heuristic simplex direct search method that only evaluates function values without calculating gradients."
  },
  {
    id: 3,
    question: "What is the primary purpose of `scipy.optimize.curve_fit`?",
    options: [
      "To crop images in ndimage",
      "To perform non-linear least-squares fitting of arbitrary user-defined model functions to empirical data",
      "To sort lists of numbers",
      "To compute matrix determinants"
    ],
    correctAnswer: 1,
    explanation: "`curve_fit` determines optimal coefficients for non-linear equations (exponential, polynomial, sigmoid, power law) given experimental data points."
  }
];

export default questions;
