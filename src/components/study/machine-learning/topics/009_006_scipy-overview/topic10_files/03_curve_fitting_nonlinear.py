"""
Topic 10: Non-Linear Regression & Curve Fitting with scipy.optimize.curve_fit
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import optimize

# Simulated exponential growth data (e.g. user adoption rate in Barrackpore tech hub)
# Theoretical model: y = a * exp(b * x)
x_data = np.linspace(0, 4, 20)
y_clean = 2.5 * np.exp(0.8 * x_data)
# Add realistic measurement noise
np.random.seed(42)
y_noisy = y_clean + np.random.normal(0, 0.5, size=len(x_data))

# Model function to fit
def exp_model(x, a, b):
    return a * np.exp(b * x)

# Non-linear least squares fit
params, covariance = optimize.curve_fit(exp_model, x_data, y_noisy, p0=[1.0, 1.0])

a_fit, b_fit = params
print("--- Non-Linear Least Squares Curve Fit ---")
print(f"Estimated Parameter a (Initial Scale): {a_fit:.4f}  (True ~ 2.5)")
print(f"Estimated Parameter b (Growth Rate)  : {b_fit:.4f}  (True ~ 0.8)")
print(f"Parameter Standard Errors: {np.sqrt(np.diag(covariance)).round(4)}")
