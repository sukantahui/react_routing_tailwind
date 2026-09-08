"""
=============================================================================
TOPIC 1: Installing and Importing Matplotlib
Script 03: Built-In Style Sheets & Context Managers
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import matplotlib.pyplot as plt
import numpy as np

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

section("1. Listing Available Style Sheets")
available_styles = plt.style.available
print(f"Total Available Styles: {len(available_styles)}")
print("Sample of popular styles:")
for s in available_styles[:10]:
    print(f"  - {s}")

section("2. Using Context Managers for Scoped Styling")
# With context manager: style applies ONLY inside the with block!
x = np.linspace(0, 10, 100)

with plt.style.context('dark_background'):
    fig, ax = plt.subplots(figsize=(6, 3))
    ax.plot(x, np.sin(x), color="#38bdf8", label="Sin Wave (Dark Mode)")
    ax.set_title("Scoped Dark Background Theme")
    ax.legend()
    plt.close(fig)
    print("✓ Rendered chart inside 'dark_background' context.")

# Verify outside context is default
print(f"Current outside background color: {plt.rcParams['figure.facecolor']}")
