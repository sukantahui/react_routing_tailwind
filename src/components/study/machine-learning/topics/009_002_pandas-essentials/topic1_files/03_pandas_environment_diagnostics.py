"""
03_pandas_environment_diagnostics.py
====================================
Topic: Configuring Pandas Global Display Options (pd.set_option) for ML EDA
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Data Science Foundations
"""

import pandas as pd
import numpy as np

def main():
    print("=" * 70)
    print("CONFIGURING PANDAS DISPLAY OPTIONS FOR MACHINE LEARNING")
    print("=" * 70)

    # 1. Inspecting Default Options
    print("Default Display Options:")
    print(f"  display.max_rows    : {pd.get_option('display.max_rows')}")
    print(f"  display.max_columns : {pd.get_option('display.max_columns')}")
    print(f"  display.precision   : {pd.get_option('display.precision')}")

    # 2. Customizing for ML Feature Engineering:
    # Set to show all columns and round floats to 2 decimal places
    pd.set_option("display.max_columns", 20)
    pd.set_option("display.max_rows", 10)
    pd.set_option("display.precision", 2)
    pd.set_option("display.width", 1000)

    print("\nCustomized Display Options for EDA:")
    print(f"  display.max_columns : {pd.get_option('display.max_columns')}")
    print(f"  display.precision   : {pd.get_option('display.precision')}")

    # 3. Create a wide mock DataFrame (15 features) to test wide display
    feature_names = [f"Feature_{i}" for i in range(1, 11)]
    data = np.random.randn(5, 10)
    df_wide = pd.DataFrame(data, columns=feature_names)

    print("\nWide Feature Matrix Display:")
    print(df_wide)

    # 4. Resetting options to default
    pd.reset_option("all")
    print("\nReset all display options back to defaults.")

if __name__ == "__main__":
    main()
