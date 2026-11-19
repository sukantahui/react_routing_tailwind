/**
 * Topic 19: One-hot encoding
 * 30 Masterclass Assessment Questions (Foundation to Industrial Scale)
 * Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax | Barrackpore
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & CONCEPTUAL MECHANICS (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    question: "What is the formal mathematical definition of One-Hot Encoding?",
    shortAnswer: "It is a mapping that transforms each category c_k into the k-th standard basis vector e_k in R^K, where index k has value 1 and all other entries are 0.",
    explanation: "For a discrete variable with K unique levels {c_1, ..., c_K}, One-Hot Encoding produces a K-dimensional vector [I(c=c_1), I(c=c_2), ..., I(c=c_K)]^T, where I is the indicator function. Each unique category corresponds to an orthogonal unit vector e_k in R^K lying on the coordinate axes.",
    hint: "Think of an array of length K with only one light turned on.",
    level: "Basic",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(sparse_output=False)\nX_ohe = ohe.fit_transform([['Civil'], ['Electrical'], ['Signalling']])\n# Result is a 3x3 identity matrix with one '1' per row"
  },
  {
    id: 2,
    question: "What is the Euclidean distance between any two distinct categories represented as one-hot vectors?",
    shortAnswer: "The Euclidean distance is strictly equal to sqrt(2) (approximately 1.4142).",
    explanation: "Let e_i and e_j be one-hot vectors for distinct categories i != j. Vector e_i has a 1 at index i and 0 elsewhere; e_j has a 1 at index j and 0 elsewhere. Their squared difference is (1-0)^2 + (0-1)^2 = 1 + 1 = 2. Taking the square root gives ||e_i - e_j||_2 = sqrt(2). Every distinct category pair is equidistant in feature space.",
    hint: "Use Pythagoras theorem on vectors [1, 0] and [0, 1].",
    level: "Basic",
    codeExample: "import numpy as np\ne1 = np.array([1, 0, 0])\ne2 = np.array([0, 1, 0])\neuclid_dist = np.linalg.norm(e1 - e2)\nprint('Distance:', euclid_dist) # 1.41421356... = sqrt(2)"
  },
  {
    id: 3,
    question: "Why is the inner product (and cosine similarity) between any two distinct one-hot encoded vectors equal to zero?",
    shortAnswer: "Because distinct one-hot vectors have non-overlapping non-zero coordinates, their element-wise product sum is strictly zero (mutual orthogonality).",
    explanation: "For i != j, e_i has non-zero coordinate only at index i, and e_j has non-zero coordinate only at index j. The inner product is <e_i, e_j> = sum_m e_{im} * e_{jm} = 0. Consequently, cosine similarity cos(theta) = <e_i, e_j> / (||e_i|| * ||e_j||) = 0 / 1 = 0.0. This guarantees that categories are represented as completely independent orthogonal axes.",
    hint: "What happens when you multiply 1*0 and 0*1 and add them together?",
    level: "Basic",
    codeExample: "import numpy as np\ne_civil = np.array([1, 0, 0])\ne_elec  = np.array([0, 1, 0])\nprint('Dot product:', np.dot(e_civil, e_elec)) # Exactly 0.0"
  },
  {
    id: 4,
    question: "What is the primary advantage of One-Hot Encoding over Label Encoding for nominal categories in linear models?",
    shortAnswer: "It prevents the model from assuming an artificial monotonic ordering or false numerical hierarchy among qualitative categories.",
    explanation: "Label Encoding assigns arbitrary scalar integers (e.g. Kolkata=0, Barrackpore=1, Siliguri=2), which forces linear models to assume that Siliguri has twice the mathematical effect of Barrackpore relative to Kolkata. One-Hot Encoding provides an independent weight for each category, allowing the algorithm to learn genuine, unconstrained regression slopes.",
    hint: "Does alphabetical order imply that Siliguri is 'greater than' Kolkata?",
    level: "Basic",
    codeExample: "# Linear model with Label Encoding:\n# y = w * integer_code + b  (forced linear ladder)\n# Linear model with One-Hot:\n# y = w1 * x_kolkata + w2 * x_barrackpore + w3 * x_siliguri + b (independent weights)"
  },
  {
    id: 5,
    question: "What does the term 'Dummy Variable' mean in statistical modeling?",
    shortAnswer: "A dummy variable is an artificial binary numerical indicator (taking values 0 or 1) created to represent a single qualitative categorical state.",
    explanation: "In econometrics and statistics, qualitative factors (such as gender, treatment group, or regional district) cannot be entered directly into equations. A dummy variable acts as an on/off switch: 1 indicates the presence of that category, and 0 indicates its absence.",
    hint: "Think of an on/off switch in a circuit.",
    level: "Basic",
    codeExample: "# Dummy variable for 'Salt Lake':\n# is_salt_lake = 1 if district == 'Salt Lake' else 0"
  },
  {
    id: 6,
    question: "What is the Manhattan (L1) distance between any two distinct one-hot vectors?",
    shortAnswer: "The Manhattan distance between any two distinct one-hot vectors is exactly 2.0.",
    explanation: "The L1 norm is the sum of absolute coordinate differences: ||e_i - e_j||_1 = sum_m |e_{im} - e_{jm}|. For m = i, |1 - 0| = 1. For m = j, |0 - 1| = 1. For all other indices, |0 - 0| = 0. Summing gives 1 + 1 = 2.0.",
    hint: "Sum |1 - 0| + |0 - 1|.",
    level: "Basic",
    codeExample: "import numpy as np\ne1 = np.array([1, 0, 0])\ne2 = np.array([0, 1, 0])\nprint('L1 distance:', np.sum(np.abs(e1 - e2))) # 2.0"
  },
  {
    id: 7,
    question: "How many columns does One-Hot Encoding generate for a categorical feature with K unique categories if drop_first=False?",
    shortAnswer: "It generates exactly K binary indicator columns.",
    explanation: "Each of the K unique categories receives its own dedicated binary indicator column. If K = 5 (e.g. Civil, Electrical, Signalling, Trackwork, Rolling-Stock), the resulting transformed feature space will have 5 columns.",
    hint: "Each category gets one column.",
    level: "Basic",
    codeExample: "categories = ['Civil', 'Electrical', 'Signalling', 'Trackwork', 'Rolling-Stock']\n# K = 5 categories -> 5 one-hot columns"
  },
  {
    id: 8,
    question: "What is the 'Simplex' property of One-Hot Encoded vectors?",
    shortAnswer: "Every one-hot vector lies on the vertices of the standard probability simplex Delta^{K-1}, where all coordinates are non-negative and their sum equals 1.0.",
    explanation: "Because each vector has non-negative entries (0 or 1) and their row sum is strictly sum_{k=1}^K e_k = 1.0, one-hot vectors form the extreme vertex points (corners) of the standard unit simplex in R^K. Softmax output probabilities also live inside this exact simplex.",
    hint: "What is the sum of coordinates in any one-hot encoded row?",
    level: "Basic",
    codeExample: "vec = [0, 1, 0, 0]\nassert sum(vec) == 1.0\nassert all(v >= 0 for v in vec)"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & FORMULATIONS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    question: "State the algebraic proof that the Gram matrix (X^T X) is singular when an intercept is included with all K one-hot columns.",
    shortAnswer: "Because sum_{k=1}^K x_{ik} = 1.0 = x_{i,intercept} for all rows, the columns of X are linearly dependent, giving rank(X) <= K < K+1 and det(X^T X) = 0.",
    explanation: "Let X in R^{N x (K+1)} have column 0 as the intercept (all 1s) and columns 1..K as one-hot indicators. Because every sample belongs to exactly one category, sum_{k=1}^K X_{*,k} = 1_N = X_{*,0}. Thus, X * [1, -1, -1, ..., -1]^T = 0_N. The columns of X are linearly dependent, so rank(X) <= K. The square Gram matrix X^T X has dimension (K+1) x (K+1) with rank <= K. By matrix theory, det(X^T X) = 0, meaning (X^T X)^(-1) does not exist.",
    hint: "Can a (K+1) x (K+1) matrix with rank K be inverted?",
    level: "Intermediate",
    codeExample: "import numpy as np\n# 3 samples, 2 categories + intercept:\nX = np.array([\n  [1, 1, 0],\n  [1, 0, 1],\n  [1, 1, 0]\n])\nXTX = X.T @ X\nprint('Determinant:', np.linalg.det(XTX)) # 0.0 -> Singular matrix!"
  },
  {
    id: 10,
    question: "How does dropping the first category (K - 1 encoding) resolve the Dummy Variable Trap?",
    shortAnswer: "It breaks the linear dependency sum(x_k) = 1, restoring full column rank K so that det(X_{safe}^T X_{safe}) > 0 and a unique OLS solution exists.",
    explanation: "By dropping reference category c_1, the indicator sum across active columns {2..K} is either 1 (for categories 2..K) or 0 (for the reference category). Because this sum is no longer constantly 1 across all rows, it is linearly independent of the intercept column. The design matrix achieves full column rank K, making (X^T X) strictly positive definite and invertible.",
    hint: "When category 1 is active, all K-1 columns are 0. Does the row sum still equal 1?",
    level: "Intermediate",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(drop='first', sparse_output=False)\nX_drop = ohe.fit_transform([['Civil'], ['Electrical'], ['Civil']])\n# Dropped 'Civil': 'Electrical' gets [1.0], 'Civil' gets [0.0]"
  },
  {
    id: 11,
    question: "In drop-first linear regression, what is the exact mathematical interpretation of the intercept beta_0?",
    shortAnswer: "The intercept beta_0 represents the expected conditional mean of the target variable for the omitted reference category: E[Y | C = c_ref] = beta_0.",
    explanation: "When an observation belongs to the dropped reference category, all K - 1 active dummy variables equal 0. The regression equation reduces to: y = beta_0 + sum_{k=2}^K beta_k * (0) = beta_0. Therefore, beta_0 captures the baseline expected outcome for the reference category.",
    hint: "What is y when all x_k = 0?",
    level: "Intermediate",
    codeExample: "# Regression: y = beta_0 + beta_elec * x_elec\n# When x_elec = 0 (Civil), y = beta_0 (Civil baseline)"
  },
  {
    id: 12,
    question: "In drop-first linear regression, what is the exact mathematical interpretation of coefficient beta_k for an active category k?",
    shortAnswer: "beta_k represents the differential contrast effect relative to the reference category: beta_k = E[Y | C = c_k] - E[Y | C = c_ref].",
    explanation: "For an observation with category c_k, x_k = 1 and all other dummy columns are 0. The regression expectation is: E[Y | C = c_k] = beta_0 + beta_k. Since beta_0 = E[Y | C = c_ref], rearranging yields beta_k = E[Y | C = c_k] - E[Y | C = c_ref]. Thus, beta_k measures the expected increase or decrease in the target compared to the reference baseline.",
    hint: "Subtract the baseline mean from the category mean.",
    level: "Intermediate",
    codeExample: "# If baseline Civil budget = ₹43 Cr and beta_elec = -₹15 Cr:\n# Expected Electrical budget = 43 - 15 = ₹28 Cr"
  },
  {
    id: 13,
    question: "Why does Ridge Regression (L2 regularization) remain mathematically solvable even when all K one-hot columns are retained with an intercept?",
    shortAnswer: "Because Ridge adds lambda * I to (X^T X), shifting all eigenvalues upward by lambda > 0 and guaranteeing that the matrix is strictly positive definite and invertible.",
    explanation: "The Ridge normal equation is beta_ridge = (X^T X + lambda * I)^(-1) X^T y. Even if X^T X is rank-deficient with a zero eigenvalue (lambda_min = 0), adding lambda * I (where lambda > 0) increases every eigenvalue: lambda_i(X^T X + lambda * I) = lambda_i(X^T X) + lambda >= lambda > 0. Because all eigenvalues are strictly positive, the matrix is non-singular and invertible.",
    hint: "What happens to a zero eigenvalue when you add lambda * 1 to it?",
    level: "Intermediate",
    codeExample: "import numpy as np\nXTX = np.array([[2, 2], [2, 2]]) # Singular (det = 0)\nlambda_reg = 0.5\nXTX_ridge = XTX + lambda_reg * np.eye(2)\nprint('Ridge det:', np.linalg.det(XTX_ridge)) # 2.25 > 0 (Invertible!)"
  },
  {
    id: 14,
    question: "Calculate the exact sparsity percentage of a one-hot encoded matrix with 100,000 rows and 50 categories.",
    shortAnswer: "The sparsity is exactly 98.0%.",
    explanation: "In any one-hot encoded row, exactly one entry is non-zero (1.0), and the remaining 49 entries are zeros (0.0). Across the entire 100,000 x 50 matrix, there are 5,000,000 total elements, of which 100,000 are ones and 4,900,000 are zeros. Sparsity = (4,900,000 / 5,000,000) * 100 = (49 / 50) * 100 = 98.0%.",
    hint: "Fraction of zeros is (K - 1) / K.",
    level: "Intermediate",
    codeExample: "K = 50\nsparsity = ((K - 1) / K) * 100\nprint(f'{sparsity}%') # 98.0%"
  },
  {
    id: 15,
    question: "What is the condition number of the Gram matrix (X^T X) in full one-hot encoding without column dropping, and what does it signify?",
    shortAnswer: "The condition number is infinity (kappa = inf), signifying that the matrix is singular and numerical matrix inversion is completely ill-posed.",
    explanation: "The condition number of a matrix is kappa = sigma_max / sigma_min. In full one-hot encoding with an intercept, the smallest singular value sigma_min is 0 due to linear dependence. Dividing by zero gives kappa = inf. This signifies that ordinary least squares has infinite sensitivity to numerical perturbation and no unique inverse.",
    hint: "Condition number is ratio of largest to smallest singular value.",
    level: "Intermediate",
    codeExample: "import numpy as np\nX = np.array([[1, 1, 0], [1, 0, 1], [1, 1, 0]])\nXTX = X.T @ X\nprint('Condition number:', np.linalg.cond(XTX)) # inf (or > 1e16 due to float precision)"
  },
  {
    id: 16,
    question: "If a categorical feature has cardinality K = 2 (binary), why is full One-Hot Encoding (producing 2 columns) wasteful?",
    shortAnswer: "Because the second column is redundant: x_2 = 1 - x_1. A single binary column conveys 100% of the information without wasting memory or creating multicollinearity.",
    explanation: "For a binary variable (e.g. Loan Default: Yes/No), knowing that x_Yes = 0 immediately implies x_No = 1. Retaining two columns doubles memory usage and introduces perfect multicollinearity in linear models with an intercept. A single column encoded as {0, 1} is sufficient.",
    hint: "If a coin is not Heads, it must be Tails. Do you need two variables?",
    level: "Intermediate",
    codeExample: "# Binary encoding:\nfrom sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(drop='if_binary', sparse_output=False)\nX_bin = ohe.fit_transform([['Yes'], ['No'], ['Yes']])\n# Produces 1 column instead of 2"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE & ENGINEERING IMPLEMENTATION (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    question: "What are the three core 1D arrays comprising a Compressed Sparse Row (CSR) matrix and what do they store?",
    shortAnswer: "1. data (non-zero values), 2. indices (column indices of non-zero entries), 3. indptr (row pointers indicating start and end offsets for each row).",
    explanation: "CSR format efficiently packs sparse data: `data` stores the non-zero float values; `indices` stores the integer column index for each entry in `data`; and `indptr` is an array of length N+1 where indptr[i] to indptr[i+1] index the elements of row i in `data` and `indices`. Zeros are never explicitly stored in memory.",
    hint: "Data values, column indices, and row pointer offsets.",
    level: "Advanced",
    codeExample: "from scipy.sparse import csr_matrix\n# CSR stores:\n# data: [1.0, 1.0]\n# indices: [0, 2]\n# indptr: [0, 1, 2]"
  },
  {
    id: 18,
    question: "State the formula for total memory consumption of a One-Hot CSR matrix with N rows and explain why it is independent of cardinality K.",
    shortAnswer: "Memory_csr = 16*N + 4 bytes. It is independent of K because every row contains exactly ONE non-zero entry, meaning NNZ = N regardless of how large K is.",
    explanation: "In one-hot encoding, each row has exactly one 1.0. Thus, NNZ = N. Array sizes: `data` has N float64 elements (8N bytes); `indices` has N int32 elements (4N bytes); `indptr` has N+1 int32 elements (4N + 4 bytes). Total memory = 8N + 4N + 4N + 4 = 16N + 4 bytes. Whether K = 10 or K = 100,000, CSR stores only the single active column index per row, making memory consumption completely independent of cardinality K.",
    hint: "How many non-zero entries exist in an N-row one-hot matrix?",
    level: "Advanced",
    codeExample: "# N = 1,000,000 rows:\n# Dense (K=2500): 1,000,000 * 2500 * 8 bytes = 20 GB!\n# CSR: 1,000,000 * 16 bytes = 16 MB! (Constant across any K)"
  },
  {
    id: 19,
    question: "Why does Scikit-Learn's `OneHotEncoder(handle_unknown='ignore')` produce an all-zero vector for unseen categories during production inference?",
    shortAnswer: "Because it treats novel categories as having 0 for all known indicator columns, allowing the model to safely fall back to the baseline intercept without throwing an exception.",
    explanation: "If a new category arrives at inference that was not in the training vocabulary, `handle_unknown='ignore'` assigns 0 to all K indicator columns. In a linear model y = beta_0 + sum beta_k x_k, having all x_k = 0 evaluates to y = beta_0. The model safely predicts the training baseline instead of crashing the web server with a ValueError.",
    hint: "What happens when an unknown category has 0 in all columns?",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(handle_unknown='ignore', sparse_output=False)\nohe.fit([['Kolkata'], ['Barrackpore']])\n# Unseen 'Darjeeling' -> all zeros:\nprint(ohe.transform([['Darjeeling']])) # [[0., 0.]]"
  },
  {
    id: 20,
    question: "How does the `min_frequency` parameter in Scikit-Learn 1.2+ `OneHotEncoder` control categorical feature explosion?",
    shortAnswer: "It pools all rare categories occurring fewer than min_frequency times into a single consolidated 'infrequent_other' column.",
    explanation: "In high-cardinality data, long-tail categories appearing once or twice inflate column count and cause overfitting. Setting `min_frequency=10` (or a fraction like `0.01`) instructs the encoder to identify rare categories during `.fit()` and map them to a single shared column, retaining high expressive power on frequent categories while bounding matrix dimensionality.",
    hint: "Categories below the threshold get grouped into 'Other'.",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(min_frequency=5, sparse_output=False)\n# Any category with count < 5 is mapped to 'infrequent_other'"
  },
  {
    id: 21,
    question: "Why should `drop='first'` NOT be used when training Decision Trees or Random Forests?",
    shortAnswer: "Because dropping a category forces the tree to construct an unnatural inverse multi-condition split to isolate the reference category, wasting tree depth and increasing variance.",
    explanation: "In a decision tree, an active one-hot column can be isolated with a single split: x_k <= 0.5 (left child = absent, right child = present). If category 1 is dropped, isolating category 1 requires testing: (x_2 == 0 AND x_3 == 0 AND ... AND x_K == 0), forcing the tree to grow K - 1 levels deep just to identify the reference category. Therefore, tree models require all K columns (`drop=None`).",
    hint: "How does a tree isolate a category when it doesn't have its own column?",
    level: "Advanced",
    codeExample: "# BEST PRACTICE:\n# Linear models: OneHotEncoder(drop='first')\n# Tree models:   OneHotEncoder(drop=None)"
  },
  {
    id: 22,
    question: "Why does `pd.get_dummies()` cause catastrophic schema drift errors in production machine learning pipelines?",
    shortAnswer: "Because pd.get_dummies() has no persistent state: if the test set or a real-time request has different categories from the training set, the number and order of columns will differ.",
    explanation: "Machine learning models require strictly identical feature counts and column orderings between training and serving. If training has ['Civil', 'Electrical', 'Signalling'] (3 columns) and a test batch only contains ['Civil', 'Electrical'] (2 columns), `pd.get_dummies()` outputs a 2-column DataFrame, causing an immediate `ValueError: feature_names mismatch` in Scikit-Learn. `OneHotEncoder` persists the learned categories in `categories_` across all runs.",
    hint: "Does pd.get_dummies save the training category list for future use?",
    level: "Advanced",
    codeExample: "# DANGEROUS: pd.get_dummies(df_test) -> may have fewer/more columns!\n# SAFE: ohe.fit(X_train); ohe.transform(X_test) -> guaranteed identical columns"
  },
  {
    id: 23,
    question: "How should `OneHotEncoder` be safely integrated into a Scikit-Learn `ColumnTransformer` alongside standard numeric scalers?",
    shortAnswer: "By defining a ColumnTransformer with named tuples specifying OneHotEncoder for categorical column names and StandardScaler for numeric column names.",
    explanation: "A `ColumnTransformer` applies targeted preprocessing pipelines to designated column subsets in parallel, concatenating their outputs into a unified feature matrix. This prevents data leakage and ensures categorical and numerical features are transformed cleanly without manual DataFrame slicing.",
    hint: "Use ColumnTransformer([('num', StandardScaler(), num_cols), ('cat', OneHotEncoder(), cat_cols)]).",
    level: "Advanced",
    codeExample: "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OneHotEncoder, StandardScaler\n\npreprocessor = ColumnTransformer([\n    ('num', StandardScaler(), ['budget_cr', 'score']),\n    ('cat', OneHotEncoder(drop='first'), ['dept', 'district'])\n])"
  },
  {
    id: 24,
    question: "What is the computational complexity of multiplying a CSR sparse one-hot matrix X in R^{N x K} by a weight vector w in R^K?",
    shortAnswer: "The computational complexity is O(N) operations, compared to O(N * K) for a dense matrix.",
    explanation: "In a dense matrix, computing X * w requires N * K multiply-accumulate operations. In a one-hot CSR matrix, each row contains exactly one non-zero entry (1.0). The product for row i is simply 1.0 * w[indices[i]], which is a single memory lookup and assignment. Across all N rows, this takes exactly N operations: O(NNZ) = O(N), completely independent of K.",
    hint: "You only need to look up one weight per row.",
    level: "Advanced",
    codeExample: "# For N = 1,000,000 rows and K = 2,500 columns:\n# Dense FLOPs: 2,500,000,000 operations\n# Sparse FLOPs: 1,000,000 operations (2,500x faster!)"
  },

  // =========================================================================
  // TIER 4: INDUSTRIAL SCALE, AUDITING & PRODUCTION EDGE CASES (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    question: "Explain the 'mtry' feature subsampling dilution trap when Random Forests are trained on high-cardinality One-Hot Encoded features.",
    shortAnswer: "Random Forests sample sqrt(D) features at each split; when one categorical feature creates hundreds of sparse binary columns, the ensemble repeatedly samples uninformative zeros, degrading model accuracy.",
    explanation: "At each split node, Random Forest randomly selects mtry = sqrt(D) candidate features. If a continuous variable with high predictive power is surrounded by 500 one-hot columns (each 99% zeros), the probability of sampling the continuous variable drops drastically. Most sampled subsets contain only sparse binary indicators, causing the tree to make suboptimal splits and reducing overall ensemble diversity.",
    hint: "What happens when 95% of your available features are sparse binary columns?",
    level: "Expert",
    codeExample: "# If dataset has 5 real features + 495 one-hot columns = 500 total:\n# mtry = sqrt(500) approx 22 features.\n# Expected real features in split sample = 22 * (5 / 500) approx 0.22 (near zero!)"
  },
  {
    id: 26,
    question: "In Generalized Linear Models (GLMs) such as Poisson or Gamma regression for insurance claims, what occurs during Iteratively Reweighted Least Squares (IRLS) if full OHE is used without dropping a column?",
    shortAnswer: "The Fisher Information matrix is singular at every iteration, causing the IRLS optimizer to diverge, produce NaN weights, or fail to converge.",
    explanation: "GLMs optimize parameters via IRLS, where each update solves beta^{(t+1)} = (X^T W^{(t)} X)^(-1) X^T W^{(t)} z^{(t)}. When all K one-hot columns are present with an intercept, the weighted Gram matrix (X^T W X) has rank at most K. Its determinant is zero, meaning the inverse does not exist. The optimization algorithm diverges or aborts after maximum iterations.",
    hint: "IRLS relies on inverting the weighted information matrix (X^T W X) at every step.",
    level: "Expert",
    codeExample: "# In statsmodels GLM:\n# sm.GLM(y, X_full_ohe, family=sm.families.Poisson()).fit()\n# Raises PerfectSeparationError or LinAlgError: Singular matrix"
  },
  {
    id: 27,
    question: "A junior data scientist writes `X_train_ohe = encoder.fit_transform(X).toarray()` inside a Docker container with 2 GB RAM. The container restarts abruptly. Diagnose the cause.",
    shortAnswer: "Out-Of-Memory (OOM) kill caused by converting a memory-efficient CSR sparse matrix into a massive dense float64 array using `.toarray()`.",
    explanation: "`OneHotEncoder` natively produces a Scipy CSR sparse matrix consuming only megabytes of RAM. Calling `.toarray()` forces NumPy to allocate contiguous memory for all zeros. For large N and K, this dense allocation exceeds the container's 2 GB cgroup memory limit, causing the Linux kernel OOM killer to terminate the container process (SIGKILL / Exit 137).",
    hint: "What does the Linux OOM killer do when a process requests more memory than the Docker container limit?",
    level: "Expert",
    codeExample: "# FATAL: X_dense = ohe.fit_transform(X).toarray() # OOM Crash!\n# SAFE:  X_sparse = ohe.fit_transform(X) # Stays CSR format (~10MB)"
  },
  {
    id: 28,
    question: "Why does Scikit-Learn provide `drop='if_binary'` in `OneHotEncoder` and what architectural problem does it solve?",
    shortAnswer: "It automatically drops the first category for binary features (yielding 1 column) while retaining all K columns for multi-class features, preventing multicollinearity without manual feature slicing.",
    explanation: "In complex datasets with dozens of categorical columns, some are binary (e.g. Yes/No, Active/Inactive) while others are multi-class (e.g. Districts, Departments). Manually configuring which columns to drop requires tedious column indexing. `drop='if_binary'` automatically detects features with exactly 2 unique categories and drops one column, while preserving all K columns for multi-class features.",
    hint: "It only drops a column if cardinality K == 2.",
    level: "Expert",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(drop='if_binary', sparse_output=False)\n# Binary columns become 1 column; multi-class columns stay K columns"
  },
  {
    id: 29,
    question: "How do Entity Embeddings in deep learning compare to One-Hot Encoding for tabular neural networks?",
    shortAnswer: "One-Hot Encoding represents categories as equidistant orthogonal basis vectors without semantic proximity; Entity Embeddings map categories to dense, continuous vectors in R^d where semantic similarity is learned via backpropagation.",
    explanation: "Under One-Hot Encoding, every category pair has distance sqrt(2) and dot product 0. In an Entity Embedding layer (Guo & Berkhahn, 2016), each category is assigned a d-dimensional continuous vector (d << K) in a learnable weight matrix E in R^{K x d}. During backpropagation, categories that have similar business effects (e.g. neighboring Kolkata districts) naturally cluster together in Euclidean space, enabling the network to generalize across related categories.",
    hint: "Word2Vec applied to categorical features in tabular neural networks.",
    level: "Expert",
    codeExample: "import torch.nn as nn\n# K = 2500 categories mapped to d = 16 dense dimensions:\nembedding_layer = nn.Embedding(num_embeddings=2500, embedding_dim=16)"
  },
  {
    id: 30,
    question: "When should One-Hot Encoding be avoided completely in favor of Target Encoding or Feature Hashing?",
    shortAnswer: "When cardinality K exceeds ~50-100 categories and the downstream model is a tree ensemble (LightGBM/XGBoost) or memory is strictly constrained.",
    explanation: "For low cardinality (K < 15-20) and linear/neural models, One-Hot Encoding is optimal. When K > 100 (e.g. postal codes, customer IDs, product SKUs), OHE causes severe dimensionality explosion, destroys Random Forest split effectiveness, and consumes excessive memory. Target Encoding (with smoothing and out-of-fold protection) or Feature Hashing compresses the feature into 1 continuous column or B fixed buckets without information fragmentation.",
    hint: "Cardinality threshold: K < 20 -> OHE; K > 100 -> Target Encoding or Feature Hashing.",
    level: "Expert",
    codeExample: "# Rule of thumb:\n# if cardinality < 20: use OneHotEncoder\n# elif model == 'tree': use TargetEncoder(smooth='auto')\n# else: use FeatureHasher(n_features=64)"
  }
];

export default questions;
