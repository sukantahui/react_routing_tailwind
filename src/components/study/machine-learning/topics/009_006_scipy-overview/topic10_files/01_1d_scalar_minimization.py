"""
Topic 10: 1D Scalar Cost Function Minimization with scipy.optimize
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

from scipy import optimize

# Objective Loss Function: f(x) = (x - 4)^2 + 10
# Minimum should occur at x = 4 with minimum cost = 10
def loss_function(x):
    return (x - 4.0)**2 + 10.0

# 1. 1D Scalar optimization using Brent's method
result = optimize.minimize_scalar(loss_function, bracket=(-10, 10))

print("--- 1D Scalar Function Optimization ---")
print(f"Success Status       : {result.success}")
print(f"Optimal x (Parameter): {result.x:.6f}  (Expected ~4.0)")
print(f"Minimum Loss Value   : {result.fun:.6f}  (Expected ~10.0)")
print(f"Function Evaluations : {result.nfev}")
