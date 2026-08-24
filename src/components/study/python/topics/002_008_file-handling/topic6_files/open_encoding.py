# open_encoding.py
# Demonstrates encoding and error handling

import os

def encoding_examples():
    """Show how encoding affects reading/writing."""
    # Write a file with Unicode characters
    with open("unicode.txt", 'w', encoding='utf-8') as f:
        f.write("Naihati: নৈহাটি\n")
        f.write("Barrackpore: ব্যারাকপুর\n")
        f.write("Emojis: 😊🚀\n")

    # Reading with correct encoding
    print("✅ Reading with UTF-8:")
    with open("unicode.txt", 'r', encoding='utf-8') as f:
        print(f.read())

    # Trying to read with ASCII (will fail)
    print("\n❌ Reading with ASCII (wrong):")
    try:
        with open("unicode.txt", 'r', encoding='ascii') as f:
            print(f.read())
    except UnicodeDecodeError as e:
        print(f"   Error: {e}")

    # Using errors='replace' to handle bad bytes
    print("\n🛠️ Reading with ASCII and errors='replace':")
    with open("unicode.txt", 'r', encoding='ascii', errors='replace') as f:
        print(f.read())

    # Using errors='ignore'
    print("\n🛠️ Reading with ASCII and errors='ignore':")
    with open("unicode.txt", 'r', encoding='ascii', errors='ignore') as f:
        print(f.read())

    # Clean up
    os.remove("unicode.txt")
    print("\n🧹 Cleaned up.")

if __name__ == "__main__":
    encoding_examples()