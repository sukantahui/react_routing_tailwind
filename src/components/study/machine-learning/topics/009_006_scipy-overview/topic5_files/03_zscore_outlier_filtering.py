"""
Topic 5: Anomaly and Outlier Filtering Pipeline via Z-Score
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Sensor temperature dataset from Chandan Pukur smart server rack (°C)
temperatures = np.array([24.5, 25.1, 24.8, 25.0, 24.9, 85.0, 25.2, 24.7, -15.0, 25.3])

# Calculate z-scores
z_scores = stats.zscore(temperatures)

# Standard outlier threshold: |Z| > 2.5 or 3.0
threshold = 2.5
outlier_mask = np.abs(z_scores) > threshold

clean_data = temperatures[~outlier_mask]
outliers = temperatures[outlier_mask]

print(f"Raw Temperatures : {temperatures}")
print(f"Detected Outliers (|Z| > {threshold}): {outliers}")
print(f"Filtered Clean Data               : {clean_data}")
