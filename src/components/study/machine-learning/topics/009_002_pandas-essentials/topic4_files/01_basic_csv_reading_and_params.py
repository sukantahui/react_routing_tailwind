"""
01_basic_csv_reading_and_params.py
==================================
Topic: Reading CSV Files with pd.read_csv: Core Parameters (header, index_col, usecols)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import io
import pandas as pd

def main():
    print("=" * 70)
    print("READING CSV FILES: CORE PARAMETERS & WORKFLOWS")
    print("=" * 70)

    # Simulated CSV file stored as a string buffer (Barrackpore batch test records)
    csv_raw = """StudentID,Name,Locality,Math,Science,Passed
101,Debangshu,Barrackpore,85,90,True
102,Susmita,Shyamnagar,92,95,True
103,Swadeep,Ichapur,65,70,True
104,Tuhina,Naihati,88,85,True
105,Sachin,Kolkata,78,80,True
"""

    # 1. Default CSV Read (Header auto-detected, 0-indexed rows)
    df_default = pd.read_csv(io.StringIO(csv_raw))
    print("1. Default pd.read_csv:\n", df_default)
    print(f"   Shape: {df_default.shape}, Columns: {list(df_default.columns)}")

    # 2. Setting Custom Index Column: index_col='StudentID'
    df_indexed = pd.read_csv(io.StringIO(csv_raw), index_col="StudentID")
    print("\n2. With index_col='StudentID':\n", df_indexed)

    # 3. Loading Specific Feature Columns: usecols=['Name', 'Math', 'Science']
    # Saves substantial memory by skipping unused columns during file ingestion!
    df_subset = pd.read_csv(
        io.StringIO(csv_raw),
        usecols=["Name", "Math", "Science"]
    )
    print("\n3. Memory-Optimized with usecols=['Name', 'Math', 'Science']:\n", df_subset)

if __name__ == "__main__":
    main()
