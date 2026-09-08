"""
Topic 2: Memory Efficiency with scipy.sparse Matrices
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import sparse

# High-dimensional NLP text data (TF-IDF, Bag of Words) contains mostly zeros.
# SciPy sparse matrices store only non-zero entries, saving gigabytes of RAM.

# Create a 1000x1000 dense matrix with 99% zeros
dense_matrix = np.zeros((1000, 1000))
dense_matrix[10, 20] = 5.0
dense_matrix[500, 800] = 12.5

# Convert to Compressed Sparse Row (CSR) matrix
csr_matrix = sparse.csr_matrix(dense_matrix)

dense_bytes = dense_matrix.nbytes
sparse_bytes = csr_matrix.data.nbytes + csr_matrix.indices.nbytes + csr_matrix.indptr.nbytes

print("--- Memory Comparison for 1000x1000 Matrix ---")
print(f"Dense NumPy Array Size   : {dense_bytes / 1024:.2f} KB")
print(f"SciPy CSR Sparse Matrix  : {sparse_bytes / 1024:.2f} KB")
print(f"Memory Savings Ratio     : {dense_bytes / sparse_bytes:.1f}x reduction")
