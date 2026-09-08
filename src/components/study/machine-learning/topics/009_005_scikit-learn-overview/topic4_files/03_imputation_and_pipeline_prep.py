"""
Topic 4: Preprocessing with sklearn.preprocessing
Script 3: FunctionTransformer and Custom Preprocessing Logic
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.preprocessing import FunctionTransformer

# Custom log transformation function handling zero values
def safe_log_transform(X):
    return np.log1p(np.maximum(0, X))

# Inverse log function
def safe_expm1_transform(X):
    return np.expm1(X)

# Sample website traffic data with extreme values
traffic_data = np.array([
    [0.0],
    [10.0],
    [100.0],
    [1000.0],
    [50000.0]
])

# Create a custom stateless transformer
log_transformer = FunctionTransformer(
    func=safe_log_transform,
    inverse_func=safe_expm1_transform,
    validate=True
)

transformed_traffic = log_transformer.fit_transform(traffic_data)
recovered_traffic = log_transformer.inverse_transform(transformed_traffic)

print("--- Original Raw Traffic ---")
print(traffic_data.flatten())

print("\n--- Log1p Transformed Traffic ---")
print(np.round(transformed_traffic.flatten(), 4))

print("\n--- Inverted Back to Original ---")
print(np.round(recovered_traffic.flatten(), 1))
