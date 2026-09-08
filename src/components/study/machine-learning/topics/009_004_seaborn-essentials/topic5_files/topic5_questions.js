const questions = [
  {
    id: 1,
    question: "How many distinct visual dimensions can you simultaneously encode on a 2D `sns.scatterplot()`?",
    options: [
      "Only 2 (X and Y)",
      "Up to 5 (X, Y, hue, size, and style)",
      "Exactly 100",
      "Only 1"
    ],
    correctAnswer: 1,
    explanation: "Seaborn allows encoding X position, Y position, color (hue), point size (size), and marker glyph (style) simultaneously."
  },
  {
    id: 2,
    question: "When `sns.lineplot()` receives multiple observations for the same x-coordinate, what does it automatically render by default?",
    options: [
      "A single random point",
      "An error exception",
      "The mean trajectory line surrounded by a shaded 95% bootstrap confidence interval band",
      "A pie chart"
    ],
    correctAnswer: 2,
    explanation: "`sns.lineplot()` aggregates repeated measurements into a mean line with a shaded confidence interval band."
  },
  {
    id: 3,
    question: "Which figure-level function acts as the universal wrapper for scatterplot and lineplot across facet grids?",
    options: [
      "sns.relplot()",
      "sns.catplot()",
      "sns.displot()",
      "sns.pairplot()"
    ],
    correctAnswer: 0,
    explanation: "`sns.relplot()` is the figure-level function for relationship plots (with kind='scatter' or kind='line')."
  },
  {
    id: 4,
    question: "In `sns.relplot()`, which parameters are used to create a 2D matrix of subplots conditioned on categorical variables?",
    options: [
      "x_split and y_split",
      "col and row",
      "grid_x and grid_y",
      "sub_a and sub_b"
    ],
    correctAnswer: 1,
    explanation: "`col` and `row` parameters facet the dataset into separate subplot columns and rows automatically."
  }
];

export default questions;
