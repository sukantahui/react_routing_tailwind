const questions = [
  {
    question: "What are the 4 core unified methods exposed by all probability distributions in `scipy.stats`?",
    shortAnswer: "`.pdf()` / `.pmf()`, `.cdf()`, `.ppf()`, and `.rvs()`.",
    explanation: "SciPy distribution classes implement a unified object-oriented API:\n1) `.pdf(x)` (Continuous) or `.pmf(k)` (Discrete): Probability Density/Mass Function.\n2) `.cdf(x)`: Cumulative Distribution Function ($P(X \\le x)$).\n3) `.ppf(q)`: Percent Point Function (Inverse CDF / Quantile lookup for probability $q$).\n4) `.rvs(size)`: Random Variate Sampling.",
    hint: "PDF = height of curve; CDF = cumulative area under curve; PPF = x value for a given area; RVS = generate random numbers.",
    level: "basic",
    codeExample: "from scipy.stats import norm\n\n# Standard normal N(0, 1)\nprint('PDF at x=0:', norm.pdf(0))       # ~0.3989 (peak height)\nprint('CDF at x=0:', norm.cdf(0))       # 0.5000 (50% area to the left)\nprint('PPF for 95%:', norm.ppf(0.95))   # ~1.6448 (95th percentile)\nprint('Random sample:', norm.rvs(size=3, random_state=42))"
  },
  {
    question: "What is the difference between a 'Frozen' distribution and passing shape/loc/scale parameters dynamically?",
    shortAnswer: "A frozen distribution locks parameters into a reusable object, avoiding passing loc/scale repeatedly.",
    explanation: "Dynamic invocation requires passing parameters every time: `norm.cdf(1.5, loc=10, scale=2)`. Freezing the distribution creates an instance with fixed parameters: `my_dist = norm(loc=10, scale=2)`, allowing clean repeated calls like `my_dist.cdf(1.5)`, `my_dist.pdf(10)`, and `my_dist.rvs(100)`.",
    hint: "Frozen distributions encapsulate state (loc and scale) into a persistent distribution object.",
    level: "moderate",
    codeExample: "from scipy.stats import norm\n\n# Frozen normal distribution for student exam scores\nexam_dist = norm(loc=75, scale=10)\nprint('Probability scoring <= 85:', exam_dist.cdf(85)) # ~0.8413\nprint('Score needed for top 5%:', exam_dist.ppf(0.95))  # ~91.45"
  },
  {
    question: "How do `loc` and `scale` parameters map to mean and standard deviation in continuous distributions?",
    shortAnswer: "`loc` shifts the distribution along the x-axis (mean/center); `scale` stretches/compresses the width (standard deviation/spread).",
    explanation: "In `scipy.stats`, all continuous distributions use standardized form $y = (x - \\text{loc}) / \\text{scale}$. For a Normal distribution, $\\text{loc} = \\mu$ (mean) and $\\text{scale} = \\sigma$ (standard deviation). For a Uniform distribution, $\\text{loc} = a$ and $\\text{scale} = b - a$. For Exponential, $\\text{scale} = 1/\\lambda$.",
    hint: "loc = location (center shift), scale = scale (spread multiplier).",
    level: "basic",
    codeExample: "from scipy.stats import norm, uniform\n\n# Normal with mean 100, std 15\nheight_dist = norm(loc=100, scale=15)\n# Uniform distribution spanning [10, 30]\nunif_dist = uniform(loc=10, scale=20)  # [10, 10+20]"
  },
  {
    question: "What is the Binomial distribution in `scipy.stats.binom` and when is it used in ML?",
    shortAnswer: "It models the number of successes in $n$ independent Bernoulli trials with success probability $p$.",
    explanation: "`binom.pmf(k, n, p)` calculates the probability of obtaining exactly $k$ successes out of $n$ binary trials (e.g. ad clicks, email opens, binary classification false positive counts). In A/B testing and conversion rate optimization, binomial models evaluate significance of click-through rates.",
    hint: "Binomial parameters: n = number of trials, p = probability of success per trial.",
    level: "moderate",
    codeExample: "from scipy.stats import binom\n\n# 100 email campaigns, each with 5% click probability\n# Probability of getting exactly 8 clicks:\nprob_8 = binom.pmf(k=8, n=100, p=0.05)\n# Probability of getting 10 or more clicks (1 - CDF(9)):\nprob_10_plus = binom.sf(k=9, n=100, p=0.05) # sf = Survival Function (1 - CDF)\nprint(f'P(k=8): {prob_8:.4f} | P(k>=10): {prob_10_plus:.4f}')"
  },
  {
    question: "What is the Poisson distribution in `scipy.stats.poisson` and how does it apply to count data?",
    shortAnswer: "It models the count of independent events occurring within a fixed interval given an average rate $\\mu$ (lambda).",
    explanation: "`poisson.pmf(k, mu)` calculates the probability of observing $k$ events in a fixed time window or spatial area (e.g. web server requests per second, machine failure events per month, call center arrivals). In ML, Poisson regression is applied to nonnegative integer count predictions.",
    hint: "Poisson has a single parameter mu (lambda), where Mean = Variance = mu.",
    level: "moderate",
    codeExample: "from scipy.stats import poisson\n\n# Server receives average 20 requests/sec (mu=20)\n# Probability of receiving exactly 25 requests in 1 sec:\nprob_25 = poisson.pmf(25, mu=20)\n# Probability of traffic surge (> 30 requests/sec):\nprob_surge = poisson.sf(30, mu=20)\nprint(f'P(k=25): {prob_25:.4f} | P(surge): {prob_surge:.4f}')"
  },
  {
    question: "What is the Survival Function (`.sf()`) and Inverse Survival Function (`.isf()`) in SciPy?",
    shortAnswer: "`.sf(x)` computes right-tail probability $P(X > x) = 1 - \\text{CDF}(x)$; `.isf(q)` computes the inverse right-tail quantile.",
    explanation: "When calculating probabilities for extreme rare events in deep tails (e.g., $z = 8$), `1.0 - norm.cdf(8)` suffers from catastrophic floating-point cancellation yielding `0.0`. `norm.sf(8)` calculates the upper tail directly using specialized asymptotic expansions, retaining high numerical precision.",
    hint: "Always use .sf() instead of 1 - .cdf() when calculating p-values and extreme upper-tail probabilities.",
    level: "advanced",
    codeExample: "from scipy.stats import norm\n\n# Extreme tail calculation\nprint('1 - CDF (cancellation risk):', 1.0 - norm.cdf(8.0))\nprint('Survival Function (accurate):', norm.sf(8.0)) # ~6.22e-16"
  },
  {
    question: "How does `scipy.stats.norm.fit()` compute maximum likelihood parameters from raw sample data?",
    shortAnswer: "It calculates the Maximum Likelihood Estimates (MLE) for mean (`loc`) and standard deviation (`scale`) directly from sample observations.",
    explanation: "`norm.fit(data)` fits a Gaussian curve to observed sample values by maximizing the log-likelihood function analytically: $\\hat{\\mu} = \\bar{x}$ and $\\hat{\\sigma} = \\sqrt{\\frac{1}{n}\\sum (x_i - \\bar{x})^2}$. For non-Gaussian distributions (like Gamma or Beta), SciPy runs numerical optimizers to find MLE parameters.",
    hint: "dist.fit(data) returns optimal shape, loc, and scale parameters.",
    level: "moderate",
    codeExample: "from scipy.stats import norm\nimport numpy as np\n\nsample_data = np.array([48.2, 51.1, 49.8, 52.4, 47.9, 50.5])\nmu_est, sigma_est = norm.fit(sample_data)\nprint(f'Estimated Gaussian: mu={mu_est:.2f}, sigma={sigma_est:.2f}')"
  },
  {
    question: "What is the Percent Point Function (`.ppf()`) used for in Machine Learning hypothesis testing and confidence intervals?",
    shortAnswer: "It determines critical z-scores, t-values, and threshold boundaries corresponding to given confidence levels (e.g. 95% or 99%).",
    explanation: "To determine the critical value for a two-tailed 95% confidence interval ($\\alpha = 0.05$), we need the 97.5th percentile ($1 - \\alpha/2$). `norm.ppf(0.975)` yields the famous critical value $1.95996 \\approx 1.96$. For a 99% interval, `norm.ppf(0.995)` yields $2.576$.",
    hint: "PPF is the mathematical inverse of the CDF: PPF(CDF(x)) = x.",
    level: "advanced",
    codeExample: "from scipy.stats import norm, t\n\n# Critical z-score for 95% two-tailed confidence level\nz_crit_95 = norm.ppf(0.975)\n# Critical t-score with 15 degrees of freedom\nt_crit_95 = t.ppf(0.975, df=15)\nprint('Z critical (95%):', z_crit_95) # ~1.960\nprint('T critical (df=15, 95%):', t_crit_95) # ~2.131"
  }
];

export default questions;
