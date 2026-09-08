const topic14_questions = [
  {
    id: 1,
    question: "What are the three steps in the Split-Apply-Combine paradigm of Pandas groupby()?",
    options: [
      "Split data into groups -> Apply a function to each group -> Combine results into a new data structure",
      "Sort data -> Filter outliers -> Plot histogram",
      "Select columns -> Impute missing values -> Export to CSV",
      "Sample rows -> Scale numeric features -> Train model"
    ],
    correctAnswer: "Split data into groups -> Apply a function to each group -> Combine results into a new data structure",
    explanation: "Pandas groupby follows the Split-Apply-Combine architecture: splitting the DataFrame into groups based on key columns, applying a computation (aggregation, transform, or filter), and combining the outputs back together."
  },
  {
    id: 2,
    question: "How can you prevent the grouping column from becoming the row index in the resulting DataFrame?",
    options: [
      "df.groupby('Department', as_index=False).mean()",
      "df.groupby('Department', no_index=True).mean()",
      "df.groupby('Department', flat=True).mean()",
      "df.groupby('Department').mean(drop_index=True)"
    ],
    correctAnswer: "df.groupby('Department', as_index=False).mean()",
    explanation: "Setting as_index=False retains the grouping columns as regular standard columns in the returned DataFrame, behaving like a traditional SQL GROUP BY."
  },
  {
    id: 3,
    question: "What is the primary difference between df.groupby('City')['Score'].mean() and df.groupby('City')['Score'].transform('mean')?",
    options: [
      "mean() collapses rows to 1 per group, while transform('mean') returns a Series with the exact same length as the original DataFrame",
      "mean() only works on integers, while transform() works on text",
      "transform() permanently deletes duplicate values",
      "mean() creates an Excel file automatically"
    ],
    correctAnswer: "mean() collapses rows to 1 per group, while transform('mean') returns a Series with the exact same length as the original DataFrame",
    explanation: "transform('mean') computes the group mean but broadcasts the resulting values back across every original row in that group, making it identical in length to the parent DataFrame—ideal for feature engineering."
  },
  {
    id: 4,
    question: "Which method retrieves all original rows corresponding strictly to the 'Barrackpore' group from a DataFrameGroupBy object?",
    options: [
      "grouped.get_group('Barrackpore')",
      "grouped.fetch('Barrackpore')",
      "grouped['Barrackpore']",
      "grouped.select_group('Barrackpore')"
    ],
    correctAnswer: "grouped.get_group('Barrackpore')",
    explanation: "The .get_group('key') method on a DataFrameGroupBy object extracts the subset DataFrame containing all records belonging to the specified key."
  },
  {
    id: 5,
    question: "What is the difference between grouped.size() and grouped.count()?",
    options: [
      "size() counts all rows including NaNs, while count() counts only non-null values per column",
      "size() returns byte size in RAM, while count() counts rows",
      "count() is 100x faster than size()",
      "There is no difference"
    ],
    correctAnswer: "size() counts all rows including NaNs, while count() counts only non-null values per column",
    explanation: "grouped.size() returns a Series of total row counts per group regardless of NaN presence, whereas grouped.count() computes non-null tallies for each individual column."
  }
];

export default topic14_questions;
