"""
==============================================================================
Topic 15: Aggregation Functions in Pandas
Script 03: Custom Functions & Quantile Aggregations
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
    "StudentID": [101, 102, 103, 104, 105, 106, 107, 108],
    "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu"],
    "Department": ["Computer Science", "Computer Science", "Commerce", "Science", "Commerce", "Computer Science", "Science", "Commerce"],
    "Math": [85, 92, 65, 88, 78, 90, 84, 80],
    "Science": [90, 95, 70, 85, 80, 92, 88, 82]
}

df = pd.DataFrame(data)

# --------------------------------------------------------------------------
# 1. Custom User-Defined Aggregation Function (Score Range = Max - Min)
# --------------------------------------------------------------------------
section("1. CUSTOM AGGREGATION FUNCTIONS")

def score_range(series):
    return series.max() - series.min()

def iqr_range(series):
    # Interquartile Range (75th percentile - 25th percentile)
    return series.quantile(0.75) - series.quantile(0.25)

custom_agg = df.groupby("Department").agg(
    Mean_Math=("Math", "mean"),
    Math_Spread=("Math", score_range),
    Math_IQR=("Math", iqr_range),
    Science_P90=("Science", lambda s: s.quantile(0.90))
).round(2)

print("Custom Aggregation Metrics by Department:")
print(custom_agg)
