"""
02_list_of_dicts_record_format.py
=================================
Topic: Creating DataFrames from List of Dictionaries (JSON / MongoDB Record Format)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("CREATING DATAFRAMES FROM LIST OF DICTIONARIES (RECORDS)")
    print("=" * 70)

    # In modern REST APIs and NoSQL databases (MongoDB), data arrives as a list of JSON records.
    # Notice: Sachin is missing 'Grade', and Swadeep has an extra key 'Scholarship'.
    records = [
        {"Name": "Debangshu", "Score": 88, "Grade": "A"},
        {"Name": "Susmita",   "Score": 95, "Grade": "A+"},
        {"Name": "Swadeep",   "Score": 72, "Grade": "B", "Scholarship": "Half"},
        {"Name": "Sachin",    "Score": 65}  # Missing 'Grade'
    ]

    print("Raw Input Records (List of Dicts):")
    for r in records:
        print(" ", r)

    # 1. Ingesting directly into DataFrame
    # Pandas automatically unions all keys across all dicts and fills missing keys with NaN!
    df_records = pd.DataFrame(records)
    print("\n1. Resulting DataFrame from JSON Records:\n", df_records)
    print(f"\n   Shape: {df_records.shape} (4 rows, 4 columns)")
    print("   Data Types:\n", df_records.dtypes)

if __name__ == "__main__":
    main()
