const topic26_questions = [
  {
    id: 1,
    question: "What is the key functional difference between df.loc['A':'C'] and df.iloc[0:2]?",
    options: [
      "loc includes both endpoints ('A' through 'C'), whereas iloc excludes the stop integer (only indices 0 and 1)",
      "loc only works on integers, while iloc works on strings",
      "iloc is 100x slower than loc",
      "loc converts data into a Python dictionary"
    ],
    correctAnswer: "loc includes both endpoints ('A' through 'C'), whereas iloc excludes the stop integer (only indices 0 and 1)",
    explanation: "Label-based indexing with loc[] includes both the start and stop labels, whereas positional indexing with iloc[] follows Python standard slice rules where the stop boundary is excluded."
  },
  {
    id: 2,
    question: "Why should you call .copy() when creating a subset slice before modifying columns (e.g. subset = df[df['Score'] > 80].copy())?",
    options: [
      "To avoid the SettingWithCopyWarning and prevent unintended side-effects on the original DataFrame",
      "To compress the memory footprint by 50%",
      "To force Pandas to sort the output",
      "To convert categorical data to floats"
    ],
    correctAnswer: "To avoid the SettingWithCopyWarning and prevent unintended side-effects on the original DataFrame",
    explanation: "Explicitly creating a .copy() guarantees that the new DataFrame has its own allocated memory buffer, eliminating ambiguity over whether modifications affect a view or a copy and silencing SettingWithCopyWarning."
  },
  {
    id: 3,
    question: "Which operation reduces a repetitive string column (e.g. 5 unique city names repeated across 1,000,000 rows) from 80 MB down to 1 MB of RAM?",
    options: [
      "df['City'] = df['City'].astype('category')",
      "df['City'] = df['City'].str.strip()",
      "df['City'] = df['City'].to_numpy()",
      "df['City'] = df['City'].apply(str)"
    ],
    correctAnswer: "df['City'] = df['City'].astype('category')",
    explanation: "Converting repetitive string columns to 'category' replaces bulky Python string pointers with compact integer dictionary codes, slashing memory usage by 80-95%."
  },
  {
    id: 4,
    question: "When should you use df.groupby().transform() instead of df.groupby().agg()?",
    options: [
      "When you need to broadcast group statistics back across every original row without changing the DataFrame's length",
      "When you need to export data directly to an Excel file",
      "When the DataFrame has zero missing values",
      "When you want to delete all duplicate records"
    ],
    correctAnswer: "When you need to broadcast group statistics back across every original row without changing the DataFrame's length",
    explanation: "transform() calculates group-level metrics and broadcasts the result across every original row in that group, preserving the full row count for feature engineering."
  },
  {
    id: 5,
    question: "Why should you always specify index=False when saving a dataset with df.to_csv('data.csv', index=False)?",
    options: [
      "To prevent writing the numerical row index into the CSV, avoiding the unwanted 'Unnamed: 0' column upon loading",
      "To encrypt the CSV file",
      "To format all numbers as floats",
      "To enable multi-threading"
    ],
    correctAnswer: "To prevent writing the numerical row index into the CSV, avoiding the unwanted 'Unnamed: 0' column upon loading",
    explanation: "Omission of index=False causes the integer index to be written as a headerless first column, which Pandas subsequently imports as 'Unnamed: 0'."
  }
];

export default topic26_questions;
