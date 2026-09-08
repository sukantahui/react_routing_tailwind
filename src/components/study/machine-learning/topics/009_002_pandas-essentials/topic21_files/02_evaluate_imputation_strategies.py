"""
==============================================================================
Topic 21: Worked Example 2 - Handling Missing Salary Values
Script 02: Evaluating Imputation: Global Mean vs Median vs Group Median
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
    "Base_Salary": [55000.0, 85000.0, np.nan, 52000.0, 48000.0, 92000.0, np.nan, 120000.0, np.nan, 42000.0]
}

df = pd.DataFrame(payroll_data)

# --------------------------------------------------------------------------
# Strategy 1: Global Mean (Distorted by High Engineering Salaries)
# --------------------------------------------------------------------------
global_mean = df["Base_Salary"].mean()
df_mean = df.copy()
df_mean["Salary_GlobalMean"] = df_mean["Base_Salary"].fillna(global_mean)

# --------------------------------------------------------------------------
# Strategy 2: Global Median (Resistant to Extreme Outliers)
# --------------------------------------------------------------------------
global_median = df["Base_Salary"].median()
df_median = df.copy()
df_median["Salary_GlobalMedian"] = df_median["Base_Salary"].fillna(global_median)

# --------------------------------------------------------------------------
# Strategy 3: Department-Specific Group Median (Best Practice)
# --------------------------------------------------------------------------
df_dept = df.copy()
dept_medians = df_dept.groupby("Department")["Base_Salary"].transform("median")
df_dept["Salary_DeptMedian"] = df_dept["Base_Salary"].fillna(dept_medians)

# Compare the three strategies on the missing records (Swadeep, Abhronila, Priyanka)
section("STRATEGY COMPARISON ON MISSING EMPLOYEES")
comparison = pd.DataFrame({
    "Name": df["Name"],
    "Dept": df["Department"],
    "Raw_Salary": df["Base_Salary"],
    "Global_Mean (₹70.5k)": df_mean["Salary_GlobalMean"].round(0),
    "Global_Median (₹55k)": df_median["Salary_GlobalMedian"],
    "Dept_Median (Targeted)": df_dept["Salary_DeptMedian"]
})

print(comparison[comparison["Raw_Salary"].isna()])
print("\n=> Notice how Dept_Median accurately assigns ~₹48,000 to Sales (Swadeep/Priyanka) and ₹47,000 to HR (Abhronila), avoiding unfair inflation by Engineering salaries!")
