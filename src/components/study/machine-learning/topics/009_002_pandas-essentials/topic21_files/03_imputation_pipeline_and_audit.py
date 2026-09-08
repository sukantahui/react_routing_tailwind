"""
==============================================================================
Topic 21: Worked Example 2 - Handling Missing Salary Values
Script 03: Complete ML Preprocessing Pipeline with Missing Indicator Flag
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

payroll_data = {
    "EmpID": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Aniket", "Priyanka", "Sourav"],
    "Department": ["Engineering", "Engineering", "Sales", "HR", "Sales", "Engineering", "HR", "Engineering", "Sales", "HR"],
    "Experience_Yrs": [2, 5, 1, 4, 3, 6, 2, 8, 4, 1],
    "Base_Salary": [55000.0, 85000.0, np.nan, 52000.0, 48000.0, 92000.0, np.nan, 120000.0, np.nan, 42000.0],
    "Bonus_Pct": [10.0, 15.0, 8.0, 5.0, 12.0, 15.0, 5.0, 20.0, 10.0, 5.0]
}

df = pd.DataFrame(payroll_data)

# --------------------------------------------------------------------------
# 1. Adding Missing Indicator Feature (Crucial for Machine Learning!)
# --------------------------------------------------------------------------
section("1. ADDING 'Salary_Was_Missing' BOOLEAN INDICATOR")
# Preserves the statistical signal that data was missing prior to imputation
df["Salary_Was_Missing"] = df["Base_Salary"].isna().astype(int)

# --------------------------------------------------------------------------
# 2. Executing Department-Specific Group Median Imputation
# --------------------------------------------------------------------------
section("2. PERFORMING GROUP-MEDIAN IMPUTATION")
dept_salary_medians = df.groupby("Department")["Base_Salary"].transform("median")
df["Cleaned_Salary"] = df["Base_Salary"].fillna(dept_salary_medians)

# --------------------------------------------------------------------------
# 3. Deriving Annual Total Compensation Feature
# --------------------------------------------------------------------------
section("3. DERIVING TOTAL ANNUAL COMPENSATION")
df["Total_Compensation"] = df["Cleaned_Salary"] * (1 + df["Bonus_Pct"] / 100.0)

print(df[["EmpID", "Name", "Department", "Cleaned_Salary", "Salary_Was_Missing", "Total_Compensation"]])

# --------------------------------------------------------------------------
# 4. Final Quality Verification
# --------------------------------------------------------------------------
section("4. FINAL VERIFICATION (ZERO REMAINING NULLS)")
print(f"Remaining nulls in Cleaned_Salary: {df['Cleaned_Salary'].isna().sum()}")
