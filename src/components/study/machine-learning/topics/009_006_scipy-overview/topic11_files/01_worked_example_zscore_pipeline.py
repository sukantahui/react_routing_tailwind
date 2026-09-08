"""
Topic 11: Worked Example 1 - End-to-End Z-Score Outlier Pipeline
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Real-world scenario: Real Estate Housing Price per Sq.Ft. in Barrackpore & Kolkata
# Raw dataset containing genuine home sales and erroneous typing entries (e.g. ₹95,000/sq.ft typo)
raw_prices_sqft = np.array([
    3200, 3450, 3100, 3600, 3300, 3550, 3250, 3400, 
    95000, # Typo outlier entry
    3350, 3150, 3500, 3650, 
    150    # Typo entry (missing zero)
])

print("--- Worked Example: Real Estate Anomaly Detection ---")
print(f"Total Properties Collected : {len(raw_prices_sqft)}")
print(f"Raw Mean Price / Sq.Ft.     : \u20b9{np.mean(raw_prices_sqft):,.2f} (Distorted by anomalies!)")

# 1. Compute Z-scores using scipy.stats.zscore
z_scores = stats.zscore(raw_prices_sqft)

# 2. Filter outliers using 3-sigma standard rule (|Z| > 3.0)
outlier_mask = np.abs(z_scores) > 2.5
clean_prices = raw_prices_sqft[~outlier_mask]
flagged_outliers = raw_prices_sqft[outlier_mask]

print(f"\nFlagged Outliers (|Z| > 2.5): {flagged_outliers.tolist()}")
print(f"Cleaned Dataset Count       : {len(clean_prices)} homes")
print(f"Cleaned Mean Price / Sq.Ft. : \u20b9{np.mean(clean_prices):,.2f}")
print(f"Cleaned Std Dev             : \u20b9{np.std(clean_prices):,.2f}")
