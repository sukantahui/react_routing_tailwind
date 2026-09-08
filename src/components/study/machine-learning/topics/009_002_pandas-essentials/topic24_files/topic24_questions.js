const topic24_questions = [
  {
    id: 1,
    question: "Why is it best practice to encapsulate the entire data cleaning and feature engineering workflow inside a reusable Python function?",
    options: [
      "To ensure identical, reproducible preprocessing is applied to both the training data and incoming future inference batches",
      "To bypass Python memory management",
      "To avoid importing Pandas",
      "To delete rows automatically"
    ],
    correctAnswer: "To ensure identical, reproducible preprocessing is applied to both the training data and incoming future inference batches",
    explanation: "Encapsulating ETL logic in a reusable function ensures that the exact same feature engineering transformations, column scalings, and imputation steps are applied consistently across training, testing, and production scoring."
  },
  {
    id: 2,
    question: "Which of the following creates a boolean indicator 'is_eligible' where 'percentage' >= 85 AND 'attendance' >= 90 using NumPy?",
    options: [
      "np.where((df['percentage'] >= 85) & (df['attendance'] >= 90), 1, 0)",
      "if df['percentage'] >= 85 and df['attendance'] >= 90: return 1",
      "df.where(percentage >= 85 and attendance >= 90)",
      "np.select_if(df['percentage'] >= 85, df['attendance'] >= 90)"
    ],
    correctAnswer: "np.where((df['percentage'] >= 85) & (df['attendance'] >= 90), 1, 0)",
    explanation: "np.where(condition, value_if_true, value_if_false) with bitwise '&' and parenthesized terms evaluates the condition vectorized across all rows in C performance."
  },
  {
    id: 3,
    question: "How do you filter a DataFrame using df.query() to keep rows with 'percentage' >= 80 and 'department' == 'CSE'?",
    options: [
      "df.query(\"percentage >= 80 and department == 'CSE'\")",
      "df.query(percentage >= 80 && department == 'CSE')",
      "df.where(\"percentage >= 80 & department == CSE\")",
      "df.filter(percentage >= 80, department == 'CSE')"
    ],
    correctAnswer: "df.query(\"percentage >= 80 and department == 'CSE'\")",
    explanation: "df.query() parses expressive boolean query strings directly, matching column names and filtering matching records."
  },
  {
    id: 4,
    question: "How do you export a cleaned DataFrame directly as a compressed GZIP CSV file?",
    options: [
      "df.to_csv('cleaned.csv.gz', index=False, compression='gzip')",
      "df.to_gzip('cleaned.csv')",
      "df.export(compress=True)",
      "df.zip('cleaned.csv')"
    ],
    correctAnswer: "df.to_csv('cleaned.csv.gz', index=False, compression='gzip')",
    explanation: "Specifying compression='gzip' (or naming the target file with a .gz extension) instructs df.to_csv() to stream-compress the CSV output on-the-fly."
  },
  {
    id: 5,
    question: "What is the consequence of omitting .reset_index(drop=True) after filtering rows from a DataFrame?",
    options: [
      "The filtered DataFrame retains non-contiguous index numbers (e.g. 0, 1, 4, 7), which can cause index-lookup bugs downstream",
      "The DataFrame loses all column headers",
      "All numeric values become NaN",
      "The DataFrame becomes read-only"
    ],
    correctAnswer: "The filtered DataFrame retains non-contiguous index numbers (e.g. 0, 1, 4, 7), which can cause index-lookup bugs downstream",
    explanation: "Filtering subsets rows while preserving their original row index positions; calling reset_index(drop=True) establishes a clean 0..N continuous index."
  }
];

export default topic24_questions;
