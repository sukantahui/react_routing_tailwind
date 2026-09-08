const topic17_questions = [
  {
    id: 1,
    question: "When using df.apply(my_function, axis=1), what object does my_function receive as its input argument for each iteration?",
    options: [
      "A Pandas Series representing the current row",
      "A single integer representing the row index",
      "A Python list of strings",
      "The entire DataFrame"
    ],
    correctAnswer: "A Pandas Series representing the current row",
    explanation: "With axis=1 (or axis='columns'), Pandas passes each row as a pd.Series to the callable, allowing fields to be accessed like row['Math'] and row['Science']."
  },
  {
    id: 2,
    question: "Why should you avoid df.apply(..., axis=1) when computing simple arithmetic like df['Total'] = df['A'] + df['B']?",
    options: [
      "df.apply(axis=1) constructs a Python Series object per row in a slow Python loop, making it 50x-500x slower than vectorized C addition",
      "df.apply(axis=1) is deprecated and will be removed in Python 3.12",
      "df.apply(axis=1) permanently rounds all decimal numbers to zero",
      "df.apply(axis=1) cannot handle more than 10 rows"
    ],
    correctAnswer: "df.apply(axis=1) constructs a Python Series object per row in a slow Python loop, making it 50x-500x slower than vectorized C addition",
    explanation: "Vectorized arithmetic executes contiguous C/SIMD CPU operations, whereas df.apply(axis=1) incurs the heavy overhead of creating Python Series objects and executing interpreted bytecode for every row."
  },
  {
    id: 3,
    question: "Which method is best suited for 1-to-1 dictionary lookups to encode categorical columns (e.g. mapping {'M': 'Male', 'F': 'Female'})?",
    options: [
      "Series.map()",
      "DataFrame.pivot()",
      "Series.groupby()",
      "DataFrame.merge_dict()"
    ],
    correctAnswer: "Series.map()",
    explanation: "Series.map(dict) is specifically optimized for element-wise dictionary substitutions and categorical value re-mapping."
  },
  {
    id: 4,
    question: "In Pandas 2.1+, which method replaces the legacy DataFrame.applymap() for element-wise cell transformations?",
    options: [
      "DataFrame.map()",
      "DataFrame.cell_apply()",
      "DataFrame.each()",
      "DataFrame.broadcast()"
    ],
    correctAnswer: "DataFrame.map()",
    explanation: "Starting in Pandas 2.1.0, DataFrame.map() was introduced to provide a uniform API consistent with Series.map(), deprecating the legacy applymap() name."
  },
  {
    id: 5,
    question: "How can you pass extra constant arguments (e.g. bonus=5) to a custom function inside Series.apply()?",
    options: [
      "df['Score'].apply(my_func, bonus=5)",
      "df['Score'].apply(my_func(bonus=5))",
      "df['Score'].apply(my_func, with_args={'bonus': 5})",
      "df['Score'].apply_with_params(my_func, 5)"
    ],
    correctAnswer: "df['Score'].apply(my_func, bonus=5)",
    explanation: "Series.apply accepts arbitrary positional (*args) and keyword (**kwargs) parameters and forwards them directly to the user-supplied callable."
  }
];

export default topic17_questions;
