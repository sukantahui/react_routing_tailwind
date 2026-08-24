# topic8_files/matching_methods_and_match_objects.py
# Module: 002_007_string-processing
# Topic: Pattern Matching (search, match, findall, sub)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 1: search() vs match() vs fullmatch() & The Match Object Anatomy
Demonstrates:
  1. The 3 primary match methods:
     - re.match(): Matches ONLY at the start (index 0) of the string.
     - re.search(): Scans anywhere in the string for the FIRST match.
     - re.fullmatch(): Entire string must match from start to finish.
  2. The Match Object:
     - .group(0) / .group(): Full matched text
     - .group(1), .group(2): Positional captured subgroups
     - .groups(): Tuple of all captured subgroups
     - .groupdict(): Dictionary of named captured groups (?P<name>...)
     - .start(), .end(), .span(): Substring boundary coordinates
"""

import re

def demonstrate_match_vs_search_vs_fullmatch():
    print("=" * 65)
    print("1. re.match() VS re.search() VS re.fullmatch()")
    print("=" * 65)

    sample = "Student Susmita (ID: 9402) enrolled from Barrackpore."
    pattern_num = r"\d+"

    # A. re.match() - Looks ONLY at index 0
    match_res = re.match(pattern_num, sample)
    print(f"Sample: '{sample}'")
    print(f"Pattern: r'\\d+'\n")
    print(f"re.match(pattern, sample)     -> {match_res} (None! Sample starts with 'S')")

    # B. re.search() - Scans through entire string for FIRST match
    search_res = re.search(pattern_num, sample)
    print(f"re.search(pattern, sample)    -> Match Found: '{search_res.group()}' at index {search_res.span()}")

    # C. re.fullmatch() - Entire string must match pattern
    full_sample = "9402"
    full_res = re.fullmatch(pattern_num, full_sample)
    print(f"re.fullmatch(r'\\d+', '9402')  -> Match Found: '{full_res.group()}' (Full match)")
    print(f"re.fullmatch(r'\\d+', sample)  -> {re.fullmatch(pattern_num, sample)} (None - contains non-digits)")


def demonstrate_match_object_anatomy():
    print("\n" + "=" * 65)
    print("2. THE Match OBJECT ANATOMY & POSITIONAL GROUPS")
    print("=" * 65)

    date_str = "Session Date: 2026-08-24 (Monday)"
    # Pattern with 3 positional groups: (Year)-(Month)-(Day)
    date_pattern = r"(\d{4})-(\d{2})-(\d{2})"

    m = re.search(date_pattern, date_str)
    if m:
        print(f"Target Text        : '{date_str}'")
        print(f"Pattern            : r'(\\d{{4}})-(\\d{{2}})-(\\d{{2}})'\n")
        print(f"m.group() / .group(0): '{m.group(0)}' (Full Match)")
        print(f"m.group(1) (Year)  : '{m.group(1)}'")
        print(f"m.group(2) (Month) : '{m.group(2)}'")
        print(f"m.group(3) (Day)   : '{m.group(3)}'")
        print(f"m.groups() (Tuple) : {m.groups()}")
        print(f"m.start(), m.end() : {m.start()} to {m.end()}")
        print(f"m.span()           : {m.span()} (Slice: date_str[{m.start()}:{m.end()}])")


def demonstrate_named_capture_groups():
    print("\n" + "=" * 65)
    print("3. NAMED CAPTURE GROUPS (?P<name>...) & groupdict()")
    print("=" * 65)

    invoice_entry = "Invoice: INV-000942 | Amount: INR 14,337.00 | City: Barrackpore"
    
    # Named capture groups: (?P<inv_id>\d+), (?P<amount>[\d,]+\.\d{2}), (?P<city>\w+)
    named_pattern = re.compile(
        r"Invoice:\s*INV-(?P<inv_id>\d+)\s*\|\s*Amount:\s*INR\s*(?P<amount>[\d,]+\.\d{2})\s*\|\s*City:\s*(?P<city>\w+)"
    )

    m = named_pattern.search(invoice_entry)
    if m:
        print(f"Entry: '{invoice_entry}'\n")
        print(f"m.group('inv_id')  : '{m.group('inv_id')}'")
        print(f"m.group('amount')  : '{m.group('amount')}'")
        print(f"m.group('city')    : '{m.group('city')}'")
        print(f"\nm.groupdict()      :\n  {m.groupdict()}")


if __name__ == "__main__":
    demonstrate_match_vs_search_vs_fullmatch()
    demonstrate_match_object_anatomy()
    demonstrate_named_capture_groups()
