const topic15_questions = [
  {
    id: 1,
    question: "Which of the following computes both the mean and maximum of 'Salary' for each department in a single call?",
    options: [
      "df.groupby('Department')['Salary'].agg(['mean', 'max'])",
      "df.groupby('Department')['Salary'].calculate(['mean', 'max'])",
      "df.groupby('Department').reduce('Salary', ['mean', 'max'])",
      "df.groupby('Department').both('Salary', 'mean', 'max')"
    ],
    correctAnswer: "df.groupby('Department')['Salary'].agg(['mean', 'max'])",
    explanation: "Passing a list of function names to .agg(['mean', 'max']) calculates all specified metrics simultaneously for that Series."
  },
  {
    id: 2,
    question: "What is the key advantage of using Named Aggregation (e.g. Total_Sales=('Sales', 'sum')) over passing a dictionary to .agg()?",
    options: [
      "It generates a clean single-level column index directly, avoiding hierarchical MultiIndex headers",
      "It forces the CPU to use 100% GPU acceleration",
      "It automatically sorts the output in reverse alphabetical order",
      "It deletes missing values from the dataset before calculation"
    ],
    correctAnswer: "It generates a clean single-level column index directly, avoiding hierarchical MultiIndex headers",
    explanation: "Named Aggregation allows developers to assign custom output column names directly during aggregation, completely avoiding messy MultiIndex column headers."
  },
  {
    id: 3,
    question: "Why should you prefer using built-in string names like .agg('mean') instead of .agg(lambda x: np.mean(x))?",
    options: [
      "String names trigger highly optimized Cython/C implementations inside Pandas for massive speedups",
      "Lambda functions are not supported in Python 3.10+",
      "String names automatically plot graphs in the terminal",
      "Lambda functions convert all numbers to strings"
    ],
    correctAnswer: "String names trigger highly optimized Cython/C implementations inside Pandas for massive speedups",
    explanation: "Pandas recognizes string keywords like 'mean', 'sum', 'std', and routes them to specialized C/Cython algorithms, bypassing slow Python interpreter loops."
  },
  {
    id: 4,
    question: "How do you calculate the 90th percentile of 'Revenue' per region in Pandas?",
    options: [
      "df.groupby('Region')['Revenue'].quantile(0.90)",
      "df.groupby('Region')['Revenue'].percentile(90)",
      "df.groupby('Region')['Revenue'].p90()",
      "df.groupby('Region')['Revenue'].top(0.90)"
    ],
    correctAnswer: "df.groupby('Region')['Revenue'].quantile(0.90)",
    explanation: "The .quantile(q) method computes the specified quantile where q is between 0.0 and 1.0 (e.g., 0.90 for the 90th percentile)."
  },
  {
    id: 5,
    question: "In Pandas 2.0+, what happens if you call df.mean() on a DataFrame with numeric and string columns without setting numeric_only=True?",
    options: [
      "It may raise a TypeError because arithmetic mean cannot be calculated on string/object columns",
      "It converts string columns into integer ASCII values",
      "It returns 0 for string columns",
      "It crashes your operating system"
    ],
    correctAnswer: "It may raise a TypeError because arithmetic mean cannot be calculated on string/object columns",
    explanation: "Pandas 2.0+ deprecated automatic silent dropping of non-numeric columns during reductions. You must explicitly specify numeric_only=True or select numeric columns beforehand."
  }
];

export default topic15_questions;
