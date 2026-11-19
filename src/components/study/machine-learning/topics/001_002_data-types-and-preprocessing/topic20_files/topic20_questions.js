/**
 * Topic 20: Ordinal encoding (basic idea)
 * 30 Masterclass Assessment Questions (Foundation to Industrial Scale)
 * Author: Sukanta Hui | Senior Academic Mentor | Coder & AccoTax | Barrackpore
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & CONCEPTUAL TAXONOMY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    question: "What is the formal mathematical definition of an Ordinal categorical variable?",
    shortAnswer: "An ordinal variable is a qualitative discrete variable governed by a strict, transitive monotonic ordering (c_1 < c_2 < ... < c_K) where intervals between consecutive ranks are non-uniform and uncalibrated.",
    explanation: "In S.S. Stevens' hierarchy of measurement (1946), ordinal data possesses a total preorder: for any two levels, one is greater than, equal to, or less than the other (c_i < c_j). However, unlike interval or ratio data, the distance or gap between consecutive ranks is qualitative and not guaranteed to be mathematically equal.",
    hint: "Think about academic degrees: BCA < MCA < PhD. There is order, but is the effort gap identical?",
    level: "Basic",
    codeExample: "# Ordinal feature definition:\neducation_ladder = ['HS', 'BCA', 'MCA', 'MTech', 'PhD']\n# Monotonic order: HS < BCA < MCA < MTech < PhD"
  },
  {
    id: 2,
    question: "How does Ordinal Encoding transform qualitative categories into numbers?",
    shortAnswer: "It maps each category along its monotonic order to a sequential scalar integer (e.g., 0, 1, 2, ..., K-1).",
    explanation: "Given an ordered set {c_0, c_1, ..., c_{K-1}}, the ordinal encoding function assigns Phi(c_k) = k. This preserves the monotonic relationship: c_i < c_j if and only if Phi(c_i) < Phi(c_j).",
    hint: "Category at index k gets integer value k.",
    level: "Basic",
    codeExample: "from sklearn.preprocessing import OrdinalEncoder\nenc = OrdinalEncoder(categories=[['Low', 'Medium', 'High']])\nX_ord = enc.fit_transform([['Low'], ['High'], ['Medium']])\n# Output: [[0.], [2.], [1.]]"
  },
  {
    id: 3,
    question: "What is the key dimensionality advantage of Ordinal Encoding over One-Hot Encoding?",
    shortAnswer: "Ordinal Encoding retains a compact 1D representation (single column) instead of expanding into K separate columns.",
    explanation: "While One-Hot Encoding creates K binary columns for a feature with K categories, Ordinal Encoding represents the feature in a single column of integers. For high-cardinality features or tree-based ensembles, this avoids dimensionality explosion and saves substantial memory.",
    hint: "How many columns does Ordinal Encoding add to your feature matrix?",
    level: "Basic",
    codeExample: "# 1 feature with 10 ordinal levels:\n# One-Hot Encoding: 10 columns\n# Ordinal Encoding: 1 column"
  },
  {
    id: 4,
    question: "What is the 'Non-Interval Problem' in Ordinal Encoding?",
    shortAnswer: "It is the mathematical reality that assigning sequential integers (0, 1, 2) forces equal spacing (|1 - 0| = |2 - 1| = 1), even though the real-world gap between qualitative ranks is rarely uniform.",
    explanation: "When categories like 'Poor', 'Good', 'Excellent' are mapped to 0, 1, 2, the numerical distance between Poor and Good is 1, and between Good and Excellent is 1. In reality, the difference in customer satisfaction between Good and Excellent might be massive compared to Poor and Good. The integer mapping artificially imposes a constant step size.",
    hint: "Is the jump from High School to BCA equal to the jump from Master's to PhD?",
    level: "Basic",
    codeExample: "# Forced integer metric:\n# |Rank(PhD) - Rank(MTech)| = |4 - 3| = 1\n# |Rank(BCA) - Rank(HS)|   = |1 - 0| = 1\n# Equal mathematical gap, but vastly unequal real-world difference!"
  },
  {
    id: 5,
    question: "Why should Ordinal Encoding NEVER be applied to Nominal categories like West Bengal districts or car brands?",
    shortAnswer: "Because nominal categories have no intrinsic order; assigning integers forces a false mathematical hierarchy that biases linear and distance-based algorithms.",
    explanation: "If 'Kolkata'=0, 'Barrackpore'=1, and 'Siliguri'=2, linear models assume Siliguri is twice as large as Barrackpore relative to Kolkata, and KNN calculates Euclidean distance |2 - 0| = 2 vs |1 - 0| = 1. This injects completely fictitious relationships into the model's feature space.",
    hint: "Can you mathematically justify that Siliguri > Kolkata > Barrackpore?",
    level: "Basic",
    codeExample: "# ANTI-PATTERN on nominal data:\n# enc.fit([['Kolkata'], ['Barrackpore'], ['Siliguri']])\n# Assumes: Siliguri > Barrackpore > Kolkata (False assumption!)"
  },
  {
    id: 6,
    question: "What are the four scales of measurement defined by S.S. Stevens in 1946?",
    shortAnswer: "1. Nominal (identity), 2. Ordinal (order), 3. Interval (equal differences, no true zero), 4. Ratio (equal differences and true absolute zero).",
    explanation: "S.S. Stevens formulated the foundational classification of data scales in science. Nominal data only supports equality checks; Ordinal supports ranking; Interval supports addition and subtraction (e.g. Celsius); Ratio supports multiplication and division (e.g. Kelvin, mass, currency).",
    hint: "Remember the acronym NOIR: Nominal, Ordinal, Interval, Ratio.",
    level: "Basic",
    codeExample: "# Stevens' scales summary:\n# Nominal:  'Red' == 'Red'\n# Ordinal:  'BCA' < 'MCA'\n# Interval: 30°C - 20°C == 10°C\n# Ratio:    ₹200 == 2 * ₹100"
  },
  {
    id: 7,
    question: "What is transitivity in the context of an ordinal feature?",
    shortAnswer: "If category A is greater than category B, and B is greater than C, then category A must strictly be greater than category C (A > B and B > C implies A > C).",
    explanation: "Transitivity is the foundational axiom of total orders. Without transitivity, consistent sorting and ranking are impossible. Ordinal scales strictly satisfy transitivity across all defined levels.",
    hint: "If A > B and B > C, what is the relation between A and C?",
    level: "Basic",
    codeExample: "# Transitivity check:\nassert ('PhD' > 'MCA') and ('MCA' > 'BCA')\n# Implies 'PhD' > 'BCA'"
  },
  {
    id: 8,
    question: "Give three real-world examples of genuine Ordinal variables from West Bengal industry.",
    shortAnswer: "1. Academic qualifications (HS < BCA < MCA < PhD), 2. IT employee appraisal bands (PIP < Meets < Exceeds < Star), 3. Cancer tumor staging (Stage 0 < Stage I < Stage II < Stage III < Stage IV).",
    explanation: "Each of these features exhibits a strict, unambiguous monotonic progression where higher levels strictly dominate lower levels, making them prime candidates for ordinal encoding.",
    hint: "Think of education levels, performance appraisals, and medical disease staging.",
    level: "Basic",
    codeExample: "perf_ladder = ['PIP', 'Meets', 'Exceeds', 'Star']\ntumor_stages = ['Stage 0', 'Stage I', 'Stage II', 'Stage III', 'Stage IV']"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & FORMULATIONS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    question: "Why does Linear Regression assume equal step sizes across ordinal ranks?",
    shortAnswer: "Because the linear hypothesis y = w * x + b has a constant derivative dy/dx = w, forcing every one-unit rank increase to produce the exact same change (+w) in the target.",
    explanation: "In linear regression, increasing the feature from rank 0 to rank 1 changes the prediction by w. Increasing from rank 3 to rank 4 ALSO changes the prediction by exactly w. If the true target exhibits exponential jumps (e.g. PhD salary is 3x higher than MTech, while BCA is only 1.2x higher than HS), the linear model suffers structural bias and underfitting.",
    hint: "What is the derivative of y = w*x + b with respect to x?",
    level: "Intermediate",
    codeExample: "# Linear model assumption:\n# y(Rank 1) - y(Rank 0) = w\n# y(Rank 4) - y(Rank 3) = w (Forced identical step size)"
  },
  {
    id: 10,
    question: "State the theorem explaining why Decision Trees are invariant to any strictly monotonic transformation of an ordinal feature.",
    shortAnswer: "Because decision tree split rules evaluate inequalities (x <= theta); any strictly monotonic transformation g(x) preserves the exact sample ordering and yields identical partition subsets at threshold theta' = g(theta).",
    explanation: "Let g be strictly increasing (a < b ==> g(a) < g(b)). The condition x_i <= theta is mathematically identical to g(x_i) <= g(theta). The left and right child subsets, the Gini impurity reduction, and the information gain at every split node are 100% identical, whether ranks are [0, 1, 2, 3] or [1, 10, 100, 1000]. Decision trees are completely scale-invariant on 1D ordinal features.",
    hint: "Does changing the numbers change which samples are on the left vs right of the split threshold?",
    level: "Intermediate",
    codeExample: "import numpy as np\nranks = np.array([0, 1, 2, 3, 4])\n# Monotonic cubing transformation:\ng_ranks = ranks ** 3 # [0, 1, 8, 27, 64]\n# Split at rank <= 2.5 vs split at g_rank <= 15.625:\nassert np.array_equal(ranks <= 2.5, g_ranks <= 15.625)"
  },
  {
    id: 11,
    question: "What is Spearman's Rank Correlation Coefficient (rho) and how does it diagnose an incorrect ordinal encoding?",
    shortAnswer: "rho = 1 - (6 * sum(d_i^2)) / (n * (n^2 - 1)). A high rho confirms positive monotonic alignment with the target; a collapsed rho near 0 reveals that the category ordering is corrupted.",
    explanation: "Spearman's rho evaluates the Pearson correlation between the ranks of feature x and target y. If performance appraisal is correctly mapped (Poor=0 to Outstanding=4), rho with employee salary will be high (e.g. +0.93). If the categories were accidentally sorted alphabetically (Excellent=0, Poor=4), rho collapses toward zero, providing an immediate mathematical warning.",
    hint: "It measures monotonic alignment between feature ranks and target ranks.",
    level: "Intermediate",
    codeExample: "from scipy.stats import spearmanr\n# Calibrated: [0, 1, 2, 3, 4] vs salary -> rho approx +0.93\n# Alphabetical: [0, 1, 2, 3, 4] vs salary -> rho approx +0.14"
  },
  {
    id: 12,
    question: "What is Thermometer (or Cumulative Binary) Encoding and what is its mathematical representation for rank k of K levels?",
    shortAnswer: "It maps rank k to K - 1 cumulative binary flags: Phi_thermo(c_k) = [I(k >= 1), I(k >= 2), ..., I(k >= K - 1)]^T.",
    explanation: "Thermometer encoding represents increasing ordinal levels like a rising mercury column. For K = 4: Rank 0 -> [0, 0, 0]; Rank 1 -> [1, 0, 0]; Rank 2 -> [1, 1, 0]; Rank 3 -> [1, 1, 1]. In a linear regression model y = beta_0 + beta_1*x1 + beta_2*x2 + beta_3*x3, each beta_j represents the specific incremental step size from level j-1 to level j, allowing linear models to learn unequal intervals without multicollinearity.",
    hint: "Like mercury rising in a thermometer: each step turns on the next flag.",
    level: "Intermediate",
    codeExample: "def thermometer_encode(rank, total_levels):\n    return [1 if rank >= r else 0 for r in range(1, total_levels)]\n\nprint(thermometer_encode(2, 5)) # [1, 1, 0, 0] (Rank 2 of 5 levels)"
  },
  {
    id: 13,
    question: "In Thermometer-encoded linear regression, what is the mathematical interpretation of coefficient beta_j?",
    shortAnswer: "beta_j represents the specific marginal step increment in the target when progressing from ordinal rank j-1 to rank j.",
    explanation: "Consider y = beta_0 + beta_1*x1 + beta_2*x2. For Rank 0, y = beta_0. For Rank 1, y = beta_0 + beta_1. For Rank 2, y = beta_0 + beta_1 + beta_2. Subtracting y(Rank 1) from y(Rank 2) yields beta_2. Thus, each coefficient measures the exact marginal premium or penalty associated with reaching that specific rank milestone.",
    hint: "What is y(Rank j) - y(Rank j - 1)?",
    level: "Intermediate",
    codeExample: "# y(HS) = beta_0\n# y(BCA) = beta_0 + beta_1 ==> beta_1 = increment for getting BCA\n# y(MCA) = beta_0 + beta_1 + beta_2 ==> beta_2 = incremental jump from BCA to MCA"
  },
  {
    id: 14,
    question: "What is Kendall's Tau (tau) and how does it compare to Spearman's rho for auditing ordinal feature consistency?",
    shortAnswer: "Kendall's Tau measures the proportion of concordant versus discordant pairs: tau = (C - D) / (0.5 * n * (n - 1)). It is more robust to small sample sizes and outliers than Spearman's rho.",
    explanation: "For any two observations (x_i, y_i) and (x_j, y_j), the pair is concordant if (x_i - x_j) and (y_i - y_j) have the same sign, and discordant if they have opposite signs. Kendall's Tau provides a direct probabilistic interpretation: P(concordance) - P(discordance). It is ideal for validating ordinal features in small clinical or pilot trial datasets.",
    hint: "Counts concordant pairs minus discordant pairs divided by total pairs.",
    level: "Intermediate",
    codeExample: "from scipy.stats import kendalltau\ntau, _ = kendalltau(ranks, salaries)\nprint('Kendall Tau:', tau)"
  },
  {
    id: 15,
    question: "What is Target-Calibrated (Isotonic) Ordinal Encoding?",
    shortAnswer: "It replaces each ordinal category c_k with its empirical sample mean target y_bar_k subject to an isotonic constraint y_bar_1 <= y_bar_2 <= ... <= y_bar_K.",
    explanation: "Rather than assigning arbitrary integer coordinates (0, 1, 2), Isotonic Ordinal Encoding spaces the categories according to their actual business effect on the target, while preserving the monotonic ranking. This eliminates the equal-interval assumption in linear models while preventing sample noise from inverting the rank order.",
    hint: "Spaces the categories by their true average target value while keeping the order intact.",
    level: "Intermediate",
    codeExample: "# Empirical salary means: HS=3.8, BCA=5.6, MCA=15.5, PhD=34.0\n# Mapped directly to [3.8, 5.6, 15.5, 34.0] instead of [0, 1, 2, 3]"
  },
  {
    id: 16,
    question: "Why does Ordinal Encoding avoid the Dummy Variable Trap that plagues One-Hot Encoding?",
    shortAnswer: "Because Ordinal Encoding outputs a single 1D column; there are no multiple indicator columns to create linear dependencies with the intercept column.",
    explanation: "The Dummy Variable Trap occurs when K one-hot columns sum to 1.0, duplicating the intercept column. Because Ordinal Encoding maps all categories into a single numeric column with varying integer values (0, 1, 2, ..., K-1), its row values do not sum to a constant, and the column is linearly independent of the intercept.",
    hint: "Can a single column of integers 0, 1, 2 sum to a constant across all rows?",
    level: "Intermediate",
    codeExample: "# X = [[1, 0], [1, 1], [1, 2]] (Intercept + Ordinal Column)\n# Rank(X) = 2 -> Full column rank! Invertible!"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE & ENGINEERING IMPLEMENTATION (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    question: "What catastrophic error occurs if Scikit-Learn's `OrdinalEncoder()` is called without specifying the `categories` parameter?",
    shortAnswer: "Scikit-Learn defaults to alphabetical sorting, assigning integers based on lexicographical order rather than genuine semantic hierarchy.",
    explanation: "If you pass `['Poor', 'Fair', 'Good', 'Excellent', 'Outstanding']`, Scikit-Learn's default alphabetical sort produces `['Excellent', 'Fair', 'Good', 'Outstanding', 'Poor']`. 'Excellent' receives 0 (worst rank) and 'Poor' receives 4 (best rank)! This inverts the feature hierarchy and corrupts downstream model weights.",
    hint: "What does Python's sorted(['Poor', 'Good', 'Excellent']) return?",
    level: "Advanced",
    codeExample: "# DANGEROUS DEFAULT:\n# OrdinalEncoder().fit([['Poor'], ['Good'], ['Excellent']])\n# Yields: Excellent=0, Good=1, Poor=2\n\n# SAFE PRODUCTION STANDARD:\n# OrdinalEncoder(categories=[['Poor', 'Good', 'Excellent']])"
  },
  {
    id: 18,
    question: "How should Scikit-Learn's `OrdinalEncoder` be configured to handle unseen categories during production serving?",
    shortAnswer: "Set `handle_unknown='use_encoded_value'` and specify `unknown_value=-1` (or another chosen sentinel).",
    explanation: "By default, `handle_unknown='error'` raises a ValueError when encountering a novel category at inference. Setting `handle_unknown='use_encoded_value'` instructs the transformer to assign `unknown_value=-1` to unlisted levels, allowing the inference API to execute without crashing.",
    hint: "Use handle_unknown='use_encoded_value' with unknown_value.",
    level: "Advanced",
    codeExample: "from sklearn.preprocessing import OrdinalEncoder\nenc = OrdinalEncoder(\n    categories=[['BCA', 'MCA', 'PhD']],\n    handle_unknown='use_encoded_value',\n    unknown_value=-1\n)\n# Unseen 'BTech' maps safely to -1.0"
  },
  {
    id: 19,
    question: "What is the danger of assigning `unknown_value=-1` to unseen categories when using Linear Regression or KNN?",
    shortAnswer: "The model treats -1 as a real quantitative coordinate smaller than 0, interpreting the unknown category as 'worse than the lowest rank'.",
    explanation: "In distance-based models (KNN, SVM) and linear models (y = w * x + b), numeric values are treated as geometric coordinates. If rank 0 is 'High School' and an unknown applicant with a 'PostDoc' arrives, mapping them to -1 forces the model to treat them as having less education than High School, severely biasing predictions.",
    hint: "Is -1 less than 0 on the real number line?",
    level: "Advanced",
    codeExample: "# If w = +5 LPA per degree rank:\n# Rank 0 (HS): y = ₹5 LPA\n# Rank -1 (Unseen PostDoc!): y = -5 * 1 = ₹0 LPA (Severe negative penalty!)"
  },
  {
    id: 20,
    question: "How does Scikit-Learn handle missing values (NaN) in `OrdinalEncoder` starting in version 0.24+?",
    shortAnswer: "By setting `encoded_missing_value=-1` (or another designated float/int), missing values are encoded to a chosen sentinel rather than raising an error.",
    explanation: "Historically, `OrdinalEncoder` threw an exception when encountering NaNs. Modern Scikit-Learn provides `encoded_missing_value=np.nan` or `encoded_missing_value=-1`, allowing missing entries to be passed directly to downstream native missing-value-capable tree algorithms like HistGradientBoostingClassifier.",
    hint: "Look up the encoded_missing_value parameter.",
    level: "Advanced",
    codeExample: "import numpy as np\nfrom sklearn.preprocessing import OrdinalEncoder\nenc = OrdinalEncoder(categories=[['Low', 'Medium', 'High']], encoded_missing_value=np.nan)"
  },
  {
    id: 21,
    question: "Why is `LabelEncoder` an inappropriate transformer for multi-column feature matrices X in Scikit-Learn pipelines?",
    shortAnswer: "Because `LabelEncoder` expects a 1D array of target labels (y) of shape (N,); it cannot accept 2D feature matrices and does not integrate into ColumnTransformer.",
    explanation: "The Scikit-Learn documentation explicitly states: `LabelEncoder` is for encoding the target variable y. Attempting to pass a 2D DataFrame into `LabelEncoder` throws a `ValueError: Expected 1D array, got 2D array instead`. `OrdinalEncoder` was engineered specifically to handle 2D multi-column feature matrices in pipelines.",
    hint: "Check the expected input dimensionality: 1D target vs 2D features.",
    level: "Advanced",
    codeExample: "# WRONG: LabelEncoder().fit(X[['degree', 'perf']]) -> Crashes with ValueError!\n# CORRECT: OrdinalEncoder().fit(X[['degree', 'perf']]) -> Works seamlessly!"
  },
  {
    id: 22,
    question: "How do you properly integrate `OrdinalEncoder` with specific category ladders into a `ColumnTransformer`?",
    shortAnswer: "By instantiating OrdinalEncoder with a list of category lists matching the selected ordinal columns in the ColumnTransformer pipeline.",
    explanation: "When passing multiple ordinal columns to a `ColumnTransformer`, `categories` must be a list containing the explicit ladder for each corresponding column in exact order.",
    hint: "Provide a list of ladders: categories=[ladder_col1, ladder_col2].",
    level: "Advanced",
    codeExample: "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import OrdinalEncoder\n\ned_ladder = ['HS', 'BCA', 'MCA', 'PhD']\nperf_ladder = ['Poor', 'Fair', 'Good', 'Excellent']\n\nct = ColumnTransformer([\n    ('ord', OrdinalEncoder(categories=[ed_ladder, perf_ladder]), ['degree', 'perf'])\n])"
  },
  {
    id: 23,
    question: "What is the memory footprint comparison between Ordinal Encoding and One-Hot Encoding for 500,000 rows with K = 20 levels?",
    shortAnswer: "Ordinal Encoding requires 4 MB (1 column of int64); One-Hot dense encoding requires 80 MB (20 columns of float64) — a 95% memory reduction.",
    explanation: "For 500,000 rows: Ordinal Encoding produces 1 column of 8-byte integers = 500,000 * 8 = 4,000,000 bytes approx 3.81 MB. Dense One-Hot produces 20 columns of 8-byte floats = 500,000 * 20 * 8 = 80,000,000 bytes approx 76.29 MB. Ordinal Encoding is 20 times more memory-efficient.",
    hint: "1 column vs 20 columns.",
    level: "Advanced",
    codeExample: "# N = 500_000, K = 20:\n# Ordinal: 500_000 * 1 * 8 bytes = 4 MB\n# OHE Dense: 500_000 * 20 * 8 bytes = 80 MB"
  },
  {
    id: 24,
    question: "Why do Gradient Boosted Trees (like LightGBM and CatBoost) train significantly faster with Ordinal Encoding than with One-Hot Encoding?",
    shortAnswer: "Because trees evaluate splits on a single 1D column in O(K) time, avoiding the need to evaluate and store hundreds of sparse binary columns.",
    explanation: "In an ordinal encoded column, a decision tree evaluates potential split thresholds in O(K) time by sorting the unique values. With One-Hot Encoding, the algorithm must evaluate K independent binary columns, compute split metrics for each, and store K separate column nodes in memory. Ordinal encoding maintains compact cache locality and speeds up tree construction.",
    hint: "Scanning 1 column vs scanning K columns at every split node.",
    level: "Advanced",
    codeExample: "# LightGBM native categorical handling operates directly on integer ordinal indices"
  },

  // =========================================================================
  // TIER 4: INDUSTRIAL SCALE, AUDITING & PRODUCTION EDGE CASES (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    question: "In the MAKAUT NEP 2020 grading framework, student grades are (F < P < C < B < B+ < A < A+ < O). Why is standard integer Ordinal Encoding (0 to 7) a natural fit for CGPA estimation?",
    shortAnswer: "Because university academic regulations define grade points as an equidistant 10-point linear scale (F=0, P=4, C=5, B=6, B+=7, A=8, A+=9, O=10), aligning directly with linear models.",
    explanation: "When an institution's grading policy explicitly assigns linearly calibrated grade points to letter grades to compute grade point averages, the intervals between grades are institutionalized as uniform increments. In this specific scenario, integer/linear ordinal mapping matches the true underlying evaluation metric.",
    hint: "University grade points are already designed to be averaged linearly.",
    level: "Expert",
    codeExample: "makaut_grades = {'F': 0, 'P': 4, 'C': 5, 'B': 6, 'B+': 7, 'A': 8, 'A+': 9, 'O': 10}\n# Linearly calibrated to UGC 10-point scale"
  },
  {
    id: 26,
    question: "In an executive compensation model at Salt Lake Sector V, employee bonuses jump non-linearly: Meets=₹50k, Exceeds=₹2L, Star=₹10L. How does Thermometer Encoding outperform integer Ordinal Encoding in Ridge Regression?",
    shortAnswer: "Thermometer encoding allows Ridge regression to learn distinct incremental weights (beta_Meets=₹50k, beta_Exceeds=₹1.5L, beta_Star=₹8L) instead of forcing a constant step.",
    explanation: "Integer encoding forces y = w * rank + b, meaning the bonus step from Meets -> Exceeds must equal the step from Exceeds -> Star. Thermometer encoding decomposes the rank into cumulative binary indicators [x_meets, x_exceeds, x_star]. The model fits independent coefficients for each tier transition, fitting the true exponential compensation curve with near-zero residual error.",
    hint: "Can an integer line fit a curve that bends sharply upwards?",
    level: "Expert",
    codeExample: "# Thermometer coefficients capture true jumps:\n# Meets: ₹0.5L\n# Exceeds: ₹0.5L + ₹1.5L = ₹2.0L\n# Star: ₹0.5L + ₹1.5L + ₹8.0L = ₹10.0L"
  },
  {
    id: 27,
    question: "At a Durgapur alloy steel rolling mill, surface finish is graded from Rough N10 to Mirror N1. Explain the quality disaster that occurred when default `OrdinalEncoder()` was deployed.",
    shortAnswer: "Alphabetical sorting assigned Fine N4=0, Medium N7=1, Mirror N1=2, Rough N10=3, inverting the roughness scale and causing the quality control model to reject flawless mirror-finish steel coils.",
    explanation: "Because 'Fine' starts with F, 'Medium' with M, 'Mirror' with Mi, and 'Rough' with R, alphabetical sorting scrambled the physical smoothness progression. The automated neural inspection system interpreted Mirror finish (integer 2) as rougher than Fine finish (integer 0), falsely rejecting premium coils and halting production lines until the category ladder was hardcoded.",
    hint: "Alphabetical sorting places 'Fine' before 'Medium' and 'Mirror' before 'Rough'.",
    level: "Expert",
    codeExample: "# ALPHABETICAL DISASTER:\n# sorted(['Rough N10', 'Medium N7', 'Fine N4', 'Mirror N1'])\n# -> ['Fine N4', 'Medium N7', 'Mirror N1', 'Rough N10'] (Completely scrambled physical order!)"
  },
  {
    id: 28,
    question: "In oncology survival modeling using the AJCC TNM staging system (Stage 0 to Stage IV), why is Ordinal Encoding superior to One-Hot Encoding for Random Forest survival trees?",
    shortAnswer: "It allows a single tree node to make biological threshold cuts (e.g. Stage <= II vs Stage > II) while preserving anatomical metastasis progression without diluting feature subsampling.",
    explanation: "Cancer stages represent anatomical disease progression: localized tumor (Stage I) to lymph node involvement (Stage III) to distant metastasis (Stage IV). Ordinal encoding lets a tree split on 'Stage <= 2.5' in a single decision, separating localized from systemic cancer. One-Hot Encoding would scatter the stages across 5 columns, forcing the tree to make multiple unnatural splits and diluting random feature subsampling (`mtry`).",
    hint: "A doctor asks: 'Is the cancer Stage 2 or below?' That is a single inequality split.",
    level: "Expert",
    codeExample: "# Single decision tree split:\n# if tumor_stage <= 2: localized_protocol()\n# else: systemic_chemotherapy_protocol()"
  },
  {
    id: 29,
    question: "What is the recommended fallback strategy when an unseen category arrives at production inference and mapping to `unknown_value=-1` is unacceptable?",
    shortAnswer: "Map the novel category to the median rank (K // 2) and log a telemetry event, or use a separate binary 'is_unknown' indicator column.",
    explanation: "In customer satisfaction ratings (1 to 5 stars), mapping an unknown survey response to -1 treats it as extremely dissatisfied, skewing metrics negatively. Mapping to the median rank (3 stars) acts as a neutral prior expectation, preventing extreme directional bias while allowing automated pipeline alerting to capture novel categories.",
    hint: "What is the safest neutral assumption on a 1-to-5 star rating scale?",
    level: "Expert",
    codeExample: "median_rank = len(categories) // 2\ndef safe_encode(cat):\n    return category_map.get(cat, median_rank)"
  },
  {
    id: 30,
    question: "Summarize the overarching decision rule: When should a practitioner select Ordinal Encoding, One-Hot Encoding, or Target Encoding?",
    shortAnswer: "1. Ordinal: Natural monotonic order + Tree models (or linear models via Thermometer). 2. One-Hot: Low-cardinality nominal (<20) + Linear/Neural models. 3. Target: High-cardinality (>50) + Tree ensembles.",
    explanation: "This three-way decision rule optimizes the bias-variance trade-off: Ordinal preserves semantic hierarchy in 1D; One-Hot guarantees orthogonal basis geometry for unordered categories without rank bias; Target Encoding compresses high-cardinality spaces into continuous expected distributions with zero dimensionality explosion.",
    hint: "Check order first, then cardinality, then model family.",
    level: "Expert",
    codeExample: "# THE GOLDEN RULE:\n# if has_natural_order: return OrdinalEncoder(categories=[calibrated])\n# elif cardinality < 20: return OneHotEncoder(drop='if_binary')\n# else: return TargetEncoder(smooth='auto')"
  }
];

export default questions;
