const topic12_questions = [
  {
    id: 1,
    question: "How do you rename only the column 'dob' to 'DateOfBirth' while leaving all other columns unchanged?",
    options: [
      "df.rename(columns={'dob': 'DateOfBirth'})",
      "df.columns['dob'] = 'DateOfBirth'",
      "df.replace_column('dob', 'DateOfBirth')",
      "df.set_name('dob', 'DateOfBirth')"
    ],
    correctAnswer: "df.rename(columns={'dob': 'DateOfBirth'})",
    explanation: "df.rename(columns={'old': 'new'}) uses dictionary mapping to selectively rename only the specified columns while leaving all other headers untouched."
  },
  {
    id: 2,
    question: "What happens if you assign a list to df.columns that has fewer elements than the total number of columns in the DataFrame?",
    options: [
      "Pandas raises a ValueError: Length mismatch",
      "Pandas fills the remaining column names with None",
      "Pandas deletes the columns that were not provided in the list",
      "Pandas creates blank columns"
    ],
    correctAnswer: "Pandas raises a ValueError: Length mismatch",
    explanation: "Assigning directly to df.columns requires an iterable whose length exactly matches the number of columns in the DataFrame, otherwise a ValueError is raised."
  },
  {
    id: 3,
    question: "Which of the following lines standardizes all column names to lowercase and replaces spaces with underscores?",
    options: [
      "df.columns = df.columns.str.lower().str.replace(' ', '_')",
      "df.rename_all(case='lower', space='_')",
      "df.columns.snake_case()",
      "df.format_headers(lower=True, underscore=True)"
    ],
    correctAnswer: "df.columns = df.columns.str.lower().str.replace(' ', '_')",
    explanation: "df.columns is a Pandas Index object that exposes the .str accessor, allowing vectorized string transformations such as .lower() and .replace(' ', '_')."
  },
  {
    id: 4,
    question: "What is the primary advantage of using df.set_axis(['A', 'B', 'C'], axis=1) over direct assignment df.columns = ['A', 'B', 'C']?",
    options: [
      "set_axis() returns a DataFrame copy, making it suitable for method chaining pipelines",
      "set_axis() runs 10x faster because it compiles to C",
      "set_axis() automatically converts data types to integers",
      "set_axis() only changes row labels, never columns"
    ],
    correctAnswer: "set_axis() returns a DataFrame copy, making it suitable for method chaining pipelines",
    explanation: "df.set_axis() is a functional method that returns a new DataFrame, making it compatible with fluent method chaining (e.g. df.set_axis(...).sort_values(...).head())."
  },
  {
    id: 5,
    question: "Which method easily prefixes all column names with 'Dept_' prior to performing a merge?",
    options: [
      "df.add_prefix('Dept_')",
      "df.prepend_all('Dept_')",
      "df.columns += 'Dept_'",
      "df.attach_prefix('Dept_')"
    ],
    correctAnswer: "df.add_prefix('Dept_')",
    explanation: "df.add_prefix('prefix_string') prepends the specified prefix to all column labels in the DataFrame, helping prevent column name collisions during joins."
  }
];

export default topic12_questions;
