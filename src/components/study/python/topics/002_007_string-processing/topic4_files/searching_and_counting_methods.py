# topic4_files/searching_and_counting_methods.py
# Module: 002_007_string-processing
# Topic: Searching & Validation (find, rfind, count, startswith, endswith, isdigit, isalpha)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 4 - File 1: Substring Searching, Counting & Boundary Mechanics
Demonstrates:
  1. find() vs rfind(): Substring index discovery from left and right (-1 on failure)
  2. index() vs rindex(): Strict searching (raises ValueError on failure)
  3. in and not in membership operators
  4. count(): Non-overlapping occurrence counting
  5. Searching within slice boundaries: find(sub, start, stop)
"""

def demonstrate_find_vs_index():
    print("=" * 65)
    print("1. find() VS index(): ERROR HANDLING & DISCOVERY")
    print("=" * 65)

    sentence = "Coder & AccoTax Barrackpore - Python training in Barrackpore"
    print(f"Target String: '{sentence}'\n")

    # 1. find(sub): Finds first occurrence from left, returns index (or -1)
    first_bp = sentence.find("Barrackpore")
    print(f"sentence.find('Barrackpore')  -> Index {first_bp}")

    # 2. rfind(sub): Finds last occurrence from right, returns index (or -1)
    last_bp = sentence.rfind("Barrackpore")
    print(f"sentence.rfind('Barrackpore') -> Index {last_bp}")

    # 3. Handling missing substrings with find(): Returns -1 (Safe!)
    missing_find = sentence.find("Kolkata")
    print(f"sentence.find('Kolkata')      -> {missing_find} (Safe -1 return)")

    # 4. Strict searching with index(): Raises ValueError if missing!
    try:
        sentence.index("Kolkata")
    except ValueError as err:
        print(f"sentence.index('Kolkata')     -> Caught Expected ValueError: {err}")


def demonstrate_membership_testing():
    print("\n" + "=" * 65)
    print("2. 'in' AND 'not in' MEMBERSHIP OPERATORS")
    print("=" * 65)

    email = "susmita.student@codernaccotax.co.in"
    print(f"Email: '{email}'\n")

    # Substring boolean check
    has_at = "@" in email
    has_domain = "codernaccotax" in email
    has_spam = "lottery" in email

    print(f"'@' in email             -> {has_at}")
    print(f"'codernaccotax' in email  -> {has_domain}")
    print(f"'lottery' not in email   -> {not has_spam}")


def demonstrate_occurrence_counting():
    print("\n" + "=" * 65)
    print("3. str.count(sub, start, stop): NON-OVERLAPPING OCCURRENCES")
    print("=" * 65)

    text = "Python is powerful. Python is clean. Python is fun."
    print(f"Text: '{text}'\n")

    # Total occurrences
    total_py = text.count("Python")
    print(f"text.count('Python')                  -> {total_py} times")

    # Non-overlapping count gotcha:
    # "banana" has only 1 non-overlapping "ana", not 2!
    fruit = "banana"
    print(f"'banana'.count('ana')                -> {fruit.count('ana')} (Non-overlapping rule!)")

    # Counting with start and stop bounds
    # Search only in the first 20 characters
    bounded_count = text.count("Python", 0, 20)
    print(f"text.count('Python', 0, 20)           -> {bounded_count} time (Indices 0..20)")


def find_all_occurrences_helper():
    print("\n" + "=" * 65)
    print("4. FINDING ALL OCCURRENCES (CUSTOM HELPER)")
    print("=" * 65)

    doc = "cat and dog and cat and bird and cat"
    query = "cat"

    indices = []
    start = 0
    while True:
        pos = doc.find(query, start)
        if pos == -1:
            break
        indices.append(pos)
        start = pos + len(query)  # Advance start pointer past current match

    print(f"Document : '{doc}'")
    print(f"Query    : '{query}'")
    print(f"All Found Indices: {indices} (Total: {len(indices)} matches)")


if __name__ == "__main__":
    demonstrate_find_vs_index()
    demonstrate_membership_testing()
    demonstrate_occurrence_counting()
    find_all_occurrences_helper()
