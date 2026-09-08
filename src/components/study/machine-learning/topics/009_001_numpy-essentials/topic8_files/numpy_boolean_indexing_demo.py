# numpy_boolean_indexing_demo.py
# NumPy Essentials — Topic 8: Boolean Indexing (Masking)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of Boolean Indexing & Masking in NumPy:
  1. Creating boolean mask arrays using vectorized comparison operators
  2. Filtering 1D and 2D arrays (result flattening behavior)
  3. Compound boolean expressions with &, |, ~ and operator precedence
  4. Why Python 'and' / 'or' raise ValueError on ndarrays
  5. In-place conditional mutations (Implementing ReLU: arr[arr < 0] = 0)
  6. Shape-preserving ternary selection with np.where()
  7. Boolean aggregations: np.sum(), np.any(), np.all(), np.count_nonzero()
  8. Machine Learning Workflows:
     - Class filtering: X_positive = X[y == 1]
     - Outlier filtering (Z-score 3-sigma rule)
     - Missing value / NaN masking: data[~np.isnan(data)]
     - Binary classification thresholding: (prob >= 0.5).astype(int)
"""

import numpy as np

print("=" * 72)
print("  NUMPY ESSENTIALS — Topic 8: Boolean Indexing (Masking)")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 72)

# ── 1. Basic Boolean Mask Creation and Filtering ─────────────────────────────
print("\n[1] Basic Boolean Masking on 1D Student Scores")
# Student exam scores in Barrackpore
scores = np.array([78, 42, 91, 35, 88, 59, 95, 48, 83])
print(f"    Original Scores: {scores}")

# Vectorized condition
pass_mask = scores >= 50
print(f"    pass_mask (scores >= 50):\n    {pass_mask}")

# Filter array with mask
passed_students = scores[pass_mask]
print(f"    Passed Scores (scores[pass_mask]): {passed_students}")

# ── 2. Compound Boolean Conditions (&, |, ~) ─────────────────────────────────
print("\n[2] Compound Boolean Conditions with &, |, and ~")
# Select First-Class distinction marks (Between 75 and 90 inclusive)
distinction_mask = (scores >= 75) & (scores <= 90)
print(f"    Distinction (75 <= score <= 90): {scores[distinction_mask]}")

# Extreme scores (Below 40 or Above 90)
extreme_mask = (scores < 40) | (scores > 90)
print(f"    Extreme Scores (<40 or >90)    : {scores[extreme_mask]}")

# Inversion with ~ (All students who are NOT in distinction)
non_distinction = scores[~distinction_mask]
print(f"    Non-Distinction Scores (~mask) : {non_distinction}")

# ── 3. Common Gotcha: Python 'and'/'or' vs Bitwise '&'/'|' ───────────────────
print("\n[3] The Python 'and' / 'or' ValueError Gotcha")
try:
    # This raises ValueError because Python evaluates truth value of whole array
    bad_filter = scores[scores > 50 and scores < 80]
except ValueError as e:
    print(f"    Caught expected ValueError: {e}")
    print("    -> FIX: Always use (scores > 50) & (scores < 80) with parentheses!")

# ── 4. In-Place Conditional Mutation (Implementing ReLU Activation) ──────────
print("\n[4] In-Place Conditional Mutation: Implementing Neural Network ReLU")
# Raw pre-activation tensor with positive and negative logits
neuron_activations = np.array([-2.5, 3.8, -0.4, 7.2, -5.0, 1.1])
print(f"    Raw Activations: {neuron_activations}")

# ReLU: f(x) = max(0, x) -> Set all negative numbers to 0
relu_applied = neuron_activations.copy()
relu_applied[relu_applied < 0] = 0.0
print(f"    After ReLU (arr[arr < 0] = 0.0): {relu_applied}")

# ── 5. Shape-Preserving Ternary Selection with np.where() ─────────────────────
print("\n[5] Shape-Preserving Conditional Selection: np.where()")
marks_2d = np.array([
    [75, 42, 88],
    [35, 90, 64]
])
print(f"    2D Marks Matrix (shape {marks_2d.shape}):\n{marks_2d}")

# np.where(condition, x, y) returns 2D array without flattening
grade_labels = np.where(marks_2d >= 50, "PASS", "FAIL")
print(f"    Pass/Fail 2D Table (np.where):\n{grade_labels}")

# ── 6. Boolean Aggregations: np.sum, np.count_nonzero, np.any, np.all ────────
print("\n[6] Boolean Aggregations & Summary Statistics")
print(f"    Total Passed Students (np.sum(scores >= 50))       : {np.sum(scores >= 50)}")
print(f"    Total Failed Students (np.count_nonzero(scores < 50)): {np.count_nonzero(scores < 50)}")
print(f"    Did anyone fail? (np.any(scores < 40))             : {np.any(scores < 40)}")
print(f"    Did everyone pass? (np.all(scores >= 40))          : {np.all(scores >= 40)}")

# ── 7. Machine Learning Applications ─────────────────────────────────────────
print("\n[7] Machine Learning Real-World Applications")

# A. Class Filtering (Extracting Positive Class Samples)
X = np.array([
    [21, 5.5], [22, 2.0], [20, 8.0], [23, 3.5], [21, 6.0]
])
y = np.array([1, 0, 1, 0, 1]) # 1=Admitted, 0=Rejected

X_admitted = X[y == 1]
print(f"    A. Admitted Samples (X[y == 1]):\n{X_admitted}")

# B. Outlier Detection using 2-Sigma Rule
salaries = np.array([32000, 35000, 31000, 29000, 34000, 950000]) # 950k is an outlier
mean_sal = np.mean(salaries)
std_sal = np.std(salaries)
normal_mask = np.abs(salaries - mean_sal) <= 2 * std_sal
print(f"    B. Cleaned Salaries without Outliers: {salaries[normal_mask]}")

# C. Missing Value / NaN Filtering
raw_features = np.array([1.2, np.nan, 3.4, 5.6, np.nan, 7.8])
clean_features = raw_features[~np.isnan(raw_features)]
print(f"    C. Features with NaNs Removed: {clean_features}")

# D. Classification Decision Thresholding
predicted_probs = np.array([0.15, 0.82, 0.45, 0.91, 0.33, 0.65])
binary_preds = (predicted_probs >= 0.5).astype(int)
print(f"    D. Binary Predictions (thresh >= 0.5): {binary_preds}")

print("\n" + "=" * 72)
print("  Summary: Boolean indexing is the cornerstone of data cleaning, outlier")
print("  removal, label filtering, and activation function implementation in ML.")
print("=" * 72)
