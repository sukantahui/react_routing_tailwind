"""
==============================================================================
Topic 26: Short Questions & Conceptual Mastery in Pandas
Script 02: GroupBy Aggregation, Transformation & Relational Joins
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
    "Dept": ["CSE", "CSE", "Commerce", "Science"],
    "Score": [85, 92, 65, 88]
}
df = pd.DataFrame(data)

# --------------------------------------------------------------------------
# Q4: agg() vs transform() vs filter()
# --------------------------------------------------------------------------
section("Q4: DIFFERENCE BETWEEN agg(), transform(), AND filter()")

# agg(): Collapses rows to 1 value per group
agg_res = df.groupby("Dept")["Score"].mean()
print("1. .agg('mean') [Reduces Shape]:\n", agg_res)

# transform(): Preserves original row count (broadcasts group metric)
df["Dept_Avg"] = df.groupby("Dept")["Score"].transform("mean")
print("\n2. .transform('mean') [Preserves Shape]:\n", df)

# filter(): Drops entire groups based on a condition
filtered = df.groupby("Dept").filter(lambda g: len(g) >= 2)
print("\n3. .filter(len(g) >= 2) [Prunes Groups]:\n", filtered)

# --------------------------------------------------------------------------
# Q5: merge() vs concat() vs join()
# --------------------------------------------------------------------------
section("Q5: WHEN TO USE merge() VS concat() VS join()")
print("- merge() : Relational database-style joins on arbitrary key columns (SQL-like).")
print("- concat(): Fast physical stacking of DataFrames along axis 0 (vertical) or axis 1 (horizontal).")
print("- join()  : Fast index-to-index or column-to-index joins using C index lookups.")
