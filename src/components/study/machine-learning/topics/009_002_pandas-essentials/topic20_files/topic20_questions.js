const topic20_questions = [
  {
    id: 1,
    question: "What is the recommended first command to execute immediately after loading an unfamiliar dataset in Pandas?",
    options: [
      "df.info() and df.head() to inspect schema, row shapes, null values, and data types",
      "model.fit(df) to train an algorithm immediately",
      "df.dropna(how='all') to delete empty columns",
      "df.plot() to create 50 charts"
    ],
    correctAnswer: "df.info() and df.head() to inspect schema, row shapes, null values, and data types",
    explanation: "Calling df.info() and df.head() provides an immediate structural blueprint of row counts, column data types, missing null values, and sample values."
  },
  {
    id: 2,
    question: "In df.describe(), which statistic represents the 50th percentile (the value separating the top 50% from the bottom 50%)?",
    options: [
      "50% (The Median)",
      "The Mean",
      "The Standard Deviation (std)",
      "The Maximum (max)"
    ],
    correctAnswer: "50% (The Median)",
    explanation: "The 50% row in describe() corresponds to the sample median (the second quartile Q2), representing the central tendency resistant to extreme outliers."
  },
  {
    id: 3,
    question: "How do you generate descriptive statistical summaries specifically for text / string columns in a DataFrame?",
    options: [
      "df.describe(include=['object'])",
      "df.describe_strings()",
      "df.text_summary()",
      "df.object_stats()"
    ],
    correctAnswer: "df.describe(include=['object'])",
    explanation: "Passing include=['object'] (or include='all') instructs describe() to report categorical metrics: count, unique, top (most frequent category), and freq (frequency of top category)."
  },
  {
    id: 4,
    question: "What does pd.crosstab(df['Locality'], df['Department']) compute?",
    options: [
      "A frequency contingency table showing how many students belong to each (Locality, Department) combination",
      "A SQL cross join between two tables",
      "The Pearson correlation coefficient between two numeric columns",
      "A scatter plot matrix"
    ],
    correctAnswer: "A frequency contingency table showing how many students belong to each (Locality, Department) combination",
    explanation: "pd.crosstab() constructs a bivariate frequency matrix (cross-tabulation table) showing counts of occurrences across two or more categorical factors."
  },
  {
    id: 5,
    question: "If a numerical column 'Score' has a Mean of 60 and a Median of 80, what does this indicate about the distribution?",
    options: [
      "The distribution is left-skewed (negatively skewed) with extreme low-score outliers pulling the mean down",
      "The distribution is perfectly normal (Gaussian)",
      "The distribution is right-skewed with high outliers",
      "There are zero valid numbers in the column"
    ],
    correctAnswer: "The distribution is left-skewed (negatively skewed) with extreme low-score outliers pulling the mean down",
    explanation: "When Mean < Median, low-value outliers on the left tail pull the arithmetic average downward, indicating a left-skewed (negatively skewed) distribution."
  }
];

export default topic20_questions;
