"""
02_info_dtypes_nonnull_memory.py
================================
Topic: DataFrame Metadata Diagnostics: df.info() & Memory Usage
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("METADATA INSPECTION: df.info() & DATA INTEGRITY")
    print("=" * 70)

    # Dataset with intentional missing values (NaN)
    data = {
        "StudentID": [101, 102, 103, 104, 105],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin"],
        "Attendance_%": [92.0, 98.0, np.nan, 95.0, np.nan],  # 2 missing
        "Passed": [True, True, True, True, False],
        "Grade": ["A", "A+", "B", "A", None]                 # 1 missing
    }
    df = pd.DataFrame(data)

    print("1. DataFrame Display:\n", df)

    # 2. Comprehensive df.info()
    # Prints: Class type, RangeIndex, Column count, Column names, Non-Null Count, Dtype, Memory
    print("\n2. Output of df.info(memory_usage='deep'):")
    df.info(memory_usage="deep")

    # 3. Direct Programmatic Diagnostics
    print(f"\n3. Programmatic Quick Check:")
    print(f"   Shape             : {df.shape}")
    print(f"   Total Missing Nulls: {df.isna().sum().sum()}")
    print(f"   Missing per Column:\n{df.isna().sum()}")

if __name__ == "__main__":
    main()
