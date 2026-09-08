"""
==============================================================================
Topic 25: Practice Problems in Pandas
Script 01: Practice Problems 1 & 2 - Filtering & Missing Data Imputation
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

# --------------------------------------------------------------------------
# PROBLEM 1: Multi-Criteria Filter & Leaderboard Generation
# --------------------------------------------------------------------------
section("PROBLEM 1: MULTI-CRITERIA FILTER & LEADERBOARD GENERATION")

data1 = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science"],
    "Math": [85, 92, 65, 88, 78, 90, 84],
    "Science": [90, 95, 70, 85, 80, 92, 88],
    "Attendance_%": [92.5, 96.0, 78.5, 88.0, 82.0, 94.5, 89.0]
}

df1 = pd.DataFrame(data1)

# Task: Create TotalMarks, Average, filter students with Average >= 85 and Attendance >= 90,
# sort by Average descending, and add a 1-based Rank column.
sol1 = (
    df1.assign(
        TotalMarks=lambda x: x["Math"] + x["Science"],
        Average=lambda x: x["TotalMarks"] / 2.0
    )
    .query("Average >= 85.0 and `Attendance_%` >= 90.0")
    .sort_values(by="Average", ascending=False)
    .reset_index(drop=True)
)
sol1.index = sol1.index + 1
sol1.index.name = "Rank"

print("Problem 1 Solution Output:")
print(sol1[["Name", "Department", "Average", "Attendance_%"]])

# --------------------------------------------------------------------------
# PROBLEM 2: Group-Specific Median Imputation with Missing Indicator
# --------------------------------------------------------------------------
section("PROBLEM 2: GROUP-MEDIAN IMPUTATION WITH MISSING INDICATOR")

data2 = {
    "EmpID": [201, 202, 203, 204, 205, 206],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
    "Dept": ["Tech", "Tech", "Support", "HR", "Support", "Tech"],
    "Salary": [60000.0, 90000.0, np.nan, 50000.0, 45000.0, np.nan]
}

df2 = pd.DataFrame(data2)

# Task: Add 'Salary_Missing_Flag' (1 if missing else 0),
# then impute missing Salary with Department Median.
df2["Salary_Missing_Flag"] = df2["Salary"].isna().astype(int)
dept_medians = df2.groupby("Dept")["Salary"].transform("median")
df2["Cleaned_Salary"] = df2["Salary"].fillna(dept_medians)

print("\nProblem 2 Solution Output:")
print(df2[["EmpID", "Name", "Dept", "Salary_Missing_Flag", "Cleaned_Salary"]])
