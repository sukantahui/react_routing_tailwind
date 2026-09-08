"""
02_heatmap_annot_fmt_cmap.py
Title: Customizing Heatmaps: annot, fmt, cmap, center, and vmin/vmax
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: Color Maps, Center Anchors & Formats")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # Key parameters in sns.heatmap():
    # - annot=True : prints cell values
    # - fmt=".2f" / "d" : string formatting code
    # - cmap="viridis" / "coolwarm" / "rocket" / "mako"
    # - center=0.0 : anchors the midpoint of diverging colormap
    # - vmin / vmax : anchors min and max color bounds

    flights = sns.load_dataset("flights")
    flights_pivot = flights.pivot(index="month", columns="year", values="passengers")

    plt.figure(figsize=(9, 6))
    sns.heatmap(
        flights_pivot,
        annot=True,
        fmt="d",
        cmap="magma",
        linewidths=0.5,
        linecolor="#334155"
    )
    plt.title("Monthly Airline Passengers Matrix (1949 - 1960)", fontsize=12)
    plt.tight_layout()
    print("✓ Successfully created pivot table passenger heatmap.")

if __name__ == "__main__":
    main()
