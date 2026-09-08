"""
02_import_conventions_and_namespaces.py
========================================
Topic: Standard Import Conventions, Namespaces, and Backend Accelerators
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd

def main():
    print("=" * 70)
    print("PANDAS IMPORT CONVENTIONS & OPTIONAL ACCELERATORS")
    print("=" * 70)

    # 1. Standard Community Import Convention (PEP 8)
    # ALWAYS use: import pandas as pd
    # NEVER use: from pandas import * (Pollutes global namespace and shadows built-ins)
    print("Standard import alias: 'import pandas as pd'")

    # 2. Key Sub-modules & Utilities
    print("\nKey Pandas Core Namespaces:")
    print("  pd.Series       :", pd.Series)
    print("  pd.DataFrame    :", pd.DataFrame)
    print("  pd.read_csv     :", pd.read_csv)
    print("  pd.date_range   :", pd.date_range)
    print("  pd.concat       :", pd.concat)
    print("  pd.to_datetime  :", pd.to_datetime)

    # 3. Checking Optional Accelerators (PyArrow, FastParquet)
    # Pandas 2.0+ supports PyArrow memory backend for 10x faster string processing
    has_pyarrow = False
    try:
        import pyarrow
        has_pyarrow = True
        print(f"\n[OPTIONAL ENGINE] PyArrow is installed (v{pyarrow.__version__}). PyArrow backend available!")
    except ImportError:
        print("\n[OPTIONAL ENGINE] PyArrow is not installed (Standard NumPy backend in use).")

    # Creating a sample DateRange Series
    dates = pd.date_range(start="2026-09-01", periods=5, freq="D")
    df_schedule = pd.DataFrame({
        "Session_Date": dates,
        "Topic": ["Pandas Intro", "Series/DF", "CSV Reading", "Indexing", "Filtering"]
    })
    print("\nSample Pandas DateRange DataFrame:")
    print(df_schedule)

if __name__ == "__main__":
    main()
