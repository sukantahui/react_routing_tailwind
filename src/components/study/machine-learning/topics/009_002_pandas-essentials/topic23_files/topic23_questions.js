const topic23_questions = [
  {
    id: 1,
    question: "If 'RegNo' in Table 1 is stored as an integer (101) and in Table 2 as a string ('101'), what will pd.merge() return?",
    options: [
      "A MergeError or an empty DataFrame because data types do not match",
      "An automated type conversion to floating point",
      "A full outer join with duplicate rows",
      "A boolean array of True/False"
    ],
    correctAnswer: "A MergeError or an empty DataFrame because data types do not match",
    explanation: "Pandas merge keys must share the exact same data type. Merging an integer column with a string column results in zero matching rows or raises a MergeError."
  },
  {
    id: 2,
    question: "In an admissions vs online test merge, which join type identifies registered candidates who missed the test?",
    options: [
      "how='left' (or full outer join where _merge == 'left_only')",
      "how='inner'",
      "how='right'",
      "how='cross'"
    ],
    correctAnswer: "how='left' (or full outer join where _merge == 'left_only')",
    explanation: "A left join preserves all registered candidates and assigns NaN to test scores for absentees; with indicator=True on an outer join, they are marked as 'left_only'."
  },
  {
    id: 3,
    question: "Why should you pass validate='1:1' in pd.merge(admissions, test_scores, on='RegNo', validate='1:1')?",
    options: [
      "To ensure neither DataFrame contains duplicate RegNo values, preventing unexpected row explosion",
      "To verify that both DataFrames have exactly 100 rows",
      "To restrict the merge to 1 core CPU",
      "To convert all scores to a 1 to 10 scale"
    ],
    correctAnswer: "To ensure neither DataFrame contains duplicate RegNo values, preventing unexpected row explosion",
    explanation: "validate='1:1' confirms that the merge keys are unique in both the left and right datasets, preventing silent duplication of records."
  },
  {
    id: 4,
    question: "What does suffixes=('_adm', '_test') do during a merge when both tables contain a column named 'Date'?",
    options: [
      "Renames them to 'Date_adm' and 'Date_test' in the merged DataFrame to avoid column collision",
      "Deletes both 'Date' columns",
      "Combines both dates into a date range string",
      "Calculates the difference between the two dates in days"
    ],
    correctAnswer: "Renames them to 'Date_adm' and 'Date_test' in the merged DataFrame to avoid column collision",
    explanation: "The suffixes parameter appends specified suffixes to overlapping column headers from the left and right DataFrames to keep them distinct."
  },
  {
    id: 5,
    question: "How do you drop the redundant right key column after merging on left_on='RegNo' and right_on='Student_Reg_Code'?",
    options: [
      "df.drop(columns=['Student_Reg_Code'])",
      "df.remove_key('Student_Reg_Code')",
      "df.pop_right()",
      "del 'Student_Reg_Code'"
    ],
    correctAnswer: "df.drop(columns=['Student_Reg_Code'])",
    explanation: "When left_on and right_on have different names, Pandas retains both columns in the result; df.drop(columns=[...]) is standard to remove the duplicate."
  }
];

export default topic23_questions;
