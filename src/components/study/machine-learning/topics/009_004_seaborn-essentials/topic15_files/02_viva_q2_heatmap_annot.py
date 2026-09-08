"""
02_viva_q2_heatmap_annot.py
Title: Viva Q2: Explaining Diverging Colormaps and Centering in Correlation Heatmaps
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Viva Q2: Why use center=0 and vmin=-1, vmax=1?")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # Q: Why must correlation heatmaps use center=0?
    # A: Pearson correlation r spans [-1, +1] where 0 represents the absence of linear signal.
    #    A diverging colormap (e.g. coolwarm) maps:
    #    - -1.0 -> Cold Blue (inverse correlation)
    #    -  0.0 -> Neutral White/Grey (zero correlation)
    #    - +1.0 -> Hot Red (direct correlation)
    #    If center is not pinned to 0, colors become dangerously misleading!

    matrix = np.array([[1.0, -0.65], [-0.65, 1.0]])
    plt.figure(figsize=(4, 3.5))
    sns.heatmap(matrix, annot=True, cmap="coolwarm", vmin=-1, vmax=1, center=0, cbar=False)
    plt.title("Viva Q2: Balanced Center=0 Matrix", fontsize=10)
    plt.tight_layout()
    print("✓ Successfully executed Viva Q2 explanation script.")

if __name__ == "__main__":
    main()
