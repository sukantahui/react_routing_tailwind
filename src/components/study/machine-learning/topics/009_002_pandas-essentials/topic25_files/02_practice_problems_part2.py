"""
==============================================================================
Topic 25: Practice Problems in Pandas
Script 02: Practice Problems 3 & 4 - Pivot Tables & Relational Integrity Audit
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# --------------------------------------------------------------------------
# PROBLEM 3: Regional Sales Pivot Table with Margin Totals
# --------------------------------------------------------------------------
section("PROBLEM 3: REGIONAL PIVOT TABLE WITH MARGINS")

sales = pd.DataFrame({
    "Region": ["Barrackpore", "Shyamnagar", "Barrackpore", "Ichapur", "Naihati", "Barrackpore"],
    "Product": ["Laptops", "Phones", "Phones", "Laptops", "Phones", "Laptops"],
    "Revenue": [250000, 180000, 225000, 200000, 210000, 360000]
})

# Task: Create a 2D Pivot matrix of Revenue with Region as rows, Product as columns,
# fill missing with 0, and include grand total margins.
pivot_sol = pd.pivot_table(
    sales,
    values="Revenue",
    index="Region",
    columns="Product",
    aggfunc="sum",
    fill_value=0,
    margins=True,
    margins_name="Total"
)

print("Problem 3 Pivot Table:")
print(pivot_sol)

# --------------------------------------------------------------------------
# PROBLEM 4: Relational Discrepancy Audit (Full Outer Join + indicator)
# --------------------------------------------------------------------------
section("PROBLEM 4: RELATIONAL DISCREPANCY AUDIT")

registered = pd.DataFrame({
    "CandidateID": ["C-101", "C-102", "C-103", "C-104"],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina"]
})

submitted = pd.DataFrame({
    "CandidateID": ["C-101", "C-102", "C-104", "C-105"],
    "Score": [88, 94, 90, 82]
})

# Task: Identify candidates who registered but didn't submit, and walk-ins who submitted without registering.
audit = pd.merge(registered, submitted, on="CandidateID", how="outer", indicator=True)
absentees = audit[audit["_merge"] == "left_only"][["CandidateID", "Name"]]
walkins = audit[audit["_merge"] == "right_only"][["CandidateID", "Score"]]

print("Problem 4 Audit Results:")
print("Enrolled Absentees (Missed Test):\n", absentees)
print("\nUnregistered Walk-in Candidates:\n", walkins)
