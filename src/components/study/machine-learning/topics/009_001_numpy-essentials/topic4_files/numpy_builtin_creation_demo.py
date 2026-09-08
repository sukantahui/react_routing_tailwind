# numpy_builtin_creation_demo.py
# NumPy Essentials — Topic 4: Built-in Array Creation Functions
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of NumPy's built-in array creation functions:
  1. np.zeros() and np.zeros_like()
  2. np.ones(), np.ones_like(), and adding bias column to ML feature matrix
  3. np.full() and np.full_like()
  4. np.empty() and memory allocation caution
  5. np.eye() and np.identity() for Ridge Regression L2 regularization
  6. np.arange() — step-based sequences and floating point precision
  7. np.linspace() — count-based evenly spaced grids and retstep
  8. np.logspace() — hyperparameter search grids for learning rate / alpha
"""

import numpy as np

print("=" * 68)
print("  NUMPY ESSENTIALS — Topic 4: Array Creation Functions")
print("  np.zeros, np.ones, np.full, np.eye, np.arange, np.linspace")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# ── 1. np.zeros() & np.zeros_like() ───────────────────────────────────────────
print("\n[1] np.zeros() & np.zeros_like() — Weight & Gradient Initialization")
# Initialize 3x4 weight matrix for Neural Network layers
w_zeros = np.zeros((3, 4), dtype=np.float32)
print(f"    3x4 Weights (float32):\n{w_zeros}")
print(f"    shape: {w_zeros.shape} | dtype: {w_zeros.dtype} | bytes: {w_zeros.nbytes}")

# Template cloning with zeros_like
template = np.array([[75.5, 88.0], [92.1, 95.4]])
cloned_zeros = np.zeros_like(template)
print(f"    Cloned shape & dtype from template:\n{cloned_zeros}")

# ── 2. np.ones() & Bias Intercept Insertion ──────────────────────────────────
print("\n[2] np.ones() — Adding Bias Column (x0=1) to ML Feature Matrix")
# Original feature matrix X: 3 students in Barrackpore (Python, ML)
X_features = np.array([
    [75, 88],  # Sachin
    [92, 95],  # Mahima
    [68, 74]   # Susmita
], dtype=np.float64)

# Create bias column of 1s (shape: 3 samples x 1)
bias_col = np.ones((X_features.shape[0], 1), dtype=np.float64)
X_with_bias = np.hstack([bias_col, X_features])
print(f"    Original Features X (3x2):\n{X_features}")
print(f"    Augmented X with Bias Column [x0, x1, x2] (3x3):\n{X_with_bias}")

# ── 3. np.full() & np.full_like() ────────────────────────────────────────────
print("\n[3] np.full() — Constant Value Initialization")
# Default baseline prediction or fill value
baseline_grid = np.full((2, 3), fill_value=50.0, dtype=np.float32)
print(f"    2x3 Grid filled with 50.0:\n{baseline_grid}")

# ── 4. np.empty() — Fast Uninitialized Allocation ────────────────────────────
print("\n[4] np.empty() — Uninitialized Allocation (C RAM Garbage)")
empty_arr = np.empty((2, 3), dtype=np.float64)
print(f"    Allocated instantly without zeroing RAM (contains raw bytes):\n{empty_arr}")

# ── 5. np.eye() & Identity Matrices in Regularized Regression ────────────────
print("\n[5] np.eye() — Identity Matrix for Ridge Regularization (L2)")
# Identity matrix I for normal equation: (X^T X + lambda * I)^(-1) X^T y
I_matrix = np.eye(3, dtype=np.float64)
lambda_param = 0.5
print(f"    Identity Matrix I (3x3):\n{I_matrix}")
print(f"    lambda * I Penalty Matrix (lambda = {lambda_param}):\n{lambda_param * I_matrix}")

# ── 6. np.arange() — Step-Based Sequence Generation ──────────────────────────
print("\n[6] np.arange() — Step-Based Sequence (start, stop, step)")
int_range = np.arange(0, 10, 2)
print(f"    np.arange(0, 10, 2)  : {int_range} (stop 10 is EXCLUSIVE)")

# Float step in arange (caution with floating point precision)
float_range = np.arange(0.0, 1.0, 0.2)
print(f"    np.arange(0, 1, 0.2) : {float_range}")

# ── 7. np.linspace() — Count-Based Evenly Spaced Grids ───────────────────────
print("\n[7] np.linspace() — Count-Based Evenly Spaced Values (start, stop, num)")
# Generate 5 test input points between 0 and 1 (INCLUSIVE of endpoint 1.0)
grid_5, step_size = np.linspace(0.0, 1.0, num=5, retstep=True)
print(f"    np.linspace(0, 1, 5) : {grid_5}")
print(f"    Computed step size   : {step_size} (exact 0.25 spacing)")

# Regression loss curve test points from -5.0 to +5.0
loss_curve_x = np.linspace(-5.0, 5.0, num=11)
print(f"    11 points from -5 to +5: {loss_curve_x}")

# ── 8. np.logspace() — Hyperparameter Grid Search ────────────────────────────
print("\n[8] np.logspace() — Geometric Learning Rate Grids (base 10)")
# 5 learning rates from 10^-4 to 10^0 (0.0001, 0.001, 0.01, 0.1, 1.0)
learning_rates = np.logspace(-4, 0, num=5)
print(f"    Learning rates grid  : {learning_rates}")
print(f"    Formatted scientific : {[f'{lr:.4f}' for lr in learning_rates]}")

# ── 9. arange vs linspace Comparison ─────────────────────────────────────────
print("\n[9] Key Difference: arange vs linspace")
print(f"    np.arange(0, 10, 3)  → Step size 3   → {np.arange(0, 10, 3)} (ends before 10)")
print(f"    np.linspace(0, 10, 4)→ 4 points total→ {np.linspace(0, 10, 4)} (includes 10.0)")

print("\n" + "=" * 68)
print("  Summary: Built-in creation functions avoid slow Python loops.")
print("  Use linspace for plotting/grids and zeros/ones for ML models.")
print("=" * 68)
