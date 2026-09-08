"""
01_ml_feature_correlations.py
Title: Worked Example 2: Complete ML Feature Correlation Heatmap Pipeline
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Worked Example 2: Production Correlation Analysis")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Abhronila")
    print("=" * 65)

    # 1. Simulate California / Barrackpore Housing Features
    np.random.seed(42)
    n = 100
    sqft = np.random.uniform(700, 3200, n)
    rooms = np.round(sqft / 450 + np.random.normal(0, 0.4, n))
    dist_metro = np.random.uniform(0.5, 15.0, n) # km from Barrackpore station
    age = np.random.uniform(1, 35, n)
    price_lakhs = (sqft * 0.045 + rooms * 3.5 - dist_metro * 1.8 - age * 0.4 + np.random.normal(0, 5, n))

    df = pd.DataFrame({
        "Area_SqFt": sqft,
        "Rooms": rooms,
        "Metro_Dist_KM": dist_metro,
        "Property_Age": age,
        "Price_Lakhs": price_lakhs
    })

    # 2. Compute Pearson correlation matrix
    corr = df.corr(numeric_only=True)
    print("\nCorrelation Matrix:")
    print(corr.round(2))

    # 3. Mask upper triangle for clean EDA report
    mask = np.triu(np.ones_like(corr, dtype=bool))

    # 4. Render diverging heatmap
    sns.set_theme(style="white")
    plt.figure(figsize=(7, 6))
    
    sns.heatmap(
        corr,
        mask=mask,
        annot=True,
        fmt=".2f",
        cmap="coolwarm",
        vmin=-1,
        vmax=1,
        center=0,
        square=True,
        linewidths=1.5,
        cbar_kws={"shrink": 0.8, "label": "Pearson Correlation (r)"}
    )

    plt.title("Housing Dataset: Feature Multicollinearity & Price Predictors", fontsize=12, pad=12)
    plt.tight_layout()
    print("✓ Successfully created production-grade feature correlation heatmap.")

if __name__ == "__main__":
    main()
