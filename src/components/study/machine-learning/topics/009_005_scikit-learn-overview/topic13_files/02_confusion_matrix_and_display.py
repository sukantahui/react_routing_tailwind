"""
Topic 13: Model Evaluation (Classification)
Script 2: Confusion Matrix Calculation and Structure
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.metrics import confusion_matrix

# True targets vs Predictions
y_true = np.array([1, 1, 1, 1, 0, 0, 0, 0, 0, 0])
y_pred = np.array([1, 1, 0, 1, 0, 0, 1, 0, 0, 0])

# Compute 2x2 confusion matrix
cm = confusion_matrix(y_true, y_pred)

print("--- Raw 2x2 Confusion Matrix Array ---")
print(cm)

# Unpack 2x2 confusion matrix components
tn, fp, fn, tp = cm.ravel()

print("\n--- Confusion Matrix Elements Breakdown ---")
print(f"True Negatives (TN):  {tn} (Correctly classified as 0)")
print(f"False Positives (FP): {fp} (Type I Error: Predicted 1, actually 0)")
print(f"False Negatives (FN): {fn} (Type II Error: Missed positive, actually 1)")
print(f"True Positives (TP):  {tp} (Correctly classified as 1)")

# Format into neat Pandas DataFrame with readable labels
cm_df = pd.DataFrame(
    cm,
    index=['Actual: Negative (0)', 'Actual: Positive (1)'],
    columns=['Predicted: Negative (0)', 'Predicted: Positive (1)']
)
print("\n--- Formatted Matrix ---")
print(cm_df)
