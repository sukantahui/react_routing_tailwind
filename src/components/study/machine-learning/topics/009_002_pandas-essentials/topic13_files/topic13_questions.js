const topic13_questions = [
  {
    id: 1,
    question: "How do you sort a DataFrame first by 'Locality' ascending and then by 'Math' descending?",
    options: [
      "df.sort_values(by=['Locality', 'Math'], ascending=[True, False])",
      "df.sort(['Locality', 'Math'], order=['asc', 'desc'])",
      "df.sort_values(by='Locality', ascending=True).sort_values(by='Math', ascending=False)",
      "df.order_by(['Locality', '-Math'])"
    ],
    correctAnswer: "df.sort_values(by=['Locality', 'Math'], ascending=[True, False])",
    explanation: "df.sort_values() accepts a list of column names for 'by' and a corresponding list of boolean flags for 'ascending' to define precise multi-column hierarchical sorting."
  },
  {
    id: 2,
    question: "By default, where does Pandas place missing (NaN) values when sorting in ascending or descending order?",
    options: [
      "At the end of the DataFrame (na_position='last')",
      "At the beginning of the DataFrame (na_position='first')",
      "It deletes all rows containing NaNs",
      "It raises a MissingValueSortError"
    ],
    correctAnswer: "At the end of the DataFrame (na_position='last')",
    explanation: "Pandas defaults to na_position='last', placing all missing NaN values at the very bottom of the result regardless of whether ascending is True or False."
  },
  {
    id: 3,
    question: "Why is df.nlargest(5, 'Revenue') significantly faster than df.sort_values('Revenue', ascending=False).head(5) on a 10-million row dataset?",
    options: [
      "nlargest uses an O(N log K) heap algorithm without sorting the entire 10M-row array",
      "nlargest ignores floats and only works on binary integers",
      "nlargest automatically parallelizes across 100 GPU cores",
      "nlargest samples only the top 100 rows randomly"
    ],
    correctAnswer: "nlargest uses an O(N log K) heap algorithm without sorting the entire 10M-row array",
    explanation: "df.nlargest() utilizes a specialized heap selection algorithm running in O(N log K) time, avoiding the expensive O(N log N) full array sort and excessive memory reallocations."
  },
  {
    id: 4,
    question: "Which method sorts the DataFrame by its row index labels instead of column values?",
    options: [
      "df.sort_index()",
      "df.sort_values(by='index')",
      "df.order_index()",
      "df.reindex_sorted()"
    ],
    correctAnswer: "df.sort_index()",
    explanation: "df.sort_index() sorts the DataFrame along the specified axis based on the index labels (by default axis=0 for row index, or axis=1 for column headers)."
  },
  {
    id: 5,
    question: "What does the 'drop=True' parameter in df.reset_index(drop=True) achieve after sorting?",
    options: [
      "It discards the old scrambled index instead of inserting it as a new column",
      "It drops all rows containing duplicate values",
      "It drops all NaN values from the DataFrame",
      "It resets column names back to 0, 1, 2"
    ],
    correctAnswer: "It discards the old scrambled index instead of inserting it as a new column",
    explanation: "Without drop=True, reset_index() moves the existing index into a new regular column named 'index'. Setting drop=True discards the old index completely and resets the index to default range 0..N-1."
  }
];

export default topic13_questions;
