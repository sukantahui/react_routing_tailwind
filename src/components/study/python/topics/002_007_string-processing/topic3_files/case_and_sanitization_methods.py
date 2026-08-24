# topic3_files/case_and_sanitization_methods.py
# Module: 002_007_string-processing
# Topic: Essential String Methods (upper, lower, title, strip, split, join, replace)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 3 - File 1: Case Transformation & Whitespace Sanitization Methods
Demonstrates:
  1. Case conversion: upper(), lower(), capitalize(), title(), swapcase(), casefold()
  2. Unicode caseless matching: lower() vs casefold() (German ß, Greek sigma)
  3. Whitespace trimming: strip(), lstrip(), rstrip()
  4. Custom character set stripping (and why strip removes individual chars, not substrings)
  5. Title case quirks (handling apostrophes like "O'Connor" vs capwords)
"""

import string

def demonstrate_case_transformations():
    print("=" * 65)
    print("1. CASE CONVERSION METHODS")
    print("=" * 65)

    original = "coder & accoTax bARRACkpORE"
    print(f"Original String    : '{original}'\n")

    # 1. upper(): All characters to uppercase
    print(f"original.upper()      : '{original.upper()}'")

    # 2. lower(): All characters to lowercase
    print(f"original.lower()      : '{original.lower()}'")

    # 3. capitalize(): Capitalizes ONLY the first character of the entire string
    print(f"original.capitalize() : '{original.capitalize()}'")

    # 4. title(): Capitalizes the first character of every distinct word
    print(f"original.title()      : '{original.title()}'")

    # 5. swapcase(): Inverts case of each character
    mixed = "Python 3.13 in Kolkata"
    print(f"'{mixed}'.swapcase() : '{mixed.swapcase()}'")


def demonstrate_unicode_casefold():
    print("\n" + "=" * 65)
    print("2. UNICODE CASELESS MATCHING: lower() VS casefold()")
    print("=" * 65)

    # In German, 'ß' (Eszett) is lowercase for 'SS'
    german_word = "Straße"  # German for 'Street'
    search_query = "STRASSE"

    print(f"German Word  : '{german_word}'")
    print(f"Search Query : '{search_query}'")

    # Using lower()
    match_lower = german_word.lower() == search_query.lower()
    print(f"Comparison with lower()    : {match_lower}  ('straße' != 'strasse')")

    # Using casefold() (Aggressive Unicode normalization)
    match_casefold = german_word.casefold() == search_query.casefold()
    print(f"Comparison with casefold() : {match_casefold}  ('strasse' == 'strasse') -> [MATCH!]")


def demonstrate_whitespace_sanitization():
    print("\n" + "=" * 65)
    print("3. WHITESPACE STRIPPING: strip(), lstrip(), rstrip()")
    print("=" * 65)

    messy_input = "  \t\n  Susmita Mukherjee - Barrackpore  \r\n  "
    print(f"Raw Input (repr)  : {repr(messy_input)}")

    # lstrip(): Strips leading whitespace only
    print(f"lstrip() (repr)   : {repr(messy_input.lstrip())}")

    # rstrip(): Strips trailing whitespace only
    print(f"rstrip() (repr)   : {repr(messy_input.rstrip())}")

    # strip(): Strips both leading and trailing whitespace
    cleaned = messy_input.strip()
    print(f"strip() (repr)    : {repr(cleaned)}")


def demonstrate_custom_char_stripping():
    print("\n" + "=" * 65)
    print("4. CUSTOM CHARACTER SET STRIPPING (CRITICAL GOTCHA)")
    print("=" * 65)

    # IMPORTANT: strip(chars) takes a SET of characters, not a prefix/suffix substring!
    raw_url = "https://www.codernaccotax.co.in///"
    cleaned_url = raw_url.rstrip("/")
    print(f"raw_url.rstrip('/')           : '{cleaned_url}'")

    filename = "...$$$invoice_report_2026.pdf$$$..."
    cleaned_filename = filename.strip(". $")
    print(f"filename.strip('. $')         : '{cleaned_filename}'")

    # Gotcha demonstration:
    sample = "www.example.com"
    stripped_bad = sample.strip("w.com")  # Removes ANY 'w', '.', 'c', 'o', 'm' from edges!
    print(f"'{sample}'.strip('w.com')    : '{stripped_bad}' (Notice 'e' and 'xample'!)")
    print("  -> Tip: In Python 3.9+, use removeprefix() and removesuffix() for exact substrings!")


if __name__ == "__main__":
    demonstrate_case_transformations()
    demonstrate_unicode_casefold()
    demonstrate_whitespace_sanitization()
    demonstrate_custom_char_stripping()
