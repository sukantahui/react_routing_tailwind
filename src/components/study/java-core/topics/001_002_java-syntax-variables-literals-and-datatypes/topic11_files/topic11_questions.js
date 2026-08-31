/**
 * Topic 11: Character representation: char data type, ASCII values, and Unicode escape sequences (\uXXXX)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the memory size, bit width, and numeric range of the `char` data type in Java?",
    shortAnswer: "16 bits (2 bytes), unsigned, with a range of 0 to 65,535 (`\\u0000` to `\\uffff`).",
    explanation: "Unlike C/C++ where `char` is an 8-bit signed/unsigned byte representing ASCII, Java was designed from day one to support global multilingual computing using 16-bit UTF-16 code units.",
    hint: "16-bit unsigned (only positive integer values from 0 to 65,535).",
    level: "basic",
    codeExample: "char c1 = 65;      // 'A'\nchar c2 = '\\u0041'; // 'A'\nchar c3 = 'A';     // 'A'"
  },
  {
    question: "Why does Java use 16-bit Unicode for `char` instead of 8-bit ASCII?",
    shortAnswer: "To support all international alphabets, scripts (e.g. Bengali, Devanagari, Greek, Japanese), and mathematical symbols natively.",
    explanation: "8-bit ASCII is restricted to 128 (or 256 extended) characters, insufficient for global languages. Java adopted Unicode to ensure universal internationalization (i18n).",
    hint: "Universal character set support for global languages.",
    level: "basic",
    codeExample: "char rupee = '\\u20B9';    // ₹ (Indian Rupee)\nchar bengaliKa = '\\u0995'; // ক (Bengali Ka)"
  },
  {
    question: "What are the standard ASCII integer values for `'0'`, `'A'`, and `'a'` in Java?",
    shortAnswer: "'0' is 48, 'A' is 65, and 'a' is 97.",
    explanation: "In ASCII and Unicode tables: Digits '0'-'9' span 48-57; Uppercase 'A'-'Z' span 65-90; Lowercase 'a'-'z' span 97-122. The difference between lowercase and uppercase letters is exactly 32 (`'a' - 'A' == 32`).",
    hint: "48, 65, 97 are the three foundational ASCII anchor points.",
    level: "basic",
    codeExample: "System.out.println((int) '0'); // 48\nSystem.out.println((int) 'A'); // 65\nSystem.out.println((int) 'a'); // 97"
  },
  {
    question: "What is the result of `'A' + 1` in Java, and why is the return type `int`?",
    shortAnswer: "The result is integer `66` because binary arithmetic operators promote operands of type `char` to `int`.",
    explanation: "According to Java Binary Numeric Promotion rules (JLS §5.6.2), whenever arithmetic operators (`+`, `-`, `*`, `/`) are applied to types narrower than `int` (byte, short, char), they are promoted to 32-bit `int` before evaluation.",
    hint: "Primitive numeric promotion converts char to int during math.",
    level: "basic",
    codeExample: "char ch = 'A';\nint nextCode = ch + 1;         // 66\nchar nextLetter = (char)(ch + 1); // 'B'"
  },
  {
    question: "Why does `char c = 'a'; c++;` compile without an explicit cast, but `c = c + 1;` fails?",
    shortAnswer: "Compound assignment and increment operators (`++`, `+=`) automatically include an implicit cast back to the target type.",
    explanation: "`c++` is internally evaluated as `c = (char)(c + 1)`. On the other hand, `c = c + 1` evaluates `c + 1` to `int` and attempts to assign an `int` to a `char`, which is an illegal narrowing conversion.",
    hint: "Compound operators have built-in implicit narrowing casts.",
    level: "intermediate",
    codeExample: "char c = 'a';\nc++;          // Valid: c becomes 'b'\n// c = c + 1; // COMPILER ERROR: Type mismatch cannot convert from int to char"
  },
  {
    question: "How do you convert a digit character like `'7'` to its actual numerical integer value `7`?",
    shortAnswer: "Subtract `'0'`: `int val = ch - '0';` or call `Character.getNumericValue(ch)`.",
    explanation: "Because ASCII characters '0' through '9' are contiguous (48 through 57), subtracting ASCII 48 (`'0'`) from any digit character yields the exact numeric value (e.g. `'7'` (55) - `'0'` (48) = 7).",
    hint: "Subtract the base character '0'.",
    level: "basic",
    codeExample: "char ch = '7';\nint digit = ch - '0'; // 55 - 48 = 7\nint digit2 = Character.getNumericValue(ch); // 7"
  },
  {
    question: "What is the syntax for a Unicode escape sequence in Java?",
    shortAnswer: "`\\uXXXX`, where `XXXX` is exactly 4 hexadecimal digits.",
    explanation: "A Unicode escape sequence consists of a backslash followed by 'u' (or multiple 'u's) and 4 hexadecimal digits (0-9, A-F, case-insensitive) specifying the 16-bit code unit.",
    hint: "\\u followed by 4 hex digits.",
    level: "basic",
    codeExample: "char rupee = '\\u20B9'; // ₹\nchar pi = '\\u03C0';    // π"
  },
  {
    question: "What is the unique early lexical parsing trap of Unicode escapes in Java?",
    shortAnswer: "Unicode escapes are processed before comments and tokenization during the first lexical pass.",
    explanation: "The Java compiler parses `\\uXXXX` sequences before stripping comments! Therefore, writing a newline Unicode escape `\\u000A` inside a comment breaks the single-line comment and causes a compilation syntax error on the next line.",
    hint: "\\uXXXX is expanded before comments are removed.",
    level: "expert",
    codeExample: "// Notice: \\u000A System.out.println(\"Executed!\"); // This runs because \\u000A creates a newline!"
  },
  {
    question: "Can an integer literal be directly assigned to a `char` variable?",
    shortAnswer: "Yes, if the integer literal is a constant value within the range `0` to `65535`.",
    explanation: "Java allows constant narrowing assignment: an `int` compile-time constant within `0` to `65535` can be assigned directly to a `char` without an explicit cast.",
    hint: "Compile-time constant value within 0..65535 is allowed.",
    level: "intermediate",
    codeExample: "char c = 65;       // Valid: represents 'A'\n// char c2 = 70000; // ERROR: 70000 exceeds char capacity (65535)"
  },
  {
    question: "Can a negative integer literal like `-1` be assigned directly to a `char`?",
    shortAnswer: "No, because `char` is unsigned and cannot store negative numbers.",
    explanation: "`char` only holds positive values from 0 to 65,535. Assigning `-1` causes a compile error: `Type mismatch: cannot convert from int to char` unless explicitly cast `(char) -1` (which wraps to `65535`).",
    hint: "Char is an unsigned data type.",
    level: "basic",
    codeExample: "// char c = -1; // COMPILATION ERROR\nchar c = (char) -1; // Wraps to 65535 ('\\uffff')"
  },
  {
    question: "What is the difference between `'A'` and `\"A\"` in Java?",
    shortAnswer: "`'A'` is a primitive `char` (2 bytes); `\"A\"` is a `java.lang.String` object referencing a heap/pool object.",
    explanation: "Single quotes `' '` denote primitive character literals. Double quotes `\" \"` denote immutable `String` reference objects stored in the String Constant Pool.",
    hint: "Single quotes = primitive char; Double quotes = String object.",
    level: "basic",
    codeExample: "char primitiveChar = 'A'; // Primitive (2 bytes)\nString stringObj = \"A\";      // Object reference"
  },
  {
    question: "What does `Character.isLetterOrDigit(char ch)` do?",
    shortAnswer: "Returns `true` if the character is an alphanumeric letter or digit in any supported Unicode script.",
    explanation: "`Character.isLetterOrDigit()` inspects the Unicode character properties. It correctly recognizes Latin, Bengali, Arabic, Devanagari, Chinese, and other global alphabet letters.",
    hint: "Checks alphanumeric properties across all Unicode scripts.",
    level: "intermediate",
    codeExample: "System.out.println(Character.isLetterOrDigit('A')); // true\nSystem.out.println(Character.isLetterOrDigit('৭')); // true (Bengali 7)\nSystem.out.println(Character.isLetterOrDigit('@')); // false"
  },
  {
    question: "What is the Unicode code point of the Indian Rupee symbol (`₹`) in Java?",
    shortAnswer: "`\\u20B9` (decimal 8377).",
    explanation: "Adopted by the Government of India in 2010 and incorporated into Unicode 6.0 in 2010, the Indian Rupee symbol is encoded at U+20B9.",
    hint: "\\u20B9 is the official Unicode code point for ₹.",
    level: "basic",
    codeExample: "char rupee = '\\u20B9';\nSystem.out.printf(\"Fee: %c15,000%n\", rupee); // Fee: ₹15,000"
  },
  {
    question: "What are Supplementary Characters in Unicode, and why can they not fit into a single `char`?",
    shortAnswer: "Characters with code points above `U+FFFF` (e.g. emojis `U+1F680`) require more than 16 bits.",
    explanation: "Unicode defines 1,114,112 code points (U+0000 to U+10FFFF). The Basic Multilingual Plane (BMP, U+0000 to U+FFFF) fits in a 16-bit `char`. Characters above U+FFFF are supplementary and require a pair of 16-bit `char`s called a Surrogate Pair.",
    hint: "Emojis and rare historic scripts exceed 16 bits (0xFFFF).",
    level: "advanced",
    codeExample: "String rocket = \"\\uD83D\\uDE80\"; // 🚀 (High surrogate + Low surrogate)\nSystem.out.println(rocket.length()); // 2 (2 char code units!)"
  },
  {
    question: "How do you count the real number of Unicode characters in a String containing emojis in Java?",
    shortAnswer: "Use `str.codePointCount(0, str.length())`.",
    explanation: "`str.length()` returns the number of 16-bit UTF-16 code units (where an emoji counts as 2). `codePointCount()` accurately counts the actual glyph/character code points.",
    hint: "codePointCount vs length.",
    level: "advanced",
    codeExample: "String text = \"Barrackpore 🚀\";\nSystem.out.println(text.length()); // 14 code units\nSystem.out.println(text.codePointCount(0, text.length())); // 13 real characters"
  },
  {
    question: "What is the difference between a high surrogate and a low surrogate in UTF-16?",
    shortAnswer: "High surrogates span `\\uD800` to `\\uDBFF`; Low surrogates span `\\uDC00` to `\\uDFFF`.",
    explanation: "UTF-16 reserves 2048 code units for surrogates (1024 high, 1024 low). Combined, they address $1024 \\times 1024 = 1,048,576$ supplementary characters in the 16 planes above BMP.",
    hint: "High surrogates start with D800..DBFF; Low surrogates DC00..DFFF.",
    level: "expert",
    codeExample: "boolean isHigh = Character.isHighSurrogate('\\uD83D'); // true\nboolean isLow = Character.isLowSurrogate('\\uDE80');   // true"
  },
  {
    question: "Can an empty character literal `''` exist in Java?",
    shortAnswer: "No, `''` is a compilation syntax error: empty character literal.",
    explanation: "A `char` literal must contain exactly one character token or escape sequence. Unlike an empty String `\"\"`, there is no concept of an empty `char`.",
    hint: "Single quotes cannot be empty.",
    level: "basic",
    codeExample: "// char empty = ''; // COMPILATION ERROR: Invalid character constant\nchar space = ' '; // Valid space character"
  },
  {
    question: "What is the default value of an uninitialized instance variable of type `char`?",
    shortAnswer: "`'\\u0000'` (null character, integer value 0).",
    explanation: "When an instance or static `char` field is created without explicit initialization, the JVM zeroes its memory, assigning the default null character `\\u0000` (ASCII 0).",
    hint: "Default char is \\u0000, not a space ' '.",
    level: "basic",
    codeExample: "class Test {\n  char defaultChar; // Defaults to '\\u0000'\n}"
  },
  {
    question: "What is the result of `System.out.println('A' + 'B');`?",
    shortAnswer: "It prints `131` (not \"AB\").",
    explanation: "Because `'A'` (65) and `'B'` (66) are primitive chars, the `+` operator performs integer addition: $65 + 66 = 131$. To concatenate characters as text, include a String: `\"\" + 'A' + 'B'` prints `\"AB\"`.",
    hint: "Math on chars adds their ASCII values.",
    level: "basic",
    codeExample: "System.out.println('A' + 'B');      // 131 (Integer sum)\nSystem.out.println(\"\" + 'A' + 'B'); // \"AB\" (String concatenation)"
  },
  {
    question: "How can you iterate through all uppercase English letters from 'A' to 'Z' in a Java for-loop?",
    shortAnswer: "Use `for (char c = 'A'; c <= 'Z'; c++)`.",
    explanation: "Because `char` is an integral type, it supports standard relational comparison operators (`<=`, `>=`) and loop increments.",
    hint: "For-loop with char counter.",
    level: "basic",
    codeExample: "for (char c = 'A'; c <= 'Z'; c++) {\n  System.out.print(c + \" \");\n}"
  },
  {
    question: "How does `Character.toLowerCase(char ch)` handle multilingual characters like Turkish or German?",
    shortAnswer: "It uses Unicode 1-to-1 character case mappings; for language-sensitive rules, use `String.toLowerCase(Locale)`.",
    explanation: "`Character.toLowerCase()` operates on individual 16-bit code units without context. Certain language rules (like German 'ß' to 'SS' or Turkish 'I') change character count and require locale-aware String operations.",
    hint: "Locale-aware case folding requires String methods.",
    level: "intermediate",
    codeExample: "char lower = Character.toLowerCase('Ω'); // 'ω'"
  },
  {
    question: "What is the ASCII value of the space character `' '` in Java?",
    shortAnswer: "32 (hexadecimal `0x20`, Unicode `\\u0020`).",
    explanation: "The standard ASCII space character is encoded as decimal 32.",
    hint: "ASCII 32 is the space key.",
    level: "basic",
    codeExample: "char space = ' ';\nSystem.out.println((int) space); // 32"
  },
  {
    question: "What is the ASCII value of the Enter/Newline character `\\n` in Java?",
    shortAnswer: "10 (Line Feed / LF, hex `0x0A`, Unicode `\\u000A`).",
    explanation: "`\\n` is the standard Unix/Java newline escape character, corresponding to ASCII decimal 10.",
    hint: "Line Feed is 10.",
    level: "basic",
    codeExample: "System.out.println((int) '\\n'); // 10"
  },
  {
    question: "What is the ASCII value of the Carriage Return `\\r` in Java?",
    shortAnswer: "13 (Carriage Return / CR, hex `0x0D`, Unicode `\\u000D`).",
    explanation: "Windows line endings consist of `\\r\\n` (CRLF: 13 followed by 10), while Linux/macOS use `\\n` (LF: 10).",
    hint: "Carriage Return is 13.",
    level: "intermediate",
    codeExample: "System.out.println((int) '\\r'); // 13"
  },
  {
    question: "Can a `char` array be converted into a `String` without copying elements manually?",
    shortAnswer: "Yes, use `new String(charArray)` or `String.valueOf(charArray)`.",
    explanation: "`String.valueOf(char[])` and the `String(char[])` constructor instantiate a new immutable String containing the array's character sequence.",
    hint: "String constructor takes char array.",
    level: "basic",
    codeExample: "char[] letters = {'J', 'a', 'v', 'a'};\nString word = new String(letters); // \"Java\""
  },
  {
    question: "Why should sensitive data like passwords be stored in `char[]` instead of `String` in Java?",
    shortAnswer: "Because `char[]` can be wiped/zeroed out immediately after use, whereas Strings are immutable and persist in memory until GC.",
    explanation: "Strings remain in the String Constant Pool or heap memory until garbage collected, leaving plain-text passwords vulnerable in memory heap dumps. A `char[]` array can be overwritten with zeros (`Arrays.fill(pwd, '0')`) immediately after authentication.",
    hint: "Security best practice: mutable char[] vs immutable String.",
    level: "advanced",
    codeExample: "char[] password = {'s', 'e', 'c', 'r', 'e', 't'};\n// After login:\njava.util.Arrays.fill(password, '\\u0000'); // Memory wiped!"
  },
  {
    question: "Can a `char` be used as the selector expression in a `switch` statement?",
    shortAnswer: "Yes, `char` has been supported in switch statements since Java 1.0.",
    explanation: "Because `char` is an integral type (0 to 65535), switch statements evaluate character cases by comparing their numeric integral values efficiently via jump tables (`tableswitch` / `lookupswitch`).",
    hint: "Char is an integral type, perfectly supported in switch.",
    level: "basic",
    codeExample: "char grade = 'A';\nswitch(grade) {\n  case 'A' → System.out.println(\"Excellent\");\n  case 'B' → System.out.println(\"Good\");\n}"
  },
  {
    question: "What is `Character.isWhitespace(char ch)` and which characters does it recognize?",
    shortAnswer: "Returns `true` for space (' '), tab ('\\t'), newline ('\\n'), carriage return ('\\r'), formfeed ('\\f'), and Unicode spaces.",
    explanation: "It checks if a character is whitespace according to Java and Unicode definitions, including non-breaking and regional typographic spaces.",
    hint: "Recognizes all tab, newline, and spacing characters.",
    level: "intermediate",
    codeExample: "System.out.println(Character.isWhitespace('\\t')); // true\nSystem.out.println(Character.isWhitespace('\\n')); // true"
  },
  {
    question: "What happens when you cast a negative integer `int n = -65;` to `char`?",
    shortAnswer: "It performs modulo $2^{16}$ arithmetic: `(char) -65` becomes `65471` (`\\uFFBF`).",
    explanation: "Because `char` is 16-bit unsigned, casting discards upper 16 bits of the 32-bit two's complement integer, wrapping into the positive unsigned range $0..65535$.",
    hint: "Unsigned modulo 65536 wrap.",
    level: "advanced",
    codeExample: "int n = -65;\nchar c = (char) n;\nSystem.out.println((int) c); // 65471"
  },
  {
    question: "What is the ultimate takeaway of Topic 11 for Java software engineers?",
    shortAnswer: "Mastering 16-bit char, ASCII mapping, and Unicode (\\uXXXX) enables writing truly global, internationalized, and secure software.",
    explanation: "Understanding that `char` is both an unsigned integer and a UTF-16 code unit allows developers to perform fast ASCII arithmetic, handle regional scripts (like Bengali or Rupee ₹), process emojis correctly, and secure sensitive passwords with `char[]`.",
    hint: "Char bridges numerical math and international multilingual text.",
    level: "basic",
    codeExample: "// Summary: 16-bit unsigned, UTF-16 code unit, ASCII anchor 48/65/97, \\uXXXX escapes"
  }
];

export default questions;
