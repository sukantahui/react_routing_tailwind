const questions = [
  {
    id: 1,
    question: "Which of the following operations in NumPy creates an independent COPY in memory rather than a shared memory VIEW?",
    options: [
      "arr[1:5] (Basic Slicing)",
      "arr.T (Matrix Transposition)",
      "arr[[0, 2, 4]] (Fancy Integer Indexing)",
      "arr.reshape(2, -1) (Reshaping contiguous array)"
    ],
    correctAnswer: 2,
    explanation: "Fancy indexing with integer or boolean arrays always creates a brand-new allocated copy. Basic slicing, transposition (.T), and reshape return memory views pointing to the original buffer."
  },
  {
    id: 2,
    question: "Why does `np.nan == np.nan` evaluate to `False` in Python / NumPy?",
    options: [
      "Because of a bug in NumPy's equality operator.",
      "Because according to IEEE 754 floating-point standard, NaN represents an undefined/unrepresentable value that is not equal to anything, including itself.",
      "Because one NaN is float32 and the other is float64.",
      "Because np.nan is a string object."
    ],
    correctAnswer: 1,
    explanation: "Under IEEE 754 rules, NaN != NaN. To check for NaN values in NumPy arrays, you must use `np.isnan(arr)`."
  },
  {
    id: 3,
    question: "What is the primary difference between `arr.flatten()` and `arr.ravel()`?",
    options: [
      "flatten() always returns a memory copy, while ravel() returns a memory view whenever possible.",
      "flatten() only works on 2D arrays, while ravel() works on 3D arrays.",
      "ravel() sorts the array elements in ascending order.",
      "There is no difference in runtime behavior."
    ],
    correctAnswer: 0,
    explanation: "`flatten()` guarantees a newly allocated 1D copy of the array. `ravel()` returns a 1D view whenever data is contiguous, avoiding unnecessary memory allocation."
  },
  {
    id: 4,
    question: "If matrix A has shape (5, 3) and matrix B has shape (3, 2), what is the shape of `A @ B` and why does `A * B` fail?",
    options: [
      "A @ B is (5, 2); A * B fails because shapes (5, 3) and (3, 2) cannot be broadcast together for element-wise multiplication.",
      "A @ B is (3, 3); A * B produces (5, 2).",
      "A @ B is (2, 5); A * B produces zeros.",
      "Both operations produce shape (5, 2)."
    ],
    correctAnswer: 0,
    explanation: "`A @ B` satisfies inner dimension matching (5, 3) @ (3, 2) -> (5, 2). `A * B` requires either identical shapes or valid broadcasting (3 != 2 and 5 != 3), which causes a ValueError."
  },
  {
    id: 5,
    question: "What is the effect of setting `keepdims=True` in reduction operations like `np.mean(X, axis=0, keepdims=True)` on a (100, 10) matrix?",
    options: [
      "It keeps the result as shape (1, 10) instead of collapsing it to a 1D array of shape (10,), enabling seamless downstream 2D broadcasting.",
      "It keeps only positive dimensions.",
      "It preserves the original data from being overwritten.",
      "It stores the array on disk."
    ],
    correctAnswer: 0,
    explanation: "`keepdims=True` prevents axis reduction from stripping the dimension, preserving shape `(1, 10)`, which aligns perfectly for broadcasting without requiring manual `reshape` or `np.newaxis`."
  }
];

export default questions;
