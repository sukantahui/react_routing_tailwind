const questions = [
  {
    id: 1,
    question: "Which of the following is NOT one of the 5 built-in style presets in Seaborn?",
    options: [
      "darkgrid",
      "whitegrid",
      "neon_cyberpunk",
      "ticks"
    ],
    correctAnswer: 2,
    explanation: "The 5 built-in Seaborn styles are 'darkgrid', 'whitegrid', 'dark', 'white', and 'ticks'."
  },
  {
    id: 2,
    question: "Which plotting context in `sns.set_theme(context=...)` scales up fonts and lines the most for large presentation projection?",
    options: [
      "paper",
      "notebook",
      "poster",
      "thumbnail"
    ],
    correctAnswer: 2,
    explanation: "'poster' has the highest base scaling multiplier (followed by 'talk', 'notebook', and 'paper')."
  },
  {
    id: 3,
    question: "What does the `sns.despine()` helper function accomplish?",
    options: [
      "It deletes outlier data points",
      "It removes the top and right enclosing axis spines from the plot",
      "It turns the background completely transparent",
      "It flips the X and Y axes"
    ],
    correctAnswer: 1,
    explanation: "`sns.despine()` strips away unnecessary top and right axis spine borders for a cleaner aesthetic."
  },
  {
    id: 4,
    question: "Which palette in Seaborn is specifically curated to ensure high readability for colorblind individuals?",
    options: [
      "colorblind",
      "spectral_raw",
      "mono_black",
      "rainbow"
    ],
    correctAnswer: 0,
    explanation: "Seaborn provides the 'colorblind' palette specifically optimized to be distinguishable across color vision deficiencies."
  }
];

export default questions;
