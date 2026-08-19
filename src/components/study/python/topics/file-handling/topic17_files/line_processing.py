# line_processing.py
# Demonstrates processing lines with filters and transformations

import os

def create_sample_file():
    """Create a sample file with mixed content."""
    filename = "data.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("INFO: System started\n")
        f.write("WARNING: Low memory\n")
        f.write("INFO: User login: Swadeep\n")
        f.write("ERROR: File not found\n")
        f.write("INFO: Database connected\n")
        f.write("ERROR: Network timeout\n")
        f.write("WARNING: High CPU usage\n")
        f.write("INFO: User logout: Tuhina\n")
    print(f"✅ Created sample file: {filename}")
    return filename

def filter_errors(filename):
    """Filter and count error lines."""
    print("\n🔍 Filtering ERROR lines:")
    error_count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            if 'ERROR' in line:
                error_count += 1
                print(f"   {line.strip()}")
    print(f"   Total errors: {error_count}")

def skip_empty_lines(filename):
    """Read and skip empty lines."""
    print("\n📄 Reading (skipping empty lines):")
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.rstrip('\n')
            if line:  # skip empty lines
                print(f"   {line}")

def extract_information(filename):
    """Extract specific information from lines."""
    print("\n📊 Extracting user info:")
    users = []
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            if 'User' in line:
                # Extract username
                parts = line.split(':')
                if len(parts) >= 2:
                    user_info = parts[-1].strip()
                    users.append(user_info)
    for user in users:
        print(f"   {user}")

def count_word_occurrences(filename, word="ERROR"):
    """Count occurrences of a specific word."""
    print(f"\n🔢 Counting '{word}' occurrences:")
    count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        for line in f:
            count += line.count(word)
    print(f"   '{word}' appears {count} times")

if __name__ == "__main__":
    filename = create_sample_file()
    filter_errors(filename)
    skip_empty_lines(filename)
    extract_information(filename)
    count_word_occurrences(filename, "ERROR")
    os.remove(filename)
    print("🧹 Cleaned up.")