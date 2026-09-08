const questions = [
  {
    id: 1,
    question: "Why should raw strings (`r'...'`) with dollar signs be used when rendering mathematical formulas in Matplotlib titles and labels?",
    options: [
      "To prevent Python from interpreting backslashes as escape characters before Matplotlib's built-in TeX engine parses them",
      "To force GPU acceleration",
      "To convert numbers to currency automatically",
      "To compress memory footprint"
    ],
    correctAnswer: 0,
    explanation: "Prefixing with `r` creates a Python raw string so backslashes (like `\\alpha` or `\\frac`) are passed literally to Matplotlib's mathtext LaTeX renderer without syntax errors."
  },
  {
    id: 2,
    question: "Which argument in `ax.legend()` allows positioning the legend outside the subplot boundaries?",
    options: [
      "outside=True",
      "bbox_to_anchor=(x, y)",
      "detach_canvas=True",
      "external_coords=(x, y)"
    ],
    correctAnswer: 1,
    explanation: "`bbox_to_anchor=(x, y)` anchors the legend box relative to the Axes or Figure coordinate space (e.g. `(1.02, 1)` places it immediately to the right of the plot area)."
  },
  {
    id: 3,
    question: "What happens if you call `ax.legend()` twice in sequence on the same Axes without using `ax.add_artist()`?",
    options: [
      "Both legends appear side-by-side automatically",
      "The second legend call completely replaces/destroys the first legend",
      "An Exception is raised",
      "A nested sub-legend is constructed"
    ],
    correctAnswer: 1,
    explanation: "Calling `ax.legend()` overwrites the current Axes legend attribute. You must manually register the first legend with `ax.add_artist(leg1)` before creating the second."
  },
  {
    id: 4,
    question: "How can you arrange 6 legend labels into 3 columns side-by-side?",
    options: [
      "ax.legend(ncols=3) or ax.legend(ncol=3)",
      "ax.legend(columns=3)",
      "ax.legend(grid=(2, 3))",
      "ax.legend(split=3)"
    ],
    correctAnswer: 0,
    explanation: "`ncol=3` (or `ncols=3` in Matplotlib 3.6+) organizes legend entries across 3 horizontal columns."
  }
];

export default questions;
