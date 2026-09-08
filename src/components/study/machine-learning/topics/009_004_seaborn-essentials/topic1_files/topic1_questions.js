const questions = [
  {
    id: 1,
    question: "What is the standard terminal command to install Seaborn using pip?",
    options: [
      "pip install py-seaborn",
      "pip install seaborn",
      "pip install statistical-seaborn",
      "pip download sns"
    ],
    correctAnswer: 1,
    explanation: "`pip install seaborn` is the standard command to install Seaborn from PyPI."
  },
  {
    id: 2,
    question: "What is the universal alias convention for importing Seaborn in Python?",
    options: [
      "import seaborn as sb",
      "import seaborn as sea",
      "import seaborn as sns",
      "import seaborn as sn"
    ],
    correctAnswer: 2,
    explanation: "`import seaborn as sns` is the universally accepted community standard convention."
  },
  {
    id: 3,
    question: "Which modern function replaced the older deprecated `sns.set()` to configure global aesthetics?",
    options: [
      "sns.apply_config()",
      "sns.set_theme()",
      "sns.configure_all()",
      "sns.init_styles()"
    ],
    correctAnswer: 1,
    explanation: "`sns.set_theme()` is the modern API function introduced to configure global themes, styles, and color palettes."
  },
  {
    id: 4,
    question: "Which of the following is NOT an automatic core dependency of Seaborn?",
    options: [
      "pandas",
      "matplotlib",
      "scipy",
      "django"
    ],
    correctAnswer: 3,
    explanation: "Django is a web framework; Seaborn depends on NumPy, SciPy, Pandas, and Matplotlib."
  }
];

export default questions;
