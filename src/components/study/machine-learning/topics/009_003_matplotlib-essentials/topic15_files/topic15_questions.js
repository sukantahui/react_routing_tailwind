const questions = [
  {
    id: 1,
    question: "When creating a dual-axis plot with `ax2 = ax1.twinx()`, how can you compile lines from BOTH axes into a single consolidated legend box?",
    options: [
      "Combine handle lists: `lines = l1 + l2 + l3` and pass `ax1.legend(lines, [l.get_label() for l in lines])`",
      "Matplotlib automatically combines them with `plt.legend()`",
      "Call `ax2.merge_legend(ax1)`",
      "Set `legend_scope='global'`"
    ],
    correctAnswer: 0,
    explanation: "Because `ax1` and `ax2` are independent Axes, extracting the Line2D handles `l1 + l2 + l3` and their labels allows rendering a unified single legend."
  },
  {
    id: 2,
    question: "In Practice Problem 3, how is a 2D confusion matrix heatmap plotted using core Matplotlib without requiring Seaborn?",
    options: [
      "`ax.imshow(cm, cmap='Blues')` accompanied by nested text loops `ax.text(j, i, ...)`",
      "`plt.matrix_plot(cm)`",
      "`ax.scatter_matrix(cm)`",
      "`plt.heat(cm)`"
    ],
    correctAnswer: 0,
    explanation: "`ax.imshow()` renders a 2D array/matrix as an image heatmap, and looping over cell indices with `ax.text()` annotates count values inside."
  },
  {
    id: 3,
    question: "In Practice Problem 1, which NumPy function identified the exact index of the minimum validation loss for early stopping?",
    options: [
      "np.argmin(val_loss)",
      "np.min_index(val_loss)",
      "np.find_minimum(val_loss)",
      "np.locate(val_loss)"
    ],
    correctAnswer: 0,
    explanation: "`np.argmin()` returns the integer index corresponding to the minimum numerical value in a 1D array."
  },
  {
    id: 4,
    question: "In Practice Problem 2, why is `cmap='plasma_r'` (reversed plasma) used when mapping vehicle age?",
    options: [
      "The `_r` suffix reverses the colormap so newer cars receive brighter high-contrast hues and older cars receive darker shades",
      "It makes the image render in monochrome",
      "It converts 2D to 3D",
      "It is required by OpenCV"
    ],
    correctAnswer: 0,
    explanation: "Appending `_r` to any built-in Matplotlib colormap name reverses its gradient sequence."
  }
];

export default questions;
