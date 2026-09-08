const topic9Questions = [
  {
    id: 1,
    question: "Why is K-Nearest Neighbors often classified as a 'Lazy Learner'?",
    options: [
      "Because it takes days to complete the .fit() step",
      "Because it does not derive an explicit mathematical model during .fit(), postponing computation until .predict() is called",
      "Because it only runs on single-threaded CPUs",
      "Because it randomly skips rows in the dataset"
    ],
    correctAnswer: 1,
    explanation: "KNN is a lazy learning algorithm because it merely stores training instances during the fit phase; all distance calculations and majority voting occur at prediction time."
  },
  {
    id: 2,
    question: "What is the primary risk of selecting an extremely small value of K (e.g., K = 1) in `KNeighborsClassifier`?",
    options: [
      "Severe underfitting and overly smooth boundaries",
      "High sensitivity to noise and individual outliers leading to severe overfitting",
      "Division by zero errors in the distance calculation",
      "Memory leak during model initialization"
    ],
    correctAnswer: 1,
    explanation: "At K=1, the classifier is influenced by every single noisy or mislabeled sample, resulting in jagged, hyper-complex decision boundaries and high variance (overfitting)."
  },
  {
    id: 3,
    question: "Why is feature scaling (e.g. `StandardScaler`) critical before fitting a KNN model?",
    options: [
      "Because unscaled features with large absolute numerical values will overwhelmingly dominate the Euclidean distance calculation",
      "Because KNN only accepts float numbers between 0 and 1",
      "Because Scikit-learn throws a ValueError if features are unscaled",
      "Because scaling speeds up GPU matrix multiplication"
    ],
    correctAnswer: 0,
    explanation: "KNN measures geometric distance. Features with large numerical spans (e.g. Salary in thousands) produce massive squared differences that completely overshadow features with small spans (e.g. Age or GPA)."
  },
  {
    id: 4,
    question: "In `KNeighborsClassifier`, which parameter controls whether closer neighbors have higher voting influence than distant ones?",
    options: [
      "metric='euclidean'",
      "weights='distance'",
      "algorithm='ball_tree'",
      "leaf_size=30"
    ],
    correctAnswer: 1,
    explanation: "Setting `weights='distance'` weights votes by the inverse of their distance to the query point, giving closer neighbors significantly more voting authority than farther ones."
  }
];

export default topic9Questions;
