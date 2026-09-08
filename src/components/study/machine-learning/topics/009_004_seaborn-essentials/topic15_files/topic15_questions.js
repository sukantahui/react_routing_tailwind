const questions = [
  {
    id: 1,
    question: "During an ML engineering interview: How does `sns.pairplot()` help diagnose whether a dataset is linearly separable?",
    options: [
      "By showing if distinct colored target clusters can be separated with straight boundary lines on 2D scatter subplots",
      "By calculating the determinant of the covariance matrix to zero",
      "By performing automatic PCA projection into 10D",
      "By printing audio frequencies"
    ],
    correctAnswer: 0,
    explanation: "If classes form clearly separated non-overlapping clusters across 2D scatter subplots in a pairplot, simple linear classifiers will achieve high accuracy."
  },
  {
    id: 2,
    question: "Why does `sns.heatmap()` require `center=0` when displaying Pearson correlation coefficients?",
    options: [
      "To align zero linear correlation with the neutral midpoint color of a diverging colormap",
      "To center the text inside each cell",
      "To center the canvas on screen",
      "To convert integers to zero"
    ],
    correctAnswer: 0,
    explanation: "`center=0` anchors the neutral point of a diverging palette at r = 0.0, ensuring negative and positive relationships are clearly distinguished."
  },
  {
    id: 3,
    question: "What is the primary architectural difference between `sns.scatterplot()` and `sns.relplot()`?",
    options: [
      "`sns.scatterplot()` is an axes-level function drawing on a single Matplotlib `ax`, while `sns.relplot()` is a figure-level function managing multi-facet subplots",
      "`sns.relplot()` only works in 3D",
      "`sns.scatterplot()` is written in C++ while `sns.relplot()` is written in Fortran",
      "They have no difference whatsoever"
    ],
    correctAnswer: 0,
    explanation: "Axes-level functions draw on a provided `ax`, whereas figure-level functions (relplot, catplot, displot) manage the entire FacetGrid figure."
  },
  {
    id: 4,
    question: "Which function call cleans up plots by removing redundant top and right axis spines?",
    options: [
      "sns.clean()",
      "sns.despine()",
      "plt.remove_box()",
      "sns.border_off()"
    ],
    correctAnswer: 1,
    explanation: "`sns.despine()` strips the top and right spines from the active Matplotlib/Seaborn figure."
  }
];

export default questions;
