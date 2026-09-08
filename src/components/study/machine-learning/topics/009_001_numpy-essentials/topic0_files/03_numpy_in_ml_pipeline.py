# 03_numpy_in_ml_pipeline.py
# NumPy Essentials — Topic 0: Introduction to NumPy (Part 3)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Demonstrates an end-to-end Machine Learning preprocessing pipeline using NumPy:
  1. Converting raw student scores into a NumPy array
  2. Performing Min-Max feature scaling: (X - min) / (max - min)
  3. Generating binary pass/fail target labels
  4. Formatting 2D feature matrix X and 1D label vector y for Scikit-learn
"""

import numpy as np

print("=" * 68)
print("  PART 3: NumPy in the Machine Learning Pipeline")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# 1. Raw student test scores in Barrackpore
marks_list = [72, 85, 61, 90, 45, 78, 66, 95, 53, 88]
print(f"\n[1] Raw Marks List: {marks_list}")

# Step 1: Convert to NumPy array
marks_arr = np.array(marks_list, dtype=np.float32)
print(f"    NumPy Array dtype : {marks_arr.dtype}")
print(f"    Array Shape       : {marks_arr.shape}")

# Step 2: Min-Max Feature Scaling [0.0, 1.0]
min_val = marks_arr.min()
max_val = marks_arr.max()
normalized_features = (marks_arr - min_val) / (max_val - min_val)
print(f"\n[2] Min-Max Scaled Features [0, 1]:\n    {np.round(normalized_features, 3)}")

# Step 3: Create binary classification target labels (Pass = 1 if score >= 60)
labels = (marks_arr >= 60).astype(np.int32)
print(f"\n[3] Target Labels (1=Pass, 0=Fail):\n    {labels}")

# Step 4: Reshape into 2D Feature Matrix X (n_samples, n_features) and 1D target y
X = normalized_features.reshape(-1, 1) # Shape (10, 1)
y = labels                             # Shape (10,)

print(f"\n[4] Scikit-Learn Model Ready Inputs:")
print(f"    Feature Matrix X shape : {X.shape} (2D Matrix)")
print(f"    Target Vector y shape  : {y.shape} (1D Vector)")
