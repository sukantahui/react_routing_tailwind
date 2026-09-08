const questions = [
  {
    id: 1,
    question: "What is returned by calling `fig, axs = plt.subplots(2, 3)`?",
    options: [
      "A Figure object and a single Axes object",
      "A Figure object and a 2D NumPy array of Axes objects of shape (2, 3)",
      "A list of 6 Figure objects",
      "A Figure object and a 1D Python list of 6 tuples"
    ],
    correctAnswer: 1,
    explanation: "`plt.subplots(nrows, ncols)` returns a Figure container and a 2D NumPy ndarray of Axes instances indexed by `axs[row, col]` when both nrows and ncols > 1."
  },
  {
    id: 2,
    question: "What are 'Spines' in a Matplotlib Axes object?",
    options: [
      "The legend bounding box borders",
      "The 4 lines connecting the axis tick marks that delimit the data area (top, bottom, left, right)",
      "The line connecting data points in a line plot",
      "The internal background gridlines"
    ],
    correctAnswer: 1,
    explanation: "Spines are the 4 boundary lines delimiting the data area (`top`, `bottom`, `left`, `right`) which can be hidden or moved to style charts."
  },
  {
    id: 3,
    question: "When placing a text box in the upper right corner of a subplot regardless of the data scale, which coordinate transform should be specified?",
    options: [
      "transform=ax.transData",
      "transform=ax.transAxes with coordinates near (0.95, 0.95)",
      "transform=ax.pixels",
      "transform=plt.globalTransform"
    ],
    correctAnswer: 1,
    explanation: "`ax.transAxes` uses normalized unit coordinates from (0,0) at bottom-left to (1,1) at top-right of the Axes, making it independent of data limits."
  },
  {
    id: 4,
    question: "How do you set a single main title for an entire Figure containing multiple subplots?",
    options: [
      "ax.set_title()",
      "plt.axes_title()",
      "fig.suptitle()",
      "fig.add_header()"
    ],
    correctAnswer: 2,
    explanation: "`fig.suptitle('Global Title')` adds a centralized super-title across the whole Figure above all individual Axes titles."
  }
];

export default questions;
