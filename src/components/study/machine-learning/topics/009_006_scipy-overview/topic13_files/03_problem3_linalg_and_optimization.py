"""
Topic 13: Practice Problem 3 - System Solver & Loss Function Optimization
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import linalg, optimize

# Part A: Solve linear system 5x + 3y = 21, 2x + 7y = 20
A = np.array([[5.0, 3.0], [2.0, 7.0]])
b = np.array([21.0, 20.0])
sol = linalg.solve(A, b)
print("--- Problem 3A: Linear Solver ---")
print(f"Solution vector [x, y]: {sol.round(4)}")

# Part B: Minimize multi-variable cost function J(w1, w2) = (w1 - 3)^2 + (w2 + 5)^2 + 8
def cost_func(w):
    return (w[0] - 3.0)**2 + (w[1] + 5.0)**2 + 8.0

res = optimize.minimize(cost_func, x0=[0.0, 0.0], method='BFGS')
print("\n--- Problem 3B: Loss Optimization ---")
print(f"Optimal weights [w1, w2]: {res.x.round(4)} (Expected: [3.0, -5.0])")
print(f"Minimum cost value      : {res.fun:.4f} (Expected: 8.0)")
