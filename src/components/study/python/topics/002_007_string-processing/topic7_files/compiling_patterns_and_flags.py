# topic7_files/compiling_patterns_and_flags.py
# Module: 002_007_string-processing
# Topic: Basic Regular Expressions Concept with re Module
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 7 - File 3: Pattern Pre-Compilation (re.compile) & Core Regex Flags
Demonstrates:
  1. Performance optimization: re.compile(pattern)
  2. re.IGNORECASE (re.I): Case-insensitive pattern matching
  3. re.MULTILINE (re.M): Line-by-line anchors (^ and $)
  4. re.DOTALL (re.S): Enabling . (dot) to match newline characters
  5. re.VERBOSE (re.X): Documented, multi-line regular expressions with comments
  6. Combining flags with bitwise OR: re.I | re.M | re.X
"""

import re

def demonstrate_re_compile_performance():
    print("=" * 65)
    print("1. PATTERN PRE-COMPILATION WITH re.compile()")
    print("=" * 65)

    # Pre-compiling a regex turns the pattern string into a Pattern bytecode object
    # that can be reused millions of times with zero recompilation overhead.
    email_regex = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    
    candidates = [
        "susmita@codernaccotax.co.in",
        "student.py-2026@gmail.com",
        "invalid_email_at_domain.com",
        "admin@barrackpore.gov.in"
    ]

    for em in candidates:
        is_valid = bool(email_regex.match(em))
        status = "[VALID EMAIL]" if is_valid else "[INVALID]"
        print(f"'{em:<30}' -> {status}")


def demonstrate_core_regex_flags():
    print("\n" + "=" * 65)
    print("2. CORE REGEX FLAGS: IGNORECASE, MULTILINE & DOTALL")
    print("=" * 65)

    # A. re.IGNORECASE (re.I)
    text = "Python python PYTHON PyThOn"
    matches_case = re.findall(r"python", text, flags=re.IGNORECASE)
    print(f"re.IGNORECASE: Matched {len(matches_case)} instances in '{text}'\n")

    # B. re.MULTILINE (re.M)
    multiline_text = """2026-08-01: Session 1 Python
2026-08-02: Session 2 SQL
2026-08-03: Session 3 React"""

    # Without re.M, ^ only matches the start of the whole string.
    # With re.M, ^ matches the start of EVERY LINE.
    dates = re.findall(r"^\d{4}-\d{2}-\d{2}", multiline_text, flags=re.MULTILINE)
    print(f"re.MULTILINE: Extracted line-start dates: {dates}\n")

    # C. re.DOTALL (re.S)
    doc_block = "BEGIN_BLOCK\nStudent: Susmita Mukherjee\nCity: Barrackpore\nEND_BLOCK"
    
    # Without DOTALL, . does NOT match \n
    no_dotall = re.findall(r"BEGIN_BLOCK.*END_BLOCK", doc_block)
    print(f"Without re.DOTALL : Found {len(no_dotall)} matches (Failed across newlines)")

    # With DOTALL, . matches \n
    with_dotall = re.findall(r"BEGIN_BLOCK.*END_BLOCK", doc_block, flags=re.DOTALL)
    print(f"With re.DOTALL    : Found {len(with_dotall)} match (Successfully bridged newlines)")


def demonstrate_verbose_regex():
    print("\n" + "=" * 65)
    print("3. re.VERBOSE (re.X): READABLE, COMMENTED REGULAR EXPRESSIONS")
    print("=" * 65)

    # Complex patterns without re.VERBOSE are notoriously hard to read.
    # re.VERBOSE ignores whitespace and allows Python '#' comments inside the pattern!
    indian_pan_regex = re.compile(
        r"""
        ^                   # Start of string anchor
        [A-Z]{3}            # First 3 letters: Sequential series (e.g. ABC)
        [PCHFATBLJG]        # 4th letter: Entity category (P=Person, C=Company, etc.)
        [A-Z]               # 5th letter: Surname first letter
        [0-9]{4}            # 4 sequential digits (0001 to 9999)
        [A-Z]               # Last letter: Check character
        $                   # End of string anchor
        """,
        re.VERBOSE | re.IGNORECASE
    )

    test_pans = ["ABCDE1234F", "abcpe1234f", "12345ABCDE", "ABCDE12345"]

    print("--- Detailed PAN Card Validation with re.VERBOSE ---")
    for pan in test_pans:
        valid = bool(indian_pan_regex.match(pan))
        status = "[VALID PAN]" if valid else "[INVALID]"
        print(f"PAN: '{pan:<12}' -> {status}")


if __name__ == "__main__":
    demonstrate_re_compile_performance()
    demonstrate_core_regex_flags()
    demonstrate_verbose_regex()
