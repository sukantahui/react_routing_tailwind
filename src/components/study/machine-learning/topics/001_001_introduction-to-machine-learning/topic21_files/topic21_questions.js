const questions = [
  {
    question: "What is a Plain Vector in mathematics and physics?",
    shortAnswer: "A quantity that possesses both magnitude (length) and direction in space.",
    explanation: "Unlike scalars which have only magnitude (e.g., temperature 30°C), a vector has both length and a specific direction (e.g., velocity 50 km/h East). Geometrically, it is drawn as a directed arrow from a tail to a head.",
    hint: "Think of an arrow on graph paper pointing from origin to a specific coordinate.",
    level: "basic",
    codeExample: "import numpy as np\nv = np.array([4, 3]) # 2D arrow: 4 units right, 3 units up"
  },
  {
    question: "What is the key difference between a Scalar and a Vector?",
    shortAnswer: "A scalar has magnitude only; a vector has both magnitude and direction.",
    explanation: "Speed (60 km/h) is a scalar because it lacks direction. Velocity (60 km/h North) is a vector because it combines magnitude with direction. In ML, single numbers are scalars; ordered lists of features are vectors.",
    hint: "Scalars are single numbers; vectors are directed arrows holding multiple components.",
    level: "basic",
    codeExample: "s = 65.0              # Scalar (e.g., Mass in kg)\nv = np.array([4, 3])  # Vector (e.g., 2D Displacement)"
  },
  {
    question: "How does a Plain 2D Physical Vector bridge to a Machine Learning Feature Vector?",
    shortAnswer: "By replacing physical spatial axes (X, Y) with observation feature attributes (Age, Income).",
    explanation: "In physics, a 2D vector represents position on spatial axes (X, Y). In Machine Learning, a d-dimensional feature vector x = [x_1, x_2, ..., x_d]^T represents a data instance where each dimension is a feature (e.g. Age, Income, Credit Score).",
    hint: "Generalize 2D arrow coordinates to multi-dimensional dataset columns.",
    level: "basic",
    codeExample: "x = np.array([28, 55000, 750]) # Feature vector in R^3"
  },
  {
    question: "What is the difference between a Row Vector and a Column Vector?",
    shortAnswer: "A row vector has shape (1, d); a column vector has shape (d, 1).",
    explanation: "By convention in Machine Learning, single vectors are defined as column vectors x in R^d. Transposing a column vector produces a row vector x^T.",
    hint: "Column vectors stand vertically; row vectors lie horizontally.",
    level: "basic",
    codeExample: "col_vec = np.array([[1], [2], [3]]) # Column (3x1)\nrow_vec = col_vec.T                 # Row (1x3)"
  },
  {
    question: "What is the Dot Product (Inner Product) of two vectors?",
    shortAnswer: "The sum of element-wise products: a . b = sum(a_i * b_i) = ||a|| ||b|| cos(theta).",
    explanation: "The dot product measures the degree of directional alignment between two vectors. If vectors are orthogonal (90 degrees), their dot product is zero.",
    hint: "Dot product outputs a single scalar number.",
    level: "basic",
    codeExample: "a = np.array([1, 2, 3])\nb = np.array([4, 5, 6])\ndot = np.dot(a, b) # 1*4 + 2*5 + 3*6 = 32"
  },
  {
    question: "How is a Linear Model prediction formulated using vectors?",
    shortAnswer: "y_hat = w^T * x + b (dot product of weight vector w and feature vector x plus bias b).",
    explanation: "Linear models multiply each feature x_i by its weight w_i and sum them. This is compactly expressed as the vector dot product w^T * x + b.",
    hint: "w^T * x expands to w_1*x_1 + w_2*x_2 + ... + w_d*x_d.",
    level: "intermediate",
    codeExample: "w = np.array([0.5, 1.2])\nx = np.array([3.0, 4.0])\nb = 0.1\ny_pred = np.dot(w, x) + b"
  },
  {
    question: "What is the Euclidean Norm (L2 Norm) of a vector?",
    shortAnswer: "The physical geometric length of a vector from origin: ||x||_2 = sqrt(sum(x_i^2)).",
    explanation: "The L2 norm measures how far a point is from the origin (0, 0, ..., 0) in Euclidean space. It is calculated using the Pythagorean theorem extended to d dimensions.",
    hint: "Square each component, sum them, and take the square root.",
    level: "basic",
    codeExample: "x = np.array([3, 4])\nnorm_l2 = np.linalg.norm(x) # sqrt(3^2 + 4^2) = 5.0"
  },
  {
    question: "What is Cosine Similarity and how is it used in Machine Learning?",
    shortAnswer: "Cosine of the angle theta between two vectors: cos(theta) = (a . b) / (||a|| ||b||).",
    explanation: "Cosine similarity measures directional similarity independent of vector magnitude. It ranges from -1 (opposite) to +1 (identical direction). Used heavily in NLP and recommender systems.",
    hint: "It focuses purely on angle direction, not on length.",
    level: "intermediate",
    codeExample: "from scipy.spatial.distance import cosine\nsim = 1 - cosine(a, b)"
  },
  {
    question: "What does it mean if two vectors are Orthogonal?",
    shortAnswer: "Their dot product is zero (a . b = 0) and the angle between them is 90 degrees.",
    explanation: "Orthogonal vectors are completely independent and perpendicular to each other. In ML, orthogonal features carry zero redundant linear correlation.",
    hint: "cos(90 degrees) = 0.",
    level: "intermediate",
    codeExample: "a = np.array([1, 0])\nb = np.array([0, 1])\nprint(np.dot(a, b)) # 0"
  },
  {
    question: "What is Vectorization and why is it crucial in Python for ML?",
    shortAnswer: "Executing operations across entire vector arrays in parallel C/CUDA code rather than slow Python loops.",
    explanation: "Vectorized code leverages CPU SIMD instructions and GPU acceleration. NumPy vector operations run 50x to 1000x faster than standard Python for-loops.",
    hint: "Avoid writing for-loops over data rows in Python; use NumPy array operations instead.",
    level: "intermediate",
    codeExample: "# Bad: for x in data: total += x * w\n# Good: total = np.dot(data, w)"
  },
  {
    question: "What is a Unit Vector?",
    shortAnswer: "A vector with a magnitude (L2 norm) equal to exactly 1.0.",
    explanation: "A unit vector hat{x} = x / ||x|| represents pure direction without scaling magnitude. Normalizing feature vectors to unit length is common in text processing.",
    hint: "Divide a vector by its own length.",
    level: "basic",
    codeExample: "u = x / np.linalg.norm(x)\nprint(np.linalg.norm(u)) # 1.0"
  },
  {
    question: "What is the L1 Norm (Manhattan Norm) of a vector?",
    shortAnswer: "The sum of absolute values of its components: ||x||_1 = sum(|x_i|).",
    explanation: "The L1 norm measures distance along axis-aligned grid paths (city block distance). In ML regularization (Lasso), L1 norms encourage sparse feature weight vectors.",
    hint: "Sum of absolute values without squaring.",
    level: "intermediate",
    codeExample: "x = np.array([-3, 4])\nnorm_l1 = np.linalg.norm(x, ord=1) # |-3| + |4| = 7.0"
  },
  {
    question: "How are Images represented as Vectors in Computer Vision?",
    shortAnswer: "By flattening an image matrix of pixel intensities into a 1D vector.",
    explanation: "A 28x28 grayscale image is a 2D matrix of 784 numbers. Flattening it produces a vector x in R^784, allowing ML classifiers to process image pixels as feature inputs.",
    hint: "Reshape a 2D height x width image grid into a single long column.",
    level: "basic",
    codeExample: "img_matrix = np.zeros((28, 28))\nimg_vec = img_matrix.flatten() # Shape: (784,)"
  },
  {
    question: "What is a Sparse Vector?",
    shortAnswer: "A vector where most entries are zero.",
    explanation: "In document classification (TF-IDF), a vocabulary might contain 50,000 words, but a single email contains only 50 distinct words. Storing non-zero entries saves memory.",
    hint: "High dimensional vector filled mostly with zeros.",
    level: "intermediate",
    codeExample: "from scipy.sparse import csr_matrix\nsparse_vec = csr_matrix([0, 0, 5, 0, 12])"
  },
  {
    question: "What is Linear Independence among a set of vectors?",
    shortAnswer: "No vector in the set can be written as a linear combination of the others.",
    explanation: "If features in a dataset are linearly dependent (e.g. Height in cm and Height in inches), multicollinearity occurs, causing matrix instability in linear regression.",
    hint: "Linearly dependent vectors carry duplicate information.",
    level: "advanced",
    codeExample: "v1 = np.array([1, 2])\nv2 = np.array([2, 4]) # v2 = 2 * v1 (Linearly Dependent!)"
  },
  {
    question: "What is the projection of vector a onto vector b?",
    shortAnswer: "The shadow or component of vector a along the direction of b: proj_b(a) = ((a . b) / ||b||^2) * b.",
    explanation: "Vector projection decomposes a vector into parallel and orthogonal components relative to a reference direction. Used in PCA (Principal Component Analysis).",
    hint: "Imagine dropping a perpendicular line from tip of a onto line b.",
    level: "advanced",
    codeExample: "proj = (np.dot(a, b) / np.dot(b, b)) * b"
  },
  {
    question: "How does KNN (K-Nearest Neighbors) use Feature Vectors?",
    shortAnswer: "By measuring Euclidean distance ||x_new - x_i|| between the new query vector and stored training vectors.",
    explanation: "KNN places query feature vector x_new into vector space and finds the K nearest training vectors x_i using vector distance metrics.",
    hint: "Closest vectors in feature space belong to the same class.",
    level: "basic",
    codeExample: "dist = np.linalg.norm(x_query - x_train, axis=1)"
  },
  {
    question: "What is a One-Hot Encoded Vector?",
    shortAnswer: "A binary vector containing a single 1 and zeros everywhere else.",
    explanation: "Categorical features like ['Kolkata', 'Barrackpore', 'Naihati'] are mapped to binary vectors: Kolkata = [1, 0, 0], Barrackpore = [0, 1, 0], Naihati = [0, 0, 1].",
    hint: "Only one position is 'hot' (1), all others are 'cold' (0).",
    level: "basic",
    codeExample: "from sklearn.preprocessing import OneHotEncoder"
  },
  {
    question: "What is an Embedding Vector in Deep Learning?",
    shortAnswer: "A dense, low-dimensional vector representing complex entities like words, products, or users.",
    explanation: "Embeddings map high-dimensional sparse data (like word dictionaries) into compact continuous vector spaces (e.g. Word2Vec 300D) where semantically similar items have small vector distances.",
    hint: "Dense numerical representation capturing semantic meaning.",
    level: "advanced",
    codeExample: "# Word2Vec: vec('king') - vec('man') + vec('woman') approx vec('queen')"
  },
  {
    question: "What is Scalar Multiplication of a vector?",
    shortAnswer: "Multiplying every component of a vector by a single real number c.",
    explanation: "Scalar multiplication c * x stretches the vector length by factor |c| without altering its axis angle (if c > 0) or flips it 180 degrees (if c < 0).",
    hint: "c * [x1, x2] = [c*x1, c*x2].",
    level: "basic",
    codeExample: "v = np.array([2, 5])\nscaled = 3 * v # [6, 15]"
  },
  {
    question: "What is Vector Addition physically in Machine Learning?",
    shortAnswer: "Combining feature offsets or accumulating gradient steps across dimensions.",
    explanation: "In gradient descent, weights are updated by subtracting a scaled gradient vector: w_{new} = w_{old} - alpha * grad_w.",
    hint: "Element-wise addition: [a1+b1, a2+b2, ...].",
    level: "basic",
    codeExample: "w_new = w_old - learning_rate * grad"
  },
  {
    question: "What is the Angle theta between two non-zero vectors?",
    shortAnswer: "theta = arccos( (a . b) / (||a|| ||b||) ).",
    explanation: "The angle theta quantifies how close two feature directions are in vector space, ranging from 0 degrees (same direction) to 180 degrees (opposite).",
    hint: "Arccosine of the cosine similarity.",
    level: "intermediate",
    codeExample: "cos_sim = np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))\ntheta_deg = np.degrees(np.arccos(cos_sim))"
  },
  {
    question: "Why must Feature Vectors be Scaled before computing distances?",
    shortAnswer: "To prevent features with large numeric ranges from dominating distance calculations.",
    explanation: "If Feature 1 is Salary (₹50,000) and Feature 2 is Age (30), raw Euclidean distance is overwhelmed by Salary. Standardization brings all features to mean 0, variance 1.",
    hint: "Without scaling, a ₹1,000 difference dwarfs a 10-year age gap.",
    level: "intermediate",
    codeExample: "from sklearn.preprocessing import StandardScaler\nX_scaled = StandardScaler().fit_transform(X)"
  },
  {
    question: "What is the Hyperplane defined by a weight vector w and bias b?",
    shortAnswer: "The decision boundary set of points {x | w^T * x + b = 0}.",
    explanation: "In binary classification (Logistic Regression, SVM), the weight vector w is perpendicular (normal) to the decision boundary hyperplane dividing Class +1 from Class -1.",
    hint: "w is normal (perpendicular) to the decision boundary line/plane.",
    level: "advanced",
    codeExample: "# Hyperplane in 2D: w1*x1 + w2*x2 + b = 0"
  },
  {
    question: "What is Vector Space R^d?",
    shortAnswer: "The set of all ordered d-tuples of real numbers with addition and scalar multiplication.",
    explanation: "If a dataset has d features, every data point lives inside d-dimensional real vector space R^d.",
    hint: "R^2 is 2D plane; R^3 is 3D space; R^d is d-dimensional space.",
    level: "basic",
    codeExample: "x = np.random.randn(100) # Vector in R^100"
  }
];

export default questions;
