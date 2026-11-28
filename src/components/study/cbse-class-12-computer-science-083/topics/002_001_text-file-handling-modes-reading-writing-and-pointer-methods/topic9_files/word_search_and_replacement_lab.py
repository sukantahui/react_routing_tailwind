"""
CBSE Class XII Computer Science (Code 083)
Topic 9: Word Search, Line Filtering, and File Replacement Laboratory
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

import os

def setup_demo_files():
    content = (
        "This is line number 1 with some notes.\n"
        "Python is powerful and easy to learn.\n"
        "Remember that file handling is crucial for CBSE 083.\n"
        "Practice coding daily at Barrackpore learning center.\n"
        "This final line concludes the sample document.\n"
    )
    with open("source_story.txt", "w", encoding="utf-8") as f:
        f.write(content)

def search_word_positions(filename, target="is"):
    print(f"[*] Searching for word '{target}' with line tracking:")
    matches = []
    with open(filename, "r", encoding="utf-8") as f:
        for line_no, line in enumerate(f, start=1):
            words = line.split()
            for w_idx, w in enumerate(words, start=1):
                clean = w.strip(",.?!:;").lower()
                if clean == target.lower():
                    matches.append((line_no, w_idx, line.strip()))
    return matches

def filter_out_words(source_file, dest_file, banned_words=("this", "that")):
    print(f"[*] Copying lines excluding banned words: {banned_words}...")
    copied_count = 0
    with open(source_file, "r", encoding="utf-8") as fin, open(dest_file, "w", encoding="utf-8") as fout:
        for line in fin:
            lower = line.lower()
            # If any banned word is in line, skip it
            if any(banned in lower for banned in banned_words):
                continue
            fout.write(line)
            copied_count += 1
    print(f"[+] Clean file '{dest_file}' created with {copied_count} lines.")

def replace_in_file(filename, old_str, new_str):
    print(f"[*] Replacing '{old_str}' with '{new_str}' in '{filename}'...")
    with open(filename, "r", encoding="utf-8") as f:
        text = f.read()
    updated = text.replace(old_str, new_str)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(updated)
    print(f"[+] Replacement successfully written to '{filename}'.")

if __name__ == "__main__":
    setup_demo_files()
    print("=" * 60)
    print("1. SEARCHING FOR WORD OCCURRENCES")
    print("=" * 60)
    results = search_word_positions("source_story.txt", "is")
    for r in results:
        print(f"  Line {r[0]}, Word #{r[1]} -> '{r[2]}'")

    print("\n" + "=" * 60)
    print("2. COPYING WITH LINE EXCLUSION (FILTERING)")
    print("=" * 60)
    filter_out_words("source_story.txt", "clean_story.txt", banned_words=("this", "that"))
    print("[Cleaned File Content]:\n" + open("clean_story.txt").read())

    print("=" * 60)
    print("3. IN-PLACE FILE STRING REPLACEMENT")
    print("=" * 60)
    replace_in_file("clean_story.txt", "Barrackpore", "Barrackpore & Kolkata")
    print("[Updated Content]:\n" + open("clean_story.txt").read())
