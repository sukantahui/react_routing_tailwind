"""
==============================================================================
Topic 20: Worked Example 1 - Loading & Exploring a Student Dataset
Script 01: Dataset Ingestion, Structural Inspection & Type Verification
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

# Comprehensive Student Dataset from Coder & AccoTax, Barrackpore
student_records = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu", "Aniket", "Priyanka"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore", "Palta", "Shyamnagar"],
    "Department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "Commerce", "CSE", "Science"],
    "Attendance_%": [92.5, 96.0, 78.5, 88.0, 82.0, 94.5, 89.0, 85.0, 91.0, 97.5],
    "Math": [85, 92, 65, 88, 78, 90, 84, 80, 86, 95],
    "Science": [90, 95, 70, 85, 80, 92, 88, 82, 89, 98]
}

df = pd.DataFrame(student_records)
section("1. FIRST 5 ROWS (df.head())")
print(df.head())

# --------------------------------------------------------------------------
# 1. Structural Metadata & Memory Inspection
# --------------------------------------------------------------------------
section("2. STRUCTURAL SUMMARY (df.info())")
df.info()

section("3. SHAPE, DIMENSIONS & COLUMN TYPES")
print(f"Shape: {df.shape[0]} rows x {df.shape[1]} columns")
print(f"Total Elements (size): {df.size}")
print("\nData Types:")
print(df.dtypes)

# --------------------------------------------------------------------------
# 2. Missing Value & Cardinality Audit
# --------------------------------------------------------------------------
section("4. DATA QUALITY AUDIT (NULLS & CARDINALITY)")
quality_audit = pd.DataFrame({
    "Data_Type": df.dtypes,
    "Null_Count": df.isna().sum(),
    "Null_Pct (%)": (df.isna().mean() * 100).round(2),
    "Unique_Values": df.nunique()
})
print(quality_audit)
