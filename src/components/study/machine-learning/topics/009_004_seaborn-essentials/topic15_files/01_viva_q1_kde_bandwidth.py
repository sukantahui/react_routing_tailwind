"""
01_viva_q1_kde_bandwidth.py
Title: Viva Q1: Explaining Kernel Density Estimation and Bandwidth in Machine Learning Interviews
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Viva Q1: What is KDE and why tune bw_adjust?")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Abhronila")
    print("=" * 65)

    # Q: What is KDE?
    # A: KDE is a non-parametric way to estimate the Probability Density Function (PDF)
    #    of a continuous random variable without assuming normal Gaussianity.
    
    # Q: What is bw_adjust?
    # A: Bandwidth acts as a smoothing parameter.
    #    - Too small: High variance / overfitting to individual sample noise.
    #    - Too large: High bias / underfitting, hides multi-modal clusters.

    np.random.seed(42)
    sample = np.random.normal(50, 10, 100)

    fig, ax = plt.subplots(figsize=(7, 4))
    sns.kdeplot(sample, bw_adjust=0.5, label="Under-smoothed (bw=0.5)", color="red", ax=ax)
    sns.kdeplot(sample, bw_adjust=1.0, label="Optimal Default (bw=1.0)", color="blue", lw=2, ax=ax)
    sns.kdeplot(sample, bw_adjust=2.0, label="Over-smoothed (bw=2.0)", color="green", ax=ax)
    ax.legend()
    plt.title("Viva Demonstration: The Bias-Variance Tradeoff in KDE Bandwidth", fontsize=11)
    plt.tight_layout()
    print("✓ Successfully executed Viva Q1 explanation script.")

if __name__ == "__main__":
    main()
