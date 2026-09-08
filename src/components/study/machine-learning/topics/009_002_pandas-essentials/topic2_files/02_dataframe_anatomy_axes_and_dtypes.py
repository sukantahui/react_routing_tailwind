"""
02_dataframe_anatomy_axes_and_dtypes.py
=======================================
Topic: DataFrame Anatomy: Axes (Index & Columns), Dtypes, and Memory Profiling
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("DATAFRAME ANATOMY: AXES, DTYPES & MEMORY PROFILING")
    print("=" * 70)

    # 1. Constructing a multi-type DataFrame
    df = pd.DataFrame({
        "Student_ID": [101, 102, 103, 104],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
        "Course": ["Machine Learning", "Data Science", "Machine Learning", "Deep Learning"],
        "Marks": [88.5, 95.0, 72.0, 91.5],
        "Passed": [True, True, True, True]
    }, index=["S1", "S2", "S3", "S4"])

    print("1. DataFrame Structure:\n", df)

    # 2. Inspecting Axes
    print(f"\n2. DataFrame Axes & Geometry:")
    print(f"   Shape (Rows, Cols) : {df.shape}")
    print(f"   Row Index (Axis 0) : {df.index.tolist()}")
    print(f"   Columns   (Axis 1) : {df.columns.tolist()}")
    print(f"   Dimensions (ndim)  : {df.ndim}")
    print(f"   Total Elements     : {df.size}")

    # 3. Column Data Types (Dtypes)
    print("\n3. Column Data Types (df.dtypes):")
    print(df.dtypes)

    # 4. Deep Memory Usage Profiling
    # Measures exact byte allocation in RAM including object string pointers
    mem_usage = df.memory_usage(deep=True)
    print("\n4. Memory Footprint per Column (Bytes):\n", mem_usage)
    print(f"   Total Memory: {mem_usage.sum()} bytes")

if __name__ == "__main__":
    main()
