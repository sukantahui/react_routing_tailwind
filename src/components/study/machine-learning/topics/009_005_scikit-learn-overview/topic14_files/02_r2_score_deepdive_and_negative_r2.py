"""
Topic 14: Regression Metrics
Script 2: Demystifying R2 Score & How R2 Can Be Negative
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.metrics import r2_score

y_true = np.array([10.0, 20.0, 30.0, 40.0, 50.0])
y_mean = np.mean(y_true) # 30.0

# 1. Baseline Model: Predicts mean value (y_mean) for everything
y_pred_baseline = np.full_like(y_true, y_mean)
r2_baseline = r2_score(y_true, y_pred_baseline)
print("1. Baseline Mean Predictor:")
print(f"R2 Score = {r2_baseline:.4f} (By definition, predicting the mean yields R2 = 0.0)")

# 2. Good Model: Close to true values
y_pred_good = np.array([11.0, 19.0, 31.0, 39.0, 51.0])
r2_good = r2_score(y_true, y_pred_good)
print("\n2. Good Model:")
print(f"R2 Score = {r2_good:.4f} (Explains {r2_good*100:.1f}% of target variance)")

# 3. Terribly Pathological Model: Worse than predicting the mean!
y_pred_terrible = np.array([100.0, -50.0, 200.0, -100.0, 300.0])
r2_terrible = r2_score(y_true, y_pred_terrible)
print("\n3. Terribly Overfitted / Broken Model:")
print(f"R2 Score = {r2_terrible:.4f} (Negative! Worse than a horizontal mean line)")
