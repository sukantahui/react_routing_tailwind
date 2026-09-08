const questions = [
  {
    id: 1,
    question: "Which SciPy distribution method computes cumulative probability $P(X \\le x)$ up to a given threshold $x$?",
    options: [
      "dist.pdf(x)",
      "dist.cdf(x)",
      "dist.ppf(x)",
      "dist.rvs(x)"
    ],
    correctAnswer: 1,
    explanation: "`dist.cdf(x)` calculates the Cumulative Distribution Function, which is the integral of the probability density function from negative infinity up to `x`."
  },
  {
    id: 2,
    question: "What does the Percent Point Function (`dist.ppf(q)`) return?",
    options: [
      "The value of x such that P(X <= x) = q (the inverse of CDF)",
      "The highest peak of the probability curve",
      "The variance of the distribution",
      "A random sample of size q"
    ],
    correctAnswer: 0,
    explanation: "`ppf(q)` is the inverse CDF or quantile function. For example, `norm.ppf(0.50)` returns the median (0.0 for standard normal)."
  },
  {
    id: 3,
    question: "In `scipy.stats`, what parameters correspond to the mean ($\mu$) and standard deviation ($\sigma$) in continuous distributions?",
    options: [
      "`loc` and `scale`",
      "`mean` and `std`",
      "`center` and `spread`",
      "`alpha` and `beta`"
    ],
    correctAnswer: 0,
    explanation: "SciPy uses standardized parameter names across all continuous distributions: `loc` for the location parameter (mean/shift) and `scale` for the scale parameter (standard deviation/width)."
  }
];

export default questions;
