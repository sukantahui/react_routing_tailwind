# topic6_files/iterables_and_type_casting.py
# Module: 002_007_string-processing
# Topic: Joining Lists of Strings with join()
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 6 - File 2: Handling Non-String Iterables, Type Casting & Dictionary Joining
Demonstrates:
  1. The common TypeError: sequence item 0: expected str instance, int found
  2. The 3 defensive casting patterns: list comp, map(str, ...), generator expr
  3. Joining dictionaries: keys, values, and formatted (key, value) pairs
  4. Joining sets and lazy generators
  5. Formatting SQL WHERE clause and URL query parameters with join()
"""

def demonstrate_type_error_and_solutions():
    print("=" * 65)
    print("1. THE TYPEERROR TRAP & DEFENSIVE CASTING PATTERNS")
    print("=" * 65)

    student_scores = [95, 88, 76, 92, 100]
    print(f"Original Numeric List: {student_scores} (Integers)\n")

    # A. Direct join causes TypeError
    try:
        ", ".join(student_scores)
    except TypeError as err:
        print(f"Direct join(scores) -> Caught Expected TypeError:\n  {err}\n")

    # Pattern 1: Generator Expression (Memory Efficient)
    res_gen = ", ".join(str(s) for s in student_scores)
    print(f"Pattern 1 (Generator) : '{res_gen}'")

    # Pattern 2: map(str, iterable) (Functional & Fast in C)
    res_map = ", ".join(map(str, student_scores))
    print(f"Pattern 2 (map)       : '{res_map}'")

    # Pattern 3: List Comprehension with f-string formatting
    res_fstr = ", ".join(f"{s}%" for s in student_scores)
    print(f"Pattern 3 (Formatted) : '{res_fstr}'")


def demonstrate_dictionary_joining():
    print("\n" + "=" * 65)
    print("2. JOINING DICTIONARIES: KEYS, VALUES & KEY-VALUE PAIRS")
    print("=" * 65)

    student_profile = {
        "name": "Susmita Mukherjee",
        "course": "Python Pro",
        "center": "Barrackpore",
        "roll": "PY-9402",
        "active": True
    }
    print(f"Target Dictionary:\n  {student_profile}\n")

    # A. Default join on dict: JOINS THE KEYS ONLY!
    joined_keys = ", ".join(student_profile)
    print(f"', '.join(dict)        : '{joined_keys}' (Keys Only!)\n")

    # B. Joining dictionary values with map(str, ...)
    joined_values = " | ".join(map(str, student_profile.values()))
    print(f"' | '.join(values())   : '{joined_values}'\n")

    # C. Generating URL Query Parameters (key=value&...)
    url_params = "&".join(f"{k}={v}" for k, v in student_profile.items())
    print(f"URL Query String Params: '{url_params}'\n")

    # D. Generating SQL UPDATE / SET Clause
    sql_set = ", ".join(f"{k} = '{v}'" for k, v in student_profile.items())
    print(f"SQL SET Clause         : 'SET {sql_set}'")


def demonstrate_joining_sets_and_generators():
    print("\n" + "=" * 65)
    print("3. JOINING SETS & LAZY GENERATOR PIPELINES")
    print("=" * 65)

    # Joining sets (Note: Set order is arbitrary)
    unique_skills = {"Python", "SQL", "Pandas", "TailwindCSS", "React"}
    skills_csv = ", ".join(sorted(unique_skills))  # Sort first for deterministic output
    print(f"Sorted Set Joined: '{skills_csv}'\n")

    # Lazy generator pipeline (Filter even numbers and format as hex)
    even_hex = " - ".join(f"0x{n:02X}" for n in range(1, 20) if n % 2 == 0)
    print(f"Generator Pipeline (Even Hex): '{even_hex}'")


if __name__ == "__main__":
    demonstrate_type_error_and_solutions()
    demonstrate_dictionary_joining()
    demonstrate_joining_sets_and_generators()
