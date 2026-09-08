"""
04_ml_forward_pass_linear_layer.py
==================================
Topic: ML Neural Network Dense Layer Forward Pass (Z = X @ W + b) & OLS Normal Equation
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("MACHINE LEARNING FORWARD PASS & NORMAL EQUATION")
    print("=" * 70)

    # 1. Neural Network Linear / Dense Layer Forward Pass
    # Batch size N = 4 samples, Input features D_in = 3
    # Output neurons D_out = 2 (e.g. Pass probability, Merit probability)
    np.random.seed(42)

    X = np.array([
        [85, 90, 88],  # Debangshu
        [92, 95, 91],  # Susmita
        [65, 70, 72],  # Swadeep
        [88, 85, 94]   # Tuhina
    ], dtype=np.float64)

    # Weights matrix: shape (D_in, D_out) = (3, 2)
    W = np.random.randn(3, 2) * 0.01
    # Bias vector: shape (D_out,) = (2,)
    b = np.array([0.5, -0.2])

    print(f"Input batch X shape     : {X.shape} (N=4, D_in=3)")
    print(f"Weights W shape         : {W.shape} (D_in=3, D_out=2)")
    print(f"Bias b shape            : {b.shape} (D_out=2)")

    # Linear transformation: Z = X @ W + b
    # (4, 3) @ (3, 2) -> (4, 2) + (2,) via broadcasting -> (4, 2)
    Z = (X @ W) + b
    print(f"\nForward Pass Output Logits Z shape: {Z.shape}")
    print("Z (Logits):\n", np.round(Z, 4))

    # 2. Ordinary Least Squares (OLS) Normal Equation: theta = (X^T @ X)^(-1) @ X^T @ y
    print("\n" + "=" * 50)
    print("ORDINARY LEAST SQUARES (NORMAL EQUATION) DEMO")
    print("=" * 50)

    # Synthetic 1D regression with bias term prepended
    # X_reg: [1.0, Study_Hours]
    X_reg = np.array([
        [1.0, 2.0],  # 2 hrs study -> marks: 50
        [1.0, 4.0],  # 4 hrs study -> marks: 70
        [1.0, 6.0],  # 6 hrs study -> marks: 85
        [1.0, 8.0]   # 8 hrs study -> marks: 95
    ])
    y = np.array([50.0, 70.0, 85.0, 95.0])

    # Compute theta = inv(X^T @ X) @ X^T @ y
    XtX = X_reg.T @ X_reg
    XtX_inv = np.linalg.inv(XtX)
    Xty = X_reg.T @ y
    theta = XtX_inv @ Xty

    print(f"Learned Parameters [Intercept, Slope]: {np.round(theta, 4)}")
    print(f"Regression Line: y_pred = {theta[0]:.2f} + {theta[1]:.2f} * Hours")

    # Predict marks for 5 hours of study
    pred_5_hrs = np.array([1.0, 5.0]) @ theta
    print(f"Prediction for 5 hours of study: {pred_5_hrs:.2f} marks")

if __name__ == "__main__":
    main()
