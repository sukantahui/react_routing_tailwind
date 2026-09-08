"""
================================================================================
Topic 1 - Script 01: Verifying NumPy Installation and Hardware Acceleration
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Checking installed NumPy version (__version__)
- Inspecting installation path and file location
- Checking BLAS / LAPACK linear algebra acceleration backend (np.show_config())
================================================================================
"""

import sys

def verify_numpy():
    print("=" * 60)
    print("STEP 1: Importing NumPy and Inspecting Environment")
    print("=" * 60)
    
    try:
        import numpy as np
        print(f"[SUCCESS] NumPy imported successfully as 'np'!")
        print(f"NumPy Version      : {np.__version__}")
        print(f"Python Executable  : {sys.executable}")
        print(f"NumPy Module Path  : {np.__file__}")
    except ImportError as e:
        print(f"[ERROR] NumPy is not installed: {e}")
        print("Tip: Run 'pip install numpy' in your terminal.")
        return

    print("\n" + "=" * 60)
    print("STEP 2: Inspecting Linear Algebra Acceleration (BLAS / LAPACK)")
    print("=" * 60)
    print("NumPy links directly to optimized Fortran/C linear algebra libraries")
    print("such as OpenBLAS, MKL, or Apple Accelerate.")
    print("-" * 60)
    # np.show_config() prints the underlying acceleration libraries
    np.show_config()

if __name__ == "__main__":
    verify_numpy()
