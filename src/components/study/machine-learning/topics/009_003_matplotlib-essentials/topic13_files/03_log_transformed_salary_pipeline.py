"""
=============================================================================
TOPIC 13: Worked Example 2: Histogram of Salary Distribution
Script 03: Feature Preprocessing - Log1p Normalization Pipeline
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Transforming Skewed Feature to Gaussian Normal Space")

np.random.seed(42)
raw_salaries = np.random.lognormal(mean=2.3, sigma=0.6, size=1000) * 1.5

# Apply log1p transform (ln(1 + x))
log_salaries = np.log1p(raw_salaries)

raw_skew = stats.skew(raw_salaries)
log_skew = stats.skew(log_salaries)

print(f"Raw Salary Skewness         : +{raw_skew:.3f} (Violates normality assumption)")
print(f"Log-Transformed Skewness    : +{log_skew:.3f} (Near-Gaussian symmetric)")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 4.5))

# 1. Raw Skewed Distribution
ax1.hist(raw_salaries, bins=30, color='#f43f5e', edgecolor='#0f172a', alpha=0.75)
ax1.set_title(f"1. Raw Skewed Salaries (Skew: +{raw_skew:.2f})", fontweight='bold')
ax1.set_xlabel("Annual Salary (LPA)")
ax1.set_ylabel("Count")
ax1.grid(True, linestyle=":", alpha=0.3)

# 2. Log-Transformed Normal Distribution
ax2.hist(log_salaries, bins=30, color='#10b981', edgecolor='#0f172a', alpha=0.75)
ax2.set_title(f"2. Log-Transformed: np.log1p(x) (Skew: {log_skew:.2f})", fontweight='bold')
ax2.set_xlabel("log(1 + Salary)")
ax2.set_ylabel("Count")
ax2.grid(True, linestyle=":", alpha=0.3)

plt.tight_layout()
plt.close(fig)

print("✓ Before-and-after log transformation comparison plot generated.")
