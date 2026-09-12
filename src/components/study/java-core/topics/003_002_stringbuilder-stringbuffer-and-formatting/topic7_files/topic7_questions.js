const topic7_questions = [
  {
    "question": "What is the difference between System.out.printf() and String.format()?",
    "shortAnswer": "System.out.printf() writes formatted text directly to the console standard output stream; String.format() creates and returns a new formatted String in memory.",
    "explanation": "Both use the exact same formatting engine (java.util.Formatter), but printf() prints to stdout while String.format() yields a String for storage or further processing.",
    "hint": "Direct console print vs returning a String object.",
    "level": "basic",
    "codeExample": "System.out.printf(\"Count: %d%n\", 5); // Prints to console\nString s = String.format(\"Count: %d\", 5); // Returns String"
  },
  {
    "question": "What is the general syntax structure of a format specifier in Java?",
    "shortAnswer": "%[argument_index$][flags][width][.precision]conversion",
    "explanation": "Everything between '%' and the conversion character (like 'd' or 's') is optional control metadata governing indexing, padding, width, and decimals.",
    "hint": "Index, Flags, Width, Precision, Conversion.",
    "level": "moderate"
  },
  {
    "question": "What are the most common conversion specifier characters in Java?",
    "shortAnswer": "%s (String), %d (Decimal integer), %f (Floating-point), %c (Character), %b (Boolean), %x (Hexadecimal), %e (Scientific notation), %n (Platform newline).",
    "explanation": "These correspond to standard C-style printf format characters adapted to Java's rich type system.",
    "hint": "s=string, d=decimal int, f=float, c=char, b=boolean, x=hex, n=newline.",
    "level": "basic"
  },
  {
    "question": "Why should you ALWAYS use '%n' instead of '\\n' in format strings?",
    "shortAnswer": "Because '%n' generates the platform-specific line separator (\\r\\n on Windows, \\n on Linux/macOS).",
    "explanation": "'\\n' forces a Unix newline regardless of OS. '%n' queries System.lineSeparator(), ensuring proper multi-line rendering on all operating systems.",
    "hint": "%n is platform-independent newline.",
    "level": "basic",
    "codeExample": "System.out.printf(\"First%nSecond%n\"); // Universal newline"
  },
  {
    "question": "What happens if you pass an incompatible type, such as String.format(\"%d\", \"hello\")?",
    "shortAnswer": "It throws an IllegalFormatConversionException at runtime.",
    "explanation": "Java verifies that the argument matches the expected conversion type. A string cannot be formatted with the integer specifier %d.",
    "hint": "IllegalFormatConversionException for type mismatches.",
    "level": "moderate"
  },
  {
    "question": "How does '%b' evaluate boolean values when passed non-boolean objects?",
    "shortAnswer": "If the argument is null, it prints \"false\"; if non-null, it prints \"true\" (unless it is already a Boolean instance, in which case it uses the boolean value).",
    "explanation": "This can be a dangerous gotcha! String.format(\"%b\", \"false\") actually prints \"true\" because the String \"false\" is a non-null object!",
    "hint": "Non-null objects evaluate to true under %b!",
    "level": "moderate",
    "codeExample": "System.out.printf(\"%b\", \"false\"); // PRINTS 'true'!"
  },
  {
    "question": "What does '%s' do when passed a null object reference?",
    "shortAnswer": "It prints the literal string \"null\" without throwing a NullPointerException.",
    "explanation": "Like String.valueOf(), the %s specifier safely formats null as \"null\".",
    "hint": "Safely outputs \"null\".",
    "level": "basic"
  },
  {
    "question": "How do you escape a literal percent sign '%' in a format string?",
    "shortAnswer": "Use double percent signs: '%%'.",
    "explanation": "Writing '%%' tells the formatter to output a single literal '%' character rather than interpreting it as the start of a specifier.",
    "hint": "Use %% to print %.",
    "level": "basic",
    "codeExample": "System.out.printf(\"Discount: %d%%\", 20); // Discount: 20%"
  },
  {
    "question": "What is the return type of System.out.printf()?",
    "shortAnswer": "java.io.PrintStream (returns System.out itself).",
    "explanation": "Returning the PrintStream allows chaining with other stream print methods if desired.",
    "hint": "Returns the PrintStream reference for chaining.",
    "level": "moderate"
  },
  {
    "question": "What is the modern instance method equivalent of String.format() introduced in Java 15?",
    "shortAnswer": "The 'formatted(Object... args)' instance method on java.lang.String.",
    "explanation": "Instead of String.format(\"Hello %s\", name), Java 15 allows \"Hello %s\".formatted(name). This is especially clean when working with Text Blocks.",
    "hint": "str.formatted(args) in Java 15+.",
    "level": "basic",
    "codeExample": "String msg = \"User: %s (id: %d)\".formatted(\"Alex\", 42);"
  },
  {
    "question": "What is the difference between %f and %e?",
    "shortAnswer": "%f formats numbers in standard decimal notation (e.g. 123.456); %e formats numbers in computerized scientific notation (e.g. 1.234560e+02).",
    "explanation": "Use %f for standard financial and everyday metrics; use %e for scientific, astronomical, or quantum computations.",
    "hint": "Standard decimal vs scientific exponent notation.",
    "level": "moderate"
  },
  {
    "question": "What does '%x' and '%X' format?",
    "shortAnswer": "Hexadecimal integer representation. %x outputs lowercase (e.g. 'ff'), and %X outputs uppercase (e.g. 'FF').",
    "explanation": "Useful for formatting memory addresses, color hex codes (#RRGGBB), or raw byte payloads.",
    "hint": "Lowercase hex vs uppercase hex.",
    "level": "basic",
    "codeExample": "System.out.printf(\"#%02X%02X%02X\", 255, 0, 128); // #FF0080"
  },
  {
    "question": "What happens if there are fewer arguments supplied than format specifiers?",
    "shortAnswer": "It throws a MissingFormatArgumentException at runtime.",
    "explanation": "If the format string has 3 specifiers (%s, %d, %f) but only 2 arguments are passed, formatting cannot complete.",
    "hint": "MissingFormatArgumentException when arguments are missing.",
    "level": "basic"
  },
  {
    "question": "What happens if there are MORE arguments supplied than format specifiers?",
    "shortAnswer": "The extra arguments are ignored silently without error.",
    "explanation": "Any varargs arguments beyond those referenced by format specifiers are simply discarded.",
    "hint": "Extra arguments are ignored.",
    "level": "moderate"
  },
  {
    "question": "How do you specify an explicit Locale in String.format()?",
    "shortAnswer": "Pass the Locale as the first parameter: 'String.format(Locale.GERMANY, \"%,.2f\", 1234.5)'.",
    "explanation": "Different regions use different symbols for decimal points and thousand separators (e.g. Germany uses '1.234,50' while the US uses '1,234.50').",
    "hint": "Locale as the first argument to avoid regional formatting bugs.",
    "level": "moderate",
    "codeExample": "String us = String.format(Locale.US, \"%,.2f\", 1000.5);\nString de = String.format(Locale.GERMANY, \"%,.2f\", 1000.5);"
  },
  {
    "question": "What is the date/time specifier prefix in Java format strings?",
    "shortAnswer": "'%t' or '%T' followed by a specific conversion suffix (like 'B' for month name, 'Y' for 4-digit year).",
    "explanation": "Supports java.util.Date, java.util.Calendar, and java.time temporal objects.",
    "hint": "%t prefix for temporal/date formatting.",
    "level": "advanced",
    "codeExample": "System.out.printf(\"Today: %tB %td, %tY%n\", LocalDate.now(), LocalDate.now(), LocalDate.now());"
  },
  {
    "question": "Why is String.format() considered slower than StringBuilder for high-throughput string construction?",
    "shortAnswer": "Because it parses the format string at runtime with regex, creates a java.util.Formatter, and boxes all primitives into an Object[] array.",
    "explanation": "Profiling reveals String.format can be 5x to 10x slower than simple StringBuilder appends. Avoid it in tight hot loops.",
    "hint": "Parsing format string and boxing primitives creates overhead.",
    "level": "advanced"
  },
  {
    "question": "Can java.util.Formatter write formatted output directly into a StringBuilder?",
    "shortAnswer": "Yes! Pass the StringBuilder into the Formatter constructor: 'new Formatter(sb)'.",
    "explanation": "This allows you to accumulate formatted sections into a single resizable buffer without creating intermediate String objects.",
    "hint": "Pass StringBuilder as the destination to Formatter.",
    "level": "advanced",
    "codeExample": "StringBuilder sb = new StringBuilder();\nFormatter fmt = new Formatter(sb);\nfmt.format(\"Item: %s | Price: $%.2f%n\", \"Book\", 15.99);"
  },
  {
    "question": "What specifier formats a single character?",
    "shortAnswer": "'%c' (or '%C' for uppercase).",
    "explanation": "Accepts char, Character, byte, Byte, short, Short, int, or Integer values that represent valid Unicode code points.",
    "hint": "%c for character.",
    "level": "basic",
    "codeExample": "System.out.printf(\"Grade: %c\", 'A');"
  },
  {
    "question": "What is the difference between '%s' and '%S'?",
    "shortAnswer": "%s formats the string as-is; %S automatically converts all characters in the string to uppercase according to Locale rules.",
    "explanation": "Any specifier letter that has an uppercase variant (like %s vs %S, %b vs %B, %x vs %X) automatically uppercases the output.",
    "hint": "Uppercase letter in specifier outputs uppercase text.",
    "level": "basic",
    "codeExample": "System.out.printf(\"%S\", \"hello\"); // PRINTS 'HELLO'"
  }
];

export default topic7_questions;
