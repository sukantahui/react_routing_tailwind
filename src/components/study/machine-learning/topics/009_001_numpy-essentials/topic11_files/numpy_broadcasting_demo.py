# numpy_broadcasting_demo.py
# NumPy Essentials — Topic 11: Broadcasting Concept
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of NumPy Broadcasting rules and ML workflows:
  1. Scalar and Array broadcasting: arr + scalar
  2. 2D Matrix and 1D Row Vector broadcasting: (3, 4) + (4,)
  3. 2D Matrix and 2D Column Vector broadcasting: (3, 4) + (3, 1)
  4. Outer Addition Grid: (3, 1) + (1, 4) -> (3, 4)
  5. Incompatible shape error handling: (3, 4) + (3,) -> ValueError
  6. Machine Learning Workflows:
     - Column-wise feature centering: X - X.mean(axis=0)
     - Neural Network dense layer bias addition: (X @ W) + b
     - RGB Channel-wise normalization: (img - rgb_mean) / rgb_std
     - Pairwise Euclidean distance matrix computation via newaxis
"""

import numpy as np

print("=" * 72)
print("  NUMPY ESSENTIALS — Topic 11: Broadcasting Concept")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 72)

# ── 1. Scalar to Array Broadcasting ──────────────────────────────────────────
print("\n[1] Scalar to Array Broadcasting")
scores_1d = np.array([75, 82, 90, 68])
# Scalar 5 is broadcast across all 4 elements
broadcasted_add = scores_1d + 5
print(f"    1D Scores (shape {scores_1d.shape}) : {scores_1d}")
print(f"    scores_1d + 5 (Scalar)               : {broadcasted_add}")

# ── 2. 2D Matrix and 1D Row Vector (3, 4) + (4,) ────────────────────────────
print("\n[2] 2D Matrix and 1D Row Vector Broadcasting (3, 4) + (4,)")
# 3 students (Debangshu, Susmita, Swadeep) x 4 subject marks
marks_3x4 = np.array([
    [70, 80, 85, 90],
    [65, 75, 80, 85],
    [88, 92, 95, 90]
])
# Bonus marks per subject: [5, 2, 0, 1] (shape (4,))
bonus_row = np.array([5, 2, 0, 1])

# Shape alignment: (3, 4) and (1, 4) -> result is (3, 4)
total_with_bonus = marks_3x4 + bonus_row
print(f"    Base Marks (3, 4):\n{marks_3x4}")
print(f"    Bonus Row  (4,)  : {bonus_row}")
print(f"    Result (3, 4)    :\n{total_with_bonus}")

# ── 3. 2D Matrix and 2D Column Vector (3, 4) + (3, 1) ────────────────────────
print("\n[3] 2D Matrix and 2D Column Vector Broadcasting (3, 4) + (3, 1)")
# Attendance bonus points per student (shape (3, 1))
student_attendance_bonus = np.array([[2], [5], [1]])
print(f"    Attendance Bonus (3, 1):\n{student_attendance_bonus}")

# Broadcasts across all 4 subject columns
marks_after_attendance = marks_3x4 + student_attendance_bonus
print(f"    Marks + Attendance (3, 4):\n{marks_after_attendance}")

# ── 4. Outer Addition Grid: (3, 1) + (1, 4) -> (3, 4) ────────────────────────
print("\n[4] Outer Addition Grid: (3, 1) + (1, 4) -> (3, 4)")
col_vec = np.array([[10], [20], [30]]) # shape (3, 1)
row_vec = np.array([[1, 2, 3, 4]])     # shape (1, 4)
grid_sum = col_vec + row_vec
print(f"    Column (3, 1):\n{col_vec}")
print(f"    Row    (1, 4): {row_vec}")
print(f"    Broadcasted Grid Sum (3, 4):\n{grid_sum}")

# ── 5. Incompatible Shape Error Handling ─────────────────────────────────────
print("\n[5] Incompatible Shape Error Handling: (3, 4) + (3,)")
bad_row = np.array([10, 20, 30]) # shape (3,) -> pads to (1, 3)
try:
    bad_sum = marks_3x4 + bad_row # (3, 4) vs (1, 3) -> 4 != 3 -> Error!
except ValueError as e:
    print(f"    Caught expected ValueError: {e}")
    print("    -> FIX: Reshape to column vector (3, 1): marks_3x4 + bad_row.reshape(-1, 1)")

# ── 6. Machine Learning Real-World Broadcasting Workflows ────────────────────
print("\n[6] Machine Learning Real-World Applications")

# A. Column-wise Feature Centering: (N, D) - (D,)
X = np.array([
    [170, 65, 22],
    [180, 80, 25],
    [160, 55, 20],
    [175, 70, 23]
], dtype=np.float32) # (4 samples, 3 features: Height, Weight, Age)
print(f"    A. Feature Matrix X shape: {X.shape}")

col_means = np.mean(X, axis=0) # shape (3,)
print(f"       Column Means (shape {col_means.shape}): {col_means}")

X_centered = X - col_means # (4, 3) - (3,) -> (4, 3)
print(f"       Zero-Centered Features (shape {X_centered.shape}):\n{X_centered}")

# B. Neural Network Dense Layer Bias Addition: (Batch, Out) + (Out,)
W = np.random.randn(3, 2) # 3 inputs -> 2 outputs
b = np.array([0.5, -0.2])  # 2 output biases (shape (2,))
logits = (X @ W) + b       # (4, 2) + (2,) -> (4, 2)
print(f"    B. Neural Network Logits (X @ W + b) shape: {logits.shape}")

# C. Color Image Channel Normalization: (Batch, H, W, 3) - (3,)
fake_images = np.ones((10, 32, 32, 3), dtype=np.float32) * 128.0
channel_mean = np.array([123.68, 116.78, 103.94]) # ImageNet RGB means (shape (3,))
channel_std = np.array([58.395, 57.120, 57.375])  # ImageNet RGB stds (shape (3,))
normalized_images = (fake_images - channel_mean) / channel_std
print(f"    C. Normalized Image Batch shape: {normalized_images.shape}")

print("\n" + "=" * 72)
print("  Summary: Broadcasting enables elegant, C-optimized tensor arithmetic")
print("  without manually tiling or replicating data across RAM buffers.")
print("=" * 72)
