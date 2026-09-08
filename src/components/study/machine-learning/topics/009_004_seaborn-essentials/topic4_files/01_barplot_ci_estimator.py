"""
01_barplot_ci_estimator.py
Title: sns.barplot() with Custom Estimators and Error Bars
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: Categorical Bar Plots with Estimators")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Abhronila")
    print("=" * 65)

    # Simulated Barrackpore Tech Track Salary Data
    df = pd.DataFrame({
        "Track": ["Deep Learning", "Data Science", "Web ML", "Deep Learning", "Data Science", "Web ML", "Deep Learning", "Data Science"],
        "Stipend_k": [45, 40, 32, 52, 44, 35, 48, 42],
        "Gender": ["M", "F", "M", "F", "F", "M", "M", "F"]
    })

    fig, axes = plt.subplots(1, 2, figsize=(12, 5))

    # 1. Mean estimator with 95% bootstrap errorbar (default)
    sns.barplot(
        data=df,
        x="Track",
        y="Stipend_k",
        hue="Gender",
        palette="Set2",
        ax=axes[0]
    )
    axes[0].set_title("Mean Stipend (errorbar='ci')", fontsize=12)
    axes[0].set_ylabel("Stipend (₹ in Thousands)")

    # 2. Median estimator with standard deviation errorbar
    sns.barplot(
        data=df,
        x="Track",
        y="Stipend_k",
        estimator=np.median,
        errorbar="sd",
        palette="pastel",
        ax=axes[1]
    )
    axes[1].set_title("Median Stipend (estimator=np.median, errorbar='sd')", fontsize=12)
    axes[1].set_ylabel("Stipend (₹ in Thousands)")

    plt.tight_layout()
    print("✓ Successfully rendered barplot with custom estimators.")

if __name__ == "__main__":
    main()
