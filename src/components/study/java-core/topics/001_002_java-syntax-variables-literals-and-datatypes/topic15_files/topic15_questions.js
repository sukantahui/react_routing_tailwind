/**
 * Topic 15: Interactive console input using java.util.Scanner
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is `java.util.Scanner` and in which Java version was it introduced?",
    shortAnswer: "A simple text scanner/parser class introduced in Java 5 (JDK 1.5) to parse primitive types and strings using regular expressions.",
    explanation: "Before Java 5, reading console input required wrapping `System.in` in `InputStreamReader` and `BufferedReader`, then manually parsing strings with `Integer.parseInt()`. `Scanner` streamlined this process.",
    hint: "Introduced in Java 5 in the java.util package.",
    level: "basic",
    codeExample: "import java.util.Scanner;\nScanner sc = new Scanner(System.in);"
  },
  {
    question: "What is `System.in` in Java?",
    shortAnswer: "The standard input stream (an instance of `java.io.InputStream`) connected by default to the keyboard/console.",
    explanation: "`System.in` provides a low-level byte stream. `Scanner` wraps this byte stream, converts raw bytes into characters using the platform's default charset, and parses them into tokens.",
    hint: "Standard input stream from keyboard.",
    level: "basic",
    codeExample: "Scanner scanner = new Scanner(System.in);"
  },
  {
    question: "What is the default delimiter used by `Scanner` to break input into tokens?",
    shortAnswer: "Whitespace (spaces, tabs, line breaks / newlines matching `\\s+`).",
    explanation: "By default, `Scanner` treats any sequence of whitespace characters as the boundary separating individual tokens when calling methods like `next()`, `nextInt()`, or `nextDouble()`.",
    hint: "Whitespace is the default separator.",
    level: "basic",
    codeExample: "// Input: 'Swadeep 101 Barrackpore'\n// next() yields 'Swadeep', nextInt() yields 101, next() yields 'Barrackpore'"
  },
  {
    question: "How do you change the delimiter used by a `Scanner` instance?",
    shortAnswer: "Call `scanner.useDelimiter(String pattern)` or `scanner.useDelimiter(Pattern pattern)`.",
    explanation: "You can specify any regex delimiter. For example, `scanner.useDelimiter(\",\")` configures the scanner to parse comma-separated values (CSV).",
    hint: "useDelimiter() accepts a regex pattern.",
    level: "intermediate",
    codeExample: "Scanner sc = new Scanner(\"101,Swadeep,Barrackpore\");\nsc.useDelimiter(\",\");\nint id = sc.nextInt();\nString name = sc.next();"
  },
  {
    question: "What exception is thrown when `Scanner.nextInt()` encounters non-integer text?",
    shortAnswer: "`java.util.InputMismatchException`.",
    explanation: "If the next token does not match the integer regex syntax or exceeds the 32-bit `int` range, `nextInt()` throws `InputMismatchException` without consuming the invalid token.",
    hint: "InputMismatchException on invalid type tokens.",
    level: "basic",
    codeExample: "// If user enters \"hello\" when nextInt() is called:\n// Throws java.util.InputMismatchException"
  },
  {
    question: "How can you prevent `InputMismatchException` when reading numerical input from users?",
    shortAnswer: "Use defensive pre-check methods: `hasNextInt()` or `hasNextDouble()` before reading.",
    explanation: "Calling `hasNextInt()` returns `true` if and only if the next token can be parsed as an integer, allowing you to prompt the user again if invalid input was provided.",
    hint: "Pre-check with hasNextInt() before calling nextInt().",
    level: "intermediate",
    codeExample: "if (scanner.hasNextInt()) {\n  int roll = scanner.nextInt();\n} else {\n  System.out.println(\"Invalid number!\");\n  scanner.next(); // Discard bad token\n}"
  },
  {
    question: "What exception is thrown if `scanner.next()` is called when no more tokens exist in the stream?",
    shortAnswer: "`java.util.NoSuchElementException`.",
    explanation: "When a scanner reaches the end of input (EOF) and attempts to read another token without calling `hasNext()`, it throws `NoSuchElementException`.",
    hint: "NoSuchElementException occurs at End-Of-File (EOF).",
    level: "intermediate",
    codeExample: "while (scanner.hasNext()) {\n  String word = scanner.next();\n}"
  },
  {
    question: "Can `Scanner` be used to read and parse strings directly (not just `System.in`)?",
    shortAnswer: "Yes, `new Scanner(String source)` creates an in-memory scanner that parses text tokens from a string.",
    explanation: "`Scanner` provides overloaded constructors accepting `InputStream`, `File`, `Path`, `ReadableByteChannel`, and `String`.",
    hint: "Scanner can parse in-memory strings.",
    level: "basic",
    codeExample: "String data = \"Swadeep 95 15000\";\nScanner sc = new Scanner(data);\nString name = sc.next();\nint score = sc.nextInt();"
  },
  {
    question: "Can `Scanner` be used to read text from files in Java?",
    shortAnswer: "Yes: `Scanner fileScanner = new Scanner(new File(\"students.csv\"));`.",
    explanation: "`Scanner` easily parses files line-by-line or token-by-token. When reading files, it throws `FileNotFoundException` if the file does not exist.",
    hint: "Scanner(File) parses disk files.",
    level: "basic",
    codeExample: "try (Scanner sc = new Scanner(new java.io.File(\"data.txt\"))) {\n  while (sc.hasNextLine()) {\n    System.out.println(sc.nextLine());\n  }\n}"
  },
  {
    question: "Why is `Scanner` locale-sensitive when parsing floating-point numbers like `3.14` vs `3,14`?",
    shortAnswer: "Because different countries use different decimal separators (e.g. US uses '.', while France/Germany uses ',').",
    explanation: "In a European locale, `scanner.nextDouble()` expects `3,14` and will throw `InputMismatchException` if given `3.14`. You can lock the locale with `scanner.useLocale(Locale.US)`.",
    hint: "useLocale(Locale.US) guarantees standard dot decimal separator.",
    level: "advanced",
    codeExample: "Scanner sc = new Scanner(\"3.14\");\nsc.useLocale(java.util.Locale.US);\ndouble pi = sc.nextDouble(); // Correctly parses 3.14"
  },
  {
    question: "Is `java.util.Scanner` thread-safe?",
    shortAnswer: "No, `Scanner` is not synchronized and is NOT thread-safe.",
    explanation: "If multiple threads access a single `Scanner` instance concurrently without external synchronization, internal buffer corruption and state inconsistencies will occur.",
    hint: "Scanner is not safe for concurrent multithreaded access.",
    level: "intermediate",
    codeExample: "// Recommendation: Instantiate separate Scanners per thread or synchronize externally"
  },
  {
    question: "How does `Scanner` compare in speed and performance to `BufferedReader`?",
    shortAnswer: "`BufferedReader` is much faster than `Scanner` for heavy I/O because `Scanner` performs extensive regex parsing.",
    explanation: "`Scanner` has a small default buffer (1024 chars) and evaluates regular expressions on every token read. `BufferedReader` uses an 8192-char buffer and reads raw text lines directly, making it significantly faster for competitive programming and big data.",
    hint: "BufferedReader is faster; Scanner is more convenient for parsing primitives.",
    level: "advanced",
    codeExample: "// Competitive Programming / Big Data → BufferedReader\n// Classroom Console / Easy Parsing → Scanner"
  },
  {
    question: "What is the return type of `scanner.delimiter()`?",
    shortAnswer: "`java.util.regex.Pattern`.",
    explanation: "`scanner.delimiter()` returns the compiled regex `Pattern` currently utilized by the scanner instance to partition tokens.",
    hint: "Returns a compiled Pattern object.",
    level: "advanced",
    codeExample: "System.out.println(scanner.delimiter()); // Default: \\p{javaWhitespace}+"
  },
  {
    question: "What is the difference between `scanner.next()` and `scanner.nextLine()`?",
    shortAnswer: "`next()` reads only the next single whitespace-delimited word; `nextLine()` reads the entire rest of the line up to the newline character.",
    explanation: "`next()` stops at the first space or tab, leaving subsequent words on the stream. `nextLine()` consumes all characters until `\\n` or `\\r\\n` and advances the cursor to the next line.",
    hint: "next() reads a word; nextLine() reads a full line.",
    level: "basic",
    codeExample: "// Input: 'Swadeep Hui Barrackpore'\n// sc.next() → 'Swadeep'\n// sc.nextLine() → ' Hui Barrackpore'"
  },
  {
    question: "How do you check if more lines of text exist in a `Scanner`?",
    shortAnswer: "Call `scanner.hasNextLine()`.",
    explanation: "`hasNextLine()` returns `true` if there is another line in the input of this scanner, which is the standard idiom for looping through multi-line file input.",
    hint: "hasNextLine() guards line reading loops.",
    level: "basic",
    codeExample: "while (scanner.hasNextLine()) {\n  String line = scanner.nextLine();\n}"
  },
  {
    question: "Can `Scanner` parse numbers in different radixes (e.g. Hexadecimal or Binary)?",
    shortAnswer: "Yes, using `scanner.nextInt(int radix)` (e.g. `scanner.nextInt(16)` for hex, `scanner.nextInt(2)` for binary).",
    explanation: "`Scanner` provides radix-aware overloads: `nextInt(16)` parses input text like `\"FF\"` to `255`, and `nextInt(2)` parses `\"1010\"` to `10`.",
    hint: "nextInt(radix) parses binary, octal, or hex tokens.",
    level: "intermediate",
    codeExample: "Scanner sc = new Scanner(\"FF 1010 77\");\nint hex = sc.nextInt(16); // 255\nint bin = sc.nextInt(2);  // 10\nint oct = sc.nextInt(8);  // 63"
  },
  {
    question: "What happens if you pass a negative number to `scanner.nextInt()`?",
    shortAnswer: "It parses negative integers correctly (e.g. `\"-42\"` is returned as `-42`).",
    explanation: "`Scanner` integer regex matches optional leading `+` or `-` signs followed by digits.",
    hint: "Negative signs are parsed automatically.",
    level: "basic",
    codeExample: "Scanner sc = new Scanner(\"-5000\");\nint val = sc.nextInt(); // -5000"
  },
  {
    question: "Can `Scanner` parse BigInteger and BigDecimal values from console input?",
    shortAnswer: "Yes, using `scanner.nextBigInteger()` and `scanner.nextBigDecimal()`.",
    explanation: "For financial applications or massive arbitrary-precision integers, `Scanner` provides built-in methods that parse directly into `BigInteger` and `BigDecimal`.",
    hint: "nextBigDecimal() for financial precision inputs.",
    level: "intermediate",
    codeExample: "Scanner sc = new Scanner(\"12500000000.75\");\nBigDecimal fee = sc.nextBigDecimal();"
  },
  {
    question: "What happens when you close a `Scanner` created on `System.in` (`scanner.close()`)?",
    shortAnswer: "It closes the underlying `System.in` stream, making it impossible to read console input again in the same JVM process.",
    explanation: "`Scanner.close()` closes its underlying `Readable` or `InputStream`. Closing `System.in` cannot be undone, so subsequent attempts to read from `System.in` will fail with `NoSuchElementException` or `IllegalStateException`.",
    hint: "Closing a System.in scanner closes System.in globally.",
    level: "advanced",
    codeExample: "Scanner sc = new Scanner(System.in);\nsc.close(); // System.in is now closed globally!\n// Scanner sc2 = new Scanner(System.in); // Will not work!"
  },
  {
    question: "What does `scanner.findInLine(String pattern)` do?",
    shortAnswer: "Searches for a regex pattern within the current line without advancing past line boundaries.",
    explanation: "`findInLine()` searches for occurrences of a regex pattern in the current line and returns the matched text, ignoring delimiters.",
    hint: "Finds regex pattern in the current line.",
    level: "advanced",
    codeExample: "Scanner sc = new Scanner(\"Student fee: ₹15000\");\nString amount = sc.findInLine(\"₹\\\\d+\"); // Returns \"₹15000\""
  },
  {
    question: "What does `scanner.reset()` do?",
    shortAnswer: "Resets the scanner's delimiter, locale, and radix to their default values.",
    explanation: "`reset()` restores the default whitespace delimiter, default JVM locale, and base-10 radix.",
    hint: "Restores default scanner configuration.",
    level: "intermediate",
    codeExample: "scanner.useDelimiter(\",\");\nscanner.reset(); // Reverts delimiter back to whitespace"
  },
  {
    question: "Can `Scanner` be used inside a Try-With-Resources statement?",
    shortAnswer: "Yes, because `Scanner` implements `java.lang.AutoCloseable` (and `java.io.Closeable`).",
    explanation: "When parsing files or strings, wrapping `Scanner` in a try-with-resources statement ensures that file descriptors are safely closed when the block exits.",
    hint: "Scanner implements AutoCloseable.",
    level: "intermediate",
    codeExample: "try (Scanner sc = new Scanner(new File(\"fees.txt\"))) {\n  while (sc.hasNext()) { System.out.println(sc.next()); }\n}"
  },
  {
    question: "What is `scanner.match()` in Java?",
    shortAnswer: "Returns the `MatchResult` of the last scanning operation performed by the scanner.",
    explanation: "If you performed a regex search or token match, `scanner.match()` gives access to captured groups and match indices.",
    hint: "Retrieves MatchResult from regex scanner operations.",
    level: "expert",
    codeExample: "scanner.findInLine(\"(\\\\w+): (\\\\d+)\");\nMatchResult result = scanner.match();\nString key = result.group(1);\nString val = result.group(2);"
  },
  {
    question: "What happens if user enters multiple words separated by spaces when `scanner.next()` is called?",
    shortAnswer: "Only the first word is read; remaining words stay buffered in the input stream for subsequent `next()` calls.",
    explanation: "`scanner.next()` returns only the first token before the whitespace delimiter. Subsequent calls to `next()` will read the second and third words without prompting the user again.",
    hint: "Remaining words stay queued on the input stream.",
    level: "basic",
    codeExample: "// User types: 'Barrackpore Kolkata'\nString city1 = sc.next(); // 'Barrackpore'\nString city2 = sc.next(); // 'Kolkata' (read immediately from buffer)"
  },
  {
    question: "Can `Scanner` skip specific pattern tokens using `scanner.skip()`?",
    shortAnswer: "Yes, `scanner.skip(Pattern pattern)` advances the scanner past matching input tokens without returning them.",
    explanation: "`skip()` allows ignoring known headers, commas, or prefixes in structured data streams.",
    hint: "skip() ignores matching tokens.",
    level: "advanced",
    codeExample: "Scanner sc = new Scanner(\"DATA: 100\");\nsc.skip(\"DATA: \");\nint val = sc.nextInt(); // 100"
  },
  {
    question: "How do you read a single character `char` from `Scanner`?",
    shortAnswer: "Use `scanner.next().charAt(0)`.",
    explanation: "`Scanner` does not have a native `nextChar()` method. The idiomatic approach is to read the next token as a String via `next()` and extract the first character with `.charAt(0)`.",
    hint: "next().charAt(0) is the standard idiom to read a single char.",
    level: "basic",
    codeExample: "System.out.print(\"Enter grade (A/B/C): \");\nchar grade = scanner.next().charAt(0);"
  },
  {
    question: "What is the difference between `hasNext()` and `hasNextLine()`?",
    shortAnswer: "`hasNext()` checks if another token exists; `hasNextLine()` checks if another line boundary exists.",
    explanation: "`hasNext()` returns true if non-whitespace characters remain. `hasNextLine()` returns true even if the next line is blank/empty.",
    hint: "hasNext() checks for tokens; hasNextLine() checks for line existence.",
    level: "intermediate",
    codeExample: "if (scanner.hasNext()) { String word = scanner.next(); }\nif (scanner.hasNextLine()) { String line = scanner.nextLine(); }"
  },
  {
    question: "Why should `Scanner` not be used for competitive programming with 10^6 input integers?",
    shortAnswer: "Because its internal regex evaluation and small buffer make it 5x to 10x slower than custom Fast I/O or `BufferedReader`.",
    explanation: "For inputs with hundreds of thousands of numbers, `Scanner` will exceed execution time limits (TLE) on coding platforms. Custom byte-level Fast I/O readers are preferred.",
    hint: "Scanner regex overhead causes Time Limit Exceeded (TLE) on large inputs.",
    level: "advanced",
    codeExample: "// For competitive programming: Use Custom FastReader or BufferedReader + StringTokenizer"
  },
  {
    question: "Can a `Scanner` read boolean values like 'TRUE' or 'False' regardless of casing?",
    shortAnswer: "Yes, `scanner.nextBoolean()` is case-insensitive and parses 'true', 'TRUE', 'True', 'false', 'FALSE', etc.",
    explanation: "`nextBoolean()` matches the case-insensitive regex `(?i:true|false)`.",
    hint: "nextBoolean() is case-insensitive.",
    level: "basic",
    codeExample: "Scanner sc = new Scanner(\"TRUE False\");\nboolean b1 = sc.nextBoolean(); // true\nboolean b2 = sc.nextBoolean(); // false"
  },
  {
    question: "What is the ultimate takeaway of Topic 15 for Java developers?",
    shortAnswer: "`java.util.Scanner` is the premier, beginner-friendly tool for interactive console applications and token-based parsing with built-in type conversions and defensive validation.",
    explanation: "Understanding how `Scanner` wraps `System.in`, tokenizes by whitespace, supports custom regex delimiters, and validates input via `hasNextXxx()` provides the foundation for building user-friendly terminal software.",
    hint: "Scanner simplifies console input and token parsing in Java.",
    level: "basic",
    codeExample: "// Summary: Scanner sc = new Scanner(System.in); use hasNextInt() defensively"
  }
];

export default questions;
