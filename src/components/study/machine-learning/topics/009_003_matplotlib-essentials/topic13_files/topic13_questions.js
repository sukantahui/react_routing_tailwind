const questions = [
  {
    id: 1,
    question: "In a heavily right-skewed salary distribution, what is the expected relationship between the Mean and Median values on the histogram?",
    options: [
      "Mean > Median (Mean is pulled to the right by high-earning outlier salaries)",
      "Mean < Median",
      "Mean == Median exactly",
      "Median is always zero"
    ],
    correctAnswer: 0,
    explanation: "Extreme positive outliers pull the sensitive arithmetic Mean towards the right tail, whereas the robust Median remains centered near the typical employee salary."
  },
  {
    id: 2,
    question: "Why is an aligned Boxplot placed directly above a Histogram in professional exploratory data analysis (EDA)?",
    options: [
      "It doubles the chart resolution",
      "It provides immediate visual alignment between the IQR/outliers (box) and the multimodal density peaks (histogram) along the shared X-axis",
      "Boxplots are required for 3D printing",
      "Histograms cannot show positive numbers"
    ],
    correctAnswer: 1,
    explanation: "Combining a horizontal boxplot and histogram on a shared X-axis gives a complete picture of quartiles, outliers, and density peaks simultaneously."
  },
  {
    id: 3,
    question: "Which NumPy transformation is standard practice before feeding right-skewed compensation features into a Linear Regression model?",
    options: [
      "np.log1p(x) (computes natural log of 1 + x)",
      "np.square(x)",
      "np.sin(x)",
      "np.cumprod(x)"
    ],
    correctAnswer: 0,
    explanation: "`np.log1p(x)` safely maps right-skewed positive data into a symmetric Gaussian-like distribution while avoiding `log(0)` errors."
  },
  {
    id: 4,
    question: "Which Matplotlib command draws a vertical line denoting the sample Median across the entire vertical span of a histogram?",
    options: [
      "ax.axvline(median_val, color='green')",
      "ax.draw_v(median_val)",
      "plt.vertical_grid(median_val)",
      "ax.plot_col(median_val)"
    ],
    correctAnswer: 0,
    explanation: "`ax.axvline(x)` draws an infinite vertical reference line from the bottom to the top of the Axes."
  }
];

export default questions;
