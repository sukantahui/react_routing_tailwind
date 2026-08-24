// src/components/study/python/topics/002_007_string-processing/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Searching & Validation Methods

const questions = [
  {
    question: "What is the primary difference between s.find('sub') and s.index('sub')?",
    shortAnswer: "find() returns -1 if the substring is not found, whereas index() raises a ValueError exception.",
    explanation: "find() is fault-tolerant and returns an integer sentinel (-1), making it safe for optional searches. index() is strict and raises ValueError: substring not found.",
    hint: "find() returns -1; index() crashes with ValueError.",
    level: "basic",
    codeExample: "s = 'Kolkata'\nprint(s.find('Delhi'))   # -1 (Safe)\ntry:\n    print(s.index('Delhi'))\nexcept ValueError as e:\n    print(e)  # substring not found"
  },
  {
    question: "What do s.rfind('sub') and s.rindex('sub') do?",
    shortAnswer: "They search for the substring starting from the right (highest index position).",
    explanation: "rfind() returns the highest index where the substring is found, or -1 if absent. rindex() returns the highest index or raises ValueError.",
    hint: "r stands for reverse/rightmost search.",
    level: "basic",
    codeExample: "path = '/home/user/docs/file.txt'\nprint(path.rfind('/'))   # 15 (Last slash index)\nprint(path.find('/'))    # 0 (First slash index)"
  },
  {
    question: "How does s.count('sub') handle overlapping occurrences?",
    shortAnswer: "s.count() counts only NON-OVERLAPPING occurrences from left to right.",
    explanation: "Once a matching substring is identified, the search index moves past the entire matched substring length. For example, in 'banana', 'ana' occurs at index 1 and index 3, but count('ana') returns 1 because the first match consumes indices 1, 2, 3.",
    hint: "Matched characters cannot be reused in subsequent counts.",
    level: "moderate",
    codeExample: "word = 'banana'\nprint(word.count('ana'))  # 1 (Not 2! Non-overlapping)"
  },
  {
    question: "Can s.startswith() and s.endswith() check against multiple candidate strings simultaneously?",
    shortAnswer: "Yes, by passing a TUPLE of candidate strings (lists or sets are not allowed).",
    explanation: "s.startswith(('http://', 'https://')) returns True if the string starts with ANY of the prefixes in the tuple. Passing a list or set raises a TypeError.",
    hint: "Pass a tuple of candidate prefixes/suffixes.",
    level: "moderate",
    codeExample: "url = 'https://codernaccotax.co.in'\nprint(url.startswith(('http://', 'https://')))  # True\nfn = 'report.pdf'\nprint(fn.endswith(('.pdf', '.docx', '.xlsx')))    # True"
  },
  {
    question: "What is the difference between isdecimal(), isdigit(), and isnumeric()?",
    shortAnswer: "isdecimal() is for strict base-10 digits 0-9; isdigit() includes superscripts/subscripts; isnumeric() includes vulgar fractions and numeral characters.",
    explanation: "The relationship is a subset hierarchy: isdecimal() ⊂ isdigit() ⊂ isnumeric(). For ASCII '123', all three are True. For superscript '²', isdigit() and isnumeric() are True. For fraction '½', only isnumeric() is True.",
    hint: "isdecimal is strict digits; isdigit adds powers; isnumeric adds fractions.",
    level: "moderate",
    codeExample: "print('123'.isdecimal(), '123'.isdigit(), '123'.isnumeric())   # True, True, True\nprint('²'.isdecimal(), '²'.isdigit(), '²'.isnumeric())       # False, True, True\nprint('½'.isdecimal(), '½'.isdigit(), '½'.isnumeric())       # False, False, True"
  },
  {
    question: "Why do '-10'.isdigit() and '3.14'.isdigit() both return False?",
    shortAnswer: "Because the minus sign '-' and decimal point '.' are non-digit punctuation symbols.",
    explanation: "isdigit() requires EVERY character in the string to be a numeric digit. Punctuation symbols make isdigit(), isdecimal(), and isnumeric() all evaluate to False.",
    hint: "Minus and dot are punctuation symbols, not digits.",
    level: "basic",
    codeExample: "print('-10'.isdigit())   # False (Contains '-')\nprint('3.14'.isdigit())  # False (Contains '.')"
  },
  {
    question: "What does s.isalpha() verify, and does it allow spaces?",
    shortAnswer: "It verifies that ALL characters are alphabetic letters and length > 0. It returns False if there are any spaces.",
    explanation: "s.isalpha() returns True only if every character is a letter (A-Z, a-z, or Unicode alphabetic letter). Strings with spaces or digits return False.",
    hint: "A space character causes isalpha() to return False.",
    level: "basic",
    codeExample: "print('Barrackpore'.isalpha())        # True\nprint('Coder & AccoTax'.isalpha())     # False (Spaces & '&')\nprint(''.isalpha())                    # False (Empty string)"
  },
  {
    question: "What is the difference between s.isalpha() and s.isalnum()?",
    shortAnswer: "isalpha() requires all characters to be letters; isalnum() allows both letters and numeric digits.",
    explanation: "isalnum() returns True if every character is either alphabetic or numeric (and non-empty).",
    hint: "alnum = alphabet + number.",
    level: "basic",
    codeExample: "print('Python313'.isalpha())  # False (Contains digits)\nprint('Python313'.isalnum())  # True"
  },
  {
    question: "What does s.isspace() test for?",
    shortAnswer: "It tests whether the non-empty string consists solely of whitespace characters (spaces, tabs, newlines).",
    explanation: "If the string contains only spaces (' '), tabs ('\\t'), newlines ('\\n'), carriage returns ('\\r'), etc., isspace() returns True. If the string is empty '', it returns False.",
    hint: "Tests for whitespace-only strings (must be non-empty).",
    level: "basic",
    codeExample: "print('   \\t\\n  '.isspace())  # True\nprint(''.isspace())            # False (Empty)\nprint('  a  '.isspace())        # False (Contains 'a')"
  },
  {
    question: "What does s.isidentifier() do in Python?",
    shortAnswer: "It checks whether a string is syntactically a valid Python identifier (variable/function/class name).",
    explanation: "A valid identifier must start with a letter (or underscore) and be followed by letters, digits, or underscores. Note that isidentifier() returns True even for Python keywords like 'for' or 'class', so use keyword.iskeyword() to check for reserved words.",
    hint: "Checks if a string is a valid variable name.",
    level: "moderate",
    codeExample: "print('student_name'.isidentifier())  # True\nprint('2nd_place'.isidentifier())     # False (Starts with digit)\nprint('user-name'.isidentifier())      # False (Contains hyphen)"
  },
  {
    question: "What does s.isprintable() do?",
    shortAnswer: "It checks if all characters in the string are printable (no unescaped control codes like \\n, \\r, \\0).",
    explanation: "Printable characters include alphanumeric characters, symbols, and spaces. Control codes such as newline (\\n) and null byte (\\0) are non-printable.",
    hint: "Returns False if string contains escape/control characters.",
    level: "moderate",
    codeExample: "print('Hello World 2026'.isprintable())  # True\nprint('Hello\\nWorld'.isprintable())      # False (\\n is a control code)"
  },
  {
    question: "What is the return value of s.isalpha(), s.isdigit(), and s.isspace() when s is an empty string ''?",
    shortAnswer: "They all return False.",
    explanation: "All character classification methods require the string to contain at least one character. If len(s) == 0, they return False (except isascii() which returns True on '').",
    hint: "Empty string yields False for almost all is...() methods.",
    level: "basic",
    codeExample: "print(''.isalpha())   # False\nprint(''.isdigit())   # False\nprint(''.isspace())   # False\nprint(''.isascii())   # True (Special case)"
  },
  {
    question: "How do you check if a string contains only uppercase letters?",
    shortAnswer: "s.isupper()",
    explanation: "isupper() returns True if all cased characters in the string are uppercase and there is at least one cased character.",
    hint: "Use isupper().",
    level: "basic",
    codeExample: "print('KOLKATA'.isupper())      # True\nprint('Kolkata'.isupper())      # False\nprint('123'.isupper())          # False (No cased characters)"
  },
  {
    question: "What does s.istitle() verify?",
    shortAnswer: "It verifies that uppercase characters follow only uncased characters and lowercase characters follow only cased ones (Title Case).",
    explanation: "In title-cased strings, each word starts with an uppercase letter followed by lowercase letters (e.g. 'Coder And Accotax').",
    hint: "Checks for Title Case format.",
    level: "basic",
    codeExample: "print('Coder And Accotax'.istitle())  # True\nprint('coder and accotax'.istitle())  # False"
  },
  {
    question: "How do removeprefix() and removesuffix() differ from lstrip() and rstrip()?",
    shortAnswer: "removeprefix/removesuffix remove an EXACT substring prefix/suffix; lstrip/rstrip remove ANY character from a set of characters.",
    explanation: "removeprefix('https://') only trims that exact sequence once. lstrip('https://') strips any combination of 'h','t','p','s',':','/' from the left edge until a different char is met.",
    hint: "removeprefix targets exact substrings; strip targets sets of characters.",
    level: "moderate",
    codeExample: "url = 'https://https.com'\nprint(url.removeprefix('https://'))  # 'https.com'\nprint(url.lstrip('https://'))         # '.com' (Over-stripping gotcha!)"
  },
  {
    question: "How do you search for a substring within a specific index range using find()?",
    shortAnswer: "s.find(sub, start, stop)",
    explanation: "The optional start and stop arguments restrict the search to the slice s[start:stop], returning the absolute index in the original string (or -1).",
    hint: "Pass start and stop index bounds.",
    level: "basic",
    codeExample: "s = 'cat and dog and cat'\nprint(s.find('cat', 5))     # 16 (Finds second 'cat')"
  },
  {
    question: "What is the best way to check if a substring exists if you do not need its index?",
    shortAnswer: "Use the 'in' operator: if 'sub' in s:",
    explanation: "The 'in' operator is the most readable, pythonic, and fastest way to perform a boolean membership check.",
    hint: "'sub in s' is faster and more readable than s.find() != -1.",
    level: "basic",
    codeExample: "if 'Barrackpore' in 'Coder & AccoTax Barrackpore':\n    print('Location found!')"
  },
  {
    question: "How can you validate if a string represents a valid positive integer before casting to int()?",
    shortAnswer: "if s.isdigit(): val = int(s)",
    explanation: "s.isdigit() or s.isdecimal() ensures that every character is a digit, preventing ValueError when int(s) is called.",
    hint: "Use s.isdigit() or s.isdecimal().",
    level: "basic",
    codeExample: "user_input = '700120'\nif user_input.isdigit():\n    pincode = int(user_input)\n    print('Valid PIN:', pincode)"
  },
  {
    question: "How can you validate if a string represents a float value?",
    shortAnswer: "Try casting with float(s) in a try/except block, or split by '.' with one dot and digits on both sides.",
    explanation: "Because Python string methods like isdigit() do not recognize decimal points, try/except float() is the most robust way to validate floating point strings.",
    hint: "Use try: float(s) except ValueError.",
    level: "moderate",
    codeExample: "def is_float(val):\n    try:\n        float(val)\n        return True\n    except ValueError:\n        return False\n\nprint(is_float('3.1415'))  # True\nprint(is_float('abc'))     # False"
  },
  {
    question: "How do you count all occurrences of a character, ignoring case?",
    shortAnswer: "s.lower().count(sub.lower()) or s.casefold().count(sub.casefold())",
    explanation: "Normalizing both the target string and the search substring to lowercase before calling count() performs a case-insensitive count.",
    hint: "Normalize case first with lower() or casefold().",
    level: "basic",
    codeExample: "text = 'Python python PYTHON PyThOn'\nprint(text.lower().count('python'))  # 4"
  },
  {
    question: "How do you check if a filename is an image file using endswith()?",
    shortAnswer: "filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp'))",
    explanation: "Lowercasing handles uppercase extensions like '.PNG' or '.JPG', while passing a tuple to endswith() tests all candidate extensions in one call.",
    hint: "Use lower() + endswith(tuple_of_extensions).",
    level: "basic",
    codeExample: "photo = 'student_profile.PNG'\nis_image = photo.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))\nprint(is_image)  # True"
  },
  {
    question: "What happens if start index is beyond the string length in s.startswith(prefix, start)?",
    shortAnswer: "It returns False without raising any IndexError.",
    explanation: "startswith() uses boundary-tolerant slice semantics, returning False when start >= len(s).",
    hint: "Tolerant slice boundary rules apply.",
    level: "moderate",
    codeExample: "s = 'Hello'\nprint(s.startswith('H', 100))  # False (No error)"
  },
  {
    question: "How do you find all positions of a substring in a string in Python?",
    shortAnswer: "Use a while loop with s.find(sub, start) advancing start = pos + 1 (or + len(sub)).",
    explanation: "By repeatedly calling find() with the previous match position + 1 as the new start parameter, you collect all matching indices.",
    hint: "Advance start index in a while loop with find().",
    level: "moderate",
    codeExample: "def find_all(s, sub):\n    res = []\n    pos = s.find(sub)\n    while pos != -1:\n        res.append(pos)\n        pos = s.find(sub, pos + 1)\n    return res\n\nprint(find_all('banana', 'an'))  # [1, 3]"
  },
  {
    question: "How do you validate if an Indian PAN card number format is valid using string methods?",
    shortAnswer: "len(pan) == 10 and pan[:5].isalpha() and pan[5:9].isdigit() and pan[9].isalpha()",
    explanation: "Standard PAN cards consist of 5 uppercase letters, 4 digits, and 1 letter (e.g. ABCDE1234F).",
    hint: "Combine slicing with isalpha() and isdigit().",
    level: "moderate",
    codeExample: "def is_valid_pan(pan):\n    return len(pan) == 10 and pan[:5].isalpha() and pan[5:9].isdigit() and pan[9].isalpha()\n\nprint(is_valid_pan('ABCDE1234F'))  # True\nprint(is_valid_pan('12345ABCDE'))  # False"
  },
  {
    question: "What is the time complexity of s.find('sub') and s.count('sub')?",
    shortAnswer: "O(N * M) worst-case, where N is len(s) and M is len(sub), though CPython uses the fast Boyer-Moore-Horspool algorithm on average.",
    explanation: "CPython implements a highly optimized hybrid string search algorithm (Boyer-Moore-Horspool combined with memchr) in native C, making searches virtually O(N) in practice.",
    hint: "Optimized in native C with fast skip heuristics.",
    level: "complex",
    codeExample: "# Search runs in microsecond-scale C loops in CPython runtime"
  }
];

export default questions;
