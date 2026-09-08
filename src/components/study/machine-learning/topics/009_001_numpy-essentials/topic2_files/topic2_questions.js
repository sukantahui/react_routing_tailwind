const questions = [
  {
    question: "What does 'ndarray' stand for in NumPy?",
    shortAnswer: "N-Dimensional Array.",
    explanation: "An ndarray is the central data structure in NumPy. It represents a multidimensional, homogeneous grid of fixed-size elements (typically numbers) indexed by a tuple of non-negative integers.",
    hint: "N stands for any number of dimensions.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.array([1, 2, 3])\nprint(type(arr))  # <class 'numpy.ndarray'>"
  },
  {
    question: "What does 'homogeneous' mean in the context of an ndarray?",
    shortAnswer: "All elements in the array must have the exact same data type (dtype).",
    explanation: "Unlike Python lists which can store mixed types (e.g. [1, 'text', 3.14]), every single element in a NumPy ndarray shares the same data type and byte size. This enables contiguous memory allocation and vectorized SIMD CPU operations.",
    hint: "Homogeneous = uniform type across all elements.",
    level: "basic",
    codeExample: "import numpy as np\n# Python upcasts all integers to floats to maintain homogeneity\narr = np.array([1, 2, 3.5])\nprint(arr.dtype)  # float64\nprint(arr)        # array([1. , 2. , 3.5])"
  },
  {
    question: "What is the difference between arr.ndim, arr.shape, and arr.size?",
    shortAnswer: "ndim is number of axes; shape is dimension lengths tuple; size is total elements.",
    explanation: "arr.ndim gives the rank (number of dimensions). arr.shape gives a tuple showing the length along each dimension. arr.size gives the total count of elements, which equals the mathematical product of the dimensions in shape.",
    hint: "ndim = integer, shape = tuple, size = total count.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.zeros((3, 4, 5))\nprint(arr.ndim)   # 3\nprint(arr.shape)  # (3, 4, 5)\nprint(arr.size)   # 60 (3 * 4 * 5)"
  },
  {
    question: "How is a 1D vector with shape (5,) fundamentally different from a 2D matrix with shape (1, 5) or (5, 1)?",
    shortAnswer: "(5,) has 1 axis (ndim=1), while (1, 5) and (5, 1) have 2 axes (ndim=2).",
    explanation: "A 1D array has only one indexing dimension arr[i]. A 2D array has rows and columns arr[i, j]. In machine learning (e.g., Scikit-learn), feature matrices MUST be 2D (samples, features), so passing a (5,) 1D array instead of (5, 1) or (1, 5) will throw a ValueError.",
    hint: "Check array.ndim and indexing dimensions.",
    level: "intermediate",
    codeExample: "import numpy as np\nv_1d = np.array([1, 2, 3, 4, 5])       # shape: (5,), ndim: 1\nrow_2d = v_1d.reshape(1, 5)            # shape: (1, 5), ndim: 2\ncol_2d = v_1d.reshape(5, 1)            # shape: (5, 1), ndim: 2"
  },
  {
    question: "What is the relationship between arr.itemsize, arr.size, and arr.nbytes?",
    shortAnswer: "arr.nbytes = arr.size * arr.itemsize",
    explanation: "arr.itemsize is the number of bytes consumed by one element (e.g., 8 bytes for float64, 4 bytes for int32). arr.size is total elements. arr.nbytes calculates total RAM consumed by the raw array buffer.",
    hint: "Total bytes = number of items multiplied by bytes per item.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.ones((100, 100), dtype=np.float64)\nprint(arr.itemsize)  # 8 bytes\nprint(arr.size)      # 10000 elements\nprint(arr.nbytes)    # 80000 bytes (80 KB)"
  },
  {
    question: "What are 'strides' in a NumPy ndarray?",
    shortAnswer: "The number of bytes to step in memory along each axis to advance to the next element.",
    explanation: "Because ndarray memory is a flat 1D contiguous block of bytes, NumPy uses strides to navigate multi-dimensional indexes. For a (3, 4) float64 array, strides is (32, 8) — jumping to the next row skips 32 bytes (4 elements * 8 bytes), jumping to next column skips 8 bytes.",
    hint: "Strides define the byte-step multiplier per dimension.",
    level: "advanced",
    codeExample: "import numpy as np\narr = np.arange(12, dtype=np.int64).reshape(3, 4)\nprint(arr.strides)  # (32, 8) -> 32 bytes per row, 8 bytes per col"
  },
  {
    question: "What is the difference between C-contiguous and Fortran-contiguous memory layout?",
    shortAnswer: "C-order is row-major (last axis contiguous); Fortran-order is column-major (first axis contiguous).",
    explanation: "In C-order (default in Python/NumPy), row elements sit consecutively in memory (moving across columns is 1 element step). In Fortran-order, column elements sit consecutively. Iterating along the contiguous axis maximizes CPU L1/L2 cache hits.",
    hint: "C = Row-major, Fortran = Column-major.",
    level: "intermediate",
    codeExample: "import numpy as np\narr_c = np.ones((2, 3), order='C')\narr_f = np.ones((2, 3), order='F')\nprint(arr_c.flags['C_CONTIGUOUS'])  # True\nprint(arr_f.flags['F_CONTIGUOUS'])  # True"
  },
  {
    question: "What is a 'View' in NumPy and how does it differ from a 'Copy'?",
    shortAnswer: "A view shares memory buffer with the original array; a copy allocates separate memory.",
    explanation: "When you create a view (e.g. through slicing arr[1:4]), no data is duplicated in RAM; NumPy just creates a new ndarray metadata wrapper pointing to the original memory. Modifying elements in a view changes the original array. A copy (arr.copy()) creates an entirely independent buffer.",
    hint: "Views share memory (mutating one mutates both); copies are completely independent.",
    level: "intermediate",
    codeExample: "import numpy as np\norig = np.array([10, 20, 30])\nview_arr = orig[1:]\nview_arr[0] = 999\nprint(orig)  # [ 10 999  30] -> modified!\n\ncopy_arr = orig.copy()\ncopy_arr[0] = 0\nprint(orig)  # [ 10 999  30] -> unchanged!"
  },
  {
    question: "How can you programmatically check whether an ndarray is a view or owns its memory?",
    shortAnswer: "Check arr.base or arr.flags['OWNDATA'].",
    explanation: "If arr.base is None (and arr.flags['OWNDATA'] is True), the array owns its memory buffer. If arr.base points to another ndarray, it is a view derived from that base array.",
    hint: "Check the .base attribute.",
    level: "intermediate",
    codeExample: "import numpy as np\na = np.array([1, 2, 3, 4])\nb = a[1:3]\nprint(a.base)              # None (owns data)\nprint(b.base is a)         # True (view of a)\nprint(b.flags['OWNDATA'])  # False"
  },
  {
    question: "Why does array transposing (arr.T) in NumPy take virtually 0.000 ms even for massive matrices?",
    shortAnswer: "Transposing only swaps shape and strides metadata; it moves zero bytes of data.",
    explanation: "NumPy's strided architecture allows transposing by simply reversing the shape tuple and strides tuple. The underlying buffer in RAM is untouched. Thus, transpose is an O(1) instantaneous metadata operation.",
    hint: "Think about modifying strides instead of copying data.",
    level: "advanced",
    codeExample: "import numpy as np\narr = np.arange(1_000_000).reshape(1000, 1000)\nt = arr.T\nprint(arr.strides)  # (8000, 8)\nprint(t.strides)    # (8, 8000) -> swapped strides instantly!"
  },
  {
    question: "What is the difference between ravel() and flatten()?",
    shortAnswer: "ravel() returns a view whenever possible (no copy); flatten() always allocates a new copy.",
    explanation: "Both collapse a multi-dimensional array into a 1D array. However, ravel() is memory-efficient because it returns a view of the original memory buffer if contiguous. flatten() always creates a brand new copy in memory.",
    hint: "ravel = view if possible, flatten = always deep copy.",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.array([[1, 2], [3, 4]])\nr = arr.ravel()    # view\nf = arr.flatten()  # copy\nr[0] = 99\nprint(arr[0, 0])   # 99 (modified)\nf[1] = 88\nprint(arr[0, 1])   # 2 (unaffected)"
  },
  {
    question: "Why does Python list memory consume significantly more RAM than a NumPy ndarray for integers?",
    shortAnswer: "Python stores boxed PyObject pointers (~28 bytes/int), while ndarray stores raw unboxed C integers (4 or 8 bytes).",
    explanation: "In a standard Python list, every element is a pointer to a heap-allocated PyObject containing reference count, type info, and value payload (~28 bytes per int on 64-bit OS), plus 8 bytes for the pointer. NumPy stores raw homogeneous binary numbers sequentially.",
    hint: "Python integers are full heap objects with metadata overhead.",
    level: "intermediate",
    codeExample: "import sys, numpy as np\npy_list = [100] * 1000\nnp_arr = np.ones(1000, dtype=np.int32)\nprint('PyList approx:', sys.getsizeof(py_list) + 1000 * 28, 'bytes')\nprint('NumPy ndarray:', np_arr.nbytes, 'bytes (exactly 4 KB)')"
  },
  {
    question: "How does NumPy reduce operations along axis 0 vs axis 1 in a 2D array?",
    shortAnswer: "axis=0 collapses rows (computes per column); axis=1 collapses columns (computes per row).",
    explanation: "The axis parameter specifies the axis that is eliminated or collapsed. In a (rows, columns) matrix: axis=0 travels down rows, producing a 1D array of column results. axis=1 travels across columns, producing a 1D array of row results.",
    hint: "axis=0 eliminates row dimension, axis=1 eliminates column dimension.",
    level: "basic",
    codeExample: "import numpy as np\nmarks = np.array([[70, 80], [90, 60]]) # 2 students x 2 subjects\nprint(marks.mean(axis=0)) # [80., 70.] -> subject averages\nprint(marks.mean(axis=1)) # [75., 75.] -> student averages"
  },
  {
    question: "What happens when you pass a 3D tensor to NumPy? How is its shape interpreted in computer vision?",
    shortAnswer: "Shape is (Height, Width, Channels) for images, or (Batch, Height, Width) for grayscale batches.",
    explanation: "In image processing and deep learning, a single RGB color image is represented as a 3D ndarray: axis 0 is image height (pixels), axis 1 is image width (pixels), and axis 2 is color channels (Red, Green, Blue). A collection of images forms a 4D ndarray (Batch, Height, Width, Channels).",
    hint: "H x W x C = 3D ndarray.",
    level: "intermediate",
    codeExample: "import numpy as np\n# 1080p RGB image tensor\nimg = np.zeros((1080, 1920, 3), dtype=np.uint8)\nprint(img.ndim)   # 3\nprint(img.shape)  # (1080, 1920, 3)"
  },
  {
    question: "What does the arr.data attribute represent?",
    shortAnswer: "A memoryview object pointing to the start of the contiguous C memory buffer.",
    explanation: "arr.data is the Python buffer interface pointer to the actual raw contiguous memory block where values are stored in binary form. It exposes low-level C memory directly to other libraries like OpenCV, C/C++ extensions, and PyTorch without copying.",
    hint: "arr.data is the raw memory pointer.",
    level: "advanced",
    codeExample: "import numpy as np\narr = np.array([1, 2, 3], dtype=np.int32)\nprint(arr.data)  # <memory at 0x...>\nprint(bytes(arr.data))  # raw byte representation"
  },
  {
    question: "What is type coercion (upcasting) in ndarray creation?",
    shortAnswer: "Automatic promotion of all elements to the lowest common denominator data type that fits all values.",
    explanation: "If you mix integers, floats, and strings in np.array([1, 2.5, 'Sachin']), NumPy coerces all items to the most general type (<U32 string), preventing mixed types. If you mix int and float, ints are upcast to floats.",
    hint: "All elements are converted to the highest required precision type.",
    level: "basic",
    codeExample: "import numpy as np\narr1 = np.array([1, 2, 3.14])        # becomes float64\narr2 = np.array([1, 2.5, 'Kolkata']) # becomes '<U32' Unicode string\nprint(arr1.dtype)  # float64\nprint(arr2.dtype)  # <U32"
  },
  {
    question: "Why is chained indexing arr[0][1] slower and more dangerous than multidimensional indexing arr[0, 1]?",
    shortAnswer: "arr[0][1] creates an intermediate temporary array object; arr[0, 1] indexes directly in C.",
    explanation: "arr[0][1] first creates a temporary 1D slice ndarray for row 0, then indexes element 1 of that temporary slice. arr[0, 1] passes both indices directly into NumPy's C indexing engine, calculating the byte offset in one stride step without creating temporary objects.",
    hint: "Always use comma notation arr[row, col] instead of double brackets arr[row][col].",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.zeros((100, 100))\n# Fast and idiomatic:\nval = arr[5, 10]\n# Slower and non-idiomatic:\nval = arr[5][10]"
  },
  {
    question: "What is the role of the WRITEABLE flag in ndarray flags?",
    shortAnswer: "Determines whether array elements can be modified in-place.",
    explanation: "arr.flags.writeable controls read-only state. You can set arr.flags.writeable = False to make an ndarray immutable, preventing accidental data modification during feature engineering or dataset sharing across functions.",
    hint: "Set writeable=False for read-only security.",
    level: "advanced",
    codeExample: "import numpy as np\narr = np.array([10, 20, 30])\narr.flags.writeable = False\n# arr[0] = 99  # Throws: ValueError: assignment destination is read-only"
  },
  {
    question: "How does NumPy handle negative indexing in multi-dimensional ndarrays?",
    shortAnswer: "Negative numbers count backwards from the end along that specific axis (-1 is the last item).",
    explanation: "NumPy follows standard Python negative index semantics along every axis independently. arr[-1, :] extracts the last row; arr[:, -1] extracts the last column; arr[-2, -2] extracts the second-to-last row and column.",
    hint: "-1 means the last item along that axis.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])\nprint(arr[-1, :])   # [70, 80, 90] (last row)\nprint(arr[:, -1])   # [30, 60, 90] (last column)\nprint(arr[-1, -1])  # 90"
  },
  {
    question: "What does the .astype() method do and does it create a view or a copy?",
    shortAnswer: "Converts the ndarray to a new dtype and ALWAYS returns a copy.",
    explanation: ".astype(np.float32) casts all elements to the specified dtype. Because different dtypes require different byte widths (e.g. 8 bytes -> 4 bytes), a new contiguous buffer must be allocated in memory, making it a copy.",
    hint: "astype creates a new copy with the new data type.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.array([1, 2, 3], dtype=np.int64)\nfloats = arr.astype(np.float32)\nprint(floats.dtype)  # float32\nprint(floats.base is arr)  # False (independent copy)"
  },
  {
    question: "How does reshape(-1) work in NumPy?",
    shortAnswer: "-1 tells NumPy to automatically calculate that dimension size from the array's total size.",
    explanation: "When reshaping, you can supply -1 for exactly one dimension. NumPy calculates: size / (product of known dimensions). For example, 12 elements reshaped with (-1, 2) automatically produces (6, 2).",
    hint: "-1 is an inferred dimension wildcard.",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.arange(20)\nmat = arr.reshape(-1, 5)  # 20 / 5 = 4 rows -> shape (4, 5)\nprint(mat.shape)          # (4, 5)\ncol = arr.reshape(-1, 1)  # shape (20, 1) column vector"
  },
  {
    question: "Why do machine learning algorithms (like Gradient Descent) perform vector additions 100x faster on ndarray than Python loops?",
    shortAnswer: "SIMD vectorization, CPU cache locality, and bypassing Python interpreter overhead.",
    explanation: "When you execute a + b on ndarrays, NumPy calls optimized C/Fortran vector loops compiled with AVX/SSE SIMD instructions. The CPU loads multiple 64-bit numbers in one hardware register per cycle, while Python lists must fetch separate heap objects per iteration through bytecode interpretation.",
    hint: "Contiguous C memory + CPU SIMD registers = ultra-fast computation.",
    level: "intermediate",
    codeExample: "import numpy as np\na = np.ones(1_000_000)\nb = np.ones(1_000_000)\nc = a + b  # Vectorized C loop operating directly on raw RAM"
  },
  {
    question: "What is an ndarray's .shape when created from a scalar (0D array)?",
    shortAnswer: "An empty tuple () with ndim=0.",
    explanation: "A scalar wrapped in NumPy (np.array(42)) is a 0-dimensional array. It has ndim=0, shape=(), and size=1. You can access its scalar value with arr.item().",
    hint: "0D arrays have an empty shape tuple ().",
    level: "basic",
    codeExample: "import numpy as np\nscalar = np.array(42)\nprint(scalar.ndim)   # 0\nprint(scalar.shape)  # ()\nprint(scalar.item()) # 42"
  },
  {
    question: "What is the risk of using np.asarray() vs np.array()?",
    shortAnswer: "np.asarray() returns the original array without copying if input is already an ndarray with matching dtype.",
    explanation: "np.array(arr) always creates a copy by default (or unless copy=False), while np.asarray(arr) reuses the existing ndarray if possible. If you mutate the result of np.asarray(), you may inadvertently mutate the caller's input data.",
    hint: "asarray avoids copies if input is already ndarray.",
    level: "advanced",
    codeExample: "import numpy as np\nx = np.array([1, 2, 3])\ny = np.asarray(x)\nprint(y is x)  # True! Same object in memory"
  },
  {
    question: "How does ndarray indexing with a boolean mask differ from slicing in terms of memory?",
    shortAnswer: "Boolean masking ALWAYS creates a copy; basic slicing creates a view.",
    explanation: "Basic slicing (arr[1:5]) uses uniform strides to produce a view without memory copying. Boolean masking (arr[arr > 0]) can select arbitrary, non-contiguous elements from memory, so NumPy must copy the selected items into a new contiguous buffer.",
    hint: "Fancy indexing and boolean indexing always return copies.",
    level: "advanced",
    codeExample: "import numpy as np\narr = np.array([10, 20, 30, 40])\nmask = arr > 25\nfiltered = arr[mask]  # [30, 40] - Copy!\nprint(filtered.base is None)  # True (owns data, not a view)"
  }
];

export default questions;
