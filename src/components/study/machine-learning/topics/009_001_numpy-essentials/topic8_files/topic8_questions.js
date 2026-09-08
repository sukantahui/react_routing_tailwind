// topic8_questions.js
// NumPy Essentials — Topic 8: Boolean Indexing (Masking)
// Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

const topic8_questions = [
  {
    id: 1,
    question: "What is Boolean Indexing (Masking) in NumPy?",
    options: [
      "A technique that uses an array of True/False boolean values to select or modify specific elements of an ndarray",
      "A sorting algorithm based on Boolean logic gates",
      "A method to convert all numerical numbers into binary strings '0' and '1'",
      "A way to encrypt NumPy arrays with boolean passwords"
    ],
    correctAnswer: 0,
    explanation: "Boolean indexing (also called masking) creates a boolean array of True/False values by evaluating a condition element-wise. Passing this mask inside brackets `arr[mask]` selects only the elements where the mask evaluates to True."
  },
  {
    id: 2,
    question: "What does the expression `scores >= 50` return when `scores = np.array([35, 72, 48, 90])`?",
    options: [
      "A single boolean value `True`",
      "A boolean ndarray: `array([False, True, False, True])`",
      "A Python list `[72, 90]`",
      "An integer count `2`"
    ],
    correctAnswer: 1,
    explanation: "Relational operators on NumPy arrays are vectorized. The comparison `scores >= 50` evaluates element-by-element, returning a boolean ndarray of the exact same shape containing `[False, True, False, True]`."
  },
  {
    id: 3,
    question: "What is the shape of the result when filtering a 2D matrix of shape (4, 5) with a boolean mask `mat[mat > 50]`?",
    options: [
      "Always a 2D matrix of shape (4, 5)",
      "A 1D vector of shape (k,) where k is the count of True elements",
      "A tuple containing row and column indices",
      "A scalar number"
    ],
    correctAnswer: 1,
    explanation: "Because different rows in a 2D matrix generally have different numbers of matching elements, NumPy cannot return a rectangular 2D matrix. Therefore, boolean indexing on multidimensional arrays always flattens the matching elements into a 1D vector."
  },
  {
    id: 4,
    question: "Which operators must be used to combine multiple boolean conditions on NumPy arrays?",
    options: [
      "`and`, `or`, `not`",
      "`&` (AND), `|` (OR), `~` (NOT)",
      "`&&`, `||`, `!`",
      "`AND()`, `OR()`, `NOT()`"
    ],
    correctAnswer: 1,
    explanation: "In NumPy, you must use bitwise operators `&` (element-wise AND), `|` (element-wise OR), and `~` (element-wise NOT/Inversion). Standard Python keywords `and`/`or` evaluate truthiness of the entire array object, which fails."
  },
  {
    id: 5,
    question: "Why does `scores > 40 and scores < 80` raise a ValueError in Python?",
    options: [
      "Because Python doesn't support the 'and' keyword",
      "Because Python's 'and' expects a single scalar boolean, but `scores > 40` is an array of booleans, causing 'The truth value of an array with more than one element is ambiguous'",
      "Because scores must be sorted before using 'and'",
      "Because Python converts 'and' into addition"
    ],
    correctAnswer: 1,
    explanation: "Python's logical `and` evaluates whether the operand as a whole is truthy by calling `bool(operand)`. Because an array contains multiple boolean items, NumPy cannot decide if the entire array is True or False, raising `ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()`."
  },
  {
    id: 6,
    question: "Why must parentheses enclose each sub-condition, as in `(scores > 40) & (scores < 80)`?",
    options: [
      "Because parentheses are optional stylistic syntax in Python",
      "Because bitwise `&` has higher operator precedence than comparison operators (`>`, `<`), causing `40 & scores` to be evaluated first without parentheses",
      "Because NumPy requires all numbers to be in tuples",
      "Because without parentheses, Python executes code in Fortran order"
    ],
    correctAnswer: 1,
    explanation: "In Python's operator precedence table, `&` binds tighter than `<` and `>`. Writing `scores > 40 & scores < 80` is evaluated as `scores > (40 & scores) < 80`, which causes a TypeError or logical error. Parentheses are strictly mandatory!"
  },
  {
    id: 7,
    question: "How do you implement the Neural Network ReLU (Rectified Linear Unit) activation function on an array in one line using boolean indexing?",
    options: [
      "arr[arr < 0] = 0",
      "arr = arr.relu()",
      "arr[arr > 0] = 0",
      "np.relu_mask(arr)"
    ],
    correctAnswer: 0,
    explanation: "The ReLU activation function is defined as f(x) = max(0, x). In NumPy, writing `arr[arr < 0] = 0` finds all negative values and replaces them with 0 in-place."
  },
  {
    id: 8,
    question: "How does `np.where(condition, x, y)` differ from boolean indexing `arr[condition]`?",
    options: [
      "`np.where(condition, x, y)` acts as a vectorized ternary if-else operator and preserves the original multidimensional shape, whereas `arr[condition]` returns a flattened 1D array",
      "`np.where()` only works on strings",
      "`np.where()` is slower and always deletes unmatched cells",
      "They are identical in all aspects"
    ],
    correctAnswer: 0,
    explanation: "`np.where(cond, x, y)` evaluates each element: if True it selects `x`, if False it selects `y`. It preserves the exact shape and dimensions of the input array without collapsing or flattening it into 1D."
  },
  {
    id: 9,
    question: "How can you count the total number of students who scored 75 or higher in a 1D array `scores`?",
    options: [
      "np.sum(scores >= 75) or np.count_nonzero(scores >= 75)",
      "len(scores >= 75)",
      "scores.count(75)",
      "scores.sum_if(75)"
    ],
    correctAnswer: 0,
    explanation: "In Python/NumPy, `True` evaluates to 1 and `False` to 0 in arithmetic contexts. Thus, `np.sum(scores >= 75)` sums the 1s, directly yielding the count. `np.count_nonzero(scores >= 75)` is an equally fast and explicit alternative."
  },
  {
    id: 10,
    question: "What does `np.any(errors > 0.05)` return?",
    options: [
      "An array of all errors greater than 0.05",
      "A single boolean `True` if AT LEAST ONE element in `errors` is greater than 0.05, otherwise `False`",
      "A single boolean `True` only if ALL elements are greater than 0.05",
      "The index of the first error"
    ],
    correctAnswer: 1,
    explanation: "`np.any()` tests whether any element along a given axis evaluates to True. It returns a single scalar boolean `True` if at least one element meets the condition."
  },
  {
    id: 11,
    question: "What does `np.all(accuracies >= 0.90)` return?",
    options: [
      "A scalar boolean `True` only if EVERY SINGLE element in `accuracies` is >= 0.90, otherwise `False`",
      "A count of all accuracies >= 0.90",
      "A filtered array containing numbers >= 0.90",
      "A string 'ALL PASS'"
    ],
    correctAnswer: 0,
    explanation: "`np.all()` tests whether all elements evaluate to True. It returns `True` only if every element in the array satisfies the condition."
  },
  {
    id: 12,
    question: "In Machine Learning classification, how do you extract all feature rows from matrix `X` where target label `y == 1`?",
    options: [
      "X_positive = X[y == 1]",
      "X_positive = X.filter(y == 1)",
      "X_positive = X[:, y == 1]",
      "X_positive = X[y = 1]"
    ],
    correctAnswer: 0,
    explanation: "`y == 1` produces a 1D boolean mask of shape `(n_samples,)`. Applying `X[y == 1]` indexes along axis 0 (the sample rows) of matrix `X`, extracting all samples belonging to the positive class."
  },
  {
    id: 13,
    question: "How do you filter out NaN (missing) values from a 1D dataset `raw_data`?",
    options: [
      "clean = raw_data[raw_data != np.nan]",
      "clean = raw_data[~np.isnan(raw_data)]",
      "clean = raw_data.drop_nan()",
      "clean = raw_data[raw_data.not_null()]"
    ],
    correctAnswer: 1,
    explanation: "Under IEEE 754 floating point standards, `np.nan == np.nan` evaluates to `False`, so `raw_data != np.nan` does NOT work! You must use `np.isnan(raw_data)` and invert it with `~` to select non-NaN elements: `raw_data[~np.isnan(raw_data)]`."
  },
  {
    id: 14,
    question: "How do you cap all outlier values in `arr` that exceed 100 so that no value is greater than 100?",
    options: [
      "arr[arr > 100] = 100",
      "arr[100] = arr[arr > 100]",
      "arr.cap(100)",
      "arr = arr > 100"
    ],
    correctAnswer: 0,
    explanation: "`arr[arr > 100] = 100` uses boolean mask assignment to update all elements strictly greater than 100 to the scalar value 100 in-place."
  },
  {
    id: 15,
    question: "What does `(probabilities >= 0.5).astype(int)` do in a binary classification pipeline?",
    options: [
      "Converts predicted probability floats into discrete binary class labels 0 and 1",
      "Multiplies all probabilities by 50",
      "Throws an error because booleans cannot be cast to integers",
      "Rounds probabilities to 2 decimal places"
    ],
    correctAnswer: 0,
    explanation: "The condition `probabilities >= 0.5` generates a boolean mask (`True` for >= 0.5, `False` for < 0.5). Calling `.astype(int)` converts `True` -> 1 and `False` -> 0, producing standard binary class predictions."
  },
  {
    id: 16,
    question: "What function returns the tuple of coordinate indices where a boolean mask is True?",
    options: [
      "np.nonzero(mask) or np.where(mask)",
      "np.indices_of(mask)",
      "mask.get_coordinates()",
      "np.find(mask)"
    ],
    correctAnswer: 0,
    explanation: "When called with only a condition (no `x` and `y` arguments), `np.where(condition)` is equivalent to `np.nonzero(condition)`. It returns a tuple of index arrays indicating where the condition is True."
  },
  {
    id: 17,
    question: "What does `~` (tilde) do to a boolean mask array `mask`?",
    options: [
      "It inverts the mask: True becomes False, and False becomes True",
      "It deletes all False elements",
      "It calculates the bitwise average",
      "It shifts the array by one position"
    ],
    correctAnswer: 0,
    explanation: "The `~` operator performs element-wise logical NOT inversion. For example, `~np.array([True, False])` produces `array([False, True])`."
  },
  {
    id: 18,
    question: "How do you select all elements in `arr` that are divisible by 3 and greater than 20?",
    options: [
      "arr[(arr % 3 == 0) & (arr > 20)]",
      "arr[arr % 3 == 0 and arr > 20]",
      "arr[arr % 3 == 0, arr > 20]",
      "arr((arr % 3 == 0) && (arr > 20))"
    ],
    correctAnswer: 0,
    explanation: "`arr % 3 == 0` checks divisibility by 3, `arr > 20` checks magnitude. Combining them with bitwise `&` and wrapping in parentheses yields `arr[(arr % 3 == 0) & (arr > 20)]`."
  },
  {
    id: 19,
    question: "What happens if a boolean mask has a shape of (5,) but the array being indexed has a shape of (6,)?",
    options: [
      "NumPy automatically pads the mask with False",
      "NumPy raises an IndexError: boolean index did not match indexed array along dimension 0; dimension is 6 but corresponding boolean dimension is 5",
      "NumPy ignores the 6th element silently",
      "NumPy repeats the mask"
    ],
    correctAnswer: 1,
    explanation: "Boolean mask dimensions must match the indexed dimension exactly (or be broadcastable). A mismatch in axis length raises an `IndexError`."
  },
  {
    id: 20,
    question: "How do you replace all NaN values in an array `data` with the mean of the non-NaN values?",
    options: [
      "mean_val = np.nanmean(data); data[np.isnan(data)] = mean_val",
      "data[data == np.nan] = data.mean()",
      "data.fillna(data.mean())",
      "data[np.isnan(data)] = np.nan"
    ],
    correctAnswer: 0,
    explanation: "`np.nanmean(data)` computes the mean ignoring NaNs. Then, boolean mask assignment `data[np.isnan(data)] = mean_val` replaces all NaN entries with the calculated mean in-place."
  },
  {
    id: 21,
    question: "If `arr = np.array([10, 20, 30, 40, 50])`, what is `arr[np.array([True, False, True, False, True])]`?",
    options: [
      "`array([10, 30, 50])`",
      "`array([20, 40])`",
      "`array([True, True, True])`",
      "`array([10, 20, 30, 40, 50])`"
    ],
    correctAnswer: 0,
    explanation: "The boolean mask has `True` at index 0, 2, and 4. Indexing `arr` with this mask extracts elements at those indices: `[10, 30, 50]`."
  },
  {
    id: 22,
    question: "How does boolean indexing compare in speed to Python list comprehensions `[x for x in lst if x > 50]`?",
    options: [
      "NumPy boolean indexing runs 50x-100x faster in compiled C without Python interpreter overhead or dynamic type checking",
      "List comprehensions are faster because they don't use masks",
      "They have identical performance",
      "List comprehensions use GPU acceleration"
    ],
    correctAnswer: 0,
    explanation: "NumPy performs vectorized boolean evaluations and element extractions in compiled C loops with contiguous memory buffers and CPU SIMD instructions, making it orders of magnitude faster than Python bytecode loops."
  },
  {
    id: 23,
    question: "What is the result of `np.sum(np.array([True, True, False, True, False]))`?",
    options: [
      "3",
      "5",
      "True",
      "TypeError"
    ],
    correctAnswer: 0,
    explanation: "In numerical aggregations, NumPy treats `True` as integer 1 and `False` as integer 0. The sum of 3 Trues and 2 Falses is 1 + 1 + 0 + 1 + 0 = 3."
  },
  {
    id: 24,
    question: "How do you extract all elements in matrix `mat` that fall within 2 standard deviations of the mean (Z-score outlier filtering)?",
    options: [
      "mat[np.abs(mat - np.mean(mat)) <= 2 * np.std(mat)]",
      "mat[mat.z_score() <= 2]",
      "mat[mat.mean() +- 2 * mat.std()]",
      "np.filter_outliers(mat, 2)"
    ],
    correctAnswer: 0,
    explanation: "The 2-sigma rule filters elements where the absolute deviation from the mean `|x - mu|` is less than or equal to `2 * sigma`. In NumPy, this is expressed as `mat[np.abs(mat - np.mean(mat)) <= 2 * np.std(mat)]`."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden rule when combining multiple filtering criteria in Barrackpore student data processing?",
    options: [
      "Always wrap each condition in parentheses `(cond1) & (cond2)` and never use `and` / `or`",
      "Always convert the array to strings first",
      "Always filter one condition per for-loop",
      "Never filter more than 100 rows at a time"
    ],
    correctAnswer: 0,
    explanation: "To avoid the fatal operator precedence trap where bitwise `&` binds tighter than comparisons, always enclose every individual comparison in parentheses `(scores >= 40) & (scores <= 100)` and strictly avoid Python's `and`/`or` keywords."
  }
];

export default topic8_questions;
