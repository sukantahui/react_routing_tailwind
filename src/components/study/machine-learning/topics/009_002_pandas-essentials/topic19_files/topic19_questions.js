const topic19_questions = [
  {
    id: 1,
    question: "Why is 'index=False' strongly recommended when exporting a DataFrame with df.to_csv('output.csv', index=False)?",
    options: [
      "It prevents Pandas from writing row numbers to the first column, avoiding the 'Unnamed: 0' column bug upon re-reading",
      "It encrypts the CSV file with a password",
      "It compresses the file automatically into a zip archive",
      "It converts all numbers into integers"
    ],
    correctAnswer: "It prevents Pandas from writing row numbers to the first column, avoiding the 'Unnamed: 0' column bug upon re-reading",
    explanation: "If index=False is omitted, the numerical row index (0, 1, 2...) is written as the first column without a header name. When reading the CSV back with pd.read_csv(), Pandas names it 'Unnamed: 0'."
  },
  {
    id: 2,
    question: "How do you export a DataFrame with tab ('\\t') delimiters instead of standard commas?",
    options: [
      "df.to_csv('output.tsv', sep='\\t', index=False)",
      "df.to_tsv('output.tsv')",
      "df.to_csv('output.tsv', delimiter_type='tab')",
      "df.export(format='tab')"
    ],
    correctAnswer: "df.to_csv('output.tsv', sep='\\t', index=False)",
    explanation: "The sep parameter in df.to_csv() controls the delimiter character; setting sep='\\t' creates a standard Tab-Separated Values (TSV) file."
  },
  {
    id: 3,
    question: "Which encoding should you specify in df.to_csv(encoding=...) to guarantee Microsoft Excel on Windows renders UTF-8 accented/special characters correctly?",
    options: [
      "encoding='utf-8-sig'",
      "encoding='ascii'",
      "encoding='utf-16-be'",
      "encoding='windows-1252-raw'"
    ],
    correctAnswer: "encoding='utf-8-sig'",
    explanation: "encoding='utf-8-sig' prepends the UTF-8 Byte Order Mark (BOM) to the output file, signaling to Microsoft Excel that the file contains UTF-8 text."
  },
  {
    id: 4,
    question: "How do you format all floating-point numbers in the exported CSV to exactly 2 decimal places?",
    options: [
      "df.to_csv('output.csv', float_format='%.2f', index=False)",
      "df.to_csv('output.csv', decimals=2)",
      "df.round_csv(2).to_csv('output.csv')",
      "df.to_csv('output.csv', precision=2)"
    ],
    correctAnswer: "df.to_csv('output.csv', float_format='%.2f', index=False)",
    explanation: "The float_format parameter accepts a standard C-style format string like '%.2f' to format all floating-point values uniformly."
  },
  {
    id: 5,
    question: "How can you append new records to an existing CSV file without rewriting the header line?",
    options: [
      "df.to_csv('data.csv', mode='a', header=False, index=False)",
      "df.append_csv('data.csv')",
      "df.to_csv('data.csv', append=True)",
      "df.insert_into('data.csv')"
    ],
    correctAnswer: "df.to_csv('data.csv', mode='a', header=False, index=False)",
    explanation: "Combining mode='a' (append mode) and header=False appends new rows to the end of the existing file without duplicating the header line."
  }
];

export default topic19_questions;
