const questions = [
  {
    id: 1,
    question: "What is the official package name to install Scikit-learn via pip from PyPI?",
    options: [
      "pip install scikit-learn",
      "pip install py-ml-learn",
      "pip install sklearn-engine",
      "pip install statistical-learn"
    ],
    correctAnswer: 0,
    explanation: "`pip install scikit-learn` is the official package name on PyPI (although you import it in Python as `import sklearn`)."
  },
  {
    id: 2,
    question: "Why should you explicitly import submodules (e.g. `from sklearn.tree import DecisionTreeClassifier`) instead of just `import sklearn`?",
    options: [
      "Because Scikit-learn uses lazy submodule loading and does not eagerly load heavy algorithm subpackages upon `import sklearn`",
      "Because Python will delete the code",
      "Because DecisionTreeClassifier is a C++ executable",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "Scikit-learn does not import all its algorithms eagerly into the top-level namespace to keep initialization fast and light."
  },
  {
    id: 3,
    question: "Which dependency package handles parallel multiprocessing execution (e.g., `n_jobs=-1`) in Scikit-learn?",
    options: [
      "joblib",
      "pygame",
      "django",
      "flask"
    ],
    correctAnswer: 0,
    explanation: "`joblib` is Scikit-learn's lightweight pipelining and multi-core CPU parallelization backend."
  },
  {
    id: 4,
    question: "Which utility function prints full system information and dependency versions for debugging and reproducible ML environments?",
    options: [
      "sklearn.show_versions()",
      "sklearn.debug_info()",
      "sklearn.print_all()",
      "sklearn.system_dump()"
    ],
    correctAnswer: 0,
    explanation: "`sklearn.show_versions()` outputs an exhaustive system diagnostic table including Python, BLAS, NumPy, SciPy, and compiler versions."
  }
];

export default questions;
