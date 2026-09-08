"""
Topic 14: Short Questions & Viva Suite 2 - Statistical Testing & Spatial
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

# Q3: What is the decision threshold rule for p-values in hypothesis testing?
# A3: If p-value < \alpha (typically 0.05), reject H0 (statistically significant).
#     If p-value >= \alpha, fail to reject H0 (insufficient evidence).

# Q4: Difference between scipy.spatial.distance.cdist and pdist?
# A4: cdist(XA, XB) computes cross-distances between two separate matrices.
#     pdist(X) computes condensed pairwise distances within a single matrix.

# Q5: Why is scipy.linalg.solve(A, b) better than inv(A) @ b?
# A5: solve() utilizes direct LU/Cholesky factorization, being ~2x faster and
#     avoiding catastrophic numerical round-off cancellation errors.

print("--- Viva Suite 2: Advanced Statistical & Spatial QA Loaded ---")
