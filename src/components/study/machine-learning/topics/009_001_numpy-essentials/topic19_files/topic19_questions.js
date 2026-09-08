const questions = [
  {
    id: 1,
    question: "In Min-Max feature scaling, what happens if a dataset feature column has identical values for every single sample (e.g. constant value = 5.0)?",
    options: [
      "X_max - X_min evaluates to 0.0, causing a ZeroDivisionError / NaN in floating-point math unless stabilized.",
      "NumPy automatically replaces all values with 1.0.",
      "The array is converted into a 1D vector.",
      "The mean of the column becomes infinity."
    ],
    correctAnswer: 0,
    explanation: "When X_max == X_min, the denominator (X_max - X_min) equals zero. Robust scalers replace zero spans with 1.0 to prevent NaN division errors."
  },
  {
    id: 2,
    question: "What are the theoretical mean and standard deviation of any feature column standardized via Z-Score: `Z = (X - mu) / sigma`?",
    options: [
      "Mean = 1.0, Std = 0.0",
      "Mean = 0.0, Std = 1.0",
      "Mean = 0.5, Std = 0.5",
      "Mean = min(X), Std = max(X)"
    ],
    correctAnswer: 1,
    explanation: "Standardization (Z-score) shifts the distribution center to Mean = 0.0 and rescales variance such that Standard Deviation = 1.0."
  },
  {
    id: 3,
    question: "Why must you NEVER compute `mu` and `sigma` across the combined Train + Test dataset before training a model?",
    options: [
      "Because NumPy arrays cannot store more than 100 rows.",
      "Because doing so causes 'Data Leakage', exposing future test set distribution information to the model during training.",
      "Because Z-Score is only valid for odd numbers of samples.",
      "Because it triples memory usage."
    ],
    correctAnswer: 1,
    explanation: "Fitting scalers on test data constitutes Data Leakage. Test sets must remain unseen until evaluation. Scaler parameters (mu, sigma) must be learned solely from training data."
  },
  {
    id: 4,
    question: "When performing row-wise L2 normalization on an embedding matrix of shape (N, D), why is `keepdims=True` essential in `np.linalg.norm(X, axis=1, keepdims=True)`?",
    options: [
      "To prevent NumPy from sorting the embeddings.",
      "To preserve the 2D shape (N, 1), allowing seamless broadcasting against the (N, D) matrix during division.",
      "To ensure that values remain integers.",
      "To calculate the matrix determinant."
    ],
    correctAnswer: 1,
    explanation: "Without keepdims=True, the norm vector has shape (N,), which causes a shape mismatch when dividing against (N, D). With keepdims=True, the shape is (N, 1), which broadcasts correctly across all D columns."
  },
  {
    id: 5,
    question: "Which scaling technique is preferred when features contain large outliers that would compress standard values into an extremely tight interval?",
    options: [
      "Min-Max Normalization",
      "Z-Score Standardization (or RobustScaler with median and IQR)",
      "Multiplying all values by 100",
      "Rounding all values to integers"
    ],
    correctAnswer: 1,
    explanation: "Min-Max scaling is highly sensitive to extreme outliers because X_min or X_max gets skewed. Z-Score standardization (or RobustScaler) is much more resilient because it standardizes around the central distribution."
  }
];

export default questions;
