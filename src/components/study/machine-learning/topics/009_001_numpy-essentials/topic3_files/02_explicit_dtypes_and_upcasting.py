"""
================================================================================
Topic 3 - Script 02: Explicit Data Types and Implicit Upcasting Hierarchy
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Setting dtype explicitly: dtype=np.float32, np.int8, np.bool_
- NumPy automatic type coercion rules: bool -> int -> float -> complex -> str
- The hidden string trap: Why adding "100" converts the whole numerical matrix to string
================================================================================
"""

import numpy as np

def demonstrate_dtypes_and_upcasting():
    print("=" * 65)
    print("1. EXPLICIT DTYPE SPECIFICATION")
    print("=" * 65)
    
    # Explicit float32 (Standard for PyTorch / TensorFlow)
    f32_arr = np.array([1, 2, 3, 4], dtype=np.float32)
    print("float32 Array :", f32_arr)
    print("dtype         :", f32_arr.dtype, f"({f32_arr.itemsize} bytes per element)")

    # Explicit int8 (Memory optimized labels: -128 to 127)
    labels = np.array([0, 1, 1, 0, 1], dtype=np.int8)
    print("\nint8 Labels   :", labels)
    print("dtype         :", labels.dtype, f"({labels.itemsize} byte per element)")

    print("\n" + "=" * 65)
    print("2. IMPLICIT UPCASTING (MIXED NUMERIC TYPES)")
    print("=" * 65)
    # Mixing integer and float -> automatically promotes all to float64
    mixed_num = np.array([10, 20.5, 30])
    print("Input: [10, 20.5, 30]")
    print("Result dtype:", mixed_num.dtype)
    print("Result Array:", mixed_num)

    print("\n" + "=" * 65)
    print("3. THE STRING TRAP: ACCIDENTAL UPCASTING")
    print("=" * 65)
    # If Sachin passes a single string by mistake:
    mixed_str = np.array([10, 20, "30"])
    print("Input: [10, 20, '30']")
    print("Result dtype:", mixed_str.dtype)
    print("Result Array:", mixed_str)
    print("WARNING: String arrays cannot undergo mathematical vectorization!")

if __name__ == "__main__":
    demonstrate_dtypes_and_upcasting()
