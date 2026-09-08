"""
Topic 5: StandardScaler and MinMaxScaler
Script 2: Deep Dive into MinMaxScaler (Bound Range Scaling)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# Student metrics
X_train = np.array([
    [10.0, 45.0],
    [25.0, 75.0],
    [15.0, 55.0],
    [30.0, 85.0],
    [20.0, 65.0]
])

feature_names = ['study_hours', 'score']

# 1. Scaling to default [0, 1] range
minmax_01 = MinMaxScaler(feature_range=(0, 1))
X_scaled_01 = minmax_01.fit_transform(X_train)

print("--- MinMaxScaler (feature_range=(0, 1)) ---")
print(pd.DataFrame(X_scaled_01, columns=feature_names))
print("Learned Minimums (data_min_):", minmax_01.data_min_)
print("Learned Maximums (data_max_):", minmax_01.data_max_)
print("Learned Data Range (data_range_):", minmax_01.data_range_)

# 2. Scaling to custom range [-1, 1] (common for neural networks / tanh activations)
minmax_custom = MinMaxScaler(feature_range=(-1, 1))
X_scaled_custom = minmax_custom.fit_transform(X_train)

print("\n--- MinMaxScaler (feature_range=(-1, 1)) ---")
print(pd.DataFrame(X_scaled_custom, columns=feature_names))

# Behavior with out-of-bounds test points
X_out_of_bounds = np.array([[35.0, 95.0], [5.0, 30.0]])
X_out_scaled = minmax_01.transform(X_out_of_bounds)
print("\n--- Test points outside training bounds [0, 1] ---")
print("Raw out-of-bound samples:\n", X_out_of_bounds)
print("Scaled out-of-bound (can exceed 1 or go below 0):\n", X_out_scaled)
