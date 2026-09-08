"""
================================================================================
Topic 3 - Script 01: Basic & Multi-Dimensional Array Creation from Sequences
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Creating 1D vectors from Python lists and tuples
- Creating 2D matrices from nested lists (e.g. Student Exam Marks)
- Creating 3D tensors from deeply nested sequences
- Inspecting dimensions (.ndim) and shapes (.shape)
================================================================================
"""

import numpy as np

def demonstrate_basic_creation():
    print("=" * 65)
    print("1. 1D VECTOR CREATION")
    print("=" * 65)
    # Python list of marks for Debangshu and Susmita
    marks_list = [88.5, 92.0, 79.5, 95.0, 84.0]
    vec = np.array(marks_list)
    print("Python List :", marks_list)
    print("NumPy Vector:", vec)
    print(f"Shape: {vec.shape}, ndim: {vec.ndim}, dtype: {vec.dtype}")

    print("\n" + "=" * 65)
    print("2. 2D MATRIX CREATION (Tabular Student Dataset)")
    print("=" * 65)
    # 3 students x 3 exam scores (Math, Science, English)
    tabular_data = [
        [85, 90, 88],  # Debangshu
        [92, 94, 91],  # Susmita
        [78, 82, 80]   # Swadeep
    ]
    mat = np.array(tabular_data)
    print("2D Matrix:\n", mat)
    print(f"Shape: {mat.shape} (rows, cols), ndim: {mat.ndim}")

    print("\n" + "=" * 65)
    print("3. 3D TENSOR CREATION (2 Batches of 2 Students x 2 Subjects)")
    print("=" * 65)
    nested_3d = [
        [[80, 85], [90, 95]],  # Batch 1 (Barrackpore Lab A)
        [[70, 75], [88, 92]]   # Batch 2 (Barrackpore Lab B)
    ]
    tensor = np.array(nested_3d)
    print("3D Tensor:\n", tensor)
    print(f"Shape: {tensor.shape} (batches, students, subjects), ndim: {tensor.ndim}")

if __name__ == "__main__":
    demonstrate_basic_creation()
