/**
 * Topic 6: Data Preprocessing Concept & Pipeline Architecture
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
    question: "What is the 'Garbage In, Garbage Out' (GIGO) principle in Machine Learning?",
    shortAnswer: "Machine learning models inductively calibrate parameters from training data; flawed or uncleaned inputs result in flawed and unreliable model predictions regardless of algorithm sophistication.",
    explanation: "Unlike deterministic programs that crash when encountering corrupted inputs, ML algorithms silently fit parameters to noisy, biased, or invalid records, learning spurious patterns and producing deceptively poor generalization in production.",
    hint: "Think about how an algorithm learns weights from patterns: if the data is biased or corrupt, what will the weights reflect?",
    level: "Basic",
    codeExample: "# GIGO Demo: Training on dirty data without cleaning\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\n# Synthetic dirty data with corrupt sentinel value (9999)\nX_dirty = np.array([[1], [2], [3], [9999]])\ny = np.array([2, 4, 6, 8])\nmodel = LinearRegression().fit(X_dirty, y)\nprint('Slope with corrupted input:', model.coef_[0])  # Severely distorted slope!"
  },
  {
    id: 2,
    question: "What is the key difference between Data Cleaning and Feature Engineering?",
    shortAnswer: "Data Cleaning fixes defects, errors, missingness, and inconsistencies in existing data; Feature Engineering creates new informative representations or transforms features to improve model learning.",
    explanation: "Data Cleaning focuses on data fidelity (imputing nulls, evicting duplicate rows, removing sensor noise, stripping whitespace). Feature Engineering focuses on expressiveness (creating interaction terms, polynomial features, log-transforms, or aggregating ratios).",
    hint: "One is about sanitizing mistakes in the raw data; the other is about creating new mathematical signals for the model.",
    level: "Basic",
    codeExample: "# Data Cleaning: Impute missing values\ndf['age'] = df['age'].fillna(df['age'].median())\n\n# Feature Engineering: Create a new interaction feature\ndf['power_to_weight_ratio'] = df['horsepower'] / df['weight']"
  },
  {
    id: 3,
    question: "Why do standard Scikit-Learn estimators raise a ValueError when passed raw data containing NaN values?",
    shortAnswer: "Underlying linear algebra libraries (BLAS/LAPACK) and mathematical loss formulations require finite real numbers; NaN operations propagate and invalidate matrix computations.",
    explanation: "Matrix multiplication, dot products, vector norms, and eigenvalue decompositions cannot compute on undefined floating-point values (NaN). Any computation involving NaN yields NaN, which would collapse loss calculation and gradient updates.",
    hint: "Consider what happens when you compute the dot product of two vectors if one entry is NaN.",
    level: "Basic",
    codeExample: "import numpy as np\nfrom sklearn.linear_model import Ridge\n\nX = np.array([[1.0, 2.0], [np.nan, 3.0]])\ny = np.array([1, 2])\ntry:\n    Ridge().fit(X, y)\nexcept ValueError as e:\n    print('Scikit-Learn error:', e)  # 'Input contains NaN'"
  },
  {
    id: 4,
    question: "What are the four primary dimensions of Data Quality evaluated during the initial audit phase?",
    shortAnswer: "Completeness (null ratio), Uniqueness (absence of duplicates), Consistency (uniform casing and format), and Validity (conformance to physical domain ranges).",
    explanation: "A robust data audit assesses: 1. Completeness (% of non-null observations); 2. Uniqueness (distinct primary keys); 3. Consistency (standardized strings, dates, and units); 4. Validity (e.g. human age strictly between 0 and 120 years).",
    hint: "Recall the 4 dimensions: How complete is it? Are rows unique? Is formatting uniform? Are values physically plausible?",
    level: "Basic",
    codeExample: "# Quick Data Quality Audit in Pandas\ndef audit_dataset(df, key_col):\n    completeness = (1 - df.isnull().mean()) * 100\n    uniqueness = (df[key_col].nunique() / len(df)) * 100\n    return {'completeness_pct': completeness.to_dict(), 'uniqueness_pct': uniqueness}"
  },
  {
    id: 5,
    question: "What is the mathematical difference between Min-Max Normalization and Z-Score Standardization?",
    shortAnswer: "Min-Max scales values into a fixed bounded interval [0, 1] using min and max; Z-Score transforms data to mean 0 and standard deviation 1 without bounded limits.",
    explanation: "Min-Max Normalization: x' = (x - x_min) / (x_max - x_min). Z-Score Standardization: z = (x - mu) / sigma. Min-Max is heavily compressed by extreme outliers; Z-Score is unconstrained and preserves outlier distance in units of standard deviations.",
    hint: "One creates a bounded [0, 1] box; the other shifts the center to 0 and scales spread by sigma.",
    level: "Basic",
    codeExample: "from sklearn.preprocessing import MinMaxScaler, StandardScaler\nimport numpy as np\n\ndata = np.array([[10], [20], [30], [1000]]) # Notice extreme outlier\nprint('Min-Max:\\n', MinMaxScaler().fit_transform(data))\nprint('Z-Score:\\n', StandardScaler().fit_transform(data))"
  },
  {
    id: 6,
    question: "What is One-Hot Encoding and why is it preferred over arbitrary integer mapping for nominal categorical features?",
    shortAnswer: "One-Hot Encoding maps categories into individual binary columns, preventing linear and distance models from assuming false ordinal magnitude relationships.",
    explanation: "If Kolkata, Barrackpore, and Howrah are encoded as 0, 1, and 2, a linear model interprets Howrah as having twice the mathematical value of Barrackpore. One-Hot Encoding creates orthogonal binary indicators where all categories are equidistant in Euclidean space.",
    hint: "What happens if a model calculates w * x and x=2 vs x=1 for city names?",
    level: "Basic",
    codeExample: "import pandas as pd\n\ndf = pd.DataFrame({'city': ['Kolkata', 'Barrackpore', 'Howrah']})\n# One-Hot Encoding produces 3 binary columns\nencoded_df = pd.get_dummies(df['city'], prefix='city', dtype=int)\nprint(encoded_df)"
  },
  {
    id: 7,
    question: "Why is deduplication of records essential before training machine learning models?",
    shortAnswer: "Duplicate records artificially inflate sample weights, skew loss gradients toward over-represented samples, and can cause data leakage if copies appear in both train and test splits.",
    explanation: "If identical records exist, gradient descent treats each copy as an independent observation, biasing the model towards memorizing those exact points. Furthermore, if identical records leak across the train/test split, test evaluation metrics become artificially high.",
    hint: "What happens if the exact same student record appears 50 times in training and also in test?",
    level: "Basic",
    codeExample: "import pandas as pd\n\ndf = pd.DataFrame({'id': [1, 2, 2, 3], 'grade': [85, 90, 90, 78]})\nclean_df = df.drop_duplicates(subset=['id'], keep='first')\nprint(f'Original: {len(df)} rows, Clean: {len(clean_df)} rows')"
  },
  {
    id: 8,
    question: "What is the primary architectural advantage of using a Scikit-Learn Pipeline over running standalone pandas scripts?",
    shortAnswer: "A Pipeline encapsulates all transformation steps and estimators into a single callable object, preventing data leakage and guaranteeing identical transformations at inference time.",
    explanation: "Pipelines tie together preprocessing transformers and the final model. Calling pipeline.fit(X_train) calculates parameters strictly from train data, and pipeline.predict(X_test) applies identical learned scalers and encoders without manual step tracking.",
    hint: "Think about reproducibility and packaging: how do you deploy preprocessing and model together without mismatched steps?",
    level: "Basic",
    codeExample: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\n\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('classifier', LogisticRegression())\n])\n# Fits scaler strictly on train, then fits classifier\npipe.fit(X_train, y_train)\n# Automatically scales test data before predicting!\npreds = pipe.predict(X_test)"
  },

  // =========================================================================
  // MODERATE QUESTIONS (9 - 16)
  // =========================================================================
  {
    id: 9,
    question: "Explain the concept of Data Leakage during feature scaling and describe how it occurs.",
    shortAnswer: "Data Leakage occurs when preprocessing parameters (such as global mean, min, max, or standard deviation) are computed using both training and testing datasets together.",
    explanation: "If you call scaler.fit_transform(X) on the entire dataset before splitting, the training phase gains knowledge about the test set's distribution and range. This produces overly optimistic cross-validation scores that fail to replicate in real-world deployment.",
    hint: "What parameters does a scaler learn during .fit()? Where should those parameters come from exclusively?",
    level: "Moderate",
    codeExample: "from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\n# CORRECT (Anti-leakage):\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train) # Fit ONLY on train!\nX_test_scaled = scaler.transform(X_test)       # Transform test using train stats"
  },
  {
    id: 10,
    question: "Why does the k-Nearest Neighbors (k-NN) algorithm catastrophically degrade if numerical features are left unscaled?",
    shortAnswer: "k-NN relies on distance metrics like Euclidean distance; features with large numerical magnitudes completely dominate the distance computation, rendering smaller-scale features irrelevant.",
    explanation: "Euclidean distance d(p, q) = sqrt((salary_p - salary_q)^2 + (age_p - age_q)^2). A difference of Rs 5,000 in salary produces a squared term of 25,000,000, while an age difference of 10 years produces only 100. The distance calculation effectively ignores age completely.",
    hint: "Compare (50000 - 45000)^2 with (25 - 20)^2 in the Euclidean distance formula.",
    level: "Moderate",
    codeExample: "import numpy as np\n# Patient A: Age 25, Income 50,000; Patient B: Age 65, Income 50,100\np1 = np.array([25, 50000])\np2 = np.array([65, 50100])\ndist_unscaled = np.linalg.norm(p1 - p2)  # Dominated by 100 Rs difference!\nprint(f'Unscaled Distance: {dist_unscaled:.2f}')"
  },
  {
    id: 11,
    question: "Why are Decision Trees and Random Forests invariant to monotonic feature scaling such as Min-Max or Standardization?",
    shortAnswer: "Decision Trees evaluate split criteria (Gini impurity or Information Gain) on sorted feature order rather than geometric distance or magnitude.",
    explanation: "A decision tree asks: 'Is x_i <= threshold?'. Because monotonic scaling preserves the exact sorted ranking of all observations, the best split point is simply scaled by the same transformation, resulting in mathematically identical trees and decision boundaries.",
    hint: "If you multiply all values of x by 100, does the relative ranking (which value is bigger than which) change?",
    level: "Moderate",
    codeExample: "from sklearn.tree import DecisionTreeClassifier\n# Decision Trees yield identical splits whether features are raw or scaled\ntree1 = DecisionTreeClassifier(random_state=42).fit(X_train, y_train)\ntree2 = DecisionTreeClassifier(random_state=42).fit(X_train_scaled, y_train)\nprint('Predictions match:', (tree1.predict(X_test) == tree2.predict(X_test_scaled)).all())"
  },
  {
    id: 12,
    question: "When is Median Imputation strongly preferred over Mean Imputation for missing numerical values?",
    shortAnswer: "Median Imputation is preferred when the numerical feature contains severe skewness or extreme outliers, as the median is a robust non-parametric central measure.",
    explanation: "The arithmetic mean minimizes squared error, making it highly sensitive to extreme values (e.g., WBSEDCL power spike of 9999 kWh). Imputing with the mean shifts the entire imputed mass toward the outlier. The median represents the 50th percentile and remains unaffected by extreme values.",
    hint: "If 9 people earn Rs 20,000 and 1 person earns Rs 100,00,000, does the mean or median represent the typical person?",
    level: "Moderate",
    codeExample: "import numpy as np\nfrom sklearn.impute import SimpleImputer\n\nincomes = np.array([[20000], [22000], [21000], [np.nan], [5000000]])\nimp_mean = SimpleImputer(strategy='mean').fit_transform(incomes)\nimp_med  = SimpleImputer(strategy='median').fit_transform(incomes)\nprint('Mean imputed:', imp_mean[3][0])    # Heavily distorted (~1,265,750)\nprint('Median imputed:', imp_med[3][0])  # Realistic value (21,500)"
  },
  {
    id: 13,
    question: "How do extreme outliers distort the Min-Max Normalization formula?",
    shortAnswer: "An extreme maximum outlier forces x_max to an artificially large value, compressing the non-outlier majority of the data into an extremely narrow band near 0.0.",
    explanation: "If legitimate features range from 10 to 50, but one sensor error enters 10,000, then (x - 10) / (10000 - 10) results in all normal points falling between 0.000 and 0.004, destroying variance and feature resolution.",
    hint: "What happens to the denominator (x_max - x_min) when x_max is 10,000 instead of 50?",
    level: "Moderate",
    codeExample: "from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\n\nx = np.array([[10], [15], [20], [25], [10000]]) # Outlier at 10000\nscaled = MinMaxScaler().fit_transform(x)\nprint('Normal points compressed near zero:\\n', scaled[:4])"
  },
  {
    id: 14,
    question: "What is the primary danger of applying One-Hot Encoding to high-cardinality nominal features?",
    shortAnswer: "It triggers the curse of dimensionality, creating thousands of sparse binary columns that explode memory usage and cause tree algorithms to build overly deep, fragile branches.",
    explanation: "If an e-commerce dataset has 10,000 distinct PIN codes or product SKUs, One-Hot Encoding adds 10,000 columns. This introduces extreme sparsity, increases computational time, and risks severe overfitting unless Target Encoding or Frequency Encoding is used.",
    hint: "What happens to a DataFrame shape if you one-hot encode a column with 5,000 unique postal codes?",
    level: "Moderate",
    codeExample: "# High-cardinality trap\nimport pandas as pd\npin_codes = pd.Series([f'700{i:03d}' for i in range(5000)])\nencoded = pd.get_dummies(pin_codes)\nprint('Resulting matrix shape:', encoded.shape)  # (5000, 5000) sparse matrix!"
  },
  {
    id: 15,
    question: "What are 'sentinel values' (e.g. -999, 9999, 99) and why do automated null-check routines fail to detect them?",
    shortAnswer: "Sentinel values are special numerical flags used by legacy databases to represent missing or invalid entries; because they are valid floating-point numbers, automated checks do not flag them as NaN.",
    explanation: "If a medical monitor records -999 when a heart rate sensor disconnects, Python treats -999 as a real integer. A standard `df.isna()` check returns False, and calculating the mean patient heart rate yields negative numbers, corrupting downstream models.",
    hint: "Does `np.isnan(-999)` evaluate to True or False?",
    level: "Moderate",
    codeExample: "import pandas as pd\nimport numpy as np\n\ns = pd.Series([72, 75, -999, 80])\nprint('Missing detected by default:', s.isna().sum())  # 0 missing!\n# Correct approach:\ns_clean = s.replace(-999, np.nan)\nprint('Missing after sentinel replacement:', s_clean.isna().sum())  # 1 missing"
  },
  {
    id: 16,
    question: "How does Ordinal Encoding introduce invalid mathematical assumptions when applied to nominal data?",
    shortAnswer: "Ordinal encoding assigns incremental integers (0, 1, 2, ...) which linear models interpret as a quantitative distance and ranking that does not exist in nominal data.",
    explanation: "If marital status (Single=0, Married=1, Divorced=2) is ordinally encoded, an algorithm assumes Divorced > Married > Single, and that Divorced - Married = Married - Single. Linear regression will fit a single weight w, forcing a rigid arithmetic relationship on unrelated categories.",
    hint: "Is 'Divorced' mathematically greater than 'Married'?",
    level: "Moderate",
    codeExample: "# Flawed ordinal assignment for nominal categories\nmapping = {'Red': 0, 'Green': 1, 'Blue': 2}\n# Implies Blue is 'twice' as much color as Green, which is nonsensical!"
  },

  // =========================================================================
  // ADVANCED QUESTIONS (17 - 24)
  // =========================================================================
  {
    id: 17,
    question: "How does the condition number kappa of the Hessian matrix relate to feature scaling and Gradient Descent convergence?",
    shortAnswer: "Unscaled features create an ill-conditioned Hessian with a large condition number kappa = lambda_max / lambda_min, causing gradient descent to oscillate wildly and converge at an exponentially slower rate.",
    explanation: "When features have vastly different scales, the quadratic loss surface forms an elongated elliptical valley. The convergence rate is bounded by ((kappa - 1) / (kappa + 1))^t. Feature standardization sphericizes the contours (kappa approx 1), enabling optimal linear convergence.",
    hint: "Recall the geometry of level curves: circles vs elongated ellipses.",
    level: "Advanced",
    codeExample: "# Ill-conditioned vs Well-conditioned Hessian condition number\nimport numpy as np\n# Unscaled features: x1 in [0, 1], x2 in [0, 1000]\nX_unscaled = np.array([[1.0, 1000.0], [0.5, 500.0], [0.8, 800.0]])\nH_unscaled = X_unscaled.T @ X_unscaled\nkappa_unscaled = np.linalg.cond(H_unscaled)\nprint(f'Unscaled Condition Number: {kappa_unscaled:.1e}')  # Very large (~10^6)"
  },
  {
    id: 18,
    question: "Explain the mathematical formulation of the Interquartile Range (IQR) method for outlier fencing.",
    shortAnswer: "IQR = Q3 - Q1. The Tukey fencing bounds are: Lower Fence = Q1 - 1.5 * IQR, Upper Fence = Q3 + 1.5 * IQR; any observation outside this range is flagged as an outlier.",
    explanation: "Q1 is the 25th percentile and Q3 is the 75th percentile. Under a standard normal distribution, [Q1 - 1.5*IQR, Q3 + 1.5*IQR] covers approximately 99.3% of the distribution (equivalent to ~2.7 sigma), providing a non-parametric outlier threshold robust to sample extremes.",
    hint: "What percentiles correspond to the 1st and 3rd quartiles, and what is the standard Tukey multiplier?",
    level: "Advanced",
    codeExample: "import numpy as np\ndef detect_iqr_outliers(data):\n    q1 = np.percentile(data, 25)\n    q3 = np.percentile(data, 75)\n    iqr = q3 - q1\n    lower = q1 - 1.5 * iqr\n    upper = q3 + 1.5 * iqr\n    return [x for x in data if x < lower or x > upper]"
  },
  {
    id: 19,
    question: "Differentiate between Missing Completely at Random (MCAR), Missing at Random (MAR), and Missing Not at Random (MNAR).",
    shortAnswer: "MCAR: Missingness is independent of any variable; MAR: Missingness depends on observed features; MNAR: Missingness depends on the unobserved missing value itself.",
    explanation: "MCAR: Battery dies randomly (safe for listwise deletion). MAR: Older patients are less likely to record heart rates in an app, but age is recorded (can impute conditioned on age). MNAR: High-income individuals intentionally refuse to disclose salary (systematic bias; requires specialized modeling).",
    hint: "Does missingness depend on nothing, on another known column, or on the missing value itself?",
    level: "Advanced",
    codeExample: "# MCAR vs MAR vs MNAR:\n# MCAR: random coin flip nulls -> simple mean/median imputation works\n# MAR: if age > 60 then 30% nulls in blood_pressure -> use IterativeImputer (MICE)\n# MNAR: if salary > 1000000 then null -> missingness itself is an informative feature!"
  },
  {
    id: 20,
    question: "Why must custom preprocessing classes in Scikit-Learn implement .fit() and .transform() as separate methods rather than combining them into a single step?",
    shortAnswer: "Separation ensures stateful parameters are learned strictly from training data during .fit(), allowing the identical learned transformation to be applied to unseen test/production data during .transform().",
    explanation: "If .fit() and .transform() were inseparable, every time new test data or real-time production requests arrived, the transformer would re-fit its internal statistics on the query batch, causing severe distribution shifts and runtime errors.",
    hint: "What should a scaler do when a single new query row arrives in production? Re-calculate mean from 1 row?",
    level: "Advanced",
    codeExample: "from sklearn.base import BaseEstimator, TransformerMixin\nclass CustomZScaler(BaseEstimator, TransformerMixin):\n    def fit(self, X, y=None):\n        self.mean_ = X.mean(axis=0)\n        self.std_ = X.std(axis=0)\n        return self  # Return self for chaining\n    def transform(self, X):\n        return (X - self.mean_) / (self.std_ + 1e-8)"
  },
  {
    id: 21,
    question: "How should cyclical temporal features (such as hour of day 0-23 or day of week 0-6) be transformed to preserve continuous periodic boundaries?",
    shortAnswer: "By projecting the time component onto the unit circle using sine and cosine trigonometric transformations: x_sin = sin(2*pi*t / T) and x_cos = cos(2*pi*t / T).",
    explanation: "In raw integer representation, hour 23 and hour 0 have a numerical difference of 23, even though physically they are only 1 hour apart. Transforming into (sin, cos) coordinates places 23:00 and 00:00 adjacently on the unit circle with a Euclidean distance of ~0.26.",
    hint: "How does a clock wrap around from 23 to 0? How do you map a circle to 2D coordinates?",
    level: "Advanced",
    codeExample: "import numpy as np\ndef encode_cyclical_hour(hours):\n    sin_h = np.sin(2 * np.pi * hours / 24.0)\n    cos_h = np.cos(2 * np.pi * hours / 24.0)\n    return sin_h, cos_h\n# Hour 23 and Hour 0 are now adjacent in Euclidean space!\ns0, c0 = encode_cyclical_hour(0)\ns23, c23 = encode_cyclical_hour(23)\nprint('Circular distance:', np.sqrt((s0 - s23)**2 + (c0 - c23)**2))"
  },
  {
    id: 22,
    question: "What is Target Encoding (Mean Encoding) and how do you prevent catastrophic target leakage when computing it?",
    shortAnswer: "Target Encoding replaces each category with the average target label value for that category; target leakage is prevented using out-of-fold calculation and additive empirical Bayes smoothing.",
    explanation: "Directly replacing category C with mean(y | C) over the entire dataset leaks target labels into features. To prevent this, use K-Fold cross-validation splits to compute out-of-fold target averages, and smooth rare categories toward the global prior: S_c = (n_c * y_bar_c + m * y_prior) / (n_c + m).",
    hint: "What happens if a category appears only once with y=1? It would become a perfect leak!",
    level: "Advanced",
    codeExample: "from category_encoders import TargetEncoder\n# Uses smoothed empirical Bayes target encoding with regularization\nencoder = TargetEncoder(smoothing=10.0)\nX_train_encoded = encoder.fit_transform(X_train['category'], y_train)\nX_test_encoded = encoder.transform(X_test['category'])"
  },
  {
    id: 23,
    question: "When and why should a logarithmic transform y = log(x + 1) or Box-Cox transformation be applied to continuous features?",
    shortAnswer: "When continuous features display heavy right-skewness (Pareto / power-law distributions); log transforms compress extreme tails and stabilize variance to satisfy linear normality assumptions.",
    explanation: "Variables like income, property prices, and WBSEDCL power consumption span multiple orders of magnitude with long right tails. Taking log(x + 1) pulls outliers toward the median, stabilizes homoscedasticity, and produces a symmetric, roughly Gaussian bell curve.",
    hint: "Think about house prices in Kolkata: most are 30-80 Lakhs, but a few are 50 Crores.",
    level: "Advanced",
    codeExample: "import numpy as np\n# Skewed incomes\nraw_incomes = np.array([25000, 30000, 28000, 50000000])\n# Log1p transformation: log(1 + x)\nlog_incomes = np.log1p(raw_incomes)\nprint('Raw spread:', raw_incomes.max() / raw_incomes.min())\nprint('Log-transformed values:', np.round(log_incomes, 2))"
  },
  {
    id: 24,
    question: "How do L1 (Lasso) and L2 (Ridge) regularization penalties behave when features are left unscaled?",
    shortAnswer: "Regularization penalizes weight magnitudes uniformly via lambda * ||w||; unscaled features with small scales require large weights, causing the penalty to unfairly penalize and shrink them regardless of importance.",
    explanation: "If feature x_1 is in grams (large scale) and x_2 is in kilograms (small scale), the true physical relationship requires w_2 = 1000 * w_1. Because Ridge penalizes sum(w_j^2), it severely penalizes w_2 while leaving w_1 unpenalized, artificially shrinking x_2.",
    hint: "Why would an optimizer shrink a weight just because its measurement unit is in kilometers rather than millimeters?",
    level: "Advanced",
    codeExample: "from sklearn.linear_model import Ridge\nimport numpy as np\n# Unscaled: feature 2 is 1000x smaller, requiring 1000x larger weight\nX = np.array([[1.0, 0.001], [2.0, 0.002]])\ny = np.array([5, 10])\n# Ridge will suppress feature 2's weight because w2^2 is penalized heavily!\nmodel = Ridge(alpha=1.0).fit(X, y)\nprint('Fitted weights:', model.coef_)"
  },

  // =========================================================================
  // EXPERT QUESTIONS (25 - 30)
  // =========================================================================
  {
    id: 25,
    question: "What is Training-Serving Skew in production machine learning and how do modern Feature Stores eliminate it?",
    shortAnswer: "Training-Serving Skew is a discrepancy in model performance caused by inconsistent data processing between the offline training environment and online real-time serving infrastructure.",
    explanation: "Skew happens when offline features are generated using SQL/Pandas batch jobs while online features are computed via Java/Go microservices with subtle differences in logic or time windows. Feature Stores (e.g. Feast, Hopsworks) guarantee a single shared transformation definition for both offline and online reads.",
    hint: "What happens if training uses Python `round()` (banker's rounding) and the production API uses standard rounding?",
    level: "Expert",
    codeExample: "# Concept: Single source of truth feature definition\n# Offline batch (Parquet) and Online real-time (Redis) read identical feature logic\n# Eliminates the fatal divergence of duplicate preprocessing implementations"
  },
  {
    id: 26,
    question: "How do distributed preprocessing frameworks (such as Apache Spark MLlib) compute global scaling parameters without memory overflow?",
    shortAnswer: "They utilize associative and commutative reduction operations (map-reduce trees) to compute local partial sums, sum-of-squares, counts, mins, and maxes across partition nodes, combining them at the driver.",
    explanation: "To calculate mean mu and variance sigma^2 over 10 billion records, worker nodes compute local n_i, sum(x), and sum(x^2). The driver accumulates these partial scalars in O(1) memory using Welford's algorithm or parallel reduction, avoiding pulling the full dataset into memory.",
    hint: "Can you calculate the combined mean of two datasets if you only know their individual counts and means?",
    level: "Expert",
    codeExample: "# Parallel reduction for mean across 2 worker partitions:\ndef combine_partitions(n1, mean1, n2, mean2):\n    n_total = n1 + n2\n    combined_mean = (n1 * mean1 + n2 * mean2) / n_total\n    return n_total, combined_mean"
  },
  {
    id: 27,
    question: "What is Schema Drift and how does an automated data validation system (e.g. Great Expectations, TensorFlow Data Validation) safeguard pipelines?",
    shortAnswer: "Schema Drift occurs when upstream data sources change schema unexpectedly (new categories, changed data types, renamed columns); validation suites enforce declarative contracts that halt pipelines upon violation.",
    explanation: "If an upstream database changes 'gender' from ['M', 'F'] to ['Male', 'Female', 'Other'], an unmonitored one-hot encoder drops all rows or assigns zeros. Automated validation checks schemas against predefined expectations before allowing training or inference.",
    hint: "How does a production system know if an upstream microservice added a new enum value?",
    level: "Expert",
    codeExample: "# Declarative Schema Expectation Example\nexpectation_suite = {\n    'columns': {\n        'voltage_fluctuation': {'min_value': 0.0, 'max_value': 100.0, 'type': 'float'},\n        'region': {'allowed_values': ['Bidhannagar', 'Rajarhat', 'Barrackpore']}\n    }\n}"
  },
  {
    id: 28,
    question: "Why can improper or aggressive outlier removal cause severe survivorship bias and selection bias in real-world risk and fraud models?",
    shortAnswer: "In fraud detection and credit risk, the most critical phenomena and attack vectors naturally manifest as statistical outliers; removing them purges the positive minority class from the training set.",
    explanation: "If an engineer naively clips all transactions exceeding 3 standard deviations, they effectively erase massive fraudulent wire transfers. Outlier removal must distinguish between measurement error (bad sensors) and authentic tail phenomena (rare, high-value real events).",
    hint: "In fraud detection, what does a financial transaction outlier usually represent?",
    level: "Expert",
    codeExample: "# Flawed preprocessing in fraud detection\n# df = df[df['amount'] < df['amount'].quantile(0.99)]\n# DANGER: You just removed 85% of actual credit card fraud cases!"
  },
  {
    id: 29,
    question: "How does a Quantile Transformer handle bimodal and multimodal feature distributions compared to standard Gaussian scalers?",
    shortAnswer: "It maps the empirical cumulative distribution function (CDF) non-linearly to a uniform or standard normal distribution, smoothing out multi-peaked distributions and reducing outlier leverage.",
    explanation: "Standardization subtracts mean and divides by standard deviation, which merely shifts and scales without altering distribution shape. If a feature has two distinct modes (e.g. morning and evening rush hours), QuantileTransformer uses rank percentiles to stretch dense regions and compress sparse tails into an exact Gaussian curve.",
    hint: "Standardization preserves the exact shape of the histogram; what transformer can reshape it into a normal bell curve?",
    level: "Expert",
    codeExample: "from sklearn.preprocessing import QuantileTransformer\nimport numpy as np\n# Bimodal distribution\nx_bimodal = np.concatenate([np.random.normal(5, 1, 500), np.random.normal(25, 2, 500)]).reshape(-1, 1)\nqt = QuantileTransformer(output_distribution='normal', random_state=42)\nx_gaussian = qt.fit_transform(x_bimodal)\nprint('Transformed shape is Gaussian:', np.round(np.mean(x_gaussian), 2), np.round(np.std(x_gaussian), 2))"
  },
  {
    id: 30,
    question: "Why is standard zero-centering (StandardScaler with with_mean=True) avoided when preprocessing large sparse matrices (scipy.sparse CSR)?",
    shortAnswer: "Subtracting the mean from all entries turns every implicit zero into a non-zero floating-point number (-mu), destroying matrix sparsity and causing immediate out-of-memory (OOM) crashes.",
    explanation: "In natural language processing or bag-of-words text matrices, 99% of entries are zeros stored efficiently in compressed sparse row (CSR) format. Subtracting mean mu converts billions of zeroes into explicit floating-point numbers, inflating memory footprint from megabytes to hundreds of gigabytes.",
    hint: "If you have a 1,000,000 x 100,000 matrix with 99.9% zeros, what happens if zero becomes -0.05?",
    level: "Expert",
    codeExample: "from sklearn.preprocessing import StandardScaler\nfrom scipy.sparse import csr_matrix\n\nX_sparse = csr_matrix([[0, 1, 0], [0, 0, 2], [1, 0, 0]])\n# with_mean=False preserves sparsity without dense expansion\nscaler = StandardScaler(with_mean=False)\nX_scaled_sparse = scaler.fit_transform(X_sparse)\nprint('Remains sparse CSR:', type(X_scaled_sparse))"
  }
];

export default questions;
