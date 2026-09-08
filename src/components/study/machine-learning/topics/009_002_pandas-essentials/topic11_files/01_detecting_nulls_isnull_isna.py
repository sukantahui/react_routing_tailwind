"""
==============================================================================
Topic 11: Handling Missing Values in Pandas
Script 01: Detecting & Profiling Missing Values (isna, isnull, notna)
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

# Student dataset with realistic missing values (NaN / None)
data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality": ["Barrackpore", "Shyamnagar", np.nan, "Naihati", "Kolkata", "Barrackpore", np.nan],
    "Math": [85.0, 92.0, np.nan, 88.0, 78.0, np.nan, 84.0],
    "Science": [90.0, np.nan, 70.0, 85.0, 80.0, 92.0, 88.0],
    "Scholarship": [1200.0, 1500.0, np.nan, np.nan, 800.0, 1500.0, np.nan]
}

df = pd.DataFrame(data)
section("1. RAW DATAFRAME WITH MISSING VALUES (NaN)")
print(df)

# --------------------------------------------------------------------------
# 1. isna() vs isnull() - What is the difference?
# --------------------------------------------------------------------------
section("2. isna() VS isnull() (THEY ARE IDENTICAL ALIASES)")
# In Pandas, isna() and isnull() are exact aliases of each other.
print("df.isna().equals(df.isnull()) ->", df.isna().equals(df.isnull()))
print("\nBoolean Mask (df.isna()):")
print(df.isna())

# --------------------------------------------------------------------------
# 2. Counting Missing Values Per Column
# --------------------------------------------------------------------------
section("3. MISSING VALUE COUNT & PERCENTAGE BREAKDOWN")
null_counts = df.isna().sum()
null_percentages = (df.isna().mean() * 100).round(2)

missing_summary = pd.DataFrame({
    "MissingCount": null_counts,
    "MissingPercentage (%)": null_percentages
})
print(missing_summary)

# --------------------------------------------------------------------------
# 3. Filtering Rows with Missing Values
# --------------------------------------------------------------------------
section("4. FILTERING ROWS CONTAINING MISSING VALUES")
# Rows where Math score is missing
missing_math = df[df["Math"].isna()]
print("Students with missing Math score:")
print(missing_math[["StudentID", "Name", "Math"]])

# Rows where ANY column contains a missing value (any(axis=1))
rows_with_any_null = df[df.isna().any(axis=1)]
print(f"\nTotal rows with at least one missing field: {len(rows_with_any_null)} of {len(df)}")
print(rows_with_any_null[["StudentID", "Name", "Locality", "Math", "Science"]])
