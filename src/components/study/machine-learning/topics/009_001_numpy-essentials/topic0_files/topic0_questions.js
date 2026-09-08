const questions = [
  // ── BASIC ──────────────────────────────────────────────────────────────
  {
    question: "What does NumPy stand for?",
    shortAnswer: "Numerical Python.",
    explanation:
      "NumPy stands for Numerical Python. It is an open-source library that provides support for large multi-dimensional arrays and matrices, along with a large collection of high-level mathematical functions to operate on them.",
    hint: "Think of the 'Num' as short for Numerical.",
    level: "basic",
    codeExample: "import numpy as np   # standard import alias",
  },
  {
    question: "Who created NumPy and in what year?",
    shortAnswer: "Travis Oliphant, in 2005.",
    explanation:
      "NumPy was created by Travis Oliphant in 2005 by combining the older Numeric and Numarray libraries into a single unified package. NumPy 1.0 was released in 2006.",
    hint: "It unified two earlier numerical libraries.",
    level: "basic",
    codeExample: "np.__version__   # check installed version",
  },
  {
    question: "What is the core object provided by NumPy?",
    shortAnswer: "The ndarray (N-dimensional array).",
    explanation:
      "The ndarray is NumPy's central data structure. It stores elements of the same data type in a contiguous block of C-level memory, enabling vectorized operations and near-hardware performance.",
    hint: "'nd' stands for N-dimensional.",
    level: "basic",
    codeExample: "arr = np.array([1, 2, 3])   # creates a 1-D ndarray",
  },
  {
    question: "What is the standard alias used when importing NumPy?",
    shortAnswer: "np",
    explanation:
      "By convention the entire Python data science community imports NumPy as 'np'. This saves typing and is expected by tutorials, documentation, and other libraries.",
    hint: "It is a two-letter abbreviation.",
    level: "basic",
    codeExample: "import numpy as np",
  },
  {
    question: "Why is a NumPy array faster than a Python list for numerical operations?",
    shortAnswer: "NumPy stores typed elements in contiguous C memory, avoiding Python object overhead.",
    explanation:
      "A Python list stores pointers to Python objects (each with type info, reference count, etc.). A NumPy ndarray stores raw numeric values in a contiguous C memory block, so the CPU can process them with SIMD instructions without Python interpreter overhead. This gives 10x–100x speedups.",
    hint: "Think about memory layout and the absence of Python object overhead.",
    level: "basic",
    codeExample: "np_arr = np.arange(1_000_000)\nresult = np_arr * 2   # vectorized, no Python loop",
  },
  {
    question: "What does 'dtype' mean in NumPy?",
    shortAnswer: "The data type of all elements in the array (e.g., float64, int32).",
    explanation:
      "Every NumPy array has a single dtype that describes the type and size of each element. Common dtypes include np.int32, np.int64, np.float32, np.float64, and np.bool_. Choosing the right dtype saves memory.",
    hint: "All elements in an ndarray share the same dtype.",
    level: "basic",
    codeExample: "arr = np.array([1.0, 2.5, 3.7])\nprint(arr.dtype)   # float64",
  },
  {
    question: "Name four major ML/data science libraries that depend on NumPy internally.",
    shortAnswer: "Pandas, Scikit-learn, TensorFlow, SciPy.",
    explanation:
      "NumPy is the foundational layer of the Python ML ecosystem. Pandas DataFrames are backed by NumPy arrays (.values). Scikit-learn requires NumPy arrays as input/output. TensorFlow/PyTorch tensors can be converted to/from NumPy arrays. SciPy is built entirely on top of NumPy.",
    hint: "Think of the libraries used throughout this course.",
    level: "basic",
    codeExample:
      "import pandas as pd\ndf = pd.DataFrame({'a': [1,2,3]})\nprint(type(df.values))   # <class 'numpy.ndarray'>",
  },
  {
    question: "What is vectorization in the context of NumPy?",
    shortAnswer: "Performing a mathematical operation on an entire array at once, without a Python for-loop.",
    explanation:
      "Vectorization means expressing operations as array-level expressions rather than element-by-element loops. NumPy translates these into optimized C/Fortran code, enabling massive performance gains.",
    hint: "Instead of looping, you write arr * 2.",
    level: "basic",
    codeExample: "# Vectorized — no loop needed\narr = np.array([10, 20, 30, 40])\nresult = arr * 2\nprint(result)   # [20 40 60 80]",
  },

  // ── INTERMEDIATE ────────────────────────────────────────────────────────
  {
    question: "What is the difference between np.float32 and np.float64?",
    shortAnswer: "float32 uses 4 bytes (7 decimal digits of precision); float64 uses 8 bytes (15 decimal digits).",
    explanation:
      "np.float64 is the default floating-point dtype and provides double precision. np.float32 uses half the memory and is often used in deep learning to fit larger models on GPU. Using float32 introduces small rounding errors but is acceptable for most ML tasks.",
    hint: "The number in the dtype name is the number of bits.",
    level: "intermediate",
    codeExample:
      "a = np.array([1.1], dtype=np.float32)\nb = np.array([1.1], dtype=np.float64)\nprint(a[0] - 1.1)   # small rounding error\nprint(b[0] - 1.1)   # effectively zero",
  },
  {
    question: "What is the shape of a feature matrix X for a dataset with 150 samples and 4 features?",
    shortAnswer: "(150, 4)",
    explanation:
      "In ML, the feature matrix X is always shaped (n_samples, n_features). For the Iris dataset, 150 samples each with 4 measurements (sepal length, sepal width, petal length, petal width) gives shape (150, 4). The target vector y has shape (150,).",
    hint: "Rows = samples, columns = features.",
    level: "intermediate",
    codeExample:
      "X = np.zeros((150, 4))   # 150 rows, 4 columns\ny = np.zeros(150)        # 150 target values\nprint(X.shape)           # (150, 4)\nprint(y.shape)           # (150,)",
  },
  {
    question: "What sub-module of NumPy handles linear algebra operations like matrix inversion?",
    shortAnswer: "numpy.linalg",
    explanation:
      "numpy.linalg provides functions for linear algebra: np.linalg.inv() for matrix inversion, np.linalg.det() for determinant, np.linalg.eig() for eigenvalues, np.linalg.svd() for singular value decomposition, and np.dot() / @ for matrix multiplication.",
    hint: "linalg is short for linear algebra.",
    level: "intermediate",
    codeExample:
      "A = np.array([[2, 1], [5, 3]])\nA_inv = np.linalg.inv(A)\nprint(A @ A_inv)   # identity matrix",
  },
  {
    question: "How do you convert a Python list to a NumPy array?",
    shortAnswer: "Use np.array(list).",
    explanation:
      "np.array() accepts any Python sequence (list, tuple, nested list) and converts it to an ndarray. The dtype is inferred automatically unless specified. For 2D arrays, pass a list of lists.",
    hint: "np.array() is the constructor.",
    level: "intermediate",
    codeExample:
      "py_list = [10, 20, 30, 40]\narr = np.array(py_list)\nprint(type(arr))   # <class 'numpy.ndarray'>\nprint(arr.dtype)   # int64",
  },
  {
    question: "What does np.issubdtype() do?",
    shortAnswer: "Checks whether a dtype belongs to a given abstract dtype category.",
    explanation:
      "np.issubdtype(dtype, np.integer) returns True if the dtype is any integer type. Similarly np.issubdtype(dtype, np.floating) checks for float types. This is useful when writing code that behaves differently for int vs float arrays.",
    hint: "It tests dtype membership in a category.",
    level: "intermediate",
    codeExample:
      "print(np.issubdtype(np.int32, np.integer))   # True\nprint(np.issubdtype(np.float64, np.floating)) # True\nprint(np.issubdtype(np.int32, np.floating))   # False",
  },
  {
    question: "What is SIMD and why does it matter for NumPy?",
    shortAnswer: "Single Instruction Multiple Data — CPU operations that process many numbers simultaneously, which NumPy exploits.",
    explanation:
      "Modern CPUs have SIMD units (SSE, AVX) that can apply the same instruction to multiple data elements in one clock cycle. Because NumPy stores data in contiguous memory with a fixed dtype, the CPU can use SIMD to multiply or add many elements at once — a major source of NumPy's speed advantage.",
    hint: "Think of it as parallel lanes on a highway for data.",
    level: "intermediate",
    codeExample: "# NumPy leverages CPU SIMD automatically\narr = np.ones(1_000_000, dtype=np.float32)\nresult = arr * 3.14   # SIMD processes 8 floats per cycle on AVX",
  },

  // ── ADVANCED ────────────────────────────────────────────────────────────
  {
    question: "What is contiguous memory layout and why does NumPy use it?",
    shortAnswer: "Elements stored sequentially in RAM (no gaps), allowing cache-efficient access and SIMD vectorization.",
    explanation:
      "NumPy ndarrays store elements in contiguous blocks of RAM (either C-order row-major or Fortran-order column-major). Contiguous storage means the CPU cache prefetcher can load entire rows ahead of time, and SIMD instructions can operate on a burst of elements. Fragmented Python list memory prevents these optimizations.",
    hint: "Cache lines are 64 bytes — contiguous arrays fill them perfectly.",
    level: "advanced",
    codeExample:
      "arr = np.array([[1,2,3],[4,5,6]])\nprint(arr.flags['C_CONTIGUOUS'])   # True (row-major)\nprint(arr.strides)                 # (24, 8) → 8 bytes per int64",
  },
  {
    question: "What is the relationship between a Pandas DataFrame and NumPy?",
    shortAnswer: "A DataFrame is a labeled 2D table backed by NumPy arrays for each column.",
    explanation:
      "Internally, Pandas stores each column as a NumPy array (or a Pandas extension array). The .values property returns the underlying NumPy ndarray. This means you can always pass df.values or df['col'].values directly to NumPy or Scikit-learn functions.",
    hint: "df.values returns a NumPy array.",
    level: "advanced",
    codeExample:
      "import pandas as pd\ndf = pd.DataFrame({'marks': [72, 85, 61], 'age': [20, 21, 19]})\nX = df.values          # NumPy ndarray shape (3, 2)\nprint(type(X))         # <class 'numpy.ndarray'>",
  },
  {
    question: "Why should you specify dtype explicitly when creating large NumPy arrays for ML?",
    shortAnswer: "To control memory usage and ensure numerical precision matches the algorithm's requirements.",
    explanation:
      "By default np.array() infers dtype (usually float64 or int64). For deep learning on GPUs, float32 halves memory usage and speeds up computation. For large label arrays, int8 or bool saves significant RAM. Explicit dtype prevents silent precision loss and out-of-memory errors.",
    hint: "float64 uses 8 bytes; float32 uses 4 bytes per element.",
    level: "advanced",
    codeExample:
      "# 1 million float64 values = 8 MB\n# 1 million float32 values = 4 MB\nlarge_f64 = np.ones(1_000_000, dtype=np.float64)\nlarge_f32 = np.ones(1_000_000, dtype=np.float32)\nprint(large_f64.nbytes)   # 8000000\nprint(large_f32.nbytes)   # 4000000",
  },
  {
    question: "What is the difference between np.iinfo() and np.finfo()?",
    shortAnswer: "np.iinfo() gives integer type bounds; np.finfo() gives floating-point precision limits.",
    explanation:
      "np.iinfo(np.int8) returns the minimum (-128) and maximum (127) values for 8-bit integers. np.finfo(np.float32) returns the machine epsilon, precision, and range for 32-bit floats. These are essential when you need to know overflow limits or detect numerical instability.",
    hint: "i = integer info, f = float info.",
    level: "advanced",
    codeExample:
      "print(np.iinfo(np.int8).min, np.iinfo(np.int8).max)     # -128, 127\nprint(np.finfo(np.float32).eps)                             # ~1.19e-07",
  },
  {
    question: "How does NumPy's memory model enable zero-copy slicing (views)?",
    shortAnswer: "Slices point to the same memory block with adjusted offset and strides — no data is copied.",
    explanation:
      "When you slice a NumPy array (e.g., arr[2:5]), NumPy returns a view: a new ndarray object with the same data buffer but different offset and strides. Modifying the view modifies the original array. This is critical for performance in ML pipelines that work with sub-matrices of large datasets.",
    hint: "Use arr.base is not None to check if an array is a view.",
    level: "advanced",
    codeExample:
      "arr = np.arange(10)\nview = arr[2:5]         # no copy\nview[0] = 999\nprint(arr)              # [0 1 999 3 4 5 6 7 8 9]\nprint(view.base is arr) # True — same memory",
  },
  {
    question: "What is NumPy's role in the TensorFlow / PyTorch ecosystem?",
    shortAnswer: "TensorFlow tensors and PyTorch tensors can be converted to/from NumPy arrays via .numpy() and np.array().",
    explanation:
      "TensorFlow EagerTensors and PyTorch tensors can be converted to NumPy with .numpy(). Conversely, np.array(tensor) converts back. For CPU tensors, this is often a zero-copy operation via shared memory. This interoperability lets you mix NumPy preprocessing with deep learning frameworks.",
    hint: "tf.Tensor.numpy() and torch.Tensor.numpy().",
    level: "advanced",
    codeExample:
      "# TensorFlow example\nimport tensorflow as tf\nt = tf.constant([1.0, 2.0, 3.0])\nnp_arr = t.numpy()         # zero-copy view on CPU\nprint(type(np_arr))        # <class 'numpy.ndarray'>",
  },
  {
    question: "What was the difference between Numeric and NumArray, and how did NumPy resolve them?",
    shortAnswer: "Numeric was fast but had poor large-array support; NumArray supported large arrays but was slow for small ones. NumPy unified both.",
    explanation:
      "Before NumPy, Python had two competing numerical array libraries: Numeric (fast, small arrays) and NumArray (better large-array handling, slower small arrays). Travis Oliphant created NumPy in 2005 to merge both, incorporating Numeric's speed with NumArray's flexible large-array support and adding many new features.",
    hint: "NumPy was a merger to end a fragmentation problem.",
    level: "advanced",
    codeExample: "# Historical note: both Numeric and NumArray are now obsolete.\n# NumPy replaced them both.\nimport numpy as np\nprint('NumPy version:', np.__version__)",
  },
  {
    question: "Why is it important that all elements of a NumPy array share the same dtype?",
    shortAnswer: "Homogeneous dtype enables contiguous memory storage and vectorized operations; mixed types require Python object arrays which are slow.",
    explanation:
      "If all elements have the same dtype, the stride between elements is fixed and known at compile time, enabling SIMD operations. If you create a NumPy array with mixed types (e.g., int and string), NumPy falls back to dtype=object, storing Python object pointers — losing all performance benefits. Always ensure your feature arrays are numeric.",
    hint: "dtype=object arrays are basically Python lists with extra steps.",
    level: "advanced",
    codeExample:
      "# Mixed types → object array (slow!)\nbad = np.array([1, 'two', 3.0])\nprint(bad.dtype)      # object\n\n# Homogeneous float array (fast!)\ngood = np.array([1.0, 2.0, 3.0])\nprint(good.dtype)     # float64",
  },
  {
    question: "How does NumPy's nbytes attribute help in ML model optimization?",
    shortAnswer: "It reports the total bytes consumed by the array, helping you estimate GPU/RAM memory requirements.",
    explanation:
      "arr.nbytes = arr.itemsize × arr.size. Knowing the memory footprint is essential for: fitting datasets into GPU VRAM, batching data in training loops, choosing float32 vs float64, and profiling memory bottlenecks in production ML pipelines.",
    hint: "nbytes = itemsize × total number of elements.",
    level: "advanced",
    codeExample:
      "X = np.zeros((50000, 3072), dtype=np.float32)  # CIFAR-10 style\nprint(f'Dataset size: {X.nbytes / 1e6:.1f} MB')   # 614.4 MB",
  },
];

export default questions;
