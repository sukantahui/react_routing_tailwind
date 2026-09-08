"""
Topic 11: Multi-Column Z-Score Data Cleaning Matrix
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# 2D Feature Matrix: [Income in ₹ Lakhs, Credit Score (300-900)]
customer_data = np.array([
    [6.5, 750],
    [8.0, 780],
    [5.2, 710],
    [7.1, 740],
    [95.0, 760], # Outlier in Income
    [6.8, 120],  # Outlier in Credit Score
    [7.5, 770]
])

# scipy.stats.zscore across axis=0 standardizes each column independently
z_matrix = stats.zscore(customer_data, axis=0)

print("--- 2D Multi-Feature Z-Score Matrix ---")
print("Standardized Z-Score Matrix:")
print(np.round(z_matrix, 2))

# Row is an outlier if ANY feature has |Z| > 2.0
outlier_rows = (np.abs(z_matrix) > 2.0).any(axis=1)
clean_customers = customer_data[~outlier_rows]

print(f"\nOriginal Samples: {len(customer_data)}")
print(f"Clean Samples   : {len(clean_customers)}")
print("Clean Customers Matrix:\n", clean_customers)
