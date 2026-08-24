// src/components/study/python/topics/002_007_string-processing/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Basic Regular Expressions with re module

const questions = [
  {
    question: "What is a Regular Expression (Regex) in Python and which built-in module provides it?",
    shortAnswer: "A regular expression is a formalized pattern used to match, search, and validate character combinations in strings; provided by Python's standard 're' module.",
    explanation: "Python includes the 're' module in its standard library, implemented in native C, supporting Perl-compatible regular expressions (PCRE-style).",
    hint: "Use the built-in 're' module.",
    level: "basic",
    codeExample: "import re\nmatch = re.search(r'\\d+', 'User ID: 942')\nprint(match.group())  # '942'"
  },
  {
    question: "Why should you ALWAYS use raw strings (r'...') when writing regular expressions in Python?",
    shortAnswer: "To prevent Python's normal string escape mechanism from intercepting backslashes (e.g. \\b being interpreted as ASCII backspace rather than a regex word boundary).",
    explanation: "Without raw strings, you would need to write '\\\\d' instead of r'\\d' and '\\\\\\\\' instead of r'\\\\' to pass literal backslashes to the regex engine.",
    hint: "Raw strings preserve backslashes literally for the regex engine.",
    level: "basic",
    codeExample: "import re\n# Good (Raw string):\npattern = r'\\bword\\b'\n# Bad (Normal string requires double escapes):\npattern_bad = '\\\\bword\\\\b'"
  },
  {
    question: "What is the difference between a Greedy quantifier and a Lazy (Non-Greedy) quantifier?",
    shortAnswer: "A greedy quantifier (like .*) matches the longest possible string, whereas a lazy quantifier (like .*?) matches the shortest possible string.",
    explanation: "Appending a '?' to any quantifier (*?, +?, ??, {m,n}?) makes it lazy, stopping at the first valid delimiter rather than consuming to the end of the text.",
    hint: "Append '?' to make a quantifier lazy/non-greedy.",
    level: "moderate",
    codeExample: "import re\nhtml = '<p>One</p><p>Two</p>'\nprint(re.findall(r'<p>.*</p>', html))   # ['<p>One</p><p>Two</p>'] (Greedy)\nprint(re.findall(r'<p>.*?</p>', html))  # ['<p>One</p>', '<p>Two</p>'] (Lazy)"
  },
  {
    question: "What do the shorthand character classes \\d, \\w, and \\s match?",
    shortAnswer: "\\d matches any digit [0-9], \\w matches alphanumeric/underscore [a-zA-Z0-9_], and \\s matches any whitespace [ \\t\\n\\r\\f\\v].",
    explanation: "Their uppercase counterparts (\\D, \\W, \\S) match the exact inverse (non-digits, non-words, non-whitespace).",
    hint: "\\d = digits, \\w = word characters, \\s = whitespace.",
    level: "basic",
    codeExample: "import re\ntext = 'Invoice #9402 for Susmita'\nprint(re.findall(r'\\d+', text))  # ['9402']\nprint(re.findall(r'\\w+', text))  # ['Invoice', '9402', 'for', 'Susmita']"
  },
  {
    question: "What does the word boundary metacharacter \\b do?",
    shortAnswer: "It matches the zero-width boundary between a word character (\\w) and a non-word character (\\W) or string edge.",
    explanation: "\\b ensures matching whole words only, preventing 'cat' from matching inside 'catch', 'catalog', or 'scatter'.",
    hint: "\\b matches word edges without consuming characters.",
    level: "moderate",
    codeExample: "import re\ntext = 'The cat scattered the catalog.'\nprint(re.findall(r'\\bcat\\b', text))  # ['cat'] (Only the isolated word)"
  },
  {
    question: "What is the purpose of re.compile() and when should it be used?",
    shortAnswer: "re.compile() pre-compiles a regex string into a reusable Pattern object, eliminating recompilation overhead in repeated loops.",
    explanation: "When matching thousands of records, pre-compiling the pattern once with re.compile() is significantly faster and cleaner than calling re.search() repeatedly.",
    hint: "Pre-compiles the pattern into bytecode for reuse.",
    level: "moderate",
    codeExample: "import re\npin_validator = re.compile(r'^[1-9]\\d{5}$')\nfor pin in ['700120', '700025']:\n    if pin_validator.match(pin):\n        print(pin, 'is valid')"
  },
  {
    question: "What does the re.IGNORECASE (re.I) flag do?",
    shortAnswer: "It makes pattern matching case-insensitive (e.g. 'python' matches 'Python', 'PYTHON', and 'PyThOn').",
    explanation: "Pass flags=re.IGNORECASE or re.I to re.compile(), re.search(), or re.findall().",
    hint: "Enables case-insensitive matching.",
    level: "basic",
    codeExample: "import re\nprint(re.findall(r'python', 'Python and PYTHON', re.IGNORECASE))\n# ['Python', 'PYTHON']"
  },
  {
    question: "What does the re.MULTILINE (re.M) flag do to anchors ^ and $?",
    shortAnswer: "It causes '^' to match the start of every line and '$' to match the end of every line, rather than just the start and end of the entire string.",
    explanation: "By default, ^ and $ only match the extreme beginning and end of the full string. With re.M, each line in a multi-line string is treated as a separate boundary.",
    hint: "re.M matches ^ and $ at every line break.",
    level: "moderate",
    codeExample: "import re\nlog = '2026-08-01: Python\\n2026-08-02: SQL'\nprint(re.findall(r'^\\d{4}-\\d{2}-\\d{2}', log, re.MULTILINE))\n# ['2026-08-01', '2026-08-02']"
  },
  {
    question: "What does the re.DOTALL (re.S) flag do to the dot '.' metacharacter?",
    shortAnswer: "It allows the dot '.' to match ANY character including newline '\\n'.",
    explanation: "By default, '.' matches every character except newlines. re.DOTALL (or re.S for 'single line') allows '.' to span across multiple lines.",
    hint: "re.DOTALL makes '.' match newline characters.",
    level: "moderate",
    codeExample: "import re\ntext = '<!-- BEGIN -->\\nContent inside\\n<!-- END -->'\nprint(re.findall(r'<!-- BEGIN -->.*<!-- END -->', text, re.DOTALL))\n# ['<!-- BEGIN -->\\nContent inside\\n<!-- END -->']"
  },
  {
    question: "What does the re.VERBOSE (re.X) flag do?",
    shortAnswer: "It allows writing readable, multi-line regular expressions with whitespace formatting and '#' comments.",
    explanation: "Whitespace is ignored (unless escaped or in character classes), allowing complex production regex patterns to be clearly documented.",
    hint: "Allows multi-line regex with comments.",
    level: "moderate",
    codeExample: "import re\nphone_regex = re.compile(r'''\n    ^\\+91          # Country code\n    \\s?            # Optional space\n    [6-9]\\d{9}$    # 10 digit Indian mobile\n''', re.VERBOSE)"
  },
  {
    question: "How do you combine multiple regex flags (e.g. IGNORECASE, MULTILINE, and VERBOSE)?",
    shortAnswer: "Use the bitwise OR operator '|': flags = re.I | re.M | re.X",
    explanation: "Regex flags in Python are integer bitmasks, so combining them with '|' enables all specified options simultaneously.",
    hint: "Combine with bitwise OR '|'.",
    level: "basic",
    codeExample: "import re\npattern = re.compile(r'^python', re.I | re.M)"
  },
  {
    question: "What is the difference between [0-9] and [^0-9]?",
    shortAnswer: "[0-9] matches any single digit; [^0-9] is a negated character class that matches any character that is NOT a digit.",
    explanation: "When '^' is placed as the first character inside square brackets, it inverts the character set.",
    hint: "'^' inside brackets negates the set.",
    level: "basic",
    codeExample: "import re\nprint(re.findall(r'[^0-9]+', 'Room 101, Batch 2026'))\n# ['Room ', ', Batch ']"
  },
  {
    question: "What do the quantifiers '*', '+', and '?' mean?",
    shortAnswer: "'*' means 0 or more occurrences; '+' means 1 or more occurrences; '?' means 0 or 1 occurrence (optional).",
    explanation: "These are standard repetition quantifiers controlling how many times the preceding token can appear.",
    hint: "* = 0+, + = 1+, ? = 0 or 1.",
    level: "basic",
    codeExample: "import re\n# 'https?' matches both 'http' and 'https'\nprint(re.findall(r'https?://', 'http://a.com https://b.com'))"
  },
  {
    question: "How do you match a specific number of repetitions, such as exactly 6 digits?",
    shortAnswer: "Use curly braces: \\d{6}",
    explanation: "{n} specifies exactly n times; {m,n} specifies between m and n times; {m,} specifies at least m times.",
    hint: "Use \\d{6} or \\d{2,4}.",
    level: "basic",
    codeExample: "import re\nprint(re.findall(r'\\b\\d{6}\\b', 'PIN: 700120, Phone: 7003756860'))  # ['700120']"
  },
  {
    question: "What is the metacharacter '|' used for in regular expressions?",
    shortAnswer: "Alternation (OR operator) to match either the pattern on the left or the pattern on the right.",
    explanation: "For example, r'cat|dog' matches either 'cat' or 'dog'. Parentheses can limit the scope: r'gr(a|e)y'.",
    hint: "| acts as an OR operator.",
    level: "basic",
    codeExample: "import re\nprint(re.findall(r'Python|React|SQL', 'I learn Python and SQL.'))\n# ['Python', 'SQL']"
  },
  {
    question: "How do you match a literal dot '.' or question mark '?' in regex?",
    shortAnswer: "Escape it with a backslash: r'\\.' or r'\\?' (or put it in brackets: r'[.]').",
    explanation: "Because '.' and '?' are special metacharacters, escaping them with '\\' instructs the regex engine to treat them as literal characters.",
    hint: "Escape with backslash: \\. or \\?",
    level: "basic",
    codeExample: "import re\nprint(re.findall(r'\\d+\\.\\d+', 'Price: 450.75'))  # ['450.75']"
  },
  {
    question: "What regex pattern validates a standard Indian PAN card number?",
    shortAnswer: "r'^[A-Z]{5}[0-9]{4}[A-Z]$'",
    explanation: "An Indian PAN consists of exactly 5 uppercase letters, followed by 4 numeric digits, followed by 1 uppercase letter.",
    hint: "5 letters + 4 digits + 1 letter.",
    level: "moderate",
    codeExample: "import re\npan_regex = re.compile(r'^[A-Z]{5}\\d{4}[A-Z]$')\nprint(bool(pan_regex.match('ABCDE1234F')))  # True\nprint(bool(pan_regex.match('12345ABCDE')))  # False"
  },
  {
    question: "What regex pattern validates a 6-digit Indian PIN code (cannot start with 0)?",
    shortAnswer: "r'^[1-9]\\d{5}$'",
    explanation: "The first digit must be between 1 and 9 (non-zero), followed by exactly 5 digits (total 6 digits).",
    hint: "^[1-9]\\d{5}$",
    level: "basic",
    codeExample: "import re\npin_regex = re.compile(r'^[1-9]\\d{5}$')\nprint(bool(pin_regex.match('700120')))  # True (Barrackpore)\nprint(bool(pin_regex.match('001203')))  # False"
  },
  {
    question: "What does \\B match in regular expressions?",
    shortAnswer: "A non-word boundary (any position that is NOT a word boundary).",
    explanation: "r'\\Bcat\\B' will match 'cat' only if it is surrounded by word characters on both sides (e.g. inside 'scattered' or 'location').",
    hint: "\\B matches within a word (not at the edges).",
    level: "moderate",
    codeExample: "import re\nprint(re.findall(r'\\Bcat\\B', 'scattered catalog cat'))\n# ['cat'] (Only from 'scattered')"
  },
  {
    question: "How do you validate an Indian mobile number starting with 6, 7, 8, or 9?",
    shortAnswer: "r'^[6-9]\\d{9}$' or r'^(?:\\+91|0)?[6-9]\\d{9}$'",
    explanation: "Indian mobile numbers are 10 digits starting with 6-9, optionally prefixed with '+91' or '0'.",
    hint: "[6-9]\\d{9}",
    level: "basic",
    codeExample: "import re\nmob_regex = re.compile(r'^(?:\\+91|0)?[6-9]\\d{9}$')\nprint(bool(mob_regex.match('+917003756860')))  # True"
  },
  {
    question: "What is the difference between [a-z] and [a-zA-Z]?",
    shortAnswer: "[a-z] matches lowercase English letters; [a-zA-Z] matches both lowercase and uppercase English letters.",
    explanation: "Multiple ranges can be combined inside character brackets without separators.",
    hint: "[a-zA-Z] matches all English alphabetic letters.",
    level: "basic",
    codeExample: "import re\nprint(re.findall(r'[a-zA-Z]+', 'Python 3.13 Pro'))\n# ['Python', 'Pro']"
  },
  {
    question: "What is the time complexity of compiling and executing regular expressions?",
    shortAnswer: "Compilation is O(M) where M is pattern length; matching is typically O(N) where N is string length, though complex nested quantifiers can cause catastrophic backtracking.",
    explanation: "CPython uses a backtracking NFA engine. Clean linear patterns execute in O(N), but ambiguous nested patterns like (a+)+ can degrade exponentially.",
    hint: "O(N) for linear patterns; avoid catastrophic backtracking.",
    level: "complex",
    codeExample: "# Linear pattern matching runs in microsecond-scale C loops"
  },
  {
    question: "What does re.escape(string) do?",
    shortAnswer: "It automatically escapes all special metacharacters in a string so it can be used as a literal regex pattern.",
    explanation: "re.escape() is ideal when taking arbitrary user input (which may contain dots, brackets, or pluses) and inserting it safely into a regex.",
    hint: "Escapes metacharacters for safe literal matching.",
    level: "moderate",
    codeExample: "import re\nquery = 'Coder & AccoTax (Barrackpore) [2026]'\nsafe_pattern = re.escape(query)\nprint(safe_pattern)\n# 'Coder\\ \\&\\ AccoTax\\ \\(Barrackpore\\)\\ \\[2026\\]'"
  },
  {
    question: "What is a non-capturing group in regular expressions?",
    shortAnswer: "A group written as (?:...) that groups tokens together for quantifiers without saving the match for extraction.",
    explanation: "Non-capturing groups improve performance and prevent re.findall() from returning tuples of captured subgroups.",
    hint: "Use (?:...) for non-capturing groups.",
    level: "moderate",
    codeExample: "import re\n# (?:https?|ftp) groups without capturing:\nprint(re.findall(r'(?:https?|ftp)://\\w+\\.\\w+', 'https://google.com ftp://server.org'))\n# ['https://google.com', 'ftp://server.org']"
  },
  {
    question: "How do you extract all numbers (both integers and decimals) from a text with regex?",
    shortAnswer: "r'\\d+(?:\\.\\d+)?'",
    explanation: "This matches one or more digits, followed by an optional decimal point and decimal digits.",
    hint: "Use \\d+(?:\\.\\d+)?",
    level: "basic",
    codeExample: "import re\ntext = 'Items: 5 units at INR 450.75 each, total 2253.75'\nprint(re.findall(r'\\d+(?:\\.\\d+)?', text))\n# ['5', '450.75', '2253.75']"
  }
];

export default questions;
