# topic2_files/indexing_and_bounds.py
# Module: 002_007_string-processing
# Topic: Indexing, Slicing, Step Slicing & Reversing Strings
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 2 - File 1: Positive and Negative Indexing & Boundary Safety
Demonstrates:
  1. Positive 0-based indexing (0 to N-1)
  2. Negative indexing (-1 to -N)
  3. Python has no 'char' data type: single-character access returns a 'str' of len 1
  4. IndexError behavior on out-of-bounds single-character indexing
  5. Defensive indexing using len() and custom safe getter
"""

def demonstrate_indexing_basics():
    institute_name = "Coder & AccoTax Barrackpore"
    total_len = len(institute_name)
    
    print("=" * 60)
    print("1. POSITIVE & NEGATIVE INDEXING BASICS")
    print("=" * 60)
    print(f"Target String : '{institute_name}'")
    print(f"Total Length  : {total_len} characters\n")

    # Positive indexing (Left to Right: 0 to len - 1)
    first_char = institute_name[0]
    fifth_char = institute_name[4]
    last_pos_char = institute_name[total_len - 1]
    
    print(f"First character institute_name[0]  : '{first_char}' (Type: {type(first_char).__name__})")
    print(f"Fifth character institute_name[4]  : '{fifth_char}'")
    print(f"Last positive   institute_name[{total_len - 1}] : '{last_pos_char}'\n")

    # Negative indexing (Right to Left: -1 to -len)
    last_char = institute_name[-1]
    second_last = institute_name[-2]
    first_neg_char = institute_name[-total_len]
    
    print(f"Last character  institute_name[-1] : '{last_char}'")
    print(f"Second last     institute_name[-2] : '{second_last}'")
    print(f"First character institute_name[-{total_len}]: '{first_neg_char}'")
    
    # Verification of symmetry
    assert institute_name[0] == institute_name[-total_len]
    assert institute_name[total_len - 1] == institute_name[-1]
    print("\n[Assertion Passed] institute_name[0] == institute_name[-len] and [len-1] == [-1]")


def demonstrate_index_error_and_safety():
    print("\n" + "=" * 60)
    print("2. BOUNDARY SAFETY & IndexError TRAPS")
    print("=" * 60)
    city = "Kolkata"  # len = 7, valid positive: 0..6, valid negative: -7..-1
    print(f"String: '{city}' (len = {len(city)})")

    # Direct Out-of-Bounds Positive Access
    try:
        invalid_char = city[7]  # Index 7 does not exist
    except IndexError as err:
        print(f"Caught Expected Error for city[7]  : {type(err).__name__} -> {err}")

    # Direct Out-of-Bounds Negative Access
    try:
        invalid_neg = city[-8]  # Index -8 is out of bounds
    except IndexError as err:
        print(f"Caught Expected Error for city[-8] : {type(err).__name__} -> {err}")

    # Safe Character Extraction Utility Function
    def safe_char_at(text: str, index: int, default: str = "") -> str:
        """Defensively retrieves a character by index without raising IndexError."""
        try:
            return text[index]
        except (IndexError, TypeError):
            return default

    print("\nTesting safe_char_at utility:")
    print(f"safe_char_at('{city}', 0)   -> '{safe_char_at(city, 0)}'")
    print(f"safe_char_at('{city}', 5)   -> '{safe_char_at(city, 5)}'")
    print(f"safe_char_at('{city}', 100) -> '{safe_char_at(city, 100, default='[NOT_FOUND]')}'")
    print(f"safe_char_at('{city}', -10) -> '{safe_char_at(city, -10, default='[NOT_FOUND]')}'")


if __name__ == "__main__":
    demonstrate_indexing_basics()
    demonstrate_index_error_and_safety()
