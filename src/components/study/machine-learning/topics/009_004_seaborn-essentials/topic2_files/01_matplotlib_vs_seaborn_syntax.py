"""
01_matplotlib_vs_seaborn_syntax.py
Title: Code Complexity Comparison: Matplotlib vs Seaborn
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: Side-by-Side Syntax Comparison")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Sachin")
    print("=" * 65)

    # Synthetic student data
    df = pd.DataFrame({
        "Hours": [5, 7, 9, 11, 13, 15, 17],
        "Score": [52, 64, 73, 85, 89, 94, 98],
        "Department": ["CS", "ECE", "CS", "IT", "ECE", "CS", "IT"]
    })

    print("Task: Plot a multi-group colored scatter plot with legend.\n")

    print("--- [METHOD 1: RAW MATPLOTLIB] ---")
    print("""
    # Matplotlib requires manual category grouping, loops, and color management:
    fig, ax = plt.subplots()
    colors = {'CS': 'red', 'ECE': 'blue', 'IT': 'green'}
    for dept, group in df.groupby('Department'):
        ax.scatter(group['Hours'], group['Score'], label=dept, color=colors[dept], s=100)
    ax.set_xlabel('Hours')
    ax.set_ylabel('Score')
    ax.set_title('Matplotlib Multi-group Scatter')
    ax.legend()
    """)

    print("--- [METHOD 2: SEABORN] ---")
    print("""
    # Seaborn does everything in a single declarative line:
    sns.scatterplot(data=df, x='Hours', y='Score', hue='Department', s=100)
    plt.title('Seaborn Multi-group Scatter')
    """)

    print("💡 Summary: 10 lines of imperative Matplotlib code -> 1 line of declarative Seaborn!")

if __name__ == "__main__":
    main()
