// 25 Authentic CBSE Board Examination Questions for Topic 11
const questions = [
  {
    "id": 1,
    "question": "Which command converts this revision document into plain text?",
    "options": [
      "Download Plain Text Note",
      "Export to Word",
      "Print Screen",
      "Format Document"
    ],
    "correctAnswer": 0,
    "explanation": "Use the built-in Download Plain Text button below to save the offline reference document.",
    "hint": "Download Plain Text."
  },
  {
    "id": 2,
    "question": "Why is having an offline Python lab file advantageous for board preparation?",
    "options": [
      "Allows running code without internet, testing dry-runs in IDLE, and verifying CBSE sample queries",
      "It is mandatory by CBSE law",
      "Saves battery life",
      "Replaces the textbook"
    ],
    "correctAnswer": 0,
    "explanation": "Offline scripts allow immediate execution and experimentation in standard Python 3.10+ IDLE.",
    "hint": "Local experimentation."
  },
  {
    "id": 3,
    "question": "What is the official subject code for CBSE Class 12 Computer Science?",
    "options": [
      "083",
      "165",
      "402",
      "802"
    ],
    "correctAnswer": 0,
    "explanation": "083 is the statutory subject code for CBSE Computer Science.",
    "hint": "Three digit code 083."
  },
  {
    "id": 4,
    "question": "What is the total theory marks allotted for Unit I (Computational Thinking and Programming - 2)?",
    "options": [
      "40 Marks",
      "30 Marks",
      "20 Marks",
      "10 Marks"
    ],
    "correctAnswer": 0,
    "explanation": "Unit I carries 40 marks out of the 70 theory marks.",
    "hint": "Highest weightage unit."
  },
  {
    "id": 5,
    "question": "Which file format preserves exact whitespace and code formatting for offline reading?",
    "options": [
      ".txt / UTF-8 Plain Text",
      ".docx",
      ".pdf",
      "All of the above"
    ],
    "correctAnswer": 0,
    "explanation": "Plain text (.txt) files in UTF-8 ensure no hidden formatting codes interfere with code snippets.",
    "hint": "Standard text format."
  },
  {
    "id": 6,
    "question": "What is the extension of Python source code files?",
    "options": [
      ".py",
      ".python",
      ".pyc",
      ".pt"
    ],
    "correctAnswer": 0,
    "explanation": "Python source files end with the `.py` file extension.",
    "hint": "Standard 2-letter extension."
  },
  {
    "id": 7,
    "question": "Which tool provided in this module lets you copy scripts to the clipboard in one click?",
    "options": [
      "Copy Code Button in PythonFileLoader",
      "Select All & Copy",
      "Right-click inspect",
      "Terminal export"
    ],
    "correctAnswer": 0,
    "explanation": "The code loader interface features a dedicated Copy button with instant clipboard feedback.",
    "hint": "Built-in code loader button."
  },
  {
    "id": 8,
    "question": "Which standard library module is used to check if a string is a Python keyword?",
    "options": [
      "keyword",
      "sys",
      "builtins",
      "tokens"
    ],
    "correctAnswer": 0,
    "explanation": "`import keyword; keyword.iskeyword(name)` checks for reserved keywords.",
    "hint": "keyword module."
  },
  {
    "id": 9,
    "question": "What does `help('keywords')` in Python IDLE do?",
    "options": [
      "Displays the list of all reserved keywords in that Python version",
      "Deletes keywords",
      "Downloads new syntax",
      "Opens a browser"
    ],
    "correctAnswer": 0,
    "explanation": "`help('keywords')` queries the built-in documentation and lists all active keywords.",
    "hint": "Interactive help utility."
  },
  {
    "id": 10,
    "question": "Which function displays all currently defined names in the local scope?",
    "options": [
      "locals() or dir()",
      "names()",
      "show()",
      "list()"
    ],
    "correctAnswer": 0,
    "explanation": "`dir()` and `locals()` return the list of names in the current namespace.",
    "hint": "Namespace inspection functions."
  },
  {
    "id": 11,
    "question": "What is the purpose of the `__name__ == '__main__'` guard in the master lab script?",
    "options": [
      "Ensures code only runs when the script is executed directly, not when imported as a module",
      "Speeds up execution",
      "Encrypts the file",
      "Mandatory for all functions"
    ],
    "correctAnswer": 0,
    "explanation": "The `__name__ == '__main__'` idiom prevents top-level statements from running when the file is imported.",
    "hint": "Module execution guard."
  },
  {
    "id": 12,
    "question": "Where should you write and test Python code for CBSE practical exams?",
    "options": [
      "Standard Python IDLE or VS Code",
      "MS Word",
      "Notepad with rich text",
      "Command prompt echo"
    ],
    "correctAnswer": 0,
    "explanation": "Python IDLE is the official environment provided in CBSE board practical examination centers.",
    "hint": "Official board exam IDE."
  },
  {
    "id": 13,
    "question": "What keyboard shortcut runs a script inside Python IDLE?",
    "options": [
      "F5",
      "Ctrl + R",
      "F1",
      "Ctrl + Enter"
    ],
    "correctAnswer": 0,
    "explanation": "Pressing F5 in the IDLE script editor window executes the current file in the shell.",
    "hint": "Function key 5."
  },
  {
    "id": 14,
    "question": "Which standard Python function returns documentation for any object?",
    "options": [
      "help()",
      "doc()",
      "info()",
      "manual()"
    ],
    "correctAnswer": 0,
    "explanation": "`help(obj)` invokes the built-in help system.",
    "hint": "Built-in help command."
  },
  {
    "id": 15,
    "question": "How can you view the byte size of an integer or list?",
    "options": [
      "sys.getsizeof()",
      "len()",
      "bytes()",
      "memory()"
    ],
    "correctAnswer": 0,
    "explanation": "`sys.getsizeof(obj)` returns the memory allocated to the object in bytes.",
    "hint": "sys module size inspection."
  },
  {
    "id": 16,
    "question": "What character encoding does Python 3 use for source code by default?",
    "options": [
      "UTF-8",
      "ASCII",
      "Latin-1",
      "UTF-16"
    ],
    "correctAnswer": 0,
    "explanation": "Python 3 source code is UTF-8 encoded by default, supporting international character sets.",
    "hint": "Standard Unicode UTF-8."
  },
  {
    "id": 17,
    "question": "What is the return value of `print()` in Python?",
    "options": [
      "None",
      "The printed string",
      "True",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "`print()` displays values to stdout and always returns `None`.",
    "hint": "Function returns None."
  },
  {
    "id": 18,
    "question": "What command in terminal checks your installed Python version?",
    "options": [
      "python --version",
      "python -v",
      "check python",
      "py -show"
    ],
    "correctAnswer": 0,
    "explanation": "`python --version` or `py --version` displays the current Python interpreter version.",
    "hint": "Version flag."
  },
  {
    "id": 19,
    "question": "Why is saving files with descriptive names like `001_001_lab.py` recommended?",
    "options": [
      "Organizes code logically and makes lab report compilation seamless",
      "Required by Python compiler",
      "Reduces file size",
      "Prevents syntax errors"
    ],
    "correctAnswer": 0,
    "explanation": "Systematic naming ensures quick retrieval and easy integration into the mandatory CBSE practical file.",
    "hint": "Systematic laboratory management."
  },
  {
    "id": 20,
    "question": "What is the recommended indentation width per PEP 8 style guide?",
    "options": [
      "4 spaces",
      "2 spaces",
      "8 spaces",
      "1 tab"
    ],
    "correctAnswer": 0,
    "explanation": "PEP 8 prescribes 4 spaces per indentation level.",
    "hint": "PEP 8 standard spacing."
  },
  {
    "id": 21,
    "question": "How do you install additional libraries if needed in Python?",
    "options": [
      "pip install <package>",
      "npm install",
      "apt get",
      "python add"
    ],
    "correctAnswer": 0,
    "explanation": "`pip` is the standard package manager for Python.",
    "hint": "Python package manager."
  },
  {
    "id": 22,
    "question": "Which command in Python IDLE restarts the shell?",
    "options": [
      "Shell -> Restart Shell (Ctrl + F6)",
      "File -> Reset",
      "Edit -> Clean",
      "Window -> Refresh"
    ],
    "correctAnswer": 0,
    "explanation": "Ctrl + F6 in IDLE restarts the shell, clearing memory and variable namespaces.",
    "hint": "Restart shell shortcut."
  },
  {
    "id": 23,
    "question": "What does `#` represent at the start of a line in Python?",
    "options": [
      "A single-line comment ignored by the interpreter",
      "A preprocessor directive",
      "A private variable",
      "A header tag"
    ],
    "correctAnswer": 0,
    "explanation": "The `#` symbol marks single-line comments.",
    "hint": "Comment symbol."
  },
  {
    "id": 24,
    "question": "Which document in this module summarizes the entire Module 1 syllabus?",
    "options": [
      "topic11_note.txt",
      "README.md",
      "course.json",
      "index.html"
    ],
    "correctAnswer": 0,
    "explanation": "`topic11_note.txt` is the master consolidation note for Module 1.",
    "hint": "Master revision note."
  },
  {
    "id": 25,
    "question": "What is the next step after reviewing downloadable documents?",
    "options": [
      "Proceed to Topic 12 to test your knowledge with the interactive diagnostic exam",
      "Close the browser",
      "Skip to Unit II",
      "Delete the files"
    ],
    "correctAnswer": 0,
    "explanation": "Topic 12 provides the comprehensive 25-question diagnostic board examination simulation to validate your mastery.",
    "hint": "Interactive test assessment."
  }
];

export default questions;
