"""
==============================================================================
Topic 10: Adding and Dropping Columns in Pandas
Script 02: Dropping Columns, Rows, and Understanding inplace Parameter
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh"],
    "TempNotes": ["Fee Paid", "Pending", "Fee Paid", "Fee Paid", "Pending", "Fee Paid", "Fee Paid"],
    "InternalCode": ["BKP-01", "BKP-02", "BKP-03", "BKP-04", "BKP-05", "BKP-06", "BKP-07"],
    "Math": [85, 92, 65, 88, 78, 90, 84]
}

df = pd.DataFrame(data)
section("1. STARTING DATAFRAME WITH UNWANTED COLUMNS")
print(df)

# --------------------------------------------------------------------------
# 1. Dropping a single column via columns parameter (Returns New DataFrame)
# --------------------------------------------------------------------------
section("2. DROPPING COLUMNS VIA columns=[...] (DEFAULT: NON-DESTRUCTIVE)")
df_clean = df.drop(columns=["TempNotes"])
print("Original df columns:", list(df.columns))
print("df_clean columns:   ", list(df_clean.columns))

# --------------------------------------------------------------------------
# 2. Dropping multiple columns via axis=1 / axis='columns'
# --------------------------------------------------------------------------
section("3. DROPPING MULTIPLE COLUMNS (axis=1)")
df_trimmed = df.drop(["TempNotes", "InternalCode"], axis=1)
print(df_trimmed)

# --------------------------------------------------------------------------
# 3. Dropping Rows by Index (axis=0 / axis='index')
# --------------------------------------------------------------------------
section("4. DROPPING ROWS BY INDEX LABELS (axis=0)")
# Dropping row index 2 (Swadeep) and index 4 (Sachin)
df_without_2_4 = df.drop(index=[2, 4])
print("Rows remaining:", len(df_without_2_4))
print(df_without_2_4[["StudentID", "Name", "Locality"]])

# --------------------------------------------------------------------------
# 4. Inplace Modification vs Modern Best Practice
# --------------------------------------------------------------------------
section("5. UNDERSTANDING inplace=True VS METHOD REASSIGNMENT")
df_copy = df.copy()

# Inplace mutation
df_copy.drop(columns=["InternalCode"], inplace=True)
print("df_copy after inplace=True:", list(df_copy.columns))

# Modern Pandas Best Practice: Prefer explicit reassignment over inplace=True
# Reasons: inplace=True often doesn't save memory under Copy-on-Write (CoW),
# prevents method chaining, and will be deprecated in future Pandas versions.
df_reassigned = df.drop(columns=["TempNotes", "InternalCode"])
print("Modern pattern (df = df.drop(...)):")
print(df_reassigned.head(3))
