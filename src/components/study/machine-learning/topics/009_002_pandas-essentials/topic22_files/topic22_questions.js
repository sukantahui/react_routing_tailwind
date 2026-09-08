const topic22_questions = [
  {
    id: 1,
    question: "What is the primary visual difference between df.groupby(['Region', 'Category']).sum() and pd.pivot_table(df, values='Revenue', index='Region', columns='Category', aggfunc='sum')?",
    options: [
      "groupby outputs long stacked rows with a MultiIndex, while pivot_table reshapes 'Category' into horizontal columns to form a 2D matrix",
      "groupby runs on the GPU, while pivot_table runs on the CPU",
      "pivot_table only works on text data",
      "groupby automatically deletes all numerical values"
    ],
    correctAnswer: "groupby outputs long stacked rows with a MultiIndex, while pivot_table reshapes 'Category' into horizontal columns to form a 2D matrix",
    explanation: "pd.pivot_table transforms distinct values in the 'columns' parameter into horizontal column headers, creating an intuitive 2D grid ideal for executive reporting."
  },
  {
    id: 2,
    question: "What does the 'margins=True' parameter do in pd.pivot_table()?",
    options: [
      "Automatically adds subtotal and grand total rows and columns to the pivot table",
      "Sets the CSS border margin to 10 pixels",
      "Filters out rows with less than 5% profit margin",
      "Deletes zero-revenue categories"
    ],
    correctAnswer: "Automatically adds subtotal and grand total rows and columns to the pivot table",
    explanation: "Setting margins=True in pd.pivot_table adds an 'All' row and column summing the marginal totals across all dimensions."
  },
  {
    id: 3,
    question: "How do you handle cells in a pivot table where a region had zero sales for a particular product category?",
    options: [
      "Set fill_value=0 in pd.pivot_table()",
      "Set replace_nan=True",
      "Set default_zero=True",
      "Pandas raises a ZeroDivisionError"
    ],
    correctAnswer: "Set fill_value=0 in pd.pivot_table()",
    explanation: "The fill_value=0 argument replaces any NaN cells (combinations with zero sales observations) with 0 directly during pivot table construction."
  },
  {
    id: 4,
    question: "How can you calculate the percentage share that each Region contributes to the company's grand total revenue?",
    options: [
      "(df.groupby('Region')['Revenue'].sum() / df['Revenue'].sum()) * 100",
      "df.groupby('Region')['Revenue'].percentage_share()",
      "df['Revenue'].pct_change(by='Region')",
      "df.groupby('Region').share('Revenue')"
    ],
    correctAnswer: "(df.groupby('Region')['Revenue'].sum() / df['Revenue'].sum()) * 100",
    explanation: "Dividing the grouped sum per region by the scalar grand total of all revenue and multiplying by 100 calculates the exact percentage market share."
  },
  {
    id: 5,
    question: "How do you rank the top 3 sales representatives by total booking revenue in descending order?",
    options: [
      "df.groupby('SalesRep')['Revenue'].sum().sort_values(ascending=False).head(3)",
      "df.sort_values(by='Revenue').top(3)",
      "df.groupby('SalesRep').head(3)",
      "df.nlargest(3, columns='SalesRep')"
    ],
    correctAnswer: "df.groupby('SalesRep')['Revenue'].sum().sort_values(ascending=False).head(3)",
    explanation: "Summing revenue per sales rep via groupby, sorting in descending order with sort_values(ascending=False), and taking the top 3 with head(3) yields the top 3 performers."
  }
];

export default topic22_questions;
