"""
Topic 18: Worked Example 2 (End-to-End Regression)
Script 3: Residual Analysis & Production Prediction
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

# Train data
X_train = np.array([[10], [15], [20], [25], [30], [35]])
y_train = np.array([3.2, 4.5, 6.0, 8.2, 9.8, 12.0]) # Salary in Lakhs

model = make_pipeline(StandardScaler(), Ridge(alpha=0.5))
model.fit(X_train, y_train)

# 1. Residual Analysis (Check if residuals are zero-centered and randomly distributed)
train_preds = model.predict(X_train)
residuals = y_train - train_preds

print("--- Residual Diagnostics ---")
for x, true_val, pred_val, res in zip(X_train.flatten(), y_train, train_preds, residuals):
    print(f"Hours: {x:2d}h | True: ₹{true_val:.1f}L | Pred: ₹{pred_val:.2f}L | Residual: {res:+.2f}")

print(f"\nMean Residual: {residuals.mean():.4f} (Ideal is ~0)")
print(f"Max Absolute Error: ₹{np.max(np.abs(residuals)):.2f} Lakhs")

# 2. Production Inference on New Student
X_new = np.array([[22], [32]])
new_predictions = model.predict(X_new)

print("\n--- Production Inferences ---")
for hours, pred_salary in zip(X_new.flatten(), new_predictions):
    print(f"Student studying {hours} hrs/week -> Expected Placement: ₹{pred_salary:.2f} Lakhs/annum")
