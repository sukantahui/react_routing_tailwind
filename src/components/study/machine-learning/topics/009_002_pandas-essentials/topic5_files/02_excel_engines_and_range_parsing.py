"""
02_excel_engines_and_range_parsing.py
=====================================
Topic: Excel Engines (openpyxl, calamine), skiprows, and Letter Column Ranges
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("EXCEL ENGINES, SKIPROWS & EXCEL-STYLE COLUMN RANGES")
    print("=" * 70)

    # 1. Real-world corporate Excel files often have title banners and disclaimers
    # in rows 1-3 before the actual tabular header starts at row 4.
    # We skip these metadata rows using: skiprows=3 or header=3
    print("Pattern for Skipping Title Banners in Corporate Spreadsheets:")
    print("  df = pd.read_excel('financial_report.xlsx', skiprows=3, nrows=50)")

    # 2. Excel-Style Column Letter Ranges: usecols='A:D' or 'A,C:E'
    print("\nPattern for Selecting Excel Column Letter Ranges:")
    print("  df_range = pd.read_excel('tax_audit.xlsx', usecols='A:D')")
    print("  df_custom = pd.read_excel('tax_audit.xlsx', usecols='A,C:F')")

    # 3. High-Performance Engines: 'calamine' vs 'openpyxl'
    # 'calamine' (Rust-based Excel parser) can be up to 10x faster for large workbooks!
    print("\nSelecting Parser Engine:")
    print("  df_openpyxl = pd.read_excel('data.xlsx', engine='openpyxl')")
    print("  df_fast     = pd.read_excel('huge_data.xlsx', engine='calamine')")

if __name__ == "__main__":
    main()
