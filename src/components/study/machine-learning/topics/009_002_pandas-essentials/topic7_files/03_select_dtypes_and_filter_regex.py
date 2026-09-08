"""
03_select_dtypes_and_filter_regex.py
====================================
Topic: Programmatic Column Filtering: select_dtypes() and filter(like/regex)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("PROGRAMMATIC COLUMN SELECTION: select_dtypes() & filter()")
    print("=" * 70)

    # Complex ML Tabular DataFrame with mixed data types
    df = pd.DataFrame({
        "StudentID": [101, 102, 103],
        "Student_Name": ["Debangshu", "Susmita", "Swadeep"],
        "City_Name": ["Barrackpore", "Shyamnagar", "Ichapur"],
        "Exam_Math_Score": [85.5, 92.0, 65.0],
        "Exam_Sci_Score": [90.0, 95.5, 70.0],
        "Is_Merit": [True, True, False]
    })

    print("Master DataFrame:\n", df)

    # 1. df.select_dtypes(include='number') -> Selects all int/float columns for ML model
    num_df = df.select_dtypes(include="number")
    print("\n1. All Numeric Columns (df.select_dtypes(include='number')):\n", num_df)

    # 2. df.select_dtypes(include='object') -> Selects all string columns for Label/OneHot Encoding
    cat_df = df.select_dtypes(include="object")
    print("\n2. All Categorical / Text Columns (df.select_dtypes(include='object')):\n", cat_df)

    # 3. df.filter(like='Score') -> Matches substring 'Score'
    score_df = df.filter(like="Score")
    print("\n3. Columns containing 'Score' (df.filter(like='Score')):\n", score_df)

    # 4. df.filter(regex=r'_Name$') -> Matches column names ending with '_Name'
    name_df = df.filter(regex=r"_Name$")
    print("\n4. Columns ending with '_Name' (df.filter(regex=r'_Name$')):\n", name_df)

if __name__ == "__main__":
    main()
