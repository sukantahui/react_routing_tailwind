"""
01_df_corr_matrix.py
Title: Pearson Correlation Matrix Computation and Heatmap Mapping
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: Pearson Feature Correlation Heatmap")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # In Machine Learning Exploratory Data Analysis (EDA),
    # visualizing pairwise Pearson correlation coefficients (r in [-1, +1]) is vital
    # to identify multicollinearity and strong predictive features.

    iris = sns.load_dataset("iris")
    # In Pandas >= 2.0, df.corr(numeric_only=True) ensures only numeric columns are correlated
    corr_matrix = iris.corr(numeric_only=True)

    print("\n📊 Iris Feature Correlation Matrix (r):")
    print(corr_matrix.round(3))

    plt.figure(figsize=(7, 5.5))
    # Diverging colormap with center=0 is standard best practice for correlations
    sns.heatmap(
        corr_matrix,
        annot=True,
        fmt=".2f",
        cmap="coolwarm",
        vmin=-1,
        vmax=1,
        center=0,
        square=True,
        linewidths=1.5,
        cbar_kws={"shrink": 0.8}
    )

    plt.title("Iris Feature Correlation Heatmap (center=0, vmin=-1, vmax=1)", fontsize=11, pad=10)
    plt.tight_layout()
    print("\n✓ Successfully plotted standard correlation heatmap.")

if __name__ == "__main__":
    main()
