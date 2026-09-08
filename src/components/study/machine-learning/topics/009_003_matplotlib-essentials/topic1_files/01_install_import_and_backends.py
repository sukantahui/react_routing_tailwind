"""
=============================================================================
TOPIC 1: Installing and Importing Matplotlib
Script 01: Installation, Import Conventions & Backend Selection
Mentor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
=============================================================================
"""

import sys

def section(title):
    print(f"\n{'='*75}\n  {title.upper()}\n{'='*75}")

# -----------------------------------------------------------------------------
# 1. Standard Installation Commands (Terminal)
# -----------------------------------------------------------------------------
section("1. Installation Commands")
print("""
To install Matplotlib in your Python/Conda environment:
  • Standard pip  : pip install matplotlib
  • Conda env     : conda install -c conda-forge matplotlib
  • Full ML Stack : pip install numpy pandas matplotlib seaborn scikit-learn
""")

# -----------------------------------------------------------------------------
# 2. Canonical Import Conventions & Backend Switching
# -----------------------------------------------------------------------------
section("2. Canonical Imports & Backend Configuration")

# IMPORTANT: Backend must be set BEFORE importing pyplot if running headless
import matplotlib
# matplotlib.use('Agg')  # Headless backend (ideal for web servers & Docker)

import matplotlib.pyplot as plt
import numpy as np

print(f"Python Executable   : {sys.executable}")
print(f"Matplotlib Version  : {matplotlib.__version__}")
print(f"Config File Path    : {matplotlib.matplotlib_fname()}")
print(f"Active Render Backend: {matplotlib.get_backend()}")

# -----------------------------------------------------------------------------
# 3. Verifying Installation with a Minimal Plot
# -----------------------------------------------------------------------------
section("3. Verification Test Plot")

fig, ax = plt.subplots(figsize=(5, 3))
x = np.linspace(0, 2 * np.pi, 100)
ax.plot(x, np.sin(x), label="sin(x)", color="#2563eb", lw=2)
ax.plot(x, np.cos(x), label="cos(x)", color="#db2777", lw=2, linestyle="--")
ax.set_title("Matplotlib Installation Verified")
ax.set_xlabel("Theta (radians)")
ax.set_ylabel("Amplitude")
ax.legend()
ax.grid(True, alpha=0.3)
plt.close(fig)

print("✓ Matplotlib successfully initialized and functional!")
