"""
01_histplot_kde_demo.py
Title: Modern Univariate Distribution Plotting with histplot() and kdeplot()
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: sns.histplot() & sns.kdeplot()")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Swadeep, Mahima")
    print("=" * 65)

    # Note: Older Seaborn used sns.distplot() which is now DEPRECATED.
    # In modern Seaborn >= 0.11, use sns.histplot() and sns.kdeplot()!

    np.random.seed(42)
    # Simulate exam marks in Barrackpore ML Bootcamp
    marks = np.concatenate([
        np.random.normal(loc=65, scale=8, size=150),
        np.random.normal(loc=88, scale=5, size=100)
    ])

    fig, axes = plt.subplots(1, 2, figsize=(12, 5))

    # 1. Histogram with overlaid KDE
    sns.histplot(
        marks,
        bins=20,
        kde=True,
        color="#4f46e5",
        ax=axes[0],
        stat="density"
    )
    axes[0].set_title("sns.histplot(kde=True, stat='density')", fontsize=12)
    axes[0].set_xlabel("Exam Marks")

    # 2. Pure Kernel Density Estimation with shade/fill
    sns.kdeplot(
        marks,
        fill=True,
        color="#ec4899",
        alpha=0.4,
        linewidth=2.5,
        ax=axes[1]
    )
    axes[1].set_title("sns.kdeplot(fill=True)", fontsize=12)
    axes[1].set_xlabel("Exam Marks")

    plt.tight_layout()
    print("✓ Successfully generated distribution visualizations.")

if __name__ == "__main__":
    main()
