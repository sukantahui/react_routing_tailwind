"""
Topic 8: Linear Models
Script 3: Ridge vs Lasso vs ElasticNet (Regularized Linear Models)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet

# Highly collinear / multi-feature toy data
np.random.seed(42)
X = np.random.randn(20, 5)
# True target depends strongly only on feature 0 and feature 2
y = 3.5 * X[:, 0] - 2.0 * X[:, 2] + np.random.randn(20) * 0.1

# 1. Standard OLS LinearRegression
ols = LinearRegression().fit(X, y)

# 2. Ridge Regression (L2 penalty: shrinks weights smoothly towards 0)
ridge = Ridge(alpha=1.0).fit(X, y)

# 3. Lasso Regression (L1 penalty: creates exact sparsity by zeroing irrelevant weights)
lasso = Lasso(alpha=0.2).fit(X, y)

# 4. ElasticNet (Combines L1 and L2 penalties)
elastic = ElasticNet(alpha=0.2, l1_ratio=0.5).fit(X, y)

print("--- Comparison of Learned Coefficients (coef_) ---")
print(f"OLS:        {np.round(ols.coef_, 3)}")
print(f"Ridge (L2): {np.round(ridge.coef_, 3)}")
print(f"Lasso (L1): {np.round(lasso.coef_, 3)}  <-- Notice zeroed coefficients!")
print(f"ElasticNet: {np.round(elastic.coef_, 3)}")
