/**
 * TOPIC 16: NORMALIZATION (MIN-MAX, MAXABS & SAMPLE-WISE VECTOR NORMS)
 * Graded Academic & Industry Certification Question Bank
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 30 Authentic Multi-Tier Questions with Complete Explanations & Snippets
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: "Tier 1: Foundation & Terminology",
    question: "In Machine Learning, what are the two distinct mathematical meanings of the term 'Normalization' depending on the axis of operation?",
    options: [
      "Translating code into machine language vs compiling C++ programs",
      "Feature-wise linear rescaling of columns into a bounded interval (like [0, 1]) versus Sample-wise geometric scaling of row vectors to a unit norm (like ||x|| = 1)",
      "Training a linear model vs training a decision tree",
      "Converting continuous numbers into binary integers"
    ],
    correctIndex: 1,
    explanation: "Normalization has two precise paradigms in data science: (1) Column-wise feature rescaling (e.g. MinMaxScaler), which bounds each feature independently across all samples into [0, 1]; and (2) Row-wise sample vector normalization (e.g. Normalizer), which scales each sample vector across its features so that its norm (L1, L2, or Linf) equals 1.0, isolating directional orientation.",
    practicalTip: "Always be clear whether a paper or specification refers to feature-wise scaling (MinMaxScaler) or sample-wise vector normalization (Normalizer).",
    codeSnippet: "# Column-wise vs Row-wise in sklearn\nfrom sklearn.preprocessing import MinMaxScaler, Normalizer\ncol_scaler = MinMaxScaler()    # Column-wise\nrow_scaler = Normalizer(norm='l2') # Row-wise",
    examRelevance: "MAKAUT BCAC701B Fundamental Taxonomy"
  },
  {
    id: 2,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the standard mathematical formula for standard [0, 1] Min-Max feature normalization?",
    options: [
      "x_norm = (x - mean) / standard_deviation",
      "x_norm = (x - x_min) / (x_max - x_min)",
      "x_norm = ln(1 + x)",
      "x_norm = x / sum(|x|)"
    ],
    correctIndex: 1,
    explanation: "Standard Min-Max normalization computes x_norm = (x - x_min) / (x_max - x_min). When x = x_min, x_norm = 0. When x = x_max, x_norm = 1. All intermediate values are mapped linearly into the continuous closed interval [0, 1].",
    practicalTip: "If your target feature has strict natural physical boundaries (such as image pixel intensities [0, 255] or percentage scores [0, 100]), Min-Max scaling is the natural choice.",
    codeSnippet: "# Manual Min-Max scaling in numpy\nx_norm = (x - np.min(x)) / (np.max(x) - np.min(x))",
    examRelevance: "Linear Rescaling Formulae & Core Preprocessing"
  },
  {
    id: 3,
    tier: "Tier 1: Foundation & Terminology",
    question: "What unique property distinguishes MaxAbsScaler from MinMaxScaler?",
    options: [
      "MaxAbsScaler converts all negative numbers to positive numbers",
      "MaxAbsScaler scales features by dividing by max(|x|), mapping into [-1.0, 1.0] without shifting the center (preserving exact zeros and sparse matrix structure)",
      "MaxAbsScaler runs 10 times slower because it requires matrix inversion",
      "MaxAbsScaler only works on 2D images"
    ],
    correctIndex: 1,
    explanation: "MaxAbsScaler computes x / max(|x|). Because it does not subtract a minimum or mean constant, zero entries remain exactly zero (0 / max(|x|) = 0). This strictly preserves the sparsity structure of Scipy CSR/CSC sparse matrices and keeps positive/negative signs intact around the origin.",
    practicalTip: "For large sparse datasets (TF-IDF, Bag-of-Words, recommendation interaction matrices), always choose MaxAbsScaler over MinMaxScaler.",
    codeSnippet: "from sklearn.preprocessing import MaxAbsScaler\nsparse_scaler = MaxAbsScaler()\nX_scaled = sparse_scaler.fit_transform(X_sparse)",
    examRelevance: "Sparse Matrix Preprocessing & Scaler Properties"
  },
  {
    id: 4,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the mathematical definition and geometric meaning of sample-wise L2 (Euclidean) vector normalization?",
    options: [
      "Dividing each coordinate by the sum of absolute values, projecting onto the probability simplex",
      "Dividing the sample vector by its Euclidean length ||x||_2 = sqrt(sum x_i^2), projecting the vector onto the surface of the unit hypersphere S^(d-1)",
      "Setting the largest coordinate to 1.0",
      "Subtracting the vector mean from every coordinate"
    ],
    correctIndex: 1,
    explanation: "L2 normalization scales a vector x by its Euclidean norm ||x||_2 = sqrt(x1^2 + x2^2 + ... + xd^2). The resulting vector x' = x / ||x||_2 has length ||x'||_2 = 1.0, placing it on the surface of the unit hypersphere. It preserves the directional angle while eliminating sample magnitude.",
    practicalTip: "Use L2 normalization for text document vectors and facial recognition embeddings where vector direction encodes identity and length represents irrelevant verbosity or image brightness.",
    codeSnippet: "from sklearn.preprocessing import normalize\nX_l2 = normalize(X, norm='l2', axis=1)",
    examRelevance: "Vector Norms & Hyperspherical Projections"
  },
  {
    id: 5,
    tier: "Tier 1: Foundation & Terminology",
    question: "When a non-negative feature vector is normalized using the L1 norm (Manhattan length x / sum |x_i|), what physical property does the resulting vector satisfy?",
    options: [
      "All coordinates become negative",
      "The sum of all coordinates equals exactly 1.0, forming a valid discrete probability distribution on the simplex",
      "The Euclidean length equals exactly 1.0",
      "All coordinates are integers"
    ],
    correctIndex: 1,
    explanation: "The L1 norm is ||x||_1 = sum |x_i|. Dividing each component by this sum guarantees that sum (x_i / ||x||_1) = 1.0. For non-negative inputs (e.g. chemical alloy composition percentages, topic proportions in LDA, or Bag-of-Words word distributions), the normalized vector represents an exact probability distribution.",
    practicalTip: "Use L1 normalization whenever components represent parts of a whole that must satisfy a 100% composition closure constraint.",
    codeSnippet: "# L1 normalization for compositional data\nX_l1 = normalize(X, norm='l1', axis=1)\nprint('Sum of sample 0:', np.sum(X_l1[0])) # Exactly 1.0",
    examRelevance: "Probability Simplex & Compositional Constraints"
  },
  {
    id: 6,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why is computing the Euclidean dot product between two L2-normalized vectors mathematically significant in search engines and vector databases?",
    options: [
      "Because the dot product of two L2 unit vectors is mathematically identical to their Cosine Similarity",
      "Because the dot product becomes zero for all vectors",
      "Because it inverts the covariance matrix automatically",
      "Because it converts float vectors into integer hashes"
    ],
    correctIndex: 0,
    explanation: "Cosine Similarity is defined as cos(theta) = (u . v) / (||u||_2 * ||v||_2). If vectors u and v are pre-normalized such that ||u||_2 = 1 and ||v||_2 = 1, the denominator becomes 1 * 1 = 1. Therefore, cos(theta) = u . v. High-dimensional vector databases (FAISS, Milvus) pre-normalize embeddings so that nearest neighbor search requires only fast hardware matrix multiplication (Maximum Inner Product Search - MIPS).",
    practicalTip: "Always pre-normalize vector embeddings with L2 norm before indexing in vector databases to speed up cosine similarity search by 3x–5x.",
    codeSnippet: "# Cosine similarity via dot product of unit vectors\nu_norm = u / np.linalg.norm(u)\nv_norm = v / np.linalg.norm(v)\ncosine_sim = np.dot(u_norm, v_norm)",
    examRelevance: "Information Retrieval & Cosine Equivalence Proofs"
  },
  {
    id: 7,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the primary pathological vulnerability of Min-Max feature rescaling when applied to real-world industrial data?",
    options: [
      "It cannot handle floating-point values",
      "It is catastrophically sensitive to extreme outliers; a single massive outlier expands the denominator (x_max - x_min), compressing all normal observations into an infinitesimal sliver near 0.0",
      "It changes the sorting order of the data points",
      "It causes the variance of the feature to become infinite"
    ],
    correctIndex: 1,
    explanation: "Because Min-Max scaling depends strictly on the empirical sample extremes x_min and x_max (which have a 0% statistical breakdown point), a single extreme outlier at 100x the normal range expands the denominator by 100x. Consequently, 99.9% of uncontaminated samples are squashed into [0.0, 0.01], destroying feature resolution.",
    practicalTip: "If your feature has heavy tails or unhandled outliers, avoid Min-Max. Use RobustScaler, QuantileTransformer, or clip outliers prior to scaling.",
    codeSnippet: "# Demonstrating outlier compression\ndata = np.array([10, 12, 14, 15, 18, 20, 1000])\nscaled = (data - data.min()) / (data.max() - data.min())\nprint(scaled[:6]) # All compressed below 0.01!",
    examRelevance: "Outlier Sensitivity & Preprocessing Robustness"
  },
  {
    id: 8,
    tier: "Tier 1: Foundation & Terminology",
    question: "Can Min-Max scaling alter the skewness, kurtosis, or shape of a feature's probability distribution?",
    options: [
      "Yes, it converts any skewed distribution into a Gaussian normal distribution",
      "No, Min-Max is a linear affine transformation f(x) = a*x + b, which shifts and rescales the distribution but preserves the exact relative spacing, histogram shape, skewness, and kurtosis",
      "Yes, it forces the distribution to become uniform",
      "Yes, it converts positive skew into negative skew"
    ],
    correctIndex: 1,
    explanation: "Min-Max scaling is strictly linear: f(x) = x / (x_max - x_min) - x_min / (x_max - x_min). Linear affine transformations leave standardized central moments (Fisher-Pearson skewness g1 and excess kurtosis g2) completely invariant. Only non-linear power transformations (Log, Box-Cox, Yeo-Johnson) can alter distribution shape.",
    practicalTip: "Do not expect Min-Max scaling to fix skewed features or make them Gaussian. If your model requires normality, apply Box-Cox or QuantileTransformer.",
    codeSnippet: "# Skewness invariance under Min-Max\nfrom scipy.stats import skew\nprint('Raw skewness:', skew(data))\nprint('Scaled skewness:', skew(scaled)) # Identical to 6 decimal places!",
    examRelevance: "Affine Invariance & Distribution Moments"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & FORMULAS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "What is the general mathematical formula for rescaling a feature into an arbitrary bounded interval [a, b] using Min-Max scaling?",
    options: [
      "x_scaled = (x - x_min) / (x_max - x_min) * (b - a) + a",
      "x_scaled = (x - a) / (b - a) * (x_max - x_min)",
      "x_scaled = (x - x_mean) / (b - a)",
      "x_scaled = a + b * x"
    ],
    correctIndex: 0,
    explanation: "To map a feature from its native range [x_min, x_max] to a target interval [a, b], we first map it to the unit interval [0, 1] via (x - x_min)/(x_max - x_min), then scale by the target width (b - a), and finally shift by the lower bound a. When a = -1 and b = 1, this formula maps data into [-1, 1].",
    practicalTip: "In scikit-learn, use MinMaxScaler(feature_range=(-1, 1)) when preparing inputs for neural networks utilizing Tanh activation functions.",
    codeSnippet: "from sklearn.preprocessing import MinMaxScaler\ntanh_scaler = MinMaxScaler(feature_range=(-1, 1))\nX_tanh = tanh_scaler.fit_transform(X)",
    examRelevance: "Generalized Affine Scaling Formulae"
  },
  {
    id: 10,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Mathematically prove what happens to the derivative sensitivity dx'/dx of the Min-Max transform as an extreme outlier x_outlier approaches infinity.",
    options: [
      "dx'/dx approaches infinity, blowing up the gradients",
      "dx'/dx = 1 / (x_outlier - x_min) approaches 0, meaning variations in uncontaminated normal data produce virtually zero change in transformed feature space, destroying gradient signal",
      "dx'/dx approaches 1.0, preserving normal variance",
      "dx'/dx becomes a complex imaginary number"
    ],
    correctIndex: 1,
    explanation: "Differentiating x' = (x - x_min) / (x_max - x_min) with respect to x yields dx'/dx = 1 / (x_max - x_min). If an outlier pushes x_max toward infinity, the derivative dx'/dx -> 0. In neural networks and linear models, downstream gradients dLoss/dx = (dLoss/dx') * (dx'/dx) will vanish to zero across all normal observations, effectively freezing model learning on regular samples.",
    practicalTip: "This mathematical derivative proof explains why outlier-polluted Min-Max scaling causes gradient starvation in deep learning models.",
    codeSnippet: "# Gradient vanishing proof in numpy\nspread = x_outlier - x_min # e.g. 1,000,000\ngrad_scale = 1.0 / spread  # 0.000001 (vanished!)",
    examRelevance: "Derivative Sensitivity & Gradient Dynamics"
  },
  {
    id: 11,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Under the Cauchy-Schwarz inequality, what are the strict mathematical bounds on the Cosine Similarity between any two non-zero real vectors u and v?",
    options: [
      "[0.0, 1.0]",
      "[-1.0, +1.0]",
      "(-infinity, +infinity)",
      "[0.0, +infinity)"
    ],
    correctIndex: 1,
    explanation: "The Cauchy-Schwarz inequality states that |u . v| <= ||u||_2 * ||v||_2 for any vectors in an inner product space. Dividing by ||u||_2 * ||v||_2 yields |cos(theta)| <= 1, which means -1.0 <= CosSim(u, v) <= +1.0. +1.0 indicates parallel vectors pointing in the identical direction; 0.0 indicates orthogonal (uncorrelated) vectors; and -1.0 indicates diametrically opposing vectors.",
    practicalTip: "In text and recommendation systems where feature counts are strictly non-negative (TF-IDF >= 0), cosine similarity is bounded in [0.0, 1.0].",
    codeSnippet: "# Verifying Cauchy-Schwarz bounds\ncos_sim = np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))\nassert -1.0 <= cos_sim <= 1.0",
    examRelevance: "Cauchy-Schwarz Inequality & Inner Product Spaces"
  },
  {
    id: 12,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "For two L2-normalized unit vectors u' and v' (where ||u'|| = 1 and ||v'|| = 1), what is the exact algebraic relationship between their squared Euclidean distance d_E^2(u', v') and their Cosine Similarity cos(theta)?",
    options: [
      "d_E^2(u', v') = 2 * (1 - cos(theta))",
      "d_E^2(u', v') = 1 + cos(theta)",
      "d_E^2(u', v') = 1 / cos(theta)",
      "d_E^2(u', v') = 2 * cos(theta)"
    ],
    correctIndex: 0,
    explanation: "Expanding the squared Euclidean distance: d_E^2(u', v') = ||u' - v'||^2 = (u' - v') . (u' - v') = ||u'||^2 + ||v'||^2 - 2*(u' . v'). Since ||u'|| = 1 and ||v'|| = 1, and u' . v' = cos(theta), this simplifies to d_E^2 = 1 + 1 - 2*cos(theta) = 2*(1 - cos(theta)). Thus, minimizing Euclidean distance on unit vectors is mathematically identical to maximizing Cosine similarity.",
    practicalTip: "This identity allows algorithms like K-Means (which optimize Euclidean inertia) to execute Spherical K-Means clustering simply by L2-normalizing vectors before clustering.",
    codeSnippet: "# Algebraic equivalence demonstration\nd_e_sq = np.sum((u_norm - v_norm)**2)\ncos_equiv = 2.0 * (1.0 - np.dot(u_norm, v_norm))\nnp.testing.assert_almost_equal(d_e_sq, cos_equiv)",
    examRelevance: "Spherical Geometry & Metric Equivalence Proofs"
  },
  {
    id: 13,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "What is the L-infinity (Chebyshev) norm ||x||_infinity of a vector, and what geometric shape does the unit sphere {x : ||x||_infinity = 1} form in 2D space?",
    options: [
      "||x||_infinity = sum |x_i|, forming a rotated diamond",
      "||x||_infinity = max(|x_1|, |x_2|, ..., |x_d|), forming an axis-aligned square with vertices at (+-1, +-1)",
      "||x||_infinity = sqrt(sum x_i^2), forming a circle",
      "||x||_infinity is undefined in finite dimensions"
    ],
    correctIndex: 1,
    explanation: "The L-infinity norm is the maximum absolute coordinate value: ||x||_infinity = max_j |x_j|. In 2D space, the set of points where max(|x1|, |x2|) = 1 forms an axis-aligned square spanning [-1, 1] on both axes. In d dimensions, it forms a d-dimensional hypercube.",
    practicalTip: "Normalizer(norm='max') normalizes each sample vector by dividing by its largest single coordinate magnitude.",
    codeSnippet: "from sklearn.preprocessing import Normalizer\nmax_norm = Normalizer(norm='max')\nX_chebyshev = max_norm.fit_transform(X)",
    examRelevance: "L-p Norm Geometry & Chebyshev Metrics"
  },
  {
    id: 14,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "How does Min-Max scaling affect the Pearson correlation coefficient r_xy between two continuous features X and Y?",
    options: [
      "It multiplies r_xy by 2.0",
      "It leaves r_xy 100% unchanged, because Pearson correlation is completely invariant to positive linear affine transformations",
      "It reduces r_xy to zero by removing all correlation",
      "It squares r_xy"
    ],
    correctIndex: 1,
    explanation: "Pearson correlation r_xy = Cov(X, Y) / (sigma_X * sigma_Y). Linear transformation X' = a*X + b (with a > 0) scales Cov(X', Y) by a and sigma_X' by a, canceling out in the numerator and denominator: (a * Cov(X, Y)) / (a * sigma_X * sigma_Y) = r_xy. Linear feature scaling never alters linear correlation structures.",
    practicalTip: "If a feature correlation matrix changes after applying MinMaxScaler, there is a serious mathematical error or bug in the code implementation.",
    codeSnippet: "# Pearson correlation invariance\nr_raw = np.corrcoef(x, y)[0, 1]\nr_scaled = np.corrcoef(x_minmax, y_minmax)[0, 1]\nnp.testing.assert_almost_equal(r_raw, r_scaled)",
    examRelevance: "Correlation Invariance & Affine Transformations"
  },
  {
    id: 15,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "When applying sample-wise L2 vector normalization to a batch of TF-IDF vectors in Python, what axis parameter must be passed in scikit-learn's normalize() function?",
    options: [
      "axis = 0 (column-wise)",
      "axis = 1 (row-wise, normalizing each sample independently across features)",
      "axis = -1 (transposing the matrix first)",
      "axis = None (normalizing all numbers in the matrix into a single scalar)"
    ],
    correctIndex: 1,
    explanation: "In scikit-learn, axis=1 specifies row-wise operations (each sample record is normalized independently across its feature columns). axis=0 specifies column-wise operations (each feature is normalized across samples). For sample-wise vector normalization, axis=1 is mandatory.",
    practicalTip: "Accidentally passing axis=0 to normalize() will normalize columns instead of samples, corrupting your text feature matrix.",
    codeSnippet: "from sklearn.preprocessing import normalize\n# Correct: axis=1 for sample-wise normalization\nX_normalized = normalize(X_tfidf, norm='l2', axis=1)",
    examRelevance: "Scikit-Learn API Specifications & Axis Mechanics"
  },
  {
    id: 16,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Under what exact mathematical condition will the Min-Max scaling formula (x - x_min) / (x_max - x_min) throw a fatal division-by-zero runtime exception?",
    options: [
      "When all values in the feature column are negative",
      "When the feature column is constant (zero variance), meaning x_max equals x_min",
      "When the feature has more than 1,000 observations",
      "When the feature is normally distributed"
    ],
    correctIndex: 1,
    explanation: "If a feature column contains constant values across all rows (e.g. status = 1 for all records), then x_max = x_min. The denominator (x_max - x_min) evaluates to 0, producing a division-by-zero error (NaN / Inf). Production pipelines must defensively check for zero variance or use VarianceThreshold before scaling.",
    practicalTip: "In scikit-learn, MinMaxScaler defensively outputs 0.0 when x_max == x_min instead of crashing, but custom scaling code must explicitly check for range == 0.",
    codeSnippet: "# Defensive division-by-zero check in custom scalers\nrng = x_max - x_min\nx_scaled = (x - x_min) / rng if rng > 1e-12 else np.zeros_like(x)",
    examRelevance: "Edge Case Diagnostics & Zero-Variance Handling"
  },

  // =========================================================================
  // TIER 3: ALGORITHM ARCHITECTURE & DESIGN (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why does applying MinMaxScaler to a scipy.sparse CSR matrix destroy its memory efficiency, whereas MaxAbsScaler preserves it perfectly?",
    options: [
      "MinMaxScaler runs on the GPU, which cannot allocate sparse arrays",
      "MinMaxScaler subtracts x_min from every element; because x_min is generally non-zero, every implicit zero in the sparse matrix is converted to a non-zero float (-x_min), expanding a 50MB matrix into a 32GB dense array and crashing memory",
      "MaxAbsScaler deletes all negative numbers",
      "Sparse matrices only support integers"
    ],
    correctIndex: 1,
    explanation: "Sparse CSR matrices save memory by storing only non-zero coordinates. MinMaxScaler computes (x - x_min)/(x_max - x_min). Subtracting x_min replaces all implicit zeros with -x_min/(x_max - x_min) != 0, forcing the matrix to become 100% dense. MaxAbsScaler divides by max(|x|) without shifting the center (0 / max = 0), keeping sparsity intact.",
    practicalTip: "Scikit-learn's MinMaxScaler explicitly raises a TypeError if passed a sparse matrix unless you explicitly set with_mean=False or convert to dense.",
    codeSnippet: "# Correct sparse scaling\nfrom sklearn.preprocessing import MaxAbsScaler\nscaler = MaxAbsScaler()\nX_sparse_scaled = scaler.fit_transform(X_sparse)",
    examRelevance: "High-Dimensional Sparse Matrix Architecture"
  },
  {
    id: 18,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "In Natural Language Processing, why does an unnormalized Term Frequency (TF) representation bias search results toward long, verbose documents?",
    options: [
      "Because long documents contain more spelling errors",
      "Because long documents naturally repeat vocabulary words multiple times, producing large raw Euclidean vector magnitudes that dominate dot products even if the semantic relevance is low",
      "Because TF-IDF only works on sentences under 10 words",
      "Because short documents have zero variance"
    ],
    correctIndex: 1,
    explanation: "If document A mentions 'saree' 20 times across 10 pages and document B mentions 'saree' 2 times in a 1-sentence product title, the raw dot product will be 10x larger for document A simply due to length. L2 Vector Normalization divides each document vector by its Euclidean length, projecting both onto the unit hypersphere so search measures pure semantic orientation (Cosine Similarity).",
    practicalTip: "Always chain TfidfVectorizer(norm='l2') to ensure search relevance is length-invariant.",
    codeSnippet: "from sklearn.feature_extraction.text import TfidfVectorizer\nvectorizer = TfidfVectorizer(norm='l2')\nX_tfidf = vectorizer.fit_transform(corpus)",
    examRelevance: "Information Retrieval & Document Length Normalization"
  },
  {
    id: 19,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why do state-of-the-art deep facial recognition models (e.g. ArcFace, FaceNet, CosFace) enforce L2 unit norm constraints on their 512-dimensional output embedding vectors?",
    options: [
      "To ensure that face vectors can be stored as 8-bit integers",
      "To strip away variations caused by face distance from camera, illumination brightness, and image crop size (which alter vector magnitude), forcing identity comparison to rely strictly on geodesic angular distance on the hypersphere",
      "To prevent neural networks from computing cross-entropy loss",
      "Because the GPU cannot compute dot products of unnormalized vectors"
    ],
    correctIndex: 1,
    explanation: "A face close to a bright camera produces high activation magnitudes, while a distant face in low light produces low magnitudes. If embeddings are unnormalized, Euclidean distance reflects lighting and distance rather than facial identity. L2 normalization projects all faces onto the unit hypersphere S^511, enabling scale-invariant angular margin loss (ArcFace).",
    practicalTip: "When extracting deep feature embeddings from CNNs or Vision Transformers for similarity search, always apply L2 normalization before indexing.",
    codeSnippet: "import torch.nn.functional as F\n# Hyperspherical embedding projection in PyTorch\nembedding = F.normalize(raw_features, p=2, dim=1)",
    examRelevance: "Computer Vision & Metric Learning Architectures"
  },
  {
    id: 20,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "In metallurgical and chemical process engineering (e.g. Howrah foundry alloy spectrography), why is sample-wise L1 normalization applied across elemental concentration features?",
    options: [
      "To convert chemical symbols into ASCII strings",
      "To enforce the physical mass-conservation closure constraint: the sum of elemental proportions (Carbon, Silicon, Iron, etc.) must equal exactly 1.0 (100% of the molten pour)",
      "Because spectrometers cannot measure negative numbers",
      "To make the chemical reactions run faster"
    ],
    correctIndex: 1,
    explanation: "Spectroscopic readings suffer from instrument volume calibration drift, causing raw measurements for a molten sample to sum to 97% or 103%. Applying L1 normalization divides each element by the total measured mass, projecting the sample onto the compositional simplex where sum x_i = 1.0, satisfying physical mass conservation laws.",
    practicalTip: "In compositional data analysis (geology, metallurgy, microbiome sequencing), raw counts must always undergo simplex closure (L1 normalization) or Aitchison log-ratio transforms.",
    codeSnippet: "# Compositional closure in python\nalloy_simplex = alloy_readings / alloy_readings.sum(axis=1, keepdims=True)",
    examRelevance: "Compositional Data Analysis & Physical Constraints"
  },
  {
    id: 21,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "When should an ML engineer select MinMaxScaler over StandardScaler (Z-score standardization)?",
    options: [
      "When the downstream algorithm strictly requires bounded inputs within a known interval [0, 1] or [-1, 1], such as image pixel processing or neural networks with Sigmoid/Tanh activations, and the data has no extreme outliers",
      "When the dataset is heavily contaminated with massive outliers",
      "When features follow an unbounded Gaussian distribution with infinite tails",
      "When training an Ordinary Least Squares regression model on unbounded financial data"
    ],
    correctIndex: 0,
    explanation: "MinMaxScaler is ideal when features have natural hard physical boundaries (e.g. RGB image pixels [0, 255] -> [0, 1], percentage completions [0, 100], or bounded sensor telemetry [0V, 10V]) and downstream algorithms require bounded inputs. For unbounded features with outliers, StandardScaler or RobustScaler is far superior.",
    practicalTip: "For computer vision image classification, dividing by 255.0 (Min-Max scaling to [0, 1]) is the universal standard practice.",
    codeSnippet: "# Computer vision pixel normalization\nX_images = X_images.astype('float32') / 255.0",
    examRelevance: "Model-Specific Preprocessing Requirements"
  },
  {
    id: 22,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "What is the critical rule regarding the estimation of MinMaxScaler parameters (x_min, x_max) during cross-validation to prevent data leakage?",
    options: [
      "Estimate x_min and x_max across the entire dataset before splitting folds",
      "Fit x_min and x_max strictly on the training fold (X_train_fold), and apply those exact frozen parameters to transform the validation fold (X_val_fold)",
      "Re-estimate x_min and x_max on the validation fold independently",
      "Use theoretical limits (0 and infinity) without estimating parameters"
    ],
    correctIndex: 1,
    explanation: "If you scale the entire dataset prior to cross-validation, the minimum and maximum values incorporate information from the test/validation set. This leaks future distributional extremes into the training process, producing artificially optimistic cross-validation scores that degrade in real-world deployment.",
    practicalTip: "Always wrap MinMaxScaler inside an sklearn.pipeline.Pipeline to guarantee leak-free cross-validation.",
    codeSnippet: "from sklearn.pipeline import Pipeline\npipe = Pipeline([\n    ('minmax', MinMaxScaler()),\n    ('mlp', MLPClassifier())\n])\nscores = cross_val_score(pipe, X, y, cv=5) # 100% leak-free!",
    examRelevance: "Cross-Validation Protocols & Data Leakage Prevention"
  },
  {
    id: 23,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "In multimodal AI systems combining text embeddings and continuous tabular features, what is the standard architectural practice for normalization?",
    options: [
      "Apply MinMaxScaler to all features simultaneously in a single matrix",
      "Use ColumnTransformer to apply L2 Vector Normalization across the text embedding dimensions, while independently applying StandardScaler or RobustScaler across the continuous tabular numerical columns",
      "Ignore tabular features and train only on text",
      "Convert text embeddings into integers"
    ],
    correctIndex: 1,
    explanation: "Multimodal pipelines contain heterogeneous representations. Text embeddings represent directional semantic angles on a hypersphere (requiring sample-wise L2 normalization), whereas tabular columns represent disparate physical quantities like age and income (requiring column-wise Standardization). Applying ColumnTransformer maintains the distinct mathematical geometry of each feature group.",
    practicalTip: "Never apply column-wise Min-Max across multimodal embedding dimensions; it distorts the isotropic angular structure of the embedding space.",
    codeSnippet: "from sklearn.compose import ColumnTransformer\npreprocessor = ColumnTransformer([\n    ('tabular', StandardScaler(), ['age', 'income']),\n    ('text_emb', Normalizer(norm='l2'), embedding_cols)\n])",
    examRelevance: "Multimodal Architectures & Heterogeneous Feature Pipelines"
  },
  {
    id: 24,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why should ML engineers configure MinMaxScaler(clip=True) when deploying to live production microservices?",
    options: [
      "To make the microservice run in dark mode",
      "Because live production inputs may exceed the training dataset extremes (x_new > x_max or x_new < x_min), producing values outside [0, 1]; clip=True guarantees outputs are safely bounded within [0, 1]",
      "To automatically delete null values",
      "Because clip=True compiles the model to C++"
    ],
    correctIndex: 1,
    explanation: "By mathematical definition, MinMaxScaler computes (x - min) / (max - min). If a live production record arrives with a value higher than the training maximum, the transformed value will exceed 1.0 (e.g. 1.35). If downstream components strictly expect [0, 1], this causes silent degradation. clip=True defensively truncates values to [0, 1].",
    practicalTip: "In scikit-learn >= 0.24, always initialize MinMaxScaler(clip=True) for production serving pipelines.",
    codeSnippet: "from sklearn.preprocessing import MinMaxScaler\nsafe_scaler = MinMaxScaler(clip=True)\nsafe_scaler.fit(X_train)",
    examRelevance: "Production Serving Robustness & Defensive ML Engineering"
  },

  // =========================================================================
  // TIER 4: PRODUCTION DIAGNOSTICS & SCALABILITY (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "A production computer vision pipeline receives incoming image frames where some pixels have values of 260 due to sensor glare. If an unclipped MinMaxScaler was fitted on [0, 255], what is the output value, and what silent error does it trigger?",
    options: [
      "The value becomes 0.0 and turns black",
      "The value evaluates to 260 / 255 = 1.0196; downstream convolutional layers expecting inputs in [0, 1] experience out-of-distribution activation spikes, degrading model inference accuracy silently",
      "The GPU memory crashes with a segmentation fault",
      "The image is automatically rotated by 90 degrees"
    ],
    correctIndex: 1,
    explanation: "Without clipping, 260 / 255 = 1.0196. While mathematically trivial, neural networks trained with batch normalization and bounded activations (ReLU/Sigmoid) are calibrated for inputs strictly <= 1.0. Out-of-bounds values trigger out-of-distribution feature maps, silently degrading detection accuracy without throwing an error.",
    practicalTip: "Always enforce np.clip(img / 255.0, 0.0, 1.0) in production image ingestion pipelines.",
    codeSnippet: "# Defensive image normalization\nimg_norm = np.clip(raw_img.astype(np.float32) / 255.0, 0.0, 1.0)",
    examRelevance: "Computer Vision Preprocessing & Silent Pipeline Failures"
  },
  {
    id: 26,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In massive vector search engines (e.g. FAISS indexing 100 million product embeddings), why is Maximum Inner Product Search (MIPS) on L2-normalized vectors substantially faster than computing full Euclidean distances?",
    options: [
      "Because MIPS skips hardware floating-point operations",
      "Because for L2-normalized vectors, Euclidean distance d_E^2 = 2*(1 - dot_product); finding nearest neighbors reduces to a pure matrix-vector multiplication (BLAS GEMM) without computing differences or square roots",
      "Because vector search engines cannot calculate square roots",
      "Because inner products only work on integers"
    ],
    correctIndex: 1,
    explanation: "Full Euclidean distance requires computing differences (u_i - v_i), squaring them, summing, and taking square roots for every pair of vectors. By pre-normalizing all vectors with L2 norm, the distance is strictly a monotonic function of their dot product: d_E^2 = 2 - 2*(u . v). GPUs can compute billions of dot products per second using tensor cores (GEMM matrix multiplication), speeding up search by orders of magnitude.",
    practicalTip: "Always normalize vectors with faiss.normalize_L2(xb) before building IndexFlatIP indexes in FAISS.",
    codeSnippet: "import faiss\n# L2 normalize vectors for ultra-fast inner-product search\nfaiss.normalize_L2(embeddings)\nindex = faiss.IndexFlatIP(dimension)\nindex.add(embeddings)",
    examRelevance: "Vector Search Infrastructure & High-Performance Computing"
  },
  {
    id: 27,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "When serializing a Scikit-Learn MinMaxScaler using joblib or ONNX for production deployment, which internal attributes must be stored to allow deterministic inference on live single-record requests?",
    options: [
      "Only the final model weights",
      "The fitted attributes: min_, scale_, data_min_, and data_max_",
      "The entire historical training dataset raw CSV file",
      "The operating system version"
    ],
    correctIndex: 1,
    explanation: "MinMaxScaler is stateful. To transform a single incoming JSON payload [x] via x_scaled = x * scale_ + min_, the microservice must have access to the learned scale_ = (b - a)/(data_max_ - data_min_) and min_ = a - data_min_ * scale_. Serializing the entire fitted Pipeline object ensures these parameters are preserved perfectly.",
    practicalTip: "Inspect fitted parameters with print(scaler.data_min_, scaler.data_max_) before deploying serialized artifacts.",
    codeSnippet: "# Inspecting fitted scaler parameters\nprint('Training Min:', scaler.data_min_)\nprint('Training Max:', scaler.data_max_)\nprint('Multiplier scale_:', scaler.scale_)",
    examRelevance: "MLOps Pipeline Serialization & Microservice Serving"
  },
  {
    id: 28,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "When explaining model decisions to non-technical stakeholders (e.g. loan underwriters in Salt Lake Sector V) using SHAP waterfall plots, what critical step must be taken if features were scaled using MinMaxScaler?",
    options: [
      "Tell the underwriters to multiply all features by the scaling factor in their heads",
      "Pass the raw unscaled feature values into the SHAP explanation visualizer (or call scaler.inverse_transform()) so that feature contributions are displayed in native units (e.g. 'Annual Income = ₹4,50,000') rather than normalized decimals like '0.14'",
      "Re-train an unscaled model specifically for generating explanations",
      "Convert all numbers into percentages"
    ],
    correctIndex: 1,
    explanation: "Regulators and business auditors cannot make legal credit decisions based on normalized numbers like 'Applicant Income = 0.142'. Production explainability systems must map scaled feature coordinates back to native domain units (₹4,50,000) using inverse_transform while computing SHAP attributions.",
    practicalTip: "In SHAP waterfall plots, pass display_features=X_raw_df to display human-readable native feature values alongside attribution bars.",
    codeSnippet: "# Displaying native feature values in SHAP\nshap.plots.waterfall(shap_values[0], display_features=X_test_raw.iloc[0])",
    examRelevance: "Explainable AI (XAI) & Regulatory Governance"
  },
  {
    id: 29,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "A data pipeline in WBSEDCL processes telemetry streams from 1,000 solar substations. A faulty sensor sends a constant voltage reading of 240.0V for 24 hours. What will occur if a custom naive Min-Max scaling function without zero-division guards is applied to this feature?",
    options: [
      "The function automatically resets the voltage to 0",
      "Because x_max = 240.0 and x_min = 240.0, the denominator (x_max - x_min) is zero, resulting in a ZeroDivisionError or filling the column with NaNs, causing downstream models to crash",
      "The function prints a warning and continues safely",
      "The sensor restarts automatically"
    ],
    correctIndex: 1,
    explanation: "Zero-variance features produce x_max - x_min = 0. A naive custom implementation (x - min)/(max - min) will raise a ZeroDivisionError in Python or produce an array of NaNs/Infs in NumPy, crashing production inference services. Production pipelines must include defensive assertions or VarianceThreshold filters.",
    practicalTip: "Use scikit-learn's FeatureUnion with VarianceThreshold(threshold=0.0) prior to scaling to drop zero-variance sensor columns automatically.",
    codeSnippet: "from sklearn.feature_selection import VarianceThreshold\n# Drop constant columns before scaling\nselector = VarianceThreshold(threshold=0.0)\nX_filtered = selector.fit_transform(X_sensors)",
    examRelevance: "Sensor Stream Fault Tolerance & Zero-Variance Handling"
  },
  {
    id: 30,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In streaming real-time applications where data arrives continuously one sample at a time, why is sample-wise Vector Normalization (L2 norm) architecturally simpler to maintain than feature-wise Min-Max scaling?",
    options: [
      "Because vector normalization requires no floating-point math",
      "Because sample-wise vector normalization is completely stateless—it depends strictly on the features within the single arriving record (||x||_2 = sqrt(sum x_i^2)) and requires zero historical training state, whereas Min-Max requires storing global min and max parameters across batches",
      "Because vector normalization only works on streaming data",
      "Because Kafka automatically applies vector normalization"
    ],
    correctIndex: 1,
    explanation: "Sample-wise Vector Normalization (Normalizer) is entirely stateless: x' = x / ||x||_2. Each incoming record is normalized independently using only its own coordinate values, requiring no state synchronization across distributed worker nodes. In contrast, feature-wise Min-Max scaling is stateful, requiring synchronized global parameters (min_, max_) and monitoring for out-of-bounds drift.",
    practicalTip: "In microservice architectures handling high-throughput event streams, stateless transforms like vector normalization have zero operational coordination overhead.",
    codeSnippet: "# Stateless sample normalization on single arriving streaming record\ndef process_stream_event(event_vector):\n    norm = np.linalg.norm(event_vector)\n    return event_vector / norm if norm > 0 else event_vector",
    examRelevance: "Streaming Architectures & Stateless Preprocessing"
  }
];

export default questions;
