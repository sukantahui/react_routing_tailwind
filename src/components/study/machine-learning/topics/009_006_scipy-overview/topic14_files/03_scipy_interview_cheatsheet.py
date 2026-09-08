"""
Topic 14: Master SciPy Technical Interview Cheat Sheet
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

cheat_sheet = {
    "Z-score Formula"           : "Z = (X - \mu) / \sigma",
    "Empirical Rule"           : "68% (1\sigma), 95% (2\sigma), 99.7% (3\sigma)",
    "Norm Distribution API"    : "norm.pdf(x), norm.cdf(x), norm.ppf(q), norm.rvs(n)",
    "Hypothesis Testing"       : "p < \alpha -> Reject H0 (Significant effect)",
    "Distance Metrics"         : "euclidean (L2), cityblock (L1), cosine, chebyshev (L_inf)",
    "Batch Pairwise Distances" : "cdist(XA, XB), pdist(X)",
    "Matrix Operations"        : "solve(A, b), inv(A), det(A), eig(A), svd(A)",
    "Loss Optimization"        : "minimize(fun, x0, method='BFGS' | 'Nelder-Mead')"
}

print("=========================================================================")
print("SCIPY INTERVIEW & VIVA CHEAT SHEET")
print("=========================================================================")
for topic, formula in cheat_sheet.items():
    print(f" • {topic:<26} : {formula}")
print("=========================================================================")
