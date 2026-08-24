# topic7_files/shorthand_character_classes_and_quantifiers.py
# Module: 002_007_string-processing
# Topic: Basic Regular Expressions Concept with re Module
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Shorthand Character Classes & Greedy vs Lazy Quantifiers
Demonstrates:
  1. Predefined shorthands: \d vs \D, \w vs \W, \s vs \S
  2. Quantifier mechanics: *, +, ?, {n}, {m,n}, {m,}
  3. The classic HTML trap: Greedy (.*) vs Lazy/Non-Greedy (.*?)
  4. Phone numbers and alphanumeric token extraction
"""

import re

def demonstrate_shorthand_classes():
    print("=" * 65)
    print("1. PREDEFINED SHORTHAND CHARACTER CLASSES")
    print("=" * 65)

    log_entry = "User_942 (Susmita Mukherjee) paid INR 4500.00 at 18:30:15."
    print(f"Target String: '{log_entry}'\n")

    # \d = digits [0-9], \D = non-digits
    all_digits = re.findall(r"\d+", log_entry)
    print(f"\\d+ (All numeric groups)    : {all_digits}")

    # \w = word characters [a-zA-Z0-9_], \W = non-word symbols
    all_words = re.findall(r"\w+", log_entry)
    print(f"\\w+ (All word identifiers)  : {all_words[:6]}...")

    # \s = whitespace [ \t\n\r], \S = non-whitespace
    non_spaces = re.findall(r"\S+", log_entry)
    print(f"\\S+ (Non-whitespace chunks) : {len(non_spaces)} tokens")


def demonstrate_quantifiers_matrix():
    print("\n" + "=" * 65)
    print("2. QUANTIFIERS: EXACT, RANGES & OPTIONAL MATCHES")
    print("=" * 65)

    # Validating PIN code (exactly 6 digits: \d{6})
    pin_samples = ["700120", "700025", "12345", "7001201"]
    pin_regex = re.compile(r"^\d{6}$")

    print("--- 6-Digit PIN Code Validation (\\d{6}) ---")
    for pin in pin_samples:
        status = "[VALID PIN]" if pin_regex.match(pin) else "[INVALID]"
        print(f"PIN: '{pin:<10}' -> {status}")

    # Optional prefix test (+91 or 0) using (?:...)?
    phones = ["+917003756860", "07003756860", "7003756860", "98765"]
    phone_regex = re.compile(r"^(?:\+91|0)?[6-9]\d{9}$")

    print("\n--- 10-Digit Mobile Validation with Optional (+91|0)? ---")
    for ph in phones:
        status = "[VALID MOBILE]" if phone_regex.match(ph) else "[INVALID]"
        print(f"Phone: '{ph:<15}' -> {status}")


def demonstrate_greedy_vs_lazy():
    print("\n" + "=" * 65)
    print("3. GREEDY (.*) VS LAZY / NON-GREEDY (.*?) MATCHING")
    print("=" * 65)

    html_snippet = "<p>First Paragraph</p><p>Second Paragraph</p><p>Third Paragraph</p>"
    print(f"Target HTML Snippet:\n  '{html_snippet}'\n")

    # Greedy quantifier (.*): Consumes as MUCH text as possible up to the LAST </p>
    greedy_pattern = r"<p>.*</p>"
    greedy_matches = re.findall(greedy_pattern, html_snippet)
    print("A. GREEDY MATCH (r'<p>.*</p>'):")
    print(f"   Match count : {len(greedy_matches)}")
    print(f"   Captured    : '{greedy_matches[0]}'")
    print("   -> CAUTION: Swallowed ALL paragraphs into a single match!\n")

    # Lazy quantifier (.*?): Stops at the VERY FIRST matching </p>
    lazy_pattern = r"<p>.*?</p>"
    lazy_matches = re.findall(lazy_pattern, html_snippet)
    print("B. LAZY / NON-GREEDY MATCH (r'<p>.*?</p>'):")
    print(f"   Match count : {len(lazy_matches)}")
    for i, m in enumerate(lazy_matches, 1):
        print(f"   Match {i}     : '{m}'")
    print("   -> SUCCESS: Correctly extracted each distinct paragraph tag!")


if __name__ == "__main__":
    demonstrate_shorthand_classes()
    demonstrate_quantifiers_matrix()
    demonstrate_greedy_vs_lazy()
