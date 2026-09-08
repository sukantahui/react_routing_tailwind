const questions = [
  {
    id: 1,
    question: "If a DataFrame has a column named 'shape', why does accessing it as `df.shape` fail to return the column data Series?",
    options: [
      "Because `df.shape` is a built-in DataFrame attribute that returns a tuple of (n_rows, n_cols), which shadows the column name.",
      "Because 'shape' is a forbidden column name in Pandas.",
      "Because dot notation only works on numeric data.",
      "Because Pandas requires uppercase column names."
    ],
    correctAnswer: 0,
    explanation: "Built-in DataFrame methods and attributes (like `shape`, `count`, `values`, `index`) take precedence over column names when using dot notation. You must use `df['shape']`."
  },
  {
    id: 2,
    question: "How can you select all numerical columns (int64, float64) from a DataFrame `df` containing 50 mixed columns to pass into a Scikit-Learn scaler?",
    options: [
      "`df.select_dtypes(include='number')` or `df.select_dtypes(include=['int64', 'float64'])`",
      "`df.get_numbers()`",
      "`df.filter(dtype='numeric')`",
      "`df.numeric_columns()`"
    ],
    correctAnswer: 0,
    explanation: "`df.select_dtypes(include='number')` automatically subsets all integer and floating-point columns without manual column name listing."
  },
  {
    id: 3,
    question: "What is the return type of `df[['Age', 'Salary']]` versus `df['Salary']`?",
    options: [
      "`df[['Age', 'Salary']]` returns a 2D DataFrame, while `df['Salary']` returns a 1D Series.",
      "Both return 2D DataFrames.",
      "Both return 1D Series.",
      "`df[['Age', 'Salary']]` returns a Python list."
    ],
    correctAnswer: 0,
    explanation: "Passing a list of column names returns a 2D DataFrame subset. Passing a single string key returns a 1D Series."
  },
  {
    id: 4,
    question: "Which Pandas method allows selecting columns matching a specific regular expression pattern (e.g. all columns ending in `_Score`)?",
    options: [
      "`df.filter(regex=r'_Score$', axis=1)`",
      "`df.match('_Score')`",
      "`df.find_columns('_Score')`",
      "`df.search('_Score')`"
    ],
    correctAnswer: 0,
    explanation: "`df.filter(regex=...)` filters column labels along `axis=1` according to regular expression pattern rules."
  },
  {
    id: 5,
    question: "Why does `target_col = 'Price'; df.target_col` raise an AttributeError in Python?",
    options: [
      "Because dot notation searches for a literal column named `'target_col'`, rather than evaluating the variable's value `'Price'`. Use `df[target_col]` instead.",
      "Because variable names cannot start with lowercase 't'.",
      "Because 'Price' is a reserved keyword in Pandas.",
      "Because Pandas does not support variables."
    ],
    correctAnswer: 0,
    explanation: "Python dot notation cannot resolve variable names dynamically. To access a column using a variable containing the column name string, you must use bracket notation: `df[target_col]`."
  }
];

export default questions;
