# pathlib_cwd.py
# Demonstrates modern pathlib methods for working with CWD

from pathlib import Path

def pathlib_examples():
    """Show pathlib's CWD‑related features."""
    # Get CWD as Path object
    cwd = Path.cwd()
    print(f"📂 CWD: {cwd}")
    print(f"   Type: {type(cwd)}")
    print(f"   Absolute? {cwd.is_absolute()}")

    # Parent directory
    parent = cwd.parent
    print(f"📁 Parent: {parent}")

    # List contents of CWD (first few)
    print("\n📄 Contents of CWD (first 5):")
    for i, item in enumerate(cwd.iterdir()):
        if i >= 5:
            print("   ...")
            break
        if item.is_dir():
            print(f"   📁 {item.name}/")
        else:
            print(f"   📄 {item.name}")

    # Build a path relative to CWD
    test_file = cwd / "data" / "results.csv"
    print(f"\n🔗 Path relative to CWD: {test_file}")

    # Check if the path exists (it probably doesn't)
    print(f"   Exists? {test_file.exists()}")

    # Resolve path (absolute)
    abs_path = test_file.resolve()
    print(f"   Resolved (absolute): {abs_path}")

    # Convert to string if needed
    print(f"   As string: {str(abs_path)}")

if __name__ == "__main__":
    pathlib_examples()