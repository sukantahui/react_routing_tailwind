// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "What will `s = 'Python'; print(s[::-1])` output?",
    "options": [
      "nohtyP",
      "Python",
      "P",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "A slice with step -1 and omitted start/stop reverses the string: 'nohtyP'.",
    "hint": "String reversal idiom."
  },
  {
    "id": 2,
    "question": "What is the return value of `'Computer'.find('put')`?",
    "options": [
      "3",
      "4",
      "2",
      "True"
    ],
    "correctAnswer": 0,
    "explanation": "'put' begins at index 3: C(0), o(1), m(2), p(3).",
    "hint": "0-based starting index."
  },
  {
    "id": 3,
    "question": "What does `'Python'.find('Java')` return?",
    "options": [
      "-1",
      "False",
      "None",
      "Raises ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "`str.find()` returns -1 when the substring is not found.",
    "hint": "Find failure return code."
  },
  {
    "id": 4,
    "question": "What happens if `'Python'.index('Java')` is executed?",
    "options": [
      "Returns -1",
      "Raises ValueError: substring not found",
      "Returns False",
      "Returns 0"
    ],
    "correctAnswer": 1,
    "explanation": "Unlike `find()`, `str.index()` raises `ValueError` if the substring is not present.",
    "hint": "Index failure exception."
  },
  {
    "id": 5,
    "question": "What will `s = 'Hello World'; print(s[1:8:2])` output?",
    "options": [
      "el or",
      "elW",
      "elo",
      "el o"
    ],
    "correctAnswer": 0,
    "explanation": "Indices accessed: 1 ('e'), 3 ('l'), 5 (' '), 7 ('o') -> 'el o'. Wait: 1 is 'e', 3 is 'l', 5 is ' ', 7 is 'o'. Result is 'el o'.",
    "hint": "Step 2 character pick."
  },
  {
    "id": 6,
    "question": "What does `'123a'.isdigit()` evaluate to?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "`isdigit()` returns True only if ALL characters in the string are digits. The letter 'a' makes it False.",
    "hint": "All characters must be digits."
  },
  {
    "id": 7,
    "question": "What is the output of `'#'.join(['A', 'B', 'C'])`?",
    "options": [
      "A#B#C",
      "#A#B#C#",
      "#ABC",
      "ABC#"
    ],
    "correctAnswer": 0,
    "explanation": "`join()` places the separator string between each element of the iterable: 'A#B#C'.",
    "hint": "Joining sequence with separator."
  },
  {
    "id": 8,
    "question": "What is the result of `s = 'CBSE'; s[0] = 'X'`?",
    "options": [
      "Modifies s to 'XBSE'",
      "Raises TypeError: 'str' object does not support item assignment",
      "Raises IndexError",
      "Creates a new string"
    ],
    "correctAnswer": 1,
    "explanation": "Strings are immutable, so direct item assignment is prohibited and raises TypeError.",
    "hint": "String immutability."
  },
  {
    "id": 9,
    "question": "What does `'   Python   '.strip()` return?",
    "options": [
      "'Python'",
      "'   Python'",
      "'Python   '",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`strip()` removes leading and trailing whitespace characters.",
    "hint": "Whitespace stripping."
  },
  {
    "id": 10,
    "question": "What is the output of `'apple,banana,cherry'.split(',')`?",
    "options": [
      "['apple', 'banana', 'cherry']",
      "('apple', 'banana', 'cherry')",
      "'apple banana cherry'",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`split(',')` partitions the string by comma and returns a list of substring tokens.",
    "hint": "Comma-separated split."
  },
  {
    "id": 11,
    "question": "What will `print('A' * 3)` output?",
    "options": [
      "AAA",
      "A3",
      "Error",
      "['A', 'A', 'A']"
    ],
    "correctAnswer": 0,
    "explanation": "The `*` operator on a string and integer performs string repetition.",
    "hint": "String repetition."
  },
  {
    "id": 12,
    "question": "What is the output of `'Examination'.count('a')`?",
    "options": [
      "2",
      "1",
      "3",
      "0"
    ],
    "correctAnswer": 1,
    "explanation": "'Examination' has one lowercase 'a' (at index 2). Note that count is case-sensitive.",
    "hint": "Count lowercase 'a'."
  },
  {
    "id": 13,
    "question": "What does `'python'.capitalize()` return?",
    "options": [
      "'PYTHON'",
      "'Python'",
      "'Python '",
      "'PyThOn'"
    ],
    "correctAnswer": 1,
    "explanation": "`capitalize()` converts only the first character to uppercase and the rest to lowercase.",
    "hint": "First character upper."
  },
  {
    "id": 14,
    "question": "What will `'hello world'.title()` return?",
    "options": [
      "'Hello World'",
      "'Hello world'",
      "'HELLO WORLD'",
      "'hello world'"
    ],
    "correctAnswer": 0,
    "explanation": "`title()` capitalizes the first letter of each word in the string.",
    "hint": "Title-casing each word."
  },
  {
    "id": 15,
    "question": "What is the output of `'abc'.isalpha()`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "All characters in 'abc' are alphabetic, so `isalpha()` returns True.",
    "hint": "Alphabetic test."
  },
  {
    "id": 16,
    "question": "What is the result of `'Hello' + 5`?",
    "options": [
      "'Hello5'",
      "Raises TypeError: can only concatenate str to str",
      "'Hello 5'",
      "5"
    ],
    "correctAnswer": 1,
    "explanation": "Python does not implicitly coerce integers to strings during concatenation with `+`.",
    "hint": "Strong typing error."
  },
  {
    "id": 17,
    "question": "What does `s[-3:]` extract from `s = 'COMPUTER'`?",
    "options": [
      "'TER'",
      "'PUT'",
      "'COM'",
      "'UTE'"
    ],
    "correctAnswer": 0,
    "explanation": "Negative slice `-3:` begins 3 characters from the end ('T') to the end ('R'): 'TER'.",
    "hint": "Last 3 characters."
  },
  {
    "id": 18,
    "question": "What will `s = 'Python'; print(s[10:20])` output?",
    "options": [
      "Raises IndexError",
      "Empty string ''",
      "None",
      "'Python'"
    ],
    "correctAnswer": 1,
    "explanation": "Slicing past the string length does NOT raise IndexError; Python clamps the indices, returning `''`.",
    "hint": "Slicing out-of-bounds safety."
  },
  {
    "id": 19,
    "question": "What will `'mississippi'.replace('ss', 'pp')` return?",
    "options": [
      "'mippippi'",
      "'mippippippi'",
      "'mississippi'",
      "'Error'"
    ],
    "correctAnswer": 0,
    "explanation": "Both occurrences of 'ss' are replaced with 'pp', producing 'mippippi'.",
    "hint": "Substring replacement."
  },
  {
    "id": 20,
    "question": "What will `'   '.isspace()` evaluate to?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The string contains only whitespace characters (spaces), so `isspace()` is True.",
    "hint": "Whitespace test."
  },
  {
    "id": 21,
    "question": "What is the output of `ord('A')` and `chr(65)`?",
    "options": [
      "65 and 'A'",
      "'A' and 65",
      "97 and 'a'",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`ord('A')` returns the ASCII integer 65; `chr(65)` returns the corresponding character 'A'.",
    "hint": "ASCII conversions."
  },
  {
    "id": 22,
    "question": "What is the output of `'banana'.startswith('ban')`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "'banana' starts with 'ban', returning True.",
    "hint": "Prefix match."
  },
  {
    "id": 23,
    "question": "What is the output of `'banana'.endswith('na')`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "'banana' ends with 'na', returning True.",
    "hint": "Suffix match."
  },
  {
    "id": 24,
    "question": "What is the output of `'abc'.swapcase()`?",
    "options": [
      "'ABC'",
      "'abc'",
      "'Abc'",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`swapcase()` converts lowercase to uppercase and vice versa.",
    "hint": "Inverting letter cases."
  },
  {
    "id": 25,
    "question": "Why does `'10' > '9'` evaluate to False in Python?",
    "options": [
      "Because strings are compared lexicographically by character ASCII values ('1' = 49 < '9' = 57)",
      "Because 10 is greater than 9",
      "TypeError",
      "Because of string length"
    ],
    "correctAnswer": 0,
    "explanation": "String comparison compares character-by-character. '1' has ASCII code 49, while '9' has 57; since 49 < 57, `'10' > '9'` is False.",
    "hint": "Lexicographical string comparison."
  }
];

export default questions;
