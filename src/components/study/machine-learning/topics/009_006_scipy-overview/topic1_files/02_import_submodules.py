"""
Topic 1: Explicit Submodule Importing in SciPy
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

# IMPORTANT: Unlike some libraries, SciPy does NOT automatically load all 
# subpackages when you do `import scipy`. You MUST explicitly import submodules!

# Correct & Idiomatic Imports:
from scipy import stats
from scipy import spatial
from scipy import linalg
from scipy import optimize

print("--- Subpackages Explicitly Imported ---")
print("scipy.stats:", stats)
print("scipy.spatial:", spatial)
print("scipy.linalg:", linalg)
print("scipy.optimize:", optimize)

# Example: Using stats directly
norm_dist = stats.norm(loc=0, scale=1)
print(f"Normal distribution mean: {norm_dist.mean()}, std: {norm_dist.std()}")
