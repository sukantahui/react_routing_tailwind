const topic5Questions = [
  {
    id: 1,
    question: "What are the sample mean and standard deviation of a dataset transformed by `StandardScaler` (assuming population ddof=0 calculation)?",
    options: [
      "Mean = 0, Standard Deviation = 1",
      "Mean = 1, Standard Deviation = 0",
      "Mean = 0.5, Standard Deviation = 0.5",
      "Mean = Min value, Standard Deviation = Max value"
    ],
    correctAnswer: 0,
    explanation: "StandardScaler subtracts the sample mean and divides by standard deviation, guaranteeing that the transformed dataset has a mean of 0 and a standard deviation of 1."
  },
  {
    id: 2,
    question: "What happens if an unseen test sample has a feature value greater than `data_max_` when transformed using an already fitted `MinMaxScaler(feature_range=(0, 1))` without clipping?",
    options: [
      "MinMaxScaler raises an OutOfBoundsError exception",
      "The transformed value will be strictly clamped to 1.0",
      "The transformed value will exceed 1.0 proportionally according to the formula",
      "The scaler automatically re-fits itself to include the new maximum"
    ],
    correctAnswer: 2,
    explanation: "By default, MinMaxScaler applies the linear formula `(x - min) / (max - min)`. If `x > max`, the resulting transformed value will be strictly greater than 1.0 (unless `clip=True` is enabled in modern scikit-learn versions)."
  },
  {
    id: 3,
    question: "Which learned attribute of `StandardScaler` holds the standard deviation of each feature?",
    options: [
      "scaler.std_",
      "scaler.scale_",
      "scaler.deviation_",
      "scaler.sigma_"
    ],
    correctAnswer: 1,
    explanation: "In Scikit-learn's StandardScaler, the per-feature standard deviation (scaling factor) is stored in the `scale_` attribute, while the variance is in `var_` and the mean is in `mean_`."
  },
  {
    id: 4,
    question: "If a regression model was trained on scaled target labels `y_scaled = scaler.fit_transform(y)`, how should the model's test predictions `y_pred` be converted back to real-world units?",
    options: [
      "scaler.fit_transform(y_pred)",
      "scaler.inverse_transform(y_pred)",
      "scaler.transform(y_pred)",
      "scaler.denormalize(y_pred)"
    ],
    correctAnswer: 1,
    explanation: "Calling `scaler.inverse_transform(y_pred)` inverts the mathematical transformation (multiplying by `scale_` and adding `mean_`), restoring values to their original physical units."
  }
];

export default topic5Questions;
