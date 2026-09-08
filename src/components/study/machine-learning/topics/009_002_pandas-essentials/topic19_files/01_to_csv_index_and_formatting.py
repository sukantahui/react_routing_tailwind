"""
==============================================================================
Topic 19: Exporting Data to CSV in Pandas
Script 01: Exporting with to_csv(index=False) & Column Selection
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
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Locality": ["Barrackpore", "Shyamnagar", np.nan, "Naihati", "Kolkata", "Barrackpore", "Titagarh"],
    "Math": [85.556, 92.125, 65.000, 88.750, 78.200, 90.450, 84.800],
    "Science": [90.0, 95.5, 70.25, 85.0, 80.5, 92.0, 88.5]
}

df = pd.DataFrame(data)
section("1. SOURCE DATAFRAME TO EXPORT")
print(df)

# --------------------------------------------------------------------------
# 1. The Critical Rule: index=False (Prevents Unnamed: 0 Bug)
# --------------------------------------------------------------------------
section("2. df.to_csv(index=False) - THE GOLD STANDARD")
# In-memory buffer simulation of CSV output
buffer_with_index = io.StringIO()
df.to_csv(buffer_with_index, index=True)
print("[BAD: index=True] Notice unwanted leading comma and row index 0,1,2...:")
print("\n".join(buffer_with_index.getvalue().splitlines()[:4]))

buffer_clean = io.StringIO()
df.to_csv(buffer_clean, index=False)
print("\n[GOOD: index=False] Clean standard CSV output:")
print("\n".join(buffer_clean.getvalue().splitlines()[:4]))

# --------------------------------------------------------------------------
# 2. Selecting Specific Columns to Export (columns=[...])
# --------------------------------------------------------------------------
section("3. SELECTIVE EXPORT (columns=['StudentID', 'Name', 'Math'])")
buffer_subset = io.StringIO()
df.to_csv(buffer_subset, columns=["StudentID", "Name", "Math"], index=False)
print(buffer_subset.getvalue().strip())

# --------------------------------------------------------------------------
# 3. Formatting Floating-Point Precision (float_format='%.2f')
# --------------------------------------------------------------------------
section("4. PRECISION FORMATTING (float_format='%.2f')")
buffer_formatted = io.StringIO()
df.to_csv(buffer_formatted, index=False, float_format="%.2f")
print(buffer_formatted.getvalue().strip())
