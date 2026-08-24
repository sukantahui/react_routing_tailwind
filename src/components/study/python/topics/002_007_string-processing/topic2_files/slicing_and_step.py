# topic2_files/slicing_and_step.py
# Module: 002_007_string-processing
# Topic: Indexing, Slicing, Step Slicing & Reversing Strings
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 2 - File 2: Slicing Syntax, Step Strides & Boundary Tolerance
Demonstrates:
  1. Standard Slicing: [start:stop] (Half-open interval: includes start, excludes stop)
  2. Omitting Defaults: [:stop], [start:], [:] (Full shallow copy)
  3. Step Slicing: [start:stop:step] (Skipping characters by stride)
  4. Slicing Out-of-Bounds Tolerance: Why slicing NEVER raises IndexError
  5. Practical Real-World Field Extraction: Emails, Indian Tax IDs & Dates
"""

def demonstrate_basic_slicing():
    print("=" * 60)
    print("1. BASIC SLICING & HALF-OPEN INTERVAL [start:stop)")
    print("=" * 60)
    
    phrase = "BARRACKPORE"  # Indices 0..10 (Length: 11)
    print(f"Target Phrase : '{phrase}'")
    print("Index Map     :  0 1 2 3 4 5 6 7 8 9 10")
    print("Letters       :  B A R R A C K P O R E\n")

    # Slice [0:6] takes characters at 0, 1, 2, 3, 4, 5 (Stops before index 6)
    sub1 = phrase[0:6]
    print(f"phrase[0:6]  -> '{sub1}' (Includes index 0..5, excludes 6)")

    # Slice [6:11] takes characters from index 6 to 10
    sub2 = phrase[6:11]
    print(f"phrase[6:11] -> '{sub2}' (Includes index 6..10)")

    # Property: phrase[0:k] + phrase[k:len] == phrase
    combined = phrase[0:6] + phrase[6:11]
    assert combined == phrase
    print(f"Recombined   -> '{combined}' (Matches original!)")


def demonstrate_omitted_bounds_and_steps():
    print("\n" + "=" * 60)
    print("2. OMITTED BOUNDS & STEP STRIDES")
    print("=" * 60)
    
    alphabet = "ABCDEFGHIJKLMN"
    print(f"Alphabet       : '{alphabet}' (len={len(alphabet)})")

    # Omitting start defaults to 0
    print(f"alphabet[:5]   : '{alphabet[:5]}' (First 5 characters)")

    # Omitting stop defaults to len(s)
    print(f"alphabet[8:]   : '{alphabet[8:]}' (From index 8 to end)")

    # Full copy
    full_copy = alphabet[:]
    print(f"alphabet[:]    : '{full_copy}' (Entire string copy)")

    # Step stride of 2 (Every second character: 0, 2, 4, 6...)
    step2 = alphabet[::2]
    print(f"alphabet[::2]  : '{step2}' (Even indices: A, C, E, G, I, K, M)")

    # Step stride of 3
    step3 = alphabet[::3]
    print(f"alphabet[::3]  : '{step3}' (Indices 0, 3, 6, 9, 12: A, D, G, J, M)")

    # Slice with start, stop, and step: indices 1, 3, 5, 7, 9
    custom_stride = alphabet[1:11:2]
    print(f"alphabet[1:11:2]: '{custom_stride}' (Odd indices between 1 and 10)")


def demonstrate_slicing_safety_tolerance():
    print("\n" + "=" * 60)
    print("3. SLICING OUT-OF-BOUNDS TOLERANCE (NO IndexError)")
    print("=" * 60)
    
    district = "Hooghly"  # len = 7
    print(f"District: '{district}' (Length: {len(district)})")

    # Single item access at index 100 RAISES IndexError
    try:
        val = district[100]
    except IndexError:
        print("district[100]     -> Raised IndexError (Single index is strict!)")

    # Slicing at index 100 DOES NOT raise error; returns empty string
    safe_slice1 = district[100:200]
    print(f"district[100:200] -> '{safe_slice1}' (Length: {len(safe_slice1)}) -> Completely safe!")

    # Slicing with oversized stop clamps automatically to string length
    safe_slice2 = district[2:999]
    print(f"district[2:999]   -> '{safe_slice2}' (Clamped to end of string)")


def practical_data_extraction():
    print("\n" + "=" * 60)
    print("4. PRACTICAL REAL-WORLD SLICING PARSER")
    print("=" * 60)

    # 1. Parsing standard ISO date 'YYYYMMDD'
    raw_date = "20260824"
    year = raw_date[:4]
    month = raw_date[4:6]
    day = raw_date[6:]
    formatted_date = f"{day}/{month}/{year}"
    print(f"Raw Date: '{raw_date}' -> Formatted: {formatted_date}")

    # 2. Parsing Student Enrollment Code: DEPT-YEAR-ROLL (e.g. PY-2026-0428)
    roll_code = "PY-2026-0428"
    dept = roll_code[:2]
    batch_year = roll_code[3:7]
    student_id = roll_code[8:]
    print(f"Enrollment Code: '{roll_code}' -> Dept: {dept}, Year: {batch_year}, Roll: {student_id}")

    # 3. Extracting domain name from email via slice
    email = "susmita.student@codernaccotax.co.in"
    at_index = email.index("@")
    username = email[:at_index]
    domain = email[at_index + 1:]
    print(f"Email: '{email}' -> User: '{username}', Domain: '{domain}'")


if __name__ == "__main__":
    demonstrate_basic_slicing()
    demonstrate_omitted_bounds_and_steps()
    demonstrate_slicing_safety_tolerance()
    practical_data_extraction()
