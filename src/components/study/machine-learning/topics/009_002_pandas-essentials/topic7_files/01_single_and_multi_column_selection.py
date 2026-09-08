"""
01_single_and_multi_column_selection.py
=======================================
Topic: Column Selection in Pandas: Single Series vs Multi-Column DataFrames
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("PANDAS COLUMN SELECTION: SINGLE VS MULTI-COLUMN")
    print("=" * 70)

    # 5 students from Barrackpore machine learning batch
    df = pd.DataFrame({
        "RollNo": [101, 102, 103, 104, 105],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin"],
        "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata"],
        "Math": [85, 92, 65, 88, 78],
        "Science": [90, 95, 70, 85, 80],
        "Passed": [True, True, True, True, True]
    })

    print("Master DataFrame:\n", df)

    # 1. Single Bracket -> Returns 1D Series
    s_math = df["Math"]
    print("\n1. Single Bracket df['Math']:")
    print(f"   Type: {type(s_math).__name__}, Shape: {s_math.shape}")
    print(s_math)

    # 2. Double Bracket -> Returns 2D DataFrame (Single Column)
    df_math = df[["Math"]]
    print("\n2. Double Bracket df[['Math']]:")
    print(f"   Type: {type(df_math).__name__}, Shape: {df_math.shape}")
    print(df_math)

    # 3. Multi-Column Feature Matrix Extraction: df[['Name', 'Math', 'Science']]
    feature_subset = df[["Name", "Math", "Science"]]
    print("\n3. Multi-Column Feature Subset df[['Name', 'Math', 'Science']]:")
    print(f"   Shape: {feature_subset.shape}")
    print(feature_subset)

if __name__ == "__main__":
    main()
