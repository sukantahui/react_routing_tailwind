"""
03_loc_vs_iloc_slicing_comparison.py
====================================
Topic: Side-by-Side Comparison: loc vs iloc on Integer-Indexed DataFrames
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("CRITICAL COMPARISON: loc VS iloc ON INTEGER INDEXED DATAFRAMES")
    print("=" * 70)

    # Shuffled integer index (simulating sampled or filtered ML data)
    df_shuffled = pd.DataFrame({
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
        "Score": [88, 95, 72, 91]
    }, index=[10, 20, 30, 40])

    print("Shuffled Integer-Indexed DataFrame:\n", df_shuffled)

    # 1. Single Key Access:
    # df.loc[10] looks for label 10 -> Returns Debangshu
    # df.iloc[0] looks for 0th row in memory -> Returns Debangshu
    # df.iloc[10] -> IndexError! (There are only 4 rows)
    print("\n1. Single Index Lookup:")
    print("   df.loc[10]  (Looks for LABEL 10)  :", df_shuffled.loc[10]["Name"])
    print("   df.iloc[0]  (Looks for POSITION 0):", df_shuffled.iloc[0]["Name"])

    # 2. Slicing Differences:
    # df.loc[10:30] includes labels 10, 20, 30 (3 rows, endpoint INCLUSIVE)
    # df.iloc[0:2]  includes positions 0 and 1 (2 rows, endpoint EXCLUSIVE)
    print("\n2. Slicing Comparison:")
    print("   df.loc[10:30] (INCLUSIVE):\n", df_shuffled.loc[10:30])
    print("\n   df.iloc[0:2] (EXCLUSIVE):\n", df_shuffled.iloc[0:2])

    # 3. Avoiding SettingWithCopyWarning in ML:
    # Always use df.loc[mask, 'col'] = new_val instead of chained indexing df[mask]['col'] = new_val!
    df_shuffled.loc[df_shuffled["Score"] < 80, "Score"] = 75  # Grace boost
    print("\n3. In-Place Update via loc[mask, 'col']:\n", df_shuffled)

if __name__ == "__main__":
    main()
