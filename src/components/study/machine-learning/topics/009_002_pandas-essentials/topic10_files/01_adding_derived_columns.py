"""
==============================================================================
Topic 10: Adding and Dropping Columns in Pandas
Script 01: Adding New & Derived Columns
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

# Initial student dataset
data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh"],
    "Math": [85, 92, 65, 88, 78, 90, 84],
    "Science": [90, 95, 70, 85, 80, 92, 88]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. Adding a constant / scalar column
# --------------------------------------------------------------------------
section("2. ADDING A CONSTANT / SCALAR COLUMN")
df["Institute"] = "Coder & AccoTax"
df["Batch"] = "2026-ML"
print(df[["Name", "Locality", "Institute", "Batch"]].head())

# --------------------------------------------------------------------------
# 2. Creating Derived Calculated Columns (Vectorized Arithmetic)
# --------------------------------------------------------------------------
section("3. VECTORIZED ARITHMETIC COLUMN CREATION")
# Adding Total Score & Average Percentage
df["TotalMarks"] = df["Math"] + df["Science"]
df["Average"] = df["TotalMarks"] / 2.0
df["IsDistinction"] = df["Average"] >= 90.0

print(df[["Name", "Math", "Science", "TotalMarks", "Average", "IsDistinction"]])

# --------------------------------------------------------------------------
# 3. Conditional Column Creation with numpy.where()
# --------------------------------------------------------------------------
section("4. CONDITIONAL COLUMN CREATION (np.where)")
# Condition: If Average >= 85 -> 'Grade A', elif >= 75 -> 'Grade B', else 'Grade C'
df["Grade"] = np.where(
    df["Average"] >= 90, "A+",
    np.where(df["Average"] >= 80, "A",
    np.where(df["Average"] >= 70, "B", "C"))
)

print(df[["Name", "TotalMarks", "Average", "Grade"]])
