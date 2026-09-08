"""
=============================================================================
TOPIC 13: Worked Example 2: Histogram of Salary Distribution
Script 01: Right-Skewed Compensation, Mean vs Median & Log-Normal PDF
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Data Science Industry Salary Distribution Analysis")

np.random.seed(42)
# Simulating 1,200 tech compensation packages (in Lakhs INR per annum)
# Right-skewed Log-Normal distribution
salaries = np.random.lognormal(mean=2.3, sigma=0.6, size=1200) * 1.5
salaries = np.clip(salaries, 3.5, 65.0)

mean_sal = np.mean(salaries)
median_sal = np.median(salaries)
skewness = stats.skew(salaries)

print(f"Sample Count    : {len(salaries)}")
print(f"Mean Salary     : ₹{mean_sal:.2f} LPA")
print(f"Median Salary   : ₹{median_sal:.2f} LPA (Disparity: ₹{mean_sal - median_sal:.2f} LPA)")
print(f"Sample Skewness : {skewness:.3f} (Heavily Right-Skewed)")

fig, ax = plt.subplots(figsize=(9, 5))

# Plot Density Histogram
counts, bins, _ = ax.hist(
    salaries,
    bins=35,
    density=True,
    color='#38bdf8',
    edgecolor='#0f172a',
    alpha=0.7,
    label='Salary Distribution (Density)'
)

# Overlay Mean and Median Vertical Reference Lines
ax.axvline(median_sal, color='#10b981', lw=2.5, linestyle='-', label=f'Median: ₹{median_sal:.1f} LPA')
ax.axvline(mean_sal, color='#ef4444', lw=2.5, linestyle='--', label=f'Mean: ₹{mean_sal:.1f} LPA (Skewed)')

# Annotate Skewness Warning
ax.text(
    0.95, 0.70,
    f"Right-Skewness: +{skewness:.2f}\nMean > Median confirms\nhigh-earner executive tail.",
    transform=ax.transAxes,
    ha='right',
    bbox=dict(boxstyle='round', facecolor='#0f172a', edgecolor='#38bdf8')
)

ax.set_title("Tech Industry Data Science Salary Distribution (Kolkata & Bengaluru)", fontweight='bold')
ax.set_xlabel("Annual Compensation (Lakh INR)")
ax.set_ylabel("Probability Density")
ax.legend(loc='upper right')
ax.grid(True, linestyle=":", alpha=0.4)

plt.tight_layout()
plt.close(fig)

print("✓ Salary histogram with statistical summary metrics rendered.")
