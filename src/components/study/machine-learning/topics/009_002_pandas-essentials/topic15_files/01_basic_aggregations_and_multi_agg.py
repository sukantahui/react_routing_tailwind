"""
==============================================================================
Topic 15: Aggregation Functions in Pandas
Script 01: Standard Reductions & Multi-Metric Aggregation with .agg()
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
    "Department": ["Computer Science", "Computer Science", "Commerce", "Science", "Commerce", "Computer Science", "Science", "Commerce"],
    "Math": [85, 92, 65, 88, 78, 90, 84, 80],
    "Science": [90, 95, 70, 85, 80, 92, 88, 82],
    "Attendance": [95, 98, 80, 92, 85, 94, 90, 88]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATASET")
print(df)

# --------------------------------------------------------------------------
# 1. Global DataFrame-Level Reductions
# --------------------------------------------------------------------------
section("2. GLOBAL AGGREGATIONS (numeric_only=True)")
# In modern Pandas 2.0+, numeric_only=True is required to ignore string columns cleanly
print("Global Column Means:")
print(df[["Math", "Science", "Attendance"]].mean())

print("\nGlobal Column Sums:")
print(df[["Math", "Science", "Attendance"]].sum())

# --------------------------------------------------------------------------
# 2. Group-Level Multi-Metric Aggregation with List of Strings
# --------------------------------------------------------------------------
section("3. GROUP MULTI-METRIC AGGREGATION (.agg(['mean', 'median', 'std', 'count']))")
# Passing a list computes all 4 metrics for the specified column
math_stats = df.groupby("Department")["Math"].agg(["count", "mean", "median", "std", "min", "max"]).round(2)
print("Math Score Statistics per Department:")
print(math_stats)

# Multi-metric on multiple columns
multi_col_stats = df.groupby("Department")[["Math", "Science"]].agg(["mean", "max"]).round(1)
print("\nMulti-Column Multi-Metric Matrix:")
print(multi_col_stats)
