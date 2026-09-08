"""
=============================================================================
TOPIC 3: Line Plot with plt.plot()
Script 02: Confidence Bands & Shaded Intervals with fill_between
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Plotting Mean Curves with Standard Deviation Confidence Bands")

# Simulating 5-Fold Cross-Validation Accuracy across Hyperparameter C values
c_values = np.logspace(-2, 3, 20)
mean_acc = 0.95 - 0.25 * np.exp(-c_values / 10) + 0.05 * np.log10(c_values + 1)
mean_acc = np.clip(mean_acc, 0.65, 0.96)
std_acc = 0.03 + 0.02 * np.sin(np.linspace(0, 3, 20)) ** 2

lower_band = mean_acc - std_acc
upper_band = mean_acc + std_acc

fig, ax = plt.subplots(figsize=(8, 4.5))

# Plot Mean Validation Curve
ax.plot(c_values, mean_acc, color='#6366f1', lw=2.5, marker='o', label="Mean CV Accuracy")

# Fill confidence band
ax.fill_between(c_values, lower_band, upper_band, color='#6366f1', alpha=0.25, label=r'$\pm 1$ Std Dev Band')

# Formatting for Hyperparameter tuning
ax.set_xscale('log')
ax.set_title("Support Vector Classifier: Accuracy vs Regularization Parameter (C)", fontsize=11, fontweight='bold')
ax.set_xlabel("Hyperparameter C (Log Scale)")
ax.set_ylabel("Cross-Validation Score")
ax.set_ylim(0.55, 1.0)
ax.legend(loc="lower right")
ax.grid(True, which="both", linestyle=":", alpha=0.5)

plt.tight_layout()
plt.close(fig)

print("✓ Shaded confidence interval line chart rendered with fill_between.")
