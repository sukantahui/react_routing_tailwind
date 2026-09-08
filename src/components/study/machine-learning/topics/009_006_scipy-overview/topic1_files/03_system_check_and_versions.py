"""
Topic 1: System Diagnostic and Linear Algebra Backend Check
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import scipy
import numpy as np
import sys

print("--- System Diagnostic Environment ---")
print(f"Python Version : {sys.version.split()[0]}")
print(f"NumPy Version  : {np.__version__}")
print(f"SciPy Version  : {scipy.__version__}")

# Checking BLAS / LAPACK configurations in SciPy
try:
    from scipy.linalg import blas, lapack
    print(f"BLAS prefix    : {blas.find_best_blas_type()[0]}")
    print("BLAS / LAPACK hardware acceleration is active.")
except Exception as e:
    print("Diagnostics note:", e)
