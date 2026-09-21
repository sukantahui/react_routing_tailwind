const questions = [
  {
    question: "What is the primary conceptual distinction between NumPy and SciPy?",
    shortAnswer: "NumPy provides basic array manipulation and element-wise arithmetic; SciPy provides full-fledged scientific routines and mathematical modeling.",
    explanation: "NumPy is designed as a foundational array library offering the N-dimensional `ndarray` object, broadcasting, and elementary math. SciPy takes those NumPy arrays as inputs to perform complex scientific tasks: calculating exact probability integrals, optimizing loss functions, computing sparse matrix multiplications, and executing advanced statistical hypothesis tests.",
    hint: "NumPy is the array container and basic math engine; SciPy is the scientific algorithms powerhouse.",
    level: "basic",
    codeExample: "import numpy as np\nimport scipy.linalg as la\n\n# NumPy creates the matrix\nA = np.array([[1, 2], [3, 4]])\n# SciPy provides dedicated LAPACK solvers (LU, SVD, Cholesky)\nP, L, U = la.lu(A)\nprint('LU Decomposition:', L, U)"
  },
  {
    question: "How does `scipy.linalg` differ from `numpy.linalg`?",
    shortAnswer: "scipy.linalg is always compiled with full BLAS/LAPACK support, contains more routines (LU, Schur, QZ), and is consistently faster.",
    explanation: "While `numpy.linalg` includes a minimal subset of basic matrix operations (and can sometimes be built without full external LAPACK), `scipy.linalg` is guaranteed to be linked to full LAPACK routines. It provides comprehensive decompositions (`lu`, `schur`, `hessenberg`, `cholesky`), matrix functions (`expm`, `logm`, `sqrtm`), and direct memory-efficient solvers.",
    hint: "In scientific Python and machine learning, always prefer scipy.linalg over numpy.linalg.",
    level: "moderate",
    codeExample: "import scipy.linalg as la\nimport numpy as np\n\nA = np.array([[4, 12, -16], [12, 37, -43], [-16, -43, 98]])\n# Cholesky decomposition for positive-definite covariance matrix\nL = la.cholesky(A, lower=True)\nprint('Cholesky factor L:\\n', L)"
  },
  {
    question: "What are SciPy Sparse Matrices and why are they crucial in Machine Learning?",
    shortAnswer: "Sparse matrices only store non-zero elements in memory, preventing RAM overflow when handling millions of text or graph features.",
    explanation: "In NLP (TF-IDF, Bag of Words) or recommender systems (user-item ratings), 99% of matrix cells are zeros. A dense NumPy array of 100,000 documents by 50,000 words would consume ~40 GB of RAM. `scipy.sparse.csr_matrix` stores only non-zero values and their indices, shrinking memory consumption down to a few megabytes.",
    hint: "CSR (Compressed Sparse Row) saves memory and speeds up row-wise matrix multiplications.",
    level: "moderate",
    codeExample: "from scipy.sparse import csr_matrix\nimport numpy as np\n\n# 10,000 x 10,000 matrix with only 3 non-zero entries\nrows = np.array([0, 500, 9999])\ncols = np.array([10, 4000, 8500])\ndata = np.array([1.5, 2.8, 9.1])\n\nsparse_X = csr_matrix((data, (rows, cols)), shape=(10000, 10000))\nprint('Sparse RAM vs Dense RAM:', sparse_X.data.nbytes, 'bytes vs ~800 MB dense!')"
  },
  {
    question: "When should you use `scipy.optimize.minimize` over hand-written gradient descent?",
    shortAnswer: "When solving complex non-convex or constrained optimization problems that require advanced quasi-Newton algorithms (BFGS, L-BFGS-B).",
    explanation: "Hand-written gradient descent requires manual tuning of learning rates and can get trapped in plateaus or oscillate in ill-conditioned ravines. `scipy.optimize.minimize` implements second-order Quasi-Newton methods (like BFGS and L-BFGS-B) that approximate inverse Hessian matrices for rapid quadratic convergence.",
    hint: "BFGS adapts step sizes automatically using gradient curvature information.",
    level: "advanced",
    codeExample: "from scipy.optimize import minimize\n\n# Rosenbrock function: f(x, y) = (1 - x)^2 + 100*(y - x^2)^2\ndef rosenbrock(x):\n    return (1 - x[0])**2 + 100 * (x[1] - x[0]**2)**2\n\nres = minimize(rosenbrock, [0.0, 0.0], method='BFGS')\nprint('Convergence status:', res.success)\nprint('Optimal parameters:', res.x)"
  },
  {
    question: "Can SciPy and NumPy functions be mixed freely in the same codebase?",
    shortAnswer: "Yes, seamlessly. SciPy functions accept NumPy ndarrays and return NumPy ndarrays.",
    explanation: "Because SciPy is designed from the ground up as an extension of NumPy, there is zero data conversion overhead. You create, slice, and filter data using NumPy arrays and pass them directly into SciPy functions, which return standard NumPy ndarrays or lightweight namedtuples.",
    hint: "No serialization or conversion is needed between NumPy and SciPy.",
    level: "basic",
    codeExample: "import numpy as np\nimport scipy.stats as stats\n\n# NumPy array -> SciPy function -> NumPy array\nx = np.linspace(-3, 3, 100)\npdf_values = stats.norm.pdf(x)\nprint(type(pdf_values))  # <class 'numpy.ndarray'>"
  },
  {
    question: "What is the difference between `scipy.sparse.csr_matrix` and `scipy.sparse.csc_matrix`?",
    shortAnswer: "CSR is optimized for fast row slicing and matrix-vector multiplication; CSC is optimized for fast column slicing and arithmetic.",
    explanation: "Compressed Sparse Row (CSR) indexes rows efficiently, making row-wise operations `mat[i, :]` and matrix products `X @ w` fast (ideal for ML training). Compressed Sparse Column (CSC) indexes columns efficiently, making column slicing `mat[:, j]` fast (ideal for feature selection).",
    hint: "CSR for row access and ML feature matrices; CSC for column slicing and linear solvers.",
    level: "advanced",
    codeExample: "from scipy.sparse import csr_matrix, csc_matrix\nimport numpy as np\n\ndata = np.array([[1, 0, 0], [0, 0, 2], [0, 3, 0]])\ncsr = csr_matrix(data)\ncsc = csc_matrix(data)\n\nprint('CSR Row Slicing:', csr[1, :].toarray())\nprint('CSC Col Slicing:', csc[:, 1].toarray())"
  },
  {
    question: "Why does `scipy.stats` provide better probability modeling than `numpy.random`?",
    shortAnswer: "`numpy.random` only generates random samples; `scipy.stats` provides complete mathematical distribution objects (PDF, CDF, PPF, moments, fit).",
    explanation: "NumPy's random module generates pseudo-random variates. In contrast, `scipy.stats` provides rigorous statistical distribution objects with analytical functions: exact probability density (`.pdf`), cumulative distribution (`.cdf`), inverse CDF quantiles (`.ppf`), theoretical skewness/kurtosis (`.stats()`), and maximum likelihood estimation (`.fit()`).",
    hint: "NumPy draws samples; SciPy calculates exact analytical probabilities and fits distributions.",
    level: "moderate",
    codeExample: "from scipy.stats import norm\n\n# Fitting sample data to find optimal mean and std deviation\ndata = [1.2, 1.9, 2.1, 2.0, 1.8, 2.2]\nmu_fit, sigma_fit = norm.fit(data)\nprint(f'Fitted Normal params: mu={mu_fit:.3f}, sigma={sigma_fit:.3f}')"
  },
  {
    question: "How does SciPy handle numerical stability issues like log-sum-exp or catastrophic cancellation?",
    shortAnswer: "SciPy subpackages provide dedicated stable functions like `scipy.special.logsumexp` and `scipy.special.expit`.",
    explanation: "In Machine Learning (e.g. Softmax classification and Logistic Regression), computing `log(sum(exp(x)))` directly on large logits triggers floating-point overflow (`inf`). `scipy.special.logsumexp` shifts numbers by their maximum (`max(x)`) under the hood, guaranteeing numerical precision without underflow or overflow.",
    hint: "Use scipy.special functions for numerically safe log-probabilities and sigmoids.",
    level: "advanced",
    codeExample: "from scipy.special import logsumexp, expit\nimport numpy as np\n\n# Large logits that would overflow standard np.exp\nlogits = np.array([1000, 1001, 1002])\nlog_prob = logsumexp(logits)\nprint('Numerically stable Log-Sum-Exp:', log_prob)\n# Stable sigmoid function:\nprint('Sigmoid(100):', expit(100))"
  }
];

export default questions;
