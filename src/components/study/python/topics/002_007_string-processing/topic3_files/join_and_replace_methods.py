# topic3_files/join_and_replace_methods.py
# Module: 002_007_string-processing
# Topic: Essential String Methods (upper, lower, title, strip, split, join, replace)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 3 - File 3: String Joining, Replacement & Chained Pipeline Transformation
Demonstrates:
  1. delimiter.join(iterable): Fast O(N) sequence stitching
  2. Handling non-string iterables defensively via map(str, ...)
  3. replace(old, new, count): Substring replacement and limit counts
  4. Method Chaining: Fluent sanitization pipelines (.strip().lower().replace())
  5. join() vs '+=' loop performance benchmark
"""

import time

def demonstrate_join_mechanics():
    print("=" * 65)
    print("1. delimiter.join(iterable) MECHANICS")
    print("=" * 65)

    words = ["Python", "Tutorial", "Barrackpore", "Coder", "AccoTax"]
    print(f"Word List: {words}\n")

    # Joining with different delimiters
    print(f"' '.join(words)  : '{' '.join(words)}'")
    print(f"'-'.join(words)  : '{'-'.join(words)}'")
    print(f"', '.join(words) : '{', '.join(words)}'")
    print(f"'///'.join(words): '{'///'.join(words)}'")
    print(f"''.join(words)   : '{''.join(words)}' (Direct concatenation)\n")

    # Defensive Joining of Mixed Data Types
    mixed_data = ["Order #", 9402, " Amount: INR ", 4500.50, " (", True, ")"]
    try:
        bad_join = "".join(mixed_data)  # Raises TypeError: sequence item 1: expected str instance, int found
    except TypeError as err:
        print(f"Direct join on non-strings -> Caught TypeError: {err}")

    # Proper way: convert each item to string
    safe_join = "".join(str(item) for item in mixed_data)
    print(f"Defensive join via str()   -> '{safe_join}'")


def demonstrate_replace_mechanics():
    print("\n" + "=" * 65)
    print("2. str.replace(old, new, count) MECHANICS")
    print("=" * 65)

    paragraph = "Python is fast. Python is elegant. Python is popular in Kolkata."
    print(f"Original Text:\n  '{paragraph}'\n")

    # Replace ALL occurrences (default count = -1)
    rep_all = paragraph.replace("Python", "Python 3")
    print(f"replace('Python', 'Python 3'):\n  '{rep_all}'\n")

    # Replace with limited count (e.g. only the first occurrence)
    rep_first = paragraph.replace("Python", "Python 3", 1)
    print(f"replace('Python', 'Python 3', count=1):\n  '{rep_first}'\n")

    # Deleting substrings by replacing with empty string ""
    raw_phone = "+91 (700) 375-6860"
    clean_digits = raw_phone.replace("+91", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "")
    print(f"Clean Phone: '{raw_phone}' -> '{clean_digits}'")


def demonstrate_method_chaining():
    print("\n" + "=" * 65)
    print("3. FLUENT METHOD CHAINING (PIPELINE SANITIZATION)")
    print("=" * 65)

    raw_user_input = "  \t  sUKaNTA HUI - BARRACKPORE \n  "
    print(f"Raw Input : {repr(raw_user_input)}")

    # Chain: strip whitespace -> lower case -> replace hyphen with bullet -> title case
    sanitized = (
        raw_user_input
        .strip()
        .replace("-", "|")
        .title()
    )
    print(f"Chained   : '{sanitized}'")


def benchmark_join_vs_concat():
    print("\n" + "=" * 65)
    print("4. PERFORMANCE BENCHMARK: join() VS += LOOP CONCATENATION")
    print("=" * 65)

    tokens = [f"Token_{i}" for i in range(10000)]  # 10,000 strings

    # Method A: ''.join(tokens) (Pre-allocates total buffer, O(N))
    start_join = time.perf_counter()
    res_join = ",".join(tokens)
    time_join = time.perf_counter() - start_join

    # Method B: Loop with += (O(N^2) reallocation)
    start_loop = time.perf_counter()
    res_loop = ""
    for tok in tokens:
        if res_loop:
            res_loop += ","
        res_loop += tok
    time_loop = time.perf_counter() - start_loop

    print(f"Tokens Count : {len(tokens):,} strings")
    print(f"join() Time  : {time_join * 1000:.3f} ms (Fastest - Single Allocation)")
    print(f"+= Loop Time : {time_loop * 1000:.3f} ms ({time_loop / time_join:.2f}x slower)")


if __name__ == "__main__":
    demonstrate_join_mechanics()
    demonstrate_replace_mechanics()
    demonstrate_method_chaining()
    benchmark_join_vs_concat()
