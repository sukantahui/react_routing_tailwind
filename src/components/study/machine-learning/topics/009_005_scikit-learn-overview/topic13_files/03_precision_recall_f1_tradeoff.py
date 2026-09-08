"""
Topic 13: Model Evaluation (Classification)
Script 3: Multi-class Evaluation & Macro vs Weighted Averaging
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.metrics import classification_report, f1_score

# 3-Class problem: 0 = Distinction, 1 = First Class, 2 = Pass
# Notice severe class imbalance: Class 0 is rare (2 samples), Class 2 is common (10 samples)
y_true = np.array([0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
y_pred = np.array([0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])

target_names = ['Distinction (0)', 'First Class (1)', 'Pass (2)']

print("--- Multi-Class Classification Report ---")
print(classification_report(y_true, y_pred, target_names=target_names))

# Compare Averaging Methods:
# Macro: Unweighted arithmetic mean across classes (treats small classes equally)
# Weighted: Calculates metrics for each label, and finds their average weighted by support (sample count)
f1_macro = f1_score(y_true, y_pred, average='macro')
f1_weighted = f1_score(y_true, y_pred, average='weighted')

print("--- F1-Score Averaging Comparison ---")
print(f"F1 (Macro average):    {f1_macro:.4f} (Heavily penalizes poor performance on rare classes)")
print(f"F1 (Weighted average): {f1_weighted:.4f} (Dominated by large majority classes)")
