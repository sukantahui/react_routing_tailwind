const questions = [
  {
    id: 1,
    question: "When plotting 2D Principal Component Analysis (PCA) or K-Means clusters, why is `ax.set_aspect('equal')` critical?",
    options: [
      "It prevents Matplotlib from crashing on large arrays",
      "It ensures 1 unit on the X-axis equals 1 unit on the Y-axis, preserving true Euclidean distances and preventing circular clusters from appearing stretched into ellipses",
      "It normalizes values between 0 and 1 automatically",
      "It removes the gridlines"
    ],
    correctAnswer: 1,
    explanation: "`ax.set_aspect('equal')` preserves true geometric distances so visual cluster separation accurately reflects mathematical Euclidean distance."
  },
  {
    id: 2,
    question: "Which scale type should be used when data spans multiple orders of magnitude but contains both negative numbers and exact zeros?",
    options: [
      "ax.set_yscale('log')",
      "ax.set_yscale('symlog', linthresh=0.01)",
      "ax.set_yscale('linear')",
      "ax.set_yscale('exponential')"
    ],
    correctAnswer: 1,
    explanation: "Standard `log` scale is undefined for zero and negative values. `symlog` (symmetrical log) uses a linear mapping within `[-linthresh, +linthresh]` and logarithmic mapping beyond."
  },
  {
    id: 3,
    question: "How can you invert the vertical Y-axis so that the origin (0) or highest rank is at the top of the chart?",
    options: [
      "ax.flip_vertical()",
      "ax.invert_yaxis()",
      "ax.reverse(axis='y')",
      "ax.set_direction('down')"
    ],
    correctAnswer: 1,
    explanation: "`ax.invert_yaxis()` inverts the direction of the Y-axis numbers, commonly used for image arrays, ranking boards, and depth profiles."
  },
  {
    id: 4,
    question: "How do you strip all default whitespace margin padding around the plot line to clamp axes tightly to data boundaries?",
    options: [
      "ax.set_margins(0, 0) or ax.autoscale(tight=True)",
      "ax.tight_padding()",
      "plt.no_margins()",
      "ax.clamp_edges()"
    ],
    correctAnswer: 0,
    explanation: "`ax.margins(0)` or `ax.autoscale(tight=True)` sets the relative margin padding to zero, fixing axis limits to the exact data minimum and maximum."
  }
];

export default questions;
