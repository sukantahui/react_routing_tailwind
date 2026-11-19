/**
 * Topic 24: Worked Example 4: Scaling Age and Income Features
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION (Concepts, Scale Disparity, Sensitive vs Invariant)
  // =========================================================================
  {
    id: 1,
    question: "Why does combining unscaled Age (range 20-60) and Annual Income (range ₹3,00,000-₹50,00,000) create a severe pathology in distance-based algorithms?",
    shortAnswer: "Because Euclidean distance squares raw coordinate differences; income differences are ~10,000x larger, completely dominating neighbor calculations and rendering Age functionally irrelevant.",
    explanation: "Squared differences scale quadratically. A ₹50,000 income difference squared is 2,500,000,000, while a 10-year age difference squared is only 100. The algorithm becomes a 1D model operating solely on income.",
    hint: "Compare 10^2 vs 50000^2 in Euclidean distance: sqrt((Δage)^2 + (Δincome)^2).",
    level: "Basic",
    codeExample: "# Unscaled distance calculation\nage_diff = (30 - 20) ** 2       # 100\ninc_diff = (1000000 - 950000) ** 2  # 2,500,000,000!"
  },
  {
    id: 2,
    question: "Which class of machine learning algorithms is completely invariant to monotonic feature scaling?",
    shortAnswer: "Tree-based algorithms (Decision Trees, Random Forests, Gradient Boosted Decision Trees like XGBoost, LightGBM, and CatBoost).",
    explanation: "Decision trees partition features based on rank-order sorting: argmax Information Gain over thresholds t. Because any strictly monotonic transformation g(x) preserves order, the optimal split points remain identical.",
    hint: "Think about which models make axis-aligned step-function cuts based on order ranks.",
    level: "Basic",
    codeExample: "# Tree models require zero feature scaling:\nfrom sklearn.ensemble import RandomForestClassifier\nrf = RandomForestClassifier().fit(X_unscaled, y)  # Completely valid"
  },
  {
    id: 3,
    question: "What is the mathematical definition and output range of Min-Max Normalization?",
    shortAnswer: "x' = (x - x_min) / (x_max - x_min), bounding all transformed training values strictly into the closed unit interval [0, 1].",
    explanation: "Min-Max scaling shifts the minimum to 0 and divides by the range, mapping every feature to the unit hypercube. This is especially useful for algorithms requiring bounded inputs (e.g. image pixels or neural nets with sigmoid activations).",
    hint: "Minimum becomes 0, maximum becomes 1.",
    level: "Basic",
    codeExample: "from sklearn.preprocessing import MinMaxScaler\nscaler = MinMaxScaler()\nX_norm = scaler.fit_transform(X)"
  },
  {
    id: 4,
    question: "What is the mathematical definition of Z-Score Standardization (StandardScaler)?",
    shortAnswer: "z = (x - mu) / sigma, transforming the distribution to have a mean of 0 and a sample variance of 1.",
    explanation: "Standardization centers the feature at zero and rescales by its standard deviation. Unlike Min-Max scaling, the output domain is unbounded (-infinity, +infinity), preserving the relative distance of extreme outliers.",
    hint: "Subtract the sample mean and divide by standard deviation.",
    level: "Basic",
    codeExample: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_std = scaler.fit_transform(X)"
  },
  {
    id: 5,
    question: "Why is RobustScaler specifically recommended for financial income features containing extreme executive outliers?",
    shortAnswer: "Because it centers by the median and scales by the Interquartile Range (IQR = Q3 - Q1), both of which are robust L1 statistics with high breakdown points.",
    explanation: "StandardScaler relies on mean and standard deviation, which are easily skewed by a single ₹50 LPA executive. RobustScaler computes parameters strictly from the middle 50% of the population, leaving normal applicants undistorted.",
    hint: "Recall: x_rob = (x - Median) / (Q3 - Q1).",
    level: "Basic",
    codeExample: "from sklearn.preprocessing import RobustScaler\nscaler = RobustScaler()\nX_rob = scaler.fit_transform(X)"
  },
  {
    id: 6,
    question: "In Principal Component Analysis (PCA), what happens if Age and Income are unscaled?",
    shortAnswer: "The first principal component (PC1) will align almost 100% with the Income axis, because PCA maximizes variance and raw income variance dwarfs age variance.",
    explanation: "PCA seeks orthogonal directions of maximum variance. If income variance is 10^12 and age variance is 10^2, PC1 will capture 99.999% of total variance purely along income, completely discarding age patterns.",
    hint: "PCA eigenvalues correspond to feature variances.",
    level: "Basic",
    codeExample: "from sklearn.decomposition import PCA\n# PCA MUST ALWAYS BE PRECEEDED BY STANDARDSCALER\npca = PCA(n_components=2).fit(StandardScaler().fit_transform(X))"
  },
  {
    id: 7,
    question: "How does unscaled feature disparity affect L2-regularized Ridge Regression penalties?",
    shortAnswer: "The L2 penalty lambda * sum(w_j^2) disproportionately penalizes the large coefficient of Age while barely touching the tiny coefficient of Income, distorting regularization.",
    explanation: "Because income is in lakhs, its coefficient w_inc must be tiny (e.g. 10^-5) to predict target spend, whereas w_age is large (~0.5). Regularization penalizes w_age^2 heavily while leaving w_inc^2 virtually unregularized.",
    hint: "Coefficients are inversely proportional to feature scale.",
    level: "Basic",
    codeExample: "# Ridge regression requires feature scaling to penalize weights equally\nfrom sklearn.linear_model import Ridge\nmodel = Ridge(alpha=1.0).fit(StandardScaler().fit_transform(X), y)"
  },
  {
    id: 8,
    question: "What is the primary vulnerability of MinMaxScaler when applied to right-skewed income data containing extreme outliers?",
    shortAnswer: "The extreme maximum inflates the denominator (x_max - x_min), compressing 90% of normal middle-class incomes into a narrow, squashed interval like [0.0, 0.15].",
    explanation: "If a CEO earning ₹1 Crore enters a dataset where ordinary incomes range from ₹3L to ₹15L, the maximum jumps to 100. A normal ₹15L earner is mapped to (15 - 3)/(100 - 3) = 0.12, destroying feature variance across normal applicants.",
    hint: "The outlier stretches the denominator, squashing everyone else near zero.",
    level: "Basic",
    codeExample: "# Outlier squashing demonstration\nx_min, x_max = 3.0, 100.0\nprint([(x - x_min)/(x_max - x_min) for x in [3.0, 6.0, 12.0, 15.0]])"
  },

  // =========================================================================
  // TIER 2: MECHANICS & OPTIMIZATION FORMULATIONS (Hessian, Contours)
  // =========================================================================
  {
    id: 9,
    question: "How does unscaled feature scale deform the quadratic loss surface J(w) in Gradient Descent?",
    shortAnswer: "It deforms spherical loss contours into an elongated, eccentric elliptical canyon with an extremely high Hessian condition number kappa = lambda_max / lambda_min >> 1.",
    explanation: "The Hessian matrix of second derivatives H = (1/N) * X^T X reflects feature variances. When income variance is massive compared to age, the loss surface forms steep walls along w_inc and a flat valley along w_age.",
    hint: "Eccentric ellipses cause gradients to oscillate perpendicularly across the valley.",
    level: "Intermediate",
    codeExample: "# Hessian condition number calculation\nimport numpy as np\nH = (1/len(X)) * np.dot(X.T, X)\nkappa = np.linalg.cond(H)\nprint('Condition number:', kappa)"
  },
  {
    id: 10,
    question: "Why does gradient descent oscillate violently (zig-zag) on an unscaled elliptical loss surface?",
    shortAnswer: "Because the negative gradient vector points perpendicular to contour tangents, directing updates across the steep canyon walls rather than toward the global minimum.",
    explanation: "A learning rate eta large enough to make progress along the flat Age direction causes gradient explosion and overshooting along the steep Income direction, requiring tiny step sizes and thousands of epochs.",
    hint: "Gradients are orthogonal to level curves, not pointing at the center.",
    level: "Intermediate",
    codeExample: "# Gradient update: w = w - lr * grad\n# Large grad_inc causes overshoot; small grad_age causes stalling"
  },
  {
    id: 11,
    question: "Prove mathematically that Z-Score Standardization transforms the Hessian of uncorrelated features into an identity matrix.",
    shortAnswer: "When features are standardized, Var(x_j) = 1 and Cov(x_j, x_k) = 0, meaning H = (1/N) * X^T X = I, yielding a condition number kappa = 1.0 and spherical contours.",
    explanation: "With H = I, all eigenvalues are lambda = 1. The loss surface is perfectly spherical. Gradients point directly at the global minimum w*, allowing gradient descent to converge along the shortest orthogonal path in minimal steps.",
    hint: "Condition number kappa = 1/1 = 1.0 for spherical contours.",
    level: "Intermediate",
    codeExample: "# Standardized Hessian condition number:\n# H = [[1.0, 0.0], [0.0, 1.0]] ==> cond(H) == 1.0"
  },
  {
    id: 12,
    question: "What is the breakdown point of the sample median and Interquartile Range (IQR) used in RobustScaler?",
    shortAnswer: "The median has a 50% breakdown point, and the IQR has a 25% breakdown point, meaning up to 25% of the data can be arbitrary extreme outliers without corrupting the scaler.",
    explanation: "In contrast, the sample mean and standard deviation have a 0% breakdown point: a single infinite outlier moves the mean and standard deviation to infinity. This proves the robust mathematical resilience of RobustScaler.",
    hint: "Breakdown point measures the proportion of contaminated data a statistic can handle.",
    level: "Intermediate",
    codeExample: "# Breakdown point comparison:\n# Mean: 0% breakdown point (non-robust)\n# Median: 50% breakdown point (robust)"
  },
  {
    id: 13,
    question: "What happens during online inference if a new loan applicant has an Annual Income higher than the training set x_max under MinMaxScaler?",
    shortAnswer: "The transformed value exceeds 1.0 (x' > 1.0), violating the expected unit-interval assumption of downstream neural networks or bounded models.",
    explanation: "If x_max_train = 48 LPA, an applicant with 60 LPA yields x' = (60 - 3.2)/(48 - 3.2) = 1.268. If the downstream model expects inputs in [0, 1], out-of-bounds inputs can cause unexpected activation saturation.",
    hint: "MinMaxScaler does not clip by default unless clip=True is set.",
    level: "Intermediate",
    codeExample: "# Bounded inference with clip=True\nscaler = MinMaxScaler(clip=True)\nX_test_bounded = scaler.transform(X_test)"
  },
  {
    id: 14,
    question: "How does the Log1p transformation x_log = ln(1 + x) mathematically assist in scaling heavy-tailed income features?",
    shortAnswer: "It compresses the long right tail exponentially, converting Pareto or log-normal distributions into approximately Gaussian symmetric bells before standardization.",
    explanation: "Because ln(x) grows sub-linearly, large income differences (e.g. ₹40L vs ₹45L) are compressed much more than small differences (₹3L vs ₹4L). Adding 1 ensures ln(1 + 0) = 0 for zero-income records.",
    hint: "Log transformation stabilizes variance and linearizes multiplicative growth.",
    level: "Intermediate",
    codeExample: "import numpy as np\nlog_income = np.log1p(df['income_lpa'])\nz_log_income = StandardScaler().fit_transform(log_income.values.reshape(-1, 1))"
  },
  {
    id: 15,
    question: "Why does the RBF kernel in Support Vector Machines (SVM) fail completely if Age and Income are unscaled?",
    shortAnswer: "The kernel computes K(x, x') = exp(-gamma * ||x - x'||^2); huge unscaled income differences make the exponent extremely negative, collapsing the kernel to zero for almost all distinct pairs.",
    explanation: "If income difference is ₹50,000, squared norm is 2.5 * 10^9. Multiplying by gamma yields an immense negative number, so exp(-huge) = 0. The kernel matrix becomes the identity matrix, destroying the SVM's dual optimization.",
    hint: "Exponential decay collapses to zero when squared distance is massive.",
    level: "Intermediate",
    codeExample: "# SVM RBF kernel with unscaled features collapses:\n# K(x_i, x_j) ≈ 0 for all i != j"
  },
  {
    id: 16,
    question: "In K-Means clustering on customer profiles, what visual shape do clusters form if Income has 10,000x the scale of Age?",
    shortAnswer: "Clusters form vertical parallel slices or horizontal bands split strictly along the Income axis, completely ignoring customer Age.",
    explanation: "Since distance is dominated 99.99% by Income, the centroid assignment step argmin ||x - mu_k|| only cares about minimizing income gaps. Cluster boundaries become parallel hyperplanes perpendicular to the income axis.",
    hint: "Centroids separate purely along the high-magnitude dimension.",
    level: "Intermediate",
    codeExample: "# K-Means clustering requires feature scaling\nfrom sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3).fit(StandardScaler().fit_transform(X))"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE & PRODUCTION PIPELINES (Leakage, Sparse Matrices)
  // =========================================================================
  {
    id: 17,
    question: "How does 'Fit-Before-Split' feature scaling cause subtle data leakage in cross-validation?",
    shortAnswer: "Computing mean mu and standard deviation sigma across the entire dataset bleeds test-set distribution parameters into training features, generating over-optimistic evaluation metrics.",
    explanation: "If the test partition contains extreme income outliers, the training set's standard deviation is artificially inflated, masking how the model handles unseen distributions. Scalers must strictly follow fit(X_train) and transform(X_test).",
    hint: "Never call fit() on the complete dataset before train_test_split().",
    level: "Advanced",
    codeExample: "# CORRECT LEAKAGE-FREE PIPELINE:\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nX_train, X_test = train_test_split(X, test_size=0.2, random_state=42)\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)  # Fit on train only\nX_test_s = scaler.transform(X_test)         # Transform test"
  },
  {
    id: 18,
    question: "Why does applying `StandardScaler(with_mean=True)` to a sparse CSR matrix cause a fatal Out-Of-Memory (OOM) crash?",
    shortAnswer: "Subtracting the feature mean (x - mu) from structural zeroes converts millions of zero entries into non-zero floats, turning a compact sparse matrix into a massive dense matrix.",
    explanation: "Sparse CSR matrices store only non-zero coordinates to save gigabytes of memory. Since mu != 0, subtracting mu from every coordinate densifies the matrix, instantly exhausting server RAM.",
    hint: "Zero minus a non-zero mean is non-zero!",
    level: "Advanced",
    codeExample: "# Sparse-safe scaling:\nscaler = StandardScaler(with_mean=False)  # Scales variance without centering\n# Or use MaxAbsScaler:\nfrom sklearn.preprocessing import MaxAbsScaler\nscaler_maxabs = MaxAbsScaler()"
  },
  {
    id: 19,
    question: "What is `MaxAbsScaler` and in what production scenario is it the mathematically optimal choice?",
    shortAnswer: "It scales each feature by dividing by its maximum absolute value: x' = x / |x_max| in [-1, 1], perfectly preserving structural zeroes in sparse feature matrices.",
    explanation: "Because zero divided by |x_max| is still zero (0 / |x_max| = 0), MaxAbsScaler does not destroy matrix sparsity. It is the industry standard for scaling TF-IDF text vectors and one-hot matrices.",
    hint: "Divides by max absolute value without subtracting mean.",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import MaxAbsScaler\nsparse_scaled = MaxAbsScaler().fit_transform(X_sparse)"
  },
  {
    id: 20,
    question: "In Scikit-Learn, how do you construct a production ColumnTransformer that scales Age with StandardScaler, Income with RobustScaler, and One-Hot encodes Gender?",
    shortAnswer: "By defining separate transformation branches inside ColumnTransformer, routing ['age'] to StandardScaler, ['income'] to RobustScaler, and ['gender'] to OneHotEncoder.",
    explanation: "ColumnTransformer prevents cross-type contamination by isolating continuous features with different distributional properties to specialized scalers while encoding categoricals simultaneously.",
    hint: "ColumnTransformer([('std', ...), ('rob', ...), ('cat', ...)]).",
    level: "Advanced",
    codeExample: "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, RobustScaler, OneHotEncoder\n\nct = ColumnTransformer([\n    ('scale_age', StandardScaler(), ['age']),\n    ('scale_inc', RobustScaler(), ['income_lpa']),\n    ('cat_gender', OneHotEncoder(drop='first'), ['gender'])\n])"
  },
  {
    id: 21,
    question: "Why should you NOT apply feature scaling to target variables y in standard regression models?",
    shortAnswer: "Scaling y is unnecessary because linear models naturally adjust the bias intercept b and weight magnitudes to match the target scale without affecting gradient direction or loss convexity.",
    explanation: "While scaling features X changes the geometry of loss contours, scaling y simply multiplies the loss function by a scalar constant (c^2), which can be absorbed into the learning rate eta.",
    hint: "Features affect the Hessian; targets only scale overall loss magnitude.",
    level: "Advanced",
    codeExample: "# Do NOT scale target y unless using specialized neural network output layers\nmodel.fit(X_train_scaled, y_train)  # y_train remains in original units (₹ LPA)"
  },
  {
    id: 22,
    question: "In an asynchronous microservice serving real-time predictions, how should feature scaling parameters be serialized?",
    shortAnswer: "Serialize the fitted Scikit-Learn Pipeline (containing the ColumnTransformer and trained model) into a versioned artifact (joblib/ONNX) to guarantee deterministic inference.",
    explanation: "The microservice must never recompute scaling parameters on incoming single-request JSON payloads. It loads the frozen training parameters (mean, std, median) and executes pipeline.predict() directly.",
    hint: "Never call fit() during streaming API serving.",
    level: "Advanced",
    codeExample: "import joblib\n# Save production pipeline\njoblib.dump(fitted_pipeline, 'credit_scoring_v2.1.joblib')\n# Load in production inference server\npipeline = joblib.load('credit_scoring_v2.1.joblib')"
  },
  {
    id: 23,
    question: "What is QuantileTransformer and when is it preferred over Z-Score standardization for income features?",
    shortAnswer: "QuantileTransformer maps features to a uniform or normal distribution using empirical cumulative distribution function (ECDF) rank quantiles, completely eliminating the effect of extreme income outliers.",
    explanation: "It transforms features such that an applicant at the 90th percentile is mapped to 0.90 regardless of whether their income is ₹30 LPA or ₹300 LPA. It smooths out multi-modal distributions and handles severe non-linearity.",
    hint: "Non-linear transformation based on empirical quantile ranks.",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import QuantileTransformer\nqt = QuantileTransformer(output_distribution='normal', random_state=42)\nX_trans = qt.fit_transform(df[['income_lpa']])"
  },
  {
    id: 24,
    question: "What is PowerTransformer (Box-Cox / Yeo-Johnson) and what mathematical property does it optimize?",
    shortAnswer: "It applies a parameterized power transformation x^(lambda) that estimates the optimal parameter lambda via Maximum Likelihood Estimation to stabilize variance and minimize skewness.",
    explanation: "Box-Cox requires strictly positive values (x > 0), while Yeo-Johnson supports zero and negative values. It finds the mathematical power exponent that brings the feature closest to a Gaussian normal distribution.",
    hint: "Estimates parameter lambda to maximize Gaussian likelihood.",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import PowerTransformer\npt = PowerTransformer(method='yeo-johnson')\nX_gaussian = pt.fit_transform(df[['age', 'income_lpa']])"
  },

  // =========================================================================
  // TIER 4: SCALABILITY, HEAVY TAILS & ADVANCED EDGE CASES (Ops)
  // =========================================================================
  {
    id: 25,
    question: "What is the computational complexity of fitting StandardScaler vs RobustScaler on a dataset of size N?",
    shortAnswer: "StandardScaler is O(N) linear time, while RobustScaler is O(N log N) time because computing the median and percentiles requires sorting.",
    explanation: "StandardScaler computes mean and variance in a single streaming pass (or two passes) over N records. RobustScaler must sort the entire array to compute Q1, Q2, and Q3, which costs O(N log N) operations.",
    hint: "Sorting dominates quantile estimation: O(N log N).",
    level: "Expert",
    codeExample: "# Complexity check:\n# StandardScaler: O(N) streaming accumulator\n# RobustScaler: O(N log N) sorting step"
  },
  {
    id: 26,
    question: "In deep neural networks, why does Batch Normalization (BatchNorm) reduce the strict necessity of precise input feature scaling?",
    shortAnswer: "Because BatchNorm dynamically normalizes activations at each hidden layer to zero mean and unit variance across mini-batches during training, mitigating internal covariate shift.",
    explanation: "While input scaling is still recommended for the first layer, BatchNorm ensures that downstream intermediate representations do not suffer from explosive scale disparities as weights update.",
    hint: "Normalizes mini-batch representations inside hidden layers.",
    level: "Expert",
    codeExample: "# PyTorch BatchNorm layer\n# nn.BatchNorm1d(num_features=64)"
  },
  {
    id: 27,
    question: "How do you detect feature scale drift in production when the macroeconomic income distribution shifts over time?",
    shortAnswer: "By continuously calculating Population Stability Index (PSI) and tracking Kolmogorov-Smirnov (KS) test statistics between live production inference features and baseline training features.",
    explanation: "If inflation or wage growth shifts the income distribution, the frozen scaler parameters (mu_train, sigma_train) will map live applicants to higher standardized scores, causing systematic scoring drift.",
    hint: "KS-test evaluates divergence between training and serving CDFs.",
    level: "Expert",
    codeExample: "from scipy.stats import ks_2samp\nstat, p_val = ks_2samp(train_incomes, live_production_incomes)\n# If p_val < 0.05, trigger drift alert!"
  },
  {
    id: 28,
    question: "Under Stochastic Gradient Descent (SGD) on streaming datasets, how can you update StandardScaler parameters incrementally without storing historical data?",
    shortAnswer: "By maintaining Welford's running algorithm for online variance and mean estimation: mu_k = mu_{k-1} + (x_k - mu_{k-1})/k.",
    explanation: "Welford's algorithm allows computing exact sample mean and variance in O(1) space and O(1) time per streaming point, enabling incremental online scaling without storing historical buffers.",
    hint: "Welford's one-pass running variance algorithm.",
    level: "Expert",
    codeExample: "# Scikit-Learn partial_fit for streaming scaling:\nfrom sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nscaler.partial_fit(batch_1)\nscaler.partial_fit(batch_2)"
  },
  {
    id: 29,
    question: "When applying PCA followed by Logistic Regression, why must you use StandardScaler rather than MinMaxScaler?",
    shortAnswer: "Because PCA is fundamentally an eigenvalue decomposition of the covariance or correlation matrix, which requires data to be centered at zero with standardized unit variance.",
    explanation: "MinMaxScaler shifts features to [0, 1], where the mean is not zero (mu != 0). Covariance matrices calculated on uncentered data reflect arbitrary origin shifts rather than true directional dispersion.",
    hint: "Covariance requires centering: E[(X - mu_x)(Y - mu_y)].",
    level: "Expert",
    codeExample: "# PCA assumption check: Covariance requires zero mean\n# Always pair PCA with StandardScaler, never MinMaxScaler"
  },
  {
    id: 30,
    question: "Why does unscaled feature scaling distort Lasso (L1) feature selection far more severely than Ridge (L2)?",
    shortAnswer: "Lasso applies a constant shrinkage penalty lambda * |w_j|; features with large scales have naturally tiny coefficients, causing Lasso to penalize and eliminate them prematurely.",
    explanation: "Because Income is in rupees, its coefficient w_inc is naturally tiny (~0.00001). Lasso's soft-thresholding operator S_lambda(w) = sign(w) * max(0, |w| - lambda) will instantly drive w_inc to exactly zero, falsely pruning the most predictive feature!",
    hint: "Lasso sets weights to zero if |w| < lambda.",
    level: "Expert",
    codeExample: "# Fatal Lasso feature pruning on unscaled data:\nfrom sklearn.linear_model import Lasso\n# Income will be completely eliminated because w_inc < lambda!\nmodel = Lasso(alpha=0.1).fit(X_unscaled, y)"
  }
];

export default questions;
