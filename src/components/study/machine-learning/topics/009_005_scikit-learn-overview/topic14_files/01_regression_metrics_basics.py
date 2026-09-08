"""
Topic 14: Regression Metrics
Script 1: Computing MAE, MSE, RMSE, and R2 in Scikit-learn
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
    mean_absolute_percentage_error
)

# True student exam scores vs Model predicted scores
y_true = np.array([50.0, 75.0, 90.0, 40.0, 60.0])
y_pred = np.array([52.0, 70.0, 95.0, 35.0, 64.0])

# 1. Mean Absolute Error (MAE)
mae = mean_absolute_error(y_true, y_pred)

# 2. Mean Squared Error (MSE)
mse = mean_squared_error(y_true, y_pred)

# 3. Root Mean Squared Error (RMSE)
rmse = np.sqrt(mse) # or mean_squared_error(y_true, y_pred, squared=False) in older sklearn

# 4. R-squared (R2 Score)
r2 = r2_score(y_true, y_pred)

# 5. MAPE (Mean Absolute Percentage Error)
mape = mean_absolute_percentage_error(y_true, y_pred)

print("--- Regression Metrics Evaluation ---")
print(f"Mean Absolute Error (MAE):           {mae:.2f} marks (Average deviation)")
print(f"Mean Squared Error (MSE):            {mse:.2f} marks^2 (Penalizes larger errors)")
print(f"Root Mean Squared Error (RMSE):      {rmse:.2f} marks (Original physical unit)")
print(f"R-squared Score (R2):                {r2:.4f} ({r2*100:.1f}% variance explained)")
print(f"Mean Absolute Percentage Error (MAPE): {mape*100:.2f}%")
