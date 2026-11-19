/**
 * Topic 1: Feature Selection Concept
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION (Core Concepts, Search Space, 3 Paradigms)
  // =========================================================================
  {
    id: 1,
    question: "What is the primary objective of Feature Selection in machine learning systems?",
    shortAnswer: "To identify and retain the optimal subset of informative, non-redundant covariates from the original feature space, eliminating irrelevant noise and collinear duplicates to improve generalization, efficiency, and interpretability.",
    explanation: "Feature selection restricts model inputs to genuine predictive signals. This mitigates the curse of dimensionality, reduces parameter estimation variance, lowers inference computational latency, and prevents overfitting.",
    hint: "Think about keeping signal while dropping noise and redundant columns.",
    level: "Basic",
    codeExample: "# Scikit-learn feature selection pipeline\nfrom sklearn.feature_selection import SelectKBest, f_regression\nselector = SelectKBest(score_func=f_regression, k=5)\nX_selected = selector.fit_transform(X_train, y_train)"
  },
  {
    id: 2,
    question: "For a dataset with d candidate features, what is the exact cardinality of the non-empty combinatorial subset search space?",
    shortAnswer: "2^d - 1 possible candidate subsets.",
    explanation: "Each of the d features can be either included (1) or excluded (0), yielding 2^d total combinations. Subtracting the empty subset leaves 2^d - 1 non-empty subsets. For d = 50, this equals over 1.125 quadrillion combinations, making brute-force search NP-hard.",
    hint: "Every feature has 2 binary states: in or out.",
    level: "Basic",
    codeExample: "# Combinatorial search space growth\nimport math\ndef num_subsets(d):\n    return (2 ** d) - 1\nprint(num_subsets(10))  # 1,023\nprint(num_subsets(50))  # 1,125,899,906,842,623"
  },
  {
    id: 3,
    question: "What are the three canonical methodological paradigms of feature selection?",
    shortAnswer: "Filter Methods (model-agnostic statistical scoring), Wrapper Methods (using the learning algorithm as an evaluation oracle), and Embedded Methods (intrinsic selection during loss optimization).",
    explanation: "Filter methods evaluate features independently using statistical metrics. Wrapper methods search subset combinations by repeatedly training and testing models. Embedded methods (like Lasso L1) enforce sparsity directly during parameter optimization.",
    hint: "Filter (Statistical), Wrapper (Model-guided search), Embedded (L1 / Tree loss).",
    level: "Basic",
    codeExample: "# The 3 Paradigms\n# 1. Filter: SelectKBest(mutual_info_classif, k=5)\n# 2. Wrapper: RFE(estimator=LogisticRegression(), n_features_to_select=5)\n# 3. Embedded: Lasso(alpha=0.1)"
  },
  {
    id: 4,
    question: "How does the Curse of Dimensionality degrade distance-based algorithms like KNN and K-Means when redundant features are added?",
    shortAnswer: "As dimensionality d increases, the volume of Euclidean space grows exponentially, causing all pairwise distances to converge to a uniform distance (D_max - D_min) / D_min -> 0, rendering nearest neighbors indistinguishable.",
    explanation: "In high dimensions, points become isolated in the corners of the hypercube. Adding uninformative noise features dilutes the distance signal from genuine predictors, making KNN predictions equivalent to random voting.",
    hint: "Contrast between nearest and farthest neighbors vanishes in high dimensions.",
    level: "Basic",
    codeExample: "# Distance dilution in high dimensions\n# In 1000-D space, all points appear almost equidistant from each other."
  },
  {
    id: 5,
    question: "Why does adding more features to a linear regression model always cause the training R^2 to increase or stay constant, even if the features are pure random noise?",
    shortAnswer: "Because Ordinary Least Squares minimizes sum of squared residuals; each additional parameter gives the optimization another degree of freedom to fit random sample fluctuations in the training data.",
    explanation: "Even with random numbers uncorrelated with the target, the regression optimizer assigns non-zero weights w_j to fit chance training correlations. Hence training error strictly decreases monotonically, though validation error will rise.",
    hint: "More parameters always increase training curve flexibility.",
    level: "Basic",
    codeExample: "# Training R^2 monotonicity\n# Adding random noise columns: R2_train strictly increases, R2_test collapses."
  },
  {
    id: 6,
    question: "What is Occam's Razor, and how does it justify feature selection in statistical machine learning?",
    shortAnswer: "The principle of parsimony stating that among competing hypotheses that explain the data equally well, the simplest one with the fewest assumptions and parameters is preferred because it generalizes best.",
    explanation: "A model with 5 features that achieves 90% validation accuracy is fundamentally superior to a 50-feature model achieving 90.5%, because the simpler model has lower parameter variance and fewer failure points in production.",
    hint: "Simpler models with fewer moving parts generalize better.",
    level: "Basic",
    codeExample: "# Occam's Razor in Model Selection\n# Prefer Model A (5 features, 89% acc) over Model B (120 features, 89.4% acc)"
  },
  {
    id: 7,
    question: "How does feature selection differ fundamentally from dimensionality reduction techniques like PCA (Principal Component Analysis)?",
    shortAnswer: "Feature selection preserves the original physical variables and their interpretability by selecting a subset S subset of X; PCA creates new synthetic linear combinations (z_1 = sum w_j x_j), destroying domain interpretability.",
    explanation: "In regulated domains like credit underwriting in Barrackpore or oncology diagnosis, domain experts must explain decisions using original features (e.g. 'internal marks' or 'blood pressure'), which PCA obscures into uninterpretable principal axes.",
    hint: "Selection keeps original columns; PCA transforms and combines them.",
    level: "Basic",
    codeExample: "# Selection vs Extraction\n# Feature Selection: ['age', 'income'] -> ['income'] (Preserves identity)\n# PCA: ['age', 'income'] -> [0.72*age + 0.69*income] (Synthetic projection)"
  },
  {
    id: 8,
    question: "What is an irrelevant noise feature, and what is its true population correlation with the target?",
    shortAnswer: "A feature that is statistically independent of the target conditioned on all other covariates (P(Y | X) = P(Y | X_{-j})); its true population correlation with the target is identically zero (rho = 0).",
    explanation: "In our West Bengal student dataset, a student's 'favorite number' or 'shoe size' has zero causal or statistical relationship with their final semester percentage. Retaining it increases parameter variance without adding predictive signal.",
    hint: "Zero mutual information and zero true correlation with target.",
    level: "Basic",
    codeExample: "# Irrelevant feature: r(shoe_size, semester_marks) approx 0.0"
  },

  // =========================================================================
  // TIER 2: MECHANICS (Statistical Filters, Wrapper Greediness, L1 Lasso)
  // =========================================================================
  {
    id: 9,
    question: "How does a statistical Filter method evaluate candidate features, and what is its primary computational advantage?",
    shortAnswer: "It computes univariate statistical scores (Pearson r, Mutual Information, ANOVA F) directly between each feature and the target; its complexity is O(d * N), making it orders of magnitude faster than model training.",
    explanation: "Filter methods evaluate features in linear time without executing machine learning training cycles. They can screen 100,000 features in seconds, making them the standard first stage in high-dimensional pipelines.",
    hint: "O(d * N) complexity; no model fitting required.",
    level: "Intermediate",
    codeExample: "# Filter Method evaluation\nfrom sklearn.feature_selection import mutual_info_regression\nscores = mutual_info_regression(X_train, y_train)"
  },
  {
    id: 10,
    question: "What is the primary architectural blind spot of univariate Filter methods in feature selection?",
    shortAnswer: "They evaluate each feature in isolation and are completely blind to multi-feature non-linear interactions and cross-feature collinearity.",
    explanation: "In XOR logic, individual features x_1 and x_2 have zero correlation with y (r = 0), so a filter method discards both. However, together they explain 100% of y. Furthermore, filters eagerly select redundant collinear twins.",
    hint: "Filters ignore interactions (e.g. x_1 * x_2) and redundancy.",
    level: "Intermediate",
    codeExample: "# Univariate Filter Failure on XOR Logic:\n# corr(x1, y) = 0.0 -> Discarded!\n# corr(x2, y) = 0.0 -> Discarded!\n# Yet y = x1 XOR x2 is 100% predictable"
  },
  {
    id: 11,
    question: "How does Greedy Forward Stepwise Selection operate, and what is its worst-case computational complexity?",
    shortAnswer: "It starts with an empty feature set (k=0) and iteratively adds the single feature that produces the largest improvement in cross-validated performance; complexity is O(d^2 * train_cost).",
    explanation: "In step 1, it trains d models. In step 2, it trains (d-1) models. Summing over k steps yields sum_{i=0}^{k-1} (d - i) approx O(k * d) model training runs. While greedy and not guaranteed to find the global optimum, it captures interactions.",
    hint: "Step-by-step addition of the best marginal predictor.",
    level: "Intermediate",
    codeExample: "# Forward Stepwise Selection in Python\nfrom sklearn.feature_selection import SequentialFeatureSelector\nsfs = SequentialFeatureSelector(estimator, direction='forward', n_features_to_select=4)"
  },
  {
    id: 12,
    question: "How does Backward Elimination differ from Forward Selection, and why is it preferred when multicollinearity is present?",
    shortAnswer: "Backward Elimination starts with all d features included and iteratively prunes the least significant feature; because all features are present initially, it assesses multicollinearity and collective interaction effects from step 1.",
    explanation: "Forward selection can get trapped early by picking an individual feature that blocks a superior pair from being evaluated. Backward elimination assesses each feature in the context of the full set, accurately penalizing redundant variables.",
    hint: "Starts full and prunes weakest; evaluates complete context.",
    level: "Intermediate",
    codeExample: "# Backward Elimination\nsfs = SequentialFeatureSelector(estimator, direction='backward', n_features_to_select=4)"
  },
  {
    id: 13,
    question: "What is the mathematical mechanism by which Lasso (L1) regularization sets feature weights strictly to zero, unlike Ridge (L2)?",
    shortAnswer: "The L1 constraint ball ||w||_1 <= t has sharp vertices (corners) on the coordinate axes; loss contours intersect these corners where w_j = 0, driven by the soft-thresholding operator S_lambda(w) = sign(w) * max(0, |w| - lambda).",
    explanation: "Ridge L2 penalty w_j^2 has a spherical smooth constraint ball where tangents rarely intersect at zero, shrinking weights asymptotically but never setting them to zero. Lasso's diamond corners produce exact coordinate sparsity.",
    hint: "Diamond L1 ball vertices intersect loss contours at w_j = 0.",
    level: "Intermediate",
    codeExample: "# Lasso produces exact zero coefficients (Embedded Selection)\nfrom sklearn.linear_model import Lasso\nlasso = Lasso(alpha=0.5).fit(X_train, y_train)\nprint(lasso.coef_)  # [3.2, 0.0, 0.0, 1.4, 0.0] -> Exact zeroes!"
  },
  {
    id: 14,
    question: "Why does the Validation Error curve exhibit a convex U-shape as feature cardinality k increases from 1 to d?",
    shortAnswer: "For small k, the model underfits (high bias); as informative features are added, error drops to an optimal minimum k*; past k*, incorporating noise features causes estimation variance and overfitting to explode.",
    explanation: "This is the classic Bias-Variance Tradeoff. Informative features reduce bias faster than they increase variance. Once all informative features are in the model, adding more columns only increases variance, driving validation error upward.",
    hint: "Underfitting (high bias) -> Optimal sweet spot -> Overfitting (high variance).",
    level: "Intermediate",
    codeExample: "# The U-Curve validation check\n# k=1: Val MSE = 14.2 (Underfit)\n# k=4: Val MSE = 3.1  (Optimal sweet spot k*)\n# k=8: Val MSE = 16.5 (Overfit to noise)"
  },
  {
    id: 15,
    question: "How is the Variance Inflation Factor (VIF) formulated, and what threshold signals severe multicollinearity?",
    shortAnswer: "VIF_j = 1 / (1 - R_j^2), where R_j^2 is the R^2 from regressing feature j on all other d-1 features; a VIF >= 10.0 indicates severe multicollinearity.",
    explanation: "When R_j^2 approaches 1.0 (indicating that feature j is perfectly predictable from other features), the denominator approaches zero and VIF approaches infinity. The standard error of w_j is inflated by sqrt(VIF), destabilizing the model.",
    hint: "VIF = 1 / (1 - R^2); threshold is 10 (or 5 in conservative settings).",
    level: "Intermediate",
    codeExample: "# Calculating VIF in Python\nfrom statsmodels.stats.outliers_influence import variance_inflation_factor\nvifs = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]"
  },
  {
    id: 16,
    question: "How does Recursive Feature Elimination (RFE) prune features recursively across successive estimation cycles?",
    shortAnswer: "It fits the model on the current feature set, calculates feature importance weights (|w_j| or Gini importance), prunes the lowest-ranked feature(s), and retrains recursively until k features remain.",
    explanation: "Unlike single-pass ranking, RFE recalculates feature importances after each pruning step. This is critical because removing one collinear feature allows the importance of its surviving partner to adjust dynamically.",
    hint: "Fit -> Rank -> Prune worst -> Retrain -> Repeat.",
    level: "Intermediate",
    codeExample: "# Recursive Feature Elimination in scikit-learn\nfrom sklearn.feature_selection import RFE\nselector = RFE(estimator=LinearRegression(), n_features_to_select=3, step=1)\nselector.fit(X_train, y_train)"
  },

  // =========================================================================
  // TIER 3: ARCHITECTURE (Leakage Prevention, Pipeline Gating, Multicollinearity)
  // =========================================================================
  {
    id: 17,
    question: "What is Feature Selection Data Leakage, and how does executing selection before train_test_split() invalidate offline benchmarks?",
    shortAnswer: "Running feature selection on the complete dataset allows target labels and correlation signals from the test partition to influence which features are chosen, producing artificially inflated offline validation metrics that collapse in production.",
    explanation: "If you select features with the highest correlation to y on the full dataset, features that happen to correlate with y in the test fold by random noise are retained. In production, unseen data lacks this fluke correlation, causing failure.",
    hint: "Feature selection must be treated as an estimated parameter fitted only on X_train.",
    level: "Advanced",
    codeExample: "# FATAL ARCHITECTURAL LEAKAGE ANTI-PATTERN:\n# X_sel = selector.fit_transform(X, y)  <- LEAKAGE!\n# X_tr, X_te, y_tr, y_te = train_test_split(X_sel, y)\n# CORRECT: Pipeline([('sel', selector), ('model', model)])"
  },
  {
    id: 18,
    question: "How does scikit-learn's Pipeline prevent feature selection data leakage during K-Fold cross-validation?",
    shortAnswer: "By wrapping the feature selector and estimator together, ensuring that for each fold, the selector is fitted strictly on the K-1 training folds and only applied to transform the held-out validation fold.",
    explanation: "In cross-validation, every fold must represent a pristine unseen test set. The Pipeline encapsulates fit_transform() strictly within the training folds, eliminating any possibility of validation distribution leakage.",
    hint: "Pipeline encapsulates fit() on training folds only.",
    level: "Advanced",
    codeExample: "# Leakage-free Cross-Validation Pipeline\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.model_selection import cross_val_score\npipe = Pipeline([('select', SelectKBest(k=4)), ('clf', LogisticRegression())])\nscores = cross_val_score(pipe, X_train, y_train, cv=5)"
  },
  {
    id: 19,
    question: "When two features are perfectly collinear (r(x_1, x_2) = 1.0), what happens to the Gram matrix X^T X and the Ordinary Least Squares solution?",
    shortAnswer: "The columns of X are linearly dependent, so rank(X) < d, det(X^T X) = 0, condition number kappa = infinity, and (X^T X)^(-1) is undefined, causing OLS to collapse.",
    explanation: "Even with near-collinearity (r = 0.998), det(X^T X) is near-zero, producing massive coefficient standard errors. Regression weights can swing wildly (e.g. w_1 = +500, w_2 = -495), making individual coefficients meaningless.",
    hint: "Collinear columns make the Gram matrix singular (det = 0).",
    level: "Advanced",
    codeExample: "# Multicollinearity Gram Singularity\n# det(X^T X) == 0.0 -> Ordinary Least Squares collapses"
  },
  {
    id: 20,
    question: "Why does ElasticNet regularization outperform pure Lasso (L1) when candidate features exhibit high pairwise correlation?",
    shortAnswer: "When features are strongly correlated, Lasso arbitrarily selects one and zeroes out the other; ElasticNet adds an L2 Ridge penalty (alpha * L1 + (1-alpha) * L2), creating a grouping effect where correlated predictors are retained together.",
    explanation: "In genomic or financial data where groups of 10 genes or 5 market indices move together, picking one at random causes high variance. ElasticNet shares weights across the group while maintaining overall model sparsity.",
    hint: "ElasticNet combines L1 sparsity with L2 group stability.",
    level: "Advanced",
    codeExample: "# ElasticNet for correlated feature groups\nfrom sklearn.linear_model import ElasticNet\nelastic = ElasticNet(alpha=0.1, l1_ratio=0.7).fit(X_train, y_train)"
  },
  {
    id: 21,
    question: "What is the difference between Variance Thresholding and correlation-based feature filtering?",
    shortAnswer: "Variance Thresholding is completely unsupervised (operates strictly on X without looking at target y, dropping constants with Var <= tau); correlation filtering is supervised (evaluates association between X_j and y).",
    explanation: "Variance thresholding removes features that have near-zero variance across all samples (e.g. a column where 99.9% of entries are identical). Because it ignores y, it is fast and safe to apply prior to any supervised filtering.",
    hint: "Variance threshold uses only X; correlation uses X and y.",
    level: "Advanced",
    codeExample: "# Unsupervised Variance Thresholding\nfrom sklearn.feature_selection import VarianceThreshold\nthresh = VarianceThreshold(threshold=0.01)\nX_clean = thresh.fit_transform(X_train)"
  },
  {
    id: 22,
    question: "How can Mutual Information detect informative non-linear features that have Pearson correlation r = 0?",
    shortAnswer: "Mutual Information computes Kullback-Leibler divergence between joint distribution P(X, Y) and product of marginals P(X)P(Y); if knowledge of X reduces uncertainty in Y, I(X; Y) > 0 regardless of linearity.",
    explanation: "For y = x^2 with x centered at zero, E[xy] = 0 so Pearson r = 0. However, knowing |x| completely determines y, so conditional entropy H(Y | X) = 0, yielding maximal Mutual Information I(X; Y) = H(Y) > 0.",
    hint: "Measures reduction in entropy: I(X; Y) = H(Y) - H(Y | X).",
    level: "Advanced",
    codeExample: "# Mutual Information captures non-linear signals\nmi = mutual_info_regression(x.reshape(-1, 1), y)  # High score even if r = 0"
  },
  {
    id: 23,
    question: "Why does tree-based Mean Decrease in Impurity (MDI / Gini Importance) exhibit an artificial bias toward continuous and high-cardinality features?",
    shortAnswer: "Features with many unique values provide more split threshold candidates, giving the greedy tree algorithm more opportunities to accidentally minimize training node impurity by chance.",
    explanation: "A random continuous noise feature has N-1 unique split points, whereas a binary feature has only 1 split candidate. MDI consistently overestimates the importance of continuous noise. Permutation Feature Importance should be used instead.",
    hint: "More split candidates allow trees to fit noise more easily.",
    level: "Advanced",
    codeExample: "# Solution: Use Permutation Importance instead of MDI\nfrom sklearn.inspection import permutation_importance\nperm_imp = permutation_importance(rf_model, X_val, y_val, n_repeats=10)"
  },
  {
    id: 24,
    question: "How does backward stepwise elimination use p-values in Ordinary Least Squares to prune insignificant features?",
    shortAnswer: "It fits the linear model, computes the two-tailed t-test p-value for H_0: w_j = 0 across all features, identifies the feature with the highest p-value exceeding alpha (e.g. p > 0.05), removes it, and repeats.",
    explanation: "If p > 0.05, the data provides insufficient statistical evidence that the true slope differs from zero. Pruning features with high p-values one by one eliminates coefficients that do not statistically contribute to explaining target variance.",
    hint: "Prune highest p-value when p > alpha.",
    level: "Advanced",
    codeExample: "# Backward elimination by p-value in statsmodels\nimport statsmodels.api as sm\nmodel = sm.OLS(y, X).fit()\n# Remove feature with max p-value if p > 0.05"
  },

  // =========================================================================
  // TIER 4: PRODUCTION, SCALABILITY & SERVING GUARDS
  // =========================================================================
  {
    id: 25,
    question: "In the High-Dimension Low-Sample-Size regime (p >> N, e.g. 20,000 genes on 100 patients), why do ordinary regression and wrapper methods fail?",
    shortAnswer: "With p >> N, the design matrix has rank at most N, making X^T X rank-deficient with infinitely many perfect-fit solutions; wrappers overfit violently by finding random combinations of genes that fit the 100 samples.",
    explanation: "When features drastically exceed observations, the null space is massive. Any random subset of N features can achieve 100% training accuracy. Robust selection requires a two-stage filter (screening down to 500) followed by strong L1 regularization.",
    hint: "Infinite solutions exist when p > N; requires aggressive regularization.",
    level: "Expert",
    codeExample: "# p >> N architecture:\n# Stage 1: Univariate ANOVA Filter: 20,000 -> 500\n# Stage 2: ElasticNet / Lasso: 500 -> 25"
  },
  {
    id: 26,
    question: "What is Subset Selection Stability, and why is an unstable feature selector hazardous in clinical diagnostics?",
    shortAnswer: "Stability measures whether small perturbations in the training data (e.g. bootstrap resamples) yield the exact same subset of selected features; unstable selectors choose completely different biomarkers on different patient batches.",
    explanation: "In oncology research in Kolkata, if Model A selects Gene 42 and Model B on a slightly different cohort selects Gene 99, clinicians cannot trust which biological pathway to target with expensive drugs. Stability can be quantified using the Jaccard similarity index across bootstrap folds.",
    hint: "Stability = consistency of selected features across resamples.",
    level: "Expert",
    codeExample: "# Stability via Jaccard index:\n# J(S1, S2) = |S1 intersect S2| / |S1 union S2|"
  },
  {
    id: 27,
    question: "How does feature pruning reduce end-to-end inference latency in real-time edge microservices?",
    shortAnswer: "Pruning reduces payload parsing, upstream database feature retrieval time, memory deserialization, and floating-point dot product operations from O(d) to O(k).",
    explanation: "In real-time fraud detection processing 50,000 transactions/sec, fetching 150 feature vectors from Redis clusters takes 45ms. Pruning to 8 core features drops Redis fetch time to 2ms and floating-point inference to microseconds.",
    hint: "Less data to fetch from cache, less memory to deserialize, faster matrix math.",
    level: "Expert",
    codeExample: "# Production latency gain: 150 features (45ms) -> 8 features (2.1ms)"
  },
  {
    id: 28,
    question: "Why are Genetic Algorithms (GAs) and Simulated Annealing used for feature selection when d is moderately large (e.g. 50 <= d <= 150)?",
    shortAnswer: "Because brute-force search is impossible (2^50 approx 10^15) and greedy forward/backward selection gets trapped in local optima; stochastic evolutionary algorithms explore non-local combinatorial interactions efficiently.",
    explanation: "A chromosome represents a binary feature mask [1, 0, 1, 0, 1]. Genetic crossover and mutation operators explore global subset configurations without greedily committing to individual features, finding non-linear interaction groups.",
    hint: "Stochastic optimization avoids greedy local traps in combinatorial search.",
    level: "Expert",
    codeExample: "# Genetic algorithm chromosome: bitmask representing active features\n# [1, 0, 1, 1, 0] = Include feature 0, 2, 3"
  },
  {
    id: 29,
    question: "How does Data Drift in production affect a model with 5 features compared to a model with 80 features?",
    shortAnswer: "A model with 80 features has an 80-dimensional attack surface for data drift; if any single upstream telemetry sensor drifts or breaks, the entire model's predictions degrade.",
    explanation: "Every additional feature is an external dependency. In production systems, third-party API changes, sensor recalibrations, or schema updates cause feature drift. A parsimonious model with 5 features is far more robust and easier to monitor.",
    hint: "More features = larger operational surface area for data drift.",
    level: "Expert",
    codeExample: "# Operational fragility: 80 features = 80 drift monitors needed\n# 5 features = simple, resilient production monitoring"
  },
  {
    id: 30,
    question: "What is the complete 4-step industrial production workflow for selecting features in enterprise machine learning pipelines?",
    shortAnswer: "1. Unsupervised filtering (drop zero-variance and constants); 2. Statistical correlation & mutual information filtering (drop pure noise); 3. Embedded L1 Lasso or tree importance pruning (handle multicollinearity); 4. Final cross-validated stability verification.",
    explanation: "This staged funnel architecture balances computational throughput and statistical rigor. It rapidly discards thousands of obvious noise features upfront before running computationally intensive regularized selection on candidate subsets.",
    hint: "Filter (Fast screen) -> Embedded (Sparsify) -> Wrapper (Fine-tune) -> Validate.",
    level: "Expert",
    codeExample: "# The 4-Step Enterprise Selection Funnel:\n# Step 1: VarianceThreshold(0.01)\n# Step 2: SelectPercentile(mutual_info, percentile=20)\n# Step 3: SelectFromModel(LassoCV())\n# Step 4: Cross-validate final pipeline"
  }
];

export default questions;
