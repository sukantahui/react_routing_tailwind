// src/components/study/python/topics/002_007_string-processing/topic0_files/topic0_questions.js
// 30 Comprehensive Master Review Questions for Topic 0: String Creation, Multiline Strings & Escape Sequences

const questions = [
  {
    question: "Is there any functional or performance difference between single quotes ('...') and double quotes (\"...\") in Python?",
    shortAnswer: "No, single quotes and double quotes are 100% identical in Python.",
    explanation: "Python treats single and double quoted strings identically in memory and bytecode. Having both options allows you to embed single quotes inside double quotes (or vice versa) without escaping.",
    hint: "Both quote types are completely interchangeable.",
    level: "basic",
    codeExample: "s1 = 'Hello'\ns2 = \"Hello\"\nprint(s1 == s2)      # True\nprint(type(s1))      # <class 'str'>"
  },
  {
    question: "How do you embed a single quote inside a single-quoted string without causing a SyntaxError?",
    shortAnswer: "Escape the single quote with a backslash: 'It\\'s a sunny day in Kolkata'.",
    explanation: "The backslash (\\) tells the Python parser that the subsequent character is a literal quote, not the closing delimiter.",
    hint: "Use \\' to escape single quotes.",
    level: "basic",
    codeExample: "msg = 'Susmita\\'s Python notes'\nprint(msg)  # Susmita's Python notes"
  },
  {
    question: "What is a Raw String in Python and how is it defined?",
    shortAnswer: "A raw string is prefixed with 'r' or 'R' (e.g. r\"C:\\new_folder\\test.txt\"); it disables escape sequence interpretation.",
    explanation: "In a raw string, backslashes are treated as literal characters rather than escape codes like \\n (newline) or \\t (tab).",
    hint: "Prefix string with 'r' or 'R'.",
    level: "basic",
    codeExample: "print(r\"C:\\new_project\\test.txt\")  # Prints literal '\\new_project' without interpreting \\n"
  },
  {
    question: "What happens if you print the non-raw string \"C:\\new_folder\\test.txt\"?",
    shortAnswer: "It interprets \\n as a newline and \\t as a tab, breaking the file path across multiple lines.",
    explanation: "Because \\n is parsed as newline and \\t as tab, the output prints 'C:', creates a newline, prints 'ew_folder', creates a tab, and prints 'est.txt'.",
    hint: "\\n and \\t trigger newline and tab escapes.",
    level: "basic",
    codeExample: "print(\"C:\\new\\test.txt\")\n# Output:\n# C:\n# ew    est.txt"
  },
  {
    question: "Can a raw string end with an odd number of backslashes: r\"C:\\path\\\"?",
    shortAnswer: "No, a raw string cannot end with an unescaped single backslash; it raises SyntaxError: unterminated string literal.",
    explanation: "Even in raw strings, \\\" escapes the closing quote character, preventing the parser from finding the end of the string.",
    hint: "A backslash right before the closing quote escapes the quote.",
    level: "expert",
    codeExample: "# r\"C:\\folder\\\"  # SyntaxError!\n# Workaround:\npath = r\"C:\\folder\" + \"\\\\\"\nprint(path)  # C:\\folder\\"
  },
  {
    question: "What are triple-quoted strings (''' or \"\"\") used for in Python?",
    shortAnswer: "For multiline strings that preserve exact formatting and for module, class, and function Docstrings.",
    explanation: "Triple quotes allow text to span multiple lines without explicit \\n escapes and preserve indentation.",
    hint: "Used for multiline text and Docstrings.",
    level: "basic",
    codeExample: "doc = \"\"\"This is a\nmultiline string in\nBarrackpore.\"\"\"\nprint(doc)"
  },
  {
    question: "What is the escape sequence for the Indian Rupee symbol (₹) in Unicode?",
    shortAnswer: "\\u20B9.",
    explanation: "The Indian Rupee symbol is encoded at Unicode code point U+20B9.",
    hint: "Unicode escape \\u20B9.",
    level: "moderate",
    codeExample: "price = \"\\u20B9 4,500\"\nprint(price)  # ₹ 4,500"
  },
  {
    question: "What does the escape sequence \\r (Carriage Return) do?",
    shortAnswer: "It moves the output cursor back to the beginning of the current line, overwriting previous characters.",
    explanation: "In CLI progress bars, \\r allows updating the percentage counter in-place on the same terminal line.",
    hint: "Moves cursor to the start of the line.",
    level: "moderate",
    codeExample: "print(\"Downloading 20%...\\rDownloading 100% Done!\")"
  },
  {
    question: "What is the escape sequence for a literal backslash?",
    shortAnswer: "\\\\ (double backslash).",
    explanation: "The first backslash escapes the second, producing a single literal \\ character.",
    hint: "Use double backslash \\\\.",
    level: "basic",
    codeExample: "print(\"C:\\\\Users\\\\Susmita\")  # C:\\Users\\Susmita"
  },
  {
    question: "What does the escape sequence \\b do?",
    shortAnswer: "It represents a Backspace, moving the cursor back one character position.",
    explanation: "\\b shifts the cursor left, which can overwrite or delete the preceding character on terminal output.",
    hint: "Backspace escape.",
    level: "moderate",
    codeExample: "print(\"Hello\\b World\")  # Output: Hell World (on supporting terminals)"
  },
  {
    question: "How do two adjacent string literals separated only by whitespace behave in Python: 'Hello ' 'World'?",
    shortAnswer: "Python automatically concatenates them into a single string: 'Hello World' at compile time.",
    explanation: "Implicit string literal concatenation occurs during parsing with zero runtime overhead.",
    hint: "Adjacent string literals are automatically concatenated.",
    level: "moderate",
    codeExample: "s = \"Susmita \" \"Roy \" \"Barrackpore\"\nprint(s)  # 'Susmita Roy Barrackpore'"
  },
  {
    question: "How does backslash line continuation work in Python string definitions?",
    shortAnswer: "Placing a backslash at the end of a line continues the string on the next line without inserting a newline character.",
    explanation: "It breaks long physical code lines into a single logical line for PEP 8 compliance.",
    hint: "Backslash continues the line without adding \\n.",
    level: "basic",
    codeExample: "msg = \"This is a long sentence that \" \\\n      \"spans across two physical lines.\"\nprint(msg)"
  },
  {
    question: "What is the difference between a multiline comment and a multiline string in Python?",
    shortAnswer: "Python has no multiline comment token; unassigned triple-quoted strings serve as standalone docstrings or discarded expressions.",
    explanation: "Python only has # for comments. Standalone triple-quoted strings evaluate as string expressions and are discarded by the bytecode compiler if unassigned.",
    hint: "Unassigned triple-quoted strings act like multiline comments.",
    level: "moderate",
    codeExample: "\"\"\"\nThis multiline block is ignored by Python\nif not assigned to any variable.\n\"\"\""
  },
  {
    question: "What is the output of len(\"\\n\\t\\\\\")?",
    shortAnswer: "3.",
    explanation: "\\n is 1 character (newline), \\t is 1 character (tab), and \\\\ is 1 character (backslash). Total length is 3.",
    hint: "Each escape sequence represents a single character.",
    level: "basic",
    codeExample: "print(len(\"\\n\\t\\\\\"))  # 3"
  },
  {
    question: "What is the output of len(r\"\\n\\t\\\\\")?",
    shortAnswer: "6.",
    explanation: "In a raw string, escape sequences are not processed: '\\' + 'n' + '\\' + 't' + '\\' + '\\' equals 6 distinct characters.",
    hint: "Raw strings count literal backslashes and letters.",
    level: "moderate",
    codeExample: "print(len(r\"\\n\\t\\\\\"))  # 6"
  },
  {
    question: "How do you create an empty string in Python?",
    shortAnswer: "'' or \"\" or str().",
    explanation: "All three instantiate an immutable empty string of length 0.",
    hint: "Use empty quotes or str().",
    level: "basic",
    codeExample: "s = \"\"\nprint(len(s))       # 0\nprint(bool(s))      # False (Empty string is falsy)"
  },
  {
    question: "What happens if you multiply a string by 0 or a negative integer: \"Python\" * -2?",
    shortAnswer: "It returns an empty string \"\".",
    explanation: "String repetition with a non-positive integer produces an empty string.",
    hint: "Multiplying by <= 0 yields empty string.",
    level: "basic",
    codeExample: "print(\"Python\" * -2)  # ''"
  },
  {
    question: "What is the escape sequence for an 8-bit hex character in Python?",
    shortAnswer: "\\xHH where HH are two hexadecimal digits (e.g. \\x41 for 'A').",
    explanation: "Hex escapes allow specifying ASCII and Latin-1 byte codes directly.",
    hint: "\\x followed by two hex digits.",
    level: "moderate",
    codeExample: "print(\"\\x41\\x42\\x43\")  # 'ABC'"
  },
  {
    question: "What is the escape sequence for a 32-bit Unicode character in Python?",
    shortAnswer: "\\U000XXXXX with 8 hexadecimal digits.",
    explanation: "Extended Unicode characters beyond U+FFFF (such as emojis) require the uppercase \\U escape with 8 hex digits.",
    hint: "\\U with 8 hex digits.",
    level: "expert",
    codeExample: "print(\"\\U0001F600\")  # 😀 (Grinning Face Emoji)"
  },
  {
    question: "What does the escape sequence \\a (Alert / Bell) do?",
    shortAnswer: "It triggers an ASCII alert / bell sound on supporting terminal emulators.",
    explanation: "\\a sends the ASCII 0x07 control character to ring the terminal bell.",
    hint: "Terminal alert sound.",
    level: "expert",
    codeExample: "print(\"\\a\")  # Rings terminal bell"
  },
  {
    question: "Can single quotes enclose multiple lines without triple quotes if backslashes are used?",
    shortAnswer: "Yes, using backslash line continuation: 'Line 1 \\n' \\ 'Line 2'.",
    explanation: "Explicit \\n and \\ line continuations allow single-line quotes to construct multiline output.",
    hint: "Backslash continuation enables multi-line single-quoted strings.",
    level: "basic",
    codeExample: "s = 'First Line\\n' \\\n    'Second Line'\nprint(s)"
  },
  {
    question: "What is the output of str(None) vs str(True)?",
    shortAnswer: "\"None\" and \"True\".",
    explanation: "The str() constructor converts objects to their human-readable string representation.",
    hint: "Converts None to 'None' and True to 'True'.",
    level: "basic",
    codeExample: "print(str(None))  # 'None'\nprint(str(True))  # 'True'"
  },
  {
    question: "How do you check if a variable contains a string instance in Python?",
    shortAnswer: "isinstance(my_var, str).",
    explanation: "isinstance() checks if the object is an instance of the str built-in class.",
    hint: "Use isinstance(val, str).",
    level: "basic",
    codeExample: "print(isinstance(\"Barrackpore\", str))  # True\nprint(isinstance(4500, str))           # False"
  },
  {
    question: "What happens if you combine raw strings and format strings: rf\"{value}\\n\"?",
    shortAnswer: "It evaluates {value} as an f-string expression while treating backslashes like \\n as literal text.",
    explanation: "Combining prefixes 'r' and 'f' allows interpolation while suppressing escape sequence parsing.",
    hint: "rf allows variable interpolation with literal backslashes.",
    level: "expert",
    codeExample: "user = \"Susmita\"\npath = rf\"C:\\Users\\{user}\\new_report.txt\"\nprint(path)  # C:\\Users\\Susmita\\new_report.txt"
  },
  {
    question: "Why are docstrings defined with triple quotes rather than single line comments (#)?",
    shortAnswer: "Docstrings are preserved at runtime in the object's __doc__ attribute, allowing help() and automated docs generators to read them.",
    explanation: "# comments are completely stripped during tokenization and unavailable at runtime.",
    hint: "Docstrings attach to __doc__; comments are discarded.",
    level: "moderate",
    codeExample: "def calculate_fee():\n    \"\"\"Calculates tuition fee in INR.\"\"\"\n    pass\nprint(calculate_fee.__doc__)  # 'Calculates tuition fee in INR.'"
  },
  {
    question: "What is the output of: print(\"\\\\\\\"\")?",
    shortAnswer: "\\\".",
    explanation: "\\\\ escapes a backslash (\\) and \\\" escapes a double quote (\"), producing \\\".",
    hint: "Two backslashes produce one backslash; escaped quote produces one quote.",
    level: "expert",
    codeExample: "print(\"\\\\\\\"\")  # \\\""
  },
  {
    question: "Can triple quotes contain single and double quotes without escaping?",
    shortAnswer: "Yes, triple quotes can contain both 'single' and \"double\" quotes freely.",
    explanation: "Because the closing delimiter is three consecutive quotes, single and double quotes inside are treated as regular text.",
    hint: "Triple quotes safely enclose both single and double quotes.",
    level: "basic",
    codeExample: "s = \"\"\"She said, 'Python is awesome!' in \"Kolkata\"\"\"\"\nprint(s)"
  },
  {
    question: "What is the type of string literals in Python 3 by default: ASCII, Latin-1, or Unicode (UTF-8)?",
    shortAnswer: "Python 3 strings are Unicode by default (UTF-8 in source files).",
    explanation: "Unlike Python 2 where str was byte arrays and unicode was separate, all Python 3 str objects are native Unicode sequences.",
    hint: "Python 3 strings are always Unicode.",
    level: "basic",
    codeExample: "print(type(\"নমস্কার\"))  # <class 'str'>"
  },
  {
    question: "How do you format multiline GST receipts with aligned currency columns in Python?",
    shortAnswer: "Use triple-quoted f-strings with column width format specifiers (e.g. f\"{fee:>7,d}\").",
    explanation: "Allows crafting clean tabular receipts with Indian Rupee (₹) symbols and right-aligned numeric amounts.",
    hint: "Combine triple quotes with f-string width specifiers.",
    level: "basic",
    codeExample: "fee = 4500\nprint(f\"\"\"Tuition Fee: ₹{fee:>7,d}\"\"\")"
  },
  {
    question: "What is the key takeaway for a software developer regarding string creation and escape sequences?",
    shortAnswer: "Use raw strings (r'') for Windows paths and regex; triple quotes for multiline templates and docstrings; and escape sequences (\\n, \\t, \\u20B9) for precise output formatting.",
    explanation: "Mastering string literals and escapes ensures your text output, paths, and documentation remain clean, readable, and bug-free.",
    hint: "Raw strings for paths; Triple quotes for multiline; Escapes for formatting.",
    level: "basic",
    codeExample: "# Summary Checklist:\n# 1. Path:     r'C:\\Users\\Notes.txt'\n# 2. Template: \"\"\"Multiline text\"\"\"\n# 3. Unicode:  '₹ 4,500' or '\\u20B9 4,500'"
  }
];

export default questions;
