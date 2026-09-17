/**
 * Topic 11: Data, Features, Labels and Target Variables
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "In machine learning terminology, what is a 'Feature Vector'?",
    "shortAnswer": "An ordered d-dimensional numerical vector x = [x_1, x_2, ..., x_d]^T representing measurable individual characteristics of an observation.",
    "explanation": "Every data sample (e.g. a house, patient, or credit applicant) is mathematically converted into a point in d-dimensional feature space \u211d^d. Each coordinate x_j represents a distinct quantitative or encoded attribute.",
    "hint": "Mathematical vector of numerical attributes describing a single data instance.",
    "level": "Basic",
    "codeExample": "import numpy as np\nx_student = np.array([5.5, 88.0, 1.0]) # [StudyHours, AttendancePercentage, PassedPreviousExam]"
  },
  {
    "id": 2,
    "question": "What is the 'Feature Matrix' (Design Matrix) X in tabular machine learning?",
    "shortAnswer": "An N x d matrix where each row represents one of N observations and each column represents one of d feature attributes.",
    "explanation": "In mathematical notation, X \u2208 \u211d^{N \u00d7 d}. X_{ij} denotes the value of the j-th feature for the i-th data sample. Standardizing data into a 2D matrix allows efficient vectorized linear algebra operations using BLAS / LAPACK libraries.",
    "hint": "2D tabular array: Rows = Samples, Columns = Features.",
    "level": "Basic",
    "codeExample": "X = np.array([\n    [1800, 3, 4],  # Sample 1: [SqFt, Beds, Age]\n    [2400, 4, 2],  # Sample 2\n    [1200, 2, 10]  # Sample 3\n])"
  },
  {
    "id": 3,
    "question": "What is the difference between a 'Feature' and a 'Label' (Target Variable)?",
    "shortAnswer": "Features (X) are independent input variables used for making predictions; the Label (y) is the dependent ground-truth outcome to be predicted.",
    "explanation": "In supervised learning, features are the explanatory attributes supplied to the hypothesis function h(x). The label y is the supervisor target that the model attempts to learn to estimate accurately.",
    "hint": "Independent input attributes vs dependent output outcome.",
    "level": "Basic",
    "codeExample": "# Features X: House Size, Bedrooms, Neighborhood\n# Label y: Sale Price ($)"
  },
  {
    "id": 4,
    "question": "What are the four primary statistical Scales of Measurement for data attributes?",
    "shortAnswer": "Nominal (unordered categories), Ordinal (ordered categories), Interval (meaningful differences, no true zero), and Ratio (meaningful differences and absolute true zero).",
    "explanation": "1. Nominal: Blood group (A, B, O). 2. Ordinal: Education level (High School < BSc < PhD). 3. Interval: Temperature in Celsius (0\u00b0C does not mean absence of heat). 4. Ratio: Salary, Weight, Distance (0 kg means zero mass; \u20b9100 is twice \u20b950).",
    "hint": "NOIR hierarchy: Nominal, Ordinal, Interval, Ratio.",
    "level": "Moderate",
    "codeExample": "# Nominal: Colors ('Red', 'Blue')\n# Ordinal: Rating ('Low', 'Medium', 'High')\n# Ratio: Annual Salary in Rupees"
  },
  {
    "id": 5,
    "question": "How does One-Hot Encoding transform Nominal categorical variables for machine learning models?",
    "shortAnswer": "By creating K binary indicator columns (0 or 1) for each of the K unique category levels.",
    "explanation": "Because machine learning algorithms perform arithmetic operations on numbers, arbitrarily assigning integers to nominal categories ('Kolkata'=1, 'Delhi'=2, 'Mumbai'=3) falsely implies mathematical ordering and distance (e.g. Mumbai is 3x Kolkata). One-Hot encoding treats each level independently.",
    "hint": "Converting unique category strings into orthogonal binary 0/1 indicator vectors.",
    "level": "Basic",
    "codeExample": "import pandas as pd\ndf = pd.DataFrame({'City': ['Kolkata', 'Delhi', 'Mumbai']})\ndf_encoded = pd.get_dummies(df, columns=['City'], drop_first=False)"
  },
  {
    "id": 6,
    "question": "Why is the 'Dummy Variable Trap' (Multicollinearity) created when using One-Hot Encoding without dropping a reference column in Linear Regression?",
    "shortAnswer": "The sum of all K indicator columns equals the constant vector 1, creating exact linear dependency with the intercept term.",
    "explanation": "If a feature has 3 categories, x_1 + x_2 + x_3 = 1. This causes the matrix X^T X to be singular and non-invertible. Setting `drop_first=True` drops one reference category (retained in the baseline intercept), restoring full rank.",
    "hint": "Linear dependency between one-hot column sum and intercept column.",
    "level": "Moderate",
    "codeExample": "# Drop first column to prevent perfect multicollinearity\npd.get_dummies(df['Gender'], drop_first=True)"
  },
  {
    "id": 7,
    "question": "When should Ordinal Encoding (Integer Label Encoding) be applied instead of One-Hot Encoding?",
    "shortAnswer": "When categorical levels possess an intrinsic, meaningful logical ranking (e.g., Low=1, Medium=2, High=3).",
    "explanation": "Ordinal encoding preserves the natural ordering of categories. Tree-based models (like Decision Trees, Random Forests) can split on ordinal integers effectively (e.g. `Education_Level >= 2`), capturing monotonic progression without exploding feature dimensionality.",
    "hint": "Categories with natural hierarchical ranking.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import OrdinalEncoder\nencoder = OrdinalEncoder(categories=[['Poor', 'Average', 'Good', 'Excellent']])\nX_ord = encoder.fit_transform([['Good'], ['Poor'], ['Excellent']])"
  },
  {
    "id": 8,
    "question": "What is the difference between Discrete Numerical Features and Continuous Numerical Features?",
    "shortAnswer": "Discrete features take countable distinct integer values (e.g., number of bedrooms); Continuous features take uncountably infinite real values on an interval (e.g., exact temperature).",
    "explanation": "Discrete: Count of customer support calls (0, 1, 2, ...). Continuous: Time spent on webpage (14.285 seconds, any real number in \u211d^+). While both are numerical, discrete features may follow Poisson/Negative Binomial distributions, whereas continuous features often follow Gaussian distributions.",
    "hint": "Countable integer counts vs real-valued continuous measurements.",
    "level": "Basic",
    "codeExample": "# Discrete: df['num_children'] = [0, 2, 1, 3]\n# Continuous: df['sensor_voltage'] = [3.312, 3.289, 3.305]"
  },
  {
    "id": 9,
    "question": "What is Standardization (Z-score Normalization) and what are its mean and standard deviation properties?",
    "shortAnswer": "z = (x - \u03bc) / \u03c3; transforms feature distribution to have mean \u03bc = 0 and standard deviation \u03c3 = 1.",
    "explanation": "Standardization centers the feature at 0 and rescales variance to 1. It is the preferred scaling method for algorithms assuming Gaussian-distributed inputs or using gradient descent (e.g., Logistic Regression, SVM, PCA, Neural Networks) because it handles outliers without compressing all points into a tight band.",
    "hint": "Centering by subtracting mean and scaling by dividing by standard deviation.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_standardized = scaler.fit_transform(X)"
  },
  {
    "id": 10,
    "question": "What is Min-Max Normalization (Feature Rescaling) and what is its output range?",
    "shortAnswer": "x_norm = (x - x_min) / (x_max - x_min); bounds all feature values strictly within the interval [0, 1].",
    "explanation": "Min-Max scaling guarantees bounded positive ranges, essential for algorithms that require bounded inputs (such as image pixel values in neural nets or bounded distance functions). However, extreme outliers will compress in-distribution points into a narrow cluster near 0.",
    "hint": "Rescaling all values into the bounded range [0, 1].",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import MinMaxScaler\nscaler = MinMaxScaler(feature_range=(0, 1))\nX_normalized = scaler.fit_transform(X)"
  },
  {
    "id": 11,
    "question": "What is Robust Scaling and why is it preferred when data contains extreme outliers?",
    "shortAnswer": "x_robust = (x - Median) / IQR; uses median and Interquartile Range (Q3 - Q1) which are unaffected by extreme values.",
    "explanation": "Mean and standard deviation are heavily corrupted by massive outliers. Because the median represents the 50th percentile and IQR spans the middle 50% of the distribution (25th to 75th percentile), RobustScaler rescales the central data cluster without being skewed by anomalies.",
    "hint": "Scaling using median and IQR to neutralize extreme outlier leverage.",
    "level": "Moderate",
    "codeExample": "from sklearn.preprocessing import RobustScaler\nscaler = RobustScaler()\nX_robust = scaler.fit_transform(X)"
  },
  {
    "id": 12,
    "question": "What is the purpose of Log Transformation (e.g. `np.log1p`) on right-skewed numerical features?",
    "shortAnswer": "To compress long right tails, stabilize variance, and transform skewed exponential distributions into approximately symmetrical Gaussian bells.",
    "explanation": "Financial features (income, house prices, transaction amounts) are typically heavy-tailed power-law distributions. Applying y' = ln(1 + y) pulls extreme positive values inward, linearizing exponential relationships and improving linear model convergence.",
    "hint": "Compresses heavy right-skewed tails into symmetric normal distributions.",
    "level": "Moderate",
    "codeExample": "import numpy as np\nX['log_income'] = np.log1p(X['annual_income']) # log(1 + x) handles x=0 safely"
  },
  {
    "id": 13,
    "question": "What is the Box-Cox and Yeo-Johnson Power Transformation in feature engineering?",
    "shortAnswer": "Parametric transformations parameterized by \u03bb that find the optimal power transformation to maximize normality; Yeo-Johnson supports negative numbers.",
    "explanation": "Box-Cox transforms strictly positive data via y^(\u03bb) = (y^\u03bb - 1)/\u03bb if \u03bb\u22600 else ln(y). Yeo-Johnson extends this to zero and negative values, optimizing \u03bb via maximum likelihood estimation to minimize skewness and heteroscedasticity.",
    "hint": "Parametric power transformations optimizing feature normality.",
    "level": "Expert",
    "codeExample": "from sklearn.preprocessing import PowerTransformer\npt = PowerTransformer(method='yeo-johnson')\nX_trans = pt.fit_transform(X)"
  },
  {
    "id": 14,
    "question": "What is Feature Binning (Discretization / Quantization)?",
    "shortAnswer": "Transforming continuous numerical features into discrete categorical bins or interval intervals (e.g. Age \u2192 [18-25, 26-35, 36-50, 50+]).",
    "explanation": "Binning allows linear models to capture non-linear piecewise step functions. Equal-width binning divides range into equal sizes; Equal-frequency (quantile) binning ensures an equal number of observations in each bin, handling skewed data robustly.",
    "hint": "Converting continuous scales into discrete interval buckets.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import KBinsDiscretizer\nkbins = KBinsDiscretizer(n_bins=5, encode='ordinal', strategy='quantile')\nX_binned = kbins.fit_transform(X[['age']])"
  },
  {
    "id": 15,
    "question": "What are Interaction Features (Cross-Features) in feature engineering?",
    "shortAnswer": "Synthesizing new features by multiplying or combining two or more individual features (e.g., x_new = x_1 * x_2).",
    "explanation": "Interaction features allow linear algorithms to learn synergistic multi-variable relationships (e.g., `BMI = Weight / Height^2` or `Total_Cost = Price_Per_Unit * Quantity`). Without explicit interaction terms, linear models treat features in isolation.",
    "hint": "Mathematical products or ratios between individual input features.",
    "level": "Basic",
    "codeExample": "# Interaction feature creation\ndf['living_area_per_bedroom'] = df['total_sqft'] / df['num_bedrooms']"
  },
  {
    "id": 16,
    "question": "What is Cyclical Feature Encoding for temporal variables (e.g., Hour of Day, Month of Year)?",
    "shortAnswer": "Mapping cyclical features onto a 2D trigonometric circle using sine and cosine transformations: sin(2\u03c0 * t / T) and cos(2\u03c0 * t / T).",
    "explanation": "If hour 23 (11 PM) and hour 0 (12 AM midnight) are represented as integers, the model thinks their difference is 23 units rather than 1 hour. Projecting onto unit circle sin/cos coordinates preserves continuous circular proximity.",
    "hint": "Sine and cosine projections preserving circular continuity of time features.",
    "level": "Moderate",
    "codeExample": "df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24.0)\ndf['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24.0)"
  },
  {
    "id": 17,
    "question": "What is the difference between Missing Completely at Random (MCAR), Missing at Random (MAR), and Missing Not at Random (MNAR)?",
    "shortAnswer": "MCAR: missingness independent of all variables; MAR: missingness depends on observed features; MNAR: missingness depends on the unobserved value itself.",
    "explanation": "MCAR: a sensor battery randomly drops packets. MAR: younger patients are less likely to report blood pressure, but within age groups it is random. MNAR: high-income earners refuse to disclose their salary because their salary is high (systematic bias).",
    "hint": "Random missingness vs conditionally dependent vs non-random self-censoring.",
    "level": "Expert",
    "codeExample": "# MNAR requires creating explicit missingness indicator flag: df['income_missing'] = df['income'].isnull().astype(int)"
  },
  {
    "id": 18,
    "question": "What is K-Nearest Neighbors (KNN) Imputation for missing values?",
    "shortAnswer": "Imputing a missing feature value by taking the distance-weighted average of the k nearest complete rows in feature space.",
    "explanation": "Instead of replacing missing entries with a global column average, KNNImputer finds other samples that have similar observed feature coordinates (using nan-euclidean distance) and computes their mean to fill the missing entry.",
    "hint": "Multivariate imputation using localized similarity in feature space.",
    "level": "Moderate",
    "codeExample": "from sklearn.impute import KNNImputer\nimputer = KNNImputer(n_neighbors=5)\nX_imputed = imputer.fit_transform(X_with_nans)"
  },
  {
    "id": 19,
    "question": "What is Variance Thresholding in feature selection?",
    "shortAnswer": "Dropping features whose variance falls below a threshold (e.g. constant features with zero variance or quasi-constants with >99% identical values).",
    "explanation": "A feature that has the exact same value across 100% of rows contains zero mathematical information and cannot help discriminate between targets. Removing low-variance features simplifies models and reduces dimensionality at zero risk.",
    "hint": "Eliminating constant and near-constant feature columns.",
    "level": "Basic",
    "codeExample": "from sklearn.feature_selection import VarianceThreshold\nselector = VarianceThreshold(threshold=0.01)\nX_reduced = selector.fit_transform(X)"
  },
  {
    "id": 20,
    "question": "What is Mutual Information (Information Gain) in feature selection?",
    "shortAnswer": "A non-parametric metric measuring the reduction in uncertainty of target y given feature x: I(X; Y) = \u2211\u2211 P(x, y) log( P(x, y) / [P(x) P(y)] ).",
    "explanation": "Unlike linear Pearson correlation (which only detects straight-line relationships), Mutual Information captures any non-linear, quadratic, sinusoidal, or complex dependency. MI = 0 if and only if X and Y are completely statistically independent.",
    "hint": "Information-theoretic metric capturing both linear and complex non-linear relationships.",
    "level": "Moderate",
    "codeExample": "from sklearn.feature_selection import mutual_info_classif\nmi_scores = mutual_info_classif(X, y)\n# High MI score indicates strong predictive dependency"
  },
  {
    "id": 21,
    "question": "What is Correlation-Based Feature Pruning and why is it essential?",
    "shortAnswer": "Identifying pairs of features with high inter-correlation (|r| > 0.85-0.90) and removing one to eliminate redundant collinearity.",
    "explanation": "Feeding identical or redundant features (e.g. `Weight_in_Kg` and `Weight_in_Pounds`) doubles computational overhead, destabilizes linear model regression weights, and splits feature importance scores in tree models.",
    "hint": "Removing one feature from highly correlated pairs to eliminate redundancy.",
    "level": "Basic",
    "codeExample": "# Correlation pruning: drop upper triangle of correlation matrix > 0.90"
  },
  {
    "id": 22,
    "question": "What is Frequency (Count) Encoding for categorical attributes?",
    "shortAnswer": "Replacing each category with its empirical count or percentage frequency of occurrence in the dataset.",
    "explanation": "Useful for high-cardinality features (e.g. `merchant_id`). Categories that appear millions of times receive high frequency values, while rare niche merchants receive low frequency values, providing algorithms with immediate scale context.",
    "hint": "Replacing category labels with their dataset occurrence counts or fractions.",
    "level": "Basic",
    "codeExample": "freq_map = df['city'].value_counts(normalize=True).to_dict()\ndf['city_freq'] = df['city'].map(freq_map)"
  },
  {
    "id": 23,
    "question": "What is the Bag-of-Words (BoW) and TF-IDF representation for converting raw text into feature vectors?",
    "shortAnswer": "BoW counts word occurrences; TF-IDF scales term frequency by inverse document frequency to downweight ubiquitous common words.",
    "explanation": "TF-IDF(t, d, D) = TF(t, d) * log(N / DF(t)). Words that appear frequently in a specific document but rarely across the entire corpus (e.g., 'Barrackpore', 'Photosynthesis') receive high TF-IDF weights, while common stop words ('the', 'is') receive low weights.",
    "hint": "Term Frequency multiplied by Inverse Document Frequency across the corpus.",
    "level": "Basic",
    "codeExample": "from sklearn.feature_extraction.text import TfidfVectorizer\nvectorizer = TfidfVectorizer(max_features=5000, stop_words='english')\nX_tfidf = vectorizer.fit_transform(text_documents)"
  },
  {
    "id": 24,
    "question": "What is Dense Word Embedding (Word2Vec / GloVe) versus Sparse One-Hot Text Representation?",
    "shortAnswer": "One-Hot creates huge orthogonal sparse vectors with no semantics; Word2Vec produces compact dense vectors \u211d^d (e.g. d=300) capturing semantic analogies.",
    "explanation": "In One-Hot, `King` and `Queen` are orthogonal with dot product 0. Word2Vec trains a shallow neural network (CBOW/Skip-Gram) on word context co-occurrences, learning geometric relationships such as `Vector(King) - Vector(Man) + Vector(Woman) \u2248 Vector(Queen)`.",
    "hint": "Dense semantic vectors preserving linguistic context and algebraic analogies.",
    "level": "Moderate",
    "codeExample": "# Dense vector representation: word_vec = model['machine_learning'] # Shape (300,)"
  },
  {
    "id": 25,
    "question": "What is the difference between Extrinsic and Intrinsic Feature Importance?",
    "shortAnswer": "Intrinsic importance is built into the model structure (e.g. Gini importance in trees, coefficients in OLS); Extrinsic is model-agnostic (e.g. Permutation Importance).",
    "explanation": "Intrinsic importance is fast to compute during training. Extrinsic Permutation Feature Importance shuffles a single feature column in the validation set and measures the drop in model metric; if shuffling collapses accuracy, that feature is critically important.",
    "hint": "Internal model coefficients/splits vs post-hoc permutation shuffling drop.",
    "level": "Moderate",
    "codeExample": "from sklearn.inspection import permutation_importance\nresult = permutation_importance(model, X_val, y_val, n_repeats=10, random_state=42)"
  },
  {
    "id": 26,
    "question": "What is the effect of Non-Monotonic Feature Scaling on Distance-based vs Tree-based algorithms?",
    "shortAnswer": "Distance/gradient models are highly sensitive to feature scaling; Tree-based models are completely invariant to any monotonic feature scaling.",
    "explanation": "Decision trees only evaluate rank-order inequality thresholds `x_j \u2264 threshold`. Multiplying a feature by 1,000,000 or taking its logarithm changes the numerical threshold value identically without altering which data points fall into left or right child branches.",
    "hint": "Decision trees depend only on rank-ordering, making them immune to scaling.",
    "level": "Moderate",
    "codeExample": "# Decision Trees do NOT require StandardScaler or MinMaxScaler"
  },
  {
    "id": 27,
    "question": "What is Class Imbalance in target variables and what are the three standard strategies to resolve it?",
    "shortAnswer": "Severe disproportion between target classes (e.g. 99% Negative, 1% Positive); resolved via 1. Resampling (SMOTE/Undersampling), 2. Algorithmic Class Weights, and 3. Threshold Moving.",
    "explanation": "1. Resampling: SMOTE synthesizes artificial minority points along line segments connecting k-NN neighbors. 2. Class Weights: Modifies loss L = w_c * L_c penalizing minority errors heavily. 3. Threshold Moving: Adjusting decision cutoff below 0.5.",
    "hint": "SMOTE synthetic oversampling, loss class-weight penalties, and decision threshold tuning.",
    "level": "Basic",
    "codeExample": "# Resampling with SMOTE\n# from imblearn.over_sampling import SMOTE\n# X_res, y_res = SMOTE(random_state=42).fit_resample(X_train, y_train)"
  },
  {
    "id": 28,
    "question": "What is the difference between Soft Labels and Hard Labels in supervised learning?",
    "shortAnswer": "Hard labels are discrete 0/1 indicator targets; Soft labels are continuous probability distributions (e.g. [0.85, 0.15]) reflecting classification confidence.",
    "explanation": "Hard labels assert absolute certainty (y = 1). Soft labels capture ground-truth ambiguity (e.g., when 8 out of 10 doctors diagnose malignant and 2 diagnose benign: y = 0.8). Soft labels are also used in Knowledge Distillation to transfer dark knowledge from teacher to student models.",
    "hint": "Binary integer flags vs continuous probability distribution targets.",
    "level": "Moderate",
    "codeExample": "# Hard Label: y = [1, 0, 0]\n# Soft Label: y = [0.80, 0.15, 0.05]"
  },
  {
    "id": 29,
    "question": "What is Label Smoothing and how does it prevent model overconfidence?",
    "shortAnswer": "Replacing hard one-hot target 1 with (1 - \u03b5) and 0 with \u03b5 / (K - 1); prevents logits from exploding to \u00b1\u221e in cross-entropy loss.",
    "explanation": "When optimizing cross-entropy with hard labels, the loss is minimized only when the winning logit z_k approaches infinity. Label smoothing (e.g. \u03b5 = 0.1) adds entropy regularization, improving model calibration and generalization.",
    "hint": "Softening one-hot targets to prevent extreme logit growth and overconfident predictions.",
    "level": "Expert",
    "codeExample": "# Label smoothed target for binary classification (eps=0.1): y_smoothed = y * (1 - 0.1) + 0.5 * 0.1"
  },
  {
    "id": 30,
    "question": "What is the primary objective of Feature Engineering in applied Machine Learning?",
    "shortAnswer": "To transform raw messy data into numerical representations that expose the underlying problem structure most effectively to the learning algorithm.",
    "explanation": "As Turing laureate Andrew Ng stated: 'Coming up with features is difficult, time-consuming, and requires expert knowledge. Applied machine learning is basically feature engineering.' Great features allow simple, robust, fast algorithms to outperform complex architectures trained on raw data.",
    "hint": "Transforming domain data to make learning patterns easily discoverable by algorithms.",
    "level": "Basic",
    "codeExample": "# Raw: '2026-09-17 08:30:00' -> Engineered: [Hour=8, Is_Weekend=0, Month=9, Is_Rush_Hour=1]"
  }
];

export default questions;
