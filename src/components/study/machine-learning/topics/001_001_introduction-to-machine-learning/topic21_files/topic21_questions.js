/**
 * Topic 21: Vector Foundations and Applications
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is a Plain Vector in mathematics and physics?",
    "shortAnswer": "A mathematical quantity that possesses both magnitude (length) and spatial direction.",
    "explanation": "Unlike scalars (which have only numerical size, like temperature 30\u00b0C), a vector represents both a magnitude and a directed orientation in space (like velocity 50 km/h East). Geometrically, it is drawn as a directed arrow from the origin to coordinate (x_1, x_2).",
    "hint": "A directed arrow possessing both magnitude and spatial direction.",
    "level": "Basic",
    "codeExample": "import numpy as np\nv = np.array([4, 3]) # 2D vector: 4 units right, 3 units up"
  },
  {
    "id": 2,
    "question": "What is the fundamental difference between a Scalar and a Vector?",
    "shortAnswer": "A scalar has magnitude only (rank-0 tensor); a vector has both magnitude and direction (rank-1 tensor).",
    "explanation": "Speed (60 km/h) is a scalar because it lacks direction. Velocity (60 km/h North-East) is a vector because it combines magnitude with directional heading. In ML, single numbers are scalars; ordered lists of features are vectors.",
    "hint": "Single number vs ordered directional list of components.",
    "level": "Basic",
    "codeExample": "s = 65.0              # Scalar (e.g. Mass in kg)\nv = np.array([4, 3])  # Vector (e.g. 2D displacement)"
  },
  {
    "id": 3,
    "question": "How does a Plain 2D Physical Vector bridge to a Machine Learning Feature Vector?",
    "shortAnswer": "By replacing physical spatial coordinates (X, Y) with observation feature attributes (e.g. Age, Income, Credit Score).",
    "explanation": "In physics, a 2D vector represents position on spatial axes (X, Y). In Machine Learning, a d-dimensional feature vector x = [x_1, x_2, ..., x_d]^T represents a data observation where each dimension is an attribute column from a dataset.",
    "hint": "Generalizing physical coordinates to multi-dimensional feature columns.",
    "level": "Basic",
    "codeExample": "x = np.array([28, 55000, 750]) # Feature vector in R^3: [Age, Income, CreditScore]"
  },
  {
    "id": 4,
    "question": "What is the difference between a Row Vector and a Column Vector in linear algebra conventions?",
    "shortAnswer": "A column vector has matrix shape (d, 1); a row vector has matrix shape (1, d).",
    "explanation": "By standard mathematical convention in machine learning, single data vectors x \u2208 \u211d^d are defined as column vectors. Transposing a column vector produces a horizontal row vector x^T.",
    "hint": "Vertical orientation (d x 1) vs horizontal transposed orientation (1 x d).",
    "level": "Basic",
    "codeExample": "col_vec = np.array([[1], [2], [3]]) # Column (3x1)\nrow_vec = col_vec.T                 # Row (1x3)"
  },
  {
    "id": 5,
    "question": "What is the Dot Product (Inner Product) of two vectors a and b?",
    "shortAnswer": "The sum of element-wise products: a \u00b7 b = \u2211_{i=1}^d a_i b_i = ||a|| ||b|| cos(\u03b8).",
    "explanation": "The dot product measures the directional alignment between two vectors. If two vectors point in the exact same direction, a \u00b7 b = ||a|| ||b||. If they are perpendicular (orthogonal, 90\u00b0), their dot product is exactly zero.",
    "hint": "Sum of element-wise multiplications resulting in a single scalar value.",
    "level": "Basic",
    "codeExample": "a = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\ndot = np.dot(a, b) # 1*4 + 2*5 + 3*6 = 32"
  },
  {
    "id": 6,
    "question": "How is a Linear Model prediction formulated using vector dot products?",
    "shortAnswer": "y_hat = w^T x + b (dot product of weight vector w and feature vector x plus bias scalar b).",
    "explanation": "A linear model computes a weighted sum w_1 x_1 + w_2 x_2 + ... + w_d x_d + b. Using vector algebra, this sum is compactly written as the dot product w^T x + b, executed in parallel via vectorized BLAS instructions.",
    "hint": "Vectorized dot product of weights and features plus bias intercept.",
    "level": "Basic",
    "codeExample": "w = np.array([0.5, 1.2])\nx = np.array([3.0, 4.0])\nb = 0.1\ny_pred = np.dot(w, x) + b"
  },
  {
    "id": 7,
    "question": "What is the Euclidean Norm (L2 Norm) of a vector ||x||_2?",
    "shortAnswer": "The physical geometric length of a vector from the coordinate origin: ||x||_2 = sqrt( \u2211 x_i^2 ).",
    "explanation": "Derived from the Pythagorean theorem extended to d dimensions. In feature space, the L2 norm measures the straight-line Euclidean distance from the origin (0, 0, ..., 0) to point x.",
    "hint": "Square root of the sum of squared vector components.",
    "level": "Basic",
    "codeExample": "x = np.array([3, 4])\nnorm_l2 = np.linalg.norm(x) # sqrt(3^2 + 4^2) = 5.0"
  },
  {
    "id": 8,
    "question": "What is the Manhattan Norm (L1 Norm) of a vector ||x||_1?",
    "shortAnswer": "The sum of absolute component magnitudes: ||x||_1 = \u2211_{i=1}^d |x_i|.",
    "explanation": "The L1 norm measures distance travelled along orthogonal grid axes (taxicab distance). It is the mathematical penalty term used in Lasso regularization to induce parameter sparsity.",
    "hint": "Sum of absolute component values without squaring.",
    "level": "Basic",
    "codeExample": "x = np.array([3, -4])\nnorm_l1 = np.linalg.norm(x, ord=1) # |3| + |-4| = 7.0"
  },
  {
    "id": 9,
    "question": "What is Cosine Similarity and how is it calculated from vectors a and b?",
    "shortAnswer": "cos(\u03b8) = (a \u00b7 b) / (||a|| ||b||); measures the cosine of the angle between two vectors, ranging from -1 to +1.",
    "explanation": "Cosine similarity measures directional alignment regardless of vector magnitudes. cos(0\u00b0) = 1.0 (identical direction); cos(90\u00b0) = 0.0 (orthogonal/unrelated); cos(180\u00b0) = -1.0 (exact opposite direction).",
    "hint": "Dot product divided by the product of vector Euclidean lengths.",
    "level": "Basic",
    "codeExample": "a = np.array([1, 2])\nb = np.array([2, 4])\ncos_sim = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)) # 1.0"
  },
  {
    "id": 10,
    "question": "Why is Cosine Similarity preferred over Euclidean Distance in text document and embedding search?",
    "shortAnswer": "Cosine similarity is length-invariant; a short article and a long book on the same topic have similar directional angles despite huge Euclidean length differences.",
    "explanation": "In TF-IDF and word embedding spaces, document length inflates vector magnitude. Cosine similarity normalizes out vector lengths, focusing purely on topic orientation.",
    "hint": "Evaluates semantic topic orientation independently of document word length.",
    "level": "Moderate",
    "codeExample": "from sklearn.metrics.pairwise import cosine_similarity\nsim = cosine_similarity(doc1_vec, doc2_vec)"
  },
  {
    "id": 11,
    "question": "What is a Unit Vector (Normalized Vector) and how is it calculated?",
    "shortAnswer": "A vector with Euclidean length equal to 1: u = v / ||v||_2.",
    "explanation": "Dividing a non-zero vector by its L2 norm preserves its spatial direction while rescaling its length to exactly 1.0. Unit vectors lie on the surface of a unit hypersphere.",
    "hint": "Vector divided by its Euclidean norm to produce length 1.",
    "level": "Basic",
    "codeExample": "v = np.array([3, 4])\nu = v / np.linalg.norm(v) # array([0.6, 0.8]), length = 1.0"
  },
  {
    "id": 12,
    "question": "What does it mean for two vectors to be Orthogonal in machine learning?",
    "shortAnswer": "Their dot product is zero (a \u00b7 b = 0); geometrically, they meet at a 90-degree angle and share zero linear correlation.",
    "explanation": "Orthogonal feature vectors contain zero redundant linear information. In PCA and Fourier transforms, orthogonal bases allow data decomposition without cross-talk between components.",
    "hint": "Dot product equals zero; zero linear correlation.",
    "level": "Basic",
    "codeExample": "u = np.array([1, 0])\nv = np.array([0, 1])\nprint(np.dot(u, v) == 0) # True (Orthogonal)"
  },
  {
    "id": 13,
    "question": "What is an Orthonormal Basis in vector space \u211d^d?",
    "shortAnswer": "A set of d vectors that are both mutually orthogonal to each other (u_i \u00b7 u_j = 0 for i\u2260j) and each normalized to unit length (||u_i|| = 1).",
    "explanation": "Standard Cartesian axes e_1 = [1,0], e_2 = [0,1] form an orthonormal basis. In PCA, the principal component eigenvectors form an orthonormal coordinate system rotating the original feature space.",
    "hint": "Mutually perpendicular unit vectors spanning the vector space.",
    "level": "Moderate",
    "codeExample": "# Orthonormal check: U.T @ U == I (Identity Matrix)"
  },
  {
    "id": 14,
    "question": "What is Vector Projection (Projection of vector a onto vector b)?",
    "shortAnswer": "proj_b(a) = ( (a \u00b7 b) / ||b||^2 ) * b; represents the shadow of vector a cast along the line of vector b.",
    "explanation": "Vector projection extracts the component of a that points in the direction of b. It is the fundamental geometric operation in Gram-Schmidt orthogonalization and PCA eigenvector coordinate mapping.",
    "hint": "The geometric shadow of one vector along the directional axis of another.",
    "level": "Moderate",
    "codeExample": "def project(a, b):\n    return (np.dot(a, b) / np.dot(b, b)) * b"
  },
  {
    "id": 15,
    "question": "What is a Linear Combination of vectors {v_1, v_2, ..., v_k}?",
    "shortAnswer": "c_1 v_1 + c_2 v_2 + ... + c_k v_k (where c_i are scalar coefficients).",
    "explanation": "Scaling vectors by scalars and summing them produces a linear combination. The set of all possible linear combinations forms the Vector Span of those vectors.",
    "hint": "Weighted scalar sum of a set of vectors.",
    "level": "Basic",
    "codeExample": "v1, v2 = np.array([1, 0]), np.array([0, 1])\nv_comb = 3.0 * v1 + 5.0 * v2 # array([3., 5.])"
  },
  {
    "id": 16,
    "question": "What does Linear Independence of a set of vectors mean?",
    "shortAnswer": "No vector in the set can be written as a linear combination of the other vectors; \u2211 c_i v_i = 0 holds only if all c_i = 0.",
    "explanation": "If a vector is linearly dependent, it provides zero new geometric dimensions (redundant column). Linear independence ensures that the design matrix X has full column rank, enabling unique OLS regression solutions.",
    "hint": "No vector in the set can be formed by combining the remaining vectors.",
    "level": "Moderate",
    "codeExample": "# Check rank: np.linalg.matrix_rank(X) == X.shape[1] (Full Rank)"
  },
  {
    "id": 17,
    "question": "What is the Matrix-Vector Product A * x in linear algebra?",
    "shortAnswer": "A linear combination of the columns of matrix A weighted by the components of vector x: A x = \u2211 x_j A_{:, j}.",
    "explanation": "Multiplying an m x d matrix A by a d x 1 vector x transforms vector x into a new m-dimensional vector in \u211d^m. In neural networks, each layer computes y = W x + b.",
    "hint": "Linear transformation mapping vector x to a new coordinate space.",
    "level": "Basic",
    "codeExample": "A = np.array([[1, 2], [3, 4]])\nx = np.array([5, 6])\ny = A @ x # array([17, 39])"
  },
  {
    "id": 18,
    "question": "What is an Eigenvector and Eigenvalue of a square matrix A?",
    "shortAnswer": "A non-zero vector v such that multiplying by A only scales v by scalar \u03bb without changing its spatial direction: A v = \u03bb v.",
    "explanation": "Eigenvectors represent the invariant axis directions of a linear transformation, and eigenvalues \u03bb represent the stretch/compression factors along those directions. In PCA, eigenvectors of covariance matrix X^T X are the principal axes.",
    "hint": "A v = \u03bb v: transformation only scales the vector length without rotating it.",
    "level": "Moderate",
    "codeExample": "eigenvalues, eigenvectors = np.linalg.eig(covariance_matrix)"
  },
  {
    "id": 19,
    "question": "What is the Cauchy-Schwarz Inequality for vector dot products?",
    "shortAnswer": "|a \u00b7 b| \u2264 ||a||_2 ||b||_2 (the absolute dot product is always less than or equal to the product of vector norms).",
    "explanation": "Equality |a \u00b7 b| = ||a|| ||b|| holds if and only if vectors a and b are linearly dependent (collinear). This inequality guarantees that cosine similarity (a \u00b7 b) / (||a|| ||b||) is strictly bounded within [-1, +1].",
    "hint": "Bounds the dot product within the product of vector lengths.",
    "level": "Moderate",
    "codeExample": "# Implication: -1.0 <= cos(theta) <= +1.0"
  },
  {
    "id": 20,
    "question": "What is the Triangle Inequality for vector norms?",
    "shortAnswer": "||u + v|| \u2264 ||u|| + ||v|| (the length of the sum of two vectors cannot exceed the sum of their individual lengths).",
    "explanation": "Geometrically, the direct straight line between two points is always shorter than or equal to the path traversing an intermediate third point. This property is required for any valid mathematical distance metric.",
    "hint": "Direct straight-line distance is always shorter than detour paths.",
    "level": "Basic",
    "codeExample": "u = np.array([1, 2])\nv = np.array([3, 4])\nassert np.linalg.norm(u + v) <= np.linalg.norm(u) + np.linalg.norm(v)"
  },
  {
    "id": 21,
    "question": "What is the Mahalanobis Distance and how does it account for feature covariance?",
    "shortAnswer": "D_M(x, \u03bc) = sqrt( (x - \u03bc)^T \u03a3^{-1} (x - \u03bc) ); measures distance in units of standard deviations along principal covariance axes.",
    "explanation": "Euclidean distance assumes spherical, uncorrelated features. Mahalanobis distance uses the inverse covariance matrix \u03a3^{-1} to deform space into an ellipse, correctly assessing distances in correlated datasets.",
    "hint": "Covariance-weighted distance metric measuring statistical deviation.",
    "level": "Expert",
    "codeExample": "from scipy.spatial.distance import mahalanobis\ndist = mahalanobis(u, v, np.linalg.inv(cov_matrix))"
  },
  {
    "id": 22,
    "question": "What is the Outer Product of two vectors u \u2297 v = u v^T?",
    "shortAnswer": "An (m x n) rank-1 matrix where element M_{ij} = u_i * v_j.",
    "explanation": "While inner dot product u^T v yields a single scalar, outer product u v^T yields a matrix. Outer products are used to construct covariance matrices and update low-rank approximations in SVD/Matrix Factorization.",
    "hint": "Column vector multiplied by row vector producing an m x n matrix.",
    "level": "Moderate",
    "codeExample": "u = np.array([1, 2])\nv = np.array([3, 4, 5])\nouter_mat = np.outer(u, v) # Shape (2, 3)"
  },
  {
    "id": 23,
    "question": "What is Vector Broadcasting in NumPy and Python array operations?",
    "shortAnswer": "Automatically expanding arrays with smaller shapes across larger arrays during arithmetic operations without copying memory.",
    "explanation": "When subtracting a 1D mean vector \u03bc of shape (d,) from a 2D data matrix X of shape (N, d), NumPy broadcasts \u03bc across all N rows: `X_centered = X - mu`.",
    "hint": "Automatic shape expansion in vectorized arithmetic.",
    "level": "Basic",
    "codeExample": "X = np.ones((100, 3))\nmu = np.array([1, 2, 3])\nX_centered = X - mu # Broadcasts (3,) across (100, 3)"
  },
  {
    "id": 24,
    "question": "What is the L-Infinity Norm (Chebyshev / Maximum Norm) ||x||_\u221e?",
    "shortAnswer": "The maximum absolute component value: ||x||_\u221e = max_{i=1..d} |x_i|.",
    "explanation": "The L-infinity norm measures the largest single coordinate deviation. In adversarial machine learning (FGSM attacks), adversarial image perturbations are bounded by ||\u03b4||_\u221e \u2264 \u03b5 to ensure invisible pixel modifications.",
    "hint": "Maximum absolute value among all vector components.",
    "level": "Moderate",
    "codeExample": "x = np.array([3, -7, 5])\nnorm_inf = np.linalg.norm(x, ord=np.inf) # 7.0"
  },
  {
    "id": 25,
    "question": "What is a Hyperplane in d-dimensional vector space \u211d^d?",
    "shortAnswer": "A flat (d-1)-dimensional affine subspace defined by equation w^T x + b = 0, dividing \u211d^d into two half-spaces.",
    "explanation": "In 2D space, a hyperplane is a 1D line; in 3D space, it is a 2D flat plane; in 100D space, it is a 99D flat decision boundary. The weight vector w serves as the normal vector perpendicular to the hyperplane.",
    "hint": "Flat (d-1)-dimensional decision boundary partitioning d-dimensional space.",
    "level": "Basic",
    "codeExample": "# Hyperplane in 2D: w1*x1 + w2*x2 + b = 0"
  },
  {
    "id": 26,
    "question": "How is the perpendicular geometric distance from point x_0 to hyperplane w^T x + b = 0 calculated?",
    "shortAnswer": "Distance = |w^T x_0 + b| / ||w||_2.",
    "explanation": "This geometric formula calculates the shortest Euclidean distance from any sample point x_0 to the decision boundary. In Support Vector Machines, maximizing this distance for the closest points defines the Maximum Margin.",
    "hint": "Absolute algebraic value divided by the Euclidean norm of weight vector w.",
    "level": "Moderate",
    "codeExample": "dist = np.abs(np.dot(w, x0) + b) / np.linalg.norm(w)"
  },
  {
    "id": 27,
    "question": "What is Singular Value Decomposition (SVD) of a feature matrix X?",
    "shortAnswer": "Factorizing X = U \u03a3 V^T into left singular vectors U, singular values \u03a3, and right singular vectors V^T.",
    "explanation": "SVD is the foundational matrix factorization algorithm powering PCA, Latent Semantic Analysis (LSA), and recommender system matrix factorization. The columns of V are the principal component eigenvectors of X^T X.",
    "hint": "Decomposing any matrix into U * Sigma * V^T.",
    "level": "Expert",
    "codeExample": "U, s, Vt = np.linalg.svd(X, full_matrices=False)"
  },
  {
    "id": 28,
    "question": "What is a Word Embedding Vector (e.g. Word2Vec) and what algebraic property does it demonstrate?",
    "shortAnswer": "A dense vector in \u211d^d representing semantic word meaning; demonstrates linear vector composition: Vector('King') - Vector('Man') + Vector('Woman') \u2248 Vector('Queen').",
    "explanation": "Word embeddings map discrete vocabulary tokens into a continuous geometric space where spatial directions correspond to semantic relationships (gender, tense, capital cities).",
    "hint": "Dense semantic vectors capable of linear vector arithmetic analogies.",
    "level": "Basic",
    "codeExample": "# Vector arithmetic: v_queen \u2248 v_king - v_man + v_woman"
  },
  {
    "id": 29,
    "question": "What is Vector Quantization in unsupervised learning?",
    "shortAnswer": "Mapping continuous multi-dimensional vectors to discrete representative cluster centroid codebook vectors.",
    "explanation": "Used extensively in audio compression (MP3), image compression, and VQ-VAE generative models. Continuous high-dimensional vectors are quantized to the index of their nearest codebook exemplar, drastically saving bits.",
    "hint": "Discretizing continuous vectors into nearest codebook centroid indices.",
    "level": "Moderate",
    "codeExample": "# Codebook quantization: codebook_index = np.argmin(np.linalg.norm(codebook - x, axis=1))"
  },
  {
    "id": 30,
    "question": "Why is Linear Algebra and Vector Calculus considered the foundational language of Machine Learning?",
    "shortAnswer": "Because all datasets (tables, images, text, audio) are represented as multi-dimensional vectors and tensors, and all learning algorithms optimize loss functions using gradient vector calculus.",
    "explanation": "From simple linear regressions to multi-billion parameter foundation models, every operation is a sequence of matrix-vector multiplications, projections, and gradient updates. Mastering vector foundations unlocks deep, intuitive comprehension of all artificial intelligence.",
    "hint": "Vectors represent data observations and gradients drive mathematical optimization.",
    "level": "Basic",
    "codeExample": "# Vectorized AI: Data X -> Weights W -> Predictions y_hat -> Loss J -> Gradient dJ/dW -> Parameter Update"
  }
];

export default questions;
