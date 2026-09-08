"""
01_basic_excel_reading_and_sheets.py
====================================
Topic: Reading Excel Workbooks (.xlsx) with pd.read_excel and sheet_name
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("READING EXCEL WORKBOOKS: pd.read_excel & SHEET MANAGEMENT")
    print("=" * 70)

    # 1. Excel Dependencies:
    # Requires 'openpyxl' (for .xlsx) or 'xlrd' (for legacy .xls)
    # Install: pip install openpyxl

    # 2. Simulated Excel Sheet Dictionaries (Barrackpore Branch Records)
    # Sheet 1: 'Machine_Learning_Batch'
    # Sheet 2: 'Data_Science_Batch'
    
    # Reading Single Sheet by Name:
    # df_ml = pd.read_excel('barrackpore_courses.xlsx', sheet_name='Machine_Learning_Batch')
    
    # Reading Single Sheet by Integer Index (0-based):
    # df_first = pd.read_excel('barrackpore_courses.xlsx', sheet_name=0)

    # 3. Reading ALL Sheets at Once: sheet_name=None
    # Returns a Python dictionary: { "Sheet_Name": DataFrame, ... }
    print("Code Pattern: Ingesting Multi-Sheet Workbook as a Dict:")
    print("  all_sheets_dict = pd.read_excel('barrackpore_courses.xlsx', sheet_name=None)")
    print("  for sheet_name, df_sheet in all_sheets_dict.items():")
    print("      print(f'Sheet: {sheet_name}, Rows: {len(df_sheet)}')")

    # Mocking the resulting dictionary structure
    all_sheets = {
        "Machine_Learning": pd.DataFrame({
            "Student": ["Debangshu", "Susmita"],
            "Course": ["ML", "ML"],
            "Score": [88, 95]
        }),
        "Data_Science": pd.DataFrame({
            "Student": ["Swadeep", "Tuhina"],
            "Course": ["DS", "DS"],
            "Score": [72, 91]
        })
    }

    for name, df in all_sheets.items():
        print(f"\n[Sheet: {name}] Shape: {df.shape}")
        print(df)

if __name__ == "__main__":
    main()
