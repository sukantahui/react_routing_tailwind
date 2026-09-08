"""
03_multicollinearity_analysis.py
Title: Automated Multicollinearity Drop Advice from Correlation Heatmaps
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 2: Multicollinearity Detection Algorithm")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Swadeep")
    print("=" * 65)

    # If correlation between two predictors is > 0.85, they supply redundant signal
    # and inflate Variance Inflation Factor (VIF).

    data = {
        "x1_temp_c": [20, 25, 30, 35, 40],
        "x2_temp_f": [68, 77, 86, 95, 104], # Perfect collinearity with x1 (r = 1.0)
        "x3_humidity": [80, 70, 60, 50, 40],
        "y_icecream_sales": [100, 150, 220, 290, 360]
    }
    df = pd.DataFrame(data)

    corr = df.corr()
    print("Correlation matrix with collinear features:")
    print(corr.round(2))

    # Automated check:
    redundant_pairs = []
    cols = corr.columns
    for i in range(len(cols)):
        for j in range(i + 1, len(cols)):
            if abs(corr.iloc[i, j]) > 0.90 and "y_icecream_sales" not in [cols[i], cols[j]]:
                redundant_pairs.append((cols[i], cols[j], corr.iloc[i, j]))

    print("\n🚨 Multicollinearity Detected:")
    for f1, f2, val in redundant_pairs:
        print(f"   • High redundancy between '{f1}' and '{f2}' (r = {val:.2f}) -> Drop one before ML modeling!")

if __name__ == "__main__":
    main()
