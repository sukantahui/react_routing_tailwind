const topic3Questions = [
  {
    id: 1,
    question: "In Scikit-learn, what is the meaning of a trailing underscore in an attribute name (e.g., `model.coef_`, `scaler.mean_`)?",
    options: [
      "It marks the variable as private and hidden from the user",
      "It represents a learned parameter calculated from training data during .fit()",
      "It indicates a temporary variable that will be deleted after garbage collection",
      "It denotes a user-supplied hyperparameter passed into __init__()"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn follows a strict convention where parameters learned from training data during `.fit()` are named with a single trailing underscore (e.g. `coef_`, `intercept_`, `classes_`). Hyperparameters passed during instantiation do not have trailing underscores."
  },
  {
    id: 2,
    question: "What error is raised if you attempt to access `model.predict()` or `model.coef_` on an estimator before calling `.fit()`?",
    options: [
      "AttributeError",
      "sklearn.exceptions.NotFittedError",
      "ValueError: Empty Model",
      "IndexError"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn raises `sklearn.exceptions.NotFittedError` (which is a subclass of ValueError and AttributeError) if an operation requiring a fitted model is invoked prior to calling `.fit()`."
  },
  {
    id: 3,
    question: "Why should custom estimators inherit from `sklearn.base.BaseEstimator`?",
    options: [
      "To automatically compile Python code into C++ binaries for speed",
      "To obtain automatic implementations of `get_params()` and `set_params()` for compatibility with GridSearchCV and Pipelines",
      "To enforce strict GPU hardware acceleration",
      "To prevent Scikit-learn from copying training data"
    ],
    correctAnswer: 1,
    explanation: "Inheriting from `BaseEstimator` equips the custom class with standard parameter inspection tools (`get_params()` and `set_params()`), enabling seamless integration into GridSearchCV, cross_val_score, and Pipelines."
  },
  {
    id: 4,
    question: "Which of the following is true regarding hyperparameters in Scikit-learn estimator classes?",
    options: [
      "They must be estimated from dataset distributions during `.fit()`",
      "They should be passed as explicit keyword arguments in `__init__()` with sensible default values",
      "They must be configured via environment variables",
      "They are stored in private attributes prefixed with double underscores `__`"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn guidelines specify that all hyperparameters must be explicitly accepted in `__init__()` as keyword arguments with default values, without using `*args` or `**kwargs`."
  }
];

export default topic3Questions;
