"""
CBSE Class 12 Computer Science - CSV File Handling
Topic 1: Exploration of the 'csv' Module, Classes, and Constants
Author: Sukanta Hui, Coder & AccoTax
"""

import csv

def inspect_csv_module():
    print("--- PYTHON 'csv' MODULE INTROSPECTION ---")
    
    # 1. Check module attributes
    classes = [item for item in dir(csv) if not item.startswith('_')]
    print(f"Available exported attributes ({len(classes)} total):")
    print(", ".join(classes[:15]) + " ...\n")
    
    # 2. Inspect Quoting Constants
    print("--- QUOTING CONSTANTS ---")
    print(f"csv.QUOTE_MINIMAL     : {csv.QUOTE_MINIMAL}")
    print(f"csv.QUOTE_ALL         : {csv.QUOTE_ALL}")
    print(f"csv.QUOTE_NONNUMERIC  : {csv.QUOTE_NONNUMERIC}")
    print(f"csv.QUOTE_NONE        : {csv.QUOTE_NONE}")
    
    # 3. Available Dialects
    print("\n--- REGISTERED DIALECTS ---")
    dialects = csv.list_dialects()
    print("Registered Dialects:", dialects)
    
    # 4. Excel Dialect Attributes
    excel_dialect = csv.get_dialect('excel')
    print("\n--- 'excel' DIALECT PROPERTIES ---")
    print(f"Delimiter       : {repr(excel_dialect.delimiter)}")
    print(f"Quote Character : {repr(excel_dialect.quotechar)}")
    print(f"Line Terminator : {repr(excel_dialect.lineterminator)}")
    print(f"Quoting Mode    : {excel_dialect.quoting}")

if __name__ == "__main__":
    inspect_csv_module()