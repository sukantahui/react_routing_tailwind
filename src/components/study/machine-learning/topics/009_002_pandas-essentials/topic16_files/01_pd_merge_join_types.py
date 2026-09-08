"""
==============================================================================
Topic 16: Merging and Joining DataFrames in Pandas
Script 01: Relational Joins with pd.merge (inner, left, right, outer)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Primary Student Info Table
students = pd.DataFrame({
    "StudentID": [101, 102, 103, 104, 105],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata"]
})

# Exam Scores Table (Sachin is missing, Mahima 106 & Abhronila 107 are present)
scores = pd.DataFrame({
    "StudentID": [101, 102, 103, 104, 106, 107],
    "Math": [85, 92, 65, 88, 90, 84],
    "Science": [90, 95, 70, 85, 92, 88]
})

section("1. PRIMARY TABLES")
print("Table 1: Students (5 rows)")
print(students)
print("\nTable 2: Scores (6 rows)")
print(scores)

# --------------------------------------------------------------------------
# 1. INNER JOIN (Intersection: only students present in BOTH tables)
# --------------------------------------------------------------------------
section("2. INNER JOIN (how='inner') - ONLY COMMON KEYS (101, 102, 103, 104)")
inner_df = pd.merge(students, scores, on="StudentID", how="inner")
print(inner_df)

# --------------------------------------------------------------------------
# 2. LEFT JOIN (Preserves ALL students from left table, fills missing with NaN)
# --------------------------------------------------------------------------
section("3. LEFT JOIN (how='left') - ALL STUDENTS RETAINED (Sachin gets NaN)")
left_df = pd.merge(students, scores, on="StudentID", how="left")
print(left_df)

# --------------------------------------------------------------------------
# 3. RIGHT JOIN (Preserves ALL scores, students without profile get NaN)
# --------------------------------------------------------------------------
section("4. RIGHT JOIN (how='right') - ALL EXAM PARTICIPANTS RETAINED")
right_df = pd.merge(students, scores, on="StudentID", how="right")
print(right_df)

# --------------------------------------------------------------------------
# 4. FULL OUTER JOIN (Union: all records from both tables preserved)
# --------------------------------------------------------------------------
section("5. FULL OUTER JOIN (how='outer', indicator=True)")
outer_df = pd.merge(students, scores, on="StudentID", how="outer", indicator=True)
print(outer_df)
