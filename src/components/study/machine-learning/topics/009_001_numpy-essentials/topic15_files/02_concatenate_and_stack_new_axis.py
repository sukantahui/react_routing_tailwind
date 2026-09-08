"""
02_concatenate_and_stack_new_axis.py
====================================
Topic: np.concatenate vs np.stack, column_stack, and New Dimension Creation
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("np.concatenate VS np.stack & NEW AXIS CREATION")
    print("=" * 70)

    # 1. np.concatenate: Joins existing arrays along an EXISTING axis
    # Array shapes: (2, 3) and (2, 3)
    a = np.array([[10, 20, 30], [40, 50, 60]])
    b = np.array([[70, 80, 90], [15, 25, 35]])

    concat_ax0 = np.concatenate((a, b), axis=0)  # shape (4, 3)
    concat_ax1 = np.concatenate((a, b), axis=1)  # shape (2, 6)

    print("Array a (2x3):\n", a)
    print("Array b (2x3):\n", b)
    print(f"\n1. np.concatenate(axis=0) Shape: {concat_ax0.shape}\n", concat_ax0)
    print(f"\n2. np.concatenate(axis=1) Shape: {concat_ax1.shape}\n", concat_ax1)

    # 2. np.stack: Joins arrays along a NEW axis (increases dimensionality)
    # (2, 3) and (2, 3) stacked along axis=0 => (2, 2, 3) (e.g. 2 batches of 2 students x 3 scores)
    stack_ax0 = np.stack((a, b), axis=0)  # Shape: (2, 2, 3)
    stack_ax1 = np.stack((a, b), axis=1)  # Shape: (2, 2, 3)
    stack_ax2 = np.stack((a, b), axis=2)  # Shape: (2, 3, 2)

    print(f"\n3. np.stack(axis=0) Shape: {stack_ax0.shape} (Added new 0-th dimension)")
    print(f"4. np.stack(axis=2) Shape: {stack_ax2.shape} (Added new 2-nd dimension)")

    # 3. np.column_stack for 1D arrays
    # 1D feature vectors mapped directly to columns of a design matrix
    ages = np.array([21, 22, 20, 23])
    scores = np.array([85, 92, 65, 88])
    attendance = np.array([95, 98, 80, 92])

    feature_matrix = np.column_stack((ages, scores, attendance))
    print("\n5. np.column_stack 1D arrays into 2D Feature Matrix:")
    print(f"   Shape: {feature_matrix.shape} (N=4 students, D=3 features)")
    print(feature_matrix)

if __name__ == "__main__":
    main()
