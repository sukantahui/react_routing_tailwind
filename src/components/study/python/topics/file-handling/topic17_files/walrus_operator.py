# walrus_operator.py
# Demonstrates the walrus operator approach (Python 3.8+)

import os

def create_sample_file():
    """Create a sample file."""
    filename = "sample.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(1, 11):
            f.write(f"Line {i:02d}: Content for walrus operator.\n")
    print(f"✅ Created sample file: {filename}")
    return filename

def read_with_walrus(filename):
    """Read a file using the walrus operator (Python 3.8+)."""
    print("\n🔹 Reading with 'while line := f.readline()':")
    line_count = 0

    with open(filename, 'r', encoding='utf-8') as f:
        while line := f.readline():
            line_count += 1
            if line_count <= 3:
                print(f"   {line.strip()}")

    print(f"   Total lines: {line_count}")

def read_with_walrus_and_condition(filename):
    """Use walrus with additional conditions."""
    print("\n🔹 Walrus with filtering:")
    with open(filename, 'r', encoding='utf-8') as f:
        while line := f.readline():
            if "04" in line:  # Example condition
                print(f"   Found line with '04': {line.strip()}")

def check_python_version():
    """Check if walrus operator is supported."""
    import sys
    if sys.version_info >= (3, 8):
        print("\n✅ Python 3.8+ detected — walrus operator supported.")
    else:
        print("\n⚠️ Python < 3.8 — walrus operator not available. Use while True.")

if __name__ == "__main__":
    filename = create_sample_file()
    check_python_version()
    read_with_walrus(filename)
    read_with_walrus_and_condition(filename)
    os.remove(filename)
    print("🧹 Cleaned up.")