# topic3_files/split_and_partition_methods.py
# Module: 002_007_string-processing
# Topic: Essential String Methods (upper, lower, title, strip, split, join, replace)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 3 - File 2: String Splitting, Line Parsing & 3-Tuple Partitioning
Demonstrates:
  1. split() vs split(" "): The whitespace collapse rule
  2. rsplit() and maxsplit parameter
  3. splitlines() for multi-line document parsing (keepends flag)
  4. partition() & rpartition(): Guaranteed 3-tuple (head, sep, tail)
  5. Practical key-value and URL query string parsing
"""

def demonstrate_split_whitespace_vs_sep():
    print("=" * 65)
    print("1. split() VS split(' '): WHITESPACE COLLAPSE RULE")
    print("=" * 65)

    sentence = "Python    is   awesome   in   Barrackpore"
    print(f"Original Text : '{sentence}'\n")

    # Default split() with NO ARGUMENTS:
    # Groups consecutive whitespace (spaces, tabs, newlines) and discards empty items
    words_default = sentence.split()
    print(f"sentence.split()    : {words_default} (Clean words, 5 items)")

    # Explicit split(' ') with a single space:
    # Does NOT collapse consecutive spaces; preserves empty strings ''
    words_explicit = sentence.split(" ")
    print(f"sentence.split(' ') : {words_explicit} (Preserves empty slots, {len(words_explicit)} items)")


def demonstrate_maxsplit_and_rsplit():
    print("\n" + "=" * 65)
    print("2. MAXSPLIT & RSPLIT() MECHANICS")
    print("=" * 65)

    log_entry = "2026-08-24 ERROR DatabaseConnectionFailed Timeout at 10.0.0.1"
    print(f"Log Entry: '{log_entry}'\n")

    # Split from left with maxsplit=2:
    # Extracts timestamp, level, and leaves the entire remaining message intact
    parts_left = log_entry.split(" ", maxsplit=2)
    print(f"split(' ', maxsplit=2)  -> {parts_left}")
    print(f"  * Date    : {parts_left[0]}")
    print(f"  * Level   : {parts_left[1]}")
    print(f"  * Message : {parts_left[2]}\n")

    # rsplit from right with maxsplit=1:
    # Splits only the last word
    filepath = "users/sukantahui/documents/python_tutorial.pdf"
    folder_and_file = filepath.rsplit("/", maxsplit=1)
    print(f"File Path: '{filepath}'")
    print(f"rsplit('/', maxsplit=1) -> Dir: '{folder_and_file[0]}', File: '{folder_and_file[1]}'")


def demonstrate_partition_vs_split():
    print("\n" + "=" * 65)
    print("3. partition() & rpartition(): GUARANTEED 3-TUPLE")
    print("=" * 65)

    # partition() splits at the FIRST occurrence of separator into: (head, sep, tail)
    config_line = "DATABASE_URL = postgresql://user:pass@localhost:5432/main_db"
    key, sep, val = config_line.partition("=")
    print(f"Config String: '{config_line}'")
    print(f"partition('='):")
    print(f"  * Key   : '{key.strip()}'")
    print(f"  * Sep   : '{sep}'")
    print(f"  * Value : '{val.strip()}'\n")

    # Behavior when separator is NOT found: returns (original_str, '', '')
    missing_sep = "DEBUG_MODE_ENABLED"
    k2, s2, v2 = missing_sep.partition("=")
    print(f"Missing sep partition('='): ('{k2}', '{s2}', '{v2}') -> Zero Exception Risk!\n")

    # rpartition() splits at the LAST occurrence
    domain_record = "sub.api.codernaccotax.co.in"
    prefix, sep, suffix = domain_record.rpartition(".")
    print(f"Domain: '{domain_record}'")
    print(f"rpartition('.'): Prefix: '{prefix}', TLD: '{suffix}'")


def demonstrate_splitlines():
    print("\n" + "=" * 65)
    print("4. splitlines(): MULTI-LINE DOCUMENT PARSING")
    print("=" * 65)

    receipt = "CODER & ACCOTAX\nINVOICE #9402\nAMOUNT: INR 4500\nSTATUS: PAID"
    lines = receipt.splitlines()
    print("receipt.splitlines():")
    for i, line in enumerate(lines, 1):
        print(f"  Line {i}: '{line}'")

    # With keepends=True: Preserves \n line endings
    lines_keepends = receipt.splitlines(keepends=True)
    print(f"\nsplitlines(keepends=True) repr: {repr(lines_keepends)}")


if __name__ == "__main__":
    demonstrate_split_whitespace_vs_sep()
    demonstrate_maxsplit_and_rsplit()
    demonstrate_partition_vs_split()
    demonstrate_splitlines()
