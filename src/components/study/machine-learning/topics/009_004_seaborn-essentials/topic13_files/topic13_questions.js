const questions = [
  {
    id: 1,
    question: "When adding a super title to `sns.pairplot()` with `g.fig.suptitle()`, why must you call `g.fig.subplots_adjust(top=0.92)`?",
    options: [
      "To add padding at the top of the figure so the main title does not collide with the top row of subplot titles",
      "Because Python will crash without subplots_adjust",
      "To rotate the pairplot diagonally",
      "To change the background color"
    ],
    correctAnswer: 0,
    explanation: "`sns.pairplot()` creates a Figure-level FacetGrid; setting `subplots_adjust(top=0.92)` creates necessary clearance for `g.fig.suptitle()`."
  },
  {
    id: 2,
    question: "Which dictionary argument in `sns.pairplot()` allows you to pass custom settings (such as point size `s` or opacity `alpha`) to the scatter subplots?",
    options: [
      "scatter_settings={}",
      "plot_kws={'s': 70, 'alpha': 0.8}",
      "style_dict={}",
      "points_config={}"
    ],
    correctAnswer: 1,
    explanation: "`plot_kws` passes keyword arguments directly to the off-diagonal bivariate plotting functions."
  },
  {
    id: 3,
    question: "What does `diag_kws={'fill': True}` achieve when `diag_kind='kde'` is specified?",
    options: [
      "It fills the diagonal KDE density area with a translucent color shade",
      "It converts the KDE into a solid black bar",
      "It removes the diagonal completely",
      "It fills the entire canvas with black"
    ],
    correctAnswer: 0,
    explanation: "`diag_kws={'fill': True}` shades the area under the diagonal Kernel Density Estimation curves."
  },
  {
    id: 4,
    question: "In exploratory data analysis of a classification dataset, what does distinct separation between color clusters in off-diagonal pairplot subplots signify?",
    options: [
      "The dataset is corrupted",
      "The features possess strong discriminatory power to separate classes using machine learning classifiers",
      "The learning rate must be set to 0",
      "The dataset has infinite variance"
    ],
    correctAnswer: 1,
    explanation: "Distinct class clusters in pairplots indicate high feature separability, meaning classifiers (like Logistic Regression, SVM, Decision Trees) will perform very well."
  }
];

export default questions;
