const questions = [
  {
    id: 1,
    question: "Why should `vmin=-1`, `vmax=1`, and `center=0` always be set when plotting a correlation matrix heatmap?",
    options: [
      "To force the colorbar to symmetrically align neutral 0.0 with the midpoint color and range from -1 to +1",
      "Because Seaborn crashes without these parameters",
      "To convert values into percentages",
      "To remove negative numbers"
    ],
    correctAnswer: 0,
    explanation: "Setting vmin=-1, vmax=1, and center=0 ensures diverging colormaps (like coolwarm) treat 0 as neutral white/grey, negative values as blue, and positive as red."
  },
  {
    id: 2,
    question: "How do you mask the redundant upper-triangular half of a symmetric correlation matrix in Seaborn?",
    options: [
      "Pass mask=np.triu(np.ones_like(corr, dtype=bool)) to sns.heatmap()",
      "Pass hide_upper=True",
      "Delete half the columns in the DataFrame",
      "Pass triangle='lower'"
    ],
    correctAnswer: 0,
    explanation: "`np.triu(np.ones_like(corr, dtype=bool))` creates a boolean mask for the upper triangle which `sns.heatmap(mask=...)` hides."
  },
  {
    id: 3,
    question: "What ML issue can be diagnosed when two predictor features show an extremely high correlation (e.g. r = 0.96)?",
    options: [
      "Overfitting",
      "Multicollinearity",
      "Underfitting",
      "Vanishing Gradient"
    ],
    correctAnswer: 1,
    explanation: "High pairwise correlation between independent features indicates multicollinearity, which can destabilize linear regression coefficients."
  },
  {
    id: 4,
    question: "Which colormap is most recommended for correlation matrices?",
    options: [
      "Sequential colormaps like Greys",
      "Diverging colormaps like coolwarm, vlag, or RdBu_r",
      "Single solid black color",
      "Random RGB palette"
    ],
    correctAnswer: 1,
    explanation: "Diverging colormaps (coolwarm, vlag) visually distinguish positive correlations (+1) from negative correlations (-1) around a neutral center (0)."
  }
];

export default questions;
