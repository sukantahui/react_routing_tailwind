const questions = [
  {
    id: 1,
    question: "When should you use `scipy.stats.ttest_rel()` instead of `scipy.stats.ttest_ind()` in Machine Learning?",
    options: [
      "When comparing two completely independent groups of users from different cities",
      "When evaluating two different ML algorithms on the exact same cross-validation test folds (paired observations)",
      "When the dataset is larger than 1,000,000 rows",
      "When features are categorical strings"
    ],
    correctAnswer: 1,
    explanation: "`ttest_rel()` is for paired/related samples, such as evaluating two models tested on identical CV splits."
  },
  {
    id: 2,
    question: "Why is `equal_var=False` recommended when running `scipy.stats.ttest_ind(a, b)`?",
    options: [
      "It disables calculations to run faster",
      "It performs Welch's t-test, which does not assume equal population variance and prevents inflated Type I error rates",
      "It forces both datasets to have zero variance",
      "It converts the test to a Chi-Square test"
    ],
    correctAnswer: 1,
    explanation: "Welch's t-test (`equal_var=False`) is robust and does not assume equal variances between the two groups."
  },
  {
    id: 3,
    question: "What does `scipy.stats.ttest_1samp(sample, popmean=70)` test?",
    options: [
      "Whether the sample mean differs significantly from the hypothesized population mean of 70",
      "Whether the sample size is equal to 70",
      "Whether all values in sample are greater than 70",
      "Whether the standard deviation is 70"
    ],
    correctAnswer: 0,
    explanation: "`ttest_1samp` evaluates the null hypothesis that the true population mean equals the specified scalar `popmean`."
  }
];

export default questions;
