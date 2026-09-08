# numpy_fancy_indexing_demo.py
# NumPy Essentials — Topic 9: Fancy Indexing (Integer Array Indexing)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of Fancy Indexing in NumPy:
  1. 1D array fancy indexing & shape reflection of the index array
  2. 2D row extraction, paired coordinate indexing, and np.ix_ submatrices
  3. Memory behavior proof: Fancy Indexing returns a COPY (not a View)
  4. In-place modification & repeated index accumulator with np.add.at()
  5. Machine Learning Workflows:
     - Stochastic Gradient Descent (SGD) mini-batch sampling
     - Dataset shuffling with synchronized X and y permutations
     - Selected feature subsetting: X[:, [0, 2, 4]]
     - Cross-Entropy Loss true-class probability extraction
     - Top-K predictions with np.argsort()
"""

import numpy as np

print("=" * 72)
print("  NUMPY ESSENTIALS — Topic 9: Fancy Indexing (Integer Arrays)")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 72)

# ── 1. 1D Array Fancy Indexing & Shape Reflection ────────────────────────────
print("\n[1] 1D Fancy Indexing and Output Shape Reflection")
# 8 student roll numbers / marks in Barrackpore
marks = np.array([65, 78, 92, 54, 88, 71, 95, 83])
print(f"    Original 1D Marks: {marks}")

# Extract specific non-adjacent indices [1, 4, 6]
selected_1d = marks[[1, 4, 6]]
print(f"    marks[[1, 4, 6]] -> {selected_1d} (1D array)")

# Fancy indexing with a 2D index array reflects the 2D shape!
idx_2d = np.array([[0, 2], [5, 7]])
selected_2d = marks[idx_2d]
print(f"    marks[2D_indices] (shape {selected_2d.shape}):\n{selected_2d}")

# ── 2. 2D Matrix Row Selection and Paired Coordinates ────────────────────────
print("\n[2] 2D Matrix Fancy Indexing")
# 4 students x 3 subjects matrix
grade_table = np.array([
    [75, 82, 90],  # Row 0: Debangshu
    [88, 94, 91],  # Row 1: Susmita
    [62, 70, 74],  # Row 2: Swadeep
    [92, 89, 96]   # Row 3: Tuhina
])
print(f"    Grade Table (4x3):\n{grade_table}")

# A. Select specific rows in arbitrary order [3, 0, 1]
custom_rows = grade_table[[3, 0, 1]]
print(f"    Extract rows [3, 0, 1] (Tuhina, Debangshu, Susmita):\n{custom_rows}")

# B. Element-wise Coordinate Pairing: (Row 0, Col 1) and (Row 2, Col 2)
row_coords = [0, 2]
col_coords = [1, 2]
paired_elements = grade_table[row_coords, col_coords]
print(f"    Paired coordinates (0,1) and (2,2): {paired_elements}")

# C. Rectangular Submatrix using np.ix_() (Rows 0, 2 and Cols 0, 2)
subgrid = grade_table[np.ix_([0, 2], [0, 2])]
print(f"    Rectangular 2x2 Subgrid with np.ix_([0, 2], [0, 2]):\n{subgrid}")

# ── 3. Memory Verification: Fancy Indexing Returns a COPY (NOT a View) ───────
print("\n[3] Memory Verification: Copy vs View")
sub_copy = marks[[0, 2, 4]]
print(f"    sub_copy.base is marks: {sub_copy.base is marks} (Independent COPY)")

# Mutating copy does NOT alter original array
sub_copy[0] = 999
print(f"    After sub_copy[0] = 999 -> Original marks[0] is untouched: {marks[0]}")

# ── 4. In-Place Mutation & The Repeated Index Trap ────────────────────────────
print("\n[4] In-Place Mutation & Repeated Index Accumulation")
mutable_arr = np.zeros(5, dtype=np.int32)
mutable_arr[[1, 3]] = [100, 300]
print(f"    After mutable_arr[[1, 3]] = [100, 300]: {mutable_arr}")

# The repeated index += trap
trap_arr = np.zeros(5, dtype=np.int32)
trap_arr[[0, 0, 0]] += 1  # ⚠️ Only increments once!
print(f"    trap_arr[[0, 0, 0]] += 1 -> {trap_arr} (Only incremented once!)")

# Correct solution: np.add.at()
accum_arr = np.zeros(5, dtype=np.int32)
np.add.at(accum_arr, [0, 0, 0], 1)
print(f"    np.add.at(accum_arr, [0, 0, 0], 1) -> {accum_arr} (Correctly incremented 3 times!)")

# ── 5. Machine Learning Applications ─────────────────────────────────────────
print("\n[5] Machine Learning Real-World Applications")

# A. Mini-Batch Sampling for Stochastic Gradient Descent (SGD)
np.random.seed(42)
N_samples = 100
X = np.random.randn(N_samples, 4)
y = np.random.randint(0, 2, size=N_samples)

batch_size = 8
batch_indices = np.random.choice(N_samples, size=batch_size, replace=False)
X_batch = X[batch_indices]
y_batch = y[batch_indices]
print(f"    A. SGD Mini-Batch Sampled (Batch size {batch_size}):")
print(f"       X_batch shape: {X_batch.shape}, y_batch shape: {y_batch.shape}")

# B. Synchronized Dataset Shuffling
perm = np.random.permutation(N_samples)
X_shuffled = X[perm]
y_shuffled = y[perm]
print(f"    B. Synchronized Shuffle: X and y permuted identically with shape {X_shuffled.shape}")

# C. Selecting Top Features
important_features = [0, 2] # e.g. Selected via Mutual Information or Lasso
X_selected = X[:, important_features]
print(f"    C. Feature Column Subsetting X[:, [0, 2]]: shape {X_selected.shape}")

# D. Softmax Cross-Entropy Loss True-Class Probabilities
# Batch of 4 samples across 3 classes
predicted_probs = np.array([
    [0.70, 0.20, 0.10], # Sample 0: true class 0
    [0.05, 0.85, 0.10], # Sample 1: true class 1
    [0.15, 0.25, 0.60], # Sample 2: true class 2
    [0.30, 0.60, 0.10]  # Sample 3: true class 1
])
true_targets = np.array([0, 1, 2, 1])

# Extract true class probabilities in one line:
true_probs = predicted_probs[np.arange(4), true_targets]
print(f"    D. True Class Probabilities: {true_probs}")
loss = -np.mean(np.log(true_probs))
print(f"       Computed Cross-Entropy Loss: {loss:.4f}")

print("\n" + "=" * 72)
print("  Summary: Fancy indexing provides unparalleled flexibility for batching,")
print("  shuffling, loss indexing, and feature selection in machine learning.")
print("=" * 72)
