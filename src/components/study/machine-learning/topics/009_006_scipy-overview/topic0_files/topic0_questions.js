const questions = [
  {
    question: "What is SciPy and how does it relate to NumPy?",
    shortAnswer: "SciPy builds directly on top of NumPy arrays to provide high-level scientific and engineering algorithms.",
    explanation: "While NumPy provides the fundamental N-dimensional array object and basic vectorized mathematical operations, SciPy extends NumPy by implementing advanced numerical routines including numerical integration, optimization, probability distributions, hypothesis testing, signal processing, and spatial algorithms wrapped over compiled C/Fortran routines.",
    hint: "NumPy provides the data structure (ndarray); SciPy provides the advanced scientific algorithms.",
    level: "basic",
    codeExample: "import numpy as np\nimport scipy.stats as stats\n\n# NumPy creates the array, SciPy performs advanced statistical analysis\ndata = np.array([12.5, 14.2, 13.8, 15.1, 14.9])\nres = stats.describe(data)\nprint(res.mean, res.variance, res.skewness)"
  },
  {
    question: "Why can't we just use pure Python or NumPy for all statistical and scientific computing?",
    shortAnswer: "NumPy only provides elementary math; pure Python is too slow and lacks robust numerical solvers for complex calculus, optimization, and distributions.",
    explanation: "Pure Python loops carry massive bytecode interpretation overhead. NumPy solves basic elementwise arithmetic and basic linear algebra, but does not provide complete probability distribution models (PDF, CDF, PPF), nonlinear loss optimizers, sparse graph algorithms, or advanced statistical tests with exact p-values.",
    hint: "SciPy wraps decades of validated C, C++, and Fortran numerical algorithms (like BLAS, LAPACK, QUADPACK, MINPACK).",
    level: "basic",
    codeExample: "import scipy.optimize as opt\n\n# Minimizing a nonlinear loss function: f(x) = x^2 + 10*sin(x)\nresult = opt.minimize_scalar(lambda x: x**2 + 10*np.sin(x))\nprint('Optimal x:', result.x)"
  },
  {
    question: "What are the primary subpackages of SciPy relevant to Machine Learning?",
    shortAnswer: "scipy.stats, scipy.spatial, scipy.linalg, scipy.optimize, and scipy.sparse.",
    explanation: "1) `scipy.stats`: Probability distributions, z-scores, skewness/kurtosis, t-tests, ANOVA.\n2) `scipy.spatial`: Distance metrics (cdist, pdist) and KDTree for fast KNN search.\n3) `scipy.linalg`: Matrix factorizations (SVD, LU, Cholesky, Schur) and fast BLAS/LAPACK solvers.\n4) `scipy.optimize`: Loss function minimization (BFGS, Nelder-Mead) and curve fitting.\n5) `scipy.sparse`: Memory-efficient matrices for text/TF-IDF and high-dimensional graphs.",
    hint: "Remember the 5 pillars: stats, spatial, linalg, optimize, sparse.",
    level: "basic",
    codeExample: "from scipy import stats, spatial, linalg, optimize, sparse\n\n# Quick import check\nprint(stats.__file__)\nprint(spatial.__file__)"
  },
  {
    question: "How does SciPy achieve near-native C/Fortran execution speeds?",
    shortAnswer: "By wrapping low-level compiled numerical libraries (BLAS, LAPACK, FFTPACK, FITPACK) via Cython and C-extensions.",
    explanation: "SciPy acts as a high-level, pythonic interface over battle-tested Fortran and C numerical libraries (such as ATLAS, OpenBLAS, LAPACK, and Intel MKL). When you invoke a SciPy routine, the data buffer from the NumPy array is passed directly by memory pointer to the compiled library without copying, avoiding Python runtime overhead.",
    hint: "Zero-copy memory pointers allow C code to read NumPy array buffers directly.",
    level: "moderate",
    codeExample: "import scipy.linalg as la\n\n# Check BLAS/LAPACK backend linked to SciPy\nprint(la.blas.find_best_blas_type())\nprint(la.__file__)"
  },
  {
    question: "How is scipy.stats utilized in feature engineering and preprocessing?",
    shortAnswer: "For standardizing features (z-score), handling skewness (Box-Cox, Yeo-Johnson), and detecting anomalous outliers.",
    explanation: "Before feeding data into machine learning estimators, features often violate normality assumptions. `scipy.stats.zscore` computes standardized deviations, `scipy.stats.boxcox` transforms skewed non-normal distributions into Gaussian shapes, and `scipy.stats.trim_mean` calculates outlier-robust centers.",
    hint: "Box-Cox and z-scores stabilize variance and align data with Gaussian assumptions.",
    level: "moderate",
    codeExample: "from scipy import stats\nimport numpy as np\n\ndata = np.array([10, 12, 14, 15, 18, 22, 150])\n# Compute z-scores to identify outliers (|z| > 3)\nz_scores = stats.zscore(data)\noutliers = data[np.abs(z_scores) > 2.5]\nprint('Outliers detected:', outliers)"
  },
  {
    question: "What is the difference between scipy.spatial.distance.pdist and scipy.spatial.distance.cdist?",
    shortAnswer: "pdist computes pairwise distances between observations within a single dataset; cdist computes distances between two distinct collections.",
    explanation: "`pdist(X)` computes the pairwise distance between all pairs of rows in matrix X, returning a condensed 1D array of shape (N*(N-1)/2,). `cdist(XA, XB)` computes the cross-distance matrix between rows in XA and rows in XB, returning a 2D matrix of shape (M, N). In KNN classification, `cdist(X_test, X_train)` calculates query-to-training distances instantly.",
    hint: "pdist = Pairwise within one array; cdist = Cross-distance between two different arrays.",
    level: "advanced",
    codeExample: "from scipy.spatial.distance import cdist\nimport numpy as np\n\ntrain_points = np.array([[1, 2], [3, 4], [5, 6]])\ntest_query = np.array([[2, 3]])\n# Compute distance from test query to all training points\ndists = cdist(test_query, train_points, metric='euclidean')\nprint('Distances to training samples:', dists)"
  },
  {
    question: "How does Scikit-Learn rely internally on SciPy?",
    shortAnswer: "Scikit-Learn uses SciPy for sparse matrix representations (scipy.sparse), KD-Trees for KNN, loss optimization, and linear algebra.",
    explanation: "Scikit-Learn does not reinvent scientific algorithms. For example, text vectorizers (`TfidfVectorizer`, `CountVectorizer`) output `scipy.sparse.csr_matrix` instances. Nearest neighbors algorithms utilize `scipy.spatial.KDTree` and `cKDTree`. Ridge regression and SVD decomposition use `scipy.linalg` solvers.",
    hint: "Scikit-Learn builds ML abstractions on top of SciPy's numerical foundation.",
    level: "moderate",
    codeExample: "from scipy.sparse import csr_matrix\n# Many scikit-learn models natively accept and return CSR sparse matrices\nrow = np.array([0, 0, 1, 2])\ncol = np.array([0, 2, 2, 0])\ndata = np.array([1, 2, 3, 4])\nsparse_mat = csr_matrix((data, (row, col)), shape=(3, 3))\nprint(sparse_mat.toarray())"
  },
  {
    question: "What is the memory and architectural structure of SciPy distributions in scipy.stats?",
    shortAnswer: "scipy.stats distributions are frozen or continuous/discrete object classes providing unified methods: .pdf(), .cdf(), .ppf(), and .rvs().",
    explanation: "All continuous random variables inherit from `scipy.stats.rv_continuous`, and discrete variables inherit from `scipy.stats.rv_discrete`. They expose a standard API: `.pdf(x)` (probability density), `.cdf(x)` (cumulative density), `.ppf(q)` (percent point function / inverse CDF), and `.rvs(size)` (random variate sampling).",
    hint: "Remember the 4 core methods: pdf (density), cdf (cumulative probability), ppf (quantile lookup), rvs (sampling).",
    level: "advanced",
    codeExample: "from scipy.stats import norm\n\n# Standard normal distribution N(mu=0, sigma=1)\nprob_less_than_1 = norm.cdf(1.0)  # ~0.8413\nquantile_95 = norm.ppf(0.95)       # ~1.6448\nsamples = norm.rvs(size=5, random_state=42)\nprint('CDF(1.0):', prob_less_than_1, '| 95th percentile:', quantile_95)"
  }
];

export default questions;
