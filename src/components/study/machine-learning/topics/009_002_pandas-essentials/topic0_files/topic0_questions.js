const questions = [
  {
    id: 1,
    question: "What is the primary difference in data storage capability between a NumPy ndarray and a Pandas DataFrame?",
    options: [
      "NumPy requires all elements to be of the exact same homogeneous data type, whereas a Pandas DataFrame can hold different data types across different columns (heterogeneous).",
      "NumPy only stores text, while Pandas only stores numbers.",
      "Pandas cannot store integers.",
      "NumPy arrays are 2D only, while Pandas DataFrames are 1D only."
    ],
    correctAnswer: 0,
    explanation: "NumPy arrays are homogeneous (all elements share the same dtype like float64 or int32) for fast SIMD memory layout. Pandas DataFrames are heterogeneous tabular structures where each column can have its own data type (e.g., strings in column A, floats in column B, booleans in column C)."
  },
  {
    id: 2,
    question: "What are the two primary foundational data structures in Pandas?",
    options: [
      "Series (1D labeled) and DataFrame (2D labeled).",
      "List and Tuple.",
      "Array and Matrix.",
      "Tensor and Scalar."
    ],
    correctAnswer: 0,
    explanation: "The two core building blocks of Pandas are Series (a 1D labeled homogeneous array) and DataFrame (a 2D tabular structure containing multiple Series sharing a common row index)."
  },
  {
    id: 3,
    question: "How does Pandas integrate into a typical Machine Learning model training pipeline?",
    options: [
      "Pandas replaces Python's CPU with GPU acceleration.",
      "Pandas is used for data ingestion, cleaning, feature transformation, and exploratory analysis, after which clean features X and targets y are extracted into NumPy arrays for model training.",
      "Pandas is only used to render 3D graphics.",
      "Pandas directly computes neural network backpropagation gradients."
    ],
    correctAnswer: 1,
    explanation: "In machine learning workflows, Pandas handles the ETL (Extract, Transform, Load) and EDA (Exploratory Data Analysis) stages. Once features are cleaned and encoded, `.to_numpy()` or `.values` extracts raw numeric matrices for Scikit-Learn or PyTorch."
  },
  {
    id: 4,
    question: "Which of the following is true regarding row indices in a Pandas Series or DataFrame?",
    options: [
      "Indices must always be integers starting from 0.",
      "Indices can be custom string labels, dates/timestamps, or custom identifiers, enabling descriptive lookups like `series['Debangshu']`.",
      "Pandas does not support indexing.",
      "Indices are re-randomized every time a script runs."
    ],
    correctAnswer: 1,
    explanation: "Unlike basic Python lists or raw NumPy arrays, Pandas allows explicit labels for row indices (e.g., student names, dates, customer IDs), allowing intuitive label-based access."
  },
  {
    id: 5,
    question: "What underlying library powers the mathematical performance and memory management of Pandas Series and DataFrames?",
    options: [
      "Django",
      "NumPy",
      "Flask",
      "PyQt"
    ],
    correctAnswer: 1,
    explanation: "Pandas is built directly on top of NumPy. Each column in a Pandas DataFrame is stored internally as a contiguous 1D NumPy ndarray (or extension array in modern Pandas)."
  }
];

export default questions;
