"""
02_filtered_correlations_heatmap.py
Title: Filtering Strong Predictive Features (|r| > 0.5) with sns.heatmap
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 2: Target-Centric Filtered Correlation")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # In high-dimensional datasets (e.g. 50+ features),
    # inspecting all pairwise cells is overwhelming.
    # We filter features having correlation with target > 0.5:

    iris = sns.load_dataset("iris")
    corr = iris.corr(numeric_only=True)

    # Let's rank features by correlation with petal length
    target_rank = corr[["petal_length"]].sort_values(by="petal_length", ascending=False)
    print("\nFeature Correlation with 'petal_length':")
    print(target_rank)

    plt.figure(figsize=(4, 5))
    sns.heatmap(
        target_rank,
        annot=True,
        fmt=".3f",
        cmap="mako",
        vmin=-1,
        vmax=1,
        center=0,
        linewidths=1.2
    )

    plt.title("Target Ranking: petal_length", fontsize=11)
    plt.tight_layout()
    print("✓ Successfully created filtered target correlation strip.")

if __name__ == "__main__":
    main()
