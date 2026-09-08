"""
==============================================================================
Topic 24: Worked Example 5 - Filtering & Exporting Cleaned Data
Script 01: Raw Ingestion, Header Standardization & Data Cleaning
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

# Raw Messy Input Data (Inconsistent headers, whitespace, missing values)
raw_input = {
    "  STUDENT ID  ": [101, 102, 103, 104, 105, 106, 107, 108],
    "Candidate Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu"],
    "Locality / Town": ["Barrackpore", "Shyamnagar", np.nan, "Naihati", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore"],
    "Department ": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "Commerce"],
    "Math (Score/100)": [85.0, 92.0, np.nan, 88.0, 78.0, 90.0, 84.0, 80.0],
    "Science (Score/100)": [90.0, 95.0, 70.0, 85.0, 80.0, 92.0, 88.0, 82.0],
    "Attendance Rate (%)": [92.5, 96.0, 78.5, 88.0, 82.0, 94.5, 89.0, 85.0]
}

df = pd.DataFrame(raw_input)
section("1. RAW DIRTY DATAFRAME")
print(df)
print("\nRaw Columns:", df.columns.tolist())

# --------------------------------------------------------------------------
# 1. Standardizing Column Headers to snake_case
# --------------------------------------------------------------------------
section("2. STANDARDIZING HEADERS TO snake_case")
df.columns = (
    df.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
    .str.replace("/", "_")
    .str.replace("(", "", regex=False)
    .str.replace(")", "", regex=False)
    .str.replace("%", "pct", regex=False)
)

print("Clean Standardized Columns:")
print(df.columns.tolist())

# --------------------------------------------------------------------------
# 2. Imputing Missing Values Cleanly
# --------------------------------------------------------------------------
section("3. MISSING VALUE IMPUTATION")
df["locality_town"] = df["locality_town"].fillna("Not Specified")
df["math_score_100"] = df["math_score_100"].fillna(df["math_score_100"].median())

print(df.head())
