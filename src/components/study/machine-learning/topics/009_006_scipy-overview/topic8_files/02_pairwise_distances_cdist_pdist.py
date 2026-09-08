"""
Topic 8: Pairwise Distance Matrices via cdist and pdist
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy.spatial.distance import cdist, pdist, squareform

# Matrix of 3 training points in 2D
X_train = np.array([
    [1.0, 2.0],
    [2.0, 4.0],
    [5.0, 8.0]
])

# Matrix of 2 test points to classify via KNN
X_test = np.array([
    [1.5, 2.5],
    [4.0, 7.0]
])

# cdist computes all pairwise distances between every row in X_test and every row in X_train
dist_matrix = cdist(X_test, X_train, metric='euclidean')

print("--- Pairwise Cross-Distance Matrix (cdist) ---")
print("Shape (n_test, n_train):", dist_matrix.shape)
print("Distance Matrix (Rows = Test Points, Cols = Train Points):")
print(np.round(dist_matrix, 3))

# pdist computes condensed pairwise distances between all pairs in X_train
condensed = pdist(X_train, metric='cityblock')
square_mat = squareform(condensed)
print("\n--- Self Pairwise Manhattan Matrix (squareform(pdist)) ---")
print(square_mat)
