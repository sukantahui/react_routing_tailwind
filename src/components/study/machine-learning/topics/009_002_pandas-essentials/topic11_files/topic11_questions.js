const topic11_questions = [
  {
    id: 1,
    question: "What is the key functional difference between df.isna() and df.isnull() in Pandas?",
    options: [
      "There is no difference; isnull() is an exact alias of isna()",
      "isna() only checks for strings, while isnull() checks for numbers",
      "isnull() removes the missing values, while isna() returns a boolean mask",
      "isna() only works in Pandas 2.0 and later"
    ],
    correctAnswer: "There is no difference; isnull() is an exact alias of isna()",
    explanation: "In Pandas, df.isnull() and df.isna() are identical function aliases pointing to the exact same underlying C/Cython implementation."
  },
  {
    id: 2,
    question: "How do you count the number of missing (NaN) values in each column of a DataFrame?",
    options: [
      "df.isna().sum()",
      "df.count_nulls()",
      "df.len(nan)",
      "df.where(nan).size()"
    ],
    correctAnswer: "df.isna().sum()",
    explanation: "df.isna() generates a DataFrame of boolean values (True for NaN, False otherwise). Calling .sum() on this boolean DataFrame adds up True (1) per column along axis 0."
  },
  {
    id: 3,
    question: "Which dropna() call will only drop rows where BOTH 'Math' AND 'Science' values are missing?",
    options: [
      "df.dropna(subset=['Math', 'Science'], how='all')",
      "df.dropna(subset=['Math', 'Science'], how='any')",
      "df.dropna(columns=['Math', 'Science'])",
      "df.dropna(thresh=2)"
    ],
    correctAnswer: "df.dropna(subset=['Math', 'Science'], how='all')",
    explanation: "Specifying subset=['Math', 'Science'] restricts the drop check to those two columns, and how='all' ensures that rows are only dropped if ALL values in that subset are NaN."
  },
  {
    id: 4,
    question: "When should you prefer imputing with MEDIAN instead of MEAN for missing numeric features?",
    options: [
      "When the distribution is skewed or contains extreme outliers (e.g., salaries or house prices)",
      "When the data is strictly text / categorical",
      "When there are zero missing values",
      "When the column has only binary (0 or 1) values"
    ],
    correctAnswer: "When the distribution is skewed or contains extreme outliers (e.g., salaries or house prices)",
    explanation: "The median is robust against extreme outliers and skewness, whereas the arithmetic mean can be heavily distorted by high or low outliers in salary and price distributions."
  },
  {
    id: 5,
    question: "What does df.ffill() do when encountering missing values?",
    options: [
      "Propagates the last valid (non-null) observation forward to fill subsequent NaNs",
      "Fills all NaNs with the string 'FORWARD'",
      "Fills NaNs with the global minimum value of the DataFrame",
      "Deletes all rows following the first NaN"
    ],
    correctAnswer: "Propagates the last valid (non-null) observation forward to fill subsequent NaNs",
    explanation: "Forward fill (.ffill() or .fillna(method='ffill')) propagates the most recent valid observation forward down the column, which is essential in time series and sequential logging datasets."
  }
];

export default topic11_questions;
