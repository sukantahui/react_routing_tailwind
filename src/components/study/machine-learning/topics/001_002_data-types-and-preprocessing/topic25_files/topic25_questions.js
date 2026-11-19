/**
 * Topic 25: Practice Problems — Comprehensive Capstone Benchmark
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION (Lifecycle, Taxonomies, Core Invariants)
  // =========================================================================
  {
    id: 1,
    question: "What is the Fundamental Pipeline Invariant that must be strictly enforced across all 6 stages of data preprocessing?",
    shortAnswer: "All transformation parameters (means, standard deviations, min, max, medians, vocabularies) must be estimated exclusively on the training partition X_train and applied to test data via transform().",
    explanation: "Estimating any preprocessing parameter over the entire dataset before splitting bleeds validation/test distribution information into the training phase (data leakage), producing unrealistically optimistic offline scores that fail in production.",
    hint: "Think about the boundary between X_train and X_test.",
    level: "Basic",
    codeExample: "# Correct Leakage-Free Architecture\nimputer.fit(X_train)\nX_train_imp = imputer.transform(X_train)\nX_test_imp = imputer.transform(X_test)"
  },
  {
    id: 2,
    question: "In Rubin's missing data taxonomy, how does Missing at Random (MAR) differ fundamentally from Missing Not at Random (MNAR)?",
    shortAnswer: "Under MAR, missingness is explainable by observed covariates (e.g., job role); under MNAR, the probability of missingness depends directly on the unobserved value itself (e.g., high earners withholding CTC).",
    explanation: "Conditioning on observed features restores unbiased estimation under MAR. Under MNAR, the data distribution is truncated, and listwise deletion or simple mean imputation creates severe survivor bias.",
    hint: "Recall: P(M | Y_obs, Y_mis) = P(M | Y_obs) for MAR vs P(M | Y_obs, Y_mis) != P(M | Y_obs) for MNAR.",
    level: "Basic",
    codeExample: "# MAR conditioning in Pandas\ndf['salary_imp'] = df.groupby('role')['salary'].transform(lambda g: g.fillna(g.median()))"
  },
  {
    id: 3,
    question: "Why is the sample median mathematically preferred over the arithmetic mean for imputing continuous salary records in human payrolls?",
    shortAnswer: "Because salary distributions have heavy Pareto/log-normal right tails; the median minimizes L1 loss (absolute error) and is immune to high-earning executive outliers.",
    explanation: "Arithmetic mean minimizes squared Euclidean loss (L2), which is pulled sharply upward by executive salaries. In our Salt Lake cohort, the mean is ₹18.06 LPA while the median is ₹14.15 LPA; imputing the mean overestimates junior salaries.",
    hint: "Median minimizes sum |y_i - c|.",
    level: "Basic",
    codeExample: "# L1-optimal median imputation\nmedian_val = np.median(observed_salaries)"
  },
  {
    id: 4,
    question: "How does Winkler's prefix modification improve standard Jaro string similarity for municipal entity resolution?",
    shortAnswer: "It adds a favorable scaling bonus for matching initial characters (up to 4 letters), matching the empirical reality that human typists rarely misspell the first few letters.",
    explanation: "The formula is d_w = d_j + l * p * (1 - d_j), where l is the common prefix length and p = 0.1. It gives high similarity to pairs like 'barackpore' and 'Barrackpore'.",
    hint: "Prefix scaling parameter p = 0.1 for up to 4 characters.",
    level: "Basic",
    codeExample: "# Jaro-Winkler prefix bonus\n# d_w = d_j + min(4, prefix_len) * 0.1 * (1.0 - d_j)"
  },
  {
    id: 5,
    question: "What is the Dummy Variable Trap in nominal feature encoding?",
    shortAnswer: "The mathematical singularity occurring when all K dummy indicator columns are included alongside an intercept column, creating perfect multicollinearity: sum d_k = 1.",
    explanation: "Because the sum of all K dummy columns equals the constant intercept column, the columns are linearly dependent. The Gram matrix X^T X has a determinant of zero and an infinite condition number.",
    hint: "Linear dependence: 1 * column_ones - sum(dummy_columns) = 0.",
    level: "Basic",
    codeExample: "# Resolve Dummy Variable Trap:\nOneHotEncoder(drop='first')"
  },
  {
    id: 6,
    question: "Why does unscaled Euclidean distance render Age functionally invisible when paired with Annual Income in KNN?",
    shortAnswer: "Because Euclidean distance squares coordinate differences; income differences are ~10,000x larger than age differences, dominating squared distance by a factor of 10^8 to 10^10.",
    explanation: "A 10-year age gap squared is 100. A ₹50,000 income gap squared is 2,500,000,000. In unscaled space, KNN classifies applicants based almost 100% on income, ignoring age.",
    hint: "Compare (Δage)^2 vs (Δincome)^2.",
    level: "Basic",
    codeExample: "# Unscaled distance dominance\nd_sq = (age_diff)**2 + (income_diff)**2  # income_diff**2 dominates 99.999%"
  },
  {
    id: 7,
    question: "Which of the following models is completely invariant to monotonic feature scaling: Logistic Regression, SVM with RBF kernel, or Random Forest?",
    shortAnswer: "Random Forest (and all decision tree ensembles).",
    explanation: "Decision trees evaluate candidate splits based on the rank ordering of feature values to maximize information gain. Any strictly monotonic scaling transformation preserves rank order, leaving split decisions identical.",
    hint: "Tree-based models make axis-aligned rank cuts.",
    level: "Basic",
    codeExample: "# Random Forest requires zero scaling:\nRandomForestClassifier().fit(X_unscaled, y)"
  },
  {
    id: 8,
    question: "What is the breakdown point of the sample median and Interquartile Range (IQR) used in RobustScaler?",
    shortAnswer: "The median has a 50% breakdown point, and the IQR has a 25% breakdown point, making RobustScaler immune to up to 25% arbitrary wealth outliers.",
    explanation: "Sample mean and standard deviation have a 0% breakdown point: a single infinite outlier destroys both. RobustScaler calculates scaling parameters strictly from the middle 50% of the distribution.",
    hint: "Breakdown point measures outlier resistance.",
    level: "Basic",
    codeExample: "# RobustScaler parameters:\n# Center = Median (50% breakdown), Scale = IQR (25% breakdown)"
  },

  // =========================================================================
  // TIER 2: MECHANICS & MATHEMATICAL FORMULATIONS (Proofs & Derivations)
  // =========================================================================
  {
    id: 9,
    question: "Prove mathematically that single mean imputation shrinks sample variance by approximately (1 - f), where f is the missing fraction.",
    shortAnswer: "Because every imputed record has deviation (y_j - y_bar) = 0, the numerator of sample variance equals that of only N_obs rows, yielding S^2_imputed = [(N_obs - 1)/(N - 1)] * S^2_obs ≈ (1 - f) * S^2_obs.",
    explanation: "If 25% of records are missing (f = 0.25), imputing the constant mean shrinks total sample variance by ~25%. This falsely narrows confidence intervals and inflates t-statistics, inducing Type I errors.",
    hint: "The squared deviation of an imputed mean from the sample mean is zero.",
    level: "Intermediate",
    codeExample: "# Variance reduction formula:\n# Var(Y_completed) = [(N_obs - 1) / (N - 1)] * Var(Y_obs) ≈ (1 - f) * Var(Y_obs)"
  },
  {
    id: 10,
    question: "In drop-first linear regression, how is the intercept beta_0 statistically interpreted?",
    shortAnswer: "beta_0 represents the expected target value for an individual belonging to the omitted baseline reference category, holding all continuous covariates at zero.",
    explanation: "When a record belongs to the dropped reference class, all remaining dummy indicators are 0. Thus, y_hat = beta_0 + 0 = beta_0. The coefficients beta_k represent contrasts against this baseline.",
    hint: "What happens when all active dummy indicators are 0?",
    level: "Intermediate",
    codeExample: "# Baseline reference regression:\n# E[Y | Category = Reference] = beta_0"
  },
  {
    id: 11,
    question: "What is the mathematical equation for Bayesian Target Encoding with m-estimate smoothing?",
    shortAnswer: "S_i = (n_i * y_bar_i + m * y_bar_global) / (n_i + m), where n_i is the category sample count, y_bar_i is the category target mean, and m is the smoothing weight.",
    explanation: "When sample size n_i is small, the prior global mean y_bar_global dominates, preventing overfitting on rare categories. When n_i is large, the empirical category mean y_bar_i dominates.",
    hint: "A convex combination of category mean and global prior mean.",
    level: "Intermediate",
    codeExample: "# Bayesian target smoothing formula\nsmoothed = (count * local_mean + m * global_mean) / (count + m)"
  },
  {
    id: 12,
    question: "How does feature standardization transform the Hessian matrix of uncorrelated features in Gradient Descent?",
    shortAnswer: "It rescales feature variances to unity, transforming the Hessian into an identity matrix H = I with condition number kappa(H) = 1.0, turning elliptical contours into concentric spheres.",
    explanation: "With kappa = 1, eigenvalues are equal. Gradients point directly at the global minimum w*, allowing gradient descent to converge along the shortest orthogonal path without zig-zagging.",
    hint: "Condition number kappa = 1.0 represents perfect spherical symmetry.",
    level: "Intermediate",
    codeExample: "# Hessian condition number under standardization:\n# H = [[1.0, 0.0], [0.0, 1.0]] ==> cond(H) == 1.0"
  },
  {
    id: 13,
    question: "In Distance-Weighted KNN Imputation, why is a small epsilon (e.g. 10^-5) added to the denominator of inverse distance weights w_i = 1 / (d_i + eps)?",
    shortAnswer: "To prevent division-by-zero runtime exceptions when a query record has identical feature coordinates to an existing donor (d_i = 0).",
    explanation: "If a donor is an exact match to the query applicant, d_i = 0. Adding epsilon ensures numerical stability and bounds the weight smoothly to 1 / eps.",
    hint: "Division by zero guard.",
    level: "Intermediate",
    codeExample: "weights = [1.0 / (d + 1e-5) for d in distances]"
  },
  {
    id: 14,
    question: "What is the geometric distance between any two distinct one-hot encoded standard basis vectors e_j and e_k in R^K?",
    shortAnswer: "The Euclidean distance is exactly sqrt(2) ≈ 1.4142.",
    explanation: "||e_j - e_k|| = sqrt(1^2 + (-1)^2 + 0 + ...) = sqrt(2). This guarantees that One-Hot Encoding treats all categories as mutually equidistant in hyper-dimensional space.",
    hint: "Subtract [1, 0] from [0, 1] and compute the L2 norm.",
    level: "Intermediate",
    codeExample: "dist = np.linalg.norm(np.array([1, 0, 0]) - np.array([0, 1, 0]))  # 1.4142"
  },
  {
    id: 15,
    question: "In Stochastic Regression Imputation (MICE), why must a random residual shock epsilon ~ N(0, sigma_hat^2_e) be added to the linear prediction?",
    shortAnswer: "To restore the natural scatter and population variance of the distribution, overcoming the variance deflation pathology of deterministic regression.",
    explanation: "Deterministic regression places all imputed points exactly on the regression hyperplane, artificially boosting the correlation r(X, Y) and collapsing residual error. Stochastic noise preserves natural dispersion.",
    hint: "Deterministic regression treats conditional expectation as known truth.",
    level: "Intermediate",
    codeExample: "noise = random.gauss(0.0, residual_std)\ny_stochastic = beta_0 + beta_1 * x + noise"
  },
  {
    id: 16,
    question: "What is the mathematical formulation of the Jaro distance between two strings s1 and s2?",
    shortAnswer: "d_j = (1/3) * (m / |s1| + m / |s2| + (m - t) / m), where m is the number of matching characters and t is half the number of transpositions.",
    explanation: "Matching characters must lie within a window of max(|s1|, |s2|) // 2 - 1. If m = 0, similarity is zero. Jaro distance forms the foundation of the Jaro-Winkler metric.",
    hint: "Three-way average of precision, recall, and transposition order.",
    level: "Intermediate",
    codeExample: "# Jaro distance formula\njaro = (matches/len1 + matches/len2 + (matches - transpositions/2)/matches) / 3.0"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE & PRODUCTION PIPELINES (Leakage, Microservices)
  // =========================================================================
  {
    id: 17,
    question: "Why should `OneHotEncoder(handle_unknown='ignore')` be favored over `handle_unknown='error'` in real-time inference microservices?",
    shortAnswer: "Because 'error' crashes the web API when an unlisted category appears, whereas 'ignore' outputs a safe all-zeros vector that gracefully defaults to the reference intercept.",
    explanation: "In production e-commerce or credit portals, users will inevitably enter unlisted cities. Outputting an all-zeros vector allows the model to process the transaction safely without crashing the backend.",
    hint: "Graceful degradation vs runtime crash.",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(handle_unknown='ignore')\nohe.fit([['Kolkata'], ['Barrackpore']])\nprint(ohe.transform([['Asansol']]).toarray())  # [[0., 0.]]"
  },
  {
    id: 18,
    question: "Why does applying `StandardScaler(with_mean=True)` to a sparse CSR matrix cause a catastrophic Out-Of-Memory (OOM) crash?",
    shortAnswer: "Subtracting a non-zero mean (x - mu) from structural zeroes turns millions of zero coordinates into dense non-zero floats, exploding RAM usage from megabytes to gigabytes.",
    explanation: "Sparse CSR matrices store only non-zero coordinates. Since mu != 0, subtracting mu from zero yields -mu, instantly converting the sparse matrix into a dense array.",
    hint: "Zero minus non-zero is non-zero!",
    level: "Advanced",
    codeExample: "# Sparse-safe scaling:\nStandardScaler(with_mean=False)\n# Or MaxAbsScaler:\nfrom sklearn.preprocessing import MaxAbsScaler"
  },
  {
    id: 19,
    question: "How does Scikit-Learn's ColumnTransformer prevent cross-feature contamination in mixed tabular pipelines?",
    shortAnswer: "By isolating designated feature subsets into dedicated transformer pipelines and concatenating their transformed arrays horizontally into a single clean feature matrix.",
    explanation: "ColumnTransformer routes continuous columns to scalers, nominal columns to OneHotEncoders, and missing columns to imputers without allowing one column's preprocessing logic to contaminate another.",
    hint: "ColumnTransformer routes sub-arrays to specific transformers.",
    level: "Advanced",
    codeExample: "from sklearn.compose import ColumnTransformer\nct = ColumnTransformer([\n    ('num', StandardScaler(), ['age', 'income']),\n    ('cat', OneHotEncoder(drop='first'), ['city', 'gender'])\n])"
  },
  {
    id: 20,
    question: "What is Out-of-Fold (OOF) Target Encoding and why is it essential to prevent target leakage during training?",
    shortAnswer: "It calculates category target averages for each training fold using only the remaining K - 1 folds, ensuring no row's own target label informs its encoded feature value.",
    explanation: "In-sample target encoding allows the model to directly observe the target label of the current record, resulting in severe overfitting and 100% training accuracy that collapses on test data.",
    hint: "Cross-validated target encoding.",
    level: "Advanced",
    codeExample: "# OOF target encoding partitions training data into K folds\n# Each fold is encoded using statistics computed from the other K-1 folds"
  },
  {
    id: 21,
    question: "What happens during online serving if an applicant's Income exceeds the training set x_max under MinMaxScaler?",
    shortAnswer: "The transformed value exceeds 1.0 (x' > 1.0), violating the expected unit-interval assumption of downstream models unless `clip=True` is explicitly configured.",
    explanation: "If x_max_train = 48 LPA, an applicant with 60 LPA yields x' = (60 - 3.2)/(48 - 3.2) = 1.268. In neural networks with sigmoid activations, unclipped values cause unexpected saturation.",
    hint: "Use MinMaxScaler(clip=True) for bounded inference.",
    level: "Advanced",
    codeExample: "scaler = MinMaxScaler(clip=True)\nX_test_bounded = scaler.transform(X_test)"
  },
  {
    id: 22,
    question: "In an end-to-end Machine Learning pipeline, where should the train/test split occur relative to preprocessing?",
    shortAnswer: "The train/test split must occur as the very first step, before any imputation, encoding, or scaling transformers are fitted.",
    explanation: "Any statistic calculated over the combined dataset bleeds test information into the training pipeline. Encoders and scalers must be fitted strictly on X_train and used to transform X_test.",
    hint: "Split first, fit transformers only on train.",
    level: "Advanced",
    codeExample: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\npipeline.fit(X_train, y_train)\npipeline.score(X_test, y_test)"
  },
  {
    id: 23,
    question: "What is the Missingness Indicator pattern and why is it critical when compensation missingness is MNAR?",
    shortAnswer: "It appends an auxiliary binary flag (I_missing = 1 if NaN, 0 if observed), allowing downstream models to capture the behavioral non-disclosure signal of high earners withholding salary.",
    explanation: "In MNAR regimes, the act of withholding salary is itself a strong predictor of senior seniority or credit risk. Imputing a value without the flag destroys this non-ignorable signal.",
    hint: "Use sklearn.impute.MissingIndicator.",
    level: "Advanced",
    codeExample: "from sklearn.impute import MissingIndicator\nmask = MissingIndicator().fit_transform(df[['salary']])"
  },
  {
    id: 24,
    question: "Why does Feature Hashing (the Hashing Trick) eliminate the cold-start problem for high-cardinality nominal features?",
    shortAnswer: "Because it projects arbitrary string tokens directly into a fixed-width vector of size B using a hash function modulo B (h(token) mod B), requiring zero stored vocabulary.",
    explanation: "An unseen city is hashed directly into an index in [0, B - 1] without throwing a dictionary lookup error. The operational trade-off is potential hash collisions if B is too small.",
    hint: "Hash modulo B does not require vocabulary storage.",
    level: "Advanced",
    codeExample: "from sklearn.feature_extraction import FeatureHasher\nhasher = FeatureHasher(n_features=16, input_type='string')\nX_hashed = hasher.fit_transform([[city] for city in cities])"
  },

  // =========================================================================
  // TIER 4: SCALABILITY, HEAVY TAILS & ADVANCED OPS (Drift, Invariance)
  // =========================================================================
  {
    id: 25,
    question: "What is the mtry Hazard when feeding hundreds of one-hot encoded city dummy features into a Random Forest?",
    shortAnswer: "Random Forests sample a random subset of features (mtry = sqrt(p)) at each split; when one-hot dummies dominate the feature space, the probability of selecting dense, informative continuous features is severely diluted.",
    explanation: "If a dataset has 5 continuous features (Age, Income) and 95 sparse city dummy columns (p=100), mtry = sqrt(100) = 10 features per split. Most splits evaluate only empty dummies, crippling tree quality.",
    hint: "Random feature subspace sampling picks mostly sparse dummy indicators.",
    level: "Expert",
    codeExample: "# Feature dilution calculation\n# P(no continuous feature in split) = C(95, 10) / C(100, 10) ≈ 58%!"
  },
  {
    id: 26,
    question: "How does LightGBM handle high-cardinality nominal categorical features natively in O(K log K) time without one-hot encoding?",
    shortAnswer: "It sorts category bins according to their target values at each tree node and evaluates optimal categorical subset splits in O(K log K) time rather than exponential O(2^K) time.",
    explanation: "Fisher's exact sorting theorem proves that for binary classification, the optimal partition of a categorical variable into two subsets can be found by sorting categories by their target mean and finding the best continuous split point.",
    hint: "Sorting categories by target mean reduces subset search to O(K log K).",
    level: "Expert",
    codeExample: "import lightgbm as lgb\ndtrain = lgb.Dataset(X, label=y, categorical_feature=['city'])"
  },
  {
    id: 27,
    question: "Why does CatBoost utilize Ordered Target Encoding rather than standard Out-of-Fold target encoding?",
    shortAnswer: "CatBoost computes target statistics over a random permutation of time, using only preceding instances to encode the current instance, completely eliminating prediction shift and target leakage.",
    explanation: "In sequential or online processing, data arrives chronologically. CatBoost simulates random temporal orderings to ensure that for any row i, its target encoding relies strictly on rows 1 to i-1 in that permutation.",
    hint: "Ordered target encoding relies strictly on past records in a random permutation.",
    level: "Expert",
    codeExample: "from catboost import CatBoostClassifier\nmodel = CatBoostClassifier(cat_features=['city'])\nmodel.fit(X_train, y_train)"
  },
  {
    id: 28,
    question: "How do you detect feature scale drift in production when the macroeconomic income distribution shifts over time?",
    shortAnswer: "By continuously calculating Population Stability Index (PSI) and tracking Kolmogorov-Smirnov (KS) test statistics between live production inference features and baseline training features.",
    explanation: "If inflation or wage growth shifts the income distribution, the frozen scaler parameters (mu_train, sigma_train) will map live applicants to higher standardized scores, causing systematic scoring drift.",
    hint: "KS-test evaluates divergence between training and serving CDFs.",
    level: "Expert",
    codeExample: "from scipy.stats import ks_2samp\nstat, p_val = ks_2samp(train_incomes, live_production_incomes)\n# If p_val < 0.05, trigger drift alert!"
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
    question: "Under what conditions will imputing continuous features using target-variable correlated regressors induce target leakage?",
    shortAnswer: "When the imputer uses the downstream prediction target (e.g., 'Loan Approval Status' or 'Default') as a covariate to impute the missing feature ('Salary').",
    explanation: "Using target Y to impute feature X gives the model access to the ground truth during training. At test or production time, the target Y is unavailable, so the imputer cannot run, causing total pipeline collapse.",
    hint: "Imputers must NEVER take the target label y as an input feature during feature matrix preprocessing.",
    level: "Expert",
    codeExample: "# SEVERE DATA LEAKAGE ANTI-PATTERN:\n# X_train['salary'] = imputer.fit_transform(X_train[['exp', 'loan_approved']])\n# CORRECT: Use only predictor features X"
  }
];

export default questions;
