const questions = [
  {
    id: 1,
    question: "In the shorthand format string 'g--^' passed to `plt.plot()`, what do 'g', '--', and '^' specify?",
    options: [
      "Green color, dashed line style, and triangle-up markers",
      "Gradient fill, double line width, and peak detection",
      "Gray color, dash-dot style, and circle markers",
      "Global scope, dotted style, and diamond markers"
    ],
    correctAnswer: 0,
    explanation: "In Matplotlib format strings, 'g' represents the color green, '--' sets the line style to dashed, and '^' configures triangle-up data markers."
  },
  {
    id: 2,
    question: "Which Matplotlib method is used to shade confidence intervals or variance bands between two curves?",
    options: [
      "ax.shade_range()",
      "ax.fill_between(x, y1, y2, alpha=...)",
      "ax.draw_confidence()",
      "ax.polygon_band()"
    ],
    correctAnswer: 1,
    explanation: "`ax.fill_between(x, y1, y2)` fills the polygon area between curves y1 and y2 along the x-coordinates, commonly used for standard deviation bands."
  },
  {
    id: 3,
    question: "How do you instantiate a secondary Y-axis that shares the same X-axis with the primary subplot?",
    options: [
      "ax2 = ax.duplicate_axis()",
      "ax2 = ax.twinx()",
      "ax2 = plt.secondary_y()",
      "ax2 = ax.split_y()"
    ],
    correctAnswer: 1,
    explanation: "`ax.twinx()` creates a twin Axes sharing the same x-axis but with an independent y-axis on the right."
  },
  {
    id: 4,
    question: "What happens if you pass only a single 1D array `y` to `plt.plot(y)` without providing `x`?",
    options: [
      "It raises a ValueError: missing X data",
      "It automatically generates X as sequential integers `0, 1, ..., len(y) - 1`",
      "It plots a vertical line at x = 0",
      "It treats the array as both X and Y coordinates"
    ],
    correctAnswer: 1,
    explanation: "When only one array is provided, Matplotlib assumes `x = range(len(y))`."
  }
];

export default questions;
