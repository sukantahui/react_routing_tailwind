"""
Topic 11: Naive Bayes
Script 3: Custom Class Priors & Incremental Partial Fitting
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.naive_bayes import GaussianNB

# Incremental batch learning with partial_fit()
# Useful when datasets exceed available RAM (Out-of-core learning)
gnb = GaussianNB()

# Batch 1
X_batch1 = np.array([[1.0, 2.0], [2.0, 1.0], [8.0, 9.0]])
y_batch1 = np.array([0, 0, 1])
classes = np.array([0, 1])

# Initial partial fit requires passing all possible class labels
gnb.partial_fit(X_batch1, y_batch1, classes=classes)
print(f"Batch 1 processed. Samples seen: {gnb.class_count_}")

# Batch 2
X_batch2 = np.array([[1.5, 2.5], [9.0, 8.5], [7.5, 8.0]])
y_batch2 = np.array([0, 1, 1])
gnb.partial_fit(X_batch2, y_batch2)

print(f"Batch 2 processed. Total samples seen: {gnb.class_count_}")
print(f"Updated means (theta_):\n{gnb.theta_}")
print(f"Updated class priors: {gnb.class_prior_}")
