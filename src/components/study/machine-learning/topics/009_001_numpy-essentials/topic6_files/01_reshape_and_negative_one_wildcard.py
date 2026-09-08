"""
================================================================================
Topic 6 - Script 01: Array Reshaping Mechanics & The -1 Wildcard
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- .reshape(new_shape): Changing tensor geometry without moving memory
- The Total Element Count Invariance Rule (prod(shape_orig) == prod(shape_new))
- Using `-1` wildcard to automatically infer the remaining dimension
- Common ValueError: cannot reshape array of size N into shape (...)
================================================================================
"""

import numpy as np

def demonstrate_reshape_basics():
    print("=" * 65)
    print("1. RESHAPING 1D VECTOR TO 2D AND 3D")
    print("=" * 65)

    # 1D array of 12 elements (e.g. 12 hourly sensor readings)
    readings = np.arange(1, 13)
    print("Original 1D Vector (shape (12,)):\n", readings)

    # Reshape to (3, 4) -> 3 rows, 4 columns
    grid_3x4 = readings.reshape(3, 4)
    print("\nReshaped to (3, 4):\n", grid_3x4)

    # Reshape to (2, 2, 3) -> 2 blocks of 2 rows x 3 cols
    tensor_3d = readings.reshape(2, 2, 3)
    print("\nReshaped to (2, 2, 3) 3D Tensor:\n", tensor_3d)

    print("\n" + "=" * 65)
    print("2. THE -1 WILDCARD (AUTOMATIC DIMENSION INFERENCE)")
    print("=" * 65)
    
    # 24 elements
    data = np.arange(24)
    print(f"Total elements: {data.size}")

    # We want 4 columns, let NumPy infer the rows:
    inferred_rows = data.reshape(-1, 4)
    print(f"data.reshape(-1, 4) shape : {inferred_rows.shape} (NumPy calculated 6 rows)")

    # We want 2 batches of 3 rows, let NumPy infer the columns:
    inferred_cols = data.reshape(2, 3, -1)
    print(f"data.reshape(2, 3, -1) shape: {inferred_cols.shape} (NumPy calculated 4 cols)")

    # The Scikit-learn standard for 1 sample:
    single_sample = np.array([2.5, 80.0, 95.0]) # (3,)
    sample_matrix = single_sample.reshape(1, -1)
    print(f"single_sample.reshape(1, -1) shape: {sample_matrix.shape}")

if __name__ == "__main__":
    demonstrate_reshape_basics()
