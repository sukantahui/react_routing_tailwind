// src/components/study/python/topics/003_005_advance-comprehensions/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: Deep Dive: List, Dict, and Set Comprehensions

const questions = [
  {
    question: "Why are list comprehensions significantly faster than traditional 'for' loops using 'list.append()' in Python?",
    shortAnswer: "Comprehensions execute directly in optimized C-level bytecode instructions ('BUILD_LIST' and 'LIST_APPEND'), bypassing the runtime attribute lookup overhead and method call frame creation of 'list.append()'.",
    explanation: "C-level bytecode execution without method lookup overhead.",
    hint: "Bypasses method lookup overhead of .append() using C-level LIST_APPEND bytecode.",
    level: "basic",
    codeExample: "[x * 2 for x in range(1000)] # Faster than for loop append"
  },
  {
    question: "What is the syntactic difference between Filtering 'if' and Ternary 'if-else' in comprehensions?",
    shortAnswer: "Filtering 'if' goes at the END to omit items: '[x for x in seq if cond]'; Ternary 'if-else' goes at the START to transform items: '[A if cond else B for x in seq]'.",
    explanation: "The two conditional forms serve completely different purposes.",
    hint: "Filtering 'if' is at the end (omits items); Ternary 'if-else' is at the start (transforms items).",
    level: "basic",
    codeExample: "[s for s in scores if s >= 50] vs ['PASS' if s >= 50 else 'FAIL' for s in scores]"
  },
  {
    question: "Can an 'else' clause be used in the trailing filtering 'if' of a comprehension?",
    shortAnswer: "No. Writing '[x for x in seq if cond else other]' is a syntax error; 'else' is only permitted in ternary expressions at the beginning of the comprehension.",
    explanation: "Trailing if clauses are pure boolean filters.",
    hint: "No, trailing 'if' cannot have an 'else' branch; use ternary if-else at the start instead.",
    level: "basic",
    codeExample: "# SYNTAX ERROR: [x for x in seq if x > 0 else 0]"
  },
  {
    question: "How does a Set comprehension differ from a List comprehension?",
    shortAnswer: "A Set comprehension uses curly braces '{expr for x in seq}' and automatically removes duplicate elements, yielding an unordered, unique collection.",
    explanation: "Automatic deduplication and hash table backing.",
    hint: "Uses curly braces and automatically deduplicates elements.",
    level: "basic",
    codeExample: "{x.lower() for x in ['Python', 'PYTHON', 'Java']} # {'python', 'java'}"
  },
  {
    question: "How do you construct a Dict comprehension in Python?",
    shortAnswer: "Using curly braces with a colon separating key and value expressions: '{key_expr: val_expr for x in seq if cond}'.",
    explanation: "Constructs dictionaries directly from iterables in a single expression.",
    hint: "Use {k: v for item in seq}.",
    level: "basic",
    codeExample: "{s['id']: s['name'] for s in students}"
  },
  {
    question: "How do you invert a 1-to-1 dictionary (swap keys and values) using a Dict comprehension?",
    shortAnswer: "Using '{v: k for k, v in original_dict.items()}', assuming all values are unique and hashable.",
    explanation: "Standard recipe for dictionary key-value inversion.",
    hint: "Use {v: k for k, v in d.items()}.",
    level: "basic",
    codeExample: "id_to_name = {'STU-1': 'Alice', 'STU-2': 'Bob'}\nname_to_id = {v: k for k, v in id_to_name.items()}"
  },
  {
    question: "What happens during a direct 1-to-1 dictionary inversion if multiple keys have identical values?",
    shortAnswer: "Subsequent duplicate values overwrite earlier keys in the resulting dictionary; to prevent data loss, you must group keys into a list/set per value.",
    explanation: "Dictionary keys must be unique.",
    hint: "Duplicate values overwrite previous keys; group into lists to avoid loss.",
    level: "moderate",
    codeExample: "# {val: [k for k, v in d.items() if v == val] for val in set(d.values())}"
  },
  {
    question: "Do loop variables in list comprehensions leak into the surrounding scope in Python 3?",
    shortAnswer: "No. In Python 3, comprehensions have their own local nested function scope; loop variables do NOT leak or overwrite variables in the enclosing scope (unlike in Python 2).",
    explanation: "Python 3 scoping isolation.",
    hint: "No, Python 3 isolates comprehension loop variables in their own scope.",
    level: "moderate",
    codeExample: "x = 100; [x for x in range(5)]; print(x) # Prints 100!"
  },
  {
    question: "How does a List comprehension compare to a Generator expression in memory usage?",
    shortAnswer: "A List comprehension constructs the entire list in memory immediately (O(N) RAM); a Generator expression ('(expr for x in seq)') produces items lazily on demand (O(1) RAM).",
    explanation: "Eager memory allocation vs lazy streaming evaluation.",
    hint: "List comp allocates full list in RAM (O(N)); Generator yields on demand (O(1)).",
    level: "moderate",
    codeExample: "sum(x * 2 for x in range(10_000_000)) # O(1) generator memory"
  },
  {
    question: "How do you combine a filtering guard with a ternary transformation in a single comprehension?",
    shortAnswer: "By placing the ternary transformation at the start and the filter guard at the end: '[A if cond1 else B for x in seq if filter_guard]'.",
    explanation: "Processes and transforms only the elements that pass the filter.",
    hint: "Place ternary if-else at start, filter if at end.",
    level: "moderate",
    codeExample: "[f'{x}: EVEN' if x % 2 == 0 else f'{x}: ODD' for x in range(20) if x > 10]"
  },
  {
    question: "Can you create an empty set using '{}'?",
    shortAnswer: "No. '{}' creates an empty dictionary ('dict'); to create an empty set, use 'set()' (though '{x for x in []}' evaluates to an empty set).",
    explanation: "A common beginner syntax pitfall.",
    hint: "{} is an empty dict; use set() for an empty set.",
    level: "basic",
    codeExample: "type({}) # <class 'dict'>; type(set()) # <class 'set'>"
  },
  {
    question: "How do you filter a dictionary by its values using a Dict comprehension?",
    shortAnswer: "Using '{k: v for k, v in d.items() if v >= threshold}'.",
    explanation: "Creates a sub-dictionary containing only matching entries.",
    hint: "Use {k: v for k, v in d.items() if v > threshold}.",
    level: "basic",
    codeExample: "passed = {k: v for k, v in scores.items() if v >= 50}"
  },
  {
    question: "How do you normalize string casing across a collection using a Set comprehension?",
    shortAnswer: "Using '{s.strip().upper() for s in raw_strings}'.",
    explanation: "Eliminates duplicate variations caused by whitespace or letter case.",
    hint: "Apply string methods inside set comprehension: {s.upper() for s in list}.",
    level: "basic",
    codeExample: "{tag.strip().upper() for tag in ['python', ' Python ', 'PYTHON']}"
  },
  {
    question: "What is the time complexity of looking up an item in the result of a List vs Set comprehension?",
    shortAnswer: "List lookup ('item in my_list') is O(N) linear time; Set lookup ('item in my_set') is O(1) constant average time due to hash table indexing.",
    explanation: "Hash table indexing advantages of sets.",
    hint: "List lookup is O(N); Set lookup is O(1).",
    level: "basic",
    codeExample: "valid_ids = {s['id'] for s in students}; if 'STU-101' in valid_ids: ... # O(1)"
  },
  {
    question: "Can side-effects (such as 'print()' or file writes) be placed inside comprehensions?",
    shortAnswer: "Technically yes, but it is strongly discouraged as an anti-pattern; comprehensions should be pure functional expressions used to produce new data structures.",
    explanation: "Comprehensions are for data construction, not side-effects.",
    hint: "Discouraged; comprehensions should construct data, not execute side-effects.",
    level: "moderate",
    codeExample: "# BAD: [print(x) for x in seq] -> GOOD: for x in seq: print(x)"
  },
  {
    question: "How do you create a dictionary mapping words to their character lengths?",
    shortAnswer: "Using '{word: len(word) for word in words}'.",
    explanation: "Classic map transformation.",
    hint: "Use {w: len(w) for w in words}.",
    level: "basic",
    codeExample: "{w: len(w) for w in ['Python', 'FastAPI', 'AI']}"
  },
  {
    question: "How do you flatten a dictionary of lists into a unique set of all items?",
    shortAnswer: "Using '{item for sublist in dict_data.values() for item in sublist}'.",
    explanation: "Flattens nested collections into a deduplicated set.",
    hint: "Nest for loops inside set comprehension: {item for lst in d.values() for item in lst}.",
    level: "complex",
    codeExample: "{badge for badges in student_badges.values() for badge in badges}"
  },
  {
    question: "What error occurs if you attempt to use an unhashable object (like a list) as a key in a Dict comprehension?",
    shortAnswer: "It raises 'TypeError: unhashable type: 'list'' because dictionary keys must be immutable and hashable.",
    explanation: "Hashability requirement for dictionary keys and set elements.",
    hint: "Raises TypeError: unhashable type: 'list'.",
    level: "basic",
    codeExample: "# TypeError: {[1, 2]: 'val'}"
  },
  {
    question: "How do you sort a dictionary by its values using a Dict comprehension?",
    shortAnswer: "Using '{k: v for k, v in sorted(d.items(), key=lambda item: item[1])}'.",
    explanation: "Re-creates the dictionary in sorted value order (Python 3.7+ preserves insertion order).",
    hint: "Sort d.items() by value and rebuild with dict comprehension.",
    level: "moderate",
    codeExample: "{k: v for k, v in sorted(scores.items(), key=lambda x: x[1], reverse=True)}"
  },
  {
    question: "Can a comprehension call user-defined functions or methods in its expression?",
    shortAnswer: "Yes. Any callable expression (such as 'transform(x)' or 'x.to_dict()') can be used as the expression in list, dict, or set comprehensions.",
    explanation: "Allows clean integration of domain model methods.",
    hint: "Yes, functions and methods can be called directly in the expression.",
    level: "basic",
    codeExample: "[student.calculate_gpa() for student in roster]"
  },
  {
    question: "How do you extract common keys between two dictionaries using a Dict comprehension?",
    shortAnswer: "Using '{k: (d1[k], d2[k]) for k in d1.keys() & d2.keys()}'.",
    explanation: "Combines set operations on dict keys with dict comprehension.",
    hint: "Use d1.keys() & d2.keys() intersection inside comprehension.",
    level: "complex",
    codeExample: "{k: d1[k] for k in d1.keys() & d2.keys()}"
  },
  {
    question: "What is the readability guideline for complex comprehensions?",
    shortAnswer: "If a comprehension requires more than two 'for' clauses or multiple nested conditions, refactor it into a standard multi-line 'for' loop or helper function for readability.",
    explanation: "The Zen of Python: 'Readability counts'.",
    hint: "If longer than 2 clauses, refactor to standard loops for readability.",
    level: "basic",
    codeExample: "# Keep comprehensions clean and readable"
  },
  {
    question: "How do you create a identity dictionary mapping a list of IDs to their default state?",
    shortAnswer: "Using '{uid: {'status': 'PENDING', 'attempts': 0} for uid in id_list}'.",
    explanation: "Initializes state structures efficiently.",
    hint: "Use {uid: default_dict for uid in list}.",
    level: "basic",
    codeExample: "{uid: {'active': True} for uid in user_ids}"
  },
  {
    question: "How do you conditionally exclude keys with 'None' values from a dictionary?",
    shortAnswer: "Using '{k: v for k, v in data.items() if v is not None}'.",
    explanation: "Cleans sparse dictionary payloads.",
    hint: "Use {k: v for k, v in d.items() if v is not None}.",
    level: "basic",
    codeExample: "{k: v for k, v in payload.items() if v is not None}"
  },
  {
    question: "What is the ultimate golden rule for List, Dict, and Set Comprehensions in Python?",
    shortAnswer: "Use list comprehensions for fast ordered sequences, set comprehensions for automatic deduplication, and dict comprehensions for key-value transformations; use trailing 'if' for filtering and leading 'if-else' for transformations.",
    explanation: "The complete enterprise blueprint for idiomatic Python comprehensions.",
    hint: "List for sequences, Set for deduplication, Dict for mappings; trailing if filters, leading if-else transforms.",
    level: "basic",
    codeExample: "# Python Comprehension Mastery"
  }
];

export default questions;
