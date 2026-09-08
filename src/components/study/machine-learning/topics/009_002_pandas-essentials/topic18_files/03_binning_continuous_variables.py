"""
==============================================================================
Topic 18: Value Counts and Unique Values in Pandas
Script 03: Binning Continuous Variables with value_counts(bins=k) & pd.cut()
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Student scores on an ML entrance test (0 - 100)
scores_data = {
    "StudentID": list(range(101, 113)),
    "Score": [45, 52, 58, 62, 68, 71, 74, 82, 85, 89, 94, 98]
}

df = pd.DataFrame(scores_data)
section("1. CONTINUOUS NUMERICAL DATA")
print(df)

# --------------------------------------------------------------------------
# 1. Automatic Equal-Width Binning with Series.value_counts(bins=k)
# --------------------------------------------------------------------------
section("2. AUTOMATIC HISTOGRAM BINNING WITH value_counts(bins=4)")
binned_counts = df["Score"].value_counts(bins=4, sort=False)
print("Score Distribution Across 4 Equal-Width Interval Bins:")
print(binned_counts)

# --------------------------------------------------------------------------
# 2. Custom Binning with pd.cut() for Domain-Specific Categorization
# --------------------------------------------------------------------------
section("3. CUSTOM INTERVAL BINNING WITH pd.cut()")
bin_edges = [0, 50, 70, 85, 100]
bin_labels = ["Needs Improvement", "Average", "Proficient", "Mastery"]

df["Performance_Tier"] = pd.cut(df["Score"], bins=bin_edges, labels=bin_labels, right=True)

print("Categorized Student Dataset:")
print(df[["StudentID", "Score", "Performance_Tier"]])

print("\nFrequency Distribution of Performance Tiers:")
print(df["Performance_Tier"].value_counts())
