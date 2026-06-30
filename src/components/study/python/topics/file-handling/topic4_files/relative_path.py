# relative_path.py
# Demonstrates constructing and using relative paths

import os

def relative_path_examples():
    """Show how relative paths work with CWD."""
    cwd = os.getcwd()
    print(f"📍 Current directory: {cwd}")

    # Create a subdirectory and a file for demonstration
    os.makedirs("data", exist_ok=True)
    with open("data/students.csv", "w") as f:
        f.write("Name,Class\nSwadeep,10\nTuhina,9\n")

    # Relative paths
    print("\n📄 Using relative paths:")
    rel_path = "data/students.csv"
    if os.path.exists(rel_path):
        print(f"✅ Found: {rel_path}")
        print(f"   Absolute: {os.path.abspath(rel_path)}")

    # Go up one level
    parent_path = "../data/students.csv"  # Assumes the parent has a 'data' dir
    print(f"\n🔗 Parent relative: {parent_path}")
    if os.path.exists(parent_path):
        print(f"   Found: {parent_path}")
    else:
        print("   (Not found in this context)")

    # Using '.' to mean current directory
    dot_path = "./data/students.csv"
    print(f"\n📂 With './': {dot_path}")
    if os.path.exists(dot_path):
        print(f"   Found: {dot_path}")

    # Cleanup
    os.remove("data/students.csv")
    os.rmdir("data")
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    relative_path_examples()