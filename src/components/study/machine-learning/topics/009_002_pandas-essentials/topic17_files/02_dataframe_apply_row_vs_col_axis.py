"""
==============================================================================
Topic 17: Applying Functions with apply() in Pandas
Script 02: DataFrame.apply() Across Rows (axis=1) and Columns (axis=0)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Math": [85, 92, 65, 88, 78, 90, 84],
    "Science": [90, 95, 70, 85, 80, 92, 88],
    "English": [82, 89, 74, 91, 76, 88, 85]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. Row-Wise Computation with DataFrame.apply(axis=1)
# --------------------------------------------------------------------------
section("2. ROW-WISE COMPUTATION (axis=1 / axis='columns')")

# Complex logic involving multiple columns per row
def evaluate_student_profile(row):
    total = row["Math"] + row["Science"] + row["English"]
    pct = total / 3.0
    status = "Honors" if (pct >= 85 and row["Math"] >= 80) else "Standard"
    return f"{status} ({pct:.1f}%)"

df["Profile_Summary"] = df.apply(evaluate_student_profile, axis=1)
print(df[["Name", "Math", "Science", "English", "Profile_Summary"]])

# --------------------------------------------------------------------------
# 2. Column-Wise Computation with DataFrame.apply(axis=0)
# --------------------------------------------------------------------------
section("3. COLUMN-WISE COMPUTATION (axis=0 / axis='index')")
# Calculate Range (Max - Min) across each subject column
subject_cols = df[["Math", "Science", "English"]]
column_ranges = subject_cols.apply(lambda col: col.max() - col.min(), axis=0)
print("Score Spread (Max - Min) per subject column:")
print(column_ranges)

# --------------------------------------------------------------------------
# 3. Element-Wise DataFrame Transformation (DataFrame.map() in Pandas 2.1+)
# --------------------------------------------------------------------------
section("4. ELEMENT-WISE FORMATTING WITH DataFrame.map() (OR legacy applymap)")
formatted_scores = subject_cols.map(lambda val: f"{val}/100")
print("Scores with element-wise string suffix:")
print(formatted_scores.head(4))
