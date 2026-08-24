// src/components/study/python/topics/002_007_string-processing/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Joining Lists of Strings with join()

const questions = [
  {
    question: "What is the syntax for joining a sequence of strings into a single string in Python?",
    shortAnswer: "delimiter.join(iterable)",
    explanation: "The join() method is called on the delimiter string (e.g. ', ', ' - ', '\\n', '') and receives an iterable of strings as its argument.",
    hint: "'separator'.join(list)",
    level: "basic",
    codeExample: "words = ['Python', 'is', 'awesome']\nprint(' '.join(words))  # 'Python is awesome'"
  },
  {
    question: "Why is join() a method of the str class ('delimiter.join(list)') rather than the list class ('list.join(delimiter)')?",
    shortAnswer: "To support polymorphic joining of any arbitrary iterable (tuples, sets, dictionaries, generators, file objects) and guarantee delimiter type safety.",
    explanation: "If join were a list method, it would only work on lists. Putting it on the str class allows any iterable to be joined, guarantees the separator is a string, and prevents code duplication across multiple collection classes.",
    hint: "Allows join() to accept any iterable, not just lists.",
    level: "moderate",
    codeExample: "print(', '.join(('A', 'B', 'C')))         # Tuple\nprint(', '.join({'Python', 'React'}))      # Set\nprint(', '.join(x for x in ['X', 'Y']))    # Generator"
  },
  {
    question: "What happens if you pass an iterable containing non-string objects (like integers) directly to join()?",
    shortAnswer: "Python raises a TypeError: sequence item: expected str instance, int found.",
    explanation: "join() does not implicitly convert items to strings. All elements must strictly be of type 'str'.",
    hint: "Raises TypeError on non-strings.",
    level: "basic",
    codeExample: "nums = [10, 20, 30]\ntry:\n    ','.join(nums)\nexcept TypeError as e:\n    print(e)  # sequence item 0: expected str instance, int found"
  },
  {
    question: "How do you join a list of integers into a comma-separated string defensively?",
    shortAnswer: "','.join(map(str, nums)) or ','.join(str(x) for x in nums)",
    explanation: "Using map(str, nums) or a generator expression converts every element to a string before passing to join().",
    hint: "Use map(str, items) or (str(x) for x in items).",
    level: "basic",
    codeExample: "scores = [95, 88, 92]\nprint(', '.join(map(str, scores)))  # '95, 88, 92'"
  },
  {
    question: "How does delimiter.join() handle an empty iterable [] and a single-element list ['A']?",
    shortAnswer: "join([]) returns an empty string '', and join(['A']) returns 'A' without any delimiter attached.",
    explanation: "In Python, the delimiter is placed strictly BETWEEN elements. It is never prepended at the start or appended at the end.",
    hint: "No trailing or leading delimiters are added.",
    level: "basic",
    codeExample: "print(repr(','.join([])))     # ''\nprint(repr(','.join(['Only']))) # 'Only'"
  },
  {
    question: "What is the time complexity of delimiter.join(list_of_strings) in CPython?",
    shortAnswer: "O(N) linear time with respect to the total number of characters.",
    explanation: "CPython uses a two-pass algorithm: it first calculates the total required memory buffer and allocates it once on the heap, then copies all characters in a single pass using fast native C memcpy().",
    hint: "join() runs in linear O(N) time with a single heap allocation.",
    level: "moderate",
    codeExample: "# Runs in microsecond-scale linear time for 100,000+ items"
  },
  {
    question: "Why is repeated string concatenation using '+=' in a loop considered an anti-pattern?",
    shortAnswer: "Because strings are immutable, '+=' reallocates memory and copies all existing characters on every step, leading to catastrophic O(N^2) quadratic complexity.",
    explanation: "For N strings, copying 1 + 2 + 3 + ... + N characters results in N*(N+1)/2 total operations. For large datasets, += can be 100x slower than join().",
    hint: "+= in a loop causes quadratic O(N^2) memory reallocation.",
    level: "moderate",
    codeExample: "# BAD (O(N^2)):\ns = ''\nfor w in words: s += w\n\n# GOOD (O(N)):\ns = ''.join(words)"
  },
  {
    question: "What happens when you call delimiter.join() directly on a dictionary: ', '.join({'a': 1, 'b': 2})?",
    shortAnswer: "It joins the dictionary's KEYS by default: 'a, b'.",
    explanation: "Iterating over a dictionary yields its keys. To join the values, you must explicitly call d.values(): ', '.join(map(str, d.values())).",
    hint: "Iterating a dictionary yields its keys.",
    level: "basic",
    codeExample: "d = {'name': 'Susmita', 'city': 'Barrackpore'}\nprint(', '.join(d))           # 'name, city'\nprint(', '.join(d.values()))  # 'Susmita, Barrackpore'"
  },
  {
    question: "How can you construct an HTTP URL query string ('key1=val1&key2=val2') using join()?",
    shortAnswer: "'&'.join(f'{k}={v}' for k, v in params.items())",
    explanation: "Iterating through dict.items() and formatting each key-value pair into a string before joining with '&' generates a clean query string.",
    hint: "Use & delimiter with f'{k}={v}' generator.",
    level: "basic",
    codeExample: "params = {'course': 'python', 'center': 'barrackpore', 'page': 1}\nquery = '&'.join(f'{k}={v}' for k, v in params.items())\nprint(query)  # 'course=python&center=barrackpore&page=1'"
  },
  {
    question: "What does '-'.join('PYTHON') output and why?",
    shortAnswer: "'P-Y-T-H-O-N'",
    explanation: "A string in Python is an iterable of 1-character substrings. join() places the hyphen '-' between each character of the string.",
    hint: "Strings are character sequences.",
    level: "basic",
    codeExample: "print('-'.join('PYTHON'))  # 'P-Y-T-H-O-N'"
  },
  {
    question: "How do you join a list of strings with newline characters to form a multi-line document?",
    shortAnswer: "'\\n'.join(lines)",
    explanation: "The newline character '\\n' places every element on a new row without leaving a trailing newline at the bottom of the string.",
    hint: "Use '\\n'.join(lines).",
    level: "basic",
    codeExample: "lines = ['Line 1: Python', 'Line 2: Barrackpore', 'Line 3: Coder & AccoTax']\nprint('\\n'.join(lines))"
  },
  {
    question: "How do you construct a dynamic SQL IN clause like 'WHERE city IN ('Kolkata', 'Barrackpore')' using join()?",
    shortAnswer: "f\"WHERE city IN ({', '.join(repr(c) for c in cities)})\"",
    explanation: "Using repr(c) wraps each string in single quotes, and join(', ') connects them cleanly inside the parentheses.",
    hint: "Wrap elements in quotes with repr(c) or f\"'{c}'\".",
    level: "moderate",
    codeExample: "cities = ['Kolkata', 'Barrackpore', 'Shyamnagar']\nsql = f\"SELECT * FROM students WHERE city IN ({', '.join(repr(c) for c in cities)});\"\nprint(sql)\n# SELECT * FROM students WHERE city IN ('Kolkata', 'Barrackpore', 'Shyamnagar');"
  },
  {
    question: "What is the result of ''.join(['P', 'y', 't', 'h', 'o', 'n'])?",
    shortAnswer: "'Python'",
    explanation: "Using the empty string '' as the delimiter stitches all characters together directly with no intervening separators.",
    hint: "Empty string delimiter performs direct concatenation.",
    level: "basic",
    codeExample: "chars = ['P', 'y', 't', 'h', 'o', 'n']\nprint(''.join(chars))  # 'Python'"
  },
  {
    question: "Can you pass a generator expression directly to join() without converting it to a list first?",
    shortAnswer: "Yes, join() accepts generator expressions directly: ', '.join(x.upper() for x in words).",
    explanation: "Generator expressions are memory-efficient because items are yielded lazily on demand without allocating an intermediate list in memory.",
    hint: "Generators can be passed directly to join().",
    level: "moderate",
    codeExample: "words = ['apple', 'banana', 'cherry']\nprint(', '.join(w.upper() for w in words))  # 'APPLE, BANANA, CHERRY'"
  },
  {
    question: "What is the difference between ', '.join(map(str, data)) and ', '.join([str(x) for x in data])?",
    shortAnswer: "map(str, data) uses an internal C-level iterator; list comprehension creates an intermediate list in memory before joining.",
    explanation: "For very large collections, map() and generator expressions consume less memory than creating full intermediate lists.",
    hint: "map() avoids allocating an intermediate list.",
    level: "moderate",
    codeExample: "data = range(5)\nprint(', '.join(map(str, data)))  # '0, 1, 2, 3, 4'"
  },
  {
    question: "How do you construct a CSV header and data row dynamically using join()?",
    shortAnswer: "headers_csv = ','.join(headers); row_csv = ','.join(map(str, row_values))",
    explanation: "join(',') connects column names and cell data cleanly according to CSV standards.",
    hint: "Use comma as the join delimiter.",
    level: "basic",
    codeExample: "headers = ['ID', 'Name', 'Marks']\nvals = [101, 'Susmita', 96.5]\nprint(','.join(headers))\nprint(','.join(map(str, vals)))"
  },
  {
    question: "What error occurs if you mistakenly write words.join(', ') instead of ', '.join(words)?",
    shortAnswer: "AttributeError: 'list' object has no attribute 'join'.",
    explanation: "The join method belongs to the str class, not the list class.",
    hint: "Lists do not have a join() method.",
    level: "basic",
    codeExample: "words = ['A', 'B']\ntry:\n    words.join(', ')\nexcept AttributeError as e:\n    print(e)  # 'list' object has no attribute 'join'"
  },
  {
    question: "How do you join items with a custom prefix and suffix around each item (e.g. '[A], [B], [C]')?",
    shortAnswer: "', '.join(f'[{x}]' for x in items)",
    explanation: "Using an f-string inside a generator formats each element individually before the delimiter is applied.",
    hint: "Format items with f'[{x}]' before joining.",
    level: "basic",
    codeExample: "letters = ['A', 'B', 'C']\nprint(', '.join(f'[{x}]' for x in letters))  # '[A], [B], [C]'"
  },
  {
    question: "How does join() compare with io.StringIO for string building?",
    shortAnswer: "join() is faster and simpler for existing sequences; io.StringIO is preferred when strings are written incrementally across complex nested loops or functions.",
    explanation: "io.StringIO provides a file-like write() buffer interface. join() is best when all parts can be gathered into an iterable.",
    hint: "join() is ideal for sequences; StringIO is ideal for stream-like writes.",
    level: "complex",
    codeExample: "import io\nbuf = io.StringIO()\nbuf.write('Hello')\nbuf.write(' World')\nprint(buf.getvalue())  # 'Hello World'"
  },
  {
    question: "What is the output of ' * '.join(['Sun', 'Mon', 'Tue'])?",
    shortAnswer: "'Sun * Mon * Tue'",
    explanation: "The 3-character delimiter ' * ' is inserted between the three elements.",
    hint: "Multi-character delimiters are supported.",
    level: "basic",
    codeExample: "days = ['Sun', 'Mon', 'Tue']\nprint(' * '.join(days))  # 'Sun * Mon * Tue'"
  },
  {
    question: "How do you filter out empty strings before joining a list?",
    shortAnswer: "', '.join(x for x in items if x)",
    explanation: "Adding a conditional 'if x' to the generator expression discards empty strings '' and None-like falsy values before joining.",
    hint: "Use an 'if x' filter in the generator.",
    level: "basic",
    codeExample: "parts = ['Barrackpore', '', 'Kolkata', '', 'Shyamnagar']\nprint(', '.join(x for x in parts if x))  # 'Barrackpore, Kolkata, Shyamnagar'"
  },
  {
    question: "How do you join elements of a set in a deterministic order?",
    shortAnswer: "', '.join(sorted(my_set))",
    explanation: "Because sets are unordered, calling sorted() sorts the elements into a list first, guaranteeing consistent output.",
    hint: "Sort the set with sorted() before joining.",
    level: "basic",
    codeExample: "s = {'Z', 'A', 'M'}\nprint(', '.join(sorted(s)))  # 'A, M, Z'"
  },
  {
    question: "Can you use join() on an open file object to concatenate all its lines?",
    shortAnswer: "Yes, because open file objects are iterables of line strings: ''.join(file_obj)",
    explanation: "An open file yields line strings sequentially, so ''.join(f) reads and stitches all lines into a single string.",
    hint: "File objects are iterables of strings.",
    level: "moderate",
    codeExample: "# with open('data.txt') as f:\n#     full_text = ''.join(f)"
  },
  {
    question: "What is the return type of delimiter.join()?",
    shortAnswer: "A single string object (str).",
    explanation: "join() always returns a new str instance representing the concatenated sequence.",
    hint: "Always returns a str.",
    level: "basic",
    codeExample: "res = '-'.join(['a', 'b'])\nprint(type(res))  # <class 'str'>"
  },
  {
    question: "How do you create a bulleted list string from a Python list using join()?",
    shortAnswer: "'\\n'.join(f'• {item}' for item in items)",
    explanation: "Prepend the bullet symbol to each item in the generator and join with newline '\\n'.",
    hint: "Prefix with bullet and join with newline.",
    level: "basic",
    codeExample: "courses = ['Python Pro', 'Data Science', 'FastAPI']\nprint('\\n'.join(f'• {c}' for c in courses))"
  }
];

export default questions;
