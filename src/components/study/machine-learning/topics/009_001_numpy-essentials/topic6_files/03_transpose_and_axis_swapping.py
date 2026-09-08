"""
================================================================================
Topic 6 - Script 03: Matrix Transpose (.T) and Multidimensional Axis Permutations
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- 2D Matrix Transposition with .T / np.transpose()
- Swapping arbitrary axes with np.swapaxes() and np.transpose(axes=(...))
- Converting Computer Vision image batches: Channels-Last (NHWC) to Channels-First (NCHW)
================================================================================
"""

import numpy as np

def demonstrate_transpose_and_axes():
    print("=" * 65)
    print("1. 2D MATRIX TRANSPOSITION (X^T)")
    print("=" * 65)

    # 3 students x 2 features (Study Hours, Attendance)
    X = np.array([
        [2.5, 80.0],
        [4.0, 90.0],
        [6.5, 95.0]
    ])
    print("Matrix X (Shape (3, 2)):\n", X)
    print("\nTranspose X.T (Shape (2, 3)):\n", X.T)

    print("\n" + "=" * 65)
    print("2. COMPUTER VISION: AXIS PERMUTATION (NHWC -> NCHW)")
    print("=" * 65)
    
    # TensorFlow format: (Batch=8, Height=224, Width=224, Channels=3)
    tf_batch = np.zeros((8, 224, 224, 3), dtype=np.float32)
    print("TensorFlow Format (NHWC) Shape:", tf_batch.shape)

    # Convert to PyTorch format: (Batch=8, Channels=3, Height=224, Width=224)
    # Original axis indices: Batch=0, Height=1, Width=2, Channels=3
    # Desired order:         Batch=0, Channels=3, Height=1, Width=2
    torch_batch = np.transpose(tf_batch, axes=(0, 3, 1, 2))
    print("PyTorch Format (NCHW) Shape   :", torch_batch.shape)

if __name__ == "__main__":
    demonstrate_transpose_and_axes()
