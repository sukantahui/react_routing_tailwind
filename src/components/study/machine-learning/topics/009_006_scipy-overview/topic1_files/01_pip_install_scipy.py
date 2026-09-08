"""
Topic 1: Installing and Importing SciPy
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

# Installation Commands:
# 1. Standard pip:
#    pip install scipy
# 2. Upgrade existing installation:
#    pip install -U scipy
# 3. Conda environment:
#    conda install -c conda-forge scipy
# 4. Poetry environment:
#    poetry add scipy

import scipy
import numpy as np

print(f"Successfully loaded SciPy: version {scipy.__version__}")
print(f"SciPy installation path: {scipy.__file__}")
