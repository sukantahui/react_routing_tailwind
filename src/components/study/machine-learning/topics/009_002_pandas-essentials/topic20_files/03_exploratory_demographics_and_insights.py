"""
==============================================================================
Topic 20: Worked Example 1 - Loading & Exploring a Student Dataset
Script 03: Demographics, Cross-Tabulations & Key Analytical Takeaways
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
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore", "Palta", "Shyamnagar"],
    "Department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "Commerce", "CSE", "Science"],
    "Attendance_%": [92.5, 96.0, 78.5, 88.0, 82.0, 94.5, 89.0, 85.0, 91.0, 97.5],
    "Math": [85, 92, 65, 88, 78, 90, 84, 80, 86, 95],
    "Science": [90, 95, 70, 85, 80, 92, 88, 82, 89, 98]
}

df = pd.DataFrame(student_records)
df["TotalMarks"] = df["Math"] + df["Science"]

# --------------------------------------------------------------------------
# 1. Cross-Tabulation: Locality vs Department
# --------------------------------------------------------------------------
section("1. CROSS-TABULATION (pd.crosstab(Locality, Department))")
ct = pd.crosstab(df["Locality"], df["Department"], margins=True)
print(ct)

# --------------------------------------------------------------------------
# 2. Top-Performing Students by Department
# --------------------------------------------------------------------------
section("2. TOP PERFORMERS BY DEPARTMENT")
top_per_dept = df.sort_values(by=["Department", "TotalMarks"], ascending=[True, False]).groupby("Department").head(1)
print(top_per_dept[["Department", "Name", "Locality", "Math", "Science", "TotalMarks"]])

# --------------------------------------------------------------------------
# 3. Correlation Matrix Between Attendance and Exam Scores
# --------------------------------------------------------------------------
section("3. PEARSON CORRELATION MATRIX (df.corr())")
corr = df[["Attendance_%", "Math", "Science", "TotalMarks"]].corr().round(3)
print(corr)
