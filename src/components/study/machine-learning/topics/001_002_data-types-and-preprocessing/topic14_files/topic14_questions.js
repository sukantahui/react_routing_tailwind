/**
 * TOPIC 14: DATA TRANSFORMATION (MATHEMATICAL TRANSFORMS & DISCRETIZATION)
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
    question: "What is the primary motivation for applying mathematical transformations (such as Log or Box-Cox) to features prior to fitting parametric models?",
    options: [
      "To artificially increase the number of training samples available to the model",
      "To satisfy distributional assumptions like normality, stabilize variance (homoscedasticity), and linearize relationships",
      "To convert continuous floating-point numbers into discrete categorical string labels",
      "To guarantee 100% test accuracy regardless of underlying model architecture"
    ],
    correctIndex: 1,
    explanation: "Parametric models like Ordinary Least Squares (OLS) Linear Regression, Gaussian Naive Bayes, and Linear Discriminant Analysis assume normality of errors and constant error variance across predictor levels (homoscedasticity). Transforming skewed features pulls in elongated tails, stabilizes residual variance, and produces linear relationships with target variables.",
    practicalTip: "Before applying complex non-linear models, always inspect feature distributions. Frequently, a simple log or Box-Cox transform turns a poorly performing linear model into a competitive production system.",
    codeSnippet: "# Checking skewness of a feature in pandas\nskewness = df['income'].skew()\nprint(f'Feature Skewness: {skewness:.3f}')",
    examRelevance: "MAKAUT BCAC701B Core Preprocessing Concepts"
  },
  {
    id: 2,
    tier: "Tier 1: Foundation & Terminology",
    question: "A feature displaying a long right tail where Mean > Median > Mode is formally classified as having:",
    options: [
      "Negative (Left) Skewness",
      "Positive (Right) Skewness",
      "Symmetric Mesokurtic Distribution",
      "Platykurtic Uniform Distribution"
    ],
    correctIndex: 1,
    explanation: "When extreme high values pull the arithmetic mean to the right while the majority of data points remain clustered at lower values, the distribution exhibits positive (right) skewness (Fisher-Pearson skewness g1 > 0). Examples include annual personal incomes, real estate valuations, and hospital stay durations.",
    practicalTip: "On right-skewed data, standard deviation is heavily inflated by the upper tail. Classical Z-scores fail to flag lower outliers because the mean is shifted rightward.",
    codeSnippet: "# Visualizing skewness\nimport scipy.stats as stats\ns = stats.skew(df['salary'])\nprint('Skewness coefficient:', s)",
    examRelevance: "Descriptive Statistics & University Midterm Essentials"
  },
  {
    id: 3,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why is the Log1p transform, y = ln(1 + x), preferred over the standard natural log transform, y = ln(x), in real-world ML pipelines?",
    options: [
      "Log1p runs 10 times faster than natural logarithm on GPUs",
      "Standard natural log ln(x) produces a fatal math domain error (undefined / -infinity) when x = 0, whereas ln(1 + 0) = 0",
      "Log1p automatically handles negative numbers of arbitrary magnitude down to -infinity",
      "Log1p scales all numbers strictly into the interval [0, 1]"
    ],
    correctIndex: 1,
    explanation: "In datasets containing true zeros (such as number of website purchases, rain precipitation in mm, or hospital visits), ln(0) is undefined and evaluates to -infinity in numerical libraries, causing gradient collapse and runtime crashes. Log1p computes ln(1 + x), which cleanly maps x = 0 to ln(1) = 0 without error.",
    practicalTip: "Use np.log1p(x) instead of np.log(x + 1) in Python because np.log1p provides enhanced floating-point precision for tiny values where x << 1.",
    codeSnippet: "import numpy as np\n# Safe transformation for non-negative data with zeros\ny_transformed = np.log1p(df['transaction_count'])",
    examRelevance: "Data Preprocessing Numerical Stability"
  },
  {
    id: 4,
    tier: "Tier 1: Foundation & Terminology",
    question: "What is the strict mathematical domain requirement for applying the classical Box-Cox power transformation?",
    options: [
      "All input values must be strictly integers",
      "All input values must be strictly positive (x > 0)",
      "All input values must fall inside the range [-1.0, +1.0]",
      "All input values must be strictly non-positive (x <= 0)"
    ],
    correctIndex: 1,
    explanation: "The classical Box-Cox transformation (Box & Cox, 1964) is defined only for strictly positive real numbers (x > 0). For non-integer parameter lambda, fractional powers of negative numbers produce complex/imaginary numbers, and at x = 0 with lambda <= 0, the expression is mathematically undefined or zero-division.",
    practicalTip: "If your feature contains zero or negative values, do not add an arbitrary constant like +1 arbitrarily; prefer the mathematically rigorous Yeo-Johnson transform.",
    codeSnippet: "from scipy.stats import boxcox\n# Throws ValueError if any element is <= 0\ny_bc, optimal_lambda = boxcox(df[df['sales'] > 0]['sales'])",
    examRelevance: "MAKAUT Viva Voce & Box-Cox Constraints"
  },
  {
    id: 5,
    tier: "Tier 1: Foundation & Terminology",
    question: "Which power transformation family was explicitly formulated by Ing-Guey Yeo and Richard Johnson in 2000 to extend Box-Cox to all real numbers (including zero and negative values)?",
    options: [
      "The Yeo-Johnson Transformation",
      "The Fourier Power Spectrum Transform",
      "The Hilbert Space Projection",
      "The Sigmoid Logistic Scaling"
    ],
    correctIndex: 0,
    explanation: "The Yeo-Johnson transformation provides a four-branch piecewise power function that is continuous, monotonic, and invertible across the entire real number line (-infinity, +infinity). It applies power lambda to (x + 1) for non-negative values and power (2 - lambda) to (-x + 1) for negative values.",
    practicalTip: "In scikit-learn, PowerTransformer(method='yeo-johnson') is the default robust power transformer because it works seamlessly on mixed-sign data.",
    codeSnippet: "from sklearn.preprocessing import PowerTransformer\npt = PowerTransformer(method='yeo-johnson')\nX_trans = pt.fit_transform(X_train)",
    examRelevance: "Advanced Data Transformation Foundations"
  },
  {
    id: 6,
    tier: "Tier 1: Foundation & Terminology",
    question: "In feature discretization, how does Equal-Frequency (Quantile) binning differ fundamentally from Equal-Width binning?",
    options: [
      "Equal-Width divides by percentiles, whereas Equal-Frequency divides by standard deviations",
      "Equal-Width partitions the value range [min, max] into intervals of identical width, while Equal-Frequency partitions data so that each bin contains approximately the same number of samples",
      "Equal-Frequency creates bins of equal numerical ranges, whereas Equal-Width uses K-Means clustering",
      "Equal-Frequency can only be applied to binary categorical features"
    ],
    correctIndex: 1,
    explanation: "Equal-width binning calculates interval width as w = (max - min) / k, meaning intervals have equal spatial size but can contain wildly uneven sample counts. Equal-frequency (quantile) binning uses empirical quantiles (e.g. quartiles, deciles) to guarantee each bin holds approximately n / k observations, maximizing entropy.",
    practicalTip: "If your feature contains extreme outliers, equal-width binning collapses into 1 populated bin and k-1 empty bins. Always use quantile binning or robust clipping first.",
    codeSnippet: "import pandas as pd\n# Equal-width binning\ndf['width_bin'] = pd.cut(df['age'], bins=5)\n# Equal-frequency quantile binning\ndf['quantile_bin'] = pd.qcut(df['income'], q=5)",
    examRelevance: "Feature Discretization & Binning Theory"
  },
  {
    id: 7,
    tier: "Tier 1: Foundation & Terminology",
    question: "What does the statistical assumption of 'Homoscedasticity' state regarding residual errors in regression models?",
    options: [
      "Residual variance must systematically increase as predicted values grow larger",
      "Residual errors must follow a uniform distribution between -1 and +1",
      "The variance of the residual errors is constant across all levels of the predictor features",
      "Residuals from consecutive time steps must have zero correlation"
    ],
    correctIndex: 2,
    explanation: "Homoscedasticity (from Greek 'homo' = same, 'skedannumi' = scattering) means the residual scatter variance Var(e | X) is uniform and constant across all predictor values. If residual variance fans out or forms a cone (heteroscedasticity), standard error estimates are invalid and hypothesis tests cannot be trusted.",
    practicalTip: "A log transform on the dependent variable y or skewed predictor X is the classic remedy for fan-shaped heteroscedastic residual plots.",
    codeSnippet: "# Checking homoscedasticity via Breusch-Pagan test\nimport statsmodels.stats.diagnostic as smd\nbp_test = smd.het_breuschpagan(residuals, X_with_const)",
    examRelevance: "Linear Regression Assumptions & Diagnostics"
  },
  {
    id: 8,
    tier: "Tier 1: Foundation & Terminology",
    question: "Why is the square root transformation y = sqrt(x) particularly recommended for Poisson-distributed count features?",
    options: [
      "Because Poisson distributions have variance equal to their mean, and sqrt(x) acts as a mathematical variance-stabilizing transformation",
      "Because square root makes negative counts strictly positive",
      "Because square root converts count data directly into continuous Gaussian variables with mean exactly 0",
      "Because square root eliminates all collinearity between independent predictors"
    ],
    correctIndex: 0,
    explanation: "In a Poisson process, the variance equals the mean: Var(X) = E[X] = lambda. As count values grow, their variance naturally increases (heteroscedasticity). By the Delta Method, if y = sqrt(x), the asymptotic variance becomes Var(sqrt(X)) approx 1/4 (constant, independent of lambda), stabilizing the variance across all counts.",
    practicalTip: "For small counts (mean < 10), the Freeman-Tukey transform y = sqrt(x) + sqrt(x + 1) provides even better variance stabilization.",
    codeSnippet: "import numpy as np\n# Stabilizing variance for count data (e.g. daily store footfall)\ndf['stabilized_count'] = np.sqrt(df['store_visits'])",
    examRelevance: "Variance Stabilization & Count Data Transformations"
  },

  // =========================================================================
  // TIER 2: MATHEMATICAL MECHANICS & FORMULAS (Q9 - Q16)
  // =========================================================================
  {
    id: 9,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In the Box-Cox power transformation formula, why is the special case for lambda = 0 defined as y = ln(x)?",
    options: [
      "Because 0^0 is arbitrarily chosen by statisticians to equal 1",
      "Because by L'Hopital's Rule, the mathematical limit of (x^lambda - 1) / lambda as lambda approaches 0 is exactly ln(x)",
      "Because division by zero is strictly permitted when calculating sample variances",
      "Because ln(x) represents the derivative of x^0 with respect to x"
    ],
    correctIndex: 1,
    explanation: "As lambda -> 0, both numerator (x^0 - 1 = 0) and denominator evaluate to 0 (indeterminate form 0/0). Applying L'Hopital's Rule by differentiating with respect to lambda: d/d(lambda) [x^lambda - 1] = x^lambda * ln(x), and d/d(lambda) [lambda] = 1. Evaluating the limit as lambda -> 0 yields x^0 * ln(x) / 1 = ln(x). Thus, ln(x) ensures smooth continuity of the transformation family.",
    practicalTip: "This continuous transition prevents computational discontinuity when numerical optimizers step across lambda = 0.",
    codeSnippet: "# Symbolic verification of Box-Cox limit in sympy\nimport sympy as sp\nx, lmbda = sp.symbols('x lambda', positive=True)\nlimit_expr = sp.limit((x**lmbda - 1)/lmbda, lmbda, 0)\nprint('Limit as lambda -> 0:', limit_expr) # Output: log(x)",
    examRelevance: "MAKAUT BCAC701B Analytical Proofs & Limits"
  },
  {
    id: 10,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In the Profile Maximum Likelihood Estimation of the Box-Cox parameter lambda, what is the mathematical function of the Jacobian determinant term (lambda - 1) * sum(ln(x_i))?",
    options: [
      "It speeds up matrix inversion during gradient descent",
      "It prevents trivial scale collapse by accounting for the shrinking volume of the transformed variable space",
      "It converts complex eigenvalues into real eigenvectors",
      "It forces the mean of the transformed feature to equal exactly zero"
    ],
    correctIndex: 1,
    explanation: "If one only minimized the transformed variance sigma^2(lambda) without the Jacobian, the optimization would trivially choose tiny or negative lambda values that compress all numbers into an infinitesimal range (e.g. [0.001, 0.002]), artificially shrinking variance to near-zero. The Jacobian determinant |dy/dx| = x^(lambda-1) penalizes scale compression, ensuring legitimate normalization.",
    practicalTip: "Omitting the Jacobian term is a classic implementation bug when writing custom Box-Cox optimizers from scratch.",
    codeSnippet: "# Profile log-likelihood formulation\ndef boxcox_llf(lmbda, data):\n    n = len(data)\n    y = (data**lmbda - 1)/lmbda if lmbda != 0 else np.log(data)\n    var = np.var(y)\n    return -0.5 * n * np.log(var) + (lmbda - 1) * np.sum(np.log(data))",
    examRelevance: "Maximum Likelihood Estimation & Mathematical Statistics"
  },
  {
    id: 11,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "Under the Yeo-Johnson transformation, what is the exact formula applied when the input value is negative (x < 0) and lambda != 2?",
    options: [
      "y = - ((-x + 1)^(2 - lambda) - 1) / (2 - lambda)",
      "y = ((x - 1)^lambda + 1) / lambda",
      "y = ln(-x) / (1 - lambda)",
      "y = - sqrt(|x|) * lambda"
    ],
    correctIndex: 0,
    explanation: "For negative values x < 0, Yeo-Johnson defines psi(lambda, x) = - [ ((-x + 1)^(2 - lambda) - 1) / (2 - lambda) ]. Because x < 0, the term (-x + 1) is strictly greater than 1, guaranteeing that fractional powers never encounter negative bases. The (2 - lambda) exponent preserves monotonicity and ensures smooth continuity across the zero boundary.",
    practicalTip: "Notice the algebraic symmetry: when lambda = 1, both positive and negative branches reduce to linear identity shifts.",
    codeSnippet: "# Yeo-Johnson negative branch in Python\ndef yj_negative(x, lmbda):\n    if lmbda != 2:\n        return -(((-x + 1)**(2 - lmbda) - 1) / (2 - lmbda))\n    return -np.log(-x + 1)",
    examRelevance: "Advanced Transformation Formulae & University Examinations"
  },
  {
    id: 12,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "For a discretized continuous feature partitioned into k distinct bins with sample proportions p_1, p_2, ..., p_k, what is the maximum achievable Shannon Entropy H_max?",
    options: [
      "H_max = k bits",
      "H_max = log2(k) bits, achieved when all bins have equal frequency (p_j = 1/k)",
      "H_max = 1 / k bits, achieved when one bin contains all samples",
      "H_max = k * ln(2) bits"
    ],
    correctIndex: 1,
    explanation: "Shannon entropy H(X) = - sum(p_i * log2(p_i)) measures the information content or uncertainty of a discrete distribution. By Jensen's inequality and information theory principles, entropy is strictly maximized when the distribution is uniform: p_j = 1/k for all j, yielding H_max = - sum((1/k) * log2(1/k)) = log2(k) bits. Equal-frequency (quantile) binning achieves this theoretical maximum.",
    practicalTip: "If equal-width binning yields an entropy ratio H / H_max < 0.3, the feature distribution is severely swamped by outliers.",
    codeSnippet: "import numpy as np\n# Computing Shannon entropy in bits\ncounts = np.array([4, 4, 4, 4]) # 4 equal bins\np = counts / counts.sum()\nentropy = -np.sum(p * np.log2(p)) # Exactly 2.0 bits (log2(4))",
    examRelevance: "Information Theory & Feature Engineering Quantization"
  },
  {
    id: 13,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "In the Fisher-Pearson sample skewness formula g1 = m3 / (m2^(1.5)), what do the terms m3 and m2 represent?",
    options: [
      "m3 is the median and m2 is the mode",
      "m3 is the third central sample moment (1/n)*sum((x - x_bar)^3) and m2 is the second central sample moment (sample variance)",
      "m3 is the maximum value and m2 is the minimum value",
      "m3 is the 75th percentile and m2 is the 25th percentile"
    ],
    correctIndex: 1,
    explanation: "The k-th central sample moment is defined as m_k = (1/n) * sum((x_i - x_bar)^k). Thus, m2 is the sample variance (second central moment measuring spread) and m3 is the third central moment measuring asymmetric deviation from the mean. Standardizing m3 by m2^(3/2) creates a dimensionless scale-invariant skewness metric.",
    practicalTip: "Because m3 raises deviations to the 3rd power, a single extreme outlier at +10 sigma exerts a factor of 1000x influence on m3, highlighting why skewness is highly sensitive to outliers.",
    codeSnippet: "# Calculating moments from raw data\nm2 = np.mean((x - x.mean())**2)\nm3 = np.mean((x - x.mean())**3)\ng1 = m3 / (m2 ** 1.5)",
    examRelevance: "Higher-Order Statistical Moments & Distribution Diagnostics"
  },
  {
    id: 14,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "When predicting a log-transformed target variable ln(y), why does simply taking the naive exponential y_hat = exp(ln(y)_hat) systematically UNDERESTIMATE the true conditional mean E[y | X]?",
    options: [
      "Due to rounding errors in floating-point CPU registers",
      "Due to Jensen's Inequality, which states that for any convex function like exp(z), E[exp(z)] >= exp(E[z])",
      "Because natural logarithms invert negative numbers to positive numbers",
      "Because the learning rate of gradient descent shrinks over training epochs"
    ],
    correctIndex: 1,
    explanation: "Jensen's Inequality dictates that if g(z) is convex, E[g(z)] >= g(E[z]). Because the exponential function is strictly convex, exp(E[ln(y)]) yields the geometric mean / median, which is strictly lower than the true expected arithmetic mean E[y]. For normally distributed residuals with variance sigma^2, the unbiased expected value is E[y] = exp(mu + sigma^2 / 2).",
    practicalTip: "In financial revenue or real estate prediction where total sums matter, ignoring the sigma^2 / 2 correction leads to systematic multi-million-dollar under-forecasting.",
    codeSnippet: "# Correcting Jensen's back-transformation bias\npred_log = model.predict(X_test)\nresidual_var = np.var(y_train_log - model.predict(X_train))\n# Unbiased expectation\npred_actual = np.exp(pred_log + residual_var / 2.0)",
    examRelevance: "Jensen's Inequality & Target Transformation Traps"
  },
  {
    id: 15,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "What exact transformation does Box-Cox execute when the optimal power parameter is lambda = -1.0?",
    options: [
      "Logarithmic transform: y = ln(x)",
      "Reciprocal / Inverse transform: y = 1 - 1/x",
      "Square root transform: y = sqrt(x)",
      "Quadratic power transform: y = x^2"
    ],
    correctIndex: 1,
    explanation: "Plugging lambda = -1.0 into the Box-Cox formula y = (x^lambda - 1) / lambda yields: y = (x^(-1) - 1) / (-1) = -(1/x - 1) = 1 - 1/x. This is an inverted reciprocal transformation with an affine shift. It heavily compresses massive right-tail outliers toward an upper asymptote of 1.0.",
    practicalTip: "Reciprocal transforms are common in physics and finance, such as converting travel time into speed (speed = distance / time) or price-to-earnings into earnings yield.",
    codeSnippet: "# Box-Cox with lambda = -1\nx = np.array([1.0, 2.0, 4.0, 10.0])\ny = (x**(-1) - 1.0) / (-1.0) # [0.0, 0.5, 0.75, 0.9]",
    examRelevance: "MAKAUT Viva Voce: Special Cases of Power Transforms"
  },
  {
    id: 16,
    tier: "Tier 2: Mathematical Mechanics & Formulas",
    question: "A distribution is classified as 'Leptokurtic' when its Fisher excess kurtosis g2 satisfies:",
    options: [
      "g2 < 0 (Light tails, flat peak, low outlier probability)",
      "g2 = 0 (Mesokurtic, identical tail decay to a standard Gaussian)",
      "g2 > 0 (Heavy tails, sharp peak, elevated probability of extreme outliers)",
      "g2 is undefined for all continuous distributions"
    ],
    correctIndex: 2,
    explanation: "Excess kurtosis g2 measures tail weight relative to the standard Normal distribution (whose raw kurtosis is exactly 3.0). A Leptokurtic distribution (g2 > 0) has heavy, fat tails and a sharper central peak, indicating that extreme outliers occur far more frequently than predicted by Gaussian statistics (e.g. Student's t-distribution, Cauchy, stock market returns).",
    practicalTip: "If your target feature is highly leptokurtic (g2 > 3.0), Ordinary Least Squares will suffer from extreme instability. Switch to Huber Loss or apply a power transform.",
    codeSnippet: "import scipy.stats as stats\nkurt = stats.kurtosis(df['returns']) # scipy calculates excess kurtosis (Normal = 0)\nprint('Excess Kurtosis:', kurt)",
    examRelevance: "Kurtosis Taxonomies & Tail Risk Modeling"
  },

  // =========================================================================
  // TIER 3: ALGORITHM ARCHITECTURE & DESIGN (Q17 - Q24)
  // =========================================================================
  {
    id: 17,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "Why does applying a strictly monotonic transformation (such as Log1p or Box-Cox) have ZERO mathematical impact on the predictions of Decision Trees, Random Forests, and XGBoost?",
    options: [
      "Because tree algorithms automatically apply an internal Fourier transform to all features",
      "Because tree splitting algorithms evaluate thresholds purely based on the relative rank order of feature values, which is strictly preserved by monotonic mappings",
      "Because gradient boosted trees ignore numeric values and convert everything to strings",
      "Because tree-based algorithms only train on binary 0/1 indicator variables"
    ],
    correctIndex: 1,
    explanation: "Decision trees find split points by evaluating candidate thresholds s that maximize information gain or minimize impurity. If a function f(x) is strictly monotonic, then x_a < x_b if and only if f(x_a) < f(x_b). A split at threshold s on the raw feature corresponds exactly to a split at f(s) on the transformed feature. The resulting partitions, tree structure, and leaf predictions are mathematically identical.",
    practicalTip: "Do not waste preprocessing compute time running Box-Cox or Log transforms on features that are fed exclusively into tree ensembles like XGBoost or LightGBM.",
    codeSnippet: "# Invariance verification in sklearn\n# DecisionTreeRegressor trained on X vs log(X) achieves identical R2 and split structure",
    examRelevance: "Model Family Invariance & Algorithmic Mechanics"
  },
  {
    id: 18,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "How does normalizing and symmetrizing skewed features dramatically improve the convergence rate of Gradient Descent in Neural Networks and Linear Models?",
    options: [
      "It reduces the condition number kappa = lambda_max / lambda_min of the Hessian matrix, turning eccentric elliptical loss ravines into spherical contours",
      "It eliminates the need to calculate backpropagation gradients",
      "It ensures that weights never need to be updated after the first epoch",
      "It forces the loss function to become strictly zero at initialization"
    ],
    correctIndex: 0,
    explanation: "When features possess wildly asymmetric magnitudes or severe skewness, the eigenvalues of the Hessian matrix H of the loss surface diverge widely, yielding a massive condition number kappa >> 1. The resulting loss surface forms steep, narrow elliptical ravines where gradient descent oscillates aggressively back and forth across the walls. Symmetrizing features brings kappa close to 1, creating isotropic spherical contours where gradients point directly to the global minimum.",
    practicalTip: "If your neural network training suffers from vanishing/exploding gradients or requires an excruciatingly tiny learning rate, check for unscaled, skewed input features.",
    codeSnippet: "# High condition number causes slow convergence:\n# kappa = max_eigenval(H) / min_eigenval(H)\n# Ideal condition number is 1.0 (perfectly spherical loss surface)",
    examRelevance: "MAKAUT Optimization Theory & Gradient Descent Mechanics"
  },
  {
    id: 19,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "What pathological failure occurs when Equal-Width binning is applied to a feature containing a single massive outlier (e.g., salaries where 99% are in [20k, 50k], but one CEO earns 10,000k)?",
    options: [
      "The bin edges become negative and crash the Python interpreter",
      "Almost all regular data points collapse into Bin 0, leaving intermediate bins completely empty and collapsing feature information entropy",
      "The algorithm splits each regular sample into its own individual bin",
      "The dataset automatically gets deleted from memory"
    ],
    correctIndex: 1,
    explanation: "Equal-width binning sets width w = (10,000k - 20k) / 5 = 1,996k. Bin 0 spans [20k, 2,016k], containing 99.9% of all records. Bins 1, 2, and 3 are completely empty (0 samples), and Bin 4 contains only the single CEO. The resulting discretized feature retains virtually zero discriminatory information (entropy near 0).",
    practicalTip: "Always check bin value counts with df['binned'].value_counts() after equal-width binning. If any bin has zero or single-digit counts, switch to quantile binning.",
    codeSnippet: "# Detecting bin collapse:\ncounts = pd.cut(salaries, bins=5).value_counts()\nif (counts == 0).any():\n    print('ALERT: Empty bins detected! Switch to pd.qcut()')",
    examRelevance: "Discretization Pitfalls & Data Preprocessing Engineering"
  },
  {
    id: 20,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "When should an ML engineer select Discretization (Binning) over continuous Power Transformations (like Box-Cox)?",
    options: [
      "When the feature relationship with the target is non-monotonic, jagged, or regime-dependent (e.g. credit risk vs age brackets)",
      "When the machine learning model is strictly Ordinary Least Squares regression",
      "When the dataset contains fewer than 10 total observations",
      "When all continuous values are already normally distributed"
    ],
    correctIndex: 0,
    explanation: "Continuous power transformations preserve monotonic relationships (if x increases, transformed x increases). However, if the underlying relationship with the target is non-monotonic or characterized by step changes (e.g. risk is high for age < 21, low for 25-55, and high for > 65), binning into discrete buckets allows linear models to learn independent step-function coefficients for each distinct regime.",
    practicalTip: "In banking and credit scoring, binning continuous features into 5-10 buckets with Weight of Evidence (WoE) encoding is standard regulatory practice.",
    codeSnippet: "from sklearn.preprocessing import KBinsDiscretizer\nkbd = KBinsDiscretizer(n_bins=5, encode='onehot', strategy='quantile')\nX_binned = kbd.fit_transform(X_continuous)",
    examRelevance: "Feature Engineering Trade-Offs & Non-Linear Mapping"
  },
  {
    id: 21,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "In CESC power distribution networks with rooftop solar feeds, net transformer load ranges from -15 MW (surplus solar export) to +240 MW (evening peak). Which transformation is mathematically valid?",
    options: [
      "Natural Logarithm: y = ln(x)",
      "Classical Box-Cox Power Transformation",
      "Yeo-Johnson Transformation",
      "Square Root Transformation: y = sqrt(x)"
    ],
    correctIndex: 2,
    explanation: "Natural log and classical Box-Cox strictly require positive inputs (x > 0). Square root fails on negative values (x < 0 produces NaN or imaginary numbers). Only the Yeo-Johnson transformation is mathematically defined, continuous, and invertible across all real numbers including negative surplus feeds, zero balance, and positive peak demand.",
    practicalTip: "For industrial sensor streams that oscillate around zero (net power, temperature deviations, acceleration), Yeo-Johnson is the only reliable power transform.",
    codeSnippet: "from sklearn.preprocessing import PowerTransformer\npt = PowerTransformer(method='yeo-johnson')\ngrid_transformed = pt.fit_transform(grid_load.reshape(-1, 1))",
    examRelevance: "Industrial Energy Case Studies & West Bengal Utilities"
  },
  {
    id: 22,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "What is the critical rule regarding transformation parameter estimation (e.g. Box-Cox lambda* or quantile bin edges) to prevent data leakage?",
    options: [
      "Estimate lambda* on the combined training, validation, and test sets simultaneously to maximize sample size",
      "Fit lambda* and bin edges strictly on the TRAINING set only, then use those exact frozen parameters to transform the test and serving data",
      "Randomly re-estimate lambda* independently for every new test sample at inference time",
      "Use lambda = 0.5 for all datasets without estimating parameters"
    ],
    correctIndex: 1,
    explanation: "Transformation parameters (optimal lambda, mean, variance, quantile cut points) are statistical properties of the data distribution. Fitting them on the full dataset or on test data leaks information about the test distribution into the training pipeline, invalidating cross-validation and producing over-optimistic generalization metrics.",
    practicalTip: "Always wrap transformers inside an sklearn.pipeline.Pipeline to guarantee that fit() is executed strictly on training folds.",
    codeSnippet: "from sklearn.pipeline import Pipeline\npipe = Pipeline([\n    ('power', PowerTransformer(method='yeo-johnson')),\n    ('model', LinearRegression())\n])\npipe.fit(X_train, y_train) # Safe: transforms fitted on train only!",
    examRelevance: "MAKAUT Academic Integrity & Data Leakage Prevention"
  },
  {
    id: 23,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "How do distance-based algorithms like K-Nearest Neighbors (KNN) and K-Means clustering behave when one continuous feature has extreme right skewness?",
    options: [
      "The distance metric behaves perfectly because Euclidean distance is immune to scale",
      "The massive values in the elongated tail completely dominate Euclidean distance calculations, rendering all other features irrelevant in distance computation",
      "K-Means clustering automatically converts skewed features to Gaussian shapes",
      "KNN assigns equal weight to all points regardless of Euclidean distance"
    ],
    correctIndex: 1,
    explanation: "Euclidean distance is computed as d(p, q) = sqrt(sum((p_i - q_i)^2)). If a skewed feature spans from 10 to 1,000,000 while another spans from 0 to 1, squared differences in the skewed feature ((1,000,000 - 10)^2 approx 10^12) will completely dwarf differences in other dimensions. Transforming skewed features into symmetric, bounded shapes restores balanced geometric neighborhoods.",
    practicalTip: "Before running K-Means or DBSCAN, always transform skewed features with Box-Cox/Log and follow up with StandardScaler.",
    codeSnippet: "# Without transform, cluster centers are pulled toward high-magnitude outliers\n# Pipeline: Skew Transform -> Standardize -> Clustering\nX_preprocessed = StandardScaler().fit_transform(PowerTransformer().fit_transform(X))",
    examRelevance: "Clustering & Metric-Space Preprocessing Requirements"
  },
  {
    id: 24,
    tier: "Tier 3: Algorithm Architecture & Design",
    question: "When should an engineer deploy the Signed Cube Root transform y = sign(x) * |x|^(1/3) instead of Log1p?",
    options: [
      "When the dataset contains both severe positive and negative extremes across zero, and a closed-form parameter-free transform is desired",
      "When all values in the dataset are strictly integers greater than 100",
      "When the target variable is binary classification labels 0 and 1",
      "When computing tree splits in LightGBM"
    ],
    correctIndex: 0,
    explanation: "Signed cube root is defined across all real numbers (-inf, +inf), cleanly maps 0 to 0, preserves algebraic signs (negative values remain negative, positive remain positive), and compresses heavy tails without requiring optimization of a parametric lambda like Yeo-Johnson.",
    practicalTip: "Signed cube root is highly effective for financial profit-and-loss (P&L) statements where companies can have large positive earnings or large negative losses.",
    codeSnippet: "import numpy as np\ndef signed_cbrt(x):\n    return np.sign(x) * np.cbrt(np.abs(x))",
    examRelevance: "Alternative Mathematical Power Transforms"
  },

  // =========================================================================
  // TIER 4: PRODUCTION DIAGNOSTICS & SCALABILITY (Q25 - Q30)
  // =========================================================================
  {
    id: 25,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "A model trained with Box-Cox power transform crashes in production when processing a new customer record where feature x = -2.5. What was the engineering root cause and how should it be architecturally fixed?",
    options: [
      "The server ran out of RAM; add more virtual memory",
      "Box-Cox requires strictly positive values (x > 0) and cannot evaluate negative inputs; the pipeline should be upgraded to Yeo-Johnson or include strict input validation guards",
      "The customer's network connection timed out during data upload",
      "Negative numbers are illegal in JSON and must be sent as strings"
    ],
    correctIndex: 1,
    explanation: "Even if the training dataset was entirely positive, live production traffic can deliver zero or negative inputs due to sensor malfunctions, account overdrafts, or data entry errors. Because Box-Cox evaluates x^lambda, negative values produce math domain errors. Switching to Yeo-Johnson provides mathematical robustness across all negative real numbers.",
    practicalTip: "In production pipelines, use Pydantic or schema validators to enforce x > 0 guards if Box-Cox is deployed, or default to Yeo-Johnson.",
    codeSnippet: "# Defensive pipeline check:\nassert (X_incoming > 0).all(), 'Box-Cox assertion failed: Non-positive input detected!'",
    examRelevance: "Production Reliability & Robust ML Architecture"
  },
  {
    id: 26,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In banking and credit scoring (e.g. Sector V FinTech credit risk scoring), what is the primary benefit of discretizing continuous variables into Weight of Evidence (WoE) bins?",
    options: [
      "It eliminates the need to train a logistic regression model",
      "It linearizes complex non-linear relationships with the log-odds of default, handles missing values as a distinct bucket, and protects against extreme outliers",
      "It guarantees that every customer receives a loan approval",
      "It converts 10,000 features into exactly 1 feature"
    ],
    correctIndex: 1,
    explanation: "Weight of Evidence (WoE = ln(% Good / % Bad)) recodes continuous bins into a linear relationship with the log-odds of default in Logistic Regression. Binning also isolates outliers into the top bin and allows missing/null records to form an explicit bin without requiring imputation.",
    practicalTip: "Ensure each WoE bin contains at least 5% of total sample volume to satisfy Basel regulatory stability standards.",
    codeSnippet: "# Concept of WoE calculation per bin j:\n# WoE_j = np.log((good_j / total_goods) / (bad_j / total_bads))\n# IV = sum((good_pct - bad_pct) * WoE)",
    examRelevance: "Industrial Credit Scoring & Banking Regulations"
  },
  {
    id: 27,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "What production risk is introduced if a continuous feature is discretized into an excessively large number of bins (e.g. k = 150 bins for 1,000 training samples)?",
    options: [
      "Underfitting due to excessive information compression",
      "Overfitting and high variance error because the model must estimate separate parameters for numerous sparsely populated, noisy bins",
      "Negative eigenvalues in the covariance matrix",
      "Complete collapse of training data into a single row"
    ],
    correctIndex: 1,
    explanation: "Discretizing into 150 bins converts one continuous variable into 149 one-hot encoded indicator features. With only 1,000 samples, many bins will contain only 1-3 observations. The learning algorithm will overfit to the idiosyncratic noise of these tiny buckets, destroying test generalization.",
    practicalTip: "A practical rule of thumb is k = min(10, int(np.cbrt(len(df)))) bins for general continuous features unless business rules dictate otherwise.",
    codeSnippet: "# Rule of thumb binning in Python\nk_bins = max(3, min(10, int(len(df) ** (1/3))))\nprint('Recommended bin count:', k_bins)",
    examRelevance: "Curse of Dimensionality & Overfitting in Discretization"
  },
  {
    id: 28,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "When persisting a trained preprocessing pipeline using joblib or ONNX for production microservice serving, which parameters must be serialized for a Yeo-Johnson transformer?",
    options: [
      "Only the final model weights beta, because preprocessing steps do not require parameters",
      "The estimated power parameter lambda*, input feature names, and any scaling shifts or standardization moments fitted on training data",
      "The entire training dataset raw text records",
      "The git commit hash of the scikit-learn repository"
    ],
    correctIndex: 1,
    explanation: "A power transformer is stateful. It must serialize the learned parameter lambda* for each feature, along with any subsequent normalization parameters (mean mu, standard deviation sigma). When inference records arrive, the microservice uses these saved parameters to apply the exact same transformation.",
    practicalTip: "Always test your serialized pipeline with an automated integration test that asserts input -> transform -> predict produces bitwise-identical results across environments.",
    codeSnippet: "import joblib\n# Serialize full pipeline including fitted transformer\njoblib.dump(pipeline, 'production_pipeline_v1.pkl')\n# In microservice:\nloaded_pipe = joblib.load('production_pipeline_v1.pkl')\npred = loaded_pipe.predict(new_data)",
    examRelevance: "MLOps Pipeline Serialization & Production Serving"
  },
  {
    id: 29,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In scikit-learn's QuantileTransformer, what is the key difference between output_distribution='uniform' and output_distribution='normal'?",
    options: [
      "Uniform maps features to [0, 1] via empirical CDF ranks, while normal applies the inverse normal CDF (probit) to map values into a Gaussian bell curve N(0, 1)",
      "Uniform only works on integers, while normal works only on complex numbers",
      "Normal uses Box-Cox, while uniform uses Yeo-Johnson",
      "There is no difference; they are exact aliases for each other"
    ],
    correctIndex: 0,
    explanation: "QuantileTransformer calculates empirical cumulative distribution function (CDF) ranks. With output_distribution='uniform', it maps sample ranks linearly into the interval [0, 1]. With output_distribution='normal', it passes those uniform percentiles through the inverse standard normal CDF (probit function scipy.stats.norm.ppf), creating a Gaussian distribution.",
    practicalTip: "QuantileTransformer is a non-linear rank-based transform. Note that it smooths out unusual clusters and can distort linear correlations.",
    codeSnippet: "from sklearn.preprocessing import QuantileTransformer\nqt = QuantileTransformer(output_distribution='normal', random_state=42)\nX_gaussian = qt.fit_transform(X_train)",
    examRelevance: "Scikit-Learn Quantile Transforms & Probabilistic Mappings"
  },
  {
    id: 30,
    tier: "Tier 4: Production Diagnostics & Scalability",
    question: "In an enterprise explainability audit (e.g. SHAP values for loan approvals in Salt Lake Sector V), how should feature importance and SHAP contributions be communicated to loan officers if the feature was log-transformed?",
    options: [
      "Tell the loan officers to calculate natural logarithms in their heads",
      "Invert the transformed feature values and marginal contributions back to native currency units (INR) using the inverse mapping x = exp(y) - 1",
      "Discard all explainability metrics because transformed models cannot be explained",
      "Convert all loan amounts into US Dollars to eliminate the transform"
    ],
    correctIndex: 1,
    explanation: "Non-technical stakeholders (loan officers, credit auditors, regulators) cannot interpret coefficients or attribution scores in log-space (e.g. '0.35 log-rupees'). Production explainability pipelines must map feature values and marginal impact intervals back into native physical domain units (e.g. INR 45,000) using the inverse transformation f^(-1)(y).",
    practicalTip: "Use shap.TreeExplainer or shap.KernelExplainer with custom inverse transform visualizers to render human-readable waterfall plots.",
    codeSnippet: "# Inverting feature for human-readable reporting\nloan_inr = np.expm1(transformed_loan)\nprint(f'Customer Loan Request: Rs {loan_inr:,.2f}')",
    examRelevance: "Model Explainability (XAI), Governance & West Bengal Industry Standards"
  }
];

export default questions;
