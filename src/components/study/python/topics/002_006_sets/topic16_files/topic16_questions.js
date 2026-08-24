// src/components/study/python/topics/002_006_sets/topic16_files/topic16_questions.js
// 30 Comprehensive Master Review Questions for Topic 16: Sets vs Lists vs Tuples

const questions = [
  {
    question: "What are the core differences between a list, a tuple, and a set in Python?",
    shortAnswer: "A list is mutable and ordered with duplicates; a tuple is immutable and ordered with duplicates; a set is mutable and unordered with unique elements.",
    explanation: "Lists are dynamic arrays, tuples are fixed immutable sequences, and sets are hash table collections enforcing uniqueness and fast O(1) lookups.",
    hint: "Think in terms of Mutability, Ordering, and Uniqueness.",
    level: "basic",
    codeExample: "l = [1, 2, 2]  # List: [1, 2, 2]\nt = (1, 2, 2)  # Tuple: (1, 2, 2)\ns = {1, 2, 2}  # Set: {1, 2}"
  },
  {
    question: "Why do sets consume significantly more RAM than lists or tuples of the same length?",
    shortAnswer: "Sets store an internal sparse hash table with hash codes, bucket pointers, and excess capacity buffers to prevent hash collisions.",
    explanation: "While lists and tuples store compact contiguous arrays of object pointers, sets maintain open-addressing hash buckets (~4-8x larger memory footprint).",
    hint: "Hash tables require extra bucket space and collision metadata.",
    level: "expert",
    codeExample: "import sys\ndata = list(range(1000))\nprint(sys.getsizeof(tuple(data)))  # ~8,040 bytes\nprint(sys.getsizeof(set(data)))    # ~32,984 bytes"
  },
  {
    question: "Which container provides O(1) average time complexity for membership testing ('in' operator)?",
    shortAnswer: "Set (and Dictionary); lists and tuples require O(N) linear scans.",
    explanation: "Sets compute the element's hash and jump directly to the target bucket in O(1) time. Lists and tuples must check elements one by one from index 0 to N-1.",
    hint: "Set uses hash lookups in O(1).",
    level: "basic",
    codeExample: "# Set: O(1) average lookup\n# List/Tuple: O(N) worst case lookup"
  },
  {
    question: "Can a tuple be used as a dictionary key, and can a list or set be used as a dictionary key?",
    shortAnswer: "Tuples can be used as dict keys (if all their elements are hashable); lists and sets cannot because they are mutable.",
    explanation: "Dictionary keys require a stable hash code. Lists and sets raise TypeError: unhashable type. (frozenset can be used as a dict key).",
    hint: "Only hashable, immutable containers can be dictionary keys.",
    level: "basic",
    codeExample: "d = {}\nd[(1, 2)] = \"Tuple Key OK\"     # Valid!\n# d[[1, 2]] = \"List Key\"       # TypeError\n# d[{1, 2}] = \"Set Key\"        # TypeError"
  },
  {
    question: "Why can you index and slice lists and tuples (e.g. data[0]), but cannot index or slice sets?",
    shortAnswer: "Lists and tuples are ordered sequential arrays with integer indices; sets are unordered hash tables with no concept of position or index.",
    explanation: "Because elements in a set are organized by hash codes into buckets, indexing a set raises TypeError: 'set' object is not subscriptable.",
    hint: "Sets do not have positional indices.",
    level: "basic",
    codeExample: "l = [10, 20]; print(l[0])  # 10\ns = {10, 20}\n# print(s[0])              # TypeError: 'set' object is not subscriptable"
  },
  {
    question: "When should you choose a tuple over a list in real-world application architecture?",
    shortAnswer: "When data represents a fixed record with known fields (e.g., GPS coordinates, RGB colors, database rows) that should never be modified at runtime.",
    explanation: "Tuples provide immutability guarantees, prevent accidental data corruption, use less RAM, and can be used as dictionary keys.",
    hint: "Use tuples for fixed, immutable records.",
    level: "moderate",
    codeExample: "GPS_LOCATION = (22.76, 88.36)  # Barrackpore coordinates (Immutable)"
  },
  {
    question: "When should you choose a set over a list?",
    shortAnswer: "When you need to enforce uniqueness, perform fast membership tests ('in'), or compute mathematical operations (union, intersection).",
    explanation: "Sets excel at finding commonalities, differences, and preventing duplicates with instantaneous lookup speed.",
    hint: "Use sets for uniqueness and fast membership testing.",
    level: "basic",
    codeExample: "ALLOWED_PERMS = {\"READ\", \"WRITE\", \"ADMIN\"}\nif req_perm in ALLOWED_PERMS:  # O(1) Instant Check!\n    pass"
  },
  {
    question: "What is the result of adding duplicate elements to a list vs a tuple vs a set?",
    shortAnswer: "Lists and tuples retain every duplicate element; sets silently collapse duplicates to retain only one instance.",
    explanation: "Lists and tuples preserve full multiplicity; sets enforce the mathematical definition of unique elements.",
    hint: "Only sets discard duplicates.",
    level: "basic",
    codeExample: "print(len([1, 1, 1]))  # 3\nprint(len((1, 1, 1)))  # 3\nprint(len({1, 1, 1}))  # 1"
  },
  {
    question: "Can a set contain a tuple as an element?",
    shortAnswer: "Yes, because tuples are immutable and hashable (provided the tuple only contains hashable items).",
    explanation: "A tuple of hashable items has a valid __hash__() code, making it fully legal as a set member.",
    hint: "Hashable tuples are valid set elements.",
    level: "basic",
    codeExample: "point_set = {(0, 0), (1, 2), (3, 4)}\nprint(len(point_set))  # 3"
  },
  {
    question: "Can a set contain a list as an element?",
    shortAnswer: "No, it raises TypeError: unhashable type: 'list'.",
    explanation: "Lists are mutable and unhashable, so they cannot be inserted into a set.",
    hint: "Lists cannot be set elements.",
    level: "basic",
    codeExample: "try:\n    s = {[1, 2]}\nexcept TypeError as e:\n    print(e)  # unhashable type: 'list'"
  },
  {
    question: "How do lists, tuples, and sets compare in terms of element insertion speed?",
    shortAnswer: "list.append() and set.add() are O(1) amortized; tuples are immutable and require allocating an entirely new tuple (O(N)).",
    explanation: "Mutating dynamic arrays and hash tables is O(1); appending to a tuple creates a brand new copy in memory.",
    hint: "Tuples cannot be mutated; appending to them re-allocates.",
    level: "moderate",
    codeExample: "t = (1, 2)\nt = t + (3,)  # Allocates a new 3-element tuple in memory!"
  },
  {
    question: "What happens if you convert a set to a list and back to a set: set(list(my_set)) == my_set?",
    shortAnswer: "True (the resulting set is equal in elements to the original set).",
    explanation: "Set equality compares distinct members, which remain unchanged through the conversion cycle.",
    hint: "Element contents remain identical.",
    level: "basic",
    codeExample: "s = {10, 20, 30}\nprint(set(list(s)) == s)  # True"
  },
  {
    question: "What is the memory size difference between an empty tuple (), empty list [], and empty set set()?",
    shortAnswer: "Empty tuple: ~40 bytes; empty list: ~56 bytes; empty set: ~216 bytes in 64-bit CPython.",
    explanation: "The empty set pre-allocates an 8-bucket hash table structure immediately upon creation.",
    hint: "Empty set starts with an 8-bucket hash table.",
    level: "expert",
    codeExample: "import sys\nprint(sys.getsizeof(()))      # 40 bytes\nprint(sys.getsizeof([]))      # 56 bytes\nprint(sys.getsizeof(set()))   # 216 bytes"
  },
  {
    question: "Which of the three containers supports sorting with the .sort() in-place method?",
    shortAnswer: "Only list supports .sort(); tuples and sets do not have an in-place .sort() method.",
    explanation: "Tuples are immutable (cannot be sorted in place); sets are unordered hash tables (ordering has no meaning). To sort them, use the built-in sorted() function.",
    hint: "Only mutable lists have .sort().",
    level: "basic",
    codeExample: "l = [3, 1, 2]; l.sort(); print(l)  # [1, 2, 3]\ns = {3, 1, 2}\n# s.sort()  # AttributeError!"
  },
  {
    question: "What does the sorted() function return when passed a set or a tuple?",
    shortAnswer: "It always returns a brand new sorted list.",
    explanation: "sorted() consumes any iterable and returns a new list of ordered elements.",
    hint: "sorted() always returns a list.",
    level: "basic",
    codeExample: "print(type(sorted({3, 1, 2})))  # <class 'list'>"
  },
  {
    question: "How do you count occurrences of an item in a list vs a tuple vs a set?",
    shortAnswer: "Lists and tuples use .count(x); sets return 1 if x in s else 0 (or simply x in s).",
    explanation: "Because set elements are strictly unique, an element either occurs exactly 1 time or 0 times.",
    hint: "Sets only hold 0 or 1 instance of any item.",
    level: "basic",
    codeExample: "l = [1, 1, 2]; print(l.count(1))  # 2\ns = {1, 1, 2}; print(1 in s)     # True (Exactly 1)"
  },
  {
    question: "Can list and tuple concatenate using the + operator: list + tuple?",
    shortAnswer: "No, Python raises TypeError: can only concatenate list (not 'tuple') to list.",
    explanation: "The + concatenation operator requires operands to be of the exact same type.",
    hint: "Concatenation requires matching container types.",
    level: "basic",
    codeExample: "# [1, 2] + (3, 4)  # TypeError\nres = [1, 2] + list((3, 4))  # Valid!"
  },
  {
    question: "What is the output of: (1, 2) * 2 vs [1, 2] * 2 vs {1, 2} * 2?",
    shortAnswer: "(1, 2)*2 -> (1, 2, 1, 2); [1, 2]*2 -> [1, 2, 1, 2]; {1, 2}*2 raises TypeError: unsupported operand type for *.",
    explanation: "Sequences support multiplication for repetition; sets do not support multiplication because sets cannot hold duplicates.",
    hint: "Sets do not support repetition multiplication.",
    level: "moderate",
    codeExample: "print((1, 2) * 2)  # (1, 2, 1, 2)\nprint([1, 2] * 2)  # [1, 2, 1, 2]\n# {1, 2} * 2       # TypeError"
  },
  {
    question: "How do you reverse the elements in a list vs a tuple vs a set?",
    shortAnswer: "Lists: list.reverse() or list[::-1]; Tuples: tuple[::-1]; Sets: cannot be reversed (unordered).",
    explanation: "Reversing requires a sequence with defined positions. Because sets have no positional order, reversing a set is meaningless.",
    hint: "Sets have no order to reverse.",
    level: "basic",
    codeExample: "l = [1, 2, 3]; print(l[::-1])  # [3, 2, 1]\nt = (1, 2, 3); print(t[::-1])  # (3, 2, 1)"
  },
  {
    question: "Why does Python allocate tuples as single contiguous memory blocks with zero over-allocation?",
    shortAnswer: "Because tuples are immutable and will never grow, CPython allocates exactly the exact number of slots needed.",
    explanation: "Lists must over-allocate spare capacity slots to support efficient O(1) appends. Tuples need no spare capacity.",
    hint: "Tuples never grow, so they need no over-allocation.",
    level: "expert",
    codeExample: "# Tuples have zero spare capacity slots"
  },
  {
    question: "How do you choose between storing HTTP headers in a list of tuples vs a dictionary vs a set?",
    shortAnswer: "Use a list of tuples [('Header', 'Val')] if duplicate headers are allowed; a dict {'Header': 'Val'} for standard fast lookup; and a set for header name validation.",
    explanation: "HTTP allows multiple 'Set-Cookie' headers with identical keys, which a standard dictionary would overwrite. Lists of tuples preserve duplicates.",
    hint: "List of tuples preserves multiple identical header keys.",
    level: "expert",
    codeExample: "headers = [(\"Set-Cookie\", \"session=1\"), (\"Set-Cookie\", \"theme=dark\")]"
  },
  {
    question: "What is the output of: isinstance({1, 2}, collections.abc.Sequence)?",
    shortAnswer: "False, because set is a Collection/Set, not a Sequence (no indexable order).",
    explanation: "Lists and tuples inherit from Sequence; set inherits from Set and Collection.",
    hint: "Sets are not sequences.",
    level: "expert",
    codeExample: "from collections.abc import Sequence, Set\nprint(isinstance([1, 2], Sequence))  # True\nprint(isinstance((1, 2), Sequence))  # True\nprint(isinstance({1, 2}, Sequence))  # False\nprint(isinstance({1, 2}, Set))       # True"
  },
  {
    question: "How can you unpack all three containers into a function call: func(*list), func(*tuple), func(*set)?",
    shortAnswer: "All three containers support * argument unpacking into function parameters.",
    explanation: "Because list, tuple, and set all implement the iterable protocol (__iter__), the * unpacking operator works on all of them.",
    hint: "All three support * unpacking.",
    level: "basic",
    codeExample: "def add(a, b):\n    return a + b\nprint(add(*[10, 20]))  # 30\nprint(add(*(10, 20)))  # 30\nprint(add(*{10, 20}))  # 30"
  },
  {
    question: "What is the time complexity of deleting an element from a list vs a set?",
    shortAnswer: "Deleting from a list by value (list.remove(x)) or index (del list[i]) is O(N); deleting from a set (set.remove(x)) is O(1).",
    explanation: "Deleting from a list requires scanning to find the element and then shifting all subsequent array pointers. Deleting from a set marks the hash bucket as dummy in O(1) time.",
    hint: "List delete requires shifting elements (O(N)); set delete is O(1).",
    level: "expert",
    codeExample: "# list.remove(x) -> O(N)\n# set.remove(x)  -> O(1)"
  },
  {
    question: "Can you create a list comprehension, a tuple comprehension, and a set comprehension with identical syntax?",
    shortAnswer: "List comp: [x for x in data]; Set comp: {x for x in data}; (x for x in data) creates a generator, not a tuple (must write tuple(x for x in data)).",
    explanation: "(x for x in data) generates a generator object. You must explicitly pass it to tuple() to create a tuple.",
    hint: "(...) creates a generator, not a tuple comprehension.",
    level: "moderate",
    codeExample: "l = [x for x in range(3)]        # List\ns = {x for x in range(3)}        # Set\nt = tuple(x for x in range(3))   # Tuple (from generator)"
  },
  {
    question: "What is the result of: {1, 2} == [1, 2]?",
    shortAnswer: "False, because Python never equates objects of different container types.",
    explanation: "Different container classes compare unequal under ==.",
    hint: "Different container types compare unequal.",
    level: "basic",
    codeExample: "print({1, 2} == [1, 2])  # False\nprint([1, 2] == (1, 2))  # False"
  },
  {
    question: "How do you combine multiple items from a list, a tuple, and a set into a single unique set?",
    shortAnswer: "set(my_list) | set(my_tuple) | my_set or my_set.union(my_list, my_tuple).",
    explanation: "set.union() accepts multiple mixed iterables and unifies them in O(N) time.",
    hint: "Use set.union() on mixed iterables.",
    level: "basic",
    codeExample: "l, t, s = [1, 2], (2, 3), {3, 4}\nprint(s.union(l, t))  # {1, 2, 3, 4}"
  },
  {
    question: "Why does Python cache small integers (-5 to 256) and small tuples in internal freelists?",
    shortAnswer: "To optimize memory allocation and garbage collection for frequently constructed immutable objects.",
    explanation: "Because tuples are immutable, CPython recycles empty and small tuple memory blocks instantly.",
    hint: "Immutable objects can be safely cached and reused.",
    level: "expert",
    codeExample: "# CPython optimizes tuple memory allocation via freelists"
  },
  {
    question: "How do lists, tuples, and sets cooperate in a real-world e-commerce checkout system in West Bengal?",
    shortAnswer: "Tuples represent immutable product catalog items (SKU, title, ₹ price); Lists manage the dynamic shopping cart sequence; and Sets store active promo coupon codes for O(1) validation.",
    explanation: "Composing data structures based on their individual strengths creates high-performance, maintainable software architectures.",
    hint: "Tuples for fixed records, Lists for shopping carts, Sets for promo codes.",
    level: "basic",
    codeExample: "# Tuple: ITEM = ('SKU1', 'Course', 4500)\n# List:  cart = [ITEM, ITEM2]\n# Set:   PROMOS = {'DIWALI', 'PUJA500'}"
  },
  {
    question: "What is the master golden rule for container selection in Python?",
    shortAnswer: "Default to Tuples for fixed records, Lists for ordered sequences with duplicates, and Sets for uniqueness and O(1) membership lookups.",
    explanation: "Selecting the correct container at architecture time eliminates performance bottlenecks and bugs before they start.",
    hint: "Tuples: Records | Lists: Sequences | Sets: Uniqueness & Lookups.",
    level: "basic",
    codeExample: "# Summary Decision Rule:\n# Fixed Record   -> Tuple (lat, lon)\n# Ordered Stream -> List [event1, event2]\n# Fast Lookup    -> Set {'admin', 'editor'}"
  }
];

export default questions;
