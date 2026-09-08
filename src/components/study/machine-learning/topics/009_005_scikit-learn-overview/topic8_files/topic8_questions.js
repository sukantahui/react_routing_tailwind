const topic8Questions = [
  {
    id: 1,
    question: "Despite containing 'Regression' in its name, what kind of machine learning problem does `LogisticRegression` solve?",
    options: [
      "Continuous numerical value estimation",
      "Classification (discrete categorical class labels)",
      "Unsupervised dimensionality reduction",
      "Hierarchical agglomerative clustering"
    ],
    correctAnswer: 1,
    explanation: "LogisticRegression is a classification algorithm that models the probability of discrete categorical classes by wrapping linear outputs into the sigmoid/softmax function."
  },
  {
    id: 2,
    question: "What mathematical function is used in binary Logistic Regression to transform linear scores into bounded probabilities in [0, 1]?",
    options: [
      "Rectified Linear Unit (ReLU)",
      "Sigmoid / Logistic function: 1 / (1 + e^-z)",
      "Hyperbolic Tangent (Tanh)",
      "Softplus function"
    ],
    correctAnswer: 1,
    explanation: "The sigmoid (logistic) function maps any real-valued number $z$ into the open interval $(0, 1)$, interpreting the result as the posterior probability $P(y=1|X)$."
  },
  {
    id: 3,
    question: "What is the key practical difference between Ridge ($L_2$) and Lasso ($L_1$) regression regarding learned coefficients?",
    options: [
      "Ridge forces uninformative coefficients to exactly zero, whereas Lasso does not",
      "Lasso can force unimportant feature coefficients to exactly zero (performing automatic feature selection), whereas Ridge only shrinks them",
      "Ridge only works on binary classification problems",
      "Lasso requires GPU hardware acceleration"
    ],
    correctAnswer: 1,
    explanation: "Lasso ($L_1$) regularization applies a sharp diamond constraint that zeroes out insignificant coefficients completely, providing built-in feature selection. Ridge ($L_2$) shrinks coefficients smoothly but keeps them non-zero."
  },
  {
    id: 4,
    question: "In Scikit-learn's `LogisticRegression`, what does a smaller value of the hyperparameter `C` signify?",
    options: [
      "Weaker regularization (higher model complexity)",
      "Stronger regularization (simpler model, stronger penalty on large weights)",
      "Faster learning rate",
      "Fewer maximum iterations"
    ],
    correctAnswer: 1,
    explanation: "`C` is the inverse of regularization strength ($C = 1 / \\lambda$). Therefore, smaller $C$ values enforce stronger regularization, heavily penalizing large weights and preventing overfitting."
  }
];

export default topic8Questions;
