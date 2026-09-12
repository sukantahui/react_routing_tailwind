const topic9_questions = [
  {
    "question": "In which Java version did Text Blocks become a finalized standard feature?",
    "shortAnswer": "Java 15 (September 2020) via JEP 378 (after previewing in Java 13 and 14).",
    "explanation": "Text Blocks allow multi-line string literals without requiring clumsy escape sequences (\\n) or '+' concatenation across lines.",
    "hint": "Finalized in Java 15.",
    "level": "basic"
  },
  {
    "question": "What delimiter syntax opens and closes a Java Text Block?",
    "shortAnswer": "Three double quotes: \"\"\".",
    "explanation": "A text block begins with three double quotes (\"\"\") followed by a mandatory line terminator, and ends with three double quotes (\"\"\").",
    "hint": "Triple quotes: \"\"\".",
    "level": "basic"
  },
  {
    "question": "What is the critical syntax rule for the opening delimiter of a Text Block?",
    "shortAnswer": "The opening \"\"\" must be followed by a line terminator (newline). You cannot put content on the same line after the opening \"\"\".",
    "explanation": "Writing 'String s = \"\"\"Hello\"\"\";' is a compilation error! Content can only begin on the line following the opening \"\"\".",
    "hint": "Opening triple quote MUST be immediately followed by a newline.",
    "level": "basic",
    "codeExample": "// COMPILATION ERROR:\n// String s = \"\"\"Hello\"\"\";\n\n// CORRECT:\nString s = \"\"\"\n    Hello\"\"\";"
  },
  {
    "question": "Do Text Blocks produce a new data type in the JVM?",
    "shortAnswer": "No! A Text Block is compiled into a standard java.lang.String object in the JVM bytecodes.",
    "explanation": "At runtime, a Text Block is completely indistinguishable from any other String literal. It participates in the String Constant Pool just like normal strings.",
    "hint": "It compiles to standard java.lang.String; no new runtime type exists.",
    "level": "basic"
  },
  {
    "question": "Do you need to escape double quotes (\") inside a Text Block?",
    "shortAnswer": "No! Single double quotes (\") and double quotes (\"\") do not need to be escaped inside a text block.",
    "explanation": "Only triple quotes (\"\"\") need escaping (\\\"\\\"\\\") to prevent prematurely closing the text block.",
    "hint": "Quotes do not need backslash escaping unless they are triple quotes.",
    "level": "basic",
    "codeExample": "String json = \"\"\"\n    {\"name\": \"Alice\", \"age\": 25}\n    \"\"\";"
  },
  {
    "question": "How do Text Blocks handle newlines across different operating systems?",
    "shortAnswer": "All line terminators (\\r\\n on Windows, \\r on classic Mac) are normalized to standard \\n at compile time.",
    "explanation": "This guarantees that a text block has identical character content regardless of the OS on which the source code file was saved or checked out from Git.",
    "hint": "All line endings in text blocks are normalized to \\n.",
    "level": "moderate"
  },
  {
    "question": "What is the difference between 'incidental whitespace' and 'essential whitespace' in Text Blocks?",
    "shortAnswer": "Incidental whitespace is the common indentation used to align the block with the Java source code; essential whitespace is the relative indentation that belongs to the actual text content.",
    "explanation": "The compiler automatically strips incidental whitespace so your text isn't padded with unwanted leading spaces.",
    "hint": "Incidental whitespace aligns code; essential whitespace is part of the text.",
    "level": "moderate"
  },
  {
    "question": "How does the placement of the closing delimiter \"\"\" control left-margin indentation?",
    "shortAnswer": "The closing \"\"\" acts as an anchor line: if it is placed to the left of the content lines, it sets the baseline, preserving extra indentation in the content.",
    "explanation": "If closing \"\"\" is indented 4 spaces and content is indented 8 spaces, every content line retains 4 leading spaces in the resulting String.",
    "hint": "Closing delimiter position sets the common left indentation margin.",
    "level": "advanced",
    "codeExample": "String s = \"\"\"\n        Indented text\n    \"\"\"; // 4 spaces preserved!"
  },
  {
    "question": "What does the escape sequence '\\' (trailing backslash) do at the end of a line in a Text Block?",
    "shortAnswer": "It suppresses the newline, joining the current line with the following line in the output String.",
    "explanation": "Added in Java 14 via JEP 368 to allow very long single-line strings to be split across multiple source lines for readability.",
    "hint": "Trailing backslash suppresses the line break.",
    "level": "moderate",
    "codeExample": "String singleLine = \"\"\"\n    This is a very long sentence that spans \\\n    across multiple source lines but stays one line.\"\"\";"
  },
  {
    "question": "What does the '\\s' escape sequence do in a Text Block?",
    "shortAnswer": "It represents an explicit space character that is immune to trailing whitespace stripping.",
    "explanation": "By default, the compiler strips trailing whitespace from every line in a text block. Ending a line with '\\s' preserves all trailing spaces up to that point.",
    "hint": "\\s preserves trailing spaces from being stripped.",
    "level": "advanced",
    "codeExample": "String fixedWidth = \"\"\"\n    red   \\s\n    blue  \\s\n    \"\"\";"
  },
  {
    "question": "Can you use the '+' operator to concatenate Text Blocks with regular Strings?",
    "shortAnswer": "Yes. Since Text Blocks compile to java.lang.String, all standard String operations and operators work normally.",
    "explanation": "However, for variable interpolation, prefer calling .formatted() instead of messy '+' concatenation.",
    "hint": "It's a String, so '+' works, but .formatted() is cleaner.",
    "level": "basic"
  },
  {
    "question": "How do you interpolate dynamic variables into a Text Block cleanly?",
    "shortAnswer": "Use the '.formatted(Object... args)' instance method.",
    "explanation": "Introduced alongside Text Blocks in Java 15 to allow clean chaining without wrapping the entire block in String.format(...).",
    "hint": "Call .formatted() directly on the text block.",
    "level": "basic",
    "codeExample": "String html = \"\"\"\n    <title>%s</title>\n    \"\"\".formatted(\"Dashboard\");"
  },
  {
    "question": "Are Text Blocks interned into the String Constant Pool (SCP)?",
    "shortAnswer": "Yes, just like standard double-quoted string literals.",
    "explanation": "Two identical text blocks with the same normalized text point to the exact same String instance in the SCP (s1 == s2 evaluates to true).",
    "hint": "Participates in the SCP like standard string literals.",
    "level": "moderate"
  },
  {
    "question": "What happens if all content in a text block is empty: 'String s = \"\"\"\\n\"\"\";'?",
    "shortAnswer": "It produces an empty String \"\".",
    "explanation": "The initial newline is consumed as part of the opening delimiter, and the closing delimiter completes the empty sequence.",
    "hint": "Yields an empty string \"\".",
    "level": "basic"
  },
  {
    "question": "Can a Text Block contain only a single line of output text?",
    "shortAnswer": "Yes, if the closing delimiter is on the same line as the text, or if trailing backslash '\\' suppresses the newline.",
    "explanation": "For example: \"\"\"\\n    Hello\"\"\" produces \"Hello\" without any trailing newline.",
    "hint": "Closing delimiter placed directly after the text avoids a trailing newline.",
    "level": "basic",
    "codeExample": "String s = \"\"\"\n    Single Line\"\"\";\nSystem.out.println(s.contains(\"\\n\")); // false"
  },
  {
    "question": "Why did Java introduce Text Blocks instead of raw string literals (like in Python or C#)?",
    "shortAnswer": "To preserve Java's strict escape processing while solving the practical problem of multi-line readability and incidental indentation stripping.",
    "explanation": "Pure raw strings in other languages prevent escape sequences entirely. Java Text Blocks allow both escapes (\\n, \\t, \\s) and multi-line formatting.",
    "hint": "Balances multi-line readability with escape sequence support.",
    "level": "advanced"
  },
  {
    "question": "How do Text Blocks improve SQL query readability in Java repositories?",
    "shortAnswer": "They eliminate repetitive '\" + \\n\"' boilerplate, allowing queries to be copied and pasted directly from SQL management consoles.",
    "explanation": "Complex multi-table JOINs and subqueries maintain their natural SQL formatting in Java source code.",
    "hint": "Direct copy-paste from database GUI tools without escape slashes.",
    "level": "basic"
  },
  {
    "question": "What is the security hazard of using .formatted() with Text Blocks to generate SQL queries?",
    "shortAnswer": "SQL Injection vulnerability if untrusted user input is interpolated into the query string.",
    "explanation": "Never format raw user parameters into SQL statements. Always use PreparedStatement with parameterized '?' bind variables.",
    "hint": "Formatting raw user input into SQL causes SQL Injection.",
    "level": "moderate"
  },
  {
    "question": "What happens if you use tab characters instead of spaces for indentation in a Text Block?",
    "shortAnswer": "The compiler treats tabs as distinct whitespace characters and cannot normalize them with spaces, which may cause unexpected indentation stripping.",
    "explanation": "Mixing tabs and spaces in a text block triggers compiler warnings and unpredictable margins. Always use consistent space indentation.",
    "hint": "Never mix tabs and spaces in text block indentation.",
    "level": "advanced"
  },
  {
    "question": "Can Text Blocks be used in annotation parameters?",
    "shortAnswer": "Yes, because Text Blocks are compile-time constant expressions.",
    "explanation": "You can use Text Blocks in @Query(\"\"\"...\") in Spring Data JPA or Hibernate annotations.",
    "hint": "They are compile-time constants, valid in annotations.",
    "level": "moderate",
    "codeExample": "@Query(\"\"\"\n    SELECT u FROM User u\n    WHERE u.active = true\n\"\"\")\nList<User> findActiveUsers();"
  }
];

export default topic9_questions;
