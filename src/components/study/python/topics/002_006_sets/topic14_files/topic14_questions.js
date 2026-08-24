// src/components/study/python/topics/002_006_sets/topic14_files/topic14_questions.js
// 30 Comprehensive Master Review Questions for Topic 14: Set Comprehension

const questions = [
  {
    question: "What is a Set Comprehension in Python and what is its standard syntax?",
    shortAnswer: "A concise syntax for creating a set by transforming and filtering elements from an iterable: {expression for item in iterable if condition}.",
    explanation: "Set comprehensions provide a Pythonic, declarative way to construct sets. It evaluates the expression for each item, filters with optional if-clauses, and automatically deduplicates elements in a new set.",
    hint: "Think of curly braces with a for-loop and optional if-condition.",
    level: "basic",
    codeExample: "squares = {x**2 for x in [-2, -1, 0, 1, 2]}\nprint(squares)  # {0, 1, 4}"
  },
  {
    question: "What is the difference in output between a List Comprehension [x%3 for x in range(10)] and a Set Comprehension {x%3 for x in range(10)}?",
    shortAnswer: "The list comprehension produces 10 elements: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0]; the set comprehension collapses them to {0, 1, 2}.",
    explanation: "Lists allow duplicates and preserve 10 entries. Set comprehensions automatically hash and discard duplicates on the fly, producing a 3-element set {0, 1, 2}.",
    hint: "List preserves duplicates; set collapses duplicates.",
    level: "basic",
    codeExample: "l_comp = [x % 3 for x in range(10)]\ns_comp = {x % 3 for x in range(10)}\nprint(len(l_comp))  # 10\nprint(len(s_comp))  # 3"
  },
  {
    question: "How do you distinguish between a Set Comprehension and a Dict Comprehension in Python syntax?",
    shortAnswer: "Set comprehension uses single values ({expr for x in data}); Dict comprehension uses key-value pairs separated by a colon ({k: v for x in data}).",
    explanation: "Both use curly braces {}, but the presence of key: value syntax distinguishes a dictionary comprehension from a set comprehension.",
    hint: "Look for the colon ':' between key and value.",
    level: "basic",
    codeExample: "s = {x for x in [1, 2, 3]}       # Set Comprehension\nd = {x: x**2 for x in [1, 2, 3]} # Dict Comprehension"
  },
  {
    question: "What is the result of {word.lower() for word in ['Python', 'PYTHON', 'python', 'PyThOn']}?",
    shortAnswer: "{'python'} (a 1-element set).",
    explanation: "word.lower() normalizes every variant to 'python'. Because set comprehensions eliminate duplicates, only a single 'python' string remains.",
    hint: "All variants normalize to the same lowercase string.",
    level: "basic",
    codeExample: "words = [\"Python\", \"PYTHON\", \"python\", \"PyThOn\"]\nprint({w.lower() for w in words})  # {'python'}"
  },
  {
    question: "Why is a set comprehension faster than initializing an empty set and calling set.add() inside a standard Python for-loop?",
    shortAnswer: "Set comprehensions run their loop and element insertions entirely inside optimized CPython bytecode (BUILD_SET and MAP_ADD opcodes) without per-iteration Python bytecode function call overhead.",
    explanation: "CPython optimizes comprehensions at the bytecode level, avoiding repeated name lookups (s.add) and method invocation frames.",
    hint: "Comprehensions execute inside C-level bytecode.",
    level: "expert",
    codeExample: "# C-level opcode optimization makes {x for x in data} faster than s.add() in loops"
  },
  {
    question: "How do you write a set comprehension with multiple nested for-loops to flatten a 2D matrix?",
    shortAnswer: "{item for row in matrix for item in row}.",
    explanation: "The order of for clauses in a comprehension matches the order of traditional nested for-loops (outer loop first, inner loop second).",
    hint: "Outer loop first, followed by inner loop.",
    level: "moderate",
    codeExample: "matrix = [[1, 2], [2, 3], [3, 4]]\nflat = {item for row in matrix for item in row}\nprint(flat)  # {1, 2, 3, 4}"
  },
  {
    question: "Can you include multiple 'if' filtering conditions in a set comprehension?",
    shortAnswer: "Yes, multiple if clauses can be chained, acting as logical AND conditions: {x for x in data if cond1 if cond2}.",
    explanation: "Chaining if clauses ({x for x in nums if x > 0 if x % 2 == 0}) filters items that satisfy both conditions simultaneously.",
    hint: "Chained if clauses act as an AND condition.",
    level: "moderate",
    codeExample: "nums = range(20)\neven_pos = {x for x in nums if x > 10 if x % 2 == 0}\nprint(even_pos)  # {12, 14, 16, 18}"
  },
  {
    question: "Can you use an 'if-else' ternary expression in the output part of a set comprehension?",
    shortAnswer: "Yes: {expr_true if condition else expr_false for item in iterable}.",
    explanation: "Ternary expressions go in the expression position (before the for keyword), allowing conditional value transformation.",
    hint: "Ternary if/else goes before the 'for' keyword.",
    level: "moderate",
    codeExample: "nums = [1, 2, 3, 4, 5, 6]\nlabels = {\"EVEN\" if x % 2 == 0 else \"ODD\" for x in nums}\nprint(labels)  # {'EVEN', 'ODD'}"
  },
  {
    question: "How do you extract all unique email domain names from a list of user email strings using set comprehension?",
    shortAnswer: "{email.split('@')[1] for email in emails if '@' in email}.",
    explanation: "Splitting each email at '@' and taking index 1 extracts the domain; the set comprehension collapses duplicate domains automatically.",
    hint: "Split by '@' and extract index 1.",
    level: "basic",
    codeExample: "emails = [\"s@gmail.com\", \"d@yahoo.com\", \"m@gmail.com\", \"a@outlook.com\"]\ndomains = {e.split('@')[1] for e in emails if '@' in e}\nprint(domains)  # {'gmail.com', 'yahoo.com', 'outlook.com'}"
  },
  {
    question: "What happens if an expression inside a set comprehension yields an unhashable object like a list: {[x] for x in range(3)}?",
    shortAnswer: "It immediately raises TypeError: unhashable type: 'list'.",
    explanation: "Because set elements must be hashable, trying to add the generated list [x] fails during hash computation.",
    hint: "Comprehension output elements must be hashable.",
    level: "moderate",
    codeExample: "try:\n    bad_comp = {[x] for x in range(3)}\nexcept TypeError as e:\n    print(e)  # unhashable type: 'list'"
  },
  {
    question: "How can you create a set of tuples representing coordinate pairs (x, y) where x + y == 10 using set comprehension?",
    shortAnswer: "{(x, y) for x in range(11) for y in range(11) if x + y == 10}.",
    explanation: "Iterates through all x and y combinations, filters where sum is 10, and packs matching pairs into immutable hashable tuples.",
    hint: "Pack x and y into a tuple (x, y).",
    level: "moderate",
    codeExample: "pairs = {(x, y) for x in range(11) for y in range(11) if x + y == 10}\nprint(pairs)"
  },
  {
    question: "How do you extract unique file extensions from a list of file paths using set comprehension?",
    shortAnswer: "{file.split('.')[-1] for file in file_list if '.' in file}.",
    explanation: "Splitting filenames by '.' and taking the last segment extracts distinct file extensions in a single line.",
    hint: "Split by '.' and take index -1.",
    level: "basic",
    codeExample: "files = [\"data.csv\", \"script.py\", \"report.pdf\", \"notes.txt\", \"test.py\"]\nexts = {f.split('.')[-1] for f in files if '.' in f}\nprint(exts)  # {'csv', 'py', 'pdf', 'txt'}"
  },
  {
    question: "What is the result of {x for x in 'barrackpore' if x not in 'aeiou'}?",
    shortAnswer: "{'b', 'r', 'c', 'k', 'p'} (The distinct consonants in 'barrackpore').",
    explanation: "Iterates over the string, filters out vowel characters, and collects the remaining consonant letters into a set.",
    hint: "Extracts distinct non-vowel letters.",
    level: "basic",
    codeExample: "consonants = {c for c in \"barrackpore\" if c not in \"aeiou\"}\nprint(consonants)  # {'b', 'r', 'c', 'k', 'p'}"
  },
  {
    question: "Can set comprehension be used on dictionary items: {k for k, v in my_dict.items() if v > 100}?",
    shortAnswer: "Yes, iterating over my_dict.items() allows unpacking keys and values for conditional set creation.",
    explanation: "Extracts keys whose associated values meet the filter criteria, returning a set of matching keys.",
    hint: "Unpack k, v in my_dict.items().",
    level: "basic",
    codeExample: "prices = {\"Laptop\": 65000, \"Mouse\": 500, \"Monitor\": 15000}\nexpensive = {k for k, v in prices.items() if v > 1000}\nprint(expensive)  # {'Laptop', 'Monitor'}"
  },
  {
    question: "What is the difference between set(x**2 for x in data) and {x**2 for x in data}?",
    shortAnswer: "Both produce an identical set, but the comprehension {x**2 for x in data} is slightly faster and more idiomatic.",
    explanation: "set(gen) creates a generator object and calls the set constructor. The set comprehension uses direct bytecode instructions (BUILD_SET).",
    hint: "Comprehension uses direct bytecode instructions.",
    level: "expert",
    codeExample: "s1 = set(x**2 for x in range(5))\ns2 = {x**2 for x in range(5)}\nprint(s1 == s2)  # True"
  },
  {
    question: "How do you sanitize and strip whitespace from a list of user input strings using set comprehension?",
    shortAnswer: "{text.strip() for text in raw_inputs if text.strip()}.",
    explanation: "Calling .strip() removes leading and trailing spaces, and the if clause filters out empty blank strings.",
    hint: "Use .strip() in both expression and if condition.",
    level: "basic",
    codeExample: "inputs = [\"  Kolkata  \", \"Barrackpore\", \"   \", \"Ichapur \"]\nclean = {t.strip() for t in inputs if t.strip()}\nprint(clean)  # {'Kolkata', 'Barrackpore', 'Ichapur'}"
  },
  {
    question: "What is the output of {len(s) for s in ['a', 'bb', 'ccc', 'dd', 'eee']}?",
    shortAnswer: "{1, 2, 3}.",
    explanation: "'a' has len 1; 'bb' and 'dd' have len 2; 'ccc' and 'eee' have len 3. The set comprehension collapses duplicates into {1, 2, 3}.",
    hint: "Lengths 2 and 3 occur multiple times and collapse.",
    level: "basic",
    codeExample: "lens = {len(s) for s in ['a', 'bb', 'ccc', 'dd', 'eee']}\nprint(lens)  # {1, 2, 3}"
  },
  {
    question: "Can set comprehension replace filter() and map() functions in Python?",
    shortAnswer: "Yes, {func(x) for x in data if predicate(x)} cleanly combines map and filter in a single readable line.",
    explanation: "Set comprehensions are widely considered more Pythonic and readable than set(map(func, filter(predicate, data))).",
    hint: "Comprehensions combine map and filter.",
    level: "moderate",
    codeExample: "# Instead of: set(map(str.upper, filter(lambda x: len(x)>3, cities)))\n# Use:\nuppers = {c.upper() for c in [\"goa\", \"kolkata\", \"pune\"] if len(c) > 3}\nprint(uppers)  # {'KOLKATA', 'PUNE'}"
  },
  {
    question: "How do you extract all prime numbers under 30 using a set comprehension with all()?",
    shortAnswer: "{x for x in range(2, 30) if all(x % d != 0 for d in range(2, int(x**0.5) + 1))}.",
    explanation: "Iterates through numbers 2-29 and checks that no divisor divides x evenly.",
    hint: "Combine set comprehension with an all() divisibility test.",
    level: "expert",
    codeExample: "primes = {x for x in range(2, 30) if all(x % d != 0 for d in range(2, int(x**0.5) + 1))}\nprint(sorted(primes))  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]"
  },
  {
    question: "What happens if a set comprehension encounters an exception during execution: {1/x for x in [2, 1, 0, -1]}?",
    shortAnswer: "It terminates immediately and raises ZeroDivisionError.",
    explanation: "Comprehensions do not suppress exceptions; any unhandled runtime error aborts the comprehension.",
    hint: "Exceptions in comprehensions abort execution.",
    level: "basic",
    codeExample: "try:\n    res = {1/x for x in [2, 1, 0, -1]}\nexcept ZeroDivisionError as e:\n    print(\"Trapped:\", e)"
  },
  {
    question: "How can you create a set of frozensets using set comprehension?",
    shortAnswer: "{frozenset(sublist) for sublist in list_of_lists}.",
    explanation: "Wrapping each sublist in frozenset makes each inner container hashable, allowing it to be stored inside the outer set.",
    hint: "Wrap inner iterables in frozenset().",
    level: "moderate",
    codeExample: "batches = [[\"A\", \"B\"], [\"B\", \"A\"], [\"C\", \"D\"]]\nunique_batches = {frozenset(b) for b in batches}\nprint(len(unique_batches))  # 2 (Duplicate {'A', 'B'} collapsed!)"
  },
  {
    question: "What is the scope of loop variables defined inside a set comprehension in Python 3?",
    shortAnswer: "Loop variables are locally scoped to the comprehension and do NOT leak into the enclosing function or global scope.",
    explanation: "In Python 3, comprehensions are executed in their own hidden function scope, preventing variable leakage.",
    hint: "Comprehension variables do not leak into outer scope.",
    level: "expert",
    codeExample: "x = 999\ns = {x * 2 for x in [1, 2, 3]}\nprint(x)  # 999 (Outer variable x was NOT overwritten!)"
  },
  {
    question: "How do you extract unique words longer than 5 letters from a text file using set comprehension?",
    shortAnswer: "{word.lower() for line in file for word in line.split() if len(word) > 5}.",
    explanation: "Iterates through lines, splits into words, filters by length, and lowercases distinct vocabulary words.",
    hint: "Nested loops for lines and words.",
    level: "moderate",
    codeExample: "text = [\"Learn Python programming\", \"Build scalable web applications\"]\nvocab = {w.lower() for line in text for w in line.split() if len(w) > 5}\nprint(vocab)  # {'programming', 'scalable', 'applications', 'python'}"
  },
  {
    question: "What is the output of {x for x in range(5) if False}?",
    shortAnswer: "set() (an empty set).",
    explanation: "Because the if condition evaluates to False for every element, zero elements are collected, returning an empty set.",
    hint: "Condition is always False, so output is empty set.",
    level: "basic",
    codeExample: "print({x for x in range(5) if False})  # set()"
  },
  {
    question: "How can you extract all positive numbers and make them negative in a set comprehension?",
    shortAnswer: "{-x for x in numbers if x > 0}.",
    explanation: "Filters positive numbers and negates them before inserting into the resulting set.",
    hint: "Use -x expression with if x > 0.",
    level: "basic",
    codeExample: "nums = [-5, 10, -3, 20, 0]\nnegs = {-x for x in nums if x > 0}\nprint(negs)  # {-10, -20}"
  },
  {
    question: "Can set comprehension be used with the zip() function?",
    shortAnswer: "Yes: {(a, b) for a, b in zip(list1, list2) if condition}.",
    explanation: "zip() yields paired tuples that can be unpacked and transformed inside the comprehension.",
    hint: "Unpack paired elements from zip().",
    level: "moderate",
    codeExample: "names = [\"Susmita\", \"Debangshu\", \"Mamata\"]\nscores = [92, 88, 95]\nhigh_scorers = {n for n, s in zip(names, scores) if s >= 90}\nprint(high_scorers)  # {'Susmita', 'Mamata'}"
  },
  {
    question: "What is the output of: {c for c in 'MISSISSIPPI'}?",
    shortAnswer: "{'M', 'I', 'S', 'P'}.",
    explanation: "The set comprehension extracts all distinct letters from the string.",
    hint: "Extracts unique letters.",
    level: "basic",
    codeExample: "print({c for c in \"MISSISSIPPI\"})  # {'M', 'I', 'S', 'P'}"
  },
  {
    question: "How do you extract unique IDs of students who have paid full fees in Indian Rupees (>= ₹4,500)?",
    shortAnswer: "{record['id'] for record in student_records if record['paid_inr'] >= 4500}.",
    explanation: "Filters student record dictionaries by the paid_inr field and gathers their distinct IDs.",
    hint: "Filter by fee amount in comprehension.",
    level: "basic",
    codeExample: "records = [{\"id\": \"S1\", \"paid_inr\": 4500}, {\"id\": \"S2\", \"paid_inr\": 2000}]\npaid = {r[\"id\"] for r in records if r[\"paid_inr\"] >= 4500}\nprint(paid)  # {'S1'}"
  },
  {
    question: "Why should you avoid overly complex multi-line nested set comprehensions?",
    shortAnswer: "Readability and maintainability suffer; if a comprehension requires more than 2 loops or complex nested logic, write an explicit for-loop or helper function.",
    explanation: "PEP 20 (The Zen of Python) states 'Readability counts'. Complex comprehensions become difficult to debug and review.",
    hint: "Keep comprehensions simple; use explicit loops for complex logic.",
    level: "moderate",
    codeExample: "# Best Practice: Keep comprehensions concise and readable!"
  },
  {
    question: "What is the key takeaway for a software developer regarding Set Comprehensions?",
    shortAnswer: "Use set comprehensions to combine transformation, filtering, and deduplication into a single, high-performance, and readable line of code.",
    explanation: "Set comprehensions are one of Python's most expressive features, turning multi-line boilerplate loops into elegant declarative data pipelines.",
    hint: "Transform + Filter + Deduplicate in 1 line.",
    level: "basic",
    codeExample: "# Golden Syntax:\n# {expr(x) for x in data if condition(x)}"
  }
];

export default questions;
