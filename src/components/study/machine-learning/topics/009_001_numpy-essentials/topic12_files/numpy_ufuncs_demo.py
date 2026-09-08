# numpy_ufuncs_demo.py
# NumPy Essentials — Topic 12: Universal Functions (ufuncs)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of Universal Functions (ufuncs) in NumPy:
  1. Unary ufuncs: np.sqrt, np.exp, np.log, np.abs, np.sin, np.round
  2. Binary ufuncs: np.add, np.maximum, np.minimum, np.power
  3. Advanced ufunc methods: .reduce(), .accumulate(), .outer(), .at()
  4. Memory-saving 'out' parameter demonstration
  5. Machine Learning Workflows:
     - Sigmoid Activation Function: 1 / (1 + exp(-z))
     - Numerically Stable Softmax Function: exp(z - max) / sum(exp)
     - Binary Cross-Entropy (Log-Loss) computation
     - ReLU Activation via np.maximum(0, x)
"""

import numpy as np

print("=" * 72)
print("  NUMPY ESSENTIALS — Topic 12: Universal Functions (ufuncs)")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 72)

# ── 1. Unary Universal Functions ─────────────────────────────────────────────
print("\n[1] Unary ufuncs (Single Array Input)")
raw_logits = np.array([-2.5, 0.0, 1.2, 3.8, -0.4])
print(f"    Raw Logits: {raw_logits}")

print(f"    np.abs(x)   : {np.abs(raw_logits)}")
print(f"    np.exp(x)   : {np.round(np.exp(raw_logits), 3)}")
# Natural logarithm of positive numbers
pos_values = np.array([1.0, 2.718, 10.0, 100.0])
print(f"    np.log(pos) : {np.round(np.log(pos_values), 3)}")
print(f"    np.sqrt([4, 9, 16, 25]): {np.sqrt(np.array([4, 9, 16, 25]))}")

# ── 2. Binary Universal Functions ────────────────────────────────────────────
print("\n[2] Binary ufuncs (Two Array Inputs)")
arr1 = np.array([10, 45, 80, 25])
arr2 = np.array([30, 20, 95, 15])
print(f"    Array 1: {arr1}")
print(f"    Array 2: {arr2}")

print(f"    np.maximum(arr1, arr2) : {np.maximum(arr1, arr2)}")
print(f"    np.minimum(arr1, arr2) : {np.minimum(arr1, arr2)}")
print(f"    np.power(arr1, 2)      : {np.power(arr1, 2)}")

# ── 3. Advanced ufunc Methods (.reduce, .accumulate, .outer, .at) ────────────
print("\n[3] Advanced ufunc Methods on Binary ufuncs")
seq = np.array([1, 2, 3, 4, 5])
print(f"    Input Sequence: {seq}")

# .reduce(): Collapses array along axis
print(f"    np.add.reduce(seq)        (Sum)      : {np.add.reduce(seq)}")
print(f"    np.multiply.reduce(seq)   (Factorial): {np.multiply.reduce(seq)}")

# .accumulate(): Running cumulative accumulation
print(f"    np.add.accumulate(seq)    (Cumsum)   : {np.add.accumulate(seq)}")
print(f"    np.multiply.accumulate(seq)(Cumprod) : {np.multiply.accumulate(seq)}")

# .outer(): Outer operation table
mult_table = np.multiply.outer([1, 2, 3], [10, 20, 30])
print(f"    np.multiply.outer([1,2,3], [10,20,30]):\n{mult_table}")

# .at(): Unbuffered in-place modification at repeated indices
accum_arr = np.zeros(5, dtype=np.int32)
np.add.at(accum_arr, [0, 0, 1], 10)
print(f"    np.add.at([0,0,1], 10) on zeros(5)   : {accum_arr}")

# ── 4. The 'out' Parameter: Zero Memory Allocations in Loops ─────────────────
print("\n[4] The 'out' Parameter Demonstration")
large_arr = np.array([16.0, 25.0, 36.0, 49.0])
print(f"    Before np.sqrt(large_arr, out=large_arr): {large_arr}")
np.sqrt(large_arr, out=large_arr)
print(f"    After in-place ufunc execution         : {large_arr} (Buffer mutated directly!)")

# ── 5. Machine Learning Real-World Workflows ─────────────────────────────────
print("\n[5] Machine Learning Real-World Implementations")

# A. Sigmoid Activation Function: sigma(z) = 1 / (1 + exp(-z))
z = np.array([-5.0, -1.0, 0.0, 1.0, 5.0])
sigmoid_z = 1.0 / (1.0 + np.exp(-z))
print(f"    A. Sigmoid Activation:\n       Input: {z}\n       Output: {np.round(sigmoid_z, 4)}")

# B. Numerically Stable Softmax (Multi-Class Probability Distribution)
logits = np.array([2.0, 1.0, 0.1])
# Shift by max logit to prevent np.exp overflow
exp_shifted = np.exp(logits - np.max(logits))
softmax_probs = exp_shifted / np.sum(exp_shifted)
print(f"    B. Softmax Probabilities (Sum = {np.sum(softmax_probs):.1f}):\n       {np.round(softmax_probs, 4)}")

# C. Binary Cross-Entropy Loss (Log-Loss)
y_true = np.array([1, 0, 1, 1])
y_pred_probs = np.array([0.9, 0.1, 0.8, 0.4])
eps = 1e-15 # prevent log(0)
bce_loss = -np.mean(y_true * np.log(y_pred_probs + eps) + (1 - y_true) * np.log(1 - y_pred_probs + eps))
print(f"    C. Binary Cross-Entropy Loss: {bce_loss:.4f}")

# D. ReLU Activation via np.maximum
neural_inputs = np.array([-3.5, 2.1, -0.2, 4.8, -1.0])
relu_outputs = np.maximum(0.0, neural_inputs)
print(f"    D. ReLU via np.maximum(0, x): {relu_outputs}")

print("\n" + "=" * 72)
print("  Summary: ufuncs form the computational engine of NumPy, enabling")
print("  fast, vectorized neural activation functions and loss computations.")
print("=" * 72)
