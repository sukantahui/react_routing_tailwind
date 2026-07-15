# read_empty.py
# Demonstrates handling empty files and EOF

import os

def read_empty_file():
    """Read an empty file and show the result."""
    filename = "empty.txt"
    open(filename, 'w').close()  # Create empty file

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"📄 Reading empty file: '{content}' (type: {type(content)})")
    if content == '':
        print("   ✅ Detected empty string (EOF)")
    os.remove(filename)

def read_chunks_until_eof():
    """Read a file in chunks and detect EOF."""
    filename = "eof_demo.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Only one line in this file.\n")

    print("\n🔍 Reading chunks until EOF:")
    with open(filename, 'r', encoding='utf-8') as f:
        chunk_num = 0
        while True:
            chunk = f.read(5)  # small chunk size for demonstration
            chunk_num += 1
            if not chunk:
                print(f"   Chunk {chunk_num}: EOF detected (empty)")
                break
            print(f"   Chunk {chunk_num}: '{chunk}'")

    os.remove(filename)

def using_read_after_eof():
    """Show what happens when you read after EOF."""
    filename = "eof_again.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write("Some content")

    with open(filename, 'r', encoding='utf-8') as f:
        content1 = f.read()
        content2 = f.read()  # Already at EOF
        content3 = f.read()  # Still at EOF
        print(f"\n📄 First read: '{content1}' (length {len(content1)})")
        print(f"   Second read: '{content2}' (length {len(content2)})")
        print(f"   Third read: '{content3}' (length {len(content3)})")

    os.remove(filename)
    print("🧹 Cleaned up.")

if __name__ == "__main__":
    read_empty_file()
    read_chunks_until_eof()
    using_read_after_eof()