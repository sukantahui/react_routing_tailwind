"""
================================================================================
Topic 5 - Script 03: Dimension Expansion (newaxis, expand_dims) and Squeezing
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Adding singleton dimensions via np.newaxis (None slicing)
- np.expand_dims(arr, axis=...) for explicit axis insertion
- np.squeeze(arr) for stripping redundant 1-sized singleton dimensions
================================================================================
"""

import numpy as np

def demonstrate_expansion_and_squeezing():
    print("=" * 65)
    print("1. EXPANDING DIMENSIONS WITH np.newaxis & np.expand_dims")
    print("=" * 65)

    v = np.array([10, 20, 30])  # Shape (3,)
    print("Original Vector Shape:", v.shape)

    # Insert row dimension -> (1, 3)
    v_row = v[np.newaxis, :]
    print("v[np.newaxis, :] Shape :", v_row.shape)

    # Insert col dimension -> (3, 1)
    v_col = v[:, np.newaxis]
    print("v[:, np.newaxis] Shape :", v_col.shape)

    # Using np.expand_dims
    v_exp = np.expand_dims(v, axis=0) # Shape (1, 3)
    print("np.expand_dims(axis=0) :", v_exp.shape)

    print("\n" + "=" * 65)
    print("2. SQUEEZING REDUNDANT AXES WITH np.squeeze()")
    print("=" * 65)
    
    # 4D tensor with redundant singleton dimensions
    redundant = np.zeros((1, 5, 1, 3))
    print("Redundant Tensor Shape :", redundant.shape)

    # Squeeze all singleton dimensions
    squeezed_all = np.squeeze(redundant)
    print("np.squeeze(all) Shape  :", squeezed_all.shape)

    # Squeeze specific axis only (axis 0)
    squeezed_ax0 = np.squeeze(redundant, axis=0)
    print("np.squeeze(axis=0) Shape:", squeezed_ax0.shape)

if __name__ == "__main__":
    demonstrate_expansion_and_squeezing()
