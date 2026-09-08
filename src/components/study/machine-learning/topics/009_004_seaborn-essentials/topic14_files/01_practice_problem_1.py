"""
01_practice_problem_1.py
Title: Practice Problem 1: Bimodal Distribution Analysis & Optimal Bins
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Practice Problem 1: Distribution Fitting & Bandwidth")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Sachin")
    print("=" * 65)

    # Problem Statement:
    # 1. Generate 300 samples with a bimodal distribution (mean1=45, mean2=80)
    # 2. Plot histogram with bins=25 and overlay a KDE with bw_adjust=0.8
    # 3. Add vertical dashed lines at the two mode peaks

    np.random.seed(42)
    group1 = np.random.normal(45, 6, 150)
    group2 = np.random.normal(80, 8, 150)
    data = np.concatenate([group1, group2])

    sns.set_theme(style="whitegrid")
    plt.figure(figsize=(8, 4.5))

    sns.histplot(
        data,
        bins=25,
        kde=True,
        kde_kws={"bw_adjust": 0.8},
        color="#6366f1",
        stat="density"
    )

    plt.axvline(45, color="red", linestyle="--", label="Mode 1 (45)")
    plt.axvline(80, color="green", linestyle="--", label="Mode 2 (80)")
    plt.title("Practice Problem 1: Bimodal Exam Distribution with Custom KDE", fontsize=12)
    plt.legend()
    plt.tight_layout()
    print("✓ Practice Problem 1 successfully solved!")

if __name__ == "__main__":
    main()
