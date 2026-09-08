"""
03_version_and_deps_check.py
Title: Inspecting Seaborn Version, Configuration & Backend
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import seaborn as sns
import matplotlib
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 03: Environment & Dependency Diagnostics")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    print(f"📦 Python Environment Library Versions:")
    print(f"   • Seaborn    : {sns.__version__}")
    print(f"   • Matplotlib  : {matplotlib.__version__}")
    print(f"   • Pandas      : {pd.__version__}")
    print(f"   • NumPy       : {np.__version__}")

    # Note on Seaborn >= 0.12 new objects interface
    print("\n💡 Version Note: Seaborn >= 0.12 introduced the new `seaborn.objects` declarative API (so.Plot).")
    print("   Both the classic functional API (sns.scatterplot) and objects API coexist peacefully!")

if __name__ == "__main__":
    main()
