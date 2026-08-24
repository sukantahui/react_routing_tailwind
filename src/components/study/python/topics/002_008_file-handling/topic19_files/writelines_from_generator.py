# writelines_from_generator.py
# Demonstrates using a generator with writelines

import os

def generate_lines(n):
    """Generator that yields lines one by one."""
    for i in range(n):
        yield f"Line {i:03d}: Generated content\n"

def write_with_generator():
    """Use writelines with a generator (memory efficient)."""
    filename = "generator_output.txt"

    # Using generator directly
    with open(filename, 'w', encoding='utf-8') as f:
        f.writelines(generate_lines(100))

    print(f"✅ Written 100 lines using generator")

    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"\n📄 First few lines:\n{content[:200]}...")

    os.remove(filename)

def write_with_generator_chunked():
    """Chunked writing to avoid huge list."""
    filename = "chunked_output.txt"

    def chunked_lines(n, chunk_size=100):
        for i in range(0, n, chunk_size):
            chunk = [f"Line {j:04d}\n" for j in range(i, min(i+chunk_size, n))]
            yield chunk

    with open(filename, 'w', encoding='utf-8') as f:
        for chunk in chunked_lines(1000, 100):
            f.writelines(chunk)

    print(f"✅ Chunked write: 1000 lines")

    with open(filename, 'r', encoding='utf-8') as f:
        print(f"File size: {len(f.read())} characters")

    os.remove(filename)

if __name__ == "__main__":
    write_with_generator()
    write_with_generator_chunked()
    print("🧹 Cleaned up.")