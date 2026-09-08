"""
==============================================================================
Topic 15: Aggregation Functions in Pandas
Script 02: Dictionary Mapping & Named Aggregations (Pandas Best Practice)
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

# --------------------------------------------------------------------------
# 1. Column-Specific Dictionary Aggregations
# --------------------------------------------------------------------------
section("1. COLUMN-SPECIFIC DICTIONARY MAPPING (df.groupby().agg({...}))")
dict_agg = df.groupby("Department").agg({
    "StudentID": "count",
    "Math": ["mean", "max"],
    "Science": "median",
    "Attendance": "mean"
}).round(1)

print("Resulting DataFrame with MultiIndex columns:")
print(dict_agg)

# --------------------------------------------------------------------------
# 2. Named Aggregation (The Modern, Clean Way to Avoid MultiIndex Headers)
# --------------------------------------------------------------------------
section("2. NAMED AGGREGATIONS (syntax: new_col_name=('existing_col', 'agg_func'))")
# Named aggregation gives intuitive flat column names right away!
named_summary = df.groupby("Department", as_index=False).agg(
    Total_Enrolled=("StudentID", "count"),
    Average_Math=("Math", "mean"),
    Top_Math_Score=("Math", "max"),
    Average_Science=("Science", "mean"),
    Avg_Attendance_Rate=("Attendance", "mean")
).round(2)

print("Clean Flattened Summary DataFrame:")
print(named_summary)
