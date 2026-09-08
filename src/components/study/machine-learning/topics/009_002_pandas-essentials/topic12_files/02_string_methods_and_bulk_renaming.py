"""
==============================================================================
Topic 12: Renaming Columns in Pandas
Script 02: Bulk Renaming with String Methods (.str.lower, .str.replace, .str.strip)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Dirty real-world column names with leading whitespace, special characters, spaces, mixed casing
messy_data = {
    "  STUDENT ID  ": [101, 102, 103, 104, 105, 106, 107],
    "First & Last Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality / Town": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh"],
    "Math (Score / 100)": [85, 92, 65, 88, 78, 90, 84],
    "Science (Pct %)": [90, 95, 70, 85, 80, 92, 88]
}

df = pd.DataFrame(messy_data)
section("1. MESSY REAL-WORLD HEADERS (Spaces, Special Characters, Mixed Cases)")
print("Columns:", df.columns.tolist())

# --------------------------------------------------------------------------
# 1. Cleaning with .columns.str methods
# --------------------------------------------------------------------------
section("2. VECTORIZED STRING CLEANING ON df.columns.str")
# Step 1: Strip leading and trailing whitespace
df.columns = df.columns.str.strip()

# Step 2: Convert to lowercase
df.columns = df.columns.str.lower()

# Step 3: Replace spaces, slashes, and ampersands with clean snake_case underscores
df.columns = (
    df.columns
    .str.replace(" & ", "_and_")
    .str.replace(" / ", "_")
    .str.replace(" ", "_")
    .str.replace("(", "", regex=False)
    .str.replace(")", "", regex=False)
    .str.replace("%", "pct", regex=False)
)

print("Standardized snake_case column names:")
print(df.columns.tolist())
print("\nCleaned DataFrame:")
print(df.head())

# --------------------------------------------------------------------------
# 2. Applying Python string functions via df.rename(mapper=str.upper)
# --------------------------------------------------------------------------
section("3. PASSING STRING CALLABLES TO df.rename(columns=...)")
# Convert all column names to UPPERCASE using standard callable
df_upper = df.rename(columns=str.upper)
print("Upper-cased columns:", df_upper.columns.tolist())

# Convert to Title Case
df_title = df.rename(columns=lambda col: col.replace("_", " ").title())
print("Title Cased columns:", df_title.columns.tolist())
