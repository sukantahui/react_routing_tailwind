const questions = [
  {
    id: 1,
    question: "What does `sns.pairplot()` plot on the diagonal elements of the grid by default?",
    options: [
      "Pie charts",
      "Univariate distribution (KDE or Histogram) of each feature individually",
      "Correlation coefficient numbers only",
      "Blank white boxes"
    ],
    correctAnswer: 1,
    explanation: "Diagonal elements plot the univariate distribution of that specific feature (using `diag_kind='kde'` or `diag_kind='hist'`)."
  },
  {
    id: 2,
    question: "What is the primary benefit of setting `corner=True` in `sns.pairplot()`?",
    options: [
      "It speeds up computation and removes visual clutter by suppressing redundant upper-triangular subplots",
      "It turns the plot into a 3D rotating cube",
      "It adds rounded corners to each subplot window",
      "It filters out null rows"
    ],
    correctAnswer: 0,
    explanation: "`corner=True` plots only the lower triangle and diagonal, cutting rendering time and removing duplicate pair comparisons."
  },
  {
    id: 3,
    question: "How is `sns.PairGrid` related to `sns.pairplot`?",
    options: [
      "PairGrid is the lower-level class that pairplot wraps; it allows custom mapping (map_upper, map_diag, map_lower)",
      "They are completely unrelated packages",
      "PairGrid is deprecated and should not be used",
      "PairGrid only works with audio datasets"
    ],
    correctAnswer: 0,
    explanation: "`sns.PairGrid` is the underlying flexible grid class that allows assigning different plot types to upper, lower, and diagonal quadrants."
  },
  {
    id: 4,
    question: "Why is `hue='target_class'` so useful when examining pairplots for classification datasets?",
    options: [
      "It instantly reveals whether classes form separable clusters in feature space",
      "It converts text into embeddings",
      "It normalizes all columns to mean 0",
      "It encodes audio tracks"
    ],
    correctAnswer: 0,
    explanation: "Coloring by target class lets you visually assess feature separability and cluster boundaries across all feature pairs."
  }
];

export default questions;
