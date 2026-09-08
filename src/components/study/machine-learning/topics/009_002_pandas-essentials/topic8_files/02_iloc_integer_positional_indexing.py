"""
02_iloc_integer_positional_indexing.py
======================================
Topic: Integer Positional Indexing with df.iloc[] (0-Indexed & Python Slicing)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("PANDAS df.iloc[]: INTEGER POSITIONAL INDEXING")
    print("=" * 70)

    df = pd.DataFrame({
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
        "City": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati"],
        "Math": [85, 92, 65, 88],
        "Science": [90, 95, 70, 85]
    }, index=["BP_101", "BP_102", "BP_103", "BP_104"])

    print("Master DataFrame:\n", df)

    # 1. Single Row by Integer Offset: df.iloc[0] (First row)
    first_row = df.iloc[0]
    print("\n1. First Row df.iloc[0]:\n", first_row)

    # 2. Specific Cell by Coordinates: df.iloc[row_idx, col_idx]
    # Row 1 (Susmita), Col 2 (Math)
    susmita_math = df.iloc[1, 2]
    print(f"\n2. Specific Cell df.iloc[1, 2] (Row 1, Col 2): {susmita_math}")

    # 3. Positional Slicing: df.iloc[0:2, 0:3]
    # CRITICAL RULE: In df.iloc[], the slice stop endpoint is EXCLUSIVE (like standard Python slices)!
    # 0:2 selects row 0 and row 1 ONLY (row 2 is excluded)
    slice_exclusive = df.iloc[0:2, 0:3]
    print("\n3. Positional Slicing df.iloc[0:2, 0:3] (Endpoint EXCLUSIVE!):\n", slice_exclusive)

    # 4. Negative Indexing (Last Row / Last Column)
    last_row_last_col = df.iloc[-1, -1]
    print(f"\n4. Negative Indexing df.iloc[-1, -1] (Bottom-Right cell): {last_row_last_col}")

if __name__ == "__main__":
    main()
