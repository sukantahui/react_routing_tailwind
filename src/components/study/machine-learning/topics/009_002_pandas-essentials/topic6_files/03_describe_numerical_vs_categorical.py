"""
03_describe_numerical_vs_categorical.py
=======================================
Topic: Statistical Summaries with df.describe(): Numerical vs Categorical
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("STATISTICAL SUMMARY: df.describe() FOR NUMERICAL & CATEGORICAL")
    print("=" * 70)

    data = {
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
        "Locality": ["Barrackpore", "Shyamnagar", "Barrackpore", "Naihati", "Kolkata", "Barrackpore"],
        "Age": [22, 23, 21, 24, 25, 22],
        "Study_Hours": [12.5, 15.0, 8.0, 14.5, 10.0, 13.0],
        "Score": [88, 95, 72, 91, 80, 89]
    }
    df = pd.DataFrame(data)

    # 1. Default describe() -> Numerical Columns Only (5-number summary + mean/std/count)
    print("1. df.describe() [Numerical Features]:\n", df.describe())

    # 2. Categorical describe() -> include=['object']
    # Shows: count, unique, top (mode), freq (frequency of mode)
    print("\n2. df.describe(include=['object']) [Categorical Features]:\n", df.describe(include=["object"]))

    # 3. Comprehensive Summary: include='all'
    print("\n3. df.describe(include='all') [All Features Combined]:\n", df.describe(include="all"))

if __name__ == "__main__":
    main()
