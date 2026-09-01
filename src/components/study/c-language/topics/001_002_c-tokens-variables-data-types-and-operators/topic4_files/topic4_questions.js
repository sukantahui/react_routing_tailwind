const questions = [
  {
    question: "What is operator precedence and operator associativity in C?",
    shortAnswer: "Precedence dictates which operator is evaluated first in an expression; associativity dictates evaluation order (Left-to-Right or Right-to-Left) when operators share the same precedence.",
    explanation: "In `a + b * c`, `*` has higher precedence than `+`. In `a - b - c`, both operators have identical precedence and Left-to-Right associativity, evaluating as `(a - b) - c`.",
    hint: "Precedence = Operator hierarchy; Associativity = Tie-breaker direction.",
    level: "basic",
    codeExample: "int res = 10 + 5 * 2; // (5 * 2) = 10; 10 + 10 = 20"
  },
  {
    question: "Which operators in C have Right-to-Left associativity?",
    shortAnswer: "1. Unary operators (!, ~, ++, --, +, -, *, &, sizeof), 2. Conditional/Ternary operator (? :), 3. Assignment operators (=, +=, -=, etc.).",
    explanation: "For example, in multiple assignments `a = b = c = 5;`, it evaluates right-to-left as `a = (b = (c = 5));`.",
    hint: "Unary, Ternary, and Assignment are Right-to-Left.",
    level: "intermediate"
  },
  {
    question: "What is logical short-circuit evaluation in C?",
    shortAnswer: "In logical AND (&&) and OR (||), the right-hand expression is not evaluated if the left-hand expression determines the final outcome.",
    explanation: "In `A && B`, if A is 0 (false), B is never evaluated. In `A || B`, if A is non-zero (true), B is never evaluated.",
    hint: "Guarantees safe checks like `if (ptr != NULL && *ptr > 0)` without null pointer crashes.",
    level: "basic",
    codeExample: "int *ptr = NULL;\nif (ptr != NULL && *ptr == 10) { /* SAFE: *ptr is never evaluated */ }"
  },
  {
    question: "What is the difference between bitwise AND (&) and logical AND (&&)?",
    shortAnswer: "Bitwise & operates on individual bits of integer operands; logical && treats operands as whole booleans (0 or non-zero).",
    explanation: "`5 & 2` evaluates bits `0101 & 0010 = 0000 (0)`. `5 && 2` evaluates truth values `true && true = 1 (true)`.",
    hint: "& is bit-by-bit; && evaluates truth conditions.",
    level: "basic",
    codeExample: "int a = 5, b = 2;\nint bitAnd = a & b; // 0\nint logAnd = a && b; // 1"
  },
  {
    question: "What are the six bitwise operators in C?",
    shortAnswer: "1. & (AND), 2. | (OR), 3. ^ (XOR), 4. ~ (One's Complement / NOT), 5. << (Left Shift), 6. >> (Right Shift).",
    explanation: "Bitwise operators perform direct binary manipulation on integer CPU registers.",
    hint: "AND, OR, XOR, NOT, Left Shift, Right Shift.",
    level: "basic"
  },
  {
    question: "How do bitwise Left Shift (<<) and Right Shift (>>) relate to mathematical multiplication and division?",
    shortAnswer: "Shifting left by k bits multiplies by 2^k; shifting right by k bits divides by 2^k (for non-negative integers).",
    explanation: "`5 << 1` equals `5 * 2 = 10`. `20 >> 2` equals `20 / 4 = 5`.",
    hint: "Left shift multiplies by powers of 2; right shift divides.",
    level: "intermediate",
    codeExample: "int x = 7;\nint mul = x << 3; // 7 * 8 = 56\nint div = x >> 1; // 7 / 2 = 3"
  },
  {
    question: "What is the bitwise XOR (^) operator and how does it toggle bits?",
    shortAnswer: "XOR returns 1 if exactly one bit is 1, and 0 if both bits are identical. XORing any bit with 1 flips (toggles) it.",
    explanation: "Truth table: 0^0=0, 0^1=1, 1^0=1, 1^1=0. `val ^= (1 << n)` inverts bit `n` without altering other bits.",
    hint: "Differing bits produce 1; identical bits produce 0.",
    level: "intermediate"
  },
  {
    question: "How do you SET the nth bit of an integer in C?",
    shortAnswer: "`val |= (1 << n);`",
    explanation: "Creating a bitmask `(1 << n)` places a 1 at position n and 0s elsewhere. Bitwise OR (|) turns that specific bit to 1.",
    hint: "Bitwise OR with shifted 1.",
    level: "intermediate",
    codeExample: "uint8_t flags = 0;\nflags |= (1 << 3); // Sets bit 3"
  },
  {
    question: "How do you CLEAR the nth bit of an integer in C?",
    shortAnswer: "`val &= ~(1 << n);`",
    explanation: "`~(1 << n)` creates a mask with all 1s except a 0 at position n. Bitwise AND (&) forces that bit to 0 while keeping others unchanged.",
    hint: "Bitwise AND with inverted shifted 1.",
    level: "intermediate",
    codeExample: "uint8_t flags = 0xFF;\nflags &= ~(1 << 2); // Clears bit 2"
  },
  {
    question: "How do you CHECK if the nth bit of an integer is set in C?",
    shortAnswer: "`if ((val >> n) & 1)` or `if (val & (1 << n))`",
    explanation: "Extracting the bit using AND isolates the bit value (0 or non-zero).",
    hint: "Shift and test with 1.",
    level: "intermediate",
    codeExample: "if ((flags >> 3) & 1) {\n    printf(\"Bit 3 is ON\\n\");\n}"
  },
  {
    question: "What is the Brian Kernighan Bit Counting Algorithm?",
    shortAnswer: "Repeatedly performing `n = n & (n - 1)` clears the lowest set bit, counting total set bits in O(k) iterations where k is the number of 1s.",
    explanation: "Subtracting 1 from a number inverts all bits after the lowest set bit. Bitwise ANDing with original cancels that lowest set bit.",
    hint: "Clears lowest set bit in one instruction: n & (n - 1).",
    level: "advanced",
    codeExample: "int countSetBits(unsigned int n) {\n    int count = 0;\n    while (n) {\n        n &= (n - 1);\n        count++;\n    }\n    return count;\n}"
  },
  {
    question: "How do you test if a positive integer is a power of 2 using bitwise operators?",
    shortAnswer: "`n > 0 && (n & (n - 1)) == 0`",
    explanation: "Powers of two have exactly one bit set (e.g. 8 is 1000). Clearing that single bit with `n & (n - 1)` yields 0.",
    hint: "Powers of 2 have only a single set bit.",
    level: "intermediate",
    codeExample: "int isPowerOfTwo = (x > 0) && ((x & (x - 1)) == 0);"
  },
  {
    question: "What is the difference between prefix increment (++a) and postfix increment (a++)?",
    shortAnswer: "Prefix increments the variable first and yields the new value; postfix yields the original value first and increments afterwards.",
    explanation: "In `b = ++a;` (if a=5), `a` becomes 6 and `b` receives 6. In `b = a++;`, `b` receives 5 and `a` becomes 6.",
    hint: "Prefix: increment then use; Postfix: use then increment.",
    level: "basic",
    codeExample: "int a = 5;\nint b = a++; // b = 5, a = 6\nint c = ++a; // a = 7, c = 7"
  },
  {
    question: "Why is an expression like `a[i] = i++` or `printf(\"%d %d\", i++, i++)` undefined behavior in C?",
    shortAnswer: "Modifying a variable multiple times without an intervening sequence point violates ISO C evaluation order rules.",
    explanation: "The compiler is allowed to evaluate function call arguments or operand sub-expressions in any arbitrary order, leading to unsequenced modification UB.",
    hint: "Never modify and read the same variable multiple times in one unsequenced expression.",
    level: "advanced"
  },
  {
    question: "What is the comma operator (,) and what does it evaluate to?",
    shortAnswer: "The comma operator evaluates expressions from left to right and returns the value of the rightmost expression.",
    explanation: "In `int x = (a = 5, b = 10, a + b);`, `a` becomes 5, `b` becomes 10, and `x` is assigned 15.",
    hint: "Has the lowest precedence of all C operators.",
    level: "intermediate",
    codeExample: "int result = (x = 2, y = 3, x * y); // result = 6"
  },
  {
    question: "What is the ternary conditional operator (? :) and how does it differ from if-else?",
    shortAnswer: "The ternary operator `condition ? expr1 : expr2` is an expression that produces a value, whereas `if-else` is a control-flow statement.",
    explanation: "Because ternary is an expression, it can be embedded directly inside variable assignments, return statements, or printf arguments.",
    hint: "Inline conditional value selection.",
    level: "basic",
    codeExample: "int max = (a > b) ? a : b;"
  },
  {
    question: "What is the difference between Logical Shift and Arithmetic Right Shift in C?",
    shortAnswer: "Logical shift fills vacated high-order bits with 0s (unsigned types); arithmetic shift replicates the MSB sign bit (signed types).",
    explanation: "Right-shifting an unsigned type (`uint8_t`) always shifts in 0s. Right-shifting a negative signed type (`int`) is implementation-defined in C, usually preserving the sign bit (1).",
    hint: "Unsigned shifts in 0s; signed arithmetic shifts preserve sign.",
    level: "advanced"
  },
  {
    question: "What is the result of shifting a 32-bit integer by 32 or more bits in C?",
    shortAnswer: "Undefined Behavior (UB).",
    explanation: "The C standard states that shift counts greater than or equal to the bit width of the operand, or negative shift counts, invoke undefined behavior.",
    hint: "Never shift >= bit width.",
    level: "advanced"
  },
  {
    question: "What is the Modulo operator (%) and does it work on floating-point numbers?",
    shortAnswer: "Modulo (%) returns the integer remainder of division; it only works on integer operands in C.",
    explanation: "Writing `5.5 % 2` produces a compiler error. For floating-point remainder calculations, use `fmod()` from `<math.h>`.",
    hint: "% is strictly for integer operands; use fmod() for floats.",
    level: "basic",
    codeExample: "int rem = 17 % 5; // 2"
  },
  {
    question: "What is the result of negative operand modulo in C99 (e.g. -17 % 5 and 17 % -5)?",
    shortAnswer: "In C99, the sign of the modulo remainder matches the sign of the dividend (left operand).",
    explanation: "`-17 % 5` equals `-2`, while `17 % -5` equals `+2`.",
    hint: "Sign of remainder follows the numerator/dividend in C99.",
    level: "intermediate"
  },
  {
    question: "How does the assignment operator (=) differ from equality relational operator (==)?",
    shortAnswer: "`=` assigns an rvalue to an lvalue memory location; `==` compares two expressions and returns 1 (true) or 0 (false).",
    explanation: "Accidentally writing `if (x = 5)` assigns 5 to x (which evaluates to true) instead of checking if x is equal to 5.",
    hint: "Classic bug: single '=' vs double '=='.",
    level: "basic"
  },
  {
    question: "What is compound assignment (e.g. +=, -=, *=, &=, |=, ^=)?",
    shortAnswer: "Shorthand syntax that combines an arithmetic or bitwise operation with assignment: `a op= b` is equivalent to `a = a op (b)`.",
    explanation: "In `a += 5;`, the lvalue `a` is evaluated only once, which is cleaner and prevents redundant pointer dereferencing.",
    hint: "Evaluates the lvalue expression only once.",
    level: "basic"
  },
  {
    question: "What is the precedence rank between Bitwise AND (&) and Relational Operators (==, <)?",
    shortAnswer: "Relational operators have higher precedence than bitwise operators.",
    explanation: "In `if (flags & 1 == 0)`, it evaluates as `flags & (1 == 0)` = `flags & 0 = 0`! Always use parentheses: `if ((flags & 1) == 0)`.",
    hint: "Classic C trap: == has higher precedence than & and |.",
    level: "intermediate",
    codeExample: "// BUG:\n// if (status & 1 == 1) { ... }\n// FIX:\nif ((status & 1) == 1) { ... }"
  },
  {
    question: "How do you swap two integer variables without a temporary variable using XOR?",
    shortAnswer: "`a ^= b; b ^= a; a ^= b;`",
    explanation: "Due to the self-inverse property of XOR (x ^ x = 0 and x ^ 0 = x), values are exchanged purely through bit flips without intermediate memory.",
    hint: "Three XOR steps swap values.",
    level: "intermediate",
    codeExample: "int a = 10, b = 20;\na ^= b;\nb ^= a;\na ^= b;\n// a is now 20, b is now 10"
  },
  {
    question: "What is the sizeof operator's precedence rank in C?",
    shortAnswer: "sizeof has unary operator precedence (level 2), evaluating right-to-left.",
    explanation: "Because sizeof is a unary operator, `sizeof a + b` evaluates as `(sizeof a) + b`, not `sizeof(a + b)`.",
    hint: "Unary precedence: always enclose sizeof arguments in parentheses.",
    level: "intermediate"
  }
];

export default questions;
