"""
================================================================================
Topic 12 - Script 04: Vectorized Neural Activations & Log Loss with ufuncs
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Implementing Sigmoid: 1 / (1 + np.exp(-z))
- Implementing Numerically Stable Softmax: exp(z - max(z)) / sum(exp(z - max(z)))
- Binary Cross-Entropy Loss (Log Loss) with np.log() and clipping (np.clip)
================================================================================
"""

import numpy as np

def sigmoid(z):
    return 1.0 / (1.0 + np.exp(-z))

def softmax(z):
    # Subtract max for numerical stability (prevents np.exp() overflow to inf)
    exp_shifted = np.exp(z - np.max(z))
    return exp_shifted / np.sum(exp_shifted)

def binary_cross_entropy(y_true, y_pred):
    eps = 1e-15 # Epsilon clipping to prevent log(0) = -inf
    y_pred_clipped = np.clip(y_pred, eps, 1.0 - eps)
    loss = -np.mean(y_true * np.log(y_pred_clipped) + (1.0 - y_true) * np.log(1.0 - y_pred_clipped))
    return loss

def demonstrate_ml_ufuncs():
    print("=" * 65)
    print("1. VECTORIZED SIGMOID ACTIVATION")
    print("=" * 65)
    logits = np.array([-4.0, -1.0, 0.0, 1.0, 4.0])
    probs = sigmoid(logits)
    print("Logits (Raw scores) :", logits)
    print("Sigmoid Probabilities:", np.round(probs, 4))

    print("\n" + "=" * 65)
    print("2. NUMERICALLY STABLE SOFTMAX")
    print("=" * 65)
    class_logits = np.array([2.0, 1.0, 0.1])
    class_probs = softmax(class_logits)
    print("Class Logits :", class_logits)
    print("Softmax Probs:", np.round(class_probs, 4), f"(Sum = {np.sum(class_probs):.1f})")

    print("\n" + "=" * 65)
    print("3. BINARY CROSS-ENTROPY LOSS (LOG LOSS)")
    print("=" * 65)
    y_true = np.array([1, 0, 1, 1, 0])
    y_pred = np.array([0.92, 0.10, 0.85, 0.78, 0.20])
    bce = binary_cross_entropy(y_true, y_pred)
    print(f"Calculated Binary Cross-Entropy Loss: {bce:.4f}")

if __name__ == "__main__":
    demonstrate_ml_ufuncs()
