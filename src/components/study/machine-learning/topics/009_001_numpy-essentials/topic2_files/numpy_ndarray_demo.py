# numpy_ndarray_demo.py
# NumPy Essentials — Topic 2: ndarray Concept
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Explores the ndarray object in depth:
  - Attributes: shape, ndim, size, dtype, itemsize, nbytes, strides
  - 1D, 2D, 3D arrays
  - C-order memory layout
  - Views vs copies
"""

import numpy as np

print("=" * 60)
print("  NUMPY ESSENTIALS — Topic 2: ndarray Concept")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore")
print("=" * 60)

# ── 1D Array ─────────────────────────────────────────────────────────────────
print("\n[1] 1D ndarray (vector)")
v = np.array([72, 85, 61, 90, 45], dtype=np.float64)
print(f"    array    : {v}")
print(f"    shape    : {v.shape}      ← tuple (5,) — 5 elements")
print(f"    ndim     : {v.ndim}          ← 1 dimension")
print(f"    size     : {v.size}          ← 5 total elements")
print(f"    dtype    : {v.dtype}     ← 64-bit float")
print(f"    itemsize : {v.itemsize}          ← 8 bytes per element")
print(f"    nbytes   : {v.nbytes}         ← 5 × 8 = 40 bytes")
print(f"    strides  : {v.strides}        ← move 8 bytes to next element")

# ── 2D Array ─────────────────────────────────────────────────────────────────
print("\n[2] 2D ndarray (matrix) — 3 students × 4 subjects")
marks = np.array([
    [72, 85, 61, 90],   # Sachin
    [88, 76, 95, 70],   # Mahima
    [55, 65, 72, 80],   # Susmita
], dtype=np.float64)
print(f"    array :\n{marks}")
print(f"    shape    : {marks.shape}    ← 3 rows, 4 columns")
print(f"    ndim     : {marks.ndim}           ← 2 dimensions")
print(f"    size     : {marks.size}          ← 3 × 4 = 12 elements")
print(f"    strides  : {marks.strides}   ← 32 bytes per row, 8 per col")

# ── Axis operations ───────────────────────────────────────────────────────────
print("\n[3] Axis operations on 2D array")
print(f"    np.sum(marks)            = {np.sum(marks):.0f}  ← total all")
print(f"    np.sum(marks, axis=0)    = {np.sum(marks, axis=0)}  ← column sums")
print(f"    np.sum(marks, axis=1)    = {np.sum(marks, axis=1)}  ← row sums")
print(f"    np.mean(marks, axis=1)   = {np.mean(marks, axis=1)}  ← row means")

# ── 3D Array ─────────────────────────────────────────────────────────────────
print("\n[4] 3D ndarray (tensor) — 2 batches × 3 rows × 4 cols")
tensor = np.arange(24).reshape(2, 3, 4)
print(f"    shape  : {tensor.shape}  ← depth=2, rows=3, cols=4")
print(f"    ndim   : {tensor.ndim}         ← 3 dimensions")
print(f"    size   : {tensor.size}        ← 2×3×4 = 24 elements")
print(f"    tensor[0] (first batch):\n{tensor[0]}")
print(f"    tensor[1] (second batch):\n{tensor[1]}")

# ── Views vs Copies ───────────────────────────────────────────────────────────
print("\n[5] Views vs Copies")
original = np.array([10, 20, 30, 40, 50])
view     = original[1:4]        # view — same memory
copy_arr = original[1:4].copy() # copy — independent memory

print(f"    original           : {original}")
print(f"    view (original[1:4]): {view}")
print(f"    Is view a view?     : {view.base is original}")

view[0] = 999
print(f"    After view[0]=999:")
print(f"    original           : {original}  ← CHANGED!")
print(f"    view               : {view}")

copy_arr[0] = 888
print(f"    After copy[0]=888:")
print(f"    original           : {original}  ← unchanged")

# ── Memory layout ─────────────────────────────────────────────────────────────
print("\n[6] Memory Layout Flags")
arr = np.array([[1,2,3],[4,5,6]], dtype=np.float32)
print(f"    C_CONTIGUOUS  : {arr.flags['C_CONTIGUOUS']}  ← row-major (C order)")
print(f"    F_CONTIGUOUS  : {arr.flags['F_CONTIGUOUS']}  ← column-major (Fortran)")
print(f"    strides       : {arr.strides}  ← 12 bytes/row, 4 bytes/elem (float32)")

print("\n" + "=" * 60)
print("  Key: ndarray = typed, contiguous, N-dimensional memory block")
print("  shape, ndim, dtype, nbytes, strides are essential attributes")
print("=" * 60)
