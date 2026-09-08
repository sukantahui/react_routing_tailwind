"""
Topic 4: Discrete Probability Distributions: Binomial & Poisson
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

from scipy import stats

# 1. Binomial Distribution: Probability of k successes in n trials with p success rate
# Example: 10 customer website visits in Shyamnagar, 30% conversion probability (p=0.30)
n_trials = 10
p_success = 0.30
binom_dist = stats.binom(n=n_trials, p=p_success)

# Probability Mass Function (PMF): P(X = 3 conversions)
p_exactly_3 = binom_dist.pmf(3)
print("--- Binomial Distribution (n=10, p=0.30) ---")
print(f"P(Exactly 3 conversions) : {p_exactly_3 * 100:.2f}%")
print(f"P(At most 3 conversions) : {binom_dist.cdf(3) * 100:.2f}%")

# 2. Poisson Distribution: Rate of events occurring in fixed time interval (mu = lambda)
# Example: Server receiving on average 5 API requests per second
poisson_dist = stats.poisson(mu=5)
print("\n--- Poisson Distribution (mu=5 requests/sec) ---")
print(f"P(Exactly 5 requests)    : {poisson_dist.pmf(5) * 100:.2f}%")
print(f"P(More than 8 requests)  : {(1 - poisson_dist.cdf(8)) * 100:.2f}% (Surge alert)")
