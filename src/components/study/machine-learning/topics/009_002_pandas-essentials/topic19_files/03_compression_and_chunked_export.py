"""
==============================================================================
Topic 19: Exporting Data to CSV in Pandas
Script 03: On-the-Fly Compression (gzip, zip) & Header Configurations
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd
import io

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

data = {
    "StudentID": [101, 102, 103, 104],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
    "Score": [85, 92, 65, 88]
}

df = pd.DataFrame(data)

# --------------------------------------------------------------------------
# 1. On-The-Fly GZIP Compression (compression='gzip')
# --------------------------------------------------------------------------
section("1. AUTOMATIC COMPRESSION (.csv.gz / compression='gzip')")
# Pandas detects .gz extension or explicit compression argument
print("Exporting compressed archive:")
print("df.to_csv('cleaned_student_dataset.csv.gz', index=False, compression='gzip')")
print("df.to_csv('cleaned_student_dataset.zip', index=False, compression='zip')")

# --------------------------------------------------------------------------
# 2. Suppressing or Customizing Header (header=False / header=[...])
# --------------------------------------------------------------------------
section("2. SUPPRESSING HEADERS (header=False)")
no_header_buf = io.StringIO()
df.to_csv(no_header_buf, index=False, header=False)
print("Raw records without header line (useful for appending to existing files):")
print(no_header_buf.getvalue().strip())

# --------------------------------------------------------------------------
# 3. Appending to Existing CSV (mode='a', header=False)
# --------------------------------------------------------------------------
section("3. APPENDING ROWS TO AN EXISTING CSV (mode='a')")
print("To append new incoming batch records without rewriting the whole file:")
print("new_batch_df.to_csv('master_logs.csv', mode='a', index=False, header=False)")
