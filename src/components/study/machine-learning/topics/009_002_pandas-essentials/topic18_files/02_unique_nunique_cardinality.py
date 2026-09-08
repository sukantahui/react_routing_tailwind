"""
==============================================================================
Topic 18: Value Counts and Unique Values in Pandas
Script 02: unique() Arrays, nunique() Cardinality & Feature Profiling
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

data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu", "Aniket", "Priyanka"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Barrackpore", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore", np.nan, "Shyamnagar"],
    "Department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "CSE", "CSE", "Science"],
    "Status": ["Enrolled", "Enrolled", "Enrolled", "Enrolled", "Enrolled", "Enrolled", "Enrolled", "Enrolled", "Enrolled", "Enrolled"]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. Series.unique(): Extracting Distinct Value Array
# --------------------------------------------------------------------------
section("2. Series.unique() - DISTINCT VALUES ARRAY")
unique_localities = df["Locality"].unique()
print("Unique Localities Array (including np.nan):")
print(unique_localities)
print("Type of returned object:", type(unique_localities))

# --------------------------------------------------------------------------
# 2. Series.nunique(): Counting Distinct Elements
# --------------------------------------------------------------------------
section("3. Series.nunique() - DISTINCT COUNT (EXCLUDES NaN BY DEFAULT)")
n_loc_valid = df["Locality"].nunique(dropna=True)
n_loc_all = df["Locality"].nunique(dropna=False)
print(f"Unique Localities (dropna=True)  : {n_loc_valid}")
print(f"Unique Localities (dropna=False) : {n_loc_all}")

# --------------------------------------------------------------------------
# 3. DataFrame.nunique(): High-Cardinality & Zero-Variance Feature Audit
# --------------------------------------------------------------------------
section("4. DataFrame.nunique() - PROFILING ML CARDINALITY ACROSS ALL COLUMNS")
cardinality = df.nunique()
print("Cardinality per Column:")
print(cardinality)

# Machine Learning check: Detecting zero-variance (constant) columns to drop
constant_cols = [col for col in df.columns if df[col].nunique() <= 1]
print(f"\n=> Zero-variance / Constant columns to drop: {constant_cols}")
