"""
CBSE Class XII Computer Science (Code 083)
Topic 4: Reading Methods Demonstration - read(), read(n), readline(), readlines()
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

def prepare_sample_file(filename="school_story.txt"):
    lines = [
        "Army Public School Barrackpore.\n",
        "Computer Science Code 083 Class 12.\n",
        "Students: Mamata, Mahima, Susmita, Debangshu.\n",
        "Excel in Theory 70 and Practical 30.\n"
    ]
    with open(filename, "w", encoding="utf-8") as f:
        f.writelines(lines)

def demo_reading_methods(filename="school_story.txt"):
    print("=" * 65)
    print("1. DEMONSTRATING read(n) CHUNK READING")
    print("=" * 65)
    with open(filename, "r", encoding="utf-8") as f:
        chunk1 = f.read(12)
        chunk2 = f.read(15)
        print(f"Chunk 1 (12 chars): {repr(chunk1)}")
        print(f"Chunk 2 (15 chars): {repr(chunk2)}")

    print("\n" + "=" * 65)
    print("2. DEMONSTRATING readline() LINE BY LINE")
    print("=" * 65)
    with open(filename, "r", encoding="utf-8") as f:
        l1 = f.readline()
        l2 = f.readline()
        print(f"Line 1 raw : {repr(l1)} -> Cleaned: {l1.rstrip('\n')}")
        print(f"Line 2 raw : {repr(l2)} -> Cleaned: {l2.rstrip('\n')}")

    print("\n" + "=" * 65)
    print("3. DEMONSTRATING readlines() LIST OF LINES")
    print("=" * 65)
    with open(filename, "r", encoding="utf-8") as f:
        all_lines = f.readlines()
        print(f"readlines() type: {type(all_lines)}")
        print(f"Total lines captured: {len(all_lines)}")
        for idx, line in enumerate(all_lines):
            print(f"  Line [{idx}]: {line.strip()}")

    print("\n" + "=" * 65)
    print("4. MEMORY-EFFICIENT ITERATION: for line in f:")
    print("=" * 65)
    with open(filename, "r", encoding="utf-8") as f:
        vowel_lines = 0
        for line in f:
            if line[0].upper() in "AEIOU":
                vowel_lines += 1
                print(f"  Starts with vowel: {line.strip()}")
        print(f"Total lines starting with vowel: {vowel_lines}")

if __name__ == "__main__":
    prepare_sample_file()
    demo_reading_methods()
