"""
01_pip_install_seaborn.py
Title: Installing Seaborn and Managing Dependencies
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import sys
import subprocess

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 01: Installation & Environment Setup")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    print("\n📦 Recommended Terminal Commands for Python/Jupyter environments:")
    print("   $ pip install seaborn")
    print("   or in Conda:")
    print("   $ conda install seaborn -c conda-forge")

    # In modern virtual environments (pip / conda), seaborn brings:
    # - numpy
    # - pandas
    # - matplotlib
    # - scipy
    print("\n🔗 Core Dependencies automatically resolved by Seaborn:")
    deps = ["matplotlib", "pandas", "numpy", "scipy"]
    for d in deps:
        print(f"   [+] {d}")

    print("\n💡 Verification Check:")
    try:
        import seaborn as sns
        print(f"   ✓ Seaborn is successfully installed! Version: {sns.__version__}")
    except ImportError:
        print("   ✗ Seaborn is not installed in the current environment.")

if __name__ == "__main__":
    main()
