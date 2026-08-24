// src/components/study/python/topics/002_006_sets/topic13_files/topic13_questions.js
// 30 Comprehensive Master Review Questions for Topic 13: Frozen Sets (Immutable Sets)

const questions = [
  {
    question: "What is a frozenset in Python and how does it differ from a standard set?",
    shortAnswer: "A frozenset is an immutable, hashable version of a set; its elements cannot be modified after creation, allowing it to be used as a dictionary key or set member.",
    explanation: "Standard sets are mutable and unhashable. frozensets are frozen upon creation and implement the __hash__() protocol, making them usable wherever immutable hashable keys are required.",
    hint: "frozenset is immutable and hashable.",
    level: "basic",
    codeExample: "fs = frozenset([1, 2, 3])\nprint(hash(fs))  # Valid integer hash!\n# fs.add(4)      # AttributeError: 'frozenset' object has no attribute 'add'"
  },
  {
    question: "Does Python provide a dedicated literal syntax for frozensets (like {} for sets)?",
    shortAnswer: "No, frozensets must always be instantiated using the frozenset() constructor.",
    explanation: "While tuples use (), lists use [], and sets use {}, frozensets have no special syntax literal and must be explicitly constructed via frozenset(iterable).",
    hint: "You must always call frozenset().",
    level: "basic",
    codeExample: "fs = frozenset([10, 20, 30])\nprint(type(fs))  # <class 'frozenset'>"
  },
  {
    question: "Why can a frozenset be used as a dictionary key while a standard set cannot?",
    shortAnswer: "Because frozenset is immutable and implements __hash__(); standard set is mutable and raises TypeError on hash().",
    explanation: "Dictionary keys require stable, unchanging hash codes. Because frozenset cannot be modified, its hash code remains constant throughout its lifecycle.",
    hint: "Immutable objects have stable hash values suitable for dictionary keys.",
    level: "basic",
    codeExample: "d = {}\nd[frozenset([\"tag1\", \"tag2\"])] = \"Active Product\"\nprint(d)"
  },
  {
    question: "How can you create a set of sets in Python?",
    shortAnswer: "Wrap the inner sets as frozensets: my_set = {frozenset([1, 2]), frozenset([3, 4])}.",
    explanation: "Writing {{1, 2}, {3, 4}} fails with TypeError: unhashable type: 'set'. Wrapping inner sets as frozensets provides hashable members that can be stored in an outer set.",
    hint: "Use frozenset for the inner sets.",
    level: "moderate",
    codeExample: "valid_nested = {frozenset([1, 2]), frozenset([3, 4])}\nprint(len(valid_nested))  # 2"
  },
  {
    question: "What happens if you attempt to call .add(), .remove(), or .pop() on a frozenset?",
    shortAnswer: "It raises AttributeError: 'frozenset' object has no attribute '<method_name>'.",
    explanation: "frozenset objects do not define mutating methods on their class definition, causing Python to raise an AttributeError.",
    hint: "Mutating methods do not exist on frozenset.",
    level: "basic",
    codeExample: "fs = frozenset([1, 2])\ntry:\n    fs.add(3)\nexcept AttributeError as e:\n    print(e)  # 'frozenset' object has no attribute 'add'"
  },
  {
    question: "What is the return type of: set([1, 2]) | frozenset([2, 3]) versus frozenset([1, 2]) | set([2, 3])?",
    shortAnswer: "set | frozenset returns a set; frozenset | set returns a frozenset.",
    explanation: "In binary set operations, the type of the resulting container matches the type of the left-hand operand.",
    hint: "The left operand determines the return type.",
    level: "expert",
    codeExample: "s = {1, 2}\nfs = frozenset([2, 3])\nprint(type(s | fs))   # <class 'set'>\nprint(type(fs | s))  # <class 'frozenset'>"
  },
  {
    question: "Can frozensets contain mutable items like lists or dictionaries?",
    shortAnswer: "No, attempting to create frozenset([[1, 2]]) raises TypeError: unhashable type: 'list'.",
    explanation: "A frozenset must calculate its own hash from its constituent elements. If any inner element is unhashable, the constructor fails.",
    hint: "All elements inside a frozenset must themselves be hashable.",
    level: "moderate",
    codeExample: "try:\n    frozenset([[1, 2]])\nexcept TypeError as e:\n    print(e)  # unhashable type: 'list'"
  },
  {
    question: "How do you 'modify' an element in a frozenset?",
    shortAnswer: "You cannot modify it in place; you must create a new frozenset using set operations or comprehension.",
    explanation: "Like tuples and strings, frozenset is immutable. To add an element, construct a new instance: new_fs = fs | frozenset([new_elem]).",
    hint: "Construct a new frozenset containing the desired items.",
    level: "basic",
    codeExample: "fs = frozenset([1, 2])\nnew_fs = fs | frozenset([3])\nprint(new_fs)  # frozenset({1, 2, 3})"
  },
  {
    question: "What is the memory size in bytes of frozenset vs set in 64-bit CPython?",
    shortAnswer: "frozenset is slightly smaller (~216 bytes vs ~216+ bytes) and does not need excess capacity resizing buffers.",
    explanation: "Because frozenset will never grow or shrink, CPython allocates exactly the compact bucket table required without reservation buffers.",
    hint: "frozenset is compact because it never resizes.",
    level: "expert",
    codeExample: "import sys\nprint(sys.getsizeof(frozenset(range(5))))"
  },
  {
    question: "Why does frozenset(frozenset([1, 2])) return the exact same object in memory (singleton re-use)?",
    shortAnswer: "Because frozenset is immutable, CPython optimizes construction by returning the argument directly (is identity match).",
    explanation: "Just like tuple(my_tuple) is my_tuple, passing a frozenset to the frozenset constructor returns the same memory instance in O(1) time without copying.",
    hint: "Immutable constructors return the same instance.",
    level: "expert",
    codeExample: "fs1 = frozenset([1, 2, 3])\nfs2 = frozenset(fs1)\nprint(fs1 is fs2)  # True (Exact same object in RAM!)"
  },
  {
    question: "How can frozenset be used to cache function results with order-independent tag arguments in @functools.lru_cache?",
    shortAnswer: "Pass arguments as frozenset(tags) so the cache key is hashable and order-independent.",
    explanation: "lru_cache hashes function arguments to cache return values. Using frozenset ensures that func(frozenset(['A', 'B'])) and func(frozenset(['B', 'A'])) hit the exact same cache entry.",
    hint: "frozenset provides hashable, order-independent cache keys.",
    level: "expert",
    codeExample: "from functools import lru_cache\n@lru_cache(maxsize=128)\ndef compute_pricing(course_bundle: frozenset):\n    return sum(len(c) * 1000 for c in course_bundle)"
  },
  {
    question: "What is the result of evaluating: frozenset() == set()?",
    shortAnswer: "True.",
    explanation: "Set equality (==) evaluates element contents regardless of whether the containers are mutable sets or immutable frozensets.",
    hint: "Empty frozenset and empty set compare equal.",
    level: "basic",
    codeExample: "print(frozenset() == set())  # True\nprint(frozenset([1, 2]) == {1, 2})  # True"
  },
  {
    question: "What is the result of evaluating: frozenset() is set()?",
    shortAnswer: "False, because they are distinct types (<class 'frozenset'> vs <class 'set'>) located at different memory addresses.",
    explanation: "The 'is' identity operator checks if both references point to the exact same object in RAM.",
    hint: "Equality is True, but object identity is False.",
    level: "basic",
    codeExample: "print(frozenset() is set())  # False"
  },
  {
    question: "What is the output of: s = {frozenset([1, 2]), frozenset([2, 1])}; print(len(s))?",
    shortAnswer: "1.",
    explanation: "frozenset([1, 2]) and frozenset([2, 1]) contain identical elements, so their hashes match and they compare equal, collapsing into a single member.",
    hint: "Order does not matter; identical sets collapse.",
    level: "moderate",
    codeExample: "s = {frozenset([1, 2]), frozenset([2, 1])}\nprint(len(s))  # 1"
  },
  {
    question: "Can you iterate through a frozenset in a for-loop and use enumerate()?",
    shortAnswer: "Yes, frozenset implements the full iterator protocol (__iter__ and __next__).",
    explanation: "All standard non-mutating traversal tools (for, in, len, enumerate, min, max, sum, sorted) work identically on frozensets.",
    hint: "frozenset is fully iterable.",
    level: "basic",
    codeExample: "fs = frozenset([\"Barrackpore\", \"Kolkata\"])\nfor idx, city in enumerate(fs):\n    print(idx, city)"
  },
  {
    question: "Can frozenset be unpacked using the * operator: [*frozenset([1, 2, 3])]?",
    shortAnswer: "Yes, unpacking extracts elements into lists, tuples, or function arguments.",
    explanation: "Because frozenset is an iterable, the * unpacking operator extracts all its elements seamlessly.",
    hint: "frozenset supports * unpacking.",
    level: "basic",
    codeExample: "fs = frozenset([10, 20, 30])\nprint([*fs])  # [10, 20, 30]"
  },
  {
    question: "What happens if you execute: fs.copy() on a frozenset?",
    shortAnswer: "It returns the exact same frozenset instance (self) in O(1) time without allocating new memory.",
    explanation: "Since frozenset is immutable, duplicating it is unnecessary. CPython's frozenset.copy() simply returns self.",
    hint: "Copying an immutable frozenset returns itself.",
    level: "expert",
    codeExample: "fs1 = frozenset([1, 2])\nfs2 = fs1.copy()\nprint(fs1 is fs2)  # True (Same object!)"
  },
  {
    question: "How can frozenset represent graph edges in undirected graph algorithms?",
    shortAnswer: "Store each edge as frozenset({node_u, node_v}).",
    explanation: "In an undirected graph, edge (u, v) is identical to edge (v, u). Using frozenset automatically treats (u, v) and (v, u) as the exact same edge in sets of edges.",
    hint: "frozenset({u, v}) is order-independent for undirected edges.",
    level: "expert",
    codeExample: "edges = set()\nedges.add(frozenset({\"NodeA\", \"NodeB\"}))\nedges.add(frozenset({\"NodeB\", \"NodeA\"}))  # Duplicate! Collapsed.\nprint(len(edges))  # 1"
  },
  {
    question: "What is the output of: bool(frozenset()) vs bool(frozenset([0]))?",
    shortAnswer: "bool(frozenset()) is False; bool(frozenset([0])) is True.",
    explanation: "Truthiness is based on len(fs) > 0, matching standard set behavior.",
    hint: "Empty frozenset is falsy; non-empty is truthy.",
    level: "basic",
    codeExample: "print(bool(frozenset()))     # False\nprint(bool(frozenset([0])))  # True"
  },
  {
    question: "Can frozenset be sorted using the sorted() built-in function?",
    shortAnswer: "Yes, sorted(fs) returns a new ascending list of elements.",
    explanation: "sorted() works on any iterable and produces an ordered list without altering the original frozenset.",
    hint: "sorted() returns a sorted list from the frozenset.",
    level: "basic",
    codeExample: "fs = frozenset([50, 10, 40])\nprint(sorted(fs))  # [10, 40, 50]"
  },
  {
    question: "What is the result of frozenset('abracadabra')?",
    shortAnswer: "frozenset({'a', 'b', 'c', 'd', 'r'}).",
    explanation: "The constructor iterates over the string and extracts the unique distinct characters into an immutable frozenset.",
    hint: "Extracts unique distinct letters.",
    level: "basic",
    codeExample: "print(frozenset(\"abracadabra\"))  # frozenset({'a', 'b', 'c', 'd', 'r'})"
  },
  {
    question: "Can frozensets be compared using subset (<=) and superset (>=) operators?",
    shortAnswer: "Yes, frozensets support all relational comparison operators (<=, <, >=, >, ==, !=).",
    explanation: "frozenset implements the complete set comparison algebra.",
    hint: "All comparison operators are supported.",
    level: "basic",
    codeExample: "fs1 = frozenset([1, 2])\nfs2 = frozenset([1, 2, 3])\nprint(fs1 <= fs2)  # True"
  },
  {
    question: "Why should global security roles and whitelist constants be declared as frozenset rather than set?",
    shortAnswer: "To prevent runtime tampering or accidental modification by buggy functions.",
    explanation: "Declaring ROLES = frozenset([...]) guarantees that no module or function can accidentally execute ROLES.add() or ROLES.clear().",
    hint: "frozenset makes global configuration constants immutable and tamper-proof.",
    level: "moderate",
    codeExample: "BANNED_IPS = frozenset([\"192.168.1.1\", \"10.0.0.5\"])\n# BANNED_IPS.clear()  # Protected! Raises AttributeError"
  },
  {
    question: "How can you convert a mutable set into a frozenset and vice-versa?",
    shortAnswer: "fs = frozenset(s) to freeze; s = set(fs) to unfreeze.",
    explanation: "Passing either container to the other constructor creates a new instance of the target container type in O(N) time.",
    hint: "Use frozenset(s) and set(fs).",
    level: "basic",
    codeExample: "s = {1, 2}\nfs = frozenset(s)  # Frozen\ns2 = set(fs)       # Mutable again"
  },
  {
    question: "What is the output of: frozenset([1, 2]) in {frozenset([1, 2]), frozenset([3, 4])}?",
    shortAnswer: "True.",
    explanation: "The outer set computes hash(frozenset([1, 2])) and finds the matching entry in O(1) time.",
    hint: "frozenset membership lookup is O(1).",
    level: "basic",
    codeExample: "nested = {frozenset([1, 2]), frozenset([3, 4])}\nprint(frozenset([1, 2]) in nested)  # True"
  },
  {
    question: "Can frozenset comprehension be written directly using syntax like (x for x in data)?",
    shortAnswer: "No, (x for x in data) creates a generator; you must write frozenset(x for x in data).",
    explanation: "Since frozenset has no literal syntax, comprehensions must pass generator expressions to the frozenset() constructor.",
    hint: "Pass the generator to the frozenset constructor.",
    level: "moderate",
    codeExample: "fs = frozenset(x**2 for x in range(5))\nprint(fs)  # frozenset({0, 1, 4, 9, 16})"
  },
  {
    question: "What happens if you use the |= operator on a frozenset variable: fs |= {3, 4}?",
    shortAnswer: "It creates a NEW frozenset and rebinds the variable fs (it does NOT mutate the original frozenset in place).",
    explanation: "Because frozenset is immutable, fs |= {3, 4} expands to fs = fs | {3, 4}, creating a new frozenset object and rebinding the variable name.",
    hint: "It rebinds the variable to a newly allocated frozenset.",
    level: "expert",
    codeExample: "fs = frozenset([1, 2])\nold_id = id(fs)\nfs |= {3, 4}\nprint(fs)               # frozenset({1, 2, 3, 4})\nprint(id(fs) != old_id) # True (New object allocated)"
  },
  {
    question: "How does frozenset provide thread safety in multi-threaded Python applications?",
    shortAnswer: "Because its internal state is read-only and immutable, multiple threads can safely read and query it concurrently without locks.",
    explanation: "Immutable data structures eliminate race conditions and data corruption during concurrent read operations.",
    hint: "Immutability guarantees thread safety for concurrent reads.",
    level: "expert",
    codeExample: "# Multiple threads querying a shared frozenset require zero mutex locks"
  },
  {
    question: "What is the output of: hash(frozenset([1, 2])) == hash(frozenset([2, 1]))?",
    shortAnswer: "True.",
    explanation: "frozenset hashing is order-independent and depends only on its distinct element members.",
    hint: "Identical sets produce identical hash values.",
    level: "basic",
    codeExample: "print(hash(frozenset([1, 2])) == hash(frozenset([2, 1])))  # True"
  },
  {
    question: "What is the master summary rule for when to use frozenset in Python?",
    shortAnswer: "Use frozenset whenever you need set functionality as a Dictionary Key, as an element of another Set, or as an immutable tamper-proof constant.",
    explanation: "frozenset bridges the gap between set uniqueness/algebra and immutability/hashability across Python systems.",
    hint: "Dict Keys, Nested Sets, and Tamper-Proof Constants -> Use frozenset!",
    level: "basic",
    codeExample: "# Master Use Cases:\n# 1. Dict Key:       d[frozenset(tags)] = value\n# 2. Nested Set:     outer_set = {frozenset(sub_set)}\n# 3. Sealed Config:  CONFIG = frozenset([...])"
  }
];

export default questions;
