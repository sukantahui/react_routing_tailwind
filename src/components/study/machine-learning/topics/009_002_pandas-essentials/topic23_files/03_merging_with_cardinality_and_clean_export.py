"""
==============================================================================
Topic 23: Worked Example 4 - Merging Two DataFrames on a Key Column
Script 03: Cardinality Validation (validate='1:1') & Enriched Pipeline
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

admissions = pd.DataFrame({
    "RegNo": ["REG-101", "REG-102", "REG-103", "REG-104", "REG-105", "REG-106"],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
    "Course": ["Python ML", "Python ML", "Data Science", "Python ML", "Data Science", "Python ML"],
    "Batch_Code": ["BATCH-A", "BATCH-A", "BATCH-B", "BATCH-A", "BATCH-B", "BATCH-A"]
})

test_results = pd.DataFrame({
    "RegNo": ["REG-101", "REG-102", "REG-103", "REG-104", "REG-106"],
    "Score_Pct": [88.5, 94.0, 72.0, 89.5, 91.0],
    "Batch_Code": ["TEST-2026", "TEST-2026", "TEST-2026", "TEST-2026", "TEST-2026"]
})

# --------------------------------------------------------------------------
# 1. Merging with Cardinality Validation & Disambiguating Suffixes
# --------------------------------------------------------------------------
section("1. MERGING WITH validate='1:1' AND CUSTOM SUFFIXES")
merged_final = pd.merge(
    admissions,
    test_results,
    on="RegNo",
    how="left",
    validate="1:1",
    suffixes=("_admissions", "_exam")
)

# --------------------------------------------------------------------------
# 2. Deriving Final Qualification Status
# --------------------------------------------------------------------------
section("2. DERIVING FINAL ADMISSION STATUS")
merged_final["Final_Status"] = np.where(
    merged_final["Score_Pct"].isna(), "Assessment Pending (Absent)",
    np.where(merged_final["Score_Pct"] >= 80.0, "Direct Admission (Merit)", "Standard Admission")
)

print(merged_final[["RegNo", "Name", "Course", "Score_Pct", "Final_Status"]])
