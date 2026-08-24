# topic9_files/word_counting_and_frequency_analysis.py
# Module: 002_007_string-processing
# Topic: Common String Processing Algorithms (palindromes, anagrams, word counts)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 2: Word Counting, N-Grams & Levenshtein Edit Distance
Demonstrates:
  1. Tokenizing & counting word frequencies using collections.Counter
  2. First non-repeating character discovery algorithm
  3. Generating word N-grams (Bigrams, Trigrams) for NLP & text analysis
  4. Levenshtein Edit Distance algorithm using 2D Dynamic Programming (DP)
"""

import collections
import re
from typing import List, Tuple

def analyze_word_frequencies(text: str) -> collections.Counter:
    """Extracts words, normalizes case, and returns frequency distribution."""
    words = re.findall(r"\b[a-zA-Z]+\b", text.lower())
    return collections.Counter(words)


def find_first_non_repeating_char(s: str) -> Tuple[str, int]:
    """
    Finds the first character that appears exactly once in the string.
    Returns: (char, index) or ('', -1) if no unique character exists.
    """
    counts = collections.Counter(s)
    for idx, ch in enumerate(s):
        if counts[ch] == 1:
            return ch, idx
    return "", -1


def generate_ngrams(words: List[str], n: int = 2) -> List[Tuple[str, ...]]:
    """Generates contiguous sequence of N items from words list."""
    return [tuple(words[i:i+n]) for i in range(len(words) - n + 1)]


def levenshtein_distance(s1: str, s2: str) -> int:
    """
    Computes minimum edit operations (insertions, deletions, substitutions)
    needed to transform s1 into s2 using 2D Dynamic Programming.
    Time Complexity: O(M * N), Space Complexity: O(M * N).
    """
    m, n = len(s1), len(s2)
    # Initialize (m+1) x (n+1) matrix
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases: cost of transforming empty string
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]  # No operation needed
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],     # Deletion from s1
                    dp[i][j - 1],     # Insertion into s1
                    dp[i - 1][j - 1]  # Substitution
                )

    return dp[m][n]


def run_demo():
    print("=" * 65)
    print("1. WORD FREQUENCY ANALYSIS")
    print("=" * 65)

    sample_doc = """
    Python is an incredible language. Python is clean, Python is powerful,
    and Python is the core technology taught at Coder & AccoTax Barrackpore.
    Students love Python because Python makes data analysis simple and intuitive.
    """

    counts = analyze_word_frequencies(sample_doc)
    print(f"Total Word Tokens : {sum(counts.values())}")
    print(f"Unique Vocabulary : {len(counts)}\n")
    print("Top 5 Most Frequent Words:")
    for word, freq in counts.most_common(5):
        print(f"  * '{word:<12}': {freq} times")

    print("\n" + "=" * 65)
    print("2. FIRST NON-REPEATING CHARACTER DISCOVERY")
    print("=" * 65)

    test_words = ["swiss", "barrackpore", "pythonprogramming", "aabbcc"]
    for w in test_words:
        ch, idx = find_first_non_repeating_char(w)
        if idx != -1:
            print(f"'{w:<18}' -> First unique: '{ch}' at index {idx}")
        else:
            print(f"'{w:<18}' -> No unique character found")

    print("\n" + "=" * 65)
    print("3. N-GRAM GENERATION (BIGRAMS & TRIGRAMS)")
    print("=" * 65)

    tokens = ["Python", "data", "science", "course", "in", "Barrackpore"]
    bigrams = generate_ngrams(tokens, n=2)
    print(f"Tokens  : {tokens}")
    print(f"Bigrams : {bigrams[:4]}...")

    print("\n" + "=" * 65)
    print("4. LEVENSHTEIN EDIT DISTANCE (FUZZY STRING MATCHING)")
    print("=" * 65)

    comparisons = [
        ("kitten", "sitting"),
        ("Python", "Pythan"),
        ("Barrackpore", "Barackpore"),
        ("algorithm", "altruism")
    ]

    for w1, w2 in comparisons:
        dist = levenshtein_distance(w1, w2)
        print(f"Distance between '{w1:<12}' and '{w2:<12}' = {dist} edit(s)")


if __name__ == "__main__":
    run_demo()
