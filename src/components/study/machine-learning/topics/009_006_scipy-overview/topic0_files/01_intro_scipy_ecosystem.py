"""
Topic 0: Introduction to SciPy Ecosystem
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import scipy
import numpy as np

# Display SciPy version and core configuration
print("--- SciPy Scientific Computing Stack ---")
print(f"SciPy Version : {scipy.__version__}")
print(f"NumPy Version : {np.__version__}")

# Exploring core subpackages in SciPy
subpackages = {
    "scipy.stats": "Statistical functions and probability distributions",
    "scipy.spatial": "Spatial data structures and distance metrics",
    "scipy.linalg": "Advanced linear algebra with LAPACK/BLAS wrappers",
    "scipy.optimize": "Numerical optimization and root-finding routines",
    "scipy.integrate": "Numerical integration and differential equations",
    "scipy.signal": "Signal processing and filter designs",
    "scipy.ndimage": "Multi-dimensional image processing",
    "scipy.special": "Mathematical special functions (Gamma, Bessel, Error function)"
}

print("\n--- SciPy Functional Domains ---")
for module, desc in subpackages.items():
    print(f" • {module:<18}: {desc}")
