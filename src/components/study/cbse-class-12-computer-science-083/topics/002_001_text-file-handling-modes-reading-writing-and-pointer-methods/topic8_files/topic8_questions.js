// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "In a CBSE board question: 'Write a function count_words(filename) to count the occurrences of the word 'the' in a text file', which string method should be used to tokenize lines into words?",
    "options": [
      "line.split()",
      "line.strip()",
      "line.partition()",
      "line.join()"
    ],
    "correctAnswer": 0,
    "explanation": "`line.split()` splits a string at whitespace boundaries, returning a list of individual words.",
    "hint": "split() splits into words."
  },
  {
    "id": 2,
    "question": "Consider the function:\n```python\ndef count_vowels(filename):\n    count = 0\n    with open(filename) as f:\n        for ch in f.read():\n            if ch.lower() in 'aeiou':\n                count += 1\n    return count\n```\nWhat does this function compute?",
    "options": [
      "Total lines with vowels",
      "Total vowel characters in the entire file",
      "Total words containing vowels",
      "Count of uppercase vowels only"
    ],
    "correctAnswer": 1,
    "explanation": "Iterating over `f.read()` checks every individual character; `ch.lower() in 'aeiou'` counts all vowel instances.",
    "hint": "Counts all vowel characters."
  },
  {
    "id": 3,
    "question": "How should a line be checked to see if it starts with the letter 'A' or 'M' regardless of case?",
    "options": [
      "if line[0].upper() in ['A', 'M']:",
      "if line.startswith(('A', 'M', 'a', 'm')):",
      "Both Option 1 and Option 2 are correct",
      "if line.count('A') > 0:"
    ],
    "correctAnswer": 2,
    "explanation": "Both `line[0].upper() in ['A', 'M']` and `line.startswith(('A', 'M', 'a', 'm'))` correctly detect matching initial characters.",
    "hint": "Both approaches are valid."
  },
  {
    "id": 4,
    "question": "What error occurs if you test `if line[0] == 'A':` on a file containing an empty line without checking line length?",
    "options": [
      "IndexError: string index out of range",
      "ValueError",
      "KeyError",
      "No error, returns None"
    ],
    "correctAnswer": 0,
    "explanation": "If a line is completely empty (e.g. `line == ''`), indexing `line[0]` raises `IndexError: string index out of range`.",
    "hint": "Empty string indexing error."
  },
  {
    "id": 5,
    "question": "How do you safely check the first character of `line` to prevent `IndexError` on blank lines?",
    "options": [
      "if len(line) > 0 and line[0] == 'A':",
      "if line and line[0] == 'A':",
      "if line.startswith('A'):",
      "All of the above"
    ],
    "correctAnswer": 3,
    "explanation": "All three methods protect against `IndexError`: `startswith('A')` safely returns False on empty strings, and short-circuit `len(line) > 0` guards indexing.",
    "hint": "All three guard against empty lines."
  },
  {
    "id": 6,
    "question": "In Python, which character method returns True if a character is an uppercase alphabet?",
    "options": [
      "ch.iscap()",
      "ch.isupper()",
      "ch.upper()",
      "ch.case()"
    ],
    "correctAnswer": 1,
    "explanation": "`ch.isupper()` returns a boolean True if the character is an uppercase letter.",
    "hint": "isupper method."
  },
  {
    "id": 7,
    "question": "In Python, which method returns True if a character is a numeric digit (0-9)?",
    "options": [
      "ch.isnum()",
      "ch.isdigit()",
      "ch.numeric()",
      "ch.int()"
    ],
    "correctAnswer": 1,
    "explanation": "`ch.isdigit()` returns True if all characters in the string are digits.",
    "hint": "isdigit method."
  },
  {
    "id": 8,
    "question": "Consider the code:\n```python\nwith open('story.txt') as f:\n    text = f.read()\n    words = text.split()\n    print(len(words))\n```\nWhat is printed?",
    "options": [
      "Total lines in story.txt",
      "Total characters in story.txt",
      "Total whitespace-delimited words in story.txt",
      "Total vowels in story.txt"
    ],
    "correctAnswer": 2,
    "explanation": "`text.split()` splits by arbitrary whitespace, and `len(words)` computes the total word count.",
    "hint": "len of split words."
  },
  {
    "id": 9,
    "question": "A CBSE question asks: 'Count how many times the word 'India' appears in diary.txt regardless of case (e.g. India, INDIA, india)'. What condition should be inside the loop over `words`?",
    "options": [
      "if w == 'India':",
      "if w.lower() == 'india':",
      "if 'india' in w:",
      "if w.startswith('India'):"
    ],
    "correctAnswer": 1,
    "explanation": "Using `w.lower() == 'india'` ensures case-insensitive exact word matching.",
    "hint": "w.lower() comparison."
  },
  {
    "id": 10,
    "question": "What does the following function return?\n```python\ndef count_digits(fname):\n    with open(fname) as f:\n        return sum(1 for ch in f.read() if ch.isdigit())\n```",
    "options": [
      "Total numeric characters in fname",
      "Total non-digit characters",
      "Sum of digit values",
      "Total lines"
    ],
    "correctAnswer": 0,
    "explanation": "A generator expression counts each character where `ch.isdigit()` is True.",
    "hint": "Counts digit characters."
  },
  {
    "id": 11,
    "question": "Consider a file `notes.txt` with content:\n```\nApple is sweet.\nBanana is yellow.\nAvocado is green.\n```\nHow many lines start with 'A'?",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correctAnswer": 1,
    "explanation": "Line 1 ('Apple...') and Line 3 ('Avocado...') start with 'A', totaling 2 lines.",
    "hint": "Apple and Avocado."
  },
  {
    "id": 12,
    "question": "Assertion (A): Splitting a line with `line.split()` automatically strips out newline `\\n` characters from words.\nReason (R): `str.split()` treats all whitespace (spaces, tabs, newlines) as default delimiters.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Default `.split()` splits on any whitespace sequence, discarding `\\n` automatically from the returned tokens.",
    "hint": "Whitespace includes newlines."
  },
  {
    "id": 13,
    "question": "In a text file, how do you count the number of lines whose length is greater than 50 characters?",
    "options": [
      "count = sum(1 for line in f if len(line) > 50)",
      "count = len(f.read()) > 50",
      "count = f.readline() > 50",
      "count = len(f.readlines())"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating line-by-line and testing `len(line) > 50` accurately tallies long lines.",
    "hint": "Iterate lines with len check."
  },
  {
    "id": 14,
    "question": "Consider: `line = 'Hello, world!'`. `words = line.split()`. What is `words[0]`?",
    "options": [
      "'Hello'",
      "'Hello,' (includes comma)",
      "'H'",
      "['Hello']"
    ],
    "correctAnswer": 1,
    "explanation": "Default `split()` splits on whitespace; punctuation attached to words is not removed, so `words[0]` is `'Hello,'`.",
    "hint": "Punctuation stays attached."
  },
  {
    "id": 15,
    "question": "How can attached punctuation like commas or periods be stripped from a word in Python?",
    "options": [
      "w.strip(',.!?:;\"')",
      "w.split(',')",
      "w.remove_punct()",
      "w.pop()"
    ],
    "correctAnswer": 0,
    "explanation": "`w.strip(',.!?:;\"')` strips leading and trailing punctuation symbols.",
    "hint": "strip with punctuation set."
  },
  {
    "id": 16,
    "question": "What is the return value of `ch.isspace()` for `ch = '\\n'`?",
    "options": [
      "False",
      "True",
      "None",
      "Raises TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Whitespace characters include space (`' '`), tab (`'\\t'`), and newline (`'\\n'`), so `isspace()` returns True.",
    "hint": "Newline is whitespace."
  },
  {
    "id": 17,
    "question": "A CBSE question asks: 'Display all words from a file book.txt whose length is less than 4'. What condition should be used?",
    "options": [
      "if len(w) < 4: print(w)",
      "if w < 4: print(w)",
      "if w.count() < 4: print(w)",
      "if len(w) <= 4: print(w)"
    ],
    "correctAnswer": 0,
    "explanation": "`len(w) < 4` tests if the length of word string `w` is strictly less than 4.",
    "hint": "Strictly less than 4."
  },
  {
    "id": 18,
    "question": "How many uppercase letters are in the string `Python CS 083`?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "explanation": "The uppercase letters are 'P', 'C', and 'S' (total 3).",
    "hint": "P, C, and S."
  },
  {
    "id": 19,
    "question": "Consider the function:\n```python\ndef count_he_she(fname):\n    count = 0\n    with open(fname) as f:\n        for word in f.read().split():\n            if word.lower() in ['he', 'she']:\n                count += 1\n    return count\n```\nWhat is the purpose of this function?",
    "options": [
      "Counts occurrences of words 'he' and 'she' combined",
      "Replaces 'he' with 'she'",
      "Splits words by 'he'",
      "Counts pronouns in lines"
    ],
    "correctAnswer": 0,
    "explanation": "The condition checks if each word is either 'he' or 'she' (case-insensitively) and increments count.",
    "hint": "Counts 'he' or 'she'."
  },
  {
    "id": 20,
    "question": "Which loop construct is best to display only lines ending with a period ('.')?",
    "options": [
      "for line in f: if line.strip().endswith('.'): print(line)",
      "for line in f: if line.endswith('.'): print(line)",
      "for w in f.read(): if w == '.': print(w)",
      "for i in range(len(f)): print(f[i])"
    ],
    "correctAnswer": 0,
    "explanation": "Because `line` may end with `'\\n'`, calling `line.strip()` before `.endswith('.')` is required to check the actual text ending.",
    "hint": "Strip before endswith."
  },
  {
    "id": 21,
    "question": "Assertion (A): In text file analysis, `len(f.read())` returns total character count including spaces and newlines.\nReason (R): `read()` returns the raw entire string as stored on disk.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Every byte corresponding to letters, numbers, spaces, and `\\n` is returned in the string.",
    "hint": "read() preserves every character."
  },
  {
    "id": 22,
    "question": "What will `sum(1 for line in f if not line.strip())` calculate on a text file?",
    "options": [
      "Total words",
      "Total blank or empty lines",
      "Total characters",
      "Total non-empty lines"
    ],
    "correctAnswer": 1,
    "explanation": "If `line.strip()` is empty (`''`), `not line.strip()` evaluates to True, tallying blank lines.",
    "hint": "Tally empty lines."
  },
  {
    "id": 23,
    "question": "In a CBSE 3-mark question: 'Write a program to count total consonants in POEM.TXT'. How should consonants be identified?",
    "options": [
      "if ch.isalpha() and ch.lower() not in 'aeiou':",
      "if ch not in 'aeiou':",
      "if ch.isalnum():",
      "if ch.islower():"
    ],
    "correctAnswer": 0,
    "explanation": "Must check `ch.isalpha()` first to exclude digits, spaces, and punctuation, then ensure it is not a vowel.",
    "hint": "Must be alphabetic and not vowel."
  },
  {
    "id": 24,
    "question": "Consider:\n```python\nwith open('data.txt') as f:\n    total = 0\n    for line in f:\n        total += len(line.split())\n```\nWhat does `total` represent?",
    "options": [
      "Total characters",
      "Total lines",
      "Total words in the file",
      "Total bytes"
    ],
    "correctAnswer": 2,
    "explanation": "`len(line.split())` counts words per line; summing across lines gives total words.",
    "hint": "Words per line sum."
  },
  {
    "id": 25,
    "question": "In CBSE board marking schemes, what is typically awarded for opening the file correctly using `with open(...)`?",
    "options": [
      "0 marks",
      "1/2 mark to 1 mark",
      "Full 3 marks",
      "Only given in practicals"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE step marking consistently awards 1/2 to 1 mark for correct file opening and closure syntax.",
    "hint": "Step marking awards open/close."
  }
];

export default questions;
