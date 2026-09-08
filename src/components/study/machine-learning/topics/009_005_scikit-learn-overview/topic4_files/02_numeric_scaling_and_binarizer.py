"""
Topic 4: Preprocessing with sklearn.preprocessing
Script 2: Comparing PowerTransformer, QuantileTransformer, and PolynomialFeatures
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.preprocessing import PowerTransformer, QuantileTransformer, PolynomialFeatures

# Highly skewed synthetic data (e.g. salary distributions)
np.random.seed(42)
income_data = np.random.exponential(scale=25000, size=(100, 1)) + 15000

print(f"Original Income - Min: {income_data.min():.1f}, Max: {income_data.max():.1f}, Mean: {income_data.mean():.1f}")

# 1. Box-Cox / Yeo-Johnson Power Transform for Gaussian-like distribution
pt = PowerTransformer(method='yeo-johnson')
income_gaussian = pt.fit_transform(income_data)
print(f"PowerTransformed (Yeo-Johnson) - Mean: {income_gaussian.mean():.4f}, Std: {income_gaussian.std():.4f}")

# 2. QuantileTransformer: Map to uniform or normal distribution
qt = QuantileTransformer(output_distribution='normal', random_state=42, n_quantiles=50)
income_quantiled = qt.fit_transform(income_data)
print(f"QuantileTransformed (Normal) - Mean: {income_quantiled.mean():.4f}, Std: {income_quantiled.std():.4f}")

# 3. PolynomialFeatures: Generate non-linear interaction terms
X_toy = np.array([[2, 3],
                  [4, 5]])
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X_toy)

print("\n--- Polynomial Features Generation ---")
print("Original features:\n", X_toy)
print("Polynomial features [x1, x2, x1^2, x1*x2, x2^2]:\n", X_poly)
print("Feature names generated:", poly.get_feature_names_out(['x1', 'x2']))
