"""
==============================================================================
Topic 13: Sorting Values and Index in Pandas
Script 02: Handling Missing Values (na_position) and Sorting by Index
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
    "StudentID": [105, 101, 107, 102, 104, 103, 106],
    "Name": ["Sachin", "Debangshu", "Abhronila", "Susmita", "Tuhina", "Swadeep", "Mahima"],
    "BonusMarks": [10.0, np.nan, 15.0, np.nan, 20.0, 5.0, 18.0]
}

df = pd.DataFrame(data).set_index("StudentID")
section("1. UNSORTED INDEX WITH MISSING VALUES (NaN)")
print(df)

# --------------------------------------------------------------------------
# 1. Missing Value Placement: na_position='last' vs na_position='first'
# --------------------------------------------------------------------------
section("2. na_position='last' (DEFAULT) VS na_position='first'")
# By default, Pandas places NaNs at the very end regardless of ASC/DESC
df_na_last = df.sort_values(by="BonusMarks", ascending=False, na_position="last")
print("BonusMarks DESC with na_position='last' (default):")
print(df_na_last)

df_na_first = df.sort_values(by="BonusMarks", ascending=False, na_position="first")
print("\nBonusMarks DESC with na_position='first':")
print(df_na_first)

# --------------------------------------------------------------------------
# 2. Sorting by Row Index (df.sort_index())
# --------------------------------------------------------------------------
section("3. SORTING BY INDEX (df.sort_index(ascending=True))")
df_sorted_by_id = df.sort_index(ascending=True)
print("DataFrame ordered by StudentID index (101 to 107):")
print(df_sorted_by_id)

# --------------------------------------------------------------------------
# 3. Sorting by Column Headers Alphabetically (axis=1)
# --------------------------------------------------------------------------
section("4. SORTING COLUMN AXIS ALPHABETICALLY (df.sort_index(axis=1))")
df_cols_sorted = df.sort_index(axis=1, ascending=True)
print("Columns ordered alphabetically (BonusMarks -> Name):")
print(df_cols_sorted)
