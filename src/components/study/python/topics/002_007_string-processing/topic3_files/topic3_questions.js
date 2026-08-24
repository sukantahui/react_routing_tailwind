// src/components/study/python/topics/002_007_string-processing/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Essential String Methods

const questions = [
  {
    question: "Do string methods like s.upper() or s.replace() modify the original string in place?",
    shortAnswer: "No, because strings are immutable; they return a brand-new string object.",
    explanation: "Any string method in Python returns a freshly allocated string with the transformations applied. The original string remains completely unchanged in memory.",
    hint: "Strings are immutable in Python.",
    level: "basic",
    codeExample: "s = 'kolkata'\nres = s.upper()\nprint(s)    # 'kolkata' (Unchanged)\nprint(res)  # 'KOLKATA' (New object)"
  },
  {
    question: "What is the difference between s.capitalize() and s.title()?",
    shortAnswer: "capitalize() uppercases only the very first letter of the entire string; title() uppercases the first letter of every individual word.",
    explanation: "capitalize() converts character at index 0 to uppercase and all remaining characters to lowercase. title() identifies word boundaries (spaces, punctuation) and capitalizes each word.",
    hint: "capitalize() is for the whole sentence; title() is for each word.",
    level: "basic",
    codeExample: "text = 'python programming in barrackpore'\nprint(text.capitalize())  # 'Python programming in barrackpore'\nprint(text.title())       # 'Python Programming In Barrackpore'"
  },
  {
    question: "Why should you use s.casefold() instead of s.lower() for international text comparison?",
    shortAnswer: "casefold() implements full Unicode casefolding, handling multilingual characters that lower() misses (such as German 'ß' -> 'ss').",
    explanation: "lower() uses standard ASCII/1-to-1 character mappings, whereas casefold() conforms to the Unicode standard for aggressive caseless matching across various international scripts.",
    hint: "casefold() is designed for aggressive Unicode caseless matching.",
    level: "moderate",
    codeExample: "word = 'Straße'\nprint(word.lower() == 'STRASSE'.lower())       # False ('straße' != 'strasse')\nprint(word.casefold() == 'STRASSE'.casefold()) # True  ('strasse' == 'strasse')"
  },
  {
    question: "What whitespace characters does s.strip() remove by default?",
    shortAnswer: "All standard whitespace characters: spaces, tabs ('\\t'), newlines ('\\n'), carriage returns ('\\r'), vertical tabs, and form feeds.",
    explanation: "When called with no arguments, strip() trims all leading and trailing ASCII and Unicode whitespace characters from both ends of the string.",
    hint: "Spaces, tabs, newlines from both ends.",
    level: "basic",
    codeExample: "s = ' \\t\\n Coder & AccoTax \\r\\n '\nprint(repr(s.strip()))  # 'Coder & AccoTax'"
  },
  {
    question: "What is the difference between s.lstrip(), s.rstrip(), and s.strip()?",
    shortAnswer: "lstrip() removes leading (left) characters only; rstrip() removes trailing (right) characters only; strip() removes both.",
    explanation: "lstrip starts from index 0 moving right. rstrip starts from index -1 moving left. strip applies both passes simultaneously.",
    hint: "l = left, r = right, strip = both.",
    level: "basic",
    codeExample: "s = '***Python***'\nprint(s.lstrip('*'))  # 'Python***'\nprint(s.rstrip('*'))  # '***Python'\nprint(s.strip('*'))   # 'Python'"
  },
  {
    question: "Why does 'www.example.com'.strip('w.com') result in 'example' instead of '.example.'?",
    shortAnswer: "Because strip(chars) takes a SET of individual characters to remove, NOT a whole prefix/suffix substring.",
    explanation: "strip('w.com') iterates through both ends and removes any character present in the set {'w', '.', 'c', 'o', 'm'}. To remove exact substrings, use removeprefix() and removesuffix() in Python 3.9+.",
    hint: "strip treats its argument as a set of characters.",
    level: "moderate",
    codeExample: "s = 'www.example.com'\nprint(s.strip('w.com'))               # 'example'\nprint(s.removeprefix('www.').removesuffix('.com')) # 'example'"
  },
  {
    question: "What is the key difference between s.split() and s.split(' ')?",
    shortAnswer: "s.split() collapses consecutive whitespaces and discards empty items; s.split(' ') splits strictly on single spaces, preserving empty strings.",
    explanation: "When sep is omitted, split() treats consecutive whitespace (spaces, tabs, newlines) as a single delimiter and strips leading/trailing spaces. When sep=' ', every individual space is a separator, producing empty strings for adjacent spaces.",
    hint: "split() collapses whitespace; split(' ') preserves empty slots.",
    level: "moderate",
    codeExample: "s = 'A    B   C'\nprint(s.split())     # ['A', 'B', 'C'] (3 items)\nprint(s.split(' ')) # ['A', '', '', '', 'B', '', '', 'C'] (8 items)"
  },
  {
    question: "What does the maxsplit argument do in s.split(sep, maxsplit=N)?",
    shortAnswer: "It limits the number of splits performed to at most N, leaving the remainder of the string in the last list element.",
    explanation: "The resulting list will have at most maxsplit + 1 elements. Useful for extracting prefixes/headers while preserving unstructured payloads.",
    hint: "Splits at most N times.",
    level: "moderate",
    codeExample: "log = '2026-08-24 ERROR Connection timed out at Barrackpore server'\nparts = log.split(' ', maxsplit=2)\nprint(parts)  # ['2026-08-24', 'ERROR', 'Connection timed out at Barrackpore server']"
  },
  {
    question: "What is the difference between split() and rsplit()?",
    shortAnswer: "split() splits from left to right; rsplit() splits from right to left (relevant when maxsplit is specified).",
    explanation: "Without maxsplit, split() and rsplit() return the same list. With maxsplit=1, rsplit() extracts only the last word/field from the right.",
    hint: "rsplit starts splitting from the right end.",
    level: "moderate",
    codeExample: "path = 'users/sukanta/documents/report.pdf'\nprint(path.rsplit('/', maxsplit=1))  # ['users/sukanta/documents', 'report.pdf']"
  },
  {
    question: "What does s.partition(sep) return, and how does it differ from s.split(sep, 1)?",
    shortAnswer: "partition() always returns a 3-tuple (head, sep, tail); split(sep, 1) returns a 1 or 2-element list.",
    explanation: "partition(sep) splits at the first occurrence of sep into (before, sep, after). If sep is not found, it returns (s, '', ''), avoiding unpacking errors.",
    hint: "partition() guarantees a 3-tuple (head, sep, tail).",
    level: "moderate",
    codeExample: "cfg = 'PORT = 8080'\nkey, sep, val = cfg.partition('=')\nprint(key.strip(), ':', val.strip())  # 'PORT : 8080'\n\nmissing = 'DEBUG_MODE'\nk, s, v = missing.partition('=')\nprint(k, s, v)  # ('DEBUG_MODE', '', '')"
  },
  {
    question: "What does s.rpartition(sep) do?",
    shortAnswer: "It partitions the string at the LAST occurrence of sep, returning a 3-tuple (head, sep, tail).",
    explanation: "rpartition searches from right to left. If sep is not found, it returns ('', '', s).",
    hint: "Partitions at the last occurrence.",
    level: "moderate",
    codeExample: "domain = 'api.staging.codernaccotax.co.in'\nhead, sep, tail = domain.rpartition('.')\nprint(head)  # 'api.staging.codernaccotax.co'\nprint(tail)  # 'in'"
  },
  {
    question: "What does s.splitlines(keepends=True) do?",
    shortAnswer: "It splits a multi-line string into lines while keeping line break characters (\\n, \\r\\n) attached to each line.",
    explanation: "By default, keepends is False, which strips newline characters. Setting keepends=True preserves them, which is useful when rewriting files verbatim.",
    hint: "keepends=True preserves newline endings.",
    level: "moderate",
    codeExample: "doc = 'Line 1\\nLine 2\\nLine 3'\nprint(doc.splitlines())                # ['Line 1', 'Line 2', 'Line 3']\nprint(doc.splitlines(keepends=True))  # ['Line 1\\n', 'Line 2\\n', 'Line 3']"
  },
  {
    question: "Why does ''.join(['a', 1, 'b']) raise a TypeError?",
    shortAnswer: "Because join() requires ALL elements in the iterable to be strings (type 'str').",
    explanation: "join() does not automatically call str() on non-string items. If any item is an integer or boolean, Python raises TypeError: sequence item: expected str instance.",
    hint: "Use (str(x) for x in items) or map(str, items).",
    level: "basic",
    codeExample: "items = ['Item ', 101, ' active: ', True]\n# ''.join(items) -> Raises TypeError!\nclean = ''.join(str(x) for x in items)\nprint(clean)  # 'Item 101 active: True'"
  },
  {
    question: "Why is delimiter.join(list_of_strings) preferred over looping with string += concatenation?",
    shortAnswer: "join() runs in O(N) linear time with a single memory allocation; += in a loop runs in O(N^2) quadratic time due to repeated memory reallocation.",
    explanation: "Because strings are immutable, += creates a new string object and copies all previous characters on every single iteration. join() pre-computes the total length and allocates the heap buffer once.",
    hint: "join() allocates memory once in O(N) time.",
    level: "moderate",
    codeExample: "# BAD (O(N^2)):\ns = ''\nfor w in ['A', 'B', 'C']: s += w\n\n# GOOD (O(N)):\ns = ''.join(['A', 'B', 'C'])"
  },
  {
    question: "What is the syntax and behavior of s.replace(old, new, count)?",
    shortAnswer: "It returns a new string where occurrences of 'old' are replaced with 'new'. If 'count' is given, only the first 'count' occurrences are replaced.",
    explanation: "The replacement is non-overlapping from left to right. If count is omitted or negative, all occurrences are replaced.",
    hint: "count limits the number of replacements.",
    level: "basic",
    codeExample: "s = 'apple banana apple cherry apple'\nprint(s.replace('apple', 'orange', 2))\n# 'orange banana orange cherry apple'"
  },
  {
    question: "How do you remove all spaces from a string using string methods?",
    shortAnswer: "s.replace(' ', '') or ''.join(s.split())",
    explanation: "s.replace(' ', '') removes all literal space characters. ''.join(s.split()) removes all whitespace characters including tabs and newlines.",
    hint: "Replace spaces with empty string '', or split and join.",
    level: "basic",
    codeExample: "s = ' 700 120 - WB '\nprint(s.replace(' ', ''))       # '700120-WB'\nprint(''.join(s.split()))       # '700120-WB'"
  },
  {
    question: "What is method chaining in Python strings?",
    shortAnswer: "Calling multiple string methods in succession (e.g., s.strip().lower().replace(' ', '_')) on the returned string objects.",
    explanation: "Because each string method returns a new str instance, subsequent string methods can be invoked immediately on the result in a clean fluent pipeline.",
    hint: "Chaining calls on returned string instances.",
    level: "basic",
    codeExample: "raw = '   sUSMITA MUKHERJEE   '\nclean = raw.strip().title().replace(' ', '_')\nprint(clean)  # 'Susmita_Mukherjee'"
  },
  {
    question: "What does s.swapcase() do?",
    shortAnswer: "It converts all uppercase characters to lowercase, and all lowercase characters to uppercase.",
    explanation: "Characters with no case (digits, symbols, punctuation) remain unchanged.",
    hint: "Inverts character casing.",
    level: "basic",
    codeExample: "s = 'Hello Kolkata 2026'\nprint(s.swapcase())  # 'hELLO kOLKATA 2026'"
  },
  {
    question: "How do you count the number of words in a sentence accurately using string methods?",
    shortAnswer: "len(sentence.split())",
    explanation: "Calling split() with no arguments correctly ignores leading, trailing, and multiple consecutive spaces, returning a list of actual words.",
    hint: "len(s.split()) handles irregular spacing.",
    level: "basic",
    codeExample: "text = '  Coder   and   AccoTax   Barrackpore  '\nprint(len(text.split()))  # 4 words"
  },
  {
    question: "How does s.title() behave when words contain apostrophes (e.g., \"they're\", \"O'Connor\")?",
    shortAnswer: "It treats the apostrophe as a word boundary and capitalizes the letter following it (e.g., \"They'Re\", \"O'Connor\").",
    explanation: "s.title() uses a simple character-based algorithm where any non-letter triggers capitalization of the next letter. For true grammatical title casing, use string.capwords() or regular expressions.",
    hint: "Apostrophes cause title() to capitalize the following letter.",
    level: "complex",
    codeExample: "import string\nname = \"o'connor\"\nprint(name.title())              # \"O'Connor\"\nphrase = \"they're learning\"\nprint(phrase.title())            # \"They'Re Learning\" (Quirk!)\nprint(string.capwords(phrase))   # \"They're Learning\""
  },
  {
    question: "What is the return type of s.split() when called on an empty string s = ''?",
    shortAnswer: "An empty list []",
    explanation: "s.split() with no arguments yields [] on an empty string. Note that s.split(',') on '' yields [''] (a list with one empty string).",
    hint: "''.split() returns [], but ''.split(',') returns [''].",
    level: "complex",
    codeExample: "print(''.split())     # []\nprint(''.split(',')) # ['']"
  },
  {
    question: "How can you convert a comma-separated string '10,20,30' into a list of integers?",
    shortAnswer: "[int(x.strip()) for x in s.split(',')]",
    explanation: "Split by comma, optionally strip whitespace from each token, and map through int() using a list comprehension.",
    hint: "Combine split with list comprehension and int().",
    level: "basic",
    codeExample: "csv_data = '10, 25, 45, 80'\nnumbers = [int(x.strip()) for x in csv_data.split(',')]\nprint(numbers)  # [10, 25, 45, 80]"
  },
  {
    question: "What does '-'.join('PYTHON') output?",
    shortAnswer: "'P-Y-T-H-O-N'",
    explanation: "Strings are iterables of single-character strings, so passing a string to join() places the delimiter between every character.",
    hint: "A string is an iterable of characters.",
    level: "basic",
    codeExample: "print('-'.join('PYTHON'))  # 'P-Y-T-H-O-N'"
  },
  {
    question: "How do you replace only the last occurrence of a substring in Python?",
    shortAnswer: "Using rpartition(): head, sep, tail = s.rpartition(old); return head + new + tail",
    explanation: "Because replace() only takes count from the left, using rpartition() to find the rightmost match and re-stitching with 'new' replaces the last occurrence cleanly.",
    hint: "Use rpartition to target the rightmost occurrence.",
    level: "complex",
    codeExample: "def replace_last(s, old, new):\n    head, sep, tail = s.rpartition(old)\n    return head + new + tail if sep else s\n\nprint(replace_last('apple banana apple cherry apple', 'apple', 'ORANGE'))\n# 'apple banana apple cherry ORANGE'"
  },
  {
    question: "What happens if old is not found in s.replace(old, new)?",
    shortAnswer: "It returns a copy of the original string unchanged without raising any error.",
    explanation: "replace() is safe and does not raise ValueError if the search string is absent.",
    hint: "Returns the original string untouched.",
    level: "basic",
    codeExample: "s = 'Kolkata'\nprint(s.replace('Mumbai', 'Delhi'))  # 'Kolkata'"
  }
];

export default questions;
