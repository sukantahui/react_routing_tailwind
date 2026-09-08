"""
03_practice_problem_3.py
Title: Practice Problem 3: Lower-Triangle Heatmap with Custom Annotations
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

def main():
    print("=" * 65)
    print("🎓 Seaborn Practice Problem 3: Masked Multicollinearity Heatmap")
    print("   Instructor: Sukanta Hui | Students: Tuhina, Swadeep, Mahima")
    print("=" * 65)

    # Problem Statement:
    # 1. Compute correlation for 4 synthetic student metrics
    # 2. Mask the upper triangle and diagonal (np.triu(..., k=0))
    # 3. Apply diverging 'vlag' colormap centered at 0

    df = pd.DataFrame({
        "StudyHours": [10, 12, 14, 8, 16, 11, 15, 9],
        "Attendance": [85, 90, 95, 75, 98, 88, 92, 80],
        "Assignments": [4, 5, 6, 2, 6, 4, 5, 3],
        "Score": [78, 85, 92, 68, 97, 82, 94, 74]
    })

    corr = df.corr()
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

    plt.title("Practice Problem 3: Student Feature Lower-Triangle Correlation", fontsize=11)
    plt.tight_layout()
    print("✓ Practice Problem 3 successfully solved!")

if __name__ == "__main__":
    main()
