const questions = [
  {
    question: "What is the exact difference between `System.out.print()` and `System.out.println()`?",
    shortAnswer: "`println()` appends a platform-specific line separator after the text; `print()` leaves the cursor on the same line.",
    explanation: "System.out.println() flushes a newline character sequence (\\n or \\r\\n), moving subsequent output to the beginning of the next line.",
    hint: "The 'ln' stands for line.",
    level: "basic",
    codeExample: "System.out.print(\"A\");\nSystem.out.print(\"B\"); // Outputs \"AB\"\nSystem.out.println(\"C\"); // Outputs \"C\\n\""
  },
  {
    question: "In the expression `System.out.println()`, what is `System`, what is `out`, and what is `println`?",
    shortAnswer: "`System` is a final class in java.lang; `out` is a public static PrintStream field; `println` is an overloaded method on PrintStream.",
    explanation: "Understanding this structure demystifies Java's object model: accessing a static member on class System to invoke an instance method on a PrintStream object.",
    hint: "Class -> Static Field (PrintStream instance) -> Method.",
    level: "basic",
    codeExample: "// java.lang.System.out.println(\"Hello\");"
  },
  {
    question: "What is the purpose of `System.out.printf()` in Java?",
    shortAnswer: "To print formatted text using format specifiers (%s, %d, %f, %n) similar to C's printf.",
    explanation: "printf allows aligning columns, controlling decimal precision (e.g. `%.2f`), and formatting integers with commas (`%,d`).",
    hint: "Formatted string output.",
    level: "basic",
    codeExample: "System.out.printf(\"Name: %s, Age: %d%n\", \"Swadeep\", 21);"
  },
  {
    question: "Why should you use `%n` instead of `\\n` inside a `printf()` format string?",
    shortAnswer: "`%n` is platform-independent (outputs \\r\\n on Windows and \\n on Linux/Mac); `\\n` is hardcoded UNIX newline.",
    explanation: "Using `%n` ensures formatted text displays correctly on all operating systems without platform line ending bugs.",
    hint: "Cross-platform newline specifier in printf.",
    level: "intermediate",
    codeExample: "System.out.printf(\"Line 1%nLine 2%n\"); // Portable across Windows and Linux"
  },
  {
    question: "What does the format specifier `%.2f` do when formatting floating-point numbers?",
    shortAnswer: "It rounds and formats the floating-point number to exactly 2 decimal places.",
    explanation: "For example, `System.out.printf(\"%.2f\", 45.6789)` prints `45.68`.",
    hint: "Precision specifier for floats/doubles.",
    level: "basic",
    codeExample: "System.out.printf(\"Price: Rs.%.2f%n\", 99.456); // Prints Rs.99.46"
  },
  {
    question: "What does `System.out.printf(\"%,d\", 1000000)` output?",
    shortAnswer: "`1,000,000` (formats integer with locale-specific thousand grouping commas).",
    explanation: "The comma `,` flag enables thousand grouping separators according to the default JVM Locale.",
    hint: "Thousand grouping separator flag.",
    level: "basic",
    codeExample: "System.out.printf(\"Total: %,d%n\", 50000000); // 50,000,000"
  },
  {
    question: "What does `System.out.printf(\"%05d\", 42)` output?",
    shortAnswer: "`00042` (pads with leading zeros to reach a minimum field width of 5).",
    explanation: "The `0` flag specifies zero-padding, and `5` specifies the total minimum character width.",
    hint: "Zero-padding width flag.",
    level: "intermediate",
    codeExample: "System.out.printf(\"Invoice: %06d%n\", 123); // Invoice: 000123"
  },
  {
    question: "What is the difference between `%10s` and `%-10s` in printf column formatting?",
    shortAnswer: "`%10s` is right-aligned in a 10-character width; `%-10s` is left-aligned in a 10-character width.",
    explanation: "The minus `-` flag left-justifies text within the specified column width, which is essential for creating clean tabular reports.",
    hint: "Right-aligned vs Left-aligned column width.",
    level: "intermediate",
    codeExample: "System.out.printf(\"%-15s %5d%n\", \"Swadeep\", 95);\nSystem.out.printf(\"%-15s %5d%n\", \"Abhronila\", 100);"
  },
  {
    question: "Can you call `System.out.println()` without any arguments? What happens?",
    shortAnswer: "Yes, it simply prints a blank newline.",
    explanation: "`println()` has a zero-argument overload that writes a platform line separator to the console.",
    hint: "Outputs an empty line.",
    level: "basic",
    codeExample: "System.out.println(); // Prints empty newline"
  },
  {
    question: "Can you call `System.out.print()` without any arguments?",
    shortAnswer: "No! `print()` does not have a zero-argument overload and causes a compile-time error.",
    explanation: "`print()` requires at least one parameter (primitive, String, or Object) to convert to text.",
    hint: "print() must receive an argument.",
    level: "basic",
    codeExample: "// System.out.print(); -> COMPILE ERROR: no suitable method found for print()"
  },
  {
    question: "What does `System.out.println((Object) null)` print?",
    shortAnswer: "The literal text string `\"null\"`.",
    explanation: "`PrintStream.println(Object)` uses `String.valueOf(obj)`, which returns the 4-character string `\"null\"` when passed null.",
    hint: "Prints the literal string 'null'.",
    level: "basic",
    codeExample: "String s = null;\nSystem.out.println(s); // Outputs \"null\""
  },
  {
    question: "What does `System.out.println(new char[]{'J', 'a', 'v', 'a'})` output?",
    shortAnswer: "`Java` (PrintStream has a specialized overload for char arrays that prints characters directly).",
    explanation: "Unlike other arrays (int[], Object[]) which print `[I@hashcode`, `char[]` invokes `println(char[])` which prints the sequence of characters directly.",
    hint: "Specialized char[] overload in PrintStream.",
    level: "advanced",
    codeExample: "char[] arr = {'H', 'i'};\nSystem.out.println(arr); // Prints \"Hi\""
  },
  {
    question: "What does `System.out.println(new int[]{1, 2, 3})` output?",
    shortAnswer: "A memory hash identifier like `[I@15db9742` instead of array elements.",
    explanation: "`int[]` does not override `toString()`. To print array elements, use `Arrays.toString(arr)`.",
    hint: "Use Arrays.toString() to print array contents.",
    level: "basic",
    codeExample: "int[] arr = {1, 2, 3};\nSystem.out.println(Arrays.toString(arr)); // Prints [1, 2, 3]"
  },
  {
    question: "What is the difference between `System.out` and `System.err`?",
    shortAnswer: "`System.out` writes to standard output (STDOUT); `System.err` writes to standard error (STDERR), typically displayed in red in IDEs.",
    explanation: "In CLI scripts and servers, STDOUT and STDERR streams can be redirected independently (e.g. `java App > out.log 2> err.log`).",
    hint: "STDOUT vs STDERR streams.",
    level: "basic",
    codeExample: "System.out.println(\"Normal message\");\nSystem.err.println(\"Error alert message!\");"
  },
  {
    question: "How does `System.setOut(PrintStream)` allow redirecting console output to a file inside code?",
    shortAnswer: "It replaces the default `System.out` PrintStream with a custom file PrintStream.",
    explanation: "Calling `System.setOut(new PrintStream(new FileOutputStream(\"output.txt\")))` routes all subsequent `System.out.println()` calls into the specified file.",
    hint: "Redirects standard output programmatically.",
    level: "intermediate",
    codeExample: "System.setOut(new PrintStream(\"log.txt\"));\nSystem.out.println(\"Written to log.txt!\");"
  },
  {
    question: "What is `System.out.format()` and how does it relate to `System.out.printf()`?",
    shortAnswer: "They are 100% identical in functionality.",
    explanation: "`printf()` simply delegates to `format()`. Both methods accept the same format string and argument list.",
    hint: "printf and format are identical.",
    level: "basic",
    codeExample: "System.out.format(\"Value: %d%n\", 10); // Same as printf"
  },
  {
    question: "What is `String.format()` and how is it used when you want a formatted string without printing immediately?",
    shortAnswer: "`String.format()` returns the formatted String object without writing to the console.",
    explanation: "Use `String.format()` when you need to construct a formatted string for logging, storing in a database, or setting on a UI label.",
    hint: "Returns a formatted String instead of printing.",
    level: "basic",
    codeExample: "String message = String.format(\"Student %s scored %d\", \"Tuhina\", 98);"
  },
  {
    question: "What exception is thrown if you pass an invalid format specifier type to `printf` (e.g. `System.out.printf(\"%d\", \"hello\")`)?",
    shortAnswer: "`java.util.IllegalFormatConversionException` (an unchecked RuntimeException).",
    explanation: "Format specifier `%d` requires an integer (byte, short, int, long, BigInteger). Passing a String mismatches the expected type.",
    hint: "IllegalFormatConversionException.",
    level: "intermediate",
    codeExample: "// System.out.printf(\"%d\", \"text\"); -> Throws IllegalFormatConversionException: d != java.lang.String"
  },
  {
    question: "What exception is thrown if there are fewer arguments passed than format specifiers (e.g. `System.out.printf(\"%s %s\", \"one\")`)?",
    shortAnswer: "`java.util.MissingFormatArgumentException`.",
    explanation: "The format string expects two arguments, but only one was provided.",
    hint: "MissingFormatArgumentException.",
    level: "intermediate",
    codeExample: "// System.out.printf(\"%s %s\", \"A\"); -> Throws MissingFormatArgumentException"
  },
  {
    question: "How do you escape the percent `%` symbol inside a `printf` format string?",
    shortAnswer: "Use double percent signs: `%%`.",
    explanation: "`System.out.printf(\"Discount = %d%%%n\", 20)` outputs `Discount = 20%`.",
    hint: "Use %% to print literal %.",
    level: "basic",
    codeExample: "System.out.printf(\"Success Rate: %d%%%n\", 99); // Prints \"Success Rate: 99%\""
  },
  {
    question: "What does the `+` flag in `printf` do for numeric output (e.g. `%+d`)?",
    shortAnswer: "It forces the display of a positive `+` sign for positive numbers and `-` sign for negative numbers.",
    explanation: "`System.out.printf(\"%+d\", 50)` outputs `+50`.",
    hint: "Explicit plus sign flag.",
    level: "intermediate",
    codeExample: "System.out.printf(\"Delta: %+d%n\", 5); // Prints \"+5\""
  },
  {
    question: "What does the `(` flag in `printf` do for accounting numbers (e.g. `%(d`)?",
    shortAnswer: "It encloses negative numbers in parentheses instead of printing a minus sign.",
    explanation: "In financial ledgers, `System.out.printf(\"%(d\", -500)` outputs `(500)`.",
    hint: "Accounting parenthesis for negatives.",
    level: "intermediate",
    codeExample: "System.out.printf(\"Balance: %(,.2f%n\", -1250.50); // Balance: (1,250.50)"
  },
  {
    question: "How does `System.out.println()` affect performance in high-throughput enterprise systems?",
    shortAnswer: "It is a synchronized, blocking I/O call that degrades multi-threaded throughput if placed in critical loops.",
    explanation: "`PrintStream.println` synchronizes on the stream and involves kernel I/O context switching. In high-frequency systems, use asynchronous logging frameworks (SLF4J / Logback) instead.",
    hint: "Synchronized blocking I/O bottleneck.",
    level: "advanced",
    codeExample: "// In production: logger.info(\"...\"); rather than System.out.println();"
  },
  {
    question: "What is String Concatenation precedence in `System.out.println(10 + 20 + \"Hello\" + 10 + 20)`?",
    shortAnswer: "It outputs `30Hello1020`.",
    explanation: "Evaluated left to right: `10 + 20` is arithmetic (`30`), `30 + \"Hello\"` is string concatenation (`\"30Hello\"`), and subsequent `+` operations become string concatenation.",
    hint: "Left-to-right evaluation: numbers add until a String appears.",
    level: "intermediate",
    codeExample: "System.out.println(10 + 20 + \"Hello\" + 10 + 20); // Prints \"30Hello1020\""
  },
  {
    question: "How do you force numeric addition after a string in a println expression?",
    shortAnswer: "Enclose the numeric addition in parentheses: `System.out.println(\"Total: \" + (10 + 20))`.",
    explanation: "Parentheses have higher precedence, forcing `10 + 20 = 30` before string concatenation, outputting `Total: 30`.",
    hint: "Use parentheses to control operator precedence.",
    level: "basic",
    codeExample: "System.out.println(\"Sum = \" + (5 + 5)); // Prints \"Sum = 10\""
  },
  {
    question: "What does the `%x` or `%X` format specifier do in `printf`?",
    shortAnswer: "Formats an integer as hexadecimal in lowercase (%x) or uppercase (%X).",
    explanation: "`System.out.printf(\"%X\", 255)` outputs `FF`.",
    hint: "Hexadecimal format specifier.",
    level: "basic",
    codeExample: "System.out.printf(\"Hex: 0x%X%n\", 255); // Hex: 0xFF"
  },
  {
    question: "What does `%e` format specifier do in `printf`?",
    shortAnswer: "Formats a floating-point number in computer scientific exponential notation (e.g. `1.500000e+03`).",
    explanation: "Used for scientific data formatting with exponential powers of 10.",
    hint: "Scientific exponential notation.",
    level: "intermediate",
    codeExample: "System.out.printf(\"%e%n\", 1500000.0); // 1.500000e+06"
  },
  {
    question: "What is `System.console()` and how is it used for secure password input?",
    shortAnswer: "A class providing access to the native character-based console device with secure `readPassword()` method.",
    explanation: "`System.console().readPassword()` masks user input so typed passwords are not visible on the monitor screen.",
    hint: "Secure password masking on terminal.",
    level: "intermediate",
    codeExample: "char[] pwd = System.console().readPassword(\"Enter password: \");"
  },
  {
    question: "Why does `System.out.flush()` exist?",
    shortAnswer: "To immediately force any buffered output bytes to be written out to the physical console or underlying stream.",
    explanation: "PrintStream buffers output in memory for efficiency. Calling `flush()` guarantees characters appear on screen without waiting for buffer fill.",
    hint: "Flushes memory buffer to physical display.",
    level: "intermediate",
    codeExample: "System.out.print(\"Processing...\");\nSystem.out.flush();"
  },
  {
    question: "How does mastering `print`, `println`, and `printf` benefit your coding precision?",
    shortAnswer: "It enables clean CLI tool authoring, formatted tabular data presentation, and rapid debugging output.",
    explanation: "Knowing when to use `print` for prompts, `println` for structured logs, and `printf` for aligned reports produces professional, classroom-friendly console applications.",
    hint: "Precision in console presentation and debugging.",
    level: "basic",
    codeExample: "// Formatting Mastery -> Clean, Professional Console Output."
  }
];

export default questions;
