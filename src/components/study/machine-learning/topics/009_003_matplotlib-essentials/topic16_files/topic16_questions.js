const questions = [
  {
    id: 1,
    question: "Which of the following is the most frequent cause of memory leaks in batch Matplotlib pipelines running on servers?",
    options: [
      "Failing to explicitly close Figures using `plt.close(fig)` inside iteration loops",
      "Using NumPy arrays with more than 1000 items",
      "Using `dpi=300` instead of `dpi=72`",
      "Using hex colors instead of named strings"
    ],
    correctAnswer: 0,
    explanation: "Matplotlib retains internal Artist references to every open Figure in a global GUI list until explicitly released with `plt.close(fig)`."
  },
  {
    id: 2,
    question: "Why should `matplotlib.use('Agg')` be called BEFORE `import matplotlib.pyplot as plt` on non-GUI cloud machines?",
    options: [
      "Because importing pyplot automatically initializes the default GUI backend (such as TkAgg), which crashes if no graphical display ($DISPLAY) is detected",
      "Because 'Agg' is 100x slower if called second",
      "Because pyplot will delete existing files",
      "Because 'Agg' is a deprecated alias"
    ],
    correctAnswer: 0,
    explanation: "Importing `pyplot` immediately resolves and locks the active rendering backend, so headless configuration must precede the pyplot import."
  },
  {
    id: 3,
    question: "When plotting high-dimensional feature distributions, what visual distortion occurs if `ax.set_aspect('equal')` is omitted?",
    options: [
      "Orthogonal Euclidean distances are distorted because unequal coordinate intervals along X and Y stretch geometric relationships",
      "Color values invert automatically",
      "Ticks become invisible",
      "Text labels rotate 180 degrees"
    ],
    correctAnswer: 0,
    explanation: "Without an equal aspect ratio, Matplotlib stretches X and Y independently to fill the box, distorting true Euclidean distances between clusters."
  },
  {
    id: 4,
    question: "Which keyword argument in `ax.hist()` ensures that the area of all bins integrates to 1.0?",
    options: [
      "density=True",
      "normalize=True",
      "sum_to_one=True",
      "scale='pdf'"
    ],
    correctAnswer: 0,
    explanation: "`density=True` scales bin heights by the sample count and bin widths so the total area equals 1.0, creating a valid probability density function."
  }
];

export default questions;
