# topic6_files/join_basics_and_delimiters.py
# Module: 002_007_string-processing
# Topic: Joining Lists of Strings with join()
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 6 - File 1: delimiter.join(iterable) Fundamentals & Delimiter Mechanics
Demonstrates:
  1. Core syntax: delimiter.join(iterable)
  2. Why join is a string method rather than a list method (Design Rationale)
  3. Common delimiters: empty string, spaces, commas, newlines, pipes, hyphens
  4. Joining string literals & character sequences: "-".join("PYTHON")
  5. Edge cases: Empty list [], single-item list ['Only'], no trailing delimiter rule
"""

def demonstrate_basic_joining():
    print("=" * 65)
    print("1. delimiter.join(iterable) BASIC DELIMITERS")
    print("=" * 65)

    branches = ["Barrackpore", "Kolkata", "Shyamnagar", "Sodepur"]
    print(f"Original List: {branches}\n")

    # 1. Comma with space
    print(f"', '.join(branches)  : '{', '.join(branches)}'")

    # 2. Hyphen separator
    print(f"'-'.join(branches)   : '{'-'.join(branches)}'")

    # 3. Pipe separator
    print(f"' | '.join(branches) : '{' | '.join(branches)}'")

    # 4. Multi-character arrow delimiter
    print(f"' -> '.join(branches): '{' -> '.join(branches)}'")

    # 5. Empty string "" (Direct concatenation)
    letters = ["C", "o", "d", "e", "r"]
    print(f"''.join(letters)     : '{''.join(letters)}'")

    # 6. Newline "\n" delimiter (Multi-line text block)
    bullet_list = "\n".join(f"* {b}" for b in branches)
    print(f"\nNewline Joined Output:\n{bullet_list}")


def demonstrate_delimiter_placement_rule():
    print("\n" + "=" * 65)
    print("2. DELIMITER PLACEMENT RULE: NO TRAILING SEPARATORS")
    print("=" * 65)

    # In Python, join() places the delimiter strictly BETWEEN elements.
    # It NEVER adds a leading or trailing delimiter!

    # A. Empty Iterable
    empty_res = ",".join([])
    print(f"','.join([])          -> '{empty_res}' (Length: {len(empty_res)})")

    # B. Single-Element Iterable
    single_res = ",".join(["Barrackpore"])
    print(f"','.join(['Single'])  -> '{single_res}' (No comma added!)")

    # C. Multi-Element Iterable
    multi_res = ",".join(["A", "B", "C"])
    print(f"','.join(['A','B','C'])-> '{multi_res}' (Commas only between items)")


def demonstrate_joining_strings_and_tuples():
    print("\n" + "=" * 65)
    print("3. JOINING STRINGS AS ITERABLES & TUPLES")
    print("=" * 65)

    # A string is an iterable of 1-character strings
    word = "PYTHON"
    spaced_word = " ".join(word)
    hyphen_word = "-".join(word)
    print(f"Original Word      : '{word}'")
    print(f"' '.join('{word}')   : '{spaced_word}'")
    print(f"'-'.join('{word}')   : '{hyphen_word}'\n")

    # Joining immutable tuples
    coordinate_tuple = ("22.7667 N", "88.3667 E")
    geo_str = ", ".join(coordinate_tuple)
    print(f"Tuple Joined       : '{geo_str}' (Barrackpore Coordinates)")


def explain_design_rationale():
    print("\n" + "=" * 65)
    print("4. PYTHON DESIGN RATIONALE: WHY delimiter.join()?")
    print("=" * 65)
    print("Why is it 'separator.join(list)' instead of 'list.join(separator)'?")
    print("  1. Polymorphism: join() can take ANY iterable (lists, tuples, sets,")
    print("     generators, dictionaries, open file objects), not just lists.")
    print("  2. Type Safety: The method belongs to the string type, ensuring that")
    print("     the separator is always a valid string object.")
    print("  3. Non-redundancy: If join() were on list, it would also have to be")
    print("     duplicated across tuple, set, dict, and generator classes.")


if __name__ == "__main__":
    demonstrate_basic_joining()
    demonstrate_delimiter_placement_rule()
    demonstrate_joining_strings_and_tuples()
    explain_design_rationale()
