"""
==============================================================================
Topic 18: Value Counts and Unique Values in Pandas
Script 01: Value Counts, Relative Frequencies & Imbalance Auditing
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

# Student demographic and evaluation records
data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu", "Aniket", "Priyanka"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Barrackpore", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore", np.nan, "Shyamnagar"],
    "Department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "CSE", "CSE", "Science"],
    "Grade": ["A", "A+", "B", "A", "B", "A+", "A", "A", "A", "A+"]
}

df = pd.DataFrame(data)
section("1. INITIAL DATASET")
print(df)

# --------------------------------------------------------------------------
# 1. Raw Frequency Counts with Series.value_counts()
# --------------------------------------------------------------------------
section("2. RAW FREQUENCY TALLIES (Series.value_counts())")
dept_counts = df["Department"].value_counts()
print("Students per Department:")
print(dept_counts)

# --------------------------------------------------------------------------
# 2. Normalized Proportions & Percentages (normalize=True)
# --------------------------------------------------------------------------
section("3. RELATIVE FREQUENCIES & PERCENTAGES (normalize=True)")
grade_proportions = df["Grade"].value_counts(normalize=True) * 100
print("Grade Distribution Percentage (%):")
print(grade_proportions.round(1))

# --------------------------------------------------------------------------
# 3. Auditing Missing Values in Distribution (dropna=False)
# --------------------------------------------------------------------------
section("4. AUDITING MISSING DATA (dropna=False)")
# By default, value_counts ignores NaNs. Setting dropna=False reveals missing counts!
loc_counts_with_na = df["Locality"].value_counts(dropna=False)
print("Locality Counts (Including NaN entries):")
print(loc_counts_with_na)
