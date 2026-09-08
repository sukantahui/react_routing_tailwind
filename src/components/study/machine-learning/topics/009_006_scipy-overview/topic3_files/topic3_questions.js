const questions = [
  {
    id: 1,
    question: "What function in `scipy.stats` computes sample size, min/max, mean, variance, skewness, and kurtosis in a single execution?",
    options: [
      "stats.describe()",
      "stats.summary_all()",
      "stats.metrics()",
      "stats.profile()"
    ],
    correctAnswer: 0,
    explanation: "`stats.describe(array)` returns a `DescribeResult` namedtuple containing nobs, minmax, mean, variance, skewness, and kurtosis."
  },
  {
    id: 2,
    question: "How does `stats.trim_mean(data, proportiontocut=0.10)` prevent extreme outlier distortions?",
    options: [
      "By replacing all outliers with zero",
      "By discarding 10% of lowest and 10% of highest values before calculating the arithmetic mean",
      "By rounding all numbers to integers",
      "By computing the standard median instead"
    ],
    correctAnswer: 1,
    explanation: "`stats.trim_mean` removes the specified fraction of extreme scores from each end of the distribution before calculating the mean."
  },
  {
    id: 3,
    question: "In SciPy's default Fisher definition, what is the kurtosis value of a perfect standard normal bell curve?",
    options: [
      "3.0",
      "0.0",
      "1.0",
      "-1.0"
    ],
    correctAnswer: 1,
    explanation: "By default, `scipy.stats.kurtosis` uses Fisher's definition where 3.0 is subtracted from Pearson's kurtosis so that normal distribution equals 0.0 (Mesokurtic)."
  }
];

export default questions;
