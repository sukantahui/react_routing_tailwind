"""
01_loc_label_based_indexing.py
==============================
Topic: Label-Based Indexing with df.loc[] (Explicit Labels & Slicing)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("PANDAS df.loc[]: LABEL-BASED INDEXING")
    print("=" * 70)

    # 4 students indexed by their Student Enrollment Code
    df = pd.DataFrame({
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
        "City": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati"],
        "Math": [85, 92, 65, 88],
        "Science": [90, 95, 70, 85]
    }, index=["BP_101", "BP_102", "BP_103", "BP_104"])

    print("Master DataFrame (String Index):\n", df)

    # 1. Single Row Access by Label -> Returns 1D Series
    row_susmita = df.loc["BP_102"]
    print("\n1. Single Row df.loc['BP_102']:\n", row_susmita)

    # 2. Specific Cell Access: df.loc[row_label, col_label]
    math_debangshu = df.loc["BP_101", "Math"]
    print(f"\n2. Specific Cell df.loc['BP_101', 'Math']: {math_debangshu}")

    # 3. Label-Based Slicing: df.loc['BP_101':'BP_103', :]
    # CRITICAL RULE: In df.loc[], the slice stop endpoint IS INCLUSIVE!
    # ('BP_103' IS INCLUDED in the result)
    slice_inclusive = df.loc["BP_101":"BP_103", ["Name", "Math"]]
    print("\n3. Label Slicing df.loc['BP_101':'BP_103'] (Endpoint INCLUSIVE!):\n", slice_inclusive)

    # 4. Conditional Filtering via loc: df.loc[condition, columns]
    # In ML, this is standard for modifying subsets in place without SettingWithCopyWarning
    merit_students = df.loc[df["Math"] >= 85, ["Name", "Math", "Science"]]
    print("\n4. Conditional Filtering df.loc[df['Math'] >= 85, ...]:\n", merit_students)

if __name__ == "__main__":
    main()
