"""
==============================================================================
Topic 26: Short Questions & Conceptual Mastery in Pandas
Script 01: Core Series, DataFrame & Indexing Mechanics
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

# --------------------------------------------------------------------------
# Q1: Series vs 1D NumPy Array
# --------------------------------------------------------------------------
section("Q1: WHAT IS THE KEY DIFFERENCE BETWEEN A SERIES AND A 1D NUMPY ARRAY?")
# A NumPy array is an indexed homogenous C buffer without named labels.
# A Pandas Series is a 1D labeled array with an explicit named Index and missing data support.
np_arr = np.array([85, 92, 78])
pd_ser = pd.Series([85, 92, 78], index=["Debangshu", "Susmita", "Sachin"], name="Math")
print("NumPy Array:", np_arr)
print("\nPandas Series with Named Index:\n", pd_ser)

# --------------------------------------------------------------------------
# Q2: loc[] vs iloc[]
# --------------------------------------------------------------------------
section("Q2: DIFFERENCE BETWEEN loc[] (LABEL-BASED) AND iloc[] (INTEGER-BASED)")
df = pd.DataFrame({
    "Score": [85, 92, 78]
}, index=["P-101", "P-102", "P-103"])

print("df.loc['P-102']  (Label Lookup)  :", df.loc["P-102", "Score"])
print("df.iloc[1]       (Position Lookup):", df.iloc[1, 0])

# --------------------------------------------------------------------------
# Q3: SettingWithCopyWarning
# --------------------------------------------------------------------------
section("Q3: WHY DOES SettingWithCopyWarning OCCUR AND HOW DO YOU PREVENT IT?")
# Cause: Modifying a slice/view without creating an explicit copy.
# Prevention: Always call .copy() on sliced DataFrames!
safe_subset = df[df["Score"] >= 80].copy()
safe_subset["Grade"] = "A"
print("Safe copy with no warning:\n", safe_subset)
