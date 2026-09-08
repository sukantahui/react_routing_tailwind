const questions = [
  {
    id: 1,
    question: "What is the primary difference in purpose between `df.info()` and `df.describe()`?",
    options: [
      "`df.info()` provides structural metadata (data types, non-null counts, memory usage), while `df.describe()` provides statistical distribution summaries (mean, std, quartiles, min, max).",
      "`df.info()` only works on text, while `df.describe()` only works on numbers.",
      "`df.info()` creates a plot, while `df.describe()` prints text.",
      "Both methods return identical information."
    ],
    correctAnswer: 0,
    explanation: "`df.info()` inspects the technical schema and completeness of columns, while `df.describe()` calculates descriptive statistics across numeric or categorical data."
  },
  {
    id: 2,
    question: "Why is `df.sample(n)` often preferred over `df.head(n)` when first exploring a new dataset?",
    options: [
      "Because datasets may be sorted chronologically or grouped by category, and `head()` only reveals the first group, whereas `sample()` reveals diverse, unbiased observations.",
      "Because `df.sample()` runs on GPU.",
      "Because `df.head()` modifies the DataFrame.",
      "Because `df.sample()` automatically imputes missing values."
    ],
    correctAnswer: 0,
    explanation: "If a dataset is sorted by date or class label, `head()` only shows the initial class. `sample()` draws random rows across the entire dataset to reveal general patterns."
  },
  {
    id: 3,
    question: "How can you instruct `df.describe()` to include categorical (text / object) columns instead of skipping them?",
    options: [
      "`df.describe(include=['object'])` or `df.describe(include='all')`",
      "`df.describe(categorical=True)`",
      "`df.describe().include_text()`",
      "`df.describe_all()`"
    ],
    correctAnswer: 0,
    explanation: "Passing `include=['object']` or `include='all'` forces `describe()` to output categorical metrics: `count`, `unique`, `top`, and `freq`."
  },
  {
    id: 4,
    question: "In `df.describe()`, what does the `50%` metric represent for a numeric column?",
    options: [
      "The Median (the value separating the upper half from the lower half of the sorted data).",
      "50% of the maximum value.",
      "The standard deviation divided by 2.",
      "The mean plus one standard deviation."
    ],
    correctAnswer: 0,
    explanation: "The 50th percentile (50%) is the Median of the distribution, which is less sensitive to extreme outliers than the arithmetic mean."
  },
  {
    id: 5,
    question: "If a DataFrame has 500 rows and `df.info()` shows that column 'Age' has 420 non-null values, how many missing (NaN) values exist in 'Age'?",
    options: [
      "80 missing values (500 - 420 = 80)",
      "420 missing values",
      "0 missing values",
      "Cannot be determined without calling isna()"
    ],
    correctAnswer: 0,
    explanation: "Non-null count indicates valid observations. Subtracting non-null count from total row count directly gives the number of missing/null values: 500 - 420 = 80."
  }
];

export default questions;
