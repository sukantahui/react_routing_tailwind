const topic11Questions = [
  {
    id: 1,
    question: "Why is the Naive Bayes algorithm referred to as 'naive'?",
    options: [
      "Because it does not utilize any mathematical equations",
      "Because it naively assumes that all input features are conditionally independent given the class label",
      "Because it requires all training samples to have equal target values",
      "Because it ignores training data and makes random guesses"
    ],
    correctAnswer: 1,
    explanation: "Naive Bayes makes the strong (often simplistic/naive) assumption that each feature is statistically independent of every other feature given the class label, allowing joint likelihoods to be computed simply as the product of individual marginal likelihoods."
  },
  {
    id: 2,
    question: "Which parameters does `GaussianNB` learn and store from the training data for each class and feature?",
    options: [
      "Linear regression slope and bias",
      "The class-conditional Mean (`theta_`) and Variance (`var_`) of the Gaussian distribution",
      "K-means cluster centroids",
      "Decision tree split thresholds"
    ],
    correctAnswer: 1,
    explanation: "For each class and feature, GaussianNB estimates the normal distribution parameters: the mean (`theta_`) and the variance (`var_`), along with class prior probabilities (`class_prior_`)."
  },
  {
    id: 3,
    question: "Which Naive Bayes classifier is specifically intended for discrete word count vectors (e.g. TF-IDF or Bag-of-Words in spam filtering)?",
    options: [
      "GaussianNB",
      "MultinomialNB",
      "BernoulliNB",
      "ContinuousNB"
    ],
    correctAnswer: 1,
    explanation: "MultinomialNB is designed for multinomially distributed data, making it standard for word count frequencies and document term frequency representations."
  },
  {
    id: 4,
    question: "What method in `GaussianNB` enables streaming / out-of-core online learning without loading the entire dataset into memory at once?",
    options: [
      ".fit_stream()",
      ".partial_fit()",
      ".online_train()",
      ".step_update()"
    ],
    correctAnswer: 1,
    explanation: "`partial_fit(X_batch, y_batch, classes=...)` incrementally updates the running count, mean, and variance arrays across successive batches of data without retraining from scratch."
  }
];

export default topic11Questions;
