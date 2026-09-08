"""
03_hue_style_size_combinations.py
Title: Orthogonal Aesthetic Mapping: Combining hue, style, and size
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Orthogonal Multi-Variable Encodings")
    print("   Instructor: Sukanta Hui | Students: Swadeep, Sachin, Tuhina")
    print("=" * 65)

    tips = sns.load_dataset("tips")

    # Combining:
    # - hue: 'smoker' (color)
    # - style: 'time' (Dinner vs Lunch marker symbol)
    # - size: 'size' (Party table count)
    plt.figure(figsize=(9, 5.5))
    sns.scatterplot(
        data=tips,
        x="total_bill",
        y="tip",
        hue="smoker",
        style="time",
        size="size",
        sizes=(40, 220),
        palette={"Yes": "#ef4444", "No": "#3b82f6"},
        markers={"Lunch": "o", "Dinner": "s"},
        alpha=0.85
    )

    plt.title("Orthogonal Visual Encodings: Bill vs Tip with Multi-Legends", fontsize=12)
    plt.tight_layout()
    print("✓ Successfully rendered combined multi-dimensional aesthetic figure.")

if __name__ == "__main__":
    main()
