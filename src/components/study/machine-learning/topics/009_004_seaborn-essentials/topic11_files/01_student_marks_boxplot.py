"""
01_student_marks_boxplot.py
Title: Worked Example 1: Box Plot Analysis of Exam Marks by Gender
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 1: Student Marks Conditioning by Gender")
    print("   Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 65)

    # 1. Create Barrackpore student exam marks dataset
    np.random.seed(42)
    n = 60
    genders = np.random.choice(["Male", "Female"], size=n, p=[0.45, 0.55])
    
    # Female scores centered at 88 with std 7; Male scores centered at 82 with std 9
    scores = [
        int(np.clip(np.random.normal(88, 7), 50, 100)) if g == "Female" 
        else int(np.clip(np.random.normal(82, 9), 50, 100)) 
        for g in genders
    ]

    df = pd.DataFrame({"Gender": genders, "ML_Marks": scores})
    
    print("\nSummary Statistics Grouped by Gender:")
    print(df.groupby("Gender")["ML_Marks"].describe().round(2))

    # 2. Render publication-ready boxplot
    sns.set_theme(style="whitegrid", palette="pastel")
    plt.figure(figsize=(7, 5))
    
    ax = sns.boxplot(
        data=df,
        x="Gender",
        y="ML_Marks",
        palette={"Male": "#38bdf8", "Female": "#f472b6"},
        width=0.45,
        boxprops=dict(alpha=0.85)
    )

    plt.title("Barrackpore Batch: Machine Learning Exam Marks by Gender", fontsize=12, pad=12)
    plt.xlabel("Student Gender", fontsize=11)
    plt.ylabel("ML Exam Marks (/100)", fontsize=11)
    
    print("\n✓ Successfully rendered Gender marks boxplot.")
    plt.tight_layout()

if __name__ == "__main__":
    main()
