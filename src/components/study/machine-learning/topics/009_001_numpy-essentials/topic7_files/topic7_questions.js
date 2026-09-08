// topic7_questions.js
// NumPy Essentials — Topic 7: Indexing and Slicing Arrays
// Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

const topic7_questions = [
  {
    id: 1,
    question: "What is the standard syntax for slicing a 1D NumPy array?",
    options: [
      "arr[start : stop : step]",
      "arr(start, stop, step)",
      "arr{start to stop by step}",
      "arr[start .. stop .. step]"
    ],
    correctAnswer: 0,
    explanation: "NumPy uses the standard Python slicing syntax `arr[start:stop:step]`, where `start` is the inclusive starting index (default 0), `stop` is the exclusive ending index (default array length), and `step` is the stride between elements (default 1)."
  },
  {
    id: 2,
    question: "In NumPy slicing `arr[2:7]`, which indices are actually included in the resulting slice?",
    options: [
      "Indices 2, 3, 4, 5, 6, and 7",
      "Indices 2, 3, 4, 5, and 6 only (stop index 7 is exclusive)",
      "Indices 3, 4, 5, 6, and 7 only",
      "Indices 2 and 7 only"
    ],
    correctAnswer: 1,
    explanation: "In Python and NumPy slicing, the `stop` index is strictly exclusive. Therefore, `arr[2:7]` extracts elements at index 2, 3, 4, 5, and 6 (total 7 - 2 = 5 elements)."
  },
  {
    id: 3,
    question: "How do you extract the last 3 elements of a 1D array `scores`?",
    options: [
      "scores[-3:]",
      "scores[:-3]",
      "scores[-1:-3]",
      "scores[3:]"
    ],
    correctAnswer: 0,
    explanation: "Negative indexing counts from the end of the array. `scores[-3:]` starts at index -3 (the 3rd element from the end) and includes all elements up to the end of the array."
  },
  {
    id: 4,
    question: "How do you reverse a 1D NumPy array in O(1) time without copying memory?",
    options: [
      "arr.reverse()",
      "arr[::-1]",
      "np.flip_copy(arr)",
      "arr[-1:0:1]"
    ],
    correctAnswer: 1,
    explanation: "`arr[::-1]` slices the entire array with a negative step of -1. In NumPy, this produces a zero-copy view with reversed strides in instantaneous O(1) time."
  },
  {
    id: 5,
    question: "How does 2D matrix indexing syntax in NumPy differ from standard nested Python lists?",
    options: [
      "NumPy uses `mat[row, col]` in a single bracket, while Python lists require `list[row][col]`",
      "NumPy uses curly braces `mat{row, col}`",
      "NumPy requires 1-based indexing instead of 0-based",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "In NumPy, multi-axis indexing is performed using comma-separated indices inside a single pair of brackets: `mat[row, col]`. Standard Python lists require chained brackets `nested_list[row][col]`, which creates intermediate list objects."
  },
  {
    id: 6,
    question: "What is the result of `mat[:, 0]` on a 2D array of shape (4, 5)?",
    options: [
      "A 2D array of shape (4, 1)",
      "A 1D array of shape (4,) containing all elements of the first column (column index 0)",
      "The single scalar element at row 0, col 0",
      "A 1D array containing the first row"
    ],
    correctAnswer: 1,
    explanation: "The colon `:` in the first axis selects all rows, and `0` selects column 0. Because an integer index is used for the column, the dimension is reduced by 1, returning a 1D vector of shape (4,)."
  },
  {
    id: 7,
    question: "What is the crucial memory difference between slicing a NumPy ndarray and slicing a Python list?",
    options: [
      "NumPy slices create zero-copy VIEWS sharing the same RAM buffer, while Python list slices create independent new copies",
      "NumPy slices always allocate double RAM, while Python list slices share memory",
      "NumPy slices are read-only and cannot be modified",
      "NumPy slices convert all data into strings"
    ],
    correctAnswer: 0,
    explanation: "Unlike Python lists where `my_list[1:4]` creates a brand-new list copy, NumPy slices return VIEWS of the original array buffer. Modifying values in a NumPy slice directly changes the original array!"
  },
  {
    id: 8,
    question: "If `sub = arr[0:2, 0:2]` and you execute `sub[0, 0] = 999`, what happens to `arr[0, 0]`?",
    options: [
      "It remains unchanged",
      "It also changes to 999 because `sub` is a view sharing memory with `arr`",
      "Python raises a PermissionError",
      "The entire array `arr` is filled with 999"
    ],
    correctAnswer: 1,
    explanation: "Because `sub` is a zero-copy view, `sub[0, 0]` references the exact same memory address as `arr[0, 0]`. Therefore, mutating `sub` mutates `arr`."
  },
  {
    id: 9,
    question: "How do you safely create a submatrix slice that will NOT mutate the original array when modified?",
    options: [
      "sub = arr[0:2, 0:2].copy()",
      "sub = arr[0:2, 0:2].clone()",
      "sub = arr[0:2, 0:2].detach()",
      "sub = np.freeze(arr[0:2, 0:2])"
    ],
    correctAnswer: 0,
    explanation: "Calling `.copy()` explicitly allocates a new, independent memory buffer in RAM. Modifying `sub` will not affect the original array."
  },
  {
    id: 10,
    question: "In Machine Learning tabular data preprocessing, what do `dataset[:, :-1]` and `dataset[:, -1]` extract?",
    options: [
      "`dataset[:, :-1]` extracts feature matrix X (all columns except last), and `dataset[:, -1]` extracts target vector y (the last column)",
      "`dataset[:, :-1]` extracts target labels, and `dataset[:, -1]` extracts features",
      "`dataset[:, :-1]` extracts the first row, and `dataset[:, -1]` extracts the last row",
      "They both extract the entire dataset unchanged"
    ],
    correctAnswer: 0,
    explanation: "In tabular ML datasets, the target label is conventionally placed in the final column. `dataset[:, :-1]` selects all rows and all columns up to the second-to-last column (Feature Matrix X), while `dataset[:, -1]` extracts only the final column (Target Vector y)."
  },
  {
    id: 11,
    question: "What is the difference between `mat[0, :]` and `mat[0:1, :]` for a matrix with shape (5, 4)?",
    options: [
      "They produce identical shapes and dimensions",
      "`mat[0, :]` uses integer indexing and reduces dimension to shape (4,) [1D], while `mat[0:1, :]` uses slice notation and preserves 2D structure with shape (1, 4)",
      "`mat[0:1, :]` extracts 2 rows instead of 1",
      "`mat[0, :]` raises an IndexError"
    ],
    correctAnswer: 1,
    explanation: "Integer indexing drops that dimension (ndim becomes ndim - 1), producing a 1D vector of shape (4,). Using slice notation `0:1` keeps the axis, producing a 2D row matrix of shape (1, 4)."
  },
  {
    id: 12,
    question: "How do you extract a 2x2 submatrix from rows 1 to 2 and columns 2 to 3 of `mat`?",
    options: [
      "mat[1:3, 2:4]",
      "mat[1:2, 2:3]",
      "mat[[1, 2], [2, 3]]",
      "mat[1..3, 2..4]"
    ],
    correctAnswer: 0,
    explanation: "To include rows 1 and 2, the slice range is `1:3` (stop index 3 is exclusive). To include columns 2 and 3, the slice range is `2:4`. Thus, `mat[1:3, 2:4]` extracts the 2x2 submatrix."
  },
  {
    id: 13,
    question: "What does `mat[::2, ::2]` extract from a 2D matrix?",
    options: [
      "Every alternating row and every alternating column (strided sub-grid)",
      "The entire matrix twice",
      "Only the first 2 rows and first 2 columns",
      "The diagonal elements only"
    ],
    correctAnswer: 0,
    explanation: "The slice `::2` means start from 0 to the end with a step of 2. Applying `::2` across both rows and columns extracts elements at (even row, even col), subsampling the grid."
  },
  {
    id: 14,
    question: "How do you crop a bounding box of an RGB image tensor `img` of shape (1080, 1920, 3) from y: 100 to 400 and x: 200 to 700?",
    options: [
      "img[100:400, 200:700, :]",
      "img[200:700, 100:400, :]",
      "img[100:400, 200:700]",
      "img.crop(100, 400, 200, 700)"
    ],
    correctAnswer: 0,
    explanation: "Images are structured as (Height/Y, Width/X, Channels). Slicing `img[100:400, 200:700, :]` crops the Y range (rows 100 to 399) and X range (columns 200 to 699) across all 3 color channels (:)."
  },
  {
    id: 15,
    question: "What happens if you slice an array with indices larger than the array size, e.g., `arr = np.array([10, 20, 30]); arr[1:100]`?",
    options: [
      "It raises IndexError: index out of bounds",
      "NumPy safely clamps the slice to the available array length and returns `[20, 30]` without error",
      "It fills missing cells with zeros up to index 100",
      "It raises a ValueError"
    ],
    correctAnswer: 1,
    explanation: "Like standard Python list slicing, NumPy slice boundaries that exceed array dimensions do not raise IndexError; they are automatically clamped to the actual length of the array."
  },
  {
    id: 16,
    question: "What happens if you access an out-of-bounds scalar index `arr = np.array([10, 20, 30]); print(arr[100])`?",
    options: [
      "It returns None",
      "It returns 0",
      "It raises IndexError: index 100 is out of bounds for axis 0 with size 3",
      "It automatically resizes the array"
    ],
    correctAnswer: 2,
    explanation: "Direct integer indexing with an invalid index strictly raises an `IndexError`. Only slice syntax (`start:stop`) gracefully clamps out-of-bounds boundaries."
  },
  {
    id: 17,
    question: "How do you set all elements in the first column of a 2D matrix `mat` to zero in one line?",
    options: [
      "mat[:, 0] = 0",
      "mat[0, :] = 0",
      "mat[:, 0].set(0)",
      "np.zeros(mat[:, 0])"
    ],
    correctAnswer: 0,
    explanation: "`mat[:, 0] = 0` uses slice assignment and broadcasting to assign the scalar 0 to all row entries in column 0 in-place."
  },
  {
    id: 18,
    question: "What does the Ellipsis `...` do in multi-dimensional slicing like `tensor[..., 0]`?",
    options: [
      "It represents a syntax error",
      "It expands to as many full-slice colons `:` as needed to match all preceding dimensions",
      "It prints a debug message to the console",
      "It selects only elements with odd indices"
    ],
    correctAnswer: 1,
    explanation: "The Ellipsis `...` is shorthand for multiple full `:` slices across all unspecified axes. For a 4D tensor `(Batch, Height, Width, Channels)`, `tensor[..., 0]` is equivalent to `tensor[:, :, :, 0]`."
  },
  {
    id: 19,
    question: "How do you split a dataset of 1,000 samples into 800 training samples and 200 testing samples using slicing?",
    options: [
      "X_train, X_test = X[:800, :], X[800:, :]",
      "X_train, X_test = X[800:, :], X[:800, :]",
      "X_train, X_test = X[:, :800], X[:, 800:]",
      "X_train, X_test = X.split(800, 200)"
    ],
    correctAnswer: 0,
    explanation: "`X[:800, :]` extracts rows 0 to 799 (800 training samples), and `X[800:, :]` extracts rows 800 to 999 (200 testing samples)."
  },
  {
    id: 20,
    question: "What is `arr[-4:-1]` on `arr = np.array([10, 20, 30, 40, 50, 60])`?",
    options: [
      "`[30, 40, 50]`",
      "`[20, 30, 40]`",
      "`[30, 40, 50, 60]`",
      "`[40, 50, 60]`"
    ],
    correctAnswer: 0,
    explanation: "Index -4 corresponds to 30 (len 6 - 4 = index 2). Index -1 corresponds to 60 (len 6 - 1 = index 5, exclusive). Thus, elements at indices 2, 3, 4 are selected: `[30, 40, 50]`."
  },
  {
    id: 21,
    question: "When Susmita slices `marks[:: -1, :]`, what does NumPy do to the 2D marks matrix?",
    options: [
      "Reverses the order of the columns while keeping row order intact",
      "Reverses the order of the rows (top to bottom inverted) while keeping column order intact",
      "Rotates the matrix by 90 degrees",
      "Calculates the negative of all marks"
    ],
    correctAnswer: 1,
    explanation: "`marks[::-1, :]` applies a negative step of -1 to axis 0 (rows), which flips the vertical order of the rows from bottom to top while keeping column order untouched."
  },
  {
    id: 22,
    question: "Can you assign a 1D vector to a slice of a 2D matrix, such as `mat[0, :] = np.array([1, 2, 3, 4])`?",
    options: [
      "No, NumPy raises a ShapeMismatchError",
      "Yes, provided the length of the vector matches the number of columns in `mat`",
      "Only if `mat` is an integer array",
      "Only if `mat` has shape (1, 4)"
    ],
    correctAnswer: 1,
    explanation: "Yes, NumPy allows broadcastable slice assignments. If `mat` has 4 columns, assigning a 4-element 1D array to `mat[0, :]` overwrites row 0 with those values in-place."
  },
  {
    id: 23,
    question: "What is the shape of `arr[:, np.newaxis, :]` when `arr` has shape (10, 20)?",
    options: [
      "(10, 20)",
      "(10, 1, 20)",
      "(1, 10, 20)",
      "(10, 20, 1)"
    ],
    correctAnswer: 1,
    explanation: "Inserting `np.newaxis` at index position 1 expands the dimensionality by adding a singleton axis between axis 0 and axis 1, transforming shape (10, 20) into (10, 1, 20)."
  },
  {
    id: 24,
    question: "Why is slicing inside a Python loop in a machine learning training epoch so fast in NumPy?",
    options: [
      "Because slicing is an O(1) metadata view operation with no RAM allocation or memory duplication",
      "Because NumPy automatically compresses tensors with gzip during iteration",
      "Because Python disables garbage collection during slicing",
      "Because slices are converted to C++ pointers and deleted immediately"
    ],
    correctAnswer: 0,
    explanation: "Creating slices simply computes new pointer offsets and strides without moving memory or allocating new heap buffers. This zero-copy property makes NumPy batch slicing extremely fast and scalable."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden recommendation when doing exploratory data transformations on slices of student marks?",
    options: [
      "Always modify slices directly without checking views",
      "Always call `.copy()` on the extracted slice if your subsequent transformations should NOT alter the original master dataset",
      "Always convert the NumPy array to a Python dictionary before slicing",
      "Never slice arrays with more than 10 elements"
    ],
    correctAnswer: 1,
    explanation: "Because NumPy slices are views, modifying a slice silently corrupts the master dataset. If you intend to clean or normalize an extracted sub-dataset independently, always use `.copy()`."
  }
];

export default topic7_questions;
