const topic16_questions = [
  {
    id: 1,
    question: "Which join type retains all rows from the primary (left) DataFrame and fills unmatched columns from the right DataFrame with NaN?",
    options: [
      "how='left'",
      "how='inner'",
      "how='right'",
      "how='outer'"
    ],
    correctAnswer: "how='left'",
    explanation: "A LEFT JOIN (how='left') preserves every single record from the left DataFrame regardless of whether a matching key exists in the right DataFrame, filling unmatched right fields with NaN."
  },
  {
    id: 2,
    question: "When merge key columns have different names in two DataFrames ('cust_id' in df1 and 'client_code' in df2), how do you specify the merge?",
    options: [
      "pd.merge(df1, df2, left_on='cust_id', right_on='client_code')",
      "pd.merge(df1, df2, keys=['cust_id', 'client_code'])",
      "pd.merge(df1, df2, match={'cust_id': 'client_code'})",
      "pd.merge(df1, df2, on=('cust_id', 'client_code'))"
    ],
    correctAnswer: "pd.merge(df1, df2, left_on='cust_id', right_on='client_code')",
    explanation: "The left_on and right_on arguments allow merging DataFrames whose joining keys have distinct column names."
  },
  {
    id: 3,
    question: "What does setting 'indicator=True' in pd.merge() produce?",
    options: [
      "A '_merge' column indicating whether each row came from 'left_only', 'right_only', or 'both'",
      "A progress bar showing merge execution percentage",
      "A boolean warning flag if merge runtime exceeds 1 second",
      "An automated data validation chart"
    ],
    correctAnswer: "A '_merge' column indicating whether each row came from 'left_only', 'right_only', or 'both'",
    explanation: "Setting indicator=True generates an additional column named '_merge' containing categorical values ('left_only', 'right_only', 'both'), which is invaluable for auditing join integrity."
  },
  {
    id: 4,
    question: "How do you vertically stack (concatenate rows) from three monthly DataFrames df1, df2, and df3 into one continuous table?",
    options: [
      "pd.concat([df1, df2, df3], axis=0, ignore_index=True)",
      "pd.stack([df1, df2, df3])",
      "df1.append_all([df2, df3])",
      "pd.merge([df1, df2, df3], how='vertical')"
    ],
    correctAnswer: "pd.concat([df1, df2, df3], axis=0, ignore_index=True)",
    explanation: "pd.concat(..., axis=0, ignore_index=True) stacks DataFrames vertically one below the other and resets row indices to create a continuous 0..N index."
  },
  {
    id: 5,
    question: "What parameter in pd.merge() prevents silent duplicate multiplication by enforcing relationship constraints like 1:1 or 1:m?",
    options: [
      "validate='1:1' or validate='1:m'",
      "enforce_cardinality=True",
      "strict_keys=True",
      "check_duplicates=True"
    ],
    correctAnswer: "validate='1:1' or validate='1:m'",
    explanation: "The validate parameter (e.g. validate='1:1', 'one_to_one', 'one_to_many') checks merge keys for uniqueness, raising a MergeError if cardinality assumptions are violated."
  }
];

export default topic16_questions;
