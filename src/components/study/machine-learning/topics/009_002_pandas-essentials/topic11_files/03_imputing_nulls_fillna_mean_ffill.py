"""
==============================================================================
Topic 11: Handling Missing Values in Pandas
Script 03: Imputing Missing Values with fillna(), mean/median, and ffill/bfill
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
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality": ["Barrackpore", "Shyamnagar", np.nan, "Naihati", "Kolkata", "Barrackpore", np.nan],
    "Math": [85.0, 92.0, np.nan, 88.0, 78.0, np.nan, 84.0],
    "Science": [90.0, np.nan, 70.0, 85.0, 80.0, 92.0, 88.0],
    "Scholarship": [1200.0, 1500.0, np.nan, np.nan, 800.0, 1500.0, np.nan]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATAFRAME BEFORE IMPUTATION")
print(df)

# --------------------------------------------------------------------------
# 1. Imputing Categorical / Text Columns with a Constant
# --------------------------------------------------------------------------
section("2. CONSTANT IMPUTATION (df['Locality'].fillna('Unknown'))")
df["Locality"] = df["Locality"].fillna("Not Specified")
df["Scholarship"] = df["Scholarship"].fillna(0.0)
print(df[["StudentID", "Name", "Locality", "Scholarship"]])

# --------------------------------------------------------------------------
# 2. Statistical Imputation: Mean and Median
# --------------------------------------------------------------------------
section("3. STATISTICAL IMPUTATION (MEAN & MEDIAN)")
# Compute mean for Math and Science
math_mean = df["Math"].mean().round(1)
sci_median = df["Science"].median()

print(f"Calculated Math Mean: {math_mean}")
print(f"Calculated Science Median: {sci_median}")

df["Math"] = df["Math"].fillna(math_mean)
df["Science"] = df["Science"].fillna(sci_median)

print("\nDataFrame after mean/median imputation:")
print(df)

# --------------------------------------------------------------------------
# 3. Time-Series & Sequential Imputation: ffill() and bfill()
# --------------------------------------------------------------------------
section("4. FORWARD FILL (ffill) AND BACKWARD FILL (bfill)")
# Often used in sequential, stock, or sensor logs
sensor_data = pd.DataFrame({
    "Timestamp": ["09:00", "09:05", "09:10", "09:15", "09:20", "09:25"],
    "Temperature": [28.4, np.nan, np.nan, 29.1, np.nan, 30.2]
})
print("Original Sensor Readings:")
print(sensor_data)

# Forward fill: propagates last known value forward
ffilled = sensor_data.copy()
ffilled["Temperature"] = ffilled["Temperature"].ffill()
print("\nAfter .ffill() (Forward Fill):")
print(ffilled)

# --------------------------------------------------------------------------
# 4. Multi-Column Dictionary Imputation in One Call
# --------------------------------------------------------------------------
section("5. MULTI-COLUMN DICTIONARY fillna()")
raw_df = pd.DataFrame(data)
cleaned_all = raw_df.fillna({
    "Locality": "Barrackpore (Default)",
    "Math": raw_df["Math"].mean(),
    "Science": raw_df["Science"].median(),
    "Scholarship": 0.0
})
print("Cleaned DataFrame via dictionary fillna():")
print(cleaned_all)
