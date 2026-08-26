/**
 * Module 001_003: Topic 6: Increment (++) and Decrement (--) operators: prefix (++x) vs postfix (x++) evaluation rules
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the difference between Prefix Increment (`++x`) and Postfix Increment (`x++`) in Java?",
    shortAnswer: "Prefix increments the variable *before* yielding its value; Postfix yields the *current* value and then increments the variable in memory.",
    explanation: "In `y = ++x`, `x` is incremented first, and `y` receives the new value. In `y = x++`, `y` receives the original value of `x`, and `x` is incremented afterwards.",
    hint: "Prefix = change then use; Postfix = use then change.",
    level: "basic",
    codeExample: "int x = 5;\nint a = ++x; // a = 6, x = 6\nint b = x++; // b = 6, x = 7"
  },
  {
    question: "What is the result of executing `x = x++;` when `int x = 5;` in Java?",
    shortAnswer: "`x` remains `5` (unchanged!).",
    explanation: "Postfix `x++` pushes the original value `5` onto the JVM operand stack, increments `x` to `6` in local variable memory, and then the assignment operator pops `5` from the stack and stores `5` back into `x`, overwriting `6`!",
    hint: "Leaves the variable unchanged due to operand stack overwrite.",
    level: "intermediate",
    codeExample: "int x = 5;\nx = x++; // x is STILL 5!"
  },
  {
    question: "What JVM bytecode instruction performs local variable increment directly?",
    shortAnswer: "`iinc` (e.g. `iinc 1, 1`).",
    explanation: "`iinc` directly mutates the local variable table without pushing the variable onto the operand stack.",
    hint: "iinc bytecode instruction.",
    level: "advanced",
    codeExample: "// Bytecode for x++: iload_1 (pushes old value), iinc 1, 1 (increments in memory)"
  },
  {
    question: "What is the evaluated result of `++x + x++ + ++x` when `int x = 5;`?",
    shortAnswer: "`20` (and final `x` is `8`).",
    explanation: "Step 1: `++x` increments `x` to `6` and evaluates to `6`. Step 2: `x++` evaluates to `6` and increments `x` to `7`. Step 3: `++x` increments `x` to `8` and evaluates to `8`. Total: `6 + 6 + 8 = 20`.",
    hint: "Step by step: 6 + 6 + 8 = 20.",
    level: "intermediate",
    codeExample: "int x = 5;\nint res = ++x + x++ + ++x; // 20"
  },
  {
    question: "Can `++` or `--` be applied to literals or constant expressions (e.g. `5++` or `(a + b)++`)?",
    shortAnswer: "No, `++` and `--` require a modifiable variable (an lvalue); applying them to literals causes a compilation error.",
    explanation: "Constants cannot be mutated.",
    hint: "Only variables can be incremented.",
    level: "basic",
    codeExample: "// int bad = 5++; // COMPILATION ERROR: Invalid argument to operation ++/--"
  },
  {
    question: "Can `++` and `--` be applied to `char`, `byte`, and `short` variables without explicit casting?",
    shortAnswer: "Yes, `++` and `--` contain an implicit narrowing cast (e.g. `b++` is equivalent to `b = (byte)(b + 1)`).",
    explanation: "Unlike `b = b + 1` which requires an explicit `(byte)` cast, `b++` compiles and executes seamlessly.",
    hint: "Contains built-in implicit narrowing cast.",
    level: "intermediate",
    codeExample: "byte b = 10;\nb++; // Equivalent to: b = (byte)(b + 1);"
  },
  {
    question: "What happens when you increment `byte b = 127;` using `b++`?",
    shortAnswer: "It silently overflows to `-128` (`Byte.MIN_VALUE`).",
    explanation: "Because of the implicit `(byte)` cast, `127 + 1 = 128`, which wraps around to `-128` in 8-bit signed two's complement.",
    hint: "Wraps around to -128.",
    level: "intermediate",
    codeExample: "byte b = 127;\nb++;\nSystem.out.println(b); // -128"
  },
  {
    question: "Can `++` and `--` be applied to floating-point types (`float` and `double`)?",
    shortAnswer: "Yes, `d++` adds `1.0` to the floating-point variable.",
    explanation: "`double d = 3.5; d++;` results in `d` being `4.5`.",
    hint: "Increments float/double by 1.0.",
    level: "basic",
    codeExample: "double d = 3.5;\nd++; // d is now 4.5"
  },
  {
    question: "What is the difference between `--x` and `x--`?",
    shortAnswer: "`--x` decrements `x` by 1 and returns the new value; `x--` returns the current value and then decrements `x`.",
    explanation: "Prefix decrement updates first; postfix decrement updates afterwards.",
    hint: "Prefix decrements first; postfix returns old value first.",
    level: "basic",
    codeExample: "int x = 10;\nint a = --x; // a = 9, x = 9\nint b = x--; // b = 9, x = 8"
  },
  {
    question: "What is the evaluated result of `int x = 10; int y = x-- - --x;`?",
    shortAnswer: "`y = 2` (and `x = 8`).",
    explanation: "Step 1: `x--` evaluates to `10`, and `x` becomes `9`. Step 2: `--x` decrements `x` from `9` to `8` and evaluates to `8`. Result: `10 - 8 = 2`.",
    hint: "10 - 8 = 2.",
    level: "intermediate",
    codeExample: "int x = 10;\nint y = x-- - --x; // y is 2, x is 8"
  },
  {
    question: "Why is modifying a variable multiple times in a single expression (e.g. `x = x++ + ++x`) considered bad practice?",
    shortAnswer: "It creates unreadable, bug-prone code that is difficult to review and debug.",
    explanation: "Professional Java standards require separate statements for clarity and predictability.",
    hint: "Complex side effects reduce readability.",
    level: "basic",
    codeExample: "// Bad: int z = x++ + ++x;\n// Good: x++; int z = x + (x + 1);"
  },
  {
    question: "In a standard `for` loop, does writing `i++` vs `++i` make any difference in loop behavior?",
    shortAnswer: "No, in the update clause of a `for (int i = 0; i < N; i++)` loop, `i++` and `++i` produce identical bytecode and performance.",
    explanation: "Because the return value of the expression is discarded, the JVM compiles both directly to `iinc`.",
    hint: "Identical performance and outcome in loop update clauses.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) { } // Identical to: for (int i = 0; i < 5; ++i) { }"
  },
  {
    question: "What happens when you increment a `char` variable (e.g. `char c = 'A'; c++;`)?",
    shortAnswer: "`c` advances to the next Unicode character `'B'`.",
    explanation: "ASCII value 65 becomes 66, which represents `'B'`.",
    hint: "Advances to the next character.",
    level: "basic",
    codeExample: "char c = 'A';\nc++; // 'B'"
  },
  {
    question: "What is the evaluated result of `int a = 1; a = ++a;`?",
    shortAnswer: "`a = 2`.",
    explanation: "`++a` increments `a` to `2` and pushes `2` onto the stack. The assignment then stores `2` back into `a`.",
    hint: "Prefix increment assigns the new value 2.",
    level: "intermediate",
    codeExample: "int a = 1;\na = ++a; // a is 2"
  },
  {
    question: "Can `final` variables be incremented with `++`?",
    shortAnswer: "No, attempting to increment a `final` variable causes a compilation error.",
    explanation: "`final` variables are immutable constants and cannot be modified.",
    hint: "final variables cannot be mutated.",
    level: "basic",
    codeExample: "// final int MAX = 100;\n// MAX++; // COMPILATION ERROR: Cannot assign a value to final variable"
  },
  {
    question: "What is the precedence of postfix operators (`x++`, `x--`) relative to prefix operators (`++x`, `--x`)?",
    shortAnswer: "Postfix operators have higher precedence than prefix operators.",
    explanation: "Postfix operators are in the highest precedence tier (Level 14 along with member access `.`), while prefix operators are in Level 13.",
    hint: "Postfix has higher precedence than prefix.",
    level: "advanced",
    codeExample: "int val = ++x; // Prefix: Level 13\nint val2 = x++; // Postfix: Level 14"
  },
  {
    question: "What is the result of `int[] arr = {10, 20, 30}; int i = 0; int val = arr[i++];`?",
    shortAnswer: "`val = 10` and `i = 1`.",
    explanation: "`arr[i++]` accesses `arr[0]` first, and then increments `i` to `1`.",
    hint: "Accesses index 0 first, then increments i to 1.",
    level: "intermediate",
    codeExample: "int[] arr = {10, 20, 30};\nint i = 0;\nint val = arr[i++]; // val = 10, i = 1"
  },
  {
    question: "What is the result of `int[] arr = {10, 20, 30}; int i = 0; int val = arr[++i];`?",
    shortAnswer: "`val = 20` and `i = 1`.",
    explanation: "`++i` increments `i` to `1` first, accessing `arr[1]` which is `20`.",
    hint: "Increments i to 1 first, then accesses index 1.",
    level: "intermediate",
    codeExample: "int[] arr = {10, 20, 30};\nint i = 0;\nint val = arr[++i]; // val = 20, i = 1"
  },
  {
    question: "How is postfix increment used in sequential student roll number dispatchers in Barrackpore?",
    shortAnswer: "`return currentRoll++;` returns the current student's roll and automatically advances the counter for the next student.",
    explanation: "Clean and idiomatic pattern for atomic ticket counters and auto-increment sequences.",
    hint: "return currentRoll++ returns current roll and increments.",
    level: "basic",
    codeExample: "public int nextId() { return idCounter++; }"
  },
  {
    question: "What is the evaluated result of `int x = 3; int y = x++ * 2;`?",
    shortAnswer: "`y = 6` and `x = 4`.",
    explanation: "Postfix `x++` provides `3` for the multiplication: `3 * 2 = 6`. Afterwards, `x` becomes `4`.",
    hint: "3 * 2 = 6, then x becomes 4.",
    level: "basic",
    codeExample: "int x = 3;\nint y = x++ * 2; // y = 6, x = 4"
  },
  {
    question: "What is the evaluated result of `int x = 3; int y = ++x * 2;`?",
    shortAnswer: "`y = 8` and `x = 4`.",
    explanation: "Prefix `++x` increments `x` to `4` first, so `4 * 2 = 8`.",
    hint: "x becomes 4 first: 4 * 2 = 8.",
    level: "basic",
    codeExample: "int x = 3;\nint y = ++x * 2; // y = 8, x = 4"
  },
  {
    question: "Can `boolean` variables be incremented with `++` in Java?",
    shortAnswer: "No, `++` and `--` only apply to numeric primitive types.",
    explanation: "Applying `++` to a boolean causes a compile-time error.",
    hint: "Booleans cannot be incremented.",
    level: "basic",
    codeExample: "// boolean b = true; b++; // COMPILATION ERROR"
  },
  {
    question: "What is the result of `int a = 5; int b = 5; boolean check = (a++ == ++b);`?",
    shortAnswer: "`check = false` (since `5 == 6` is false), while `a = 6` and `b = 6`.",
    explanation: "`a++` evaluates to `5`, while `++b` evaluates to `6`. `5 == 6` is `false`.",
    hint: "5 == 6 evaluates to false.",
    level: "intermediate",
    codeExample: "int a = 5, b = 5;\nboolean check = (a++ == ++b); // false"
  },
  {
    question: "What happens when `x++` is used as a method argument `print(x++)`?",
    shortAnswer: "The method receives the original value of `x`, and `x` is incremented after the argument is evaluated.",
    explanation: "The argument expression evaluates to the old value before the method executes.",
    hint: "Method receives original value.",
    level: "basic",
    codeExample: "int x = 10;\nSystem.out.println(x++); // Prints 10 (x is now 11)"
  },
  {
    question: "What happens when `++x` is used as a method argument `print(++x)`?",
    shortAnswer: "The method receives the newly incremented value of `x`.",
    explanation: "The variable is incremented before passing to the method.",
    hint: "Method receives incremented value.",
    level: "basic",
    codeExample: "int x = 10;\nSystem.out.println(++x); // Prints 11"
  },
  {
    question: "What is the result of `int x = 0; x = x-- + --x;`?",
    shortAnswer: "`x = -2`.",
    explanation: "Step 1: `x--` evaluates to `0`, `x` becomes `-1`. Step 2: `--x` decrements `x` to `-2` and evaluates to `-2`. Total: `0 + (-2) = -2`.",
    hint: "0 + (-2) = -2.",
    level: "intermediate",
    codeExample: "int x = 0;\nx = x-- + --x; // -2"
  },
  {
    question: "What is the result of `char ch = 'Z'; ch++;`?",
    shortAnswer: "`ch = '['`.",
    explanation: "In ASCII, the character immediately following `'Z'` (90) is `'['` (91).",
    hint: "ASCII 90 ('Z') + 1 = ASCII 91 ('[').",
    level: "basic",
    codeExample: "char ch = 'Z';\nch++; // '['"
  },
  {
    question: "Is `x++` thread-safe in concurrent Java multithreading?",
    shortAnswer: "No! `x++` is a non-atomic composite operation (read-modify-write) that causes race conditions across threads unless synchronized or using `AtomicInteger.incrementAndGet()`.",
    explanation: "Multiple threads executing `x++` concurrently will lose updates due to thread interleaving.",
    hint: "x++ is NOT atomic; use AtomicInteger in concurrent code.",
    level: "expert",
    codeExample: "AtomicInteger counter = new AtomicInteger(0);\nint val = counter.incrementAndGet(); // Thread-safe atomic increment"
  },
  {
    question: "What is the ultimate takeaway of Topic 6 for Java developers?",
    shortAnswer: "Mastering prefix (`++x`) vs postfix (`x++`) evaluation rules, bytecode `iinc` mechanics, and avoiding the `x = x++` self-assignment trap ensures clean, bug-free loops and counters.",
    explanation: "Understanding operand stack mechanics guarantees accurate sequencing in array traversal, roll dispatchers, and state machines.",
    hint: "Prefix evaluates new value; postfix evaluates old value.",
    level: "basic",
    codeExample: "// Summary: ++x (use new), x++ (use old), x = x++ leaves x unchanged"
  },
  {
    question: "What is the next topic (Topic 7) in Module 001_003?",
    shortAnswer: "Relational / Comparison operators: ==, !=, >, <, >=, <=",
    explanation: "Topic 7 explores boolean comparison operators, numerical comparison rules, and relational expressions.",
    hint: "Relational operators in Java.",
    level: "basic",
    codeExample: "// Topic 7: ==, !=, >, <, >=, <="
  }
];

export default questions;
