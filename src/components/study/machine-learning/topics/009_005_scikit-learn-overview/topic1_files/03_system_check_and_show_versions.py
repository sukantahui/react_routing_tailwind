"""
03_system_check_and_show_versions.py
Title: sklearn.show_versions() System Diagnostic Utility
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import sklearn

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Lab 03: show_versions() Diagnostics")
    print("   Instructor: Sukanta Hui | Students: Sachin, Tuhina, Mahima")
    print("=" * 65)

    print("\nRunning sklearn.show_versions() for deep environment inspection:")
    try:
        sklearn.show_versions()
    except Exception as e:
        print(f"show_versions output: {e}")

    print("\n✓ Used when filing bug reports or ensuring reproducible GPU/CPU execution.")

if __name__ == "__main__":
    main()
