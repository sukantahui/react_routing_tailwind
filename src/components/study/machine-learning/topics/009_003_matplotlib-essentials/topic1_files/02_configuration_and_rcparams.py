"""
=============================================================================
TOPIC 1: Installing and Importing Matplotlib
Script 02: Matplotlib Configuration & rcParams Customization
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Inspecting & Modifying rcParams Globally")

# Display a selection of common rcParams keys
keys_to_inspect = [
    'figure.figsize', 'figure.dpi', 'font.size', 'font.family',
    'lines.linewidth', 'axes.grid', 'savefig.dpi'
]

print("Default Parameter Values:")
for k in keys_to_inspect:
    print(f"  {k:<20} : {plt.rcParams[k]}")

# Updating rcParams globally for high-resolution publication charts
plt.rcParams.update({
    'figure.figsize': (8, 4),
    'figure.dpi': 150,
    'font.size': 11,
    'lines.linewidth': 2.5,
    'axes.grid': True,
    'grid.alpha': 0.4,
    'grid.linestyle': '--'
})

print("\nUpdated Custom Parameters for Coder & AccoTax Lab Reports:")
for k in keys_to_inspect:
    print(f"  {k:<20} : {plt.rcParams[k]}")

# Creating a test plot reflecting the updated rcParams
fig, ax = plt.subplots()
x = np.linspace(-3, 3, 100)
# Sigmoid activation function commonly used in Logistic Regression
sigmoid = 1 / (1 + np.exp(-x))
ax.plot(x, sigmoid, color='#10b981', label=r'$\sigma(z) = \frac{1}{1 + e^{-z}}$')
ax.set_title("Logistic Sigmoid Curve (Rendered with custom rcParams)")
ax.set_xlabel("Logits (z)")
ax.set_ylabel("Probability P(Y=1)")
ax.legend()
plt.close(fig)

# Reset rcParams back to default factory settings
plt.rcdefaults()
print("\n✓ Restored defaults using plt.rcdefaults()")
