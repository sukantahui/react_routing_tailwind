"""
==============================================================================
Topic 17: Applying Functions with apply() in Pandas
Script 01: Series.apply() and Series.map()
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
    "Department": ["CSE", "CSE", "IT", "ECE", "IT", "CSE", "ECE"],
    "Math": [85, 92, 65, 88, 78, 90, 84]
}

df = pd.DataFrame(data)
section("1. INITIAL DATAFRAME")
print(df)

# --------------------------------------------------------------------------
# 1. Series.map(): Element-Wise Dictionary Substitution or Transformation
# --------------------------------------------------------------------------
section("2. Series.map(dict) - FAST CATEGORICAL MAPPING")
dept_lookup = {
    "CSE": "Computer Science & Engineering",
    "IT": "Information Technology",
    "ECE": "Electronics & Communication"
}

df["Dept_Full"] = df["Department"].map(dept_lookup)
print(df[["Name", "Department", "Dept_Full"]])

# --------------------------------------------------------------------------
# 2. Series.apply(): Custom Python Callables on Single Column
# --------------------------------------------------------------------------
section("3. Series.apply(function) - ARBITRARY BUSINESS LOGIC")

def grade_classifier(score):
    if score >= 90:
        return "Distinction (O)"
    elif score >= 80:
        return "First Class (E)"
    elif score >= 70:
        return "Second Class (A)"
    else:
        return "Pass (B)"

df["Grade_Category"] = df["Math"].apply(grade_classifier)
print(df[["Name", "Math", "Grade_Category"]])

# Passing extra keyword arguments to .apply()
def adjust_curved_score(score, bonus=5, max_cap=100):
    return min(score + bonus, max_cap)

df["Curved_Math"] = df["Math"].apply(adjust_curved_score, bonus=4, max_cap=100)
print("\nScores after applying curved bonus with args:")
print(df[["Name", "Math", "Curved_Math"]])
