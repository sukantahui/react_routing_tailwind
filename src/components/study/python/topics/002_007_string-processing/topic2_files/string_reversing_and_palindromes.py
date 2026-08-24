# topic2_files/string_reversing_and_palindromes.py
# Module: 002_007_string-processing
# Topic: Indexing, Slicing, Step Slicing & Reversing Strings
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 2 - File 3: String Reversing, Negative Strides & Robust Palindrome Engine
Demonstrates:
  1. Negative step slicing: [::-1], [stop:start:-1]
  2. Performance comparison: s[::-1] vs ''.join(reversed(s)) vs manual loop
  3. Palindrome testing: Word level & phrase level (ignoring case & non-alphanumeric chars)
  4. Practical string manipulation tests
"""

import time
import string

def demonstrate_reversal_mechanics():
    print("=" * 60)
    print("1. STRING REVERSAL & NEGATIVE STRIDE MECHANICS")
    print("=" * 60)
    
    text = "PYTHON"
    print(f"Original Text : '{text}'")
    
    # 1. Full Reverse using s[::-1]
    # When step is negative:
    # default start becomes len(s)-1 (last char)
    # default stop becomes before index 0 (traverses all the way to start)
    reversed_text = text[::-1]
    print(f"text[::-1]    : '{reversed_text}'")

    # 2. Slice subset in reverse: start=4 ('O'), stop=1 ('Y'), step=-1
    # Extracts indices: 4, 3, 2 (stops before 1) -> 'O', 'H', 'T'
    sub_rev = text[4:1:-1]
    print(f"text[4:1:-1]  : '{sub_rev}' (Indices 4, 3, 2 -> 'OHT')")

    # 3. Alternative reversing via reversed() iterator
    reversed_iter = "".join(reversed(text))
    print(f"''.join(reversed(text)) : '{reversed_iter}'")


def is_palindrome_strict(text: str) -> bool:
    """Checks if a single word is an exact palindrome."""
    return text == text[::-1]


def is_palindrome_advanced(phrase: str) -> bool:
    """
    Robust Palindrome Verifier:
    1. Converts all letters to lowercase
    2. Filters out punctuation, symbols, and spaces
    3. Compares sanitized string with its reverse
    """
    # Keep only alphanumeric characters and lowercase them
    sanitized = "".join(ch.lower() for ch in phrase if ch.isalnum())
    return sanitized == sanitized[::-1]


def test_palindrome_cases():
    print("\n" + "=" * 60)
    print("2. PALINDROME VERIFICATION (WORDS & PHRASES)")
    print("=" * 60)

    test_words = ["radar", "madam", "kayak", "nayan", "level", "kolkata", "python"]
    print("--- Single Word Strict Palindrome Check ---")
    for word in test_words:
        res = is_palindrome_strict(word)
        status = "[PALINDROME]" if res else "[NOT PALINDROME]"
        print(f"'{word:<10}' -> Reversed: '{word[::-1]:<10}' -> {status}")

    print("\n--- Advanced Phrase-Level Palindrome Check ---")
    phrases = [
        "A man, a plan, a canal: Panama!",
        "Was it a car or a cat I saw?",
        "No lemon, no melon",
        "Coder & AccoTax Barrackpore",
        "Step on no pets",
        "Live on time, emit no evil"
    ]
    for p in phrases:
        res = is_palindrome_advanced(p)
        status = "[YES - PALINDROME]" if res else "[NO - NOT PALINDROME]"
        sanitized = "".join(ch.lower() for ch in p if ch.isalnum())
        print(f"Original : \"{p}\"")
        print(f"Cleaned  : \"{sanitized}\" (Rev: \"{sanitized[::-1]}\") -> {status}\n")


def benchmark_reversal_methods():
    print("=" * 60)
    print("3. BENCHMARK: s[::-1] VS reversed() VS Loop")
    print("=" * 60)

    sample = "CoderAndAccoTaxBarrackporeWestBengalIndia" * 1000  # 41,000 chars
    iterations = 500

    # Method A: Slice s[::-1] (Direct C-level memcpy in CPython)
    start_a = time.perf_counter()
    for _ in range(iterations):
        res_a = sample[::-1]
    time_a = time.perf_counter() - start_a

    # Method B: ''.join(reversed(s)) (Iterator approach)
    start_b = time.perf_counter()
    for _ in range(iterations):
        res_b = "".join(reversed(sample))
    time_b = time.perf_counter() - start_b

    # Method C: Accumulator Loop (Slow string concatenation)
    # Run only 1 iteration for safety
    start_c = time.perf_counter()
    res_c = ""
    for ch in sample[:1000]:  # only first 1,000 chars for loop demo
        res_c = ch + res_c
    time_c = time.perf_counter() - start_c

    print(f"String Size       : {len(sample):,} characters")
    print(f"Iterations        : {iterations}")
    print(f"Method A (s[::-1]): {time_a * 1000:.3f} ms (Fastest - C-level stride)")
    print(f"Method B (join)   : {time_b * 1000:.3f} ms ({time_b / time_a:.2f}x slower)")
    print(f"Method C (Loop)   : {time_c * 1000:.3f} ms (for 1,000 chars only - Avoid!)")


if __name__ == "__main__":
    demonstrate_reversal_mechanics()
    test_palindrome_cases()
    benchmark_reversal_methods()
