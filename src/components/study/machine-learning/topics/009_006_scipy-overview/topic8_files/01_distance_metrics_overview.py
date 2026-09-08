"""
Topic 8: Spatial Distance Metrics in scipy.spatial.distance
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy.spatial import distance

# Two 2D feature points (e.g. house area and distance from Kolkata metro)
pt_a = np.array([2.0, 3.0])
pt_b = np.array([6.0, 7.0])

# 1. Euclidean Distance (L2 norm) : \sqrt{\sum (u_i - v_i)^2}
d_euclid = distance.euclidean(pt_a, pt_b)

# 2. Manhattan / Cityblock Distance (L1 norm) : \sum |u_i - v_i|
d_manhattan = distance.cityblock(pt_a, pt_b)

# 3. Chebyshev Distance (L_\infty norm) : \max |u_i - v_i|
d_chebyshev = distance.chebyshev(pt_a, pt_b)

# 4. Cosine Distance : 1 - (u \cdot v) / (||u|| ||v||)
d_cosine = distance.cosine(pt_a, pt_b)

# 5. Minkowski Distance (generalized Lp norm, e.g. p=3)
d_minkowski = distance.minkowski(pt_a, pt_b, p=3)

print("--- Distance Calculations between Point A and Point B ---")
print(f"Point A: {pt_a}, Point B: {pt_b}\n")
print(f"1. Euclidean (L2) Distance  : {d_euclid:.4f}")
print(f"2. Manhattan (L1) Distance  : {d_manhattan:.4f}")
print(f"3. Chebyshev (L_inf)        : {d_chebyshev:.4f}")
print(f"4. Cosine Distance (1-cos)  : {d_cosine:.4f}")
print(f"5. Minkowski (p=3) Distance : {d_minkowski:.4f}")
