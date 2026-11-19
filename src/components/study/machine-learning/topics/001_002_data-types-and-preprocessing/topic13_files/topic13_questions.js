/**
 * TOPIC 13: BASIC OUTLIER DETECTION ALGORITHMS
 * Graded Academic & Industry Certification Question Bank
 * Course: Introduction to Machine Learning (BCAC701B)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 
 * 30 Authentic Graded Questions:
 * - Tier 1: Foundation & Terminology (Q1 - Q8)
 * - Tier 2: Mathematical & Algorithmic Mechanics (Q9 - Q16)
 * - Tier 3: Machine Learning System Design & Engineering (Q17 - Q24)
 * - Tier 4: Advanced Production & Scalability Analysis (Q25 - Q30)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: "Tier 1: Foundation & Terminology",
    question: "Under the classical 3-Sigma Z-Score rule, approximately what percentage of data falls WITHIN the normal boundaries [mu - 3*sigma, mu + 3*sigma] for a perfect Gaussian distribution?",
    options: [
      "68.27%",
      "95.45%",
      "99.73%",
      "100.00%"
    ],
    correctIndex: 2,
    explanation: "Under the standard Normal distribution N(mu, sigma^2), the empirical 68-95-99.7 rule dictates that 68.27% of observations lie within 1 sigma, 95.45% within 2 sigmas, and exactly 99.73% within 3 sigmas. Points outside |z| > 3.0 represent the extreme 0.27% tails.",
    practicalTip: "Remember that the 99.73% guarantee holds ONLY when the data is truly Gaussian. On skewed or heavy-tailed data, this rule severely misfires.",
    codeSnippet: "# Identifying 3-sigma outliers in pandas\nz_scores = (df['val'] - df['val'].mean()) / df['val'].std()\noutliers = df[z_scores.abs() > 3.0]",
    examRelevance: "MAKAUT BCAC701B Semester Exam & Basic Probability"
  },
  {
    id: 2,
    tier: "Tier 1: Foundation & Terminology",
    question: "In Tukey's Fences method for outlier detection using boxplots, how are the 'Inner Fences' mathematically defined?",
    options: [
      "[Mean - 1.5 * Std, Mean + 1.5 * Std]",
      "[Q1 - 1.5 * IQR, Q3 + 1.5 * IQR] where IQR = Q3 - Q1",
      "[Median - 1.5 * MAD, Median + 1.5 * MAD]",
      "[Min - 1.5, Max + 1.5]"
    ],
    correctIndex: 1,
    explanation: "John Tukey defined the Inner Fences as [Q1 - 1.5 * IQR, Q3 + 1.5 * IQR], where Q1 is the 25th percentile, Q3 is the 75th percentile, and IQR = Q3 - Q1. Observations falling beyond these inner fences are classified as 'Mild Outliers'.",
    practicalTip: "Tukey's IQR method is completely distribution-free because it relies on order statistics (percentiles) rather than parametric means.",
    codeSnippet: "# Tukey's IQR Fences in Python\nq1 = df['feature'].quantile(0.25)\nq3 = df['feature'].quantile(0.75)\niqr = q3 - q1\nlower_fence = q1 - 1.5 * iqr\nupper_fence = q3 + 1.5 * iqr\noutliers = df[(df['feature'] < lower_fence) | (df['feature'] > upper_fence)]",
    examRelevance: "MAKAUT Descriptive Statistics & Data Visualization Core"
  },
  {
    id: 3,
    tier: "Tier 1: Foundation & Terminology",
    question: "What distinction did John Tukey make between 'Mild Outliers' and 'Extreme Outliers' in his IQR boxplot formulation?",
    options: [
      "Mild outliers occur in training data, while extreme outliers occur in test data.",
      "Mild outliers lie between 1.5x IQR and 3.0x IQR beyond the quartiles; extreme outliers lie beyond 3.0x IQR (outside the Outer Fences).",
      "Mild outliers are positive numbers, while extreme outliers are negative numbers.",
      "Mild outliers are deleted, while extreme outliers are imputed."
    ],
    correctIndex: 1,
    explanation: "Tukey established two tiers of fences: Inner Fences at 1.5 * IQR (bounding mild outliers) and Outer Fences at 3.0 * IQR [Q1 - 3*IQR, Q3 + 3*IQR]. Observations outside the outer fences represent extreme anomalies requiring aggressive investigation.",
    practicalTip: "In matplotlib/seaborn boxplots, mild outliers are plotted as hollow circles, while extreme outliers are often displayed as filled asterisks.",
    codeSnippet: "# Outer fence calculation\nouter_lower = q1 - 3.0 * iqr\nouter_upper = q3 + 3.0 * iqr\nextreme_outliers = df[(df['val'] < outer_lower) | (df['val'] > outer_upper)]",
    examRelevance: "MAKAUT Lab Viva & Exploratory Data Analysis"
  },
  {
    id: 4,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the primary operational advantage of the Modified Z-Score (Iglewicz & Hoaglin, 1993) over the classical Z-Score?",
    options: [
      "It requires no multiplication or division.",
      "It substitutes the sample mean with the Median and the sample standard deviation with the Median Absolute Deviation (MAD), giving it a 50% breakdown point that prevents masking.",
      "It can only be used on datasets with fewer than 10 records.",
      "It automatically converts all numbers into positive values."
    ],
    correctIndex: 1,
    explanation: "The classical Z-score breaks down easily because mean and standard deviation are non-robust (breakdown point 0%). The Modified Z-score uses Median and MAD, which can tolerate up to 50% contaminated observations before breaking down, making it immune to masking.",
    practicalTip: "Whenever your dataset contains clusters of multiple extreme values, always prefer Modified Z-score over standard Z-score.",
    codeSnippet: "# Modified Z-score in Python\nmed = df['val'].median()\nmad = (df['val'] - med).abs().median()\nmod_z = 0.6745 * (df['val'] - med) / (mad if mad > 0 else 1e-6)\noutliers = df[mod_z.abs() >= 3.5]",
    examRelevance: "Advanced Data Preprocessing & Robust Statistics"
  },
  {
    id: 5,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is 'Winsorization' as an outlier remediation technique?",
    options: [
      "Deleting every third row in the DataFrame.",
      "Clamping or capping extreme values to a specified percentile boundary (e.g. setting all values above the 99th percentile equal to the 99th percentile value), preserving the total sample size N.",
      "Converting floating-point numbers into 16-bit integers.",
      "Normalizing features between -1 and +1."
    ],
    correctIndex: 1,
    explanation: "Named after biostatistician Charles P. Winsor, Winsorization replaces extreme tail values with the values at chosen percentiles (such as 1st and 99th). Unlike trimming, it does not drop rows, preserving degrees of freedom while bounding feature variance.",
    practicalTip: "Winsorization is especially valuable in linear regression and neural networks where extreme outliers cause exploding gradients.",
    codeSnippet: "from scipy.stats import mstats\n# Cap 1% on bottom and top\ndf['capped'] = mstats.winsorize(df['income'], limits=[0.01, 0.01])",
    examRelevance: "Feature Engineering & Data Preprocessing Techniques"
  },
  {
    id: 6,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the recommended cutoff threshold for flagging an observation as an outlier using the Modified Z-Score M_i?",
    options: [
      "|M_i| >= 1.0",
      "|M_i| >= 3.5",
      "|M_i| >= 10.0",
      "|M_i| >= 0.05"
    ],
    correctIndex: 1,
    explanation: "Boris Iglewicz and David Hoaglin (1993), as well as the National Institute of Standards and Technology (NIST), recommend a threshold of |M_i| >= 3.5 for declaring an observation as an outlier using Modified Z-scores.",
    practicalTip: "A threshold of 3.5 provides an optimal balance between sensitivity and false alarm suppression across both normal and moderately skewed distributions.",
    codeSnippet: "# NIST standard modified z cutoff\nTHRESHOLD = 3.5\nis_outlier = mod_z_scores.abs() >= THRESHOLD",
    examRelevance: "Statistical Standards & Quality Assurance"
  },
  {
    id: 7,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why does the classical Z-Score method fail catastrophically on a heavily right-skewed dataset (such as software engineer salaries in Salt Lake Sector V)?",
    options: [
      "Because Python math functions only run on symmetrical matrices.",
      "Because the long right tail artificially pulls the mean to the right and inflates the standard deviation, causing Z-scores to shrivel (Masking) and setting negative lower bounds that make no sense for positive variables.",
      "Because salaries cannot be divided by standard deviations.",
      "Because skewed distributions have no median."
    ],
    correctIndex: 1,
    explanation: "On skewed data, the standard deviation is inflated by the long tail. The symmetric 3-sigma boundaries [mean - 3*std, mean + 3*std] often produce an absurd negative lower bound (e.g. -15 LPA) and an excessively high upper bound, causing true outliers to be masked while normal low values are swamped.",
    practicalTip: "Always check skewness (`df['col'].skew()`): If skewness > 1.0, do NOT use classical Z-score; use Tukey IQR or log-transform the data first.",
    codeSnippet: "if abs(df['salary'].skew()) > 1.0:\n    print('Data is skewed! Do not use classical Z-Score.')",
    examRelevance: "MAKAUT BCAC701B Applied Data Preparation"
  },
  {
    id: 8,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is 'Quantile Trimming' (Percentile Filtering) in automated production pipelines?",
    options: [
      "Deleting exactly 50% of the dataset at random.",
      "Establishing explicit empirical percentile thresholds (e.g., lower bound at 1st percentile and upper bound at 99th percentile) and filtering out records falling outside this range.",
      "Converting continuous numbers into quartiles.",
      "Sorting the table in descending order."
    ],
    correctIndex: 1,
    explanation: "Quantile trimming establishes fixed percentile cutoffs P_alpha and P_(1-alpha) (e.g. 1st and 99th percentiles). Records beyond these bounds are pruned or flagged. It is non-parametric, ultra-fast O(N log N), and robust to arbitrary distributions.",
    practicalTip: "Quantile trimming is widely used in high-volume streaming analytics (e.g. web page load latency metrics).",
    codeSnippet: "lower = df['latency'].quantile(0.01)\nupper = df['latency'].quantile(0.99)\nclean_df = df[(df['latency'] >= lower) & (df['latency'] <= upper)]",
    examRelevance: "Data Engineering Architecture & Scalable Preprocessing"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL & ALGORITHMIC MECHANICS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "In the Modified Z-Score formula M_i = 0.6745 * (x_i - Median) / MAD, where does the constant 0.6745 originate mathematically?",
    options: [
      "It is the speed of light divided by pi.",
      "It is the reciprocal of 1.4826 (i.e. 1 / 1.4826 ≈ 0.6745), which corresponds to the 75th percentile of the standard Normal distribution Phi^(-1)(0.75), ensuring MAD is an asymptotically unbiased estimator of sigma.",
      "It is Euler's constant multiplied by 2.",
      "It is an arbitrary empirical fudge factor chosen by statisticians."
    ],
    correctIndex: 1,
    explanation: "For a standard Gaussian distribution Z ~ N(0, 1), the median of |Z| is the 75th percentile of the half-normal distribution, which is approximately 0.67449. Therefore, E[MAD] = 0.6745 * sigma, meaning sigma_hat = MAD / 0.6745 = 1.4826 * MAD. Multiplying by 0.6745 standardizes the deviation to match the scale of standard normal z-scores.",
    practicalTip: "Remember: `1.4826 * MAD` estimates sigma; `0.6745 / MAD` normalizes the deviation.",
    codeSnippet: "from scipy.stats import norm\n# 75th percentile of standard normal:\nphi_75 = norm.ppf(0.75)  # 0.6744897501960817\nscale_factor = 1.0 / phi_75  # 1.482602218505602",
    examRelevance: "Mathematical Statistics & Asymptotic Distribution Theory"
  },
  {
    id: 10,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is the 'Zero-MAD Pathology' and in what dataset scenario does it cause the Modified Z-Score algorithm to crash?",
    options: [
      "When a dataset contains negative numbers.",
      "When more than 50% of the values in a column are identical (e.g. a sparse feature with 60% zeros), causing MAD = Median(|x - Median|) to evaluate to exactly 0, leading to a division-by-zero error.",
      "When the dataset has fewer than 2 columns.",
      "When data is stored in Parquet format."
    ],
    correctIndex: 1,
    explanation: "Because MAD is the median of absolute deviations from the median, if > 50% of data points have the exact same value as the median, at least half of the deviations |x_i - median| will be 0. Thus, MAD = 0. Dividing by MAD causes a ZeroDivisionError.",
    practicalTip: "Production code MUST guard against zero MAD: If `mad == 0`, fallback to `Mean Absolute Deviation` or Tukey's IQR fences.",
    codeSnippet: "# Production zero-MAD guard\nmad = np.median(np.abs(x - med))\nif mad == 0:\n    # Fallback to mean absolute deviation from median\n    mad = np.mean(np.abs(x - med))",
    examRelevance: "Robust Software Engineering & Numerical Stability"
  },
  {
    id: 11,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is the 'Medcouple' (MC) adjusted boxplot, and how does it modify Tukey's fences for right-skewed distributions?",
    options: [
      "It deletes all positive numbers.",
      "It incorporates a robust skewness estimator MC in [-1, 1] into the exponential scaling of IQR: Upper Fence = Q3 + 1.5 * exp(3 * MC) * IQR, expanding the upper bound to prevent false alarms in the natural long tail.",
      "It converts the boxplot into a scatter plot.",
      "It multiplies all fences by 10."
    ],
    correctIndex: 1,
    explanation: "Mia Hubert and Ellen Vandervieren (2008) introduced the Adjusted Boxplot. When data is right-skewed (MC > 0), `exp(3*MC) > 1`, which broadens the upper fence, while `exp(-4*MC) < 1` contracts the lower fence. This prevents normal tail observations from being falsely flagged as outliers.",
    practicalTip: "Use `statsmodels.stats.stattools.medcouple` to evaluate robust skewness before constructing boxplot fences.",
    codeSnippet: "# Adjusted boxplot fences for right-skewed data (MC >= 0):\n# upper = q3 + 1.5 * np.exp(3 * mc) * iqr\n# lower = q1 - 1.5 * np.exp(-4 * mc) * iqr",
    examRelevance: "Advanced Exploratory Data Analysis & Skewness Corrections"
  },
  {
    id: 12,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "If a dataset of size N = 100 has Q1 = 20 and Q3 = 40, what are the Tukey Inner Fences?",
    options: [
      "[0, 60]",
      "[-10, 70]",
      "[10, 50]",
      "[20, 40]"
    ],
    correctIndex: 1,
    explanation: "IQR = Q3 - Q1 = 40 - 20 = 20. 1.5 * IQR = 1.5 * 20 = 30. Lower Inner Fence = Q1 - 30 = 20 - 30 = -10. Upper Inner Fence = Q3 + 30 = 40 + 30 = 70. Therefore, the inner fence interval is [-10, 70].",
    practicalTip: "Any value x < -10 or x > 70 is flagged as at least a Mild Outlier.",
    codeSnippet: "q1, q3 = 20, 40\niqr = q3 - q1\nlower, upper = q1 - 1.5 * iqr, q3 + 1.5 * iqr\nprint(f'Fences: [{lower}, {upper}]')  # [-10.0, 70.0]",
    examRelevance: "MAKAUT Numerical Calculation Problem"
  },
  {
    id: 13,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "Why does the presence of two identical extreme outliers (e.g. values 30,000 and 32,000) cause the Classical Z-Score to fail while Tukey's IQR succeeds?",
    options: [
      "Because Z-Score cannot process numbers larger than 10,000.",
      "Because the two extreme values contribute (30,000 - mean)^2 to the sample variance, inflating the standard deviation to a massive value that shrinks the computed Z-scores below 3.0 (Masking); whereas Tukey's Q1 and Q3 depend only on 25th and 75th ranks, remaining completely unperturbed.",
      "Because Tukey's IQR requires GPU acceleration.",
      "Because Python round-off errors only occur in standard deviations."
    ],
    correctIndex: 1,
    explanation: "Variance squares deviations: a pair of extreme values inflates the sample variance by millions, expanding the denominator of z = (x - mean)/std so much that even the extreme outliers themselves register z ≈ 2.1 (< 3.0). In contrast, Tukey's quartiles depend only on rank order, remaining completely unaffected by the extreme magnitude of the top 2 points.",
    practicalTip: "This is the classic textbook illustration of Masking: Variance explodes, hiding the very anomalies that caused the explosion.",
    codeSnippet: "# Variance explosion: std explodes from 1,000 to 8,800, masking anomalies!",
    examRelevance: "MAKAUT Outlier Detection Mechanics & Failure Analysis"
  },
  {
    id: 14,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "In bivariate outlier detection, what is the Chi-Square cutoff rule for Mahalanobis Distance D_M(x)?",
    options: [
      "D_M(x) must be exactly equal to 0.",
      "An observation is flagged if its squared Mahalanobis distance D_M^2(x) exceeds the critical value of the Chi-Square distribution with p degrees of freedom at significance level alpha: D_M^2(x) > chi^2_{p, 1-alpha}.",
      "D_M(x) must be greater than 100.",
      "Mahalanobis distance cannot be used with Chi-Square."
    ],
    correctIndex: 1,
    explanation: "For p multivariate normally distributed features, the squared Mahalanobis distance D_M^2(x) = (x - mu)^T Sigma^(-1) (x - mu) follows a Chi-Square distribution with p degrees of freedom: D_M^2 ~ chi^2(p). The standard cutoff is chi^2_{p, 0.975} or chi^2_{p, 0.99}.",
    practicalTip: "For 2 features (p=2) at alpha=0.01, chi^2_{2, 0.99} ≈ 9.21. Any point with D_M^2 > 9.21 is a bivariate outlier.",
    codeSnippet: "from scipy.stats import chi2\n# Cutoff for 2 features at 99% confidence:\ncutoff = chi2.ppf(0.99, df=2)  # 9.2103",
    examRelevance: "Multivariate Statistical Analysis & Chi-Square Tests"
  },
  {
    id: 15,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "What is the breakdown point of Tukey's IQR fences compared to the sample standard deviation?",
    options: [
      "IQR is 0%, standard deviation is 50%.",
      "IQR is 25%, while standard deviation is 0%.",
      "Both have a breakdown point of 50%.",
      "Both have a breakdown point of 0%."
    ],
    correctIndex: 1,
    explanation: "The breakdown point of sample standard deviation is 0% (a single point at infinity breaks the estimator). Tukey's IQR uses Q1 (25th percentile) and Q3 (75th percentile); up to 25% of the data can be contaminated on either end before Q1 or Q3 is corrupted. Thus, its breakdown point is 25%.",
    practicalTip: "For contamination levels up to 25%, Tukey IQR is extremely stable.",
    codeSnippet: "# Breakdown point summary:\n# StDev: 0%\n# Tukey IQR: 25%\n# MAD: 50%",
    examRelevance: "Robust Statistics & Estimator Resilience Theory"
  },
  {
    id: 16,
    tier: "Tier 2: Mathematical & Algorithmic Mechanics",
    question: "When applying Log-Transformation y = log(x + 1) to compress right-skewed positive features, what mathematical change occurs to extreme outliers?",
    options: [
      "They become negative infinity.",
      "Multiplicative exponential spreads are mapped onto an additive linear scale, dramatically compressing the right tail and transforming skewed distributions into near-Gaussian shapes where classical Z-scores become valid.",
      "They are deleted automatically.",
      "The mean becomes larger than the maximum value."
    ],
    correctIndex: 1,
    explanation: "The logarithm is a monotonic concave function. The distance between 1,000 and 10,000 is 9,000 on the raw scale, but on the natural log scale, it is only ln(10000) - ln(1000) = 2.302. This non-linear compression pulls extreme tail values inward, stabilizing variance.",
    practicalTip: "Use `np.log1p(x)` to safely handle zeros: `log1p(0) = log(1) = 0`.",
    codeSnippet: "import numpy as np\n# Log-transform right-skewed income feature\ndf['log_income'] = np.log1p(df['income'])",
    examRelevance: "Feature Transformation & Non-Linear Warping"
  },

  // =========================================================================
  // TIER 3: MACHINE LEARNING SYSTEM DESIGN & ENGINEERING (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "What is the 'Preprocessing Data Leakage Trap' when computing outlier detection fences for a machine learning model?",
    options: [
      "Allowing unauthorized users to download the training CSV.",
      "Computing outlier fences (e.g. Q1, Q3, mean, std) across the ENTIRE dataset BEFORE splitting into train and test sets, allowing test set distribution information to contaminate the training preprocessing pipeline.",
      "Using open-source libraries instead of proprietary code.",
      "Storing features in uncompressed formats."
    ],
    correctIndex: 1,
    explanation: "If you compute outlier fences on the full dataset before splitting, the test set influences the decision boundaries. The strictly correct engineering practice is: Split FIRST, compute fences strictly on `X_train`, and apply those frozen boundaries to `X_test`.",
    practicalTip: "Wrap outlier filters in a scikit-learn `TransformerMixin` and fit strictly on `X_train` inside an `imblearn` or `sklearn` Pipeline.",
    codeSnippet: "# CORRECT ARCHITECTURE:\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n# Compute fences strictly on X_train:\nq1 = X_train['price'].quantile(0.25)\nq3 = X_train['price'].quantile(0.75)\nupper_fence = q3 + 1.5 * (q3 - q1)\n# Apply frozen fence to both:\nX_train_clean = X_train[X_train['price'] <= upper_fence]\nX_test_clean = X_test[X_test['price'] <= upper_fence]",
    examRelevance: "MLOps Architecture & Data Leakage Prevention"
  },
  {
    id: 18,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In a real estate pricing pipeline in New Town Kolkata, apartment prices per square foot range from ₹ 4,500 to ₹ 8,000, but a clerical typo lists one property at ₹ 450/sq.ft. Which detection engine reliably flags this lower-tail anomaly?",
    options: [
      "A rule that checks if the string ends in zero.",
      "Tukey's Lower Inner Fence [Q1 - 1.5 * IQR] or Modified Z-Score, because the clerical error is far below the lower threshold (e.g. Lower Fence = ₹ 2,600).",
      "Classical Z-score with 3-sigma cutoff.",
      "Linear regression without intercept."
    ],
    correctIndex: 1,
    explanation: "The typo (Rs 450) is an acute lower-tail anomaly. With Q1 ≈ Rs 5,150 and IQR ≈ Rs 1,700, Tukey's lower fence is 5,150 - 1.5*1,700 = Rs 2,600. Since 450 < 2,600, Tukey flags it instantly. Classical Z-score fails because luxury penthouses inflate the standard deviation, setting a negative lower bound (e.g. -Rs 17,000) that completely misses Rs 450!",
    practicalTip: "Check lower fences specifically on bounded physical variables (like price or age) where negative lower bounds are mathematically meaningless.",
    codeSnippet: "# Lower fence audit\nlower_fence = q1 - 1.5 * iqr\nlower_outliers = df[df['price_sqft'] < lower_fence]",
    examRelevance: "Real Estate Analytics & Data Cleaning Audits"
  },
  {
    id: 19,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "When deploying a high-throughput payment fraud model in Salt Lake Sector V, an engineer replaces raw outlier deletion with 'Feature Augmentation'. What does this mean?",
    options: [
      "Adding fake synthetic data using GANs.",
      "Winsorizing the raw numerical transaction value to bound variance for linear/neural layers, while simultaneously creating a new binary indicator column `is_outlier = 1` so tree models can exploit the extreme transaction signal.",
      "Translating column names into Bengali.",
      "Doubling the size of the database disk."
    ],
    correctIndex: 1,
    explanation: "Feature augmentation captures the best of both worlds: Numerical capping (Winsorization) protects gradient stability, while the binary indicator `is_outlier = (x > fence)` preserves the vital business signal that a high-value transaction occurred.",
    practicalTip: "This pattern is standard practice in credit risk and fraud modeling: never destroy signal, separate magnitude stabilization from indicator flagging.",
    codeSnippet: "# Feature Augmentation pattern\nupper_fence = q3 + 3.0 * iqr\ndf['is_extreme_tx'] = (df['amount'] > upper_fence).astype(int)\ndf['amount_capped'] = df['amount'].clip(upper=upper_fence)",
    examRelevance: "Production Feature Engineering & Fraud Systems"
  },
  {
    id: 20,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "Why should an engineer NEVER use `df.dropna()` as a substitute for outlier detection?",
    options: [
      "Because `dropna()` is deprecated in pandas 2.0.",
      "Because outliers are NOT null/missing values; they are populated, syntactically valid numbers (e.g. 50,000,000) that will pass `dropna()` completely unnoticed.",
      "Because `dropna()` only deletes column headers.",
      "Because `dropna()` converts integers into strings."
    ],
    correctIndex: 1,
    explanation: "`dropna()` only inspects null indicators (`NaN`, `None`). Outliers are fully populated numerical values. Relying on missing value handlers to clean outliers is a catastrophic conceptual error.",
    practicalTip: "Treat missingness and extremity as two independent, sequential preprocessing stages: Impute missing values -> Detect and treat outliers.",
    codeSnippet: "# Outliers have valid non-null values and evade dropna():\n# df['salary'].isna().sum() == 0, yet salary=99999999 is an outlier!",
    examRelevance: "MAKAUT Preprocessing Sequence & Pipeline Logic"
  },
  {
    id: 21,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In streaming agricultural sensor monitoring in North 24 Parganas, an optical soil sensor transmits an impossible soil moisture reading of 950% due to an electrical surge. What automated preprocessing rule should be applied at the edge gateway?",
    options: [
      "Rebooting the entire micro-controller.",
      "Physical Domain Clamping / Range Filtering: Enforce hard physical limits [0%, 100%] before applying any statistical outlier algorithms, immediately rejecting or flagging readings outside physically possible envelopes.",
      "Averaging the 950% reading with zero.",
      "Waiting for 24 hours to verify the soil moisture."
    ],
    correctIndex: 1,
    explanation: "Statistical methods (Z-score, IQR) are secondary to Hard Physical Constraints. If an attribute has known thermodynamic, biological, or physical limits (percentage in [0, 100], age in [0, 120]), hard clipping or rejection must precede statistical testing.",
    practicalTip: "Always implement Domain Range Sanity checks as Layer 1 before statistical outlier detection.",
    codeSnippet: "# Layer 1: Hard physical boundary filter\ndef clean_sensor(val):\n    if val < 0.0 or val > 100.0:\n        return np.nan  # Flag as defective hardware reading\n    return val",
    examRelevance: "IoT Edge Preprocessing & Domain Integrity"
  },
  {
    id: 22,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "How does the choice between 1.5x IQR and 3.0x IQR in Tukey's fences affect the Precision-Recall trade-off for an anomaly detection system?",
    options: [
      "It has no effect on any metric.",
      "1.5x IQR casts a wider detection net (Higher Recall of anomalies, but higher False Positive rate); 3.0x IQR is conservative (Higher Precision, but risks missing subtle moderate outliers).",
      "3.0x IQR flags more outliers than 1.5x IQR.",
      "1.5x IQR can only be used on odd numbers."
    ],
    correctIndex: 1,
    explanation: "1.5x IQR establishes tighter fences, flagging more points (high recall of potential anomalies, but some normal points are falsely flagged). 3.0x IQR establishes wider outer fences, flagging only extreme anomalies (high precision, low false positives, but lower recall).",
    practicalTip: "Use 1.5x IQR for data cleaning (where being conservative protects model training) and 3.0x IQR for alert generation (where alert fatigue must be avoided).",
    codeSnippet: "# 1.5x IQR = High sensitivity / cleaning; 3.0x IQR = High specificity / alerting",
    examRelevance: "Model Evaluation & Anomaly Precision-Recall Trade-offs"
  },
  {
    id: 23,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "In a K-Nearest Neighbors (KNN) regressor, why does failing to remove target outliers severely corrupt predictions for nearby clean queries?",
    options: [
      "Because KNN converts features into cosine similarity.",
      "Because KNN predicts the average target value of the k nearest neighbors; if an outlier point is among the k neighbors, its extreme target value heavily inflates the local prediction.",
      "Because KNN only works on binary labels.",
      "Because KNN deletes outliers during the tree search."
    ],
    correctIndex: 1,
    explanation: "KNN regression computes y_pred = (1/k) * sum_{j in N_k(x)} y_j. If k=5 and one neighbor has an erroneous target value of 500,000 while the other 4 have value 10, the predicted average is ~100,000, ruining prediction accuracy for all query points in that neighborhood.",
    practicalTip: "Use distance-weighted KNN (`weights='distance'`) or median-aggregation KNN to dampen the influence of distant neighbor outliers.",
    codeSnippet: "from sklearn.neighbors import KNeighborsRegressor\n# Distance weighting reduces outlier impact compared to uniform average:\nknn = KNeighborsRegressor(n_neighbors=5, weights='distance')",
    examRelevance: "Instance-Based Learning & Neighborhood Sensitivity"
  },
  {
    id: 24,
    tier: "Tier 3: Machine Learning System Design & Engineering",
    question: "Why should an engineer inspect the 'Kurtosis' of a feature before deciding to apply classical Z-score outlier detection?",
    options: [
      "Because Kurtosis measures whether the server CPU is running hot.",
      "Because Kurtosis measures the 'tailedness' of the probability distribution; features with high Excess Kurtosis (> 3.0) possess heavy, fat tails where extreme values occur naturally and classical Gaussian 3-sigma rules generate excessive false alarms.",
      "Because Kurtosis is only defined for categorical variables.",
      "Because Kurtosis rounds all numbers to the nearest integer."
    ],
    correctIndex: 1,
    explanation: "Kurtosis quantifies tail propensity relative to a normal distribution (mesokurtic kurtosis = 3). Leptokurtic distributions (kurtosis > 3, e.g. Student-t or financial returns) naturally produce extreme observations. Using a Gaussian 3-sigma rule on leptokurtic data leads to mass false-positive swamping.",
    practicalTip: "Check `scipy.stats.kurtosis(data)`: If excess kurtosis > 1.0, avoid Z-score; use Tukey IQR or heavy-tailed modeling.",
    codeSnippet: "from scipy.stats import kurtosis\nif kurtosis(df['revenue']) > 3.0:\n    print('Heavy-tailed distribution detected! Avoid Gaussian Z-score.')",
    examRelevance: "Advanced Descriptive Statistics & Distribution Diagnostics"
  },

  // =========================================================================
  // TIER 4: ADVANCED PRODUCTION & SCALABILITY ANALYSIS (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "What is the 'Hampel Filter' and why is it considered the gold standard for robust outlier removal in streaming time-series signals?",
    options: [
      "A deep convolutional neural network running on Kubernetes.",
      "A sliding window filter that replaces the center observation with the rolling window median if its deviation from the rolling median exceeds 3 * (1.4826 * rolling_MAD), effectively removing impulse spikes without phase lag.",
      "An audio equalization plugin for MP3 files.",
      "A database indexing algorithm for PostgreSQL."
    ],
    correctIndex: 1,
    explanation: "Named after Frank Hampel, the Hampel filter computes rolling median and rolling MAD in a sliding window of size 2k + 1. If |x_t - med_t| > 3 * 1.4826 * MAD_t, x_t is declared an impulse outlier and replaced with med_t. It is completely robust to local spikes and requires zero global distribution assumptions.",
    practicalTip: "The Hampel filter is the premier algorithm for cleaning IoT sensor streams, GPS traces, and financial tick data in real time.",
    codeSnippet: "# Conceptual Hampel Filter in pandas\ndef hampel_filter(series, window_size=5, n_sigmas=3):\n    rolling_med = series.rolling(window=window_size, center=True).median()\n    rolling_mad = (series - rolling_med).abs().rolling(window=window_size, center=True).median()\n    threshold = n_sigmas * 1.4826 * rolling_mad\n    difference = (series - rolling_med).abs()\n    outlier_mask = difference > threshold\n    clean_series = series.copy()\n    clean_series[outlier_mask] = rolling_med[outlier_mask]\n    return clean_series",
    examRelevance: "Streaming Time-Series Preprocessing & Signal Processing"
  },
  {
    id: 26,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "In distributed Big Data architectures (Apache Spark / PySpark), how is Tukey's IQR computed efficiently across 500 Million records without collecting data to the driver node?",
    options: [
      "By sorting the entire 500M row DataFrame on a single CPU core.",
      "By using approximate quantile algorithms (such as the Greenwald-Khanna algorithm or t-digest) via `df.stat.approxQuantile('feature', [0.25, 0.75], relativeError=0.01)`, which computes provably accurate quartiles in parallel in O(N) time.",
      "By deleting 99% of the rows randomly.",
      "Spark cannot calculate percentiles."
    ],
    correctIndex: 1,
    explanation: "Exact sorting of 500 Million rows across distributed partitions requires massive network shuffle. Spark provides `approxQuantile` using the Greenwald-Khanna algorithm, guaranteeing that estimated quantiles are within `relativeError` (e.g. 1%) of true ranks with zero driver memory bottleneck.",
    practicalTip: "Always use `df.stat.approxQuantile()` in PySpark for robust distributed IQR calculation.",
    codeSnippet: "# PySpark Distributed IQR calculation\n# q1, q3 = df.stat.approxQuantile('revenue', [0.25, 0.75], 0.001)\n# iqr = q3 - q1\n# lower, upper = q1 - 1.5 * iqr, q3 + 1.5 * iqr\n# clean_df = df.filter((df.revenue >= lower) & (df.revenue <= upper))",
    examRelevance: "Distributed Systems & Scalable Machine Learning (Spark)"
  },
  {
    id: 27,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "What is 'Extreme Value Theory' (EVT) and how does the Generalized Pareto Distribution (GPD) model outliers beyond high thresholds?",
    options: [
      "A psychological theory of human decision-making under stress.",
      "The branch of statistics proving that under the Pickands-Balkema-de Haan Theorem, excesses over a sufficiently high threshold u follow a Generalized Pareto Distribution (GPD), allowing mathematically rigorous estimation of extreme tail probabilities without assuming global normality.",
      "A sorting algorithm for extreme numbers.",
      "A method for training neural networks with extreme learning rates."
    ],
    correctIndex: 1,
    explanation: "Just as the Central Limit Theorem governs the distribution of sample averages, Extreme Value Theory (EVT) governs the distribution of tail extremes. The Peaks-Over-Threshold (POT) approach fits a Generalized Pareto Distribution to tail excesses (X - u | X > u), providing exact risk quantification for 100-year floods, market crashes, or cybersecurity breaches.",
    practicalTip: "Use `scipy.stats.genpareto` when you must model the probability of catastrophic, rare outlier events.",
    codeSnippet: "# EVT Peaks Over Threshold fitting:\n# from scipy.stats import genpareto\n# params = genpareto.fit(tail_excesses)",
    examRelevance: "Extreme Value Theory & Advanced Risk Modeling"
  },
  {
    id: 28,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "When applying Box-Cox power transformation y = (x^lambda - 1) / lambda to stabilize variance before outlier detection, what constraint is strictly required on the feature values?",
    options: [
      "All feature values must be strictly positive (x > 0).",
      "All feature values must be negative.",
      "The dataset must contain exactly 100 observations.",
      "Feature values must be integers."
    ],
    correctIndex: 0,
    explanation: "Box-Cox transformation requires strictly positive numbers: x > 0. For features containing non-positive numbers (zeros or negatives), engineers must use the Yeo-Johnson transformation, which extends Box-Cox to real numbers while preserving smooth continuity.",
    practicalTip: "In scikit-learn, `PowerTransformer(method='yeo-johnson')` handles zeros and negatives automatically, making it safer than Box-Cox.",
    codeSnippet: "from sklearn.preprocessing import PowerTransformer\npt = PowerTransformer(method='yeo-johnson')\nX_trans = pt.fit_transform(X)",
    examRelevance: "Mathematical Transformations & Parameter Estimation"
  },
  {
    id: 29,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "In online streaming outlier detection (e.g. Apache Flink or Kafka Streams), why are static historical fences prone to 'Concept Drift Degradation'?",
    options: [
      "Because streaming brokers run out of disk space.",
      "Because the live data-generating distribution P(X) evolves over time (e.g. inflation gradually increases transaction amounts, or seasonal temperature shifts), causing static historical fences to flag increasing volumes of normal points as false-positive outliers.",
      "Because Flink does not support floating point arithmetic.",
      "Because static fences cannot be evaluated in memory."
    ],
    correctIndex: 1,
    explanation: "Static thresholds assume stationarity. When underlying processes drift (e.g. festival shopping spikes in Kolkata or inflation), static bounds become stale, triggering mass false alarms. Streaming engines must implement adaptive decaying window quantiles or online reservoir sampling.",
    practicalTip: "Deploy exponential moving percentiles or streaming t-digests that adaptively update fences over rolling time horizons.",
    codeSnippet: "# Online rolling quantile tracking avoids stale static thresholds",
    examRelevance: "Streaming MLOps & Concept Drift Engineering"
  },
  {
    id: 30,
    tier: "Tier 4: Advanced Production & Scalability Analysis",
    question: "What is the 'Subspace Outlier Detection' paradigm in high-dimensional feature spaces (d > 50)?",
    options: [
      "Deleting features whose names have more than 10 letters.",
      "Searching for outliers in lower-dimensional projections or subsets of relevant features, because true outliers in high dimensions are frequently masked by 40+ irrelevant noisy dimensions in full Euclidean space.",
      "Converting all continuous features into 1D arrays.",
      "A method for compressing databases using underwater fiber optic cables."
    ],
    correctIndex: 1,
    explanation: "In high dimensions, the Curse of Dimensionality creates distance concentration: every point appears equally distant in 50D space. However, an observation might be an extreme outlier in a specific 2D or 3D subspace (e.g. Debt vs Income). Subspace outlier methods (like SOD or HiCS) project data into relevant feature subsets.",
    practicalTip: "Combine feature selection or Autoencoder reconstruction error with outlier detection when working with high-dimensional feature spaces.",
    codeSnippet: "# Autoencoder reconstruction error identifies high-dimensional subspace anomalies",
    examRelevance: "High-Dimensional Data Mining & Advanced Anomaly Systems"
  }
];

export default questions;
