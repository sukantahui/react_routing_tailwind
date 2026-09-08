"""
01_set_theme_styles.py
Title: Mastering Seaborn Theme Styles (darkgrid, whitegrid, dark, white, ticks)
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: The 5 Built-in Seaborn Styles")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    # 5 standard styles:
    # 1. 'darkgrid' (default, grey bg with white grid lines)
    # 2. 'whitegrid' (clean white bg with grey grid lines - best for heavy data)
    # 3. 'dark' (solid grey background without grid)
    # 4. 'white' (pure white background without grid)
    # 5. 'ticks' (white background with explicit tick notches on axes)

    styles = ["darkgrid", "whitegrid", "dark", "white", "ticks"]
    tips = sns.load_dataset("tips")

    for st in styles:
        sns.set_theme(style=st)
        fig, ax = plt.subplots(figsize=(6, 3))
        sns.boxplot(data=tips, x="day", y="total_bill", ax=ax, palette="Set3")
        ax.set_title(f"sns.set_theme(style='{st}')")
        plt.tight_layout()
        print(f"✓ Rendered boxplot in style: '{st}'")
        plt.close(fig)

if __name__ == "__main__":
    main()
