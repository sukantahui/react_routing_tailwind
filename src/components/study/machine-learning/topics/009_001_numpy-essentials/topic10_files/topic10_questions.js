// topic10_questions.js
// NumPy Essentials — Topic 10: Array Arithmetic Operations
// Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

const topic10_questions = [
  {
    id: 1,
    question: "What is the key difference between adding two Python lists vs adding two NumPy ndarrays?",
    options: [
      "`list1 + list2` concatenates the two lists end-to-end, while `arr1 + arr2` performs element-wise addition across corresponding positions",
      "`list1 + list2` calculates the sum, while `arr1 + arr2` raises an error",
      "They behave identically",
      "`arr1 + arr2` converts all numbers to strings"
    ],
    correctAnswer: 0,
    explanation: "In standard Python, `[1, 2] + [3, 4]` produces `[1, 2, 3, 4]` (concatenation). In NumPy, `np.array([1, 2]) + np.array([3, 4])` executes element-wise vector addition, yielding `array([4, 6])`."
  },
  {
    id: 2,
    question: "What is the result of `np.array([2, 4, 6]) * np.array([3, 2, 5])`?",
    options: [
      "`array([6, 8, 30])`",
      "A single dot product scalar `44`",
      "`array([5, 6, 11])`",
      "A 3x3 matrix"
    ],
    correctAnswer: 0,
    explanation: "The `*` operator in NumPy performs element-wise multiplication (also known as the Hadamard product): 2*3=6, 4*2=8, 6*5=30, yielding `array([6, 8, 30])`."
  },
  {
    id: 3,
    question: "Which operator is used for linear algebra matrix multiplication (dot product) in modern Python/NumPy?",
    options: [
      "`@` (e.g. `A @ B`) or `np.dot(A, B)`",
      "`*` (e.g. `A * B`)",
      "`**` (e.g. `A ** B`)",
      "`&` (e.g. `A & B`)"
    ],
    correctAnswer: 0,
    explanation: "`@` is Python's dedicated matrix multiplication operator, equivalent to `np.matmul(A, B)` or `np.dot(A, B)`. The standard `*` operator is strictly reserved for element-by-element Hadamard multiplication."
  },
  {
    id: 4,
    question: "What is the equivalent Universal Function (ufunc) for the `-` subtraction operator in NumPy?",
    options: [
      "np.subtract(a, b)",
      "np.sub(a, b)",
      "np.minus(a, b)",
      "np.diff(a, b)"
    ],
    correctAnswer: 0,
    explanation: "`np.subtract(a, b)` is the underlying C-implemented universal function called by the `-` operator."
  },
  {
    id: 5,
    question: "What happens when dividing by zero in NumPy, e.g. `np.array([10.0]) / np.array([0.0])`?",
    options: [
      "NumPy prints a RuntimeWarning and returns `array([inf])` without crashing the program",
      "Python crashes immediately with a `ZeroDivisionError`",
      "NumPy converts the number to 0",
      "The program enters an infinite loop"
    ],
    correctAnswer: 0,
    explanation: "Unlike pure Python which raises `ZeroDivisionError: division by zero`, NumPy follows IEEE 754 floating point standards. It emits a `RuntimeWarning: divide by zero encountered in divide` and returns positive infinity (`np.inf`), negative infinity (`-np.inf`), or `np.nan` (for 0.0 / 0.0)."
  },
  {
    id: 6,
    question: "What is the value of `0.0 / 0.0` in a NumPy floating-point array?",
    options: [
      "`nan` (Not a Number)",
      "`0.0`",
      "`inf`",
      "`1.0`"
    ],
    correctAnswer: 0,
    explanation: "In IEEE 754 arithmetic, 0 divided by 0 is mathematically undefined, so NumPy returns `np.nan` (Not a Number)."
  },
  {
    id: 7,
    question: "Why does `int_arr += 1.5` raise a TypeError if `int_arr` has dtype `int32`?",
    options: [
      "Because in-place assignment (`+=`) cannot change the array's underlying dtype from integer to float in the existing memory buffer",
      "Because NumPy doesn't support floating point numbers",
      "Because 1.5 is an invalid number in Python",
      "Because addition is only supported for integers"
    ],
    correctAnswer: 0,
    explanation: "In-place operations modify the existing memory buffer in-place. Because an integer array buffer cannot store 64-bit floating point decimals without reallocating memory, NumPy enforces safe casting and raises `TypeError: Cannot cast ufunc 'add' output from dtype('float64') to dtype('int32') with casting rule 'same_kind'`."
  },
  {
    id: 8,
    question: "How do you normalize grayscale image pixels with range [0, 255] into floating point range [0.0, 1.0] in one line?",
    options: [
      "normalized_img = img / 255.0",
      "normalized_img = img.normalize(255)",
      "normalized_img = img % 255",
      "normalized_img = img // 255"
    ],
    correctAnswer: 0,
    explanation: "Scalar division `img / 255.0` divides every pixel intensity by 255.0 via vectorized broadcasting, scaling all values into the standard neural network input range `[0.0, 1.0]`."
  },
  {
    id: 9,
    question: "What is the NumPy formula for Min-Max feature normalization to scale array `X` into range [0, 1]?",
    options: [
      "(X - X.min()) / (X.max() - X.min())",
      "(X - X.mean()) / X.std()",
      "X / X.sum()",
      "(X.max() - X) / X.min()"
    ],
    correctAnswer: 0,
    explanation: "Min-Max scaling subtracts the minimum value from each element and divides by the range `(X.max() - X.min())`, bounding all features strictly between 0 and 1."
  },
  {
    id: 10,
    question: "What is the NumPy formula for Z-Score Standardization (StandardScaler)?",
    options: [
      "(X - X.mean()) / X.std()",
      "(X - X.min()) / (X.max() - X.min())",
      "X / np.sqrt(X)",
      "(X - X.median()) / X.mean()"
    ],
    correctAnswer: 0,
    explanation: "Z-score standardization centers data around a mean of 0 (`mu = 0`) and standard deviation of 1 (`sigma = 1`) by subtracting the mean and dividing by the standard deviation: `(X - X.mean()) / X.std()`."
  },
  {
    id: 11,
    question: "How do you calculate Mean Squared Error (MSE) between predicted array `y_pred` and actual array `y_true` in NumPy?",
    options: [
      "np.mean((y_pred - y_true) ** 2)",
      "np.sum(y_pred - y_true) ** 2",
      "np.std(y_pred - y_true)",
      "(y_pred - y_true).mean()"
    ],
    correctAnswer: 0,
    explanation: "`y_pred - y_true` computes residuals, `** 2` squares each residual element-wise, and `np.mean()` computes the average squared error, which is the definition of MSE."
  },
  {
    id: 12,
    question: "What is the return dtype of true division `np.array([10, 20]) / np.array([2, 4])`?",
    options: [
      "`float64`",
      "`int32`",
      "`int64`",
      "`object`"
    ],
    correctAnswer: 0,
    explanation: "In Python 3 and NumPy, the true division operator `/` always produces floating point outputs (`float64` by default), even when the division divides evenly."
  },
  {
    id: 13,
    question: "How do you perform integer floor division in NumPy to discard decimal fractions?",
    options: [
      "a // b",
      "a / b",
      "a % b",
      "np.int_div(a, b)"
    ],
    correctAnswer: 0,
    explanation: "The floor division operator `//` (or `np.floor_divide(a, b)`) divides elements and rounds down to the nearest integer."
  },
  {
    id: 14,
    question: "What is `np.array([10, 15, 22]) % 4`?",
    options: [
      "`array([2, 3, 2])`",
      "`array([2.5, 3.75, 5.5])`",
      "`array([2, 3, 5])`",
      "`array([0, 0, 0])`"
    ],
    correctAnswer: 0,
    explanation: "The modulus operator `%` returns the remainder after division: 10 % 4 = 2, 15 % 4 = 3, 22 % 4 = 2, resulting in `array([2, 3, 2])`."
  },
  {
    id: 15,
    question: "What is the memory advantage of using `arr += 10` instead of `arr = arr + 10` for a 1-Gigabyte tensor?",
    options: [
      "`arr += 10` modifies the memory buffer in-place without allocating an extra 1 GB of RAM, whereas `arr = arr + 10` creates a temporary 1 GB array before reassigning",
      "`arr += 10` compresses the array",
      "`arr += 10` converts the array to integer",
      "There is no memory difference"
    ],
    correctAnswer: 0,
    explanation: "In-place operations (`+=`, `*=`, `-=`) write computed values directly into the existing memory buffer without allocating heap memory for a new array, saving RAM and eliminating garbage collection overhead."
  },
  {
    id: 16,
    question: "What error occurs if you attempt to add two arrays with incompatible shapes, e.g. `np.zeros((3, 4)) + np.zeros((2, 5))`?",
    options: [
      "ValueError: operands could not be broadcast together with shapes (3,4) (2,5)",
      "IndexError: index out of range",
      "TypeError: invalid shapes",
      "ShapeError: dimension mismatch"
    ],
    correctAnswer: 0,
    explanation: "NumPy requires arrays to have identical shapes or broadcastable dimensions. Incompatible shapes raise `ValueError: operands could not be broadcast together`."
  },
  {
    id: 17,
    question: "How do you calculate Root Mean Squared Error (RMSE) in NumPy?",
    options: [
      "np.sqrt(np.mean((y_pred - y_true) ** 2))",
      "np.mean(y_pred - y_true)",
      "np.mean(np.sqrt(y_pred - y_true))",
      "np.sum(np.abs(y_pred - y_true))"
    ],
    correctAnswer: 0,
    explanation: "RMSE is the square root of the Mean Squared Error: `np.sqrt(np.mean((y_pred - y_true) ** 2))`."
  },
  {
    id: 18,
    question: "What is the result of `np.array([2, 3, 4]) ** 3`?",
    options: [
      "`array([8, 27, 64])`",
      "`array([6, 9, 12])`",
      "`array([8, 9, 64])`",
      "`array([1, 1, 1])`"
    ],
    correctAnswer: 0,
    explanation: "The `**` operator raises each element to the power of 3: 2^3 = 8, 3^3 = 27, 4^3 = 64, yielding `array([8, 27, 64])`."
  },
  {
    id: 19,
    question: "How is a linear regression hypothesis vector `y_hat` computed for a single feature vector `X`, weight `w`, and bias `b`?",
    options: [
      "y_hat = X * w + b",
      "y_hat = X @ w @ b",
      "y_hat = (X + w) * b",
      "y_hat = X ** w + b"
    ],
    correctAnswer: 0,
    explanation: "In vectorized single-variable linear regression, each feature value in `X` is multiplied by slope weight `w` and added to intercept bias `b`: `y_hat = X * w + b`."
  },
  {
    id: 20,
    question: "What does `np.negative(arr)` do to an array?",
    options: [
      "Negates every element element-wise (equivalent to `-arr`)",
      "Reverses the array",
      "Sets all positive numbers to 0",
      "Returns True if array contains negative numbers"
    ],
    correctAnswer: 0,
    explanation: "`np.negative(arr)` is the ufunc for numerical negation, multiplying each element by -1."
  },
  {
    id: 21,
    question: "If `arr = np.array([-5, 10, -15, 20])`, what does `np.abs(arr)` return?",
    options: [
      "`array([5, 10, 15, 20])`",
      "`array([-5, 10, -15, 20])`",
      "`array([0, 10, 0, 20])`",
      "`array([5, -10, 15, -20])`"
    ],
    correctAnswer: 0,
    explanation: "`np.abs(arr)` (or `np.absolute(arr)`) computes the absolute magnitude of each element, removing negative signs."
  },
  {
    id: 22,
    question: "Why is vectorized NumPy arithmetic faster than writing a Python `for` loop?",
    options: [
      "NumPy runs in compiled C loops utilizing CPU vector registers and SIMD instructions without Python interpreter type-checking per iteration",
      "NumPy uses quantum computing",
      "NumPy compiles code into JavaScript",
      "NumPy automatically skips odd numbers"
    ],
    correctAnswer: 0,
    explanation: "NumPy arrays are stored in contiguous memory blocks. Arithmetic ufuncs execute compiled C loops that take advantage of CPU SIMD (Single Instruction Multiple Data) pipelines, bypassing Python's dynamic type inspection."
  },
  {
    id: 23,
    question: "What does `np.reciprocal(np.array([2.0, 4.0, 5.0]))` calculate?",
    options: [
      "`array([0.5, 0.25, 0.2])` (equivalent to `1.0 / arr`)",
      "`array([2.0, 4.0, 5.0])`",
      "`array([-2.0, -4.0, -5.0])`",
      "`array([4.0, 16.0, 25.0])`"
    ],
    correctAnswer: 0,
    explanation: "`np.reciprocal(x)` computes `1 / x` element-wise: 1/2.0 = 0.5, 1/4.0 = 0.25, 1/5.0 = 0.2."
  },
  {
    id: 24,
    question: "How do you calculate Mean Absolute Error (MAE) loss in NumPy?",
    options: [
      "np.mean(np.abs(y_pred - y_true))",
      "np.mean((y_pred - y_true) ** 2)",
      "np.sum(y_pred - y_true)",
      "np.std(np.abs(y_pred - y_true))"
    ],
    correctAnswer: 0,
    explanation: "Mean Absolute Error takes the absolute difference of residuals `np.abs(y_pred - y_true)` and averages them with `np.mean()`."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden rule for arithmetic normalization in Barrackpore ML labs?",
    options: [
      "Always cast integer datasets to floating point (`float32` or `float64`) before applying division or in-place transformations to avoid integer truncation and casting errors",
      "Always round marks to the nearest 10",
      "Never normalize features with more than 3 decimal places",
      "Always multiply features by 100 instead of dividing"
    ],
    correctAnswer: 0,
    explanation: "Because division produces floats and in-place operations require compatible dtypes, always ensure arrays are typed as `float32` or `float64` before running scaling and normalization pipelines."
  }
];

export default topic10_questions;
