# readlines_filter.py
# Demonstrates filtering and processing lines from readlines()

import os

def create_sample_file():
    """Create a sample file with various content."""
    filename = "filter.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Name: Swadeep, Class: 10\n")
        f.write("Name: Tuhina, Class: 9\n")
        f.write("Name: Abhronila, Class: 11\n")
        f.write("Name: Debangshu, Class: 10\n")
        f.write("Name: Souvik, Class: 8\n")
    print(f"✅ Created sample file: {filename}")
    return filename

def filter_by_class(filename, target_class="10"):
    """Filter lines by class."""
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Filter lines containing the target class
    filtered = [line for line in lines if f"Class: {target_class}" in line]
    print(f"\n🔍 Students in Class {target_class}:")
    for line in filtered:
        print(f"   {line.strip()}")

def extract_names(filename):
    """Extract names from all lines."""
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    names = []
    for line in lines:
        # Extract name from "Name: Swadeep" format
        if "Name:" in line:
            name = line.split("Name:")[1].split(",")[0].strip()
            names.append(name)

    print(f"\n👥 All student names:")
    for name in names:
        print(f"   {name}")

def process_in_batches(filename, batch_size=2):
    """Process lines in batches using sizehint."""
    print(f"\n📦 Processing in batches of ~{batch_size} lines:")
    with open(filename, 'r', encoding='utf-8') as f:
        batch_num = 0
        while True:
            # Read a batch of lines
            lines = f.readlines(batch_size * 30)  # approximate size
            if not lines:
                break
            batch_num += 1
            print(f"   Batch {batch_num}: {len(lines)} lines")
            for line in lines:
                # Process each line in the batch
                pass  # In real code, process the batch

if __name__ == "__main__":
    filename = create_sample_file()
    filter_by_class(filename, "10")
    extract_names(filename)
    process_in_batches(filename, 2)
    os.remove(filename)
    print("🧹 Cleaned up.")