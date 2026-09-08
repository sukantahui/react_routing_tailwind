"""
02_plotting_contexts.py
Title: Scaling Visual Elements via Plotting Contexts (paper, notebook, talk, poster)
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Plotting Contexts & Font Scaling")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # 4 built-in contexts scale font sizes, line widths, and marker sizes:
    # 1. 'paper' (smallest elements, for print research papers)
    # 2. 'notebook' (default standard size for screen/jupyter)
    # 3. 'talk' (enlarged elements for PowerPoint / conference slides)
    # 4. 'poster' (largest elements for conference posters)

    contexts = ["paper", "notebook", "talk", "poster"]

    for ctx in contexts:
        sns.set_theme(context=ctx, style="whitegrid")
        fig, ax = plt.subplots(figsize=(6, 3))
        sns.lineplot(x=[1, 2, 3, 4], y=[10, 25, 20, 40], ax=ax, lw=2.5)
        ax.set_title(f"Context: sns.set_theme(context='{ctx}')")
        plt.tight_layout()
        print(f"✓ Configured context: '{ctx}'")
        plt.close(fig)

    # You can also pass font_scale to multiply base font sizes
    sns.set_theme(context="notebook", font_scale=1.2)
    print("✓ Configured custom font_scale=1.2")

if __name__ == "__main__":
    main()
