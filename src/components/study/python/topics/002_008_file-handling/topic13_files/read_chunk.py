# read_chunk.py
# Demonstrates reading a file in chunks

import os

def create_large_file(filename="large.txt", lines=1000):
    """Create a moderately large text file."""
    with open(filename, 'w', encoding='utf-8') as f:
        for i in range(lines):
            f.write(f"Line {i}: Some content for testing.\n")
    print(f"✅ Created file with {lines} lines: {filename}")

def read_in_chunks(filename, chunk_size=1024):
    """Read a file in fixed-size chunks."""
    print(f"\n📖 Reading '{filename}' in chunks of {chunk_size} characters:")
    total_chunks = 0
    total_chars = 0

    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:  # EOF
                break
            total_chunks += 1
            total_chars += len(chunk)
            # In a real program, you would process the chunk here
            # print(f"   Chunk {total_chunks}: {len(chunk)} chars")

    print(f"   Read {total_chunks} chunks, {total_chars} total characters")

def count_lines_in_chunks(filename, chunk_size=2048):
    """Count lines by reading chunks and counting newlines."""
    line_count = 0
    with open(filename, 'r', encoding='utf-8') as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            line_count += chunk.count('\n')
    print(f"   Line count: {line_count} (from chunk reading)")

if __name__ == "__main__":
    create_large_file(lines=500)
    read_in_chunks("large.txt")
    count_lines_in_chunks("large.txt")
    os.remove("large.txt")
    print("🧹 Cleaned up.")