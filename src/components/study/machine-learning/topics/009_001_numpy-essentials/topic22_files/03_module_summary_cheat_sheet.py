"""
03_module_summary_cheat_sheet.py
================================
Topic: Complete NumPy Essentials Module Summary & Master Cheat Sheet
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("MASTER NUMPY ESSENTIALS CHEAT SHEET & SYNTAX SUMMARY")
    print("=" * 70)

    # 1. Creation & Geometry
    arr = np.arange(1, 13).reshape(3, 4)
    print("1. Array Creation & Reshaping:\n", arr)
    print(f"   Shape: {arr.shape}, Size: {arr.size}, Dtype: {arr.dtype}, ndim: {arr.ndim}")

    # 2. Slicing & Boolean Masking
    mask = (arr % 2 == 0) & (arr > 5)
    print(f"\n2. Boolean Filtering (Even & > 5): {arr[mask]}")

    # 3. Aggregation & Axis Reductions
    print(f"\n3. Statistical Reductions:")
    print(f"   Column Means (axis=0) : {np.mean(arr, axis=0)}")
    print(f"   Row Sums (axis=1)     : {np.sum(arr, axis=1)}")
    print(f"   Global Argmax Index   : {np.argmax(arr)}")

    # 4. Broadcasting & Linear Algebra
    bias = np.array([10, 20, 30, 40])
    broadcast_add = arr + bias
    print("\n4. Broadcasting Addition (arr + bias):\n", broadcast_add)

    # Matrix Multiplication
    W = np.ones((4, 2))
    Z = arr @ W  # (3, 4) @ (4, 2) => (3, 2)
    print(f"\n5. Matrix Multiplication (arr @ W) Shape: {Z.shape}\n", Z)

    # 5. Stacking & PRNG
    rng = np.random.default_rng(seed=42)
    random_matrix = rng.normal(loc=0.0, scale=1.0, size=(3, 2))
    stacked = np.hstack((Z, random_matrix))
    print(f"\n6. Horizontal Stack with Gaussian Random Tensor Shape: {stacked.shape}\n", np.round(stacked, 2))

if __name__ == "__main__":
    main()
