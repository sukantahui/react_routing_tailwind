"""
01_dict_of_lists_creation.py
============================
Topic: Creating Pandas DataFrames from Dictionaries of Lists / Arrays
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("CREATING DATAFRAMES FROM DICTIONARY OF LISTS")
    print("=" * 70)

    # 1. Standard Dictionary of Equal-Length Lists
    # Keys become Column Headers; Lists become Column Data Series
    student_dict = {
        "Roll_No": [101, 102, 103, 104],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
        "City": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati"],
        "ML_Score": [88, 95, 72, 91]
    }

    # Default 0-indexed RangeIndex
    df_default = pd.DataFrame(student_dict)
    print("1. DataFrame with Default RangeIndex (0, 1, 2, 3):\n", df_default)

    # 2. Specifying Custom Row Index
    df_custom = pd.DataFrame(
        data=student_dict,
        index=["Student_A", "Student_B", "Student_C", "Student_D"]
    )
    print("\n2. DataFrame with Custom String Index:\n", df_custom)

    # 3. Handling Unequal Length List Error:
    print("\n3. Testing Unequal List Lengths (Common Pitfall):")
    invalid_dict = {
        "A": [1, 2, 3],
        "B": [10, 20]  # Length 2 vs Length 3!
    }
    try:
        df_invalid = pd.DataFrame(invalid_dict)
    except ValueError as e:
        print("  [ERROR CAUGHT]:", e)
        print("  -> Rule: All arrays/lists in a dict of lists MUST have identical length!")

if __name__ == "__main__":
    main()
