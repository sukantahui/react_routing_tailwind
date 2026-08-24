// src/components/study/python/topics/002_006_sets/topic0_files/topic0_questions.js
// 30 Comprehensive Moderate-to-Expert Master Questions for Topic 0: Introduction to Sets

const questions = [
  {
    question: "What is a Set in Python, and what are its primary defining characteristics?",
    shortAnswer: "A Set is an unordered, mutable collection of unique and immutable (hashable) elements.",
    explanation: "In Python, a set is an iterable data structure modeled after mathematical sets. Its two fundamental rules are: 1) every element must be unique (no duplicates), and 2) elements must be hashable/immutable. Sets are unordered, meaning they do not maintain insertion order or integer indices.",
    hint: "Think of a mathematical set where duplicate elements cannot exist and position does not matter.",
    level: "basic",
    codeExample: "s = {10, 20, 30, 20}\nprint(s)  # Output: {10, 20, 30}\nprint(type(s))  # <class 'set'>"
  },
  {
    question: "What happens when duplicate values are passed into a set literal or set() constructor?",
    shortAnswer: "Python automatically eliminates duplicate entries, retaining only one instance.",
    explanation: "When evaluating set literals or passing an iterable to set(), Python computes the hash of each item. If an item matches an existing item's hash and equality check (a == b), the redundant element is quietly ignored without throwing an error.",
    hint: "Observe how duplicate items collapse into a single distinct representation.",
    level: "basic",
    codeExample: "names = {\"Mamata\", \"Susmita\", \"Debangshu\", \"Mamata\"}\nprint(names)  # {'Mamata', 'Susmita', 'Debangshu'}\nprint(len(names))  # 3"
  },
  {
    question: "How do you create an empty set in Python, and why does {} NOT create an empty set?",
    shortAnswer: "Use set() to create an empty set. {} creates an empty dictionary for historical backward compatibility.",
    explanation: "Because dictionaries preceded sets in Python's language history, the empty curly braces literal {} was already reserved for empty dictionaries (<class 'dict'>). To instantiate an empty set, you must explicitly call the built-in type constructor set().",
    hint: "Check type({}) vs type(set()).",
    level: "basic",
    codeExample: "empty_dict = {}\nprint(type(empty_dict))  # <class 'dict'>\n\nempty_set = set()\nprint(type(empty_set))   # <class 'set'>"
  },
  {
    question: "Why does attempting to access a set element by index (e.g., s[0]) raise a TypeError?",
    shortAnswer: "Sets are unordered collections without positional sequence indexing, so subscripting is unsupported.",
    explanation: "Sets are backed internally by open-addressing hash tables, not contiguous array blocks. Elements are placed into hash buckets based on hash(x), meaning there is no first, second, or last element concept. Attempting s[0] raises TypeError: 'set' object is not subscriptable.",
    hint: "Recall that hash buckets do not have 0, 1, 2 integer indices.",
    level: "moderate",
    codeExample: "cities = {\"Kolkata\", \"Barrackpore\", \"Jadavpur\"}\ntry:\n    print(cities[0])\nexcept TypeError as e:\n    print(e)  # 'set' object is not subscriptable"
  },
  {
    question: "What types of objects can be elements of a Python set, and what cannot?",
    shortAnswer: "Only immutable, hashable objects (int, float, str, tuple, frozenset) can be elements; mutable objects (list, dict, set) cannot.",
    explanation: "To guarantee O(1) lookups and uniqueness, a set must calculate a permanent hash value for each element via hash(). If an element were mutable (like a list), its contents and hash could change after insertion, corrupting the hash table. Thus, mutable types raise TypeError: unhashable type.",
    hint: "Ask whether the object can change its content in place.",
    level: "moderate",
    codeExample: "# Valid:\nvalid_set = {10, \"Kolkata\", (1, 2), True}\n\n# Invalid (raises TypeError):\n# invalid_set = {[1, 2], [3, 4]}  # TypeError: unhashable type: 'list'"
  },
  {
    question: "Why is a tuple allowed inside a set, but a tuple containing a list is disallowed?",
    shortAnswer: "A tuple is only hashable if all of its contained items are also hashable.",
    explanation: "Python evaluates hashability recursively. While a tuple itself is immutable, if it contains a reference to a mutable object (such as a list: (1, [2, 3])), its overall hash cannot be calculated reliably, raising TypeError: unhashable type: 'list'.",
    hint: "Look inside the tuple: are all nested children immutable?",
    level: "expert",
    codeExample: "t1 = (1, 2, \"Barrackpore\")\ns = {t1}  # Valid\n\nt2 = (1, [2, 3])\n# s.add(t2)  # TypeError: unhashable type: 'list'"
  },
  {
    question: "What is the average time complexity for testing membership ('x in s') in a set vs a list?",
    shortAnswer: "Set membership is O(1) on average, whereas list membership is O(N) linear time.",
    explanation: "In a list, Python must sequentially inspect every element from index 0 up to N-1 (linear scan O(N)). In a set, Python computes hash(x), immediately inspects the corresponding hash bucket in O(1) average time, making sets exponentially faster for lookups across large datasets.",
    hint: "Compare jumping directly to a calculated bucket vs scanning line-by-line.",
    level: "moderate",
    codeExample: "# Checking membership with 1,000,000 items:\n# list_lookup -> O(N) (scans up to 1M items)\n# set_lookup  -> O(1) (instant bucket jump)"
  },
  {
    question: "How does set(iterable) behave when passed a string, a list, and a dictionary?",
    shortAnswer: "Strings yield unique characters; lists yield unique items; dictionaries yield unique keys.",
    explanation: "The set() constructor iterates through the given iterable: for a string it extracts each individual character, for a list it deduplicates the list elements, and for a dictionary it iterates over dict.keys() by default.",
    hint: "Remember that iterating over a dictionary yields its keys.",
    level: "moderate",
    codeExample: "print(set(\"banana\"))  # {'b', 'a', 'n'}\nprint(set([1, 2, 2, 3]))  # {1, 2, 3}\nprint(set({\"a\": 1, \"b\": 2}))  # {'a', 'b'}"
  },
  {
    question: "How does Python treat boolean values True and False when 1 and 0 are already present in a set?",
    shortAnswer: "True is treated as duplicate of 1, and False is treated as duplicate of 0 (since in Python bool inherits from int).",
    explanation: "In Python, bool is a subclass of int where True == 1 and False == 0, and hash(True) == hash(1) and hash(False) == hash(0). Because their values and hashes are identical, a set will consider them duplicates and retain whichever was encountered first.",
    hint: "Evaluate hash(True) == hash(1) and True == 1 in Python.",
    level: "expert",
    codeExample: "s1 = {1, True, \"Hello\"}\nprint(s1)  # {1, 'Hello'} (True is omitted as dupe of 1)\n\ns2 = {True, 1, \"Hello\"}\nprint(s2)  # {True, 'Hello'} (1 is omitted as dupe of True)"
  },
  {
    question: "Can a set contain another set as an element? How can you represent a set of sets?",
    shortAnswer: "No, a set cannot contain a mutable set. You must use frozenset (an immutable set) as elements.",
    explanation: "Because sets are mutable and unhashable, attempting to nest a set inside a set ({ {1, 2}, {3, 4} }) raises TypeError: unhashable type: 'set'. To create a set of sets, the inner sets must be instantiated as frozenset objects.",
    hint: "Look for the immutable sibling of set: frozenset.",
    level: "expert",
    codeExample: "# Invalid:\n# s = {{1, 2}, {3, 4}}  # TypeError: unhashable type: 'set'\n\n# Valid using frozenset:\ns = {frozenset({1, 2}), frozenset({3, 4})}\nprint(len(s))  # 2"
  },
  {
    question: "What is the output of len(set([10, 20, 20.0, 30, '30'])) and why?",
    shortAnswer: "4, because 20 == 20.0 and hash(20) == hash(20.0), while 30 and '30' are distinct types.",
    explanation: "20 (int) and 20.0 (float) have equal numerical values (20 == 20.0) and identical hashes (hash(20) == hash(20.0)), so they are deduplicated to one element. However, 30 (int) and '30' (str) have different types and values, so both remain. Elements: {10, 20, 30, '30'}.",
    hint: "Check numerical equality between int and float vs int and str.",
    level: "moderate",
    codeExample: "s = set([10, 20, 20.0, 30, '30'])\nprint(s)     # {10, 20, 30, '30'}\nprint(len(s)) # 4"
  },
  {
    question: "Why is iterating over a set in Python non-deterministic across different Python sessions for string elements?",
    shortAnswer: "Python uses randomized string hash seeds (hash randomization) for security against Denial-of-Service attacks.",
    explanation: "Since Python 3.3, a randomized seed (PYTHONHASHSEED) is generated at Python startup. This changes the hash values of strings between different interpreter runs, altering bucket distribution and iteration order to prevent algorithmic complexity DoS attacks on hash tables.",
    hint: "Think about security protections against hash collision attacks.",
    level: "expert",
    codeExample: "# In terminal session 1:\n# set('abc') -> {'b', 'a', 'c'}\n# In terminal session 2:\n# set('abc') -> {'a', 'c', 'b'}"
  },
  {
    question: "What is the memory overhead comparison between a Python list and a Python set?",
    shortAnswer: "Sets consume significantly more memory than lists because hash tables require sparse, pre-allocated buckets.",
    explanation: "Lists only store a contiguous array of object pointers. Sets must store an open-addressing hash table with hash values, keys, and empty bucket buffers (maintaining roughly 1/3 to 2/3 sparsity) to prevent hash collisions, resulting in a 4x to 8x higher memory footprint.",
    hint: "Consider why hash tables must keep empty slots to avoid collision clumping.",
    level: "moderate",
    codeExample: "import sys\nnums = list(range(100))\nprint(\"List bytes:\", sys.getsizeof(nums))  # ~856 bytes\nprint(\"Set bytes:\", sys.getsizeof(set(nums)))  # ~8408 bytes"
  },
  {
    question: "How do you check if an element is NOT present in a set?",
    shortAnswer: "Use the 'not in' operator (e.g., 'item not in my_set').",
    explanation: "The 'not in' operator tests for non-membership in O(1) average time. It returns True if the element is absent from the set's hash table and False if it exists.",
    hint: "Use Python's readable English-like non-membership keyword.",
    level: "basic",
    codeExample: "banned_ips = {\"192.168.1.50\", \"10.0.0.12\"}\nclient_ip = \"192.168.1.100\"\n\nif client_ip not in banned_ips:\n    print(\"Connection allowed.\")"
  },
  {
    question: "What happens if you convert a dictionary to a set using set(my_dict.values())?",
    shortAnswer: "It extracts and deduplicates only the values of the dictionary into a set.",
    explanation: "Calling set(my_dict) extracts the dictionary's keys. To create a set of unique dictionary values, you explicitly pass the values view: set(my_dict.values()). All values must be hashable.",
    hint: "Pass the .values() view explicitly to the set constructor.",
    level: "moderate",
    codeExample: "marks = {\"Susmita\": 95, \"Mamata\": 95, \"Debangshu\": 88}\nunique_marks = set(marks.values())\nprint(unique_marks)  # {88, 95}"
  },
  {
    question: "How can you safely convert a list with duplicates into a sorted list without duplicates?",
    shortAnswer: "Wrap the list in set() to deduplicate, then pass it to sorted() (e.g., sorted(set(my_list))).",
    explanation: "set(my_list) strips all duplicate occurrences in O(N) time. Passing the resulting set into sorted() converts it into a fresh, sequentially ordered list in O(K log K) time, where K is the count of unique elements.",
    hint: "Combine set() for uniqueness and sorted() for ordering.",
    level: "basic",
    codeExample: "raw_scores = [85, 92, 78, 85, 95, 78, 92]\nunique_sorted = sorted(set(raw_scores))\nprint(unique_sorted)  # [78, 85, 92, 95]"
  },
  {
    question: "Why does Python allow custom class instances to be stored in sets by default?",
    shortAnswer: "By default, user-defined class objects inherit object.__hash__() (their memory id) and object.__eq__().",
    explanation: "In Python, unless __hash__ is explicitly set to None, user-defined class instances inherit identity-based hashing (their id() address) and identity equality (is comparison). Two distinct instances with identical attributes will be treated as separate set elements unless __eq__ and __hash__ are custom-overridden.",
    hint: "Every custom object gets an address-based hash by default.",
    level: "expert",
    codeExample: "class Student:\n    def __init__(self, name):\n        self.name = name\n\ns1 = Student(\"Susmita\")\ns2 = Student(\"Susmita\")\ns = {s1, s2}\nprint(len(s))  # 2 (distinct object memory addresses!)"
  },
  {
    question: "If a class overrides __eq__, why does Python automatically set its __hash__ to None?",
    shortAnswer: "To prevent breaking the hash table invariant that equal objects must have equal hash values.",
    explanation: "The fundamental hash invariant states: If a == b, then hash(a) must equal hash(b). If a developer implements custom __eq__ without defining __hash__, Python sets __hash__ = None so the object cannot be placed into sets or dictionaries in a broken state.",
    hint: "If two items compare equal, their hash codes must match.",
    level: "expert",
    codeExample: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\n# p = Point(1, 2)\n# s = {p}  # TypeError: unhashable type: 'Point'"
  },
  {
    question: "How can you properly make a custom class hashable for use in sets?",
    shortAnswer: "Implement both __eq__ and __hash__ methods based on immutable instance attributes.",
    explanation: "To make a custom class safely hashable, implement __eq__ to compare attribute equality, and __hash__ by returning the hash of a tuple of those same immutable attributes (e.g., return hash((self.x, self.y))).",
    hint: "Combine attribute values into a tuple and return hash(tuple).",
    level: "expert",
    codeExample: "class Point:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __eq__(self, other):\n        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)\n    def __hash__(self):\n        return hash((self.x, self.y))\n\np1, p2 = Point(2, 3), Point(2, 3)\npts = {p1, p2}\nprint(len(pts))  # 1 (Correctly deduplicated!)"
  },
  {
    question: "What is the difference between a Set and a Frozenset in Python?",
    shortAnswer: "A Set is mutable (can add/remove items), whereas a Frozenset is immutable and hashable.",
    explanation: "Sets can be modified in place (via add, remove, pop, etc.) and are unhashable. Frozensets cannot be modified after creation, making them hashable so they can serve as dictionary keys or elements inside other sets.",
    hint: "Think of set vs frozenset like list vs tuple.",
    level: "moderate",
    codeExample: "fs = frozenset([1, 2, 3])\n# fs.add(4)  # AttributeError: 'frozenset' object has no attribute 'add'\n\nd = {fs: \"Valid Key\"}\nprint(d[fs])  # 'Valid Key'"
  },
  {
    question: "What is the time complexity of building a set from a list of N elements?",
    shortAnswer: "O(N) time complexity on average.",
    explanation: "Constructing a set iterates through the list of N items once, computing the hash and inserting each item into the hash table in O(1) average time. Therefore, total construction time is O(N).",
    hint: "N items inserted at O(1) average cost each.",
    level: "moderate",
    codeExample: "raw_data = [i % 50 for i in range(100000)]\nunique_set = set(raw_data)  # Takes O(N) linear time"
  },
  {
    question: "Can sets contain None as an element in Python?",
    shortAnswer: "Yes, None is an immutable object and can be stored in a set (only once).",
    explanation: "None is a first-class immutable singleton object in Python with a valid hash (hash(None)). It can be added to a set just like any integer or string, and duplicate None values will be deduplicated to a single entry.",
    hint: "Check hash(None) in Python interactive shell.",
    level: "basic",
    codeExample: "s = {10, None, 20, None, 30}\nprint(s)  # {None, 10, 20, 30}\nprint(None in s)  # True"
  },
  {
    question: "Why should you NOT use a set if the order of elements must be strictly preserved?",
    shortAnswer: "Sets do not preserve insertion order; use a list or dict.fromkeys() if order is required.",
    explanation: "Sets prioritize O(1) hash table lookup efficiency over sequencing. If you need both deduplication AND insertion order preservation, use list(dict.fromkeys(my_list)), because dictionaries in Python 3.7+ guarantee insertion order.",
    hint: "Use dict.fromkeys() to maintain order while stripping duplicates.",
    level: "moderate",
    codeExample: "seq = [\"Kolkata\", \"Barrackpore\", \"Kolkata\", \"Ichapur\"]\n# Preserves order while removing duplicates:\nordered_unique = list(dict.fromkeys(seq))\nprint(ordered_unique)  # ['Kolkata', 'Barrackpore', 'Ichapur']"
  },
  {
    question: "What is the output of set() == set() and {1, 2, 3} == {3, 2, 1}?",
    shortAnswer: "Both evaluate to True because set equality checks content, disregarding order.",
    explanation: "In Python, set equality (s1 == s2) returns True if both sets contain the exact same unique elements, regardless of internal bucket layout or presentation order.",
    hint: "Sets compare equal if their distinct contents match.",
    level: "basic",
    codeExample: "print(set() == set())            # True\nprint({1, 2, 3} == {3, 2, 1})      # True\nprint({1, 2, 3} == {1, 2, 3, 2})   # True"
  },
  {
    question: "How can you determine the number of distinct characters in a given paragraph string?",
    shortAnswer: "Pass the string directly into len(set(paragraph)).",
    explanation: "Passing a string into set() treats it as an iterable of single characters and drops all repeated letters, spaces, and punctuation. Calling len() on the resulting set yields the exact count of unique characters.",
    hint: "String into set() yields unique characters, then count with len().",
    level: "basic",
    codeExample: "text = \"Learn Python programming at Barrackpore\"\nunique_char_count = len(set(text))\nprint(\"Unique characters count:\", unique_char_count)"
  },
  {
    question: "What error occurs if you attempt to create a set literal with a dictionary inside: {{'a': 1}}?",
    shortAnswer: "TypeError: unhashable type: 'dict'.",
    explanation: "Dictionaries are mutable data structures and do not have a __hash__ method. Attempting to place a dictionary directly as a set element causes Python's hash lookup to fail with a TypeError.",
    hint: "Dictionaries are mutable and cannot be hashed.",
    level: "moderate",
    codeExample: "try:\n    bad_set = {{'role': 'admin'}}\nexcept TypeError as e:\n    print(e)  # unhashable type: 'dict'"
  },
  {
    question: "What is the difference between passing an iterable to set() vs enclosing it in curly braces {iterable}?",
    shortAnswer: "set(iterable) unpacks elements and deduplicates; {iterable} creates a set containing the single iterable object.",
    explanation: "set([1, 2, 3]) iterates through the list, creating {1, 2, 3}. In contrast, {[1, 2, 3]} tries to create a set whose single element is the list itself (which immediately fails with TypeError: unhashable type: 'list'). For a tuple, {(1, 2)} creates a set with 1 element: {(1, 2)}.",
    hint: "Notice the difference between calling the constructor vs using literal brackets.",
    level: "moderate",
    codeExample: "print(set((1, 2, 3)))  # {1, 2, 3} (3 elements)\nprint({(1, 2, 3)})       # {(1, 2, 3)} (1 element: the tuple itself)"
  },
  {
    question: "How do sets handle float precision edge cases like 0.1 + 0.2 vs 0.3?",
    shortAnswer: "Due to IEEE 754 floating-point inaccuracies, 0.1 + 0.2 != 0.3, so both exist as separate set elements.",
    explanation: "In binary floating-point representation, 0.1 + 0.2 evaluates to 0.30000000000000004. Because 0.1 + 0.2 != 0.3, their hashes differ, and a set will treat them as two distinct numbers.",
    hint: "Check 0.1 + 0.2 == 0.3 in standard Python arithmetic.",
    level: "expert",
    codeExample: "val1 = 0.1 + 0.2\nval2 = 0.3\ns = {val1, val2}\nprint(len(s))  # 2\nprint(s)       # {0.30000000000000004, 0.3}"
  },
  {
    question: "Can you slice a set using [start:stop:step] syntax in Python?",
    shortAnswer: "No, slicing requires subscriptable sequential ordering, which sets do not possess.",
    explanation: "Slicing is a sequence operation that depends on integer indices. Because sets are unindexed, attempting s[1:4] raises TypeError: 'set' object is not subscriptable. If slicing is needed, convert the set to a list or tuple first.",
    hint: "Sets do not have index positions to define start and stop bounds.",
    level: "basic",
    codeExample: "s = {10, 20, 30, 40}\n# sub = s[1:3]  # TypeError: 'set' object is not subscriptable\n\n# Workaround:\nsub = list(s)[1:3]\nprint(sub)"
  },
  {
    question: "When should a Python developer choose a Set over a List or Dictionary in real-world software architecture?",
    shortAnswer: "Choose a Set when you need to enforce uniqueness, eliminate duplicates, or perform rapid O(1) membership lookups and mathematical set operations (unions/intersections).",
    explanation: "Sets are the ideal architectural choice for permission checks, tag registries, visited URL tracking in web crawlers, duplicate payload detection, and mathematical relationship comparisons (e.g. mutual friends). Use lists when order and duplicates matter, and dictionaries when associating keys with values.",
    hint: "Match the data structure to the requirement: Uniqueness + Lookup Speed = Set.",
    level: "moderate",
    codeExample: "# Real-world visited URL tracker in a web scraper:\nvisited_urls = set()\n\ndef scrape(url):\n    if url in visited_urls:\n        return  # O(1) instant skip\n    visited_urls.add(url)\n    # perform network request..."
  }
];

export default questions;
