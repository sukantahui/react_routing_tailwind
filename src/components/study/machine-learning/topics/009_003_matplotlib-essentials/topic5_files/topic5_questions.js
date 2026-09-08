const questions = [
  {
    id: 1,
    question: "When `density=True` is passed to `ax.hist()`, what does the sum of the areas of all histogram bins equal?",
    options: [
      "Total number of samples N",
      "100.0 (percentage)",
      "1.0 (valid probability distribution)",
      "Maximum bin height"
    ],
    correctAnswer: 2,
    explanation: "Setting `density=True` scales the bin heights such that the integral (sum of bin height * bin width) across all bins equals exactly 1.0."
  },
  {
    id: 2,
    question: "Which automated binning method is least sensitive to extreme outliers when analyzing skewed machine learning features?",
    options: [
      "bins='fd' (Freedman-Diaconis based on Interquartile Range)",
      "bins='sturges'",
      "bins=10",
      "bins='sqrt'"
    ],
    correctAnswer: 0,
    explanation: "Freedman-Diaconis (`bins='fd'`) calculates bin width using the Interquartile Range (IQR), making it resilient to extreme outliers."
  },
  {
    id: 3,
    question: "What is returned by the `plt.hist()` function call?",
    options: [
      "Only the Figure object",
      "A 3-element tuple: `(counts_or_densities, bin_edges, patches)`",
      "A Pandas DataFrame containing summary statistics",
      "A dictionary containing mean and standard deviation"
    ],
    correctAnswer: 1,
    explanation: "`plt.hist()` returns a tuple `(n, bins, patches)` where `n` is array of bin counts/densities, `bins` is array of bin edges, and `patches` is the list of Rectangle Artists."
  },
  {
    id: 4,
    question: "How do you plot an empirical Cumulative Distribution Function (CDF) directly in Matplotlib?",
    options: [
      "ax.hist(data, cumulative=True, density=True)",
      "ax.plot_cdf(data)",
      "ax.hist(data, running_sum=True)",
      "ax.cdf_transform(data)"
    ],
    correctAnswer: 0,
    explanation: "Passing `cumulative=True` and `density=True` to `ax.hist()` calculates the empirical CDF where the final bin reaches 1.0 (100% of data)."
  }
];

export default questions;
