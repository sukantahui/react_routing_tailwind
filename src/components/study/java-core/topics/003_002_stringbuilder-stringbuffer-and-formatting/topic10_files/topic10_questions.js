const topic10_questions = [
  {
    "question": "What does the 'stripIndent()' method do in java.lang.String?",
    "shortAnswer": "It strips incidental leading whitespace from every line of a multi-line string by finding the minimum common leading whitespace across all non-empty lines.",
    "explanation": "Introduced in Java 15, stripIndent() mimics the compiler's compile-time text block indentation algorithm on any runtime string.",
    "hint": "Strips common minimum leading spaces from all lines.",
    "level": "basic",
    "codeExample": "String dynamic = \"    Line 1\\n    Line 2\";\nSystem.out.println(dynamic.stripIndent());"
  },
  {
    "question": "What does 'translateEscapes()' do in Java 15+?",
    "shortAnswer": "It translates escape sequences (like '\\n', '\\t', '\\r', '\\\"') in the string into their actual character literal equivalents.",
    "explanation": "Very useful when reading raw template strings from files, databases, or environment variables where escapes are represented as raw backslash characters.",
    "hint": "Converts literal backslash sequences into real control characters.",
    "level": "moderate",
    "codeExample": "String raw = \"Hello\\\\nWorld\";\nString real = raw.translateEscapes();"
  },
  {
    "question": "What does 'indent(int n)' do in java.lang.String?",
    "shortAnswer": "It adjusts the indentation of each line in the string by 'n' spaces, normalizing line terminators to '\\n'.",
    "explanation": "If n > 0, n spaces are prepended to each line. If n < 0, up to |n| leading whitespace characters are stripped from each line. Added in Java 12.",
    "hint": "Positive adds spaces; negative removes spaces.",
    "level": "basic",
    "codeExample": "String s = \"Code line\\nAnother line\";\nSystem.out.println(s.indent(4)); // adds 4 leading spaces"
  },
  {
    "question": "How does the Java compiler calculate common white space in a Text Block?",
    "shortAnswer": "It counts leading white space characters across all non-blank content lines AND the line containing the closing delimiter \"\"\". The minimum count is stripped from all lines.",
    "explanation": "Blank lines are ignored when computing minimum common whitespace to prevent blank lines from forcing zero indentation stripping.",
    "hint": "Minimum leading spaces across all non-blank lines and the closing delimiter.",
    "level": "advanced"
  },
  {
    "question": "What is the role of the closing delimiter \"\"\" in setting common indentation?",
    "shortAnswer": "If the closing delimiter is on its own line, its column position acts as an active line in the minimum indentation calculation.",
    "explanation": "Moving the closing delimiter to column 0 preserves all indentation in the text above it. Indenting the closing delimiter inward strips that much indentation.",
    "hint": "Position of closing \"\"\" establishes the left margin baseline.",
    "level": "advanced",
    "codeExample": "String s = \"\"\"\n        Level 2\n    \"\"\"; // 4 spaces preserved because closing quote is at col 4"
  },
  {
    "question": "Does Text Block processing strip trailing whitespace by default?",
    "shortAnswer": "Yes! The compiler strips all trailing whitespace characters from every line in a text block automatically.",
    "explanation": "This prevents invisible trailing spaces from causing subtle bugs in string comparisons, hashing, or git diffs.",
    "hint": "Trailing whitespace is stripped automatically by the compiler.",
    "level": "basic"
  },
  {
    "question": "How can you intentionally preserve trailing spaces in a Text Block?",
    "shortAnswer": "Use the '\\s' escape sequence at the end of the line.",
    "explanation": "'\\s' represents an explicit space character that the compiler's trailing-whitespace stripper is not permitted to discard.",
    "hint": "Use \\s at the line end to preserve spaces.",
    "level": "moderate",
    "codeExample": "String s = \"\"\"\n    Name:    \\s\n    Address: \\s\n    \"\"\";"
  },
  {
    "question": "Why was the instance method 'formatted(Object... args)' added to String in Java 15?",
    "shortAnswer": "To allow clean method chaining directly on Text Blocks without wrapping them in verbose 'String.format(textBlock, args)' static calls.",
    "explanation": "It reads naturally from left to right, matching modern fluent programming styles.",
    "hint": "Allows fluent instance method call directly on the string/block.",
    "level": "basic",
    "codeExample": "String query = \"\"\"\n    SELECT * FROM %s WHERE id = %d\n\"\"\".formatted(\"products\", 101);"
  },
  {
    "question": "Is 'str.formatted(args)' identical in behavior to 'String.format(str, args)'?",
    "shortAnswer": "Yes, 'str.formatted(args)' internally delegates directly to 'String.format(this, args)'.",
    "explanation": "It is purely an ergonomic API convenience with zero difference in formatting rules or specifier syntax.",
    "hint": "Direct delegation to String.format.",
    "level": "basic"
  },
  {
    "question": "What happens if stripIndent() is called on a string that has no leading whitespace?",
    "shortAnswer": "It returns the exact same string unchanged.",
    "explanation": "If the minimum common indentation is 0, no characters are stripped.",
    "hint": "Minimum indentation of 0 leaves the string as-is.",
    "level": "basic"
  },
  {
    "question": "What happens if a text block contains a mixture of tabs and spaces for indentation?",
    "shortAnswer": "The compiler cannot determine a common indentation prefix, resulting in compiler warnings and potentially un-stripped indentation.",
    "explanation": "Tabs and spaces have different visual widths in different editors. Java does not assume a tab width (like 4 or 8), so it treats them as incompatible.",
    "hint": "Never mix tabs and spaces in text block indentation.",
    "level": "moderate"
  },
  {
    "question": "How do you strip leading and trailing whitespace from the ENTIRE text block as a single unit?",
    "shortAnswer": "Call .trim() or modern .strip().",
    "explanation": "stripIndent() only strips line-by-line leading indentation. Calling .strip() removes any remaining leading/trailing whitespace and newlines from the entire block.",
    "hint": "Use .strip() or .trim() on the resulting String.",
    "level": "basic",
    "codeExample": "String cleaned = textBlock.strip();"
  },
  {
    "question": "What is the difference between String.trim() and String.strip() in modern Java (Java 11+)?",
    "shortAnswer": "trim() only removes ASCII characters <= \\u0020; strip() is Unicode-aware and removes all Unicode whitespace characters (e.g. non-breaking spaces).",
    "explanation": "Always prefer strip() over trim() in modern Java 11+ applications.",
    "hint": "strip() is Unicode-aware; trim() only checks ASCII <= 32.",
    "level": "moderate"
  },
  {
    "question": "Can you use translateEscapes() on arbitrary untrusted user input safely?",
    "shortAnswer": "Yes, but be aware that it can decode escaped control characters (like null bytes '\\0' or line breaks) which may affect downstream validators.",
    "explanation": "It only decodes standard Java escape syntax, not malicious shell or SQL injection syntax directly.",
    "hint": "Decodes standard Java escapes; validate output if control characters are sensitive.",
    "level": "advanced"
  },
  {
    "question": "What does 'stripTrailing()' and 'stripLeading()' do in String (Java 11+)?",
    "shortAnswer": "stripLeading() removes whitespace from the start of the string; stripTrailing() removes whitespace from the end.",
    "explanation": "Useful for targeted trimming without affecting the opposite end of the string.",
    "hint": "Targeted trimming at start or end only.",
    "level": "basic"
  },
  {
    "question": "How does 'indent(0)' affect a multi-line string?",
    "shortAnswer": "It does not change indentation, but it normalizes all line endings to '\\n' and ensures the string ends with a newline.",
    "explanation": "Calling indent(0) is a quick trick to normalize line endings across platforms.",
    "hint": "Normalizes line breaks to \\n.",
    "level": "advanced"
  },
  {
    "question": "What exception is thrown if 'str.formatted()' receives invalid format specifiers?",
    "shortAnswer": "Standard format exceptions like UnknownFormatConversionException or MissingFormatArgumentException.",
    "explanation": "Since it delegates to Formatter, it shares the exact same exception hierarchy as String.format().",
    "hint": "Standard Formatter exception hierarchy.",
    "level": "moderate"
  },
  {
    "question": "How do you align a Text Block flush against the left margin with zero leading spaces?",
    "shortAnswer": "Place the closing delimiter \"\"\" at column 0 (flush against the left margin) or on the same line as the opening content.",
    "explanation": "If the closing \"\"\" is at column 0, the minimum common whitespace is 0, or if content lines start at col 0.",
    "hint": "Ensure the leftmost character of content or closing delimiter is at column 0.",
    "level": "basic"
  },
  {
    "question": "Can Text Blocks be processed using String.lines() stream API?",
    "shortAnswer": "Yes! Calling textBlock.lines() returns a Stream<String> of each individual line.",
    "explanation": "Introduced in Java 11, lines() splits on \\n, \\r, or \\r\\n lazily without intermediate array allocations.",
    "hint": "textBlock.lines() yields a Stream<String>.",
    "level": "basic",
    "codeExample": "textBlock.lines()\n    .filter(line -> !line.isBlank())\n    .forEach(System.out::println);"
  },
  {
    "question": "Summary: What is the optimal pipeline for building dynamic formatted text blocks?",
    "shortAnswer": "Define the static template with Text Block (\"\"\"), interpolate dynamic values with .formatted(...), and clean up edges with .strip().",
    "explanation": "This modern 3-step idiom produces readable, maintainable, and highly expressive template code.",
    "hint": "Text Block -> .formatted() -> .strip().",
    "level": "basic"
  }
];

export default topic10_questions;
