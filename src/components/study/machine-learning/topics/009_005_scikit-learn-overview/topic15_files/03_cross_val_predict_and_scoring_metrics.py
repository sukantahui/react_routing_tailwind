"""
Topic 15: Cross-Validation
Script 3: Generating Out-of-Fold Predictions via cross_val_predict()
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.datasets import load_iris
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import confusion_matrix, classification_report

X, y = load_iris(return_X_y=True)

knn = KNeighborsClassifier(n_neighbors=5)

# cross_val_predict generates out-of-fold predictions for every sample in the dataset
# Each point is predicted by a model trained on the other (K-1) folds!
y_oof_pred = cross_val_predict(knn, X, y, cv=5)

print("--- Out-of-Fold Confusion Matrix ---")
cm = confusion_matrix(y, y_oof_pred)
print(cm)

print("\n--- Out-of-Fold Classification Report ---")
print(classification_report(y, y_oof_pred, target_names=['Setosa', 'Versicolor', 'Virginica']))
