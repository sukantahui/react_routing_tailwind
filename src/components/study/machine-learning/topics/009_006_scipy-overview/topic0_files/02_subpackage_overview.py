"""
Topic 0: Subpackage Quick Overview
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

from scipy import stats, spatial, linalg, optimize
import numpy as np

# 1. scipy.stats example
data = [12, 15, 12, 18, 22, 25, 12, 30]
mean_val = np.mean(data)
mode_val = stats.mode(data, keepdims=False)
print(f"Data: {data}")
print(f"Mean: {mean_val:.2f}, Mode: {mode_val.mode} (count: {mode_val.count})")

# 2. scipy.spatial distance
pt_a = np.array([1, 2])
pt_b = np.array([4, 6])
euc_dist = spatial.distance.euclidean(pt_a, pt_b)
print(f"Euclidean distance between {pt_a} and {pt_b}: {euc_dist:.4f}")

# 3. scipy.linalg determinant
matrix_a = np.array([[2, 3], [1, 4]])
det_val = linalg.det(matrix_a)
print(f"Determinant of matrix:\n{matrix_a}\nDet = {det_val:.2f}")

# 4. scipy.optimize 1D quadratic minimum: f(x) = (x - 3)^2 + 5
res = optimize.minimize_scalar(lambda x: (x - 3)**2 + 5)
print(f"Optimal x: {res.x:.4f}, Minimum value: {res.fun:.4f}")
