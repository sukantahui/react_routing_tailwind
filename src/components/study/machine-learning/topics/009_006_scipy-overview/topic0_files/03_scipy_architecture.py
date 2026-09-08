"""
Topic 0: SciPy Architecture & Underlying Fortran/C Wrappers
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import scipy
import numpy as np

# SciPy builds directly on top of NumPy ndarrays, adding highly optimized 
# LAPACK, BLAS, and FFTPACK routines written in C and Fortran.

print("--- SciPy Array Interoperability ---")
arr = np.array([2.5, 3.8, 1.9, 4.2, 5.1])
print("NumPy Array Object:", type(arr))

# All SciPy functions consume standard NumPy arrays and return numpy arrays or namedtuples
from scipy import stats
z_scores = stats.zscore(arr)
print("Computed Z-Scores with scipy.stats.zscore:")
print(z_scores)
print("Result Type:", type(z_scores))
