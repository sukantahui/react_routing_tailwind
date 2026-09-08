const topic25_questions = [
  {
    id: 1,
    question: "In Practice Problem 1, what does df.query('Average >= 85 and `Attendance_%` >= 90') do when column names contain special symbols like '%'?",
    options: [
      "Wrapping the column name in backticks (`Attendance_%`) allows Pandas query engine to parse special characters properly",
      "It raises a SyntaxError unless renamed first",
      "It converts Attendance_% to a string",
      "It ignores the attendance filter completely"
    ],
    correctAnswer: "Wrapping the column name in backticks (`Attendance_%`) allows Pandas query engine to parse special characters properly",
    explanation: "In Pandas df.query(), column names containing special characters or spaces must be enclosed in backticks (e.g. `Attendance_%`) to prevent syntax parsing errors."
  },
  {
    id: 2,
    question: "In Problem 2, why is df['Salary'].fillna(df.groupby('Dept')['Salary'].transform('median')) preferred over a for loop over unique departments?",
    options: [
      "transform('median') operates entirely in vectorized Cython, executing 100x faster and preserving index alignment seamlessly",
      "For loops are banned in Python 3.10+",
      "A for loop causes memory leaks in Pandas",
      "transform() converts the column into a dictionary"
    ],
    correctAnswer: "transform('median') operates entirely in vectorized Cython, executing 100x faster and preserving index alignment seamlessly",
    explanation: "groupby().transform() computes and broadcasts the cohort median natively in C/Cython without manual row filtering or slow Python iteration loops."
  },
  {
    id: 3,
    question: "In Problem 3, what happens if fill_value=0 is omitted from pd.pivot_table() for combinations with no sales?",
    options: [
      "Unmatched category cells will display NaN instead of 0",
      "Pandas will delete the entire row",
      "The pivot table will crash with a KeyError",
      "All sales values will be rounded down"
    ],
    correctAnswer: "Unmatched category cells will display NaN instead of 0",
    explanation: "Without fill_value=0, pd.pivot_table leaves missing index-column intersections as floating-point NaN."
  },
  {
    id: 4,
    question: "In Problem 4, which condition finds candidate IDs that exist exclusively in the test submission logs without prior registration?",
    options: [
      "outer_df['_merge'] == 'right_only'",
      "outer_df['_merge'] == 'left_only'",
      "outer_df['CandidateID'].isna()",
      "outer_df.isnull().all(axis=1)"
    ],
    correctAnswer: "outer_df['_merge'] == 'right_only'",
    explanation: "When indicator=True is used in an outer join, rows coming exclusively from the right DataFrame (test submissions) have _merge set to 'right_only'."
  },
  {
    id: 5,
    question: "In Problem 5, why is df.nlargest(3, 'composite_score') computationally superior to df.sort_values('composite_score', ascending=False).head(3)?",
    options: [
      "nlargest uses an O(N log K) min-heap algorithm avoiding full array sorting and reducing memory usage on large datasets",
      "nlargest runs on 50 GPUs concurrently",
      "nlargest ignores negative numbers",
      "sort_values cannot sort descending"
    ],
    correctAnswer: "nlargest uses an O(N log K) min-heap algorithm avoiding full array sorting and reducing memory usage on large datasets",
    explanation: "nlargest uses a heap-based selection algorithm taking O(N log K) time, which is vastly faster than sorting the whole array in O(N log N) when K is much smaller than N."
  }
];

export default topic25_questions;
