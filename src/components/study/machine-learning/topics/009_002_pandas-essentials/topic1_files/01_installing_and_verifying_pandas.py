"""
01_installing_and_verifying_pandas.py
=====================================
Topic: Installing, Importing, and Verifying Pandas & its Dependencies
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import sys
import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("PANDAS INSTALLATION & RUNTIME ENVIRONMENT VERIFICATION")
    print("=" * 70)

    # 1. Installation Commands Reference:
    # Terminal (pip)  : pip install pandas
    # Terminal (conda): conda install pandas
    # High Performance: pip install "pandas[performance,excel,parquet]"

    # 2. Checking Pandas & Python runtime versions
    print(f"Python Runtime Version : {sys.version.split()[0]}")
    print(f"Pandas Library Version : {pd.__version__}")
    print(f"NumPy Dependency Version: {np.__version__}")

    # 3. Simple DataFrame sanity check
    df_test = pd.DataFrame({
        "Student": ["Debangshu", "Susmita"],
        "Course": ["Machine Learning", "Data Science"],
        "Center": ["Barrackpore", "Barrackpore"]
    })
    print("\nSanity Check DataFrame Creation:")
    print(df_test)
    print(f"\nPandas is fully operational in this Python environment!")

if __name__ == "__main__":
    main()
