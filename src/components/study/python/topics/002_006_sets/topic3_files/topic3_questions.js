// src/components/study/python/topics/002_006_sets/topic3_files/topic3_questions.js
// 30 Comprehensive Review Questions for Topic 3: Unordered and Unindexed Collections

const questions = [
  {
    question: "Why does Python raise a TypeError when you try to access an element in a set by index (e.g., my_set[0])?",
    shortAnswer: "Sets are unordered collections backed by hash tables, not contiguous indexed arrays.",
    explanation: "Indexing relies on sequential physical offsets in memory (0, 1, 2...). Sets allocate items dynamically across hash buckets based on hash(x), so concepts like 'first item' or 'index 0' do not exist in sets, raising TypeError: 'set' object is not subscriptable.",
    hint: "Think about why hash buckets have no sequential integer positions.",
    level: "basic",
    codeExample: "s = {\"Kolkata\", \"Barrackpore\"}\ntry:\n    print(s[0])\nexcept TypeError as e:\n    print(e)  # 'set' object is not subscriptable"
  },
  {
    question: "Can you perform slicing (e.g., s[1:3]) on a Python set? Why or why not?",
    shortAnswer: "No, slicing requires subscriptable sequential ordering, which sets do not possess.",
    explanation: "Slicing needs explicit start, stop, and step numerical index boundaries. Since sets are unindexed, attempting s[1:3] triggers a TypeError. To slice, you must first convert the set to a list or tuple.",
    hint: "Slicing requires indexed start and stop bounds.",
    level: "basic",
    codeExample: "s = {10, 20, 30, 40}\n# sub = s[1:3]  # TypeError\nsub = list(s)[1:3]  # Valid workaround"
  },
  {
    question: "Why do small positive integers (e.g., {3, 1, 4, 2}) often appear sorted when printed in CPython?",
    shortAnswer: "In CPython, small integers hash to themselves (hash(3)==3), landing in numeric bucket order.",
    explanation: "In CPython implementation, hash(n) == n for small non-negative integers. When a set iterates over its internal 8-slot array, it encounters bucket 1, then bucket 2, then bucket 3, giving an illusion of sorting. However, this is an internal implementation detail, not a language guarantee!",
    hint: "Small integer hash codes match their numeric values.",
    level: "expert",
    codeExample: "s = {4, 1, 3, 2}\nprint(s)  # Often outputs {1, 2, 3, 4} due to bucket index layout, but NOT guaranteed!"
  },
  {
    question: "What is PYTHONHASHSEED and why does it cause set iteration order for strings to change across Python runs?",
    shortAnswer: "It is a randomized security seed initialized at Python startup to randomize string hashes and prevent DoS attacks.",
    explanation: "To prevent attackers from sending strings designed to collide in the same hash bucket and freeze web servers (Hash-DoS attack), Python randomizes string hash seeds on each interpreter startup, causing string bucket layout and iteration order to vary across runs.",
    hint: "Think about security protection against hash collision denial of service.",
    level: "expert",
    codeExample: "# Session A: set('abc') might print {'c', 'a', 'b'}\n# Session B: set('abc') might print {'a', 'b', 'c'}"
  },
  {
    question: "How can you safely retrieve an arbitrary single element from a set without knowing its contents?",
    shortAnswer: "Use next(iter(my_set)) or my_set.pop().",
    explanation: "iter(my_set) creates an iterator over the set, and next() retrieves the first yielded element without removing it. Alternatively, my_set.pop() removes and returns an arbitrary element.",
    hint: "Combine iter() with the next() function.",
    level: "moderate",
    codeExample: "s = {\"Admin\", \"Moderator\", \"Editor\"}\nitem = next(iter(s))\nprint(\"Arbitrary item:\", item)"
  },
  {
    question: "How can you convert a set into a sequentially indexed collection sorted in ascending order?",
    shortAnswer: "Pass the set to the sorted() function: sorted_list = sorted(my_set).",
    explanation: "The sorted() built-in function accepts any iterable (including unindexed sets) and returns a brand-new, sequentially ordered list sorted in ascending order in O(N log N) time.",
    hint: "Use the built-in sorted() function.",
    level: "basic",
    codeExample: "s = {50, 10, 40, 20, 30}\nsorted_res = sorted(s)\nprint(sorted_res)  # [10, 20, 30, 40, 50]"
  },
  {
    question: "Why will unit tests that assert string representations of sets (e.g., str(s) == '{a, b}') randomly fail?",
    shortAnswer: "Because string element iteration order in sets is non-deterministic and can scramble between test runs.",
    explanation: "Because set iteration order for strings depends on process-level hash seed randomization, asserting exact string format str(s) == '{a, b}' creates flaky tests. Tests should assert set equality s == {'a', 'b'} instead.",
    hint: "Never compare stringified sets in test assertions.",
    level: "moderate",
    codeExample: "# Bad Test:\n# assert str(s) == \"{'apple', 'banana'}\"  # FLAKY!\n\n# Good Test:\n# assert s == {'apple', 'banana'}          # 100% ROBUST!"
  },
  {
    question: "How can you remove duplicates from a list while preserving the exact original insertion order?",
    shortAnswer: "Use list(dict.fromkeys(my_list)).",
    explanation: "Since Python 3.7, dictionaries maintain insertion order. dict.fromkeys() creates a dictionary with list items as unique keys in their first-seen order. Converting back to a list gives an order-preserved, deduplicated sequence in O(N) time.",
    hint: "Use dict.fromkeys to combine deduplication with order preservation.",
    level: "moderate",
    codeExample: "raw = [\"Kolkata\", \"Barrackpore\", \"Kolkata\", \"Ichapur\"]\nordered = list(dict.fromkeys(raw))\nprint(ordered)  # ['Kolkata', 'Barrackpore', 'Ichapur']"
  },
  {
    question: "What is the memory layout difference between a Python list and a Python set?",
    shortAnswer: "A list is a dense contiguous array of pointers; a set is a sparse array of hash table bucket entries.",
    explanation: "Lists store contiguous pointer arrays where index i directly accesses memory address base + i * pointer_size. Sets maintain a sparse hash table with hash values, keys, and empty slots to prevent collision clumping.",
    hint: "Dense contiguous pointer array vs sparse hash bucket array.",
    level: "expert",
    codeExample: "# List: [ptr0 | ptr1 | ptr2 | ptr3] -> Direct O(1) Index\n# Set:  [Bucket0 | Bucket1 | ... | BucketN] -> Hash Jump"
  },
  {
    question: "What happens if you iterate over a set using a standard for-loop: for item in my_set:?",
    shortAnswer: "Python iterates over every element currently in the hash buckets in whatever order the buckets are arranged.",
    explanation: "The for loop consumes the set's iterator protocol (__iter__ and __next__), traversing all populated hash buckets from index 0 to table_size-1. Every element is visited exactly once.",
    hint: "Every member is visited once in bucket order.",
    level: "basic",
    codeExample: "fruits = {\"Mango\", \"Guava\", \"Litchi\"}\nfor fruit in fruits:\n    print(\"Fruit:\", fruit)"
  },
  {
    question: "Why does pop() on a set return an 'arbitrary' element rather than the last inserted element?",
    shortAnswer: "Because sets do not track insertion order or keep a 'tail' pointer; pop() simply removes the first non-empty bucket item.",
    explanation: "Unlike lists where pop() removes the last index in O(1), set.pop() removes whatever element happens to be in the first occupied hash bucket encountered in memory.",
    hint: "pop() grabs from the first occupied bucket.",
    level: "moderate",
    codeExample: "s = {\"a\", \"b\", \"c\"}\nremoved = s.pop()\nprint(\"Popped:\", removed)"
  },
  {
    question: "What error occurs if you call pop() on an empty set?",
    shortAnswer: "KeyError: 'pop from an empty set'.",
    explanation: "Attempting to pop an element from a set with len(s) == 0 raises a KeyError, identical to accessing a non-existent key in a dictionary.",
    hint: "An empty set raises a KeyError on pop.",
    level: "basic",
    codeExample: "empty_set = set()\ntry:\n    empty_set.pop()\nexcept KeyError as e:\n    print(e)  # 'pop from an empty set'"
  },
  {
    question: "How can you check if two sets are equal regardless of their element order?",
    shortAnswer: "Use the standard == equality operator: set1 == set2.",
    explanation: "Set equality in Python verifies that every element in set1 exists in set2 and vice versa, completely disregarding internal bucket positions.",
    hint: "== compares set membership contents.",
    level: "basic",
    codeExample: "print({\"A\", \"B\", \"C\"} == {\"C\", \"A\", \"B\"})  # True"
  },
  {
    question: "Can you reverse a set using reversed(my_set)?",
    shortAnswer: "No, reversed() requires a sequence with __reversed__ or __len__ and integer indexing, raising TypeError.",
    explanation: "The reversed() built-in requires a sequence with defined order and indexing. Attempting reversed(my_set) raises TypeError: 'set' object is not reversible. You must sort or convert to a list first.",
    hint: "Reversing has no meaning for an unordered collection.",
    level: "basic",
    codeExample: "s = {1, 2, 3}\ntry:\n    rev = reversed(s)\nexcept TypeError as e:\n    print(e)  # 'set' object is not reversible"
  },
  {
    question: "How do you find the minimum and maximum elements in an unordered set?",
    shortAnswer: "Use the built-in min(my_set) and max(my_set) functions in O(N) time.",
    explanation: "min() and max() iterate across all elements in the set, comparing values and returning the smallest and largest element in O(N) linear scan time.",
    hint: "min() and max() work on any iterable.",
    level: "basic",
    codeExample: "scores = {85, 92, 78, 95, 88}\nprint(\"Min score:\", min(scores))  # 78\nprint(\"Max score:\", max(scores))  # 95"
  },
  {
    question: "Why should you never modify a set while iterating over it in a for-loop?",
    shortAnswer: "It raises RuntimeError: Set changed size during iteration.",
    explanation: "Modifying set size (via add or remove) while an iterator is active disrupts the internal hash bucket offsets, causing Python to raise a RuntimeError to prevent data corruption.",
    hint: "Iterating and modifying simultaneously triggers a RuntimeError.",
    level: "moderate",
    codeExample: "s = {1, 2, 3, 4}\ntry:\n    for x in s:\n        if x % 2 == 0:\n            s.remove(x)\nexcept RuntimeError as e:\n    print(e)  # Set changed size during iteration"
  },
  {
    question: "What is the correct way to filter or remove items from a set during iteration?",
    shortAnswer: "Iterate over a copy (for x in s.copy():) or use a set comprehension: s = {x for x in s if condition}.",
    explanation: "Iterating over a shallow copy (s.copy() or list(s)) leaves the underlying iterator untouched while you modify the original set, or creating a fresh set via comprehension is clean and efficient.",
    hint: "Iterate over s.copy() or use a set comprehension.",
    level: "moderate",
    codeExample: "s = {1, 2, 3, 4, 5}\n# Clean comprehension filtering:\ns = {x for x in s if x % 2 != 0}\nprint(s)  # {1, 3, 5}"
  },
  {
    question: "How does set unindexing impact binary search algorithms?",
    shortAnswer: "Binary search cannot be run on sets because binary search requires O(1) random index access (mid = (low+high)//2).",
    explanation: "Binary search requires jumping to specific index offsets in O(1) time. However, sets already provide O(1) lookup via direct hashing, making binary search unnecessary for sets!",
    hint: "Binary search needs index access, but sets already have O(1) hashing.",
    level: "expert",
    codeExample: "# In sets, 'x in s' is already O(1) - faster than O(log N) binary search!"
  },
  {
    question: "What is the output of sorted(set('abracadabra'), reverse=True)?",
    shortAnswer: "['r', 'd', 'c', 'b', 'a'].",
    explanation: "set('abracadabra') extracts the distinct letters {'a', 'b', 'c', 'd', 'r'}. sorted() with reverse=True sorts them in descending alphabetical order, returning ['r', 'd', 'c', 'b', 'a'].",
    hint: "Extract distinct letters and sort descending.",
    level: "basic",
    codeExample: "letters = sorted(set('abracadabra'), reverse=True)\nprint(letters)  # ['r', 'd', 'c', 'b', 'a']"
  },
  {
    question: "Why does Python 3.7+ maintain insertion order in dictionaries but NOT in sets?",
    shortAnswer: "Dictionaries use a compact two-array layout (indices array + entries array); sets use a single open-addressing table to optimize lookup speed and memory overhead.",
    explanation: "In Python 3.7, dictionaries adopted PyPy's compact array design to save memory, which naturally preserves insertion order. Sets retained the traditional sparse table layout to prioritize maximum membership lookup throughput.",
    hint: "Dicts use a compact 2-array structure; sets use a direct open-addressing table.",
    level: "expert",
    codeExample: "# Dicts: Insertion ordered since Python 3.7\n# Sets:  Unordered hash table"
  },
  {
    question: "How can you convert a set into a comma-separated string formatted in alphabetical order?",
    shortAnswer: "Use ', '.join(sorted(my_set)).",
    explanation: "sorted(my_set) returns an alphabetically sorted list of strings, and ', '.join() concatenates them into a clean comma-separated string.",
    hint: "Combine sorted() with ', '.join().",
    level: "basic",
    codeExample: "skills = {\"Python\", \"React\", \"Tailwind\", \"FastAPI\"}\nreport = \", \".join(sorted(skills))\nprint(report)  # 'FastAPI, Python, React, Tailwind'"
  },
  {
    question: "What is the time complexity of the in operator ('x in s') vs finding an element by index in a list ('l[i]')?",
    shortAnswer: "Both are O(1) constant time, but 'x in s' searches by VALUE while 'l[i]' searches by POSITIONAL INDEX.",
    explanation: "list[i] accesses memory at base + i*8 in O(1). set lookup 'x in s' computes hash(x) and inspects bucket in O(1). Searching by value in a list ('x in l') is slow O(N).",
    hint: "Searching by value in a set is O(1); searching by value in a list is O(N).",
    level: "moderate",
    codeExample: "# Value search in Set:  'val in set'  -> O(1)\n# Value search in List: 'val in list' -> O(N)\n# Index lookup in List: 'list[index]' -> O(1)"
  },
  {
    question: "What happens if two negative integers are stored in a set (e.g. {-1, -2}) in CPython?",
    shortAnswer: "They are stored according to their hash codes: hash(-1) == -2 and hash(-2) == -2 in CPython.",
    explanation: "In CPython, hash value -1 is internally reserved for error signaling, so hash(-1) evaluates to -2. They are placed into corresponding hash buckets normally.",
    hint: "CPython maps hash(-1) to -2 to avoid internal error code collisions.",
    level: "expert",
    codeExample: "print(hash(-1))  # -2\nprint(hash(-2))  # -2"
  },
  {
    question: "How can you convert a set of numbers into a tuple sorted from highest to lowest?",
    shortAnswer: "tuple(sorted(my_set, reverse=True)).",
    explanation: "sorted(my_set, reverse=True) produces a descending list, which is then cast to an immutable tuple via tuple().",
    hint: "Use tuple() wrapping sorted(reverse=True).",
    level: "basic",
    codeExample: "s = {15, 3, 99, 42}\ndesc_tuple = tuple(sorted(s, reverse=True))\nprint(desc_tuple)  # (99, 42, 15, 3)"
  },
  {
    question: "Can you pass a set to enumerate(my_set)? What do the indices represent?",
    shortAnswer: "Yes, but the 0, 1, 2 indices represent arbitrary iteration loop counters, NOT fixed element positions.",
    explanation: "enumerate(my_set) yields (counter, item) pairs as it traverses buckets. Because set order is not fixed, the index assigned to an element can change on subsequent program runs.",
    hint: "The index is just a loop iteration counter.",
    level: "moderate",
    codeExample: "roles = {\"Admin\", \"Editor\", \"Viewer\"}\nfor idx, role in enumerate(roles):\n    print(f\"Counter {idx}: {role}\")"
  },
  {
    question: "What is an 'OrderedSet' and how can you use one in Python?",
    shortAnswer: "An OrderedSet is a data structure that combines set uniqueness with list ordering, available via third-party packages or built via dict.fromkeys().",
    explanation: "Standard Python does not include an OrderedSet in builtins, but collections like dict.fromkeys() or the third-party 'ordered-set' library provide O(1) lookups with strict insertion order preservation.",
    hint: "Use dict.fromkeys() as a built-in OrderedSet substitute.",
    level: "moderate",
    codeExample: "# Built-in OrderedSet idiom:\nclass OrderedSet(dict):\n    def add(self, elem):\n        self[elem] = None"
  },
  {
    question: "Why does len(my_set) execute in O(1) constant time despite sets being unindexed?",
    shortAnswer: "Python sets store an internal element count attribute (used_slots) updated on every insertion and deletion.",
    explanation: "Python maintains an explicit length integer in the PySetObject C structure. Calling len(s) directly reads this struct field without scanning buckets, taking instant O(1) time.",
    hint: "The set struct stores the active element count directly.",
    level: "moderate",
    codeExample: "# len(s) reads PySetObject->used in O(1) time"
  },
  {
    question: "What is the effect of passing an unindexed set to random.choice() in Python's random module?",
    shortAnswer: "It raises TypeError: 'set' object is not subscriptable (random.choice requires an indexed sequence).",
    explanation: "random.choice(seq) selects an item using random index seq[random.randint(0, len(seq)-1)]. Since sets cannot be indexed, you must use random.choice(list(my_set)) or random.sample(my_set, 1)[0].",
    hint: "random.choice expects a sequence with indices; use random.sample() instead.",
    level: "expert",
    codeExample: "import random\ns = {\"Mamata\", \"Susmita\", \"Debangshu\"}\n# item = random.choice(s)  # TypeError!\n\n# Correct ways:\nitem1 = random.choice(list(s))\nitem2 = random.sample(sorted(s), 1)[0]\nprint(\"Randomly chosen:\", item1)"
  },
  {
    question: "How does set unindexing prevent data race condition bugs in multi-threaded read operations?",
    shortAnswer: "Read-only membership queries in sets don't depend on positional cursor shifts, making concurrent 'in' tests safe under the GIL.",
    explanation: "Multiple threads can safely execute 'x in s' concurrently under Python's GIL because read operations only calculate hashes and inspect buckets without mutating memory pointers or tracking sequence pointers.",
    hint: "Read-only hash lookups do not mutate internal states.",
    level: "expert",
    codeExample: "# Concurrent lookups: 'x in s' is thread-safe for reads"
  },
  {
    question: "What is the key takeaway for a software developer regarding sets being unordered and unindexed?",
    shortAnswer: "Use sets when membership and uniqueness are paramount; never rely on set iteration order for application business logic.",
    explanation: "Understanding that sets trade indexing and ordering for maximum O(1) hash lookup performance prevents subtle bugs, flaky tests, and misapplied algorithms in production codebases.",
    hint: "Tradeoff: No indexing = Maximum O(1) Lookup Speed.",
    level: "moderate",
    codeExample: "# Core architectural rule:\n# Need Order & Index -> List\n# Need Uniqueness & Speed -> Set"
  }
];

export default questions;
