"""
03_bivariate_kde_hist.py
Title: 2D Bivariate Distribution Density Surfaces
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: 2D Bivariate Density Contours")
    print("   Instructor: Sukanta Hui | Students: Tuhina, Sachin, Abhronila")
    print("=" * 65)

    np.random.seed(42)
    # Simulate Study Hours vs Exam Score joint distribution
    hours = np.random.normal(loc=12, scale=3, size=300)
    score = hours * 5.5 + np.random.normal(loc=15, scale=6, size=300)

    fig, axes = plt.subplots(1, 2, figsize=(11, 4.5))

    # 1. 2D Bivariate Histogram
    sns.histplot(x=hours, y=score, bins=25, cbar=True, cmap="mako", ax=axes[0])
    axes[0].set_title("2D Bivariate Histogram")
    axes[0].set_xlabel("Hours Studied")
    axes[0].set_ylabel("ML Score")

    # 2. 2D Bivariate KDE (Contour Elevation)
    sns.kdeplot(x=hours, y=score, cmap="viridis", fill=True, thresh=0.05, ax=axes[1])
    axes[1].set_title("2D Bivariate KDE Density Contours")
    axes[1].set_xlabel("Hours Studied")
    axes[1].set_ylabel("ML Score")

    plt.tight_layout()
    print("✓ Successfully generated 2D bivariate density plots.")

if __name__ == "__main__":
    main()
