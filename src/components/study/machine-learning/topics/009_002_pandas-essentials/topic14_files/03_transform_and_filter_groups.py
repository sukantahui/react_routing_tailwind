"""
==============================================================================
Topic 14: Grouping Data with groupby() in Pandas
Script 03: Advanced Group Transformations (.transform) and Group Filtering (.filter)
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
    "Math": [85, 92, 65, 88, 78, 90, 84, 80]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. df.groupby().transform(): Adding Group-Level Statistics Back to Original Rows
# --------------------------------------------------------------------------
section("2. .transform() FOR FEATURE ENGINEERING (SAME OUTPUT LENGTH AS INPUT)")
# Unlike .mean() which collapses rows, .transform('mean') broadcasts the group mean
# back to EVERY original row corresponding to that group!
df["Dept_Avg_Math"] = df.groupby("Department")["Math"].transform("mean").round(1)

# Deviation from department average (Key ML feature!)
df["Math_Diff_From_Dept_Avg"] = df["Math"] - df["Dept_Avg_Math"]

print("DataFrame with Group-Broadcasted Feature:")
print(df[["Name", "Department", "Math", "Dept_Avg_Math", "Math_Diff_From_Dept_Avg"]])

# --------------------------------------------------------------------------
# 2. df.groupby().filter(): Dropping Entire Groups Based on a Boolean Property
# --------------------------------------------------------------------------
section("3. .filter() FOR PRUNING ENTIRE GROUPS")
# Keep only departments that have MORE THAN 2 students enrolled
df_popular_depts = df.groupby("Department").filter(lambda g: len(g) >= 3)
print("Students in departments with >= 3 enrolled students (Computer Science & Commerce):")
print(df_popular_depts[["StudentID", "Name", "Department", "Math"]])
