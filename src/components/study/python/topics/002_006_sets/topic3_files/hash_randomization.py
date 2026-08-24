# ====================================================================
# Topic 3: Unordered and Unindexed Collections
# File: hash_randomization.py
# Description: Demonstrating Python's Security Hash Seed Randomization (PYTHONHASHSEED)
# ====================================================================

import sys

print("Python Version:", sys.version.split()[0])
print("Hash width:", sys.hash_info.width, "bits")

# Testing string hashes in the current session
word1 = "Barrackpore"
word2 = "Kolkata"

print(f"\nSession Hash for '{word1}': {hash(word1)}")
print(f"Session Hash for '{word2}': {hash(word2)}")

print("\n[NOTE]: In a fresh Python process, hash('Barrackpore') will change")
print("due to PYTHONHASHSEED randomization, proving sets cannot guarantee order!")

# Integer hash comparison (integers are NOT randomized)
print(f"\nInteger Hash for 100: {hash(100)} (Always matches in CPython)")
print(f"Integer Hash for -2:  {hash(-2)}  (Always matches in CPython)")
