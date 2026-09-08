const topic10Questions = [
  {
    id: 1,
    question: "Why do Decision Trees NOT require feature scaling (such as StandardScaler or MinMaxScaler)?",
    options: [
      "Because Decision Trees convert all numbers into floating point decimals internally",
      "Because tree splits evaluate one feature at a time based solely on ordering thresholds ($x_i \\le \\theta$), unaffected by monotonic scale shifts",
      "Because Scikit-learn automatically normalizes features inside .fit() without telling the user",
      "Because Decision Trees only accept categorical integer inputs"
    ],
    correctAnswer: 1,
    explanation: "Decision trees partition feature space using axis-aligned orthogonal splits based purely on rank order ($x \\le threshold$). Multiplying or shifting a feature does not alter its threshold ordering."
  },
  {
    id: 2,
    question: "What is the consequence of leaving `max_depth=None` and `min_samples_split=2` on a complex or noisy dataset?",
    options: [
      "The tree will underfit and produce a single root node",
      "The tree will grow until all leaf nodes are pure, resulting in high variance and severe overfitting",
      "The tree will automatically convert into a Logistic Regression model",
      "An InfiniteLoopError will be raised"
    ],
    correctAnswer: 1,
    explanation: "Unconstrained decision trees recursively split until every training leaf contains 100% pure samples or fewer than min_samples_split, memorizing training noise and overfitting heavily."
  },
  {
    id: 3,
    question: "What mathematical property is always true for `tree.feature_importances_` in Scikit-learn?",
    options: [
      "They range from -1.0 to +1.0 and sum to 0.0",
      "They are all non-negative and sum exactly to 1.0",
      "They equal the p-values from a two-tailed t-test",
      "They match the correlation coefficients with the target"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn normalizes feature importances (calculated as Mean Decrease Impurity / Gini decrease) so that each feature importance is non-negative and their total sum across all features equals 1.0."
  },
  {
    id: 4,
    question: "Which splitting criterion in `DecisionTreeClassifier` is computationally faster because it avoids logarithmic calculations?",
    options: [
      "criterion='entropy'",
      "criterion='log_loss'",
      "criterion='gini'",
      "criterion='poisson'"
    ],
    correctAnswer: 2,
    explanation: "Gini impurity calculates $1 - \\sum p_k^2$, requiring only basic arithmetic squares, whereas Entropy/log_loss computes $- \\sum p_k \\log_2(p_k)$, which involves slower logarithmic computations."
  }
];

export default topic10Questions;
