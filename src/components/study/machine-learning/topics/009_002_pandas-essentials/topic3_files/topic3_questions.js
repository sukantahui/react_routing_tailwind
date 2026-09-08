const questions = [
  {
    id: 1,
    question: "What happens if you attempt to create a DataFrame from a dictionary of lists where one list has 4 elements and another has 3 elements (`pd.DataFrame({'A': [1,2,3,4], 'B': [10,20,30]})`)?",
    options: [
      "Pandas raises a `ValueError: All arrays must be of the same length`.",
      "Pandas automatically fills the missing element with 0.",
      "Pandas automatically drops the 4th element of list A.",
      "Pandas creates a 1D Series instead."
    ],
    correctAnswer: 0,
    explanation: "When constructing a DataFrame from a dictionary of lists or 1D NumPy arrays, all lists must be of identical length; otherwise a ValueError is raised."
  },
  {
    id: 2,
    question: "Why is a list of dictionaries (`records = [{'A': 1, 'B': 2}, {'A': 3, 'C': 4}]`) more flexible than a dictionary of lists when ingesting irregular JSON API data?",
    options: [
      "Because Pandas unions all unique keys across all records and automatically fills missing keys with NaN without raising length mismatch errors.",
      "Because a list of dictionaries runs on GPU.",
      "Because it does not require memory in RAM.",
      "Because it encrypts the dataset."
    ],
    correctAnswer: 0,
    explanation: "List of dictionaries format (record orientation) gracefully handles missing fields across JSON objects by taking the union of all keys and inserting NaNs for missing keys."
  },
  {
    id: 3,
    question: "Given a nested dictionary `data = {'Debangshu': {'Age': 22, 'Score': 85}, 'Susmita': {'Age': 23, 'Score': 92}}`, what does `pd.DataFrame.from_dict(data, orient='index')` produce?",
    options: [
      "A DataFrame where outer keys ('Debangshu', 'Susmita') become the Row Index, and inner keys ('Age', 'Score') become the Column Headers.",
      "A DataFrame where outer keys become Column Headers.",
      "A 1D Series.",
      "A 3D Tensor."
    ],
    correctAnswer: 0,
    explanation: "`orient='index'` instructs Pandas to treat the outer dictionary keys as the row index of the DataFrame."
  },
  {
    id: 4,
    question: "When creating a DataFrame from a dictionary of Pandas Series (`pd.DataFrame({'ColA': s1, 'ColB': s2})`), do the Series need to be of equal length?",
    options: [
      "No, Pandas will align elements by their index labels and insert NaN for any non-overlapping indices.",
      "Yes, they must have the exact same length and same order.",
      "No, but they must only contain positive integers.",
      "Yes, otherwise Pandas crashes."
    ],
    correctAnswer: 0,
    explanation: "Because Pandas Series have explicit index labels, Pandas performs an automatic union (outer join) on their indices when constructing a DataFrame, safely populating missing values with NaN."
  },
  {
    id: 5,
    question: "How can you specify custom column order when creating a DataFrame from a dictionary?",
    options: [
      "`pd.DataFrame(dict_data, columns=['Col3', 'Col1', 'Col2'])`",
      "`pd.DataFrame(dict_data).sort_columns()`",
      "`pd.set_column_order(dict_data)`",
      "`dict_data.reorder_keys()`"
    ],
    correctAnswer: 0,
    explanation: "The `columns` parameter in `pd.DataFrame(data, columns=[...])` allows you to explicitly specify the column sequence and subset from the source dictionary."
  }
];

export default questions;
