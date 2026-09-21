const questions = [
  {
    question: "What does `scipy.stats.describe()` return and why is it preferred over running separate functions?",
    shortAnswer: "It returns a namedtuple with `nobs`, `minmax`, `mean`, `variance`, `skewness`, and `kurtosis` in a single pass.",
    explanation: "`stats.describe(array)` calculates all primary summary statistics simultaneously in an optimized single-pass C execution. Instead of calling mean(), var(), skew(), and kurtosis() independently (which traverses the array multiple times), `describe()` provides complete descriptive metrics instantly.",
    hint: "Single-pass execution reduces memory reads and computes moments simultaneously.",
    level: "basic",
    codeExample: "from scipy import stats\nimport numpy as np\n\ndata = np.array([78, 85, 92, 88, 75, 60, 95, 89, 90, 82])\nres = stats.describe(data)\nprint('Observations:', res.nobs)\nprint('Min/Max:', res.minmax)\nprint('Mean:', res.mean)\nprint('Variance:', res.variance)\nprint('Skewness:', res.skewness)\nprint('Kurtosis:', res.kurtosis)"
  },
  {
    question: "How does `scipy.stats.trim_mean()` help in robust machine learning data preprocessing?",
    shortAnswer: "It discards extreme percentiles from both tails before computing the mean, preventing outlier distortion.",
    explanation: "Standard arithmetic mean is highly sensitive to extreme measurement errors or heavy tails. `stats.trim_mean(data, proportiontocut=0.10)` trims the lowest 10% and highest 10% of values, yielding a robust measure of central tendency without discarding the entire dataset.",
    hint: "trim_mean combines the robustness of the median with the statistical efficiency of the mean.",
    level: "moderate",
    codeExample: "from scipy import stats\nimport numpy as np\n\n# Dataset with severe outlier:\nsalaries = np.array([3.5, 4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 6.0, 50.0])\nprint('Standard Mean:', np.mean(salaries))            # ~9.27 (heavily distorted)\nprint('10% Trimmed Mean:', stats.trim_mean(salaries, 0.1)) # ~4.90 (realistic)"
  },
  {
    question: "What is the interpretation of Skewness and how is it calculated in `scipy.stats.skew`?",
    shortAnswer: "Skewness measures distribution asymmetry. Positive (>0) means right-tailed; Negative (<0) means left-tailed; Zero (=0) means symmetric.",
    explanation: "Skewness is the standardized 3rd central moment: $E[((X-\\mu)/\\sigma)^3]$. If skewness > 0, the right tail is prolonged (e.g. household income or house prices). If skewness < 0, the left tail is prolonged. Machine learning models (like Linear Regression) often perform better when skewed features are normalized using log or Box-Cox transformations.",
    hint: "Tail points to the right = Positive Skew; Tail points to the left = Negative Skew.",
    level: "moderate",
    codeExample: "from scipy import stats\nimport numpy as np\n\nright_skewed = np.array([1, 2, 2, 3, 3, 3, 4, 5, 12, 25])\nprint('Skewness:', stats.skew(right_skewed))  # > 0 (Positive Skew)"
  },
  {
    question: "What is Kurtosis and how does SciPy's Fisher definition differ from Pearson's definition?",
    shortAnswer: "Kurtosis measures tail heaviness / outlier propensity. SciPy uses Fisher's definition where Normal Distribution equals 0.0.",
    explanation: "Kurtosis represents the standardized 4th central moment: $E[((X-\\mu)/\\sigma)^4]$. Pearson's kurtosis for a standard normal distribution is 3.0. SciPy's `scipy.stats.kurtosis` defaults to `fisher=True`, subtracting 3.0 (Excess Kurtosis) so that standard normal = 0.0. Leptokurtic (>0) indicates heavy tails/outliers; Platykurtic (<0) indicates light tails.",
    hint: "Excess Kurtosis = Pearson Kurtosis - 3. Normal distribution is 0.",
    level: "advanced",
    codeExample: "from scipy import stats\nimport numpy as np\n\n# Standard normal random variates\nnormal_data = stats.norm.rvs(size=10000, random_state=42)\nprint('Fisher Kurtosis (Normal):', stats.kurtosis(normal_data, fisher=True)) # ~0.0\nprint('Pearson Kurtosis (Normal):', stats.kurtosis(normal_data, fisher=False)) # ~3.0"
  },
  {
    question: "When should Geometric Mean (`scipy.stats.gmean`) and Harmonic Mean (`scipy.stats.hmean`) be used?",
    shortAnswer: "Geometric mean is used for multiplicative growth rates / ratios; Harmonic mean is used for rates, speeds, and F1-score evaluation.",
    explanation: "Arithmetic mean distorts compound percentage growth and rates. `stats.gmean` computes $(x_1 \\cdot x_2 \\dots x_n)^{1/n}$ (essential for portfolio investment returns and multiplicative metrics). `stats.hmean` computes $\\frac{n}{\\sum 1/x_i}$, which powers harmonic metrics in ML like the F1-Score (harmonic mean of precision and recall).",
    hint: "F1-Score in classification is the harmonic mean (hmean) of Precision and Recall.",
    level: "moderate",
    codeExample: "from scipy import stats\n\nprecision = 0.90\nrecall = 0.40\n# F1-Score using harmonic mean\nf1 = stats.hmean([precision, recall])\nprint('F1 Score via hmean:', f1)"
  },
  {
    question: "How does `scipy.stats.mode()` handle multimodal datasets in recent SciPy versions?",
    shortAnswer: "It returns a ModeResult namedtuple containing the smallest modal value and its count.",
    explanation: "`stats.mode(array, keepdims=False)` returns the most frequently occurring value in the array. When multiple values share the highest frequency, it returns the smallest value and its frequency count. Specifying `axis` allows multidimensional mode reduction across feature columns.",
    hint: "ModeResult provides .mode and .count attributes.",
    level: "basic",
    codeExample: "from scipy import stats\nimport numpy as np\n\nscores = np.array([80, 85, 85, 90, 90, 70])\nres = stats.mode(scores, keepdims=False)\nprint('Mode:', res.mode, '| Count:', res.count)"
  },
  {
    question: "How is `scipy.stats.iqr()` calculated and used for outlier detection?",
    shortAnswer: "IQR is the Interquartile Range ($Q_3 - Q_1$). Outliers lie outside $[Q_1 - 1.5 \\times \\text{IQR}, Q_3 + 1.5 \\times \\text{IQR}]$.",
    explanation: "`stats.iqr(data)` computes the spread of the middle 50% of data ($75^{\\text{th}} - 25^{\\text{th}}$ percentile). It forms the basis of Tukey's boxplot fence filter, providing a non-parametric outlier detection boundary immune to extreme skewed anomalies.",
    hint: "Tukey fences: Lower = Q1 - 1.5*IQR, Upper = Q3 + 1.5*IQR.",
    level: "moderate",
    codeExample: "from scipy import stats\nimport numpy as np\n\ndata = np.array([10, 12, 14, 15, 16, 18, 19, 21, 100])\niqr_val = stats.iqr(data)\nq75, q25 = np.percentile(data, [75, 25])\nlower_fence = q25 - 1.5 * iqr_val\nupper_fence = q75 + 1.5 * iqr_val\noutliers = data[(data < lower_fence) | (data > upper_fence)]\nprint('IQR:', iqr_val, '| Detected Outliers:', outliers)"
  },
  {
    question: "What is the function `scipy.stats.sem()` and how is it used in statistical confidence intervals?",
    shortAnswer: "SEM computes the Standard Error of the Mean: $\\text{SEM} = \\frac{s}{\\sqrt{n}}$.",
    explanation: "While standard deviation ($s$) measures the variability of individual observations in the sample, `stats.sem(data)` measures the precision of the sample mean as an estimate of the true population mean. It is directly used to construct 95% margin-of-error confidence intervals.",
    hint: "SEM decreases as sample size n increases: s / sqrt(n).",
    level: "advanced",
    codeExample: "from scipy import stats\nimport numpy as np\n\nsample = np.array([102, 105, 98, 103, 101, 99, 104])\nsem = stats.sem(sample)\nmean = np.mean(sample)\nci_95 = (mean - 1.96 * sem, mean + 1.96 * sem)\nprint(f'Sample Mean: {mean:.2f} | 95% CI: [{ci_95[0]:.2f}, {ci_95[1]:.2f}]')"
  }
];

export default questions;
