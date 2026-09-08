"""
Topic 4: The Universal Distribution API Architecture
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

from scipy import stats

# Every continuous distribution in scipy.stats (norm, uniform, expon, t, chi2) 
# shares the identical, uniform object-oriented API:

# Methods:
# .pdf(x) : Probability Density Function
# .pmf(k) : Probability Mass Function (discrete)
# .cdf(x) : Cumulative Distribution Function P(X <= x)
# .sf(x)  : Survival Function 1 - CDF = P(X > x)
# .ppf(q) : Percent Point Function (Quantiles)
# .rvs()  : Random Variates Sampling
# .fit(data): Maximum Likelihood Parameter Estimation

# Example: Fitting a Student-t distribution to sample data
data_sample = [1.2, 0.9, -0.4, 1.8, 2.1, -1.1, 0.3, 0.8, -0.2]
df_est, loc_est, scale_est = stats.t.fit(data_sample)
print("--- Maximum Likelihood Estimation via .fit() ---")
print(f"Fitted Degrees of Freedom : {df_est:.2f}")
print(f"Fitted Location (Center)  : {loc_est:.2f}")
print(f"Fitted Scale (Spread)     : {scale_est:.2f}")
