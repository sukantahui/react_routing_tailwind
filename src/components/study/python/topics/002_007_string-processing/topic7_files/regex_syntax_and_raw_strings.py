# topic7_files/regex_syntax_and_raw_strings.py
# Module: 002_007_string-processing
# Topic: Basic Regular Expressions Concept with re Module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: Regex Fundamentals, Raw Strings & Core Metacharacters
Demonstrates:
  1. The "Backslash Plague" & why raw strings r"..." are mandatory in regex
  2. Core metacharacters: . (any char), ^ (start), $ (end), | (or)
  3. Character sets [abc], ranges [a-z0-9], and negated sets [^0-9]
  4. Word boundaries: \b (word edge) and \B (non-word boundary)
"""

import re

def demonstrate_raw_strings_and_backslash_plague():
    print("=" * 65)
    print("1. THE BACKSLASH PLAGUE & RAW STRINGS r'...'")
    print("=" * 65)
    print("""
Why Python Regex MUST Use Raw Strings:
  * In normal Python strings, '\\' is an escape character (e.g. '\\n' = newline).
  * In regex syntax, '\\' is also an escape character (e.g. '\\d' = digit, '\\b' = boundary).
  * Without raw strings:
      To match a literal backslash '\\', Python needs '\\\\' which regex compiles to '\\'.
      To write '\\b' (word boundary) without raw strings, Python treats '\\b' as ASCII backspace!
  * With raw strings (r"..."):
      Backslashes are preserved literally without Python escape interpretation.
""")

    # Word boundary example
    text = "The cat scattered the catalog into the cattle barn."
    
    # Matching isolated whole word "cat" with \b boundaries
    raw_pattern = r"\bcat\b"
    matches = re.findall(raw_pattern, text)
    print(f"Target Text : '{text}'")
    print(f"Pattern     : r'\\bcat\\b' (Whole word only)")
    print(f"Matches     : {matches} (Found exact count: {len(matches)})\n")


def demonstrate_character_sets_and_ranges():
    print("=" * 65)
    print("2. CHARACTER SETS [abc], RANGES [a-z], & NEGATED SETS [^...]")
    print("=" * 65)

    sample_text = "Susmita scored 98 in Python, 85 in SQL, and 72 in React (2026 Batch)."
    print(f"Sample Text: '{sample_text}'\n")

    # 1. Custom character set: vowels
    vowels = re.findall(r"[aeiouAEIOU]", sample_text)
    print(f"Vowels [aeiouAEIOU]       : Total {len(vowels)} vowels found")

    # 2. Character ranges: 2-digit marks [0-9][0-9]
    scores = re.findall(r"\b[0-9]{2}\b", sample_text)
    print(f"Two-digit scores [0-9]{{2}} : {scores}")

    # 3. Negated set: [^0-9] (Any non-digit character)
    clean_text = "".join(re.findall(r"[^0-9]", sample_text))
    print(f"Text with digits stripped : '{clean_text.strip()}'")


def demonstrate_anchors_and_alternation():
    print("\n" + "=" * 65)
    print("3. ANCHORS (^, $) AND ALTERNATION (|)")
    print("=" * 65)

    urls = [
        "https://codernaccotax.co.in",
        "http://barrackpore.gov.in",
        "ftp://backup.server.local",
        "invalid_web_url"
    ]

    # Pattern: Must START with http:// or https://, and END with .in or .com
    anchor_pattern = r"^(https?|ftp)://.*?\.(in|com|gov\.in|local)$"

    for u in urls:
        matched = bool(re.search(anchor_pattern, u))
        status = "[VALID URL]" if matched else "[INVALID/UNMATCHED]"
        print(f"'{u:<30}' -> {status}")


if __name__ == "__main__":
    demonstrate_raw_strings_and_backslash_plague()
    demonstrate_character_sets_and_ranges()
    demonstrate_anchors_and_alternation()
