const questions = [
  {
    question: "What is the primary function of np.array() in NumPy?",
    shortAnswer: "It converts Python sequences (lists, tuples, nested iterables) into a homogeneous NumPy ndarray.",
    explanation: "np.array() is the core array constructor function. It parses the input sequence, deduces the number of dimensions, determines the common data type, allocates a contiguous C memory block, and returns an ndarray instance.",
    hint: "It converts Python iterables into ndarrays.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.array([10, 20, 30])\nprint(type(arr))  # <class 'numpy.ndarray'>"
  },
  {
    question: "What is the full function signature of np.array()?",
    shortAnswer: "np.array(object, dtype=None, copy=True, order='K', subok=False, ndmin=0)",
    explanation: "The signature takes the input data object, optional explicit data type (dtype), whether to force a memory copy (copy), memory layout order ('C', 'F', 'A', 'K'), sub-class preservation flag (subok), and minimum dimensions (ndmin).",
    hint: "Key arguments are object, dtype, copy, order, and ndmin.",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.array([1, 2, 3], dtype=np.float32, copy=True, ndmin=2)"
  },
  {
    question: "What happens if you run np.array(1, 2, 3) without enclosing brackets?",
    shortAnswer: "It raises a TypeError because 2 and 3 are interpreted as dtype and copy parameters.",
    explanation: "np.array expects a single iterable object as its first argument. Calling np.array(1, 2, 3) passes 1 as the object, 2 as the dtype argument (which is invalid), and 3 as the copy flag, causing a TypeError.",
    hint: "Always enclose elements in square brackets [ ] or parentheses ( ).",
    level: "basic",
    codeExample: "# BAD — throws TypeError:\n# np.array(1, 2, 3)\n\n# GOOD:\narr = np.array([1, 2, 3])"
  },
  {
    question: "How does NumPy infer the dimensionality (ndim and shape) from nested Python lists?",
    shortAnswer: "By inspecting the depth and length of each nested list level.",
    explanation: "A single list [1, 2, 3] creates a 1D array of shape (3,). A list of lists [[1, 2], [3, 4]] has 2 levels of nesting, producing a 2D matrix of shape (2, 2). A list of lists of lists creates a 3D tensor of shape (P, M, N).",
    hint: "Depth of nesting = ndim; lengths of nested lists = shape tuple.",
    level: "basic",
    codeExample: "import numpy as np\nmat = np.array([[10, 20, 30], [40, 50, 60]])\nprint(mat.ndim)   # 2\nprint(mat.shape)  # (2, 3)"
  },
  {
    question: "What happens when you create an array from a ragged nested list with uneven lengths?",
    shortAnswer: "NumPy raises a ValueError (or creates an array with dtype=object and a deprecation warning).",
    explanation: "In modern NumPy (v1.24+), passing ragged nested lists like [[1, 2], [3, 4, 5]] raises a ValueError: setting an array element with a sequence. Creating inhomogeneous object arrays is deprecated because it defeats SIMD memory layout.",
    hint: "Ragged lists cannot form a rectangular contiguous grid.",
    level: "intermediate",
    codeExample: "# In modern NumPy, nested sub-lists must all have identical lengths:\n# arr = np.array([[1, 2], [3, 4, 5]])  # -> ValueError"
  },
  {
    question: "How does the explicit dtype parameter work in np.array([1, 2, 3], dtype=np.float32)?",
    shortAnswer: "It forces NumPy to store elements as the specified data type rather than inferring the default.",
    explanation: "Without dtype, Python integers default to int64 (or int32 on 32-bit systems). Setting dtype=np.float32 explicitly casts the integer inputs to 32-bit single-precision floating point numbers, cutting RAM consumption by 50%.",
    hint: "dtype overrides automatic type inference.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.array([1, 2, 3], dtype=np.float32)\nprint(arr.dtype)     # float32\nprint(arr.itemsize)  # 4 bytes per number"
  },
  {
    question: "What is NumPy's automatic type coercion (upcasting) rule when mixing data types?",
    shortAnswer: "Elements are promoted to the lowest common supertype that preserves all values without data loss.",
    explanation: "The upcasting hierarchy follows: bool -> int -> float -> complex -> string / object. If you mix int and float, ints are upcast to float64. If you mix float and string, all elements become Unicode strings.",
    hint: "Numeric items upcast to float; strings force the entire array to string dtype.",
    level: "basic",
    codeExample: "import numpy as np\na = np.array([1, 2, 3.5])        # float64\nb = np.array([1, 3.5, 'Kolkata']) # '<U32' Unicode string\nprint(a.dtype, b.dtype)"
  },
  {
    question: "What is the purpose of the ndmin parameter in np.array(data, ndmin=2)?",
    shortAnswer: "It specifies the minimum number of dimensions the returned array must have.",
    explanation: "If you pass a 1D vector [1, 2, 3] with ndmin=2, NumPy prepends dimensions of size 1 to ensure ndim >= 2, returning an array of shape (1, 3). This is essential for Scikit-learn which requires 2D feature matrices.",
    hint: "ndmin guarantees a minimum dimension count (e.g. at least 2D).",
    level: "intermediate",
    codeExample: "import numpy as np\nv = [10, 20, 30]\narr2d = np.array(v, ndmin=2)\nprint(arr2d.shape)  # (1, 3) instead of (3,)"
  },
  {
    question: "What is the difference between copy=True and copy=False in np.array()?",
    shortAnswer: "copy=True always forces a new memory allocation; copy=False reuses existing ndarray memory if possible.",
    explanation: "When the input object is already a NumPy ndarray with the requested dtype and order, copy=False avoids copying and returns the same array. If copy=True (the default), a new independent memory buffer is always allocated.",
    hint: "copy=False enables zero-copy memory reuse when inputs are already ndarrays.",
    level: "intermediate",
    codeExample: "import numpy as np\nx = np.array([1, 2, 3])\ny = np.array(x, copy=False)\nprint(y is x)  # True (reused memory)"
  },
  {
    question: "What is the difference between np.array() and np.asarray()?",
    shortAnswer: "np.asarray() does not copy if input is already an ndarray matching dtype and order; np.array() copies by default.",
    explanation: "np.asarray(a) is equivalent to np.array(a, copy=False). It is preferred in utility functions and library code to prevent redundant memory copying when users pass data that is already an ndarray.",
    hint: "asarray is equivalent to np.array(..., copy=False).",
    level: "intermediate",
    codeExample: "import numpy as np\nx = np.array([1.0, 2.0])\ny = np.asarray(x)        # Zero copy\nz = np.array(x)          # Allocates new copy\nprint(y is x)            # True\nprint(z is x)            # False"
  },
  {
    question: "What does the order parameter ('C' vs 'F') specify in np.array()?",
    shortAnswer: "Memory layout order: 'C' for row-major (C-style), 'F' for column-major (Fortran-style).",
    explanation: "order='C' stores rows consecutively in RAM (default in Python). order='F' stores columns consecutively in RAM (standard in MATLAB/R/Fortran). order='A' preserves Fortran order if input is Fortran, otherwise C.",
    hint: "C = row-major, F = column-major.",
    level: "advanced",
    codeExample: "import numpy as np\nmat_c = np.array([[1, 2], [3, 4]], order='C')\nmat_f = np.array([[1, 2], [3, 4]], order='F')\nprint(mat_c.flags['C_CONTIGUOUS'])  # True\nprint(mat_f.flags['F_CONTIGUOUS'])  # True"
  },
  {
    question: "How do you create a 3D array representing a 100x100 RGB color image using np.array()?",
    shortAnswer: "Pass a nested list with 3 levels: (Height, Width, Channels=3) with dtype=np.uint8.",
    explanation: "An RGB image is a 3D tensor of shape (H, W, 3). Each pixel consists of 3 channels [R, G, B] with integer values from 0 to 255, represented by np.uint8 (unsigned 8-bit integer, 1 byte per channel).",
    hint: "RGB image dimensions: Height × Width × 3 color channels.",
    level: "intermediate",
    codeExample: "import numpy as np\n# 2x2 RGB image\npixels = np.array([\n    [[255, 0, 0], [0, 255, 0]],\n    [[0, 0, 255], [255, 255, 255]]\n], dtype=np.uint8)\nprint(pixels.shape)  # (2, 2, 3)"
  },
  {
    question: "Can you create an ndarray from a Python tuple or range generator?",
    shortAnswer: "Yes, np.array() accepts any valid Python iterable including tuples and range() objects.",
    explanation: "np.array(range(10)) or np.array((1, 2, 3)) works seamlessly. For range generators, np.arange() is more direct and faster, but np.array() converts any general iterable successfully.",
    hint: "Any iterable sequence can be passed to np.array().",
    level: "basic",
    codeExample: "import numpy as np\narr_tuple = np.array((10, 20, 30))\narr_range = np.array(range(5))\nprint(arr_tuple)  # [10 20 30]\nprint(arr_range)  # [0 1 2 3 4]"
  },
  {
    question: "What happens when you pass float numbers to np.array([1.9, 2.7, 3.2], dtype=np.int32)?",
    shortAnswer: "The floats are truncated (not rounded) towards zero into integers: [1, 2, 3].",
    explanation: "When casting floating point values to integers in NumPy, truncation occurs — the fractional component is discarded. If rounding is desired, call np.round() before creating or casting the array.",
    hint: "Float to int conversion truncates decimal digits without rounding.",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.array([1.9, 2.7, 3.2], dtype=np.int32)\nprint(arr)  # array([1, 2, 3], dtype=int32)"
  },
  {
    question: "Why is np.float32 often preferred over np.float64 when training Deep Learning models?",
    shortAnswer: "float32 uses half the RAM (4 bytes vs 8 bytes) and runs significantly faster on modern GPUs/TPUs.",
    explanation: "Deep learning models require millions or billions of parameters. Using float32 halves GPU VRAM bandwidth requirements and matches tensor core precision hardware, while float64 is typically reserved for scientific precision calculations.",
    hint: "float32 consumes 4 bytes; float64 consumes 8 bytes.",
    level: "intermediate",
    codeExample: "import numpy as np\nx32 = np.array([1.0, 2.0, 3.0], dtype=np.float32)\nx64 = np.array([1.0, 2.0, 3.0], dtype=np.float64)\nprint(x32.nbytes, 'bytes vs', x64.nbytes, 'bytes')"
  },
  {
    question: "What is the subok parameter in np.array()?",
    shortAnswer: "If True, subclasses of ndarray (like np.matrix or masked arrays) are preserved; if False, returns base ndarray.",
    explanation: "subok stands for 'subclasses OK'. When subok=False (default), np.array() always converts subclasses back to a standard base ndarray. When subok=True, if the input is a subclass of ndarray, that subclass type is maintained.",
    hint: "subok controls subclass inheritance preservation.",
    level: "advanced",
    codeExample: "import numpy as np\nmat = np.asmatrix([1, 2, 3])\narr_base = np.array(mat, subok=False)  # returns ndarray\narr_sub  = np.array(mat, subok=True)   # preserves matrix subclass\nprint(type(arr_base), type(arr_sub))"
  },
  {
    question: "How do you create an array of booleans from a list of integers using np.array()?",
    shortAnswer: "Pass dtype=np.bool_ (or dtype=bool). 0 becomes False, non-zero becomes True.",
    explanation: "NumPy follows standard truthiness rules when casting to boolean: integer 0 becomes False, and any non-zero integer (positive or negative) becomes True.",
    hint: "0 is False, all non-zero values become True.",
    level: "basic",
    codeExample: "import numpy as np\nbools = np.array([0, 1, -5, 0, 100], dtype=np.bool_)\nprint(bools)  # [False  True  True False  True]"
  },
  {
    question: "Why is creating an ndarray with dtype=object generally discouraged in Machine Learning?",
    shortAnswer: "Object arrays store pointers to Python heap objects, losing contiguous C memory and SIMD speed benefits.",
    explanation: "An array with dtype=object behaves like a Python list wrapped in an ndarray container. It cannot be passed to CUDA GPU accelerators or compiled BLAS/LAPACK routines, resulting in slow interpreted loops.",
    hint: "Object arrays cannot use C vectorized SIMD instructions.",
    level: "intermediate",
    codeExample: "import numpy as np\n# AVOID in ML pipelines:\nbad_arr = np.array([1, 'two', [3, 4]], dtype=object)\nprint(bad_arr.dtype)  # object (slow!)"
  },
  {
    question: "How can you convert a Pandas Series or DataFrame to a NumPy ndarray?",
    shortAnswer: "Use np.array(df) or df.to_numpy() (recommended).",
    explanation: "Pandas DataFrames and Series are built on top of NumPy arrays. Calling np.array(df) or df.to_numpy() extracts the underlying 2D ndarray feature matrix for model training.",
    hint: "df.to_numpy() or np.array(df) converts tabular data to ndarray.",
    level: "basic",
    codeExample: "import pandas as pd, numpy as np\ndf = pd.DataFrame({'age': [21, 22], 'marks': [85, 90]})\nX = np.array(df)  # or df.to_numpy()\nprint(type(X), X.shape)  # <class 'numpy.ndarray'> (2, 2)"
  },
  {
    question: "What is the return type of np.array(5)?",
    shortAnswer: "A 0-dimensional ndarray (scalar array) of shape () with ndim=0.",
    explanation: "Passing a single numeric scalar into np.array() produces a 0D array. It has ndim=0, shape=(), and size=1. You can extract the raw Python scalar using arr.item().",
    hint: "Scalars create 0-dimensional arrays with empty shape ().",
    level: "basic",
    codeExample: "import numpy as np\ns = np.array(42)\nprint(s.shape)   # ()\nprint(s.ndim)    # 0\nprint(s.item())  # 42"
  },
  {
    question: "How do you specify endianness when defining dtype in np.array()?",
    shortAnswer: "Prefix with '<' for little-endian or '>' for big-endian (e.g., dtype='<i4').",
    explanation: "NumPy supports explicit byte ordering. '<i4' indicates a 32-bit signed integer in little-endian format (standard on x86/ARM Intel/AMD CPUs), while '>i4' indicates big-endian format.",
    hint: "< = little-endian, > = big-endian.",
    level: "advanced",
    codeExample: "import numpy as np\narr_le = np.array([1, 2, 3], dtype='<i4')  # little-endian int32\narr_be = np.array([1, 2, 3], dtype='>i4')  # big-endian int32\nprint(arr_le.dtype, arr_be.dtype)"
  },
  {
    question: "What happens if an integer in a list exceeds the capacity of the specified integer dtype?",
    shortAnswer: "Integer overflow occurs (values wrap around or raise an OverflowError depending on platform).",
    explanation: "For example, np.int8 can only represent values from -128 to 127. If you pass np.array([130], dtype=np.int8), the value wraps around modulo 256 to -126 (or raises an error in strict conversion modes).",
    hint: "Values exceeding dtype capacity wrap around due to binary overflow.",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.array([127, 128], dtype=np.int8)\nprint(arr)  # array([ 127, -128], dtype=int8) -> Wrapped around!"
  },
  {
    question: "How does np.array() handle nested sequences of tuples vs lists?",
    shortAnswer: "Tuples and lists are treated identically as dimension delimiters.",
    explanation: "np.array([(1, 2), (3, 4)]) produces the exact same 2D ndarray of shape (2, 2) as np.array([[1, 2], [3, 4]]). NumPy treats all Python sequences uniformly when constructing array dimensions.",
    hint: "Tuples and lists construct dimensions identically.",
    level: "basic",
    codeExample: "import numpy as np\na = np.array([(1, 2), (3, 4)])\nb = np.array([[1, 2], [3, 4]])\nprint(np.array_equal(a, b))  # True"
  },
  {
    question: "What is the difference between passing a Python list of strings vs list of numbers to np.array()?",
    shortAnswer: "Numbers produce numeric dtypes (int64/float64); strings produce fixed-width Unicode dtypes (<U_len).",
    explanation: "When given strings ['Sachin', 'Mahima', 'Barrackpore'], NumPy calculates the maximum string length (e.g. 11 characters for 'Barrackpore') and assigns a fixed-width Unicode dtype like '<U11'. Every slot in RAM is allocated 11 Unicode characters (44 bytes).",
    hint: "String arrays have fixed-width memory allocations e.g. <U11.",
    level: "intermediate",
    codeExample: "import numpy as np\nnames = np.array(['Sachin', 'Mahima', 'Barrackpore'])\nprint(names.dtype)     # '<U11'\nprint(names.itemsize)  # 44 bytes (11 chars * 4 bytes/char)"
  },
  {
    question: "Why should you pass copy=False or use np.asarray() inside machine learning preprocessing functions?",
    shortAnswer: "To prevent allocating duplicate memory when callers already provide sanitized NumPy ndarrays.",
    explanation: "If a user passes a 10 GB feature matrix X into a scaling function, calling np.array(X, copy=True) duplicates 10 GB of RAM. Using np.asarray(X) checks if X is already an ndarray, reusing existing memory and eliminating memory leaks.",
    hint: "Avoid unnecessary RAM duplication in production ML pipelines.",
    level: "advanced",
    codeExample: "import numpy as np\ndef standardize_features(X):\n    # Zero-copy if X is already ndarray\n    X_arr = np.asarray(X, dtype=np.float64)\n    return (X_arr - np.mean(X_arr, axis=0)) / np.std(X_arr, axis=0)"
  }
];

export default questions;
