const questions = [
  {
    id: 1,
    question: "Why is `fliersize=0` recommended when overlaying `sns.stripplot()` on top of `sns.boxplot()`?",
    options: [
      "To avoid plotting outlier points twice (once as a boxplot flier and once as a stripplot dot)",
      "Because fliersize crashed Python in older versions",
      "To remove all outliers from the DataFrame entirely",
      "To force all points to be identical in color"
    ],
    correctAnswer: 0,
    explanation: "Setting `fliersize=0` on the boxplot hides its built-in outlier markers so they are not drawn twice when `sns.stripplot()` overlays all raw points."
  },
  {
    id: 2,
    question: "What parameter in `sns.stripplot()` spreads overlapping points horizontally to make density visible?",
    options: [
      "spread=True",
      "jitter=0.2 (or jitter=True)",
      "dodge_points=True",
      "horizontal_noise=True"
    ],
    correctAnswer: 1,
    explanation: "`jitter` adds subtle random horizontal displacement to separate crowded points."
  },
  {
    id: 3,
    question: "In a boxplot of marks, what does the solid line located inside the colored rectangular box indicate?",
    options: [
      "The Mode",
      "The 50th Percentile (Median)",
      "The Standard Deviation",
      "The Maximum mark"
    ],
    correctAnswer: 1,
    explanation: "The interior line inside a boxplot represents the sample Median (Q2 / 50th percentile)."
  },
  {
    id: 4,
    question: "How do you pass a custom dictionary mapping 'Male' to blue and 'Female' to pink in `sns.boxplot()`?",
    options: [
      "palette={'Male': '#38bdf8', 'Female': '#f472b6'}",
      "colors='Male:blue, Female:pink'",
      "hue_color={'Male': 'blue', 'Female': 'pink'}",
      "map_gender={'Male': '#38bdf8'}"
    ],
    correctAnswer: 0,
    explanation: "The `palette` argument accepts a dictionary where keys are category strings and values are hex color codes."
  }
];

export default questions;
