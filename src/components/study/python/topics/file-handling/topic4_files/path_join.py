# path_join.py
# Demonstrates os.path.join() for cross-platform path construction

import os

def construct_paths_example():
    """Show how os.path.join works across platforms."""
    base = "project"
    sub = "data"
    file = "report.csv"

    # Using join
    full = os.path.join(base, sub, file)
    print(f"🔗 os.path.join('{base}', '{sub}', '{file}') → {full}")

    # On Windows, this would use backslashes; on Unix, forward slashes.
    print(f"   Separator used: '{os.path.sep}'")
    print(f"   Is absolute? {os.path.isabs(full)}")

    # Joining with absolute components
    abs_base = os.path.abspath(".")  # current directory absolute
    full_abs = os.path.join(abs_base, sub, file)
    print(f"\n📁 With absolute base: {full_abs}")

    # Joining multiple
    parts = ["home", "user", "Documents", "notes.txt"]
    path = os.path.join(*parts)
    print(f"\n📂 Joining list: {path}")

if __name__ == "__main__":
    construct_paths_example()