"""
02_kde_bandwidth_tuning.py
Title: Bandwidth Adjustment (bw_adjust) in Kernel Density Estimation
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Controlling KDE Smoothing with bw_adjust")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    np.random.seed(101)
    data = np.random.normal(loc=50, scale=12, size=200)

    # bw_adjust < 1.0 -> under-smoothed (noisy, captures micro-modes)
    # bw_adjust = 1.0 -> standard Scott/Silverman rule
    # bw_adjust > 1.0 -> over-smoothed (smooths away real multi-modal structure)

    fig, ax = plt.subplots(figsize=(8, 4))
    sns.kdeplot(data, bw_adjust=0.3, label="bw_adjust=0.3 (Under-smoothed)", color="#ef4444", lw=1.5, ax=ax)
    sns.kdeplot(data, bw_adjust=1.0, label="bw_adjust=1.0 (Optimal Default)", color="#3b82f6", lw=2.5, ax=ax)
    sns.kdeplot(data, bw_adjust=2.5, label="bw_adjust=2.5 (Over-smoothed)", color="#10b981", lw=1.5, ax=ax)

    ax.set_title("Impact of Bandwidth Parameter (bw_adjust) on KDE", fontsize=12)
    ax.legend()
    plt.tight_layout()
    print("✓ Rendered multi-bandwidth comparison plot.")

if __name__ == "__main__":
    main()
