"""
==============================================================================
Topic 14: Grouping Data with groupby() in Pandas
Script 01: The Split-Apply-Combine Paradigm & Group Operations
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Student dataset with diverse localities and subjects
data = {
    "StudentID": [101, 102, 103, 104, 105, 106, 107, 108],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu"],
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh", "Barrackpore"],
    "Department": ["Computer Science", "Computer Science", "Commerce", "Science", "Commerce", "Computer Science", "Science", "Commerce"],
    "Math": [85, 92, 65, 88, 78, 90, 84, 80],
    "Science": [90, 95, 70, 85, 80, 92, 88, 82]
}

df = pd.DataFrame(data)
section("1. ORIGINAL DATASET")
print(df)

# --------------------------------------------------------------------------
# 1. Understanding the DataFrameGroupBy Object
# --------------------------------------------------------------------------
section("2. THE DataFrameGroupBy OBJECT (LAZY EVALUATION)")
grouped = df.groupby("Locality")
print("Grouped object representation:", grouped)
print(f"Total Unique Groups Identified: {grouped.ngroups}")
print("Group Keys & Row Indices Dictionary:")
for k, v in grouped.groups.items():
    print(f"  - {k:<15} -> Row indices: {v.tolist()}")

# --------------------------------------------------------------------------
# 2. Extracting a Specific Group with .get_group()
# --------------------------------------------------------------------------
section("3. EXTRACTING A SPECIFIC SUBSET WITH .get_group()")
barrackpore_group = grouped.get_group("Barrackpore")
print("All student records residing in 'Barrackpore':")
print(barrackpore_group[["StudentID", "Name", "Department", "Math", "Science"]])

# --------------------------------------------------------------------------
# 3. Iterating Over Groups in Python
# --------------------------------------------------------------------------
section("4. ITERATING OVER GROUPS (for locality, group_df in grouped)")
for loc_name, group_df in grouped:
    avg_math = group_df["Math"].mean()
    print(f"Locality: {loc_name:<15} | Students: {len(group_df)} | Mean Math: {avg_math:.1f}")

# --------------------------------------------------------------------------
# 4. Group Size vs Count
# --------------------------------------------------------------------------
section("5. GROUP SIZES (.size() VS .count())")
# .size() counts total rows per group (including NaNs)
# .count() counts valid non-null entries per column
print("Total records per Locality (.size()):")
print(grouped.size())
