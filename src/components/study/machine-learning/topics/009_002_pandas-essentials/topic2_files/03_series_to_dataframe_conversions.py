"""
03_series_to_dataframe_conversions.py
=====================================
Topic: Series to DataFrame Conversions & Horizontal Concatenation
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("SERIES TO DATAFRAME CONVERSIONS & JOINING")
    print("=" * 70)

    # 1. Single Series to 1-column DataFrame via .to_frame()
    marks_s = pd.Series([85, 92, 70], index=["Debangshu", "Susmita", "Swadeep"], name="Math_Score")
    df_single = marks_s.to_frame()
    print("1. Single Series converted via .to_frame():\n", df_single)
    print("   Type:", type(df_single), "Shape:", df_single.shape)

    # 2. Combining Multiple Series into a 2D DataFrame via pd.concat
    age_s = pd.Series([22, 23, 21], index=["Debangshu", "Susmita", "Swadeep"], name="Age")
    city_s = pd.Series(["Barrackpore", "Kolkata", "Ichapur"], index=["Debangshu", "Susmita", "Swadeep"], name="City")

    df_combined = pd.concat([marks_s, age_s, city_s], axis=1)
    print("\n2. Combined Multiple Series (pd.concat(axis=1)):\n", df_combined)

    # 3. Series extraction from DataFrame
    # Single bracket extracts 1D Series: df['Math_Score']
    # Double bracket extracts 2D DataFrame: df[['Math_Score']]
    extracted_series = df_combined["Math_Score"]
    extracted_df = df_combined[["Math_Score"]]

    print("\n3. Single vs Double Bracket Extraction:")
    print(f"   df['Math_Score']   -> Type: {type(extracted_series).__name__}, Shape: {extracted_series.shape}")
    print(f"   df[['Math_Score']] -> Type: {type(extracted_df).__name__}, Shape: {extracted_df.shape}")

if __name__ == "__main__":
    main()
