// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "In Python text file processing, why can't we directly 'insert' a word into the middle of a text file without overwriting subsequent characters?",
    "options": [
      "Because text files are sequential byte streams on disk",
      "Because Python lacks string slicing",
      "Because file systems forbid writing to files",
      "Because of RAM limits"
    ],
    "correctAnswer": 0,
    "explanation": "Files on disk are linear byte streams; writing into the middle overwrites the existing bytes rather than shifting them right.",
    "hint": "Sequential byte stream on disk."
  },
  {
    "id": 2,
    "question": "What is the standard, safest technique in Python to replace words across an entire text file?",
    "options": [
      "Read file content into memory string, perform str.replace(), and rewrite file in 'w' mode (or write to temporary file)",
      "Use seek() with -1 offset",
      "Open file in 'r+' and call f.replace()",
      "Call os.replace_word()"
    ],
    "correctAnswer": 0,
    "explanation": "Reading the text, replacing strings with `str.replace()`, and rewriting to disk or staging via a temp file is the standard pattern.",
    "hint": "Read, replace, rewrite."
  },
  {
    "id": 3,
    "question": "Which method in Python performs string replacement?",
    "options": [
      "s.change(old, new)",
      "s.replace(old, new)",
      "s.swap(old, new)",
      "s.substitute(old, new)"
    ],
    "correctAnswer": 1,
    "explanation": "`str.replace(old, new)` returns a copy with all occurrences of substring `old` replaced by `new`.",
    "hint": "replace method."
  },
  {
    "id": 4,
    "question": "A CBSE practical question asks: 'Copy all lines from STORY.TXT to CLEAN.TXT, excluding any line that contains the word 'this' or 'that''. Which condition filters the lines?",
    "options": [
      "if 'this' not in line.lower() and 'that' not in line.lower(): fout.write(line)",
      "if line.count('this') > 0: fout.write(line)",
      "if line == 'this': fout.write(line)",
      "fout.write(line.replace('this', ''))"
    ],
    "correctAnswer": 0,
    "explanation": "Checking `not in` for both words ensures only lines without 'this' and 'that' are copied to the output file.",
    "hint": "not in condition for both."
  },
  {
    "id": 5,
    "question": "Which module in Python's standard library provides atomic file renaming and removal for file replacement tasks?",
    "options": [
      "sys",
      "os",
      "filemgr",
      "math"
    ],
    "correctAnswer": 1,
    "explanation": "The `os` module provides `os.remove()` and `os.rename()` / `os.replace()`.",
    "hint": "os module."
  },
  {
    "id": 6,
    "question": "What does `os.replace(src, dst)` do?",
    "options": [
      "Replaces a string inside a file",
      "Atomically renames file src to dst, overwriting dst if it exists",
      "Deletes both files",
      "Compresses src into dst"
    ],
    "correctAnswer": 1,
    "explanation": "`os.replace(src, dst)` renames `src` to `dst` atomically, replacing `dst` if it already exists.",
    "hint": "Atomic file renaming."
  },
  {
    "id": 7,
    "question": "Consider: `text = 'Apple and Banana'.replace('a', '@')`. What is the value of `text`?",
    "options": [
      "'Apple @nd B@n@n@'",
      "'Apple and Banana'",
      "'@pple @nd B@n@n@'",
      "'Apple and B@n@n@'"
    ],
    "correctAnswer": 0,
    "explanation": "Notice `'A'` is uppercase so it is untouched; lowercase `'a'` is replaced, resulting in `'Apple @nd B@n@n@'`.",
    "hint": "Case-sensitive replacement."
  },
  {
    "id": 8,
    "question": "How can case-insensitive word replacement be performed in Python without regular expressions?",
    "options": [
      "Tokenize words, compare lowercased versions, rebuild string, and write back",
      "Use str.replace_ignore_case()",
      "Open file with mode 'w+i'",
      "Python does not support it"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating through tokens or lines and testing `w.lower()` allows controlled case-insensitive replacement.",
    "hint": "Token comparison and rebuild."
  },
  {
    "id": 9,
    "question": "Assertion (A): Opening a file in `'r+'` mode and calling `f.write(new_text)` will shift subsequent existing text to the right.\nReason (R): Text files dynamically expand memory when new characters are inserted.",
    "options": [
      "Both A and R are true",
      "Both A and R are false",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 1,
    "explanation": "Both statements are false: `'r+'` overwrites bytes in place over existing data and does not shift text.",
    "hint": "Overwrites in place without shifting."
  },
  {
    "id": 10,
    "question": "What happens if `new_text` is shorter than `old_text` when doing an in-place `'r+'` write?",
    "options": [
      "Trailing characters of the previous text remain visible in the file",
      "The file is truncated automatically",
      "The OS pads with spaces",
      "Raises ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "Writing shorter strings leaves remaining trailing characters intact unless explicitly truncated with `f.truncate()`.",
    "hint": "Trailing characters linger."
  },
  {
    "id": 11,
    "question": "Which method truncates an open file to its current file pointer position?",
    "options": [
      "f.truncate()",
      "f.cut()",
      "f.slice()",
      "f.trim()"
    ],
    "correctAnswer": 0,
    "explanation": "`f.truncate()` reduces the file size to the specified byte offset (or current pointer if omitted).",
    "hint": "truncate method."
  },
  {
    "id": 12,
    "question": "Consider the code:\n```python\nwith open('notes.txt', 'r') as fin, open('temp.txt', 'w') as fout:\n    for line in fin:\n        fout.write(line.replace('Barrackpore', 'Kolkata'))\n```\nWhat does this achieve?",
    "options": [
      "Updates notes.txt directly",
      "Creates temp.txt where every occurrence of 'Barrackpore' is replaced with 'Kolkata'",
      "Deletes notes.txt",
      "Counts occurrences of Kolkata"
    ],
    "correctAnswer": 1,
    "explanation": "It streams lines from `notes.txt`, performs string substitution, and writes the updated lines into `temp.txt`.",
    "hint": "Writes replaced text to temp.txt."
  },
  {
    "id": 13,
    "question": "In the staging file replacement pattern, what two OS operations finalize the update of `original.txt` from `temp.txt`?",
    "options": [
      "os.remove('original.txt') followed by os.rename('temp.txt', 'original.txt')",
      "os.copy('temp.txt', 'original.txt')",
      "os.delete() and os.create()",
      "os.sync() only"
    ],
    "correctAnswer": 0,
    "explanation": "Removing the original file and renaming the staging file is the standard cross-platform update recipe.",
    "hint": "remove original, rename temp."
  },
  {
    "id": 14,
    "question": "How do you find the line number where the word 'CRITICAL' first appears in `system.log`?",
    "options": [
      "for idx, line in enumerate(f, start=1): if 'CRITICAL' in line: return idx",
      "f.find('CRITICAL')",
      "f.index('CRITICAL')",
      "enumerate(f.read())"
    ],
    "correctAnswer": 0,
    "explanation": "`enumerate(f, start=1)` yields 1-based line numbers alongside line strings, allowing immediate return upon match.",
    "hint": "enumerate with start=1."
  },
  {
    "id": 15,
    "question": "What does `str.find(sub)` return if the substring `sub` is not found?",
    "options": [
      "0",
      "-1",
      "None",
      "Raises ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "`str.find()` returns `-1` if the target substring does not exist.",
    "hint": "Returns -1 on failure."
  },
  {
    "id": 16,
    "question": "What does `str.index(sub)` do if the substring `sub` is not found?",
    "options": [
      "Returns -1",
      "Returns None",
      "Raises ValueError",
      "Returns False"
    ],
    "correctAnswer": 2,
    "explanation": "Unlike `find()`, `str.index()` raises a `ValueError` when the substring is missing.",
    "hint": "Raises ValueError on failure."
  },
  {
    "id": 17,
    "question": "Which approach is most efficient to replace words in a 5 MB file?",
    "options": [
      "with open('f.txt', 'r') as f: c = f.read().replace('old', 'new'); with open('f.txt', 'w') as f: f.write(c)",
      "Byte by byte search using f.read(1)",
      "Rebooting computer",
      "Calling f.seek(1000)"
    ],
    "correctAnswer": 0,
    "explanation": "For small-to-medium files (5 MB), reading full content into RAM string, replacing, and rewriting is fast and simple.",
    "hint": "Read into memory, replace, rewrite."
  },
  {
    "id": 18,
    "question": "What is the return type of `str.replace()`?",
    "options": [
      "None (modifies in place)",
      "A new string with replacements",
      "A list of strings",
      "An integer count"
    ],
    "correctAnswer": 1,
    "explanation": "Strings are immutable in Python; `replace()` returns a brand new string.",
    "hint": "Strings are immutable."
  },
  {
    "id": 19,
    "question": "Assertion (A): Strings in Python cannot be modified in-place inside file streams.\nReason (R): Python string objects are immutable data structures.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Because Python strings cannot be mutated in place, string methods always generate new string objects.",
    "hint": "String immutability."
  },
  {
    "id": 20,
    "question": "What does `s.replace('Python', 'Java', 1)` do?",
    "options": [
      "Replaces all occurrences",
      "Replaces only the first occurrence of 'Python'",
      "Replaces starting from index 1",
      "Raises TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "The optional third argument specifies `count`, limiting replacements to the first `count` occurrences.",
    "hint": "Optional max count parameter."
  },
  {
    "id": 21,
    "question": "Consider: `line = 'This is a test'`. Executing `' '.join(['THAT' if w == 'This' else w for w in line.split()])` produces what?",
    "options": [
      "'THAT is a test'",
      "'This is a test'",
      "'THATisatest'",
      "['THAT', 'is', 'a', 'test']"
    ],
    "correctAnswer": 0,
    "explanation": "List comprehension replaces exact token 'This' with 'THAT' and joins with spaces.",
    "hint": "Token replacement."
  },
  {
    "id": 22,
    "question": "A CBSE question asks: 'Write a program to copy all lines not starting with '#' from config.txt to clean.txt'. What condition is used?",
    "options": [
      "if not line.strip().startswith('#'): fout.write(line)",
      "if line[0] != '#': fout.write(line)",
      "if '#' not in line: fout.write(line)",
      "fout.write(line - '#')"
    ],
    "correctAnswer": 0,
    "explanation": "`line.strip().startswith('#')` cleanly detects comments while ignoring leading whitespace.",
    "hint": "strip().startswith('#')."
  },
  {
    "id": 23,
    "question": "What is the effect of calling `os.remove('missing_file.txt')`?",
    "options": [
      "Creates missing_file.txt",
      "Raises FileNotFoundError",
      "Returns False silently",
      "Empties the directory"
    ],
    "correctAnswer": 1,
    "explanation": "Attempting to delete a non-existent file raises `FileNotFoundError`.",
    "hint": "FileNotFoundError on remove."
  },
  {
    "id": 24,
    "question": "Why is a temporary file pattern preferred over direct in-memory rewrite when processing massive multi-gigabyte files?",
    "options": [
      "It prevents loading the entire multi-gigabyte file into RAM, streaming line-by-line instead",
      "It makes disks run cooler",
      "It avoids needing open()",
      "It compresses text automatically"
    ],
    "correctAnswer": 0,
    "explanation": "Streaming line-by-line from source to temporary file maintains a constant O(1) RAM footprint.",
    "hint": "Constant O(1) memory footprint."
  },
  {
    "id": 25,
    "question": "In a CBSE 3-mark question: 'Write a function REMOVE_WORD(fname, word) to remove all occurrences of word from fname'. What is the most concise solution?",
    "options": [
      "with open(fname, 'r') as f: txt = f.read(); with open(fname, 'w') as f: f.write(txt.replace(word, ''))",
      "f.remove(word)",
      "with open(fname) as f: f.delete(word)",
      "os.remove_word(fname, word)"
    ],
    "correctAnswer": 0,
    "explanation": "Reading the content string, applying `.replace(word, '')`, and rewriting the file in `'w'` mode is the standard full-credit CBSE solution.",
    "hint": "Read, replace with empty string, rewrite."
  }
];

export default questions;
