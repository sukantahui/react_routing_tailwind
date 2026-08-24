# topic9_files/palindrome_and_anagram_algorithms.py
# Module: 002_007_string-processing
# Topic: Common String Processing Algorithms (palindromes, anagrams, word counts)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 1: Palindrome Verification & Anagram Detection Algorithms
Demonstrates:
  1. Palindrome detection algorithms:
     - Fast slice reversal: s == s[::-1] (O(N) time, O(N) space)
     - Two-pointer inward scan: O(N) time, O(1) auxiliary space (ignoring non-alphanumerics)
  2. Anagram verification algorithms:
     - Sorted string comparison: sorted(s1) == sorted(s2) (O(N log N))
     - Hash table frequency comparison: collections.Counter (O(N))
  3. Anagram group clustering algorithm
"""

import collections
from typing import List, Dict

def is_palindrome_slice(s: str) -> bool:
    """Standard slice-based palindrome checker."""
    clean = "".join(c.lower() for c in s if c.isalnum())
    return clean == clean[::-1]


def is_palindrome_two_pointer(s: str) -> bool:
    """
    Two-pointer inward scan palindrome checker.
    Time Complexity: O(N), Space Complexity: O(1) auxiliary space.
    """
    left = 0
    right = len(s) - 1

    while left < right:
        # Advance left pointer if non-alphanumeric
        while left < right and not s[left].isalnum():
            left += 1
        # Decrement right pointer if non-alphanumeric
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True


def are_anagrams_sorted(s1: str, s2: str) -> bool:
    """Sorting approach: O(N log N) time."""
    clean1 = "".join(c.lower() for c in s1 if c.isalnum())
    clean2 = "".join(c.lower() for c in s2 if c.isalnum())
    return sorted(clean1) == sorted(clean2)


def are_anagrams_counter(s1: str, s2: str) -> bool:
    """Hash map frequency approach: O(N) time, O(1) space for 26 alphabet letters."""
    clean1 = [c.lower() for c in s1 if c.isalnum()]
    clean2 = [c.lower() for c in s2 if c.isalnum()]
    return collections.Counter(clean1) == collections.Counter(clean2)


def group_anagrams(words: List[str]) -> Dict[str, List[str]]:
    """Groups words into anagram clusters using character frequency tuples as keys."""
    clusters = collections.defaultdict(list)
    for w in words:
        # Sorted character tuple as canonical key
        canonical_key = "".join(sorted(w.lower()))
        clusters[canonical_key].append(w)
    return dict(clusters)


def run_demo():
    print("=" * 65)
    print("1. PALINDROME ALGORITHM VERIFICATION")
    print("=" * 65)

    test_palindromes = [
        "Racecar",
        "A man, a plan, a canal: Panama!",
        "Was it a car or a cat I saw?",
        "Coder & AccoTax Barrackpore",
        "No 'x' in Nixon",
        "Madam, I'm Adam"
    ]

    for p in test_palindromes:
        is_pal = is_palindrome_two_pointer(p)
        status = "[PALINDROME]" if is_pal else "[NOT PALINDROME]"
        print(f"'{p:<35}' -> {status}")

    print("\n" + "=" * 65)
    print("2. ANAGRAM VERIFICATION (COUNTER O(N) METHOD)")
    print("=" * 65)

    anagram_pairs = [
        ("listen", "silent"),
        ("Debit Card", "Bad Credit"),
        ("Conversation", "Voices, rant on!"),
        ("Python", "Java"),
        ("The eyes", "They see")
    ]

    for w1, w2 in anagram_pairs:
        is_ana = are_anagrams_counter(w1, w2)
        status = "[ANAGRAMS]" if is_ana else "[NOT ANAGRAMS]"
        print(f"'{w1:<15}' vs '{w2:<18}' -> {status}")

    print("\n" + "=" * 65)
    print("3. ANAGRAM GROUPING & CLUSTERING")
    print("=" * 65)

    word_pool = ["eat", "tea", "tan", "ate", "nat", "bat", "silent", "listen"]
    grouped = group_anagrams(word_pool)
    print(f"Input Words : {word_pool}\n")
    print("Clustered Anagram Buckets:")
    for key, cluster in grouped.items():
        print(f"  Key '{key:<6}': {cluster}")


if __name__ == "__main__":
    run_demo()
