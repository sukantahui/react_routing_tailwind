"""
04_ml_synthetic_dataset_and_weight_init.py
==========================================
Topic: ML Applications: Synthetic Dataset Generation & Neural Network Weight Initialization
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def generate_synthetic_regression(N: int = 100, noise_std: float = 1.5, seed: int = 42):
    """Generates synthetic data: y = 3.5*x1 - 2.0*x2 + 10.0 + Gaussian Noise."""
    rng = np.random.default_rng(seed=seed)
    
    # 2 input features: x1 (Study hours ~ Uniform[1, 10]), x2 (Absences ~ Uniform[0, 5])
    X = np.empty((N, 2))
    X[:, 0] = rng.uniform(1.0, 10.0, size=N)
    X[:, 1] = rng.uniform(0.0, 5.0, size=N)
    
    # True weights: w1 = 3.5, w2 = -2.0, bias = 10.0
    true_weights = np.array([3.5, -2.0])
    true_bias = 10.0
    
    # Gaussian noise epsilon ~ N(0, noise_std^2)
    noise = rng.normal(loc=0.0, scale=noise_std, size=N)
    
    y = (X @ true_weights) + true_bias + noise
    return X, y

def xavier_glorot_weight_init(d_in: int, d_out: int, seed: int = 42) -> np.ndarray:
    """Xavier / Glorot Normal initialization for Neural Network Layers."""
    rng = np.random.default_rng(seed=seed)
    # std = sqrt(2 / (d_in + d_out))
    std = np.sqrt(2.0 / (d_in + d_out))
    W = rng.normal(loc=0.0, scale=std, size=(d_in, d_out))
    return W

def main():
    print("=" * 70)
    print("ML WORKFLOWS: SYNTHETIC DATASET GENERATION & WEIGHT INIT")
    print("=" * 70)

    # 1. Generating synthetic regression dataset
    X, y = generate_synthetic_regression(N=5, noise_std=0.5, seed=42)
    print("1. Synthetic Regression Dataset (5 samples):")
    print("   Features X (Hours, Absences):\n", np.round(X, 2))
    print("   Labels y (Exam Marks)        :\n", np.round(y, 2))

    # 2. Xavier / Glorot Weight Initialization for Deep Learning
    # Suppose Input layer has 128 units, Hidden layer has 64 units
    d_in, d_out = 128, 64
    W = xavier_glorot_weight_init(d_in, d_out)
    
    print(f"\n2. Xavier Weight Initialization (Shape: {W.shape}):")
    print(f"   Theoretical Std : {np.sqrt(2.0 / (d_in + d_out)):.4f}")
    print(f"   Sample Mean     : {np.mean(W):.4f} (Close to 0.0)")
    print(f"   Sample Std      : {np.std(W):.4f}")
    print("   Weight Matrix Preview (Top 2x3):\n", np.round(W[:2, :3], 4))

if __name__ == "__main__":
    main()
