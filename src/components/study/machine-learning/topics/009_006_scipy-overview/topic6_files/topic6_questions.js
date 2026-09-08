const questions = [
  {
    id: 1,
    question: "What does the Null Hypothesis (H0) represent in hypothesis testing?",
    options: [
      "The statement that a strong and undeniable correlation exists",
      "The default assumption of no effect, no difference, or no relationship between variables",
      "The hypothesis that the sample size is too small",
      "The machine learning loss function"
    ],
    correctAnswer: 1,
    explanation: "The Null Hypothesis (H0) is the baseline proposition that there is no true difference or effect, and that any observed variance is purely random noise."
  },
  {
    id: 2,
    question: "If a statistical test produces a p-value of 0.012 at a significance level $\\alpha = 0.05$, what is the correct conclusion?",
    options: [
      "Accept H0 because p-value is greater than zero",
      "Reject H0 because p-value (0.012) is less than the significance threshold alpha (0.05)",
      "Retest with another library",
      "Inconclusive because sample size is not specified"
    ],
    correctAnswer: 1,
    explanation: "Because $p < \\alpha$, we reject the null hypothesis and conclude that the observed effect is statistically significant at the 5% level."
  },
  {
    id: 3,
    question: "What is a Type I error in statistical decision making?",
    options: [
      "Rejecting the null hypothesis when it is actually true (False Positive)",
      "Failing to reject the null hypothesis when it is false (False Negative)",
      "Dividing by zero in NumPy",
      "Fitting an overparameterized deep neural net"
    ],
    correctAnswer: 0,
    explanation: "A Type I error occurs when we incorrectly reject a true null hypothesis (detecting an effect that does not actually exist, like a false alarm)."
  }
];

export default questions;
