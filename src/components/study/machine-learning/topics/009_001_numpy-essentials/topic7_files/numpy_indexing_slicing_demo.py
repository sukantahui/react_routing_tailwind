# numpy_indexing_slicing_demo.py
# NumPy Essentials — Topic 7: Indexing and Slicing Arrays
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of indexing and slicing operations in NumPy:
  1. 1D indexing, negative indexing, step slicing, and array reversal
  2. 2D row/column selection, submatrix extraction, and strided grids
  3. Dimension retention: integer indexing (ndim-1) vs slice indexing (ndim preserved)
  4. Crucial memory concept: Views vs Copies and in-place mutations
  5. 3D Tensor slicing (color images / time-series)
  6. Machine Learning Application: Splitting X (features) and y (target labels)
  7. Machine Learning Application: Train/Test splitting and image bounding box cropping
"""

import numpy as np

print("=" * 70)
print("  NUMPY ESSENTIALS — Topic 7: Indexing and Slicing Arrays")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 70)

# ── 1. 1D Array Indexing and Slicing ──────────────────────────────────────────
print("\n[1] 1D Indexing and Slicing Basics")
scores = np.array([65, 72, 88, 91, 54, 79, 95, 83])
print(f"    Original 1D Scores: {scores}")
print(f"    First element (scores[0])   : {scores[0]}")
print(f"    Last element (scores[-1])   : {scores[-1]}")
print(f"    Slice [2:6] (index 2 to 5)  : {scores[2:6]}")
print(f"    Every second element [::2]  : {scores[::2]}")
print(f"    Reversed array [::-1]       : {scores[::-1]}")

# ── 2. 2D Matrix Indexing and Slicing ────────────────────────────────────────
print("\n[2] 2D Matrix Indexing and Submatrix Extraction")
# 4 students (Debangshu, Susmita, Swadeep, Tuhina) x 4 exam marks
marks_matrix = np.array([
    [75, 82, 90, 68],
    [88, 94, 91, 85],
    [62, 70, 74, 60],
    [92, 89, 96, 95]
])
print(f"    4x4 Marks Matrix:\n{marks_matrix}")
print(f"    Single element at [1, 2] (Susmita, Sub 3) : {marks_matrix[1, 2]}")
print(f"    Susmita's entire row [1, :]              : {marks_matrix[1, :]}")
print(f"    First subject column [:, 0] (All students): {marks_matrix[:, 0]}")
print(f"    Top-left 2x2 submatrix [0:2, 0:2]:\n{marks_matrix[0:2, 0:2]}")
print(f"    Strided 2x2 sub-grid [::2, ::2]:\n{marks_matrix[::2, ::2]}")

# ── 3. Dimension Reduction vs Dimension Preservation ─────────────────────────
print("\n[3] Dimension Reduction vs Dimension Preservation")
# Integer index reduces ndim by 1
row_1d = marks_matrix[0, :]
print(f"    marks_matrix[0, :]   -> shape {row_1d.shape} (ndim={row_1d.ndim}) [1D Vector]")

# Slice index preserves 2D structure
row_2d = marks_matrix[0:1, :]
print(f"    marks_matrix[0:1, :] -> shape {row_2d.shape} (ndim={row_2d.ndim}) [2D Matrix]")

# ── 4. Slices are VIEWS (Critical Memory Behavior) ───────────────────────────
print("\n[4] Slices are Zero-Copy Views (Memory Mutation Proof)")
sample_grid = np.array([[10, 20, 30], [40, 50, 60], [70, 80, 90]])
print(f"    Original Grid:\n{sample_grid}")

# Extract a slice (view)
sub_view = sample_grid[0:2, 0:2]
print(f"    sub_view.base is sample_grid: {sub_view.base is sample_grid} (Shares Memory)")

# Modify the view
sub_view[0, 0] = 999
print(f"    After sub_view[0, 0] = 999 -> Original sample_grid is mutated:\n{sample_grid}")

# Creating an explicit deep copy
safe_copy = sample_grid[0:2, 0:2].copy()
safe_copy[0, 1] = 888
print(f"    safe_copy.base is sample_grid: {safe_copy.base is sample_grid} (Independent)")
print(f"    Original grid remains unchanged at [0, 1]: {sample_grid[0, 1]}")

# ── 5. Machine Learning Pipeline: Splitting X (Features) and y (Target) ──────
print("\n[5] Machine Learning Workflow: Splitting X and y from Tabular Data")
# 5 samples: [Age, Study_Hours, Attendance, Exam_Pass_Label]
dataset = np.array([
    [21, 5.5, 92, 1],
    [22, 2.0, 65, 0],
    [20, 8.0, 98, 1],
    [23, 3.5, 78, 0],
    [21, 6.0, 88, 1]
])
print(f"    Full Dataset shape: {dataset.shape}")

# X = All rows, all columns except last -> (5, 3) 2D Feature Matrix
X = dataset[:, :-1]
# y = All rows, only the last column -> (5,) 1D Target Vector
y = dataset[:, -1]

print(f"    Features Matrix X shape: {X.shape} (2D Matrix for model.fit):\n{X}")
print(f"    Target Vector y shape  : {y.shape} (1D Vector of labels): {y}")

# ── 6. Train-Test Split and Image Bounding Box Cropping ───────────────────────
print("\n[6] Train/Test Slicing and Image Bounding Box Cropping")
# Train-Test Split with Slicing (80% Train, 20% Test for 5 samples -> 4 train, 1 test)
X_train, X_test = X[:4, :], X[4:, :]
y_train, y_test = y[:4], y[4:]
print(f"    X_train: {X_train.shape}, X_test: {X_test.shape}")

# 3D Tensor Image Cropping: (Height=100, Width=100, Channels=3)
synthetic_img = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)
# Crop region of interest: rows 20 to 60, cols 30 to 80
cropped_roi = synthetic_img[20:60, 30:80, :]
print(f"    Original Image Shape : {synthetic_img.shape}")
print(f"    Cropped Bounding Box : {cropped_roi.shape} (40 height x 50 width x 3 channels)")

print("\n" + "=" * 70)
print("  Summary: Slicing is fundamental to ML feature engineering and tensor operations.")
print("  Always remember: NumPy slices return zero-copy views by default!")
print("=" * 70)
