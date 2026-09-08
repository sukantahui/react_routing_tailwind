const questions = [
  {
    id: 1,
    question: "In the classic procedural call `plt.subplot(3, 2, 4)`, what is the row and column position of the subplot?",
    options: [
      "Row 2, Column 2 (2nd row, 2nd column)",
      "Row 3, Column 2",
      "Row 1, Column 4",
      "Row 2, Column 1"
    ],
    correctAnswer: 0,
    explanation: "In a 3-row by 2-column grid, index 1=R1C1, index 2=R1C2, index 3=R2C1, and index 4=R2C2 (Row 2, Column 2)."
  },
  {
    id: 2,
    question: "Which Matplotlib layout engine allows creating asymmetric subplots where a 'hero' plot spans across multiple rows or columns?",
    options: [
      "matplotlib.gridspec.GridSpec / fig.add_gridspec()",
      "plt.canvas_slice()",
      "plt.mesh_subplots()",
      "ax.span_table()"
    ],
    correctAnswer: 0,
    explanation: "`GridSpec` allows slicing grid cells across multiple rows and columns (e.g., `gs[0, :]` for full width, `gs[1:, 0]` for column span)."
  },
  {
    id: 3,
    question: "How do you add an inset magnification box and automatically draw bounding connecting lines to the magnified region in Matplotlib?",
    options: [
      "ax.inset_axes([x, y, w, h]) followed by ax.indicate_inset_zoom(axins)",
      "plt.magnify()",
      "ax.zoom_window()",
      "fig.add_microscope()"
    ],
    correctAnswer: 0,
    explanation: "`ax.inset_axes()` instantiates the embedded child Axes and `ax.indicate_inset_zoom(axins)` draws the connector lines and box outline."
  },
  {
    id: 4,
    question: "How does subplot indexing in `plt.subplot()` differ from NumPy array indexing in `plt.subplots()`?",
    options: [
      "`plt.subplot()` is 1-indexed (1 to N), whereas `plt.subplots()` returns a 0-indexed NumPy ndarray (axs[0, 0])",
      "`plt.subplot()` uses letters while `plt.subplots()` uses numbers",
      "`plt.subplot()` is only for 3D plots",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "`plt.subplot(nrows, ncols, index)` is 1-indexed following MATLAB conventions, whereas `plt.subplots()` returns standard 0-indexed NumPy arrays."
  }
];

export default questions;
