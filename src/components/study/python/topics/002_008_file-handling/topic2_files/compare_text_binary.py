# compare_text_binary.py
# Show the difference between reading a file as text vs binary

def compare_reading(filename):
    """Read a file both as text and binary, showing output differences."""
    print(f"🔍 Comparing reading methods for: {filename}")
    
    # Read as text (if possible)
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            text_content = f.read()
        print("📄 As text (first 100 chars):")
        print(text_content[:100])
        print("...")
    except UnicodeDecodeError:
        print("❌ Cannot read as text – binary content detected.")
    
    # Read as binary
    with open(filename, 'rb') as f:
        bin_content = f.read(100)
    print("💾 As binary (hex):")
    print(bin_content.hex()[:100] + "...")

if __name__ == "__main__":
    compare_reading('sample.txt')
    compare_reading('data.bin')