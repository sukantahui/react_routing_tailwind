/**
 * Topic 10: Numeric literal enhancement: using underscores (_) for readability (e.g. 1_000_000)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "When was the underscore in numeric literals feature introduced in Java?",
    shortAnswer: "It was introduced in Java 7 (JDK 7) under Project Coin (JSR 334).",
    explanation: "Java 7 introduced underscores in numeric literals to improve the readability of large numerical values, such as credit card numbers, binary masks, and large monetary amounts.",
    hint: "Think about the major language enhancements in Java 7.",
    level: "basic",
    codeExample: "int million = 1_000_000; // Java 7+ feature"
  },
  {
    question: "What is the primary purpose of using underscores in numeric literals?",
    shortAnswer: "To enhance visual code readability and reduce human counting errors for large numbers.",
    explanation: "Without underscores, a number like `100000000` requires careful manual digit counting to determine if it is ten million or one hundred million. With underscores, `100_000_000` is immediately legible.",
    hint: "Human visual grouping reduces counting mistakes.",
    level: "basic",
    codeExample: "long hardToRead = 1000000000L;\nlong easyToRead = 1_000_000_000L;"
  },
  {
    question: "Does using underscores in numeric literals affect runtime performance or memory usage?",
    shortAnswer: "No, there is zero runtime overhead because the compiler strips all underscores during compilation.",
    explanation: "The Java compiler (`javac`) removes all underscores during lexical analysis. The compiled bytecode (.class) generated for `1_000_000` is bit-for-bit identical to `1000000`.",
    hint: "Underscores exist purely for the developer in source code.",
    level: "basic",
    codeExample: "int a = 1_000_000;\nint b = 1000000;\nSystem.out.println(a == b); // true (Identical bytecode)"
  },
  {
    question: "What is the golden rule for where underscores can be placed in numeric literals?",
    shortAnswer: "Underscores can ONLY be placed between digits.",
    explanation: "According to the Java Language Specification (JLS §3.10), underscores may only appear between two digits. They cannot be placed at the boundary of a literal or adjacent to punctuation/prefixes/suffixes.",
    hint: "Between digits only.",
    level: "basic",
    codeExample: "int valid = 1_2_3_4;\n// int invalid = _1234; // Not allowed as literal"
  },
  {
    question: "Why is `int x = _52;` illegal as a numeric literal in Java?",
    shortAnswer: "Because an underscore at the start makes it an identifier (variable name), not a numeric literal.",
    explanation: "In Java lexical grammar, `_52` conforms to identifier naming rules (starting with an underscore followed by alphanumeric characters). The compiler will treat it as a variable lookup and error if no variable named `_52` exists in scope.",
    hint: "Underscore at the start denotes an identifier.",
    level: "intermediate",
    codeExample: "int _52 = 10;   // _52 is a valid variable identifier!\nint x = _52;    // Refers to variable _52, not literal 52"
  },
  {
    question: "Why does `int x = 52_;` fail to compile?",
    shortAnswer: "Because underscores cannot appear at the very end of a numeric literal.",
    explanation: "An underscore at the end of a numeric literal violates the 'between digits only' rule, causing the lexical parser to emit a compile-time syntax error.",
    hint: "No trailing underscores allowed in literals.",
    level: "basic",
    codeExample: "// int x = 52_; // COMPILATION ERROR: illegal underscore"
  },
  {
    question: "Can underscores be placed adjacent to a decimal point in floating-point literals?",
    shortAnswer: "No, underscores immediately before or after a decimal point (e.g. `3._14` or `3_.14`) are strictly forbidden.",
    explanation: "A decimal point is a punctuation token, not a digit. Placing an underscore adjacent to a decimal point breaks the requirement that an underscore must be situated directly between two numerical digits.",
    hint: "Both sides of the underscore must be digits.",
    level: "intermediate",
    codeExample: "float valid = 3.1_4f;     // Valid\n// float bad1 = 3._14f;   // ERROR!\n// float bad2 = 3_.14f;   // ERROR!"
  },
  {
    question: "Can underscores be placed immediately prior to literal type suffixes like `L` or `F`?",
    shortAnswer: "No, `1000_L` and `3.14_f` are invalid syntax in Java.",
    explanation: "The characters `L`, `l`, `F`, `f`, `D`, `d` are type indicator suffixes, not numerical digits. Therefore, placing an underscore immediately before them is a compile error.",
    hint: "Suffixes like L and F are not digits.",
    level: "basic",
    codeExample: "long valid = 1_000L;    // Correct\n// long invalid = 1000_L; // ERROR!"
  },
  {
    question: "Can underscores be used in binary literals (`0b` prefix)?",
    shortAnswer: "Yes, between binary digits (0 and 1), such as `0b1010_1100_0011_1111`.",
    explanation: "Underscores are extremely useful in binary literals to group bits into 4-bit nibbles or 8-bit bytes, making bitmasks and networking flags instantly readable.",
    hint: "Group binary bits into nibbles (4 bits).",
    level: "intermediate",
    codeExample: "byte mask = (byte) 0b1111_0000;\nint ipMask = 0b11111111_11111111_11111111_00000000;"
  },
  {
    question: "Can underscores be placed inside or adjacent to radix prefixes like `0x` or `0b`?",
    shortAnswer: "No, `0_x52`, `0x_52`, `0_b101`, and `0b_101` are all invalid syntax.",
    explanation: "Radix prefixes `0x`, `0X`, `0b`, `0B` are composite tokens. Underscores cannot appear between the `0` and `x`/`b`, nor immediately after `x`/`b` before the first digit.",
    hint: "Prefixes must remain intact without internal or trailing underscores.",
    level: "intermediate",
    codeExample: "int hexValid = 0xFF_55_AA;   // Valid\n// int hexBad1 = 0x_FF_55;  // ERROR!\n// int hexBad2 = 0_xFF_55;  // ERROR!"
  },
  {
    question: "Can underscores be used in octal literals (e.g. `0777`)?",
    shortAnswer: "Yes, between octal digits (0 to 7), such as `0_7_7_7` or `07_77`.",
    explanation: "Octal literals begin with a leading `0`. An underscore can appear after the leading `0` if followed by an octal digit (e.g. `0_777`), because `0` is technically a digit.",
    hint: "Leading 0 in octal is a digit, so `0_777` is valid.",
    level: "advanced",
    codeExample: "int octal = 0_755; // Valid octal literal (Decimal: 493)"
  },
  {
    question: "Can you place multiple consecutive underscores in a numeric literal (e.g. `10___000`)?",
    shortAnswer: "Yes, multiple consecutive underscores between digits are legal in Java.",
    explanation: "The Java compiler allows multiple consecutive underscores between digits (e.g. `10___000`). While syntactically valid, it is generally discouraged by coding standards unless representing specific column alignments.",
    hint: "JLS allows one or more underscores between digits.",
    level: "intermediate",
    codeExample: "int val = 10___000; // Legal, evaluates to 10000"
  },
  {
    question: "Can underscores be used in exponential scientific notation (around the 'e' or 'E')?",
    shortAnswer: "Underscores can be placed among digits before or after 'e', but NEVER adjacent to 'e' itself.",
    explanation: "The exponent character `e` or `E` is not a digit. Therefore, `1.5_e3`, `1.5e_3`, and `1.5e+_3` are compilation errors. However, `1.5e3_0` and `1_2.5e3` are valid.",
    hint: "'e' is a separator, not a digit.",
    level: "advanced",
    codeExample: "double valid = 1.23_45e6_7;  // Valid\n// double bad1 = 1.23e_4;    // ERROR!\n// double bad2 = 1.23_e4;    // ERROR!"
  },
  {
    question: "How are underscores useful for Indian Rupee (₹) currency formatting in source code?",
    shortAnswer: "They allow grouping according to the Indian Numbering System (Lakhs and Crores: 2, 2, 3 grouping).",
    explanation: "Unlike the Western thousand grouping (3 digits: `1,000,000`), the Indian numbering system groups by Lakhs and Crores. In Java, you can write `long revenue = 75_00_000L;` (75 Lakhs) or `long budget = 500_00_00_000L;` (500 Crores).",
    hint: "Lakhs and Crores grouping matches regional accounting standards.",
    level: "basic",
    codeExample: "long fiftyLakhs = 50_00_000L;   // ₹50 Lakhs\nlong fiveCrores  = 5_00_00_000L;  // ₹5 Crores"
  },
  {
    question: "Can underscores be used in string representations of numbers parsed by `Integer.parseInt()`?",
    shortAnswer: "No, `Integer.parseInt(\"1_000\")` throws a `NumberFormatException` at runtime.",
    explanation: "Underscores in numeric literals are purely a compile-time source code language feature. Standard parsing library methods like `Integer.parseInt()`, `Double.parseDouble()`, and `new BigDecimal(\"1_000\")` do not accept underscores and throw `NumberFormatException`.",
    hint: "String parsers do not automatically strip underscores.",
    level: "intermediate",
    codeExample: "// Integer.parseInt(\"1_000\"); // Throws NumberFormatException!\nint num = Integer.parseInt(\"1_000\".replace(\"_\", \"\")); // Safe"
  },
  {
    question: "Does `Scanner.nextInt()` accept numeric inputs containing underscores from standard input?",
    shortAnswer: "No, `Scanner` input tokens with underscores will fail to parse and throw `InputMismatchException`.",
    explanation: "User console input is parsed according to standard textual integer tokens. If a user types `1_000_000` on the console, `scanner.nextInt()` fails because `_` is not a valid decimal digit in standard input streams.",
    hint: "Runtime scanner does not support underscore literals in console inputs.",
    level: "intermediate",
    codeExample: "// If user enters '1_000' at console prompt:\n// scanner.nextInt(); // Throws InputMismatchException"
  },
  {
    question: "How do underscores enhance hexadecimal color definitions in Java graphics applications?",
    shortAnswer: "They allow separating ARGB/RGBA channels cleanly into byte pairs (e.g. `0xFF_57_33_AA`).",
    explanation: "Colors in 32-bit graphics are composed of Alpha, Red, Green, and Blue bytes. Writing `0xFF_33_66_99` visually delineates the four 8-bit color channels clearly.",
    hint: "8 bits = 2 hex digits per color channel.",
    level: "basic",
    codeExample: "int semiTransparentCyan = 0x80_00_FF_FF; // Alpha=80, Red=00, Green=FF, Blue=FF"
  },
  {
    question: "What is the bytecode representation of `int x = 1_000_000;`?",
    shortAnswer: "It compiles to `ldc 1000000` (load constant integer 1000000) or `sipush` depending on magnitude.",
    explanation: "When running `javap -c`, the constant pool and bytecode instructions show only the raw numeric value `1000000`. The underscores leave zero trace in class files.",
    hint: "Bytecode contains raw integer values.",
    level: "advanced",
    codeExample: "// Bytecode disassembly via javap -c:\n// 0: ldc #2 // int 1000000\n// 2: istore_1"
  },
  {
    question: "Can underscores be used in character literal ASCII/Unicode values?",
    shortAnswer: "No, character literals `'a'` and Unicode escape sequences `\\u0041` cannot contain underscores.",
    explanation: "Underscores are only permitted in numeric literals (integer and floating-point types). Character literals enclosed in single quotes `' '` and Unicode escapes `\\uXXXX` do not permit underscores.",
    hint: "Char literals and Unicode escapes are not numeric literals.",
    level: "intermediate",
    codeExample: "char ch = 'A';           // Valid\nchar uni = '\\u0041';     // Valid (No underscores allowed in \\u0041)"
  },
  {
    question: "Why is `long card = 1234_5678_9012_3456L;` preferred over string storage for numerical math?",
    shortAnswer: "For arithmetic or indexing operations, it is compact and type-safe, and underscores match standard 4-digit card groupings.",
    explanation: "Underscores allow bank card numbers, ISBNs, and tracking IDs to mirror their real-world formatted physical appearance directly in Java code without string overhead.",
    hint: "4-digit block grouping mirrors physical bank cards.",
    level: "basic",
    codeExample: "long masterCard = 5412_7534_8901_2345L;"
  },
  {
    question: "Can underscores be used in hexadecimal floating-point literals?",
    shortAnswer: "Yes, between hex digits and between exponent digits (e.g. `0x1.F_Fp1_0`).",
    explanation: "Hexadecimal floating-point literals support underscores between hex significand digits and exponent digits, provided they do not touch `0x`, `p`, or `.`.",
    hint: "Hex floats follow the same between-digits rule.",
    level: "expert",
    codeExample: "double hexF = 0x1.A_Bp2_0; // Valid hex floating point"
  },
  {
    question: "Is `double d = 0_.5;` valid in Java?",
    shortAnswer: "No, because the underscore is immediately before the decimal point.",
    explanation: "The underscore is placed adjacent to the `.` delimiter rather than between two digits. Both `0_.5` and `0._5` cause a compile-time syntax error.",
    hint: "Underscore next to decimal point is invalid.",
    level: "intermediate",
    codeExample: "double valid = 0.5;   // Correct\n// double invalid = 0_.5; // Compilation error"
  },
  {
    question: "Is `int x = 0b_1;` valid in Java?",
    shortAnswer: "No, because the underscore is placed immediately after the binary prefix `0b`.",
    explanation: "An underscore cannot follow the radix specifier `0b` or `0x` before the first binary digit.",
    hint: "Prefix 0b cannot have trailing underscore.",
    level: "basic",
    codeExample: "int valid = 0b1;   // Correct\n// int invalid = 0b_1; // Compilation error"
  },
  {
    question: "What is the recommended convention for grouping digits in Java source code?",
    shortAnswer: "Group by 3 digits for Western numbers (thousands), 2-2-3 for Indian numbering (Lakhs/Crores), and 4 digits for binary/cards.",
    explanation: "Consistency is key for maintainability. Match the domain context: banking ledgers in India use `10_00_000` (10 Lakhs); networking uses `0b1111_0000` (nibbles); credit cards use 4-digit blocks.",
    hint: "Match the natural real-world grouping of the domain.",
    level: "basic",
    codeExample: "long salary = 1_25_000L;       // Indian Lakhs\nint netMask = 0b1111_1111;    // 4-bit nibble\nlong card = 4000_1234_5678L;   // 4-digit block"
  },
  {
    question: "Can an underscore be placed before the sign in a negative number (e.g. `_-100`)?",
    shortAnswer: "No, `_-100` is invalid syntax.",
    explanation: "The unary minus `-` is an operator, not a digit. Placing an underscore before or after the unary minus violates the between-digits rule.",
    hint: "Unary minus is an operator, not a numeric digit.",
    level: "basic",
    codeExample: "int negative = -1_000;  // Correct\n// int bad = _-1000;        // Compilation error"
  },
  {
    question: "Does decompiling a `.class` file with a decompiler restore the original underscore placements?",
    shortAnswer: "No, because the compiler discards underscores completely, leaving no metadata in the bytecode.",
    explanation: "Bytecode stores pure integer constants without formatting tokens. Decompilers (like CFR, Fernflower, or JD-GUI) will reconstruct the numbers without underscores or apply their own default formatting.",
    hint: "Underscore positions are not preserved in the bytecode symbol tables.",
    level: "advanced",
    codeExample: "// Source: int x = 1_000_000;\n// Decompiled output: int x = 1000000;"
  },
  {
    question: "Can underscores be used in enum ordinal or constant declarations?",
    shortAnswer: "Yes, when assigning numeric literals to constructor arguments of enum constants.",
    explanation: "If an enum has a field for a numerical value, underscore literals can be passed into the enum constructor cleanly.",
    hint: "Enum constructor arguments are standard Java expressions.",
    level: "intermediate",
    codeExample: "enum IndianCurrency {\n  LAKH(1_00_000L),\n  CRORE(1_00_00_000L);\n  final long value;\n  IndianCurrency(long v) { this.value = v; }\n}"
  },
  {
    question: "Can an underscore be placed between the base number and an exponent in scientific notation (`1_e3`)?",
    shortAnswer: "No, because 'e' is not a digit, so `1_e3` is a compilation error.",
    explanation: "Underscores are only allowed between digits. Because 'e' and 'E' are exponential indicator tokens, underscores adjacent to them violate lexical grammar.",
    hint: "Underscores cannot touch the 'e' or 'E' character.",
    level: "intermediate",
    codeExample: "double valid = 1.0e3;  // Correct\n// double bad = 1_e3;   // Compilation error"
  },
  {
    question: "What is the compiler error message when an illegal underscore is used in a numeric literal?",
    shortAnswer: "'illegal underscore' or 'underscore cannot appear in this position'.",
    explanation: "The Java compiler identifies illegal underscore placements during the lexical scan and points directly to the offending character with an 'illegal underscore' error.",
    hint: "Lexical scan error points to the invalid underscore.",
    level: "basic",
    codeExample: "// javac error: illegal underscore at line..."
  },
  {
    question: "What is the ultimate takeaway of Topic 10 for professional Java development?",
    shortAnswer: "Use underscores liberally to make large constants and bitmasks self-documenting with zero runtime penalty.",
    explanation: "Clear code is maintainable code. Using `10_00_000` (₹10 Lakhs) or `0b1111_0000` makes code intentions immediately obvious to reviewers and prevents catastrophic off-by-a-zero accounting bugs.",
    hint: "Readability and zero runtime overhead make underscores a best practice.",
    level: "basic",
    codeExample: "// Professional habit: 1_000_000 instead of 1000000"
  }
];

export default questions;
