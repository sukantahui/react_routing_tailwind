/**
 * Topic 8: Handling Missing Values & Imputation Architecture
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Course: BCAC701B (MAKAUT Aligned) - Introduction to Machine Learning
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  // =========================================================================
  // BASIC QUESTIONS (1 - 8)
  // =========================================================================
  {
    id: 1,
    question: "What is the primary definition and objective of handling missing values in machine learning?",
    shortAnswer: "Handling missing values is the statistical and algorithmic process of diagnosing missingness mechanisms, mitigating information loss, and reconstructing complete feature matrices required for mathematical model optimization.",
    explanation: "Because linear algebra routines (dot products, matrix inversions, Euclidean distances) cannot compute on undefined floating-point values (NaN), missing values must either be pruned or imputed using statistically sound methods that prevent bias.",
    hint: "Think about why algorithms cannot compute dot products when one coordinate is undefined.",
    level: "Basic",
    codeExample: "# Inspecting and filling missing values in Pandas\nimport pandas as pd\ndf = pd.DataFrame({'age': [25, np.nan, 30]})\n# Impute with median\ndf['age_clean'] = df['age'].fillna(df['age'].median())"
  },
  {
    id: 2,
    question: "Why do standard Scikit-Learn estimators (e.g. LinearRegression, LogisticRegression) crash with a ValueError when passed NaNs?",
    shortAnswer: "Underlying low-level linear algebra libraries (BLAS/LAPACK) require finite floating-point numbers; any arithmetic operation on NaN yields NaN, which propagates and collapses loss gradients.",
    explanation: "Gradient descent computes updates w = w - eta * grad_L. If an input x_j is NaN, the gradient grad_L evaluates to NaN, instantly corrupting all model weights and halting convergence.",
    hint: "What is 5.0 * NaN in IEEE 754 floating-point arithmetic?",
    level: "Basic",
    codeExample: "from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [np.nan], [3]])\ny = np.array([2, 4, 6])\ntry:\n    LinearRegression().fit(X, y)\nexcept ValueError as e:\n    print('Crash confirmed:', e)  # 'Input contains NaN'"
  },
  {
    id: 3,
    question: "Differentiate between Missing Completely at Random (MCAR) and Missing at Random (MAR).",
    shortAnswer: "MCAR means missingness is purely stochastic and independent of all variables; MAR means missingness depends systematically on observed auxiliary features, but not on the missing value itself.",
    explanation: "MCAR: A lab vial breaks accidentally (unbiased under complete-case analysis). MAR: Elderly patients are less likely to report blood pressure in an app, but age is fully recorded (unbiased once conditioned on age).",
    hint: "Does missingness depend on nothing at all, or does it depend on another column you already recorded?",
    level: "Basic",
    codeExample: "# MCAR: Coin flip nulls (5% random loss)\n# MAR: if df['age'] > 65: 30% nulls in blood_pressure\n# MAR can be resolved by grouping by age before imputing!"
  },
  {
    id: 4,
    question: "What is Missing Not at Random (MNAR) and why is it considered non-ignorable?",
    shortAnswer: "MNAR occurs when the probability of missingness depends directly on the unobserved missing value itself; it is non-ignorable because simple statistical imputation produces severe systematic bias.",
    explanation: "For example, individuals with extremely high incomes or severe clinical depression often refuse to answer salary or mental health questions. The missingness itself carries crucial predictive signal that standard mean/median imputation erases.",
    hint: "Think about who is most likely to refuse to disclose their weight or bank balance.",
    level: "Basic",
    codeExample: "# In MNAR, missingness is correlated with the true hidden value\n# E.g., true income > 100,000 -> 70% probability of being NaN!\n# Imputing with global median (30,000) severely underestimates high earners!"
  },
  {
    id: 5,
    question: "What is Listwise Deletion (Complete-Case Analysis) and when is it statistically acceptable?",
    shortAnswer: "Listwise deletion discards every row that contains at least one missing value; it is acceptable ONLY when missingness is proven MCAR AND affects less than 2-5% of total records.",
    explanation: "If missingness is MAR or MNAR, listwise deletion introduces severe sample selection bias. Even under MCAR, if missingness is spread across many columns, it can accidentally destroy over 70% of sample observations.",
    hint: "When does dropping rows not bias your sample, and when is data loss negligible?",
    level: "Basic",
    codeExample: "# Listwise deletion in pandas\nclean_df = df.dropna()  # Only use if len(clean_df) / len(df) > 0.95 and MCAR!"
  },
  {
    id: 6,
    question: "When is Median Imputation strongly preferred over Mean Imputation?",
    shortAnswer: "When the numerical feature displays significant skewness or extreme outliers (e.g. income, property prices, power consumption), since the median is a robust, outlier-resistant central metric.",
    explanation: "The arithmetic mean minimizes squared error, meaning a single extreme Crorepati outlier can shift the imputed value by hundreds of thousands. The median represents the 50th percentile and remains completely unaffected by extreme tail values.",
    hint: "If 9 people earn Rs 20,000 and 1 person earns Rs 10 Crore, which metric reflects the typical person?",
    level: "Basic",
    codeExample: "from sklearn.impute import SimpleImputer\n# Median imputer for skewed tabular features\nmed_imputer = SimpleImputer(strategy='median')\nX_clean = med_imputer.fit_transform(X_train[['income']])"
  },
  {
    id: 7,
    question: "How should missing values be handled in discrete categorical features?",
    shortAnswer: "Either by Mode Imputation (replacing with the most frequent category) or by creating an explicit new category label such as 'Missing' or 'Unknown'.",
    explanation: "For nominal variables where missingness might carry semantic meaning, encoding missing entries as a distinct category ('Unknown') allows downstream algorithms (like trees or one-hot vectors) to learn patterns specific to the missing group.",
    hint: "Can 'Missing' be treated as its own legitimate category in categorical variables?",
    level: "Basic",
    codeExample: "# Creating an explicit 'Missing' category\ndf['meter_hardware'] = df['meter_hardware'].fillna('Unknown')\n# Alternatively: Mode Imputation\nmode_val = df['meter_hardware'].mode()[0]\ndf['meter_hardware'] = df['meter_hardware'].fillna(mode_val)"
  },
  {
    id: 8,
    question: "What is the primary architectural purpose of a Scikit-Learn Imputation Pipeline?",
    shortAnswer: "To encapsulate learned imputation parameters (e.g. training medians) and guarantee they are calculated strictly on X_train and applied to X_test without data leakage.",
    explanation: "If you call an imputer on the combined dataset before splitting, information about test set distributions leaks into the training phase. Pipelines enforce strict separation: `.fit()` on training data, `.transform()` on test and production queries.",
    hint: "How do you ensure test set averages never influence training data transformations?",
    level: "Basic",
    codeExample: "from sklearn.pipeline import Pipeline\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.ensemble import RandomForestClassifier\n\npipe = Pipeline([\n    ('imputer', SimpleImputer(strategy='median')),\n    ('model', RandomForestClassifier())\n])\npipe.fit(X_train, y_train)  # Learns medians strictly from X_train!\npreds = pipe.predict(X_test)"
  },

  // =========================================================================
  // MODERATE QUESTIONS (9 - 16)
  // =========================================================================
  {
    id: 9,
    question: "Explain the Missingness Indicator pattern and why it is critical for MNAR data.",
    shortAnswer: "The Missingness Indicator pattern appends a binary shadow column I_j in {0, 1} flagging whether feature x_j was originally missing, allowing estimators to capture informative missingness signals.",
    explanation: "When an attribute is Missing Not at Random (e.g., high-income tax evasion), imputing with the median removes the difference between an actual median earner and a secretive high earner. The indicator flag preserves this vital predictive clue for the model.",
    hint: "How does a model know whether a value was genuinely measured or synthetically imputed?",
    level: "Moderate",
    codeExample: "from sklearn.impute import SimpleImputer, MissingIndicator\n# SimpleImputer can automatically add missingness indicators\nimp = SimpleImputer(strategy='median', add_indicator=True)\nX_augmented = imp.fit_transform(X_train)\n# Yields imputed feature column PLUS a binary 0/1 indicator column!"
  },
  {
    id: 10,
    question: "How does the k-Nearest Neighbors (k-NN) Imputer calculate distance between instances that have missing coordinates?",
    shortAnswer: "It computes distance strictly across coordinates that are mutually observed in both instances, scaling the distance proportional to the ratio of observed to total attributes.",
    explanation: "Given two instances x and y, Euclidean distance is calculated as d(x, y) = sqrt( (total_features / observed_features) * sum_{i in observed} (x_i - y_i)^2 ). This allows finding neighbors even when donor candidates contain partial nulls.",
    hint: "How do you adjust distance if two vectors share 4 out of 5 features versus 2 out of 5?",
    level: "Moderate",
    codeExample: "from sklearn.impute import KNNImputer\n# Uses nan_euclidean_distances to find k nearest donors\nknn_imp = KNNImputer(n_neighbors=3, weights='distance')\nX_imputed = knn_imp.fit_transform(X_train)"
  },
  {
    id: 11,
    question: "Why does Single Imputation (e.g. replacing with mean or median) underestimate sample variance?",
    shortAnswer: "Single imputation treats synthetic imputed estimates as known empirical ground truth with zero variance, artificially shrinking sample spread and producing overly narrow confidence intervals.",
    explanation: "If 30% of a column is replaced by the identical scalar mean mu, the variance formula sum((x - mu)^2) / N adds 0 for all 30% of imputed rows. This falsely deflates sample standard deviation, inflating t-statistics and causing false statistical significance.",
    hint: "What is (x - mu)^2 when x is exactly equal to mu?",
    level: "Moderate",
    codeExample: "import numpy as np\nx_true = np.random.normal(50, 10, 1000)\n# Mask 30% missing and impute with mean\nx_dirty = x_true.copy()\nx_dirty[:300] = np.mean(x_dirty[300:])\nprint('True Std Dev:   ', np.std(x_true))  # ~ 10.0\nprint('Imputed Std Dev:', np.std(x_dirty)) # ~ 8.36 (Artificially deflated!)"
  },
  {
    id: 12,
    question: "How do modern Gradient Boosted Decision Tree frameworks (XGBoost, LightGBM) handle missing values natively without explicit imputation?",
    shortAnswer: "During tree construction, they evaluate split gain by sending all NaN entries to the left child, then to the right child, permanently assigning NaNs to whichever default direction maximizes Information Gain.",
    explanation: "At inference time, if a query record contains a NaN, it simply follows the default direction learned during training. This treats missingness natively as a distinct branching path, completely bypassing the need for manual imputation.",
    hint: "Does a decision tree need an exact number if it can just learn which branch to send missing entries down?",
    level: "Moderate",
    codeExample: "import xgboost as xgb\n# XGBoost handles NaNs natively with default direction splits\nmodel = xgb.XGBClassifier()\nmodel.fit(X_train, y_train)  # Works out of the box with NaNs!"
  },
  {
    id: 13,
    question: "What is the compound data loss equation for Listwise Deletion across d independent features?",
    shortAnswer: "N_complete = N * prod_{j=1}^d (1 - p_j). With equal missingness p across features, N_complete = N * (1 - p)^d.",
    explanation: "Even if each feature has a seemingly negligible 3% null rate (p = 0.03), across 35 features: (1 - 0.03)^35 = 0.344. Complete-case analysis discards over 65% of all collected training records, severely crippling model training capacity.",
    hint: "What happens when you multiply (0.97) by itself 35 times?",
    level: "Moderate",
    codeExample: "# Loss curve calculation\np = 0.03 # 3% missing per column\nd = 35   # 35 columns\nretention = (1 - p)**d\nprint(f'Retained records: {retention*100:.1f}%, Discarded: {(1-retention)*100:.1f}%')"
  },
  {
    id: 14,
    question: "What is Little's MCAR Test and what null hypothesis does it evaluate statistically?",
    shortAnswer: "Little's Test evaluates the null hypothesis H_0 that data is Missing Completely at Random (MCAR) by testing whether variable means differ significantly across different missingness pattern subgroups using a chi-square distance.",
    explanation: "If p < 0.05, the null hypothesis is rejected, proving that missingness is NOT MCAR (it is either MAR or MNAR). If rejected, listwise deletion is statistically invalid and will introduce systematic bias.",
    hint: "What is the null hypothesis: that missingness is random, or that it is non-random?",
    level: "Moderate",
    codeExample: "# Conceptual Little's MCAR test\n# H0: Data is MCAR (means across missingness patterns are equal)\n# If p-value < 0.05 -> Reject H0 -> Data is MAR or MNAR!"
  },
  {
    id: 15,
    question: "When should a feature column be completely dropped from the dataset rather than imputed?",
    shortAnswer: "When the feature has greater than 60-70% missingness AND is not an essential causal domain driver, or when imputed noise would outweigh legitimate signal.",
    explanation: "Imputing a column where 80% of values are fabricated means four out of five numbers are statistical guesses. Unless the missingness indicator itself holds extraordinary predictive value, dropping the column prevents noise contamination.",
    hint: "If 85 out of 100 values in a column are blank, are you modeling data or modeling your own imputer?",
    level: "Moderate",
    codeExample: "# Threshold-based column dropping\nnull_pct = df.isnull().mean()\ncols_to_drop = null_pct[null_pct > 0.60].index\ndf_clean = df.drop(columns=cols_to_drop)"
  },
  {
    id: 16,
    question: "How do Forward-Fill (LOCF) and Backward-Fill (NOCB) operate in sequential time-series telemetry?",
    shortAnswer: "Forward-fill propagates the last observed valid reading forward into subsequent missing timestamps; backward-fill propagates the next future observation backward.",
    explanation: "In smart meter and IoT telemetry (e.g. WBSEDCL hourly readings), physical systems exhibit high temporal autocorrelation. If a sensor drops out for 30 minutes, the power consumption is highly likely to remain near the last observed reading.",
    hint: "In a continuous time-series, what is the best estimate of a temperature 5 minutes ago?",
    level: "Moderate",
    codeExample: "import pandas as pd\nts = pd.Series([230.1, np.nan, np.nan, 230.8])\n# Forward-fill (Last Observation Carried Forward)\nprint('Forward fill:\\n', ts.ffill())"
  },

  // =========================================================================
  // ADVANCED QUESTIONS (17 - 24)
  // =========================================================================
  {
    id: 17,
    question: "What is MICE (Multivariate Imputation by Chained Equations) and how does it cycle through features iteratively?",
    shortAnswer: "MICE treats each variable with missingness as the target of a regression model trained on all other observed features, cycling through columns iteratively until imputed values converge.",
    explanation: "In Scikit-Learn's `IterativeImputer`, feature X_1 is predicted by (X_2, ..., X_d). Then X_2 is predicted by the newly updated X_1 and remaining features. This round-robin regression preserves complex multivariate dependencies and correlations.",
    hint: "How do you use all other columns to predict the missing values in one column, in a round-robin loop?",
    level: "Advanced",
    codeExample: "from sklearn.experimental import enable_iterative_imputer\nfrom sklearn.impute import IterativeImputer\n# MICE round-robin regression imputation\nmice = IterativeImputer(max_iter=10, random_state=42)\nX_imputed = mice.fit_transform(X_train)"
  },
  {
    id: 18,
    question: "Explain Rubin's Pooling Rules for Multiple Imputation (within-imputation vs between-imputation variance).",
    shortAnswer: "Total variance T = U_bar + (1 + 1/M)*B, where U_bar is the average within-imputation variance across M completed datasets, and B is the between-imputation variance measuring estimation uncertainty.",
    explanation: "By creating M parallel imputed datasets and fitting models on each, Multiple Imputation explicitly accounts for the fact that imputed values are uncertain. The between-imputation variance B inflates the standard errors to honest, realistic statistical levels.",
    hint: "How does Multiple Imputation capture both data sampling error and imputation uncertainty?",
    level: "Advanced",
    codeExample: "# Rubin's Pooling Formula: Total Variance T = U_bar + (1 + 1/M) * B\n# U_bar = mean(within_variances)\n# B = sample_variance(parameter_estimates)"
  },
  {
    id: 19,
    question: "How does the MissForest imputation algorithm handle mixed continuous and categorical datasets?",
    shortAnswer: "MissForest fits iterative Random Forest models on each column, naturally handling non-linear interactions, mixed continuous/categorical features, and complex distributions without distributional assumptions.",
    explanation: "Unlike linear MICE, MissForest uses Random Forest regressors for continuous features and Random Forest classifiers for categorical attributes. It is non-parametric, requires no tuning of scaling, and is resistant to multicollinearity.",
    hint: "What algorithm can seamlessly switch between regression and classification for different columns?",
    level: "Advanced",
    codeExample: "# Conceptual MissForest usage\n# from missingpy import MissForest\n# imputer = MissForest()\n# X_imputed = imputer.fit_transform(X_mixed_types)"
  },
  {
    id: 20,
    question: "Why can naively filling missing physical quantities (such as Blood Pressure or Heart Rate) with 0.0 cause severe gradient descent pathology?",
    shortAnswer: "0.0 represents a biological impossibility (death), introducing extreme out-of-distribution leverage points that distort loss surfaces and trigger massive false gradients.",
    explanation: "If normal systolic blood pressure is ~120 mmHg, a value of 0.0 is 12 standard deviations away from the mean. In squared error loss (y - y_hat)^2, this single artificial point produces a gigantic squared residual of 14,400, pulling model weights completely away from legitimate patient patterns.",
    hint: "What happens to the gradient of (0 - 120)^2 compared to normal variations?",
    level: "Advanced",
    codeExample: "# Never fill physical vitals with 0.0!\n# E.g. patient blood pressure: fillna(0) creates massive pathological leverage points!"
  },
  {
    id: 21,
    question: "How do Heckman Selection Models mathematically correct for sample selection bias in MNAR datasets?",
    shortAnswer: "By modeling a two-stage process: a probit selection equation models the probability of observation, computing the Inverse Mills Ratio (lambda) which is added as a regressor in the outcome equation.",
    explanation: "When data is MNAR, observing a value is correlated with the error term of the outcome equation. The Heckman correction models P(observed | Z), calculates the hazard lambda, and includes it to purge the selection bias from the primary regression coefficients.",
    hint: "What econometric method uses a probit selection equation to control for missing data bias?",
    level: "Advanced",
    codeExample: "# Two-step Heckman Selection: Stage 1 = Probit(Selection); Stage 2 = OLS with Inverse Mills Ratio"
  },
  {
    id: 22,
    question: "What is the Expectation-Maximization (EM) algorithm for maximum likelihood estimation in the presence of missing data?",
    shortAnswer: "EM iterates between an E-step (computing the expected log-likelihood over missing data given current parameter estimates) and an M-step (maximizing the expected log-likelihood to update parameters).",
    explanation: "EM avoids explicitly filling individual missing cells permanently. Instead, it estimates the true population parameters (mean vector mu and covariance matrix Sigma) directly from incomplete data by converging iteratively toward the marginal maximum likelihood.",
    hint: "Recall the 2 steps: compute Expectation, then Maximize parameters.",
    level: "Advanced",
    codeExample: "# EM algorithm estimates mu and Sigma directly without creating ad-hoc imputed rows"
  },
  {
    id: 23,
    question: "How does Pairwise Deletion (Available-Case Analysis) differ from Listwise Deletion, and why can it yield non-positive-definite covariance matrices?",
    shortAnswer: "Pairwise deletion calculates each covariance Cov(X_i, X_j) using all instances where both i and j are observed, leading to different sample sizes per cell which can produce mathematically invalid covariance matrices.",
    explanation: "Because Cov(X_1, X_2) might be computed on 800 rows while Cov(X_2, X_3) is computed on 500 different rows, the resulting covariance matrix Sigma can have negative eigenvalues, causing multivariate normal distributions and PCA decompositions to crash.",
    hint: "Can a covariance matrix have negative eigenvalues if different cells are computed on different subsets of people?",
    level: "Advanced",
    codeExample: "# Pairwise deletion danger:\n# Covariance matrix can have lambda_min < 0 (non-positive semi-definite)!"
  },
  {
    id: 24,
    question: "How does missingness in target labels (y) differ fundamentally from missingness in features (X), and how is Semi-Supervised Learning applied?",
    shortAnswer: "Missing labels cannot be imputed via simple feature averages; rows with missing labels represent unlabelled data suitable for Semi-Supervised Learning (e.g. Self-Training, Label Propagation) or must be excluded from supervised loss.",
    explanation: "In supervised learning, the objective is to model P(y | X). Imputing y with mean(y) directly hallucinates the target, destroying classification margins. Semi-supervised algorithms train a model on labelled pairs (X_L, y_L) and iteratively predict pseudo-labels on unlabelled pairs (X_U).",
    hint: "What happens if you impute the answer key of an exam before evaluating students?",
    level: "Advanced",
    codeExample: "from sklearn.semi_supervised import SelfTrainingClassifier\nfrom sklearn.ensemble import RandomForestClassifier\n# -1 indicates unlabelled instance\ny_train_semi = np.where(np.isnan(y_train), -1, y_train)\nself_trainer = SelfTrainingClassifier(RandomForestClassifier())\nself_trainer.fit(X_train, y_train_semi)"
  },

  // =========================================================================
  // EXPERT QUESTIONS (25 - 30)
  // =========================================================================
  {
    id: 25,
    question: "What is Pattern-Mixture Modeling and how does it stratify analysis by missingness patterns for MNAR data?",
    shortAnswer: "It stratifies the joint distribution into distinct subgroups based on the exact pattern of missing variables, modeling P(Y | Pattern = k) and weighting estimates by the empirical frequency of each pattern.",
    explanation: "Rather than assuming a single missingness mechanism, Pattern-Mixture models acknowledge that patients with missing Blood Pressure AND missing Glucose belong to a distinct clinical population from patients with only missing Glucose, modeling each pattern subgroup separately.",
    hint: "How can you group records based on WHICH combination of columns is missing?",
    level: "Expert",
    codeExample: "# Pattern-mixture modeling stratifies records into groups based on null masks\n# pattern_id = df.isnull().astype(int).astype(str).agg(''.join, axis=1)"
  },
  {
    id: 26,
    question: "How do distributed frameworks (such as Apache Spark) compute parallel median imputation across billions of rows without full sorting?",
    shortAnswer: "They employ approximate quantile sketches (e.g. Greenwald-Khanna or t-digest algorithms) to compute percentiles within a bounded error epsilon in a single parallel map-reduce pass.",
    explanation: "Sorting a 10-billion-row distributed DataFrame to find the exact middle element causes massive shuffle spills across the cluster. Approximate sketch algorithms accumulate compact centroid histograms in worker memory, computing the 50th percentile in O(1) memory per partition.",
    hint: "How do you find the median of 10 billion numbers without sorting them all into a single machine?",
    level: "Expert",
    codeExample: "# PySpark approximate median imputation\n# median_val = df.approxQuantile('income', [0.5], 0.01)[0]\n# df_imputed = df.fillna({'income': median_val})"
  },
  {
    id: 27,
    question: "How does GAIN (Generative Adversarial Imputation Networks) use a generator and discriminator to impute high-dimensional tabular data?",
    shortAnswer: "The Generator observes real data with NaNs and generates imputations; the Discriminator is trained via a Hint mechanism to distinguish which specific coordinates were genuinely observed versus imputed.",
    explanation: "Standard GANs classify entire vectors as real or fake. GAIN provides the Discriminator with a partial hint vector H, forcing it to predict the mask vector M element-by-element. This forces the Generator to model true multivariate conditional distributions P(X_mis | X_obs).",
    hint: "How does a discriminator know WHICH individual cell was synthetic versus real?",
    level: "Expert",
    codeExample: "# GAIN Architecture: G(X, M) -> Imputed Matrix; D(G(X, M), H) -> Mask Probability"
  },
  {
    id: 28,
    question: "Why can improper imputation in credit risk models violate Fair Lending regulations (e.g. ECOA) and create discriminatory disparate impact?",
    shortAnswer: "If missingness is correlated with protected demographic attributes (e.g. rural or minority applicants lacking formal credit bureau records), naively imputing zero or low credit scores systematically penalizes protected classes.",
    explanation: "Minority communities and unbanked populations frequently lack traditional credit histories. Imputing a default low score or dropping unbanked applications creates an illegal disparate impact under banking law. Responsible AI requires multi-tier alternate data imputation and fairness audits.",
    hint: "What happens to unbanked rural applicants if lack of credit history is automatically imputed as bad credit?",
    level: "Expert",
    codeExample: "# Disparate Impact Audit in Credit Imputation\n# Check if imputation error rate differs significantly across demographic groups!"
  },
  {
    id: 29,
    question: "In real-time streaming architectures (e.g. Apache Flink / Kafka), how is stateful exponential decay or Kalman filtering applied to impute missing IoT telemetry?",
    shortAnswer: "Streaming engines maintain internal state vectors per IoT device; when a heartbeat is dropped, a Kalman filter state-space model projects the latent state forward using physical transition equations and covariance matrices.",
    explanation: "Unlike batch imputation that can look backward and forward in time, streaming pipelines operate in real-time latency (< 5ms). Kalman filters predict the expected measurement at time t given noisy inputs up to t-1, updating state uncertainty until physical sensor pings resume.",
    hint: "How does an aircraft autopilot estimate altitude if GPS drops out for 2 seconds?",
    level: "Expert",
    codeExample: "# Stateful streaming Kalman Filter prediction for missing IoT sensor reading\n# x_pred = F * x_prev; P_pred = F * P_prev * F.T + Q"
  },
  {
    id: 30,
    question: "How do modern Feature Stores (e.g. Feast, Hopsworks) guarantee consistent offline-to-online missing value imputation without training-serving skew?",
    shortAnswer: "By defining imputation rules declaratively within the feature view definition; the same serialized transformer or default fallback is executed during both offline batch training and online low-latency entity lookups.",
    explanation: "If training data imputes missing values using a Scikit-Learn pipeline median, but the online Redis lookup microservice defaults missing inputs to 0.0 in Java, catastrophic model degradation occurs. Feature stores serialize transformation pipelines into a shared, versioned feature view.",
    hint: "How do you ensure Python offline training and Java online serving handle NaNs with identical logic?",
    level: "Expert",
    codeExample: "# Declarative feature definition in Feature Store ensures shared imputation logic across training & serving"
  }
];

export default questions;
