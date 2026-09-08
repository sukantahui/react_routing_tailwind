"""
==============================================================================
Topic 23: Worked Example 4 - Merging Two DataFrames on a Key Column
Script 01: Admissions Profiles & Assessment Logs: Inner vs Left Merge
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Primary Student Admissions Table (Table 1)
admissions = pd.DataFrame({
    "RegNo": ["REG-101", "REG-102", "REG-103", "REG-104", "REG-105", "REG-106"],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
    "Course": ["Python ML", "Python ML", "Data Science", "Python ML", "Data Science", "Python ML"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore"]
})

# Online Assessment Test Submissions (Table 2)
# Note: Sachin (REG-105) was absent. Abhronila (REG-107) is a walk-in candidate not yet in Admissions.
test_results = pd.DataFrame({
    "Student_Reg_Code": ["REG-101", "REG-102", "REG-103", "REG-104", "REG-106", "REG-107"],
    "Score_Pct": [88.5, 94.0, 72.0, 89.5, 91.0, 85.0],
    "Submission_Time_Min": [45, 38, 55, 42, 40, 48]
})

section("1. SOURCE DATASETS")
print("Admissions Table (6 Registered Candidates):")
print(admissions)
print("\nOnline Test Log (6 Submissions):")
print(test_results)

# --------------------------------------------------------------------------
# 1. INNER JOIN on Key (Intersection of Enrolled & Tested)
# --------------------------------------------------------------------------
section("2. INNER MERGE (Enrolled Candidates Who Completed Test)")
inner_enrolled_tested = pd.merge(
    admissions,
    test_results,
    left_on="RegNo",
    right_on="Student_Reg_Code",
    how="inner"
).drop(columns=["Student_Reg_Code"])

print(inner_enrolled_tested)

# --------------------------------------------------------------------------
# 2. LEFT JOIN (Preserve All Registered Students, Flagging Absentees)
# --------------------------------------------------------------------------
section("3. LEFT MERGE (Audit All Registered Students)")
left_all_admissions = pd.merge(
    admissions,
    test_results,
    left_on="RegNo",
    right_on="Student_Reg_Code",
    how="left"
).drop(columns=["Student_Reg_Code"])

print(left_all_admissions)
