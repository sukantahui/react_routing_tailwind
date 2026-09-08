const questions = [
  {
    id: 1,
    question: "Which SciPy subpackage would you use to find the global minimum of a multi-variable machine learning loss function?",
    options: [
      "scipy.optimize",
      "scipy.stats",
      "scipy.spatial",
      "scipy.fft"
    ],
    correctAnswer: 0,
    explanation: "`scipy.optimize` (specifically `optimize.minimize`) provides gradient and simplex algorithms (BFGS, Nelder-Mead, L-BFGS-B) for loss optimization."
  },
  {
    id: 2,
    question: "In hypothesis testing, if $p = 0.004$ and $\\alpha = 0.05$, what is the conclusion regarding the Null Hypothesis $H_0$?",
    options: [
      "Accept H0",
      "Reject H0 (Statistically significant evidence of a true effect)",
      "Retest because p-value is too low",
      "No conclusion can be drawn"
    ],
    correctAnswer: 1,
    explanation: "Because $p < \\alpha$ ($0.004 < 0.05$), we reject the null hypothesis and accept the alternative hypothesis."
  },
  {
    id: 3,
    question: "What is the primary difference between `scipy.spatial.distance.euclidean` (L2) and `cityblock` (L1)?",
    options: [
      "Euclidean is straight-line distance (square root of squared differences), whereas cityblock is grid-based absolute difference sum",
      "Cityblock only works for cities",
      "Euclidean only works in 2D",
      "There is no mathematical difference"
    ],
    correctAnswer: 0,
    explanation: "Euclidean is the L2 hypotenuse distance $\\sqrt{\\sum (x_i - y_i)^2}$, while Cityblock/Manhattan is the L1 grid step distance $\\sum |x_i - y_i|$."
  }
];

export default questions;
