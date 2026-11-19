/**
 * Topic 22: Worked Example 2: Handling Missing Salary Values
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION (Concepts, Rubin's Taxonomy, Distribution Realities)
  // =========================================================================
  {
    id: 1,
    question: "What is the formal definition of Missing Completely at Random (MCAR) in the context of an employee compensation dataset?",
    shortAnswer: "The probability of a salary value being missing is strictly independent of both observed covariates and the missing salary value itself: P(M | Y_obs, Y_mis) = P(M).",
    explanation: "Under MCAR, missingness occurs entirely by chance (e.g., an accidental server drop or OCR scanning failure). The observed records constitute an unbiased random sample of the full population, meaning parameter estimates remain unbiased though statistical power is reduced.",
    hint: "Think about whether knowing someone's job title or actual salary gives any clue about whether the field is missing.",
    level: "Basic",
    codeExample: "# Diagnostic check: Missingness is independent of any feature\n# P(M=1 | Role=SE) == P(M=1 | Role=EM) == P(M=1)"
  },
  {
    id: 2,
    question: "How does Missing at Random (MAR) differ fundamentally from MCAR when handling salary data?",
    shortAnswer: "Under MAR, the probability of missingness depends systematically on observed features (e.g., Job Role, Experience), but not on the unobserved salary value itself once conditioned on those features.",
    explanation: "In MAR, missingness is explainable by available data. For example, entry-level engineers may omit salary because their campus hire packages are standardized. Once we condition on 'Role = SE', the probability of missingness no longer depends on whether their salary is ₹6.0 LPA or ₹7.5 LPA.",
    hint: "Recall Rubin's conditional probability: P(M | Y_obs, Y_mis) = P(M | Y_obs).",
    level: "Basic",
    codeExample: "# MAR conditioning in Pandas\ngroup_missing_rate = df.groupby('role')['salary'].apply(lambda s: s.isna().mean())\nprint(group_missing_rate)"
  },
  {
    id: 3,
    question: "Why does Missing Not at Random (MNAR) represent the most perilous missingness mechanism for compensation modeling?",
    shortAnswer: "Because missingness depends directly on the unobserved salary value itself (e.g., top earners withholding salary), creating severe truncation and survivor bias that cannot be corrected by simple conditioning.",
    explanation: "If high earners (> ₹40 LPA) systematically withhold compensation due to tax or privacy concerns, observed salaries reflect a truncated distribution. Models trained only on observed records will severely underestimate upper-echelon compensation and make poor credit or hiring decisions.",
    hint: "Consider what happens if everyone earning over ₹40 LPA refuses to answer the survey.",
    level: "Basic",
    codeExample: "# MNAR scenario: Probability of missingness rises with salary\n# P(M=1 | Salary > 40 LPA) >> P(M=1 | Salary < 10 LPA)"
  },
  {
    id: 4,
    question: "Why is the arithmetic mean an inappropriate central tendency metric for imputing missing salaries in right-skewed corporate payrolls?",
    shortAnswer: "Because salary distributions have heavy Pareto/log-normal right tails, pulling the arithmetic mean far above the median and severely overestimating compensation for entry- and mid-level employees.",
    explanation: "In our Salt Lake IT cohort, high-earning managers pull the mean to ₹18.06 LPA while the median is ₹14.15 LPA. Imputing ₹18 LPA for missing junior engineers (true salary ~₹5-7 LPA) introduces massive positive estimation bias.",
    hint: "In right-skewed distributions, Mean > Median due to extreme high-value outliers.",
    level: "Basic",
    codeExample: "import numpy as np\nsalaries = np.array([5.2, 6.0, 6.5, 7.8, 13.8, 14.5, 15.2, 16.0, 26.0, 28.5, 38.0, 42.0])\nprint(f'Mean: {np.mean(salaries):.2f}, Median: {np.median(salaries):.2f}')"
  },
  {
    id: 5,
    question: "What is the primary consequence of Listwise Deletion (dropping missing rows via dropna()) on sample size and statistical power?",
    shortAnswer: "It reduces effective sample size N, which increases standard errors of estimates, widens confidence intervals, and reduces the statistical power to detect true predictive relationships.",
    explanation: "Even under MCAR where estimates remain unbiased, discarding rows throws away valuable observed data in other columns (e.g., experience, education, department), leading to higher sample variance and inefficient estimators.",
    hint: "Standard error is inversely proportional to sqrt(N).",
    level: "Basic",
    codeExample: "# Listwise deletion in pandas\ndf_complete = df.dropna(subset=['salary'])\nprint(f'Remaining records: {len(df_complete)} of {len(df)}')"
  },
  {
    id: 6,
    question: "What is Little's MCAR Test and what null hypothesis does it formally test?",
    shortAnswer: "Little's MCAR test evaluates the null hypothesis H0 that missing data across all variables is Missing Completely at Random, using a multivariate chi-squared distance metric.",
    explanation: "The test compares the means of observed variables across different missingness patterns against the maximum likelihood estimates of population parameters. A low p-value (p < 0.05) rejects MCAR, proving that missingness is at least MAR or MNAR.",
    hint: "The null hypothesis assumes no systematic difference across missingness subsets.",
    level: "Intermediate",
    codeExample: "# Conceptual representation of Little's MCAR Test\n# H0: Missingness mechanism is MCAR (d^2 ~ Chi-Square(df))"
  },
  {
    id: 7,
    question: "Why is median imputation considered L1-optimal for univariate continuous features?",
    shortAnswer: "The sample median mathematically minimizes the sum of absolute deviations (L1 norm): argmin_c sum |y_i - c|.",
    explanation: "While the mean minimizes squared Euclidean distance (L2 norm) which is heavily influenced by outliers, the median minimizes absolute error, making it structurally robust against high-earning executive outliers.",
    hint: "Contrast L1 (absolute) vs L2 (squared) loss minimization.",
    level: "Basic",
    codeExample: "# Median minimizes sum of absolute errors\nerrors = [abs(y - median_val) for y in observed_salaries]\nprint(f'L1 Loss: {sum(errors):.2f}')"
  },
  {
    id: 8,
    question: "In tabular preprocessing, what is the role of a Missingness Indicator (Binary Mask) feature?",
    shortAnswer: "It explicitly records whether an imputation occurred by appending a binary flag (1 if missing, 0 if observed), preserving non-ignorable MNAR signal for downstream learners.",
    explanation: "When salary is missing due to behavioral non-disclosure (MNAR), the fact that it is missing is itself a powerful predictor of executive seniority or credit risk. Imputing a value without the indicator erases this valuable signal.",
    hint: "Check sklearn.impute.MissingIndicator or df['salary_isna'] = df['salary'].isna().astype(int).",
    level: "Basic",
    codeExample: "from sklearn.impute import SimpleImputer, MissingIndicator\nindicator = MissingIndicator()\nmask = indicator.fit_transform(df[['salary']])"
  },

  // =========================================================================
  // TIER 2: MECHANICS & IMPUTATION FORMULATIONS (Math & Algorithms)
  // =========================================================================
  {
    id: 9,
    question: "Prove mathematically that single mean imputation artificially deflates the sample variance of the completed feature.",
    shortAnswer: "Since every imputed record has deviation (y_j - y_bar) = 0, the sum of squared errors across all N rows equals that of only N_obs rows, shrinking variance to S^2_imputed = [(N_obs - 1)/(N - 1)] * S^2_obs ≈ (1 - f) * S^2_obs.",
    explanation: "If missing fraction f = 0.25 (25% missing), imputing the constant mean shrinks total sample variance by ~25%. This falsely narrows confidence intervals and inflates t-statistics, leading to false discoveries (Type I errors).",
    hint: "What is the squared deviation of an imputed value from the sample mean?",
    level: "Intermediate",
    codeExample: "# Variance reduction proof\n# Var(Y_completed) = (N_obs - 1)/(N - 1) * Var(Y_obs) ≈ (1 - f) * Var(Y_obs)"
  },
  {
    id: 10,
    question: "How does Stratified Group Median Imputation overcome the primary flaw of Global Median Imputation?",
    shortAnswer: "It calculates medians within discrete demographic or operational strata (e.g., Job Role, Experience Tier), preserving cross-group wage differentials rather than homogenizing everyone.",
    explanation: "Global median assigns ₹14.15 LPA to all missing engineers. Group median assigns ₹6.5 LPA to Software Engineers and ₹38.0 LPA to Engineering Managers, slashing MAE from ₹10.36 LPA down to ₹2.27 LPA.",
    hint: "Conditioning on Role partitions the variance between-groups vs within-groups.",
    level: "Intermediate",
    codeExample: "# Stratified Group Median in Pandas\ndf['salary_imp'] = df['salary'].fillna(\n    df.groupby('role')['salary'].transform('median')\n)"
  },
  {
    id: 11,
    question: "Why must continuous features be normalized (e.g., Min-Max scaled) prior to computing distance in K-Nearest Neighbors (KNN) salary imputation?",
    shortAnswer: "Because Euclidean distance is scale-dependent; features with large numerical ranges (e.g., Age 20-60 or Pincode) would completely dwarf features with smaller ranges (e.g., Years of Experience 1-15).",
    explanation: "If experience ranges from 1 to 15 while another donor feature ranges from 1,000 to 10,000, unscaled Euclidean distance will treat a 1-year experience difference as negligible compared to trivial differences in the larger-scale feature.",
    hint: "Euclidean distance squares raw coordinate differences: sum (x_k - q_k)^2.",
    level: "Intermediate",
    codeExample: "from sklearn.preprocessing import MinMaxScaler\nscaler = MinMaxScaler()\nX_scaled = scaler.fit_transform(X[['experience', 'degree_rank']])"
  },
  {
    id: 12,
    question: "How does Distance-Weighted KNN imputation assign weights to candidate donor records?",
    shortAnswer: "It weights donor salaries inversely proportional to their normalized Euclidean distance: w_i = 1 / (d_i + ε), so closer donors contribute more strongly to the imputed average.",
    explanation: "If Candidate A is at distance 0.1 and Candidate B is at distance 0.5, Candidate A receives roughly 5x the weight of Candidate B in the convex combination: y_hat = sum(w_i * y_i) / sum(w_i).",
    hint: "A tiny epsilon (1e-5) is added to the denominator to prevent division by zero for exact matches.",
    level: "Intermediate",
    codeExample: "# Inverse distance weighting\nweights = [1.0 / (d + 1e-5) for d in distances]\nimputed_val = sum(w * y for w, y in zip(weights, donor_salaries)) / sum(weights)"
  },
  {
    id: 13,
    question: "What is the critical drawback of Deterministic Regression Imputation (y_hat = x^T * beta) despite its low mean absolute error?",
    shortAnswer: "It places all imputed points exactly on the regression line, artificially inflating the correlation coefficient r(X, Y) and suppressing residual error variance.",
    explanation: "Deterministic regression treats conditional expectation as known ground truth. It eliminates natural human wage dispersion around the regression slope, causing downstream models to severely underestimate prediction uncertainty.",
    hint: "Think about what happens to the scatter plot residuals when every missing point lies on the line.",
    level: "Intermediate",
    codeExample: "# Deterministic regression: zero residual variance for imputed points\ny_hat = beta_0 + beta_1 * x_query  # No epsilon added!"
  },
  {
    id: 14,
    question: "How does Stochastic Regression Imputation resolve the variance-deflation pathology of deterministic regression?",
    shortAnswer: "By drawing and adding a random residual shock from the model's estimated error distribution: y_hat = beta_0 + beta_1 * x + ε, where ε ~ N(0, sigma_hat^2).",
    explanation: "Injecting Gaussian residual noise with standard deviation equal to the regression standard error restores the natural scatter of the salary distribution, preserving population variance at >97% of true ground truth.",
    hint: "Residual variance sigma^2_e = sum(y_i - y_pred)^2 / (N - 2).",
    level: "Intermediate",
    codeExample: "import random\nresidual_std = 1.3412\nnoise = random.gauss(0.0, residual_std)\ny_stochastic = max(0.0, beta_0 + beta_1 * x_exp + noise)"
  },
  {
    id: 15,
    question: "What is the mathematical formulation of Ordinary Least Squares (OLS) slope beta_1 when modeling Salary as a function of Experience?",
    shortAnswer: "beta_1 = sum((x_i - x_bar) * (y_i - y_bar)) / sum((x_i - x_bar)^2) = Cov(x, y) / Var(x).",
    explanation: "OLS minimizes the sum of squared vertical residuals. In our Salt Lake IT dataset, beta_1 ≈ 2.94 LPA per year of experience, indicating that each additional year of software experience yields ~₹2.94 LPA in compensation.",
    hint: "Numerator is sample covariance; denominator is sample variance of the predictor.",
    level: "Intermediate",
    codeExample: "# Pure Python OLS slope\ncov_xy = sum((x - mean_x) * (y - mean_y) for x, y in zip(X, Y))\nvar_x = sum((x - mean_x) ** 2 for x in X)\nbeta_1 = cov_xy / var_x"
  },
  {
    id: 16,
    question: "What is the Cold-Start problem in Stratified Group Median Imputation and how is it resolved?",
    shortAnswer: "It occurs when a query record belongs to a stratum with zero observed donor values. It is resolved using a Hierarchical Fallback Cascade.",
    explanation: "If an organization hires its first 'DevOps Architect' and that employee's salary is missing, there are no observed DevOps Architect salaries. The system cascades to Department Median, then Experience Tier Median, and finally Global Median.",
    hint: "Cascade from specific subsets to broader aggregates until donor count >= n_min.",
    level: "Intermediate",
    codeExample: "def safe_impute(row, group_medians, global_median):\n    return group_medians.get(row['role'], global_median)"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE, PIPELINE LEAKAGE & PRODUCTION ENGINEERING
  // =========================================================================
  {
    id: 17,
    question: "How does 'Fit-Before-Split' imputation cause data leakage in an end-to-end Machine Learning pipeline?",
    shortAnswer: "Computing imputation statistics (mean, median, regression parameters) across the entire dataset before splitting bleeds validation/test distribution parameters into the training set.",
    explanation: "When test data informs the imputed values of training records, cross-validation metrics become unrealistically optimistic. When the model encounters genuinely unseen data in production, performance degrades sharply.",
    hint: "Always fit transformers exclusively on X_train and only call transform on X_test.",
    level: "Advanced",
    codeExample: "# Correct Leakage-Free Architecture\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.impute import SimpleImputer\n\nX_train, X_test = train_test_split(X, test_size=0.2, random_state=42)\nimputer = SimpleImputer(strategy='median')\nX_train_imp = imputer.fit_transform(X_train)  # Fit on train only\nX_test_imp = imputer.transform(X_test)         # Transform test"
  },
  {
    id: 18,
    question: "In Scikit-Learn, how do you construct a production ColumnTransformer that handles missing numeric salaries and missing categorical roles simultaneously?",
    shortAnswer: "By defining separate Pipeline branches for numeric and categorical columns within ColumnTransformer, applying SimpleImputer/IterativeImputer to numeric and SimpleImputer(strategy='most_frequent') to categorical.",
    explanation: "ColumnTransformer routes numeric features to median or KNN imputers followed by standard scaling, and categorical features to constant/mode imputers followed by one-hot encoding, preventing cross-type contamination.",
    hint: "Use make_column_transformer or ColumnTransformer with named Pipeline pipelines.",
    level: "Advanced",
    codeExample: "from sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\nnum_pipe = Pipeline([('imp', SimpleImputer(strategy='median')), ('scl', StandardScaler())])\ncat_pipe = Pipeline([('imp', SimpleImputer(strategy='most_frequent')), ('ohe', OneHotEncoder())])\nct = ColumnTransformer([('num', num_pipe, ['salary', 'exp']), ('cat', cat_pipe, ['role'])])"
  },
  {
    id: 19,
    question: "Why must physical boundary constraints (e.g., minimum wage clamp) be applied after parametric regression imputation?",
    shortAnswer: "Because linear regression and Gaussian noise draws are unconstrained (-inf to +inf) and can output negative or illegally low salary values for junior or entry-level profiles.",
    explanation: "A candidate with 0.5 years experience receiving a negative residual shock (-2.5 LPA) from an unbounded regression might be imputed with -₹0.8 LPA. Pipelines must enforce y_safe = max(minimum_wage, y_pred).",
    hint: "Always enforce domain validity bounds: np.clip(y_pred, min_wage, max_ceiling).",
    level: "Advanced",
    codeExample: "WEST_BENGAL_MIN_SALARY_LPA = 2.40  # ₹20,000/month baseline\nimputed_salary = max(WEST_BENGAL_MIN_SALARY_LPA, raw_regression_pred)"
  },
  {
    id: 20,
    question: "How does the Missingness Indicator pattern enable XGBoost or LightGBM to handle MNAR compensation non-disclosure effectively?",
    shortAnswer: "It allows tree split finders to isolate missingness into a separate branch, learning a unique leaf value specifically for users who withheld their compensation.",
    explanation: "Modern gradient boosting decision trees (GBDTs) natively route missing values to whichever split direction minimizes loss. Adding an explicit binary mask ensures linear models and distance models also capture this non-ignorable signal.",
    hint: "A tree split on 'is_salary_missing == 1' can directly model executive or high-risk sub-populations.",
    level: "Advanced",
    codeExample: "import xgboost as xgb\n# XGBoost natively routes NaNs to optimal child nodes during split finding\ndtrain = xgb.DMatrix(X_train, label=y_train, missing=np.nan)"
  },
  {
    id: 21,
    question: "In a real-world FinTech credit appraisal system, why is dropping MNAR missing salary rows dangerous for loan approval fairness?",
    shortAnswer: "It causes systematic demographic and socioeconomic exclusion, disproportionately filtering out informal economy workers or high-net-worth clients who do not possess standard payslips.",
    explanation: "In semi-urban areas like Barrackpore or Ichapur, independent merchants operate cash/UPI businesses without monthly salary slips. Dropping these records denies credit to creditworthy entrepreneurs and skews the lending portfolio.",
    hint: "Consider financial inclusion and regulatory fair-lending mandates under RBI guidelines.",
    level: "Advanced",
    codeExample: "# Dropping missing records biases the credit underwriting pool\n# approval_rate = df.dropna().groupby('business_type')['approved'].mean()"
  },
  {
    id: 22,
    question: "What is the computational complexity of Distance-Weighted KNN Imputation during inference, and why does it struggle on high-throughput streaming systems?",
    shortAnswer: "O(N_obs * d) per missing record, because every incoming missing query must compute Euclidean distances to all N_obs training donor vectors across d dimensions.",
    explanation: "For a dataset with 500,000 donors and 20 features, each missing record requires 10 million floating-point operations. On real-time API endpoints with 50ms latency SLAs, unindexed KNN imputation causes unacceptable bottlenecks.",
    hint: "Contrast O(1) median lookup against O(N * d) brute-force donor scanning.",
    level: "Advanced",
    codeExample: "# Fast production alternative: Pre-compute KD-Tree or BallTree\nfrom sklearn.neighbors import KDTree\ntree = KDTree(X_train_scaled)  # O(d * N log N) build, O(d log N) query"
  },
  {
    id: 23,
    question: "Why should salary features often be log-transformed before fitting regression or KNN imputation models?",
    shortAnswer: "Log-transformation y_log = log(y) converts right-skewed Pareto/log-normal distributions into approximately Gaussian distributions, stabilizing variance and linearizing multiplicative relationships.",
    explanation: "In compensation data, salary growth is multiplicative (percentage raises) rather than additive. Fitting regression on log(salary) ensures residuals are homoscedastic and prevents negative salary predictions upon inverse transformation exp(y_log).",
    hint: "Taking the natural logarithm compresses the long right tail.",
    level: "Advanced",
    codeExample: "import numpy as np\nlog_sal = np.log(df['salary'])\n# Impute in log space, then back-transform: np.exp(imputed_log_sal)"
  },
  {
    id: 24,
    question: "What is Gower's Distance and why is it preferred over Euclidean distance when donor datasets contain both categorical roles and continuous experience?",
    shortAnswer: "Gower's distance computes Manhattan distance for continuous variables (scaled by range) and Dice/matching distance (0 for match, 1 for mismatch) for categorical variables, combining them into a valid [0, 1] metric.",
    explanation: "Standard Euclidean distance cannot naturally ingest non-ordinal categorical variables like 'Job Role: SE vs Lead'. Gower's distance natively supports mixed data types without arbitrary numeric rank assignments.",
    hint: "It computes d_ij = sum(w_k * s_ijk) / sum(w_k) where s_ijk is feature-type specific similarity.",
    level: "Advanced",
    codeExample: "# Conceptual Gower similarity for mixed records\n# continuous: 1 - |x1 - x2| / range\n# categorical: 1 if match else 0"
  },

  // =========================================================================
  // TIER 4: SCALABILITY, MICE & ADVANCED EDGE CASES (FCS, Production Ops)
  // =========================================================================
  {
    id: 25,
    question: "What is Multiple Imputation by Chained Equations (MICE / FCS) and how does it handle missing values across multiple interdependent features simultaneously?",
    shortAnswer: "MICE iteratively models each incomplete feature as a function of all other features in a round-robin cycle, updating missing values conditionally until convergence across multiple imputed datasets.",
    explanation: "If both Salary and Experience have missing values, MICE initially fills Experience with median, predicts Salary using Experience, updates Experience using the newly imputed Salary, and iterates through several cycles (e.g., 10-20 iterations) to reach a joint distribution.",
    hint: "Iterative round-robin conditional regression specifications.",
    level: "Expert",
    codeExample: "from sklearn.experimental import enable_iterative_imputer\nfrom sklearn.impute import IterativeImputer\n\nmice = IterativeImputer(max_iter=10, random_state=42)\nX_completed = mice.fit_transform(X[['experience', 'degree_rank', 'salary']])"
  },
  {
    id: 26,
    question: "Why does Rubin advocate generating m > 1 multiply-imputed datasets rather than a single completed dataset?",
    shortAnswer: "Generating m independent imputed datasets allows analysts to pool parameter estimates using Rubin's Rules, capturing both within-imputation sampling variance and between-imputation uncertainty.",
    explanation: "Single imputation treats imputed values as known with certainty. Multiple imputation accounts for the fact that missing values are uncertain guesses. The total variance is T = W + (1 + 1/m) * B, where W is within-imputation variance and B is between-imputation variance.",
    hint: "Rubin's Rules combine point estimates and inflate standard errors to reflect missingness uncertainty.",
    level: "Expert",
    codeExample: "# Rubin's Rules variance combination\n# Total_Var = Mean(Within_Vars) + (1 + 1/m) * Var(Between_Means)"
  },
  {
    id: 27,
    question: "In an asynchronous microservices architecture, how should a salary imputation model be packaged and served to maintain deterministic reproducibility?",
    shortAnswer: "Bundle the fitted imputer artifacts (medians, KNN trees, or regression weights) into a versioned serialization package (e.g., ONNX, joblib) alongside fixed schema validation guards (e.g., Pydantic).",
    explanation: "The microservice must never recompute imputation parameters on incoming single-request payloads. It loads the frozen training artifacts and applies them identically to streaming inferences.",
    hint: "Separate training (offline parameter estimation) from serving (online transformation).",
    level: "Expert",
    codeExample: "import joblib\n# Save offline pipeline\njoblib.dump(fitted_pipeline, 'salary_imputation_v1.2.joblib')\n# Load in production inference microservice\npipeline = joblib.load('salary_imputation_v1.2.joblib')"
  },
  {
    id: 28,
    question: "How do you detect data drift in production when the proportion or mechanism of missing salaries shifts over time?",
    shortAnswer: "By continuously monitoring population stability metrics (PSI / CSI) on the missingness indicator column and tracking Kullback-Leibler (KL) divergence of observed covariates.",
    explanation: "If the missingness rate in loan applications jumps from 5% to 30% following a macroeconomic shock or UI redesign, the historical imputation parameters (e.g., median salary by role) become invalid, necessitating an automated pipeline alert and retraining trigger.",
    hint: "Track missingness rate as a first-class Prometheus/Grafana operational metric.",
    level: "Expert",
    codeExample: "# PSI monitoring for missingness indicator\ndef compute_psi(expected, actual, bins=10):\n    # Compares baseline training missingness rate vs live production window\n    pass"
  },
  {
    id: 29,
    question: "When applying IterativeImputer (MICE) with linear estimators on small sample cohorts, what numerical instability can occur and how is it mitigated?",
    shortAnswer: "Collinearity among predictors can make the Gram matrix (X^T * X) singular or ill-conditioned, leading to explosive coefficient weights; mitigated using Ridge / Bayesian Ridge regularized estimators.",
    explanation: "In small cohorts (e.g., N=12 in our Salt Lake example), high correlation between experience and degree rank can cause unregularized OLS to invert a near-singular matrix. Scikit-Learn's IterativeImputer defaults to BayesianRidge to add L2 regularization.",
    hint: "BayesianRidge introduces Gaussian priors over parameters to stabilize inversion.",
    level: "Expert",
    codeExample: "from sklearn.linear_model import BayesianRidge\nfrom sklearn.impute import IterativeImputer\nmice_ridge = IterativeImputer(estimator=BayesianRidge(), max_iter=20)"
  },
  {
    id: 30,
    question: "Under what conditions will imputing salary using target-variable correlated regressors induce target leakage?",
    shortAnswer: "When the imputer uses the downstream prediction target (e.g., 'Loan Approval Status' or 'Default') as a covariate to impute the missing feature ('Salary').",
    explanation: "Using target Y to impute feature X gives the model access to the ground truth during training. At test or production time, the target Y is unavailable, so the imputer cannot run, causing total pipeline collapse.",
    hint: "Imputers must NEVER take the target label y as an input feature during feature matrix preprocessing.",
    level: "Expert",
    codeExample: "# SEVERE DATA LEAKAGE ANTI-PATTERN:\n# X_train['salary'] = imputer.fit_transform(X_train[['exp', 'loan_approved']])\n# CORRECT: Use only predictor features X"
  }
];

export default questions;
