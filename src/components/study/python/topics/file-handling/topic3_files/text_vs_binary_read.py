# text_vs_binary_read.py
# Demonstrates reading the same file as text and as binary

def read_as_text(filename):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        print(f"📄 As text (first 100 chars):\n{content[:100]}...")
    except UnicodeDecodeError:
        print("❌ Cannot read as text – binary content.")

def read_as_binary(filename):
    with open(filename, 'rb') as f:
        data = f.read(100)
    print(f"💾 As binary (hex):\n{data.hex()[:100]}...")

if __name__ == "__main__":
    # Create a sample text file and a binary file
    with open('sample_text.txt', 'w', encoding='utf-8') as f:
        f.write("Hello from Barrackpore! This is a text file with some content.\n")
        f.write("Swadeep, Tuhina, Abhronila, and Debangshu are students.\n")
    
    with open('sample_binary.bin', 'wb') as f:
        f.write(b'\x00\x01\x02\x03\xFF\xFE\xFD\xFC' * 10)
    
    print("🔍 Comparing reading methods:")
    print("\n--- sample_text.txt ---")
    read_as_text('sample_text.txt')
    read_as_binary('sample_text.txt')
    
    print("\n--- sample_binary.bin ---")
    read_as_text('sample_binary.bin')
    read_as_binary('sample_binary.bin')