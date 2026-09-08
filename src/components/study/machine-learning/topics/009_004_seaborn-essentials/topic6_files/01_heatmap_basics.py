"""
01_heatmap_basics.py
Title: 2D Matrix Heatmaps with sns.heatmap()
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: 2D Matrix Heatmap Fundamentals")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Abhronila")
    print("=" * 65)

    # 1. Create a simulated student test scores matrix
    # Rows: Students | Columns: Machine Learning Subjects
    students = ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"]
    subjects = ["Linear Reg", "Logistic Reg", "Decision Trees", "K-Means", "Neural Nets"]
    
    np.random.seed(42)
    scores = np.random.randint(65, 99, size=(len(students), len(subjects)))
    df_scores = pd.DataFrame(scores, index=students, columns=subjects)

    print("\n📊 Student Exam Score Matrix:")
    print(df_scores)

    # 2. Draw heatmap
    plt.figure(figsize=(8, 5))
    sns.heatmap(
        df_scores,
        annot=True,
        fmt="d",
        cmap="YlGnBu",
        linewidths=1.0,
        cbar_kws={"label": "Marks (/100)"}
    )

    plt.title("Barrackpore Batch: ML Subject Performance Matrix", fontsize=12, pad=10)
    plt.tight_layout()
    print("\n✓ Successfully rendered matrix heatmap with numeric annotations.")

if __name__ == "__main__":
    main()
