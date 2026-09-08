// topic6_questions.js
// NumPy Essentials — Topic 6: Reshaping Arrays
// Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

const topic6_questions = [
  {
    id: 1,
    question: "What is array reshaping in NumPy and does it copy underlying data?",
    options: [
      "It reallocates memory and creates a completely new copy of all elements",
      "It changes the number of dimensions/axes and shape tuple without altering or copying elements in memory whenever possible (returns a view)",
      "It permanently deletes elements that do not fit into the target shape",
      "It only converts floating point arrays into integer arrays"
    ],
    correctAnswer: 1,
    explanation: "Reshaping gives a new shape to an array without changing its data. Because NumPy ndarrays store continuous data blocks in RAM with strides, .reshape() simply creates a new metadata header with updated strides and shape pointing to the same data buffer (returning a view) whenever the memory layout is contiguous."
  },
  {
    id: 2,
    question: "What is the fundamental Size Invariance Rule when reshaping an ndarray?",
    options: [
      "The new number of rows must always be greater than the number of columns",
      "The product of the new dimension sizes must exactly equal the total number of elements in the original array (arr.size)",
      "The new array must always have fewer dimensions than the original array",
      "The total memory size in bytes must double after every reshape"
    ],
    correctAnswer: 1,
    explanation: "The total number of elements in the reshaped array must remain identical to the original array. For instance, an array with 12 elements can be reshaped to (3, 4), (2, 6), (12, 1), (2, 2, 3), or (1, 12) because the product of dimensions is always 12."
  },
  {
    id: 3,
    question: "What error is raised if you attempt arr = np.arange(12); arr.reshape(3, 5)?",
    options: [
      "IndexError: index out of bounds",
      "TypeError: invalid dimension types",
      "ValueError: cannot reshape array of size 12 into shape (3,5)",
      "DimError: dimension mismatch"
    ],
    correctAnswer: 2,
    explanation: "NumPy raises a ValueError because 3 * 5 = 15 elements are required, but the input array only has 12 elements. NumPy will not pad arrays with zeros or discard elements during a standard .reshape() call."
  },
  {
    id: 4,
    question: "What special meaning does the value -1 have when passed as a dimension to .reshape()?",
    options: [
      "It reverses the elements along that axis",
      "It tells NumPy to infer/calculate that dimension size automatically from array size and remaining dimensions",
      "It drops that dimension entirely",
      "It inserts negative infinity into missing cells"
    ],
    correctAnswer: 1,
    explanation: "When you specify -1 for a dimension in .reshape(), NumPy computes the missing dimension automatically by dividing arr.size by the product of all other specified dimensions. For example, arr_12.reshape(3, -1) results in shape (3, 4) since 12 / 3 = 4."
  },
  {
    id: 5,
    question: "How many -1 dimensions can you specify in a single .reshape() call?",
    options: [
      "Only one dimension can be -1",
      "Up to two dimensions can be -1",
      "All dimensions can be -1",
      "As many as the ndim of the target array"
    ],
    correctAnswer: 0,
    explanation: "You can pass -1 for at most ONE dimension in reshape. If you pass multiple -1 values (e.g. arr.reshape(-1, -1)), NumPy raises ValueError: can only specify one unknown dimension because it would be mathematically ambiguous."
  },
  {
    id: 6,
    question: "Why does Scikit-learn require arr.reshape(-1, 1) when training on a single feature vector x?",
    options: [
      "Scikit-learn requires all numbers to be positive",
      "Scikit-learn models expect input feature matrix X to be a 2D array of shape (n_samples, n_features)",
      "Scikit-learn converts all 1D arrays to Python dictionaries",
      "Scikit-learn requires arrays to be stored in Fortran column-major order"
    ],
    correctAnswer: 1,
    explanation: "In Scikit-learn, the feature matrix X must be 2D with shape (n_samples, n_features). A 1D vector of shape (N,) has ndim=1 and no feature column axis. Calling .reshape(-1, 1) turns it into (N, 1) where N samples each have 1 feature."
  },
  {
    id: 7,
    question: "What is the critical difference between arr.ravel() and arr.flatten()?",
    options: [
      "ravel() always copies data, whereas flatten() always returns a view",
      "ravel() returns a zero-copy view whenever possible, while flatten() always allocates a brand new deep copy in memory",
      "flatten() works only on 2D arrays, while ravel() works only on 3D arrays",
      "ravel() sorts the array elements in ascending order while flattening"
    ],
    correctAnswer: 1,
    explanation: "arr.ravel() returns a contiguous 1D flattened view of the array sharing the underlying memory buffer whenever possible (making it fast and memory efficient). arr.flatten() always allocates a new 1D ndarray copy in RAM. Modifying a ravel() view alters the original array!"
  },
  {
    id: 8,
    question: "How can you programmatically verify whether reshaped_arr shares memory with original_arr?",
    options: [
      "Check `reshaped_arr.base is original_arr`",
      "Check `reshaped_arr == original_arr`",
      "Check `reshaped_arr.ndim == original_arr.ndim`",
      "Check `reshaped_arr.dtype == original_arr.dtype`"
    ],
    correctAnswer: 0,
    explanation: "The `.base` attribute of an ndarray points to the memory owner object if the array is a view. If `reshaped_arr.base is original_arr` evaluates to True, it is a zero-copy view sharing the exact same memory buffer."
  },
  {
    id: 9,
    question: "What does the `.T` attribute do on a 2D NumPy array mat?",
    options: [
      "It tests whether all elements are True",
      "It transposes the array by swapping its rows and columns (swapping axis 0 and axis 1)",
      "It translates all numbers from English to Hindi",
      "It terminates the active memory allocation"
    ],
    correctAnswer: 1,
    explanation: "For a 2D matrix, mat.T transposes the array by reversing the axes (swapping rows into columns and vice versa). If mat has shape (3, 4), mat.T will have shape (4, 3). In NumPy, this is an instantaneous O(1) operation because it just swaps the strides."
  },
  {
    id: 10,
    question: "What does arr.T return when arr is a 1D vector of shape (5,)?",
    options: [
      "A 2D column vector of shape (5, 1)",
      "The exact same 1D array of shape (5,) unchanged",
      "A 2D row vector of shape (1, 5)",
      "A reversed 1D array"
    ],
    correctAnswer: 1,
    explanation: "Transposing a 1D array with .T does nothing! Since a 1D array has only 1 axis, reversing its axes tuple (5,) still results in (5,). To convert a 1D vector to a 2D column matrix, you must explicitly use arr.reshape(-1, 1) or arr[:, np.newaxis]."
  },
  {
    id: 11,
    question: "When processing a batch of 100 grayscale MNIST images of shape (100, 28, 28) for an MLP Dense layer, which reshape call is standard?",
    options: [
      "images.reshape(100, -1) which results in shape (100, 784)",
      "images.reshape(-1, 28, 28, 1)",
      "images.reshape(28, 28, 100)",
      "images.reshape(784)"
    ],
    correctAnswer: 0,
    explanation: "Dense / Fully-Connected layers in neural networks expect a 2D matrix of shape (Batch_Size, Features). For 28x28 images, 28 * 28 = 784 features per sample. Calling images.reshape(100, -1) flattens each image individually, yielding shape (100, 784)."
  },
  {
    id: 12,
    question: "What does `np.transpose(img_batch, (0, 3, 1, 2))` do to a tensor of shape (32, 224, 224, 3)?",
    options: [
      "Flattens all pixels into a 1D vector",
      "Permutes axes from TensorFlow format (NHWC: Batch, Height, Width, Channels) to PyTorch format (NCHW: Batch, Channels, Height, Width)",
      "Rotates the image 90 degrees clockwise",
      "Multiplies all RGB values by 32"
    ],
    correctAnswer: 1,
    explanation: "np.transpose with an axis permutation tuple reorders the dimensions. (0, 3, 1, 2) maps Axis 0 (Batch) -> 0, Axis 3 (Channels) -> 1, Axis 1 (Height) -> 2, and Axis 2 (Width) -> 3. The shape transforms from (32, 224, 224, 3) to (32, 3, 224, 224)."
  },
  {
    id: 13,
    question: "What is the difference between order='C' (Row-Major) and order='F' (Column-Major) in .reshape()?",
    options: [
      "order='C' is only used in China, order='F' in France",
      "order='C' reads/writes elements along the last axis first (row by row, C-style), while order='F' reads/writes along the first axis first (column by column, Fortran-style)",
      "order='C' sorts elements alphabetically, while order='F' sorts numerically",
      "order='C' uses 8-bit integers, while order='F' uses 64-bit floats"
    ],
    correctAnswer: 1,
    explanation: "In C-order (default), consecutive elements in memory are placed along the rows (the last index changes fastest: [0,0], [0,1], [0,2]...). In Fortran-order (order='F'), elements are placed down columns first ([0,0], [1,0], [2,0]...). Machine Learning in Python almost universally uses C-order."
  },
  {
    id: 14,
    question: "If `a = np.arange(6)` and `b = a.reshape(2, 3)`, what happens if you execute `b[0, 0] = 99`?",
    options: [
      "Only `b` changes; `a` remains `[0, 1, 2, 3, 4, 5]`",
      "`a[0]` also becomes 99 because `b` is a view sharing memory with `a`",
      "A TypeError is raised because reshaped arrays are read-only",
      "Both arrays are reset to zeros"
    ],
    correctAnswer: 1,
    explanation: "Because `b` is a view on the contiguous memory of `a`, mutating elements through `b` directly modifies the shared memory buffer. Thus, `a[0]` also becomes 99."
  },
  {
    id: 15,
    question: "How does `np.reshape()` differ from `np.resize()`?",
    options: [
      "They are identical aliases for each other",
      "`np.reshape()` strictly preserves total element count and raises ValueError if size differs, whereas `np.resize()` pads with repeated copies or truncates data to fit the target shape",
      "`np.resize()` only works on image files",
      "`np.reshape()` can only make arrays smaller"
    ],
    correctAnswer: 1,
    explanation: "`reshape()` enforces strict size invariance (product of new dims == arr.size). In contrast, `np.resize()` will truncate elements if the new size is smaller, or repeat elements of the array until the target size is filled if larger. In ML pipelines, `reshape` is preferred to avoid accidental data corruption."
  },
  {
    id: 16,
    question: "What does `arr[:, np.newaxis]` or `arr[:, None]` do to a 1D array of shape (N,)?",
    options: [
      "Deletes all elements in the array",
      "Inserts a new axis of length 1 at position 1, converting (N,) to a 2D column vector of shape (N, 1)",
      "Replaces all values with None",
      "Duplicates the array N times"
    ],
    correctAnswer: 1,
    explanation: "Indexing with `np.newaxis` (or `None`) introduces a new singleton axis of dimension 1 at that position. `arr[:, np.newaxis]` transforms shape (N,) into (N, 1), functioning identically to `arr.reshape(-1, 1)`."
  },
  {
    id: 17,
    question: "What does `np.squeeze()` do to an array?",
    options: [
      "Compresses the array using gzip algorithm",
      "Removes all single-dimensional (length 1) entries from the shape of an array",
      "Reduces floating point precision from float64 to float16",
      "Divides all elements by the array size"
    ],
    correctAnswer: 1,
    explanation: "`np.squeeze()` strips all singleton dimensions (where dimension length is 1). For example, an array with shape (1, 28, 28, 1) passed to `np.squeeze()` becomes shape (28, 28)."
  },
  {
    id: 18,
    question: "What happens when you reshape a non-contiguous array (e.g. after a strided slicing step `arr[::2]`)?",
    options: [
      "NumPy always crashes with a Segmentation Fault",
      "NumPy automatically allocates a new contiguous copy in RAM to create the requested shape",
      "NumPy returns an array filled with NaNs",
      "NumPy forces the array into Fortran order without notice"
    ],
    correctAnswer: 1,
    explanation: "If an array is non-contiguous in RAM (e.g. after taking step slices like `arr[::2]`), NumPy cannot represent the new shape simply by altering strides over the original buffer. It silently allocates a new contiguous memory copy and returns that reshaped copy."
  },
  {
    id: 19,
    question: "How do you reshape a flat 1D vector of 784 pixels back into a 2D grayscale image of 28x28?",
    options: [
      "flat_vec.reshape(28, 28)",
      "flat_vec.transpose(28, 28)",
      "flat_vec.ravel(28, 28)",
      "np.expand_dims(flat_vec, 28)"
    ],
    correctAnswer: 0,
    explanation: "Calling `flat_vec.reshape(28, 28)` reconstructs the 2D matrix structure from the 784 flat sequential pixel intensities in standard C-order (row-by-row)."
  },
  {
    id: 20,
    question: "When Swadeep creates a student marks matrix of 5 students across 3 subjects `marks = np.arange(15).reshape(5, 3)`, what is `marks.shape` and `marks.ndim`?",
    options: [
      "shape is (15,) and ndim is 1",
      "shape is (5, 3) and ndim is 2",
      "shape is (3, 5) and ndim is 2",
      "shape is (5, 3, 1) and ndim is 3"
    ],
    correctAnswer: 1,
    explanation: "The reshaped array `marks` has 5 rows (students) and 3 columns (subjects). Its shape tuple is (5, 3) and its number of axes (ndim) is 2."
  },
  {
    id: 21,
    question: "What is the result of `np.arange(24).reshape(2, 3, 4).shape`?",
    options: [
      "(24,)",
      "(2, 3, 4)",
      "(6, 4)",
      "(2, 12)"
    ],
    correctAnswer: 1,
    explanation: "2 * 3 * 4 = 24 elements. The resulting 3D tensor has shape (2, 3, 4) with 2 batches/slices, 3 rows per slice, and 4 columns per row."
  },
  {
    id: 22,
    question: "Why is reshaping preferred over creating new arrays inside an ML data loading loop?",
    options: [
      "Reshaping is zero-copy in O(1) time without RAM allocations, avoiding garbage collection overhead and memory fragmentation",
      "Reshaping automatically normalizes numbers between 0 and 1",
      "Reshaping automatically uses CUDA GPUs",
      "Reshaping compresses data on SSDs"
    ],
    correctAnswer: 0,
    explanation: "Because .reshape() creates a lightweight metadata view over existing memory buffers in O(1) constant time, it doesn't duplicate gigabytes of dataset tensors in RAM during batch generation."
  },
  {
    id: 23,
    question: "If an RGB color image has shape (1080, 1920, 3), how do you reshape it into a 2D matrix of pixels for K-Means color clustering?",
    options: [
      "img.reshape(-1, 3)",
      "img.reshape(3, -1)",
      "img.ravel()",
      "img.T"
    ],
    correctAnswer: 0,
    explanation: "Calling `img.reshape(-1, 3)` collapses the Height and Width axes into a single dimension of 1080 * 1920 = 2,073,600 pixels while keeping the 3 RGB color channels intact, producing shape (2073600, 3)."
  },
  {
    id: 24,
    question: "Can an array of shape (2, 3) be reshaped to (1, 6, 1, 1)?",
    options: [
      "No, arrays cannot have more than 2 dimensions",
      "Yes, because 1 * 6 * 1 * 1 = 6 == 2 * 3 = 6",
      "No, singleton dimensions are forbidden in NumPy",
      "Only if all elements are zeros"
    ],
    correctAnswer: 1,
    explanation: "Yes, as long as the product of the target dimensions (1 * 6 * 1 * 1 = 6) equals the total element count (6), any valid shape tuple with any number of singleton dimensions is legal."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden rule for preparing input features before calling `model.fit(X, y)` in Scikit-learn?",
    options: [
      "Always leave X as a 1D Python list",
      "Always ensure X is a 2D array of shape (N_samples, N_features) using `X.reshape(-1, 1)` for single features",
      "Always transpose X so features are rows and samples are columns",
      "Always convert X to float16 to save space"
    ],
    correctAnswer: 1,
    explanation: "Scikit-learn expects feature matrix X to be strictly 2D with shape (n_samples, n_features). If you have a single feature vector of shape (N,), always transform it using `X.reshape(-1, 1)` before fitting."
  }
];

export default topic6_questions;
