const questions = [
  {
    id: 1,
    question: "In a real estate pricing dataset, if `Area_SqFt` and `Room_Count` show r = 0.94, what problem does this introduce into Linear Regression?",
    options: [
      "Overfitting due to high Multicollinearity and inflated coefficient variance",
      "Gradient explosion in Pandas",
      "Underfitting",
      "Categorical label imbalance"
    ],
    correctAnswer: 0,
    explanation: "A correlation of 0.94 between independent variables causes severe multicollinearity, leading to unstable and unreliable regression beta coefficients."
  },
  {
    id: 2,
    question: "Why do data scientists rank features by `corr[['Target_Variable']].sort_values()` during preprocessing?",
    options: [
      "To quickly select top features with strong positive/negative linear relationships to the target",
      "To convert numbers to text strings",
      "To delete missing NaN rows",
      "To invert the matrix"
    ],
    correctAnswer: 0,
    explanation: "Sorting the single-column correlation against the target acts as a fast heuristic for filter-based feature selection."
  },
  {
    id: 3,
    question: "Which parameter in `sns.heatmap()` shrinks or adds custom labels to the colorbar scale?",
    options: [
      "cbar_kws={'shrink': 0.8, 'label': 'Pearson r'}",
      "scale_bar={'size': 'small'}",
      "colorbar_options={'shrink': 0.8}",
      "legend_custom={'label': 'Pearson r'}"
    ],
    correctAnswer: 0,
    explanation: "`cbar_kws` is a dictionary that passes keyword arguments (like shrink, label, orientation) directly to the underlying Matplotlib colorbar."
  },
  {
    id: 4,
    question: "In `df.corr(numeric_only=True)`, what error does `numeric_only=True` prevent in newer Pandas versions (>= 2.0)?",
    options: [
      "TypeError when the DataFrame contains string/object columns that cannot be converted to floats",
      "Memory leak errors",
      "Network connection timeouts",
      "Infinite recursion errors"
    ],
    correctAnswer: 0,
    explanation: "In Pandas 2.0+, `numeric_only=True` ensures string/categorical columns are cleanly bypassed without throwing a TypeError."
  }
];

export default questions;
