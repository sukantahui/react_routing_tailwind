export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: File Modes, open(), close() & Basic Reading Methods",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the default mode when opening a file using Python's built-in open() function?\n(a) 'w'\n(b) 'r'\n(c) 'a'\n(d) 'rb'",
            "solution": "(b) 'r'. In Python, open('filename') defaults to read mode ('r') in text format.",
            "markingScheme": "1 Mark for (b) 'r'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Differentiate between read() and readline() methods of file objects in Python.",
            "solution": "read([n]) reads up to n bytes/characters (or the whole file as a single string if omitted), whereas readline([n]) reads characters up to and including the newline character (\\n) returning a single line as a string.",
            "markingScheme": "1 Mark for clear difference in return value (entire text string vs single line string)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which file mode opens a text file for reading and writing without truncating existing content if the file exists?\n(a) 'w+'\n(b) 'r+'\n(c) 'a+'\n(d) 'w'",
            "solution": "(b) 'r+'. 'r+' opens for both reading and writing with the file pointer at the beginning without truncating the file.",
            "markingScheme": "1 Mark for (b) 'r+'."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What happens if you open a non-existent file in 'w' mode versus 'r' mode?",
            "solution": "In 'w' mode, Python creates a new empty file. In 'r' mode, Python raises a FileNotFoundError.",
            "markingScheme": "1 Mark (0.5 for 'w' creates file, 0.5 for 'r' raises FileNotFoundError)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Suppose 'data.txt' contains:\nPython 3.12\nComputer Science\nFind the output of:\nf = open('data.txt', 'r')\ns1 = f.read(6)\ns2 = f.readline()\nprint(s1)\nprint(s2.strip())\nf.close()",
            "solution": "f.read(6) reads first 6 characters: 'Python'\nf.readline() continues from index 6 to the end of the line: ' 3.12\\n'\nOutput:\nPython\n3.12",
            "markingScheme": "1 Mark for 'Python', 1 Mark for '3.12'."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is it best practice to use the 'with' statement when working with file objects in Python?",
            "solution": "The 'with' statement creates a context manager that guarantees the file is properly closed automatically when the execution block exits, even if an exception occurs, preventing resource leaks.",
            "markingScheme": "1 Mark for context management/automatic closure, 1 Mark for exception safety/resource cleanup."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Explain the role of tell() and seek() methods with their parameters in text file navigation.",
            "solution": "1. tell(): Returns the current integer byte position of the file pointer.\n2. seek(offset, whence): Moves the file pointer.\n- offset: Number of bytes to move.\n- whence: Reference point (0 = beginning [default], 1 = current position, 2 = end).\nNote: In text mode in Python 3, non-zero offsets are only allowed when whence is 0 (beginning).",
            "markingScheme": "1 Mark for tell(), 1.5 Marks for seek() and parameters, 0.5 Mark for text mode limitation note."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_vowels(filename) that reads a text file and returns the total number of vowels (A, E, I, O, U, case-insensitive) present.",
            "solution": "def count_vowels(filename):\n    vowels = set('aeiouAEIOU')\n    count = 0\n    with open(filename, 'r') as f:\n        text = f.read()\n        for ch in text:\n            if ch in vowels:\n                count += 1\n    return count",
            "markingScheme": "1 Mark for file opening with 'with', 1 Mark for iterating and checking vowels, 1 Mark for correct counting and return."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program with two user-defined functions:\n1. create_log(filename): Accepts 5 lines of user input from the console and writes them to the specified text file.\n2. filter_lines(src_file, target_file): Reads 'src_file' and copies only those lines that do NOT start with '#' (ignoring leading whitespace) to 'target_file'.\nDisplay the contents of target_file after execution.",
            "solution": "def create_log(filename):\n    with open(filename, 'w') as f:\n        print('Enter 5 lines of log:')\n        for _ in range(5):\n            line = input()\n            f.write(line + '\\n')\n\ndef filter_lines(src_file, target_file):\n    with open(src_file, 'r') as fin, open(target_file, 'w') as fout:\n        for line in fin:\n            if not line.strip().startswith('#'):\n                fout.write(line)\n\ndef main():\n    create_log('raw_log.txt')\n    filter_lines('raw_log.txt', 'clean_log.txt')\n    print('Filtered File Contents:')\n    with open('clean_log.txt', 'r') as f:\n        print(f.read())",
            "markingScheme": "2 Marks for create_log() write logic, 2.5 Marks for filter_lines() condition and copy, 1.5 Marks for main driver and file display."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Text File Writing, writelines() & Word Counting",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Does the write() method in Python automatically append a newline ('\\n') character to the written string?",
            "solution": "No. write() writes the exact string passed to it. Newline characters ('\\n') must be explicitly included.",
            "markingScheme": "1 Mark for No with explanation."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What parameter type does writelines() expect?\n(a) A single string\n(b) An iterable of strings (e.g. list or tuple of strings)\n(c) An integer count\n(d) A dictionary of keys",
            "solution": "(b) An iterable of strings. writelines() accepts any sequence/iterable of strings.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which mode opens a file for appending text while creating the file if it does not already exist?\n(a) 'r'\n(b) 'w'\n(c) 'a'\n(d) 'x'",
            "solution": "(c) 'a'. Append mode writes data to the end of the file and creates the file if it does not exist.",
            "markingScheme": "1 Mark for (c) 'a'."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the return value of file.write('Hello') in Python 3?",
            "solution": "It returns the number of characters written (5 in this case).",
            "markingScheme": "1 Mark for number of characters written."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the content of 'out.txt' after running:\nlines = ['Alpha', 'Beta', 'Gamma']\nwith open('out.txt', 'w') as f:\n    f.writelines(lines)",
            "solution": "writelines() does NOT add newlines between elements. All items are concatenated without separators.\nFile content: AlphaBetaGamma",
            "markingScheme": "1 Mark for recognizing no automatic newlines, 1 Mark for exact output: AlphaBetaGamma."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Find the error in the following code and write the corrected version:\nf = open('notes.txt', 'w')\nf.write(100)\nf.close()",
            "solution": "Error: write() argument must be str, not int (TypeError: write() argument must be str, not int).\nCorrection:\nf.write(str(100)) or f.write('100')",
            "markingScheme": "1 Mark for identifying TypeError (int cannot be written), 1 Mark for str() conversion."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function count_words(filename) that reads 'filename' and returns the total number of words separated by whitespace.",
            "solution": "def count_words(filename):\n    with open(filename, 'r') as f:\n        content = f.read()\n        words = content.split()\n        return len(words)",
            "markingScheme": "1 Mark for file reading, 1 Mark for split() usage, 1 Mark for returning count."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_word_frequency(filename, target_word) that counts how many times 'target_word' appears in a file (case-insensitive).",
            "solution": "def count_word_frequency(filename, target_word):\n    count = 0\n    target = target_word.lower()\n    with open(filename, 'r') as f:\n        for line in f:\n            words = line.split()\n            for w in words:\n                if w.strip('.,!?:;\"').lower() == target:\n                    count += 1\n    return count",
            "markingScheme": "1 Mark for line-by-line reading, 1 Mark for lowercase comparison and punctuation stripping, 1 Mark for counting."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A text file named 'story.txt' contains multiple lines of English text. Write a user-defined function stats_story() in Python that displays:\n1. Total number of lines\n2. Total number of words\n3. Total number of characters (including spaces)\n4. Total number of lines starting with uppercase 'T' or 't'",
            "solution": "def stats_story():\n    lines_count = 0\n    words_count = 0\n    chars_count = 0\n    t_lines_count = 0\n    \n    with open('story.txt', 'r') as f:\n        for line in f:\n            lines_count += 1\n            chars_count += len(line)\n            words_count += len(line.split())\n            if line.strip() and line.strip()[0] in 'Tt':\n                t_lines_count += 1\n                \n    print(f'Total Lines: {lines_count}')\n    print(f'Total Words: {words_count}')\n    print(f'Total Characters: {chars_count}')\n    print(f'Lines starting with T/t: {t_lines_count}')",
            "markingScheme": "1.5 Marks for lines & chars counting, 1.5 Marks for words counting, 1.5 Marks for 'T/t' line detection, 1.5 Marks for neat output display."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: seek(), tell() & Relative File Pointer Traversal",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does seek(0, 0) do to the file pointer?\n(a) Moves it to the end of the file\n(b) Moves it to the beginning of the file\n(c) Keeps it at current position\n(d) Closes the file",
            "solution": "(b) Moves it to the beginning of the file.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does tell() return when called immediately after opening a 500-byte file in 'a' mode?",
            "solution": "500 (the end of the file, because append mode places the file pointer at the very end).",
            "markingScheme": "1 Mark for 500 or 'end of file position'."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Why does seek(10, 1) raise an UnsupportedOperation error in Python 3 text mode?",
            "solution": "In Python 3 text mode, seeking relative to the current position (whence=1) or end (whence=2) with non-zero offsets is disallowed due to variable-width character encodings.",
            "markingScheme": "1 Mark for explanation of text mode variable-width encoding restriction."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the result of seek(0, 2)?",
            "solution": "Moves the file pointer to the end of the file (0 bytes from whence 2).",
            "markingScheme": "1 Mark for moves pointer to end of file."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Suppose 'sample.txt' has content: 'ABCDEFGH'. Trace output:\nwith open('sample.txt', 'r') as f:\n    print(f.read(3))\n    f.seek(1, 0)\n    print(f.read(4))\n    print(f.tell())",
            "solution": "1. f.read(3) -> 'ABC'\n2. f.seek(1, 0) -> moves pointer to offset 1 ('B')\n3. f.read(4) -> 'BCDE'\n4. f.tell() -> current byte offset: 5\nOutput:\nABC\nBCDE\n5",
            "markingScheme": "0.5 Mark for ABC, 1 Mark for BCDE, 0.5 Mark for 5."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain why flush() is useful when writing data to files in Python.",
            "solution": "Python buffers file writes in memory for I/O efficiency. Calling flush() forces the buffer to immediately write all pending data to physical disk without closing the file.",
            "markingScheme": "1 Mark for memory buffering concept, 1 Mark for forcing disk write without closure."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function display_last_n_lines(filename, n) that prints the last n lines of a text file.",
            "solution": "def display_last_n_lines(filename, n):\n    with open(filename, 'r') as f:\n        lines = f.readlines()\n        last_lines = lines[-n:] if n <= len(lines) else lines\n        for line in last_lines:\n            print(line, end='')",
            "markingScheme": "1 Mark for readlines(), 1.5 Marks for negative slicing [-n:], 0.5 Mark for proper display."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function replace_word(filename, old_word, new_word) that replaces all occurrences of old_word with new_word in place.",
            "solution": "def replace_word(filename, old_word, new_word):\n    with open(filename, 'r') as f:\n        content = f.read()\n    content = content.replace(old_word, new_word)\n    with open(filename, 'w') as f:\n        f.write(content)",
            "markingScheme": "1 Mark for reading content, 1 Mark for string replacement, 1 Mark for rewriting in 'w' mode."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program that reads a text file 'exam.txt' and creates two new files:\n1. 'upper.txt' containing all lines that begin with an uppercase letter.\n2. 'other.txt' containing all remaining lines.\nAlso print the count of lines written to each file.",
            "solution": "def split_lines_by_case(source_file):\n    upper_count = 0\n    other_count = 0\n    with open(source_file, 'r') as fin, \\\n         open('upper.txt', 'w') as fupper, \\\n         open('other.txt', 'w') as fother:\n        for line in fin:\n            stripped = line.strip()\n            if stripped and stripped[0].isupper():\n                fupper.write(line)\n                upper_count += 1\n            else:\n                fother.write(line)\n                other_count += 1\n    print(f'Lines in upper.txt: {upper_count}')\n    print(f'Lines in other.txt: {other_count}')",
            "markingScheme": "2 Marks for proper simultaneous file handles, 2 Marks for isupper() logic on stripped lines, 2 Marks for counting and printing."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Line Filtering, Uppercase/Vowel Detection & Character Counters",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does readline() return when the end of the file (EOF) is reached?\n(a) '\\n'\n(b) '' (empty string)\n(c) None\n(d) EOFError",
            "solution": "(b) '' (empty string). An empty line in a file returns '\\n', but reaching EOF returns ''.",
            "markingScheme": "1 Mark for (b) '' (empty string)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which string method removes trailing newline and whitespace characters when reading lines from a text file?",
            "solution": "strip() or rstrip().",
            "markingScheme": "1 Mark for strip() or rstrip()."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "State True or False: readlines() reads the entire file into a list of strings, with each line ending in a newline character unless it is the last line without one.",
            "solution": "True.",
            "markingScheme": "1 Mark for True."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the advantage of iterating directly over a file object (e.g. for line in f:) instead of using f.readlines()?",
            "solution": "Direct iteration uses a generator/buffer that streams one line at a time into memory, which is memory-efficient for large files.",
            "markingScheme": "1 Mark for memory efficiency / lazy line-by-line reading."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\n# assume notes.txt contains: Line1\\nLine2\\nLine3\nwith open('notes.txt', 'r') as f:\n    lines = [l.strip() for l in f if '2' in l]\n    print(lines)",
            "solution": "Output: ['Line2']",
            "markingScheme": "2 Marks for ['Line2']."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to append the string 'END OF REPORT\\n' to an existing file 'report.txt'.",
            "solution": "with open('report.txt', 'a') as f:\n    f.write('END OF REPORT\\n')",
            "markingScheme": "1 Mark for 'a' mode, 1 Mark for write call with newline."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function count_case_chars(filename) that reads a file and displays the count of uppercase, lowercase, and digit characters.",
            "solution": "def count_case_chars(filename):\n    upper = lower = digits = 0\n    with open(filename, 'r') as f:\n        for ch in f.read():\n            if ch.isupper(): upper += 1\n            elif ch.islower(): lower += 1\n            elif ch.isdigit(): digits += 1\n    print(f'Upper: {upper}, Lower: {lower}, Digits: {digits}')",
            "markingScheme": "1 Mark for reading chars, 1.5 Marks for conditional checks, 0.5 Mark for printing."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function copy_non_empty(src, dest) that copies only non-blank lines from src to dest.",
            "solution": "def copy_non_empty(src, dest):\n    with open(src, 'r') as fin, open(dest, 'w') as fout:\n        for line in fin:\n            if line.strip():\n                fout.write(line)",
            "markingScheme": "1 Mark for file opens, 1 Mark for strip() check, 1 Mark for write."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a function display_words_with_len(filename, min_len) in Python that reads 'filename' and displays all words whose length is greater than or equal to min_len, separated by a comma. Also display the total count of such qualifying words.",
            "solution": "def display_words_with_len(filename, min_len):\n    qualifying = []\n    with open(filename, 'r') as f:\n        for line in f:\n            words = line.split()\n            for w in words:\n                clean_w = w.strip('.,!?:;\"()[]{}')\n                if len(clean_w) >= min_len:\n                    qualifying.append(clean_w)\n    print(', '.join(qualifying))\n    print(f'Total matching words: {len(qualifying)}')",
            "markingScheme": "2 Marks for word splitting and cleaning, 2 Marks for length check & list accumulation, 2 Marks for formatted output & total count."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Text File Searching, Line Modification & Case Studies",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which mode must be used to open a file for updating (reading and appending)?\n(a) 'a+'\n(b) 'r+'\n(c) 'w+'\n(d) 'x+'",
            "solution": "(a) 'a+'. 'a+' opens for reading and appending without truncating existing data.",
            "markingScheme": "1 Mark for (a) 'a+'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the return type of readlines()?\n(a) str\n(b) list\n(c) tuple\n(d) dict",
            "solution": "(b) list. It returns a list of strings where each string is a line from the file.",
            "markingScheme": "1 Mark for (b) list."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the parameter 2 in f.seek(0, 2) represent?",
            "solution": "It represents reference point whence = os.SEEK_END (the end of the file).",
            "markingScheme": "1 Mark for end of file reference."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: If a file opened in 'w' mode is closed and reopened in 'w' mode, previous contents are retained.",
            "solution": "False. Opening in 'w' mode immediately truncates the file to 0 bytes.",
            "markingScheme": "1 Mark for False with truncation explanation."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write Python statements to count how many times the word 'India' appears in 'country.txt'.",
            "solution": "with open('country.txt', 'r') as f:\n    count = f.read().split().count('India')\n    print('Count:', count)",
            "markingScheme": "1 Mark for file reading & splitting, 1 Mark for count() invocation."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain what happens when f.seek(5) is executed on a text file handle.",
            "solution": "The file pointer is moved to byte offset 5 from the beginning of the file (default whence is 0). Subsequent read/write begins from byte 5.",
            "markingScheme": "1 Mark for offset 5 from beginning, 1 Mark for subsequent I/O position."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function remove_comments(source_file, target_file) that copies lines from source_file to target_file, omitting any line where the first non-space character is '#'.",
            "solution": "def remove_comments(source_file, target_file):\n    with open(source_file, 'r') as fin, open(target_file, 'w') as fout:\n        for line in fin:\n            if not line.lstrip().startswith('#'):\n                fout.write(line)",
            "markingScheme": "1 Mark for file handles, 1.5 Marks for lstrip().startswith('#') check, 0.5 Mark for write."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function hash_display(filename) that reads 'filename' and displays each character separated by '#', excluding spaces.",
            "solution": "def hash_display(filename):\n    with open(filename, 'r') as f:\n        content = f.read()\n        chars = [ch for ch in content if ch != ' ' and ch != '\\n']\n        print('#'.join(chars))",
            "markingScheme": "1 Mark for file reading, 1 Mark for space/newline filtering, 1 Mark for join with '#' display."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python function count_words_ending_with(filename, letter) that:\n1. Opens and reads 'filename'.\n2. Finds and counts all words that end with the specified letter (case-insensitive).\n3. Displays the qualifying words and the count.\n4. Handles FileNotFoundError gracefully by displaying a user-friendly error message.",
            "solution": "def count_words_ending_with(filename, letter):\n    target = letter.lower()\n    try:\n        with open(filename, 'r') as f:\n            words = f.read().split()\n            matching = [w for w in words if w.strip('.,!?\"\\'').lower().endswith(target)]\n            print('Matching words:', matching)\n            print(f'Count of words ending with \\'{letter}\\': {len(matching)}')\n    except FileNotFoundError:\n        print(f'Error: File \\'{filename}\\' does not exist!')",
            "markingScheme": "1.5 Marks for try-except FileNotFoundError handling, 2 Marks for splitting & punctuation cleaning, 1.5 Marks for endswith check, 1 Mark for output."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: File Exceptions, Safe File I/O & Line Numbering",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which built-in exception is raised when trying to open a missing file in 'r' mode?",
            "solution": "FileNotFoundError (subclass of OSError).",
            "markingScheme": "1 Mark for FileNotFoundError."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does the flush() method do on a file stream?",
            "solution": "Flushes the internal I/O write buffer directly to storage without closing the file.",
            "markingScheme": "1 Mark for clearing write buffer to disk."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the result of 'abc\\ndef'.splitlines()?\n(a) ['abc\\n', 'def']\n(b) ['abc', 'def']\n(c) 'abcdef'\n(d) ('abc', 'def')",
            "solution": "(b) ['abc', 'def']. splitlines() breaks on newlines and strips the newline character by default.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether file.closed attribute is a boolean variable or a method call.",
            "solution": "file.closed is a read-only boolean attribute (e.g. f.closed returns True/False), not a method.",
            "markingScheme": "1 Mark for boolean attribute."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace the output:\nf = open('temp.txt', 'w')\nf.write('Hello World')\nf.close()\nprint(f.closed)",
            "solution": "f.closed evaluates to True because f.close() was executed.\nOutput:\nTrue",
            "markingScheme": "2 Marks for True with explanation."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write a safe file opening function that takes a filename and returns the content or None if not found.",
            "solution": "def safe_read(filename):\n    try:\n        with open(filename, 'r') as f:\n            return f.read()\n    except FileNotFoundError:\n        return None",
            "markingScheme": "1 Mark for try-except block, 1 Mark for returning content or None."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function add_line_numbers(src_file, dest_file) that copies src_file to dest_file, prefixing each line with its 1-based line number (e.g. '1: First line').",
            "solution": "def add_line_numbers(src_file, dest_file):\n    with open(src_file, 'r') as fin, open(dest_file, 'w') as fout:\n        for idx, line in enumerate(fin, start=1):\n            fout.write(f'{idx}: {line}')",
            "markingScheme": "1 Mark for file opens, 1 Mark for enumerate(fin, start=1), 1 Mark for writing formatted line."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function longest_word(filename) that returns the longest word found in a text file.",
            "solution": "def longest_word(filename):\n    with open(filename, 'r') as f:\n        words = f.read().split()\n        clean_words = [w.strip('.,!?;:\"()') for w in words]\n        return max(clean_words, key=len) if clean_words else ''",
            "markingScheme": "1 Mark for file read & split, 1 Mark for punctuation cleaning, 1 Mark for max(..., key=len)."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete program in Python with two functions:\n1. create_diary(): Prompts the user to enter entries repeatedly until they type 'STOP'. Writes each entry with a timestamp prefix to 'diary.txt'.\n2. search_diary(keyword): Reads 'diary.txt' and prints all entries containing the given keyword.",
            "solution": "import datetime\n\ndef create_diary():\n    with open('diary.txt', 'a') as f:\n        print('Enter diary notes (type STOP to end):')\n        while True:\n            entry = input('> ')\n            if entry.strip().upper() == 'STOP':\n                break\n            ts = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')\n            f.write(f'[{ts}] {entry}\\n')\n\ndef search_diary(keyword):\n    found = False\n    with open('diary.txt', 'r') as f:\n        for line in f:\n            if keyword.lower() in line.lower():\n                print(line.strip())\n                found = True\n    if not found:\n        print(f'No entries found matching \\'{keyword}\\'.')",
            "markingScheme": "2.5 Marks for create_diary() loop & timestamp writing, 2.5 Marks for search_diary() filtering, 1 Mark for clean user interface."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Character vs Word vs Line Metrics & String Transformations",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "If a text file contains 3 lines of 10 characters each, what will len(f.readlines()) return?",
            "solution": "3 (the number of lines, as readlines() returns a list where each element is one line).",
            "markingScheme": "1 Mark for 3."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which method is used to reposition the file pointer to the beginning of the file?\n(a) f.reset()\n(b) f.seek(0)\n(c) f.rewind()\n(d) f.tell(0)",
            "solution": "(b) f.seek(0).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the encoding used by default in open() on modern Python 3 installations on most systems?",
            "solution": "Platform dependent, typically UTF-8 (or system locale default like cp1252 on older Windows).",
            "markingScheme": "1 Mark for UTF-8 / locale default."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Can writelines() write a list of integers directly to a file?",
            "solution": "No. writelines() requires an iterable of string objects. Passing integers raises a TypeError.",
            "markingScheme": "1 Mark for No (raises TypeError; requires strings)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Predict the output of the following code snippet:\ntext = 'CBSE Class XII\\nComputer Science\\n'\nwith open('info.txt', 'w') as f:\n    f.write(text)\nwith open('info.txt', 'r') as f:\n    print(len(f.read().split()))",
            "solution": "f.read().split() splits by whitespace:\n['CBSE', 'Class', 'XII', 'Computer', 'Science']\nLength: 5\nOutput: 5",
            "markingScheme": "1 Mark for splitting tokens, 1 Mark for length 5."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to count blank lines in 'document.txt'.",
            "solution": "with open('document.txt', 'r') as f:\n    blank_count = sum(1 for line in f if line.strip() == '')\n    print('Blank lines:', blank_count)",
            "markingScheme": "1 Mark for line iteration and strip() == '', 1 Mark for counting."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function capitalize_words(src_file, dest_file) that reads src_file, converts each word to title case, and writes the transformed text to dest_file.",
            "solution": "def capitalize_words(src_file, dest_file):\n    with open(src_file, 'r') as fin, open(dest_file, 'w') as fout:\n        for line in fin:\n            fout.write(line.title())",
            "markingScheme": "1 Mark for opening files, 1.5 Marks for line.title() conversion, 0.5 Mark for writing."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_occurrences(filename, target) that counts total occurrences of a substring target (not just standalone words) in a file.",
            "solution": "def count_occurrences(filename, target):\n    with open(filename, 'r') as f:\n        content = f.read()\n        return content.count(target)",
            "markingScheme": "1 Mark for reading content, 1.5 Marks for content.count(target), 0.5 Mark for return."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a program in Python that analyzes a text file 'article.txt' and outputs:\n(a) Total count of alphabetic characters\n(b) Total count of digits\n(c) Total count of whitespace characters (spaces, tabs, newlines)\n(d) Total count of special punctuation symbols",
            "solution": "def analyze_characters(filename):\n    alpha = digits = spaces = specials = 0\n    with open(filename, 'r') as f:\n        content = f.read()\n        for ch in content:\n            if ch.isalpha():\n                alpha += 1\n            elif ch.isdigit():\n                digits += 1\n            elif ch.isspace():\n                spaces += 1\n            else:\n                specials += 1\n    print(f'Alphabets: {alpha}')\n    print(f'Digits: {digits}')\n    print(f'Whitespace: {spaces}')\n    print(f'Special Symbols: {specials}')",
            "markingScheme": "1.5 Marks for isalpha/isdigit, 1.5 Marks for isspace, 1.5 Marks for specials category, 1.5 Marks for clean reporting."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Advanced Text File Processing & Selective Line Extraction",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What does the 'w+' mode do if the specified file already exists?\n(a) Appends to it\n(b) Truncates it to 0 bytes and opens for read/write\n(c) Raises an error\n(d) Opens read-only",
            "solution": "(b) Truncates it to 0 bytes and opens for read/write.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which method returns a list of all lines from the current file pointer position to EOF?",
            "solution": "readlines().",
            "markingScheme": "1 Mark for readlines()."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the effect of calling file.close() multiple times on the same file object?",
            "solution": "In Python, calling close() on an already closed file does not raise an exception; it is safe and does nothing.",
            "markingScheme": "1 Mark for no exception / safe idempotent operation."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether f.seek(-5, 0) is valid in Python.",
            "solution": "No, seeking to a negative position from the beginning (whence 0) raises an OSError / ValueError (negative seek position).",
            "markingScheme": "1 Mark for invalid / raises error."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\nwith open('msg.txt', 'w') as f:\n    f.write('Good Morning India')\nwith open('msg.txt', 'r') as f:\n    f.seek(5)\n    print(f.read(7))",
            "solution": "Offset 5 starts at 'M'. Reading 7 characters yields 'Morning'.\nOutput:\nMorning",
            "markingScheme": "2 Marks for 'Morning'."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "What is the difference between f.read() and f.read(10)?",
            "solution": "f.read() reads all remaining characters until EOF, while f.read(10) reads at most 10 characters from the current position.",
            "markingScheme": "1 Mark for f.read() reads all, 1 Mark for f.read(10) reads up to 10 chars."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function extract_emails(filename) that scans a text file and prints all words containing the '@' symbol and a '.' domain.",
            "solution": "def extract_emails(filename):\n    with open(filename, 'r') as f:\n        words = f.read().split()\n        for w in words:\n            clean = w.strip('.,!?:;\"()[]<>')\n            if '@' in clean and '.' in clean.split('@')[-1]:\n                print(clean)",
            "markingScheme": "1 Mark for reading words, 1.5 Marks for email format check, 0.5 Mark for printing."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function delete_word(filename, target_word) that removes all occurrences of target_word from the file.",
            "solution": "def delete_word(filename, target_word):\n    with open(filename, 'r') as f:\n        text = f.read()\n    words = text.split()\n    filtered = [w for w in words if w != target_word]\n    with open(filename, 'w') as f:\n        f.write(' '.join(filtered))",
            "markingScheme": "1 Mark for read & split, 1 Mark for filtering out target_word, 1 Mark for rewriting."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program that processes 'students.txt' where each line has the format 'RollNo,Name,Marks'.\n1. Find and display the name and marks of the student who scored the highest marks.\n2. Calculate and display the class average marks.",
            "solution": "def analyze_student_records(filename):\n    highest_marks = -1\n    topper_name = ''\n    total_marks = 0\n    count = 0\n    \n    with open(filename, 'r') as f:\n        for line in f:\n            line = line.strip()\n            if not line: continue\n            parts = line.split(',')\n            if len(parts) == 3:\n                roll, name, marks_str = parts\n                marks = float(marks_str)\n                total_marks += marks\n                count += 1\n                if marks > highest_marks:\n                    highest_marks = marks\n                    topper_name = name\n                    \n    if count > 0:\n        print(f'Topper: {topper_name} with {highest_marks} marks')\n        print(f'Class Average: {total_marks / count:.2f}')\n    else:\n        print('No student records found.')",
            "markingScheme": "2 Marks for line parsing & comma splitting, 2 Marks for topper logic, 2 Marks for average calculation & output."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Multi-File Operations, Merging & Content Verification",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Can multiple files be opened simultaneously in a single with statement in Python?",
            "solution": "Yes, syntax: with open('f1.txt') as f1, open('f2.txt', 'w') as f2: ...",
            "markingScheme": "1 Mark for Yes with valid syntax."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the function of the tell() method in file handling?",
            "solution": "Returns the current byte offset position of the file pointer within the file.",
            "markingScheme": "1 Mark for current byte position of file pointer."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which method reads a file line by line lazily when used in an iterator loop?",
            "solution": "Iterating directly on the file object (e.g. for line in file_obj:).",
            "markingScheme": "1 Mark for file object iteration."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether open('data.txt', 'x') will overwrite the file if it already exists.",
            "solution": "No. Exclusive creation mode 'x' raises a FileExistsError if the file already exists.",
            "markingScheme": "1 Mark for No (raises FileExistsError)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to merge the contents of 'file1.txt' and 'file2.txt' into 'merged.txt'.",
            "solution": "with open('merged.txt', 'w') as fout:\n    for fname in ['file1.txt', 'file2.txt']:\n        with open(fname, 'r') as fin:\n            fout.write(fin.read())",
            "markingScheme": "1 Mark for opening merged file, 1 Mark for reading & appending both files."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain what happens when seek(0, 1) is executed.",
            "solution": "Moves the file pointer 0 bytes relative to its current position, leaving the pointer unchanged.",
            "markingScheme": "1 Mark for relative to current position, 1 Mark for pointer stays unchanged."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function compare_files(file1, file2) that returns True if two files have identical content, else False.",
            "solution": "def compare_files(file1, file2):\n    with open(file1, 'r') as f1, open(file2, 'r') as f2:\n        return f1.read() == f2.read()",
            "markingScheme": "1.5 Marks for opening both files, 1.5 Marks for comparing contents and returning boolean."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_lines_starting_with(filename, prefix) that counts how many lines begin with prefix.",
            "solution": "def count_lines_starting_with(filename, prefix):\n    count = 0\n    with open(filename, 'r') as f:\n        for line in f:\n            if line.startswith(prefix):\n                count += 1\n    return count",
            "markingScheme": "1 Mark for line reading, 1 Mark for startswith check, 1 Mark for return."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program with a function interleave_files(file1, file2, output_file) that combines two files line by line alternately into output_file. If one file has more lines, append the remaining lines at the end.",
            "solution": "def interleave_files(file1, file2, output_file):\n    with open(file1, 'r') as f1, open(file2, 'r') as f2, open(output_file, 'w') as fout:\n        lines1 = f1.readlines()\n        lines2 = f2.readlines()\n        max_len = max(len(lines1), len(lines2))\n        for i in range(max_len):\n            if i < len(lines1):\n                fout.write(lines1[i])\n                if not lines1[i].endswith('\\n'): fout.write('\\n')\n            if i < len(lines2):\n                fout.write(lines2[i])\n                if not lines2[i].endswith('\\n'): fout.write('\\n')",
            "markingScheme": "2 Marks for reading both files into lists, 2 Marks for alternating loop, 2 Marks for handling unequal lengths and newlines."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Comprehensive Text File Handling & Examination Mastery",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which of the following is NOT a valid file open mode in Python?\n(a) 'ab+'\n(b) 'rw'\n(c) 'r+'\n(d) 'w+'",
            "solution": "(b) 'rw'. Python uses 'r+' or 'w+' for read/write modes; 'rw' is invalid syntax.",
            "markingScheme": "1 Mark for (b) 'rw'."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does the readline() method return when called at EOF?",
            "solution": "An empty string ('').",
            "markingScheme": "1 Mark for empty string."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Why should file objects always be closed?",
            "solution": "To release system file descriptors, ensure all buffered writes are flushed to disk, and prevent file corruption or locking.",
            "markingScheme": "1 Mark for resource release and flushing buffers."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "What is the return type of f.tell()?",
            "solution": "Integer representing current byte offset.",
            "markingScheme": "1 Mark for integer byte offset."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\ncontent = 'Hello World'\nwith open('greet.txt', 'w') as f:\n    f.write(content)\nwith open('greet.txt', 'r') as f:\n    f.seek(6)\n    print(f.readline())",
            "solution": "Offset 6 starts at 'World'. readline() reads to end of line: 'World'.\nOutput:\nWorld",
            "markingScheme": "2 Marks for 'World'."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain the difference between r+ and w+ modes.",
            "solution": "'r+' opens for reading and writing starting at the beginning without truncating the existing file. 'w+' truncates the existing file to 0 bytes (or creates it if missing) before opening for read and write.",
            "markingScheme": "1 Mark for r+ retains existing content, 1 Mark for w+ truncates."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function word_stats(filename) that displays the shortest word and the longest word in a text file.",
            "solution": "def word_stats(filename):\n    with open(filename, 'r') as f:\n        words = [w.strip('.,!?:;\"()') for w in f.read().split()]\n        words = [w for w in words if w]\n        if words:\n            print('Shortest:', min(words, key=len))\n            print('Longest:', max(words, key=len))\n        else:\n            print('File is empty')",
            "markingScheme": "1 Mark for cleaning words, 1 Mark for min(..., key=len), 1 Mark for max(..., key=len)."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_this_these(filename) that counts occurrences of words 'this' and 'these' (case-insensitive).",
            "solution": "def count_this_these(filename):\n    count = 0\n    with open(filename, 'r') as f:\n        for word in f.read().split():\n            if word.strip('.,!?:;\"').lower() in ('this', 'these'):\n                count += 1\n    return count",
            "markingScheme": "1 Mark for reading words, 1 Mark for checking ('this', 'these') lowercase, 1 Mark for return count."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program with a function censor_words(src_file, dest_file, banned_list) that reads src_file and writes to dest_file, replacing every word present in banned_list with '****' while preserving line structure and punctuation.",
            "solution": "def censor_words(src_file, dest_file, banned_list):\n    banned_set = set(w.lower() for w in banned_list)\n    with open(src_file, 'r') as fin, open(dest_file, 'w') as fout:\n        for line in fin:\n            words = line.split()\n            censored_line = []\n            for w in words:\n                clean = w.strip('.,!?:;\"()[]{}').lower()\n                if clean in banned_set:\n                    # Replace keeping trailing punctuation\n                    trail = w[len(clean):] if w.lower().startswith(clean) else ''\n                    censored_line.append('****' + trail)\n                else:\n                    censored_line.append(w)\n            fout.write(' '.join(censored_line) + '\\n')",
            "markingScheme": "2 Marks for banned_set and line iteration, 2 Marks for checking word match, 2 Marks for writing censored line with line breaks."
          }
        ]
      }
    ]
  }
];
