"""
03_dict_of_series_and_orient_options.py
=======================================
Topic: from_dict Orientations ('columns' vs 'index') & Dict of Series
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("DATAFRAME FROM_DICT ORIENTATIONS & DICT OF SERIES")
    print("=" * 70)

    # 1. Dictionary of Series with Unequal and Mismatched Indices
    # Unlike dict of lists, Series in a dict DO NOT need to be equal length!
    # Pandas aligns them automatically by their internal Series index.
    s1 = pd.Series([85, 92, 65], index=["Debangshu", "Susmita", "Swadeep"])
    s2 = pd.Series([90, 88, 78, 85], index=["Susmita", "Debangshu", "Sachin", "Tuhina"])

    df_series = pd.DataFrame({"Math": s1, "Science": s2})
    print("1. DataFrame from Dict of Series (Automatic Index Union):\n", df_series)

    # 2. pd.DataFrame.from_dict with Orientations
    nested_dict = {
        "Debangshu": {"Age": 22, "Score": 88, "Passed": True},
        "Susmita":   {"Age": 23, "Score": 95, "Passed": True},
        "Swadeep":   {"Age": 21, "Score": 72, "Passed": True}
    }

    # Default orient='columns': Outer keys become Column Names
    df_orient_cols = pd.DataFrame.from_dict(nested_dict, orient='columns')
    print("\n2. pd.DataFrame.from_dict(orient='columns'):\n", df_orient_cols)

    # orient='index': Outer keys become Row Indices (Often preferred for entity records!)
    df_orient_idx = pd.DataFrame.from_dict(nested_dict, orient='index')
    print("\n3. pd.DataFrame.from_dict(orient='index'):\n", df_orient_idx)

if __name__ == "__main__":
    main()
