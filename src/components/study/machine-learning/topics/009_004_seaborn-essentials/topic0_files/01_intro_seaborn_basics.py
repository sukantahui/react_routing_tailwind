"""
01_intro_seaborn_basics.py
Title: Introduction to Seaborn for Statistical Data Visualization
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: Core Philosophy & Architecture")
    print("   Instructor: Sukanta Hui | Location: Barrackpore")
    print("=" * 65)

    # Seaborn is built on top of Matplotlib and tightly integrated with Pandas DataFrames.
    # It automatically handles statistical aggregations (mean, confidence intervals) and legends.

    # 1. Create a simulated Barrackpore student dataset
    data = {
        "Student": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
        "Study_Hours": [12, 15, 8, 14, 10, 16, 11],
        "ML_Score": [88, 95, 72, 91, 79, 98, 84],
        "Track": ["Deep Learning", "Data Science", "Web ML", "Data Science", "Web ML", "Deep Learning", "Data Science"]
    }
    df = pd.DataFrame(data)
    print("\n📊 Student Performance Dataset:")
    print(df.to_string(index=False))

    # 2. Set high-level Seaborn aesthetic theme
    sns.set_theme(style="darkgrid", palette="muted")

    # 3. Create a clean scatterplot with hue & size mapping
    plt.figure(figsize=(8, 5))
    scatter = sns.scatterplot(
        data=df,
        x="Study_Hours",
        y="ML_Score",
        hue="Track",
        style="Track",
        s=150,
        alpha=0.9
    )

    plt.title("Barrackpore Batch: Study Hours vs ML Score (Grouped by Track)", fontsize=13, pad=12)
    plt.xlabel("Weekly Study Hours (hrs)", fontsize=11)
    plt.ylabel("Machine Learning Score (/100)", fontsize=11)
    
    print("\n✨ Seaborn plotted scatter with automatic category legend mapping!")
    plt.tight_layout()
    # plt.show() # Uncomment in local GUI environment

if __name__ == "__main__":
    main()
