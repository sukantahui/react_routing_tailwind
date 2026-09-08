"""
==============================================================================
Topic 13: Sorting Values and Index in Pandas
Script 03: Optimized Top-K / Bottom-K with nlargest() and nsmallest()
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
    "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore", "Titagarh"],
    "Math": [85, 92, 65, 88, 78, 90, 84],
    "Science": [90, 95, 70, 85, 80, 92, 88]
}

df = pd.DataFrame(data)
df["TotalMarks"] = df["Math"] + df["Science"]

section("1. COMPLETE STUDENT DATASET WITH TOTAL MARKS")
print(df)

# --------------------------------------------------------------------------
# 1. df.nlargest(): High-Performance Top-N (Heap-based O(N log K))
# --------------------------------------------------------------------------
section("2. df.nlargest(n=3, columns='TotalMarks') - TOP 3 PERFORMERS")
# Much faster than df.sort_values().head(3) on large datasets (10M+ rows)
top_3_total = df.nlargest(n=3, columns="TotalMarks")
print("Top 3 Students Overall:")
print(top_3_total[["StudentID", "Name", "TotalMarks", "Math", "Science"]])

# Multi-column tie-breaker with nlargest
top_3_tied = df.nlargest(n=3, columns=["Science", "Math"])
print("\nTop 3 by Science (with Math tie-breaker):")
print(top_3_tied[["Name", "Science", "Math"]])

# --------------------------------------------------------------------------
# 2. df.nsmallest(): High-Performance Bottom-N
# --------------------------------------------------------------------------
section("3. df.nsmallest(n=2, columns='Math') - STUDENTS NEEDING REMEDIAL SUPPORT")
remedial_math = df.nsmallest(n=2, columns="Math")
print("Bottom 2 Students in Math:")
print(remedial_math[["StudentID", "Name", "Locality", "Math"]])

# --------------------------------------------------------------------------
# 3. Series.nlargest() vs DataFrame.nlargest()
# --------------------------------------------------------------------------
section("4. SERIES-LEVEL nlargest()")
top_scores_series = df["TotalMarks"].nlargest(3)
print("Top 3 Scores Series (Values with original indices):")
print(top_scores_series)
