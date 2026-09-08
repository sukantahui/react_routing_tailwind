const questions = [
  {
    id: 1,
    question: "Why does writing `df[df['A'] > 10 and df['B'] < 20]` raise a ValueError: 'The truth value of a Series is ambiguous'?",
    options: [
      "Because Python's `and` keyword attempts to evaluate the boolean truth of the entire Series object as a single boolean, rather than performing element-wise comparison; you must use `&` with parentheses.",
      "Because 'and' is only allowed in SQL queries.",
      "Because 10 is less than 20.",
      "Because Pandas requires uppercase 'AND'."
    ],
    correctAnswer: 0,
    explanation: "Python logical keywords (`and`, `or`, `not`) evaluate whole objects in boolean contexts. In Pandas, element-wise vectorized logical operations require bitwise operators (`&`, `|`, `~`) enclosed in parentheses: `(df['A'] > 10) & (df['B'] < 20)`."
  },
  {
    id: 2,
    question: "Why are parentheses mandatory when combining multiple conditions with `&` or `|` (e.g. `df[(df['Age'] >= 18) & (df['Score'] > 80)]`)?",
    options: [
      "Because in Python's operator precedence table, bitwise `&` has higher precedence than `>=` and `>`, which would cause `18 & df['Score']` to be evaluated first without parentheses.",
      "Because parentheses convert the data into a tuple.",
      "Because Pandas syntax is based on Lisp.",
      "They are not mandatory, just stylistic."
    ],
    correctAnswer: 0,
    explanation: "In Python, bitwise `&` binds tighter than comparison operators (`>=`, `<`, `==`). Without parentheses, Python evaluates `18 & df['Score']` first, causing a TypeError."
  },
  {
    id: 3,
    question: "Which method is the most concise and idiomatic way to filter rows where the 'Locality' column matches any city in a list `['Barrackpore', 'Shyamnagar', 'Ichapur']`?",
    options: [
      "`df[df['Locality'].isin(['Barrackpore', 'Shyamnagar', 'Ichapur'])]`",
      "`df[df['Locality'] == ['Barrackpore', 'Shyamnagar', 'Ichapur']]`",
      "`df[df['Locality'].in_list(['Barrackpore', 'Shyamnagar', 'Ichapur'])]`",
      "`df[df['Locality'].matches(['Barrackpore', 'Shyamnagar', 'Ichapur'])]`"
    ],
    correctAnswer: 0,
    explanation: "The `.isin()` method tests membership of each element in a collection, producing a boolean mask cleanly without chaining multiple `|` conditions."
  },
  {
    id: 4,
    question: "How do you reference an external Python variable `threshold = 85` inside a `df.query()` string?",
    options: [
      "`df.query('Score >= @threshold')`",
      "`df.query('Score >= $threshold')`",
      "`df.query('Score >= threshold')`",
      "`df.query('Score >= {threshold}')`"
    ],
    correctAnswer: 0,
    explanation: "The `@` prefix in `df.query()` references environment variables in the local Python scope."
  },
  {
    id: 5,
    question: "What does `df[~df['Passed']]` do?",
    options: [
      "Inverts the boolean mask of 'Passed', selecting all rows where 'Passed' is False.",
      "Sorts the 'Passed' column.",
      "Deletes the 'Passed' column.",
      "Calculates the bitwise square root of 'Passed'."
    ],
    correctAnswer: 0,
    explanation: "The tilde `~` operator is the element-wise bitwise NOT operator, inverting True to False and False to True."
  }
];

export default questions;
