"""
==============================================================================
Topic 21: Worked Example 2 - Handling Missing Salary Values
Script 01: Profiling Missing Payroll Data & Cohort Null Rates
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

# Employee Payroll Dataset from Coder & AccoTax clients in Barrackpore industrial belt
payroll_data = {
    "EmpID": [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Aniket", "Priyanka", "Sourav"],
    "Department": ["Engineering", "Engineering", "Sales", "HR", "Sales", "Engineering", "HR", "Engineering", "Sales", "HR"],
    "Experience_Yrs": [2, 5, 1, 4, 3, 6, 2, 8, 4, 1],
    "Base_Salary": [55000.0, 85000.0, np.nan, 52000.0, 48000.0, 92000.0, np.nan, 120000.0, np.nan, 42000.0],
    "Bonus_Pct": [10.0, 15.0, 8.0, 5.0, 12.0, 15.0, 5.0, 20.0, 10.0, 5.0]
}

df = pd.DataFrame(payroll_data)
section("1. RAW PAYROLL RECORDS (NOTICE NaN IN BASE_SALARY)")
print(df)

# --------------------------------------------------------------------------
# 1. Null Count & Percentage Audit
# --------------------------------------------------------------------------
section("2. OVERALL NULL AUDIT")
null_counts = df.isna().sum()
null_pct = (df.isna().mean() * 100).round(1)
print(pd.DataFrame({"Missing_Count": null_counts, "Missing_Pct(%)": null_pct}))

# --------------------------------------------------------------------------
# 2. Missing Salary Rates by Department
# --------------------------------------------------------------------------
section("3. MISSING SALARY RATES PER DEPARTMENT")
dept_null_rates = df.groupby("Department")["Base_Salary"].apply(lambda s: s.isna().mean() * 100).round(1)
print("Department-wise Missing Salary Percentage (%):")
print(dept_null_rates)

# --------------------------------------------------------------------------
# 3. Isolating Affected Records
# --------------------------------------------------------------------------
section("4. AFFECTED EMPLOYEES WITH MISSING SALARIES")
missing_records = df[df["Base_Salary"].isna()]
print(missing_records[["EmpID", "Name", "Department", "Experience_Yrs", "Bonus_Pct"]])
