const questions = [
  {
    question: "What does the arr.shape attribute return in NumPy?",
    shortAnswer: "A tuple of integers representing the size of the array along each dimension (axis).",
    explanation: "For a 1D array of 5 elements, shape is (5,). For a 2D matrix of 3 rows and 4 columns, shape is (3, 4). For a 3D tensor, shape is (depth, rows, cols). The length of the tuple equals arr.ndim.",
    hint: "shape returns a tuple of dimension lengths.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.zeros((3, 4))\nprint(arr.shape)  # (3, 4)"
  },
  {
    question: "What is the difference between arr.ndim and arr.size?",
    shortAnswer: "arr.ndim is the number of axes (dimensions); arr.size is the total count of elements.",
    explanation: "arr.ndim tells you how many indices are needed to locate an item (e.g. 2 for rows and columns). arr.size is the product of all numbers in the shape tuple (e.g., shape (3, 4) -> size is 3 * 4 = 12).",
    hint: "ndim = rank of array; size = total element count.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.zeros((2, 3, 4))\nprint(arr.ndim)  # 3 (axes)\nprint(arr.size)  # 24 (total elements: 2 * 3 * 4)"
  },
  {
    question: "What is the formula to calculate an ndarray's total memory in bytes (arr.nbytes)?",
    shortAnswer: "arr.nbytes = arr.size * arr.itemsize",
    explanation: "Total memory consumed by the raw numeric data buffer equals total element count (size) multiplied by the number of bytes per element (itemsize, e.g. 8 bytes for float64, 4 bytes for float32).",
    hint: "Total bytes = size multiplied by itemsize.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.ones((100, 50), dtype=np.float32)\nprint(arr.size)      # 5000\nprint(arr.itemsize)  # 4 bytes\nprint(arr.nbytes)    # 20000 bytes (20 KB)"
  },
  {
    question: "Why is a 1D array of shape (5,) fundamentally different from a 2D array of shape (1, 5) or (5, 1)?",
    shortAnswer: "(5,) has ndim=1 and requires 1 index; (1, 5) and (5, 1) have ndim=2 and represent 2D matrices.",
    explanation: "A 1D vector arr[i] has only one axis. A (1, 5) row matrix has 1 row and 5 columns arr[0, j]. A (5, 1) column matrix has 5 rows and 1 column arr[i, 0]. Machine learning estimators (Scikit-learn) reject 1D arrays for feature matrix X because they require 2D inputs (samples, features).",
    hint: "Check ndim and indexing syntax.",
    level: "intermediate",
    codeExample: "import numpy as np\nv = np.array([1, 2, 3])\nprint(v.shape, v.ndim)       # (3,) 1\nrow = v.reshape(1, 3)\nprint(row.shape, row.ndim)   # (1, 3) 2\ncol = v.reshape(3, 1)\nprint(col.shape, col.ndim)   # (3, 1) 2"
  },
  {
    question: "What are the standard expected shapes for feature matrix X and target vector y in Scikit-learn?",
    shortAnswer: "X must be 2D: (n_samples, n_features); y must be 1D: (n_samples,).",
    explanation: "Scikit-learn models expect training inputs where rows represent independent observations (samples) and columns represent predictors (features). Target labels y is a 1D vector of length n_samples.",
    hint: "X is (N, p) 2D matrix; y is (N,) 1D vector.",
    level: "intermediate",
    codeExample: "import numpy as np\n# 100 student samples, 4 test marks\nX = np.random.randn(100, 4)  # (100, 4)\ny = np.random.randint(0, 2, 100) # (100,)\nprint('X shape:', X.shape, '| y shape:', y.shape)"
  },
  {
    question: "What happens to the shape when you slice an array using arr[0, :] versus arr[0:1, :]?",
    shortAnswer: "arr[0, :] drops the row axis and returns a 1D vector; arr[0:1, :] preserves the 2D matrix shape.",
    explanation: "Using an integer index (0) reduces dimensionality by collapsing that axis. Using a slice range (0:1) preserves the dimension with a length of 1. For a (3, 4) matrix: arr[0, :] has shape (4,), while arr[0:1, :] has shape (1, 4).",
    hint: "Single integer index drops the axis; slice range keeps the axis.",
    level: "intermediate",
    codeExample: "import numpy as np\nmat = np.zeros((3, 4))\nprint(mat[0, :].shape)    # (4,)  - 1D vector\nprint(mat[0:1, :].shape)  # (1, 4) - 2D matrix"
  },
  {
    question: "How do you add a new axis to a 1D array to convert it from shape (N,) to (N, 1)?",
    shortAnswer: "Use arr[:, np.newaxis] or np.expand_dims(arr, axis=1) or arr.reshape(-1, 1).",
    explanation: "All three methods insert a dimension of length 1. np.newaxis is an alias for None in indexing, turning a 1D vector into a 2D column vector suitable for single-feature regression.",
    hint: "np.newaxis, np.expand_dims, or reshape(-1, 1).",
    level: "basic",
    codeExample: "import numpy as np\nx = np.array([10, 20, 30])\ncol1 = x[:, np.newaxis]              # (3, 1)\ncol2 = np.expand_dims(x, axis=1)     # (3, 1)\ncol3 = x.reshape(-1, 1)              # (3, 1)\nprint(col1.shape, col2.shape, col3.shape)"
  },
  {
    question: "What does np.squeeze() do to an array's shape?",
    shortAnswer: "It removes all single-dimensional (length 1) axes from the shape tuple.",
    explanation: "If an array has shape (1, 5, 1, 10), np.squeeze() removes the axes of size 1, returning an array of shape (5, 10). You can also target a specific axis via np.squeeze(arr, axis=0).",
    hint: "squeeze collapses unit-length dimensions.",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.zeros((1, 10, 1))\nsqueezed = np.squeeze(arr)\nprint(squeezed.shape)  # (10,)"
  },
  {
    question: "What is the difference between len(arr) and arr.shape[0] vs arr.size?",
    shortAnswer: "len(arr) and arr.shape[0] return the size of the first axis (rows); arr.size is the total element count.",
    explanation: "For a (10, 5) array, len(arr) and arr.shape[0] both return 10 (the number of rows). arr.size returns 50 (total numbers in the matrix). In multi-dimensional code, arr.shape[0] is preferred for clarity.",
    hint: "len(arr) = first axis length; size = total elements across all axes.",
    level: "basic",
    codeExample: "import numpy as np\nmat = np.zeros((10, 5))\nprint(len(mat))       # 10 (rows)\nprint(mat.shape[0])   # 10 (rows)\nprint(mat.size)       # 50 (total elements)"
  },
  {
    question: "What shape does a 0-dimensional scalar array have in NumPy?",
    shortAnswer: "An empty tuple: ().",
    explanation: "A 0D array represents a single point or scalar. Its ndim is 0, shape is (), and size is 1. It has no indexable axes, but you can extract its native Python value using arr.item().",
    hint: "Scalars have ndim=0 and shape=().",
    level: "basic",
    codeExample: "import numpy as np\ns = np.array(99)\nprint(s.shape)   # ()\nprint(s.ndim)    # 0\nprint(s.size)    # 1\nprint(s.item())  # 99"
  },
  {
    question: "What does the -1 dimension mean in arr.reshape(-1, 1)?",
    shortAnswer: "-1 is an inferred dimension wildcard that NumPy calculates automatically from total array size.",
    explanation: "When reshaping, you can supply -1 for exactly one dimension. NumPy computes: new_dim = arr.size / (product of all other specified dimensions). For a 20-element array, reshape(-1, 2) automatically gives shape (10, 2).",
    hint: "-1 tells NumPy: figure out this dimension size automatically.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.arange(12)\nmat = arr.reshape(-1, 4)  # 12 / 4 = 3 rows -> shape (3, 4)\nprint(mat.shape)          # (3, 4)"
  },
  {
    question: "How are dimensions and shapes ordered in Deep Learning image batches (NHWC vs NCHW)?",
    shortAnswer: "NHWC: (Batch, Height, Width, Channels); NCHW: (Batch, Channels, Height, Width).",
    explanation: "TensorFlow and Keras commonly use the NHWC convention (e.g. shape (32, 224, 224, 3) for 32 RGB images). PyTorch uses the NCHW convention (shape (32, 3, 224, 224)). Transposing between them is done using arr.transpose(0, 3, 1, 2).",
    hint: "N=Batch, H=Height, W=Width, C=Color Channels.",
    level: "advanced",
    codeExample: "import numpy as np\n# NHWC (TensorFlow format)\ntf_batch = np.zeros((32, 224, 224, 3))\n# Convert to NCHW (PyTorch format)\ntorch_batch = np.transpose(tf_batch, (0, 3, 1, 2))\nprint(torch_batch.shape)  # (32, 3, 224, 224)"
  },
  {
    question: "Can you assign a new shape directly to arr.shape in-place?",
    shortAnswer: "Yes, modifying arr.shape in-place reshapes the array if total element count is preserved and buffer is contiguous.",
    explanation: "Setting arr.shape = (2, 3) directly updates the metadata shape tuple in-place without returning a new variable, provided the product of dimensions equals arr.size and memory layout allows it.",
    hint: "Direct assignment arr.shape = (r, c) modifies shape in-place.",
    level: "intermediate",
    codeExample: "import numpy as np\narr = np.arange(6)\narr.shape = (2, 3)  # In-place reshape\nprint(arr)"
  },
  {
    question: "What error occurs if you attempt to reshape an array into dimensions whose product does not match arr.size?",
    shortAnswer: "ValueError: cannot reshape array of size X into shape Y.",
    explanation: "NumPy ndarrays have a fixed total number of elements. Attempting to reshape a 10-element array into shape (3, 4) (which requires 12 elements) throws a ValueError because data cannot be created or destroyed during reshape.",
    hint: "Product of new dimensions must exactly equal total elements (size).",
    level: "basic",
    codeExample: "import numpy as np\narr = np.arange(10)\n# arr.reshape(3, 4) -> ValueError: cannot reshape array of size 10 into shape (3, 4)"
  },
  {
    question: "How does axis reduction affect the output shape in np.mean(X, axis=0) for an (N, p) matrix?",
    shortAnswer: "Axis 0 is eliminated, returning a 1D vector of shape (p,).",
    explanation: "When you reduce along an axis (sum, mean, std, min, max), that axis is collapsed. For feature matrix X of shape (100, 4), np.mean(X, axis=0) averages down all 100 rows, producing a 1D vector of 4 feature means.",
    hint: "Reducing along axis 0 removes axis 0 from the shape tuple.",
    level: "basic",
    codeExample: "import numpy as np\nX = np.ones((100, 4))\nmeans = np.mean(X, axis=0)\nprint(means.shape)  # (4,)"
  },
  {
    question: "How can you keep the reduced dimension as size 1 using keepdims=True?",
    shortAnswer: "Pass keepdims=True to retain the collapsed axis as length 1: shape (1, p) instead of (p,).",
    explanation: "Setting keepdims=True prevents the axis from being dropped. For shape (100, 4), np.mean(X, axis=0, keepdims=True) produces shape (1, 4), enabling seamless broadcasting when normalizing X - X_mean.",
    hint: "keepdims=True preserves dimensionality for broadcasting.",
    level: "intermediate",
    codeExample: "import numpy as np\nX = np.ones((100, 4))\nmeans_2d = np.mean(X, axis=0, keepdims=True)\nprint(means_2d.shape)  # (1, 4) - broadcasts cleanly with (100, 4)"
  },
  {
    question: "What is the difference between shape (3,) and shape (3, 1) when performing matrix multiplication with np.dot()?",
    shortAnswer: "np.dot() treats (3,) as a vector (inner product); (3, 1) is treated strictly as a 2D column matrix.",
    explanation: "With a (3,) vector, dot product with another (3,) vector produces a scalar. With (3, 1) and (1, 3) matrices, matrix multiplication produces a (3, 3) outer product matrix. Precise shape controls algebraic behavior.",
    hint: "(3,) produces scalar dot products; (3, 1) follows strict matrix dimension rules.",
    level: "intermediate",
    codeExample: "import numpy as np\na = np.array([1, 2, 3])\nprint(np.dot(a, a))          # 14 (Scalar)\n\na_col = a.reshape(3, 1)\na_row = a.reshape(1, 3)\nprint(np.dot(a_col, a_row))  # 3x3 Matrix"
  },
  {
    question: "How do you check if two arrays have compatible shapes for element-wise addition?",
    shortAnswer: "Their dimensions must either be equal, or one of them must be 1 (Broadcasting Rule).",
    explanation: "NumPy compares shapes element-wise starting from trailing (rightmost) dimensions. For example, (100, 4) and (1, 4) are compatible because 4 == 4 and 1 broadcasts to 100.",
    hint: "Trailing dimensions must match or be equal to 1.",
    level: "intermediate",
    codeExample: "import numpy as np\nA = np.ones((100, 4))\nB = np.ones((1, 4))\nC = A + B  # Valid broadcasting -> shape (100, 4)"
  },
  {
    question: "What does the arr.itemsize attribute tell you?",
    shortAnswer: "The number of bytes occupied by each single element in RAM.",
    explanation: "itemsize is determined by dtype: float64 is 8 bytes, float32 is 4 bytes, int32 is 4 bytes, int16 is 2 bytes, uint8 is 1 byte, and bool_ is 1 byte.",
    hint: "itemsize is the byte width of a single element.",
    level: "basic",
    codeExample: "import numpy as np\na = np.zeros(5, dtype=np.float32)\nprint(a.itemsize)  # 4 bytes"
  },
  {
    question: "What shape does an array created from a list of strings ['Sachin', 'Mahima', 'Susmita'] have?",
    shortAnswer: "Shape is (3,) with a fixed-width Unicode string dtype such as '<U7'.",
    explanation: "Even though strings have variable character lengths, the ndarray has 1 dimension with 3 elements. NumPy sets the dtype to the length of the longest string ('Susmita' -> 7 characters = '<U7').",
    hint: "Shape is (3,) for 3 string items.",
    level: "basic",
    codeExample: "import numpy as np\nnames = np.array(['Sachin', 'Mahima', 'Susmita'])\nprint(names.shape)  # (3,)\nprint(names.dtype)  # '<U7'"
  },
  {
    question: "How do you verify whether an array is a 1D vector or a 2D matrix before training in Python?",
    shortAnswer: "Check arr.ndim == 1 or len(arr.shape) == 1 vs arr.ndim == 2.",
    explanation: "In defensive programming, you can assert: assert X.ndim == 2, f'Expected 2D feature matrix, got shape {X.shape}'. If X.ndim == 1, convert it with X = X.reshape(-1, 1).",
    hint: "Use arr.ndim to verify dimension count.",
    level: "basic",
    codeExample: "import numpy as np\ndef check_dataset(X, y):\n    if X.ndim == 1:\n        X = X.reshape(-1, 1)\n    assert X.shape[0] == y.shape[0], 'Sample mismatch!'\n    return X, y"
  },
  {
    question: "What is the shape of a transposed 2D matrix of shape (3, 5)?",
    shortAnswer: "Shape is (5, 3).",
    explanation: "Transposing arr.T reverses the shape tuple: rows become columns and columns become rows. For a (3, 5) array, arr.T has shape (5, 3).",
    hint: "Transposing swaps rows and columns.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.zeros((3, 5))\nprint(arr.T.shape)  # (5, 3)"
  },
  {
    question: "How does np.ravel() vs np.flatten() affect array shape?",
    shortAnswer: "Both collapse any N-dimensional array into a 1D vector of shape (size,).",
    explanation: "For an array of shape (3, 4), both arr.ravel() and arr.flatten() return shape (12,). ravel() returns a view when possible, whereas flatten() always creates a new copy.",
    hint: "Both return a 1D vector of shape (arr.size,).",
    level: "basic",
    codeExample: "import numpy as np\nmat = np.zeros((3, 4))\nprint(mat.ravel().shape)    # (12,)\nprint(mat.flatten().shape)  # (12,)"
  },
  {
    question: "What happens when you slice a 3D tensor of shape (10, 224, 224) using tensor[0]?",
    shortAnswer: "The first dimension is dropped, returning a 2D matrix of shape (224, 224).",
    explanation: "Indexing the first axis extracts the 0th slice (e.g. the first image in a batch), reducing ndim from 3 to 2.",
    hint: "Indexing the outer axis extracts a 2D slice.",
    level: "intermediate",
    codeExample: "import numpy as np\ntensor = np.zeros((10, 224, 224))\nfirst_img = tensor[0]\nprint(first_img.shape)  # (224, 224)"
  },
  {
    question: "Why does reshaping an array never copy data unless memory layout requires it?",
    shortAnswer: "Reshaping only modifies the shape and strides metadata, pointing to the same contiguous RAM buffer.",
    explanation: "Because memory in RAM is a flat sequential line of bytes, changing logical dimensions from (2, 6) to (3, 4) simply alters how strides calculate index offsets. The raw bytes remain unchanged in memory.",
    hint: "Reshaping is an O(1) metadata view modification when contiguous.",
    level: "advanced",
    codeExample: "import numpy as np\norig = np.arange(12)\nreshaped = orig.reshape(3, 4)\nprint(reshaped.base is orig)  # True (Zero copy view!)"
  }
];

export default questions;
