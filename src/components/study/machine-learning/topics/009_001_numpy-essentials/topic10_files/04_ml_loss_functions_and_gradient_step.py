"""
================================================================================
Topic 10 - Script 04: Vectorized ML Loss Functions & Gradient Updates
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Implementing Mean Squared Error (MSE): 1/N * sum((y_pred - y_true)**2)
- Implementing Mean Absolute Error (MAE): 1/N * sum(abs(y_pred - y_true))
- Performing vectorized Gradient Descent parameter updates: w -= lr * grad_w
================================================================================
"""

import numpy as np

def demonstrate_ml_arithmetic():
    print("=" * 65)
    print("1. VECTORIZED LOSS FUNCTION IMPLEMENTATION")
    print("=" * 65)

    # Ground truth student marks
    y_true = np.array([85.0, 92.0, 78.0, 90.0, 65.0])
    # Model predictions
    y_pred = np.array([80.0, 95.0, 75.0, 88.0, 70.0])

    print("Ground Truth y_true :", y_true)
    print("Predictions  y_pred :", y_pred)

    # Raw residuals / error vector
    errors = y_pred - y_true
    print("\nResiduals (y_pred - y_true):", errors)

    # 1. Mean Squared Error (MSE Loss)
    mse = np.mean(errors ** 2)
    print(f"Mean Squared Error (MSE)   : {mse:.2f}")

    # 2. Mean Absolute Error (MAE Loss)
    mae = np.mean(np.abs(errors))
    print(f"Mean Absolute Error (MAE)  : {mae:.2f}")

    print("\n" + "=" * 65)
    print("2. VECTORIZED GRADIENT DESCENT STEP")
    print("=" * 65)
    
    # Weights vector for 3 features: [w1, w2, w3]
    weights = np.array([1.5, 0.8, -0.4])
    # Gradients computed during backward pass: dL/dw
    grad_w = np.array([0.25, -0.10, 0.05])
    # Learning rate (eta)
    lr = 0.01

    print("Initial Weights:", weights)
    print("Gradients (dL) :", grad_w)

    # In-place parameter update: w = w - lr * grad_w
    weights -= lr * grad_w
    print("Updated Weights:", weights)

if __name__ == "__main__":
    demonstrate_ml_arithmetic()
