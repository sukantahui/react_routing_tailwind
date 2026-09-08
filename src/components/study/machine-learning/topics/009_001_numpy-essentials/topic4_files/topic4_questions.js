const questions = [
  {
    question: "What is the default data type (dtype) of arrays created by np.zeros() and np.ones()?",
    shortAnswer: "np.float64 (standard 64-bit double-precision floating point).",
    explanation: "If no explicit dtype is specified, NumPy defaults to float64. For memory-sensitive ML pipelines, you should explicitly pass dtype=np.float32 to save 50% RAM.",
    hint: "Float64 is NumPy's default floating point precision.",
    level: "basic",
    codeExample: "import numpy as np\nz = np.zeros(5)\nprint(z.dtype)  # float64\nprint(z)        # [0. 0. 0. 0. 0.]"
  },
  {
    question: "Why does np.zeros(3, 4) cause a TypeError, and what is the correct syntax?",
    shortAnswer: "np.zeros expects shape as a single tuple: np.zeros((3, 4)).",
    explanation: "In np.zeros(shape, dtype=float, order='C'), the second argument is interpreted as dtype. Passing 4 as the second argument causes TypeError because 4 is an integer, not a valid data type. Pass the shape as a tuple (3, 4).",
    hint: "Always enclose multi-dimensional dimensions in parentheses as a tuple.",
    level: "basic",
    codeExample: "# BAD — TypeError:\n# np.zeros(3, 4)\n\n# CORRECT:\nz = np.zeros((3, 4))\nprint(z.shape)  # (3, 4)"
  },
  {
    question: "What is the primary difference between np.arange() and np.linspace()?",
    shortAnswer: "np.arange() is step-size based (stop is exclusive); np.linspace() is count based (endpoint is inclusive by default).",
    explanation: "np.arange(start, stop, step) increments by a fixed step size and stops strictly before stop. np.linspace(start, stop, num) generates exactly num evenly spaced numbers between start and stop (including stop by default).",
    hint: "arange = specify step size; linspace = specify total count of numbers.",
    level: "basic",
    codeExample: "import numpy as np\na = np.arange(0, 10, 2)    # [0, 2, 4, 6, 8] (step=2, exclusive stop)\nl = np.linspace(0, 10, 5)  # [0. , 2.5, 5. , 7.5, 10.] (count=5, inclusive)\nprint(a, l)"
  },
  {
    question: "Why is np.linspace() preferred over np.arange() when generating continuous ranges with floating-point steps?",
    shortAnswer: "Floating-point precision errors in arange can cause unpredictable inclusion or exclusion of the endpoint.",
    explanation: "Because floating-point arithmetic has finite precision (e.g. 0.1 + 0.2 != 0.3), np.arange(0, 0.3, 0.1) may produce 3 or 4 elements depending on floating-point rounding. np.linspace avoids this by dividing the exact range by (num - 1).",
    hint: "Floating-point rounding errors make arange step boundaries unstable.",
    level: "intermediate",
    codeExample: "import numpy as np\n# linspace gives guaranteed, exact element counts:\npoints = np.linspace(0.0, 1.0, 11)  # exactly 11 points: 0.0, 0.1, ..., 1.0"
  },
  {
    question: "What is the mathematical formula used by np.linspace(start, stop, num) to compute the step size?",
    shortAnswer: "step = (stop - start) / (num - 1) when endpoint=True.",
    explanation: "When endpoint=True (the default), there are (num - 1) intervals between the num points. If endpoint=False, the formula is step = (stop - start) / num.",
    hint: "Divide the total interval width by the number of gaps (num - 1).",
    level: "intermediate",
    codeExample: "import numpy as np\ngrid, step = np.linspace(0, 10, 5, retstep=True)\nprint(grid)  # [ 0.   2.5  5.   7.5 10. ]\nprint(step)  # 2.5 ((10 - 0) / (5 - 1))"
  },
  {
    question: "How does the retstep parameter in np.linspace() work?",
    shortAnswer: "If retstep=True, it returns a 2-element tuple: (samples_array, step_size).",
    explanation: "Setting retstep=True causes linspace to return both the generated array and the calculated scalar step size between consecutive samples, which is useful when setting up numerical integrals or finite differences.",
    hint: "retstep = return step size.",
    level: "intermediate",
    codeExample: "import numpy as np\narr, step = np.linspace(0, 100, num=11, retstep=True)\nprint('Step size:', step)  # 10.0"
  },
  {
    question: "What does np.empty() do and why does it contain non-zero garbage values?",
    shortAnswer: "np.empty() allocates memory without initializing bytes, so it contains leftover garbage from RAM.",
    explanation: "np.empty(shape) requests a contiguous memory buffer from the operating system but skips filling it with zeros or ones. It is slightly faster than np.zeros(), but you must manually overwrite every element before reading.",
    hint: "empty skips memory initialization for maximum raw allocation speed.",
    level: "intermediate",
    codeExample: "import numpy as np\ne = np.empty((2, 2), dtype=np.float64)\n# Contains whatever bits previously existed at that RAM address\nprint(e)"
  },
  {
    question: "What is the difference between np.eye() and np.identity()?",
    shortAnswer: "np.identity(n) only creates square n×n matrices; np.eye(N, M, k) allows rectangular matrices and diagonal shifts k.",
    explanation: "np.identity(3) creates a 3×3 square identity matrix. np.eye(3, 5, k=1) creates a 3×5 matrix with 1s shifted to the upper diagonal (k=1) and 0s elsewhere.",
    hint: "eye supports rectangular shapes (N, M) and diagonal offsets k.",
    level: "intermediate",
    codeExample: "import numpy as np\nsquare_id = np.identity(3)          # 3x3\nshifted_eye = np.eye(3, 4, k=1)     # 3x4 with 1s on upper diagonal\nprint(shifted_eye)"
  },
  {
    question: "How are np.eye() matrices used in Ridge Regression (L2 Regularization)?",
    shortAnswer: "They provide the lambda * I penalty matrix added to X^T X to prevent matrix singularity and control overfitting.",
    explanation: "In closed-form Ridge Regression, the analytical solution is beta = (X^T X + lambda * I)^(-1) X^T y. np.eye(p) creates the p×p identity matrix I scaled by regularization hyperparameter lambda.",
    hint: "Ridge adds lambda * I to the normal equation matrix.",
    level: "advanced",
    codeExample: "import numpy as np\np_features = 4\nlambda_val = 0.1\nI = np.eye(p_features)\npenalty_term = lambda_val * I\nprint(penalty_term)"
  },
  {
    question: "How do template cloning functions like np.zeros_like(x) work?",
    shortAnswer: "They create an array of zeros with the exact same shape and dtype as the template array x.",
    explanation: "Instead of manually writing np.zeros(x.shape, dtype=x.dtype), np.zeros_like(x) automatically copies the shape, data type, and memory order from the reference array x.",
    hint: "zeros_like clones shape, dtype, and order from an existing array.",
    level: "basic",
    codeExample: "import numpy as np\ntemplate = np.array([[1.5, 2.5], [3.5, 4.5]], dtype=np.float32)\nz = np.zeros_like(template)\nprint(z.shape)  # (2, 2)\nprint(z.dtype)  # float32"
  },
  {
    question: "What does np.full(shape, fill_value) do?",
    shortAnswer: "Creates an ndarray of the specified shape filled entirely with fill_value.",
    explanation: "np.full((3, 3), 7.5) creates a 3×3 array where all 9 elements are initialized to 7.5. It automatically infers dtype from fill_value unless explicitly overridden.",
    hint: "full fills every cell with a specified constant.",
    level: "basic",
    codeExample: "import numpy as np\narr = np.full((2, 3), fill_value=99, dtype=np.int16)\nprint(arr)  # [[99, 99, 99], [99, 99, 99]]"
  },
  {
    question: "How is np.ones() commonly used when preparing a feature matrix X for Linear Regression?",
    shortAnswer: "To create an augmented column of 1s representing the intercept/bias feature x0.",
    explanation: "In linear regression y = beta0 + beta1*x1 + beta2*x2, the intercept beta0 is multiplied by a dummy feature x0=1. np.ones((N_samples, 1)) generates this bias column, which is prepended to X using np.hstack.",
    hint: "A column of 1s multiplies the bias term beta0.",
    level: "intermediate",
    codeExample: "import numpy as np\nX_raw = np.array([[2.5], [3.8], [1.2]])  # 3 samples x 1 feature\nones_col = np.ones((X_raw.shape[0], 1))\nX_augmented = np.hstack([ones_col, X_raw])\nprint(X_augmented)  # [[1. , 2.5], [1. , 3.8], [1. , 1.2]]"
  },
  {
    question: "What does np.logspace(start, stop, num) generate?",
    shortAnswer: "num numbers spaced evenly on a log scale between base^start and base^stop (default base=10).",
    explanation: "np.logspace(-3, 0, 4) produces 10^-3, 10^-2, 10^-1, and 10^0 ([0.001, 0.01, 0.1, 1.0]). It is widely used in Machine Learning hyperparameter tuning (GridSearchCV) for learning rates and regularization alphas.",
    hint: "logspace generates powers of 10 (or a specified base).",
    level: "intermediate",
    codeExample: "import numpy as np\nlrs = np.logspace(-4, -1, num=4)  # 10^-4, 10^-3, 10^-2, 10^-1\nprint(lrs)  # [0.0001, 0.001 , 0.01  , 0.1   ]"
  },
  {
    question: "What is the difference between np.logspace() and np.geomspace()?",
    shortAnswer: "logspace takes powers of base as inputs (e.g. -3 to 0); geomspace takes actual start and stop numbers (e.g. 0.001 to 1.0).",
    explanation: "np.logspace(1, 3, 3) generates [10^1, 10^2, 10^3] = [10, 100, 1000]. np.geomspace(10, 1000, 3) directly takes 10 and 1000 as bounds, producing the exact same geometric progression [10, 100, 1000].",
    hint: "geomspace takes actual endpoint numbers instead of exponents.",
    level: "intermediate",
    codeExample: "import numpy as np\na = np.logspace(1, 3, 3)     # exponents 1 to 3 -> [10, 100, 1000]\nb = np.geomspace(10, 1000, 3)# values 10 to 1000   -> [10, 100, 1000]\nprint(np.allclose(a, b))     # True"
  },
  {
    question: "What happens when you pass a negative step to np.arange(10, 0, -2)?",
    shortAnswer: "It generates a decreasing sequence: [10, 8, 6, 4, 2], stopping before 0.",
    explanation: "When step is negative, start must be greater than stop. The sequence decrements by step until reaching the value strictly greater than stop.",
    hint: "Negative steps decrement the array from high to low.",
    level: "basic",
    codeExample: "import numpy as np\ncountdown = np.arange(10, 0, -2)\nprint(countdown)  # [10, 8, 6, 4, 2]"
  },
  {
    question: "What does np.full_like(a, fill_value) do when given a float array but an integer fill value?",
    shortAnswer: "The integer fill value is cast to the float dtype of template array a.",
    explanation: "np.full_like inherits the exact dtype of template a. If a is float64, passing fill_value=5 stores 5.0 in the output array.",
    hint: "full_like enforces the template array's data type.",
    level: "intermediate",
    codeExample: "import numpy as np\ntemplate = np.zeros((2, 2), dtype=np.float64)\narr = np.full_like(template, fill_value=7)\nprint(arr.dtype)  # float64\nprint(arr)        # [[7., 7.], [7., 7.]]"
  },
  {
    question: "How can you create a 3D tensor of zeros of shape (16, 28, 28) representing a batch of 16 grayscale MNIST images?",
    shortAnswer: "np.zeros((16, 28, 28), dtype=np.float32)",
    explanation: "Passing the 3-tuple (16, 28, 28) creates an ndarray with 16 batches, 28 rows, and 28 columns (total 12,544 elements) initialized to zero.",
    hint: "Shape tuple: (Batch_Size, Height, Width).",
    level: "intermediate",
    codeExample: "import numpy as np\nmnist_batch = np.zeros((16, 28, 28), dtype=np.float32)\nprint(mnist_batch.shape)  # (16, 28, 28)\nprint(mnist_batch.ndim)   # 3"
  },
  {
    question: "What is the memory and speed advantage of np.zeros(1_000_000) over [0] * 1_000_000?",
    shortAnswer: "NumPy calls the OS calloc() C function, allocating zeroed RAM instantaneously without allocating 1M Python objects.",
    explanation: "calloc() maps zero-filled virtual memory pages on demand. Python lists must allocate 1,000,000 separate pointer entries pointing to the integer 0 object, consuming 8 MB of pointer overhead plus interpreter loop time.",
    hint: "NumPy uses C calloc() for near-instant zero-memory mapping.",
    level: "advanced",
    codeExample: "import numpy as np\nz = np.zeros(1_000_000, dtype=np.float32)  # Takes <1 ms and exactly 4 MB"
  },
  {
    question: "What does np.eye(3, k=-1) produce?",
    shortAnswer: "A 3×3 matrix with 1s on the first subdiagonal (below main diagonal) and 0s elsewhere.",
    explanation: "The k parameter controls the diagonal index: k=0 is main diagonal, k>0 is above main diagonal (superdiagonal), and k<0 is below main diagonal (subdiagonal).",
    hint: "k < 0 shifts the 1s below the main diagonal.",
    level: "intermediate",
    codeExample: "import numpy as np\nsub_diag = np.eye(3, k=-1)\nprint(sub_diag)\n# [[0., 0., 0.],\n#  [1., 0., 0.],\n#  [0., 1., 0.]]"
  },
  {
    question: "Why should you NOT use np.empty() if you plan to perform in-place mathematical operations like arr += 5?",
    shortAnswer: "Because the initial garbage values in RAM will corrupt your mathematical calculations.",
    explanation: "np.empty() leaves whatever raw bytes previously existed in RAM. If you perform arr += 5 or np.sum(arr), you are adding to arbitrary uninitialized memory values (which might include NaN or infinities). Always use np.zeros() if initializing an accumulator.",
    hint: "Accumulators require clean zero initialization.",
    level: "intermediate",
    codeExample: "import numpy as np\n# DANGEROUS: accumulator initialized with empty()\nacc = np.empty((2, 2))\nacc += 5.0  # Corrupted by garbage values!\n\n# SAFE:\nacc_clean = np.zeros((2, 2))\nacc_clean += 5.0"
  },
  {
    question: "How do you create an array of booleans initialized to all False using np.zeros?",
    shortAnswer: "np.zeros(shape, dtype=np.bool_)",
    explanation: "Because zero corresponds to False in boolean representation, passing dtype=np.bool_ (or dtype=bool) initializes all elements to False with 1 byte per boolean item.",
    hint: "0 is False in binary boolean representation.",
    level: "basic",
    codeExample: "import numpy as np\nmask = np.zeros((3, 3), dtype=np.bool_)\nprint(mask)\n# [[False False False],\n#  [False False False],\n#  [False False False]]"
  },
  {
    question: "What is the result of np.arange(5)?",
    shortAnswer: "An integer ndarray: [0, 1, 2, 3, 4].",
    explanation: "When only one argument is provided to np.arange(stop), start defaults to 0 and step defaults to 1, producing numbers from 0 up to stop - 1.",
    hint: "Single argument = stop value starting from 0.",
    level: "basic",
    codeExample: "import numpy as np\nprint(np.arange(5))  # [0 1 2 3 4]"
  },
  {
    question: "How does endpoint=False affect the output of np.linspace(0, 10, 5, endpoint=False)?",
    shortAnswer: "It excludes 10.0 and divides the interval into 5 steps of 2.0: [0., 2., 4., 6., 8.].",
    explanation: "With endpoint=False, stop (10.0) is not included in the output. The step size is calculated as (stop - start) / num = (10 - 0) / 5 = 2.0.",
    hint: "endpoint=False excludes the stop value and changes step size calculation.",
    level: "intermediate",
    codeExample: "import numpy as np\nprint(np.linspace(0, 10, 5, endpoint=False))  # [0. 2. 4. 6. 8.]"
  },
  {
    question: "How do you generate a 1D coordinate grid for plotting a sigmoid activation function between -6 and +6 with 100 points?",
    shortAnswer: "x = np.linspace(-6, 6, 100)",
    explanation: "np.linspace(-6, 6, 100) produces 100 smooth, evenly spaced points across the active domain of the sigmoid function, ideal for Matplotlib curves.",
    hint: "np.linspace(-6, 6, 100) provides 100 smooth points.",
    level: "basic",
    codeExample: "import numpy as np\nx = np.linspace(-6, 6, 100)\nsigmoid = 1.0 / (1.0 + np.exp(-x))\nprint(x.shape, sigmoid.shape)  # (100,) (100,)"
  },
  {
    question: "What order parameter option ensures that an array created with np.zeros((3, 4), order='F') is column-major?",
    shortAnswer: "order='F' forces Fortran column-major memory layout.",
    explanation: "By default, order='C' stores rows consecutively in memory. Setting order='F' stores columns consecutively (F_CONTIGUOUS: True), which can speed up operations when interfacing with Fortran libraries or BLAS column-major routines.",
    hint: "order='F' sets Fortran column-major ordering.",
    level: "advanced",
    codeExample: "import numpy as np\nz_fortran = np.zeros((3, 4), order='F')\nprint(z_fortran.flags['F_CONTIGUOUS'])  # True\nprint(z_fortran.strides)                # (8, 24) -> 8 bytes per col step!"
  }
];

export default questions;
