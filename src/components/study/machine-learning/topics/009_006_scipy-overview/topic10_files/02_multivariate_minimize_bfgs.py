"""
Topic 10: Multi-Variable Loss Minimization with BFGS & Nelder-Mead
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import optimize

# Rosenbrock Banana function (classic optimization benchmark):
# f(x, y) = 100 * (y - x^2)^2 + (1 - x)^2
# Global minimum is at (x=1, y=1) where f(x,y)=0
def rosenbrock(params):
    x, y = params
    return 100.0 * (y - x**2)**2 + (1.0 - x)**2

# Initial guess far from the minimum
initial_guess = np.array([-1.5, 2.0])

# Minimize using BFGS (quasi-Newton method utilizing gradient estimates)
res_bfgs = optimize.minimize(rosenbrock, initial_guess, method='BFGS')

print("--- Multi-Variable BFGS Minimization ---")
print(f"Convergence Success : {res_bfgs.success}")
print(f"Optimal Parameters  : x = {res_bfgs.x[0]:.4f}, y = {res_bfgs.x[1]:.4f}")
print(f"Minimum Value f(x,y): {res_bfgs.fun:.8f}")
print(f"Total Iterations    : {res_bfgs.nit}")
