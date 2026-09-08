const topic21_questions = [
  {
    id: 1,
    question: "Why is imputing missing salaries with the global mean generally bad practice in tabular machine learning?",
    options: [
      "Salaries are right-skewed with high earners inflating the mean, causing underpaid roles to be severely over-imputed",
      "The mean cannot be computed on floating-point numbers",
      "Global mean deletion removes 90% of rows automatically",
      "Scikit-learn crashes when encountering mean values"
    ],
    correctAnswer: "Salaries are right-skewed with high earners inflating the mean, causing underpaid roles to be severely over-imputed",
    explanation: "Salary distributions are almost always positively skewed. High executive and senior developer salaries artificially inflate the global mean, leading to inaccurate imputations for junior and administrative roles."
  },
  {
    id: 2,
    question: "How do you impute missing 'Salary' values with the median salary of each student's specific 'Department'?",
    options: [
      "df['Salary'] = df['Salary'].fillna(df.groupby('Department')['Salary'].transform('median'))",
      "df['Salary'].fillna(df['Salary'].mean(), by='Department')",
      "df.groupby('Department').impute_median('Salary')",
      "df['Salary'] = df.median(group='Department')"
    ],
    correctAnswer: "df['Salary'] = df['Salary'].fillna(df.groupby('Department')['Salary'].transform('median'))",
    explanation: "groupby().transform('median') broadcasts the cohort median back across every original row, which fillna() uses to cleanly impute missing entries per department."
  },
  {
    id: 3,
    question: "What is the primary benefit of creating a binary indicator column like df['Salary_Was_Missing'] = df['Salary'].isna().astype(int)?",
    options: [
      "It allows ML algorithms to learn whether the absence of data itself contains predictive signal",
      "It prevents Pandas from using memory",
      "It replaces NaN with string characters",
      "It deletes duplicate columns"
    ],
    correctAnswer: "It allows ML algorithms to learn whether the absence of data itself contains predictive signal",
    explanation: "Adding a missing indicator flag preserves the statistical signal of missingness, enabling machine learning models to differentiate between true observed values and imputed approximations."
  },
  {
    id: 4,
    question: "To prevent Data Leakage during train-test splitting, where should group salary medians be calculated?",
    options: [
      "Solely on the Training set (X_train), and then applied to both X_train and X_test",
      "Solely on the Test set (X_test)",
      "Across the combined whole dataset before splitting",
      "On randomly generated numbers"
    ],
    correctAnswer: "Solely on the Training set (X_train), and then applied to both X_train and X_test",
    explanation: "To avoid data leakage, all imputation parameters (mean, median, mode) must be estimated exclusively from the training partition and then applied blindly to the test partition."
  },
  {
    id: 5,
    question: "What is the difference between df.dropna(subset=['Salary']) and df.fillna({'Salary': 50000})?",
    options: [
      "dropna() permanently deletes rows with missing salary, while fillna() replaces NaNs with 50,000 without deleting any rows",
      "dropna() is 100x slower than fillna()",
      "fillna() converts the DataFrame to a NumPy array",
      "dropna() only works on CSV files"
    ],
    correctAnswer: "dropna() permanently deletes rows with missing salary, while fillna() replaces NaNs with 50,000 without deleting any rows",
    explanation: "dropna(subset=['Salary']) discards all rows containing null salaries, whereas fillna() substitutes a replacement value without losing sample size."
  }
];

export default topic21_questions;
