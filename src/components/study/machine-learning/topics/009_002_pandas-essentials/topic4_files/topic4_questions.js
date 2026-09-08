const questions = [
  {
    id: 1,
    question: "If a CSV file does not contain a header row with column names, how should you invoke `pd.read_csv` to avoid having the first row of data treated as column names?",
    options: [
      "`pd.read_csv('file.csv', header=None, names=['Col1', 'Col2', ...])`",
      "`pd.read_csv('file.csv', skip_header=True)`",
      "`pd.read_csv('file.csv', no_header=True)`",
      "`pd.read_csv('file.csv').set_header()`"
    ],
    correctAnswer: 0,
    explanation: "Setting `header=None` prevents Pandas from using row 0 as header labels, and `names=[...]` allows you to assign custom column names."
  },
  {
    id: 2,
    question: "How can you optimize memory usage when loading a wide dataset of 200 columns when your machine learning model only requires 5 specific features?",
    options: [
      "Use `usecols=['Feature1', 'Feature2', ...]` in `pd.read_csv` to only parse and load the required columns into RAM.",
      "Load the entire file and delete unused columns later.",
      "Convert the CSV into an Excel file first.",
      "Set `low_memory=False`."
    ],
    correctAnswer: 0,
    explanation: "The `usecols` parameter instructs Pandas to only read and allocate memory for the specified subset of columns, dramatically reducing memory usage and I/O time."
  },
  {
    id: 3,
    question: "What parameter in `pd.read_csv` allows converting date string columns (e.g. '2026-09-01') directly into native Python/Pandas datetime objects during ingestion?",
    options: [
      "`parse_dates=['Date_Column']`",
      "`to_datetime=True`",
      "`date_format='ISO'`",
      "`convert_dates=True`"
    ],
    correctAnswer: 0,
    explanation: "`parse_dates` takes a list of column names and automatically parses them into native `datetime64[ns]` timestamp objects."
  },
  {
    id: 4,
    question: "If a dataset encodes missing survey responses with special placeholder strings like `'?'` or `'-999'`, how can you tell `pd.read_csv` to treat them as `NaN`?",
    options: [
      "`na_values=['?', '-999', -999]`",
      "`replace_nulls=['?']`",
      "`null_chars=['?']`",
      "`drop_values=['?']`"
    ],
    correctAnswer: 0,
    explanation: "The `na_values` parameter takes a list of custom sentinel values and translates them directly to `NaN` upon reading."
  },
  {
    id: 5,
    question: "How does the `chunksize` parameter in `pd.read_csv` help process massive datasets larger than available system RAM?",
    options: [
      "It returns an iterator that yields smaller DataFrame chunks of specified row count, enabling out-of-core streaming without loading the entire file at once.",
      "It splits the CSV into multiple files on disk.",
      "It compresses the CSV file into a zip archive.",
      "It runs the parsing on multiple GPUs."
    ],
    correctAnswer: 0,
    explanation: "`chunksize` transforms `pd.read_csv` into a generator/iterator, yielding `TextFileReader` chunks that can be processed and aggregated batch-by-batch."
  }
];

export default questions;
