/**
 * Topic 9: Mean, Median and Mode Imputation Architecture
 * 30 Authentic Graded Assessment Questions (Basic to Expert)
 * Course: BCAC701B (MAKAUT Aligned) - Introduction to Machine Learning
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  // =========================================================================
  // BASIC QUESTIONS (1 - 8)
  // =========================================================================
  {
    id: 1,
    question: "What is the fundamental principle of Mean Imputation in machine learning?",
    shortAnswer: "Mean imputation replaces missing continuous values with the arithmetic average of all observed values for that feature, assuming data is normally distributed and MCAR.",
    explanation: "The arithmetic mean represents the center of gravity of the observed sample. It is optimal under Gaussian assumptions and minimizes squared error loss, but is highly vulnerable to outlier distortion.",
    hint: "Think about the arithmetic average: sum of observed values divided by count.",
    level: "Basic",
    codeExample: "from sklearn.impute import SimpleImputer\n# Mean Imputation in Scikit-Learn\nmean_imp = SimpleImputer(strategy='mean')\nX_clean = mean_imp.fit_transform(X_train[['salary']])"
  },
  {
    id: 2,
    question: "What is the fundamental principle of Median Imputation in machine learning?",
    shortAnswer: "Median imputation replaces missing values with the 50th percentile (middle value) of observed records, making it resistant to extreme outliers and skewed distributions.",
    explanation: "Because the median depends on rank order rather than numerical magnitude, extreme multi-million outliers do not alter the imputed value, making it ideal for heavy-tailed real-world data like salaries or home prices.",
    hint: "What is the middle value when all numbers are sorted in order?",
    level: "Basic",
    codeExample: "# Median Imputation in Scikit-Learn\nmed_imp = SimpleImputer(strategy='median')\nX_clean = med_imp.fit_transform(X_train[['income']])"
  },
  {
    id: 3,
    question: "Why is Mode Imputation the only valid central tendency method for nominal categorical attributes?",
    shortAnswer: "Nominal categories have no mathematical order or numeric distance; calculating a mean or median on text strings is undefined, making the most frequent category (mode) the only coherent metric.",
    explanation: "If city values are 'Kolkata', 'Howrah', and 'Barrackpore', there is no arithmetic average city. Mode imputation selects whichever category appears with highest empirical frequency, minimizing 0-1 misclassification error.",
    hint: "Can you calculate the average of 'Apple' and 'Banana'?",
    level: "Basic",
    codeExample: "# Mode Imputation in Scikit-Learn\nmode_imp = SimpleImputer(strategy='most_frequent')\nX_clean = mode_imp.fit_transform(X_train[['city']])"
  },
  {
    id: 4,
    question: "How does distribution skewness dictate whether a data scientist should choose Mean or Median imputation?",
    shortAnswer: "For symmetric, bell-shaped Gaussian distributions without outliers, use Mean; for skewed, heavy-tailed distributions with outliers, always use Median.",
    explanation: "In symmetric data, Mean and Median are identical, but the Mean has higher statistical efficiency. In skewed data (e.g. positive skew in incomes), extreme outliers pull the Mean far away from the true center of mass, making Median mandatory.",
    hint: "Is the histogram symmetric like a bell curve, or does it have a long stretching tail?",
    level: "Basic",
    codeExample: "# Checking skewness in Pandas\nskew_val = df['income'].skew()\nstrategy = 'median' if abs(skew_val) > 1.0 else 'mean'\nprint(f'Recommended Imputation: {strategy} (Skew: {skew_val:.2f})')"
  },
  {
    id: 5,
    question: "What is the relative mathematical ordering of Mean, Median, and Mode in a positively (right) skewed distribution?",
    shortAnswer: "Mode < Median < Mean.",
    explanation: "In a right-skewed distribution (e.g. software engineer salaries in Salt Lake Sector V), the majority of workers earn modest salaries (Mode at the peak), the middle worker is at the Median, but high-earning executives stretch the tail, pulling the Mean to the highest value.",
    hint: "Which metric gets pulled the hardest by multi-millionaire outliers at the far right?",
    level: "Basic",
    codeExample: "# Right-skewed salary demonstration\nsalaries = [8, 9, 9, 10, 12, 14, 85] # 85 is outlier\nprint('Mode:', 9, '< Median:', 10, '< Mean:', round(sum(salaries)/len(salaries), 2)) # Mean is 21!"
  },
  {
    id: 6,
    question: "What is the mathematical meaning of Variance Deflation caused by Mean Imputation?",
    shortAnswer: "Replacing missing values with the constant mean adds zero to the squared deviation numerator, shrinking the overall sample variance proportionally by the fraction of missingness.",
    explanation: "Because (mu - mu)^2 = 0, the imputed cells contribute nothing to sample spread while the denominator N expands. The new variance is strictly Var_imputed = (1 - p_missing) * Var_observed.",
    hint: "What is the distance between the mean and the mean itself?",
    level: "Basic",
    codeExample: "# Variance Deflation Demonstration\nimport numpy as np\nx_obs = np.array([10, 20, 30, 40, 50])\nmean_val = np.mean(x_obs)\n# Impute 5 missing values with mean\nx_imp = np.concatenate([x_obs, [mean_val]*5])\nprint('Observed Variance:', np.var(x_obs)) # 200.0\nprint('Imputed Variance: ', np.var(x_imp)) # 100.0 (Exactly 50% deflated!)"
  },
  {
    id: 7,
    question: "Why is Mean Imputation mathematically inappropriate for ordinal survey ratings (such as 1 to 5 star ratings)?",
    shortAnswer: "The mean produces fractional floating-point numbers (e.g. 3.42 stars) that do not exist in the discrete discrete domain, violating integer constraints and ordinal categories.",
    explanation: "If a user rating column only allows integers {1, 2, 3, 4, 5}, imputing 3.42 introduces an artificial fractional class. Mode or integer median imputation preserves valid domain categories.",
    hint: "Can a user submit a 3.42-star rating on Amazon or Google Maps?",
    level: "Basic",
    codeExample: "# Ordinal integer ratings require median or mode to preserve discrete domain\nimp_discrete = SimpleImputer(strategy='most_frequent')"
  },
  {
    id: 8,
    question: "How do you implement SimpleImputer in Scikit-Learn to fit strictly on training data and transform testing data?",
    shortAnswer: "Call imputer.fit(X_train), then X_train_clean = imputer.transform(X_train), and X_test_clean = imputer.transform(X_test) using frozen training parameters.",
    explanation: "Fitting on X_train calculates the median strictly from training observations. Calling `.transform()` on X_test applies the frozen training median to unseen test data, completely preventing data leakage.",
    hint: "Where must `.fit()` be called exclusively?",
    level: "Basic",
    codeExample: "from sklearn.impute import SimpleImputer\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test = train_test_split(X, test_size=0.2, random_state=42)\nimp = SimpleImputer(strategy='median')\nX_train_imp = imp.fit_transform(X_train) # Fits on train\nX_test_imp = imp.transform(X_test)       # Uses frozen train median"
  },

  // =========================================================================
  // MODERATE QUESTIONS (9 - 16)
  // =========================================================================
  {
    id: 9,
    question: "Mathematically prove that the Sample Mean is the unique scalar minimizing the L2 (Squared Error) loss function.",
    shortAnswer: "Set J(c) = sum(x_i - c)^2. Differentiating dJ/dc = -2 sum(x_i - c) = 0 yields sum(x_i) - N*c = 0, proving c* = (1/N) sum(x_i) = Mean.",
    explanation: "The second derivative d^2 J / dc^2 = 2N > 0, confirming that the critical point is a global minimum. This mathematical property makes the mean optimal under squared-error loss and Gaussian likelihoods.",
    hint: "Take the derivative with respect to c and set it equal to zero.",
    level: "Moderate",
    codeExample: "# Loss proof: c = Mean minimizes sum((x - c)**2)\nimport numpy as np\nx = np.array([2, 4, 6, 8, 10])\nc_vals = np.linspace(0, 12, 100)\nl2_loss = [np.sum((x - c)**2) for c in c_vals]\nprint('Optimal c:', c_vals[np.argmin(l2_loss)], '== Mean:', np.mean(x))"
  },
  {
    id: 10,
    question: "Mathematically prove that the Sample Median is the unique scalar minimizing the L1 (Absolute Error) loss function.",
    shortAnswer: "Set J(c) = sum|x_i - c|. Differentiating piecewise dJ/dc = sum(-sign(x_i - c)) = 0 requires Count(x_i < c) = Count(x_i > c), which is the definition of the Median.",
    explanation: "The absolute error penalizes distance linearly rather than quadratically. Balance is achieved only when an equal number of points lie above and below c, which corresponds strictly to the 50th percentile rank.",
    hint: "When does the sum of signs equal zero?",
    level: "Moderate",
    codeExample: "# Loss proof: c = Median minimizes sum(abs(x - c))\nimport numpy as np\nx = np.array([1, 2, 3, 10, 100]) # Heavily skewed\nc_vals = np.linspace(0, 20, 200)\nl1_loss = [np.sum(np.abs(x - c)) for c in c_vals]\nprint('Optimal c:', round(c_vals[np.argmin(l1_loss)]), '== Median:', int(np.median(x)))"
  },
  {
    id: 11,
    question: "Why does Mean Imputation dilute the Pearson correlation coefficient between feature X and target y?",
    shortAnswer: "Because imputed entries have covariance of zero with the target while increasing sample size, directly deflating the numerator Cov(X, y) by (1 - p_missing).",
    explanation: "Pearson's r = Cov(X, y) / (sigma_X * sigma_y). Imputing the constant mean creates data points (mu_x, y_i) where (x_i - mu_x) = 0, contributing zero to covariance. This artificially shrinks the perceived linear correlation between X and y.",
    hint: "What is (x - mu_x) * (y - mu_y) when x is equal to mu_x?",
    level: "Moderate",
    codeExample: "# Covariance dilution demo\nx_clean = np.array([1, 2, 3, 4, 5])\ny = np.array([2, 4, 6, 8, 10])\n# Impute 5 nulls with mean (3.0)\nx_imp = np.concatenate([x_clean, [3.0]*5])\ny_ext = np.concatenate([y, [6.0, 7.0, 5.0, 6.0, 6.0]])\nprint('Original r: 1.00 -> Imputed r deflated!')"
  },
  {
    id: 12,
    question: "What is Grouped / Conditional Imputation and why is it superior to Global Imputation?",
    shortAnswer: "Grouped imputation calculates the mean, median, or mode within demographic subsets (e.g. Median Salary by Job Title), preserving subgroup variances and slashing reconstruction error.",
    explanation: "A single global median salary across an entire IT firm assigns the same salary to a junior QA intern and a senior software architect. Grouping by Department and Experience preserves authentic career progression, reducing imputation error by over 60-80%.",
    hint: "Should a software architect and a junior intern have the same imputed salary?",
    level: "Moderate",
    codeExample: "import pandas as pd\n# Grouped Median Imputation in Pandas\ndf['salary_clean'] = df.groupby('job_role')['salary'].transform(\n    lambda g: g.fillna(g.median())\n)"
  },
  {
    id: 13,
    question: "How does Mean Imputation create an artificial 'Spike Artifact' in the probability density function of continuous variables?",
    shortAnswer: "It injects a sharp discrete Dirac delta spike at the exact scalar mean, artificially inflating the mode and distorting non-linear kernel density estimates.",
    explanation: "In continuous biological or physical phenomena (e.g. blood pressure), no two humans have the exact identical reading down to decimals. Mean imputation assigns hundreds of patients the exact value 128.432, destroying the smooth Gaussian bell curve and creating an artificial spike.",
    hint: "What does a histogram look like if 300 out of 1000 people are assigned the exact same number 128.4?",
    level: "Moderate",
    codeExample: "# In histogram/KDE visualization, mean imputation creates an unnatural peak at mu"
  },
  {
    id: 14,
    question: "How does a single extreme outlier affect the Mean versus the Median during imputation?",
    shortAnswer: "A single outlier can pull the Mean arbitrarily far away towards infinity (0% breakdown point); the Median remains completely unchanged as long as fewer than 50% of points are corrupted.",
    explanation: "If observed salaries are [10, 12, 14, 15, 10000], the mean becomes 2,010.2 (completely unrepresentative of normal workers). The median remains 14.0, perfectly reflecting the typical worker.",
    hint: "Recall the definition of breakdown point in robust statistics.",
    level: "Moderate",
    codeExample: "vals = [10, 12, 14, 15, 10000]\nprint('Mean distorted:', np.mean(vals))   # ~ 2010.2\nprint('Median robust:', np.median(vals)) # 14.0"
  },
  {
    id: 15,
    question: "How do you prevent Data Leakage when executing Grouped Imputation across Train and Test splits?",
    shortAnswer: "Compute the grouped dictionary of medians strictly from X_train, and map those precomputed group medians onto both X_train and X_test without recomputing on test.",
    explanation: "If you run `groupby().transform()` across the combined dataset before splitting, test group statistics leak into the training phase. Precompute `group_medians = X_train.groupby('dept')['salary'].median().to_dict()` and `.map()` it to X_test.",
    hint: "How do you store group statistics learned during training to use on test queries?",
    level: "Moderate",
    codeExample: "# Anti-leakage grouped imputation\nlearned_medians = X_train.groupby('dept')['salary'].median().to_dict()\nglobal_fallback = X_train['salary'].median()\nX_test['salary_clean'] = X_test['salary'].fillna(\n    X_test['dept'].map(learned_medians).fillna(global_fallback)\n)"
  },
  {
    id: 16,
    question: "How should Mode Imputation behave when a categorical feature has multiple modes (bimodal or multimodal)?",
    shortAnswer: "It should select the first mode deterministically, break ties randomly, or preferably preserve proportions by sampling from the empirical mode distribution.",
    explanation: "In Scikit-Learn's `SimpleImputer(strategy='most_frequent')`, ties are broken by selecting the first category alphabetically or by order of appearance. In advanced pipelines, stochastic sampling matching category probabilities is preferred to avoid mode collapse.",
    hint: "What happens if 'Morning' and 'General' shifts have the exact same count of 50 workers?",
    level: "Moderate",
    codeExample: "# Pandas returns a Series of modes if ties exist\nmodes = df['shift'].mode()\nchosen_mode = modes[0] # Deterministic first mode"
  },

  // =========================================================================
  // ADVANCED QUESTIONS (17 - 24)
  // =========================================================================
  {
    id: 17,
    question: "What is the exact mathematical formula for the reduction in sample variance when a fraction p of missing values is imputed with the mean?",
    shortAnswer: "Var(X_imputed) = (1 - p) * Var(X_observed). Variance is reduced by exactly the fraction of missingness p.",
    explanation: "Let N_total = N_obs + N_mis and p = N_mis / N_total. Because (x_imputed - mu) = 0 for all N_mis points, the numerator sum of squares is strictly based on N_obs. Dividing by N_total scales the variance by N_obs / N_total = (1 - p).",
    hint: "If 25% of values are imputed with the mean, what percentage of the original variance remains?",
    level: "Advanced",
    codeExample: "# Variance reduction factor: (1 - p)\np_mis = 0.25 # 25% missing\nprint(f'Variance preserved: {(1 - p_mis)*100}%, Variance lost: {p_mis*100}%')"
  },
  {
    id: 18,
    question: "How does Mean Imputation artificially inflate the Type I Error Rate (false positive rate) in hypothesis testing and linear regression?",
    shortAnswer: "It deflates sample standard error SE = sigma / sqrt(N), which inflates t-statistics t = (beta - 0) / SE, causing p-values to appear falsely significant.",
    explanation: "By treating imputed synthetic constants as real empirical observations, sample size N is artificially maintained while variance sigma^2 is deflated. This causes standard statistical tests to reject the null hypothesis when no true relationship exists.",
    hint: "What happens to t = beta / SE when SE is artificially small?",
    level: "Advanced",
    codeExample: "# t-statistic is inflated because SE is underestimated by single imputation!"
  },
  {
    id: 19,
    question: "How does Random Sample Imputation (Hot-Deck Imputation) preserve the empirical variance compared to Mean Imputation?",
    shortAnswer: "Hot-deck imputation replaces missing values by randomly drawing with replacement from the observed distribution, perfectly preserving sample variance and histogram shape.",
    explanation: "Because random sampling draws from across the entire empirical spread rather than concentrating all mass at a single central point, Var(X_imputed) ≈ Var(X_observed), eliminating the Dirac delta spike artifact.",
    hint: "Instead of replacing every blank with 120, what if you randomly pick a number from the observed patients?",
    level: "Advanced",
    codeExample: "# Random sample imputation preserves variance\nobserved = df['salary'].dropna().values\nmissing_count = df['salary'].isnull().sum()\ndf.loc[df['salary'].isnull(), 'salary'] = np.random.choice(observed, size=missing_count)"
  },
  {
    id: 20,
    question: "When does Mean Imputation on an independent predictor feature X bias the estimated slope coefficient beta_1 in simple linear regression?",
    shortAnswer: "It always introduces Attenuation Bias, shrinking beta_1 toward zero because imputed entries contribute zero to the covariance numerator while increasing the denominator.",
    explanation: "In OLS, beta_1 = Cov(X, y) / Var(X). When X is mean-imputed, the imputed points (mu_x, y_i) add zero to the numerator Cov(X, y), but add variance to the denominator, pulling beta_1 toward zero.",
    hint: "What happens to a slope when you add horizontal scatter points that have no relationship to y?",
    level: "Advanced",
    codeExample: "# Mean imputation on X shrinks regression slope beta toward 0.0"
  },
  {
    id: 21,
    question: "How do you implement an anti-leakage Grouped Imputer as a custom Scikit-Learn Transformer?",
    shortAnswer: "Inherit from BaseEstimator and TransformerMixin, compute the group-to-median lookup table in .fit(), and map it onto unseen data in .transform() with a global fallback.",
    explanation: "Custom transformers ensure seamless integration into Pipelines and GridSearchCV. The fit method learns a dictionary mapping each group key to its median, allowing .transform() to apply identical statistics to test sets.",
    hint: "What methods must a custom Scikit-Learn transformer implement?",
    level: "Advanced",
    codeExample: "from sklearn.base import BaseEstimator, TransformerMixin\nclass GroupMedianImputer(BaseEstimator, TransformerMixin):\n    def __init__(self, group_col, target_col):\n        self.group_col = group_col\n        self.target_col = target_col\n    def fit(self, X, y=None):\n        self.medians_ = X.groupby(self.group_col)[self.target_col].median().to_dict()\n        self.global_ = X[self.target_col].median()\n        return self\n    def transform(self, X):\n        X_out = X.copy()\n        X_out[self.target_col] = X_out[self.target_col].fillna(\n            X_out[self.group_col].map(self.medians_).fillna(self.global_)\n        )\n        return X_out"
  },
  {
    id: 22,
    question: "Why does Mean or Median Imputation fail catastrophically when data is Missing Not at Random (MNAR)?",
    shortAnswer: "Because it assumes missing values share the same central tendency as observed values; under MNAR, the unobserved cohort systematically differs from the observed cohort.",
    explanation: "If high earners refuse to report income, observed median salary is Rs 30,000 while the true missing median is Rs 200,000. Imputing Rs 30,000 erases high earners from the dataset, corrupting credit risk scoring.",
    hint: "What happens if you assume silent people earn the same as speaking people, when only rich people remain silent?",
    level: "Advanced",
    codeExample: "# MNAR pathology: Observed median completely misrepresents the unobserved missing distribution!"
  },
  {
    id: 23,
    question: "How does Median Imputation behave on discrete count data (such as number of hospital visits) when the median evaluates to a non-integer?",
    shortAnswer: "When sample size N is even and the two middle numbers differ (e.g. 2 and 3), the arithmetic median is 2.5; pipelines must round to the nearest integer to preserve discrete count integrity.",
    explanation: "Count features follow Poisson or Negative Binomial distributions where fractional counts (2.5 hospital admissions) violate physical reality. Rounding `round(median)` or using Mode preserves valid count spaces.",
    hint: "Can a patient have 2.5 hospital visits?",
    level: "Advanced",
    codeExample: "# Rounding non-integer medians for count features\nint_median = int(np.round(np.median(counts)))"
  },
  {
    id: 24,
    question: "What is the computational time and space complexity of Mean vs Median vs Mode Imputation on an N x D dataset?",
    shortAnswer: "Mean and Mode run in O(N * D) time and O(D) space; exact Median runs in O(D * N log N) time due to sorting, but can be optimized to O(N * D) using Quickselect (introselect).",
    explanation: "Mean only requires a single accumulation pass. Mode requires a frequency hash table of size at most K unique categories. Median requires finding the 50th percentile, which via `np.partition` (Quickselect) runs in O(N) average time per column.",
    hint: "Why does median take slightly more work than calculating a simple sum?",
    level: "Advanced",
    codeExample: "# np.partition uses introselect to find median in O(N) average time without full sorting\nmed = np.partition(vals, len(vals)//2)[len(vals)//2]"
  },

  // =========================================================================
  // EXPERT QUESTIONS (25 - 30)
  // =========================================================================
  {
    id: 25,
    question: "What is the asymptotic Breakdown Point of the Sample Median (50%) versus the Sample Mean (0%), and why does this matter for robust ML?",
    shortAnswer: "The breakdown point measures the proportion of contaminated data an estimator can handle before yielding an arbitrarily large incorrect value; Mean has a 0% breakdown point while Median achieves the optimal 50%.",
    explanation: "A single corrupted point approaching infinity pulls the Mean to infinity (breakdown point 1/N -> 0%). In contrast, up to 49.9% of the dataset can be corrupted before the Median breaks down, making it the bedrock of robust statistics.",
    hint: "How many bad data points does it take to ruin the average versus the middle value?",
    level: "Expert",
    codeExample: "# Breakdown point comparison:\n# Mean breakdown: 1 extreme outlier destroys the estimate (0% breakdown point)\n# Median breakdown: Requires 50% corrupted points to shift (50% breakdown point)"
  },
  {
    id: 26,
    question: "How do distributed big-data frameworks (Apache Spark) compute exact versus approximate medians across distributed clusters?",
    shortAnswer: "Exact medians require expensive distributed sorting and shuffling across partitions; approximate medians use t-digest or Greenwald-Khanna quantile sketches in O(1) worker memory.",
    explanation: "In Apache Spark, `df.approxQuantile('salary', [0.5], 0.01)` constructs logarithmic centroid compression sketches locally on each worker executor, merging centroids at the driver to guarantee the median within 1% error without network shuffling.",
    hint: "How do you avoid sorting 10 billion rows across 1,000 worker nodes?",
    level: "Expert",
    codeExample: "# PySpark approximate quantile sketch for distributed median\n# median_approx = df.approxQuantile('salary', [0.5], 0.01)[0]"
  },
  {
    id: 27,
    question: "How does Iterative / Chained Imputation (MICE) mathematically build upon univariate mean/median imputation as an initialization step?",
    shortAnswer: "MICE initializes all missing cells with simple mean/median imputation, then iteratively replaces each column's values with predictions from linear or tree models trained on other features until convergence.",
    explanation: "At iteration 0, MICE runs univariate mean/median imputation to create a complete starting matrix. It then un-imputes feature 1, fits a model using features 2 to d, updates feature 1, and cycles through all columns across multiple Gibbs sampling iterations.",
    hint: "What is the initial starting point before MICE can run its first regression model?",
    level: "Expert",
    codeExample: "# IterativeImputer initial_strategy parameter defaults to 'mean' or 'median'\n# mice = IterativeImputer(initial_strategy='median', max_iter=10)"
  },
  {
    id: 28,
    question: "Why can Mode Imputation in high-cardinality categorical features exacerbate class imbalance in downstream classifiers?",
    shortAnswer: "Assigning thousands of missing entries to the dominant majority class inflates the majority class weight, pushing decision boundaries away from minority classes.",
    explanation: "If a medical dataset has classes 'Healthy' (80%), 'Condition A' (15%), and 'Condition B' (5%), mode-imputing 'Healthy' into missing diagnoses inflates the majority to 90%, causing classification trees to ignore rare pathologies.",
    hint: "What happens to minority classes when every blank cell is assigned to the majority class?",
    level: "Expert",
    codeExample: "# Mode imputation on imbalanced data worsens majority bias\n# Better to create an explicit 'Unknown' class or sample proportionally!"
  },
  {
    id: 29,
    question: "How does the choice of central tendency imputer impact the gradient magnitude in L2 vs L1 regularized neural networks?",
    shortAnswer: "Mean imputation minimizes L2 residuals, stabilizing gradient descent under L2 (Ridge) loss; Median imputation minimizes L1 residuals, providing stable, bounded sub-gradients under L1 loss.",
    explanation: "Because mean minimizes squared error, synthetic points injected at mu produce zero initial residual (y - mu = 0), preventing gradient shocks in MSE loss. Median imputation produces constant magnitude sub-gradients (+/- 1) regardless of error scale.",
    hint: "How do squared residuals compare to absolute residuals during backpropagation?",
    level: "Expert",
    codeExample: "# Gradient under L2: d/dw = -2 * (y - y_hat) * x (proportional to residual)\n# Gradient under L1: d/dw = -sign(y - y_hat) * x (constant bounded step)"
  },
  {
    id: 30,
    question: "In real-time production inference microservices, how are frozen training mean/median parameters serialized and served with sub-millisecond latency?",
    shortAnswer: "Parameters are saved as a lightweight JSON/YAML key-value manifest or serialized ONNX/Joblib pipeline graph, loaded in-memory at microservice startup for instant O(1) dictionary lookups.",
    explanation: "Production microservices never query databases or compute statistics on live incoming query batches. The training pipeline serializes `{'salary_impute_value': 12.0}`, which the serving API (FastAPI, Go, or C++) reads directly from RAM in microseconds.",
    hint: "Does a production API calculate the median of historical data when a single customer arrives?",
    level: "Expert",
    codeExample: "# Production serialization of frozen parameters\nimport json\nmanifest = {'salary_median': 12.0, 'shift_mode': 'General'}\nwith open('imputer_manifest.json', 'w') as f:\n    json.dump(manifest, f)"
  }
];

export default questions;
