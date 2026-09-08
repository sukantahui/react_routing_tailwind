const questions = [
  {
    id: 1,
    question: "What is the crucial difference in endpoint inclusivity between `df.loc[0:3]` and `df.iloc[0:3]` for a DataFrame with default 0-indexed integers?",
    options: [
      "`df.loc[0:3]` includes label 3 (returning 4 rows: 0, 1, 2, 3), whereas `df.iloc[0:3]` excludes position 3 (returning 3 rows: 0, 1, 2).",
      "`df.iloc[0:3]` includes 4 rows, while `df.loc[0:3]` includes 3 rows.",
      "Both return identical 3 rows.",
      "Both return identical 4 rows."
    ],
    correctAnswer: 0,
    explanation: "`loc` is label-based and always includes the stop label in slices. `iloc` is integer position-based and follows standard Python slice rules where the stop position is excluded."
  },
  {
    id: 2,
    question: "Given a DataFrame with custom row index `['A', 'B', 'C', 'D']`, how do you access the value in the 2nd row (index 'B') and 3rd column (named 'Score') using `loc` and `iloc`?",
    options: [
      "`df.loc['B', 'Score']` and `df.iloc[1, 2]`",
      "`df.loc[1, 2]` and `df.iloc['B', 'Score']`",
      "`df.loc[2, 3]` and `df.iloc['B', 'Score']`",
      "`df.get('B', 2)`"
    ],
    correctAnswer: 0,
    explanation: "`loc` takes the row label `'B'` and column label `'Score'`. `iloc` takes 0-based integer coordinates: 2nd row is index `1`, and 3rd column is index `2`."
  },
  {
    id: 3,
    question: "Why should you use `df.loc[condition, 'Column'] = value` instead of chained indexing `df[condition]['Column'] = value` to update values in a DataFrame?",
    options: [
      "Chained indexing triggers a `SettingWithCopyWarning` because it might operate on a temporary memory copy, potentially failing to mutate the original DataFrame.",
      "Because `df.loc` is 100 times slower.",
      "Because chained indexing only works on integers.",
      "Because `df.loc` automatically saves to disk."
    ],
    correctAnswer: 0,
    explanation: "Chained indexing creates ambiguity about whether a view or copy was returned. `df.loc` guarantees direct in-place modification of the underlying memory buffer."
  },
  {
    id: 4,
    question: "How can you extract the very last row and the very last column of a DataFrame of unknown size using `iloc`?",
    options: [
      "`df.iloc[-1, -1]`",
      "`df.loc[-1, -1]`",
      "`df.iloc[end, end]`",
      "`df.last()`"
    ],
    correctAnswer: 0,
    explanation: "`iloc` supports Python negative indexing where `-1` represents the last item along that axis."
  },
  {
    id: 5,
    question: "If a DataFrame has index `[100, 200, 300]`, what will `df.iloc[100]` raise?",
    options: [
      "`IndexError: single positional indexer is out-of-bounds` (because there are only 3 rows, positions 0, 1, 2).",
      "It returns the row with index 100.",
      "It returns NaN.",
      "It creates 97 empty rows."
    ],
    correctAnswer: 0,
    explanation: "`iloc` searches by 0-based array position (0, 1, 2), not by label. Since position 100 does not exist in a 3-row array, an `IndexError` is raised. To search for label 100, use `df.loc[100]`."
  }
];

export default questions;
