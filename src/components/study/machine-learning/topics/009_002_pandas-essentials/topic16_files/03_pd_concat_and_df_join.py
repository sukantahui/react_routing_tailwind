"""
==============================================================================
Topic 16: Merging and Joining DataFrames in Pandas
Script 03: Vertical/Horizontal Stacking with pd.concat & Index-based df.join
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Monthly sales logs
batch_jan = pd.DataFrame({
    "StudentID": [101, 102],
    "Name": ["Debangshu", "Susmita"],
    "Score": [85, 92]
})

batch_feb = pd.DataFrame({
    "StudentID": [103, 104],
    "Name": ["Swadeep", "Tuhina"],
    "Score": [65, 88]
})

# --------------------------------------------------------------------------
# 1. Vertical Concatenation (axis=0, ignore_index=True)
# --------------------------------------------------------------------------
section("1. VERTICAL CONCATENATION (axis=0, STACKING ROWS)")
all_students = pd.concat([batch_jan, batch_feb], axis=0, ignore_index=True)
print("Combined Cohort (Rows Appended):")
print(all_students)

# Hierarchical MultiIndex Concatenation (keys parameter)
cohort_keyed = pd.concat([batch_jan, batch_feb], keys=["January", "February"])
print("\nVertical Concat with Month Keys:")
print(cohort_keyed)

# --------------------------------------------------------------------------
# 2. Horizontal Concatenation (axis=1, STACKING COLUMNS)
# --------------------------------------------------------------------------
section("2. HORIZONTAL CONCATENATION (axis=1)")
extra_info = pd.DataFrame({
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati"],
    "Attendance": [95, 98, 80, 92]
})

full_table = pd.concat([all_students, extra_info], axis=1)
print("Side-by-side Merged DataFrame (axis=1):")
print(full_table)

# --------------------------------------------------------------------------
# 3. Index-Based Joining with df.join()
# --------------------------------------------------------------------------
section("3. df.join() (OPTIMIZED FOR INDEX-TO-INDEX JOINS)")
df_left = pd.DataFrame({"Math": [85, 92]}, index=[101, 102])
df_right = pd.DataFrame({"Science": [90, 95]}, index=[101, 102])

joined = df_left.join(df_right)
print("df.join() result on matching index:")
print(joined)
