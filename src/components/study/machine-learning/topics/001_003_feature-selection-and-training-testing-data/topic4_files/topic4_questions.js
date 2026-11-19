/**
 * =============================================================================
 * CODER & ACCOTAX ACADEMIC QUESTION BANK
 * Course: Introduction to Machine Learning (BCAC701B)
 * Module 3: Feature Selection and Training & Testing Data
 * Topic 4: Basic Feature Selection Techniques
 * Lead Author: Sukanta Hui | Barrackpore, West Bengal, India
 * 
 * 30 Authentic Graded Questions Across 4 Rigorous Pedagogical Tiers:
 * - Tier 1: Conceptual Foundations & Terminology (Q1 - Q8)
 * - Tier 2: Mathematical Mechanics & Scoring Equations (Q9 - Q16)
 * - Tier 3: Applied Architecture, Algorithms & Pipeline Tuning (Q17 - Q24)
 * - Tier 4: Real-World Industrial Case Studies & Troubleshooting (Q25 - Q30)
 * =============================================================================
 */

const questions = [
  // =========================================================================
  // TIER 1: CONCEPTUAL FOUNDATIONS & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A junior data scientist reviews a scikit-learn pipeline and sees `VarianceThreshold(threshold=0.0)` applied at the very first step.",
    question: "What specific operational category of features does `VarianceThreshold(threshold=0.0)` cleanly eliminate?",
    options: [
      "Features that are non-linearly correlated with the target variable.",
      "Constant features that possess the exact same numerical value across 100% of observations.",
      "Features that have a negative mean across training folds.",
      "Features with high multicollinearity against the target."
    ],
    correct: 1,
    explanation: "A feature with sample variance equal to 0.0 is completely invariant (e.g. currency_code = 'INR' in a domestic Indian dataset). Constant features carry strictly zero information for distinguishing target classes and should be pruned immediately.",
    practicalTip: "Always put VarianceThreshold(0.0) first in your pipeline to strip useless constant columns before computationally heavy transforms."
  },
  {
    id: 2,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A data engineer is asked whether VarianceThreshold is a supervised or unsupervised feature selection method.",
    question: "What is the correct classification of VarianceThreshold in feature selection taxonomy?",
    options: [
      "Supervised, because it optimizes cross-validation accuracy on held-out folds.",
      "Unsupervised, because it evaluates variance strictly from feature column X without referencing target labels Y.",
      "Semi-supervised, because it requires label density estimation.",
      "Reinforcement-based, because it uses an agent-based reward mechanism."
    ],
    correct: 1,
    explanation: "VarianceThreshold is purely unsupervised; it inspects the distribution of feature column X in isolation and has no knowledge of target labels Y. In contrast, ANOVA F-test and Chi-Square are supervised filters.",
    practicalTip: "Because VarianceThreshold is unsupervised, you can safely fit it without fear of target leakage, though scaling concerns remain."
  },
  {
    id: 3,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "In a binary classification dataset, a boolean flag `is_vip_customer` has 99.5% ones and 0.5% zeros.",
    question: "What term describes a feature where almost all samples belong to a single dominant category?",
    options: [
      "Orthogonal Feature.",
      "Quasi-Constant (Near-Zero Variance) Feature.",
      "Latent Embedding Feature.",
      "Heteroscedastic Feature."
    ],
    correct: 1,
    explanation: "Features where 99%+ of rows share the same value are known as quasi-constant features. Their Bernoulli variance is p*(1-p) = 0.995 * 0.005 = 0.004975, which falls below standard filtering thresholds like theta = 0.01.",
    practicalTip: "Be careful: In rare event detection (e.g. cyber intrusion or cancer), a 0.5% quasi-constant flag may actually be the primary positive signal!"
  },
  {
    id: 4,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An ML architect needs to choose between `SelectKBest` and `SelectPercentile` for an automated feature filtering pipeline.",
    question: "What is the critical distinction between `SelectKBest` and `SelectPercentile` in scikit-learn?",
    options: [
      "SelectKBest only works for regression; SelectPercentile only works for classification.",
      "SelectKBest retains a fixed integer count k of top features, whereas SelectPercentile retains a fixed percentage p of features relative to input dimensionality.",
      "SelectPercentile uses deep learning whereas SelectKBest uses linear regression.",
      "SelectKBest computes eigenvalues; SelectPercentile computes p-values."
    ],
    correct: 1,
    explanation: "SelectKBest(score_func, k=10) keeps exactly 10 features regardless of whether the raw matrix had 20 or 2,000 features. SelectPercentile(score_func, percentile=20) keeps the top 20% of features (e.g. 4 out of 20, or 400 out of 2,000).",
    practicalTip: "Use SelectKBest when you have a strict computational budget (e.g. 15 sensors max on edge hardware); use SelectPercentile for dynamic schemas."
  },
  {
    id: 5,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An analyst attempts to use scikit-learn's `chi2` scoring function on a standardized continuous feature with mean 0.0 and variance 1.0.",
    question: "Why does running `chi2` on standard-scaled features fail or throw a ValueError in Python?",
    options: [
      "Because chi2 requires integer-encoded target variables.",
      "Because Pearson's Chi-Square test is mathematically based on non-negative frequency counts; negative values from standard scaling violate its probability axioms.",
      "Because chi2 can only be computed using GPU acceleration.",
      "Because continuous features cannot be plotted on scatter charts."
    ],
    correct: 1,
    explanation: "Pearson's Chi-Square test evaluates contingency frequencies: chi^2 = sum (O - E)^2 / E. It requires non-negative values (frequencies, counts, or binary flags). Standard scaling produces negative values for anything below the mean, triggering ValueError: Input X must be non-negative.",
    practicalTip: "Use MinMaxScaler([0, 1]) instead of StandardScaler if you plan to feed continuous features into chi2, or prefer ANOVA F-test."
  },
  {
    id: 6,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A data scientist is modeling a continuous target (house price in Kolkata) using continuous features (square footage, distance to metro).",
    question: "Which univariate scoring function is theoretically appropriate for continuous features predicting a continuous target in `SelectKBest`?",
    options: [
      "f_classif (ANOVA F-test).",
      "f_regression (F-test derived from Pearson correlation r).",
      "chi2 (Pearson Chi-Square test).",
      "mutual_info_classif."
    ],
    correct: 1,
    explanation: "For regression tasks (continuous target Y), f_regression computes the correlation coefficient r between each feature and Y, converting it to an F-statistic: F = (r² / (1 - r²)) * (N - 2). f_classif and chi2 are exclusively for discrete classification targets.",
    practicalTip: "Match your scoring function to your data types: Continuous->Continuous: f_regression; Continuous->Discrete: f_classif; Discrete->Discrete: chi2."
  },
  {
    id: 7,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A researcher tests 10,000 candidate genetic features at significance level alpha = 0.05. Purely random Gaussian noise is fed into the pipeline.",
    question: "Approximately how many random noise features will appear 'statistically significant' (p < 0.05) purely due to chance (Type I error)?",
    options: [
      "0 features.",
      "500 features.",
      "5,000 features.",
      "10,000 features."
    ],
    correct: 1,
    explanation: "With alpha = 0.05, there is a 5% false positive rate for each independent test. In 10,000 tests on pure noise, the expected number of false discoveries is 10,000 * 0.05 = 500 features! This is the classic multiple testing problem.",
    practicalTip: "In high-dimensional regimes (d > 1,000), use False Discovery Rate (FDR) control (SelectFdr) via Benjamini-Hochberg adjustment."
  },
  {
    id: 8,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An engineer in Barrackpore wants to clean a feature matrix of 40 sensors by removing collinear duplicates before training a neural network.",
    question: "How does Greedy Pairwise Correlation Deduplication work?",
    options: [
      "It inverts the covariance matrix using Singular Value Decomposition.",
      "It computes all pairwise correlations |r(X_j, X_k)|, identifies pairs exceeding a threshold (e.g. 0.85), and iteratively drops one feature from each collinear pair.",
      "It replaces collinear pairs with their arithmetic mean.",
      "It trains a decision tree on each feature to predict the other."
    ],
    correct: 1,
    explanation: "Greedy correlation deduplication builds the pairwise correlation matrix R, finds pairs where |r| >= threshold, and prunes one feature (typically the one with lower target correlation), eliminating redundant collinearity in O(d² * N) time.",
    practicalTip: "Always run correlation deduplication before linear or logistic regression to prevent parameter variance explosion."
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & SCORING EQUATIONS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A boolean feature X in {0, 1} has 98% zeros and 2% ones across N = 1000 samples.",
    question: "What is the theoretical Bernoulli sample variance Var(X) = p * (1 - p)?",
    options: [
      "0.0200",
      "0.0196",
      "0.0004",
      "0.4900"
    ],
    correct: 1,
    explanation: "For a Bernoulli distributed indicator, Var(X) = p * (1 - p) = 0.02 * (1 - 0.02) = 0.02 * 0.98 = 0.0196. If a VarianceThreshold is set to theta = 0.02, this feature will be pruned.",
    practicalTip: "Remember that the maximum possible variance for a binary variable is 0.25, achieved when p = 0.5 (balanced 50/50 split)."
  },
  {
    id: 10,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "In an ANOVA F-test across K = 3 classes with N = 103 total observations, Sum of Squares Between SS_B = 180, and Sum of Squares Within SS_W = 600.",
    question: "What are the degrees of freedom (df_B, df_W) and the calculated ANOVA F-statistic?",
    options: [
      "df_B = 3, df_W = 103; F = 180 / 600 = 0.30",
      "df_B = 2, df_W = 100; MS_B = 90, MS_W = 6; F = 90 / 6 = 15.00",
      "df_B = 1, df_W = 102; F = 180 / 6 = 30.00",
      "df_B = 2, df_W = 103; F = 90 / 5.82 = 15.46"
    ],
    correct: 1,
    explanation: "df_B = K - 1 = 3 - 1 = 2. df_W = N - K = 103 - 3 = 100. Mean squares: MS_B = SS_B / df_B = 180 / 2 = 90. MS_W = SS_W / df_W = 600 / 100 = 6. F = MS_B / MS_W = 90 / 6 = 15.00.",
    practicalTip: "An F-statistic of 15.0 with df = (2, 100) corresponds to p < 0.0001, indicating that this feature has massive class-separating power."
  },
  {
    id: 11,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A 2x2 contingency table for feature X (binary) vs target Y (binary) has total sample size N = 200. The observed counts are [[80, 20], [20, 80]].",
    question: "What is the expected frequency E_11 for the top-left cell, and what is the calculated Chi-Square statistic?",
    options: [
      "E_11 = 50; chi² = 72.00",
      "E_11 = 50; chi² = 4 * ((80 - 50)² / 50) = 4 * (900 / 50) = 72.00",
      "E_11 = 100; chi² = 36.00",
      "E_11 = 20; chi² = 18.00"
    ],
    correct: 1,
    explanation: "Row 1 total = 100, Col 1 total = 100. Expected E_11 = (100 * 100) / 200 = 50. All 4 cells have E = 50 and |O - E| = 30. chi² = 4 * ((30)² / 50) = 4 * 18 = 72.00.",
    practicalTip: "A chi² of 72.0 on 1 degree of freedom is astronomically significant (critical value at p=0.001 is 10.83), making X an elite candidate for selection."
  },
  {
    id: 12,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "In an f_regression test with N = 62 samples, a continuous feature has Pearson correlation r = 0.60 with the target.",
    question: "What is the calculated F-statistic for this feature slope?",
    options: [
      "F = 0.60 * 60 = 36.0",
      "F = (r² / (1 - r²)) * (N - 2) = (0.36 / 0.64) * 60 = 0.5625 * 60 = 33.75",
      "F = 0.36 * 62 = 22.32",
      "F = (0.60 / 0.40) * 60 = 90.0"
    ],
    correct: 1,
    explanation: "F = (r² / (1 - r²)) * (N - 2). Here r = 0.60, r² = 0.36, 1 - r² = 0.64, and N - 2 = 60. F = (0.36 / 0.64) * 60 = 33.75.",
    practicalTip: "f_regression directly converts Pearson correlation r into an F-test that tests H_0: slope beta = 0."
  },
  {
    id: 13,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A data pipeline applies the Benjamini-Hochberg False Discovery Rate (FDR) procedure with target false discovery rate Q = 0.10 across m = 5 candidate features.",
    question: "The sorted p-values are [0.01, 0.03, 0.05, 0.09, 0.15]. Which features are rejected (selected) by Benjamini-Hochberg?",
    options: [
      "Only feature 1 (p = 0.01).",
      "Features 1, 2, 3, and 4, because p_k <= (k / m) * Q for k = 4 (0.09 <= (4/5)*0.10 = 0.08 is false, so up to k=3: 0.05 <= (3/5)*0.10 = 0.06 is true).",
      "Features 1, 2, and 3, because p_3 = 0.05 <= (3 / 5) * 0.10 = 0.06.",
      "All 5 features."
    ],
    correct: 2,
    explanation: "Evaluate p_(k) <= (k / m) * Q:\nk=1: 0.01 <= (1/5)*0.10 = 0.02 (True)\nk=2: 0.03 <= (2/5)*0.10 = 0.04 (True)\nk=3: 0.05 <= (3/5)*0.10 = 0.06 (True)\nk=4: 0.09 <= (4/5)*0.10 = 0.08 (False)\nk=5: 0.15 <= (5/5)*0.10 = 0.10 (False)\nThe largest index satisfying the condition is k = 3. Features 1, 2, and 3 are selected.",
    practicalTip: "Benjamini-Hochberg is much less aggressive than Bonferroni (which would require p <= 0.10/5 = 0.02), avoiding excessive Type II false negatives."
  },
  {
    id: 14,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A continuous feature X is measured in meters: Var(X) = 0.0025 m². An analyst changes the unit to millimeters: X_mm = 1000 * X.",
    question: "What is the new sample variance Var(X_mm), and what does this demonstrate about raw VarianceThreshold?",
    options: [
      "Var(X_mm) = 2.5 mm²; variance scales linearly.",
      "Var(X_mm) = (1000)² * Var(X) = 1,000,000 * 0.0025 = 2500 mm²; variance is scale-dependent and changes by the square of the conversion factor.",
      "Var(X_mm) = 0.0025 mm²; variance is scale-invariant.",
      "Var(X_mm) = 0.0 mm²; unit conversions destroy sample variance."
    ],
    correct: 1,
    explanation: "For any constant scalar c, Var(c * X) = c² * Var(X). Scaling from meters to millimeters multiplies the variance by 1,000,000! Therefore, setting an unscaled VarianceThreshold of 0.01 would drop X in meters, but keep X in millimeters. Features must have identical units or be standardized.",
    practicalTip: "Never apply a single numerical variance threshold across columns with heterogeneous physical units."
  },
  {
    id: 15,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A feature selection module tests two features X1 and X2. Target Y has variance Var(Y) = 100. regressing Y on X1 gives MSE = 64 (R² = 0.36); regressing Y on X2 gives MSE = 81 (R² = 0.19).",
    question: "Which feature has a higher f_regression score on N = 52 observations?",
    options: [
      "X2, because its residual MSE is higher.",
      "X1, because higher R² directly yields higher F-statistic: F_1 = (0.36 / 0.64)*50 = 28.12 vs F_2 = (0.19 / 0.81)*50 = 11.73.",
      "Both features have identical F-scores because sample size N is constant.",
      "Neither; f_regression requires R² > 0.50."
    ],
    correct: 1,
    explanation: "F = (R² / (1 - R²)) * (N - 2). Higher R² (lower residual MSE) directly maximizes the F-statistic. X1 explains 36% of target variance, producing F = 28.12, vastly superior to X2 (F = 11.73).",
    practicalTip: "For univariate linear regression, ranking by f_regression is mathematically equivalent to ranking by Pearson |r| or R²."
  },
  {
    id: 16,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "Consider an ANOVA F-test where a continuous feature has the exact same sample mean (mean = 50.0) across all 3 class groups.",
    question: "What is the value of Sum of Squares Between (SS_B) and the resulting ANOVA F-statistic?",
    options: [
      "SS_B = 50.0; F = 1.0",
      "SS_B = 0.0; F = 0.0",
      "SS_B = 100.0; F = 9999.0",
      "SS_B = -50.0; F = -1.0"
    ],
    correct: 1,
    explanation: "SS_B = sum n_k * (mean_k - grand_mean)². If all group means equal the grand mean, mean_k - grand_mean = 0 for all classes, so SS_B = 0. Consequently, MS_B = 0, and F = 0.0. The feature has zero discriminatory power between classes.",
    practicalTip: "A feature with F = 0 has identical class conditional means and cannot separate classes linearly."
  },

  // =========================================================================
  // TIER 3: APPLIED ARCHITECTURE, ALGORITHMS & PIPELINE TUNING (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "An ML pipeline executes `SelectKBest(score_func=f_classif, k=10)`. The dataset contains two near-identical sensors measuring oil temperature in Celsius and Fahrenheit (r = 1.0).",
    question: "What happens to both temperature sensors during this feature selection step?",
    options: [
      "The algorithm detects the redundancy and drops one sensor.",
      "Both sensors receive virtually identical high F-scores; SelectKBest picks BOTH sensors, consuming 2 of the 10 available slots with redundant information.",
      "The algorithm crashes with a singular matrix exception.",
      "The algorithm averages both sensors into a single composite feature."
    ],
    correct: 1,
    explanation: "SelectKBest evaluates each feature independently (univariate filter). Because both sensors correlate identically with the target, both receive top F-scores and both get selected! Univariate filters are completely blind to multicollinearity.",
    practicalTip: "Pair SelectKBest with a correlation deduplication step to prevent redundant duplicate features from eating up your feature budget."
  },
  {
    id: 18,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data engineer wants to combine `VarianceThreshold`, `CorrelationDeduplicator`, and `SelectKBest` into a production scikit-learn Pipeline.",
    question: "What is the theoretically optimal execution order for these basic feature selection components?",
    options: [
      "1. SelectKBest -> 2. CorrelationDeduplicator -> 3. VarianceThreshold.",
      "1. VarianceThreshold -> 2. CorrelationDeduplicator -> 3. SelectKBest.",
      "1. CorrelationDeduplicator -> 2. SelectKBest -> 3. VarianceThreshold.",
      "Order does not matter because filters are commutative."
    ],
    correct: 1,
    explanation: "Step 1: VarianceThreshold strips constant/quasi-constant columns in O(d*N) time, shrinking the matrix. Step 2: CorrelationDeduplicator removes collinear duplicates in O(d_remaining² * N). Step 3: SelectKBest ranks only the clean, non-collinear features against target Y.",
    practicalTip: "Pruning constants first avoids computing O(d²) correlation pairs on zero-variance columns (which would produce NaN correlations anyway!)."
  },
  {
    id: 19,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A team building a fraud detection system with 1,000,000 transactions and 200 features needs to choose between an ANOVA filter and a Forward Stepwise Selection wrapper.",
    question: "Why is a univariate filter preferred over a wrapper method during the initial screening stage?",
    options: [
      "Univariate filters guarantee higher test accuracy than wrappers.",
      "Univariate filters run in O(d * N) time (seconds), whereas a forward wrapper training 200 models iteratively takes O(d² * N * epochs) (hours or days).",
      "Wrappers cannot be used on tabular data.",
      "Univariate filters eliminate all non-linear interactions automatically."
    ],
    correct: 1,
    explanation: "Univariate filters evaluate each feature in a single pass (O(d*N)), making them blazingly fast on large datasets. Wrappers train a full model for every candidate subset, which is computationally intractable for 200 features without prior filtering.",
    practicalTip: "Use a two-stage funnel: Apply fast univariate filters to prune 200 features down to 30, then run wrapper selection on the 30."
  },
  {
    id: 20,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data scientist applies `SelectFpr(score_func=f_classif, alpha=0.01)` on a biomedical dataset.",
    question: "What specific statistical threshold does `SelectFpr` control during feature filtering?",
    options: [
      "The False Negative Rate (Type II error).",
      "The False Positive Rate (Type I error, selecting features with p-value < alpha under the null hypothesis of no association).",
      "The False Discovery Rate (FDR).",
      "The Family-Wise Error Rate (FWER)."
    ],
    correct: 1,
    explanation: "SelectFpr (False Positive Rate) retains all features whose individual p-value is strictly less than alpha. It controls the individual Type I error rate under the null hypothesis of zero association.",
    practicalTip: "Use SelectFpr when you want a formal statistical hypothesis test cutoff (e.g. p < 0.01) rather than an arbitrary top-k integer."
  },
  {
    id: 21,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "In an e-commerce customer churn dataset, feature X1 is monthly bill (INR), X2 is account age (months), and X3 is an XOR interaction pair {X4, X5}.",
    question: "What happens if a feature pipeline relies solely on `f_classif` (ANOVA F-test) to select the top 2 features?",
    options: [
      "It will select X4 and X5 because XOR has 100% predictive power.",
      "It will select X1 and X2, and completely drop X4 and X5 because each XOR component has an individual F-score near zero.",
      "It will crash due to categorical data in the target.",
      "It will convert X4 and X5 into continuous variables."
    ],
    correct: 1,
    explanation: "Univariate filters test features in isolation. Because individual XOR features have identical class-conditional means, their ANOVA F-scores are near zero. The filter erroneously discards the pair, selecting only X1 and X2.",
    practicalTip: "Whenever domain knowledge indicates physical or business interactions (e.g. switch A ⊕ switch B), bypass univariate filters for those features."
  },
  {
    id: 22,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data scientist computes the pairwise Pearson correlation matrix for 50 continuous features and observes a cluster of 8 features with pairwise correlations |r| > 0.92.",
    question: "Beyond greedy deduplication, what alternative unsupervised transformation cleanly compresses these 8 collinear features into 1 or 2 orthogonal dimensions?",
    options: [
      "One-Hot Encoding.",
      "Principal Component Analysis (PCA) on the collinear subset.",
      "Ordinal Categorical Label Encoding.",
      "K-Means clustering on the target variable."
    ],
    correct: 1,
    explanation: "Applying PCA to a cluster of highly collinear features extracts the primary orthogonal eigenvectors. The first 1 or 2 principal components capture 95%+ of the common variance without any multicollinearity.",
    practicalTip: "If all collinear features carry slight non-redundant signal (e.g. 8 accelerometer sensors on a bridge), PCA compression is superior to outright deletion."
  },
  {
    id: 23,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data engineer runs a 5-fold cross-validation pipeline. Feature selection (`SelectKBest`) is mistakenly placed outside the cross-validation loop (executed once on the full dataset before splitting).",
    question: "What catastrophic methodological vulnerability is introduced, and what is its consequence?",
    options: [
      "High computational complexity; the pipeline takes 5x longer to execute.",
      "Data leakage: Target information from validation folds influences feature selection, leading to artificially inflated, overly optimistic CV scores that fail in production.",
      "Underfitting: The model cannot find the global minimum.",
      "Zero variance in the validation predictions."
    ],
    correct: 1,
    explanation: "Feature selection must be treated as part of the model fitting process. If features are selected using the entire dataset, the model 'sees' the relationship with target Y in the validation test folds before training, causing severe optimistic bias.",
    practicalTip: "Always wrap feature selection and model estimators inside a single `Pipeline` and pass that pipeline into `cross_val_score`."
  },
  {
    id: 24,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "An ML pipeline uses `SelectPercentile(percentile=50)` with `mutual_info_classif` instead of `f_classif`.",
    question: "What is the primary benefit of using Mutual Information over ANOVA F-score in `SelectPercentile`?",
    options: [
      "Mutual Information is 100x faster than ANOVA.",
      "Mutual Information detects non-linear, non-monotonic dependencies between features and target, which ANOVA F-test completely misses.",
      "Mutual Information requires data to be standardized to mean 0 and variance 1.",
      "Mutual Information eliminates the need for test data."
    ],
    correct: 1,
    explanation: "ANOVA F-test assumes linear/normal group-mean separation. Mutual Information I(X; Y) measures general non-linear statistical dependency in bits, detecting parabolic, step-function, or multi-modal relationships.",
    practicalTip: "Use mutual_info_classif when using non-linear models like Random Forests, Gradient Boosted Trees, or Neural Networks."
  },

  // =========================================================================
  // TIER 4: REAL-WORLD INDUSTRIAL CASE STUDIES & TROUBLESHOOTING (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "Kolkata Metro Green Line AFC gate telemetry collects 40 attributes per 15-minute interval. Feature `currency_code` has Var = 0.0000, and `resident_flag` has Var = 0.0049.",
    question: "How should an automated feature ingestion pipeline handle these two attributes?",
    options: [
      "Retain both attributes because database storage is cheap.",
      "Apply VarianceThreshold(0.01) to prune both: `currency_code` as an absolute constant and `resident_flag` as a quasi-constant, eliminating useless telemetry overhead.",
      "Duplicate both attributes to increase model weights.",
      "Convert both attributes to polynomial interaction terms."
    ],
    correct: 1,
    explanation: "Both features carry virtually zero information variance (currency is 100% INR, resident is 99.2% positive). VarianceThreshold(0.01) removes both, reducing network payload and matrix dimensions without any loss of accuracy.",
    practicalTip: "Unsupervised variance pruning is the cheapest way to trim database telemetry before applying heavy ML algorithms."
  },
  {
    id: 26,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "At the WBSEDCL smart grid substation in Barrackpore, an anomaly detection model ingests two current transformer streams: `phase_A_current_probe_1` and `phase_A_current_probe_2` (|r| = 0.9992).",
    question: "If both streams are fed directly into an unregularized Logistic Regression model, what production failure will occur?",
    options: [
      "The logistic sigmoid function will overflow to infinity.",
      "Multicollinearity will cause severe parameter variance inflation, yielding unstable, oscillating regression weights and uninterpretable odds ratios.",
      "The model will classify all samples as anomalies.",
      "The database connection will timeout."
    ],
    correct: 1,
    explanation: "Two near-identical probes (|r| = 0.9992) cause extreme multicollinearity. The Hessian matrix in Newton-Raphson logistic updates is near-singular, causing regression weights to blow up and oscillate between +100 and -100.",
    practicalTip: "Apply CorrelationDeduplicator(|r| >= 0.85) to drop one of the duplicate sensor probes before training GLM models."
  },
  {
    id: 27,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "In Siliguri tea estate quality testing, a hyperspectral camera measures leaf reflectance across 120 narrow optical bands (400 nm to 1000 nm). Neighboring bands have |r| > 0.98.",
    question: "What is the recommended two-stage basic feature selection strategy to reduce this high-dimensional spectral matrix to 10 key wavelengths?",
    options: [
      "1. Drop all even-numbered bands arbitrarily, then fit a decision tree.",
      "1. Greedy correlation deduplication (|r| >= 0.90) to eliminate adjacent wavelength redundancy -> 2. SelectKBest(f_regression, k=10) to pick the top 10 most predictive spectral peaks.",
      "Run One-Hot Encoding on all continuous wavelengths.",
      "Train a deep autoencoder with 50 hidden layers directly on the raw bands."
    ],
    correct: 1,
    explanation: "Hyperspectral data has massive spatial and spectral collinearity. Stage 1 (correlation deduplication) collapses adjacent overlapping bands into distinct spectral regions. Stage 2 (SelectKBest) ranks the remaining distinct regions by target correlation.",
    practicalTip: "Two-stage feature selection (unsupervised deduplication -> supervised ranking) is standard practice in chemometrics and spectroscopy."
  },
  {
    id: 28,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "A spinning frame at a Serampore jute mill has 25 vibration sensors. An engineer applies `VarianceThreshold(0.01)` on raw sensor telemetry and discovers that 18 sensors are deleted, crashing model accuracy.",
    question: "What caused the feature selector to erroneously delete 18 valid vibration sensors?",
    options: [
      "The sensors were turned off.",
      "The engineer forgot to scale the data; vibration amplitudes in precision accelerometers are measured in millimeters (amplitudes < 0.05 mm), so raw variance was naturally < 0.01 despite high signal-to-noise ratio!",
      "Jute fibers emit electromagnetic interference that cancels sample variance.",
      "The threshold of 0.01 was too low."
    ],
    correct: 1,
    explanation: "Variance is unit-dependent. Accelerometer micrometer vibrations have physical amplitudes between 0.001 and 0.05 mm, meaning their true variance is around 0.0001 mm². Applying a blanket threshold of 0.01 without feature scaling or domain unit awareness wiped out active, life-saving sensors!",
    practicalTip: "Never apply absolute variance cutoffs on physical sensor telemetry without standardizing features (Z-score) or calibrating to sensor specifications."
  },
  {
    id: 29,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "A hospital in Salt Lake predicts sepsis in ICU patients. A rare biomarker `serum_procalcitonin_spike` occurs in only 0.4% of patients, but has a 95% true positive rate for severe septic shock.",
    question: "Why would applying an unsupervised `VarianceThreshold(0.01)` be medically disastrous in this clinical pipeline?",
    options: [
      "Because procalcitonin has a negative molecular weight.",
      "Because the feature has Bernoulli variance p*(1-p) = 0.004 * 0.996 = 0.003984 < 0.01; VarianceThreshold will delete this critical life-saving biomarker because it is rare!",
      "Because medical datasets must always use Chi-Square.",
      "Because sepsis is a non-linear disease."
    ],
    correct: 1,
    explanation: "In rare clinical conditions, vital diagnostic biomarkers only appear in a tiny fraction of patients (p = 0.004). An unsupervised variance filter mistakes rarity for uselessness and permanently discards the biomarker. Never use generic variance filters on rare anomaly indicators.",
    practicalTip: "In medical and fraud anomaly detection, evaluate supervised mutual information or clinical relevance before running variance filters."
  },
  {
    id: 30,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "An ML architect is deploying a real-time risk scoring engine on an edge IoT device with a strict 20 ms inference latency SLA.",
    question: "How does applying basic feature selection (VarianceThreshold + Correlation Deduplication + SelectKBest) directly optimize edge production systems?",
    options: [
      "It eliminates the need for software version control.",
      "It reduces memory RAM footprint, slashes sensor deserialization latency, avoids inverting ill-conditioned matrices, and satisfies edge computing SLAs.",
      "It allows the edge device to run without electricity.",
      "It converts batch scoring into quantum computing."
    ],
    correct: 1,
    explanation: "Feature selection is a critical systems engineering optimization. Pruning redundant and low-variance features halves network bandwidth, reduces feature store lookup times, cuts memory usage, and ensures models meet sub-20ms edge execution deadlines.",
    practicalTip: "A model with 10 well-selected features that runs in 5 ms is vastly superior in production to a 100-feature model that takes 80 ms."
  }
];

export default questions;
