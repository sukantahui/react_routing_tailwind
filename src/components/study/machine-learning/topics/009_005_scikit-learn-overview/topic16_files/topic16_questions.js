const topic16Questions = [
  {
    id: 1,
    question: "What requirement must all intermediate steps (all steps except the last) in a Scikit-learn `Pipeline` satisfy?",
    options: [
      "They must be supervised classification algorithms",
      "They must be Transformers implementing both `.fit()` and `.transform()` methods",
      "They must have a .score() method",
      "They must be compiled with Cython"
    ],
    correctAnswer: 1,
    explanation: "Every intermediate step in a Pipeline must be a transformer that can take input data, fit parameters, and transform it to pass along to the next step in the pipeline sequence."
  },
  {
    id: 2,
    question: "What is the primary architectural reason to encapsulate preprocessing and model fitting inside a `Pipeline` during Cross-Validation?",
    options: [
      "It reduces dataset memory footprint by 50%",
      "It completely prevents data leakage by ensuring preprocessing statistics (e.g. mean, variance) are learned solely from the training folds and never from the validation fold",
      "It forces the CPU to run multithreaded jobs",
      "It automatically exports models to Docker containers"
    ],
    correctAnswer: 1,
    explanation: "If you scale or impute the whole dataset before cross-validation, test fold statistics leak into training. A Pipeline guarantees that `.fit_transform()` is rerun strictly on each training fold independently."
  },
  {
    id: 3,
    question: "When tuning hyperparameters of a pipeline step named `'clf'` inside `GridSearchCV`, what syntax is used to specify parameters (e.g. parameter `C`)?",
    options: [
      "'clf.C': [0.1, 1, 10]",
      "'clf__C': [0.1, 1, 10]",
      "'clf->C': [0.1, 1, 10]",
      "'C_of_clf': [0.1, 1, 10]"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn uses the double underscore convention `<step_name>__<parameter_name>` (e.g. `'clf__C'` or `'scaler__with_mean'`) to route hyperparameter candidates directly to specific pipeline steps."
  },
  {
    id: 4,
    question: "How does `make_pipeline()` differ from `Pipeline()` constructor?",
    options: [
      "make_pipeline() requires you to explicitly name every step",
      "make_pipeline() automatically generates step names based on the lowercased class names of the provided transformer/estimator instances",
      "make_pipeline() only works for regression problems",
      "make_pipeline() runs faster on GPUs"
    ],
    correctAnswer: 1,
    explanation: "`make_pipeline` is a convenient wrapper that constructs a Pipeline automatically naming each step with its lowercased class name (e.g. `StandardScaler` becomes `'standardscaler'`)."
  }
];

export default topic16Questions;
