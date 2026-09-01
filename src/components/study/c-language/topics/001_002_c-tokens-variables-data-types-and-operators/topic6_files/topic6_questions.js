const questions = [
  {
    question: "How do bitwise flags reduce memory consumption in embedded hardware registers?",
    shortAnswer: "Instead of allocating separate 1-byte booleans or 4-byte integers for each status flag, up to 8 individual binary flags are packed into a single 1-byte uint8_t.",
    explanation: "This delivers an 8x memory density improvement over boolean arrays and allows atomic reading and writing of complete hardware states in a single CPU instruction cycle.",
    hint: "Packs 8 boolean states into a single byte.",
    level: "basic",
    codeExample: "#define FLAG_A (1 << 0)\n#define FLAG_B (1 << 1)\nuint8_t status = FLAG_A | FLAG_B;"
  },
  {
    question: "How do you atomically clear multiple bitwise flags in a single C statement?",
    shortAnswer: "Combine the target flags with bitwise OR (|), invert with (~), and apply with bitwise AND (&): `reg &= ~(FLAG_A | FLAG_B);`",
    explanation: "This simultaneously resets both bit positions to 0 while leaving all other bits in the register intact.",
    hint: "AND with the inversion of combined flags.",
    level: "intermediate",
    codeExample: "reg &= ~(FLAG_TX_ACTIVE | FLAG_ERROR_ALERT);"
  },
  {
    question: "Why is 'double' preferred over 'float' for financial payroll calculations?",
    shortAnswer: "double offers 53 bits of precision (~15-17 decimal digits) compared to float's 24 bits (~6-7 decimal digits), eliminating rounding errors in multi-step currency calculations.",
    explanation: "When accumulating large sums, taxes, and compound percentages, float's limited precision causes fractional cents to drift.",
    hint: "Double precision minimizes floating-point accumulation drift.",
    level: "basic"
  },
  {
    question: "What is the purpose of using format specifier %-20s in console tables?",
    shortAnswer: "%-20s left-aligns string output within a fixed field width of 20 characters.",
    explanation: "The minus sign (-) forces left-justification, ensuring clean tabular alignment regardless of string lengths.",
    hint: "Left-justified column formatting.",
    level: "basic",
    codeExample: "printf(\"%-15s: %10.2f\\n\", \"Basic Salary\", 45000.0);"
  },
  {
    question: "How do you ensure scanf safely parses integer inputs without crashing on character inputs?",
    shortAnswer: "Check that the return value of scanf equals the number of expected successful conversions (e.g. `if (scanf(\"%d\", &val) != 1)`).",
    explanation: "scanf returns the number of successfully parsed fields. If user enters alphabetic text, it returns 0 or EOF, allowing error handling before using uninitialized memory.",
    hint: "Always check `scanf() == 1`.",
    level: "intermediate",
    codeExample: "int age;\nif (scanf(\"%d\", &age) != 1) {\n    printf(\"Invalid numeric input!\\n\");\n    return 1;\n}"
  },
  {
    question: "How do you pack two 16-bit integers into a single 32-bit integer in C?",
    shortAnswer: "`uint32_t packed = ((uint32_t)high16 << 16) | (uint32_t)low16;`",
    explanation: "Shifting high16 left by 16 bits moves it to the upper word, and bitwise OR merges low16 into the lower word.",
    hint: "Shift upper word by 16 and OR with lower word.",
    level: "intermediate",
    codeExample: "uint16_t high = 0x1234, low = 0x5678;\nuint32_t packed = ((uint32_t)high << 16) | low; // 0x12345678"
  },
  {
    question: "How do you unpack the high and low 16-bit words from a 32-bit integer in C?",
    shortAnswer: "`uint16_t high = (packed >> 16) & 0xFFFF; uint16_t low = packed & 0xFFFF;`",
    explanation: "Right-shifting by 16 extracts the upper 16 bits, and masking with 0xFFFF isolates the lower 16 bits.",
    hint: "Right-shift for high word; 0xFFFF mask for low word.",
    level: "intermediate",
    codeExample: "uint16_t high = (packed >> 16) & 0xFFFF;\nuint16_t low  = packed & 0xFFFF;"
  },
  {
    question: "Why should percentage divisors like 100 be written as 100.0 or 100.0f?",
    shortAnswer: "To force floating-point arithmetic and prevent unintended integer division truncation.",
    explanation: "Writing `(basicSalary * HRA) / 100` might truncate if operands are integer types. Writing `100.0` ensures promotion to `double`.",
    hint: "Floating-point literal prevents integer truncation.",
    level: "basic"
  },
  {
    question: "How does the ternary operator simplify conditional status string selection?",
    shortAnswer: "It allows inline string selection based on numeric conditions without needing multi-line if-else blocks.",
    explanation: "Example: `printf(\"Status: %s\\n\", (score >= 40) ? \"PASS\" : \"FAIL\");` embeds the decision directly inside the output statement.",
    hint: "Inline string conditional.",
    level: "basic"
  },
  {
    question: "What is an input buffer overflow and how can scanf with %s trigger it?",
    shortAnswer: "Using `scanf(\"%s\", buffer)` without a width limit reads characters until whitespace, overflowing smaller destination buffers.",
    explanation: "To prevent buffer overflows, specify field width: `scanf(\"%19s\", buffer)` for a 20-byte array (leaving 1 byte for '\\0').",
    hint: "Specify width limits in scanf format strings.",
    level: "intermediate",
    codeExample: "char name[20];\nscanf(\"%19s\", name); // Max 19 characters + '\\0'"
  },
  {
    question: "How do you clear trailing newline characters from stdin buffer after calling scanf?",
    shortAnswer: "Use a loop with getchar(): `while ((ch = getchar()) != '\\n' && ch != EOF);`",
    explanation: "scanf leaving `\\n` in the input stream causes subsequent `fgets()` or `getchar()` calls to return immediately with an empty string.",
    hint: "Flush input buffer with getchar loop.",
    level: "intermediate"
  },
  {
    question: "What is the benefit of defining hardware registers with exact-width types like uint8_t?",
    shortAnswer: "Guarantees that the variable has exactly 8 bits on all targets without compiler padding variations.",
    explanation: "Hardware registers in microcontrollers (like STM32, AVR, ESP32) are fixed byte sizes; standard `int` would waste memory and cause driver bugs.",
    hint: "Deterministic memory sizing for hardware drivers.",
    level: "basic"
  },
  {
    question: "How do you check if multiple bit flags are all active simultaneously?",
    shortAnswer: "`if ((reg & (FLAG_A | FLAG_B)) == (FLAG_A | FLAG_B))`",
    explanation: "Masking with both flags must yield the exact combined value of both flags.",
    hint: "Mask must equal the combined flags.",
    level: "intermediate",
    codeExample: "if ((status & (FLAG_POWER_ON | FLAG_SENSOR_READY)) == (FLAG_POWER_ON | FLAG_SENSOR_READY)) {\n    printf(\"Ready to measure!\\n\");\n}"
  },
  {
    question: "What is the difference between passing values directly vs passing pointers in lab projects?",
    shortAnswer: "Passing values passes a local copy that cannot modify the caller's variable; passing pointers passes memory addresses allowing direct modification.",
    explanation: "Functions like `scanf` take `&val` (pointer) to store user inputs into caller memory.",
    hint: "Value = copy; Pointer = direct memory mutation.",
    level: "basic"
  },
  {
    question: "What is the return status convention for the main() function in C?",
    shortAnswer: "Return 0 (or EXIT_SUCCESS) for successful completion; return non-zero (or EXIT_FAILURE) for error conditions.",
    explanation: "The OS shell checks the exit code (e.g. `$?` in Bash, `%ERRORLEVEL%` in Windows CMD) to determine if child processes succeeded.",
    hint: "0 = Success; Non-zero = Error.",
    level: "basic"
  },
  {
    question: "How do you calculate gross salary from basic salary and allowance percentages?",
    shortAnswer: "Gross = Basic + (Basic * HRA / 100) + (Basic * DA / 100) + Other Allowances.",
    explanation: "Standard industrial payroll algorithms compute allowances as direct percentages of basic pay.",
    hint: "Gross pay includes basic plus all allowances.",
    level: "basic"
  },
  {
    question: "How do you calculate net take-home salary?",
    shortAnswer: "Net Salary = Gross Salary - (PF Deductions + Professional Tax + Income Tax).",
    explanation: "Deductions are subtracted from gross earnings to yield final net pay.",
    hint: "Net = Gross - Deductions.",
    level: "basic"
  },
  {
    question: "Why should floating point currency calculations avoid rounding until the final display stage?",
    shortAnswer: "Intermediate rounding introduces cumulative precision loss across multi-tier mathematical calculations.",
    explanation: "Keep full double precision across all tax and allowance steps, and only round/format to `%.2f` at the final output presentation.",
    hint: "Perform full precision math; format only at the end.",
    level: "intermediate"
  },
  {
    question: "What is the purpose of enum state machines in embedded project controllers?",
    shortAnswer: "To represent distinct operational states (e.g. INIT, IDLE, MEASURING, ERROR) with self-documenting names.",
    explanation: "Replaces obscure magic numbers with readable symbolic states, improving code maintainability.",
    hint: "State machine clarity.",
    level: "basic",
    codeExample: "enum SystemState { STATE_INIT, STATE_IDLE, STATE_ACTIVE, STATE_ERROR };"
  },
  {
    question: "What is the difference between a global constant and a local constant in project architecture?",
    shortAnswer: "Global constants are defined at file scope (accessible by all functions); local constants are restricted to their enclosing function block.",
    explanation: "Configuration constants like tax rates or hardware pin numbers are typically global; function-specific limits should be local.",
    hint: "File scope vs block scope.",
    level: "basic"
  },
  {
    question: "How do you toggle a specific bit flag in C without affecting other bits?",
    shortAnswer: "`reg ^= FLAG_MASK;`",
    explanation: "Bitwise XOR with 1 inverts that bit position while keeping positions with 0 unchanged.",
    hint: "XOR toggles target bits.",
    level: "basic",
    codeExample: "statusRegister ^= FLAG_RX_BUFFER;"
  },
  {
    question: "What is the role of parentheses when using compound bitwise expressions?",
    shortAnswer: "To prevent lower precedence operators (like &, |, ^) from being subordinated to relational operators (==, <, >).",
    explanation: "Parentheses enforce exact evaluation order regardless of compiler precedence tables.",
    hint: "Always parenthesize bitwise operations.",
    level: "basic"
  },
  {
    question: "What is the advantage of using a dedicated project structure with header files and C modules?",
    shortAnswer: "Enables modular separation of concerns, independent compilation, and code reusability across multiple projects.",
    explanation: "Header files (`.h`) provide interfaces, while source files (`.c`) contain implementation logic.",
    hint: "Modular code organization.",
    level: "intermediate"
  },
  {
    question: "How do you detect integer addition overflow in C without undefined behavior?",
    shortAnswer: "For unsigned: `if (a > UINT_MAX - b) /* Overflow */`. For signed: `if (b > 0 && a > INT_MAX - b) /* Overflow */`.",
    explanation: "Checking bounds before performing the addition prevents triggering undefined behavior overflow.",
    hint: "Check boundary limits before executing addition.",
    level: "advanced"
  },
  {
    question: "What makes C the language of choice for hardware drivers and firmware projects?",
    shortAnswer: "Zero runtime overhead, direct memory address mapping, bitwise operators, and predictable compilation output.",
    explanation: "C compiles directly to native CPU opcodes with deterministic execution timing and no garbage collection pauses.",
    hint: "Deterministic speed, minimal footprint, direct memory control.",
    level: "basic"
  }
];

export default questions;
