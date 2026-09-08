"""
03_custom_color_palettes.py
Title: Color Palettes: Qualitative, Sequential, and Diverging Schemes
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Color Palette Taxonomy")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Mahima")
    print("=" * 65)

    # 1. Qualitative Palettes (Unordered categorical classes)
    # e.g., 'deep', 'muted', 'pastel', 'bright', 'dark', 'colorblind', 'Set2'
    qual_palette = sns.color_palette("colorblind", 6)
    print(f"Qualitative 'colorblind' palette (6 colors): {qual_palette}")

    # 2. Sequential Palettes (Low to high continuous values)
    # e.g., 'Blues', 'viridis', 'rocket', 'mako', 'crest', 'flare'
    seq_palette = sns.color_palette("mako", as_cmap=False)
    print(f"Sequential 'mako' palette: {len(seq_palette)} hex steps")

    # 3. Diverging Palettes (Low vs High with neutral center 0)
    # e.g., 'coolwarm', 'vlag', 'icefire', 'Spectral'
    div_palette = sns.color_palette("vlag", as_cmap=False)
    print(f"Diverging 'vlag' palette: {len(div_palette)} steps")

    # Custom color palette creation with sns.color_palette()
    custom = sns.color_palette(["#ec4899", "#3b82f6", "#10b981", "#f59e0b"])
    print("✓ Successfully generated custom brand color palette.")

if __name__ == "__main__":
    main()
