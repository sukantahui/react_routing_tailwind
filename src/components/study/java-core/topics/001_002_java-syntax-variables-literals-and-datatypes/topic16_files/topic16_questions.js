/**
 * Topic 16: Scanner methods: next(), nextLine(), nextInt(), nextDouble(), nextBoolean()
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary difference between `scanner.next()` and `scanner.nextLine()`?",
    shortAnswer: "`next()` reads only a single whitespace-delimited word token; `nextLine()` reads the entire rest of the line up to the newline character.",
    explanation: "If user inputs 'Swadeep Hui', `next()` returns 'Swadeep' and stops at the space. `nextLine()` reads 'Swadeep Hui' completely, consumes the trailing newline character, and moves to the next line.",
    hint: "next() = word; nextLine() = entire line.",
    level: "basic",
    codeExample: "// Input: 'Swadeep Hui'\nString firstWord = sc.next();    // 'Swadeep'\nString restOfLine = sc.nextLine(); // ' Hui'"
  },
  {
    question: "What does `scanner.nextInt()` do when encountering whitespace before the integer?",
    shortAnswer: "It automatically skips all leading whitespace (spaces, tabs, newlines) to find the integer digits.",
    explanation: "`nextInt()` scans past any leading whitespace delimiters until it finds the integer token, parses it, and leaves the trailing delimiter (like `\\n`) in the buffer.",
    hint: "Leading whitespace is skipped automatically.",
    level: "basic",
    codeExample: "int num = scanner.nextInt(); // Skips spaces, parses int, leaves trailing \\n"
  },
  {
    question: "How does `scanner.nextDouble()` handle decimal separators in different locales?",
    shortAnswer: "It parses decimals based on the scanner's configured `Locale` (US uses `.`, while some European locales use `,`).",
    explanation: "By default, `Scanner` adopts the JVM host system's default locale. To ensure consistency across different countries, developers explicitly call `scanner.useLocale(Locale.US)`.",
    hint: "Locale controls '.' vs ',' decimal interpretation.",
    level: "intermediate",
    codeExample: "scanner.useLocale(java.util.Locale.US);\ndouble fee = scanner.nextDouble(); // Expects 15000.50"
  },
  {
    question: "What strings are recognized by `scanner.nextBoolean()`?",
    shortAnswer: "'true' and 'false' (case-insensitive, e.g. 'True', 'FALSE', 'tRuE').",
    explanation: "`nextBoolean()` matches the case-insensitive regular expression `(?i:true|false)`. Any other input (like '1', '0', 'yes', 'no') throws `InputMismatchException`.",
    hint: "Case-insensitive true and false only.",
    level: "basic",
    codeExample: "boolean b = scanner.nextBoolean(); // Accepts \"true\", \"True\", \"FALSE\""
  },
  {
    question: "What methods does `Scanner` provide to parse 8-bit, 16-bit, and 64-bit integers?",
    shortAnswer: "`nextByte()`, `nextShort()`, and `nextLong()`.",
    explanation: "Each method validates that the input token falls within the legal numeric range for that specific primitive type (e.g. `nextByte()` ensures -128 to 127).",
    hint: "Type-specific nextXxx() methods.",
    level: "basic",
    codeExample: "byte age = scanner.nextByte();\nshort year = scanner.nextShort();\nlong aadhaar = scanner.nextLong();"
  },
  {
    question: "What method allows `Scanner` to read arbitrary-precision currency values directly?",
    shortAnswer: "`scanner.nextBigDecimal()`.",
    explanation: "For financial ledgers, billing in Indian Rupees (₹), and accounting applications, `nextBigDecimal()` reads and parses directly into a `BigDecimal` object without floating-point rounding.",
    hint: "nextBigDecimal() for financial accuracy.",
    level: "intermediate",
    codeExample: "java.math.BigDecimal fee = scanner.nextBigDecimal();"
  },
  {
    question: "How do you read a single word with spaces inside (like 'New Delhi' or 'Barrackpore Cantonment') using `Scanner`?",
    shortAnswer: "Use `scanner.nextLine()` or configure `scanner.useDelimiter(\"\\n\")`.",
    explanation: "Because `next()` splits on spaces, reading a multi-word phrase requires reading the full line with `nextLine()` or changing the delimiter to newlines only.",
    hint: "nextLine() reads multi-word strings.",
    level: "basic",
    codeExample: "System.out.print(\"Enter City: \");\nString city = scanner.nextLine(); // 'Barrackpore Cantonment'"
  },
  {
    question: "What happens if you enter `3.14` when `scanner.nextInt()` is called?",
    shortAnswer: "It throws `InputMismatchException` because `3.14` is a floating-point token, not a valid integer.",
    explanation: "`nextInt()` requires an uninterrupted sequence of digits (with optional leading `+` or `-`). The decimal point character `.` causes immediate validation failure.",
    hint: "Decimal point violates integer regex.",
    level: "basic",
    codeExample: "// Input: 3.14 → scanner.nextInt() THROWS InputMismatchException"
  },
  {
    question: "What happens to the invalid token in the stream when `InputMismatchException` is thrown?",
    shortAnswer: "The invalid token is NOT consumed; it remains at the head of the stream.",
    explanation: "Because `Scanner` leaves the invalid token in place, calling `nextInt()` again in a loop without first calling `scanner.next()` creates an infinite error loop.",
    hint: "Must consume bad token with next() before retrying.",
    level: "intermediate",
    codeExample: "while (!scanner.hasNextInt()) {\n  String badToken = scanner.next(); // Consume and discard\n  System.out.println(\"Invalid input: \" + badToken);\n}\nint validNum = scanner.nextInt();"
  },
  {
    question: "What is the return type of `scanner.hasNextFloat()`?",
    shortAnswer: "`boolean`.",
    explanation: "All `hasNextXxx()` methods return a boolean indicating whether the next token can be interpreted as the target type.",
    hint: "Guard methods return boolean.",
    level: "basic",
    codeExample: "if (scanner.hasNextFloat()) { float f = scanner.nextFloat(); }"
  },
  {
    question: "Can `scanner.nextInt()` read integers in hexadecimal or binary format directly?",
    shortAnswer: "Yes, using the overloaded method `scanner.nextInt(int radix)`.",
    explanation: "Calling `scanner.nextInt(16)` parses hex strings like 'FF' (255); calling `scanner.nextInt(2)` parses binary strings like '1010' (10).",
    hint: "nextInt(radix) takes base 2, 8, 16, etc.",
    level: "intermediate",
    codeExample: "int hexVal = scanner.nextInt(16); // Input '1A' yields 26"
  },
  {
    question: "What does `scanner.radix()` return?",
    shortAnswer: "The default radix (base) currently used by the scanner (defaults to base 10).",
    explanation: "`scanner.radix()` returns the integer base used for parsing numbers when no explicit radix is specified.",
    hint: "Default radix is 10 (decimal).",
    level: "intermediate",
    codeExample: "System.out.println(scanner.radix()); // 10"
  },
  {
    question: "How does `scanner.useRadix(int radix)` affect subsequent `nextInt()` calls?",
    shortAnswer: "It changes the default base used by all numerical parsing methods on that scanner instance.",
    explanation: "Calling `scanner.useRadix(16)` makes all subsequent `nextInt()`, `nextLong()`, and `nextShort()` calls parse hexadecimal tokens by default.",
    hint: "Sets global radix for the scanner.",
    level: "advanced",
    codeExample: "scanner.useRadix(16);\nint val = scanner.nextInt(); // Parses input as hex"
  },
  {
    question: "What does `scanner.next(Pattern pattern)` do?",
    shortAnswer: "Returns the next token only if it matches the specified regular expression `Pattern`.",
    explanation: "If the next token matches the pattern, it is returned; otherwise, an `InputMismatchException` is thrown.",
    hint: "Pattern-constrained token reader.",
    level: "advanced",
    codeExample: "Pattern panPattern = Pattern.compile(\"[A-Z]{5}[0-9]{4}[A-Z]\");\nString panNumber = scanner.next(panPattern); // Validates Indian PAN card format"
  },
  {
    question: "What is the behavior of `scanner.hasNext(String pattern)`?",
    shortAnswer: "Returns `true` if the next complete token matches the specified regular expression string.",
    explanation: "Enables pre-validating tokens against domain-specific regex (such as emails, phone numbers, or course codes).",
    hint: "Regex pre-validation guard.",
    level: "intermediate",
    codeExample: "if (scanner.hasNext(\"₹\\\\d+\")) { String fee = scanner.next(); }"
  },
  {
    question: "Does `scanner.next()` read past newline boundaries (`\\n`)?",
    shortAnswer: "Yes, `next()` skips leading newlines because newline is included in the default whitespace delimiter set.",
    explanation: "If a user presses Enter multiple times before typing a word, `next()` skips all blank lines and retrieves the first actual word token.",
    hint: "next() treats newline as whitespace and skips it.",
    level: "basic",
    codeExample: "// Blank lines are skipped by next()"
  },
  {
    question: "Does `scanner.nextLine()` skip leading newlines?",
    shortAnswer: "No, `nextLine()` immediately reads whatever is on the current line (even if it is empty).",
    explanation: "If the cursor is sitting on an unconsumed newline character, `nextLine()` immediately returns an empty string `\"\"` and consumes the newline.",
    hint: "nextLine() reads immediately without skipping leading newlines.",
    level: "intermediate",
    codeExample: "// If cursor is on '\\n', nextLine() returns \"\""
  },
  {
    question: "What happens if you pass an invalid radix like `37` to `scanner.useRadix(37)`?",
    shortAnswer: "It throws `IllegalArgumentException` because radix must be between `Character.MIN_RADIX` (2) and `Character.MAX_RADIX` (36).",
    explanation: "Java character and number systems support bases from binary (2) to alphanumeric (36: 0-9 and A-Z).",
    hint: "Radix must be between 2 and 36.",
    level: "advanced",
    codeExample: "// scanner.useRadix(40); // THROWS IllegalArgumentException"
  },
  {
    question: "How do you read a line of input while simultaneously checking if input was closed?",
    shortAnswer: "Guard with `if (scanner.hasNextLine())` before calling `scanner.nextLine()`.",
    explanation: "Guards against `NoSuchElementException` when input streams or redirected files terminate unexpectedly.",
    hint: "hasNextLine() check before nextLine().",
    level: "basic",
    codeExample: "if (scanner.hasNextLine()) {\n  String line = scanner.nextLine();\n}"
  },
  {
    question: "Can `Scanner` parse scientific exponential floating-point numbers like `1.5e3`?",
    shortAnswer: "Yes, `scanner.nextDouble()` and `scanner.nextFloat()` support scientific notation.",
    explanation: "The default floating-point regex matches optional exponential notation (`e` or `E` followed by signed power of 10).",
    hint: "nextDouble() parses scientific notation.",
    level: "basic",
    codeExample: "Scanner sc = new Scanner(\"1.5e3\");\ndouble val = sc.nextDouble(); // 1500.0"
  },
  {
    question: "What is `scanner.locale()` in Java?",
    shortAnswer: "Returns the `java.util.Locale` object currently utilized by the scanner instance.",
    explanation: "`scanner.locale()` inspects the active regional locale for number formatting.",
    hint: "Returns active Locale.",
    level: "intermediate",
    codeExample: "Locale loc = scanner.locale();"
  },
  {
    question: "How does `scanner.nextBigInteger()` parse massive integers beyond 64 bits?",
    shortAnswer: "It parses integer tokens of arbitrary length directly into `java.math.BigInteger`.",
    explanation: "When reading numbers with hundreds of digits (e.g. RSA cryptography keys), `nextBigInteger()` avoids 64-bit `long` overflow.",
    hint: "BigInteger parses arbitrary precision integers.",
    level: "intermediate",
    codeExample: "Scanner sc = new Scanner(\"999999999999999999999999999999\");\nBigInteger big = sc.nextBigInteger();"
  },
  {
    question: "Can `Scanner` be used with `try-with-resources` when reading multiple records?",
    shortAnswer: "Yes, when wrapping non-`System.in` sources (like files or socket streams).",
    explanation: "`Scanner` implements `AutoCloseable`, ensuring streams are closed when processing finishes.",
    hint: "AutoCloseable support.",
    level: "basic",
    codeExample: "try (Scanner sc = new Scanner(file)) {\n  while (sc.hasNext()) { process(sc.next()); }\n}"
  },
  {
    question: "What is the result of `scanner.ioException()`?",
    shortAnswer: "Returns the `IOException` last thrown by the scanner's underlying `Readable`, or `null` if none occurred.",
    explanation: "`Scanner` catches IOExceptions internally; `ioException()` lets developers check if a hardware/network read error happened.",
    hint: "Inspects suppressed IOExceptions.",
    level: "advanced",
    codeExample: "if (scanner.ioException() != null) {\n  System.err.println(\"I/O Error: \" + scanner.ioException().getMessage());\n}"
  },
  {
    question: "What does `scanner.tokens()` return in Java 9+?",
    shortAnswer: "A `Stream<String>` of all remaining delimiter-separated tokens in the scanner.",
    explanation: "Introduced in Java 9, `scanner.tokens()` integrates `Scanner` seamlessly with the Java Stream API for functional processing (`filter`, `map`, `collect`).",
    hint: "Java 9 Stream API integration.",
    level: "advanced",
    codeExample: "List<String> words = scanner.tokens().filter(s → s.length() > 5).toList();"
  },
  {
    question: "What does `scanner.findAll(Pattern pattern)` return in Java 9+?",
    shortAnswer: "A `Stream<MatchResult>` of all regex matches found in the input stream.",
    explanation: "Allows streaming regex pattern matches across large text files or streams without manual while-loops.",
    hint: "Streams MatchResults matching a pattern.",
    level: "expert",
    codeExample: "Pattern emailPattern = Pattern.compile(\"[\\\\w.]+@[\\\\w.]+\");\nList<String> emails = scanner.findAll(emailPattern).map(MatchResult::group).toList();"
  },
  {
    question: "Can `Scanner` parse infinity or NaN tokens?",
    shortAnswer: "Yes, `scanner.nextDouble()` recognizes \"Infinity\", \"+Infinity\", \"-Infinity\", and \"NaN\" in US locale.",
    explanation: "The IEEE 754 special values are matched by standard floating-point scanner regex.",
    hint: "Recognizes Infinity and NaN.",
    level: "advanced",
    codeExample: "Scanner sc = new Scanner(\"Infinity NaN\");\ndouble inf = sc.nextDouble(); // Double.POSITIVE_INFINITY\ndouble nan = sc.nextDouble(); // Double.NaN"
  },
  {
    question: "What is the recommended design pattern for interactive user input loops?",
    shortAnswer: "Prompt $\\to$ Validate with `hasNextXxx()` $\\to$ Consume with `nextXxx()` $\\to$ Handle errors gracefully.",
    explanation: "This loop pattern guarantees that the program never crashes on invalid user typing.",
    hint: "Defensive prompt-validate-read loop.",
    level: "basic",
    codeExample: "int age = 0;\nwhile (true) {\n  System.out.print(\"Enter age: \");\n  if (scanner.hasNextInt()) { age = scanner.nextInt(); break; }\n  System.out.println(\"Please enter a valid number!\");\n  scanner.next(); // Discard\n}"
  },
  {
    question: "How do you read a full Indian Rupee currency amount with symbols using `Scanner`?",
    shortAnswer: "Read as a String, strip the '₹' or ',' symbols, and parse with `BigDecimal` or `Double.parseDouble()`.",
    explanation: "Because users might enter '₹15,000.00', reading as raw text and sanitizing guarantees robust input handling.",
    hint: "Read String, sanitize non-digit characters, and parse.",
    level: "intermediate",
    codeExample: "String feeInput = scanner.next(); // '₹15,000'\nString clean = feeInput.replace(\"₹\", \"\").replace(\",\", \"\");\ndouble fee = Double.parseDouble(clean);"
  },
  {
    question: "What is the ultimate takeaway of Topic 16 for Java developers?",
    shortAnswer: "Knowing which `Scanner` method to choose (`next()` for words, `nextLine()` for sentences/addresses, `nextInt()`/`nextDouble()` for primitives, `nextBigDecimal()` for money) ensures clean, bug-free data ingestion.",
    explanation: "Selecting the correct parsing method and pairing it with defensive `hasNextXxx()` validation prevents unexpected input truncation, type mismatches, and application crashes.",
    hint: "Match the Scanner method to the exact semantic nature of the data.",
    level: "basic",
    codeExample: "// Summary: next() for word, nextLine() for line, nextInt() for int, nextBigDecimal() for money"
  }
];

export default questions;
