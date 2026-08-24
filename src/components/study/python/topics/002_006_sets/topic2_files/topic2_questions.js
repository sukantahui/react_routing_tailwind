// src/components/study/python/topics/002_006_sets/topic2_files/topic2_questions.js
// 30 Comprehensive Master Review Questions for Topic 2: Unique Nature of Sets

const questions = [
  {
    question: "What is the two-step rule Python uses to determine if an incoming element is a duplicate in a set?",
    shortAnswer: "1) Hash equivalence: hash(new) == hash(existing), and 2) Value equality: new == existing.",
    explanation: "Python first compares the 64-bit integer hash values of the items to find the target bucket. If a hash collision occurs (or the slot is occupied), Python calls the rich comparison equality method (a == b). If both hash and equality match, the element is recognized as duplicate and discarded.",
    hint: "Think about the hash code jump followed by value equality confirmation.",
    level: "moderate",
    codeExample: "# Under the hood:\n# if hash(a) == hash(b) and a == b:\n#     # Duplicate detected! Discard new entry"
  },
  {
    question: "Why does {1, True, 1.0, 1 + 0j} result in a set of length 1 containing only {1}?",
    shortAnswer: "Because in Python, 1 == True == 1.0 == (1+0j) and hash(1) == hash(True) == hash(1.0) == hash(1+0j).",
    explanation: "Python treats boolean True as a subclass of int with value 1. Because 1, True, 1.0, and 1+0j all share the exact same hash value (1) and compare equal under ==, the set keeps only the very first representation encountered ({1}).",
    hint: "Check numeric equality and hash values across these 4 representations.",
    level: "expert",
    codeExample: "s = {1, True, 1.0, 1 + 0j}\nprint(s)       # {1}\nprint(len(s))  # 1"
  },
  {
    question: "What would be the output if the order of insertion was changed to {True, 1, 1.0}?",
    shortAnswer: "The set would be {True}, because True was the first representation inserted into the hash bucket.",
    explanation: "When a duplicate value is encountered in a set, Python retains the existing element already residing in the hash bucket. Since True was entered first, subsequent equivalents (1 and 1.0) are discarded, leaving {True}.",
    hint: "Sets keep whichever duplicate representation arrived first.",
    level: "moderate",
    codeExample: "s = {True, 1, 1.0}\nprint(s)  # {True}"
  },
  {
    question: "How does set uniqueness handle string case sensitivity (e.g., {'Kolkata', 'kolkata'})?",
    shortAnswer: "Strings are case-sensitive; 'Kolkata' != 'kolkata', so both elements are retained.",
    explanation: "In Unicode and ASCII character encodings, uppercase 'K' (code point 75) is distinct from lowercase 'k' (code point 107). Consequently, 'Kolkata' != 'kolkata' and their hashes differ completely, resulting in a set of length 2.",
    hint: "Case differences produce distinct characters and hash codes.",
    level: "basic",
    codeExample: "cities = {\"Kolkata\", \"kolkata\"}\nprint(cities)       # {'Kolkata', 'kolkata'}\nprint(len(cities))  # 2"
  },
  {
    question: "How can you perform case-insensitive string deduplication using a set?",
    shortAnswer: "Normalize strings to lowercase before or during set construction: {s.lower() for s in items}.",
    explanation: "By calling .lower() (or .casefold() for Unicode-safe transformations) inside a set comprehension, all variations are normalized to identical strings, ensuring true case-insensitive deduplication.",
    hint: "Use .lower() or .casefold() in a set comprehension.",
    level: "basic",
    codeExample: "raw = [\"Kolkata\", \"KOLKATA\", \"kolkata\", \"Barrackpore\"]\nclean = {city.casefold() for city in raw}\nprint(clean)  # {'kolkata', 'barrackpore'}"
  },
  {
    question: "What happens if two different objects have the same hash code (a hash collision) but compare unequal (a != b)?",
    shortAnswer: "Both objects are stored in the set using open-addressing collision resolution.",
    explanation: "Hash collisions are normal in hash tables. When hash(a) == hash(b) but a != b, Python uses open-addressing probing to find the next available empty bucket, allowing both distinct objects to coexist safely.",
    hint: "Equality check (a == b) prevents distinct items from being lost during collisions.",
    level: "expert",
    codeExample: "# Hash collision: hash(a) == hash(b) but a != b\n# Python stores both via quadratic/perturbation probing"
  },
  {
    question: "What is the Hash Invariant in Python and why is it critical for set uniqueness?",
    shortAnswer: "If a == b, then hash(a) must equal hash(b). If violated, sets will store duplicate objects.",
    explanation: "The hash invariant is a fundamental contract: equal objects MUST produce equal hashes. If two objects compare equal but have different hashes, they will land in different hash buckets, causing the set to erroneously store duplicates.",
    hint: "Equal objects must always land in the same hash bucket.",
    level: "expert",
    codeExample: "# Crucial Contract:\n# a == b  ===>  hash(a) == hash(b)"
  },
  {
    question: "Why does modifying an object's attribute after inserting it into a set corrupt the set?",
    shortAnswer: "Changing attributes alters the object's hash code, stranding it in the wrong bucket and breaking lookups.",
    explanation: "If a mutable object's hash changes after insertion, its bucket index in the set no longer matches hash(obj). Calling 'obj in my_set' will look in a different bucket and return False, or duplicate insertions will succeed.",
    hint: "The bucket location is fixed at insertion time.",
    level: "expert",
    codeExample: "# This is why Python strictly requires set elements to be immutable!"
  },
  {
    question: "How do you make a custom class deduplicate based on a unique database primary key ID?",
    shortAnswer: "Implement __eq__ comparing self.id == other.id and __hash__ returning hash(self.id).",
    explanation: "By defining __eq__ to compare id equality and __hash__ returning hash(self.id), Python evaluates instances with identical IDs as duplicates and retains only one instance in sets.",
    hint: "Anchor both equality and hashing to the unique ID attribute.",
    level: "moderate",
    codeExample: "class Voter:\n    def __init__(self, voter_id, name):\n        self.voter_id = voter_id\n        self.name = name\n    def __eq__(self, other):\n        return isinstance(other, Voter) and self.voter_id == other.voter_id\n    def __hash__(self):\n        return hash(self.voter_id)"
  },
  {
    question: "What is the output of len({0, False, 0.0, -0.0})?",
    shortAnswer: "1, because 0 == False == 0.0 == -0.0 and all four have hash value 0.",
    explanation: "In Python, 0, False, 0.0, and -0.0 compare equal (0 == False == 0.0 == -0.0) and produce identical hash values (0). Therefore, the set contains only one element ({0}).",
    hint: "Zero representations across int, float, and bool are identical.",
    level: "moderate",
    codeExample: "s = {0, False, 0.0, -0.0}\nprint(s)       # {0}\nprint(len(s))  # 1"
  },
  {
    question: "How does set deduplication handle NaN (Not a Number) floating-point values?",
    shortAnswer: "Because float('nan') != float('nan'), creating {float('nan'), float('nan')} creates a set of length 2!",
    explanation: "According to IEEE 754 standards, NaN does not equal itself (nan != nan is True). When two independent float('nan') instances are placed in a set, equality comparison fails, and Python stores both. However, referencing the same variable {x, x} deduplicates by identity (is).",
    hint: "Recall that NaN is the only floating-point value that does not equal itself.",
    level: "expert",
    codeExample: "n1 = float('nan')\nn2 = float('nan')\nprint(len({n1, n2}))  # 2 (n1 != n2)\n\nprint(len({n1, n1}))  # 1 (identity check optimization)"
  },
  {
    question: "Why does Python check object identity (a is b) before calling equality (a == b) in sets?",
    shortAnswer: "As a major performance optimization: if pointers are identical, equality is guaranteed without executing __eq__.",
    explanation: "Evaluating pointer equality (is) takes a single CPU clock cycle. If two elements share the same memory address (a is b), Python skips the potentially expensive __eq__ method call entirely.",
    hint: "Identical memory addresses guarantee value equality instantly.",
    level: "expert",
    codeExample: "# 'a is b' check short-circuits before 'a == b'"
  },
  {
    question: "What is the time complexity of deduplicating a list of N elements using set(my_list)?",
    shortAnswer: "O(N) linear time on average.",
    explanation: "Converting a list of N elements to a set iterates through the list once, computing hashes and inserting each item in O(1) average time, resulting in overall O(N) linear complexity.",
    hint: "N items inserted into a hash table at O(1) cost each.",
    level: "basic",
    codeExample: "raw_data = [10, 20, 10, 30] * 1000\nunique_data = set(raw_data)  # O(N)"
  },
  {
    question: "How can you count the number of duplicate items that were removed during set conversion?",
    shortAnswer: "Subtract the set's length from the original list's length: len(my_list) - len(set(my_list)).",
    explanation: "len(my_list) gives total raw items, while len(set(my_list)) gives verified unique items. The difference len(my_list) - len(set(my_list)) equals the exact count of redundant duplicate entries removed.",
    hint: "Total count minus unique count equals duplicates removed.",
    level: "basic",
    codeExample: "registrations = [101, 102, 101, 103, 102, 104, 101]\ndupes_removed = len(registrations) - len(set(registrations))\nprint(\"Duplicates pruned:\", dupes_removed)  # 3"
  },
  {
    question: "Can a set contain tuples with identical contents: {(1, 2), (1, 2)}?",
    shortAnswer: "No, tuples with identical values have identical hashes and compare equal, so only one is kept.",
    explanation: "Tuple equality compares element-by-element, and tuple hashing computes a combined hash. Since (1, 2) == (1, 2) and hash((1, 2)) == hash((1, 2)), the duplicate tuple is pruned.",
    hint: "Tuples are immutable value-based sequences.",
    level: "basic",
    codeExample: "coords = {(22.57, 88.36), (22.57, 88.36)}\nprint(coords)       # {(22.57, 88.36)}\nprint(len(coords))  # 1"
  },
  {
    question: "What is the difference between list(set(items)) and list(dict.fromkeys(items)) when removing duplicates?",
    shortAnswer: "list(set(items)) loses original element order; list(dict.fromkeys(items)) preserves insertion order.",
    explanation: "Sets do not preserve sequence order. In Python 3.7+, dictionaries guarantee insertion order, so dict.fromkeys() deduplicates while keeping elements in the exact order they first appeared.",
    hint: "Use dict.fromkeys() if sequence order must be maintained.",
    level: "moderate",
    codeExample: "items = [\"B\", \"A\", \"B\", \"C\", \"A\"]\nprint(list(set(items)))            # ['A', 'C', 'B'] (Order scrambled)\nprint(list(dict.fromkeys(items)))  # ['B', 'A', 'C'] (Order preserved!)"
  },
  {
    question: "What happens when you add a duplicate item to an existing set using my_set.add(x)?",
    shortAnswer: "Nothing happens; the operation executes silently without error and the set remains unchanged.",
    explanation: "The .add() method evaluates hash and equality: finding an existing match, it completes without raising exceptions or altering the set size.",
    hint: "Adding duplicates in sets is a safe, silent no-op.",
    level: "basic",
    codeExample: "s = {\"Kolkata\", \"Barrackpore\"}\ns.add(\"Kolkata\")\nprint(len(s))  # 2"
  },
  {
    question: "Why does { (1, 2), (2, 1) } have length 2 while {1, 2} == {2, 1}?",
    shortAnswer: "(1, 2) and (2, 1) are ordered tuples and not equal; {1, 2} and {2, 1} are sets where order is irrelevant.",
    explanation: "Tuples are ordered sequences where (1, 2) != (2, 1). Therefore, a set of tuples sees them as two distinct items. When comparing sets directly ({1, 2} == {2, 1}), sets only compare membership disregarding order.",
    hint: "Tuples care about positional order; sets do not.",
    level: "moderate",
    codeExample: "t_set = {(1, 2), (2, 1)}\nprint(len(t_set))  # 2\n\nprint({1, 2} == {2, 1})  # True"
  },
  {
    question: "What is the consequence of implementing __eq__ in a custom class without implementing __hash__?",
    shortAnswer: "Python sets __hash__ = None, making instances unhashable and unusable in sets.",
    explanation: "To prevent broken hash invariants, defining custom __eq__ causes Python to automatically revoke the inherited __hash__, raising TypeError: unhashable type if you try adding instances to a set.",
    hint: "Defining __eq__ automatically breaks inherited __hash__.",
    level: "expert",
    codeExample: "class Item:\n    def __init__(self, val):\n        self.val = val\n    def __eq__(self, other):\n        return self.val == other.val\n\n# {Item(5)} -> TypeError: unhashable type: 'Item'"
  },
  {
    question: "How does set uniqueness benefit database query optimization?",
    shortAnswer: "It strips duplicate foreign keys or IDs before executing secondary batch queries (preventing N+1 query overhead).",
    explanation: "Collecting unique foreign IDs in a set (e.g. user_ids = {order.user_id for order in orders}) allows executing a single batch query 'WHERE id IN (user_ids)' with minimal payload and zero duplicate database hits.",
    hint: "Batching unique IDs avoids querying the database for the same record multiple times.",
    level: "moderate",
    codeExample: "orders = [{'user_id': 101}, {'user_id': 102}, {'user_id': 101}]\nunique_users = {o['user_id'] for o in orders}  # {101, 102}"
  },
  {
    question: "What is the output of len(set('Mississippi'))?",
    shortAnswer: "4, because the unique letters are 'M', 'i', 's', 'p'.",
    explanation: "'Mississippi' has 11 characters, but only 4 distinct letters: 'M' (1), 'i' (4), 's' (4), 'p' (2). The set contains {'M', 'i', 's', 'p'}.",
    hint: "Count distinct letters in Mississippi.",
    level: "basic",
    codeExample: "s = set('Mississippi')\nprint(s)       # {'M', 'i', 'p', 's'}\nprint(len(s))  # 4"
  },
  {
    question: "Can a set contain instances of different user-defined classes that compare equal?",
    shortAnswer: "Yes, if class A and class B define compatible __eq__ and return identical __hash__ values, one will deduplicate the other.",
    explanation: "Set uniqueness does not enforce type matching: it strictly checks hash(a) == hash(b) and a == b. If an instance of class A compares equal to an instance of class B and hashes identically, the set treats them as duplicates.",
    hint: "Duck typing in Python applies to set equality.",
    level: "expert",
    codeExample: "# If a == b and hash(a) == hash(b), set keeps only the first, regardless of class names."
  },
  {
    question: "What is the difference between set uniqueness and database PRIMARY KEY constraints?",
    shortAnswer: "Sets enforce in-memory runtime uniqueness; database primary keys enforce persistent relational table integrity.",
    explanation: "Sets provide instantaneous in-memory deduplication during program execution in Python memory. Database primary keys enforce uniqueness across disk-persisted tables and concurrent transactions.",
    hint: "In-memory data structure vs persistent database engine.",
    level: "basic",
    codeExample: "# Set in Python memory: unique_ids = set(raw_data)"
  },
  {
    question: "How does set uniqueness assist in finding duplicate elements in a raw list?",
    shortAnswer: "Iterate through the list, tracking seen items in a set; if item in seen, it is a duplicate.",
    explanation: "Using a 'seen' set provides an O(N) single-pass algorithm to detect and collect all duplicate entries in a stream without O(N^2) nested list scanning.",
    hint: "Track visited elements in a 'seen' set.",
    level: "moderate",
    codeExample: "data = [1, 2, 3, 2, 4, 1, 5]\nseen, dupes = set(), set()\nfor x in data:\n    if x in seen:\n        dupes.add(x)\n    seen.add(x)\nprint(\"Duplicates:\", dupes)  # {1, 2}"
  },
  {
    question: "What happens if a class defines __hash__ returning a constant (e.g., return 1)?",
    shortAnswer: "All instances collide in bucket 1, degrading set operations from O(1) to O(N) linear time.",
    explanation: "Returning a constant hash causes every instance to land in the same hash bucket. Python must linearly inspect and compare every single element via __eq__, ruining set performance.",
    hint: "A constant hash defeats hash distribution and causes 100% collision.",
    level: "expert",
    codeExample: "class BadHash:\n    def __hash__(self):\n        return 1  # Catastrophic O(N) performance degradation!"
  },
  {
    question: "Why does Python use 64-bit integers for hash values?",
    shortAnswer: "To provide a massive hash address space (2^64) and minimize random hash collisions across millions of items.",
    explanation: "A 64-bit hash space distributes millions of elements evenly across buckets, ensuring collisions remain exceptionally rare and maintaining O(1) performance.",
    hint: "A large address space prevents bucket crowding.",
    level: "expert",
    codeExample: "import sys\nprint(sys.hash_info.width)  # 64 bits"
  },
  {
    question: "What is the output of {frozenset([1, 2]), frozenset([2, 1])}?",
    shortAnswer: "{frozenset({1, 2})}, with length 1.",
    explanation: "frozenset([1, 2]) and frozenset([2, 1]) contain the exact same elements. Since set equality disregards order, both frozensets compare equal and hash identically, resulting in deduplication.",
    hint: "frozensets are sets and compare equal regardless of argument order.",
    level: "moderate",
    codeExample: "fs1 = frozenset([1, 2])\nfs2 = frozenset([2, 1])\nprint(len({fs1, fs2}))  # 1"
  },
  {
    question: "How do sets handle complex numbers like (2 + 3j)?",
    shortAnswer: "Complex numbers are immutable and hashable; duplicate complex numbers are deduplicated normally.",
    explanation: "Complex numbers implement __hash__ and __eq__ based on real and imaginary parts. Duplicate complex numbers (e.g. 2+3j and 2.0+3.0j) evaluate as duplicates in sets.",
    hint: "Complex numbers are first-class immutable numbers in Python.",
    level: "basic",
    codeExample: "c_set = {2 + 3j, 2.0 + 3.0j}\nprint(len(c_set))  # 1"
  },
  {
    question: "How can you verify that two large lists contain the exact same unique elements regardless of order or frequency?",
    shortAnswer: "Compare their sets: set(list1) == set(list2).",
    explanation: "set(list1) and set(list2) strip all duplicates and ignore element positions. Comparing set(list1) == set(list2) returns True if both lists have the exact same set of distinct values.",
    hint: "Set equality checks matching unique membership.",
    level: "basic",
    codeExample: "l1 = [1, 2, 2, 3]\nl2 = [3, 1, 3, 2, 1]\nprint(set(l1) == set(l2))  # True"
  },
  {
    question: "What is the core takeaway for professional Python developers regarding set uniqueness?",
    shortAnswer: "Sets guarantee mathematical uniqueness in O(1) time by leveraging immutable element hashes and value equality.",
    explanation: "Understanding that uniqueness requires immutability, that 1 == True, and that __eq__ and __hash__ work in tandem empowers developers to build bulletproof deduplication pipelines and high-speed lookups.",
    hint: "Uniqueness = Hashable Immutability + O(1) Hash Table Indexing.",
    level: "moderate",
    codeExample: "# Golden Rule:\n# Unique In-Memory Lookups -> Use Set!"
  }
];

export default questions;
