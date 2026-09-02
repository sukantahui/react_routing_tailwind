// src/components/study/c-language/topics/001_003_control-flow-branching-and-loops/topic6_files/topic6_questions.js

export const questions = [
  {
    "question": "How does a standard 'if' statement evaluate its condition expression in C?",
    "options": [
      "It checks if the condition evaluates to true string",
      "Any non-zero value is treated as true; zero (0) is treated as false",
      "Only positive integers are true",
      "Only 1 is true, all other numbers are false"
    ],
    "answerIndex": 1,
    "explanation": "In C, any non-zero value (positive or negative) is evaluated as true (1), and zero (0) is evaluated as false."
  },
  {
    "question": "What is the output of: int x = 0; if (x = 5) printf(\"YES\"); else printf(\"NO\");?",
    "options": [
      "NO",
      "YES",
      "Compiler error",
      "Nothing is printed"
    ],
    "answerIndex": 1,
    "explanation": "The assignment expression (x = 5) sets x to 5 and yields 5 (non-zero/true). Therefore, the 'if' condition is true and 'YES' is printed."
  },
  {
    "question": "What is the output of: int x = 5; if (x == 10); printf(\"HELLO\");?",
    "options": [
      "HELLO is printed unconditionally",
      "Nothing is printed",
      "Compiler error",
      "HELLO is printed only if x is 10"
    ],
    "answerIndex": 0,
    "explanation": "The semicolon ';' immediately following if (x == 10) forms a null statement as the body of the if-condition. The printf(\"HELLO\"); is outside the if statement and executes unconditionally."
  },
  {
    "question": "To which 'if' statement does an 'else' clause attach in nested decision structures (the Dangling Else problem)?",
    "options": [
      "To the first 'if' statement in the function",
      "To the nearest preceding unclosed 'if' statement in the same block scope",
      "To the 'if' statement with matching indentation",
      "It causes a compiler error unless braces are used"
    ],
    "answerIndex": 1,
    "explanation": "In C, an 'else' always pairs with the nearest preceding unclosed 'if' statement in the same scope, regardless of visual indentation."
  },
  {
    "question": "What is the output of: int x = 10, y = 20; if (x > 15) if (y > 15) printf(\"A\"); else printf(\"B\");?",
    "options": [
      "A",
      "B",
      "Nothing is printed",
      "Compiler error"
    ],
    "answerIndex": 2,
    "explanation": "The 'else' attaches to 'if (y > 15)'. Since the outer condition (x > 15) is false (10 > 15 is false), the inner if-else block is skipped entirely, printing nothing."
  },
  {
    "question": "What is an else-if ladder used for in C programming?",
    "options": [
      "To execute multiple loops in parallel",
      "To test multiple mutually exclusive conditions sequentially",
      "To skip compilation of code blocks",
      "To restart the main function"
    ],
    "answerIndex": 1,
    "explanation": "An else-if ladder evaluates expressions sequentially from top to bottom. As soon as one condition evaluates to true (non-zero), its block executes and the rest of the ladder is bypassed."
  },
  {
    "question": "In an else-if ladder, when is the final trailing 'else' block executed?",
    "options": [
      "Always executed at the end",
      "Executed only if ALL preceding 'if' and 'else-if' conditions evaluate to false (0)",
      "Executed if the first condition was true",
      "Never executed"
    ],
    "answerIndex": 1,
    "explanation": "The trailing 'else' block acts as a default fallback and executes only if none of the preceding conditions in the ladder evaluated to true."
  },
  {
    "question": "What is the output of: int a = 5; if (a > 0) printf(\"P\"); if (a > 2) printf(\"Q\"); if (a == 5) printf(\"R\");?",
    "options": [
      "P",
      "PQR",
      "R",
      "P Q R on separate lines"
    ],
    "answerIndex": 1,
    "explanation": "These are three independent 'if' statements (NOT an else-if ladder). Since a = 5 satisfies all three conditions (5 > 0, 5 > 2, 5 == 5), all three print statements execute, outputting 'PQR'."
  },
  {
    "question": "What is the output of: int x = 0; if (!x) printf(\"ZERO\"); else printf(\"NON-ZERO\");?",
    "options": [
      "ZERO",
      "NON-ZERO",
      "Compiler error",
      "Nothing"
    ],
    "answerIndex": 0,
    "explanation": "!x evaluates to !0, which is 1 (true). Thus, the condition is true and 'ZERO' is printed."
  },
  {
    "question": "What is the output of: int a = 10; if (a = 0) printf(\"TRUE\"); else printf(\"FALSE\");?",
    "options": [
      "TRUE",
      "FALSE",
      "Compiler error",
      "10"
    ],
    "answerIndex": 1,
    "explanation": "(a = 0) assigns 0 to 'a' and yields 0 (false). Therefore, the 'else' branch executes, printing 'FALSE'."
  },
  {
    "question": "Which of the following is equivalent to the ternary condition: min = (a < b) ? a : b;?",
    "options": [
      "if (a < b) min = a; else min = b;",
      "if (a > b) min = a; else min = b;",
      "if (a == b) min = a; else min = b;",
      "min = a + b;"
    ],
    "answerIndex": 0,
    "explanation": "The ternary operator (a < b) ? a : b assigns 'a' to min if a < b is true, otherwise it assigns 'b'."
  },
  {
    "question": "What is the output of: int x = 5; if (x > 3 && x < 10) printf(\"VALID\");?",
    "options": [
      "VALID",
      "Invalid syntax",
      "Nothing",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "5 > 3 is true and 5 < 10 is true. true && true evaluates to 1 (true), so 'VALID' is printed."
  },
  {
    "question": "What is the output of: int x = 3; if (x == 1 || 2) printf(\"MATCH\");?",
    "options": [
      "MATCH",
      "Nothing",
      "Compiler error",
      "0"
    ],
    "answerIndex": 0,
    "explanation": "The condition 'x == 1 || 2' evaluates as '(x == 1) || 2'. Since (3 == 1) is 0, 0 || 2 evaluates to true (non-zero 1). Thus 'MATCH' is printed."
  },
  {
    "question": "How can you write a clean range check condition for a variable x between 10 and 20 inclusive in C?",
    "options": [
      "if (10 <= x <= 20)",
      "if (x >= 10 && x <= 20)",
      "if (x >= 10 || x <= 20)",
      "if (x == 10 .. 20)"
    ],
    "answerIndex": 1,
    "explanation": "In C, range checking requires logical AND: 'x >= 10 && x <= 20'. Writing '10 <= x <= 20' is a semantic bug because (10 <= x) evaluates to 0 or 1, which is always <= 20!"
  },
  {
    "question": "What is the output of: int a = -5; if (a) printf(\"YES\"); else printf(\"NO\");?",
    "options": [
      "YES",
      "NO",
      "Compiler error",
      "Undefined"
    ],
    "answerIndex": 0,
    "explanation": "In C, any non-zero integer is true. -5 is non-zero, so the condition is true and 'YES' is printed."
  },
  {
    "question": "What is the result of nesting 50 levels of 'if' statements in standard C99 compliance?",
    "options": [
      "Supported (C99 requires supporting at least 127 nesting levels of blocks)",
      "Compiler error after 3 levels",
      "Runtime stack overflow guaranteed",
      "C forbids nesting if statements"
    ],
    "answerIndex": 0,
    "explanation": "ISO C99 standard mandates that compliant compilers must support at least 127 nesting levels of compound statements / control structure blocks."
  },
  {
    "question": "What is the output of: int a = 1, b = 2; if (a == 1) if (b == 3) printf(\"X\"); else printf(\"Y\");?",
    "options": [
      "X",
      "Y",
      "Nothing",
      "Compiler error"
    ],
    "answerIndex": 1,
    "explanation": "The outer condition (a == 1) is true. The inner condition (b == 3) is false. The inner else executes, printing 'Y'."
  },
  {
    "question": "What is the output of: int a = 1, b = 2; if (a == 2) if (b == 2) printf(\"X\"); else printf(\"Y\");?",
    "options": [
      "X",
      "Y",
      "Nothing",
      "Compiler error"
    ],
    "answerIndex": 2,
    "explanation": "The outer condition (a == 2) is false (1 == 2 is false). The entire inner statement (including its else) is skipped, so nothing is printed."
  },
  {
    "question": "What is the output of: if (0.0) printf(\"A\"); else printf(\"B\");?",
    "options": [
      "A",
      "B",
      "Compiler error",
      "0.0"
    ],
    "answerIndex": 1,
    "explanation": "0.0 as a floating-point number is zero, which evaluates to false in conditional checks. The else branch prints 'B'."
  },
  {
    "question": "What is the output of: if (0.00001) printf(\"A\"); else printf(\"B\");?",
    "options": [
      "A",
      "B",
      "Compiler error",
      "Undefined"
    ],
    "answerIndex": 0,
    "explanation": "Any non-zero floating-point value (0.00001 != 0.0) evaluates to true (1) in conditional expressions. 'A' is printed."
  },
  {
    "question": "What is the value of x after: int a = 5; int x = (a > 10) ? 100 : (a > 2) ? 200 : 300;?",
    "options": [
      "100",
      "200",
      "300",
      "0"
    ],
    "answerIndex": 1,
    "explanation": "The nested ternary evaluates: (5 > 10) is false, so it moves to the second expression: (5 > 2) ? 200 : 300. Since 5 > 2 is true, it returns 200."
  },
  {
    "question": "Can a floating-point expression be used as the condition inside an 'if' statement?",
    "options": [
      "Yes, if evaluates whether the float is non-zero (non-0.0)",
      "No, only int types are allowed in if",
      "Only if cast to char",
      "Only in C23"
    ],
    "answerIndex": 0,
    "explanation": "Any scalar type (integers, floats, pointers) can be evaluated in an 'if' statement condition by checking against zero."
  },
  {
    "question": "Can a pointer variable be used directly as an 'if' condition (e.g. if (ptr))?",
    "options": [
      "Yes, if (ptr) tests whether ptr is non-NULL",
      "No, pointers must be dereferenced first (*ptr)",
      "Only void pointers",
      "Causes compilation error"
    ],
    "answerIndex": 0,
    "explanation": "In C, 'if (ptr)' is equivalent to 'if (ptr != NULL)'. It tests whether the pointer holds a non-null address."
  },
  {
    "question": "What is the output of: int x = 10; if (x = 0) printf(\"A\"); else if (x = 5) printf(\"B\"); else printf(\"C\");?",
    "options": [
      "A",
      "B",
      "C",
      "Compiler error"
    ],
    "answerIndex": 1,
    "explanation": "First condition (x = 0) assigns 0 to x and yields 0 (false). Second condition (x = 5) assigns 5 to x and yields 5 (true). So 'B' is printed."
  },
  {
    "question": "What is the purpose of using braces '{ }' around the body of an 'if' statement?",
    "options": [
      "To make the code run faster",
      "To group multiple statements into a single compound statement under the control of the 'if'",
      "Required by C compiler for every if statement",
      "To allocate stack memory"
    ],
    "answerIndex": 1,
    "explanation": "Braces '{ }' group multiple statements into a single compound block so that all enclosed statements execute together when the condition is true."
  },
  {
    "question": "What happens if an 'if' statement without braces has multiple lines indented below it?",
    "options": [
      "All indented lines belong to the if statement",
      "Only the single immediately following statement belongs to the if statement; subsequent lines execute unconditionally",
      "Compiler throws indentation error",
      "Code fails to compile"
    ],
    "answerIndex": 1,
    "explanation": "Unlike Python, C ignores visual indentation. Without braces '{ }', ONLY the single statement immediately following the 'if' condition is controlled by the 'if'."
  },
  {
    "question": "What is the output of: int x = 0; if (x == 1) printf(\"1\"); printf(\"2\");?",
    "options": [
      "12",
      "1",
      "2",
      "Nothing"
    ],
    "answerIndex": 2,
    "explanation": "Only printf(\"1\"); is guarded by 'if (x == 1)'. Since 0 == 1 is false, printf(\"1\") is skipped. printf(\"2\") is an independent statement and executes, printing '2'."
  },
  {
    "question": "Which header is NOT required to use 'if' statements in C?",
    "options": [
      "<stdio.h>",
      "<stdlib.h>",
      "<stdbool.h>",
      "No header is required (if is a built-in keyword)"
    ],
    "answerIndex": 3,
    "explanation": "'if', 'else', and control structures are built-in keywords of the C language syntax and require no header file imports."
  },
  {
    "question": "What is the output of: int x = 5; if (x == 5) { int x = 10; printf(\"%d \", x); } printf(\"%d\", x);?",
    "options": [
      "10 10",
      "10 5",
      "5 5",
      "5 10"
    ],
    "answerIndex": 1,
    "explanation": "The inner block declares a new local variable 'x' (shadowing the outer x), printing 10. Once the block ends, the outer 'x' (which is still 5) is printed, yielding '10 5'."
  },
  {
    "question": "What is the output of: if (NULL) printf(\"YES\"); else printf(\"NO\");?",
    "options": [
      "YES",
      "NO",
      "Compiler error",
      "NullPointerException"
    ],
    "answerIndex": 1,
    "explanation": "NULL is defined as ((void *)0) or 0. Evaluating 0 in an if-condition yields false, so 'NO' is printed."
  },
  {
    "question": "What types of expressions are permitted as the controlling expression in a standard C 'switch' statement?",
    "options": [
      "Integer types only (int, char, enum, short, long)",
      "Floating-point types (float, double)",
      "Strings (\"hello\")",
      "Any data type"
    ],
    "answerIndex": 0,
    "explanation": "The switch expression in standard C MUST evaluate to an integer type (int, char, enum, short, long). Floats, doubles, and strings are forbidden."
  },
  {
    "question": "What happens if you attempt to use a float variable in a switch expression: float f = 2.5; switch(f) { ... }?",
    "options": [
      "The compiler rounds f to 2",
      "The compiler generates a compilation error (switch quantity not an integer)",
      "It compares float bytes",
      "It converts f to double"
    ],
    "answerIndex": 1,
    "explanation": "Using a non-integer type (like float or double) in a switch expression results in a compile-time syntax error."
  },
  {
    "question": "What requirement must be satisfied by case label values in a 'switch' statement?",
    "options": [
      "Must be compile-time integer constant expressions",
      "Can be variables (e.g., case x:)",
      "Can be floating-point numbers (e.g., case 2.5:)",
      "Can be string variables"
    ],
    "answerIndex": 0,
    "explanation": "Case labels in C MUST be compile-time constant integer expressions (e.g. 5, 'A', MACRO). Variables cannot be used as case values."
  },
  {
    "question": "What happens if two 'case' labels in the same 'switch' statement have identical constant values?",
    "options": [
      "The compiler executes both cases",
      "The compiler issues a duplicate case value error",
      "The second case overrides the first",
      "It creates a runtime loop"
    ],
    "answerIndex": 1,
    "explanation": "Duplicate case label values within the same switch block trigger a compile-time error."
  },
  {
    "question": "What is 'fall-through' behavior in a C switch-case construct?",
    "options": [
      "Execution automatically falls into subsequent case blocks unless interrupted by a 'break' or return statement",
      "The switch crashes on unexpected inputs",
      "Variables fall out of scope",
      "The default case executes first"
    ],
    "answerIndex": 0,
    "explanation": "In C switch statements, if a matching case is found, execution continues sequentially into subsequent case statements until a 'break', 'return', or end of switch is reached."
  },
  {
    "question": "What is the output of: int x = 2; switch(x) { case 1: printf(\"1\"); case 2: printf(\"2\"); case 3: printf(\"3\"); default: printf(\"D\"); }?",
    "options": [
      "2",
      "23D",
      "23",
      "D"
    ],
    "answerIndex": 1,
    "explanation": "x = 2 matches 'case 2:'. Because there are no 'break' statements, execution falls through 'case 2:', 'case 3:', and 'default:', printing '23D'."
  },
  {
    "question": "What is the primary role of the 'break' statement inside a switch case?",
    "options": [
      "To terminate the entire C program",
      "To immediately exit from the switch block and resume execution at the following statement",
      "To skip to the default case",
      "To restart the switch check"
    ],
    "answerIndex": 1,
    "explanation": "'break' exits the switch block immediately, preventing unintended fall-through execution into subsequent cases."
  },
  {
    "question": "Is the 'default' label mandatory in every C switch statement?",
    "options": [
      "Yes, a switch without default causes compile error",
      "No, default is optional; if present, it handles values not matched by any case label",
      "Yes, default must be the first line",
      "Only in C11"
    ],
    "answerIndex": 1,
    "explanation": "The 'default' label is optional. If omitted and no case matches, execution simply bypasses the switch block without doing anything."
  },
  {
    "question": "Where can the 'default' label be placed within a 'switch' statement block?",
    "options": [
      "Must be at the very end of the switch",
      "Must be at the very top of the switch",
      "Anywhere inside the switch block (top, middle, or bottom)",
      "Must follow case 0"
    ],
    "answerIndex": 2,
    "explanation": "The 'default' label can technically be placed anywhere inside the switch block, though putting it at the end is standard coding practice."
  },
  {
    "question": "How does GCC compiler often optimize a dense switch-case statement with many contiguous integer cases?",
    "options": [
      "By converting it into a nested if-else chain",
      "By generating a hardware Jump Table (branch table) for O(1) constant-time dispatch",
      "By converting cases into loops",
      "By ignoring break statements"
    ],
    "answerIndex": 1,
    "explanation": "Compilers optimize dense switch statements by creating a Jump Table (array of target code addresses), allowing O(1) instant jump based on index."
  },
  {
    "question": "What attribute was introduced in C23 (and supported in GCC via __attribute__((fallthrough))) to explicitly mark intentional switch fall-through?",
    "options": [
      "[[fallthrough]];",
      "[[nofall]];",
      "fallthrough();",
      "goto case;"
    ],
    "answerIndex": 0,
    "explanation": "C23 introduced the standard attribute '[[fallthrough]];' to inform the compiler and static analyzers that fall-through is intentional, suppressing warnings."
  },
  {
    "question": "What is the output of: char c = 'B'; switch(c) { case 'A': printf(\"1\"); break; case 'B': printf(\"2\"); break; default: printf(\"3\"); }?",
    "options": [
      "1",
      "2",
      "3",
      "Compiler error"
    ],
    "answerIndex": 1,
    "explanation": "c = 'B' matches 'case 'B':'. It prints '2' and encounters 'break', exiting the switch cleanly."
  },
  {
    "question": "What is the output of: int x = 10; switch(x) { default: printf(\"DEF \"); case 1: printf(\"ONE \"); break; case 2: printf(\"TWO\"); }?",
    "options": [
      "DEF ONE ",
      "DEF ",
      "ONE ",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "x = 10 doesn't match case 1 or 2, so it jumps to 'default:'. Since there is no break after default, it falls through to 'case 1:' and hits 'break', printing 'DEF ONE '."
  },
  {
    "question": "Can you declare a new variable at the immediate start of a case label without enclosing braces (e.g. case 1: int x = 10; break;)?",
    "options": [
      "Yes, valid in all C standards",
      "No, in C89/C99 a label cannot be directly followed by a declaration; a statement or compound block '{ }' is required",
      "Yes, but x is global",
      "Only if x is static"
    ],
    "answerIndex": 1,
    "explanation": "In standard C (prior to C23), a label cannot be directly attached to a variable declaration. You must wrap the case body in braces '{ int x = 10; break; }' or place a statement after the colon."
  },
  {
    "question": "What is Duff's Device in C programming?",
    "options": [
      "A hardware debugging tool",
      "An unrolled loop interleaved with a switch-case statement exploiting fall-through for high-speed memory copying",
      "A type of recursive function",
      "A stack overflow error"
    ],
    "answerIndex": 1,
    "explanation": "Duff's Device is a famous C idiom invented by Tom Duff that unrolls loops by blending a switch statement with a do-while loop exploiting fall-through."
  },
  {
    "question": "What is the output of: int x = 1; switch(x) { case 1: case 2: case 3: printf(\"LOW\"); break; case 4: printf(\"HIGH\"); break; }?",
    "options": [
      "LOW",
      "LOWLOWLOW",
      "Compiler error",
      "HIGH"
    ],
    "answerIndex": 0,
    "explanation": "Cases 1, 2, and 3 stack together without statements or breaks. x = 1 enters case 1, falls through case 2 and 3, prints 'LOW', and breaks."
  },
  {
    "question": "Can case expressions contain arithmetic operations on constants (e.g. case 2 + 3:)?",
    "options": [
      "Yes, because 2 + 3 evaluates to a compile-time constant integer 5",
      "No, operators are forbidden in case labels",
      "Only multiplication",
      "Only in C++"
    ],
    "answerIndex": 0,
    "explanation": "Constant integer expressions like '2 + 3' or '1 << 4' are evaluated at compile time and are completely valid as case label values."
  },
  {
    "question": "What happens if no case matches and there is NO default label in a switch statement?",
    "options": [
      "The program crashes",
      "The switch statement is skipped entirely and execution continues at the next statement",
      "It executes case 0",
      "It loops infinitely"
    ],
    "answerIndex": 1,
    "explanation": "If no case matches and no default label exists, control passes directly out of the switch block to the statement following it."
  },
  {
    "question": "What is the output of: int x = 5; switch(x) { case 1 ... 5: printf(\"RANGE\"); break; default: printf(\"NONE\"); } in GCC?",
    "options": [
      "RANGE (using GCC case range extension 'case 1 ... 5:')",
      "Compiler error on all compilers",
      "NONE",
      "5"
    ],
    "answerIndex": 0,
    "explanation": "GCC supports the Case Ranges extension syntax 'case low ... high:'. For x = 5, it matches case 1 ... 5 and prints 'RANGE'."
  },
  {
    "question": "Why must spaces surround the ellipsis in GCC's case range extension 'case 1 ... 5:'?",
    "options": [
      "Otherwise '1...' could be parsed as a floating-point literal token",
      "Required by ANSI C",
      "For aesthetic formatting",
      "To prevent macro expansion"
    ],
    "answerIndex": 0,
    "explanation": "Spaces are required around '...' so the lexer doesn't mistake '1.' for the start of a floating-point constant."
  },
  {
    "question": "Which statement about switch statements vs if-else ladders is TRUE?",
    "options": [
      "switch can test floating-point inequality ranges easily",
      "switch is restricted to discrete integer/character equality checks, but enables compiler jump-table optimizations",
      "if-else is always faster than switch",
      "switch statements cannot use break"
    ],
    "answerIndex": 1,
    "explanation": "switch statements only test discrete integer equality values, enabling O(1) jump table optimizations, whereas if-else ladders can evaluate complex logical range conditions."
  },
  {
    "question": "What is the output of: int k = 65; switch(k) { case 'A': printf(\"MATCH\"); break; default: printf(\"NO\"); }?",
    "options": [
      "MATCH",
      "NO",
      "Compiler error",
      "65"
    ],
    "answerIndex": 0,
    "explanation": "Character literal 'A' has integer ASCII value 65 in C. Since k = 65, it matches case 'A': and prints 'MATCH'."
  },
  {
    "question": "Is a break statement strictly required inside the 'default' case when default is placed at the very end of the switch?",
    "options": [
      "Yes, required by standard",
      "No, execution naturally leaves the switch block at the closing brace",
      "Yes, otherwise it loops",
      "Required only in debug mode"
    ],
    "answerIndex": 1,
    "explanation": "If default is the last item in the switch, a break is syntactically optional because control reaches the end of the switch block anyway."
  },
  {
    "question": "What is the output of: int x = 0; switch(x) { case 0: printf(\"0\"); case 1: printf(\"1\"); break; default: printf(\"D\"); }?",
    "options": [
      "0",
      "01",
      "01D",
      "D"
    ],
    "answerIndex": 1,
    "explanation": "Matches case 0:, prints '0', falls through to case 1:, prints '1', hits break, and exits. Output is '01'."
  },
  {
    "question": "Can a switch statement be nested inside another switch statement in C?",
    "options": [
      "Yes, switch statements can be nested arbitrarily",
      "No, C forbids nested switch statements",
      "Only up to 2 levels",
      "Only inside loops"
    ],
    "answerIndex": 0,
    "explanation": "Switch statements can be nested inside other switch statements without restriction."
  },
  {
    "question": "What is the output of: int i = 2; switch(i) { case 1: ; int x = 10; printf(\"%d\", x); break; default: printf(\"DEF\"); }?",
    "options": [
      "DEF",
      "10",
      "Compiler error",
      "Garbage"
    ],
    "answerIndex": 0,
    "explanation": "i = 2 does not match case 1, so it jumps straight to default: and prints 'DEF'."
  },
  {
    "question": "What happens if a variable declared inside a switch block before any case label (e.g. switch(x) { int a = 100; case 1: ... }) is referenced inside a case?",
    "options": [
      "'a' is in scope, but its initializer 'a = 100' is SKIPPED because control jumps directly to case labels",
      "Compiler error",
      "'a' retains value 100",
      "'a' is destroyed"
    ],
    "answerIndex": 0,
    "explanation": "Code placed before the first case label inside a switch is bypassed during execution jumps. While 'a' is in scope, its assignment/initialization never executes!"
  },
  {
    "question": "What is the output of: switch(1) { case 1: printf(\"OK\"); }?",
    "options": [
      "OK",
      "Compiler error",
      "Nothing",
      "1"
    ],
    "answerIndex": 0,
    "explanation": "A literal constant expression '1' in switch(1) matches case 1: and prints 'OK'."
  },
  {
    "question": "Which keyword is used to exit a switch block prematurely?",
    "options": [
      "exit",
      "return",
      "break",
      "continue"
    ],
    "answerIndex": 2,
    "explanation": "'break' is used to jump out of a switch block."
  },
  {
    "question": "What happens if 'continue;' is used inside a switch statement that is NOT inside any loop?",
    "options": [
      "Exits the switch",
      "Triggers a compiler error ('continue' statement not within a loop)",
      "Jumps to default case",
      "Restarts the switch"
    ],
    "answerIndex": 1,
    "explanation": "'continue' is strictly a loop control statement. Using 'continue' inside a switch that is not inside a loop causes a compile-time error."
  },
  {
    "question": "What is an entry-controlled (pre-test) loop construct in C?",
    "options": [
      "A loop where the condition is tested BEFORE executing the loop body (e.g., while, for)",
      "A loop that always runs at least once",
      "A loop with no condition",
      "A do-while loop"
    ],
    "answerIndex": 0,
    "explanation": "Entry-controlled loops (while, for) evaluate their condition before each iteration. If the initial condition is false, the loop body never runs."
  },
  {
    "question": "What is an exit-controlled (post-test) loop construct in C?",
    "options": [
      "A loop where the condition is tested AFTER executing the loop body (e.g., do-while)",
      "A for loop",
      "A while loop",
      "A loop that never exits"
    ],
    "answerIndex": 0,
    "explanation": "An exit-controlled loop (do-while) evaluates its test condition at the end of the iteration, ensuring the loop body executes AT LEAST ONCE."
  },
  {
    "question": "How many times is the body of a 'do-while' loop guaranteed to execute?",
    "options": [
      "0 times",
      "At least 1 time",
      "At least 2 times",
      "Exactly 10 times"
    ],
    "answerIndex": 1,
    "explanation": "Because the test condition of a do-while loop is at the bottom, the body is guaranteed to execute at least once."
  },
  {
    "question": "What is the minimum number of times a standard 'while' loop body can execute?",
    "options": [
      "0 times (if the initial condition evaluates to false)",
      "1 time",
      "2 times",
      "Infinite times"
    ],
    "answerIndex": 0,
    "explanation": "Since 'while' tests its condition at the entry point, if the condition is false initially, the body executes 0 times."
  },
  {
    "question": "What are the three header components of a standard C 'for' loop (for (expr1; expr2; expr3))?",
    "options": [
      "Initialization, Test Condition, Increment/Update",
      "Start, Stop, Repeat",
      "Condition, Body, Exit",
      "Declare, Compare, Reset"
    ],
    "answerIndex": 0,
    "explanation": "A for loop header contains: 1. Initialization (expr1), 2. Test Condition (expr2), 3. Increment/Update (expr3)."
  },
  {
    "question": "In a C 'for' loop header: for (expr1; expr2; expr3), how many times is expr1 (initialization) executed?",
    "options": [
      "Once at the very start of the loop",
      "Before every iteration",
      "After every iteration",
      "Never"
    ],
    "answerIndex": 0,
    "explanation": "expr1 (initialization) is executed exactly ONCE when control first enters the for loop."
  },
  {
    "question": "In a for loop: for (expr1; expr2; expr3), when is expr3 (increment/update) executed?",
    "options": [
      "At the end of each loop iteration, prior to evaluating expr2 for the next cycle",
      "Before the loop body runs",
      "Only once at loop start",
      "When the loop exits"
    ],
    "answerIndex": 0,
    "explanation": "expr3 executes at the end of each iteration loop body, immediately before the condition expr2 is tested again."
  },
  {
    "question": "What happens if all three expressions are omitted in a for loop: for (;;) { ... }?",
    "options": [
      "Compiler error",
      "It creates an intentional INFINITE LOOP",
      "The loop executes 0 times",
      "It executes 1 time"
    ],
    "answerIndex": 1,
    "explanation": "Omitting the test condition in 'for (;;)' defaults the condition to non-zero (true), creating an infinite loop."
  },
  {
    "question": "What is the output of: int i = 0; while (i < 3) { printf(\"%d \", i); i++; }?",
    "options": [
      "0 1 2 ",
      "0 1 2 3 ",
      "1 2 3 ",
      "0 1 "
    ],
    "answerIndex": 0,
    "explanation": "i starts at 0. Loop prints 0 (i becomes 1), prints 1 (i becomes 2), prints 2 (i becomes 3). 3 < 3 is false, loop terminates. Output: '0 1 2 '."
  },
  {
    "question": "What is the value of 'i' after exiting the loop: for (int i = 0; i < 5; i++); on pre-C99 compiler where i was declared outside?",
    "options": [
      "4",
      "5",
      "0",
      "6"
    ],
    "answerIndex": 1,
    "explanation": "The loop increments 'i' until i < 5 becomes false. The first value that fails (5 < 5 is false) is 5. So i = 5 after loop exit."
  },
  {
    "question": "What is the scope of variable 'i' declared inside a C99 for loop header: for (int i = 0; i < 10; i++)?",
    "options": [
      "Global scope",
      "Block scope restricted exclusively to the for loop statement and body",
      "Function scope",
      "File scope"
    ],
    "answerIndex": 1,
    "explanation": "C99 allowed declaring variables inside the for loop initialization clause. Their scope is strictly limited to that for loop."
  },
  {
    "question": "What is the output of: int count = 5; do { printf(\"%d \", count); } while (count < 3);?",
    "options": [
      "5 ",
      "Nothing",
      "5 4 3 ",
      "Infinite loop"
    ],
    "answerIndex": 0,
    "explanation": "The do-while loop executes the body first, printing '5'. Then it checks (5 < 3), which is false, and terminates. Output is '5 '."
  },
  {
    "question": "What is the output of: int i = 5; while (i > 0); { printf(\"%d\", i); i--; }?",
    "options": [
      "54321",
      "Infinite loop (stuck at empty statement while (i > 0);)",
      "5",
      "Compiler error"
    ],
    "answerIndex": 1,
    "explanation": "The semicolon ';' after while (i > 0); forms a null body. Since i remains 5, (5 > 0) is perpetually true, causing an infinite empty loop!"
  },
  {
    "question": "What is the output of: for (int i = 0; i < 3; ++i) printf(\"%d \", i);?",
    "options": [
      "0 1 2 ",
      "1 2 3 ",
      "0 1 2 3 ",
      "1 2 "
    ],
    "answerIndex": 0,
    "explanation": "In a for loop header, prefix ++i vs postfix i++ makes NO difference to the iteration count. i takes values 0, 1, 2. Output: '0 1 2 '."
  },
  {
    "question": "What is the output of: int i = 1; while (i <= 5) { i *= 2; } printf(\"%d\", i);?",
    "options": [
      "5",
      "8",
      "4",
      "16"
    ],
    "answerIndex": 1,
    "explanation": "i changes: 1 -> 2 -> 4 -> 8. At 8, (8 <= 5) is false. Loop exits and prints 8."
  },
  {
    "question": "Which loop structure is best suited when the exact number of iterations is known prior to loop entry?",
    "options": [
      "for loop",
      "while loop",
      "do-while loop",
      "goto loop"
    ],
    "answerIndex": 0,
    "explanation": "The 'for' loop is conventionally used when the number of iterations or range bounds are known in advance."
  },
  {
    "question": "Which loop structure is best suited when reading input until a sentinel value or condition is met, where iteration count is unpredictable?",
    "options": [
      "while loop",
      "for loop",
      "switch case",
      "nested if"
    ],
    "answerIndex": 0,
    "explanation": "A 'while' loop is ideal for event-driven or sentinel-controlled loops where iteration count is unknown beforehand."
  },
  {
    "question": "What statement syntactically terminates a do-while loop in C?",
    "options": [
      "while (condition); (with a mandatory trailing semicolon)",
      "while (condition) (without semicolon)",
      "end do;",
      "until (condition);"
    ],
    "answerIndex": 0,
    "explanation": "A do-while loop syntax strictly requires a trailing semicolon after the while condition: do { ... } while (condition);"
  },
  {
    "question": "What is the output of: for (int i = 0, j = 5; i < j; i++, j--) printf(\"%d%d \", i, j);?",
    "options": [
      "05 14 23 ",
      "05 14 ",
      "05 14 23 32 ",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Multiple expressions separated by comma operator in header: Iter 1: i=0, j=5 (prints 05). Iter 2: i=1, j=4 (prints 14). Iter 3: i=2, j=3 (prints 23). Next: i=3, j=2 (3 < 2 is false). Output: '05 14 23 '."
  },
  {
    "question": "What is the output of: int i = 0; for (; i < 3 ;) { printf(\"%d \", i); i++; }?",
    "options": [
      "0 1 2 ",
      "Compiler error",
      "Infinite loop",
      "1 2 3 "
    ],
    "answerIndex": 0,
    "explanation": "Omitting initialization and increment expressions in a for loop header is completely valid C syntax. Output is '0 1 2 '."
  },
  {
    "question": "What happens if the condition in a while loop is a constant non-zero value: while (1) { ... }?",
    "options": [
      "It executes 1 time",
      "It creates an intentional INFINITE LOOP",
      "Compiler error",
      "It skips the loop"
    ],
    "answerIndex": 1,
    "explanation": "'while (1)' evaluates to true endlessly, forming a standard idiom for infinite event loops."
  },
  {
    "question": "What is the output of: int i = 10; while (i = 0) { printf(\"RUN\"); } printf(\"END\");?",
    "options": [
      "RUNEND",
      "END",
      "RUN",
      "Infinite loop"
    ],
    "answerIndex": 1,
    "explanation": "(i = 0) assigns 0 to i and returns 0 (false). The while loop condition is false immediately, so it skips the body and prints 'END'."
  },
  {
    "question": "What is the output of: int i = 0; do { printf(\"%d \", i++); } while (i < 3);?",
    "options": [
      "0 1 2 ",
      "1 2 3 ",
      "0 1 2 3 ",
      "0 1 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: prints 0 (i becomes 1), checks 1 < 3 (true). Iter 2: prints 1 (i becomes 2), checks 2 < 3 (true). Iter 3: prints 2 (i becomes 3), checks 3 < 3 (false). Output: '0 1 2 '."
  },
  {
    "question": "What is the output of: int i = 0; do { printf(\"%d \", ++i); } while (i < 3);?",
    "options": [
      "0 1 2 ",
      "1 2 ",
      "1 2 3 ",
      "1 2 3 4 "
    ],
    "answerIndex": 1,
    "explanation": "Iter 1: ++i makes i=1, prints 1, checks 1 < 3 (true). Iter 2: ++i makes i=2, prints 2, checks 2 < 3 (true). Iter 3: ++i makes i=3, prints 3, checks 3 < 3 (false). Wait! Let's trace carefully: Iter 1: ++i -> i=1, prints 1, check 1<3 (true). Iter 2: ++i -> i=2, prints 2, check 2<3 (true). Iter 3: ++i -> i=3, prints 3, check 3<3 (false). Output is 1 2 3 !"
  },
  {
    "question": "What is the output of: int a = 3; while (a--) printf(\"%d \", a);?",
    "options": [
      "2 1 0 ",
      "3 2 1 ",
      "3 2 1 0 ",
      "2 1 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: a=3 is true, a becomes 2, prints 2. Iter 2: a=2 is true, a becomes 1, prints 1. Iter 3: a=1 is true, a becomes 0, prints 0. Iter 4: a=0 is false, loop ends. Output: '2 1 0 '."
  },
  {
    "question": "What is the output of: int a = 3; while (--a) printf(\"%d \", a);?",
    "options": [
      "2 1 ",
      "3 2 1 ",
      "2 1 0 ",
      "1 0 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: --a makes a=2 (true), prints 2. Iter 2: --a makes a=1 (true), prints 1. Iter 3: --a makes a=0 (false), loop ends. Output: '2 1 '."
  },
  {
    "question": "Can float numbers be used as for loop control counters (e.g. for (float x = 0.0f; x < 1.0f; x += 0.1f))?",
    "options": [
      "Yes, but floating-point accumulation errors can cause unexpected iteration counts or infinite loops",
      "No, for loops forbid float variables",
      "Yes, floats are exact",
      "Only in C23"
    ],
    "answerIndex": 0,
    "explanation": "While syntactically legal, using floats as loop counters is dangerous because binary floating-point representation rounding errors (0.1f is inexact) can lead to off-by-one or infinite loops."
  },
  {
    "question": "What is the value of 'sum' after: int sum = 0; for (int i = 1; i <= 4; i++) sum += i;?",
    "options": [
      "10",
      "4",
      "15",
      "0"
    ],
    "answerIndex": 0,
    "explanation": "sum = 1 + 2 + 3 + 4 = 10."
  },
  {
    "question": "What is the output of: for (int i = 0; i < 0; i++) printf(\"HI\");?",
    "options": [
      "HI",
      "Nothing is printed",
      "Compiler error",
      "Infinite HI"
    ],
    "answerIndex": 1,
    "explanation": "Initial condition (0 < 0) is false immediately. The loop body never executes, printing nothing."
  },
  {
    "question": "Which loop in C evaluates its expression using post-test logic?",
    "options": [
      "do-while",
      "while",
      "for",
      "switch"
    ],
    "answerIndex": 0,
    "explanation": "The do-while loop is the only post-test loop in standard C."
  },
  {
    "question": "What is the effect of executing a 'break' statement inside a loop?",
    "options": [
      "Skips the current iteration and jumps to the next iteration test",
      "Immediately terminates the innermost enclosing loop and transfers control to the following statement",
      "Exits the entire program",
      "Restarts the loop from beginning"
    ],
    "answerIndex": 1,
    "explanation": "'break' immediately terminates the innermost loop (for, while, do-while) and transfers control to the statement following the loop."
  },
  {
    "question": "What is the effect of executing a 'continue' statement inside a loop?",
    "options": [
      "Terminates the loop completely",
      "Skips the remaining statements in the current iteration and jumps directly to the loop condition/update evaluation",
      "Jumps out of all nested loops",
      "Exits main()"
    ],
    "answerIndex": 1,
    "explanation": "'continue' bypasses the remainder of the current iteration body and jumps directly to the next iteration evaluation (increment in 'for', condition test in 'while'/'do-while')."
  },
  {
    "question": "In a 'for' loop, where does execution jump when a 'continue' statement is encountered?",
    "options": [
      "Directly to the loop initialization (expr1)",
      "Directly to the loop increment/update expression (expr3)",
      "Directly to the statement after the loop",
      "To the top of main()"
    ],
    "answerIndex": 1,
    "explanation": "In a for loop, 'continue' jumps directly to the increment/update expression (expr3), which runs before re-testing the condition (expr2)."
  },
  {
    "question": "In a 'while' loop, where does execution jump when a 'continue' statement is encountered?",
    "options": [
      "Directly to the loop condition test at the top of the while statement",
      "To the statement after the loop",
      "To the bottom of the loop body",
      "To the function return statement"
    ],
    "answerIndex": 0,
    "explanation": "In a while loop, 'continue' jumps directly to evaluating the loop test condition."
  },
  {
    "question": "What is the output of: for (int i = 1; i <= 5; i++) { if (i == 3) break; printf(\"%d \", i); }?",
    "options": [
      "1 2 ",
      "1 2 3 ",
      "1 2 4 5 ",
      "3 "
    ],
    "answerIndex": 0,
    "explanation": "When i = 3, 'break' triggers, immediately exiting the loop. Only 1 and 2 are printed."
  },
  {
    "question": "What is the output of: for (int i = 1; i <= 5; i++) { if (i == 3) continue; printf(\"%d \", i); }?",
    "options": [
      "1 2 4 5 ",
      "1 2 ",
      "1 2 3 4 5 ",
      "3 "
    ],
    "answerIndex": 0,
    "explanation": "When i = 3, 'continue' skips printf(\"%d \", i) and moves to i++. 3 is omitted. Output: '1 2 4 5 '."
  },
  {
    "question": "If a 'break' statement is executed inside an INNER nested loop, which loop does it terminate?",
    "options": [
      "All nested loops",
      "Only the innermost loop containing the break statement",
      "Only the outermost loop",
      "It terminates the function"
    ],
    "answerIndex": 1,
    "explanation": "A 'break' statement terminates ONLY the single innermost loop in which it is directly embedded."
  },
  {
    "question": "What is the goto statement in C used for?",
    "options": [
      "To perform unconditional transfer of control (jumping) to a named statement label within the same function",
      "To jump between different C source files",
      "To break out of functions",
      "To call system APIs"
    ],
    "answerIndex": 0,
    "explanation": "'goto label;' performs an unconditional jump to the statement marked with 'label:' within the scope of the current function."
  },
  {
    "question": "Can a 'goto' statement jump to a label defined inside a completely different function?",
    "options": [
      "Yes, goto can jump anywhere across the entire program",
      "No, goto jumps are strictly limited to labels defined within the SAME function",
      "Yes, if the function is global",
      "Only if compiled with -O0"
    ],
    "answerIndex": 1,
    "explanation": "In C, goto targets are strictly scoped to labels within the SAME function. Cross-function goto is illegal (use setjmp/longjmp for inter-function jumps)."
  },
  {
    "question": "What is a legitimate, widely accepted software engineering use case for 'goto' in C Linux kernel & systems programming?",
    "options": [
      "Building complex nested loops",
      "Cleanup and error recovery routing to release allocated resources before function exit (e.g. goto error_cleanup;)",
      "Replacing for loops",
      "Implementing recursion"
    ],
    "answerIndex": 1,
    "explanation": "The Linux kernel and systems software routinely use 'goto' for centralized error handling and cleanup (unwinding allocations/locks in reverse order)."
  },
  {
    "question": "What is the syntax for defining a target label for a goto statement in C?",
    "options": [
      "label_name:",
      ":label_name",
      "goto label_name;",
      "label(name)"
    ],
    "answerIndex": 0,
    "explanation": "A label is defined by an identifier followed by a colon: 'my_label:'."
  },
  {
    "question": "What is the output of: int i = 0; start: if (i < 3) { printf(\"%d \", i++); goto start; }?",
    "options": [
      "0 1 2 ",
      "0 1 2 3 ",
      "1 2 3 ",
      "Infinite loop"
    ],
    "answerIndex": 0,
    "explanation": "Simulates a loop: i starts 0, prints 0 (i=1), jumps to start; prints 1 (i=2), jumps to start; prints 2 (i=3), jumps to start; (3 < 3) is false. Output: '0 1 2 '."
  },
  {
    "question": "What is the output of: int sum = 0; for (int i = 1; i <= 10; i++) { if (i % 2 == 0) continue; sum += i; } printf(\"%d\", sum);?",
    "options": [
      "25 (sum of odd numbers 1+3+5+7+9)",
      "30 (sum of even numbers)",
      "55 (sum of all numbers)",
      "0"
    ],
    "answerIndex": 0,
    "explanation": "'continue' skips even numbers (i % 2 == 0). sum accumulates odds: 1 + 3 + 5 + 7 + 9 = 25."
  },
  {
    "question": "What happens if a label defined for goto is never jumped to in the code?",
    "options": [
      "Compiler error",
      "The compiler issues an unused label warning or compiles silently",
      "Runtime crash",
      "Program hangs"
    ],
    "answerIndex": 1,
    "explanation": "An unreferenced label is completely harmless to compilation (though compilers may emit an unused label warning)."
  },
  {
    "question": "What is the output of: for (int i = 0; i < 3; i++) { for (int j = 0; j < 3; j++) { if (j == 1) break; printf(\"%d%d \", i, j); } }?",
    "options": [
      "00 10 20 ",
      "00 01 02 10 11 12 ",
      "00 11 22 ",
      "Nothing"
    ],
    "answerIndex": 0,
    "explanation": "For every outer iteration i, inner loop runs for j=0 (prints i,0), then hits j=1 which breaks out of inner loop! Outer loop continues for i=0, 1, 2. Output: '00 10 20 '."
  },
  {
    "question": "What is the output of: for (int i = 0; i < 2; i++) { for (int j = 0; j < 2; j++) { if (i == 1) continue; printf(\"%d%d \", i, j); } }?",
    "options": [
      "00 01 ",
      "00 01 10 11 ",
      "00 10 ",
      "01 11 "
    ],
    "answerIndex": 0,
    "explanation": "When i = 0: j=0 prints 00, j=1 prints 01. When i = 1: for j=0 and j=1, (i == 1) triggers continue in inner loop, skipping prints. Output: '00 01 '."
  },
  {
    "question": "Can a 'return' statement be used inside a loop body?",
    "options": [
      "Yes, return immediately exits both the loop AND the containing function, returning control/value to the caller",
      "No, return cannot be placed in loops",
      "Only inside while loops",
      "Only if returning 0"
    ],
    "answerIndex": 0,
    "explanation": "Executing 'return' inside a loop immediately terminates the loop and returns from the function to the caller."
  },
  {
    "question": "What statement is used to terminate program execution immediately from anywhere in a C program?",
    "options": [
      "exit(0) (from <stdlib.h>)",
      "break",
      "continue",
      "goto end"
    ],
    "answerIndex": 0,
    "explanation": "exit() from <stdlib.h> terminates the entire process immediately, returning the exit status code to the operating system."
  },
  {
    "question": "What is the output of: int x = 1; while (x <= 5) { if (x == 3) { x++; continue; } printf(\"%d \", x); x++; }?",
    "options": [
      "1 2 4 5 ",
      "1 2 3 4 5 ",
      "1 2 ",
      "Infinite loop"
    ],
    "answerIndex": 0,
    "explanation": "When x = 3, (x == 3) increments x to 4 and continues. Printing of 3 is skipped. Output: '1 2 4 5 '."
  },
  {
    "question": "What happens if you omit 'x++' inside the if block of the previous question: while (x <= 5) { if (x == 3) continue; printf(\"%d \", x); x++; }?",
    "options": [
      "Prints 1 2 4 5",
      "Enters an INFINITE LOOP at x = 3 because continue skips x++!",
      "Compiler error",
      "Prints 1 2"
    ],
    "answerIndex": 1,
    "explanation": "When x = 3, 'continue' jumps directly to condition test (3 <= 5), skipping x++. x remains 3 forever, resulting in an infinite loop!"
  },
  {
    "question": "Why is excessive use of 'goto' discouraged in structured software development ('Spaghetti Code')?",
    "options": [
      "It slows down CPU clock speed",
      "Unrestricted forward and backward jumps obscure control flow, making code difficult to trace, maintain, and formally verify",
      "It uses extra RAM",
      "It is forbidden in C23"
    ],
    "answerIndex": 1,
    "explanation": "Edsger W. Dijkstra's famous paper 'Go To Statement Considered Harmful' highlighted how arbitrary jumps obscure control flow logic, creating unmaintainable 'spaghetti code'."
  },
  {
    "question": "Which C jump statement transfers control directly to a specified label?",
    "options": [
      "goto",
      "break",
      "continue",
      "return"
    ],
    "answerIndex": 0,
    "explanation": "'goto' transfers control unconditionally to a target label."
  },
  {
    "question": "What is the output of: int i = 0; loop: printf(\"%d \", i); i++; if (i < 2) goto loop;?",
    "options": [
      "0 1 ",
      "0 1 2 ",
      "0 ",
      "1 2 "
    ],
    "answerIndex": 0,
    "explanation": "i=0: prints 0, i becomes 1; (1 < 2) true -> goto loop. i=1: prints 1, i becomes 2; (2 < 2) false -> finishes. Output: '0 1 '."
  },
  {
    "question": "What is the output of: for (int i = 0; i < 5; i++) { if (i == 2) break; else continue; printf(\"X\"); }?",
    "options": [
      "Nothing is ever printed (X is unreachable)",
      "X X ",
      "X ",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "For i=0 and i=1, the 'else continue' branch triggers, jumping to i++. For i=2, 'if (i == 2) break' triggers, exiting loop. printf(\"X\") is unreachable and never executes!"
  },
  {
    "question": "Can a 'break' statement be used outside loops and switch statements?",
    "options": [
      "Yes, inside plain if statements",
      "No, placing a break outside a loop or switch causes a compilation error",
      "Yes, inside main()",
      "Yes, anywhere"
    ],
    "answerIndex": 1,
    "explanation": "'break' is syntactically valid ONLY within loop constructs (for, while, do-while) and switch-case blocks."
  },
  {
    "question": "Can a 'continue' statement be used inside a switch statement that is NOT inside a loop?",
    "options": [
      "Yes",
      "No, placing continue outside a loop causes a compilation error",
      "Yes, it acts like break",
      "Only in GCC"
    ],
    "answerIndex": 1,
    "explanation": "'continue' is syntactically valid ONLY within loop constructs (for, while, do-while)."
  },
  {
    "question": "What is the output of: int x = 0; switch(x) { case 0: printf(\"A\"); goto jump; case 1: printf(\"B\"); } jump: printf(\"C\");?",
    "options": [
      "AC",
      "ABC",
      "A",
      "C"
    ],
    "answerIndex": 0,
    "explanation": "Enters case 0:, prints 'A', executes 'goto jump;', jumping past case 1 directly to 'jump:', printing 'C'. Output is 'AC'."
  },
  {
    "question": "What is the output of: int i = 0; while (i < 3) { i++; if (i == 2) continue; printf(\"%d \", i); }?",
    "options": [
      "1 3 ",
      "1 2 3 ",
      "2 3 ",
      "0 1 3 "
    ],
    "answerIndex": 0,
    "explanation": "i=0 -> i++ makes i=1, prints 1. i=1 -> i++ makes i=2, continues (skips 2). i=2 -> i++ makes i=3, prints 3. i=3 -> (3 < 3) false. Output: '1 3 '."
  },
  {
    "question": "How do you break out of multiple nested loops at once in standard C?",
    "options": [
      "Use 'break 2;'",
      "Use a 'goto' statement pointing to a label placed outside the outermost loop",
      "Use 'continue all;'",
      "Use 'return loop;'"
    ],
    "answerIndex": 1,
    "explanation": "C does not have multi-level break syntax (like break 2). The standard idiomatic solution to break out of deeply nested loops is using 'goto' to jump to a post-loop cleanup label."
  },
  {
    "question": "What happens when a 'return' statement is executed inside main()?",
    "options": [
      "It terminates the main function and passes the return exit code back to the operating system",
      "It restarts main",
      "It pauses the execution",
      "It clears terminal screen"
    ],
    "answerIndex": 0,
    "explanation": "Executing return from main() terminates the program process and passes the status exit code (e.g. 0 for success) back to the OS environment."
  },
  {
    "question": "How many total iterations occur in a nested loop structure where outer loop runs N times and inner loop runs M times for each outer step?",
    "options": [
      "N + M",
      "N * M",
      "N^M",
      "M^N"
    ],
    "answerIndex": 1,
    "explanation": "For each of the N outer loop iterations, the inner loop executes M times. Total iterations = N * M."
  },
  {
    "question": "What is the output of: for (int r = 1; r <= 3; r++) { for (int c = 1; c <= 2; c++) printf(\"*\"); printf(\" \"); }?",
    "options": [
      "** ** ** ",
      "******",
      "* * * * * *",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Outer loop runs 3 times (r = 1, 2, 3). For each r, inner loop prints '**' followed by a space. Output: '** ** ** '."
  },
  {
    "question": "Which coordinate mapping convention is standard when using nested loops to print a 2D matrix or pattern?",
    "options": [
      "Outer loop controls ROWS (r), Inner loop controls COLUMNS (c)",
      "Outer loop controls columns, Inner loop controls rows",
      "Both loops control rows",
      "Outer loop controls color"
    ],
    "answerIndex": 0,
    "explanation": "Standard convention: Outer loop iterates over rows (vertical coordinate), and inner loop iterates over columns (horizontal coordinate)."
  },
  {
    "question": "What pattern is produced by: for (int r = 1; r <= 4; r++) { for (int c = 1; c <= r; c++) printf(\"*\"); printf(\"\\n\"); }?",
    "options": [
      "Left-aligned right-angled triangle of stars (1 star on row 1, 2 on row 2, 3 on row 3, 4 on row 4)",
      "Square of 4x4 stars",
      "Inverted right-angled triangle",
      "Single line of 10 stars"
    ],
    "answerIndex": 0,
    "explanation": "Row r=1 prints 1 star, r=2 prints 2 stars, r=3 prints 3 stars, r=4 prints 4 stars. This produces a left-aligned right-angled triangle."
  },
  {
    "question": "What pattern is produced by: for (int r = 4; r >= 1; r--) { for (int c = 1; c <= r; c++) printf(\"*\"); printf(\"\\n\"); }?",
    "options": [
      "Inverted right-angled triangle (4 stars on row 1 down to 1 star on row 4)",
      "Square of 4x4 stars",
      "Pyramid pattern",
      "Rectangle"
    ],
    "answerIndex": 0,
    "explanation": "Row r=4 prints 4 stars, r=3 prints 3, r=2 prints 2, r=1 prints 1. This produces an inverted right-angled triangle."
  },
  {
    "question": "In a 5-row centered isosceles pyramid pattern of stars, how many leading spaces should be printed on row 'r' (where r ranges from 1 to 5)?",
    "options": [
      "5 - r spaces",
      "r - 1 spaces",
      "r spaces",
      "5 + r spaces"
    ],
    "answerIndex": 0,
    "explanation": "To center the pyramid: Row 1 needs 4 spaces (5 - 1), Row 2 needs 3 spaces (5 - 2), ..., Row r needs (N - r) leading spaces."
  },
  {
    "question": "In a 5-row centered isosceles pyramid pattern of stars, how many stars should be printed on row 'r' (where r ranges from 1 to 5)?",
    "options": [
      "2 * r - 1 stars (odd series: 1, 3, 5, 7, 9)",
      "r stars",
      "2 * r stars",
      "r + 2 stars"
    ],
    "answerIndex": 0,
    "explanation": "An isosceles star pyramid follows the odd number series: Row 1 has 1 star, Row 2 has 3, Row 3 has 5, ..., Row r has (2 * r - 1) stars."
  },
  {
    "question": "What is Floyd's Triangle?",
    "options": [
      "A right-angled triangle pattern filled with consecutive natural numbers (1 / 2 3 / 4 5 6 / 7 8 9 10 ...)",
      "A triangle of prime numbers",
      "A Pascal triangle",
      "A matrix of zeros and ones"
    ],
    "answerIndex": 0,
    "explanation": "Floyd's Triangle is a right-angled triangle of consecutive natural numbers (1; 2 3; 4 5 6; 7 8 9 10...)."
  },
  {
    "question": "What is the output of the inner loop in Floyd's Triangle printing: int num = 1; for (int r = 1; r <= 3; r++) { for (int c = 1; c <= r; c++) printf(\"%d \", num++); printf(\"\\n\"); }?",
    "options": [
      "1 \\n 2 3 \\n 4 5 6",
      "1 \\n 1 2 \\n 1 2 3",
      "1 \\n 2 2 \\n 3 3 3",
      "1 2 3 4 5 6"
    ],
    "answerIndex": 0,
    "explanation": "Row 1: prints 1. Row 2: prints 2 3. Row 3: prints 4 5 6. Output forms Floyd's Triangle."
  },
  {
    "question": "What does the condition (r == c) represent when iterating through a square N x N matrix with row index r and column index c (0-indexed)?",
    "options": [
      "Elements on the Primary (Main) Diagonal",
      "Elements on the Anti-Diagonal",
      "Border elements",
      "Corner elements"
    ],
    "answerIndex": 0,
    "explanation": "(r == c) identifies elements on the main (primary) diagonal (e.g. [0][0], [1][1], [2][2])."
  },
  {
    "question": "What does the condition (r + c == N - 1) represent in an N x N matrix (0-indexed)?",
    "options": [
      "Elements on the Secondary (Anti) Diagonal",
      "Primary diagonal",
      "First column",
      "Last row"
    ],
    "answerIndex": 0,
    "explanation": "(r + c == N - 1) identifies elements lying on the secondary (anti) diagonal."
  },
  {
    "question": "How do you identify boundary (border) elements of an N x M matrix (rows 0 to N-1, cols 0 to M-1)?",
    "options": [
      "(r == 0 || r == N - 1 || c == 0 || c == M - 1)",
      "(r == c)",
      "(r + c == 0)",
      "(r == N && c == M)"
    ],
    "answerIndex": 0,
    "explanation": "Boundary elements lie on row 0, the last row (N-1), column 0, or the last column (M-1)."
  },
  {
    "question": "What is the output of: for (int i = 1; i <= 3; i++) { for (int j = 1; j <= 3; j++) { if (i == j) printf(\"1 \"); else printf(\"0 \"); } printf(\"\\n\"); }?",
    "options": [
      "3x3 Identity Matrix (1 on main diagonal, 0 elsewhere)",
      "Matrix of all 1s",
      "Matrix of all 0s",
      "Lower triangular matrix"
    ],
    "answerIndex": 0,
    "explanation": "When i == j, it prints '1 '; otherwise '0 '. This generates a 3x3 Identity Matrix."
  },
  {
    "question": "What pattern is printed by: for (int r = 1; r <= 3; r++) { for (int c = 1; c <= 3; c++) printf(\"%d\", r); printf(\"\\n\"); }?",
    "options": [
      "111 \\n 222 \\n 333",
      "123 \\n 123 \\n 123",
      "100 \\n 020 \\n 003",
      "333 \\n 222 \\n 111"
    ],
    "answerIndex": 0,
    "explanation": "The inner loop prints the row index 'r' three times per line. Row 1: 111, Row 2: 222, Row 3: 333."
  },
  {
    "question": "What pattern is printed by: for (int r = 1; r <= 3; r++) { for (int c = 1; c <= 3; c++) printf(\"%d\", c); printf(\"\\n\"); }?",
    "options": [
      "123 \\n 123 \\n 123",
      "111 \\n 222 \\n 333",
      "321 \\n 321 \\n 321",
      "1 2 3"
    ],
    "answerIndex": 0,
    "explanation": "The inner loop prints the column index 'c' (1, 2, 3) on every row. Output: 123 \\n 123 \\n 123."
  },
  {
    "question": "What is Pascal's Triangle?",
    "options": [
      "A triangular array of numbers where each number is the sum of the two numbers directly above it (representing binomial coefficients)",
      "A triangle of random numbers",
      "Floyd's triangle with negative signs",
      "A matrix of powers of 2"
    ],
    "answerIndex": 0,
    "explanation": "Pascal's Triangle contains binomial coefficients C(n, k) where each interior entry is the sum of the two entries directly above it."
  },
  {
    "question": "What mathematical formula computes the value at row n, column k (0-indexed) in Pascal's Triangle?",
    "options": [
      "n! / (k! * (n - k)!) (Combination formula C(n, k))",
      "n^k",
      "n * k",
      "n + k"
    ],
    "answerIndex": 0,
    "explanation": "Entries in Pascal's Triangle correspond to binomial combinations: C(n, k) = n! / (k! * (n - k)!)."
  },
  {
    "question": "What is the output of: for (int i = 1; i <= 3; i++) { for (int j = 1; j <= 3; j++) { if (j <= i) printf(\"*\"); } }?",
    "options": [
      "****** (6 stars total: 1 from row 1 + 2 from row 2 + 3 from row 3)",
      "9 stars",
      "3 stars",
      "0 stars"
    ],
    "answerIndex": 0,
    "explanation": "Iter i=1: j=1 prints 1 star. Iter i=2: j=1,2 prints 2 stars. Iter i=3: j=1,2,3 prints 3 stars. Total = 1 + 2 + 3 = 6 stars."
  },
  {
    "question": "What is a Checkerboard / Chessboard pattern logic for printing 'B' (Black) and 'W' (White) squares in an N x N grid?",
    "options": [
      "if ((r + c) % 2 == 0) printf(\"W\"); else printf(\"B\");",
      "if (r == c) printf(\"W\");",
      "if (r % 2 == 0) printf(\"W\");",
      "if (c % 2 == 0) printf(\"B\");"
    ],
    "answerIndex": 0,
    "explanation": "Checking if the sum of row and column indices (r + c) is even vs odd alternates cells in a perfect 2D checkerboard grid."
  },
  {
    "question": "What is the total number of iterations performed by: for (int i = 0; i < 5; i++) for (int j = 0; j < i; j++)?",
    "options": [
      "10 (0 + 1 + 2 + 3 + 4 = 10)",
      "25",
      "5",
      "20"
    ],
    "answerIndex": 0,
    "explanation": "i=0: 0 times. i=1: 1 time. i=2: 2 times. i=3: 3 times. i=4: 4 times. Total = 0 + 1 + 2 + 3 + 4 = 10 iterations."
  },
  {
    "question": "How do you print a hollow square pattern of size N x N?",
    "options": [
      "Print '*' if (r == 1 || r == N || c == 1 || c == N); otherwise print space ' '",
      "Print '*' if (r == c)",
      "Print '*' for all cells",
      "Print space for all cells"
    ],
    "answerIndex": 0,
    "explanation": "A hollow square prints stars only along the outer boundary (row 1, row N, col 1, col N) and spaces in the interior."
  },
  {
    "question": "What is the total number of stars in an N-row solid right-angled triangle?",
    "options": [
      "N * (N + 1) / 2",
      "N * N",
      "N^2 / 2",
      "2 * N"
    ],
    "answerIndex": 0,
    "explanation": "1 + 2 + 3 + ... + N = N * (N + 1) / 2 stars."
  },
  {
    "question": "What is the total number of stars printed in an N x N solid square pattern?",
    "options": [
      "N * N",
      "N * (N + 1) / 2",
      "2 * N",
      "N"
    ],
    "answerIndex": 0,
    "explanation": "N rows * N columns = N * N stars."
  },
  {
    "question": "What pattern is printed by: for (int i = 1; i <= 3; i++) { for (int j = 3; j >= i; j--) printf(\"*\"); printf(\"\\n\"); }?",
    "options": [
      "Inverted right triangle (3 stars, then 2 stars, then 1 star)",
      "Normal right triangle",
      "Square",
      "Single star"
    ],
    "answerIndex": 0,
    "explanation": "i=1: j=3,2,1 (3 stars). i=2: j=3,2 (2 stars). i=3: j=3 (1 star). Output: inverted right triangle."
  },
  {
    "question": "What is the output of: for (int i = 1; i <= 2; i++) { for (int j = 1; j <= 2; j++) { printf(\"%d%d \", i, j); } }?",
    "options": [
      "11 12 21 22 ",
      "11 22 ",
      "12 21 ",
      "1 2 1 2 "
    ],
    "answerIndex": 0,
    "explanation": "Generates 2x2 coordinate pairs: (1,1), (1,2), (2,1), (2,2). Output: '11 12 21 22 '."
  },
  {
    "question": "What is the output of: for (int i = 0; i < 3; i++); printf(\"X\");?",
    "options": [
      "X",
      "XXX",
      "Nothing",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "The semicolon ';' after the for loop header makes the loop body empty. The loop runs 3 times doing nothing, then printf(\"X\") runs ONCE, outputting 'X'."
  },
  {
    "question": "In pattern printing, what is the role of 'printf(\"\\n\");' placed at the end of the outer loop body?",
    "options": [
      "To move the cursor to the next line after completing all column prints for the current row",
      "To clear the screen",
      "To terminate the program",
      "To flush memory"
    ],
    "answerIndex": 0,
    "explanation": "After the inner loop prints all column characters for row r, printf(\"\\n\"); advances the console output to the start of the next row."
  },
  {
    "question": "What is a Diamond pattern of stars?",
    "options": [
      "An upright isosceles star pyramid joined at the base with an inverted isosceles star pyramid",
      "A hollow rectangle",
      "A set of parallel lines",
      "A circle"
    ],
    "answerIndex": 0,
    "explanation": "A diamond pattern combines an upper centered star pyramid with a lower inverted centered star pyramid."
  },
  {
    "question": "How many total rows are in a diamond pattern of radius / half-height N (e.g. top pyramid has N rows)?",
    "options": [
      "2 * N - 1 rows",
      "2 * N rows",
      "N rows",
      "N^2 rows"
    ],
    "answerIndex": 0,
    "explanation": "A diamond with top half N rows has 2 * N - 1 total rows (N rows for upper half, N - 1 rows for lower half)."
  },
  {
    "question": "What is the output of: for (int i = 1; i <= 3; i++) { for (int j = 1; j <= i; j++) printf(\"%d\", i); printf(\" \"); }?",
    "options": [
      "1 22 333 ",
      "1 12 123 ",
      "111 222 333",
      "123"
    ],
    "answerIndex": 0,
    "explanation": "i=1: prints 1. i=2: prints 22. i=3: prints 333. Output: '1 22 333 '."
  },
  {
    "question": "What is a Prime Number?",
    "options": [
      "An integer strictly greater than 1 that has no positive divisors other than 1 and itself",
      "Any odd integer",
      "Any negative integer",
      "A number divisible by 2"
    ],
    "answerIndex": 0,
    "explanation": "A prime number is an integer n > 1 whose only positive factors are 1 and n."
  },
  {
    "question": "What is the optimal upper limit for checking trial division factors of an integer N to test if N is prime?",
    "options": [
      "sqrt(N) (square root of N)",
      "N / 2",
      "N - 1",
      "N"
    ],
    "answerIndex": 0,
    "explanation": "If N has a factor greater than sqrt(N), it must also have a corresponding factor smaller than sqrt(N). Thus, trial division only needs to test up to sqrt(N)."
  },
  {
    "question": "What is the time complexity of testing primality of N using trial division up to sqrt(N)?",
    "options": [
      "O(sqrt(N))",
      "O(N)",
      "O(log N)",
      "O(1)"
    ],
    "answerIndex": 0,
    "explanation": "Testing potential factors from 2 up to sqrt(N) runs in O(sqrt(N)) time."
  },
  {
    "question": "What is an Armstrong Number (Narcissistic Number) for a 3-digit integer?",
    "options": [
      "A number equal to the sum of the cubes of its individual digits (e.g., 153 = 1^3 + 5^3 + 3^3)",
      "A number equal to the sum of its digits",
      "A number equal to the product of its digits",
      "A prime number"
    ],
    "answerIndex": 0,
    "explanation": "153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153. Hence 153 is a 3-digit Armstrong number."
  },
  {
    "question": "Which of the following 3-digit integers is an Armstrong number?",
    "options": [
      "153",
      "100",
      "200",
      "123"
    ],
    "answerIndex": 0,
    "explanation": "153 is an Armstrong number (1^3 + 5^3 + 3^3 = 153). Others like 370, 371, 407 are also 3-digit Armstrong numbers."
  },
  {
    "question": "How do you extract the last digit of a positive integer N in C?",
    "options": [
      "N % 10",
      "N / 10",
      "N - 10",
      "N * 10"
    ],
    "answerIndex": 0,
    "explanation": "N % 10 yields the remainder when divided by 10, which is the rightmost (last) digit of N."
  },
  {
    "question": "How do you remove the last digit of a positive integer N in C?",
    "options": [
      "N = N / 10",
      "N = N % 10",
      "N = N - 10",
      "N = N * 10"
    ],
    "answerIndex": 0,
    "explanation": "Integer division N / 10 truncates the last digit off N (e.g. 153 / 10 = 15)."
  },
  {
    "question": "What loop condition extracts all digits of a positive integer N until N becomes 0?",
    "options": [
      "while (N > 0) { int digit = N % 10; N /= 10; }",
      "while (N == 0)",
      "for (int i=0; i<N; i++)",
      "do { N++; } while(N)"
    ],
    "answerIndex": 0,
    "explanation": "Repeatedly taking N % 10 and setting N /= 10 inside 'while (N > 0)' processes every digit from right to left."
  },
  {
    "question": "What is a Palindrome Number?",
    "options": [
      "A number that remains identical when its digits are reversed (e.g. 121, 1331)",
      "A prime number",
      "A number divisible by 10",
      "An even number"
    ],
    "answerIndex": 0,
    "explanation": "A palindrome number reads the same forwards and backwards (e.g. 121)."
  },
  {
    "question": "How do you construct the reversed number 'rev' from extracted digits 'digit' inside a digit-processing loop?",
    "options": [
      "rev = rev * 10 + digit;",
      "rev = rev + digit;",
      "rev = rev * digit;",
      "rev = digit * 10;"
    ],
    "answerIndex": 0,
    "explanation": "Multiplying current rev by 10 shifts existing digits left, allowing digit to be appended at the units place: rev = rev * 10 + digit."
  },
  {
    "question": "What is the Fibonacci Sequence definition?",
    "options": [
      "A sequence where each term is the sum of the preceding two terms (0, 1, 1, 2, 3, 5, 8, 13, 21...)",
      "A sequence of prime numbers",
      "A sequence of squares",
      "Powers of 2"
    ],
    "answerIndex": 0,
    "explanation": "Fibonacci sequence: F(0)=0, F(1)=1, and F(n) = F(n-1) + F(n-2) for n >= 2."
  },
  {
    "question": "What are the first 6 terms of the standard Fibonacci sequence starting with 0 and 1?",
    "options": [
      "0, 1, 1, 2, 3, 5",
      "1, 2, 3, 4, 5, 6",
      "0, 2, 4, 6, 8, 10",
      "1, 1, 2, 4, 8, 16"
    ],
    "answerIndex": 0,
    "explanation": "F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5."
  },
  {
    "question": "What is a Perfect Number in number theory?",
    "options": [
      "A positive integer that is equal to the sum of its proper positive divisors (excluding itself, e.g. 6 = 1 + 2 + 3)",
      "A square number",
      "A prime number",
      "A power of 10"
    ],
    "answerIndex": 0,
    "explanation": "6 is a Perfect Number because its proper divisors are 1, 2, 3 and 1 + 2 + 3 = 6. (28 is another: 1 + 2 + 4 + 7 + 14 = 28)."
  },
  {
    "question": "Which of the following is the smallest Perfect Number?",
    "options": [
      "6",
      "12",
      "28",
      "1"
    ],
    "answerIndex": 0,
    "explanation": "6 is the smallest perfect number."
  },
  {
    "question": "What algorithm efficiently calculates the Greatest Common Divisor (GCD / HCF) of two integers a and b using repeated modulus?",
    "options": [
      "Euclidean Algorithm (while (b != 0) { int temp = b; b = a % b; a = temp; })",
      "Sieve of Eratosthenes",
      "Binary search",
      "Bubble sort"
    ],
    "answerIndex": 0,
    "explanation": "The Euclidean Algorithm calculates GCD by repeatedly updating (a, b) -> (b, a % b) until b becomes 0. The remaining 'a' is the GCD."
  },
  {
    "question": "What is the mathematical relationship between GCD(a, b) and LCM(a, b) for positive integers a and b?",
    "options": [
      "a * b = GCD(a, b) * LCM(a, b)  =>  LCM(a, b) = (a * b) / GCD(a, b)",
      "LCM(a, b) = a + b",
      "GCD(a, b) = LCM(a, b)",
      "LCM(a, b) = a * b * GCD(a, b)"
    ],
    "answerIndex": 0,
    "explanation": "The product of two numbers equals the product of their GCD and LCM: a * b = GCD * LCM."
  },
  {
    "question": "What is the factorial of N (N!) defined as?",
    "options": [
      "Product of all positive integers from 1 up to N (N! = 1 * 2 * ... * N; 0! = 1)",
      "Sum of numbers from 1 to N",
      "N raised to N",
      "N * 2"
    ],
    "answerIndex": 0,
    "explanation": "N! = 1 * 2 * 3 * ... * N. By mathematical definition, 0! = 1."
  },
  {
    "question": "What is a Strong Number (Krishnamurthy Number / Peterson Number)?",
    "options": [
      "A number equal to the sum of the factorials of its digits (e.g. 145 = 1! + 4! + 5! = 1 + 24 + 120 = 145)",
      "A number divisible by 10",
      "A prime number",
      "An Armstrong number"
    ],
    "answerIndex": 0,
    "explanation": "145 is a Strong Number because 1! + 4! + 5! = 1 + 24 + 120 = 145."
  },
  {
    "question": "What is an Automorphic Number?",
    "options": [
      "A number whose square ends in the same digits as the number itself (e.g. 25^2 = 625, 76^2 = 5776)",
      "A number equal to its cube",
      "A prime number",
      "A self-divisible number"
    ],
    "answerIndex": 0,
    "explanation": "25 is an automorphic number because 25^2 = 625 (ends in 25)."
  },
  {
    "question": "What is a Harshad Number (Niven Number)?",
    "options": [
      "An integer that is divisible by the sum of its digits (e.g. 18 -> 1+8=9; 18 % 9 == 0)",
      "A number with no factors",
      "A prime number",
      "A negative number"
    ],
    "answerIndex": 0,
    "explanation": "18 is a Harshad Number because the sum of its digits (1 + 8 = 9) divides 18 evenly."
  },
  {
    "question": "What is the Sieve of Eratosthenes used for?",
    "options": [
      "Generating all prime numbers up to a specified limit N in O(N log log N) time",
      "Sorting an array",
      "Finding GCD",
      "Matrix multiplication"
    ],
    "answerIndex": 0,
    "explanation": "The Sieve of Eratosthenes is an ancient, highly efficient algorithm for finding all primes up to N."
  },
  {
    "question": "What is the output of a loop accumulating factorial: int f = 1; for (int i = 1; i <= 5; i++) f *= i; printf(\"%d\", f);?",
    "options": [
      "120",
      "24",
      "720",
      "15"
    ],
    "answerIndex": 0,
    "explanation": "5! = 1 * 2 * 3 * 4 * 5 = 120."
  },
  {
    "question": "What is the output of: int a = 12, b = 18; while (b != 0) { int t = b; b = a % b; a = t; } printf(\"%d\", a);?",
    "options": [
      "6 (GCD of 12 and 18)",
      "36 (LCM)",
      "12",
      "18"
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: t=18, b = 12 % 18 = 12, a=18. Iter 2: t=12, b = 18 % 12 = 6, a=12. Iter 3: t=6, b = 12 % 6 = 0, a=6. Exit. GCD = 6."
  },
  {
    "question": "What is the sum of the first N natural numbers formula: 1 + 2 + 3 + ... + N?",
    "options": [
      "N * (N + 1) / 2",
      "N * N",
      "N * (N - 1) / 2",
      "2 * N"
    ],
    "answerIndex": 0,
    "explanation": "Sum of first N natural numbers = N * (N + 1) / 2."
  },
  {
    "question": "What is the sum of the squares of the first N natural numbers formula: 1^2 + 2^2 + ... + N^2?",
    "options": [
      "N * (N + 1) * (2N + 1) / 6",
      "N * (N + 1) / 2",
      "(N * (N + 1) / 2)^2",
      "N^3 / 3"
    ],
    "answerIndex": 0,
    "explanation": "Sum of squares = N * (N + 1) * (2N + 1) / 6."
  },
  {
    "question": "What is the output of: int i = 1; while (i <= 5); { printf(\"%d \", i); i++; }?",
    "options": [
      "Infinite loop (stuck at while (i <= 5); with null body)",
      "1 2 3 4 5 ",
      "1 ",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "The trailing semicolon after while(i <= 5); creates an empty loop body. Since i remains 1, 1 <= 5 is always true, trapping execution in an infinite null loop."
  },
  {
    "question": "What is the output of: int i = 5; do { printf(\"%d \", i); i++; } while (i < 5);?",
    "options": [
      "5 ",
      "Nothing",
      "5 6 ",
      "Infinite loop"
    ],
    "answerIndex": 0,
    "explanation": "do-while executes the body first, printing '5' and setting i=6. Then (6 < 5) evaluates to false, terminating the loop. Output: '5 '."
  },
  {
    "question": "What is the output of: int x = 1; switch(x) { default: printf(\"D\"); case 1: printf(\"1\"); case 2: printf(\"2\"); }?",
    "options": [
      "12",
      "D12",
      "1",
      "D"
    ],
    "answerIndex": 0,
    "explanation": "x = 1 matches case 1:. It skips default: and jumps directly to case 1:, printing '1', then falls through to case 2:, printing '2'. Output: '12'."
  },
  {
    "question": "What is the output of: int a = 0; if (a == 0) if (a = 5) printf(\"X\"); else printf(\"Y\");?",
    "options": [
      "X",
      "Y",
      "Nothing",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Outer if (a == 0) is true (0 == 0). Inner if (a = 5) assigns 5 to 'a' and yields 5 (true). Thus 'X' is printed."
  },
  {
    "question": "What is the output of: int x = 0; for (; x < 3; x++); printf(\"%d\", x);?",
    "options": [
      "3",
      "2",
      "0",
      "4"
    ],
    "answerIndex": 0,
    "explanation": "The empty loop body executes x++ until x = 3 (3 < 3 is false). Afterwards, printf prints 3."
  },
  {
    "question": "What is the output of: int x = 3; switch(x) { case 1: printf(\"1\"); break; case 2: printf(\"2\"); break; } printf(\"END\");?",
    "options": [
      "END",
      "12END",
      "3END",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "x = 3 does not match case 1 or 2, and there is no default label. Control skips the switch block completely and prints 'END'."
  },
  {
    "question": "What is the output of: int i = 0; while (i < 3) { switch(i) { case 0: i += 1; break; case 1: i += 2; break; } printf(\"%d \", i); }?",
    "options": [
      "1 3 ",
      "1 2 3 ",
      "0 1 2 ",
      "Infinite loop"
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: i=0 matches case 0 -> i becomes 1, breaks out of switch (NOT while loop!), prints 1. Iter 2: i=1 matches case 1 -> i becomes 3, breaks switch, prints 3. Next: (3 < 3) false. Output: '1 3 '."
  },
  {
    "question": "In the previous code, what does the 'break' statement inside case 0: exit from?",
    "options": [
      "It exits the switch statement only",
      "It exits the while loop",
      "It exits the main function",
      "It exits both switch and while"
    ],
    "answerIndex": 0,
    "explanation": "Inside a switch embedded in a loop, 'break' exits ONLY the switch block, NOT the surrounding loop."
  },
  {
    "question": "What is the output of: int i = 0; for (printf(\"A\"); i < 1; printf(\"C\")) { printf(\"B\"); i++; }?",
    "options": [
      "ABC",
      "ABCABC",
      "BAC",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Init: prints 'A'. Condition (0 < 1) true -> Body: prints 'B', i becomes 1. Update: prints 'C'. Condition (1 < 1) false. Output: 'ABC'."
  },
  {
    "question": "What is the output of: int i = 0; if (i == 0) goto label; else printf(\"NO\"); label: printf(\"YES\");?",
    "options": [
      "YES",
      "NOYES",
      "YESNO",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Condition i == 0 is true. Control jumps directly to 'label:', skipping the else branch, and prints 'YES'."
  },
  {
    "question": "What is the output of: int x = 1; if (x) { printf(\"1\"); goto label; printf(\"2\"); } label: printf(\"3\");?",
    "options": [
      "13",
      "123",
      "3",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Prints '1', jumps over printf(\"2\") directly to label:, and prints '3'. Output is '13'."
  },
  {
    "question": "What is the output of: for (int i = 0; i < 5; i++) { if (i < 3) continue; else break; printf(\"%d \", i); }?",
    "options": [
      "Nothing is ever printed",
      "0 1 2 3 4 ",
      "3 4 ",
      "0 1 2 "
    ],
    "answerIndex": 0,
    "explanation": "For i=0, 1, 2: condition i < 3 triggers continue (skipping printf). For i=3: condition fails, else branch triggers break (exiting loop). printf is never reached!"
  },
  {
    "question": "What is the output of: int x = 10; if (x > 5) ; else ; printf(\"DONE\");?",
    "options": [
      "DONE",
      "Compiler error",
      "Nothing",
      "DONE DONE"
    ],
    "answerIndex": 0,
    "explanation": "Both if and else have null statements ';' as their bodies. The code compiles legally and prints 'DONE'."
  },
  {
    "question": "What is the output of: int i = 0; do { printf(\"%d \", i); i += 2; } while (i < 5);?",
    "options": [
      "0 2 4 ",
      "0 1 2 3 4 ",
      "0 2 ",
      "2 4 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: prints 0, i becomes 2, check (2 < 5) true. Iter 2: prints 2, i becomes 4, check (4 < 5) true. Iter 3: prints 4, i becomes 6, check (6 < 5) false. Output: '0 2 4 '."
  },
  {
    "question": "What is the output of: int a = 1; switch(a) { case 1: printf(\"1 \"); case 1+1: printf(\"2 \"); break; case 1+2: printf(\"3 \"); }?",
    "options": [
      "1 2 ",
      "1 ",
      "1 2 3 ",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "case 1+1 evaluates to case 2:. Matches case 1:, prints '1 ', falls through case 2:, prints '2 ', hits break. Output: '1 2 '."
  },
  {
    "question": "What is the output of: int x = 2; switch(x) { case 2: printf(\"TWO \"); default: printf(\"DEF \"); }?",
    "options": [
      "TWO DEF ",
      "TWO ",
      "DEF ",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Matches case 2:, prints 'TWO '. Because there is no break statement, it falls through to default: and prints 'DEF '. Output: 'TWO DEF '."
  },
  {
    "question": "What is the output of: int i = 3; while (i--) printf(\"%d \", i);?",
    "options": [
      "2 1 0 ",
      "3 2 1 0 ",
      "3 2 1 ",
      "2 1 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: i=3 (true), i becomes 2, prints 2. Iter 2: i=2 (true), i becomes 1, prints 1. Iter 3: i=1 (true), i becomes 0, prints 0. Iter 4: i=0 (false), loop ends. Output: '2 1 0 '."
  },
  {
    "question": "What is the value of 'i' after exiting the loop in the previous question: while (i--)?",
    "options": [
      "-1",
      "0",
      "1",
      "3"
    ],
    "answerIndex": 0,
    "explanation": "In Iter 4, condition checks i=0 (false), but post-decrement i-- STILL executes, leaving i = -1 after loop termination."
  },
  {
    "question": "What is the output of: int i = 3; while (--i) printf(\"%d \", i);?",
    "options": [
      "2 1 ",
      "3 2 1 ",
      "2 1 0 ",
      "1 0 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: --i makes i=2 (true), prints 2. Iter 2: --i makes i=1 (true), prints 1. Iter 3: --i makes i=0 (false), loop terminates. Output: '2 1 '."
  },
  {
    "question": "What is the value of 'i' after exiting the loop in the previous question: while (--i)?",
    "options": [
      "0",
      "-1",
      "1",
      "2"
    ],
    "answerIndex": 0,
    "explanation": "In Iter 3, --i reduces i from 1 to 0. 0 is false, loop terminates. Value of i remains 0."
  },
  {
    "question": "What is the output of: int x = 0; switch(x) { case 0: if (x == 0) printf(\"A\"); else printf(\"B\"); break; default: printf(\"C\"); }?",
    "options": [
      "A",
      "B",
      "AC",
      "Compiler error"
    ],
    "answerIndex": 0,
    "explanation": "Enters case 0:. The if (x == 0) check is true, printing 'A'. Hits break and exits switch. Output is 'A'."
  },
  {
    "question": "What is the output of: for (int i = 0; i < 2; i++) { for (int j = 0; j < 2; j++) { if (i == j) break; printf(\"%d%d \", i, j); } }?",
    "options": [
      "10 ",
      "00 11 ",
      "01 10 ",
      "Nothing"
    ],
    "answerIndex": 0,
    "explanation": "i=0: j=0 -> i==j (0==0) triggers break inner loop. i=1: j=0 -> (1==0 false) prints 10; j=1 -> (1==1) breaks inner loop. Output: '10 '."
  },
  {
    "question": "What is the output of: int i = 1; do { printf(\"%d \", i); } while (i++ < 3);?",
    "options": [
      "1 2 3 ",
      "1 2 ",
      "1 2 3 4 ",
      "2 3 4 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: prints 1, checks (1 < 3) true, i becomes 2. Iter 2: prints 2, checks (2 < 3) true, i becomes 3. Iter 3: prints 3, checks (3 < 3) false, i becomes 4. Output: '1 2 3 '."
  },
  {
    "question": "What is the output of: int i = 1; do { printf(\"%d \", i); } while (++i < 3);?",
    "options": [
      "1 2 ",
      "1 2 3 ",
      "1 ",
      "2 3 "
    ],
    "answerIndex": 0,
    "explanation": "Iter 1: prints 1, ++i makes i=2, checks (2 < 3) true. Iter 2: prints 2, ++i makes i=3, checks (3 < 3) false. Loop ends. Output: '1 2 '."
  },
  {
    "question": "What is the output of: int x = 5; if (x > 0) printf(\"A\"); else if (x > 3) printf(\"B\"); else printf(\"C\");?",
    "options": [
      "A",
      "AB",
      "ABC",
      "B"
    ],
    "answerIndex": 0,
    "explanation": "In an else-if ladder, execution stops at the FIRST true condition. Since x > 0 is true, 'A' is printed and all subsequent else-if/else branches are bypassed."
  }
];
