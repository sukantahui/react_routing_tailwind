const questions = [
  {
    id: 1,
    question: "In Practice Problem 1, why was `bw_adjust=0.8` chosen instead of `bw_adjust=2.5`?",
    options: [
      "To prevent over-smoothing and preserve the two distinct local modal peaks in the distribution",
      "Because 2.5 is not a valid float",
      "To change the color to red",
      "To double the number of bins"
    ],
    correctAnswer: 0,
    explanation: "A smaller `bw_adjust` retains sensitivity to multi-modal peaks, whereas a high bandwidth would blur both peaks into a single distorted curve."
  },
  {
    id: 2,
    question: "In `sns.boxplot()`, what visual information does `notch=True` communicate?",
    options: [
      "A 95% confidence interval around the median, allowing visual comparison of group medians",
      "That the plot has missing data",
      "A rounded border radius",
      "A 3D perspective"
    ],
    correctAnswer: 0,
    explanation: "`notch=True` creates a notched narrowing around the median, representing approximately a 95% confidence interval for the median."
  },
  {
    id: 3,
    question: "Which dictionary argument in `sns.boxplot()` allows customizing the outlier flier marker shape, color, and size?",
    options: [
      "flierprops={'marker': 'D', 'markerfacecolor': 'red', 'markersize': 5}",
      "outlier_style={}",
      "anomaly_config={}",
      "fliers_dict={}"
    ],
    correctAnswer: 0,
    explanation: "`flierprops` is the dictionary passed to configure the appearance of outlier points."
  },
  {
    id: 4,
    question: "When creating a lower-triangle mask with `np.triu(np.ones_like(corr, dtype=bool))`, what do `True` values in the mask represent to `sns.heatmap()`?",
    options: [
      "Cells that should be hidden / masked out",
      "Cells that should be colored bright yellow",
      "Cells that are calculated twice",
      "Cells containing missing values"
    ],
    correctAnswer: 0,
    explanation: "`sns.heatmap(mask=...)` hides/blanks out all matrix cells where the mask array evaluates to `True`."
  }
];

export default questions;
