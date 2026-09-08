"""
01_intro_pandas_series_dataframe.py
===================================
Topic: Introduction to Pandas: Core Data Structures (Series & DataFrame)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("INTRODUCTION TO PANDAS: 1D SERIES & 2D DATAFRAMES")
    print("=" * 70)

    # 1. Why Pandas?
    # While NumPy provides raw N-dimensional homogeneous numeric arrays,
    # Pandas brings labeled, heterogeneous tabular data structures essential
    # for real-world Machine Learning feature engineering and ETL pipelines.

    # 2. 1D Labeled Array: Pandas Series
    # Student scores in Barrackpore Machine Learning batch
    scores_series = pd.Series(
        data=[88, 94, 72, 91, 85],
        index=["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin"],
        name="Exam_Score"
    )
    print("1. Pandas Series (1D Labeled Array):")
    print(scores_series)
    print(f"   Data Type: {scores_series.dtype}, Index: {list(scores_series.index)}")
    print(f"   Debangshu's Score: {scores_series['Debangshu']}")

    # 3. 2D Labeled Tabular Matrix: Pandas DataFrame
    data_dict = {
        "Student": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin"],
        "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata"],
        "Study_Hours": [12.5, 15.0, 8.0, 14.5, 10.0],
        "Attendance_%": [92, 98, 75, 95, 84],
        "Passed": [True, True, True, True, True]
    }
    df_students = pd.DataFrame(data_dict)

    print("\n2. Pandas DataFrame (2D Heterogeneous Table):")
    print(df_students)
    print(f"\n   Shape: {df_students.shape} (5 rows, 5 columns)")
    print(f"   Columns: {list(df_students.columns)}")
    print(f"   Data Types:\n{df_students.dtypes}")

if __name__ == "__main__":
    main()
