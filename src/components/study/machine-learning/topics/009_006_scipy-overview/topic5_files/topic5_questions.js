const questions = [
  {
    question: "What is a Z-Score and what is its mathematical formula?",
    shortAnswer: "A Z-Score measures how many standard deviations an observation lies from the sample/population mean: $z = \\frac{x - \\mu}{\\sigma}$.",
    explanation: "Standardizing features into Z-Scores converts any raw measurement (e.g. salaries in INR, student exam marks, sensor temperatures) onto a dimensionless scale with mean $\\mu = 0$ and standard deviation $\\sigma = 1$. This prevents scale dominance in distance-based algorithms like KNN, PCA, and SVM.",
    hint: "Z = (value - mean) / standard_deviation.",
    level: "basic",
    codeExample: "from scipy import stats\nimport numpy as np\n\ndata = np.array([70, 80, 85, 90, 95])\nz_scores = stats.zscore(data)\nprint('Computed Z-Scores:', z_scores)\nprint('Mean of Z:', np.mean(z_scores).round(4), '| Std of Z:', np.std(z_scores).round(4))"
  },
  {
    question: "What is the Empirical Rule (68-95-99.7 Rule) for Normal Distributions?",
    shortAnswer: "68.27% of data falls within $\\pm 1\\sigma$, 95.45% within $\\pm 2\\sigma$, and 99.73% within $\\pm 3\\sigma$.",
    explanation: "In a normal distribution:\n- $\\mu \\pm 1\\sigma$ contains $\\approx 68.27\\%$ of all observations ($|z| \\le 1$).\n- $\\mu \\pm 2\\sigma$ contains $\\approx 95.45\\%$ of all observations ($|z| \\le 2$).\n- $\\mu \\pm 3\\sigma$ contains $\\approx 99.73\\%$ of all observations ($|z| \\le 3$).\nOnly $0.27\\%$ of legitimate Gaussian data lies outside $\\pm 3\\sigma$, making $|z| > 3$ the universal threshold for statistical outlier detection.",
    hint: "1 sigma = 68%, 2 sigma = 95%, 3 sigma = 99.7%.",
    level: "basic",
    codeExample: "from scipy.stats import norm\n\n# Probability within 1, 2, and 3 standard deviations:\np_1sigma = norm.cdf(1) - norm.cdf(-1) # ~0.6827\np_2sigma = norm.cdf(2) - norm.cdf(-2) # ~0.9545\np_3sigma = norm.cdf(3) - norm.cdf(-3) # ~0.9973\nprint(f'1-Sigma: {p_1sigma:.4f} | 2-Sigma: {p_2sigma:.4f} | 3-Sigma: {p_3sigma:.4f}')"
  },
  {
    question: "How does `scipy.stats.zscore()` handle multidimensional 2D feature matrices in ML?",
    shortAnswer: "By default, `stats.zscore(X, axis=0)` standardizes each feature column independently.",
    explanation: "In Machine Learning tabular datasets $X$ with shape $(N, D)$, setting `axis=0` calculates the mean and standard deviation along each column (feature), standardizing each column to mean=0 and variance=1 simultaneously without column loop overhead.",
    hint: "axis=0 standardizes down rows (per column feature).",
    level: "moderate",
    codeExample: "from scipy import stats\nimport numpy as np\n\n# 2D feature matrix: [Study Hours, Exam Score]\nX = np.array([\n    [5.0, 72.0],\n    [8.0, 88.0],\n    [6.5, 78.0],\n    [9.0, 95.0]\n])\nX_standardized = stats.zscore(X, axis=0)\nprint('Standardized Feature Matrix:\\n', X_standardized)"
  },
  {
    question: "How do you detect and filter outliers using Z-scores in NumPy and SciPy?",
    shortAnswer: "Filter rows where $|z| > 3.0$ (or custom threshold $\\theta$).",
    explanation: "Calculate Z-scores using `stats.zscore()`, take absolute values with `np.abs(z)`, and apply boolean indexing: `outliers = data[np.abs(z) > 3.0]`. For 2D matrices, `clean_X = X[(np.abs(z_scores) < 3.0).all(axis=1)]` filters any row containing an outlier in any feature column.",
    hint: "Use np.abs(z) > threshold and apply boolean indexing.",
    level: "moderate",
    codeExample: "from scipy import stats\nimport numpy as np\n\nmarks = np.array([45, 52, 58, 60, 62, 65, 70, 72, 75, 450]) # 450 is typo outlier\nz = stats.zscore(marks)\noutlier_mask = np.abs(z) > 2.5\nclean_marks = marks[~outlier_mask]\nprint('Detected Outliers:', marks[outlier_mask])\nprint('Clean Dataset:', clean_marks)"
  },
  {
    question: "What is the key difference between Sample Z-score (`ddof=0` vs `ddof=1`) in SciPy?",
    shortAnswer: "`ddof=0` divides by $N$ (population variance); `ddof=1` divides by $N-1$ (unbiased sample variance).",
    explanation: "`scipy.stats.zscore(a, ddof=0)` uses population standard deviation (dividing by $N$, matching Scikit-Learn `StandardScaler`). Passing `ddof=1` uses sample standard deviation (dividing by $N-1$), which provides Bessel's correction for small sample batches.",
    hint: "Scikit-Learn StandardScaler uses ddof=0 (population std) by default.",
    level: "advanced",
    codeExample: "from scipy import stats\nimport numpy as np\n\ndata = np.array([10, 20, 30])\nprint('Z-score (ddof=0, Scikit-learn standard):', stats.zscore(data, ddof=0))\nprint('Z-score (ddof=1, sample unbiased):', stats.zscore(data, ddof=1))"
  },
  {
    question: "Why can Z-Score outlier filtering fail when extreme outliers exist in small datasets?",
    shortAnswer: "Extreme outliers artificially inflate the sample mean $\\mu$ and standard deviation $\\sigma$, masking their own Z-score (masking effect).",
    explanation: "Because standard deviation $\\sigma$ is calculated by squaring deviations, a massive outlier dramatically inflates $\\sigma$. In small datasets, this causes the outlier's own $z$-score to shrink below $3.0$, failing detection. In such cases, Modified Z-Score using Median Absolute Deviation (MAD) is preferred.",
    hint: "For severe outlier contamination, use Median Absolute Deviation (MAD) instead of mean/std.",
    level: "advanced",
    codeExample: "from scipy import stats\nimport numpy as np\n\n# Severe outlier masking demo\ndata = np.array([10, 11, 12, 13, 14, 1000]) # 1000 inflates std\nz = stats.zscore(data)\nprint('Z-score of 1000:', z[-1]) # Might only be ~2.2, failing |z| > 3 threshold!"
  },
  {
    question: "What is the Modified Z-score based on Median Absolute Deviation (MAD)?",
    shortAnswer: "$M_i = \\frac{0.6745 \\times (x_i - \\tilde{x})}{\\text{MAD}}$, where $\\tilde{x}$ is the median and $\\text{MAD} = \\text{median}(|x_i - \\tilde{x}|)$.",
    explanation: "Because median and MAD are robust non-parametric statistics (50% breakdown point), the Modified Z-Score is immune to extreme masking effects. Values with $|M_i| > 3.5$ are labeled as statistical outliers with mathematical rigor.",
    hint: "0.6745 is the consistency constant linking MAD to standard deviation for normal data.",
    level: "advanced",
    codeExample: "from scipy import stats\nimport numpy as np\n\ndata = np.array([10, 11, 12, 13, 14, 1000])\nmedian = np.median(data)\nmad = stats.median_abs_deviation(data)\nmod_z = 0.6745 * (data - median) / mad\nprint('Modified Z-score of 1000:', mod_z[-1]) # > 400! Reliably detected!"
  },
  {
    question: "How do Z-Scores relate to Standard Normal cumulative percentiles in percentile ranking?",
    shortAnswer: "Passing a Z-Score to `scipy.stats.norm.cdf(z)` converts the score directly into its global percentile rank.",
    explanation: "If a student in Barrackpore scores $z = +2.0$ on a state-level exam, `norm.cdf(2.0) = 0.9772$, meaning the student outperformed $97.72\\%$ of all candidates assuming normal test score distribution.",
    hint: "norm.cdf(z) converts z-score to percentile (0 to 1).",
    level: "moderate",
    codeExample: "from scipy.stats import norm\n\nz_student = 1.96\npercentile = norm.cdf(z_student) * 100\nprint(f'Z = {z_student} corresponds to {percentile:.2f}th percentile')"
  }
];

export default questions;
