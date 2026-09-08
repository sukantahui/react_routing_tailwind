"""
01_multivariate_classification_clusters.py
==========================================
Worked Example 4: Synthesizing Multi-Class Gaussian Clusters via multivariate_normal
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def generate_gaussian_clusters(n_samples_per_class: int = 50, seed: int = 42):
    """Generates 3 distinct 2D Gaussian clusters for classification benchmarks."""
    rng = np.random.default_rng(seed=seed)
    
    # Class 0: Center at (-3.0, -3.0), Covariance spherical
    mean_0 = [-3.0, -3.0]
    cov_0  = [[1.0, 0.2], [0.2, 1.0]]
    X_0 = rng.multivariate_normal(mean=mean_0, cov=cov_0, size=n_samples_per_class)
    y_0 = np.zeros(n_samples_per_class, dtype=int)
    
    # Class 1: Center at (3.0, 3.0), Diagonal Covariance
    mean_1 = [3.0, 3.0]
    cov_1  = [[1.2, -0.4], [-0.4, 1.2]]
    X_1 = rng.multivariate_normal(mean=mean_1, cov=cov_1, size=n_samples_per_class)
    y_1 = np.ones(n_samples_per_class, dtype=int)
    
    # Class 2: Center at (0.0, 4.0), Elliptical Covariance
    mean_2 = [0.0, 4.0]
    cov_2  = [[0.8, 0.0], [0.0, 0.8]]
    X_2 = rng.multivariate_normal(mean=mean_2, cov=cov_2, size=n_samples_per_class)
    y_2 = np.full(n_samples_per_class, fill_value=2, dtype=int)
    
    # Vertically stack all clusters: (150, 2)
    X = np.vstack((X_0, X_1, X_2))
    y = np.concatenate((y_0, y_1, y_2))
    
    # Shuffle synchronously using permutation indices
    perm = rng.permutation(len(X))
    return X[perm], y[perm]

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 4: MULTIVARIATE GAUSSIAN CLUSTER GENERATION")
    print("=" * 70)

    X, y = generate_gaussian_clusters(n_samples_per_class=4, seed=42)
    print(f"Total Dataset Shape: X={X.shape}, y={y.shape}")
    print("\nSynthesized Feature Matrix X (Top 8 samples):\n", np.round(X[:8], 3))
    print("\nClass Labels y (Top 8 samples):\n", y[:8])

    # Class balance check
    unique, counts = np.unique(y, return_counts=True)
    print("\nClass Distribution:", dict(zip(unique, counts)))

if __name__ == "__main__":
    main()
