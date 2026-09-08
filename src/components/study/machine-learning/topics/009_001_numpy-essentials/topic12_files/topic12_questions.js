// topic12_questions.js
// NumPy Essentials — Topic 12: Universal Functions (ufuncs)
// Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

const topic12_questions = [
  {
    id: 1,
    question: "What is a Universal Function (ufunc) in NumPy?",
    options: [
      "A fast, compiled C-implemented function that operates element-by-element on ndarrays, supporting broadcasting, type casting, and reduction methods",
      "A Python function that can run in any operating system without Python installed",
      "A function that works universally on databases and spreadsheets",
      "A JavaScript function imported into Python"
    ],
    correctAnswer: 0,
    explanation: "A ufunc is a vectorized wrapper for functions that execute element-wise operations on NumPy arrays in compiled C. They support broadcasting, type coercion, and special methods like `.reduce()`, `.accumulate()`, and `.outer()`."
  },
  {
    id: 2,
    question: "What is the distinction between Unary ufuncs and Binary ufuncs?",
    options: [
      "Unary ufuncs take a single input array (e.g. np.sqrt, np.exp), while Binary ufuncs take two input arrays (e.g. np.add, np.maximum)",
      "Unary ufuncs only work on integers, while Binary ufuncs work on floats",
      "Unary ufuncs return booleans, while Binary ufuncs return numbers",
      "Unary ufuncs are slower than Binary ufuncs"
    ],
    correctAnswer: 0,
    explanation: "Unary ufuncs operate on one operand (e.g., `np.sin`, `np.log`, `np.abs`), whereas binary ufuncs take two operands and perform element-wise combinations (e.g., `np.multiply`, `np.maximum`, `np.power`)."
  },
  {
    id: 3,
    question: "What is the critical difference between `np.maximum(a, b)` and `np.max(a)`?",
    options: [
      "`np.maximum(a, b)` is an element-wise ufunc comparing two arrays and returning an array of larger values, while `np.max(a)` is an aggregation function that collapses an array into a single maximum scalar",
      "`np.maximum` only works on 1D arrays, while `np.max` works on 2D arrays",
      "They are identical aliases",
      "`np.max` compares two arrays element-by-element"
    ],
    correctAnswer: 0,
    explanation: "`np.maximum(a, b)` performs element-wise comparisons between two arrays (or an array and a scalar) preserving shape. `np.max(a)` (or `a.max()`) aggregates an array along axes, reducing dimensions to find the overall maximum."
  },
  {
    id: 4,
    question: "How do you implement the ReLU (Rectified Linear Unit) activation function using the `np.maximum` binary ufunc?",
    options: [
      "relu = np.maximum(0, x)",
      "relu = np.max(0, x)",
      "relu = np.relu(x)",
      "relu = np.fmin(0, x)"
    ],
    correctAnswer: 0,
    explanation: "`np.maximum(0, x)` compares scalar 0 against every element in array `x` via broadcasting, clamping all negative values to 0 while leaving positive values unchanged."
  },
  {
    id: 5,
    question: "What does the `.reduce()` method do on a binary ufunc like `np.add.reduce(arr)`?",
    options: [
      "Repeatedly applies the operation across elements of the array along an axis until a reduced array or scalar remains (equivalent to `np.sum(arr)`)",
      "Divides all elements by 2",
      "Removes duplicate values from the array",
      "Compresses the array to 8-bit integers"
    ],
    correctAnswer: 0,
    explanation: "`.reduce()` collapses an array along an axis by repeatedly applying the binary ufunc. `np.add.reduce(arr)` performs `((a[0] + a[1]) + a[2]) + ...`, identical to `np.sum(arr)`."
  },
  {
    id: 6,
    question: "What is the result of `np.multiply.reduce(np.array([1, 2, 3, 4, 5]))`?",
    options: [
      "120 (Computes the cumulative product / factorial 1*2*3*4*5)",
      "15",
      "array([1, 2, 6, 24, 120])",
      "5"
    ],
    correctAnswer: 0,
    explanation: "`np.multiply.reduce()` computes the product of all elements in the array: 1 * 2 * 3 * 4 * 5 = 120, equivalent to `np.prod()`."
  },
  {
    id: 7,
    question: "What does `np.add.accumulate(np.array([1, 2, 3, 4]))` compute?",
    options: [
      "`array([1, 3, 6, 10])` (Cumulative running sum)",
      "`10` (Total sum)",
      "`array([4, 3, 2, 1])`",
      "`array([1, 2, 3, 4])`"
    ],
    correctAnswer: 0,
    explanation: "`.accumulate()` stores the intermediate results of the reduction at each step. `np.add.accumulate([1, 2, 3, 4])` gives `[1, 1+2=3, 3+3=6, 6+4=10]`, identical to `np.cumsum()`."
  },
  {
    id: 8,
    question: "What does `np.multiply.outer(np.array([1, 2, 3]), np.array([10, 20]))` return?",
    options: [
      "A (3, 2) multiplication table: `array([[10, 20], [20, 40], [30, 60]])`",
      "A 1D array `[10, 40]`",
      "A scalar `120`",
      "An IndexError"
    ],
    correctAnswer: 0,
    explanation: "`.outer(A, B)` applies the ufunc across all pairs of elements from A and B, producing an outer product matrix where `result[i, j] = A[i] * B[j]`."
  },
  {
    id: 9,
    question: "What is the purpose of passing the `out` parameter in ufuncs, e.g. `np.sqrt(X, out=X)`?",
    options: [
      "To write the computed output directly into an existing memory buffer in-place without allocating temporary heap memory",
      "To print the output to standard console",
      "To format the output as a string",
      "To export the output to a text file"
    ],
    correctAnswer: 0,
    explanation: "Passing an existing array to `out=...` directs the C routine to write directly into that memory buffer, eliminating temporary buffer allocations during large model training loops."
  },
  {
    id: 10,
    question: "How is the Sigmoid activation function computed using NumPy ufuncs for an input logit vector `z`?",
    options: [
      "sigmoid = 1.0 / (1.0 + np.exp(-z))",
      "sigmoid = np.log(1.0 + np.exp(z))",
      "sigmoid = np.sin(z) / np.cos(z)",
      "sigmoid = 1.0 / np.sqrt(z)"
    ],
    correctAnswer: 0,
    explanation: "The sigmoid formula is σ(z) = 1 / (1 + e^(-z)). In NumPy, `np.exp(-z)` computes the exponential element-wise, mapping values into the `(0, 1)` probability range."
  },
  {
    id: 11,
    question: "Why is `z - np.max(z)` subtracted before computing `np.exp(z)` in the Softmax activation function?",
    options: [
      "To prevent numerical overflow (`np.exp(1000)` produces `inf` / `nan`), ensuring that the largest exponent is `np.exp(0) = 1.0`",
      "To convert all logits to positive numbers",
      "To make the sum of exponentials equal to 0",
      "To sort the probabilities in descending order"
    ],
    correctAnswer: 0,
    explanation: "Large positive logits (e.g. z=1000) cause `np.exp(z)` to overflow to `inf`. Subtracting the maximum logit shifts all values so the maximum exponent is `exp(0) = 1.0`, which prevents numerical instability while producing mathematically identical softmax probabilities."
  },
  {
    id: 12,
    question: "Why is a small epsilon `1e-15` added inside `np.log(probs + 1e-15)` when computing Cross-Entropy Loss?",
    options: [
      "Because `np.log(0.0)` evaluates to `-inf`, which produces `nan` during loss computation",
      "Because Python logarithms only work on odd numbers",
      "To increase the precision of float32 to float64",
      "Because logarithms cannot compute decimal fractions"
    ],
    correctAnswer: 0,
    explanation: "In binary cross-entropy, if a model predicts probability `0.0` for a true class, `np.log(0.0)` yields `-inf`. Adding a small epsilon like `1e-15` prevents division-by-zero / log(0) explosions."
  },
  {
    id: 13,
    question: "What does `np.log1p(x)` calculate with high numerical precision for very small `x`?",
    options: [
      "Natural logarithm of (1 + x)",
      "Natural logarithm of (1 - x)",
      "1 divided by log(x)",
      "log(x) + 1"
    ],
    correctAnswer: 0,
    explanation: "`np.log1p(x)` computes `log(1 + x)` with high numerical accuracy when `x` is close to zero, avoiding precision loss from floating-point roundoff."
  },
  {
    id: 14,
    question: "What does `np.expm1(x)` calculate?",
    options: [
      "`exp(x) - 1` with high accuracy for small `x`",
      "`exp(x - 1)`",
      "`1 / exp(x)`",
      "`exp(1)`"
    ],
    correctAnswer: 0,
    explanation: "`np.expm1(x)` calculates `e^x - 1` accurately for values of `x` near zero, preventing floating-point cancellation errors."
  },
  {
    id: 15,
    question: "What is the difference between `np.fmax(a, b)` and `np.maximum(a, b)` when comparing with `np.nan`?",
    options: [
      "`np.fmax` ignores `np.nan` and returns the valid numerical value, while `np.maximum` propagates `np.nan` into the output",
      "`np.maximum` ignores `np.nan`",
      "They both replace `np.nan` with 0",
      "There is no difference"
    ],
    correctAnswer: 0,
    explanation: "If one element is `np.nan`, `np.maximum(10, np.nan)` yields `nan`. In contrast, `np.fmax(10, np.nan)` ignores the NaN and returns `10.0`."
  },
  {
    id: 16,
    question: "What does `np.clip(arr, a_min, a_max)` do to an array?",
    options: [
      "Clamps all values in `arr` so they are bounded between `a_min` and `a_max`",
      "Deletes elements outside the range `[a_min, a_max]`",
      "Sorts elements between `a_min` and `a_max`",
      "Normalizes the array between -1 and 1"
    ],
    correctAnswer: 0,
    explanation: "`np.clip(arr, min, max)` sets elements less than `a_min` to `a_min`, and elements greater than `a_max` to `a_max`."
  },
  {
    id: 17,
    question: "What does `np.copysign(np.array([1, -2, 3]), np.array([-1, 1, -1]))` return?",
    options: [
      "`array([-1.,  2., -3.])`",
      "`array([ 1., -2.,  3.])`",
      "`array([-1., -2., -3.])`",
      "`array([ 1.,  1.,  1.])`"
    ],
    correctAnswer: 0,
    explanation: "`np.copysign(x1, x2)` returns the absolute value of `x1` with the sign of `x2`: magnitude 1 with sign '-' -> -1.0; magnitude 2 with sign '+' -> 2.0; magnitude 3 with sign '-' -> -3.0."
  },
  {
    id: 18,
    question: "What is the performance characteristic of `np.vectorize()` compared to true C ufuncs?",
    options: [
      "`np.vectorize()` is merely a Python `for` loop under the hood provided for convenience; it does NOT provide C-speed optimization like built-in ufuncs",
      "`np.vectorize()` compiles Python code into CUDA GPU kernels",
      "`np.vectorize()` runs faster than native C ufuncs",
      "`np.vectorize()` compresses array data in RAM"
    ],
    correctAnswer: 0,
    explanation: "`np.vectorize()` provides a convenient interface for applying Python functions to arrays, but internally it executes a Python loop and does not benefit from native C compilation or SIMD vectorization."
  },
  {
    id: 19,
    question: "What does `np.floor(np.array([1.7, 2.2, -1.5]))` return?",
    options: [
      "`array([ 1.,  2., -2.])`",
      "`array([ 1.,  2., -1.])`",
      "`array([ 2.,  3., -1.])`",
      "`array([ 1.,  2.,  0.])`"
    ],
    correctAnswer: 0,
    explanation: "`np.floor()` rounds each element down to the nearest integer: 1.7 -> 1.0, 2.2 -> 2.0, and -1.5 -> -2.0."
  },
  {
    id: 20,
    question: "What does `np.ceil(np.array([1.2, 2.8, -1.9]))` return?",
    options: [
      "`array([ 2.,  3., -1.])`",
      "`array([ 1.,  2., -2.])`",
      "`array([ 2.,  3., -2.])`",
      "`array([ 1.,  2., -1.])`"
    ],
    correctAnswer: 0,
    explanation: "`np.ceil()` rounds each element up to the nearest integer: 1.2 -> 2.0, 2.8 -> 3.0, and -1.9 -> -1.0."
  },
  {
    id: 21,
    question: "What is `np.hypot(3, 4)`?",
    options: [
      "5.0 (Calculates the Euclidean hypotenuse `sqrt(3^2 + 4^2)`)",
      "7.0",
      "12.0",
      "25.0"
    ],
    correctAnswer: 0,
    explanation: "`np.hypot(x1, x2)` computes `sqrt(x1**2 + x2**2)` element-wise, avoiding overflow for intermediate values."
  },
  {
    id: 22,
    question: "What is `np.sign(np.array([-15, 0, 42]))`?",
    options: [
      "`array([-1,  0,  1])`",
      "`array([ 1,  0,  1])`",
      "`array([-1, -1,  1])`",
      "`array([15,  0, 42])`"
    ],
    correctAnswer: 0,
    explanation: "`np.sign(x)` returns `-1` for negative numbers, `0` for zero, and `1` for positive numbers."
  },
  {
    id: 23,
    question: "How do you calculate the element-wise natural exponential minus one for small learning rates in ML?",
    options: [
      "np.expm1(lr)",
      "np.exp(lr) - 1",
      "np.log1p(lr)",
      "np.exp_small(lr)"
    ],
    correctAnswer: 0,
    explanation: "`np.expm1()` is specifically engineered to compute `exp(x) - 1` without losing floating point precision when `x` is very small."
  },
  {
    id: 24,
    question: "Can binary ufuncs broadcast operands of different shapes like `(3, 1)` and `(1, 4)`?",
    options: [
      "Yes, all ufuncs automatically apply full NumPy broadcasting rules to input operands",
      "No, ufuncs only accept identical shapes",
      "Only if both arrays are 1D",
      "Only for addition"
    ],
    correctAnswer: 0,
    explanation: "All universal functions fully adhere to NumPy broadcasting semantics. Passing `(3, 1)` and `(1, 4)` to `np.maximum` broadcasts both arrays into a `(3, 4)` matrix."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden rule for computing softmax and cross-entropy in Barrackpore ML projects?",
    options: [
      "Always subtract `np.max(z)` before `np.exp(z)` in Softmax to prevent overflow, and always add a small epsilon `1e-15` inside `np.log()` to prevent `-inf` crashes",
      "Always round probabilities to whole integers",
      "Never use ufuncs with more than 100 features",
      "Always divide by the learning rate before calling ufuncs"
    ],
    correctAnswer: 0,
    explanation: "To ensure bulletproof numerical stability in deep learning pipelines, always subtract the maximum logit before exponentiation in softmax and add an epsilon inside `np.log` to avoid `-inf` loss explosions."
  }
];

export default topic12_questions;
