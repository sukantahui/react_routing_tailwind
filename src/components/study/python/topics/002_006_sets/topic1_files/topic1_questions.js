// src/components/study/python/topics/002_006_sets/topic1_files/topic1_questions.js
// 30 Comprehensive Master Review & Viva Questions for Topic 1: Creating Sets

const questions = [
  {
    question: "What are the two primary methods to create a Set in Python, and how do they differ syntactically?",
    shortAnswer: "Set literal curly braces {} (e.g. {1, 2, 3}) and the type constructor set(iterable).",
    explanation: "Set literals use comma-separated elements enclosed in curly braces {1, 2, 3}. The set() constructor is a built-in callable that accepts any iterable (list, string, tuple, dict, range) and unpacks its elements into a set.",
    hint: "Think about literal brackets vs calling a function.",
    level: "basic",
    codeExample: "s1 = {10, 20, 30}       # Set literal\ns2 = set([10, 20, 30])  # Set constructor"
  },
  {
    question: "Why does s = {} create a dictionary instead of an empty set?",
    shortAnswer: "Historical syntax precedence: dictionaries were added to Python before sets and claimed {}.",
    explanation: "When Python introduced sets in Python 2.4, the literal {} had already been defined as an empty dictionary since Python's inception. To avoid breaking existing codebases, {} remains an empty dict, and set() was designated for empty sets.",
    hint: "Recall backward compatibility in language design.",
    level: "basic",
    codeExample: "print(type({}))     # <class 'dict'>\nprint(type(set()))  # <class 'set'>"
  },
  {
    question: "What happens when you pass a single non-iterable integer to the set() constructor (e.g., set(100))?",
    shortAnswer: "It raises TypeError: 'int' object is not iterable.",
    explanation: "The set() constructor requires an iterable argument (an object that implements __iter__ or __getitem__). Since integers are non-iterable scalars, passing 100 directly triggers a TypeError. You must pass an iterable like set([100]) or use a literal {100}.",
    hint: "The constructor expects something it can loop over.",
    level: "basic",
    codeExample: "try:\n    s = set(100)\nexcept TypeError as e:\n    print(e)  # 'int' object is not iterable"
  },
  {
    question: "What is the result of set('Barrackpore') and how many elements will it contain?",
    shortAnswer: "A set of unique characters: {'B', 'a', 'r', 'c', 'k', 'p', 'o', 'e'} with length 8.",
    explanation: "A string is an iterable sequence of characters. The set() constructor iterates through each character in 'Barrackpore' and discards duplicate letters ('r', 'a'). 'Barrackpore' has 11 letters total with 8 distinct characters.",
    hint: "Count distinct uppercase and lowercase letters individually.",
    level: "basic",
    codeExample: "s = set(\"Barrackpore\")\nprint(s)\nprint(\"Length:\", len(s))  # 8"
  },
  {
    question: "How does Python's bytecode differ when creating a set using literals vs the set() constructor?",
    shortAnswer: "Literals use the direct BUILD_SET opcode; constructor uses LOAD_GLOBAL (set) + CALL_FUNCTION.",
    explanation: "Set literals compile directly into the optimized BUILD_SET bytecode instruction, pushing values directly onto the stack. set([1, 2]) must look up the global 'set' name, build a list via BUILD_LIST, and perform a function call, making literals significantly faster.",
    hint: "Inspect bytecode using Python's dis module.",
    level: "expert",
    codeExample: "import dis\nprint(\"Literal bytecode:\")\ndis.dis(\"{1, 2, 3}\")\nprint(\"\nConstructor bytecode:\")\ndis.dis(\"set([1, 2, 3])\")"
  },
  {
    question: "What elements are created when you pass a dictionary directly to set(my_dict)?",
    shortAnswer: "Only the dictionary's keys are extracted into the set.",
    explanation: "By default, iterating over a dictionary in Python yields its keys. Therefore, set(my_dict) creates a set containing the unique keys of the dictionary, ignoring values.",
    hint: "Remember what 'for k in my_dict' iterates over.",
    level: "moderate",
    codeExample: "prices = {\"Pen\": 20, \"Book\": 150, \"Eraser\": 10}\nprint(set(prices))  # {'Pen', 'Book', 'Eraser'}"
  },
  {
    question: "How can you create a set of all unique VALUES from a dictionary?",
    shortAnswer: "Pass dict.values() to the set() constructor: set(my_dict.values()).",
    explanation: "To extract values instead of keys, you pass the values view object returned by my_dict.values() to set(). All dictionary values must be immutable (hashable).",
    hint: "Use the .values() method on the dictionary.",
    level: "basic",
    codeExample: "marks = {\"Susmita\": 95, \"Debangshu\": 88, \"Mamata\": 95}\nunique_scores = set(marks.values())\nprint(unique_scores)  # {88, 95}"
  },
  {
    question: "What is the difference between {(1, 2, 3)} and set((1, 2, 3))?",
    shortAnswer: "{(1, 2, 3)} creates a set containing 1 tuple element; set((1, 2, 3)) creates a set of 3 integer elements {1, 2, 3}.",
    explanation: "The literal {(1, 2, 3)} treats the tuple as a single hashable element inside the set (length 1). The constructor set((1, 2, 3)) iterates through the tuple, unpacking its individual integer components into {1, 2, 3} (length 3).",
    hint: "One unpacks the sequence; the other embeds the container.",
    level: "moderate",
    codeExample: "s_lit = {(1, 2, 3)}\nprint(s_lit, len(s_lit))      # {(1, 2, 3)}, len = 1\n\ns_con = set((1, 2, 3))\nprint(s_con, len(s_con))      # {1, 2, 3}, len = 3"
  },
  {
    question: "Can you create a single-element set without a trailing comma?",
    shortAnswer: "Yes, {item} creates a single-element set. (Unlike tuples where (item,) requires a comma).",
    explanation: "Because curly braces with content are unambiguous in Python grammar, {42} immediately creates a set with one element. Tuples need a trailing comma (42,) because parentheses without commas are treated as mathematical grouping expressions.",
    hint: "Compare {42} with (42) vs (42,).",
    level: "basic",
    codeExample: "single_set = {42}\nprint(type(single_set))  # <class 'set'>\n\nnot_a_tuple = (42)\nprint(type(not_a_tuple))  # <class 'int'>"
  },
  {
    question: "What is the output of set(range(5, 0, -1))?",
    shortAnswer: "{1, 2, 3, 4, 5} (unordered representation of the generated range integers).",
    explanation: "The range(5, 0, -1) generates numbers 5, 4, 3, 2, 1. When passed into set(), all 5 integers are added into hash buckets, resulting in the set {1, 2, 3, 4, 5}.",
    hint: "Trace the sequence produced by range with negative step.",
    level: "basic",
    codeExample: "s = set(range(5, 0, -1))\nprint(s)  # {1, 2, 3, 4, 5}"
  },
  {
    question: "What happens if an iterable passed to set() contains an unhashable item (like a list)?",
    shortAnswer: "Python raises TypeError: unhashable type: 'list' during iteration.",
    explanation: "As set() unpacks the iterable and computes hash(item) for each element, encountering a mutable object (like a list or dict) raises a TypeError, terminating set construction.",
    hint: "Every element yielded by the iterable must be immutable.",
    level: "moderate",
    codeExample: "nested = [10, 20, [30, 40], 50]\ntry:\n    s = set(nested)\nexcept TypeError as e:\n    print(e)  # unhashable type: 'list'"
  },
  {
    question: "How can you create a set from a generator expression?",
    shortAnswer: "Pass the generator expression inside set() or use set comprehension {expr for item in iterable}.",
    explanation: "Both set(x**2 for x in range(5)) and {x**2 for x in range(5)} create a set of squares {0, 1, 4, 9, 16}. The comprehension syntax is slightly more concise and direct.",
    hint: "Use curly braces with a for clause.",
    level: "moderate",
    codeExample: "s1 = set(x**2 for x in range(5))\ns2 = {x**2 for x in range(5)}\nprint(s1 == s2)  # True"
  },
  {
    question: "What is the output of set(b'ABC')?",
    shortAnswer: "{65, 66, 67}, containing the integer ASCII byte values.",
    explanation: "Iterating over a bytes object yields individual byte values as integers (ord('A')=65, ord('B')=66, ord('C')=67). Therefore, set(b'ABC') produces {65, 66, 67}.",
    hint: "Bytes yield integer byte codes when iterated.",
    level: "expert",
    codeExample: "byte_set = set(b\"ABC\")\nprint(byte_set)  # {65, 66, 67}"
  },
  {
    question: "How do you create a set containing key-value pair tuples from a dictionary?",
    shortAnswer: "Pass dict.items() to set(): set(my_dict.items()).",
    explanation: "my_dict.items() returns (key, value) tuple views. Since tuples are immutable (assuming keys and values are hashable), set(my_dict.items()) produces a set of (key, value) tuples.",
    hint: "Use the .items() method to get tuple pairs.",
    level: "moderate",
    codeExample: "user_roles = {\"Susmita\": \"Admin\", \"Debangshu\": \"Editor\"}\npair_set = set(user_roles.items())\nprint(pair_set)  # {('Susmita', 'Admin'), ('Debangshu', 'Editor')}"
  },
  {
    question: "What is the result of creating a set literal with trailing comma: s = {1, 2, 3,}?",
    shortAnswer: "{1, 2, 3}, identical to without trailing comma (trailing commas are optional in Python collections).",
    explanation: "Python permits optional trailing commas across all collection literals (lists, tuples, dicts, sets) for multiline clean diff formatting in version control.",
    hint: "Python syntax allows trailing commas in collections.",
    level: "basic",
    codeExample: "s = {\n    \"Barrackpore\",\n    \"Kolkata\",\n    \"Ichapur\",\n}\nprint(len(s))  # 3"
  },
  {
    question: "Why does set(set([1, 2, 3])) not cause an error even though sets are unhashable?",
    shortAnswer: "Because set() iterates over the inner set's elements (which are hashable ints), rather than trying to store the set itself.",
    explanation: "The outer set() consumes the inner set as an iterable stream of integers 1, 2, 3, inserting each int into the new set. It does not attempt to store the inner set as a member.",
    hint: "Distinguish between iterating over a set vs inserting a set as an element.",
    level: "moderate",
    codeExample: "inner = {1, 2, 3}\nouter = set(inner)  # Perfectly valid clone\nprint(outer)        # {1, 2, 3}"
  },
  {
    question: "How do you create a set of frozensets using literals and constructors?",
    shortAnswer: "Wrap inner collections with frozenset() inside outer set: {frozenset([1, 2]), frozenset([3, 4])}.",
    explanation: "Because frozenset objects are immutable and hashable, they can be safely stored as elements inside standard mutable sets.",
    hint: "Use frozenset for the nested elements.",
    level: "expert",
    codeExample: "set_of_sets = {frozenset({1, 2}), frozenset({3, 4})}\nprint(set_of_sets)\nprint(len(set_of_sets))  # 2"
  },
  {
    question: "What is the effect of passing an empty string, empty list, or empty tuple to set()?",
    shortAnswer: "All return an empty set: set().",
    explanation: "Any empty iterable yields zero items when iterated, causing set() to initialize and return an empty set object set().",
    hint: "Empty iterables produce zero elements.",
    level: "basic",
    codeExample: "print(set(\"\"))   # set()\nprint(set([]))   # set()\nprint(set(()))   # set()"
  },
  {
    question: "What is the memory size difference between creating an empty set vs an empty list?",
    shortAnswer: "An empty set is significantly larger (~216-728 bytes) than an empty list (~56 bytes) due to preallocated hash table tables.",
    explanation: "An empty list only allocates a minimal array header. A set immediately allocates an 8-slot open-addressing hash table array to handle subsequent inserts efficiently without instant resizing.",
    hint: "Hash tables pre-allocate slots to avoid immediate collisions.",
    level: "expert",
    codeExample: "import sys\nprint(\"Empty List Size:\", sys.getsizeof([]))      # ~56 bytes\nprint(\"Empty Set Size:\", sys.getsizeof(set()))  # ~216 bytes"
  },
  {
    question: "What is the output of len(set([True, 1, 1.0, 1 + 0j])) and why?",
    shortAnswer: "1, because all four compare equal (==) and have identical hash values.",
    explanation: "In Python, True == 1 == 1.0 == (1+0j) and hash(True) == hash(1) == hash(1.0) == hash(1+0j). Since both equality and hash match, the set retains only the first element encountered.",
    hint: "Check numeric equality and hash values across types.",
    level: "expert",
    codeExample: "s = set([True, 1, 1.0, 1 + 0j])\nprint(s)       # {True}\nprint(len(s))  # 1"
  },
  {
    question: "Can you create a set from a custom generator function?",
    shortAnswer: "Yes, passing a generator function call to set() consumes all yielded values into a set.",
    explanation: "Any generator function that yields values is a valid iterable. set(my_gen()) will execute the generator until exhaustion and collect all yielded items into a deduplicated set.",
    hint: "Generator functions produce iterators.",
    level: "moderate",
    codeExample: "def fib_gen(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nfib_set = set(fib_gen(7))\nprint(fib_set)  # {0, 1, 2, 3, 5, 8}"
  },
  {
    question: "What is the difference between copy() method on a set vs passing a set to set()?",
    shortAnswer: "Both create a shallow copy of the set with identical performance and result.",
    explanation: "new_set = old_set.copy() and new_set = set(old_set) both construct a new independent set container containing references to the original set's elements.",
    hint: "Both perform shallow duplication.",
    level: "moderate",
    codeExample: "orig = {10, 20, 30}\ncp1 = orig.copy()\ncp2 = set(orig)\nprint(cp1 == cp2)  # True\nprint(cp1 is orig) # False"
  },
  {
    question: "What happens when you write set({'a', 'b', 'c'})?",
    shortAnswer: "It redundantly constructs a set literal and then constructs a new cloned set from it.",
    explanation: "The inner {'a', 'b', 'c'} builds a set literal. The outer set(...) consumes that set as an iterable and creates a second identical set. It works fine but performs redundant object creation.",
    hint: "Notice the nested set creation call.",
    level: "basic",
    codeExample: "s = set({'a', 'b', 'c'})\nprint(s)  # {'a', 'b', 'c'}"
  },
  {
    question: "How can you create a set of all vowels present in a user-provided paragraph?",
    shortAnswer: "Use set intersection or a set comprehension filtering against a vowel literal: {c.lower() for c in text if c.lower() in 'aeiou'}.",
    explanation: "Iterating through the string and filtering only characters that exist in 'aeiou' into a set comprehension extracts only the distinct vowels in the text.",
    hint: "Filter characters against 'aeiou'.",
    level: "basic",
    codeExample: "text = \"Learn Python at Barrackpore\"\nvowels = {c.lower() for c in text if c.lower() in 'aeiou'}\nprint(vowels)  # {'a', 'e', 'o'}"
  },
  {
    question: "Why is set(('hello',)) a set with 1 string, while set('hello') has 4 characters?",
    shortAnswer: "('hello',) is a 1-element tuple containing the string; 'hello' is an iterable sequence of characters.",
    explanation: "set(('hello',)) iterates over a 1-element tuple, yielding the entire string 'hello' as a single member. set('hello') iterates over the string character-by-character, yielding 'h', 'e', 'l', 'o'.",
    hint: "Check what each outer iterable yields during iteration.",
    level: "moderate",
    codeExample: "print(set(('hello',)))  # {'hello'}\nprint(set('hello'))     # {'h', 'e', 'l', 'o'}"
  },
  {
    question: "What error occurs if you call set(None)?",
    shortAnswer: "TypeError: 'NoneType' object is not iterable.",
    explanation: "None does not implement the iteration protocol. Attempting to pass None directly to set() raises a TypeError. (Note that {None} works because it uses None as a literal element).",
    hint: "None is not an iterable collection.",
    level: "basic",
    codeExample: "try:\n    s = set(None)\nexcept TypeError as e:\n    print(e)  # 'NoneType' object is not iterable\n\n# Contrast with:\nvalid = {None}\nprint(valid)  # {None}"
  },
  {
    question: "How can you create a set of numbers from 100 to 1000 in steps of 50?",
    shortAnswer: "set(range(100, 1001, 50)) or {x for x in range(100, 1001, 50)}.",
    explanation: "The range(start, stop, step) generates 100, 150, 200, ..., 1000. Passing this into set() collects all step values into a set.",
    hint: "Use range with start, stop, and step arguments.",
    level: "basic",
    codeExample: "step_set = set(range(100, 1001, 50))\nprint(sorted(step_set))"
  },
  {
    question: "What is the time complexity of creating a set literal vs converting an N-element list using set()?",
    shortAnswer: "Both are O(N) where N is the number of elements, but literals have lower constant factor overhead.",
    explanation: "Both must hash and insert N elements into hash buckets, requiring O(N) total work. However, set literals avoid global name lookups and function call frame overhead, giving them a smaller constant factor (C).",
    hint: "Both insert N items, but literals use optimized opcodes.",
    level: "moderate",
    codeExample: "# Time: O(N) for both, but {1, 2, 3} is faster than set([1, 2, 3])"
  },
  {
    question: "What happens when you pass a file object to set(file_handle)?",
    shortAnswer: "It reads the entire file line by line and creates a set of unique text lines.",
    explanation: "Open file handles in Python are iterators that yield one line per iteration. set(file_handle) iterates through all lines, discarding duplicate lines and loading the unique lines into a set.",
    hint: "File objects iterate line by line.",
    level: "expert",
    codeExample: "# with open('data.txt') as f:\n#     unique_lines = set(f)"
  },
  {
    question: "What is the best practice guideline for choosing between set literals and set() in production code?",
    shortAnswer: "Use set literals {...} for fixed static values; use set() for empty set creation and dynamic conversions.",
    explanation: "For constant sets (e.g. ALLOWED_ROLES = {'admin', 'editor'}), set literals are cleaner, more readable, and faster. For initial empty sets or converting runtime iterables (lists, generators, query results), use set().",
    hint: "Static constants -> literals {}; Dynamic iterables/empty -> set().",
    level: "moderate",
    codeExample: "# Good Practice:\nADMIN_ROLES = {\"superadmin\", \"finance_admin\"}  # Literal\nactive_sessions = set()                         # Constructor"
  }
];

export default questions;
