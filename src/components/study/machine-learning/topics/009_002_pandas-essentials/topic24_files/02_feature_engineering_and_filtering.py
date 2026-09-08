"""
==============================================================================
Topic 24: Worked Example 5 - Filtering & Exporting Cleaned Data
Script 02: Vectorized Feature Engineering & Multi-Criteria Filtering
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

clean_data = {
    "student_id": [101, 102, 103, 104, 105, 106, 107, 108],
    "candidate_name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu"],
    "locality_town": ["Barrackpore", "Shyamnagar", "Not Specified", "Naihati", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore"],
    "department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "Commerce"],
    "math_score": [85.0, 92.0, 85.0, 88.0, 78.0, 90.0, 84.0, 80.0],
    "science_score": [90.0, 95.0, 70.0, 85.0, 80.0, 92.0, 88.0, 82.0],
    "attendance_pct": [92.5, 96.0, 78.5, 88.0, 82.0, 94.5, 89.0, 85.0]
}

df = pd.DataFrame(clean_data)

# --------------------------------------------------------------------------
# 1. Feature Engineering: Total Score, Percentage & Distinction Flag
# --------------------------------------------------------------------------
section("1. VECTORIZED FEATURE ENGINEERING")
df["total_score"] = df["math_score"] + df["science_score"]
df["percentage"] = (df["total_score"] / 2.0).round(1)
df["is_merit_scholar"] = np.where((df["percentage"] >= 88.0) & (df["attendance_pct"] >= 90.0), 1, 0)

print(df[["student_id", "candidate_name", "total_score", "percentage", "is_merit_scholar"]])

# --------------------------------------------------------------------------
# 2. Multi-Criteria Boolean Filtering for ML Eligibility
# --------------------------------------------------------------------------
section("2. FILTERING ELIGIBLE CANDIDATES (Percentage >= 80% & Attendance >= 80%)")
# Condition: Student must have Percentage >= 80 AND Attendance >= 80
filter_mask = (df["percentage"] >= 80.0) & (df["attendance_pct"] >= 80.0)
df_eligible = df[filter_mask].sort_values(by="percentage", ascending=False).reset_index(drop=True)

print(f"Total Eligible Candidates: {len(df_eligible)} of {len(df)}")
print(df_eligible[["student_id", "candidate_name", "department", "percentage", "is_merit_scholar"]])
