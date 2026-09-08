# numpy_array_creation_demo.py
# NumPy Essentials — Topic 3: Creating Arrays with np.array()
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Exhaustive demonstration of creating ndarrays using np.array():
  1. 1D vectors from lists and tuples
  2. 2D matrices from nested lists (Student marks in Barrackpore)
  3. 3D tensors (Multi-channel image simulation)
  4. Explicit dtype specification & memory optimization
  5. The ndmin parameter (forcing minimum dimensions)
  6. The copy parameter (avoiding redundant memory copies)
  7. The order parameter ('C' row-major vs 'F' col-major)
  8. Type coercion & upcasting rules
  9. Handling ragged nested lists & object dtype warnings
"""

import numpy as np

print("=" * 65)
print("  NUMPY ESSENTIALS — Topic 3: Creating Arrays with np.array()")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 65)

# ── 1. Basic 1D Array Creation ────────────────────────────────────────────────
print("\n[1] Basic 1D Array Creation (from List & Tuple)")
scores_list = [78, 85, 92, 64, 89]
v_from_list = np.array(scores_list)
print(f"    From List  : {v_from_list} | shape: {v_from_list.shape} | dtype: {v_from_list.dtype}")

scores_tuple = (12.5, 45.0, 78.2)
v_from_tuple = np.array(scores_tuple)
print(f"    From Tuple : {v_from_tuple} | shape: {v_from_tuple.shape} | dtype: {v_from_tuple.dtype}")

# ── 2. 2D Matrix Creation (Tabular Dataset) ───────────────────────────────────
print("\n[2] 2D Matrix Creation from Nested Lists (Student Marks)")
# Rows: Sachin, Mahima, Susmita | Columns: Python, ML, Stats, SQL
student_marks = np.array([
    [75, 88, 82, 90],  # Sachin (Barrackpore)
    [92, 95, 89, 94],  # Mahima (Shyamnagar)
    [68, 74, 80, 85],  # Susmita (Ichapur)
], dtype=np.float32)

print(f"    Student Marks Matrix (float32):\n{student_marks}")
print(f"    Shape      : {student_marks.shape} (3 students × 4 subjects)")
print(f"    Dimensions : {student_marks.ndim}D")
print(f"    Itemsize   : {student_marks.itemsize} bytes per float32")
print(f"    Total RAM  : {student_marks.nbytes} bytes")

# ── 3. 3D Tensor Creation (RGB Image Representation) ─────────────────────────
print("\n[3] 3D Tensor Creation (2x2 RGB Image Mini-Tensor)")
# Shape: (Height=2, Width=2, Channels=3)
rgb_image = np.array([
    [[255, 0, 0],     [0, 255, 0]],       # Row 0: Red pixel, Green pixel
    [[0, 0, 255],     [255, 255, 0]]      # Row 1: Blue pixel, Yellow pixel
], dtype=np.uint8)

print(f"    RGB Image Shape : {rgb_image.shape} (H x W x C)")
print(f"    Top-Left Pixel  : {rgb_image[0, 0]} (Red channel=255)")
print(f"    dtype           : {rgb_image.dtype} (unsigned 8-bit int, 0-255)")

# ── 4. Explicit Dtype Specification & Casting ────────────────────────────────
print("\n[4] Explicit dtype Specification")
int_arr = np.array([1, 2, 3, 4], dtype=np.int8)
print(f"    np.int8    : {int_arr} | {int_arr.nbytes} bytes total")

float_arr = np.array([1, 2, 3, 4], dtype=np.float64)
print(f"    np.float64 : {float_arr} | {float_arr.nbytes} bytes total")

bool_arr = np.array([0, 1, 5, 0], dtype=np.bool_)
print(f"    np.bool_   : {bool_arr} | Truthiness converted")

# ── 5. The ndmin Parameter (Minimum Dimensions) ──────────────────────────────
print("\n[5] Enforcing Minimum Dimensions with ndmin")
raw_vector = [10, 20, 30]
arr_1d = np.array(raw_vector)
arr_2d = np.array(raw_vector, ndmin=2)
arr_3d = np.array(raw_vector, ndmin=3)

print(f"    ndmin=0 (default) : shape {arr_1d.shape} -> 1D vector")
print(f"    ndmin=2 (2D row)  : shape {arr_2d.shape} -> matrix for Scikit-learn X")
print(f"    ndmin=3 (3D)      : shape {arr_3d.shape} -> batch/tensor format")

# ── 6. The copy Parameter & Memory Sharing ───────────────────────────────────
print("\n[6] The copy Parameter (Memory Reuse vs Deep Copy)")
existing_arr = np.array([100, 200, 300])

# copy=True (default): allocates new memory
copied = np.array(existing_arr, copy=True)
print(f"    copied is existing_arr   : {copied is existing_arr} (False)")
print(f"    copied.base is None      : {copied.base is None} (True - owns memory)")

# copy=False: reuses existing ndarray memory
shared = np.array(existing_arr, copy=False)
print(f"    shared is existing_arr   : {shared is existing_arr} (True - zero copy)")

# ── 7. Type Coercion & Upcasting Rules ───────────────────────────────────────
print("\n[7] Type Coercion & Upcasting Hierarchy")
# Mix Int and Float -> Float64
mixed_numeric = np.array([1, 2, 3.14])
print(f"    [1, 2, 3.14]        -> dtype: {mixed_numeric.dtype} (upcast to float)")

# Mix Numeric and String -> Unicode String (<U)
mixed_string = np.array([1, 2.5, "Barrackpore"])
print(f"    [1, 2.5, 'Text']    -> dtype: {mixed_string.dtype} (upcast to string)")

# ── 8. Memory Layout Order ('C' vs 'F') ──────────────────────────────────────
print("\n[8] Memory Layout (order='C' vs order='F')")
c_arr = np.array([[1, 2], [3, 4]], order='C')
f_arr = np.array([[1, 2], [3, 4]], order='F')

print(f"    C-Order Strides : {c_arr.strides} | C_CONTIGUOUS: {c_arr.flags['C_CONTIGUOUS']}")
print(f"    F-Order Strides : {f_arr.strides} | F_CONTIGUOUS: {f_arr.flags['F_CONTIGUOUS']}")

print("\n" + "=" * 65)
print("  Summary: np.array() is the universal gateway into NumPy.")
print("  Always specify dtype and ndmin when preparing ML datasets!")
print("=" * 65)
