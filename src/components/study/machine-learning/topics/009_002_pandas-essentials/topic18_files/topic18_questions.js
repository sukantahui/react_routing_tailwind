const topic18_questions = [
  {
    id: 1,
    question: "How do you calculate the percentage distribution (relative frequencies) of categories in a Series named 'Grade'?",
    options: [
      "df['Grade'].value_counts(normalize=True) * 100",
      "df['Grade'].percentages()",
      "df['Grade'].frequency_ratio()",
      "df['Grade'].count_percent()"
    ],
    correctAnswer: "df['Grade'].value_counts(normalize=True) * 100",
    explanation: "Setting normalize=True in value_counts() scales raw frequencies into proportions between 0.0 and 1.0; multiplying by 100 converts them to percentages."
  },
  {
    id: 2,
    question: "What is the key difference between Series.unique() and Series.nunique()?",
    options: [
      "unique() returns an array of distinct values, while nunique() returns the integer count of distinct values",
      "unique() only works on numbers, while nunique() works on strings",
      "nunique() modifies the DataFrame in place",
      "unique() deletes duplicates from the DataFrame permanently"
    ],
    correctAnswer: "unique() returns an array of distinct values, while nunique() returns the integer count of distinct values",
    explanation: "Series.unique() outputs an array containing all unique elements, whereas Series.nunique() computes the scalar integer count of those unique elements."
  },
  {
    id: 3,
    question: "Why should you pass dropna=False to df['Locality'].value_counts(dropna=False) during exploratory data analysis?",
    options: [
      "To see the count of missing (NaN) values alongside valid categories",
      "To prevent Pandas from crashing on empty strings",
      "To force NaN values to be replaced with zero",
      "To sort the output in alphabetical order"
    ],
    correctAnswer: "To see the count of missing (NaN) values alongside valid categories",
    explanation: "By default, value_counts() excludes missing NaN values. Setting dropna=False explicitly includes the NaN count in the frequency table."
  },
  {
    id: 4,
    question: "In machine learning preprocessing, why is df.nunique() used to find columns with nunique() == 1?",
    options: [
      "To detect and drop zero-variance / constant features that provide no predictive power to models",
      "To find primary key columns",
      "To calculate accuracy scores",
      "To convert continuous variables to floats"
    ],
    correctAnswer: "To detect and drop zero-variance / constant features that provide no predictive power to models",
    explanation: "A column with nunique() == 1 has the exact same value for all rows, offering zero variance and zero statistical signal, so it can safely be pruned."
  },
  {
    id: 5,
    question: "What does df['Age'].value_counts(bins=4) do on a numeric column?",
    options: [
      "Divides the range of Age into 4 equal-width intervals and counts the observations in each interval",
      "Randomly samples 4 rows from the DataFrame",
      "Deletes all values that are not multiples of 4",
      "Groups ages into 4 separate DataFrames"
    ],
    correctAnswer: "Divides the range of Age into 4 equal-width intervals and counts the observations in each interval",
    explanation: "Passing bins=N to value_counts() creates N continuous equal-width interval bins and tallies the count of data points falling into each bin."
  }
];

export default topic18_questions;
