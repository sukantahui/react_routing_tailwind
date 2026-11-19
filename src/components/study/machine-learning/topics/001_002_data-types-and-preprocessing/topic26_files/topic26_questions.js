/**
 * Topic 26: Master Quiz, Comprehensive Evaluation & Certification Assessment
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION (Taxonomies, Core Invariants, Scale Properties)
  // =========================================================================
  {
    id: 1,
    question: "What is the Fundamental Pipeline Invariant that must be strictly enforced across all 26 topics of data preprocessing?",
    shortAnswer: "All transformation parameters (means, standard deviations, min, max, medians, encoding dictionaries) must be learned exclusively on the training partition X_train and applied to test/validation sets via transform() without refitting.",
    explanation: "Fitting any preprocessing transformer across the full dataset before partitioning allows information about the validation or test distribution to bleed into the training phase (data leakage), producing unrealistically optimistic offline scores that fail in production.",
    hint: "Remember the boundary between training and unseen test partitions.",
    level: "Basic",
    codeExample: "# Correct Leakage-Free Architecture\nfrom sklearn.pipeline import Pipeline\npipe = Pipeline([('imputer', SimpleImputer()), ('scaler', StandardScaler()), ('clf', LogisticRegression())])\npipe.fit(X_train, y_train)\nscore = pipe.score(X_test, y_test)"
  },
  {
    id: 2,
    question: "According to Stevens' measurement taxonomy, which scale possesses an absolute, non-arbitrary zero point allowing valid ratio calculations?",
    shortAnswer: "The Ratio scale (e.g., Annual Income, Age, Absolute Temperature in Kelvin).",
    explanation: "On a ratio scale, a true zero indicates the complete absence of the measured attribute. Therefore, statements like 'Applicant A earns twice as much as Applicant B' are mathematically meaningful, unlike on interval scales (e.g. Celsius).",
    hint: "Think about whether 'zero' means absence of the quantity.",
    level: "Basic",
    codeExample: "# Ratio scale operations: Geometric mean and ratios are valid\nincome_ratio = income_A / income_B  # Meaningful\n# Interval scale (Celsius): 40 C is NOT 'twice as hot' as 20 C"
  },
  {
    id: 3,
    question: "In Rubin's missing data taxonomy, how does Missing Completely at Random (MCAR) differ fundamentally from Missing at Random (MAR)?",
    shortAnswer: "Under MCAR, missingness is independent of both observed and unobserved features; under MAR, missingness is conditionally independent of the missing value given observed covariates.",
    explanation: "MCAR means the observed data is a pure random sample of the full population: P(M | Y_obs, Y_mis) = P(M). MAR satisfies P(M | Y_obs, Y_mis) = P(M | Y_obs), meaning conditioning on observed features (like job role) restores unbiased estimation.",
    hint: "Recall: P(M | Y_obs) for MAR vs P(M) for MCAR.",
    level: "Basic",
    codeExample: "# MAR conditioning via grouped imputation\ndf['salary_imp'] = df.groupby('department')['salary'].transform(lambda g: g.fillna(g.median()))"
  },
  {
    id: 4,
    question: "Why does listwise deletion (dropping rows with null values) introduce severe survivor truncation bias when missingness is MNAR?",
    shortAnswer: "Because the probability of missingness depends directly on the unobserved value itself (e.g., high-earning executives withholding compensation).",
    explanation: "Systematically dropping non-respondents when high earners withhold salaries deletes the upper tail of the income distribution. The resulting dataset has an artificially truncated variance and an underestimated population mean.",
    hint: "MNAR missingness is non-ignorable: the data is censored based on the missing attribute.",
    level: "Basic",
    codeExample: "# Severe Bias: Dropping rows under MNAR\n# df.dropna()  <- Disastrous: Truncates distribution tail"
  },
  {
    id: 5,
    question: "What is the breakdown point of an estimator, and what are the breakdown points of the Arithmetic Mean and Sample Median?",
    shortAnswer: "Breakdown point is the minimum fraction of arbitrary contamination that drives an estimate to infinity; Mean has a 0% breakdown point, while Median has a 50% breakdown point.",
    explanation: "A single corrupted or extreme value (e.g. Subhajit earning ₹100 Crore) can pull the sample mean arbitrarily high (0% breakdown point). In contrast, the sample median remains robust until more than 50% of the sample is corrupted.",
    hint: "How many outliers does it take to destroy the mean vs the median?",
    level: "Basic",
    codeExample: "# Robustness comparison\nsample = [10, 12, 14, 15, 1000000]\nnp.mean(sample)    # 200010.2 (Destroyed)\nnp.median(sample)  # 14.0 (Robust)"
  },
  {
    id: 6,
    question: "Why is monotonic integer rank encoding (Label Encoding) strictly invalid for nominal features like 'City' in linear and distance models?",
    shortAnswer: "It introduces a spurious mathematical ordering and metric distance where none exists (e.g. Kolkata=1, Howrah=2 implies Howrah is 'greater than' Kolkata).",
    explanation: "Linear models multiply the integer code by a single weight w, forcing city effects to be strictly linear multiples (City 3 has 3x the effect of City 1). Distance metrics also compute arbitrary differences (City 3 is further from City 1 than City 2).",
    hint: "Nominal categories have no mathematical magnitude or rank order.",
    level: "Basic",
    codeExample: "# Flawed: Linear model with LabelEncoded nominal feature\n# y_hat = w * city_code  <- Spurious ordinal assumption!"
  },
  {
    id: 7,
    question: "What is the primary role of Winkler's prefix modification in the Jaro-Winkler string similarity metric?",
    shortAnswer: "It applies a favorable scaling bonus for matching initial characters (up to 4 letters), matching the empirical reality that human typists rarely misspell the start of words.",
    explanation: "The formula is d_w = d_j + l * p * (1 - d_j), where l is the common prefix length and p = 0.1. This increases the similarity score for pairs like 'barackpore' and 'Barrackpore'.",
    hint: "Prefix scaling parameter p = 0.1 for up to 4 characters.",
    level: "Basic",
    codeExample: "# Jaro-Winkler formula\n# dw = dj + min(4, prefix_len) * 0.1 * (1.0 - dj)"
  },
  {
    id: 8,
    question: "Why is feature scaling unnecessary before training tree-based ensembles like XGBoost, LightGBM, and Random Forests?",
    shortAnswer: "Decision trees evaluate split thresholds monotonically (x <= threshold), which depends purely on the rank ordering of values rather than metric distances or gradient step sizes.",
    explanation: "Whether a feature is scaled to [0, 1], standardized to N(0, 1), or in raw units of [0, 10^7], the relative ranking of sample values is identical. The optimal split point occurs at the exact same rank quantile.",
    hint: "Trees split based on order, not Euclidean distance or gradient curvature.",
    level: "Basic",
    codeExample: "# Feature scaling is redundant for gradient boosted trees\n# XGBClassifier().fit(X_unscaled, y)  <- 100% Valid"
  },

  // =========================================================================
  // TIER 2: MECHANICS (Mathematical Proofs, Gram Matrices, Loss Functions)
  // =========================================================================
  {
    id: 9,
    question: "Prove analytically why the Gram matrix X^T X is singular (det(X^T X) = 0) when all K dummy columns are included alongside an intercept column.",
    shortAnswer: "Because dummy columns are mutually exclusive and exhaustive, their sum identically equals the intercept column vector 1 (sum d_k = 1), creating perfect linear dependence.",
    explanation: "Let X = [1, d_1, ..., d_K]. Then 1*1 - sum(1*d_k) = 0. There exists a non-zero vector c = [1, -1, ..., -1] such that Xc = 0. By Rank-Nullity, rank(X) <= K in a (K+1)-dimensional space. Hence det(X^T X) = 0 and condition number kappa = infinity.",
    hint: "Collinear columns mean the determinant is zero and the matrix cannot be inverted.",
    level: "Intermediate",
    codeExample: "# Mathematical proof of singularity:\n# det(X^T X) == 0.0\n# (X^T X)^(-1) does not exist (Ordinary Least Squares collapses)"
  },
  {
    id: 10,
    question: "In drop-first one-hot encoding, how are the regression coefficients beta_k and intercept beta_0 interpreted?",
    shortAnswer: "The intercept beta_0 represents the expected target value for the omitted reference category, while beta_k represents the marginal contrast (difference) of category k relative to that reference.",
    explanation: "If 'Barrackpore' is omitted, beta_0 is the baseline outcome for Barrackpore applicants. If beta_Kolkata = +3.2, it means Kolkata applicants have an expected target value 3.2 units higher than Barrackpore applicants, ceteris paribus.",
    hint: "Every dummy coefficient measures a difference against the reference baseline.",
    level: "Intermediate",
    codeExample: "# Drop-first contrast interpretation\n# E[y | Barrackpore] = beta_0\n# E[y | Kolkata] = beta_0 + beta_Kolkata"
  },
  {
    id: 11,
    question: "Why does the sample median minimize L1 loss (Mean Absolute Error) while the arithmetic mean minimizes L2 loss (Mean Squared Error)?",
    shortAnswer: "Taking the derivative of sum |y_i - c| yields sum sign(y_i - c) = 0, which requires equal numbers of samples above and below c (the median); derivative of sum (y_i - c)^2 yields sum (y_i - c) = 0 (the mean).",
    explanation: "For L1 loss, each data point exerts equal gradient force (+1 or -1) regardless of distance, so the minimum is at the 50th percentile. For L2 loss, each point exerts force proportional to its distance (2*(y_i - c)), heavily weighting outliers.",
    hint: "d/dc |y - c| = -sign(y - c).",
    level: "Intermediate",
    codeExample: "# Loss comparison\n# L1 loss optimal: c* = argmin sum |y_i - c| = Median(y)\n# L2 loss optimal: c* = argmin sum (y_i - c)^2 = Mean(y)"
  },
  {
    id: 12,
    question: "What is the condition number kappa of a matrix, and how does feature scaling alter the condition number of the Hessian matrix in gradient descent?",
    shortAnswer: "The condition number kappa = lambda_max / lambda_min measures loss surface elongation; scaling continuous features transforms elongated elliptical contours into spherical contours with kappa approx 1.0.",
    explanation: "When features have severe scale disparity (e.g. Age vs Income), the Hessian H has eigenvalues spanning multiple orders of magnitude (kappa > 10^6), forcing gradient descent to oscillate. Scaling normalizes eigenvalues, enabling direct convergence.",
    hint: "Condition number kappa = 1 means perfectly circular/spherical loss contours.",
    level: "Intermediate",
    codeExample: "# Hessian condition number before vs after scaling\n# Unscaled: kappa(H) approx 1600 (Oscillating zig-zag steps)\n# Standardized: kappa(H) approx 1.0 (Direct gradient path)"
  },
  {
    id: 13,
    question: "How is the distance domination ratio rho formulated in unscaled multi-dimensional Euclidean space?",
    shortAnswer: "rho = (Delta x_high)^2 / (Delta x_low)^2; when ranges differ by orders of magnitude (e.g. 10^5 vs 10^1), rho reaches 10^8 to 10^10, rendering the lower-range feature functionally invisible.",
    explanation: "In squared Euclidean distance d^2 = (x_1 - z_1)^2 + (x_2 - z_2)^2, if feature 1 has variance 10^10 and feature 2 has variance 10^2, feature 1 accounts for >99.999% of distance variations in KNN and K-Means clustering.",
    hint: "Additive distances mean squared differences in large-unit features dwarf small ones.",
    level: "Intermediate",
    codeExample: "# Distance domination in KNN\n# (Delta Income)^2 = (50000)^2 = 2.5 * 10^9\n# (Delta Age)^2 = (20)^2 = 400\n# rho = 2.5e9 / 400 = 6,250,000 : 1"
  },
  {
    id: 14,
    question: "What is the mathematical formulation of Bayesian Target Encoding with empirical Bayes m-estimate smoothing?",
    shortAnswer: "S_c = (n_c * y_bar_c + m * mu_global) / (n_c + m), where n_c is category sample size, y_bar_c is intra-category mean, mu_global is global target mean, and m is the smoothing weight.",
    explanation: "When a category has very few samples (n_c small), the estimated target mean is noisy. The m-estimate shrinks the estimate toward the robust prior global mean mu_global, preventing overfitting on rare categories.",
    hint: "Weighted average between category mean and global prior.",
    level: "Intermediate",
    codeExample: "# Bayesian target encoding calculation\nsmoothed_target = (count * cat_mean + m * global_mean) / (count + m)"
  },
  {
    id: 15,
    question: "How does the Interquartile Range (IQR) preserve scaling resolution under RobustScaler when extreme executive outliers are present?",
    shortAnswer: "IQR = Q_3 - Q_1 is calculated between the 25th and 75th percentiles; outliers in the upper tail (e.g. 99th percentile) do not affect Q_3 or Q_1, preserving the denominator.",
    explanation: "In MinMaxScaler, x_max - x_min expands dramatically with an outlier, compressing ordinary middle-class applicants into [0.0, 0.1]. In RobustScaler, IQR remains stable (25% breakdown point), ensuring normal applicants retain wide feature variance.",
    hint: "Outliers outside [Q_1, Q_3] have zero effect on the IQR magnitude.",
    level: "Intermediate",
    codeExample: "# RobustScaler denominator resilience\n# Q1 and Q3 remain identical whether x_max is 50 LPA or 5000 LPA"
  },
  {
    id: 16,
    question: "In two-stage fuzzy entity resolution, why is an exact alias hash map checked before computing Jaro-Winkler distance?",
    shortAnswer: "Historical colloquialisms and acronyms (e.g., 'Calcutta' -> 'Kolkata', 'Hwh' -> 'Howrah') have low string similarity (d_w approx 0.60) despite representing identical real-world entities.",
    explanation: "Jaro-Winkler only measures typographical and character-level similarity. Morphologically distinct colloquial names or abbreviations must be resolved via O(1) domain dictionary lookup before falling back to string distance algorithms.",
    hint: "Fuzzy metrics cannot know that 'Calcutta' and 'Kolkata' are synonyms.",
    level: "Intermediate",
    codeExample: "# Two-stage entity resolution\ncanonical = ALIAS_MAP.get(raw_string, jaro_winkler_match(raw_string))"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE (Leakage Prevention, Memory Safety, Pipelines)
  // =========================================================================
  {
    id: 17,
    question: "What is sparse matrix densification, and what catastrophic failure does it cause in production pipelines?",
    shortAnswer: "When StandardScaler(with_mean=True) is applied to a high-cardinality CSR sparse matrix, subtracting the mean converts every structural zero into a non-zero float, causing fatal Out-Of-Memory (OOM) crashes.",
    explanation: "A sparse matrix with 99.9% zeroes consumes megabytes in CSR format. Converting it into a dense NumPy array by centering all zeroes forces the allocation of gigabytes of RAM, instantly crashing the server.",
    hint: "Subtracting a non-zero mean from zero yields a non-zero value.",
    level: "Advanced",
    codeExample: "# PRODUCTION MEMORY SAFETY FIX:\nscaler = StandardScaler(with_mean=False)  # Preserves CSR sparsity\n# Or use MaxAbsScaler() directly on sparse matrices"
  },
  {
    id: 18,
    question: "How does scikit-learn's ColumnTransformer enable modular, leakage-free preprocessing across heterogeneous feature types?",
    shortAnswer: "It allows distinct sub-pipelines (e.g. median imputer + robust scaler for numericals, most frequent imputer + drop-first OHE for categoricals) to be bundled and fitted strictly on X_train.",
    explanation: "ColumnTransformer executes parallel column transformations and concatenates feature outputs into a single unified design matrix without intermediate disk serialization or data leakage across train/test splits.",
    hint: "Applies different transformers to different column subsets in one pipeline.",
    level: "Advanced",
    codeExample: "# Modular ColumnTransformer\npreprocessor = ColumnTransformer([\n    ('num', Pipeline([('imp', SimpleImputer(strategy='median')), ('scale', RobustScaler())]), num_cols),\n    ('cat', Pipeline([('imp', SimpleImputer(strategy='most_frequent')), ('ohe', OneHotEncoder(drop='first'))]), cat_cols)\n])"
  },
  {
    id: 19,
    question: "Why does mean imputation artificially deflate sample variance, and how can this be demonstrated mathematically?",
    shortAnswer: "Imputing every missing value with the exact mean adds data points where (y_imp - mu)^2 = 0, increasing the denominator N while keeping the numerator sum (y_i - mu)^2 unchanged.",
    explanation: "Var_imp = (sum_{obs} (y_i - mu)^2 + sum_{mis} 0) / (N - 1). Because the numerator is identical to the observed sum of squares but the denominator is larger by the count of missing items, the sample variance strictly decreases.",
    hint: "(mu - mu)^2 = 0, contributing nothing to the sum of squared deviations.",
    level: "Advanced",
    codeExample: "# Variance deflation proof\n# If 30% of data is imputed with the mean, sample variance drops by approx 30%."
  },
  {
    id: 20,
    question: "What is target leakage in categorical target encoding, and what cross-validation architecture eliminates it?",
    shortAnswer: "Target leakage occurs when sample i's own target value y_i is included in computing category c's target mean; it is eliminated using out-of-fold (K-Fold) target encoding.",
    explanation: "If y_i is included in category mean S_c, the encoder leaks the label directly into the feature, producing severe overfitting. Out-of-fold target encoding computes the category mean strictly on the remaining K-1 training folds.",
    hint: "Sample i must not see its own target y_i during encoding.",
    level: "Advanced",
    codeExample: "# Leakage-free Target Encoding\nfrom category_encoders import TargetEncoder\nencoder = TargetEncoder(cols=['city'], cv=5, smoothing=5.0)"
  },
  {
    id: 21,
    question: "When performing cross-field validation, why must business domain constraints (e.g. Experience <= Age - 16) precede missing value imputation?",
    shortAnswer: "Logically invalid or physically impossible rows poison the calculation of donor statistics (means, medians, covariances) if they are not rejected upfront.",
    explanation: "If a dirty record contains Age = 22 and Experience = 45 due to a data-entry slip, including this record in group median calculations corrupts the imputation donors for all downstream records in that cohort.",
    hint: "Garbage in, garbage out: clean impossible values before calculating imputers.",
    level: "Advanced",
    codeExample: "# Pre-imputation consistency audit\nvalid_mask = df['exp'] <= (df['age'] - 16)\ndf = df[valid_mask]"
  },
  {
    id: 22,
    question: "Why does K-Nearest Neighbors imputation require feature scaling prior to neighbor distance computation, creating a cyclic dependency paradox?",
    shortAnswer: "Because KNN computes distances across observed donor features; unscaled features cause donor selection to be dominated by high-magnitude variables.",
    explanation: "To resolve the paradox, compute robust scales (Median/IQR) on fully observed subsets or use iterative imputation (MICE) where scaling and imputation are updated iteratively in a formal DAG.",
    hint: "Imputing via distance requires scaled features, but scaling requires clean features.",
    level: "Advanced",
    codeExample: "# Iterative Imputation / KNN Imputation pipeline\nfrom sklearn.impute import KNNImputer\nimputer = KNNImputer(n_neighbors=3)"
  },
  {
    id: 23,
    question: "How does the Log1p transformation (log(1 + x)) stabilize heavy Pareto right-skewed financial features while protecting zero values?",
    shortAnswer: "It compresses exponential dynamic ranges into linear ranges, and because log(1 + 0) = log(1) = 0, it avoids undefined negative infinities for zero-revenue transactions.",
    explanation: "Standard natural log ln(x) is undefined at x = 0 (approaches negative infinity). In retail loans and e-commerce transactions, many customers have zero spend; log1p smoothly maps 0 to 0 while compressing ₹1 Crore spend into manageable logarithmic scale.",
    hint: "ln(0) = -infinity, but ln(1 + 0) = 0.",
    level: "Advanced",
    codeExample: "# Log1p transformation\nimport numpy as np\nx_log = np.log1p(df['annual_income'])  # log(1 + x)"
  },
  {
    id: 24,
    question: "In stratified train-test splitting, why must stratification be performed on the target variable y rather than feature matrix X in imbalanced classification?",
    shortAnswer: "To guarantee that minority class prevalence (e.g. 2% loan default rate) is preserved identically across both training and testing partitions.",
    explanation: "A pure random split on rare events might assign 0 default cases to the test set by random sampling variation, making validation impossible. Stratified splitting preserves class proportions exactly.",
    hint: "Preserves the marginal distribution P(y) across train and test.",
    level: "Advanced",
    codeExample: "# Stratified Train-Test Split\nfrom sklearn.model_selection import train_test_split\nX_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)"
  },

  // =========================================================================
  // TIER 4: PRODUCTION, SCALABILITY & SERVING GUARDS
  // =========================================================================
  {
    id: 25,
    question: "What is the Cold-Start Inference Guard in production categorical encoding, and what parameter setting implements it?",
    shortAnswer: "An encoding policy that maps previously unseen categorical levels at test/inference time to an all-zeros representation rather than crashing; implemented via handle_unknown='ignore'.",
    explanation: "When an e-commerce customer checks out from an unrecorded town, default handle_unknown='error' raises a ValueError and crashes the web microservice. Setting handle_unknown='ignore' outputs zeroes that safely absorb into the baseline intercept.",
    hint: "Microservices must never crash on novel categorical values.",
    level: "Expert",
    codeExample: "# Cold-Start Fail-Safe Encoder\nencoder = OneHotEncoder(drop='first', handle_unknown='ignore')\n# Unseen 'Asansol' maps cleanly to [0, 0, 0, 0]"
  },
  {
    id: 26,
    question: "Why must MinMaxScaler be deployed with explicit domain clipping bounds in streaming real-time prediction microservices?",
    shortAnswer: "Because streaming real-time applicant features may exceed the training maximum (x > x_max), causing unclipped MinMaxScaler to output values greater than 1.0.",
    explanation: "If training maximum income is ₹95 LPA, an incoming streaming applicant with ₹120 LPA yields x_scaled = 1.274. In neural networks or bounded activations, inputs > 1.0 can cause unexpected saturation. Production scalers must enforce min(1.0, max(0.0, x_scaled)).",
    hint: "Test instances can exceed training bounds: clip to [0, 1].",
    level: "Expert",
    codeExample: "# Scaler Domain Clipping Guard\nx_scaled = np.clip(scaler.transform(X_stream), 0.0, 1.0)"
  },
  {
    id: 27,
    question: "How does feature hashing (the Hashing Trick) eliminate categorical vocabulary storage and cold-start crashes in ultra-high-cardinality streaming systems?",
    shortAnswer: "It applies a fixed hash function h(category) mod B to map arbitrary strings directly into a fixed-size vector space of B buckets with zero stored vocabulary.",
    explanation: "Unlike One-Hot Encoding which must maintain an in-memory dictionary of unique categories, feature hashing requires zero vocabulary storage and never throws cold-start exceptions for unseen strings, trading occasional hash collisions for bounded memory.",
    hint: "Hash trick converts strings directly to column indices modulo B.",
    level: "Expert",
    codeExample: "# Hashing Trick in scikit-learn\nfrom sklearn.feature_extraction import FeatureHasher\nhasher = FeatureHasher(n_features=1024, input_type='string')"
  },
  {
    id: 28,
    question: "Under what conditions will PCA (Principal Component Analysis) produce distorted principal directions if paired with MinMaxScaler instead of StandardScaler?",
    shortAnswer: "MinMaxScaler leaves features with unequal variances and non-zero means; PCA eigenvalue decomposition seeks directions of maximum variance and assumes centered zero-mean variables.",
    explanation: "PCA calculates eigenvectors of the sample covariance matrix X^T X / (N - 1), which assumes E[X] = 0. MinMaxScaler maps to [0, 1] where mu != 0. Furthermore, remaining variance differences cause PCA to align with arbitrary scale ranges rather than true geometric correlation.",
    hint: "PCA requires centered zero-mean data with unit variance.",
    level: "Expert",
    codeExample: "# PCA Rule of Thumb: Always pair with StandardScaler, never MinMaxScaler\nPipeline([('scaler', StandardScaler()), ('pca', PCA(n_components=2))])"
  },
  {
    id: 29,
    question: "Why does target-encoding high-cardinality nominal variables with multi-class targets require one encoding vector per class rather than a single scalar?",
    shortAnswer: "Because in a C-class classification problem, each category has a C-dimensional vector of conditional probabilities [P(y=1|c), P(y=2|c), ..., P(y=C|c)].",
    explanation: "Compressing a multi-class outcome into a single scalar destroys the distinct class relationships. For C classes, a category generates C-1 independent probability features (or C with regularization), preventing information loss.",
    hint: "One probability feature per target class.",
    level: "Expert",
    codeExample: "# Multi-class target encoding produces C columns per categorical feature\n# For 3 classes (Low, Medium, High): produces 3 target probability features"
  },
  {
    id: 30,
    question: "What is the end-to-end mathematical verification checklist that must pass before deploying an industrial preprocessing pipeline to production?",
    shortAnswer: "1. All transformers fit strictly on X_train; 2. Design matrix column rank is full (det(X^T X) > 0); 3. Sparse matrices maintain CSR format (with_mean=False); 4. Encoders ignore unseen levels; 5. Continuous scalers clip out-of-bounds inputs.",
    explanation: "This 5-point verification checklist ensures mathematical invertibility, leakage-free offline generalization estimates, bounded memory consumption, and 100% microservice uptime under real-world adversarial traffic.",
    hint: "Invertibility, memory safety, leakage elimination, cold-start resilience, and domain bounds.",
    level: "Expert",
    codeExample: "# FINAL MASTER VALIDATION:\n# 1. Pipeline.fit(X_tr) -> transform(X_te)\n# 2. det(X^T X) > 0 (No Dummy Trap)\n# 3. issparse(X) preserves True\n# 4. handle_unknown='ignore'\n# 5. np.clip(X_norm, min, max)"
  }
];

export default questions;
