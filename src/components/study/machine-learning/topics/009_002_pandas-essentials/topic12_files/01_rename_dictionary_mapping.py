"""
==============================================================================
Topic 12: Renaming Columns in Pandas
Script 01: Dictionary Mapping with df.rename(columns={...})
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Raw dataset with inconsistent / verbose column headers
raw_data = {
    "stud_id": [101, 102, 103, 104, 105, 106, 107],
    "full_name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "loc_residence": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh"],
    "m_score_2026": [85, 92, 65, 88, 78, 90, 84],
    "sci_eval_pct": [90, 95, 70, 85, 80, 92, 88]
}

df = pd.DataFrame(raw_data)
section("1. ORIGINAL DATAFRAME WITH UNFRIENDLY COLUMN HEADERS")
print(df)
print("\nOriginal Column Names:", df.columns.tolist())

# --------------------------------------------------------------------------
# 1. Renaming specific columns via columns parameter dictionary
# --------------------------------------------------------------------------
section("2. RENAMING TARGETED COLUMNS VIA df.rename(columns={...})")
# df.rename is selective: unmentioned columns remain untouched!
df_renamed = df.rename(columns={
    "stud_id": "StudentID",
    "full_name": "StudentName",
    "m_score_2026": "MathScore",
    "sci_eval_pct": "ScienceScore"
})

print(df_renamed)
print("\nRenamed Column Names:", df_renamed.columns.tolist())

# --------------------------------------------------------------------------
# 2. Renaming Index Labels (Row Index)
# --------------------------------------------------------------------------
section("3. RENAMING ROW INDEX LABELS (index={...})")
df_indexed = df_renamed.set_index("StudentID")
# Rename specific index entries
df_indexed_custom = df_indexed.rename(index={101: "101-BATCH-A", 102: "102-BATCH-A"})
print(df_indexed_custom.head(4))

# --------------------------------------------------------------------------
# 3. Handling Non-Existent Column Names (errors parameter)
# --------------------------------------------------------------------------
section("4. SAFETY WITH errors='ignore' VS errors='raise'")
# By default, df.rename ignores keys that don't exist in the DataFrame
df_safe = df.rename(columns={"non_existent_col": "SomethingElse"}, errors="ignore")
print("Successfully ignored missing dictionary key without raising an error.")
