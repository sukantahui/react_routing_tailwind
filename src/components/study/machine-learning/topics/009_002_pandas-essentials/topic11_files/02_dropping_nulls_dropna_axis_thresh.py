"""
==============================================================================
Topic 11: Handling Missing Values in Pandas
Script 02: Dropping Missing Values with dropna() (axis, how, subset, thresh)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd
import numpy as np

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality": ["Barrackpore", "Shyamnagar", np.nan, "Naihati", "Kolkata", "Barrackpore", np.nan],
    "Math": [85.0, 92.0, np.nan, 88.0, 78.0, np.nan, 84.0],
    "Science": [90.0, np.nan, 70.0, 85.0, 80.0, 92.0, 88.0],
    "Scholarship": [1200.0, 1500.0, np.nan, np.nan, 800.0, 1500.0, np.nan]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATA (7 rows)")
print(df)

# --------------------------------------------------------------------------
# 1. Default dropna(): Drops any row with AT LEAST ONE NaN (how='any')
# --------------------------------------------------------------------------
section("2. df.dropna() (DEFAULT: axis=0, how='any')")
df_dropped_any = df.dropna()
print(f"Rows remaining after default dropna: {len(df_dropped_any)}")
print(df_dropped_any)

# --------------------------------------------------------------------------
# 2. Dropping based on specific columns: subset=['Math', 'Science']
# --------------------------------------------------------------------------
section("3. df.dropna(subset=['Math', 'Science'])")
# Only drop row if Math OR Science is missing (keep if only Scholarship is missing)
df_valid_marks = df.dropna(subset=["Math", "Science"])
print(f"Rows with both Math and Science available: {len(df_valid_marks)}")
print(df_valid_marks[["StudentID", "Name", "Math", "Science"]])

# --------------------------------------------------------------------------
# 3. Minimum Non-Null Threshold (thresh parameter)
# --------------------------------------------------------------------------
section("4. df.dropna(thresh=5)")
# Keep rows that have AT LEAST 5 valid non-null values across columns
df_thresh = df.dropna(thresh=5)
print(f"Rows with at least 5 non-null values: {len(df_thresh)}")
print(df_thresh)

# --------------------------------------------------------------------------
# 4. Dropping Columns with Missing Values (axis=1 / axis='columns')
# --------------------------------------------------------------------------
section("5. df.dropna(axis=1) - DROPPING COLUMNS WITH ANY NULLS")
df_clean_cols = df.dropna(axis=1)
print("Columns remaining with zero nulls:", df_clean_cols.columns.tolist())
print(df_clean_cols.head())
