"""
Topic 5: StandardScaler and MinMaxScaler
Script 3: Inverting Scaled Predictions & Side-by-Side Comparison
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Original target prices / scores
y_raw = np.array([[50000], [120000], [75000], [250000], [90000]])

# Fit StandardScaler on target variable
y_scaler = StandardScaler()
y_scaled = y_scaler.fit_transform(y_raw)

print("Original Target:\n", y_raw.flatten())
print("Standard Scaled Target:\n", np.round(y_scaled.flatten(), 4))

# Suppose an ML model predicts scaled values:
model_predictions_scaled = np.array([[0.5], [-0.8], [1.2]])

# Invert back to real rupee prices
real_world_predictions = y_scaler.inverse_transform(model_predictions_scaled)

print("\n--- Inverted Predictions back to Real Domain ---")
for scaled, real in zip(model_predictions_scaled.flatten(), real_world_predictions.flatten()):
    print(f"Model Scaled Output: {scaled:+.2f}  ==>  Real Price: ₹{real:,.2f}")

# Side-by-side comparison under an extreme outlier
data_with_outlier = np.array([[10], [12], [14], [11], [100]])
std_out = StandardScaler().fit_transform(data_with_outlier)
minmax_out = MinMaxScaler().fit_transform(data_with_outlier)

print("\n--- Impact of Outlier (100 in [10, 12, 14, 11, 100]) ---")
print(f"StandardScaler output: {np.round(std_out.flatten(), 2)}")
print(f"MinMaxScaler output:   {np.round(minmax_out.flatten(), 2)}")
