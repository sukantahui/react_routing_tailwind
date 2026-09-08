# numpy_arithmetic_demo.py
# NumPy Essentials — Topic 10: Array Arithmetic Operations
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of array arithmetic operations in NumPy:
  1. Element-wise operations between arrays (+, -, *, /, //, %, **)
  2. Scalar-array arithmetic operations
  3. Element-wise multiplication (*) vs Matrix multiplication (@)
  4. In-place arithmetic mutations (+=, *=) and dtype casting traps
  5. Division by zero handling ('inf', 'nan' warnings vs Python ZeroDivisionError)
  6. Machine Learning Applications:
     - Image pixel normalization: img / 255.0
     - Min-Max feature scaling: (X - X_min) / (X_max - X_min)
     - Z-Score standardization: (X - mean) / std
     - Mean Squared Error (MSE) loss computation
     - Vectorized linear regression hypothesis: y_hat = X * w + b
"""

import numpy as np

print("=" * 72)
print("  NUMPY ESSENTIALS — Topic 10: Array Arithmetic Operations")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 72)

# ── 1. Basic Element-Wise Operations Between Arrays ──────────────────────────
print("\n[1] Element-Wise Arithmetic Operations")
# Semester 1 and Semester 2 marks for 4 students in Barrackpore
sem1 = np.array([75, 82, 90, 68])
sem2 = np.array([80, 88, 85, 72])

print(f"    Sem 1 Marks: {sem1}")
print(f"    Sem 2 Marks: {sem2}")

# Element-wise Addition (+) vs Python list concatenation
print(f"    Addition (sem1 + sem2)        : {sem1 + sem2}")
print(f"    Subtraction (sem2 - sem1)     : {sem2 - sem1}")
print(f"    Multiplication (sem1 * sem2)  : {sem1 * sem2}")
print(f"    True Division (sem2 / sem1)   : {np.round(sem2 / sem1, 3)}")
print(f"    Floor Division (sem2 // sem1) : {sem2 // sem1}")
print(f"    Modulus / Remainder (sem2 % 10): {sem2 % 10}")
print(f"    Power / Exponentiation (sem1**2): {sem1 ** 2}")

# ── 2. Scalar-Array Arithmetic Operations ────────────────────────────────────
print("\n[2] Scalar-Array Operations (Adding Grace Marks & Scaling)")
# Add 5 grace marks to all students
grace_marks = sem1 + 5
print(f"    sem1 + 5 (Grace Marks): {grace_marks}")

# Convert 100-mark scores to percentages (scale to [0, 1])
normalized_scores = sem1 / 100.0
print(f"    sem1 / 100.0 (Scale to 1.0): {normalized_scores}")

# ── 3. Element-Wise (*) vs Matrix Multiplication (@) ────────────────────────
print("\n[3] Element-Wise Multiplication (*) vs Matrix Multiplication (@)")
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Element-wise (Hadamard) product
elem_prod = A * B
print(f"    Element-wise A * B:\n{elem_prod}")
print("    -> Multiplies [1*5=5, 2*6=12, 3*7=21, 4*8=32]")

# Matrix multiplication (Dot product)
mat_prod = A @ B
print(f"    Matrix Multiplication A @ B:\n{mat_prod}")
print("    -> Row 0 dot Col 0: 1*5 + 2*7 = 19")

# ── 4. In-Place Arithmetic & Dtype Traps ─────────────────────────────────────
print("\n[4] In-Place Arithmetic Mutations and Dtype Traps")
mut_arr = np.array([10, 20, 30], dtype=np.int32)
print(f"    Original array: {mut_arr}")

# In-place addition (Modifies memory without creating new array)
mut_arr += 5
print(f"    After mut_arr += 5: {mut_arr}")

# Dtype trap: Adding float to integer array in-place
try:
    mut_arr += 2.5 # Raises TypeError because float64 cannot fit in int32 in-place
except TypeError as e:
    print(f"    Caught expected TypeError on mut_arr += 2.5:\n    {e}")
    print("    -> FIX: Convert array to float first: mut_arr = mut_arr.astype(float)")

# ── 5. Division by Zero in NumPy (inf and nan) ────────────────────────────────
print("\n[5] Division by Zero Behavior in NumPy")
numerators = np.array([10.0, -10.0, 0.0])
denominators = np.array([0.0, 0.0, 0.0])

# NumPy issues RuntimeWarning but doesn't crash like standard Python
with np.errstate(divide='ignore', invalid='ignore'):
    div_results = numerators / denominators
print(f"    numerators / denominators: {div_results}")
print(f"    10.0 / 0.0  -> {div_results[0]} (Positive Infinity)")
print(f"    -10.0 / 0.0 -> {div_results[1]} (Negative Infinity)")
print(f"    0.0 / 0.0   -> {div_results[2]} (Not a Number - NaN)")

# ── 6. Machine Learning Real-World Arithmetic Workflows ──────────────────────
print("\n[6] Machine Learning Preprocessing & Loss Computation")

# A. Image Normalization: [0, 255] -> [0.0, 1.0]
raw_pixels = np.array([0, 64, 128, 192, 255], dtype=np.float32)
normalized_pixels = raw_pixels / 255.0
print(f"    A. Image Normalization (img / 255.0): {np.round(normalized_pixels, 3)}")

# B. Min-Max Feature Scaling: (X - min) / (max - min)
study_hours = np.array([2.5, 5.0, 1.0, 8.5, 4.0])
h_min, h_max = study_hours.min(), study_hours.max()
min_max_scaled = (study_hours - h_min) / (h_max - h_min)
print(f"    B. Min-Max Scaled Hours [0, 1]: {np.round(min_max_scaled, 3)}")

# C. Z-Score Standardization: (X - mean) / std
h_mean, h_std = study_hours.mean(), study_hours.std()
z_scores = (study_hours - h_mean) / h_std
print(f"    C. Z-Score Standardized (mu=0, sigma=1): {np.round(z_scores, 3)}")

# D. Mean Squared Error (MSE) Loss
y_true = np.array([100.0, 150.0, 200.0, 250.0])
y_pred = np.array([105.0, 142.0, 208.0, 245.0])
residuals = y_pred - y_true
squared_errors = residuals ** 2
mse = np.mean(squared_errors)
rmse = np.sqrt(mse)
print(f"    D. MSE Residuals      : {residuals}")
print(f"       Squared Errors     : {squared_errors}")
print(f"       Mean Squared Error : {mse:.2f}")
print(f"       Root MSE (RMSE)    : {rmse:.2f}")

print("\n" + "=" * 72)
print("  Summary: NumPy vectorized arithmetic powers all ML mathematical")
print("  transformations from feature scaling to loss and gradient computations.")
print("=" * 72)
