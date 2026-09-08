"""
Topic 14: Regression Metrics
Script 3: Outlier Sensitivity: MAE vs MSE & Huber Loss
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error

# Normal dataset predictions
y_true_clean = np.array([10, 20, 30, 40, 50])
y_pred_clean = np.array([12, 19, 31, 38, 52])

mae_clean = mean_absolute_error(y_true_clean, y_pred_clean)
mse_clean = mean_squared_error(y_true_clean, y_pred_clean)

print("--- Clean Dataset (Residuals ≈ ±2) ---")
print(f"MAE: {mae_clean:.2f} | MSE: {mse_clean:.2f} | RMSE: {np.sqrt(mse_clean):.2f}")

# Single extreme prediction outlier (e.g. predicting 150 instead of 50)
y_pred_outlier = np.array([12, 19, 31, 38, 150]) # residual on last point is 100!

mae_outlier = mean_absolute_error(y_true_clean, y_pred_outlier)
mse_outlier = mean_squared_error(y_true_clean, y_pred_outlier)

print("\n--- Dataset with Single Outlier Error (100 error on 1 sample) ---")
print(f"MAE: {mae_outlier:.2f} (Increased by {(mae_outlier/mae_clean):.1f}x)")
print(f"MSE: {mse_outlier:.2f} (Exploded by {(mse_outlier/mse_clean):.1f}x because 100^2 = 10,000!)")
print(f"RMSE: {np.sqrt(mse_outlier):.2f}")
