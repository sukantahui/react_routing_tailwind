const questions = [
  {
    id: 1,
    question: "Which of the following is NOT one of the 6 core pillars of Scikit-learn?",
    options: [
      "Classification",
      "Clustering",
      "Deep Convolutional GPU Neural Network Architectures (like PyTorch)",
      "Dimensionality Reduction"
    ],
    correctAnswer: 2,
    explanation: "Scikit-learn is designed for classical machine learning and tabular algorithms. Deep GPU neural networks are handled by PyTorch or TensorFlow."
  },
  {
    id: 2,
    question: "In Scikit-learn, what universal method is called on an Estimator to learn/train on dataset (X, y)?",
    options: [
      "estimator.train(X, y)",
      "estimator.fit(X, y)",
      "estimator.learn(X, y)",
      "estimator.optimize(X, y)"
    ],
    correctAnswer: 1,
    explanation: "`estimator.fit(X, y)` is the universal Scikit-learn method to estimate parameters and train models."
  },
  {
    id: 3,
    question: "How are learned attributes (internal model weights/parameters computed during `.fit()`) named in Scikit-learn?",
    options: [
      "With a leading dollar sign ($coef)",
      "With a trailing underscore (e.g. coef_, intercept_, classes_)",
      "In ALL_CAPS",
      "Inside a separate JSON file"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn convention dictates that all attributes estimated from data during `fit()` end with a trailing underscore (e.g., `model.coef_`)."
  },
  {
    id: 4,
    question: "What is the primary difference between a Transformer and a Predictor in Scikit-learn?",
    options: [
      "A Transformer has `.transform()` to modify features, while a Predictor has `.predict()` to generate target label inferences",
      "A Transformer only works with text strings",
      "A Predictor cannot use `.fit()`",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Transformers (like StandardScaler, PCA) implement `.fit()` and `.transform()` to preprocess feature matrices, while Predictors implement `.fit()` and `.predict()`."
  }
];

export default questions;
