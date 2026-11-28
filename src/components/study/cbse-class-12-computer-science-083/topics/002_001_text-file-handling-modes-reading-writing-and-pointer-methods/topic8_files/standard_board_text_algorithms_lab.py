"""
CBSE Class XII Computer Science (Code 083)
Topic 8: Standard Board Examination Text File Algorithms Laboratory
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

def prepare_data(filename="board_sample.txt"):
    text = (
        "Army Public School Barrackpore is an outstanding educational institution.\n"
        "All students study hard for the CBSE 083 examination in 2026.\n"
        "Mathematics, Physics, Chemistry, and Computer Science form the core.\n"
        "Make sure to practice file handling and SQL queries daily!\n"
    )
    with open(filename, "w", encoding="utf-8") as f:
        f.write(text)

def count_word_freq(filename, target="and"):
    count = 0
    with open(filename, "r", encoding="utf-8") as f:
        for word in f.read().split():
            clean_word = word.strip(",.?!:;").lower()
            if clean_word == target.lower():
                count += 1
    return count

def filter_lines_starting_with(filename, letters=("A", "M")):
    matched_lines = []
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if stripped and stripped[0].upper() in letters:
                matched_lines.append(stripped)
    return matched_lines

def analyze_character_statistics(filename):
    stats = {"uppercase": 0, "lowercase": 0, "digits": 0, "spaces": 0, "vowels": 0}
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()
        for ch in content:
            if ch.isupper(): stats["uppercase"] += 1
            if ch.islower(): stats["lowercase"] += 1
            if ch.isdigit(): stats["digits"] += 1
            if ch.isspace(): stats["spaces"] += 1
            if ch.lower() in "aeiou": stats["vowels"] += 1
    return stats

if __name__ == "__main__":
    prepare_data()
    print("=" * 60)
    print("CBSE STANDARD TEXT FILE ALGORITHMS")
    print("=" * 60)
    
    # 1. Word frequency
    and_count = count_word_freq("board_sample.txt", "and")
    print(f"[1] Occurrences of word 'and': {and_count}")
    
    # 2. Filter lines starting with 'A' or 'M'
    lines = filter_lines_starting_with("board_sample.txt", ("A", "M"))
    print(f"[2] Lines starting with 'A' or 'M': ({len(lines)} found)")
    for l in lines:
        print(f"    >> {l}")
        
    # 3. Character breakdown
    stats = analyze_character_statistics("board_sample.txt")
    print(f"[3] Character Statistics Breakdown:")
    for k, v in stats.items():
        print(f"    - {k.capitalize()}: {v}")
