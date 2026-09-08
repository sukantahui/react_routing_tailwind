// topic9_questions.js
// NumPy Essentials — Topic 9: Fancy Indexing (Integer Array Indexing)
// Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

const topic9_questions = [
  {
    id: 1,
    question: "What is Fancy Indexing in NumPy?",
    options: [
      "Passing arrays or lists of integer indices to access or modify multiple elements at arbitrary positions simultaneously",
      "Formatting arrays with custom CSS colors and fonts",
      "Indexing arrays using floating point decimals",
      "Using complex numbers to access imaginary dimensions"
    ],
    correctAnswer: 0,
    explanation: "Fancy indexing is the term for indexing NumPy arrays using integer arrays, Python lists, or tuples of indices. It allows you to select arbitrary subsets of elements in any desired order and repetition."
  },
  {
    id: 2,
    question: "What is the critical memory difference between standard slicing and fancy indexing?",
    options: [
      "Slicing returns a zero-copy VIEW, while fancy indexing ALWAYS creates and returns a brand-new COPY in memory",
      "Fancy indexing returns a VIEW, while slicing returns a COPY",
      "Both slicing and fancy indexing always create deep copies",
      "Both slicing and fancy indexing always return zero-copy views"
    ],
    correctAnswer: 0,
    explanation: "Standard slicing (e.g. `arr[1:4]`) creates a zero-copy view sharing the original memory buffer. Fancy indexing (e.g. `arr[[1, 3, 5]]`) ALWAYS allocates a new independent array in RAM (so `result.base` is `None`)."
  },
  {
    id: 3,
    question: "What determines the shape of the array returned by fancy indexing?",
    options: [
      "The shape of the index array, NOT the shape of the indexed array",
      "The original shape of the array being indexed",
      "It is always a 1D vector regardless of the index shape",
      "It always matches the total size of the original array"
    ],
    correctAnswer: 0,
    explanation: "In NumPy fancy indexing, the output array reflects the exact shape and dimensionality of the integer index array. For example, indexing a 1D array of 10 items with a (2, 2) index array `arr[np.array([[0, 1], [2, 3]])]` yields a 2D array of shape (2, 2)."
  },
  {
    id: 4,
    question: "What does `mat[[0, 2], [1, 3]]` return on a 4x4 matrix `mat`?",
    options: [
      "A 1D array of 2 elements: `[mat[0, 1], mat[2, 3]]` (paired coordinates)",
      "A 2x2 rectangular submatrix containing rows 0,2 and cols 1,3",
      "A 4x4 boolean mask",
      "An IndexError"
    ],
    correctAnswer: 0,
    explanation: "When you pass two 1D integer arrays of equal length to a 2D matrix, NumPy pairs them up coordinate-by-coordinate: element 1 is `(0, 1)` and element 2 is `(2, 3)`. The result is a 1D array of length 2, NOT a 2x2 grid!"
  },
  {
    id: 5,
    question: "How do you extract a full 2x2 rectangular submatrix for rows [0, 2] and columns [1, 3] using fancy indexing?",
    options: [
      "`mat[np.ix_([0, 2], [1, 3])]` or `mat[[0, 2]][:, [1, 3]]`",
      "`mat[[0, 2], [1, 3]]`",
      "`mat[[0, 2] * [1, 3]]`",
      "`mat.grid([0, 2], [1, 3])`"
    ],
    correctAnswer: 0,
    explanation: "`np.ix_([0, 2], [1, 3])` constructs an open 2D mesh of indices that selects the Cartesian product / cross-grid of rows and columns, correctly returning a 2x2 rectangular submatrix."
  },
  {
    id: 6,
    question: "How do you select specific feature columns 0, 2, and 4 from a 2D dataset matrix `X`?",
    options: [
      "X[:, [0, 2, 4]]",
      "X[[0, 2, 4], :]",
      "X[[0, 2, 4]]",
      "X.columns([0, 2, 4])"
    ],
    correctAnswer: 0,
    explanation: "`X[:, [0, 2, 4]]` uses a colon `:` for axis 0 (keeping all rows/samples) and the integer list `[0, 2, 4]` for axis 1 to select only features at column indices 0, 2, and 4."
  },
  {
    id: 7,
    question: "If `sub = arr[[1, 2]]` and you execute `sub[0] = 999`, what happens to `arr[1]`?",
    options: [
      "It remains completely unchanged because `sub` is an independent COPY",
      "It changes to 999",
      "It raises a ReadOnlyError",
      "The entire array is reset to 0"
    ],
    correctAnswer: 0,
    explanation: "Because fancy indexing creates an independent copy, mutating `sub` has zero effect on the original `arr`. To verify this, check `sub.base is None`."
  },
  {
    id: 8,
    question: "Does direct in-place fancy index assignment like `arr[[0, 3]] = 999` mutate the original array?",
    options: [
      "Yes, in-place fancy index assignment modifies elements 0 and 3 in the original array",
      "No, it creates a copy and discards the assignment",
      "It raises a SyntaxError",
      "Only if `arr` is 2-dimensional"
    ],
    correctAnswer: 0,
    explanation: "When fancy indexing appears on the left side of an assignment operator (`arr[indices] = values`), NumPy directly modifies the target elements in-place within the original array buffer."
  },
  {
    id: 9,
    question: "What happens if you execute `arr = np.zeros(5); arr[[0, 0, 0]] += 1`?",
    options: [
      "`arr[0]` becomes 1 (incremented only once due to buffered assignment)",
      "`arr[0]` becomes 3 (incremented 3 times)",
      "NumPy raises a DuplicateIndexError",
      "`arr[0]` becomes 0"
    ],
    correctAnswer: 0,
    explanation: "This is a famous NumPy trap! In `arr[idx] += 1`, Python extracts `arr[idx]` into a temporary buffer, increments it, and writes it back once. Since index 0 is extracted as 0, adding 1 and writing it back results in 1, not 3!"
  },
  {
    id: 10,
    question: "Which NumPy ufunc method correctly performs repeated in-place additions at duplicate indices?",
    options: [
      "np.add.at(arr, [0, 0, 0], 1)",
      "np.accumulate(arr, [0, 0, 0])",
      "arr.sum_at([0, 0, 0], 1)",
      "np.repeat_add(arr, [0, 0, 0])"
    ],
    correctAnswer: 0,
    explanation: "`np.add.at(arr, indices, values)` performs unbuffered in-place addition. It increments the target index every time it appears, so `np.add.at(arr, [0, 0, 0], 1)` correctly increments `arr[0]` by 3."
  },
  {
    id: 11,
    question: "How do you randomly sample a mini-batch of 32 samples without replacement from a dataset `X` of 1000 samples for Stochastic Gradient Descent (SGD)?",
    options: [
      "batch_idx = np.random.choice(len(X), size=32, replace=False); X_batch = X[batch_idx]",
      "X_batch = X[:32]",
      "X_batch = np.sample(X, 32)",
      "X_batch = X[32]"
    ],
    correctAnswer: 0,
    explanation: "`np.random.choice(len(X), size=32, replace=False)` generates 32 unique random integer indices. Passing `X[batch_idx]` uses fancy indexing to extract those 32 rows as the training mini-batch."
  },
  {
    id: 12,
    question: "How do you perform synchronized dataset shuffling of feature matrix `X` and label vector `y`?",
    options: [
      "perm = np.random.permutation(len(X)); X = X[perm]; y = y[perm]",
      "X = np.shuffle(X); y = np.shuffle(y)",
      "X = X[::-1]; y = y[::-1]",
      "X, y = np.random.shuffle_pair(X, y)"
    ],
    correctAnswer: 0,
    explanation: "`np.random.permutation(len(X))` generates a random permutation of row indices `0` to `len(X)-1`. Applying this identical permutation array to both `X[perm]` and `y[perm]` guarantees that each sample's features remain strictly aligned with its correct label."
  },
  {
    id: 13,
    question: "In neural network cross-entropy loss calculation, how do you extract the predicted probability for the true class of each sample in a batch of size 4?",
    options: [
      "true_probs = predicted_probs[np.arange(4), true_labels]",
      "true_probs = predicted_probs[:, true_labels]",
      "true_probs = predicted_probs[true_labels]",
      "true_probs = np.extract(predicted_probs, true_labels)"
    ],
    correctAnswer: 0,
    explanation: "`np.arange(4)` provides the sample row coordinates `[0, 1, 2, 3]`, and `true_labels` provides the target column coordinates. `predicted_probs[np.arange(4), true_labels]` extracts the predicted probability assigned to the ground-truth class for every sample in the batch."
  },
  {
    id: 14,
    question: "How do you extract the indices that would sort an array `scores` in descending order?",
    options: [
      "sorted_indices = np.argsort(scores)[::-1]",
      "sorted_indices = np.sort_indices(scores, reverse=True)",
      "sorted_indices = scores.sort_keys()",
      "sorted_indices = np.reverse_sort(scores)"
    ],
    correctAnswer: 0,
    explanation: "`np.argsort(scores)` returns the integer indices that sort the array in ascending order. Appending `[::-1]` reverses these indices, giving descending order indices ready for fancy indexing: `top_scores = scores[sorted_indices]`."
  },
  {
    id: 15,
    question: "Can negative integer indices be used inside a fancy indexing list?",
    options: [
      "Yes, negative numbers count from the end of the array (e.g. `arr[[-1, -2]]` extracts the last and second-to-last elements)",
      "No, negative numbers always raise a ValueError in fancy indexing",
      "Only if the array dtype is signed integer",
      "Negative indices invert the sign of the numbers"
    ],
    correctAnswer: 0,
    explanation: "Just like standard Python indexing, negative indices in fancy indexing count backwards from the end of the array. `arr[[-1, -2]]` extracts the last and second-to-last elements."
  },
  {
    id: 16,
    question: "What error occurs if an index in a fancy indexing list exceeds array bounds, e.g. `arr = np.array([10, 20]); arr[[5]]`?",
    options: [
      "IndexError: index 5 is out of bounds for axis 0 with size 2",
      "NumPy returns None",
      "NumPy inserts 0 at index 5",
      "ValueError: size mismatch"
    ],
    correctAnswer: 0,
    explanation: "Fancy indexing does NOT clamp out-of-bounds indices (unlike slice ranges `arr[0:5]`). Any index that is out of bounds strictly raises an `IndexError`."
  },
  {
    id: 17,
    question: "What is the result of `arr[[2, 2, 2]]` on `arr = np.array([10, 20, 30, 40])`?",
    options: [
      "`array([30, 30, 30])`",
      "`array([30])`",
      "ValueError: duplicate indices not allowed",
      "`array([20, 20, 20])`"
    ],
    correctAnswer: 0,
    explanation: "Fancy indexing allows repeated indices. Index 2 (value 30) is repeated three times, producing `array([30, 30, 30])`."
  },
  {
    id: 18,
    question: "How can you combine fancy indexing with standard slicing, e.g., `mat[1:3, [0, 2]]`?",
    options: [
      "It extracts rows 1 and 2 (via slice) and only columns 0 and 2 (via fancy index), returning a (2, 2) array",
      "NumPy forbids mixing slicing and fancy indexing",
      "It flattens the entire matrix into 1D",
      "It produces a 4D tensor"
    ],
    correctAnswer: 0,
    explanation: "NumPy seamlessly combines slicing and fancy indexing. `mat[1:3, [0, 2]]` slices rows 1 to 2 and picks columns 0 and 2, yielding a (2, 2) submatrix."
  },
  {
    id: 19,
    question: "What function in NumPy is an explicit equivalent to 1D fancy indexing along a specified axis?",
    options: [
      "np.take(arr, indices, axis=...)",
      "np.select_indices(arr, indices)",
      "np.extract_axis(arr, indices)",
      "np.gather(arr, indices)"
    ],
    correctAnswer: 0,
    explanation: "`np.take(arr, indices, axis=0)` takes elements from an array along an axis using integer indices, providing a functional equivalent to `arr[indices]`."
  },
  {
    id: 20,
    question: "What happens if Debangshu passes a boolean array `[True, False, True]` where NumPy expects integer fancy indices?",
    options: [
      "NumPy treats it as Boolean Indexing (Masking), not integer indexing",
      "NumPy converts True to 1 and False to 0 and selects indices 1, 0, 1",
      "NumPy crashes with a TypeError",
      "NumPy converts the array into strings"
    ],
    correctAnswer: 0,
    explanation: "If the index array has dtype `bool`, NumPy triggers Boolean Indexing (masking) and selects elements corresponding to `True` entries."
  },
  {
    id: 21,
    question: "Why should you avoid excessive fancy indexing inside tight Python loops during real-time inference?",
    options: [
      "Because fancy indexing allocates new memory copies on the heap every iteration, causing memory fragmentation and GC overhead",
      "Because fancy indexing disables CPU cache lines",
      "Because fancy indexing only works in single-threaded mode",
      "Because fancy indexing truncates floating point precision"
    ],
    correctAnswer: 0,
    explanation: "Because fancy indexing always allocates a fresh memory copy in RAM, calling it millions of times inside a loop increases heap allocations and garbage collection overhead. Where possible, use continuous slices or pre-allocated destination buffers."
  },
  {
    id: 22,
    question: "How do you reorder the columns of a 2D matrix `mat` in reverse order using fancy indexing?",
    options: [
      "mat[:, [3, 2, 1, 0]] (for a matrix with 4 columns)",
      "mat[[3, 2, 1, 0], :]",
      "mat.reverse_cols()",
      "mat[:, -1]"
    ],
    correctAnswer: 0,
    explanation: "Passing `[3, 2, 1, 0]` as the column index array rearranges the columns into reverse order."
  },
  {
    id: 23,
    question: "What is `arr[np.array([1, 0, 3])]` if `arr = np.array(['A', 'B', 'C', 'D'])`?",
    options: [
      "`array(['B', 'A', 'D'], dtype='<U1')`",
      "`array(['A', 'B', 'C'])`",
      "`array(['B', 'A', 'C'])`",
      "`array(['D', 'C', 'B'])`"
    ],
    correctAnswer: 0,
    explanation: "Index 1 is 'B', index 0 is 'A', and index 3 is 'D'. The result is `array(['B', 'A', 'D'])`."
  },
  {
    id: 24,
    question: "How do you assign new values to specific columns [1, 3] across all rows of matrix `mat`?",
    options: [
      "mat[:, [1, 3]] = 0",
      "mat[[1, 3], :] = 0",
      "mat[[1, 3]] = 0",
      "mat.set_cols([1, 3], 0)"
    ],
    correctAnswer: 0,
    explanation: "`mat[:, [1, 3]] = 0` selects columns 1 and 3 across all rows and assigns 0 to all of them in-place."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden rule for preparing training mini-batches with fancy indexing in Barrackpore ML labs?",
    options: [
      "Always generate a random permutation of row indices and apply the SAME index array to both feature matrix X and label vector y: `X_batch, y_batch = X[idx], y[idx]`",
      "Always shuffle X and y independently with separate random calls",
      "Never use fancy indexing for datasets larger than 100 samples",
      "Always convert NumPy matrices to Python lists before batching"
    ],
    correctAnswer: 0,
    explanation: "To preserve the strict 1-to-1 correspondence between features and target labels, you MUST generate a single index array (e.g. via `np.random.permutation` or `np.random.choice`) and apply it simultaneously to both `X` and `y`."
  }
];

export default topic9_questions;
