"""
Topic 13: Model Evaluation (Classification)
Script 1: Accuracy, Precision, Recall, and F1-Score in Scikit-learn
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)

# Ground truth test labels vs Model predictions
# 1 = Disease/Fraud Positive, 0 = Healthy/Normal Negative
y_true = np.array([1, 1, 1, 1, 0, 0, 0, 0, 0, 0])
y_pred = np.array([1, 1, 0, 1, 0, 0, 1, 0, 0, 0])

# 1. Basic scalar metrics
acc = accuracy_score(y_true, y_pred)
prec = precision_score(y_true, y_pred)
rec = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print("--- Core Classification Metrics ---")
print(f"Accuracy:  {acc:.4f} ({acc*100:.1f}%)")
print(f"Precision: {prec:.4f} (TP / (TP + FP) = 3 / (3 + 1))")
print(f"Recall:    {rec:.4f} (TP / (TP + FN) = 3 / (3 + 1))")
print(f"F1-Score:  {f1:.4f} (Harmonic mean of Precision & Recall)")

# 2. Comprehensive text report
print("\n--- Detailed classification_report() ---")
print(classification_report(y_true, y_pred, target_names=['Class 0 (Normal)', 'Class 1 (Disease)']))
