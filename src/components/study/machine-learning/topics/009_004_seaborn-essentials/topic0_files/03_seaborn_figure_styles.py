"""
03_seaborn_figure_styles.py
Title: Comparison of Seaborn Themes and Aesthetic Defaults
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Exploring Pre-packaged Styles & Contexts")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # 5 built-in themes: darkgrid (default), whitegrid, dark, white, ticks
    styles = ["darkgrid", "whitegrid", "dark", "white", "ticks"]
    
    # Generate synthetic regression wave data
    np.random.seed(42)
    x = np.linspace(0, 10, 50)
    y = np.sin(x) + np.random.normal(0, 0.2, 50)

    print("Iterating through standard Seaborn themes:")
    for style in styles:
        sns.set_theme(style=style)
        fig, ax = plt.subplots(figsize=(6, 3))
        sns.lineplot(x=x, y=y, ax=ax, color="#4f46e5", lw=2)
        ax.set_title(f"Theme: sns.set_theme(style='{style}')", fontsize=11)
        plt.tight_layout()
        print(f" -> Rendered preview with style='{style}' successfully.")
        plt.close(fig)

    print("\n💡 Sukanta Hui's Advice: 'darkgrid' and 'whitegrid' are best for ML feature charts!")

if __name__ == "__main__":
    main()
