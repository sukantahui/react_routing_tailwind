/**
 * Topic 12: Escape sequences in Java: \n, \t, \r, \b, \', \", \\
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an escape sequence in Java?",
    shortAnswer: "A backslash (`\\`) followed by a specific character representing a control or non-printable character.",
    explanation: "Escape sequences allow developers to represent characters that cannot be typed directly into source code strings (like newlines, tabs, quotes, or backslashes) without confusing the compiler.",
    hint: "Backslash indicates a special escape character.",
    level: "basic",
    codeExample: "System.out.println(\"Hello\\nWorld\"); // Prints on 2 lines"
  },
  {
    question: "What are the 8 traditional escape sequences supported in Java?",
    shortAnswer: "`\\b` (backspace), `\\t` (tab), `\\n` (line feed), `\\f` (form feed), `\\r` (carriage return), `\\\"` (double quote), `\\'` (single quote), and `\\\\` (backslash).",
    explanation: "These 8 escape sequences are defined in the Java Language Specification (JLS §3.10.6) and are recognized inside character and string literals.",
    hint: "b, t, n, f, r, single quote, double quote, backslash.",
    level: "basic",
    codeExample: "char singleQuote = '\\'';\nString doubleQuote = \"\\\"\";\nString path = \"C:\\\\Java\";"
  },
  {
    question: "What is the difference between `\\n` (Line Feed) and `\\r` (Carriage Return)?",
    shortAnswer: "`\\n` moves down to the next line; `\\r` moves the cursor back to the beginning (column 0) of the current line.",
    explanation: "`\\n` (LF, ASCII 10) advances the printing position down one row. `\\r` (CR, ASCII 13) repositions the active cursor to the far-left column without advancing down, allowing in-place line overwrites (useful for CLI progress bars).",
    hint: "Line Feed advances down; Carriage Return resets to left margin.",
    level: "intermediate",
    codeExample: "System.out.print(\"Loading: 50%\");\nSystem.out.print(\"\\rLoading: 100%\\n\"); // Overwrites 'Loading: 50%'"
  },
  {
    question: "Why must backslashes in Windows file paths be written as `\\\\` in Java strings?",
    shortAnswer: "Because a single backslash is interpreted by the compiler as the start of an escape sequence.",
    explanation: "If you write `\"C:\\Users\\notes.txt\"`, the compiler interprets `\\U` and `\\n` as escape sequences (`\\n` becomes a newline!), causing a compilation or runtime error. Writing `\"C:\\\\Users\\\\notes.txt\"` escapes each backslash.",
    hint: "Single backslash triggers escape mode; double backslash yields a literal backslash.",
    level: "basic",
    codeExample: "String correctPath = \"C:\\\\Program Files\\\\Java\\\\jdk-21\";\n// String badPath = \"C:\\Program Files\\Java\\jdk-21\"; // Compile error on \\P"
  },
  {
    question: "How do you include a double quote inside a Java `String` literal?",
    shortAnswer: "Escape it with a backslash: `\\\"`.",
    explanation: "Because double quotes delimit the start and end of string literals, unescaped double quotes inside a string terminate the string prematurely, causing a syntax error.",
    hint: "Use \\\" to escape double quotes inside strings.",
    level: "basic",
    codeExample: "String quote = \"Sukanta said, \\\"Practice Java daily!\\\"\";"
  },
  {
    question: "How do you include a single quote inside a `char` literal?",
    shortAnswer: "Escape it with a backslash: `'\\''`.",
    explanation: "Because single quotes enclose `char` literals, writing `'''` creates an empty character token followed by an unclosed literal. Writing `'\\''` correctly stores a single quotation character.",
    hint: "Use '\\'' for char literal single quote.",
    level: "basic",
    codeExample: "char ch = '\''; // Valid single quote char"
  },
  {
    question: "Do single quotes need to be escaped inside a `String` literal in Java?",
    shortAnswer: "No, single quotes do not require escaping inside double-quoted strings (though `\\'` is allowed).",
    explanation: "Inside a double-quoted String literal `\" \"`, single quotes `'` have no syntactic delimiter role. Both `\"It's fine\"` and `\"It\\'s fine\"` are valid, but `\"It's fine\"` is cleaner.",
    hint: "Single quotes inside double quotes are unambiguous.",
    level: "basic",
    codeExample: "String text = \"Don't worry, it's safe\"; // Clean and valid"
  },
  {
    question: "What is the ASCII value and purpose of `\\t` (Horizontal Tab)?",
    shortAnswer: "ASCII 9 (0x09); advances the output cursor to the next tab stop (typically every 4 or 8 columns).",
    explanation: "`\\t` is widely used to construct clean, aligned columns in console applications and text invoice generation.",
    hint: "Tab character aligns console text columns.",
    level: "basic",
    codeExample: "System.out.println(\"ID\\tNAME\\tFEE\");\nSystem.out.println(\"101\\tSwadeep\\t15000\");"
  },
  {
    question: "What does `\\b` (Backspace) do in console output?",
    shortAnswer: "Moves the cursor back one character position, erasing or preparing to overwrite the previous character.",
    explanation: "`\\b` (ASCII 8) shifts the active display column one space to the left in terminals that support control characters.",
    hint: "Backspace moves cursor one position to the left.",
    level: "intermediate",
    codeExample: "System.out.print(\"ABCDE\\b\\b\"); // Cursor moves back over 'D' and 'E'"
  },
  {
    question: "What is `\\f` (Form Feed) in Java?",
    shortAnswer: "ASCII 12 (0x0C); historically used to instruct printers to eject the current page and start a new one.",
    explanation: "In modern terminals, `\\f` is rarely used visually, but it remains part of standard Java whitespace and legacy document generation standards.",
    hint: "Form Feed = page break for printers.",
    level: "intermediate",
    codeExample: "char formFeed = '\\f';\nSystem.out.println(Character.isWhitespace(formFeed)); // true"
  },
  {
    question: "What happens if you use an invalid escape sequence like `\\k` or `\\q` in a Java string?",
    shortAnswer: "The Java compiler generates a compile-time syntax error: 'Invalid escape sequence (valid ones are \\b \\t \\n \\f \\r \\\" \\' \\\\)'.",
    explanation: "Unlike Python or PHP which might treat unknown escapes literally, the Java compiler strictly validates escape sequences at compile time and rejects illegal combinations.",
    hint: "Strict lexical check rejects unknown escape letters.",
    level: "basic",
    codeExample: "// String bad = \"Hello \\k World\"; // COMPILATION ERROR: Invalid escape sequence"
  },
  {
    question: "What is the platform-independent way to insert a newline in Java?",
    shortAnswer: "`System.lineSeparator()` or `%n` inside `printf()`.",
    explanation: "Hardcoding `\\n` produces Unix newlines (LF). On Windows, native files expect `\\r\\n` (CRLF). `System.lineSeparator()` returns the exact newline sequence of the current host operating system.",
    hint: "Use %n in printf or System.lineSeparator().",
    level: "intermediate",
    codeExample: "System.out.printf(\"Line 1%nLine 2%n\"); // Universal newline on Windows, Linux, macOS\nString nl = System.lineSeparator();"
  },
  {
    question: "Why should you use `%n` instead of `\\n` in `System.out.printf()` or `String.format()`?",
    shortAnswer: "`%n` automatically resolves to the host operating system's native line separator at runtime.",
    explanation: "While `\\n` always emits ASCII 10 (LF), `%n` emits `\\r\\n` on Windows and `\\n` on Linux/macOS, ensuring proper text file viewing across Notepad and Unix tools.",
    hint: "%n is format-specifier for platform newline.",
    level: "intermediate",
    codeExample: "String report = String.format(\"Student: %s%nFee: ₹%d%n\", \"Swadeep\", 15000);"
  },
  {
    question: "How do you escape characters in Java Regular Expressions (Regex)?",
    shortAnswer: "Use double backslashes (e.g. `\\\\d`, `\\\\s`, `\\\\w`, `\\\\.` ).",
    explanation: "In Java, the String literal parser consumes the first backslash, passing a single backslash and character to the regex engine. To match a literal dot `.`, you must write `\"\\\\.\"`.",
    hint: "First backslash escapes for Java String, second backslash escapes for Regex engine.",
    level: "advanced",
    codeExample: "String text = \"100\";\nboolean isDigit = text.matches(\"\\\\d+\"); // Matches one or more digits"
  },
  {
    question: "What are Octal Escape sequences in Java, and what is their syntax?",
    shortAnswer: "`\\0` to `\\377` (a backslash followed by 1 to 3 octal digits).",
    explanation: "Java allows specifying byte values in octal notation from `\\0` to `\\377` (decimal 0 to 255). For example, `\\101` is ASCII 65 ('A').",
    hint: "Backslash followed by up to 3 octal digits.",
    level: "advanced",
    codeExample: "char letterA = '\\101'; // 'A' in octal\nSystem.out.println(letterA); // 'A'"
  },
  {
    question: "What are the two new escape sequences introduced for Text Blocks in Java 15?",
    shortAnswer: "`\\s` (preserve trailing whitespace) and `\\<line-break>` (line continuation escape).",
    explanation: "In multiline Text Blocks (`\"\"\"...\"\"\"`), Java automatically strips trailing whitespace. `\\s` translates into a single space that is not stripped. `\\` at the end of a line prevents a newline from being inserted.",
    hint: "\\s preserves space; backslash at line end joins lines.",
    level: "advanced",
    codeExample: "String textBlock = \"\"\"\n    SELECT id, name \\\n    FROM students \\\n    WHERE center = 'Barrackpore'\\s\n    \"\"\";"
  },
  {
    question: "How do you escape the dollar sign `$` in `System.out.printf()` or `String.format()`?",
    shortAnswer: "The dollar sign does not need escaping in `printf()`, but `%` must be escaped as `%%`.",
    explanation: "In `printf`, `%` is the format delimiter. To print a literal percent sign, you must write `%%`. The dollar sign `$` and Indian Rupee `₹` are regular literal characters.",
    hint: "Use %% to print a literal percent sign in printf.",
    level: "basic",
    codeExample: "System.out.printf(\"Discount: %d%% on Course Fee ₹%d%n\", 10, 15000);"
  },
  {
    question: "What is the result of `\"Hello\\tWorld\".length()` in Java?",
    shortAnswer: "`11` characters (`\\t` counts as exactly 1 character).",
    explanation: "Even though a tab character may visually expand to 4 or 8 visual spaces in a console or editor, it occupies exactly one 16-bit `char` (ASCII 9) in memory.",
    hint: "An escape sequence represents a single char in the string array.",
    level: "basic",
    codeExample: "String s = \"A\\tB\"; // 'A', tab, 'B'\nSystem.out.println(s.length()); // 3"
  },
  {
    question: "What is the result of `\"A\\nB\".length()` in Java?",
    shortAnswer: "`3` characters (`'A'`, newline `\\n`, `'B'`).",
    explanation: "`\\n` is a single character (ASCII 10). The string contains 3 character code units.",
    hint: "Newline is 1 char.",
    level: "basic",
    codeExample: "String s = \"A\\nB\";\nSystem.out.println(s.length()); // 3"
  },
  {
    question: "Why does `\"\\\\\\\\\"` have a length of 2 in Java?",
    shortAnswer: "Each pair of backslashes `\\\\` escapes to a single literal backslash `\\`.",
    explanation: "Four backslashes in source code produce two literal backslash characters in memory: `\\\\` $\\to$ `\\` and `\\\\` $\\to$ `\\`.",
    hint: "4 backslashes in code = 2 backslashes in memory.",
    level: "intermediate",
    codeExample: "String s = \"\\\\\\\\\";\nSystem.out.println(s); // \\\\\nSystem.out.println(s.length()); // 2"
  },
  {
    question: "Can escape sequences be used in `char` literals?",
    shortAnswer: "Yes, any valid single-character escape sequence can be enclosed in single quotes (e.g. `'\\n'`, `'\\t'`, `'\\\\'`).",
    explanation: "Single-character escape sequences represent valid 16-bit `char` values.",
    hint: "Escape sequences work identically in char and String literals.",
    level: "basic",
    codeExample: "char newline = '\\n';\nchar tab = '\\t';\nchar backslash = '\\\\';"
  },
  {
    question: "How can you create a command-line spinner animation in Java using `\\r`?",
    shortAnswer: "Print spinner frames (`|`, `/`, `-`, `\\`) separated by `\\r` and small `Thread.sleep()` delays.",
    explanation: "`\\r` resets the terminal cursor to column 0 without moving down, overwriting the spinner frame continuously.",
    hint: "Carriage return enables in-place frame overwriting.",
    level: "intermediate",
    codeExample: "char[] frames = {'|', '/', '-', '\\\\'};\nfor (int i = 0; i < 20; i++) {\n  System.out.print(\"\\rProcessing \" + frames[i % 4]);\n  Thread.sleep(100);\n}"
  },
  {
    question: "What is the difference between an escape sequence (`\\n`) and a Unicode escape (`\\u000A`)?",
    shortAnswer: "`\\n` is processed during tokenization; `\\u000A` is processed during the raw lexical pre-pass before comments.",
    explanation: "`\\n` only functions inside string and char literals. `\\uXXXX` is a universal source code pre-processor translation that applies anywhere in source files, including identifiers, keywords, and comments.",
    hint: "\\uXXXX is pre-processed before lexical tokenization.",
    level: "expert",
    codeExample: "// Difference: \\n is a string token, \\u000A is a raw source character"
  },
  {
    question: "How do you escape double quotes in a JSON string inside Java code?",
    shortAnswer: "Use `\\\"` for every JSON quote (e.g. `\"{\\\"name\\\": \\\"Swadeep\\\"}\"`).",
    explanation: "JSON requires double quotes around keys and strings. In traditional Java strings, every JSON quote must be escaped as `\\\"`. In Java 15+, Text Blocks eliminate this tedious escaping.",
    hint: "JSON quotes must be escaped in standard Java strings.",
    level: "intermediate",
    codeExample: "String json = \"{\\\"student\\\": \\\"Swadeep\\\", \\\"fee\\\": 15000}\";"
  },
  {
    question: "How do Java 15+ Text Blocks simplify multiline strings with quotes?",
    shortAnswer: "Enclosed in triple double quotes `\"\"\"...\"\"\"`, they allow raw newlines and unescaped double quotes.",
    explanation: "Text blocks eliminate the need for `\\n`, `\\t`, and `\\\"` in SQL queries, HTML templates, and JSON payloads.",
    hint: "Text blocks use triple quotes \"\"\" to avoid escape fatigue.",
    level: "advanced",
    codeExample: "String json = \"\"\"\n    {\n      \"student\": \"Swadeep\",\n      \"fee\": 15000\n    }\n    \"\"\";"
  },
  {
    question: "What is the escape sequence for a null character in Java?",
    shortAnswer: "`\\0` or `\\u0000`.",
    explanation: "The null character has ASCII value 0 and is the default value of uninitialized primitive `char` fields.",
    hint: "\\0 is octal null; \\u0000 is Unicode null.",
    level: "basic",
    codeExample: "char nullChar = '\\0';\nSystem.out.println((int) nullChar); // 0"
  },
  {
    question: "Can an escape sequence appear inside a Java multi-line comment `/* ... */`?",
    shortAnswer: "Standard escapes like `\\n` are ignored as literal comment text, but Unicode escapes `\\uXXXX` are still parsed.",
    explanation: "The comment stripper ignores `\\n` and `\\t`, treating them as raw comment text. However, `\\uXXXX` is processed prior to comment stripping.",
    hint: "Standard escapes are ignored in comments; Unicode escapes are not.",
    level: "advanced",
    codeExample: "/* This \\n does not create a newline in comments */"
  },
  {
    question: "What is the escape sequence to include a forward slash `/` in Java?",
    shortAnswer: "A forward slash does not require escaping (`\"/\"` or `'/'`), except when ending a comment `*/`.",
    explanation: "Forward slash `/` is not an escape character in Java strings. It can be written directly without backslashes (e.g. `\"/usr/local/bin\"` or `\"http://\"`).",
    hint: "Forward slash is not an escape trigger in Java.",
    level: "basic",
    codeExample: "String url = \"https://www.codernaccotax.co.in/courses\";"
  },
  {
    question: "Why does `System.out.print(\"Hello\\rWorld\");` output `World` on standard terminals?",
    shortAnswer: "Because `\\r` moves the cursor to column 0, and `World` overwrites `Hello`.",
    explanation: "`Hello` (5 letters) is printed first. `\\r` returns cursor to start. `World` (5 letters) is then written directly on top of `Hello`.",
    hint: "Carriage return overwrites from the start of the line.",
    level: "intermediate",
    codeExample: "System.out.print(\"Hello\\rWorld\"); // Terminal displays: World"
  },
  {
    question: "What is the ultimate takeaway of Topic 12 for Java software engineers?",
    shortAnswer: "Mastering escape sequences is essential for formatting clean console tables, handling file paths cross-platform, building CLI tools, and preparing JSON/SQL data.",
    explanation: "Properly managing `\\n`, `\\t`, `\\r`, `\\\\`, and `System.lineSeparator()` ensures that applications format invoices cleanly, run robustly across Windows and Linux, and present data professionally.",
    hint: "Escape sequences control text presentation and cross-platform formatting.",
    level: "basic",
    codeExample: "// Summary: \\n (LF), \\t (Tab), \\r (CR), \\\" (Quote), \\\\ (Backslash), %n (OS Line)"
  }
];

export default questions;
