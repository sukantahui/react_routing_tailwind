const questions = [
  {
    id: 1,
    question: "What is the key difference in distribution and return values between `np.random.rand(5)` and `np.random.randn(5)`?",
    options: [
      "`rand` generates uniform float numbers in [0, 1), whereas `randn` generates standard normal Gaussian numbers with mean=0 and std=1.",
      "`rand` generates integers, while `randn` generates float numbers.",
      "`rand` generates numbers with mean=0, while `randn` generates numbers in [0, 1).",
      "Both functions generate identical Gaussian numbers."
    ],
    correctAnswer: 0,
    explanation: "`np.random.rand` samples from the continuous Uniform distribution in [0, 1). The 'n' in `randn` stands for Normal (Gaussian) distribution N(0, 1), which can produce positive or negative numbers centered around 0."
  },
  {
    id: 2,
    question: "Why is `rng = np.random.default_rng(seed=42)` preferred over legacy `np.random.seed(42)` in modern ML code?",
    options: [
      "default_rng produces truly non-deterministic hardware quantum numbers.",
      "default_rng uses the modern, faster, statistically superior PCG64 generator and provides an isolated instance rather than mutating global state.",
      "np.random.seed is deprecated and no longer available in Python 3.",
      "default_rng runs exclusively on GPU CUDA cores."
    ],
    correctAnswer: 1,
    explanation: "Introduced in NumPy 1.17, default_rng initializes an isolated Generator instance using the PCG64 bit generator. It prevents unintended side-effects across libraries and multi-threading that occurred with the global seed."
  },
  {
    id: 3,
    question: "What will `np.random.randint(1, 10, size=5)` generate?",
    options: [
      "5 random integers from 1 up to 10 inclusive.",
      "5 random integers from 1 up to 9 inclusive (10 is excluded).",
      "5 floating-point numbers between 1 and 10.",
      "An array of 10 numbers randomly chosen 5 times."
    ],
    correctAnswer: 1,
    explanation: "Like Python's range(), `randint(low, high)` in NumPy includes `low` but excludes `high` (half-open interval [low, high))."
  },
  {
    id: 4,
    question: "When initializing neural network weights with Xavier (Glorot) normal initialization for layer with input dimension d_in and output dimension d_out, what standard deviation sigma is used?",
    options: [
      "sigma = sqrt(2 / (d_in + d_out))",
      "sigma = (d_in + d_out) / 2",
      "sigma = 1.0 / (d_in * d_out)",
      "sigma = 0.01"
    ],
    correctAnswer: 0,
    explanation: "Xavier / Glorot initialization scales weights with standard deviation sigma = sqrt(2 / (d_in + d_out)) to ensure signal variance remains constant across forward activations and backward gradients."
  },
  {
    id: 5,
    question: "What is the difference between `rng.permutation(arr)` and `rng.shuffle(arr)`?",
    options: [
      "permutation operates in-place, while shuffle returns a copy.",
      "permutation returns a shuffled copy of the array, whereas shuffle modifies the original array in-place.",
      "permutation only works on strings, while shuffle works on numbers.",
      "There is no difference; they are aliases of each other."
    ],
    correctAnswer: 1,
    explanation: "`rng.permutation` returns a new shuffled array without altering the input array. `rng.shuffle` modifies the elements of the original array in place and returns None."
  }
];

export default questions;
