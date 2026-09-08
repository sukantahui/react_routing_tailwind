"""
==============================================================================
Topic 16: Merging and Joining DataFrames in Pandas
Script 02: Mismatched Key Names (left_on/right_on) & Suffix Handling
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Left table with key named 'user_code'
user_profiles = pd.DataFrame({
    "user_code": [101, 102, 103, 104],
    "name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
    "batch": ["ML-2026", "ML-2026", "ML-2026", "ML-2026"]
})

# Right table with key named 'roll_number' and overlapping column 'batch'
midterm_results = pd.DataFrame({
    "roll_number": [101, 102, 103, 104],
    "math_score": [85, 92, 65, 88],
    "batch": ["Batch-A", "Batch-A", "Batch-B", "Batch-B"]
})

section("1. SOURCE TABLES WITH MISMATCHED KEYS & OVERLAPPING COLUMNS")
print("User Profiles:")
print(user_profiles)
print("\nMidterm Results:")
print(midterm_results)

# --------------------------------------------------------------------------
# 1. Merging on Differently-Named Key Columns (left_on, right_on)
# --------------------------------------------------------------------------
section("2. MERGING WITH left_on='user_code' AND right_on='roll_number'")
merged_mismatched = pd.merge(
    user_profiles,
    midterm_results,
    left_on="user_code",
    right_on="roll_number",
    how="inner",
    suffixes=("_profile", "_exam")
)

print(merged_mismatched)

# Dropping duplicate key column post-merge
clean_merged = merged_mismatched.drop(columns=["roll_number"])
print("\nCleaned post-merge table:")
print(clean_merged)

# --------------------------------------------------------------------------
# 2. Merging on Index (left_index / right_index)
# --------------------------------------------------------------------------
section("3. MERGING ON INDEX (left_on='user_code', right_index=True)")
midterm_indexed = midterm_results.set_index("roll_number")
merged_by_index = pd.merge(
    user_profiles,
    midterm_indexed,
    left_on="user_code",
    right_index=True,
    suffixes=("_profile", "_exam")
)
print("Merged via right_index=True:")
print(merged_by_index)
