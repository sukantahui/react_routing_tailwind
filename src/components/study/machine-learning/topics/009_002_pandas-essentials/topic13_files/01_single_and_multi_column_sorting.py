"""
==============================================================================
Topic 13: Sorting Values and Index in Pandas
Script 01: Single and Multi-Column Sorting with sort_values()
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
    "Math": [85, 92, 65, 88, 78, 90, 84],
    "Science": [90, 95, 70, 85, 80, 92, 88],
    "Attendance": [95, 98, 80, 92, 85, 94, 90]
}

df = pd.DataFrame(data)
section("1. INITIAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. Single Column Sorting (Ascending vs Descending)
# --------------------------------------------------------------------------
section("2. SINGLE COLUMN SORTING (df.sort_values(by='Math', ascending=False))")
df_math_desc = df.sort_values(by="Math", ascending=False)
print("Ranked by Math Score (Highest to Lowest):")
print(df_math_desc[["StudentID", "Name", "Locality", "Math"]])

# --------------------------------------------------------------------------
# 2. Multi-Column Sorting with Mixed Direction Vectors
# --------------------------------------------------------------------------
section("3. MULTI-COLUMN SORTING (Locality ASC, Science DESC)")
# Sort primarily by Locality (A-Z), and secondarily by Science (Highest first)
df_multi = df.sort_values(
    by=["Locality", "Science"],
    ascending=[True, False]
)
print(df_multi[["Locality", "Name", "Science", "Math"]])

# --------------------------------------------------------------------------
# 3. Index Resetting after Sorting (.reset_index(drop=True))
# --------------------------------------------------------------------------
section("4. CLEANING INDEX WITH .reset_index(drop=True)")
# Notice how original row indices were scrambled above. Resetting creates clean 0..N ranks:
df_leaderboard = (
    df
    .sort_values(by="Math", ascending=False)
    .reset_index(drop=True)
)
df_leaderboard.index = df_leaderboard.index + 1  # 1-indexed Rank
df_leaderboard.index.name = "Rank"
print("Clean Leaderboard with 1-based Rank index:")
print(df_leaderboard[["Name", "Math", "Science", "Locality"]])
