"""
02_isin_between_and_string_filters.py
=====================================
Topic: Advanced Boolean Convenience Methods: .isin(), .between(), and .str
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("BOOLEAN CONVENIENCE METHODS: .isin(), .between() & .str MATCHING")
    print("=" * 70)

    df = pd.DataFrame({
        "StudentID": [101, 102, 103, 104, 105, 106],
        "Name": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima"],
        "Locality": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Kolkata", "Barrackpore"],
        "Score": [88, 95, 72, 91, 80, 89]
    })

    print("Master DataFrame:\n", df)

    # 1. Membership Filtering: .isin([list])
    # Much cleaner than writing (Locality == 'A') | (Locality == 'B')
    target_cities = ["Barrackpore", "Shyamnagar"]
    isin_df = df[df["Locality"].isin(target_cities)]
    print("\n1. Membership Filter: df[df['Locality'].isin(['Barrackpore', 'Shyamnagar'])]:\n", isin_df)

    # 2. Numerical Interval Filtering: .between(low, high) [Inclusive by default]
    # Filter students with scores between 80 and 90
    between_df = df[df["Score"].between(80, 90)]
    print("\n2. Interval Filter: df[df['Score'].between(80, 90)]:\n", between_df)

    # 3. String Pattern Matching: .str.startswith(), .str.contains()
    # Students whose name starts with 'S'
    s_names = df[df["Name"].str.startswith("S")]
    print("\n3. String Filter: df[df['Name'].str.startswith('S')]:\n", s_names)

if __name__ == "__main__":
    main()
