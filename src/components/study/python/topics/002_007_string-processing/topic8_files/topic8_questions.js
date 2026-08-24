// src/components/study/python/topics/002_007_string-processing/topic8_files/topic8_questions.js
// Comprehensive Master Review Questions for Topic 8: Pattern Matching (search, match, findall, sub)

const questions = [
  {
    question: "What is the key operational difference between re.match() and re.search()?",
    shortAnswer: "re.match() checks for a match ONLY at the beginning (index 0) of the string; re.search() scans through the entire string for the FIRST match anywhere.",
    explanation: "If a pattern occurs later in the string, re.match() will return None, while re.search() will successfully return the corresponding Match object.",
    hint: "match() looks at index 0 only; search() looks anywhere.",
    level: "basic",
    codeExample: "import re\ntext = 'Invoice #9402'\nprint(re.match(r'\\d+', text))   # None (Starts with 'I')\nprint(re.search(r'\\d+', text))  # <Match object; span=(9, 13), match='9402'>"
  },
  {
    question: "What does re.fullmatch() do?",
    shortAnswer: "It requires the ENTIRE string to match the pattern from start to end (equivalent to implicit ^...$).",
    explanation: "If there are any leading or trailing characters not accounted for by the pattern, re.fullmatch() returns None.",
    hint: "The entire string must match the pattern completely.",
    level: "basic",
    codeExample: "import re\nprint(re.fullmatch(r'\\d{6}', '700120'))     # Match object (Valid PIN)\nprint(re.fullmatch(r'\\d{6}', '700120A'))    # None (Contains 'A')"
  },
  {
    question: "What happens if you call .group() on the result of re.search() when no match is found?",
    shortAnswer: "An AttributeError is raised: 'NoneType' object has no attribute 'group'.",
    explanation: "When a search fails, re.search() returns None. You must always check 'if match:' or use walrus operator 'if (m := re.search(...)):' before calling .group().",
    hint: "Always check 'if match:' before calling .group().",
    level: "basic",
    codeExample: "import re\nm = re.search(r'\\d+', 'No numbers here')\nif m:\n    print(m.group())\nelse:\n    print('No match found safely!')"
  },
  {
    question: "What is the difference between match.group(), match.group(1), and match.groups()?",
    shortAnswer: "match.group() / group(0) returns the full matched string; group(1) returns the first captured subgroup; groups() returns a tuple of all captured subgroups.",
    explanation: "Subgroups are defined by parentheses (group1)(group2) in the regex pattern.",
    hint: "group(0) = whole match; group(1) = 1st group; groups() = tuple of all groups.",
    level: "basic",
    codeExample: "import re\nm = re.search(r'(\\w+)-(\\d+)', 'Item-42')\nprint(m.group(0))  # 'Item-42'\nprint(m.group(1))  # 'Item'\nprint(m.group(2))  # '42'\nprint(m.groups())  # ('Item', '42')"
  },
  {
    question: "How do you extract named capture groups using the Match object?",
    shortAnswer: "match.group('name') for individual named groups, or match.groupdict() to get all named groups as a dictionary.",
    explanation: "Named capture groups are defined using (?P<group_name>pattern).",
    hint: "Use match.group('name') or match.groupdict().",
    level: "moderate",
    codeExample: "import re\nm = re.search(r'(?P<course>\\w+):\\s*(?P<fee>\\d+)', 'Python: 4500')\nprint(m.group('course'))  # 'Python'\nprint(m.groupdict())      # {'course': 'Python', 'fee': '4500'}"
  },
  {
    question: "What does match.span() return?",
    shortAnswer: "A 2-tuple (start_index, end_index) representing the substring slice boundaries in the original string.",
    explanation: "match.span() is equivalent to (match.start(), match.end()), satisfying original_text[start:end] == match.group().",
    hint: "Returns (start_index, end_index).",
    level: "basic",
    codeExample: "import re\nm = re.search(r'Barrackpore', 'Welcome to Barrackpore!')\nprint(m.span())  # (11, 22)\nprint('Welcome to Barrackpore!'[11:22])  # 'Barrackpore'"
  },
  {
    question: "How does re.findall() format its return value when there are NO capture groups vs MULTIPLE capture groups?",
    shortAnswer: "No groups: returns a list of strings (full matches); Multiple groups: returns a list of tuples of captured groups.",
    explanation: "If the pattern has 0 or 1 group, findall returns a flat list of strings. If it has 2 or more groups, it returns a list of tuples containing the strings for each group.",
    hint: "0 groups -> list of strings; 2+ groups -> list of tuples.",
    level: "moderate",
    codeExample: "import re\ntext = 'A: 10, B: 20'\nprint(re.findall(r'\\w+:\\s*\\d+', text))    # ['A: 10', 'B: 20']\nprint(re.findall(r'(\\w+):\\s*(\\d+)', text))  # [('A', '10'), ('B', '20')]"
  },
  {
    question: "Why is re.finditer() preferred over re.findall() when processing large files or continuous log streams?",
    shortAnswer: "re.finditer() returns an iterator yielding Match objects lazily on demand without building an entire list in memory, saving RAM and execution time.",
    explanation: "In addition to memory efficiency, finditer provides full Match objects containing span coordinates and named group dictionaries, which findall does not provide.",
    hint: "finditer yields Match objects lazily on demand.",
    level: "moderate",
    codeExample: "import re\nfor m in re.finditer(r'\\d+', '100 items, 200 boxes, 300 pallets'):\n    print(f'Found {m.group()} at span {m.span()}')"
  },
  {
    question: "How does re.sub() use backreferences in the replacement string?",
    shortAnswer: "Use \\1, \\2, etc. (or \\g<1>, \\g<name>) to reference captured subgroups from the matching pattern.",
    explanation: "Backreferences allow reordering or wrapping matched subgroups in the replacement output.",
    hint: "Use \\1, \\2 or \\g<name> in replacement string.",
    level: "moderate",
    codeExample: "import re\n# Swap First Last to Last, First:\nnames = 'Susmita Mukherjee'\nprint(re.sub(r'(\\w+)\\s+(\\w+)', r'\\2, \\1', names))\n# 'Mukherjee, Susmita'"
  },
  {
    question: "How can you pass a custom callable function to re.sub() for dynamic replacements?",
    shortAnswer: "Pass a function receiving a Match object and returning a replacement string: re.sub(pattern, callback_fn, text).",
    explanation: "The callback function is executed for every match, enabling mathematical calculations, external lookups, or conditional masking.",
    hint: "Pass a function that takes a Match object and returns a str.",
    level: "moderate",
    codeExample: "import re\ndef double_num(m):\n    return str(int(m.group()) * 2)\n\nprint(re.sub(r'\\d+', double_num, 'Prices: 10, 25, 50'))\n# 'Prices: 20, 50, 100'"
  },
  {
    question: "What does re.subn() return and how does it differ from re.sub()?",
    shortAnswer: "re.subn() returns a 2-tuple: (modified_string, number_of_substitutions_made).",
    explanation: "re.sub() returns only the string; re.subn() additionally provides the exact count of substitutions performed.",
    hint: "Returns (new_string, count).",
    level: "basic",
    codeExample: "import re\ntext, count = re.subn(r'cat', 'dog', 'cat and cat and dog')\nprint(text)   # 'dog and dog and dog'\nprint(count)  # 2"
  },
  {
    question: "How does re.split() behave when the pattern contains capturing parentheses (r'(\\W+)')?",
    shortAnswer: "It retains the delimiter strings in the resulting list alongside the split tokens.",
    explanation: "Without parentheses, delimiters are discarded. With capturing parentheses, matched delimiters are kept in the return list.",
    hint: "Capturing parentheses retain delimiters in split output.",
    level: "moderate",
    codeExample: "import re\nprint(re.split(r'\\s*([+*])\\s*', '10 + 20 * 30'))\n# ['10', '+', '20', '*', '30']"
  },
  {
    question: "How do you limit the maximum number of substitutions in re.sub()?",
    shortAnswer: "Pass the count parameter: re.sub(pattern, repl, string, count=N)",
    explanation: "Setting count=1 replaces only the first matching occurrence; default count=0 replaces all occurrences.",
    hint: "Use count=N argument.",
    level: "basic",
    codeExample: "import re\nprint(re.sub(r'\\d+', 'X', '10 20 30 40', count=2))\n# 'X X 30 40'"
  },
  {
    question: "How do you convert an ISO date 'YYYY-MM-DD' to Indian format 'DD-MM-YYYY' with re.sub()?",
    shortAnswer: "re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\3-\\2-\\1', date_str)",
    explanation: "\\3 refers to day (group 3), \\2 refers to month (group 2), and \\1 refers to year (group 1).",
    hint: "Swap groups using r'\\3-\\2-\\1'.",
    level: "basic",
    codeExample: "import re\nprint(re.sub(r'(\\d{4})-(\\d{2})-(\\d{2})', r'\\3-\\2-\\1', '2026-08-24'))\n# '24-08-2026'"
  },
  {
    question: "What is the walrus operator pattern for combining search and match checks in Python 3.8+?",
    shortAnswer: "if (m := re.search(pattern, text)): use m.group()",
    explanation: "The walrus operator := assigns the match object and evaluates truthiness in one clean line.",
    hint: "if (m := re.search(...)):",
    level: "moderate",
    codeExample: "import re\ntext = 'Invoice: 9402'\nif (m := re.search(r'\\d+', text)):\n    print('Invoice ID:', m.group())"
  },
  {
    question: "How do you mask an Indian mobile number (e.g. +91 7003756860 -> +91 ******6860) using re.sub()?",
    shortAnswer: "re.sub(r'(\\+91\\s?)?\\d{6}(\\d{4})', r'\\1******\\2', phone_str)",
    explanation: "Group 1 captures the optional +91 prefix, the middle 6 digits are replaced with asterisks, and Group 2 preserves the last 4 digits.",
    hint: "Capture prefix and last 4 digits, replace middle with asterisks.",
    level: "moderate",
    codeExample: "import re\nphone = '+91 7003756860'\nprint(re.sub(r'(\\+91\\s?)?\\d{6}(\\d{4})', r'\\1******\\2', phone))\n# '+91 ******6860'"
  },
  {
    question: "Can re.split() split by multiple whitespace characters and punctuation simultaneously?",
    shortAnswer: "Yes: re.split(r'[,;\\s]+', text)",
    explanation: "The character class [,;\\s]+ matches sequences of commas, semicolons, or whitespace as a single delimiter.",
    hint: "Use character class in split pattern: r'[,;\\s]+'.",
    level: "basic",
    codeExample: "import re\nprint(re.split(r'[,;\\s]+', 'Python, SQL; FastAPI  React'))\n# ['Python', 'SQL', 'FastAPI', 'React']"
  },
  {
    question: "What happens if a capture group in a pattern is optional and does not match?",
    shortAnswer: "match.group(n) returns None for that unmatched group, and groups() includes None at that position.",
    explanation: "For example in r'(\\d+)?(\\w+)', if digits are absent, group(1) will be None.",
    hint: "Unmatched optional groups return None.",
    level: "moderate",
    codeExample: "import re\nm = re.search(r'(\\d+)?([A-Za-z]+)', 'Python')\nprint(m.group(1))  # None\nprint(m.group(2))  # 'Python'"
  },
  {
    question: "How do you reference a named capture group in a re.sub() replacement string?",
    shortAnswer: "Use \\g<group_name>",
    explanation: "\\g<name> references the captured named group in the replacement template.",
    hint: "Use \\g<group_name> in replacement template.",
    level: "moderate",
    codeExample: "import re\npattern = r'(?P<city>\\w+):\\s*(?P<temp>\\d+)C'\nprint(re.sub(pattern, r'Temperature in \\g<city> is \\g<temp> degrees', 'Barrackpore: 32C'))\n# 'Temperature in Barrackpore is 32 degrees'"
  },
  {
    question: "What is the difference between re.search() and str.find()?",
    shortAnswer: "str.find() only searches for fixed, literal substrings and returns an integer index (-1 if missing); re.search() searches for flexible regex patterns and returns a Match object (or None).",
    explanation: "Use str.find() or 'in' for simple literal substring checks, and re.search() for complex patterns involving digits, formats, or wildcards.",
    hint: "str.find() is for literal substrings; re.search() is for regex patterns.",
    level: "basic",
    codeExample: "s = 'Student 101'\nprint(s.find('101'))       # 8 (int index)\nprint(re.search(r'\\d+', s)) # <Match object>"
  },
  {
    question: "How do you parse an Apache/Nginx web server access log line using re.search()?",
    shortAnswer: "Use a regex pattern with named groups for IP, timestamp, HTTP method, URL, and status code.",
    explanation: "Named groups (?P<ip>...), (?P<method>...), etc., allow extracting fields directly into a dictionary with .groupdict().",
    hint: "Use named groups with .groupdict().",
    level: "complex",
    codeExample: "import re\nlog = '103.21.124.8 - - [24/Aug/2026:18:30:15 +0530] \"GET /courses HTTP/1.1\" 200 4520'\npat = r'(?P<ip>\\S+)\\s+-\\s+-\\s+\\[(?P<ts>[^\\]]+)\\]\\s+\"(?P<method>\\w+)\\s+(?P<url>\\S+)'\nprint(re.search(pat, log).groupdict())\n# {'ip': '103.21.124.8', 'ts': '24/Aug/2026:18:30:15 +0530', 'method': 'GET', 'url': '/courses'}"
  },
  {
    question: "What is the return type of re.sub() when the replacement is performed?",
    shortAnswer: "A new string (str).",
    explanation: "re.sub() never modifies the original string in place because Python strings are immutable; it returns a new string.",
    hint: "Returns a new str.",
    level: "basic",
    codeExample: "s = 'apple'\nres = re.sub('a', 'o', s)\nprint(res, type(res))  # 'opple' <class 'str'>"
  },
  {
    question: "How do you find all occurrences of overlapping regex matches in Python?",
    shortAnswer: "re.findall() finds non-overlapping matches only; for overlapping matches, use positive lookahead: re.findall(r'(?=(\\w{3}))', text).",
    explanation: "Lookaheads assert a condition without consuming characters, allowing subsequent matches to overlap.",
    hint: "Use positive lookahead (?=(pattern)).",
    level: "complex",
    codeExample: "import re\n# Overlapping 3-character groups in 'banana':\nprint(re.findall(r'(?=(\\w{3}))', 'banana'))\n# ['ban', 'ana', 'nan', 'ana']"
  },
  {
    question: "How do you sanitize user inputs to strip all HTML tags using re.sub()?",
    shortAnswer: "re.sub(r'<[^>]+>', '', html_text)",
    explanation: "The pattern <[^>]+> matches '<' followed by any characters that are not '>' up to the closing '>', safely removing all HTML tags.",
    hint: "Use re.sub(r'<[^>]+>', '', text).",
    level: "basic",
    codeExample: "import re\nhtml = '<p>Welcome to <b>Coder & AccoTax</b>!</p>'\nprint(re.sub(r'<[^>]+>', '', html))\n# 'Welcome to Coder & AccoTax!'"
  },
  {
    question: "What is the default count parameter in re.sub() and what does it signify?",
    shortAnswer: "count=0, which means replace ALL matching occurrences across the string.",
    explanation: "If count is 0 or omitted, all matches are replaced.",
    hint: "count=0 replaces all occurrences.",
    level: "basic",
    codeExample: "import re\nprint(re.sub(r'x', 'y', 'xxx'))  # 'yyy' (Replaced all 3)"
  }
];

export default questions;
