const questions = [
  {
    question: "What is a token in C programming?",
    shortAnswer: "A token is the smallest individual unit or lexical element in a C program recognized by the compiler.",
    explanation: "When GCC parses source code during the lexical analysis stage, it breaks the source stream down into discrete tokens. Without tokens, the compiler cannot parse syntactic grammar.",
    hint: "Think of tokens as the building blocks or atomic words of the language.",
    level: "basic",
    codeExample: "int total = 100;\n// Tokens: [int] [total] [=] [100] [;]"
  },
  {
    question: "What are the six primary categories of tokens in C?",
    shortAnswer: "1. Keywords, 2. Identifiers, 3. Constants, 4. String Literals, 5. Special Symbols, 6. Operators.",
    explanation: "Every element in a valid C program belongs to one of these six lexical categories.",
    hint: "Remember the mnemonic: K-I-C-S-S-O (Keywords, Identifiers, Constants, Strings, Symbols, Operators).",
    level: "basic"
  },
  {
    question: "How many standard keywords were defined in ANSI C89, and how many are in modern C?",
    shortAnswer: "ANSI C89 defined 32 keywords; C99 added 5 (37 total); C11 added 7 (44 total); C23 standardized more.",
    explanation: "Keywords are reserved words having fixed predefined meanings for the compiler that cannot be redefined or used as identifier names.",
    hint: "C89 has 32 reserved words like auto, break, case, char, const, continue, default, do, double, else, enum, extern, float, for, goto, if, int, long, register, return, short, signed, sizeof, static, struct, switch, typedef, union, unsigned, void, volatile, while.",
    level: "basic"
  },
  {
    question: "What are the fundamental rules for naming an identifier in C?",
    shortAnswer: "Must start with a letter (a-z, A-Z) or underscore (_), followed by letters, digits (0-9), or underscores. No keywords allowed.",
    explanation: "Identifiers cannot start with a digit, cannot contain special characters or whitespace (like $, @, #, -), cannot match reserved keywords, and are case-sensitive.",
    hint: "Valid: _count, student_1; Invalid: 1student, student-age, for.",
    level: "basic",
    codeExample: "int _validCount = 10;   // VALID\n// int 2ndVal = 5;     // ERROR: Starts with digit\n// int student-id = 2; // ERROR: Hyphen '-' is operator"
  },
  {
    question: "Why is C considered a case-sensitive programming language?",
    shortAnswer: "Uppercase and lowercase letters are treated as completely distinct ASCII values.",
    explanation: "In C, 'Total', 'total', and 'TOTAL' represent three distinct memory variables because 'T' (ASCII 84) is distinct from 't' (ASCII 116).",
    hint: "int count and int Count are two separate variables.",
    level: "basic"
  },
  {
    question: "What is an integer literal constant and what are its representation bases in C?",
    shortAnswer: "A fixed numeric value without a fractional part, representable in Decimal (base 10), Octal (base 8), or Hexadecimal (base 16).",
    explanation: "Decimal literals have no prefix (e.g. 42), Octal literals start with '0' (e.g. 052 = 42), and Hexadecimal literals start with '0x' or '0X' (e.g. 0x2A = 42).",
    hint: "Prefix 0 for octal, 0x for hex.",
    level: "intermediate",
    codeExample: "int dec = 42;    // Decimal\nint oct = 052;   // Octal (42 in decimal)\nint hex = 0x2A;  // Hexadecimal (42 in decimal)"
  },
  {
    question: "What is the difference between a character constant and a string literal in C?",
    shortAnswer: "A character constant is enclosed in single quotes ('A') and is 1 byte; a string literal is enclosed in double quotes (\"A\") and ends with '\\0'.",
    explanation: "'A' represents an integer ASCII code (65, occupying sizeof(char) or sizeof(int)). \"A\" represents an array of two characters: 'A' and '\\0' (null terminator).",
    hint: "Single quotes for single character; double quotes for null-terminated strings.",
    level: "basic",
    codeExample: "char ch = 'A';        // 1 byte\nchar str[] = \"A\";     // 2 bytes: 'A' and '\\0'"
  },
  {
    question: "What is a string literal and where is it stored in program memory?",
    shortAnswer: "A sequence of characters enclosed in double quotes stored in the read-only data segment (.rodata).",
    explanation: "String literals like \"Barrackpore\" are stored in static read-only memory by the compiler. Attempting to modify them through a pointer like char *p = \"text\"; p[0] = 'T'; causes a segmentation fault.",
    hint: "String literals are immutable in memory.",
    level: "intermediate",
    codeExample: "char *str = \"Hello\"; // .rodata segment\n// str[0] = 'h';    // SEGMENTATION FAULT"
  },
  {
    question: "What is a punctuator (or special symbol) in C?",
    shortAnswer: "Symbols that have syntactic and semantic meaning to the compiler to structure code blocks and statements.",
    explanation: "Examples include semicolons (;) to terminate statements, curly braces ({}) to enclose code blocks, square brackets ([]) for array subscripts, parentheses (()) for function calls and precedence, and commas (,) as separators.",
    hint: "Syntax punctuation marks.",
    level: "basic"
  },
  {
    question: "Can a C keyword be used as a variable name or function name?",
    shortAnswer: "No, C keywords are reserved by the compiler and using them as identifiers results in a syntax error.",
    explanation: "If you declare `int while = 10;` or `void return() {}`, the compiler's lexical parser cannot distinguish the language construct from user code.",
    hint: "Keywords are strictly reserved.",
    level: "basic"
  },
  {
    question: "What is the maximum significant length of an identifier according to ANSI C standards?",
    shortAnswer: "ANSI C89 guarantees at least 31 characters for internal identifiers and 6 characters for external identifiers.",
    explanation: "Modern C99 and C11 standards support at least 63 characters for internal identifiers and 31 for external identifiers, though most modern compilers support virtually unlimited identifier lengths.",
    hint: "Internal variables allow longer names; external linkage historically had tighter limits.",
    level: "intermediate"
  },
  {
    question: "Why should identifiers starting with an underscore and a capital letter (e.g. _Value) or double underscores (__value) be avoided?",
    shortAnswer: "They are reserved for system libraries, compiler internals, and standard header implementations.",
    explanation: "Using identifiers beginning with double underscores or an underscore followed by an uppercase letter risks name collisions with system macros or compiler built-ins.",
    hint: "Leave double underscore names to GCC compiler implementers.",
    level: "intermediate"
  },
  {
    question: "What is the suffix for specifying float and unsigned long constants in C?",
    shortAnswer: "'f' or 'F' for float (e.g., 3.14f), 'u' or 'U' for unsigned, and 'l' or 'L' for long.",
    explanation: "Without a suffix, 3.14 is typed as double by default, and 100 is typed as int. Suffixes explicitly direct the compiler on literal sizing.",
    hint: "3.14f is 4 bytes (float); 3.14 is 8 bytes (double).",
    level: "basic",
    codeExample: "float pi = 3.14f;\nunsigned long count = 1000000UL;"
  },
  {
    question: "What is an escape sequence token in C?",
    shortAnswer: "A character combination starting with a backslash (\\) representing unprintable characters or control commands.",
    explanation: "Escape sequences allow representation of whitespace, alert bells, or characters that would otherwise break parsing. Examples: \\n (newline), \\t (tab), \\\\ (backslash), \\\" (quotes), \\0 (null character).",
    hint: "Backslash transforms literal characters into control commands.",
    level: "basic"
  },
  {
    question: "What is the null character ('\\0') and why is it crucial in C?",
    shortAnswer: "It has an ASCII value of 0 and marks the exact end of a string in memory.",
    explanation: "C does not store string length inside a string header; string functions (like strlen, strcpy, printf %s) read memory byte-by-byte until encountering '\\0'.",
    hint: "The sentinel terminator for string buffers.",
    level: "basic"
  },
  {
    question: "What happens if a string literal lacks a null terminator in memory?",
    shortAnswer: "String operations will read out-of-bounds memory until a random zero byte is found, causing garbage output or segmentation faults.",
    explanation: "Without '\\0', functions like printf(\"%s\", str) will read past array boundaries into adjacent stack/heap memory.",
    hint: "Memory overrun / buffer overflow bug.",
    level: "intermediate"
  },
  {
    question: "What is an operator token in C?",
    shortAnswer: "A symbol that tells the compiler to perform a specific mathematical, logical, or bitwise operation on operands.",
    explanation: "Operators are categorized into unary (1 operand), binary (2 operands), and ternary (3 operands).",
    hint: "Examples: +, -, *, /, %, ==, &&, ||, &, |, ? :",
    level: "basic"
  },
  {
    question: "What is the difference between a variable definition and a variable declaration in C?",
    shortAnswer: "Declaration introduces the variable name and type to the compiler; definition allocates physical RAM memory for it.",
    explanation: "`extern int score;` is a declaration (no memory allocated yet). `int score = 100;` is a definition that reserves 4 bytes in RAM.",
    hint: "Declaration gives type signature; definition reserves memory.",
    level: "intermediate",
    codeExample: "extern int globalScore; // Declaration\nint globalScore = 50;   // Definition & Initialization"
  },
  {
    question: "What is an lvalue and an rvalue in C token expressions?",
    shortAnswer: "An lvalue is an expression referring to an identifiable memory location that can hold a value; an rvalue is a temporary data value.",
    explanation: "In `x = 20;`, `x` is an lvalue (it has a RAM address), while `20` is an rvalue. Writing `20 = x;` fails because 20 is not a modifiable lvalue.",
    hint: "lvalue = Locator value (has an address in RAM); rvalue = Read value.",
    level: "advanced"
  },
  {
    question: "Why does 012 in C print as 10 when printed with %d?",
    shortAnswer: "Leading zero indicates an Octal literal: (1 * 8^1) + (2 * 8^0) = 10 in decimal.",
    explanation: "Beginners often write `int zip = 012;` accidentally triggering octal interpretation. Any numeric literal with leading 0 is parsed in base-8.",
    hint: "Never pad decimal numbers with leading zeros in C code.",
    level: "intermediate"
  },
  {
    question: "What is an enumeration constant in C?",
    shortAnswer: "A named integer constant defined using the enum keyword.",
    explanation: "Enumerations improve code readability by assigning descriptive identifiers to discrete integer states, starting at 0 by default.",
    hint: "enum Status { PENDING, ACTIVE, COMPLETED };",
    level: "intermediate",
    codeExample: "enum Days { SUN, MON, TUE, WED, THU, FRI, SAT };\nenum Days today = WED; // today = 3"
  },
  {
    question: "Are comments considered tokens in C?",
    shortAnswer: "No, comments are stripped out and replaced with a single whitespace during the preprocessing stage before tokenization.",
    explanation: "The compiler's lexical scanner never sees comments because the preprocessor removes `/* ... */` and `// ...` beforehand.",
    hint: "Comments disappear at phase 3 of preprocessing.",
    level: "basic"
  },
  {
    question: "What are trigraph and digraph sequences in legacy C?",
    shortAnswer: "Multi-character combinations used to represent characters like {, }, [, ], # on keyboards lacking them.",
    explanation: "For instance, `??<` represented `{` and `<:` represented `[`. Trigraphs were deprecated in C11 and completely removed in C23.",
    hint: "Legacy ASCII workaround.",
    level: "advanced"
  },
  {
    question: "What is the token-pasting operator (##) and stringizing operator (#) in C?",
    shortAnswer: "# converts a macro parameter into a string literal; ## concatenates two tokens into one.",
    explanation: "These preprocessor operators allow metaprogramming before the compiler parser runs.",
    hint: "#x becomes \"x\"; a##b becomes ab.",
    level: "advanced",
    codeExample: "#define STR(x) #x\n#define CONCAT(a, b) a##b\n// STR(Hello) -> \"Hello\"\n// CONCAT(var, 1) -> var1"
  },
  {
    question: "What is the role of whitespace in C tokenization?",
    shortAnswer: "Whitespace separates adjacent tokens that would otherwise merge into a single invalid token.",
    explanation: "Writing `inttotal` is treated as an identifier `inttotal`, whereas `int total` separates keyword `int` from identifier `total`.",
    hint: "Whitespace acts as a token boundary delimiter.",
    level: "basic"
  }
];

export default questions;
