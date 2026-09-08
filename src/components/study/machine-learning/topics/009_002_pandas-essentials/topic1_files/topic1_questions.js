const questions = [
  {
    id: 1,
    question: "What is the universal, PEP 8 recommended import statement for Pandas in Python?",
    options: [
      "import pandas as pd",
      "from pandas import *",
      "import pandas as p",
      "require('pandas')"
    ],
    correctAnswer: 0,
    explanation: "`import pandas as pd` is the standard community convention across all data science repositories, tutorials, and production ML pipelines."
  },
  {
    id: 2,
    question: "How can you verify the installed version of Pandas in a running Python script or Jupyter Notebook?",
    options: [
      "pd.__version__ or pd.show_versions()",
      "pd.version()",
      "pd.get_info()",
      "pandas.check()"
    ],
    correctAnswer: 0,
    explanation: "`pd.__version__` prints the version string (e.g. '2.2.1'), and `pd.show_versions()` prints an exhaustive diagnostic report of all underlying C-extensions and I/O engines."
  },
  {
    id: 3,
    question: "When working with datasets containing over 50 columns, Pandas by default truncates the display with ellipses (...). How can you configure Pandas to display all columns in your console?",
    options: [
      "pd.set_option('display.max_columns', None)",
      "pd.expand_all_columns()",
      "pd.options.show_everything = True",
      "df.columns.display = 'all'"
    ],
    correctAnswer: 0,
    explanation: "`pd.set_option('display.max_columns', None)` or setting it to a large integer tells Pandas not to truncate columns horizontally during print operations."
  },
  {
    id: 4,
    question: "What additional dependency is required to enable reading and writing modern `.xlsx` Excel files via `pd.read_excel()` and `df.to_excel()`?",
    options: [
      "openpyxl (or xlsxwriter / calamine)",
      "pygame",
      "flask",
      "sqlite3"
    ],
    correctAnswer: 0,
    explanation: "Pandas relies on dedicated Excel parsing engines like `openpyxl` (or `calamine` / `xlsxwriter`) to decode and write `.xlsx` spreadsheet files."
  },
  {
    id: 5,
    question: "Why should `from pandas import *` be avoided in production Python applications?",
    options: [
      "It causes syntax errors in Python 3.",
      "It pollutes the module's global namespace, shadows built-in identifiers, and makes it difficult to trace where functions and classes originate.",
      "It runs 10 times slower than `import pandas as pd`.",
      "It is only allowed inside function definitions."
    ],
    correctAnswer: 1,
    explanation: "Wildcard imports (`from module import *`) pollute namespaces, create subtle naming collision bugs, and violate PEP 8 guidelines."
  }
];

export default questions;
