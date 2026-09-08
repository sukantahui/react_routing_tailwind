"""
==============================================================================
Topic 19: Exporting Data to CSV in Pandas
Script 02: Delimiters (sep), Character Encodings, and Missing Value Handling
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

data = {
    "StudentID": [101, 102, 103, 104],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"],
    "Comments": ["Good, consistent!", "Excellent: 95%+", np.nan, "Active participant"],
    "Scholarship_INR": [1200.0, 1500.0, np.nan, 800.0]
}

df = pd.DataFrame(data)
section("1. SOURCE DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. Custom Delimiters (TSV / Pipe Separated)
# --------------------------------------------------------------------------
section("2. CUSTOM DELIMITERS (sep='\\t' and sep='|')")
tsv_buf = io.StringIO()
df.to_csv(tsv_buf, sep="\t", index=False)
print("Tab-Separated (TSV) Output:")
print(tsv_buf.getvalue().strip())

pipe_buf = io.StringIO()
df.to_csv(pipe_buf, sep="|", index=False)
print("\nPipe-Separated (|) Output:")
print(pipe_buf.getvalue().strip())

# --------------------------------------------------------------------------
# 2. Explicit Missing Value Representation (na_rep='N/A')
# --------------------------------------------------------------------------
section("3. MISSING VALUE REPRESENTATION (na_rep='NULL' / na_rep='N/A')")
# By default, Pandas exports empty strings for NaNs (e.g. 103,Swadeep,,)
# na_rep replaces NaNs with explicit symbols:
na_buf = io.StringIO()
df.to_csv(na_buf, index=False, na_rep="NOT_AVAILABLE")
print(na_buf.getvalue().strip())

# --------------------------------------------------------------------------
# 3. Specifying Encoding (UTF-8 vs UTF-8-SIG for Excel)
# --------------------------------------------------------------------------
section("4. CHARACTER ENCODING (encoding='utf-8' VS 'utf-8-sig')")
# 'utf-8-sig' adds a Byte Order Mark (BOM) so Microsoft Excel opens UTF-8 files with non-ASCII characters properly
print("To export with UTF-8 BOM for Microsoft Excel compatibility:")
print("df.to_csv('students_excel.csv', index=False, encoding='utf-8-sig')")
