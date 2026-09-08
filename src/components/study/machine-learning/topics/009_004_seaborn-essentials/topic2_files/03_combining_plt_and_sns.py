"""
03_combining_plt_and_sns.py
Title: Symbiotic Power: Combining Matplotlib Axes with Seaborn Plots
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Matplotlib & Seaborn Hybrid Workflows")
    print("   Instructor: Sukanta Hui | Students: Swadeep, Tuhina, Sachin")
    print("=" * 65)

    # Professional workflow:
    # 1. Create subplots grid using Matplotlib: plt.subplots()
    # 2. Draw statistical graphics using Seaborn passing ax=ax[i]
    # 3. Fine-tune annotations, spines, limits using Matplotlib methods!

    fig, axes = plt.subplots(1, 2, figsize=(10, 4))

    # Ax 1: Seaborn KDE
    data_x = np.random.normal(loc=50, scale=10, size=200)
    sns.kdeplot(data_x, ax=axes[0], fill=True, color="#6366f1")
    axes[0].set_title("Axes 0: Seaborn KDE + Matplotlib Ax")
    axes[0].axvline(50, color="red", linestyle="--", label="Mean=50")
    axes[0].legend()

    # Ax 2: Seaborn Boxplot
    sns.boxplot(y=data_x, ax=axes[1], color="#a855f7")
    axes[1].set_title("Axes 1: Seaborn Boxplot")

    plt.tight_layout()
    print("✓ Successfully rendered 2-panel hybrid Matplotlib + Seaborn visualization.")

if __name__ == "__main__":
    main()
