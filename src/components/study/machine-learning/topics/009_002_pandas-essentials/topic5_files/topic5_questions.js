const questions = [
  {
    id: 1,
    question: "What does `pd.read_excel('data.xlsx', sheet_name=None)` return?",
    options: [
      "A Python dictionary where each key is a sheet name string and each value is the corresponding parsed Pandas DataFrame.",
      "A single concatenated DataFrame containing all sheets stacked vertically.",
      "An empty DataFrame.",
      "A ValueError because sheet_name cannot be None."
    ],
    correctAnswer: 0,
    explanation: "Setting `sheet_name=None` instructs Pandas to read all sheets in the workbook and return them as a dictionary of `{sheet_name: DataFrame}`."
  },
  {
    id: 2,
    question: "Which third-party library is required by Pandas as the default engine to read and write modern `.xlsx` Excel spreadsheets?",
    options: [
      "openpyxl",
      "numpy",
      "scipy",
      "matplotlib"
    ],
    correctAnswer: 0,
    explanation: "`openpyxl` is the Python library used by Pandas to read and write modern `.xlsx` XML-based Excel files."
  },
  {
    id: 3,
    question: "How can you instruct `pd.read_excel` to only read Excel columns A through D while skipping company title rows in the first 3 rows?",
    options: [
      "`pd.read_excel('file.xlsx', skiprows=3, usecols='A:D')`",
      "`pd.read_excel('file.xlsx', skip=3, columns='A:D')`",
      "`pd.read_excel('file.xlsx', trim_rows=3, cols=[1,4])`",
      "`pd.read_excel('file.xlsx', start_row=4, end_col='D')`"
    ],
    correctAnswer: 0,
    explanation: "`skiprows=3` skips the first 3 lines, and `usecols='A:D'` specifies the Excel column letter range to parse."
  },
  {
    id: 4,
    question: "How does `pd.read_excel` compare in speed and performance with `pd.read_csv` for identical tabular data?",
    options: [
      "`pd.read_csv` is significantly faster because CSV is a plain text stream, while Excel (.xlsx) files are zipped XML archives with formatting and formula overhead.",
      "`pd.read_excel` is 10 times faster than CSV.",
      "Both have identical parsing speeds.",
      "`pd.read_excel` uses less memory than CSV."
    ],
    correctAnswer: 0,
    explanation: "CSV parsing is vastly faster because it is a simple plain text format parsed in C. `.xlsx` files require unzipping an XML package, resolving styles, formulas, and cell metadata."
  },
  {
    id: 5,
    question: "When consolidating multiple regional sheets from an Excel workbook into a single master DataFrame, what method is commonly chained to track the origin sheet name?",
    options: [
      "`df.assign(Region=sheet_name)` or `df['Region'] = sheet_name` before `pd.concat`",
      "`df.add_origin()`",
      "`df.track_sheet()`",
      "`pd.merge_all()`"
    ],
    correctAnswer: 0,
    explanation: "Assigning a new column `Region=sheet_name` onto each individual sheet's DataFrame before calling `pd.concat` preserves provenance and enables categorical grouping."
  }
];

export default questions;
