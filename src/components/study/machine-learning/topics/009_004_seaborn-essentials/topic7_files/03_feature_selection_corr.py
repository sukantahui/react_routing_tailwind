"""
03_feature_selection_corr.py
Title: Identifying Multicollinearity and Filtering Target Correlations
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Feature Selection via Target Correlation")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Abhronila")
    print("=" * 65)

    # Simulated Housing dataset
    np.random.seed(42)
    n = 200
    sqft = np.random.uniform(800, 3500, n)
    bedrooms = np.random.randint(1, 6, n)
    bathrooms = bedrooms * 0.7 + np.random.normal(0, 0.3, n)
    age = np.random.uniform(1, 40, n)
    price = sqft * 300 + bedrooms * 15000 - age * 2000 + np.random.normal(0, 20000, n)

    df_house = pd.DataFrame({
        "sqft": sqft,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "age": age,
        "price": price
    })

    # Compute correlation with target variable only ('price')
    target_corr = df_house.corr()[["price"]].sort_values(by="price", ascending=False)
    print("\n🔍 Correlations with Target Feature ('price'):")
    print(target_corr.round(3))

    plt.figure(figsize=(4, 6))
    sns.heatmap(
        target_corr,
        annot=True,
        fmt=".3f",
        cmap="coolwarm",
        vmin=-1,
        vmax=1,
        center=0,
        linewidths=1
    )
    plt.title("Feature Importance Ranking via Correlation", fontsize=11)
    plt.tight_layout()
    print("✓ Successfully rendered 1D target feature correlation bar.")

if __name__ == "__main__":
    main()
