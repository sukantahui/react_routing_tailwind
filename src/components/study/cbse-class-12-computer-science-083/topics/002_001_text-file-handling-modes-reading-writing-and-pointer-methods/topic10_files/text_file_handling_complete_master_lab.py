"""
======================================================================
CBSE CLASS XII COMPUTER SCIENCE (CODE: 083)
MASTER LABORATORY SCRIPT: COMPLETE TEXT FILE HANDLING OPERATIONS
Author: Sukanta Hui, Coder & AccoTax, Barrackpore, West Bengal
Target Students: Mamata, Mahima, Susmita, Debangshu, Swadeep, Tuhina
======================================================================
"""

import os

# --- SECTION 1: CREATION AND WRITING ---
def demo_create_and_write(filename="cbse_master.txt"):
    print("--- [1] CREATING & WRITING TO TEXT FILE ---")
    lines = [
        "Army Public School Barrackpore - Senior Secondary Wing.\n",
        "CBSE Computer Science (Subject Code 083) Examination 2026.\n",
        "Unit I: Computational Thinking and Programming - 2 carries 40 Marks.\n",
        "Persistent text file handling is essential for practical mastery.\n",
        "Make sure to practice Python-MySQL connectivity and Stacks as well!\n"
    ]
    with open(filename, "w", encoding="utf-8") as f:
        f.writelines(lines)
    print(f"[+] File '{filename}' created successfully. Size: {os.path.getsize(filename)} bytes.\n")

# --- SECTION 2: READING PRIMITIVES ---
def demo_reading_primitives(filename="cbse_master.txt"):
    print("--- [2] READING PRIMITIVES: read(), readline(), readlines() ---")
    with open(filename, "r", encoding="utf-8") as f:
        print("[a] First 25 characters via read(25):", repr(f.read(25)))
        f.seek(0) # Rewind
        print("[b] First line via readline():", repr(f.readline().strip()))
        f.seek(0)
        all_lines = f.readlines()
        print(f"[c] Total lines via readlines(): {len(all_lines)}")
    print()

# --- SECTION 3: POINTER MANIPULATION (TELL & SEEK) ---
def demo_pointer_mechanics(filename="cbse_master.txt"):
    print("--- [3] POINTER MECHANICS: tell() AND seek() ---")
    with open(filename, "r", encoding="utf-8") as f:
        print("Initial pointer (tell):", f.tell()) # 0
        f.read(30)
        print("After reading 30 chars (tell):", f.tell()) # 30
        f.seek(0)
        print("Rewound to 0 via seek(0):", f.tell()) # 0
        f.seek(0, 2)
        print("Moved to EOF via seek(0, 2):", f.tell()) # End
    print()

# --- SECTION 4: STANDARD BOARD ALGORITHMS ---
def algorithm_word_count(filename="cbse_master.txt", target="and"):
    count = 0
    with open(filename, "r", encoding="utf-8") as f:
        for word in f.read().split():
            clean = word.strip(",.?!:;").lower()
            if clean == target.lower():
                count += 1
    return count

def algorithm_filter_lines(filename="cbse_master.txt", letters=("A", "M", "U")):
    matched = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if stripped and stripped[0].upper() in letters:
                matched.append(stripped)
    return matched

def algorithm_character_breakdown(filename="cbse_master.txt"):
    stats = {"upper": 0, "lower": 0, "digit": 0, "space": 0, "vowel": 0}
    with open(filename, "r", encoding="utf-8") as f:
        for ch in f.read():
            if ch.isupper(): stats["upper"] += 1
            if ch.islower(): stats["lower"] += 1
            if ch.isdigit(): stats["digit"] += 1
            if ch.isspace(): stats["space"] += 1
            if ch.lower() in "aeiou": stats["vowel"] += 1
    return stats

# --- MAIN EXECUTION PIPELINE ---
if __name__ == "__main__":
    fname = "cbse_master.txt"
    demo_create_and_write(fname)
    demo_reading_primitives(fname)
    demo_pointer_mechanics(fname)
    
    print("--- [4] BOARD ALGORITHM RESULTS ---")
    print(f"Occurrences of word 'and': {algorithm_word_count(fname, 'and')}")
    print(f"Lines starting with A, M, or U: {algorithm_filter_lines(fname)}")
    print(f"Character statistics: {algorithm_character_breakdown(fname)}")
    print("\n[+] Master laboratory demonstration completed successfully!")
