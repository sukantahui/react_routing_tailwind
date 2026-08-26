"""
File: mode_comparison.py
Module: 002_008_file-handling (Topic 8)
Description: Comprehensive comparison of Python file reading mechanisms:
             read(), read(size), readline(), and readlines() with context managers.
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
"""

import os
import tempfile

def create_sample_dataset(filepath: str) -> None:
    """Creates a sample student billing registry for testing reading methods."""
    sample_records = [
        "ID,Name,Location,Course,Fee_INR\n",
        "101,Mamata,Barrackpore,Python Pro,15000\n",
        "102,Debangshu,Jadavpur,Data Science,22000\n",
        "103,Susmita,Kolkata,Full Stack,28000\n",
        "104,Mahima,Ichapur,Machine Learning,25000\n",
        "105,Abhronila,Shyamnagar,Cloud Computing,18000\n"
    ]
    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(sample_records)
    print(f"[Setup] Sample dataset written to: {filepath}\n")


def demo_read_entire_file(filepath: str) -> None:
    """1. read() - Reads the entire file content into a single string."""
    print("=" * 60)
    print("METHOD 1: file.read() - Read entire content")
    print("=" * 60)
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        print(f"Total Characters Read: {len(content)}")
        print("Raw Content:\n" + content)


def demo_read_in_chunks(filepath: str, chunk_size: int = 32) -> None:
    """2. read(size) - Reads fixed byte/char chunks (memory-safe for large files)."""
    print("=" * 60)
    print(f"METHOD 2: file.read({chunk_size}) - Read in fixed buffer chunks")
    print("=" * 60)
    chunk_count = 0
    with open(filepath, "r", encoding="utf-8") as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            chunk_count += 1
            print(f"[Chunk {chunk_count:02d} ({len(chunk)} chars)]: {repr(chunk)}")
    print(f"Finished reading in {chunk_count} chunks.\n")


def demo_readline_streaming(filepath: str) -> None:
    """3. readline() - Reads one line at a time until EOF."""
    print("=" * 60)
    print("METHOD 3: file.readline() - Stream line-by-line")
    print("=" * 60)
    with open(filepath, "r", encoding="utf-8") as f:
        line_num = 1
        while True:
            line = f.readline()
            if not line:
                break
            print(f"Line {line_num}: {line.strip()}")
            line_num += 1
    print()


def demo_readlines_collection(filepath: str) -> None:
    """4. readlines() - Reads all lines into a list of strings."""
    print("=" * 60)
    print("METHOD 4: file.readlines() - Load into memory list")
    print("=" * 60)
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()
        print(f"Total lines parsed: {len(lines)}")
        header = lines[0].strip().split(",")
        print(f"Header Columns: {header}")
        
        total_fees = 0
        for record in lines[1:]:
            parts = record.strip().split(",")
            sid, name, loc, course, fee = parts
            fee_val = int(fee)
            total_fees += fee_val
            print(f"  • Student {name} ({loc}) enrolled in {course}: ₹{fee_val:,}")
        
        print(f"\nTotal Aggregate Revenue (Barrackpore Center): ₹{total_fees:,}\n")


def demo_idiomatic_for_loop(filepath: str) -> None:
    """5. Best Practice: for line in file (memory efficient generator iteration)."""
    print("=" * 60)
    print("METHOD 5 (BEST PRACTICE): for line in file (Buffered Iterator)")
    print("=" * 60)
    with open(filepath, "r", encoding="utf-8") as f:
        for idx, line in enumerate(f, start=1):
            print(f"  [{idx:02d}] {line.rstrip()}")
    print("=" * 60)


if __name__ == "__main__":
    temp_dir = tempfile.mkdtemp()
    test_file = os.path.join(temp_dir, "students_records.csv")
    try:
        create_sample_dataset(test_file)
        demo_read_entire_file(test_file)
        demo_read_in_chunks(test_file, chunk_size=40)
        demo_readline_streaming(test_file)
        demo_readlines_collection(test_file)
        demo_idiomatic_for_loop(test_file)
    finally:
        if os.path.exists(test_file):
            os.remove(test_file)
        os.rmdir(temp_dir)
