"""
02_synthetic_polynomial_regression_pipeline.py
==============================================
Worked Example 4: Synthesizing Non-Linear Polynomial Regression Data & Expansion
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def generate_polynomial_data(N: int = 100, noise_std: float = 2.0, seed: int = 42):
    """Generates non-linear curve: y = 0.5*x^2 - 3.0*x + 5.0 + Gaussian Noise."""
    rng = np.random.default_rng(seed=seed)
    
    # 1D feature x sampled uniformly between [-5, 10]
    x = rng.uniform(-5.0, 10.0, size=(N, 1))
    
    # True non-linear ground truth function
    y_true = 0.5 * (x ** 2) - 3.0 * x + 5.0
    
    # Additive Gaussian noise
    noise = rng.normal(loc=0.0, scale=noise_std, size=(N, 1))
    y_noisy = y_true + noise
    
    return x, y_noisy.ravel(), y_true.ravel()

def polynomial_features_degree_2(x: np.ndarray) -> np.ndarray:
    """Manually expands 1D feature x into design matrix [1, x, x^2]."""
    ones = np.ones_like(x)
    x_squared = x ** 2
    # np.hstack to join (N, 1), (N, 1), (N, 1) => (N, 3)
    return np.hstack((ones, x, x_squared))

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 4: SYNTHETIC POLYNOMIAL REGRESSION DATASET")
    print("=" * 70)

    x, y_noisy, y_true = generate_polynomial_data(N=6, noise_std=1.0, seed=42)
    print("1. Generated 1D Feature x (Top 6):\n", np.round(x, 2))
    print("2. Noisy Labels y (Ground Truth + Noise):\n", np.round(y_noisy, 2))

    # Polynomial expansion for Linear Regression
    X_poly = polynomial_features_degree_2(x)
    print("\n3. Polynomial Design Matrix [1 | x | x^2] Shape:", X_poly.shape)
    print("   Design Matrix Preview:\n", np.round(X_poly, 2))

if __name__ == "__main__":
    main()
