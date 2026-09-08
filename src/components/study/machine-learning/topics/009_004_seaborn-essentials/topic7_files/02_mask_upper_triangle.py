"""
02_mask_upper_triangle.py
Title: Eliminating Redundancy: Masking Upper Triangle in Correlation Heatmaps
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Lower-Triangle Correlation Masking")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # Since corr(A, B) == corr(B, A), a full matrix is redundant.
    # We use np.triu() to create a boolean mask for the upper triangle!

    tips = sns.load_dataset("tips")
    corr = tips.corr(numeric_only=True)

    # Generate a boolean mask for the upper triangle
    mask = np.triu(np.ones_like(corr, dtype=bool))

    plt.figure(figsize=(6, 5))
    sns.heatmap(
        corr,
        mask=mask,
        annot=True,
        fmt=".2f",
        cmap="vlag",
        vmin=-1,
        vmax=1,
        center=0,
        square=True,
        linewidths=1.5
    )

    plt.title("Masked Lower Triangle Correlation Heatmap", fontsize=11, pad=10)
    plt.tight_layout()
    print("✓ Successfully rendered lower-triangle masked correlation heatmap.")

if __name__ == "__main__":
    main()
