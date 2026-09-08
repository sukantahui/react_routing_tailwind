const topic17Questions = [
  {
    id: 1,
    question: "In an end-to-end production pipeline with `ColumnTransformer`, what is the benefit of setting `handle_unknown='ignore'` in `OneHotEncoder`?",
    options: [
      "It allows training on missing values without imputation",
      "It prevents crashes when novel categorical values appear in real-world test inputs by encoding them as all-zero dummy vectors",
      "It automatically converts text to lowercase",
      "It eliminates the need for StandardScaler"
    ],
    correctAnswer: 1,
    explanation: "`handle_unknown='ignore'` ensures that if an unseen category (e.g. a new city 'Naihati') is submitted in production, the pipeline outputs zeros across all dummy columns rather than throwing an exception."
  },
  {
    id: 2,
    question: "When evaluating multiple candidate classification algorithms (e.g., Logistic Regression vs Random Forest vs KNN), how should they be benchmarked?",
    options: [
      "By training all of them on 100% of the dataset without splitting",
      "By comparing cross-validated metrics (e.g. 5-Fold Stratified CV Mean & Std Dev) using identical preprocessed pipelines",
      "By selecting whichever algorithm executes fastest in milliseconds",
      "By testing on arbitrary unstratified random subsets"
    ],
    correctAnswer: 1,
    explanation: "Fair benchmarking requires wrapping each algorithm in the same preprocessing pipeline and evaluating them across identical stratified cross-validation folds to compare mean performance and stability (standard deviation)."
  },
  {
    id: 3,
    question: "Why should `SimpleImputer` and `StandardScaler` be placed together in a numeric sub-pipeline inside `ColumnTransformer`?",
    options: [
      "Because StandardScaler cannot process missing `NaN` values directly without prior imputation",
      "Because ColumnTransformer only accepts exactly two transformers",
      "Because SimpleImputer changes column names",
      "Because StandardScaler requires integers"
    ],
    correctAnswer: 0,
    explanation: "StandardScaler calculates arithmetic mean and standard deviation. If missing `NaN` values are present, it will propagate `NaN`s or raise a ValueError. Imputation must precede scaling."
  },
  {
    id: 4,
    question: "What is the recommended method to persist an end-to-end Scikit-learn Pipeline for web API deployment?",
    options: [
      "Saving weights in a text file using JSON serialization",
      "Exporting to a binary pickle/joblib file using `joblib.dump(pipeline, 'model.joblib')`",
      "Writing SQL INSERT statements for all coefficients",
      "Copy-pasting array coefficients into JavaScript constants"
    ],
    correctAnswer: 1,
    explanation: "`joblib.dump()` serializes the entire pipeline structure—including all transformers, imputer statistics, encoder vocabularies, and model coefficients—into a single reloadable binary file."
  }
];

export default topic17Questions;
