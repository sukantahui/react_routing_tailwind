const questions = [
  {
    id: 1,
    question: "How does Seaborn handle `hue` when the assigned column contains continuous floating-point numbers instead of text strings?",
    options: [
      "It throws a TypeError",
      "It automatically generates a continuous color gradient scale (e.g. viridis/flare) with a gradient legend",
      "It ignores the hue completely",
      "It rounds every number to zero"
    ],
    correctAnswer: 1,
    explanation: "When given numeric continuous data, Seaborn maps a sequential color gradient rather than discrete categorical swatches."
  },
  {
    id: 2,
    question: "In `sns.barplot()` or `sns.boxplot()`, what effect does adding `hue='category'` produce by default?",
    options: [
      "It creates 3D depth",
      "It automatically dodges (splits side-by-side) the bars or boxes for each primary X category",
      "It combines all bars into a single bar",
      "It converts the plot into a pie chart"
    ],
    correctAnswer: 1,
    explanation: "In categorical plots, `hue` causes automatic dodging, rendering side-by-side sub-bars for each category."
  },
  {
    id: 3,
    question: "How can you specify exact custom hex colors for individual hue categories in Seaborn?",
    options: [
      "Pass a dictionary mapping category names to hex colors via `palette={'CatA': '#ff0000', 'CatB': '#00ff00'}`",
      "Pass colors as a comma separated string in the title",
      "Set plt.color() for every point manually",
      "You cannot use custom colors in Seaborn"
    ],
    correctAnswer: 0,
    explanation: "Seaborn's `palette` parameter accepts a Python dictionary explicitly mapping each category label to a specific color hex code."
  },
  {
    id: 4,
    question: "Which parameter controls the sorting order of hue groups in the legend and chart?",
    options: [
      "sort_hue=True",
      "hue_order=['GroupA', 'GroupB']",
      "order_by='hue'",
      "legend_sort=True"
    ],
    correctAnswer: 1,
    explanation: "`hue_order` explicitly specifies the sequence of hue categories."
  }
];

export default questions;
