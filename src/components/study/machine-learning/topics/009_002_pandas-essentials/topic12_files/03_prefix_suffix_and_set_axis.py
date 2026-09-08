"""
==============================================================================
Topic 12: Renaming Columns in Pandas
Script 03: add_prefix(), add_suffix(), and set_axis()
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

data = {
    "Score": [85, 92, 65, 88, 78, 90, 84],
    "Rank": [3, 1, 7, 2, 6, 4, 5],
    "Attendance": [95, 98, 80, 92, 85, 94, 90]
}

df = pd.DataFrame(data, index=["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"])
section("1. ORIGINAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. add_prefix(): Ideal for table joins and namespacing features
# --------------------------------------------------------------------------
section("2. df.add_prefix('Term1_')")
df_term1 = df.add_prefix("Term1_")
print(df_term1)

# --------------------------------------------------------------------------
# 2. add_suffix(): Adding dimension / unit annotations
# --------------------------------------------------------------------------
section("3. df.add_suffix('_pct')")
df_annotated = df.add_suffix("_pct")
print(df_annotated)

# --------------------------------------------------------------------------
# 3. set_axis(): Method chaining replacement of full column or index names
# --------------------------------------------------------------------------
section("4. df.set_axis([...], axis=1) (METHOD-CHAINING COMPLIANT)")
# Overriding all column names inside a pipeline
df_standardized = (
    df
    .set_axis(["Marks_Final", "Position", "Attendance_Rate"], axis=1)
    .sort_values(by="Marks_Final", ascending=False)
)

print(df_standardized)
