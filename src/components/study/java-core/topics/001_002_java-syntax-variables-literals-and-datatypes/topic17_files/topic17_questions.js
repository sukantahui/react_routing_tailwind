/**
 * Topic 17: Resolving the classic Scanner newline skip bug (nextInt followed by nextLine)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What causes the classic 'Scanner newline skip bug' when `scanner.nextInt()` is followed by `scanner.nextLine()`?",
    shortAnswer: "`nextInt()` parses and consumes only the integer digits, leaving the trailing newline character (`\\n`) in the input buffer.",
    explanation: "When user types a number like '101' and presses Enter, two elements are placed on the stream: '101' and '\\n'. `nextInt()` consumes '101'. The subsequent `nextLine()` immediately sees the leftover '\\n', consumes it, and returns an empty string `\"\"` without prompting the user.",
    hint: "nextInt() leaves the newline \\n unconsumed in the buffer.",
    level: "basic",
    codeExample: "int id = sc.nextInt(); // Consumes 101, leaves \\n\nString name = sc.nextLine(); // Consumes leftover \\n and returns \"\" immediately!"
  },
  {
    question: "What is Solution 1 (The Buffer Flushing Call) to resolve the newline skip bug?",
    shortAnswer: "Insert a dummy `scanner.nextLine()` call immediately after `scanner.nextInt()` to consume and discard the leftover newline.",
    explanation: "Calling `scanner.nextLine();` consumes the trailing `\\n`. The subsequent `scanner.nextLine()` is then free to wait for and capture the user's actual text input.",
    hint: "Add a dummy scanner.nextLine() to flush the newline.",
    level: "basic",
    codeExample: "int id = sc.nextInt();\nsc.nextLine(); // BUFFER FLUSH: Consumes leftover \\n\nString name = sc.nextLine(); // Prompts cleanly!"
  },
  {
    question: "What is Solution 2 (Line-First Parsing) to resolve the newline skip bug?",
    shortAnswer: "Read all inputs using `scanner.nextLine()` and parse numbers explicitly using `Integer.parseInt(scanner.nextLine().trim())`.",
    explanation: "Reading full lines for all inputs ensures that the input buffer never has orphaned `\\n` characters, eliminating the bug completely.",
    hint: "Use Integer.parseInt(scanner.nextLine()) for all numeric inputs.",
    level: "intermediate",
    codeExample: "int id = Integer.parseInt(sc.nextLine().trim());\nString name = sc.nextLine(); // No newline bug possible!"
  },
  {
    question: "Does the newline skip bug also occur with `nextDouble()`, `nextFloat()`, `nextLong()`, and `nextBoolean()`?",
    shortAnswer: "Yes, all token-based `nextXxx()` methods consume only their target token and leave the trailing newline in the buffer.",
    explanation: "Whenever ANY token-based reading method (`next()`, `nextInt()`, `nextDouble()`, `nextLong()`, `nextBoolean()`) is followed by `nextLine()`, the trailing newline will be swallowed by `nextLine()`.",
    hint: "All token-based nextXxx() methods cause this issue before nextLine().",
    level: "basic",
    codeExample: "double fee = sc.nextDouble();\nsc.nextLine(); // Required flush before nextLine()!\nString address = sc.nextLine();"
  },
  {
    question: "Why does the newline bug NOT occur when `nextInt()` is followed by another `nextInt()` or `next()`?",
    shortAnswer: "Because `nextInt()` and `next()` automatically skip leading whitespace and newlines to locate the next token.",
    explanation: "Token-based methods (`nextInt`, `next`, `nextDouble`) treat `\\n` as a whitespace delimiter and discard it automatically. Only `nextLine()` halts immediately upon encountering `\\n`.",
    hint: "next() and nextInt() automatically skip leading whitespace/newlines.",
    level: "intermediate",
    codeExample: "int roll = sc.nextInt(); // Leaves \\n\nint age = sc.nextInt();  // Automatically skips leading \\n and reads age!"
  },
  {
    question: "What happens if a user types multiple tokens on the same line (e.g. `101 Swadeep`) before pressing Enter?",
    shortAnswer: "`nextInt()` consumes `101`, and `nextLine()` reads `\" Swadeep\"` (including the leading space).",
    explanation: "`nextLine()` reads whatever remains on the current line. If text exists between the integer and the newline, `nextLine()` returns that text rather than an empty string.",
    hint: "nextLine() captures whatever remains on the line.",
    level: "intermediate",
    codeExample: "// Input: '101 Swadeep'\nint id = sc.nextInt();       // 101\nString rest = sc.nextLine(); // ' Swadeep'"
  },
  {
    question: "Why does `scanner.next()` not suffer from the newline skip issue?",
    shortAnswer: "Because `next()` reads single word tokens and skips all leading whitespace (including newlines).",
    explanation: "If you only need single-word inputs (without spaces), using `scanner.next()` instead of `scanner.nextLine()` completely bypasses the newline trap.",
    hint: "next() skips leading newlines automatically.",
    level: "basic",
    codeExample: "int roll = sc.nextInt();\nString firstName = sc.next(); // Safe without extra nextLine() flush"
  },
  {
    question: "What exception can `Integer.parseInt(scanner.nextLine().trim())` throw if the user enters non-digit text?",
    shortAnswer: "`java.lang.NumberFormatException`.",
    explanation: "Unlike `Scanner.nextInt()` which throws `InputMismatchException`, `Integer.parseInt()` throws `NumberFormatException` when passed an invalid numeric string.",
    hint: "NumberFormatException on invalid integer string.",
    level: "intermediate",
    codeExample: "try {\n  int roll = Integer.parseInt(sc.nextLine().trim());\n} catch (NumberFormatException e) {\n  System.out.println(\"Invalid integer entered!\");\n}"
  },
  {
    question: "How do you build a robust helper method to read integer console inputs safely?",
    shortAnswer: "Loop `nextLine()` with `Integer.parseInt()` inside a `try-catch` block until a valid integer is entered.",
    explanation: "This helper method encapsulates prompt display, newline handling, and exception recovery in one clean function.",
    hint: "Loop + try-catch + parseInt(nextLine()).",
    level: "intermediate",
    codeExample: "public static int readInt(Scanner sc, String prompt) {\n  while (true) {\n    System.out.print(prompt);\n    try { return Integer.parseInt(sc.nextLine().trim()); }\n    catch (NumberFormatException e) { System.out.println(\"Invalid input! Please enter a number.\"); }\n  }\n}"
  },
  {
    question: "Can `scanner.skip(\"\\r?\\n\")` be used instead of a dummy `scanner.nextLine()` to consume the newline?",
    shortAnswer: "Yes, `scanner.skip(\"\\r?\\n\")` explicitly skips the Windows (`\\r\\n`) or Unix (`\\n`) line separator.",
    explanation: "`skip()` matches and consumes the regex line ending without assigning it to a String variable.",
    hint: "skip(\"\\r?\\n\") consumes line endings via regex.",
    level: "advanced",
    codeExample: "int roll = sc.nextInt();\nsc.skip(\"\\r?\\n\"); // Regex skips newline\nString name = sc.nextLine();"
  },
  {
    question: "What is the internal state of the Scanner buffer when the user types `42\\n`?",
    shortAnswer: "The buffer contains characters `['4', '2', '\\n']` with the read pointer at index 0.",
    explanation: "After `nextInt()` executes, the pointer advances to index 2 (pointing directly at `'\\n'`).",
    hint: "Pointer stops right before \\n.",
    level: "advanced",
    codeExample: "// Buffer: ['4', '2', '\\n'] → nextInt() consumes '4', '2' → '\\n' remains at head"
  },
  {
    question: "Why is `Integer.parseInt(scanner.nextLine())` preferred in competitive programming and automated grading systems?",
    shortAnswer: "Because automated judges may format inputs with unexpected trailing whitespace and newlines that confuse token-based parsers.",
    explanation: "Reading full lines and trimming whitespace avoids subtle desynchronization between test input feeds and parser buffers.",
    hint: "Line-first parsing is deterministic across online judges.",
    level: "advanced",
    codeExample: "int n = Integer.parseInt(sc.nextLine().trim());"
  },
  {
    question: "What happens if a user enters multiple blank lines before typing their name when using `scanner.nextLine()`?",
    shortAnswer: "Each blank line results in an empty string `\"\"` being returned immediately.",
    explanation: "`nextLine()` considers an immediate newline as a valid empty line (0 characters).",
    hint: "Blank lines produce empty strings in nextLine().",
    level: "basic",
    codeExample: "String line = sc.nextLine(); // Returns \"\" for blank Enter press"
  },
  {
    question: "How can you read a non-empty line of text from a user using `Scanner`?",
    shortAnswer: "Loop `nextLine()` until `line.trim().length() > 0`.",
    explanation: "A loop ensures that accidental Enter presses and blank lines are ignored until the user enters actual text.",
    hint: "Loop until line.trim() is non-empty.",
    level: "basic",
    codeExample: "String name = \"\";\nwhile (name.trim().isEmpty()) {\n  System.out.print(\"Enter Name: \");\n  name = sc.nextLine();\n}"
  },
  {
    question: "Does the newline bug occur when reading from a disk File using `Scanner`?",
    shortAnswer: "Yes, file input streams follow the exact same token buffering rules as `System.in`.",
    explanation: "If a structured text file contains an integer on line 1 and a description on line 2, calling `nextInt()` followed by `nextLine()` will read an empty string from the file.",
    hint: "File streams behave identically to console streams in Scanner.",
    level: "intermediate",
    codeExample: "Scanner fileSc = new Scanner(new File(\"data.txt\"));\nint count = fileSc.nextInt();\nfileSc.nextLine(); // Required to consume file newline\nString desc = fileSc.nextLine();"
  },
  {
    question: "What does `scanner.hasNextLine()` return when the cursor is positioned directly on a trailing `\\n`?",
    shortAnswer: "`true`.",
    explanation: "Because there is a newline character available to be consumed, `hasNextLine()` confirms that a line boundary exists.",
    hint: "A trailing newline constitutes a valid line boundary.",
    level: "intermediate",
    codeExample: "if (scanner.hasNextLine()) { String s = scanner.nextLine(); }"
  },
  {
    question: "Why does `scanner.nextBigDecimal()` also require a newline flush before `nextLine()`?",
    shortAnswer: "Because `nextBigDecimal()` is a token-based method that leaves the trailing newline in the buffer.",
    explanation: "Just like `nextInt()`, `nextBigDecimal()` parses only the number token, leaving `\\n` for the next line reader to swallow.",
    hint: "nextBigDecimal() is a token parser.",
    level: "intermediate",
    codeExample: "BigDecimal fee = sc.nextBigDecimal();\nsc.nextLine(); // Flush newline!\nString remarks = sc.nextLine();"
  },
  {
    question: "What happens if you call `scanner.nextLine()` when the buffer is completely empty at the end of input?",
    shortAnswer: "`java.util.NoSuchElementException` is thrown.",
    explanation: "When no more characters or line boundaries exist (EOF), `nextLine()` cannot proceed and throws `NoSuchElementException`.",
    hint: "NoSuchElementException at End-Of-File (EOF).",
    level: "basic",
    codeExample: "// At EOF:\n// sc.nextLine(); // THROWS NoSuchElementException"
  },
  {
    question: "How does `BufferedReader.readLine()` compare with `Scanner.nextLine()` regarding the newline bug?",
    shortAnswer: "`BufferedReader` only reads full lines via `readLine()`, so it never suffers from token-level newline leftover bugs.",
    explanation: "Because `BufferedReader` lacks token methods like `nextInt()`, developers always parse explicitly with `Integer.parseInt(br.readLine())`, naturally avoiding the bug.",
    hint: "BufferedReader is inherently line-oriented.",
    level: "advanced",
    codeExample: "BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nint id = Integer.parseInt(br.readLine());\nString name = br.readLine(); // Always clean!"
  },
  {
    question: "Can `scanner.findWithinHorizon(\"\\n\", 1)` be used to flush the newline?",
    shortAnswer: "Yes, it searches and consumes the newline within a 1-character lookahead horizon.",
    explanation: "While technically possible, `scanner.nextLine()` or `scanner.skip(\"\\r?\\n\")` are far more readable and idiomatic.",
    hint: "scanner.nextLine() remains the cleanest flushing idiom.",
    level: "expert",
    codeExample: "sc.nextLine(); // Preferred and idiomatic"
  },
  {
    question: "What is the effect of calling `sc.nextLine()` multiple times when only one newline was present?",
    shortAnswer: "The first `nextLine()` consumes the newline; the second `nextLine()` blocks and waits for the user to type a new line.",
    explanation: "If you call an extra `nextLine()` when no newline was pending, the program will pause and wait unexpectedly for user input.",
    hint: "Only call flushing nextLine() when a token method left a pending newline.",
    level: "intermediate",
    codeExample: "// Only flush when transitioning from token method (nextInt) to nextLine()"
  },
  {
    question: "Why does the sequence `nextLine()` followed by `nextInt()` NOT cause a newline bug?",
    shortAnswer: "Because `nextLine()` consumes its own newline, and `nextInt()` automatically skips any whitespace before the next number.",
    explanation: "The issue only occurs in the reverse order: Token Method $\\to$ `nextLine()`.",
    hint: "Line → Token order is safe; Token → Line order causes the bug.",
    level: "basic",
    codeExample: "String name = sc.nextLine(); // Consumes line and newline\nint roll = sc.nextInt();     // Clean and works perfectly!"
  },
  {
    question: "How do you handle trailing whitespace around numbers when using `Integer.parseInt()`?",
    shortAnswer: "Always chain `.trim()`: `Integer.parseInt(sc.nextLine().trim())`.",
    explanation: "If a user accidentally types `\" 101 \"`, `Integer.parseInt()` without `.trim()` throws `NumberFormatException`.",
    hint: "Always .trim() before parsing.",
    level: "basic",
    codeExample: "int age = Integer.parseInt(scanner.nextLine().trim());"
  },
  {
    question: "What is the recommended rule of thumb for beginners writing interactive console menus in Java?",
    shortAnswer: "Whenever you call `nextInt()`, `nextDouble()`, or `next()`, immediately follow it with `scanner.nextLine();` if you plan to read text with `nextLine()` afterwards.",
    explanation: "Memorizing this rule eliminates 99% of console input frustration for students.",
    hint: "Rule: nextInt() + nextLine() = Flush required!",
    level: "basic",
    codeExample: "int choice = sc.nextInt();\nsc.nextLine(); // Flush\nString title = sc.nextLine();"
  },
  {
    question: "Can an interactive console input loop be built entirely with `next()` and no `nextLine()`?",
    shortAnswer: "Yes, provided none of the input fields (names, descriptions, addresses) contain spaces.",
    explanation: "If data fields are single words (e.g. usernames without spaces), `next()` handles both strings and whitespace skipping automatically.",
    hint: "next() works if inputs contain no spaces.",
    level: "basic",
    codeExample: "String username = sc.next();\nint pin = sc.nextInt();"
  },
  {
    question: "What happens if a user enters `101\\r\\n` on a Windows console?",
    shortAnswer: "`nextInt()` consumes `101`; `nextLine()` consumes both `\\r` and `\\n` together.",
    explanation: "Java's `nextLine()` handles Windows CRLF (`\\r\\n`) and Unix LF (`\\n`) transparently.",
    hint: "nextLine() transparently consumes both CRLF and LF.",
    level: "intermediate",
    codeExample: "// Windows \\r\\n is consumed cleanly by nextLine()"
  },
  {
    question: "Why do automated test suites often fail on Scanner console assignments?",
    shortAnswer: "Because test inputs pipe entire strings at once, and unhandled newlines cause `nextLine()` to read empty strings.",
    explanation: "Automated grading bots supply inputs as a single stream where newline positioning is rigid. Missing a newline flush causes immediate test case failure.",
    hint: "Automated test pipes expose unhandled newlines instantly.",
    level: "advanced",
    codeExample: "// Automated tests pipe \"101\\nSwadeep\\n\" directly into System.in"
  },
  {
    question: "How can you verify that a buffer flush is actually needed before calling `nextLine()`?",
    shortAnswer: "In standard console code, if the previous call was `next()`, `nextInt()`, or `nextDouble()`, a flush is ALWAYS needed.",
    explanation: "Token methods never consume the trailing delimiter.",
    hint: "Token method followed by nextLine() always requires a flush.",
    level: "basic",
    codeExample: "// Check: Did I just call nextInt()? If yes, call sc.nextLine() before nextLine()!"
  },
  {
    question: "What is the ultimate takeaway of Topic 17 for Java software developers?",
    shortAnswer: "Mastering the Scanner newline skip bug transforms a frustrating beginner pitfall into a solved problem via either the buffer flush (`sc.nextLine()`) or line-first parsing (`Integer.parseInt(sc.nextLine())`).",
    explanation: "Understanding how the input buffer manages tokens versus line delimiters ensures that console applications, automated test suites, and student registration forms run smoothly and reliably.",
    hint: "Master the buffer flush and line-first parsing patterns.",
    level: "basic",
    codeExample: "// Summary: nextInt(); scanner.nextLine(); String name = scanner.nextLine();"
  },
  {
    question: "In the Coder & AccoTax Barrackpore syllabus, why is Topic 17 taught immediately after Scanner methods?",
    shortAnswer: "Because every student encounters this bug during their very first multi-field console project.",
    explanation: "Teaching the root cause (unconsumed `\\n` in stream buffer) demystifies the behavior and builds strong conceptual debugging instincts.",
    hint: "Immediate practical mastery of the most common Java beginner trap.",
    level: "basic",
    codeExample: "// Built into Barrackpore foundation curriculum by Sukanta Hui"
  }
];

export default questions;
