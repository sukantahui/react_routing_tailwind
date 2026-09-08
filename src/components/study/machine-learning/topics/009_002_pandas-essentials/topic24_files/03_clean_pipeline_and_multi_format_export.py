"""
==============================================================================
Topic 24: Worked Example 5 - Filtering & Exporting Cleaned Data
Script 03: Complete Production Pipeline & Multi-Format Data Export
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd
import numpy as np
import io

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Raw Dirty Input Data
raw_input = {
    "STUDENT ID": [101, 102, 103, 104, 105, 106, 107, 108],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu"],
    "Department": ["CSE", "CSE", "Commerce", "Science", "Commerce", "CSE", "Science", "Commerce"],
    "Math": [85.0, 92.0, np.nan, 88.0, 78.0, 90.0, 84.0, 80.0],
    "Science": [90.0, 95.0, 70.0, 85.0, 80.0, 92.0, 88.0, 82.0],
    "Attendance": [92.5, 96.0, 78.5, 88.0, 82.0, 94.5, 89.0, 85.0]
}

# --------------------------------------------------------------------------
# 1. Complete Fluent Data Pipeline Function
# --------------------------------------------------------------------------
section("1. EXECUTING FULL DATA PREPARATION PIPELINE")

def clean_and_prepare_dataset(data_dict):
    df = pd.DataFrame(data_dict)
    
    # 1. Standardize columns
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
    
    # 2. Impute missing math scores with median
    df["math"] = df["math"].fillna(df["math"].median())
    
    # 3. Engineer features with .assign()
    df = df.assign(
        total_score=lambda x: x["math"] + x["science"],
        percentage=lambda x: (x["total_score"] / 2.0).round(1),
        is_merit=lambda x: np.where((x["percentage"] >= 88.0) & (x["attendance"] >= 90.0), 1, 0)
    )
    
    # 4. Filter high-performing cohort (percentage >= 80 and attendance >= 80)
    df_clean = (
        df.query("percentage >= 80.0 and attendance >= 80.0")
        .sort_values(by="percentage", ascending=False)
        .reset_index(drop=True)
    )
    
    return df_clean

cleaned_df = clean_and_prepare_dataset(raw_input)
print("Clean Pipeline Output DataFrame:")
print(cleaned_df)

# --------------------------------------------------------------------------
# 2. Exporting to Standard CSV & Compressed GZIP Formats
# --------------------------------------------------------------------------
section("2. MULTI-FORMAT EXPORT COMMANDS")
print("Standard CSV (ML Training Ready):")
print("cleaned_df.to_csv('cleaned_student_features.csv', index=False, encoding='utf-8')")

print("\nGZIP Compressed CSV (Archival & Cloud Storage):")
print("cleaned_df.to_csv('cleaned_student_features.csv.gz', index=False, compression='gzip')")

# Previewing live in-memory CSV string
csv_preview = io.StringIO()
cleaned_df.to_csv(csv_preview, index=False)
print("\nGenerated CSV File Contents Preview:")
print(csv_preview.getvalue().strip())
