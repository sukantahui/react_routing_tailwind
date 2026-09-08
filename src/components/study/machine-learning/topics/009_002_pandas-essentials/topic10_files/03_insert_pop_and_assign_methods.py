"""
==============================================================================
Topic 10: Adding and Dropping Columns in Pandas
Script 03: Positional Insertion, Popping, and Method Chaining with .assign()
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
    "StudentID": [101, 102, 103, 104, 105, 106, 107],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila"],
    "Math": [85, 92, 65, 88, 78, 90, 84],
    "Science": [90, 95, 70, 85, 80, 92, 88]
}

df = pd.DataFrame(data)
section("1. INITIAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. df.insert(): Inserting a column at a specific integer position
# --------------------------------------------------------------------------
section("2. df.insert(loc, column, value)")
# Standard assignment df['Col'] = ... always appends to the END.
# df.insert() allows placing a column anywhere (e.g. index position 1).
roll_series = [f"ROLL-2026-{i:03d}" for i in range(1, 8)]
df.insert(loc=1, column="RollNumber", value=roll_series)
print("DataFrame after df.insert at position index 1:")
print(df)

# --------------------------------------------------------------------------
# 2. df.pop(): Destructive extraction of a column as a Series
# --------------------------------------------------------------------------
section("3. df.pop(column_name)")
# pop() deletes the column from the DataFrame AND returns it as a Series
extracted_rolls = df.pop("RollNumber")
print("Extracted Series via pop():")
print(extracted_rolls)
print("\nDataFrame after pop (RollNumber removed):")
print(df.columns.tolist())

# --------------------------------------------------------------------------
# 3. df.assign(): Functional Method Chaining (Non-destructive)
# --------------------------------------------------------------------------
section("4. df.assign() FOR ELEGANT METHOD CHAINING")
# assign() allows creating multiple derived columns in one expression,
# utilizing lambdas to reference newly created columns in the same call!

df_enriched = (
    df.assign(
        Total=lambda x: x["Math"] + x["Science"],
        Percentage=lambda x: x["Total"] / 2.0,
        Passed=lambda x: x["Percentage"] >= 75.0
    )
    .sort_values(by="Percentage", ascending=False)
    .reset_index(drop=True)
)

print("Result of method chaining pipeline with .assign():")
print(df_enriched)
