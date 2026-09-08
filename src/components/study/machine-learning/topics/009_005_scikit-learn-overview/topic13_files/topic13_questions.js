const topic13Questions = [
  {
    id: 1,
    question: "Why is `accuracy_score` often dangerously misleading on highly imbalanced datasets (e.g., 99% healthy patients, 1% cancer patients)?",
    options: [
      "Because Python roundoff errors zero out accuracy values",
      "Because a naive model that predicts 'Healthy' for 100% of cases achieves 99% accuracy while catching 0% of cancer cases",
      "Because Scikit-learn throws an error if accuracy exceeds 95%",
      "Because accuracy cannot be computed for binary outcomes"
    ],
    correctAnswer: 1,
    explanation: "In severely imbalanced scenarios, a dummy baseline model that always predicts the majority class achieves high raw accuracy despite failing completely on the minority target of interest."
  },
  {
    id: 2,
    question: "In a medical tumor diagnosis scenario where missing a malignant cancer case (False Negative) has catastrophic consequences, which metric should be maximized?",
    options: [
      "Precision",
      "Recall (Sensitivity)",
      "Specificity",
      "Accuracy"
    ],
    correctAnswer: 1,
    explanation: "Recall measures $TP / (TP + FN)$. Maximizing Recall minimizes False Negatives ($FN$), ensuring as few cancer cases as possible slip through undetected."
  },
  {
    id: 3,
    question: "What is the mathematical formulation of the F1-Score?",
    options: [
      "Arithmetic mean: (Precision + Recall) / 2",
      "Harmonic mean: 2 * (Precision * Recall) / (Precision + Recall)",
      "Geometric mean: sqrt(Precision * Recall)",
      "Absolute difference: |Precision - Recall|"
    ],
    correctAnswer: 1,
    explanation: "The F1-score is the harmonic mean of Precision and Recall, which penalizes extreme imbalances between the two metrics much more heavily than a simple arithmetic average."
  },
  {
    id: 4,
    question: "In `classification_report`, how does `macro avg` differ from `weighted avg`?",
    options: [
      "Macro average takes the simple unweighted arithmetic mean across all classes (treating rare classes with equal importance), whereas weighted average weights each class by its support",
      "Macro average only includes binary classes, whereas weighted includes multiclass",
      "Weighted average only computes Precision, while macro computes Recall",
      "Macro average ignores True Positives"
    ],
    correctAnswer: 0,
    explanation: "`macro avg` treats all classes equally regardless of sample counts, making it great for detecting poor performance on minority classes. `weighted avg` weights each class by its frequency (support)."
  }
];

export default topic13Questions;
