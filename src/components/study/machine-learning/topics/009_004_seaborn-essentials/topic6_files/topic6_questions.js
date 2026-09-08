const questions = [
  {
    id: 1,
    question: "What format must input data have to be plotted with `sns.heatmap()`?",
    options: [
      "A 1D Python list of strings",
      "A 2D rectangular matrix, DataFrame, or pivot table of numeric values",
      "A SQL database query string",
      "A 3D image tensor"
    ],
    correctAnswer: 1,
    explanation: "`sns.heatmap()` requires 2D tabular numerical data such as a 2D NumPy array or DataFrame / pivot table."
  },
  {
    id: 2,
    question: "Which parameter in `sns.heatmap()` prints the actual numeric values inside each matrix tile?",
    options: [
      "show_text=True",
      "annot=True",
      "values=True",
      "labels=True"
    ],
    correctAnswer: 1,
    explanation: "`annot=True` writes the cell data values on the tiles."
  },
  {
    id: 3,
    question: "What formatting string `fmt` is used to format floating point values to two decimal places in a heatmap?",
    options: [
      "fmt='.2f'",
      "fmt='float2'",
      "fmt='%2d'",
      "fmt='2decimal'"
    ],
    correctAnswer: 0,
    explanation: "`fmt='.2f'` specifies standard 2-decimal-place floating-point formatting."
  },
  {
    id: 4,
    question: "How does `sns.clustermap()` differ from `sns.heatmap()`?",
    options: [
      "It only works with sound audio files",
      "It performs hierarchical clustering to group similar rows and columns together with dendrograms",
      "It cannot display colors",
      "It deletes outlier cells"
    ],
    correctAnswer: 1,
    explanation: "`sns.clustermap()` applies hierarchical clustering and reorders rows/columns to display similarity structures visually."
  }
];

export default questions;
