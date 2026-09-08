# numpy_shape_size_dim_demo.py
# NumPy Essentials — Topic 5: Array Shape, Size, and Dimensions
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of array shape, size, and dimensionality:
  1. Inspecting shape, ndim, size, itemsize, and nbytes
  2. The critical difference between 1D vector (N,), 2D row (1, N), and 2D column (N, 1)
  3. Slicing preservation: arr[0, :] vs arr[0:1, :]
  4. Expanding and squeezing dimensions: np.expand_dims() and np.squeeze()
  5. Validating dataset shapes before feeding into Scikit-learn models (X and y)
  6. Multi-dimensional tensors in Computer Vision and Deep Learning (3D & 4D)
"""

import numpy as np

print("=" * 68)
print("  NUMPY ESSENTIALS — Topic 5: Shape, Size, and Dimensions")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# ── 1. Dimensional Hierarchy Inspection ───────────────────────────────────────
print("\n[1] Dimensional Hierarchy Inspection (0D to 4D)")

scalar_0d = np.array(42)
print(f"    0D Scalar : shape={scalar_0d.shape} | ndim={scalar_0d.ndim} | size={scalar_0d.size}")

vec_1d = np.array([75, 88, 92, 64, 80], dtype=np.float64)
print(f"    1D Vector : shape={vec_1d.shape}   | ndim={vec_1d.ndim} | size={vec_1d.size} | bytes={vec_1d.nbytes}B")

# 4 students in Barrackpore x 3 subjects (Python, ML, SQL)
mat_2d = np.array([
    [75, 88, 82],  # Sachin
    [92, 95, 89],  # Mahima
    [68, 74, 80],  # Susmita
    [85, 90, 88],  # Abhronila
], dtype=np.float32)
print(f"    2D Matrix : shape={mat_2d.shape}   | ndim={mat_2d.ndim} | size={mat_2d.size} | bytes={mat_2d.nbytes}B")

# 3D Tensor: 2 batches of 3x4 images
tensor_3d = np.zeros((2, 3, 4), dtype=np.uint8)
print(f"    3D Tensor : shape={tensor_3d.shape} | ndim={tensor_3d.ndim} | size={tensor_3d.size} | bytes={tensor_3d.nbytes}B")

# 4D Batch: 32 CNN images of 28x28 grayscale pixels
batch_4d = np.zeros((32, 28, 28, 1), dtype=np.float32)
print(f"    4D Batch  : shape={batch_4d.shape} | ndim={batch_4d.ndim} | size={batch_4d.size} | bytes={batch_4d.nbytes}B")

# ── 2. The (N,) vs (1, N) vs (N, 1) Shape Trap ───────────────────────────────
print("\n[2] The (N,) vs (1, N) vs (N, 1) Shape Discrepancy")
v = np.array([10, 20, 30, 40])
row_mat = v.reshape(1, 4)
col_mat = v.reshape(4, 1)

print(f"    1D Vector v              : shape={v.shape}   | ndim={v.ndim} (1 axis: arr[i])")
print(f"    2D Row Matrix row_mat    : shape={row_mat.shape} | ndim={row_mat.ndim} (2 axes: arr[0, i])")
print(f"    2D Column Matrix col_mat : shape={col_mat.shape} | ndim={col_mat.ndim} (2 axes: arr[i, 0])")

# ── 3. Slicing Syntax and Dimension Reduction ────────────────────────────────
print("\n[3] Slicing Syntax vs Dimension Preservation")
# Single integer index collapses that axis
row_1d = mat_2d[0, :]      # Row 0 as 1D vector
# Slice range preserves the 2D axis
row_2d = mat_2d[0:1, :]    # Row 0 as 2D matrix

print(f"    Integer index mat_2d[0, :]   -> shape: {row_1d.shape} (Dimension reduced to 1D)")
print(f"    Slice range   mat_2d[0:1, :] -> shape: {row_2d.shape} (2D Matrix preserved)")

# ── 4. Expanding and Squeezing Dimensions ────────────────────────────────────
print("\n[4] Expanding and Squeezing Dimensions (np.newaxis, expand_dims, squeeze)")
raw_sample = np.array([75, 88, 92])  # 1D vector (3,)

# Method A: np.expand_dims
expanded_row = np.expand_dims(raw_sample, axis=0)  # (1, 3)
expanded_col = np.expand_dims(raw_sample, axis=1)  # (3, 1)
print(f"    np.expand_dims(axis=0) : shape {expanded_row.shape}")
print(f"    np.expand_dims(axis=1) : shape {expanded_col.shape}")

# Method B: np.newaxis slice
newaxis_row = raw_sample[np.newaxis, :]  # (1, 3)
newaxis_col = raw_sample[:, np.newaxis]  # (3, 1)
print(f"    raw_sample[np.newaxis,:] : shape {newaxis_row.shape}")

# Squeezing redundant unit dimensions
squeezed = np.squeeze(expanded_row)      # (3,)
print(f"    np.squeeze((1, 3))       : shape {squeezed.shape}")

# ── 5. Machine Learning Dataset Shape Validation ─────────────────────────────
print("\n[5] Machine Learning Dataset Shape Audit (Scikit-learn Conventions)")
# 4 student samples, 3 features (Python, ML, Stats)
X_train = mat_2d
y_train = np.array([1, 1, 0, 1])  # Pass/Fail labels

print(f"    X_train (Feature Matrix) : shape={X_train.shape} -> MUST be 2D: (N_samples, N_features)")
print(f"    y_train (Target Labels)  : shape={y_train.shape}     -> MUST be 1D: (N_samples,)")

# Check matching sample count
assert X_train.shape[0] == y_train.shape[0], "Sample count mismatch!"
print("    ✔ Shape Audit Passed: X_train rows match y_train length!")

print("\n" + "=" * 68)
print("  Rule: Always verify X.shape and y.shape before model training!")
print("=" * 68)
