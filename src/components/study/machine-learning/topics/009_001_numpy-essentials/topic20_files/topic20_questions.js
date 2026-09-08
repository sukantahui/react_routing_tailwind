const questions = [
  {
    id: 1,
    question: "In synthetic multi-class Gaussian generation, what does the 2x2 covariance matrix `cov = [[1.0, 0.0], [0.0, 1.0]]` dictate about the 2D cluster shape?",
    options: [
      "It produces an isotropic (circular / spherical) cluster where features X1 and X2 are completely uncorrelated with unit variance.",
      "It produces a 45-degree diagonal line.",
      "It forces all points to lie exactly on the circle perimeter.",
      "It creates an empty cluster."
    ],
    correctAnswer: 0,
    explanation: "Zero off-diagonal covariance (cov_xy = 0) means the features are uncorrelated. Equal diagonal variances (var_x = var_y = 1.0) mean the cluster spreads equally in all directions, forming a circular/spherical Gaussian distribution."
  },
  {
    id: 2,
    question: "Why do we add Gaussian noise `epsilon ~ N(0, sigma^2)` when generating synthetic regression datasets?",
    options: [
      "To cause the program to crash during testing.",
      "To simulate real-world measurement imperfections, observation errors, and unobserved latent variables.",
      "To make all numbers positive.",
      "To convert integers into float64."
    ],
    correctAnswer: 1,
    explanation: "Real-world physical and business data is never 100% deterministic. Adding random noise tests whether ML models can generalize rather than simply memorizing the training points."
  },
  {
    id: 3,
    question: "To expand a 1D column vector `x` into a degree-2 polynomial design matrix `[1 | x | x^2]`, which sequence of NumPy operations is correct?",
    options: [
      "np.hstack((np.ones_like(x), x, x**2))",
      "np.vstack((np.ones_like(x), x, x**2))",
      "x.reshape(3, -1)",
      "np.split(x, 3)"
    ],
    correctAnswer: 0,
    explanation: "Given column vectors of shape (N, 1), `np.hstack` joins them side-by-side along Axis 1, resulting in an augmented feature matrix of shape (N, 3)."
  },
  {
    id: 4,
    question: "When synthesizing a binary classification dataset with non-linear logistic probabilities `p = 1 / (1 + exp(-logits))`, how do we sample binary 0/1 target labels?",
    options: [
      "y = (rng.uniform(0.0, 1.0, size=N) < p).astype(int)",
      "y = np.argmax(logits)",
      "y = logits * 2",
      "y = np.zeros_like(logits)"
    ],
    correctAnswer: 0,
    explanation: "Comparing continuous uniform random numbers in [0, 1) against probability p implements Bernoulli trial sampling: sample is 1 with probability p, and 0 with probability 1 - p."
  },
  {
    id: 5,
    question: "What is the primary advantage of testing ML algorithms on synthetic datasets before deploying on real production data?",
    options: [
      "Synthetic datasets eliminate the need for computer RAM.",
      "You know the exact ground truth mathematical equations, noise parameters, and cluster geometries, allowing objective verification of whether the algorithm correctly recovers parameters.",
      "Synthetic data can only be run on Python 2.",
      "It guarantees 100% test accuracy in production."
    ],
    correctAnswer: 1,
    explanation: "With synthetic data, the true underlying data-generating distribution is completely known, enabling researchers to debug algorithms, measure sample complexity, and benchmark sensitivity to noise and collinearity."
  }
];

export default questions;
