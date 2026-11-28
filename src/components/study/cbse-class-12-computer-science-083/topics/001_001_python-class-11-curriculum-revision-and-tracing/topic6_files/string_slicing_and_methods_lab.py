# =====================================================================
# CBSE Class 12 Computer Science (083) - Revision Lab
# Topic 6: String Processing: Indexing, Slicing [start:stop:step] & Built-in Methods
# =====================================================================

text = "CBSE-Class-XII-CS-083"

# 1. Forward and Negative Indexing
print(f"Original String: '{text}', Length: {len(text)}")
print(f"First character text[0]: '{text[0]}'")
print(f"Last character text[-1]: '{text[-1]}'")

# 2. Slicing S[start:stop:step]
print("\n--- Slicing Mechanics ---")
print("text[0:4]:", text[0:4])         # 'CBSE'
print("text[5:10]:", text[5:10])       # 'Class'
print("text[::2]:", text[::2])         # Every 2nd character
print("text[::-1]:", text[::-1])       # Reversed string!

# 3. Built-in String Analysis Methods
sample = "  Computer Science 2026  "
clean = sample.strip()
print(f"\nOriginal: '{sample}' -> Stripped: '{clean}'")
print(f"clean.isupper(): {clean.isupper()}")
print(f"clean.isalnum(): {clean.isalnum()} (Contains spaces!)")
print(f"clean.startswith('Comp'): {clean.startswith('Comp')}")
print(f"clean.endswith('2026'): {clean.endswith('2026')}")

# 4. Search and Replace Methods
msg = "Python is powerful. Python is exam-friendly."
print(f"\nmsg.count('Python'): {msg.count('Python')}")
print(f"msg.find('Python'): {msg.find('Python')} (First index)")
print(f"msg.find('Java'): {msg.find('Java')} (Returns -1 if not found)")
# msg.index('Java') -> Raises ValueError!

# 5. split() and join() Mechanics
words = clean.split()  # Splits on whitespace
print(f"words list: {words}")
rejoined = "-".join(words)
print(f"Rejoined with hyphen: '{rejoined}'")
