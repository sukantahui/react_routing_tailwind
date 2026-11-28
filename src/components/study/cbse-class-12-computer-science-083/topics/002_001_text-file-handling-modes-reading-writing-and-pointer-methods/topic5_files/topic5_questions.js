// 25 Authentic CBSE Board Examination Questions for Topic 5
const questions = [
  {
    "id": 1,
    "question": "What does the `f.write(s)` method return in Python 3?",
    "options": [
      "None",
      "The string written",
      "The number of characters (or bytes) written",
      "True"
    ],
    "correctAnswer": 2,
    "explanation": "`f.write(s)` returns an integer representing the exact count of characters written to the file stream.",
    "hint": "Number of characters written."
  },
  {
    "id": 2,
    "question": "Does `f.write('Hello')` automatically append a newline character `\\n` at the end?",
    "options": [
      "Yes, automatically",
      "No, the programmer must explicitly append '\\n'",
      "Only on Windows",
      "Only in append mode"
    ],
    "correctAnswer": 1,
    "explanation": "Unlike `print()`, `write()` does NOT append a newline character automatically; you must pass `'\\n'` explicitly.",
    "hint": "write() does not add newlines."
  },
  {
    "id": 3,
    "question": "What error is raised if you execute `f.write(100)` on a text file handle?",
    "options": [
      "ValueError",
      "TypeError: write() argument must be str, not int",
      "SyntaxError",
      "IOError"
    ],
    "correctAnswer": 1,
    "explanation": "Text file `write()` requires a string; passing an integer raises `TypeError`.",
    "hint": "TypeError for non-string."
  },
  {
    "id": 4,
    "question": "What argument does the `f.writelines(lines)` method accept?",
    "options": [
      "A single string only",
      "An iterable of strings (such as a list or tuple of strings)",
      "An integer array",
      "A dictionary of key-value pairs"
    ],
    "correctAnswer": 1,
    "explanation": "`f.writelines()` expects an iterable collection of string elements (e.g. `list[str]`).",
    "hint": "Iterable of string lines."
  },
  {
    "id": 5,
    "question": "Does `f.writelines(['Apple', 'Banana'])` insert newline characters between the list elements?",
    "options": [
      "Yes, between every element",
      "No, it writes them concatenated without separators: 'AppleBanana'",
      "Only if opened in write mode",
      "Yes, a comma is inserted"
    ],
    "correctAnswer": 1,
    "explanation": "A notorious CBSE trap: `writelines()` does NOT insert newlines between items! Elements must explicitly contain `'\\n'`.",
    "hint": "Does not insert newlines."
  },
  {
    "id": 6,
    "question": "Consider: `L = ['Dog\\n', 'Cat\\n']`. Executing `f.writelines(L)` produces what text on disk?",
    "options": [
      "DogCat",
      "Dog\\nCat\\n (Two lines)",
      "['Dog', 'Cat']",
      "Dog, Cat"
    ],
    "correctAnswer": 1,
    "explanation": "Since elements already include `\\n`, each element occupies its own line.",
    "hint": "Two separate lines."
  },
  {
    "id": 7,
    "question": "How can you convert an integer `marks = 95` into a valid argument for `f.write()`?",
    "options": [
      "f.write(int(95))",
      "f.write(str(marks) + '\\n')",
      "f.write([marks])",
      "f.write(bytes(marks))"
    ],
    "correctAnswer": 1,
    "explanation": "Using `str(marks)` converts the number to string, and adding `'\\n'` ensures a clean line break.",
    "hint": "str() conversion."
  },
  {
    "id": 8,
    "question": "Consider:\n```python\nf = open('out.txt', 'w')\nn = f.write('CBSE')\nf.close()\nprint(n)\n```\nWhat is output?",
    "options": [
      "None",
      "4",
      "'CBSE'",
      "True"
    ],
    "correctAnswer": 1,
    "explanation": "'CBSE' consists of 4 characters, so `write()` returns 4.",
    "hint": "Length of 'CBSE'."
  },
  {
    "id": 9,
    "question": "What occurs if you pass a list of integers `[1, 2, 3]` to `f.writelines()` on a text file?",
    "options": [
      "Writes '123' to disk",
      "Raises TypeError: write() argument must be str, not int",
      "Converts each integer automatically",
      "Skips integers silently"
    ],
    "correctAnswer": 1,
    "explanation": "`writelines()` passes elements directly to internal write; non-string elements trigger `TypeError`.",
    "hint": "TypeError on non-strings."
  },
  {
    "id": 10,
    "question": "Which string method should be used to combine a list `['A', 'B', 'C']` into newline-separated text for writing?",
    "options": [
      "'\\n'.join(['A', 'B', 'C'])",
      "['A', 'B', 'C'].split('\\n')",
      "concat('\\n', list)",
      "str(['A', 'B', 'C'])"
    ],
    "correctAnswer": 0,
    "explanation": "`'\\n'.join(list)` joins elements with newline delimiters, yielding `'A\\nB\\nC'`.",
    "hint": "join() with newline."
  },
  {
    "id": 11,
    "question": "Assertion (A): `print('Text', file=f)` can be used to write data to a file.\nReason (R): The built-in `print()` function accepts a `file` keyword argument directing output to any writable file handle.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "`print(*args, file=f)` writes directly to the open file object and appends a newline automatically.",
    "hint": "print accepts file parameter."
  },
  {
    "id": 12,
    "question": "What is the advantage of `print('Text', file=f)` over `f.write('Text')`?",
    "options": [
      "It is 100 times faster",
      "It automatically handles non-string data types and appends a trailing newline",
      "It closes the file automatically",
      "It prevents file truncation"
    ],
    "correctAnswer": 1,
    "explanation": "`print()` converts non-string objects to strings automatically and appends `\\n` by default.",
    "hint": "Automatic str conversion and newline."
  },
  {
    "id": 13,
    "question": "What happens if you execute `f.write('')` on an open file?",
    "options": [
      "Raises ValueError",
      "Writes 0 characters and returns 0 without error",
      "Deletes the file",
      "Adds a newline"
    ],
    "correctAnswer": 1,
    "explanation": "Writing an empty string writes zero characters and returns 0 cleanly.",
    "hint": "Safe zero character write."
  },
  {
    "id": 14,
    "question": "Consider:\n```python\nf = open('log.txt', 'w')\nf.write('One')\nf.write('Two')\nf.close()\n```\nWhat does `log.txt` contain?",
    "options": [
      "One\\nTwo",
      "OneTwo (single line without space or break)",
      "'One', 'Two'",
      "Two"
    ],
    "correctAnswer": 1,
    "explanation": "Without explicit `'\\n'`, consecutive calls to `write()` concatenate directly on the same line.",
    "hint": "Concatenated on same line."
  },
  {
    "id": 15,
    "question": "Which file access mode should be selected if writing must preserve existing file content?",
    "options": [
      "'w'",
      "'a' or 'a+'",
      "'w+'",
      "'create'"
    ],
    "correctAnswer": 1,
    "explanation": "Modes `'a'` and `'a+'` append writes to the end of the existing file without truncating prior content.",
    "hint": "Append mode."
  },
  {
    "id": 16,
    "question": "Consider the code:\n```python\nnames = ['Mamata', 'Susmita', 'Mahima']\nwith open('students.txt', 'w') as f:\n    f.writelines(n + '\\n' for n in names)\n```\nWhat is written to `students.txt`?",
    "options": [
      "A single line 'MamataSusmitaMahima'",
      "Three separate lines, each containing one name",
      "Syntax error due to generator expression",
      "A tuple string"
    ],
    "correctAnswer": 1,
    "explanation": "A generator expression appending `'\\n'` to each name outputs each name on its own distinct line.",
    "hint": "Generator with newlines."
  },
  {
    "id": 17,
    "question": "What is output by `f.write('Hi\\n')` on a text file?",
    "options": [
      "2",
      "3",
      "4",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "'H', 'i', and '\\n' constitute exactly 3 characters, so `write()` returns 3.",
    "hint": "Count chars in 'Hi\\n'."
  },
  {
    "id": 18,
    "question": "What happens if disk space runs out during a `f.write()` operation?",
    "options": [
      "Python ignores it silently",
      "Raises OSError (such as No space left on device)",
      "File pointer resets to 0",
      "Data is compressed automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Hardware disk exhaustion raises an `OSError`.",
    "hint": "Operating system error."
  },
  {
    "id": 19,
    "question": "Assertion (A): Calling `f.writelines()` is always faster than calling `f.write()` in a loop.\nReason (R): `writelines()` reduces Python interpreter bytecode overhead by writing all items in an optimized C-level loop.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "`writelines()` executes the loop in C internal runtime, reducing bytecode dispatch cycles.",
    "hint": "C-level internal optimization."
  },
  {
    "id": 20,
    "question": "Which of the following lines will successfully write a dictionary `{'id': 1, 'name': 'A'}` to a text file?",
    "options": [
      "f.write({'id': 1, 'name': 'A'})",
      "f.write(str({'id': 1, 'name': 'A'}) + '\\n')",
      "f.writelines({'id': 1, 'name': 'A'})",
      "f.write_dict({'id': 1})"
    ],
    "correctAnswer": 1,
    "explanation": "Converting the dictionary to a string representation via `str()` is mandatory before writing to a text file.",
    "hint": "Convert to string first."
  },
  {
    "id": 21,
    "question": "What is the result of `f.writelines([])` on an open file?",
    "options": [
      "Raises ValueError",
      "Raises TypeError",
      "Safe no-op (nothing is written)",
      "Clears the file"
    ],
    "correctAnswer": 2,
    "explanation": "Passing an empty iterable writes nothing and executes safely.",
    "hint": "No-op."
  },
  {
    "id": 22,
    "question": "Consider:\n```python\nf = open('test.txt', 'w')\nf.write('Hello ')\nf.write('World!')\nf.close()\n```\nWhat is the exact character count of `test.txt`?",
    "options": [
      "11",
      "12",
      "13",
      "10"
    ],
    "correctAnswer": 1,
    "explanation": "'Hello ' (6 chars) + 'World!' (6 chars) = 12 characters.",
    "hint": "6 + 6 = 12."
  },
  {
    "id": 23,
    "question": "In Python, which parameter of `print()` can be used to prevent adding an automatic newline when writing via print?",
    "options": [
      "newline=''",
      "end=''",
      "sep=''",
      "terminate=False"
    ],
    "correctAnswer": 1,
    "explanation": "Setting `end=''` prevents `print()` from appending its default `'\\n'`.",
    "hint": "end parameter."
  },
  {
    "id": 24,
    "question": "Which method flushes the written bytes from the memory buffer to physical storage without closing?",
    "options": [
      "f.flush()",
      "f.dump()",
      "f.clean()",
      "f.sync()"
    ],
    "correctAnswer": 0,
    "explanation": "`f.flush()` immediately writes out uncommitted buffered data to disk.",
    "hint": "flush method."
  },
  {
    "id": 25,
    "question": "A CBSE practical question asks: 'Accept 5 student names from user and write each to a text file names.txt'. Which loop is correct?",
    "options": [
      "for i in range(5): name = input(); f.write(name + '\\n')",
      "for i in range(5): name = input(); f.write(name)",
      "f.writelines(5)",
      "f.write(input() * 5)"
    ],
    "correctAnswer": 0,
    "explanation": "Taking user input and appending `'\\n'` ensures each student's name is stored on a separate line.",
    "hint": "input with '\\n'."
  }
];

export default questions;
