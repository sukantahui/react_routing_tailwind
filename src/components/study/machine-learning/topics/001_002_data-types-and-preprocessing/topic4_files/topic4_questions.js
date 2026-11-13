/**
 * Topic 4: Discrete and Continuous Variables
 * 30 Comprehensive Assessment Questions (Basic to Expert)
 * Module: Data Types and Preprocessing (001_002_data-types-and-preprocessing)
 * Author: Sukanta Hui | Coder & AccoTax | Barrackpore, West Bengal, India
 */

const questions = [
  {
    "id": 1,
    "question": "What is the fundamental difference between a discrete variable and a continuous variable?",
    "shortAnswer": "Discrete variables take isolated, countable values with distinct gaps between them; continuous variables take any value along an unbroken continuum within an interval.",
    "explanation": "Discrete variables represent counts or quantized states (e.g. number of students: 0, 1, 2, 3; shoe sizes). You cannot have intermediate fractions like 2.37 students. Continuous variables represent measurements (e.g. height, weight, temperature, time) where between any two values there are infinitely many possible intermediate numbers, limited only by measurement precision.",
    "hint": "Ask: Can this quantity be counted with whole numbers, or is it measured with an instrument along a continuum?",
    "level": "Basic",
    "codeExample": "# Discrete: Countable integer values\nnum_courses = [3, 4, 2, 5]\n\n# Continuous: Unbroken real numbers\nbody_temp_celsius = [36.6, 37.2, 38.45, 36.85]"
  },
  {
    "id": 2,
    "question": "Why is the probability of a continuous random variable taking on an exact single point value mathematically equal to zero: P(X = x0) = 0?",
    "shortAnswer": "Because a continuous interval contains an infinite number of real values, making the probability of hitting any single infinitesimal point zero; probability is only defined over an interval.",
    "explanation": "For a continuous variable with Probability Density Function (PDF) f(x), probability is evaluated as an integral (area under the curve): P(a <= X <= b) = ∫_a^b f(x) dx. The area under a curve at a single infinitesimal point x0 is ∫_{x0}^{x0} f(x) dx = 0. Therefore, we always measure probability over intervals (e.g. P(67.9 <= weight <= 68.1)).",
    "hint": "What is the width of a single mathematical point on a continuous line?",
    "level": "Basic",
    "codeExample": "# Continuous probability requires an interval:\n# P(X == 25.000000...) = 0.0\n# P(24.95 <= X <= 25.05) = Area under PDF curve = 0.042"
  },
  {
    "id": 3,
    "question": "What is a Probability Mass Function (PMF), and how does it differ from a Probability Density Function (PDF)?",
    "shortAnswer": "PMF gives the exact probability P(X = x) for discrete values and sums to 1.0; PDF gives the relative likelihood density f(x) for continuous values where the area under the curve integrates to 1.0.",
    "explanation": "In a discrete distribution (e.g. Binomial, Poisson), the PMF p(x) yields the direct probability of a specific outcome, such that 0 <= p(x) <= 1 and ∑ p(x) = 1. In a continuous distribution (e.g. Gaussian Normal), f(x) represents density, not probability directly; f(x) can exceed 1.0 as long as the total integral ∫ f(x) dx = 1.0.",
    "hint": "PMF uses summation ∑ for isolated points; PDF uses integration ∫ over an interval.",
    "level": "Basic",
    "codeExample": "# Discrete PMF (Poisson):\n# P(X = 3) = 0.224 (Direct probability)\n\n# Continuous PDF (Normal):\n# f(x=0) for N(0, 0.1^2) = 3.989 (Density > 1.0 is valid, but area integrates to 1.0)"
  },
  {
    "id": 4,
    "question": "Can a discrete variable take non-integer values?",
    "shortAnswer": "Yes. A variable is discrete if its values are countable and separated by distinct gaps, even if the values are non-integers.",
    "explanation": "Shoe sizes in India (e.g. 6.0, 6.5, 7.0, 7.5, 8.0) or coin denominations (₹0.50, ₹1.00, ₹2.00, ₹5.00) contain decimal fractions, but they are strictly discrete because you cannot have a shoe size of 7.234 or a coin of ₹1.37. The set of values is countably isolated with finite gaps.",
    "hint": "Think about shoe sizes: 7.5 is not an integer, but is it discrete?",
    "level": "Basic",
    "codeExample": "# Non-integer discrete values:\nshoe_sizes = [6.0, 6.5, 7.0, 7.5, 8.0]  # Countable set with distinct gaps"
  },
  {
    "id": 5,
    "question": "What is the Cumulative Distribution Function (CDF) shape for a discrete variable vs a continuous variable?",
    "shortAnswer": "A discrete CDF is a staircase step function with jump discontinuities at each possible value; a continuous CDF is a smooth, continuous, non-decreasing S-curve.",
    "explanation": "The CDF F(x) = P(X <= x). For discrete variables, F(x) remains constant between points and abruptly jumps by p(x_k) at each discrete value x_k. For continuous variables, F(x) increases smoothly with no jumps because probability accumulates continuously along the integral of the PDF.",
    "hint": "Step jumps at discrete counts vs smooth continuous accumulation.",
    "level": "Basic",
    "codeExample": "# Discrete CDF: Jumps at integers 0, 1, 2...\n# Continuous CDF: Smooth sigmoid-like curve (e.g. scipy.stats.norm.cdf)"
  },
  {
    "id": 6,
    "question": "Why is Ordinary Least Squares (OLS) Linear Regression often inappropriate for predicting discrete count variables (e.g. number of hospital visits)?",
    "shortAnswer": "Linear regression assumes continuous Gaussian errors, can predict impossible negative numbers, and fails to handle heteroscedastic count variance.",
    "explanation": "If you train y = w^T x + b on count data, the linear line can easily output y_pred = -1.8 hospital visits for low-risk patients, which is physical nonsense. Furthermore, count data variance naturally increases with the mean (heteroscedasticity), violating the constant variance (homoscedasticity) assumption of OLS. Poisson Regression is required.",
    "hint": "Can a patient have -2 doctor appointments?",
    "level": "Moderate",
    "codeExample": "# OLS failure on count data:\n# Model predicts: -0.85 emergency visits (Impossible!)\n# Poisson GLM uses log link: lambda = exp(w^T x) >= 0 (Always non-negative)"
  },
  {
    "id": 7,
    "question": "What is Poisson Regression, and why is it the standard GLM for discrete count targets?",
    "shortAnswer": "Poisson Regression models count data by linking the log of the expected rate parameter lambda to a linear combination of predictors: ln(lambda) = w^T x.",
    "explanation": "In Poisson Regression, the target y is assumed to follow a Poisson distribution P(Y = k) = (lambda^k * e^-lambda) / k!. Using the exponential link function lambda = exp(w^T x + b) guarantees that the predicted expected count lambda is strictly positive (lambda > 0), naturally preventing negative predictions and accommodating count variance.",
    "hint": "Exponential link function ensuring lambda is strictly positive.",
    "level": "Moderate",
    "codeExample": "import statsmodels.api as sm\n# Poisson GLM for count targets:\nmodel = sm.GLM(y_counts, X, family=sm.families.Poisson()).fit()\npredicted_counts = model.predict(X_new)  # Strictly positive counts"
  },
  {
    "id": 8,
    "question": "What is 'Overdispersion' in count data, and when should Negative Binomial Regression replace Poisson Regression?",
    "shortAnswer": "Overdispersion occurs when the empirical variance of the count data is significantly larger than the mean (Var(Y) > E(Y)); Negative Binomial Regression handles this by adding a dispersion parameter.",
    "explanation": "A strict mathematical property of the Poisson distribution is equidispersion: Mean = Variance = lambda. In real-world data (e.g. website clicks, insurance claims), variance is almost always much larger than the mean due to clustering and unobserved heterogeneity. Fitting a Poisson model under overdispersion underestimates standard errors and inflates false positive rates. Negative Binomial regression relaxes this by estimating a dispersion parameter alpha.",
    "hint": "When variance exceeds the mean in discrete counts.",
    "level": "Expert",
    "codeExample": "import statsmodels.api as sm\n# When Var(y) >> Mean(y), use Negative Binomial:\nnb_model = sm.GLM(y_counts, X, family=sm.families.NegativeBinomial(alpha=1.0)).fit()"
  },
  {
    "id": 9,
    "question": "What is Discretization (Binning) of continuous variables, and why is it performed?",
    "shortAnswer": "Converting a continuous variable into discrete intervals or ordinal buckets to capture non-linearities, handle outliers, or meet regulatory reporting requirements.",
    "explanation": "Discretization transforms continuous numbers (e.g. Age: 0-100) into discrete bins (e.g. Child [0-12], Teen [13-19], Adult [20-59], Senior [60+]). It allows linear models to capture non-linear step functions, eliminates the undue influence of extreme numerical outliers, and simplifies business rule engine integration.",
    "hint": "Transforming continuous values into grouped intervals or categories.",
    "level": "Basic",
    "codeExample": "import pandas as pd\nages = [5, 16, 25, 45, 68, 82]\nbins = [0, 12, 19, 59, 120]\nlabels = ['Child', 'Teen', 'Adult', 'Senior']\nage_groups = pd.cut(ages, bins=bins, labels=labels)\nprint(age_groups)"
  },
  {
    "id": 10,
    "question": "What is the difference between Equal-Width Binning and Equal-Frequency (Quantile) Binning?",
    "shortAnswer": "Equal-Width divides the range into intervals of identical width; Equal-Frequency divides the data so that each bin contains the exact same number of observations.",
    "explanation": "If house prices range from ₹10L to ₹110L, Equal-Width (5 bins) creates bins of width ₹20L: [10-30], [30-50], [50-70], [70-90], [90-110]. If data is heavily skewed (most houses cost ₹20L-₹40L), the top bins will be empty. Equal-Frequency (using pd.qcut) calculates percentiles (quintiles: 20%, 40%, 60%, 80%) so that every bin holds exactly 20% of the houses, creating robust balanced categories regardless of skewness.",
    "hint": "Constant interval width vs constant observation count per bucket.",
    "level": "Moderate",
    "codeExample": "import pandas as pd\ns = pd.Series([10, 12, 15, 18, 20, 22, 25, 100])\n# Equal-Width:\nbin_width = pd.cut(s, bins=3)\n# Equal-Frequency (Quantile):\nbin_freq = pd.qcut(s, q=3)"
  },
  {
    "id": 11,
    "question": "What is the primary drawback or information loss associated with discretizing continuous variables?",
    "shortAnswer": "Discretization discards granular variance, treats all values within a bin as identical, and creates artificial boundary discontinuities.",
    "explanation": "If age is binned into '< 60' and '>= 60', a 59-year-old and an 18-year-old are treated as identical within the lower bin, while a 59-year-old and a 60-year-old are treated as completely different across the artificial threshold. This causes permanent loss of statistical power and predictive fidelity in models.",
    "hint": "Throwing away fine-grained numeric precision across boundary edges.",
    "level": "Moderate",
    "codeExample": "# Information loss: 59 and 18 become identical ('<60'),\n# while 59 and 60 become sharply separated across the boundary."
  },
  {
    "id": 12,
    "question": "When is it scientifically and mathematically justifiable to treat a discrete variable as continuous in machine learning?",
    "shortAnswer": "When the discrete counts are sufficiently large, dense, and finely spaced (e.g. annual salary in rupees, daily web impressions) with no significant low-integer boundary constraints.",
    "explanation": "While daily website impressions (e.g. 450,210 visits) or annual income in rupees (₹850,000) are technically discrete integers (you cannot have half a rupee or half a visit), the number of possible discrete states is enormous and the intervals between values are negligible relative to the scale. Treating them as continuous with Gaussian assumptions produces negligible error and allows standard regression toolsets.",
    "hint": "When the count scale is in thousands or millions, integer granularity is negligible.",
    "level": "Moderate",
    "codeExample": "# Technically discrete (integers), but practically continuous:\nannual_income_inr = 1250450  # 1.25 Million distinct possible integer states\n# Treating as continuous float introduces zero practical distortion"
  },
  {
    "id": 13,
    "question": "What is Zero-Inflated Poisson (ZIP) regression, and when is it required?",
    "shortAnswer": "A dual-component model for discrete count data that contains an excessive proportion of zeroes generated by two distinct underlying processes.",
    "explanation": "Consider fish caught in a lake: some visitors never fish at all (structural zeroes: P(catch) = 0), while others fish but happen to catch zero fish on that day (sampling zeroes from Poisson). A standard Poisson distribution cannot accommodate this massive spike of zeroes. ZIP models the data as a mixture: a logistic regression models whether the count is zero, and a Poisson regression models the counts for active participants.",
    "hint": "Excessive zeroes arising from two distinct populations (structural vs stochastic).",
    "level": "Expert",
    "codeExample": "# ZIP model components:\n# Component 1 (Logit): Probability of being a structural zero (e.g. non-fisherman)\n# Component 2 (Poisson): Count distribution for active participants"
  },
  {
    "id": 14,
    "question": "How do Decision Trees handle continuous vs discrete numerical features during splitting?",
    "shortAnswer": "Decision trees sort continuous features and evaluate threshold splits (x <= c), while discrete variables can be split via thresholding or subset membership.",
    "explanation": "For continuous features, a decision tree sorts all unique values and evaluates midpoints between adjacent numbers as candidate thresholds (e.g. 'Income <= 45.5 Lakhs'). For discrete numerical features with few unique values, it evaluates integer splits (e.g. 'Children <= 1'). Tree splits are invariant to monotonic scaling, meaning continuous log transforms do not alter tree architecture.",
    "hint": "Sorting unique values and calculating midpoint threshold splits.",
    "level": "Moderate",
    "codeExample": "# Decision Tree split evaluation:\n# Sorted unique continuous values: [10.2, 14.8, 19.5]\n# Candidate split thresholds: [(10.2+14.8)/2 = 12.5, (14.8+19.5)/2 = 17.15]"
  },
  {
    "id": 15,
    "question": "What is the difference between a bounded discrete variable and an unbounded discrete variable?",
    "shortAnswer": "Bounded discrete variables have a fixed finite maximum count (e.g. Binomial: k successes out of n trials); unbounded discrete variables have no theoretical upper ceiling (e.g. Poisson: counts per time interval).",
    "explanation": "In an exam with 10 questions, the number of correct answers is bounded in {0, 1, ..., 10} (modeled via Binomial distribution). The number of traffic accidents at an intersection in a month is theoretically unbounded in {0, 1, 2, ...} (modeled via Poisson or Negative Binomial distribution). Bounded counts require denominator normalization (e.g. rate or percentage).",
    "hint": "Is there a hard ceiling n on the maximum possible count?",
    "level": "Moderate",
    "codeExample": "# Bounded: k out of n (Binomial)\nexam_score = 8  # Out of n=10 questions\n\n# Unbounded: Count per period (Poisson)\nserver_crashes = 3  # No theoretical upper bound"
  },
  {
    "id": 16,
    "question": "Why is the Mean of a continuous uniform distribution U(a, b) equal to (a + b) / 2 and its variance (b - a)^2 / 12?",
    "shortAnswer": "Derived directly from integrating the continuous PDF f(x) = 1 / (b - a) across the interval [a, b].",
    "explanation": "Expected Value E[X] = ∫_a^b x * (1 / (b - a)) dx = (1 / (b - a)) * [x^2 / 2]_a^b = (b^2 - a^2) / (2(b - a)) = (a + b) / 2. Variance Var(X) = E[X^2] - (E[X])^2 = ∫_a^b x^2 * (1 / (b - a)) dx - ((a + b)/2)^2 = (b - a)^2 / 12. This shows how continuous calculus defines summary statistics.",
    "hint": "Definite integration of x and x^2 against the constant density 1/(b - a).",
    "level": "Expert",
    "codeExample": "# Uniform U(0, 10):\n# Mean = (0 + 10) / 2 = 5.0\n# Variance = (10 - 0)^2 / 12 = 100 / 12 = 8.333"
  },
  {
    "id": 17,
    "question": "What is the Geometric Distribution, and how does it model discrete waiting times?",
    "shortAnswer": "It models the discrete number of Bernoulli failures before the first success occurs, with PMF P(X = k) = (1 - p)^k * p.",
    "explanation": "The Geometric distribution is the discrete analog of the continuous Exponential distribution. For example, if a cold-call sales agent has probability p = 0.05 of closing a sale on each call, the number of unsuccessful calls k before the first closed sale follows a Geometric distribution. It possesses the memoryless property: P(X > s + t | X > s) = P(X > t).",
    "hint": "Count of trials needed to achieve the first successful outcome.",
    "level": "Moderate",
    "codeExample": "from scipy.stats import geom\n# Probability of first success on trial 5 with p=0.2:\nprob_5 = geom.pmf(5, p=0.2)\nprint(f'P(X=5): {prob_5:.4f}')  # Output: 0.0819"
  },
  {
    "id": 18,
    "question": "What is the Exponential Distribution, and how is it related to the discrete Poisson process?",
    "shortAnswer": "The Exponential distribution models the continuous time interval between successive events in a Poisson process with rate lambda: f(t) = lambda * e^(-lambda * t).",
    "explanation": "If discrete event occurrences (e.g. arrivals at Barrackpore metro station) follow a Poisson distribution with average rate lambda events per hour, the continuous elapsed time T between consecutive arrivals follows an Exponential distribution with mean 1 / lambda hours. It is the only continuous distribution with the memoryless property.",
    "hint": "Continuous waiting time between discrete Poisson events.",
    "level": "Expert",
    "codeExample": "# If 6 trains arrive per hour (lambda = 6):\n# Mean continuous time between trains = 1 / lambda = 1/6 hour = 10 minutes"
  },
  {
    "id": 19,
    "question": "How does Feature Scaling (e.g. MinMaxScaler or StandardScaler) affect discrete count features?",
    "shortAnswer": "It converts integer counts into continuous decimal floats, which preserves relative order and aids gradient descent but destroys integer count properties.",
    "explanation": "If 'number_of_children' in [0, 1, 2, 3, 4] is standardized with z = (x - mu) / sigma, the values become continuous floats like [-1.25, -0.45, 0.35, 1.15]. While this prevents gradient descent from being dominated by large scales in Neural Networks and SVMs, the transformed feature can no longer be modeled using discrete Poisson GLMs.",
    "hint": "Scaling changes integer data types into floating-point numbers.",
    "level": "Basic",
    "codeExample": "from sklearn.preprocessing import StandardScaler\ncounts = [[0], [1], [2], [4]]\nscaler = StandardScaler()\nscaled = scaler.fit_transform(counts)\nprint(scaled)  # Float values like [[-1.18], [-0.50], [0.16], [1.52]]"
  },
  {
    "id": 20,
    "question": "What is Quantization Error when continuous sensor readings are converted into discrete digital representations?",
    "shortAnswer": "The rounding error introduced when an infinite-precision analog continuous signal is mapped to a finite set of discrete digital levels by an Analog-to-Digital Converter (ADC).",
    "explanation": "If an 8-bit ADC converts continuous voltage (0.0V to 5.0V) into 256 discrete levels (each step = 5.0 / 256 = 0.0195V), any actual voltage like 2.3456V is rounded to the nearest discrete step (2.3438V). The difference e = 2.3456 - 2.3438 = 0.0018V is the quantization noise, uniformly distributed in [-Delta/2, Delta/2].",
    "hint": "Information lost when rounding continuous real values into digital buckets.",
    "level": "Moderate",
    "codeExample": "# Continuous voltage: 2.3456 V\n# 8-bit Quantized discrete step: 2.3438 V\n# Quantization residual: +0.0018 V"
  },
  {
    "id": 21,
    "question": "What is the Kolmogorov-Smirnov (K-S) test, and why is it used for continuous distributions?",
    "shortAnswer": "A non-parametric statistical test that compares the empirical cumulative distribution function (ECDF) of a sample against a reference continuous distribution CDF.",
    "explanation": "The K-S test evaluates the null hypothesis that a continuous sample was drawn from a specified reference distribution (e.g. Standard Normal). The test statistic D is the maximum vertical distance between the sample's ECDF F_n(x) and the theoretical CDF F(x): D = sup_x |F_n(x) - F(x)|. Because it relies on continuous CDF supremum distances, it is designed for continuous variables.",
    "hint": "Maximum vertical distance between sample ECDF and theoretical CDF.",
    "level": "Expert",
    "codeExample": "from scipy.stats import kstest\nimport numpy as np\ndata = np.random.normal(loc=0, scale=1, size=100)\nstat, p_val = kstest(data, 'norm')\nprint(f'K-S Stat: {stat:.4f}, p-value: {p_val:.4f}')"
  },
  {
    "id": 22,
    "question": "Why is Mode often useless or uninformative for continuous variables without binning?",
    "shortAnswer": "In continuous data measured with high floating-point precision, virtually every value appears exactly once, resulting in either no mode or an arbitrary unique sample.",
    "explanation": "If patient weights are measured as [65.432, 65.439, 65.441, 68.102], every observation is unique (frequency = 1 for all). The empirical mode function fails because no value repeats. To extract a meaningful mode from continuous data, you must either bin the data into intervals (modal class) or compute the peak of a Kernel Density Estimate (KDE).",
    "hint": "High-precision decimals rarely repeat identical numbers in continuous data.",
    "level": "Basic",
    "codeExample": "import pandas as pd\ns = pd.Series([65.432, 65.439, 65.441, 68.102])\n# Mode returns all 4 values with frequency 1 (Uninformative!)\n# Solution: Bin first or use KDE peak"
  },
  {
    "id": 23,
    "question": "What is Kernel Density Estimation (KDE), and how does it estimate a continuous PDF from discrete sample observations?",
    "shortAnswer": "KDE places a smooth continuous kernel function (e.g. Gaussian) over each discrete observation and sums them to construct a smooth non-parametric PDF estimate.",
    "explanation": "Given N sample points x_1, ..., x_N, KDE estimates the continuous density as: f_hat(x) = (1 / (N * h)) * ∑ K((x - x_i) / h), where K is a symmetric kernel (typically Gaussian) and h is the bandwidth smoothing parameter. Small h leads to a noisy, under-smoothed curve; large h leads to an over-smoothed, flattened curve.",
    "hint": "Smoothing discrete points into a continuous curve using sliding Gaussian kernels.",
    "level": "Expert",
    "codeExample": "from scipy.stats import gaussian_kde\nimport numpy as np\ndata = [1.2, 1.5, 1.9, 2.8, 3.1]\nkde = gaussian_kde(data, bw_method='silverman')\n# Evaluates smooth continuous density across any point:\nx_grid = np.linspace(0, 5, 100)\ndensity_curve = kde(x_grid)"
  },
  {
    "id": 24,
    "question": "How does the Central Limit Theorem (CLT) bridge discrete variables and the continuous Normal distribution?",
    "shortAnswer": "The sum or mean of a large number of independent and identically distributed (i.i.d.) discrete random variables converges to a continuous Gaussian Normal distribution.",
    "explanation": "Even if the underlying individual variable is strictly discrete (e.g. coin tosses in {0, 1} or dice rolls in {1, 2, ..., 6}), as sample size N grows large, the distribution of the sample mean X_bar = (1/N) ∑ X_i converges to a continuous Normal distribution N(mu, sigma^2 / N). This allows continuous parametric methods to evaluate discrete aggregations.",
    "hint": "Sum of many discrete dice rolls forms a continuous bell curve.",
    "level": "Moderate",
    "codeExample": "import numpy as np\n# Rolling 50 discrete dice (values 1-6) 10,000 times:\nsample_means = [np.mean(np.random.randint(1, 7, size=50)) for _ in range(10000)]\n# sample_means forms a smooth continuous Gaussian Normal curve!"
  },
  {
    "id": 25,
    "question": "What is the Binomial distribution, and under what conditions does it approximate the continuous Normal distribution?",
    "shortAnswer": "The Binomial distribution models the discrete number of successes k in n independent Bernoulli trials; it approximates the continuous Normal distribution when n * p >= 10 and n * (1 - p) >= 10.",
    "explanation": "The de Moivre-Laplace theorem states that when the number of trials n is large and probability p is not extreme, Binomial(n, p) can be approximated by continuous Normal N(mu = n*p, sigma^2 = n*p*(1-p)). A continuity correction (+/- 0.5) is applied to translate discrete points into continuous intervals (e.g. P(X = k) ≈ P(k - 0.5 <= Y <= k + 0.5)).",
    "hint": "Normal approximation to Binomial with continuity correction factor +/- 0.5.",
    "level": "Moderate",
    "codeExample": "# Continuity correction:\n# P(X = 15) for Binomial(100, 0.2) is approximated as P(14.5 <= Y <= 15.5) under N(20, 16)"
  },
  {
    "id": 26,
    "question": "In tree-based algorithms (XGBoost, LightGBM), how does the 'max_bin' parameter handle continuous variables?",
    "shortAnswer": "It automatically discretizes continuous features into a fixed number of histogram bins (e.g. 256 bins) to drastically accelerate split finding.",
    "explanation": "Evaluating every unique continuous floating-point split in massive datasets (e.g. 10 Million rows) is computationally expensive O(N log N). LightGBM and XGBoost Histogram-mode pre-bin continuous features into a small number of discrete integer bins (typically 256, fitting into an 8-bit integer uint8). This reduces split evaluation complexity to O(bins), providing an 8x-10x speedup with virtually no loss in test accuracy.",
    "hint": "Histogram-based splitting converting floats into 256 integer bins.",
    "level": "Expert",
    "codeExample": "import lightgbm as lgb\n# max_bin=255 converts continuous features into 8-bit histogram bins:\nparams = {'max_bin': 255, 'objective': 'regression'}"
  },
  {
    "id": 27,
    "question": "What is a discrete Uniform distribution vs a continuous Uniform distribution?",
    "shortAnswer": "Discrete Uniform has a finite set of n equally probable isolated values (P = 1/n); continuous Uniform has equal probability density across an entire continuous interval [a, b] (f(x) = 1 / (b - a)).",
    "explanation": "Rolling a fair six-sided die is discrete uniform: values {1, 2, 3, 4, 5, 6}, each with probability exactly 1/6 = 0.1667. Picking a random angle of a spinning wheel between 0.0 and 360.0 degrees is continuous uniform: probability density is constant f(x) = 1 / 360, but the probability of landing on exactly 180.000000... degrees is 0.",
    "hint": "Finite equiprobable discrete states vs flat continuous interval density.",
    "level": "Basic",
    "codeExample": "# Discrete Uniform: P(X = k) = 1/6 for k in {1,2,3,4,5,6}\n# Continuous Uniform: f(x) = 1/(b - a) for x in [a, b]"
  },
  {
    "id": 28,
    "question": "What is Tweedie Regression, and how does it handle zero-inflated continuous compound Poisson-gamma variables?",
    "shortAnswer": "Tweedie distribution models variables that have a discrete point mass at zero but are strictly continuous positive numbers elsewhere (e.g. insurance claim amounts).",
    "explanation": "In auto insurance claims, most policyholders file 0 claims (discrete mass at zero: Cost = ₹0.00). However, when an accident occurs, the payout amount is a continuous positive number (e.g. ₹42,560.85). Neither pure continuous regression nor pure discrete models fit. Tweedie GLM with variance power 1 < p < 2 (Compound Poisson-Gamma) natively handles this exact zero-inflated continuous structure.",
    "hint": "Compound Poisson-Gamma distribution for zero-mass continuous claims.",
    "level": "Expert",
    "codeExample": "import statsmodels.api as sm\n# Tweedie model with p=1.5 (Compound Poisson-Gamma):\ntweedie_model = sm.GLM(claim_cost, X, family=sm.families.Tweedie(var_power=1.5)).fit()"
  },
  {
    "id": 29,
    "question": "How should missing values be imputed for discrete count features vs continuous measurement features?",
    "shortAnswer": "Continuous features are typically imputed using Mean or Median; discrete count features must be imputed using Median or Mode to preserve integer validity.",
    "explanation": "Imputing a discrete count feature (e.g. 'number_of_children') with the Mean produces non-integer fractional values like 1.8 children, which violates integer data schema constraints. Imputing with the integer Median (e.g. 2) or Mode preserves integer integrity. Continuous features (e.g. income, blood pressure) freely accommodate decimal Mean imputation.",
    "hint": "Ensure the imputed value conforms to the variable's integer or real domain.",
    "level": "Basic",
    "codeExample": "# Discrete Count Imputation:\ndf['num_dependents'] = df['num_dependents'].fillna(df['num_dependents'].median())\n\n# Continuous Imputation:\ndf['salary_inr'] = df['salary_inr'].fillna(df['salary_inr'].mean())"
  },
  {
    "id": 30,
    "question": "What is the Box-Cox transformation, and why is it strictly applicable only to continuous positive data?",
    "shortAnswer": "A power transformation parameterized by lambda that transforms skewed continuous positive data into an approximately Gaussian Normal distribution.",
    "explanation": "The Box-Cox transform is defined as y^(lambda) = (y^lambda - 1) / lambda (for lambda != 0) and ln(y) (for lambda = 0). It strictly requires y > 0 because logarithmic and power transformations of non-positive numbers (<= 0) are undefined. For discrete data containing zeroes or negative counts, the Yeo-Johnson transformation must be used instead.",
    "hint": "Requires strictly positive continuous numbers (y > 0) to normalize skewness.",
    "level": "Expert",
    "codeExample": "from scipy.stats import boxcox\n# Strictly positive continuous data:\ncontinuous_data = [12.4, 45.8, 110.2, 8.5]\ntransformed_data, best_lambda = boxcox(continuous_data)"
  }
];

export default questions;
