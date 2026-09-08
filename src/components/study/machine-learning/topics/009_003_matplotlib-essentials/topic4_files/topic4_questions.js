const questions = [
  {
    id: 1,
    question: "Which parameter in `ax.bar()` enables creating stacked bar charts by placing a series on top of another?",
    options: [
      "stack_on",
      "bottom",
      "offset_y",
      "layer"
    ],
    correctAnswer: 1,
    explanation: "The `bottom` keyword argument in `ax.bar(x, height, bottom=previous_series)` specifies the baseline y-coordinate where the new bar begins."
  },
  {
    id: 2,
    question: "When plotting horizontal bar charts with `ax.barh()`, which parameter specifies the error bar uncertainties?",
    options: [
      "yerr",
      "xerr",
      "h_error",
      "uncertainty"
    ],
    correctAnswer: 1,
    explanation: "In `ax.barh()`, values extend horizontally along the X-axis, so errors are horizontal along the X-axis and specified via `xerr`."
  },
  {
    id: 3,
    question: "What is the recommended modern method in Matplotlib (3.4+) to automatically place value labels on top of bar charts?",
    options: [
      "ax.annotate_bars()",
      "ax.bar_label(bars_container, fmt='%.2f')",
      "plt.show_bar_values()",
      "ax.text_on_bars()"
    ],
    correctAnswer: 1,
    explanation: "`ax.bar_label(container, fmt='%.2f', padding=3)` is the built-in helper introduced in Matplotlib 3.4+ that automatically computes center/top coordinates for each bar."
  },
  {
    id: 4,
    question: "Why are horizontal bar charts (`plt.barh()`) often preferred for Tree Model Feature Importance rankings?",
    options: [
      "They consume 50% less RAM than vertical charts",
      "They allow long feature names (e.g., 'Annual_Household_Income') to be read horizontally without awkward 90-degree rotations",
      "They automatically normalize feature weights between 0 and 1",
      "They only work with Scikit-learn outputs"
    ],
    correctAnswer: 1,
    explanation: "Horizontal bar charts provide ample vertical space for readable feature names along the Y-axis without requiring rotated labels."
  }
];

export default questions;
