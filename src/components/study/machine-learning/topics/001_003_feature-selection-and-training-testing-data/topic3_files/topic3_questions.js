/**
 * =============================================================================
 * CODER & ACCOTAX ACADEMIC QUESTION BANK
 * Course: Introduction to Machine Learning (BCAC701B)
 * Module 3: Feature Selection and Training & Testing Data
 * Topic 3: Correlation and Feature Relationships
 * Lead Author: Sukanta Hui | Barrackpore, West Bengal, India
 * 
 * 30 Authentic Graded Questions Across 4 Rigorous Pedagogical Tiers:
 * - Tier 1: Conceptual Foundations & Terminology (Q1 - Q8)
 * - Tier 2: Mathematical Mechanics & Association Metrics (Q9 - Q16)
 * - Tier 3: Applied Architecture, Algorithms & Multicollinearity Dynamics (Q17 - Q24)
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
    scenario: "A junior analyst at a real estate firm in Kolkata claims that if two features have a Pearson correlation r = 0.00, they are completely statistically independent.",
    question: "Why is the statement 'Pearson r = 0 implies statistical independence' mathematically false?",
    options: [
      "Because Pearson r only applies to variables sampled from uniform distributions.",
      "Because Pearson r only measures strictly linear relationships; non-linear dependencies (e.g. y = x²) can have r = 0 while being 100% deterministic.",
      "Because Pearson r is unbounded and can produce complex imaginary numbers.",
      "Because sample correlation requires a minimum of 10,000 observations to prove independence."
    ],
    correct: 1,
    explanation: "Pearson correlation coefficient r evaluates strictly linear association. In symmetric non-linear relationships such as Y = X² where X ~ Uniform[-a, a], Cov(X, Y) = E[X³] = 0, yielding r = 0.00. However, Y is completely determined by X. Statistical independence requires P(X, Y) = P(X)P(Y), which is violated.",
    practicalTip: "Never use a Pearson correlation filter alone to prune features if non-linear models (Decision Trees, Random Forests, Neural Networks) are used downstream."
  },
  {
    id: 2,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An engineer in Barrackpore is comparing Spearman's rank correlation (rho) with Pearson's correlation (r) for sensor calibration.",
    question: "What type of feature relationship is Spearman's rank correlation specifically designed to capture?",
    options: [
      "Strictly linear relationships with normal residual distributions.",
      "Monotonic relationships (consistently increasing or decreasing), whether linear or non-linear.",
      "Periodic sinusoidal oscillations across seasonal time-series.",
      "Categorical cross-tabulation independence."
    ],
    correct: 1,
    explanation: "Spearman's rho evaluates monotonic relationships by calculating Pearson's r on rank-transformed observations. If Y increases whenever X increases (even exponentially or logarithmically), Spearman rho = +1.0, whereas Pearson r would be strictly less than 1.0.",
    practicalTip: "Use Spearman's rho when features exhibit exponential, logarithmic, or power-law growth, or when extreme sensor outliers are present."
  },
  {
    id: 3,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A data science student is preparing for the MAKAUT viva on exploratory data analysis and is asked about Anscombe's Quartet (1973).",
    question: "What fundamental statistical truth does Anscombe's Quartet famously demonstrate?",
    options: [
      "That four different learning algorithms always converge to the same global loss minimum.",
      "That datasets with identical means, variances, regression lines, and Pearson r can have completely different geometric structures.",
      "That gradient descent cannot optimize non-convex cost functions without momentum.",
      "That L1 regularization is mathematically equivalent to principal component analysis."
    ],
    correct: 1,
    explanation: "Francis Anscombe constructed four synthetic datasets with identical numerical summary statistics (mean of x = 9.0, mean of y = 7.50, regression line y = 3.0 + 0.5x, and r = 0.816). Yet visually, one is linear, one is parabolic, one has a high-residual outlier, and one is a vertical line with high leverage. It proves visual inspection is mandatory.",
    practicalTip: "Always plot bivariate scatter diagrams; never trust summary statistics and correlation numbers blindly."
  },
  {
    id: 4,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "In a medical dataset from Jadavpur, an administrative recording error inserts a single corrupted value of -99999 for body temperature in an otherwise clean feature vector.",
    question: "How does this single extreme outlier affect Pearson r compared to Spearman rho?",
    options: [
      "Both Pearson r and Spearman rho are completely unaffected because modern compilers drop corrupted values.",
      "Pearson r is severely distorted and can flip sign, whereas Spearman rho changes only slightly because it uses bounded integer ranks.",
      "Spearman rho is completely inverted while Pearson r remains robust.",
      "Both metrics instantly output NaN (Not a Number)."
    ],
    correct: 1,
    explanation: "Pearson r uses squared Euclidean deviations (x_i - mean_x)(y_i - mean_y); a single extreme outlier exerts enormous leverage and can drag r from +0.95 down to negative values. Spearman rho converts raw magnitudes into discrete integer ranks (1 to N), bounding the outlier's leverage to rank 1 or N.",
    practicalTip: "If your raw telemetry data contains transmission glitches or missing-value sentinel codes (-999), clean them before computing Pearson r, or use rank metrics."
  },
  {
    id: 5,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A data engineer wants to evaluate the association between a categorical feature 'Neighborhood_Zone' (5 categories) and a continuous target 'Apartment_Price'.",
    question: "Which statistical association metric is theoretically appropriate for evaluating a categorical-continuous feature relationship?",
    options: [
      "Pearson Product-Moment Correlation (r).",
      "Correlation Ratio (Eta / eta²), derived from one-way Analysis of Variance (ANOVA).",
      "Kendall's Tau-b rank correlation.",
      "Cosine Similarity on raw ASCII strings."
    ],
    correct: 1,
    explanation: "The Correlation Ratio (eta²) is derived from ANOVA: eta² = SS_between / SS_total. It measures the proportion of variance in the continuous variable explained by the categorical groups. Pearson r and Spearman rho require both variables to be ordered or numeric.",
    practicalTip: "Use the Correlation Ratio (eta) for categorical-continuous feature screening, and Cramér's V for categorical-categorical screening."
  },
  {
    id: 6,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An ML architect reviews a feature selection report that claims: 'Since ice cream sales correlate r = 0.88 with drowning incidents in Digha, shutting ice cream stalls will save lives.'",
    question: "What classic statistical fallacy is committed here?",
    options: [
      "Berkson's Paradox.",
      "Confusing correlation with causation; both variables are driven by a confounding variable (hot summer weather).",
      "Simpson's Paradox in stratified cross-validation.",
      "The Ecological Fallacy in spatial statistics."
    ],
    correct: 1,
    explanation: "Correlation quantifies co-occurrence, not causal influence. A lurking confounder (summer ambient temperature) drives both ice cream consumption and swimming frequency. Shutting down ice cream stalls has zero causal effect on drowning.",
    practicalTip: "Feature selection algorithms select predictive proxies, not necessarily causal drivers. Causal inference requires counterfactual or structural equation modeling."
  },
  {
    id: 7,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "A tea estate manager in Siliguri measures that tea leaf yield increases with rainfall up to 150 mm/month, but decreases sharply thereafter due to waterlogging.",
    question: "Why will a linear feature selection filter using Pearson |r| likely discard monthly rainfall as useless?",
    options: [
      "Because monthly rainfall is measured in millimeters rather than kilograms.",
      "Because the inverted U-curve relationship produces positive slopes in the first half and negative slopes in the second, canceling out linear covariance.",
      "Because tea leaf yield violates the central limit theorem.",
      "Because rainfall data cannot be normalized using min-max scaling."
    ],
    correct: 1,
    explanation: "In an inverted U-shape (parabolic) response curve, the positive covariance on the ascending limb cancels out the negative covariance on the descending limb. The net linear covariance is near zero, yielding Pearson r approx 0.0, fooling linear filters.",
    practicalTip: "For non-monotonic physical responses, engineer polynomial features (rainfall²) or use distance correlation / mutual information."
  },
  {
    id: 8,
    tier: 1,
    difficulty: "Foundation",
    category: "Conceptual Foundations",
    scenario: "An analyst computes the pairwise correlation matrix for 6 features and finds that Feature 1 and Feature 2 have a correlation r = 0.99.",
    question: "What term describes the statistical condition where two or more predictor features in a dataset are highly linearly related?",
    options: [
      "Heteroscedasticity.",
      "Multicollinearity.",
      "Stationarity.",
      "Autocorrelation."
    ],
    correct: 1,
    explanation: "Multicollinearity occurs when predictor features in a regression model are highly correlated with each other. It inflates the variance of estimated regression coefficients and makes individual feature contributions unstable.",
    practicalTip: "Detect multicollinearity using pairwise correlation matrices (|r| >= 0.85) and Variance Inflation Factors (VIF >= 10)."
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & ASSOCIATION METRICS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A student performs hypothesis testing on a sample correlation r = 0.40 calculated from N = 27 observations.",
    question: "Under the null hypothesis H_0: rho = 0, what is the formula and degrees of freedom for the Student's t-test statistic?",
    options: [
      "t = r * sqrt(N - 1) with N - 1 degrees of freedom.",
      "t = r * sqrt( (N - 2) / (1 - r²) ) with N - 2 degrees of freedom.",
      "t = (r - 0.5) / sqrt(N) with N degrees of freedom.",
      "t = r² * (N - 2) with 2 degrees of freedom."
    ],
    correct: 1,
    explanation: "The exact Student's t-statistic for testing zero population correlation is t = r * sqrt( (N - 2) / (1 - r²) ) with df = N - 2. For r = 0.40 and N = 27, t = 0.40 * sqrt(25 / (1 - 0.16)) = 0.40 * sqrt(29.76) = 2.18, with df = 25.",
    practicalTip: "On small sample sizes (N < 30), relatively large correlations (e.g. r = 0.35) can easily fail to achieve statistical significance at p < 0.01."
  },
  {
    id: 10,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "Given two ranked vectors with no tied ranks: R(X) = [1, 2, 3, 4, 5] and R(Y) = [1, 3, 2, 5, 4].",
    question: "What is the exact value of Spearman's rank correlation coefficient rho?",
    options: [
      "rho = 1.00",
      "rho = 0.80",
      "rho = 0.50",
      "rho = 0.00"
    ],
    correct: 1,
    explanation: "Differences d_i = R(X) - R(Y): [0, -1, +1, -1, +1]. Squared differences d_i²: [0, 1, 1, 1, 1], so sum(d_i²) = 4. With N = 5, formula: rho = 1 - (6 * sum(d_i²)) / (N * (N² - 1)) = 1 - (6 * 4) / (5 * 24) = 1 - 24 / 120 = 1 - 0.20 = 0.80.",
    practicalTip: "Spearman's algebraic formula 1 - 6 sum(d²)/(N(N²-1)) applies strictly when there are no ties; with ties, compute Pearson r on ranks."
  },
  {
    id: 11,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A researcher examines Kendall's Tau-b on 4 observations: (1, 2), (2, 4), (3, 3), (4, 5).",
    question: "How many total pairs exist, how many are concordant, and what is the resulting Kendall's Tau?",
    options: [
      "Total pairs = 6; Concordant = 5, Discordant = 1; Tau = (5 - 1) / 6 = 0.667.",
      "Total pairs = 4; Concordant = 4, Discordant = 0; Tau = 1.000.",
      "Total pairs = 12; Concordant = 6, Discordant = 6; Tau = 0.000.",
      "Total pairs = 16; Concordant = 10, Discordant = 6; Tau = 0.250."
    ],
    correct: 0,
    explanation: "Total pairs = N(N - 1) / 2 = 4(3) / 2 = 6 pairs. Pairs: (1 vs 2): (1,2) vs (2,4) -> C; (1 vs 3): (1,2) vs (3,3) -> C; (1 vs 4): (1,2) vs (4,5) -> C; (2 vs 3): (2,4) vs (3,3) -> D (x increases, y decreases); (2 vs 4): (2,4) vs (4,5) -> C; (3 vs 4): (3,3) vs (4,5) -> C. Concordant = 5, Discordant = 1. Tau = (5 - 1) / 6 = 4 / 6 = 0.667.",
    practicalTip: "Kendall's Tau represents P(concordance) - P(discordance) = 5/6 - 1/6 = 4/6 = 0.667."
  },
  {
    id: 12,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A data scientist evaluates the Szekely-Rizzo Distance Correlation dCor(X, Y) on a complex non-linear dynamic system.",
    question: "What is the defining mathematical property that distinguishes Distance Correlation from Pearson correlation?",
    options: [
      "Distance Correlation is strictly negative for inverse relationships.",
      "dCor(X, Y) in [0, 1], and dCor(X, Y) = 0 if and only if X and Y are statistically independent.",
      "dCor(X, Y) requires X and Y to be discrete binary integers.",
      "dCor(X, Y) equals Pearson r squared in all sample distributions."
    ],
    correct: 1,
    explanation: "Unlike Pearson r where r = 0 fails to guarantee independence for non-linear manifolds, Distance Correlation satisfies the profound property: dCor(X, Y) = 0 <=> X _|_ Y. It captures linear, non-linear, and multi-modal statistical dependencies in arbitrary dimensions.",
    practicalTip: "Distance correlation is computationally O(N²); for massive datasets, compute dCor on a random representative subsample."
  },
  {
    id: 13,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A contingency table between two categorical variables has 3 rows and 4 columns, with total sample size N = 500 and Pearson chi-square statistic chi² = 72.0.",
    question: "What is the value of Cramér's V, and how is it interpreted?",
    options: [
      "V = 0.72; near-perfect collinearity.",
      "V = sqrt( 72.0 / (500 * min(2, 3)) ) = sqrt( 72 / 1000 ) = sqrt(0.072) approx 0.268; moderate association.",
      "V = 72.0 / 500 = 0.144; negligible association.",
      "V = sqrt( 72 / 500 ) = 0.379; high association."
    ],
    correct: 1,
    explanation: "Cramér's V = sqrt( chi² / (N * min(r - 1, c - 1)) ). Here r = 3 (r - 1 = 2) and c = 4 (c - 1 = 3), so min(r - 1, c - 1) = 2. Denominator = 500 * 2 = 1000. V = sqrt(72 / 1000) = sqrt(0.072) = 0.268, indicating a moderate categorical association.",
    practicalTip: "Cramér's V scales between 0 and 1, regardless of the dimensions of the contingency table, making it ideal for feature screening."
  },
  {
    id: 14,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "In an ANOVA test, a categorical feature divides continuous target Y into 4 groups. Total Sum of Squares SS_total = 1200, and Sum of Squares Between Groups SS_between = 432.",
    question: "What is the Correlation Ratio (eta²), and what percentage of target variation is explained by this feature?",
    options: [
      "eta² = 0.36; the feature explains 36% of the target variation.",
      "eta² = 0.60; the feature explains 60% of the target variation.",
      "eta² = 0.432; the feature explains 43.2% of the target variation.",
      "eta² = 1200 / 432 = 2.77; invalid expansion."
    ],
    correct: 0,
    explanation: "Correlation Ratio eta² = SS_between / SS_total = 432 / 1200 = 0.36. Thus, 36% of the variance in target Y is explained by the categorical grouping.",
    practicalTip: "The square root of eta² gives eta = 0.60, which acts as the non-linear analog to Pearson's |r|."
  },
  {
    id: 15,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "Let X and Y be two independent standard normal variables X, Y ~ N(0, 1). Define Z = X + Y and W = X - Y.",
    question: "What is the Covariance Cov(Z, W) and what is the Pearson correlation r(Z, W)?",
    options: [
      "Cov(Z, W) = 2, r(Z, W) = 1.0",
      "Cov(Z, W) = Var(X) - Var(Y) = 1 - 1 = 0, so r(Z, W) = 0.0",
      "Cov(Z, W) = -1, r(Z, W) = -0.5",
      "Cov(Z, W) = 4, r(Z, W) = 0.8"
    ],
    correct: 1,
    explanation: "Cov(Z, W) = Cov(X + Y, X - Y) = Cov(X, X) - Cov(X, Y) + Cov(Y, X) - Cov(Y, Y) = Var(X) - Var(Y). Since both have variance 1, Cov(Z, W) = 1 - 1 = 0. Because linear combinations of bivariate normal variables are jointly normal, zero covariance here also implies statistical independence!",
    practicalTip: "For jointly Gaussian random variables (and ONLY jointly Gaussian variables), zero covariance strictly guarantees statistical independence."
  },
  {
    id: 16,
    tier: 2,
    difficulty: "Intermediate",
    category: "Mathematical Mechanics",
    scenario: "A data engineer computes the eigenvalues of a 4x4 sample correlation matrix R: lambda_1 = 3.60, lambda_2 = 0.35, lambda_3 = 0.045, lambda_4 = 0.005.",
    question: "What is the Condition Number kappa = sqrt(lambda_max / lambda_min), and what does it diagnose?",
    options: [
      "kappa = sqrt(3.60 / 0.005) = sqrt(720) approx 26.8; acceptable matrix conditioning.",
      "kappa = sqrt(3.60 / 0.005) = sqrt(720) approx 26.8; severe multicollinearity (kappa > 15 to 30 threshold).",
      "kappa = 3.60 - 0.005 = 3.595; well-conditioned.",
      "kappa = 0.005 / 3.60 = 0.0014; perfectly singular."
    ],
    correct: 1,
    explanation: "Condition number kappa = sqrt(lambda_max / lambda_min) = sqrt(3.60 / 0.005) = sqrt(720) = 26.83. In classical econometrics and machine learning, kappa > 15 to 30 signals severe ill-conditioning and dangerous multicollinearity.",
    practicalTip: "When kappa is large, small noise in training targets causes massive, unstable fluctuations in OLS regression weights."
  },

  // =========================================================================
  // TIER 3: APPLIED ARCHITECTURE, ALGORITHMS & MULTICOLLINEARITY (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "An ML pipeline executes a greedy correlation threshold filter: 'If any pair has |r| > 0.85, drop the feature with the lower correlation to the target.'",
    question: "What is the primary benefit and the primary risk of this heuristic pruning approach?",
    options: [
      "Benefit: It eliminates all non-linear dependencies; Risk: It increases training time by O(N³).",
      "Benefit: It removes redundant collinearity and stabilizes regression weights; Risk: It evaluates pairwise correlations in isolation and may drop features that provide synergistic multivariate predictive power.",
      "Benefit: It guarantees 100% test accuracy; Risk: It converts continuous variables into strings.",
      "Benefit: It prevents target leakage; Risk: It increases the condition number of the design matrix."
    ],
    correct: 1,
    explanation: "Dropping one feature from pairs with |r| > 0.85 slashes multicollinearity and shrinks the condition number. However, pairwise thresholding ignores conditional interactions; in some cases, the difference between two collinear features carries vital residual information.",
    practicalTip: "Always verify cross-validation performance before permanently discarding collinear features flagged by |r| > 0.85."
  },
  {
    id: 18,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "In an e-commerce sales prediction model, two features 'Daily_Visits' and 'Daily_Pageviews' have Pearson correlation r = 0.94. Both are included in an unregularized OLS regression.",
    question: "What commonly happens to the regression coefficients beta_hat for these two collinear features?",
    options: [
      "Both coefficients become exactly zero.",
      "The coefficients can exhibit wildly inflated standard errors, and one coefficient may receive a counter-intuitive negative sign despite positive correlation with sales.",
      "The coefficients are guaranteed to be equal to r / 2.",
      "The regression line rotates by 90 degrees."
    ],
    correct: 1,
    explanation: "Because both features provide virtually identical information, the model cannot distinguish their individual causal effects. The matrix (XᵀX) is near-singular, resulting in huge standard errors and arbitrary weight trade-offs (e.g. +14.2 for Visits and -12.8 for Pageviews).",
    practicalTip: "When you see positive bivariate correlation but a negative regression coefficient, suspect multicollinearity immediately."
  },
  {
    id: 19,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data scientist compares how Ridge Regression (L2) and Lasso Regression (L1) handle a cluster of 5 features with pairwise correlations r > 0.90.",
    question: "How do Ridge (L2) and Lasso (L1) differ in their structural treatment of collinear feature clusters?",
    options: [
      "Ridge selects one feature and drops four; Lasso divides weights equally.",
      "Ridge shrinks all 5 collinear coefficients toward each other (retaining all 5 with smaller weights), whereas Lasso arbitrarily selects one feature and shrinks the other 4 to exactly zero.",
      "Both algorithms fail to converge on collinear features.",
      "Lasso squares the coefficients while Ridge takes their absolute values."
    ],
    correct: 1,
    explanation: "L2 penalty (w₁² + w₂²) is convex and spherical, pulling collinear weights toward equality. L1 penalty (|w₁| + |w₂|) has sharp diamond corners along the coordinate axes, forcing redundant feature weights to exactly zero (performing automatic feature selection).",
    practicalTip: "If you want automatic feature selection in the presence of collinearity, use Lasso; if you want group stability, use ElasticNet."
  },
  {
    id: 20,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A credit scoring model uses a Decision Tree. The feature set includes both 'Monthly_Income_INR' and 'Monthly_Income_USD' (exact linear conversion: 1 USD = 86 INR).",
    question: "How does this perfect collinearity affect the Decision Tree compared to an Ordinary Least Squares (OLS) model?",
    options: [
      "It causes the Decision Tree to crash due to matrix singularity.",
      "The Decision Tree is largely unaffected because it evaluates features greedily one threshold at a time; it simply splits on one and ignores the other.",
      "The Decision Tree splits on both features simultaneously at every node, doubling the tree depth.",
      "The Decision Tree inverts its Gini impurity metric."
    ],
    correct: 1,
    explanation: "Unlike linear regression (which requires inverting XᵀX), decision trees evaluate split criteria (Gini/Entropy) on single features independently. The tree will pick whichever feature happens to be evaluated first with identical gain, completely unaffected by matrix singularity.",
    practicalTip: "Decision trees are naturally immune to multicollinearity in terms of predictive accuracy, though feature importance rankings get split between duplicates."
  },
  {
    id: 21,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "An engineer computes the correlation matrix of 10 features and applies Hierarchical Clustering (using correlation distance d = 1 - |r|) to group features into dendrogram clusters.",
    question: "What is the primary architectural objective of clustering features using correlation distance?",
    options: [
      "To cluster customer rows into unsupervised marketing personas.",
      "To identify clusters of mutually redundant features so that exactly one representative feature can be selected per cluster.",
      "To compute the global gradient descent learning rate.",
      "To convert continuous features into one-hot encoded binary vectors."
    ],
    correct: 1,
    explanation: "Hierarchical feature clustering groups features based on mutual correlation distance d = 1 - |r|. Sub-trees with near-zero distance represent redundant feature clusters. The engineer can safely keep the single most predictive feature from each cluster and drop the rest.",
    practicalTip: "Feature clustering with dendrograms is the gold standard for reducing dimensionality in highly redundant sensor arrays."
  },
  {
    id: 22,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data pipeline applies log transformation: x_log = log(x + 1) to a right-skewed positive continuous feature before feeding it into a linear model.",
    question: "What happens to Pearson r(x, y) versus Spearman rho(x, y) after applying this monotonic transformation?",
    options: [
      "Both Pearson r and Spearman rho change significantly.",
      "Spearman rho remains exactly identical, while Pearson r changes because log is non-linear.",
      "Pearson r remains identical, while Spearman rho changes.",
      "Both metrics are inverted to their negative reciprocals."
    ],
    correct: 1,
    explanation: "Because log is a strictly increasing monotonic transformation, the relative order (ranks) of all observations is preserved perfectly. Therefore, Spearman rho is strictly invariant: rho(log(X), Y) = rho(X, Y). However, Pearson r evaluates linear distances, which are altered by the log warp.",
    practicalTip: "Spearman rank correlation is invariant under monotonic transformations (log, sqrt, exp, box-cox), making it immune to feature scaling."
  },
  {
    id: 23,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "A data scientist evaluates mutual information I(X; Y) and distance correlation dCor(X, Y) to detect non-linear feature relationships.",
    question: "Which of the following describes a key operational advantage of Mutual Information over Distance Correlation?",
    options: [
      "Mutual Information requires strictly Gaussian data.",
      "Mutual Information handles mixed discrete, categorical, and continuous variables seamlessly in information-theoretic units (bits/nats).",
      "Mutual Information is always equal to Pearson r.",
      "Mutual Information never requires binning or density estimation."
    ],
    correct: 1,
    explanation: "Mutual Information I(X; Y) = H(Y) - H(Y|X) applies universally to continuous, discrete, and categorical variables, quantifying general statistical dependence in fundamental units of information (bits).",
    practicalTip: "Use Mutual Information for mixed-type datasets, but ensure appropriate continuous density estimation (e.g. KSG k-nearest neighbors)."
  },
  {
    id: 24,
    tier: 3,
    difficulty: "Advanced",
    category: "Applied Architecture",
    scenario: "An ML model is trained with 50 features. The data scientist checks the Variance Inflation Factor (VIF) for all features and discovers that 8 features have VIF > 45.0.",
    question: "What is the recommended iterative procedure to remediate this severe multicollinearity?",
    options: [
      "Drop all 8 features simultaneously in a single pass.",
      "Compute VIF, remove the single feature with the highest VIF, recompute all VIFs on the remaining features, and repeat iteratively until all VIFs < 5 to 10.",
      "Multiply all 8 features by random Gaussian noise.",
      "Invert the target variable."
    ],
    correct: 1,
    explanation: "Because VIFs are mutually coupled, dropping one collinear feature often causes the VIFs of several remaining features to drop dramatically. Dropping all 8 at once may discard useful non-redundant signal. Always drop iteratively: remove max(VIF), recompute, and repeat.",
    practicalTip: "Iterative VIF pruning is a standard preprocessing best practice before fitting any linear, logistic, or GLM model."
  },

  // =========================================================================
  // TIER 4: REAL-WORLD INDUSTRIAL CASE STUDIES & TROUBLESHOOTING (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "In the Kolkata real estate valuation system (New Town & EM Bypass), 'Built_up_Area' and 'Carpet_Area' have Pearson r = 0.9986. An OLS model fitted with both features yields coefficients: Built_up = +8400 INR/sqft, Carpet = -7200 INR/sqft.",
    question: "Why did Carpet Area receive a negative coefficient despite being positively correlated with price, and what is the engineering fix?",
    options: [
      "The negative coefficient proves that larger carpet areas reduce property value; keep both features.",
      "Extreme multicollinearity caused coefficient sign flipping due to near-singular (XᵀX); the fix is to drop one feature (or engineer a 'Loading_Factor' ratio).",
      "The dataset was sorted in reverse order; re-sorting will fix the sign.",
      "Gradient descent ran with too high a learning rate; switch to Adam."
    ],
    correct: 1,
    explanation: "This is classic multicollinearity sign reversal. With r = 0.9986, the model assigns large opposing weights to fit minor noise fluctuations. The solution is to retain only one feature or compute Loading_Factor = Built_up / Carpet as a non-collinear feature.",
    practicalTip: "When domain physics indicates a feature should be positive, a negative regression weight is almost always caused by collinearity."
  },
  {
    id: 26,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "At the WBSEDCL smart grid substation in Barrackpore, telemetry streams Active Power (kW) and Transformer Oil Temp (°C). The data exhibits Pearson r = 0.77, Spearman rho = 0.91, and Distance Correlation dCor = 0.88.",
    question: "What does the substantial gap between Pearson r (0.77) and Spearman rho (0.91) indicate about the physical relationship between power load and oil temperature?",
    options: [
      "The sensors are defective and must be recalibrated.",
      "The relationship is strongly monotonic, but non-linear (thermal inertia and exponential cooling curves cause deviations from a straight line).",
      "Active power load has no relationship with oil temperature.",
      "The data contains 50% missing values."
    ],
    correct: 1,
    explanation: "When Spearman rho is significantly higher than Pearson r (|rho| >> |r|), the relationship is strictly monotonic (oil temp rises consistently with load), but the curvature is non-linear due to physical thermodynamics (Arrhenius dissipation laws).",
    practicalTip: "A gap where |rho| > |r| + 0.10 is the universal mathematical signature of a non-linear monotonic relationship."
  },
  {
    id: 27,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "In Siliguri tea gardens, tea flush yield is modeled against rainfall. Pearson r is 0.04 (p = 0.62), while Distance Correlation dCor is 0.68 (p < 0.001) and Mutual Information is 0.55 bits.",
    question: "If an automated feature selection pipeline relies strictly on Pearson correlation p-values, what catastrophic engineering mistake will occur?",
    options: [
      "The pipeline will allocate all model weights to rainfall.",
      "The pipeline will mistakenly discard rainfall as statistically insignificant noise, eliminating a critical physical driver of agricultural yield.",
      "The pipeline will trigger an out-of-memory error.",
      "The pipeline will force the model to predict negative yields."
    ],
    correct: 1,
    explanation: "The p-value of 0.62 indicates that rainfall has no LINEAR association with yield. An automated filter testing only Pearson p-values will discard rainfall as irrelevant noise, even though dCor = 0.68 proves strong non-linear agricultural dependence.",
    practicalTip: "Never use linear hypothesis test p-values as the sole gating criterion for feature elimination in physical or biological systems."
  },
  {
    id: 28,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "A spinning mill along the Hooghly River measures Jute Tenacity (cN/tex) across 12 different loom frame speeds. An engineer builds a correlation matrix of 20 vibration sensors and finds that 15 of them have pairwise correlations |r| > 0.92.",
    question: "What is the most effective dimensionality reduction technique to compress these 15 collinear vibration sensors into 2 or 3 orthogonal features?",
    options: [
      "One-Hot Encoding.",
      "Principal Component Analysis (PCA) or Singular Value Decomposition (SVD).",
      "Min-Max Normalization.",
      "Label Encoding."
    ],
    correct: 1,
    explanation: "Principal Component Analysis (PCA) projects collinear features onto their orthogonal eigenvectors. The first 2 or 3 principal components will capture 95%+ of the common vibration variance without any multicollinearity.",
    practicalTip: "PCA is ideal when features represent multiple physical sensors measuring the same mechanical vibration or acoustic resonance."
  },
  {
    id: 29,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "A patient diagnostic dataset in Kolkata has 8 clinical variables. A junior data scientist computes correlation with the diagnostic target before performing a train/test split.",
    question: "What critical methodological error occurred, and how does it compromise the validity of feature selection?",
    options: [
      "The correlation matrix should have used imaginary numbers.",
      "Target leakage: Computing feature-to-target correlations across the full dataset leaks information from the test set into feature selection, producing overly optimistic test results.",
      "Correlation cannot be computed before normalizing to [0, 1].",
      "The test set should always have more samples than the training set."
    ],
    correct: 1,
    explanation: "Feature selection is an integral part of the model learning pipeline. Computing correlations with target Y across the entire dataset leaks validation distribution information into feature choices, causing severe optimistic bias and poor real-world generalization.",
    practicalTip: "Always split your data into Train and Test FIRST. Perform all correlation analysis and feature selection exclusively on the training fold."
  },
  {
    id: 30,
    tier: 4,
    difficulty: "Expert",
    category: "Industrial Case Studies",
    scenario: "An ML architect is preparing a production pipeline for Kolkata Metro passenger gate congestion. Two sensors ('Optical_Gate_Passage_Count' and 'Smartcard_RFID_Tap_Count') have Pearson r = 0.998.",
    question: "Beyond stabilizing regression models, what production infrastructure benefit is gained by dropping one of these redundant sensors from the edge IoT ingestion stream?",
    options: [
      "It eliminates the need for electricity at metro stations.",
      "It cuts edge IoT network bandwidth transmission costs and real-time inference latency by 50% for gate telemetry.",
      "It guarantees zero passenger queues during rush hours.",
      "It automatically synchronizes trains with Sealdah main."
    ],
    correct: 1,
    explanation: "In production edge IoT systems, transmitting and deserializing duplicate telemetry consumes cellular bandwidth, edge gateway CPU, database storage, and real-time scoring latency. Eliminating sensor redundancy halves telemetry overhead without accuracy loss.",
    practicalTip: "Feature selection is an end-to-end systems optimization: less telemetry means lower cloud ingress costs and lower latency SLAs."
  }
];

export default questions;
