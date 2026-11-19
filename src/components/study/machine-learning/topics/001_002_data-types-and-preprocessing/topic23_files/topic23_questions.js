/**
 * Topic 23: Worked Example 3: Encoding City and Gender Columns
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION (Concepts, Stevens' Taxonomy, Label Encoding Hazards)
  // =========================================================================
  {
    id: 1,
    question: "Under Stanley Smith Stevens' measurement scale taxonomy, why is a geographic feature like 'City' classified strictly as a Nominal attribute?",
    shortAnswer: "Because city names are discrete categorical labels without any intrinsic mathematical order, rank, or measurable distance between them.",
    explanation: "In nominal measurement scales, the only valid mathematical relations are equality (City A == City B) and inequality (City A != City B). Arithmetic operations such as addition, subtraction, or ranking are mathematically meaningless.",
    hint: "Does it make sense to state that Kolkata is 'greater than' or 'double' Barrackpore?",
    level: "Basic",
    codeExample: "# Nominal check: equality is valid, order is not\nis_same = (df['city'] == 'Kolkata')  # Valid nominal relation"
  },
  {
    id: 2,
    question: "Why does assigning arbitrary integers (Label Encoding: Kolkata=0, Howrah=1, Siliguri=2) create a dangerous mathematical pathology in linear regression?",
    shortAnswer: "It imposes artificial metric distances and a false monotonic gradient, forcing the model to assume Siliguri is twice as far from Kolkata as Howrah is.",
    explanation: "Linear models compute y_hat = w * x + b. An integer encoding forces the coefficient w to predict a strict monotonic trend across cities based purely on alphabetical sorting, preventing the model from learning independent regional effects.",
    hint: "Recall: |2 - 0| = 2, while |1 - 0| = 1. Linear weights scale directly with input magnitudes.",
    level: "Basic",
    codeExample: "# DANGEROUS LABEL ENCODING ON NOMINAL FEATURE:\nfrom sklearn.preprocessing import LabelEncoder\n# Forces artificial numerical order on cities!\ndf['city_bad'] = LabelEncoder().fit_transform(df['city'])"
  },
  {
    id: 3,
    question: "How many degrees of freedom does a binary demographic attribute like Gender {Female, Male} possess?",
    shortAnswer: "Exactly 1 degree of freedom, because knowing whether a person is Female completely determines whether they are Male.",
    explanation: "Since the two states are mutually exclusive and exhaustive, a single binary variable x in {0, 1} completely captures the state space without redundancy.",
    hint: "Degrees of freedom equals K - 1 where K is cardinality.",
    level: "Basic",
    codeExample: "# Binary gender encoding\ndf['is_male'] = (df['gender'] == 'Male').astype(int)"
  },
  {
    id: 4,
    question: "What is the geometric distance between any two distinct one-hot encoded city vectors?",
    shortAnswer: "The Euclidean distance between any two distinct one-hot vectors e_j and e_k is exactly sqrt(2).",
    explanation: "Each city is mapped to an orthogonal standard basis vector in R^K. The Euclidean distance is ||e_j - e_k|| = sqrt(1^2 + (-1)^2 + 0) = sqrt(2). This guarantees perfect geometric symmetry and equidistance.",
    hint: "Subtract two standard basis vectors: [1, 0, 0] - [0, 1, 0] = [1, -1, 0].",
    level: "Basic",
    codeExample: "import numpy as np\ne1 = np.array([1, 0, 0, 0])\ne2 = np.array([0, 1, 0, 0])\ndist = np.linalg.norm(e1 - e2)  # Returns 1.4142 (sqrt(2))"
  },
  {
    id: 5,
    question: "What is the consequence of feeding one-hot encoded categorical variables into a K-Means clustering algorithm?",
    shortAnswer: "All distinct categories are equidistant (distance = sqrt(2)), meaning clustering is guided purely by discrete matching rather than continuous topological proximity.",
    explanation: "While One-Hot Encoding correctly avoids false ordering, it treats all cities as equally dissimilar. It cannot capture geographical spatial proximity (e.g., that Barrackpore is closer to Kolkata than to Siliguri) unless geographic coordinates (latitude/longitude) are provided.",
    hint: "One-hot encoding treats every city as orthogonal in hyper-dimensional space.",
    level: "Basic",
    codeExample: "# Spatial alternative to one-hot encoding for cities\n# Use spatial coordinates: [latitude, longitude]"
  },
  {
    id: 6,
    question: "When should Gender be encoded using multi-column One-Hot Encoding rather than a single binary column?",
    shortAnswer: "Whenever the gender attribute includes more than two categories (e.g., Female, Male, Non-Binary, Prefer not to say).",
    explanation: "When cardinality K > 2, the feature is no longer dichotomous. It becomes a multi-class nominal attribute requiring K - 1 dummy variables to represent all distinct identities without imposing arbitrary ordering.",
    hint: "Check cardinality K: if K > 2, binary integer mapping is insufficient.",
    level: "Basic",
    codeExample: "# Multi-class gender schema\n# categories: ['Female', 'Male', 'Non-Binary', 'Other']"
  },
  {
    id: 7,
    question: "What does the inner product (dot product) of two different one-hot encoded city basis vectors equal?",
    shortAnswer: "Zero (e_j^T * e_k = 0), proving that the feature representations are mutually orthogonal.",
    explanation: "Because only one component is 1 and all others are 0, multiplying corresponding elements across distinct one-hot vectors always yields zero. Orthogonality ensures zero linear overlap between city indicators.",
    hint: "Dot product of [1, 0] and [0, 1] is 1*0 + 0*1 = 0.",
    level: "Basic",
    codeExample: "np.dot([1, 0, 0], [0, 1, 0])  # Equals 0"
  },
  {
    id: 8,
    question: "Why does tree-based partitioning (e.g., Decision Trees) tolerate Label Encoding better than linear models do?",
    shortAnswer: "Because decision trees can isolate arbitrary categories through successive binary threshold splits, whereas linear models are constrained to a single global slope weight.",
    explanation: "A decision tree can split on 'City <= 1' (isolating Kolkata and Howrah) and later split on 'City == 2' (isolating Siliguri). However, this still imposes an inefficient search path and can distort feature importance relative to native categorical handling.",
    hint: "Decision trees make step-function axis-aligned splits.",
    level: "Basic",
    codeExample: "# Decision tree split: if city_code <= 1 -> Branch A, else Branch B"
  },

  // =========================================================================
  // TIER 2: MECHANICS & FORMULATIONS (Math, Dummy Trap, Reference Class)
  // =========================================================================
  {
    id: 9,
    question: "What is the Dummy Variable Trap, and what mathematical property does it cause in the Gram matrix X^T X?",
    shortAnswer: "It occurs when all K dummy columns are included alongside an intercept column, creating perfect multicollinearity (sum d_k = 1) and rendering the Gram matrix singular: det(X^T X) = 0.",
    explanation: "Because the sum of all K dummy columns equals the intercept column vector of ones, the columns are linearly dependent. The rank of X is at most K, meaning the (K+1) x (K+1) matrix X^T X is not invertible, crashing Ordinary Least Squares closed-form estimation.",
    hint: "Linear dependence: 1 * column_ones - sum(dummy_columns) = 0.",
    level: "Intermediate",
    codeExample: "# Proving linear dependence:\n# intercept = dummy_Kolkata + dummy_Barrackpore + dummy_Howrah"
  },
  {
    id: 10,
    question: "How does 'Drop-First' One-Hot Encoding mathematically resolve the Dummy Variable Trap?",
    shortAnswer: "By omitting one category (e.g., dropping Barrackpore), the remaining K - 1 dummy columns become linearly independent of the intercept, restoring full rank and positive definiteness to X^T X.",
    explanation: "With K - 1 columns, no dummy column can be formed as a linear combination of the remaining columns and the intercept. This ensures det(X^T X) > 0, allowing stable inversion in OLS and logistic regression.",
    hint: "Use OneHotEncoder(drop='first').",
    level: "Intermediate",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(drop='first', sparse_output=False)\nX_encoded = ohe.fit_transform(df[['city']])"
  },
  {
    id: 11,
    question: "In a linear regression model using drop-first encoding for City, how is the intercept beta_0 statistically interpreted?",
    shortAnswer: "beta_0 represents the expected target value for an individual belonging to the dropped baseline reference city, when all continuous covariates are set to zero.",
    explanation: "When a record belongs to the omitted reference city, all remaining dummy indicators are 0. Thus, y_hat = beta_0 + 0 + ... + 0 = beta_0. The intercept anchors the reference population.",
    hint: "What happens to the equation y = beta0 + beta1*d1 + beta2*d2 when d1=0 and d2=0?",
    level: "Intermediate",
    codeExample: "# Regression interpretation\n# E[Y | City = Reference] = beta_0"
  },
  {
    id: 12,
    question: "In a linear regression model using drop-first encoding, what does the coefficient beta_Siliguri represent?",
    shortAnswer: "It represents the marginal difference in the expected target value between Siliguri residents and the baseline reference city residents: E[Y | Siliguri] - E[Y | Reference].",
    explanation: "If Barrackpore is the reference and beta_Siliguri = +5.2, it means customers in Siliguri spend an average of ₹5.2k more per month than customers in Barrackpore, holding all other features constant.",
    hint: "Coefficients in drop-first encoding measure contrast against the baseline.",
    level: "Intermediate",
    codeExample: "# Marginal differential\n# E[Y | City=Siliguri] - E[Y | City=Reference] = beta_Siliguri"
  },
  {
    id: 13,
    question: "Why can L2-regularized Ridge Regression invert the design matrix even when all K dummy columns and an intercept are included?",
    shortAnswer: "Because Ridge regression adds a regularization penalty lambda * I to the Gram matrix: (X^T X + lambda * I)^(-1), which shifts all eigenvalues upward by lambda > 0, making the matrix strictly positive definite.",
    explanation: "Even if X^T X has a zero eigenvalue due to perfect multicollinearity, adding lambda * I ensures the minimum eigenvalue is at least lambda > 0. This guarantees invertibility, although individual dummy coefficients will share weights and lose unique interpretability.",
    hint: "Adding positive diagonal damping prevents zero eigenvalues.",
    level: "Intermediate",
    codeExample: "from sklearn.linear_model import Ridge\n# Ridge regression handles full dummy encoding without crashing\nmodel = Ridge(alpha=1.0).fit(X_full_dummies, y)"
  },
  {
    id: 14,
    question: "What is the condition number kappa(X^T X) of a design matrix suffering from the Dummy Variable Trap, and what does it signify?",
    shortAnswer: "The condition number is infinite (kappa = infinity), signifying that the matrix is perfectly ill-conditioned and that arbitrary numerical noise will cause explosive coefficient instability.",
    explanation: "Condition number is defined as kappa = lambda_max / lambda_min. When perfect collinearity exists, lambda_min = 0, so kappa = lambda_max / 0 = infinity. Solvers cannot invert the matrix reliably.",
    hint: "Condition number measures sensitivity to numerical perturbations.",
    level: "Intermediate",
    codeExample: "# Condition number check\nimport numpy as np\nkappa = np.linalg.cond(XTX)\nprint('Condition number:', kappa)"
  },
  {
    id: 15,
    question: "What is the mathematical equation for Bayesian Target Encoding with m-estimate smoothing?",
    shortAnswer: "S_i = (n_i * y_bar_i + m * y_bar_global) / (n_i + m), where n_i is the category sample count, y_bar_i is the category target mean, and m is the smoothing weight.",
    explanation: "When sample size n_i is small, the prior global mean y_bar_global dominates, preventing overfitting on rare categories. When n_i is large, the empirical category mean y_bar_i dominates.",
    hint: "A convex combination of category mean and global prior mean.",
    level: "Intermediate",
    codeExample: "# Bayesian target smoothing formula\nsmoothed = (count * local_mean + m * global_mean) / (count + m)"
  },
  {
    id: 16,
    question: "In Bayesian Target Encoding, what happens to the encoded value S_i as the category count n_i approaches infinity?",
    shortAnswer: "S_i converges asymptotically to the empirical category mean: lim_{n_i -> inf} S_i = y_bar_i.",
    explanation: "As sample size grows huge, n_i / (n_i + m) approaches 1.0, and m / (n_i + m) approaches 0. The Bayesian prior is washed out by abundant empirical evidence.",
    hint: "Evaluate the limit as n_i becomes much larger than m.",
    level: "Intermediate",
    codeExample: "# Limit behavior: for n_i >> m, smoothed ≈ local_mean"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE & PRODUCTION PIPELINES (Scikit-Learn, Cold-Starts)
  // =========================================================================
  {
    id: 17,
    question: "How should a production Scikit-Learn pipeline handle an unseen City (e.g., 'Asansol') encountered during online inference?",
    shortAnswer: "Configure OneHotEncoder(handle_unknown='ignore'), which outputs an all-zeros vector for unseen categories, safely absorbing the query into the intercept without throwing a runtime error.",
    explanation: "Default `handle_unknown='error'` crashes web APIs when new categories appear. With 'ignore', the unseen category simply activates zero dummy columns, gracefully inheriting the baseline expected value.",
    hint: "Set handle_unknown='ignore' inside OneHotEncoder.",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import OneHotEncoder\nohe = OneHotEncoder(handle_unknown='ignore', sparse_output=False)\nohe.fit([['Kolkata'], ['Barrackpore']])\n# Unseen city returns all zeros [0, 0]\nprint(ohe.transform([['Asansol']]))"
  },
  {
    id: 18,
    question: "How does 'Fit-Before-Split' encoding cause data leakage in cross-validation?",
    shortAnswer: "Fitting the encoder across the entire dataset exposes the transformer to category vocabularies and frequencies present in the test partition, corrupting generalization evaluation.",
    explanation: "If rare cities present only in the validation fold are learned during fitting, the training phase gains access to test distribution structures. Encoders must strictly execute fit(X_train) and transform(X_test).",
    hint: "Always fit transformers exclusively on training folds.",
    level: "Advanced",
    codeExample: "# LEAKAGE-FREE PIPELINE:\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\n\npreprocessor = ColumnTransformer([\n    ('city_enc', OneHotEncoder(handle_unknown='ignore'), ['city']),\n    ('gender_enc', OneHotEncoder(drop='first'), ['gender'])\n])\npipeline = Pipeline([('prep', preprocessor), ('model', LogisticRegression())])"
  },
  {
    id: 19,
    question: "Why should `drop='first'` NOT be combined with `handle_unknown='ignore'` in older Scikit-Learn versions?",
    shortAnswer: "Because an unseen city will produce an all-zeros vector, which is identical to the representation of the dropped reference category, conflating unseen data with the reference class.",
    explanation: "If Barrackpore is dropped (encoded as [0, 0, 0]), and Asansol is unseen (also mapped to [0, 0, 0] by ignore), the model cannot distinguish between a known resident of Barrackpore and an unknown visitor from Asansol.",
    hint: "Both the reference category and the unknown category share the zero vector.",
    level: "Advanced",
    codeExample: "# In modern scikit-learn (>=1.1), use handle_unknown='infrequent_if_exist'\n# or preserve full one-hot when handle_unknown='ignore' is required."
  },
  {
    id: 20,
    question: "How does Scikit-Learn's `min_frequency` parameter in OneHotEncoder mitigate high-cardinality dimensionality explosion?",
    shortAnswer: "It pools all categories with fewer occurrences than min_frequency into a single collective dummy feature named 'city_infrequent_sklearn'.",
    explanation: "If a database contains 500 postal towns where 450 have fewer than 20 records, setting `min_frequency=20` generates dummy columns only for the top 50 cities plus 1 pooled column, bounding matrix width.",
    hint: "Check OneHotEncoder(min_frequency=10).",
    level: "Advanced",
    codeExample: "ohe = OneHotEncoder(min_frequency=5, handle_unknown='infrequent_if_exist')\nX_trans = ohe.fit_transform(df[['city']])"
  },
  {
    id: 21,
    question: "In an end-to-end ColumnTransformer, how do you correctly route binary gender and multi-class city columns to different encoding strategies?",
    shortAnswer: "By defining distinct tuples in ColumnTransformer: one mapping ['gender'] to OneHotEncoder(drop='first') and another mapping ['city'] to OneHotEncoder(handle_unknown='ignore').",
    explanation: "ColumnTransformer applies distinct transformer pipelines to designated feature subsets and concatenates the output feature matrices horizontally, ensuring optimal encoding per column type.",
    hint: "ColumnTransformer([('gender_pipe', ...), ('city_pipe', ...)]).",
    level: "Advanced",
    codeExample: "from sklearn.compose import ColumnTransformer\nct = ColumnTransformer([\n    ('gender', OneHotEncoder(drop='first'), ['gender']),\n    ('city', OneHotEncoder(handle_unknown='ignore'), ['city'])\n], remainder='passthrough')"
  },
  {
    id: 22,
    question: "Why does naive Target Encoding on training data create catastrophic target leakage (overfitting)?",
    shortAnswer: "Because computing the category mean directly includes each record's own target label y_i, allowing the model to memorize the target rather than learning generalizable patterns.",
    explanation: "If a rare city has only 1 resident who defaulted (y=1), target encoding assigns S_i = 1.0. A decision tree will split on S_i > 0.99 and achieve 100% training accuracy, but will fail completely on new data.",
    hint: "A feature must not use its own row's target label in its calculation.",
    level: "Advanced",
    codeExample: "# SEVERE OVERFITTING: Local mean without Out-of-Fold computation\n# target_map = df.groupby('city')['target'].mean()\n# df['city_encoded'] = df['city'].map(target_map)"
  },
  {
    id: 23,
    question: "How does Out-of-Fold (OOF) Target Encoding eliminate target leakage during model training?",
    shortAnswer: "It splits training data into K folds, calculating the category target mean for each fold using only the remaining K - 1 folds, ensuring no row's target informs its own encoded value.",
    explanation: "OOF encoding mirrors cross-validation. For row j in fold k, its city target value is computed strictly from folds other than k, preventing self-target contamination while building the training matrix.",
    hint: "Leave-one-fold-out computation for training feature generation.",
    level: "Advanced",
    codeExample: "from sklearn.model_selection import KFold\n# Compute category target statistics strictly on out-of-fold training data"
  },
  {
    id: 24,
    question: "What is Weight of Evidence (WoE) encoding, and why is it popular in banking credit scorecards for City columns?",
    shortAnswer: "WoE computes WoE_i = ln(P(Goods_i) / P(Bads_i)), linearizing the relationship between the categorical attribute and the log-odds of the binary target.",
    explanation: "In logistic regression, log-odds ln(p / (1 - p)) is modeled as a linear function of inputs. Because WoE directly expresses categories in log-odds units, it guarantees a linear relationship with the logit function.",
    hint: "WoE represents the natural log of the ratio of non-defaults to defaults in that category.",
    level: "Advanced",
    codeExample: "# WoE = ln(% non-events / % events)\n# woe = np.log((goods / total_goods) / (bads / total_bads))"
  },

  // =========================================================================
  // TIER 4: SCALABILITY, TREE DILUTION & EDGE CASES (Production Ops)
  // =========================================================================
  {
    id: 25,
    question: "What is the 'mtry Hazard' when feeding hundreds of one-hot encoded city dummy features into a Random Forest?",
    shortAnswer: "Random Forests sample a random subset of features (mtry = sqrt(p)) at each split; when one-hot dummies dominate the feature space, the probability of selecting dense, informative continuous features is severely diluted.",
    explanation: "If a dataset has 5 continuous features (Age, Income, Credit Score) and 95 sparse city dummy columns (p=100), mtry = sqrt(100) = 10 features per split. The chance that all 10 sampled features are sparse, uninformative dummies is high, crippling tree decision boundaries.",
    hint: "Random feature subspace sampling picks mostly sparse dummies.",
    level: "Expert",
    codeExample: "# Feature dilution calculation\n# P(no continuous feature in split) = C(95, 10) / C(100, 10) ≈ 58%!"
  },
  {
    id: 26,
    question: "How does LightGBM handle high-cardinality nominal categorical features natively without one-hot encoding?",
    shortAnswer: "LightGBM sorts category bins according to their target values at each node and evaluates optimal categorical subset splits in O(K log K) time rather than exponential O(2^K) time.",
    explanation: "Fisher's exact sorting theorem proves that for binary classification, the optimal partition of a categorical variable into two subsets can be found by sorting categories by their target mean and finding the best continuous split point.",
    hint: "Sorting categories by target mean reduces subset search to O(K log K).",
    level: "Expert",
    codeExample: "import lightgbm as lgb\n# Specify categorical feature natively without one-hot encoding:\ndtrain = lgb.Dataset(X, label=y, categorical_feature=['city'])"
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
    question: "In a high-throughput streaming architecture, how should a microservice serialize and apply one-hot city encodings at < 5ms latency SLAs?",
    shortAnswer: "Pre-compute a frozen dictionary hash map mapping each known city to its integer index, and output a pre-allocated static NumPy/float array using direct index assignment.",
    explanation: "Avoid initializing Scikit-Learn transformers or DataFrame objects on streaming HTTP requests. A simple frozen hash map `CITY_INDEX = {'Kolkata': 0, 'Howrah': 1}` with an array lookup executes in < 5 microseconds.",
    hint: "Direct dictionary key lookup into fixed-size pre-allocated buffer.",
    level: "Expert",
    codeExample: "CITY_INDEX = {'Kolkata': 0, 'Barrackpore': 1, 'Howrah': 2}\ndef encode_fast(city):\n    vec = [0] * len(CITY_INDEX)\n    idx = CITY_INDEX.get(city)\n    if idx is not None:\n        vec[idx] = 1\n    return vec"
  },
  {
    id: 29,
    question: "What is Feature Hashing (the Hashing Trick) for high-cardinality nominal features, and what is its primary operational trade-off?",
    shortAnswer: "It applies a hash function modulo B (h(city) mod B) to project arbitrary categories into a fixed-width vector of size B, trading off potential hash collisions for bounded memory and zero vocabulary lookup.",
    explanation: "Feature hashing requires no vocabulary storage and natively accommodates unseen categories. However, different cities may hash to the same bucket (hash collision), creating noise that can degrade model accuracy if B is too small.",
    hint: "MurmurHash / MD5 modulo bucket size B.",
    level: "Expert",
    codeExample: "from sklearn.feature_extraction import FeatureHasher\nhasher = FeatureHasher(n_features=8, input_type='string')\nX_hashed = hasher.fit_transform([[c] for c in cities])"
  },
  {
    id: 30,
    question: "Under what conditions will One-Hot Encoding cause a Linear Model to fail when trained on massive sparse datasets via Stochastic Gradient Descent (SGD)?",
    shortAnswer: "When high learning rates cause extreme gradient updates on rare categories that appear infrequently, or when sparse zero-valued gradients prevent weights from decaying under L2 regularization.",
    explanation: "In sparse SGD, weights of rare cities are only updated when a batch contains that rare city. If regularized with standard L2 decay without lazy sparse updating, the rare city weight is either neglected or over-penalized. Algorithms require Adam or AdaGrad with adaptive learning rates per coordinate.",
    hint: "AdaGrad/Adam maintains per-feature historical gradient accumulators.",
    level: "Expert",
    codeExample: "from sklearn.linear_model import SGDClassifier\n# Use adaptive or optimal learning rate schedule for sparse one-hot features\nmodel = SGDClassifier(loss='log_loss', learning_rate='adaptive', eta0=0.01)"
  }
];

export default questions;
