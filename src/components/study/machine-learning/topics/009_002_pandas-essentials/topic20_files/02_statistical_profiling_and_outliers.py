"""
==============================================================================
Topic 20: Worked Example 1 - Loading & Exploring a Student Dataset
Script 02: Statistical Profiling, Five-Number Summary & Outlier Check
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

student_records = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu", "Aniket", "Priyanka"],
    "Department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "Commerce", "CSE", "Science"],
    "Attendance_%": [92.5, 96.0, 78.5, 88.0, 82.0, 94.5, 89.0, 85.0, 91.0, 97.5],
    "Math": [85, 92, 65, 88, 78, 90, 84, 80, 86, 95],
    "Science": [90, 95, 70, 85, 80, 92, 88, 82, 89, 98]
}

df = pd.DataFrame(student_records)

# --------------------------------------------------------------------------
# 1. Five-Number Summary on Numerical Variables
# --------------------------------------------------------------------------
section("1. FIVE-NUMBER SUMMARY (df.describe())")
print(df[["Attendance_%", "Math", "Science"]].describe().round(2))

# --------------------------------------------------------------------------
# 2. Spread, IQR & Skewness Profiling
# --------------------------------------------------------------------------
section("2. DISPERSION & SKEWNESS")
for col in ["Math", "Science", "Attendance_%"]:
    q25 = df[col].quantile(0.25)
    q75 = df[col].quantile(0.75)
    iqr = q75 - q25
    skew = df[col].skew()
    print(f"[{col:<12}] Median: {df[col].median():<5.1f} | IQR: {iqr:<5.1f} | Skewness: {skew:+.2f}")

# --------------------------------------------------------------------------
# 3. Categorical Profiling with describe(include='object')
# --------------------------------------------------------------------------
section("3. CATEGORICAL FEATURE PROFILE (df.describe(include=['object']))")
print(df.describe(include=["object"]))
