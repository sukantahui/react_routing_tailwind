# topic9_files/industrial_text_analytics_engine.py
# Module: 002_007_string-processing
# Topic: Common String Processing Algorithms (palindromes, anagrams, word counts)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 4: Enterprise Text Analytics & Course Catalog Fuzzy Search Engine
Demonstrates:
  1. Automated text mining, readability stats, and lexical density analysis
  2. Stop-word filtering & top keyword frequency distributions
  3. Fuzzy string matching for typo-tolerant course queries (Levenshtein Distance)
  4. Comprehensive analytical audit reporting
"""

import collections
import re
from typing import List, Dict, Any, Tuple

# Standard English stop words to filter out during keyword extraction
STOP_WORDS = {
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
    "has", "he", "in", "is", "it", "its", "of", "on", "that", "the",
    "to", "was", "were", "will", "with", "all", "can", "our", "you"
}

COURSE_CATALOG = [
    "Python Programming (Basic to Pro)",
    "Data Science & Machine Learning",
    "Web Development with FastAPI & React",
    "Relational Database Management with MySQL",
    "Financial Accounting & GST Compliance",
    "TailwindCSS & Modern Web UI Design"
]

class TextAnalyticsEngine:
    """Industrial text mining and fuzzy search suite."""

    @staticmethod
    def compute_lexical_metrics(text: str) -> Dict[str, Any]:
        """Calculates total words, unique vocabulary, lexical density, and reading time."""
        words = re.findall(r"\b[a-zA-Z]+\b", text.lower())
        total_words = len(words)
        unique_words = len(set(words))
        
        # Lexical density = (unique words / total words) * 100
        density = (unique_words / total_words * 100) if total_words > 0 else 0.0
        # Estimated reading time at 200 words/min
        reading_time_sec = (total_words / 200) * 60

        return {
            "total_words": total_words,
            "unique_words": unique_words,
            "lexical_density": density,
            "reading_time_sec": reading_time_sec,
            "char_count": len(text),
        }

    @staticmethod
    def extract_top_keywords(text: str, top_n: int = 5) -> List[Tuple[str, int]]:
        """Filters stop words and extracts top substantive keywords."""
        words = re.findall(r"\b[a-zA-Z]+\b", text.lower())
        filtered_words = [w for w in words if w not in STOP_WORDS and len(w) > 2]
        return collections.Counter(filtered_words).most_common(top_n)

    @staticmethod
    def levenshtein(s1: str, s2: str) -> int:
        """2D DP implementation for edit distance."""
        m, n = len(s1), len(s2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1): dp[i][0] = i
        for j in range(n + 1): dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]

    @classmethod
    def fuzzy_course_search(cls, query: str, max_distance: int = 4) -> List[Tuple[str, int]]:
        """Finds closest matching courses for a misspelled query."""
        results = []
        q_clean = query.strip().lower()
        for course in COURSE_CATALOG:
            # Check full string distance or token substring distance
            dist = cls.levenshtein(q_clean, course.lower()[:len(q_clean)])
            if dist <= max_distance:
                results.append((course, dist))
        # Sort by closest match (minimum edit distance)
        return sorted(results, key=lambda x: x[1])


def run_analytics_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - ENTERPRISE TEXT ANALYTICS & FUZZY SEARCH ENGINE")
    print("=" * 75)

    sample_curriculum = """
    Python is the core foundation at Coder & AccoTax Barrackpore.
    Our comprehensive Python programming course covers data structures, algorithms,
    regular expressions, database querying with SQL, and modern web application development.
    Students build real-world projects, write clean Python code, and master industry workflows.
    Python empowers learners to excel in software engineering and data analytics.
    """

    # 1. Lexical Metrics
    metrics = TextAnalyticsEngine.compute_lexical_metrics(sample_curriculum)
    print("\n--- 1. DOCUMENT READABILITY & LEXICAL METRICS ---")
    print(f"Total Word Tokens : {metrics['total_words']}")
    print(f"Unique Vocabulary : {metrics['unique_words']}")
    print(f"Lexical Density   : {metrics['lexical_density']:.1f}%")
    print(f"Est. Reading Time : {metrics['reading_time_sec']:.1f} seconds")

    # 2. Top Keywords
    top_kw = TextAnalyticsEngine.extract_top_keywords(sample_curriculum, top_n=5)
    print("\n--- 2. TOP KEYWORDS (AFTER STOP-WORD FILTERING) ---")
    for kw, count in top_kw:
        print(f"  * Keyword: '{kw:<14}' -> Frequency: {count}")

    # 3. Typo-Tolerant Course Search
    print("\n--- 3. FUZZY SEARCH (TYPO-TOLERANT COURSE FINDER) ---")
    misspelled_queries = ["Pythn", "FastApi", "MySql", "Tailwnd"]
    for query in misspelled_queries:
        matches = TextAnalyticsEngine.fuzzy_course_search(query)
        print(f"User Query: '{query}'")
        if matches:
            for course, dist in matches:
                print(f"  -> Match: '{course}' (Edit Distance: {dist})")
        else:
            print("  -> No matching course found.")
        print()


if __name__ == "__main__":
    run_analytics_demo()
