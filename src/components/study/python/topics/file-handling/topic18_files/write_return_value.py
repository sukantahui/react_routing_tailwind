# write_return_value.py
# Demonstrates the return value of write()

import os

def write_return_value_example():
    """Show the return value of write()."""
    filename = "return_demo.txt"

    with open(filename, 'w', encoding='utf-8') as f:
        chars1 = f.write("Hello, World!\n")
        chars2 = f.write("This is a second line.\n")
        chars3 = f.write("Third line.")

    print(f"📊 Return values:")
    print(f"   Write 1: {chars1} characters")
    print(f"   Write 2: {chars2} characters")
    print(f"   Write 3: {chars3} characters")

    # Check file size
    import os
    size = os.path.getsize(filename)
    print(f"   File size: {size} bytes")

    # Read content
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"\n📄 Content ({len(content)} characters):\n{content}")

    # Note: In text mode, characters != bytes due to encoding
    print(f"\n💡 Note: {len(content)} characters != {size} bytes (UTF-8 encoding)")

    os.remove(filename)
    print("🧹 Cleaned up.")

def verify_write_success():
    """Verify write by checking return value."""
    filename = "verify.txt"

    with open(filename, 'w', encoding='utf-8') as f:
        text = "Important data: 42"
        written = f.write(text)
        if written == len(text):
            print(f"✅ Write successful: {written} characters written")
        else:
            print(f"⚠️ Write incomplete: {written} of {len(text)} characters")

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    write_return_value_example()
    verify_write_success()