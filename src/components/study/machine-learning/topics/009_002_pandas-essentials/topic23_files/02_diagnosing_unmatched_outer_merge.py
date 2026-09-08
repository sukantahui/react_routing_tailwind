"""
==============================================================================
Topic 23: Worked Example 4 - Merging Two DataFrames on a Key Column
Script 02: Diagnosing Data Discrepancies with Outer Merge & indicator=True
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

admissions = pd.DataFrame({
    "RegNo": ["REG-101", "REG-102", "REG-103", "REG-104", "REG-105", "REG-106"],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
    "Course": ["Python ML", "Python ML", "Data Science", "Python ML", "Data Science", "Python ML"]
})

test_results = pd.DataFrame({
    "RegNo": ["REG-101", "REG-102", "REG-103", "REG-104", "REG-106", "REG-107"],
    "Score_Pct": [88.5, 94.0, 72.0, 89.5, 91.0, 85.0]
})

# --------------------------------------------------------------------------
# 1. Full Outer Merge with indicator=True
# --------------------------------------------------------------------------
section("1. FULL OUTER MERGE WITH MERGE INDICATOR")
outer_audit = pd.merge(
    admissions,
    test_results,
    on="RegNo",
    how="outer",
    indicator=True
)

print(outer_audit)

# --------------------------------------------------------------------------
# 2. Diagnosing Unmatched Records
# --------------------------------------------------------------------------
section("2. DIAGNOSTIC DISCREPANCY AUDIT")

# Case A: Enrolled students who MISSED the test (left_only)
absentees = outer_audit[outer_audit["_merge"] == "left_only"]
print("Registered Students Who Missed Online Assessment:")
print(absentees[["RegNo", "Name", "Course"]])

# Case B: Unregistered Walk-in Test Takers (right_only)
walkins = outer_audit[outer_audit["_merge"] == "right_only"]
print("\nUnregistered Candidates Who Took Online Assessment:")
print(walkins[["RegNo", "Score_Pct"]])
