/**
 * TOPIC 17: STANDARDIZATION (Z-SCORE, ROBUST SCALER & COVARIANCE SPHERICIZATION)
 * Graded Academic & Industry Certification Question Bank
 * Course: Introduction to Machine Learning (BCAC701B / MAKAUT Aligned)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 * 30 Authentic Multi-Tier Questions with Complete Explanations & Snippets
 */

const questions = [
  // =========================================================================
  // TIER 1: FOUNDATION & TERMINOLOGY (Q1 - Q8)
  // =========================================================================
  {
    id: 1,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the foundational definition and mathematical formula for classical Z-Score standardization?",
    options: [
      "z = (x - x_min) / (x_max - x_min)",
      "z = (x - mu) / sigma, centering the distribution at mean 0 and scaling it to standard deviation 1",
      "z = ln(1 + x)",
      "z = x / max(|x|)"
    ],
    correctIndex: 1,
    explanation: "Classical Z-score standardization transforms a continuous feature by subtracting its arithmetic mean mu (centering) and dividing by its standard deviation sigma (scaling). The resulting variable z represents the signed distance of observation x from the mean in units of standard deviations.",
    practicalTip: "StandardScaler is the default choice for linear models, regularized regression, PCA, and neural networks when features do not have strict hard physical bounds.",
    codeSnippet: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_std = scaler.fit_transform(X_train)",
    examRelevance: "MAKAUT BCAC701B Core Preprocessing Definitions"
  },
  {
    id: 2,
    tier: "Tier 1: Foundation & Terminology",
    question: "After applying classical Z-score standardization to a continuous feature, what are the resulting sample mean and sample variance?",
    options: [
      "Mean = 1.0, Variance = 0.0",
      "Mean = 0.0, Variance = 1.0 (Standard Normal moments)",
      "Mean = 0.5, Variance = 0.25",
      "Mean = 0.0, Variance = 0.0"
    ],
    correctIndex: 1,
    explanation: "By linearity of expectation, E[z] = E[(x - mu)/sigma] = (E[x] - mu)/sigma = (mu - mu)/sigma = 0.0. By variance scaling properties, Var(z) = Var((x - mu)/sigma) = (1/sigma^2) * Var(x) = sigma^2 / sigma^2 = 1.0. Thus, standardized data strictly has mean 0 and variance 1.",
    practicalTip: "You can verify correct standardization in your code by checking that X_scaled.mean(axis=0) ≈ 0.0 and X_scaled.std(axis=0) ≈ 1.0.",
    codeSnippet: "# Verifying standardized moments in numpy\nassert np.allclose(X_std.mean(axis=0), 0.0, atol=1e-7)\nassert np.allclose(X_std.std(axis=0), 1.0, atol=1e-7)",
    examRelevance: "Statistical Moment Proofs & Verification"
  },
  {
    id: 3,
    tier: "Tier 1: Foundation & Terminology",
    question: "How does StandardScaler fundamentally differ from MinMaxScaler regarding output bounds and behavior under extreme outliers?",
    options: [
      "StandardScaler bounds values strictly in [0, 1], whereas MinMaxScaler has no bounds",
      "MinMaxScaler bounds data into a hard closed interval [0, 1] but is heavily squashed by outliers; StandardScaler has an unbounded range (-inf, +inf) and does not compress normal observations into an infinitesimal sliver",
      "StandardScaler only works on integers",
      "MinMaxScaler removes all correlation between features"
    ],
    correctIndex: 1,
    explanation: "MinMaxScaler maps data into a fixed box [0, 1]. A single extreme outlier forces 99% of normal data into [0.0, 0.05]. StandardScaler has no bounded interval; normal observations comfortably occupy [-3.0, +3.0], while extreme outliers appear as values |z| > 3.0 without squandering the dynamic resolution of regular samples.",
    practicalTip: "Choose StandardScaler over MinMaxScaler when features are unbounded and follow approximately bell-shaped or moderately skewed distributions.",
    codeSnippet: "# Inspecting spread differences\nprint('MinMax Range:', X_minmax.min(), X_minmax.max()) # Strictly [0, 1]\nprint('Standard Range:', X_std.min(), X_std.max())     # e.g. [-2.4, +4.8]",
    examRelevance: "StandardScaler vs MinMaxScaler Architectural Trade-Offs"
  },
  {
    id: 4,
    tier: "Tier 1: Foundation & Terminology",
    question: "In statistical theory, what is the breakdown point of the sample mean (mu) and sample standard deviation (sigma) used in StandardScaler?",
    options: [
      "50% breakdown point",
      "0% breakdown point: a single corrupted extreme outlier (x -> infinity) can pull the mean to infinity and inflate the standard deviation arbitrarily",
      "100% breakdown point",
      "25% breakdown point"
    ],
    correctIndex: 1,
    explanation: "The breakdown point measures the proportion of arbitrarily corrupted observations an estimator can handle before yielding aberrant results. Because sample mean sums all points and sample variance squares deviations, a single massive outlier can drag mu and inflate sigma arbitrarily, giving both a 0% breakdown point.",
    practicalTip: "If your training data contains severe unhandled outliers (e.g. data entry errors or fraud spikes), StandardScaler parameters will break down.",
    codeSnippet: "# Demonstrating 0% breakdown in numpy\nx = np.array([1, 2, 3, 4, 1000000])\nprint('Inflated StDev:', np.std(x)) # Huge inflation from 1 point!",
    examRelevance: "Robust Statistics & Breakdown Point Theory"
  },
  {
    id: 5,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the mathematical formulation of RobustScaler, and why does it achieve a 50% breakdown point?",
    options: [
      "x_robust = (x - mean) / variance",
      "x_robust = (x - Median) / IQR, where Median is the 50th percentile (Q2) and IQR is the Interquartile Range (Q3 - Q1)",
      "x_robust = (x - x_min) / (x_max - x_min)",
      "x_robust = x / max(|x|)"
    ],
    correctIndex: 1,
    explanation: "RobustScaler centers data by subtracting the sample Median (Q2) and scales by dividing by the Interquartile Range IQR = Q3 - Q1. Because the median and quartiles depend on rank ordering rather than arithmetic sums, up to 50% of the dataset can be arbitrarily corrupted before the median breaks down.",
    practicalTip: "In financial risk and manufacturing quality assurance with heavy-tailed defect spikes, always choose RobustScaler over StandardScaler.",
    codeSnippet: "from sklearn.preprocessing import RobustScaler\nrob_scaler = RobustScaler()\nX_robust = rob_scaler.fit_transform(X_polluted)",
    examRelevance: "MAKAUT Viva Voce & Robust Scaling Mechanics"
  },
  {
    id: 6,
    tier: "Tier 1: Foundation & Terminology",
    question: "Does applying classical Z-score standardization to a heavily skewed, multi-modal feature transform it into a Gaussian normal distribution?",
    options: [
      "Yes, the Central Limit Theorem forces standardized data to become normal",
      "No, standardization is a linear affine transformation (z = a*x + b) which preserves the exact relative spacing, histogram shape, skewness (g1), and kurtosis (g2)",
      "Yes, but only if the sample size is greater than 30",
      "Yes, it converts multi-modal distributions into unimodal bells"
    ],
    correctIndex: 1,
    explanation: "Standardization is strictly linear: z = (1/sigma)*x - (mu/sigma). Linear affine mappings shift the origin and rescale the axes, but leave the shape of the probability density function completely unchanged. The Fisher-Pearson skewness and excess kurtosis of z are bitwise identical to raw x. To normalize shapes, non-linear power transformations (Box-Cox, Yeo-Johnson) are required.",
    practicalTip: "A common beginner misconception is believing StandardScaler makes data normal. Always check skewness before relying on Gaussian assumptions.",
    codeSnippet: "# Verifying skewness invariance in scipy\nfrom scipy.stats import skew\nassert np.isclose(skew(raw_x), skew(std_x))",
    examRelevance: "Linear Transformations & Distribution Shape Invariance"
  },
  {
    id: 7,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why is feature standardization considered mandatory before fitting regularized linear models like Ridge (L2) and Lasso (L1)?",
    options: [
      "Because regularized models cannot calculate matrix determinants on unscaled data",
      "Because regularizers apply a uniform penalty lambda * sum(w_j^2) or lambda * sum(|w_j|) to all weights; unstandardized features have weights inversely proportional to their units, causing unfair shrinkage of small-scale feature weights",
      "Because regularization turns all weights into negative numbers",
      "Because Lasso regression will delete all features unless standardized"
    ],
    correctIndex: 1,
    explanation: "In regularized regression, the penalty term lambda * ||w|| treats all coefficients identically. A feature measured in small units (e.g. debt ratio 0.1–0.7) naturally requires a large weight (e.g. 50.0), while a feature in rupees requires a tiny weight (0.0001). Unstandardized regularization penalizes the small-scale feature 25,000,000 times harder, unfairly suppressing it.",
    practicalTip: "Always standardize continuous features before fitting Ridge, Lasso, or ElasticNet models.",
    codeSnippet: "from sklearn.linear_model import Ridge\nfrom sklearn.pipeline import make_pipeline\nmodel = make_pipeline(StandardScaler(), Ridge(alpha=1.0))",
    examRelevance: "Regularization Theory & Penalty Uniformity"
  },
  {
    id: 8,
    tier: "Tier 1: Foundation & Terminology",
    question: "How does feature standardization enable direct effect-size comparison of linear regression coefficients beta_j?",
    options: [
      "It converts all regression coefficients to integers between 0 and 10",
      "Because all features share identical unit variance (sigma = 1.0), each standardized coefficient beta_j directly represents the expected change in the target variable per 1-standard-deviation change in feature x_j",
      "It sets all regression coefficients to be equal to 1.0",
      "It eliminates the need to calculate p-values"
    ],
    correctIndex: 1,
    explanation: "In unstandardized regression, beta_j depends on arbitrary units (e.g. Rupees vs Years). Standardizing continuous features expresses all variables in common units of standard deviations. Thus, a coefficient of beta_1 = 0.42 exerts exactly twice the standardized predictive effect of beta_2 = 0.21, allowing direct ranking of feature importance for stakeholders and regulators.",
    practicalTip: "In banking and credit underwriting (RBI compliance), standardized coefficients are required to legally explain risk drivers.",
    codeSnippet: "# Ranking feature importance via standardized coefficients\nimportance = pd.Series(model.named_steps['ridge'].coef_, index=feature_names)\nprint(importance.sort_values(ascending=False))",
    examRelevance: "Model Interpretability & Standardized Effect Sizes"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & FORMULAS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Using the formal definitions of expectation and variance, mathematically prove why E[z] = 0 and Var(z) = 1 for the standardized variable z = (x - mu) / sigma.",
    options: [
      "By Euler's identity: exp(i * pi) + 1 = 0",
      "E[z] = (E[x] - mu)/sigma = (mu - mu)/sigma = 0; Var(z) = Var((x - mu)/sigma) = (1/sigma^2)*Var(x) = sigma^2/sigma^2 = 1.0",
      "By Taylor series expansion around x = 0",
      "By the Law of Large Numbers for infinite samples"
    ],
    correctIndex: 1,
    explanation: "Expectation is a linear operator: E[a*X + b] = a*E[X] + b. Here a = 1/sigma and b = -mu/sigma, so E[z] = (1/sigma)*mu - mu/sigma = 0. Variance satisfies Var(a*X + b) = a^2 * Var(X). Here a^2 = 1/sigma^2, so Var(z) = (1/sigma^2) * sigma^2 = 1.0. This holds strictly for any distribution with finite second moments.",
    practicalTip: "This analytical proof is a frequent MAKAUT semester exam question for subject code BCAC701B.",
    codeSnippet: "# Mathematical verification\nz = (x - np.mean(x)) / np.std(x)\nprint('Mean of z:', round(np.mean(z), 10)) # 0.0\nprint('Var of z:', round(np.var(z), 10))   # 1.0",
    examRelevance: "MAKAUT BCAC701B Analytical Proofs & Mathematical Statistics"
  },
  {
    id: 10,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In Python's scikit-learn library, why does StandardScaler compute population standard deviation (ddof=0) rather than sample standard deviation with Bessel's correction (ddof=1)?",
    options: [
      "Because Bessel's correction requires complex eigenvalues",
      "For computational consistency across training and testing: dividing by N preserves exact vector norm properties during partial_fit streaming updates, though the difference is negligible for large N",
      "Because sample standard deviation produces negative numbers",
      "Because scikit-learn only supports numpy arrays with zero degrees of freedom"
    ],
    correctIndex: 1,
    explanation: "StandardScaler uses ddof=0: sigma = sqrt((1/N) * sum (x_i - mu)^2). In machine learning, scaling is treated as an algebraic affine projection rather than a hypothesis test. Using population variance simplifies streaming updates (partial_fit) and preserves exact matrix norm identities. For typical datasets (N > 100), the difference sqrt(N/(N-1)) is less than 0.5%.",
    practicalTip: "If you need exact sample standard deviation (ddof=1) to match R or SAS outputs, use scipy.stats.zscore(x, ddof=1).",
    codeSnippet: "import scipy.stats as stats\nz_sample = stats.zscore(x, ddof=1) # Bessel's correction (N-1)\nz_sklearn = StandardScaler().fit_transform(x.reshape(-1, 1)) # (N)",
    examRelevance: "Degrees of Freedom & Bessel's Correction Mechanics"
  },
  {
    id: 11,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Prove why performing Principal Component Analysis (PCA) on standardized features is mathematically identical to diagonalizing the Pearson Correlation Matrix R.",
    options: [
      "Because the eigenvalues of the correlation matrix are always equal to 1.0",
      "Standardizing data is Z = X * D^(-1) where D = diag(sigma). The covariance of standardized data is Sigma_Z = (1/n) * Z^T Z = D^(-1) [(1/n) X^T X] D^(-1) = D^(-1) Sigma D^(-1) = R",
      "Because PCA automatically removes all negative eigenvalues",
      "Because correlation matrices cannot be inverted"
    ],
    correctIndex: 1,
    explanation: "Let X be centered data. Its covariance is Sigma = (1/n) * X^T X. Standardized data is Z = X * D^(-1), where D is the diagonal matrix of standard deviations. The covariance of Z is (1/n) * Z^T Z = D^(-1) * Sigma * D^(-1). By definition, dividing each covariance element Sigma_ij by sigma_i * sigma_j yields the Pearson correlation coefficient r_ij. Thus, Sigma_Z = R.",
    practicalTip: "When using PCA in scikit-learn, always pipeline StandardScaler() before PCA(n_components=k) to ensure you are decomposing the correlation matrix.",
    codeSnippet: "# PCA on correlation matrix equivalence\nR = np.corrcoef(X.T)\neigvals_R, _ = np.linalg.eigh(R)\n\nX_std = StandardScaler().fit_transform(X)\ncov_std = np.cov(X_std.T, ddof=0)\neigvals_std, _ = np.linalg.eigh(cov_std)\nnp.testing.assert_almost_equal(eigvals_R, eigvals_std)",
    examRelevance: "PCA on Covariance vs Correlation Matrix Proof"
  },
  {
    id: 12,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "What is Covariance Whitening (Sphericization), and what does the covariance matrix Cov(Z_white) equal after whitening?",
    options: [
      "Cov(Z_white) equals a diagonal matrix of eigenvalues Lambda",
      "Cov(Z_white) equals the Identity Matrix I_d, meaning all features have unit variance and zero mutual cross-correlation",
      "Cov(Z_white) equals the zero matrix",
      "Cov(Z_white) equals the original raw covariance matrix Sigma"
    ],
    correctIndex: 1,
    explanation: "Covariance Whitening transforms centered data X via Z_white = Sigma^(-1/2) * X. Its covariance is Cov(Z_white) = Sigma^(-1/2) * Sigma * Sigma^(-1/2) = I_d. Whitened data is completely de-correlated (Cov(z_i, z_j) = 0 for all i != j) and isotropic (Var(z_i) = 1.0), transforming elliptical multivariate densities into perfect hyperspheres.",
    practicalTip: "PCA Whitening is widely used in signal processing, image preprocessing, and KMRC sensor de-coupling.",
    codeSnippet: "# PCA Whitening in Python\neigvals, V = np.linalg.eigh(np.cov(X.T))\nX_white = (X - X.mean(axis=0)) @ V @ np.diag(1.0 / np.sqrt(eigvals + 1e-5))\nprint('Whitened Covariance:\\n', np.round(np.cov(X_white.T), 2)) # Identity I!",
    examRelevance: "Covariance Whitening & Sphericization Formulations"
  },
  {
    id: 13,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Under the classical 68-95-99.7 empirical rule for a standard Gaussian distribution N(0, 1), what percentage of standardized observations lie OUTSIDE the bounds [-3.0, +3.0]?",
    options: [
      "5.00%",
      "0.27% (The extreme two-tailed probability)",
      "31.73%",
      "0.00%"
    ],
    correctIndex: 1,
    explanation: "Under a true Gaussian distribution N(0, 1), exactly 68.27% of values lie within [-1, +1], 95.45% within [-2, +2], and 99.73% within [-3, +3]. The remaining 100% - 99.73% = 0.27% lie in the extreme tails (|z| >= 3.0), providing the theoretical justification for the 3-sigma outlier heuristic.",
    practicalTip: "Remember that the 0.27% guarantee holds only when the underlying data is truly Gaussian. For heavy-tailed distributions, far more data will fall outside 3 sigma.",
    codeSnippet: "import scipy.stats as stats\ntail_prob = 2 * (1 - stats.norm.cdf(3.0)) # 0.0026998 (0.27%)",
    examRelevance: "Empirical Gaussian Bounds & 3-Sigma Rules"
  },
  {
    id: 14,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "What is the mathematical consequence of attempting to standardize a constant feature column where all observations are identical (e.g. status = 1 for all samples)?",
    options: [
      "StandardScaler automatically converts the column into random noise",
      "Because x_i = mu for all i, the standard deviation sigma is exactly 0.0; computing (x - mu) / sigma results in division by zero (0 / 0), producing NaNs or runtime crashes",
      "The standardized values become 1.0",
      "The matrix becomes complex-valued"
    ],
    correctIndex: 1,
    explanation: "When a feature has zero variance, sigma = 0. The standardized formula (x - mu)/sigma evaluates to 0/0 (indeterminate form), resulting in NaN in floating-point math. Scikit-learn's StandardScaler defensively outputs 0.0 when sigma == 0, but custom code will throw a ZeroDivisionError.",
    practicalTip: "Always run VarianceThreshold(threshold=0.0) before scaling to filter out constant columns.",
    codeSnippet: "from sklearn.feature_selection import VarianceThreshold\nselector = VarianceThreshold(threshold=0.0)\nX_clean = selector.fit_transform(X_raw)",
    examRelevance: "Zero-Variance Edge Cases & Defensive Architecture"
  },
  {
    id: 15,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "How does classical Z-score standardization affect the Pearson correlation coefficient r_xy between two continuous variables X and Y?",
    options: [
      "It reduces r_xy to zero by removing all correlation",
      "It leaves r_xy 100% unchanged, because Pearson correlation is strictly invariant under positive linear affine transformations",
      "It squares r_xy",
      "It multiplies r_xy by sigma_x * sigma_y"
    ],
    correctIndex: 1,
    explanation: "Pearson correlation r_xy = Cov(X, Y) / (sigma_X * sigma_Y). Standardization applies linear affine transformations Z_X = a*X + b and Z_Y = c*Y + d with positive scaling constants a = 1/sigma_X and c = 1/sigma_Y. Cov(Z_X, Z_Y) = a * c * Cov(X, Y) = Cov(X, Y)/(sigma_X * sigma_Y) = r_xy, and sigma_ZX = sigma_ZY = 1.0. Thus, r_zx_zy = r_xy.",
    practicalTip: "Standardizing features never alters bivariate linear correlations.",
    codeSnippet: "# Verifying correlation invariance\nr_raw = np.corrcoef(x, y)[0, 1]\nr_std = np.corrcoef(stats.zscore(x), stats.zscore(y))[0, 1]\nnp.testing.assert_almost_equal(r_raw, r_std)",
    examRelevance: "Correlation Matrix Invariance & Affine Transformations"
  },
  {
    id: 16,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In RobustScaler, if a feature distribution is perfectly Gaussian N(mu, sigma^2), how does the Interquartile Range (IQR) relate mathematically to the standard deviation sigma?",
    options: [
      "IQR = sigma",
      "IQR = 2 * z_{0.75} * sigma approx 1.349 * sigma",
      "IQR = 3 * sigma",
      "IQR = 0.5 * sigma"
    ],
    correctIndex: 1,
    explanation: "For a standard normal distribution, the 75th percentile is z_0.75 approx 0.6745 and the 25th percentile is z_0.25 approx -0.6745. The Interquartile Range is IQR = (0.6745 - (-0.6745)) * sigma = 2 * 0.6745 * sigma approx 1.34898 * sigma. Therefore, dividing IQR by 1.349 produces an unbiased estimate of Gaussian standard deviation.",
    practicalTip: "In scikit-learn, RobustScaler(unit_variance=True) scales by IQR / 1.349 so that the transformed variable has unit variance on Gaussian data.",
    codeSnippet: "from sklearn.preprocessing import RobustScaler\n# Scale such that Gaussian data achieves variance ≈ 1.0\nrob_unit = RobustScaler(unit_variance=True)\nX_rob_unit = rob_unit.fit_transform(X)",
    examRelevance: "Gaussian Quantile Relations & Robust Normalization"
  },

  // =========================================================================
  // TIER 3: ALGORITHM ARCHITECTURE & DESIGN (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "What fatal memory disaster occurs when StandardScaler(with_mean=True) is applied to a scipy CSR sparse matrix (e.g. TF-IDF text features), and how is it resolved?",
    options: [
      "The computer screen flickers and restarts",
      "Subtracting the non-zero mean mu from every element converts all implicit zero coordinates into non-zero floats (-mu), turning a 50MB sparse matrix into a 32GB dense array and crashing RAM; resolved by setting with_mean=False or using MaxAbsScaler",
      "StandardScaler converts text into numbers that cannot be indexed",
      "Sparse matrices cannot be multiplied by floating points"
    ],
    correctIndex: 1,
    explanation: "Sparse CSR matrices store only non-zero coordinates to save gigabytes of memory. Centering data (with_mean=True) subtracts the column mean mu from every entry. Since mu is almost never zero, all millions of implicit zeros become non-zero values (-mu), destroying the sparse structure and expanding a 50MB matrix into a 32GB dense array that crashes production servers. Setting with_mean=False scales variance without centering, preserving sparsity.",
    practicalTip: "Scikit-learn will explicitly raise a ValueError if with_mean=True is passed on a sparse matrix. Always configure StandardScaler(with_mean=False) for sparse inputs.",
    codeSnippet: "# Safe sparse standardization\nfrom sklearn.preprocessing import StandardScaler\nsparse_scaler = StandardScaler(with_mean=False)\nX_sparse_std = sparse_scaler.fit_transform(X_sparse)",
    examRelevance: "Sparse CSR Matrix Memory Optimization"
  },
  {
    id: 18,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "In KMRC tunnel boring machine sensor telemetry, hydraulic pressure (bar) and motor vibration (Hz) have a correlation of r = 0.999. Why did univariate StandardScaler fail to help anomaly detection, requiring Covariance Whitening?",
    options: [
      "StandardScaler cannot process sensor telemetry",
      "Univariate StandardScaler standardized individual variances to 1.0, but left the 0.999 correlation completely intact, meaning the bivariate distribution remained a thin diagonal knife-edge; Covariance Whitening eliminated cross-correlation to yield an isotropic spherical identity matrix",
      "StandardScaler made all sensor readings negative",
      "Because KMRC tunnels operate underground where gravity is different"
    ],
    correctIndex: 1,
    explanation: "StandardScaler operates independently on each column. It scales each feature to unit variance, but does not alter the correlation structure (r remains 0.999). Anomaly detection algorithms searching for unexpected differential stress (pressure high but vibration low) fail because the normal density is an extremely narrow diagonal ellipse. Covariance Whitening rotates and sphericizes the space so anomalies stand out in all directions.",
    practicalTip: "When features are strongly collinear, univariate scaling is insufficient; deploy PCA or Whitening.",
    codeSnippet: "# Univariate vs Whitened correlation\nprint('Std correlation:', np.corrcoef(X_std.T)[0, 1])     # Still 0.999!\nprint('White correlation:', np.corrcoef(X_white.T)[0, 1]) # 0.000 (De-coupled!)",
    examRelevance: "Multivariate Sensor Telemetry & Anomaly Detection"
  },
  {
    id: 19,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "In Asansol steel rolling mills, structural hardness tests contain extreme localized slag inclusion defects (up to 850 HV vs normal 200 HV). Why did switching from StandardScaler to RobustScaler save the defect classification pipeline?",
    options: [
      "Because RobustScaler runs on GPUs while StandardScaler runs on CPUs",
      "StandardScaler's mean was dragged to 266 HV and standard deviation inflated 15x, compressing normal batch variations and blinding the model to regular grade differences; RobustScaler's median and IQR remained unaffected by the 850 HV defect",
      "RobustScaler converts hardness into temperature",
      "StandardScaler only works on carbon steel"
    ],
    correctIndex: 1,
    explanation: "Because sample variance squares deviations, the single 850 HV defect inflated the standard deviation by 15x. When normal samples (e.g. 182 HV) were standardized using this inflated sigma, their Z-scores collapsed into a tiny clump near 0, hiding real metallurgical differences. RobustScaler used the median (203.5 HV) and IQR (20.2 HV), keeping normal samples properly separated.",
    practicalTip: "Whenever your training dataset contains heavy tails or industrial defect anomalies, always baseline with RobustScaler.",
    codeSnippet: "from sklearn.preprocessing import RobustScaler\nrob = RobustScaler()\nX_clean_scaled = rob.fit_transform(hardness_data)",
    examRelevance: "Industrial Quality Assurance & Outlier-Resilient Pipelines"
  },
  {
    id: 20,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "What is the critical rule regarding the estimation of StandardScaler parameters (mu, sigma) during K-Fold Cross-Validation to prevent data leakage?",
    options: [
      "Fit mu and sigma on the combined training and test sets simultaneously",
      "Fit mu and sigma strictly on the training fold (X_train_fold), and use those exact frozen parameters to transform the validation fold (X_val_fold)",
      "Re-estimate mu and sigma independently on the validation fold",
      "Use mu = 0 and sigma = 1 without estimating parameters"
    ],
    correctIndex: 1,
    explanation: "If you standardize the entire dataset before cross-validation, the calculated mean and standard deviation incorporate information from the test/validation fold. This leaks distribution parameters into the training pipeline, artificially inflating validation accuracy. You must fit the scaler strictly on the training fold.",
    practicalTip: "Use scikit-learn's Pipeline inside cross_val_score to ensure leak-free cross-validation.",
    codeSnippet: "from sklearn.pipeline import Pipeline\npipe = Pipeline([('scaler', StandardScaler()), ('model', Ridge())])\nscores = cross_val_score(pipe, X, y, cv=5) # 100% leak-free!",
    examRelevance: "Cross-Validation Protocols & Data Leakage Prevention"
  },
  {
    id: 21,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why does training Support Vector Machines (SVM) with RBF kernels require feature standardization?",
    options: [
      "Because SVMs cannot compute dual Lagrange multipliers on unstandardized data",
      "Because the RBF kernel evaluates exp(-gamma * ||x - x'||^2); if features have large unstandardized scales, squared Euclidean distance is huge, saturating the kernel to 0.0 and destroying non-linear decision boundaries",
      "Because SVM requires all features to be integers",
      "Because support vectors must have length equal to 1.0"
    ],
    correctIndex: 1,
    explanation: "The Gaussian RBF kernel K(x, x') = exp(-gamma * ||x - x'||^2) depends on Euclidean distance. If features have wide spreads (e.g. income in thousands), ||x - x'||^2 becomes gigantic, forcing exp(-large) to saturate to 0.0 for all distinct pairs. The kernel Gram matrix becomes an identity matrix, making every point appear isolated and destroying the SVM margin.",
    practicalTip: "Always pipeline StandardScaler with SVC(kernel='rbf').",
    codeSnippet: "from sklearn.svm import SVC\nsvm_pipe = make_pipeline(StandardScaler(), SVC(kernel='rbf'))",
    examRelevance: "Support Vector Machines & Kernel De-Saturation"
  },
  {
    id: 22,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why should binary one-hot encoded indicator columns (values strictly 0 and 1) generally NOT be standardized with StandardScaler?",
    options: [
      "Because standardizing binary variables transforms {0, 1} into arbitrary floating points (e.g. -0.38 and +2.12), destroying categorical interpretability and turning sparse matrices dense",
      "Because StandardScaler crashes when given binary numbers",
      "Because binary columns cannot be centered",
      "Because one-hot encoding requires complex numbers"
    ],
    correctIndex: 0,
    explanation: "Binary indicators have a natural bounded meaning: 0 = absent, 1 = present. Standardizing them centers them to -p/sqrt(p*(1-p)) and (1-p)/sqrt(p*(1-p)), destroying their binary interpretability and converting sparse matrices to dense arrays. ColumnTransformer should be used to standardize continuous columns while passing binary columns through unchanged.",
    practicalTip: "Use ColumnTransformer(transformers=[('num', StandardScaler(), continuous_cols)], remainder='passthrough').",
    codeSnippet: "from sklearn.compose import ColumnTransformer\npreprocessor = ColumnTransformer([\n    ('num', StandardScaler(), ['age', 'income']),\n    ('cat', 'passthrough', ['is_kolkata', 'is_rural'])\n])",
    examRelevance: "Mixed-Type Preprocessing & ColumnTransformer Architecture"
  },
  {
    id: 23,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "When a regression model is trained on a standardized target variable y_std = (y - mu_y) / sigma_y, what essential step must be executed before reporting Mean Absolute Error (MAE) to business stakeholders?",
    options: [
      "Multiply MAE by 100 to make it a percentage",
      "Invert predictions back to native physical units (e.g. Rupees or Liters) using y_native = y_pred_std * sigma_y + mu_y before computing final business metrics",
      "Square the predictions to eliminate negative values",
      "Discard the predictions because target standardization is irreversible"
    ],
    correctIndex: 1,
    explanation: "Business stakeholders cannot evaluate model quality based on standardized errors like 'MAE = 0.35'. Predictions must be converted back to native physical units (e.g. ₹35,000) using inverse transformation y = y_std * sigma_y + mu_y so that evaluation metrics reflect real-world business performance.",
    practicalTip: "Scikit-learn's TransformedTargetRegressor automatically handles target scaling and inverse transformation during predict().",
    codeSnippet: "from sklearn.compose import TransformedTargetRegressor\nregr = TransformedTargetRegressor(regressor=Ridge(), transformer=StandardScaler())\nregr.fit(X, y)\ny_pred = regr.predict(X_test) # Automatically in native units!",
    examRelevance: "Target Standardization & Inverse Transform Protocols"
  },
  {
    id: 24,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "In deep learning, why does standardizing input features accelerate backpropagation convergence across multiple hidden layers?",
    options: [
      "It eliminates the need to compute cross-entropy loss",
      "It ensures that layer inputs match the mathematical variance assumptions (Var(X) approx 1.0) of Xavier and He weight initializers, keeping activations and gradients in non-saturating active zones throughout deep networks",
      "It forces all weights in the hidden layers to be equal to zero",
      "It compiles the neural network to binary assembly"
    ],
    correctIndex: 1,
    explanation: "Modern weight initializers (Xavier/Glorot and He/Kaiming) set initial weight variances Var(W) = 2/(n_in + n_out) under the explicit theoretical assumption that inputs have Var(X) = 1.0. This guarantees that variance propagates stably from layer to layer without exploding or vanishing. Unstandardized inputs blow past activation bounds and freeze backpropagation.",
    practicalTip: "Standardizing inputs combined with Batch Normalization inside hidden layers provides the optimal gradient flow in deep neural networks.",
    codeSnippet: "# Variance propagation in neural networks\n# Var(Z_layer) = n_in * Var(W) * Var(X) = n_in * (2/n_in) * 1.0 = 2.0 (Stable!)",
    examRelevance: "Deep Learning Initialization & Variance Propagation"
  },

  // =========================================================================
  // TIER 4: PRODUCTION DIAGNOSTICS & SCALABILITY (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In streaming real-time applications where data arrives continuously one sample at a time, how should StandardScaler be updated without retraining on historical batches?",
    options: [
      "Re-train the scaler from scratch on all historical gigabytes every 5 seconds",
      "Use StandardScaler.partial_fit(batch), which incrementally updates the running mean and variance using Welford's algorithm without storing historical observations",
      "Keep standard deviation constant and update only the mean",
      "Streaming systems cannot standardize data"
    ],
    correctIndex: 1,
    explanation: "Scikit-learn's StandardScaler implements partial_fit(), which uses online parallel moment updates (Chan, Golub, and LeVeque / Welford algorithm) to update running sample counts, means, and sum of squared deviations incrementally. This allows microservices to adapt to streaming telemetry without storing past data.",
    practicalTip: "In high-throughput streaming systems, use partial_fit() on incoming micro-batches to update running statistics smoothly.",
    codeSnippet: "inc_scaler = StandardScaler()\nfor micro_batch in stream:\n    inc_scaler.partial_fit(micro_batch)\n    X_stream_scaled = inc_scaler.transform(micro_batch)",
    examRelevance: "Streaming Systems & Online Moment Estimation"
  },
  {
    id: 26,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "When serializing a Scikit-Learn StandardScaler using joblib or ONNX for production microservice serving, which internal attributes must be stored to allow deterministic inference on live single-record requests?",
    options: [
      "Only the final model weights",
      "The fitted attributes: mean_ and scale_ (standard deviation)",
      "The entire historical training dataset raw text records",
      "The operating system version"
    ],
    correctIndex: 1,
    explanation: "StandardScaler is stateful. To transform a single incoming JSON record [x] via z = (x - mean_) / scale_, the microservice requires the fitted mean_ and scale_ vectors. Serializing the entire fitted Pipeline object ensures these parameters are preserved perfectly.",
    practicalTip: "Always verify fitted scaler attributes with print(scaler.mean_, scaler.scale_) before packaging model artifacts.",
    codeSnippet: "import joblib\n# Serialize full pipeline including fitted scaler\njoblib.dump(full_pipeline, 'credit_risk_v1.joblib')\n# In microservice:\nloaded = joblib.load('credit_risk_v1.joblib')\npred = loaded.predict(new_request)",
    examRelevance: "MLOps Pipeline Serialization & Microservice Serving"
  },
  {
    id: 27,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "When explaining model decisions to non-technical stakeholders (e.g. loan underwriters in Salt Lake Sector V) using SHAP waterfall plots, what critical step must be taken if features were scaled using StandardScaler?",
    options: [
      "Tell the underwriters to multiply all features by the scaling factor in their heads",
      "Pass the raw unstandardized feature values into the SHAP explanation visualizer (or call scaler.inverse_transform()) so that feature contributions are displayed in native units (e.g. 'Annual Income = ₹4,50,000') rather than Z-scores like '-0.42'",
      "Re-train an unscaled model specifically for generating explanations",
      "Convert all numbers into percentages"
    ],
    correctIndex: 1,
    explanation: "Regulators and business auditors cannot make legal credit decisions based on Z-scores like 'Applicant Income = -0.42'. Production explainability systems must map scaled feature coordinates back to native domain units (₹4,50,000) using inverse_transform while computing SHAP attributions.",
    practicalTip: "In SHAP waterfall plots, pass display_features=X_raw_df to display human-readable native feature values alongside attribution bars.",
    codeSnippet: "import shap\nexplainer = shap.Explainer(model, X_train_scaled)\nshap_values = explainer(X_test_scaled)\nshap.plots.waterfall(shap_values[0], display_features=X_test_raw.iloc[0])",
    examRelevance: "Explainable AI (XAI) & Regulatory Governance"
  },
  {
    id: 28,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In an Asansol steel plant, a faulty pyrometer sensor sends an extreme reading of 9999.0°C due to an electrical short circuit. If StandardScaler is re-fitted on this batch, what is the observable production symptom on normal steel batches?",
    options: [
      "The scaler crashes with an HTTP 500 error",
      "The single 9999°C reading massively inflates the sample standard deviation, shrinking the Z-scores of all normal batches (e.g. 1200°C–1300°C) toward zero, causing downstream quality classifiers to falsely approve defective batches",
      "The sensor restarts automatically",
      "All normal batches become negative"
    ],
    correctIndex: 1,
    explanation: "This is the classic 'outlier masking pathology'. Because standard deviation squares deviations, the 9999°C reading inflates sigma by 20x. When normal batches are transformed with this inflated sigma, their Z-score spread shrinks into [-0.1, +0.1]. Defect classifiers that flag anomalies at |z| > 2.5 are blinded, allowing defective steel to slip through unnoticed.",
    practicalTip: "Use RobustScaler or freeze baseline training parameters to protect against sensor blowout anomalies.",
    codeSnippet: "# Demonstrating outlier masking\nz_polluted = (normal_batches - mean_polluted) / std_polluted\nprint('Max normal Z-score:', np.max(np.abs(z_polluted))) # Squeezed below 0.1!",
    examRelevance: "Sensor Failure Modes & Outlier Masking in Production"
  },
  {
    id: 29,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "A multi-tenant SaaS ML platform serves clients in Kolkata (operating in INR) and London (operating in GBP). If both tenants submit revenue figures to a shared global regression model, what will happen if currency scaling is ignored?",
    options: [
      "The model will automatically query currency exchange rates via foreign exchange APIs",
      "The model will perceive INR revenues (e.g. 10,00,000) as being 100,000 times larger than GBP revenues (e.g. 10,000), making completely invalid cross-tenant predictions",
      "The weights will become imaginary numbers",
      "The database will refuse to store GBP currency symbols"
    ],
    correctIndex: 1,
    explanation: "Machine learning models have zero intrinsic understanding of economic purchasing power or currency exchange rates—they only see raw scalar numbers. Without normalizing revenues into a single standard base currency (e.g. USD) and subsequently standardizing, the model's predictions for foreign currency tenants will be completely corrupted.",
    practicalTip: "Always normalize currency, imperial/metric distance, and temperature units into a canonical baseline before applying standard statistical scalers.",
    codeSnippet: "# Canonical currency conversion before statistical scaling\ndf['revenue_usd'] = df.apply(lambda r: r['revenue'] * fx_rates[r['currency']], axis=1)\nX_scaled = StandardScaler().fit_transform(df[['revenue_usd']])",
    examRelevance: "Multi-Tenant Data Architecture & Currency Normalization"
  },
  {
    id: 30,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "A data pipeline in WBSEDCL processes telemetry streams from 1,000 solar substations. A faulty sensor sends a constant voltage reading of 240.0V for 24 hours. What will occur if a custom naive standardization function without zero-division guards is applied to this feature?",
    options: [
      "The function automatically resets the voltage to 0",
      "Because all values are identical, standard deviation sigma is zero; computing (x - mu) / sigma results in division by zero, filling the column with NaNs or throwing ZeroDivisionError, crashing production inference services",
      "The function prints a warning and continues safely",
      "The sensor restarts automatically"
    ],
    correctIndex: 1,
    explanation: "Zero-variance features produce sigma = 0. A naive custom implementation (x - mu)/sigma will raise a ZeroDivisionError in Python or produce an array of NaNs/Infs in NumPy, crashing production inference services. Production pipelines must include defensive assertions or VarianceThreshold filters.",
    practicalTip: "Use scikit-learn's FeatureUnion with VarianceThreshold(threshold=0.0) prior to scaling to drop zero-variance sensor columns automatically.",
    codeSnippet: "from sklearn.feature_selection import VarianceThreshold\n# Drop constant columns before scaling\nselector = VarianceThreshold(threshold=0.0)\nX_filtered = selector.fit_transform(X_sensors)",
    examRelevance: "Sensor Stream Fault Tolerance & Zero-Variance Handling"
  }
];

export default questions;
