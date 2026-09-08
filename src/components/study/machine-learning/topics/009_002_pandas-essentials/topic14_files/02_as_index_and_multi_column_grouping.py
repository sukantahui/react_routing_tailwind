"""
==============================================================================
Topic 14: Grouping Data with groupby() in Pandas
Script 02: Multi-Column Grouping & as_index=False Configuration
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
    "StudentID": [101, 102, 103, 104, 105, 106, 107, 108],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore"],
    "Department": ["Computer Science", "Computer Science", "Commerce", "Science", "Commerce", "Computer Science", "Science", "Commerce"],
    "Math": [85, 92, 65, 88, 78, 90, 84, 80],
    "Science": [90, 95, 70, 85, 80, 92, 88, 82]
}

df = pd.DataFrame(data)

# --------------------------------------------------------------------------
# 1. Multi-Column Grouping (Locality & Department)
# --------------------------------------------------------------------------
section("1. MULTI-COLUMN GROUPING (Locality + Department)")
multi_group = df.groupby(["Locality", "Department"])[["Math", "Science"]].mean()
print("Multi-level Grouped Means (Creates MultiIndex on Rows):")
print(multi_group)
print("\nMultiIndex Row Levels:", multi_group.index.names)

# --------------------------------------------------------------------------
# 2. as_index=False (SQL-like Flattened Tabular Output)
# --------------------------------------------------------------------------
section("2. as_index=False (FLATTENED / SQL GROUP BY EQUIVALENT)")
# By default, grouping columns become row index labels.
# Setting as_index=False keeps grouping columns as standard DataFrame columns!
df_flat = df.groupby("Department", as_index=False)[["Math", "Science"]].mean().round(2)
print("Flat Tabular DataFrame (as_index=False):")
print(df_flat)

# --------------------------------------------------------------------------
# 3. reset_index() on GroupBy Results
# --------------------------------------------------------------------------
section("3. ALTERNATIVE: .groupby(...).mean().reset_index()")
df_reset = df.groupby(["Locality", "Department"])[["Math", "Science"]].mean().reset_index()
print(df_reset)
