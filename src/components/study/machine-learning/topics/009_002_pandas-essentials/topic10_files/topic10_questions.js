const topic10_questions = [
  {
    id: 1,
    question: "Which of the following creates a new column 'Total' by summing 'Math' and 'Science' in a vectorized manner?",
    options: [
      "df['Total'] = df['Math'] + df['Science']",
      "df.append_column('Total', df['Math'] + df['Science'])",
      "for row in df: row['Total'] = row['Math'] + row['Science']",
      "df.add_field('Total', sum(df['Math'], df['Science']))"
    ],
    correctAnswer: "df['Total'] = df['Math'] + df['Science']",
    explanation: "Pandas supports vectorized arithmetic between Series. Directly assigning df['Total'] = df['Math'] + df['Science'] performs element-wise addition across all rows in C-level performance."
  },
  {
    id: 2,
    question: "What is the recommended modern way to drop a column named 'TemporaryID' without modifying the original DataFrame?",
    options: [
      "df_clean = df.drop(columns=['TemporaryID'])",
      "df.delete('TemporaryID', inplace=False)",
      "del df['TemporaryID']",
      "df_clean = df.remove('TemporaryID')"
    ],
    correctAnswer: "df_clean = df.drop(columns=['TemporaryID'])",
    explanation: "df.drop(columns=['...']) is the cleanest and most readable syntax for dropping columns. It returns a new DataFrame copy by default without mutating the original df."
  },
  {
    id: 3,
    question: "If you want to place a new column 'RollNo' at the first position (index 0) of the DataFrame, which method should you use?",
    options: [
      "df.insert(0, 'RollNo', roll_data)",
      "df.push_front('RollNo', roll_data)",
      "df['RollNo', 0] = roll_data",
      "df.prepend('RollNo', roll_data)"
    ],
    correctAnswer: "df.insert(0, 'RollNo', roll_data)",
    explanation: "df.insert(loc, column, value) allows placing a new column at any specific integer location (loc=0 for the very first column), whereas standard bracket assignment df['...'] always appends to the end."
  },
  {
    id: 4,
    question: "What does df.pop('InternalNotes') do?",
    options: [
      "Removes 'InternalNotes' from the DataFrame and returns it as a pd.Series",
      "Hides 'InternalNotes' temporarily during printing",
      "Replaces all values in 'InternalNotes' with NaN",
      "Deletes the entire DataFrame if 'InternalNotes' has missing values"
    ],
    correctAnswer: "Removes 'InternalNotes' from the DataFrame and returns it as a pd.Series",
    explanation: "df.pop(col) modifies the DataFrame in-place by deleting the specified column and returning that extracted column as a Series object."
  },
  {
    id: 5,
    question: "Why is the use of 'inplace=True' increasingly discouraged in modern Pandas best practices?",
    options: [
      "It hinders method chaining, complicates memory management with Copy-on-Write (CoW), and is planned for deprecation",
      "It makes code run 100x slower in all circumstances",
      "It forces the DataFrame to convert all numbers into strings",
      "It deletes all row index labels permanently"
    ],
    correctAnswer: "It hinders method chaining, complicates memory management with Copy-on-Write (CoW), and is planned for deprecation",
    explanation: "inplace=True prevents elegant method chaining pipelines, offers no real performance or memory gains under Pandas 2.0+ Copy-on-Write (CoW), and is slated for removal in future Pandas major versions."
  }
];

export default topic10_questions;
