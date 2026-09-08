const questions = [
  {
    id: 1,
    question: "Given `s1 = pd.Series([10, 20], index=['A', 'B'])` and `s2 = pd.Series([30, 40], index=['B', 'C'])`, what is the result of `s1 + s2`?",
    options: [
      "A Series with index ['A', 'B', 'C'] and values [NaN, 50.0, NaN]",
      "A Series with values [40, 60]",
      "A Series with only index ['B'] and value 50.0",
      "A ValueError due to mismatched index lengths"
    ],
    correctAnswer: 0,
    explanation: "Pandas automatically performs an outer join on the indices. Since 'A' is only in s1 and 'C' is only in s2, their sums evaluate to NaN. 'B' exists in both, producing 20 + 30 = 50.0."
  },
  {
    id: 2,
    question: "What is the return type difference between `df['Score']` and `df[['Score']]` for a DataFrame `df`?",
    options: [
      "`df['Score']` returns a 1D Pandas Series, while `df[['Score']]` returns a 2D Pandas DataFrame.",
      "Both return identical 1D Pandas Series.",
      "`df['Score']` returns a NumPy array, while `df[['Score']]` returns a list.",
      "`df[['Score']]` modifies the column in place."
    ],
    correctAnswer: 0,
    explanation: "Passing a single string extracts the column as a 1D Series. Passing a list of strings (even with a single element `['Score']`) preserves the 2D DataFrame structure."
  },
  {
    id: 3,
    question: "How can you convert a 1D Pandas Series `s` named 'Revenue' into a single-column 2D DataFrame?",
    options: [
      "s.to_frame()",
      "pd.convert(s)",
      "s.to_matrix()",
      "s.flatten()"
    ],
    correctAnswer: 0,
    explanation: "`s.to_frame()` constructs a 2D DataFrame containing the series data with its name as the column header."
  },
  {
    id: 4,
    question: "What does `df.shape` return for a DataFrame with 100 rows and 5 columns?",
    options: [
      "(100, 5) — a tuple of (n_rows, n_columns)",
      "500",
      "[100, 5]",
      "{'rows': 100, 'cols': 5}"
    ],
    correctAnswer: 0,
    explanation: "`df.shape` returns a Python tuple containing the dimensionality `(number_of_rows, number_of_columns)`."
  },
  {
    id: 5,
    question: "Why does `df.memory_usage(deep=True)` report higher memory consumption than `df.memory_usage(deep=False)` for datasets with text columns?",
    options: [
      "`deep=True` inspects the actual length and contents of Python string objects in memory rather than just counting the memory of 8-byte object memory pointers.",
      "`deep=True` creates duplicate copies of the DataFrame.",
      "`deep=True` compresses the data on disk.",
      "`deep=True` calculates GPU RAM."
    ],
    correctAnswer: 0,
    explanation: "By default (`deep=False`), memory_usage only reports the fixed memory of references/pointers. Setting `deep=True` performs deep introspection of heap-allocated Python string objects."
  }
];

export default questions;
