# ====================================================================
# Topic 14: Set Comprehension
# File: filtering_conditional_comprehensions.py
# Description: Conditional filtering inside set comprehensions (with if clauses)
# ====================================================================

# Dataset of candidate records from Barrackpore & Kolkata
candidates = [
    {"name": "Susmita Roy", "score": 92, "certified": True},
    {"name": "Debangshu Mukherjee", "score": 88, "certified": True},
    {"name": "Mamata Banerjee", "score": 95, "certified": True},
    {"name": "Rohan Sharma", "score": 45, "certified": False},
    {"name": "Abhronila Das", "score": 78, "certified": True},
    {"name": "Pooja Verma", "score": 38, "certified": False},
]

# 1. Extracting unique names of candidates scoring >= 80 and certified
top_candidates = {c["name"] for c in candidates if c["score"] >= 80 and c["certified"]}
print("Top Certified Candidates (Score >= 80):", top_candidates)

# 2. Extracting distinct word lengths from a text passage
sentence = "Learn Python programming in Barrackpore and build scalable web applications"
unique_word_lengths = {len(word) for word in sentence.split() if len(word) > 4}
print("\nUnique Word Lengths (> 4 chars):", unique_word_lengths)

# 3. Filtering vowels from a text string
text = "The quick brown fox jumps over the lazy dog"
unique_vowels = {char.lower() for char in text if char.lower() in "aeiou"}
print("Distinct Vowels Found:", unique_vowels)
