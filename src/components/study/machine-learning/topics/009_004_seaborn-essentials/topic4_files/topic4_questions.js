const questions = [
  {
    id: 1,
    question: "What statistical value does `sns.barplot()` compute for the height of the bars by default?",
    options: [
      "The Maximum value",
      "The Arithmetic Mean",
      "The Mode",
      "The Variance"
    ],
    correctAnswer: 1,
    explanation: "By default, `sns.barplot()` computes the arithmetic mean for each categorical group."
  },
  {
    id: 2,
    question: "In a Seaborn boxplot (`sns.boxplot()`), how are outlier points defined and displayed?",
    options: [
      "Any point beyond Q1 - 1.5*IQR or Q3 + 1.5*IQR is drawn as an individual flier dot",
      "Points with negative values only",
      "The top 5% of all values regardless of distribution",
      "They are deleted automatically before plotting"
    ],
    correctAnswer: 0,
    explanation: "Standard Tukey boxplots display points outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR] as individual outlier markers."
  },
  {
    id: 3,
    question: "What advantage does `sns.violinplot()` provide over a traditional `sns.boxplot()`?",
    options: [
      "It renders faster in 3D WebGL",
      "It displays the underlying probability density distribution (KDE), exposing multimodal peaks",
      "It only works on string text data",
      "It converts categorical data to time series"
    ],
    correctAnswer: 1,
    explanation: "`sns.violinplot()` plots a mirrored KDE density shape, showing whether data within a box is bimodal or uniformly distributed."
  },
  {
    id: 4,
    question: "When using `sns.violinplot()` with a binary categorical hue (e.g. sex='M'/'F'), which parameter joins both classes into a single split violin?",
    options: [
      "join=True",
      "split=True",
      "merge_halves=True",
      "dual=True"
    ],
    correctAnswer: 1,
    explanation: "`split=True` divides each violin vertically, drawing one category on the left and the other on the right for compact comparison."
  }
];

export default questions;
