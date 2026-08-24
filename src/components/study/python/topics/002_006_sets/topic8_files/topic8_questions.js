// src/components/study/python/topics/002_006_sets/topic8_files/topic8_questions.js
// 30 Comprehensive Master Review Questions for Topic 8: Set Length and Basic Operations

const questions = [
  {
    question: "Why does len(my_set) execute in O(1) constant time regardless of whether the set has 5 or 5,000,000 items?",
    shortAnswer: "CPython maintains an explicit 'used' counter attribute in the PySetObject C-struct that is read directly.",
    explanation: "Instead of counting elements by iterating through hash buckets, Python updates an internal integer field every time an element is inserted or deleted. len() simply reads this struct field in instant O(1) time.",
    hint: "Think about reading a pre-computed struct integer field.",
    level: "basic",
    codeExample: "s = set(range(1000000))\nprint(len(s))  # O(1) instant read"
  },
  {
    question: "What does an empty set evaluate to in a boolean conditional (e.g. if my_set:)?",
    shortAnswer: "An empty set evaluates to False; a set with at least 1 element evaluates to True.",
    explanation: "In Python, empty collections (set(), [], {}, \"\") evaluate to False in boolean context (falsy). Populated sets evaluate to True (truthy).",
    hint: "Empty is False; non-empty is True.",
    level: "basic",
    codeExample: "s = set()\nif not s:\n    print(\"Set is empty!\")"
  },
  {
    question: "What is the difference between writing s2 = s1 versus s2 = s1.copy()?",
    shortAnswer: "s2 = s1 creates an alias (both variables point to the same memory object); s2 = s1.copy() creates an independent clone.",
    explanation: "Assignment '=' copies only the pointer reference. Mutating s2 will unintentionally mutate s1. .copy() allocates a brand-new set object with cloned element pointers.",
    hint: "Assignment copies references; copy() allocates a new set.",
    level: "basic",
    codeExample: "s1 = {1, 2}\ns2 = s1        # Alias\ns3 = s1.copy() # Independent copy\ns2.add(3)\nprint(s1)      # {1, 2, 3} (Mutated via s2!)\nprint(s3)      # {1, 2} (Safe)"
  },
  {
    question: "What is the return value and behavior of all(set()) on an empty set?",
    shortAnswer: "True (vacuously true).",
    explanation: "all() checks if any element evaluates to False. Because an empty set has no elements, zero elements fail the condition, so all(set()) returns True by mathematical definition.",
    hint: "all() on an empty iterable is vacuously True.",
    level: "moderate",
    codeExample: "print(all(set()))  # True\nprint(any(set()))  # False"
  },
  {
    question: "What is the return value of any(set()) on an empty set?",
    shortAnswer: "False.",
    explanation: "any() checks if at least one element evaluates to True. Because an empty set contains zero elements, no truthy elements exist, returning False.",
    hint: "any() requires at least one truthy item.",
    level: "basic",
    codeExample: "print(any(set()))  # False"
  },
  {
    question: "How can you find the smallest and largest element in a set of numbers?",
    shortAnswer: "Use the built-in min(my_set) and max(my_set) functions in O(N) time.",
    explanation: "min() and max() traverse all elements in the set, comparing values and returning the extreme element in linear O(N) scan time.",
    hint: "Use min() and max().",
    level: "basic",
    codeExample: "s = {45, 12, 89, 33}\nprint(min(s))  # 12\nprint(max(s))  # 89"
  },
  {
    question: "What happens if you call min() or max() on an empty set without a default?",
    shortAnswer: "It raises ValueError: min() arg is an empty sequence (or max() arg is an empty sequence).",
    explanation: "When given an empty collection, min() and max() have no values to compare, raising ValueError. You can provide a default value: min(s, default=0).",
    hint: "Use the default parameter to avoid ValueError on empty sets.",
    level: "moderate",
    codeExample: "empty_set = set()\n# min(empty_set)           # ValueError\nres = min(empty_set, default=0) # Returns 0 safely"
  },
  {
    question: "What is the time complexity of s.copy() for a set with N elements?",
    shortAnswer: "O(N) linear time.",
    explanation: "s.copy() must allocate a new hash table array and copy all N element references into the new structure.",
    hint: "Copying N items requires O(N) operations.",
    level: "moderate",
    codeExample: "# s.copy() -> O(N) time and O(N) space"
  },
  {
    question: "Is s.copy() a shallow copy or a deep copy?",
    shortAnswer: "A shallow copy.",
    explanation: "s.copy() duplicates the set container and its hash table, but copies references to the underlying elements. If the set contains mutable sub-objects (e.g. custom objects), their inner states are still shared.",
    hint: "It duplicates the container, not the objects inside.",
    level: "moderate",
    codeExample: "import copy\n# Shallow: s.copy()\n# Deep:    copy.deepcopy(s)"
  },
  {
    question: "How do you calculate the sum and average of numeric elements in a set?",
    shortAnswer: "total = sum(my_set); average = sum(my_set) / len(my_set).",
    explanation: "sum(my_set) sums the numbers in O(N) time, and len(my_set) provides the distinct item count in O(1) time.",
    hint: "Combine sum() and len().",
    level: "basic",
    codeExample: "fees = {4500, 3500, 6500}\navg = sum(fees) / len(fees)\nprint(f\"Average: ₹{avg:.2f}\")"
  },
  {
    question: "What happens if you pass a set of strings to sum(my_set)?",
    shortAnswer: "It raises TypeError: unsupported operand type(s) for +: 'int' and 'str'.",
    explanation: "sum() starts accumulating with default start=0. Adding an int to a string raises TypeError. To concatenate strings from a set, use ''.join(my_set).",
    hint: "Use ''.join() for strings, not sum().",
    level: "basic",
    codeExample: "words = {\"Barrackpore\", \"Kolkata\"}\n# sum(words)       # TypeError\nres = \" \".join(words)  # Correct!"
  },
  {
    question: "How can you check if two sets s1 and s2 share the exact same memory address?",
    shortAnswer: "Use the identity operator: s1 is s2.",
    explanation: "The 'is' operator checks if both variables reference the exact same memory address (id(s1) == id(s2)).",
    hint: "Use the 'is' operator to check object identity.",
    level: "basic",
    codeExample: "s1 = {1, 2}\ns2 = s1\ns3 = s1.copy()\nprint(s1 is s2)  # True (Same object)\nprint(s1 is s3)  # False (Different objects)"
  },
  {
    question: "What is the alternative syntax to s.copy() for creating a shallow copy of a set?",
    shortAnswer: "set(s) or {*s}.",
    explanation: "Passing an existing set to the set() constructor or unpacking it inside a set literal {*s} creates an independent shallow copy identical to s.copy().",
    hint: "Use set(s) or {*s}.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\nclone1 = set(s)\nclone2 = {*s}\nprint(clone1 == clone2 == s)  # True"
  },
  {
    question: "What happens if you call bool(set([0])) vs bool(set())?",
    shortAnswer: "bool(set([0])) is True (contains 1 element); bool(set()) is False (contains 0 elements).",
    explanation: "Set truthiness is based purely on whether len(s) > 0, NOT on the truthiness of individual elements inside.",
    hint: "A set with 0 is non-empty, so it is True.",
    level: "moderate",
    codeExample: "print(bool(set([0])))  # True (len is 1)\nprint(bool(set()))     # False (len is 0)"
  },
  {
    question: "How do you find the string with the minimum alphabetical value in a set?",
    shortAnswer: "Use min(my_set).",
    explanation: "When strings are compared, min() finds the lexicographically smallest string using character Unicode code points in O(N) time.",
    hint: "min() works lexicographically on strings.",
    level: "basic",
    codeExample: "cities = {\"Kolkata\", \"Barrackpore\", \"Ichapur\"}\nprint(min(cities))  # 'Barrackpore'"
  },
  {
    question: "How do you find the shortest string by character length in a set of words?",
    shortAnswer: "Use min(my_set, key=len).",
    explanation: "The key=len parameter instructs min() to compare elements by their character count rather than alphabetical order.",
    hint: "Pass key=len to min().",
    level: "basic",
    codeExample: "cities = {\"Kolkata\", \"Ichapur\", \"Goa\"}\nprint(min(cities, key=len))  # 'Goa'"
  },
  {
    question: "What is the memory size in bytes of an empty set vs an empty list in 64-bit CPython?",
    shortAnswer: "An empty set is ~216 bytes; an empty list is ~56 bytes.",
    explanation: "An empty set allocates an internal 8-slot hash bucket array upfront to handle future insertions without immediate resizing, consuming more base memory than a minimal list struct.",
    hint: "Sets allocate 8 hash slots upfront (~216 bytes).",
    level: "expert",
    codeExample: "import sys\nprint(sys.getsizeof(set()))  # ~216 bytes\nprint(sys.getsizeof([]))     # ~56 bytes"
  },
  {
    question: "What is the output of: s = {True, False}; print(sum(s))?",
    shortAnswer: "1.",
    explanation: "True has numeric value 1 and False has numeric value 0. 1 + 0 = 1.",
    hint: "True is 1 and False is 0 in numerical context.",
    level: "moderate",
    codeExample: "s = {True, False}\nprint(sum(s))  # 1"
  },
  {
    question: "Why does any([False, 0, '']) return False, but any({False, 0, ''}) return False as well?",
    shortAnswer: "Because all items inside both containers are falsy (False, 0, and '' all evaluate to False).",
    explanation: "any() evaluates bool(x) on each item. Since none of False, 0, or '' are truthy, any() returns False.",
    hint: "None of the elements are truthy.",
    level: "moderate",
    codeExample: "s = {False, 0, \"\"}\nprint(any(s))  # False"
  },
  {
    question: "How can you count the number of elements in a set that satisfy a specific condition?",
    shortAnswer: "Use sum(1 for x in my_set if condition(x)).",
    explanation: "The generator expression produces 1 for each matching element, and sum() tallies them in O(N) time.",
    hint: "Combine sum() with an if filter generator.",
    level: "basic",
    codeExample: "scores = {85, 42, 90, 33, 76}\npassed_count = sum(1 for s in scores if s >= 40)\nprint(\"Passed count:\", passed_count)  # 4"
  },
  {
    question: "What is the effect of comparing two sets for equality: s1 == s2?",
    shortAnswer: "Returns True if both sets contain the exact same elements, regardless of internal bucket layout.",
    explanation: "Set equality checks that len(s1) == len(s2) and every element in s1 exists in s2.",
    hint: "== checks if contents match identically.",
    level: "basic",
    codeExample: "print({1, 2, 3} == {3, 1, 2})  # True"
  },
  {
    question: "What is the effect of comparing two sets with !=?",
    shortAnswer: "Returns True if any element in s1 is missing from s2, or if their lengths differ.",
    explanation: "!= is the logical negation of ==.",
    hint: "!= checks if contents differ.",
    level: "basic",
    codeExample: "print({1, 2} != {1, 3})  # True"
  },
  {
    question: "Can you pass a set to the sorted() function with a custom reverse flag?",
    shortAnswer: "Yes: sorted(my_set, reverse=True) returns a descending sorted list.",
    explanation: "sorted() works on any iterable and returns a new list sorted in reverse descending order.",
    hint: "Use reverse=True in sorted().",
    level: "basic",
    codeExample: "s = {10, 50, 20, 40}\nprint(sorted(s, reverse=True))  # [50, 40, 20, 10]"
  },
  {
    question: "Why should you use 'if not my_set:' instead of 'if len(my_set) == 0:'?",
    shortAnswer: "Using 'if not my_set:' is the canonical, Pythonic style for checking container emptiness.",
    explanation: "PEP 8 explicitly recommends relying on truthiness for collections ('if not seq:') rather than explicit len checks, resulting in cleaner and more idiomatic Python code.",
    hint: "PEP 8 recommends 'if not s:' for truthiness testing.",
    level: "basic",
    codeExample: "# Pythonic:\nif not s:\n    pass\n\n# Less Pythonic:\nif len(s) == 0:\n    pass"
  },
  {
    question: "What happens if you call sum() on a set of floats: sum({1.5, 2.5, 3.0})?",
    shortAnswer: "It returns the floating-point sum 7.0.",
    explanation: "sum() accumulates floating-point values accurately in O(N) time.",
    hint: "sum() works smoothly on float sets.",
    level: "basic",
    codeExample: "print(sum({1.5, 2.5, 3.0}))  # 7.0"
  },
  {
    question: "How do you find the second largest element in a set of distinct numbers?",
    shortAnswer: "Use sorted(my_set)[-2].",
    explanation: "sorted(my_set) returns an ascending list of all unique elements, and index [-2] accesses the second largest element in O(N log N) time.",
    hint: "Sort the set and index the second from the end.",
    level: "basic",
    codeExample: "nums = {10, 40, 90, 25, 75}\nsecond_highest = sorted(nums)[-2]\nprint(second_highest)  # 75"
  },
  {
    question: "What happens if you assign s = s.copy()?",
    shortAnswer: "It creates a new set clone and rebinds s to the new clone, leaving the previous set eligible for garbage collection.",
    explanation: "A new set is allocated and s is rebound to it.",
    hint: "s now points to the newly allocated clone.",
    level: "moderate",
    codeExample: "s = {1, 2}\ns = s.copy()  # Safe new object binding"
  },
  {
    question: "How does len(my_set) handle sets with duplicate values passed at initialization?",
    shortAnswer: "Duplicates are collapsed during creation, so len() reflects only the distinct unique items.",
    explanation: "The constructor eliminates duplicate keys during hash table insertion, so len({1, 1, 2, 2}) returns 2.",
    hint: "len() counts distinct members.",
    level: "basic",
    codeExample: "s = {1, 1, 2, 2, 3, 3}\nprint(len(s))  # 3"
  },
  {
    question: "Can set objects be hashed using hash(my_set)?",
    shortAnswer: "No, mutable set objects are unhashable and raise TypeError: unhashable type: 'set'.",
    explanation: "Because set contents can mutate, computing a fixed hash code is prohibited. For hashable sets, use frozenset.",
    hint: "Standard sets cannot be hashed; use frozenset instead.",
    level: "basic",
    codeExample: "s = {1, 2}\ntry:\n    print(hash(s))\nexcept TypeError as e:\n    print(e)  # unhashable type: 'set'"
  },
  {
    question: "What is the key takeaway for a software developer regarding basic set operations?",
    shortAnswer: "len() is an instant O(1) struct read; check emptiness with 'if not s:'; create safe clones with .copy(); and use min/max/sum for fast O(N) aggregates.",
    explanation: "Mastering these foundational operations ensures clean, high-performance, and idiomatic Python code in production systems.",
    hint: "O(1) len, 'if not s' truthiness, .copy() cloning, min/max/sum aggregates.",
    level: "basic",
    codeExample: "# Summary Checklist:\n# 1. len(s) -> O(1)\n# 2. if not s: -> Emptiness check\n# 3. clone = s.copy() -> Safe copy\n# 4. max(s), min(s), sum(s) -> Aggregates"
  }
];

export default questions;
