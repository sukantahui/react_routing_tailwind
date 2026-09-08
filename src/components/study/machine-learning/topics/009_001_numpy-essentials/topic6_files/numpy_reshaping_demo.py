# numpy_reshaping_demo.py
# NumPy Essentials — Topic 6: Reshaping Arrays
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of array reshaping operations in NumPy:
  1. Basic 1D to 2D / 3D reshaping
  2. The -1 inferred dimension wildcard
  3. Flattening: ravel() (view) vs flatten() (copy) and memory inspection
  4. Transposing (.T) and arbitrary axis permutations with np.transpose()
  5. Machine Learning Application: Flattening 28x28 image batches for Dense/MLP layers
  6. Machine Learning Application: Formatting single features (N,) -> (N, 1) for Scikit-learn
  7. Incompatible size mismatch error handling
"""

import numpy as np

print("=" * 68)
print("  NUMPY ESSENTIALS — Topic 6: Reshaping Arrays")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# ── 1. Basic 1D to 2D / 3D Reshaping ──────────────────────────────────────────
print("\n[1] Basic 1D to 2D and 3D Reshaping")
# 12 elements representing 12 marks across students in Barrackpore
flat_12 = np.arange(12, dtype=np.int32)
print(f"    Original 1D array (shape {flat_12.shape}): {flat_12}")

# Reshape into (3, 4) - 3 rows x 4 columns
mat_3x4 = flat_12.reshape(3, 4)
print(f"    Reshaped to (3, 4):\n{mat_3x4}")

# Reshape into (2, 6) - 2 rows x 6 columns
mat_2x6 = flat_12.reshape(2, 6)
print(f"    Reshaped to (2, 6):\n{mat_2x6}")

# Reshape into 3D Tensor: (2, 2, 3) - 2 batches x 2 rows x 3 columns
tensor_3d = flat_12.reshape(2, 2, 3)
print(f"    Reshaped to 3D (2, 2, 3) tensor:\n{tensor_3d}")

# ── 2. The -1 Inferred Dimension Wildcard ────────────────────────────────────
print("\n[2] The -1 Dimension Inferred Wildcard")
# (12, 1) Column Matrix for Scikit-learn feature column
col_vec = flat_12.reshape(-1, 1)
print(f"    reshape(-1, 1) -> shape {col_vec.shape} (12 rows, 1 col)")

# (1, 12) Row Matrix for single test sample
row_vec = flat_12.reshape(1, -1)
print(f"    reshape(1, -1) -> shape {row_vec.shape} (1 row, 12 cols)")

# (4, -1) -> NumPy calculates 12 / 4 = 3 columns
mat_4x3 = flat_12.reshape(4, -1)
print(f"    reshape(4, -1) -> shape {mat_4x3.shape} (4 rows, 3 cols inferred)")

# ── 3. ravel() (Zero-Copy View) vs flatten() (Deep Copy) ─────────────────────
print("\n[3] Flattening: ravel() vs flatten()")
sample_mat = np.array([[10, 20, 30], [40, 50, 60]])

# ravel(): Returns a view sharing memory
r_view = sample_mat.ravel()
# flatten(): Always allocates a new copy in RAM
f_copy = sample_mat.flatten()

print(f"    Original 2D Matrix:\n{sample_mat}")
print(f"    ravel()   : {r_view} | base is sample_mat: {r_view.base is sample_mat} (VIEW)")
print(f"    flatten() : {f_copy} | base is sample_mat: {f_copy.base is sample_mat} (COPY)")

# Mutate ravel view to demonstrate memory sharing
r_view[0] = 999
print(f"    After r_view[0] = 999 -> original matrix mutated:\n{sample_mat}")

# ── 4. Transpose & Multi-Axis Permutation ────────────────────────────────────
print("\n[4] Transpose (.T) and Multi-Axis Permutation (np.transpose)")
img_batch_nhwc = np.zeros((10, 28, 28, 3), dtype=np.float32) # (Batch, Height, Width, Channels)
print(f"    TensorFlow format (NHWC) : {img_batch_nhwc.shape}")

# Convert to PyTorch format (NCHW): (Batch, Channels, Height, Width)
img_batch_nchw = np.transpose(img_batch_nhwc, (0, 3, 1, 2))
print(f"    PyTorch format (NCHW)    : {img_batch_nchw.shape}")

# ── 5. Machine Learning Use Case: Flattening Image Batches ───────────────────
print("\n[5] ML Application: Flattening Image Batches for Dense / MLP Layers")
# 100 grayscale MNIST images of 28x28 pixels
mnist_batch = np.random.rand(100, 28, 28)
print(f"    Raw MNIST Image Batch     : {mnist_batch.shape} (100 images x 28 x 28)")

# Flatten each 28x28 image into a 784-element 1D feature vector
flattened_for_mlp = mnist_batch.reshape(100, -1) # 100 x 784
print(f"    Flattened for Dense Layer : {flattened_for_mlp.shape} (100 samples x 784 features)")

# ── 6. Incompatible Size Error Handling ──────────────────────────────────────
print("\n[6] Incompatible Size Reshape Error Handling")
try:
    bad_reshape = flat_12.reshape(5, 5) # 12 elements cannot fit in 25 cells
except ValueError as e:
    print(f"    Caught expected error: {e}")

print("\n" + "=" * 68)
print("  Summary: Reshaping is an essential, zero-copy tool in data pipelines.")
print("  Always use -1 to infer dimensions and check total size invariance!")
print("=" * 68)
