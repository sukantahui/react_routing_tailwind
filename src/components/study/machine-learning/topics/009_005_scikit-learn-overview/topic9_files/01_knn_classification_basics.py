"""
Topic 9: KNeighborsClassifier
Script 1: KNN Classification Basics and Neighbor Inspection
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.neighbors import KNeighborsClassifier

# Feature matrix: [Attendance Rate %, Test Score]
X_train = np.array([
    [50, 45],
    [55, 50],
    [65, 55],
    [70, 75],
    [85, 80],
    [90, 85],
    [95, 90]
])
# Labels: 0 (Academic Alert) / 1 (Good Standing)
y_train = np.array([0, 0, 0, 1, 1, 1, 1])

# Initialize KNN Classifier with K=3 neighbors
knn = KNeighborsClassifier(n_neighbors=3, metric='minkowski', p=2)
knn.fit(X_train, y_train)

# Query a new student: [Attendance: 68%, Score: 60]
X_new = np.array([[68, 60]])

# Predict class and probability
pred_class = knn.predict(X_new)
pred_prob = knn.predict_proba(X_new)

# Find exact 3 nearest neighbors and distances
distances, indices = knn.kneighbors(X_new)

print("--- KNN Classification (K=3) ---")
print(f"Query Sample: {X_new[0]}")
print(f"Predicted Class: {pred_class[0]} ({'Good Standing' if pred_class[0]==1 else 'Academic Alert'})")
print(f"Class Probabilities: P(0)={pred_prob[0][0]:.2f}, P(1)={pred_prob[0][1]:.2f}")

print("\n--- 3 Nearest Neighbors Identified ---")
for rank, (dist, idx) in enumerate(zip(distances[0], indices[0]), 1):
    neighbor_pt = X_train[idx]
    neighbor_label = y_train[idx]
    print(f"Rank {rank}: Sample #{idx} at {neighbor_pt}, Class={neighbor_label}, Distance={dist:.3f}")
