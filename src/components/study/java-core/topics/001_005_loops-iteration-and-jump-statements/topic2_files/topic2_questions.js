/**
 * Module 001_005: Topic 2: Variable scope within for loop headers
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the Scope of a variable declared in a `for` loop header (`for (int i = 0; ...)`)?",
    shortAnswer: "The variable's scope is strictly confined to the `for` statement itself—including the header clauses and the body block `{ ... }`.",
    explanation: "Under JLS §6.3, the declaration does not leak into the enclosing method scope.",
    hint: "Scoped strictly inside the for header and body.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) { }\n// 'i' is destroyed here!"
  },
  {
    question: "What error occurs if you attempt to access a header-declared variable after the `for` loop?",
    shortAnswer: "Compilation error: `cannot find symbol: variable [name]`.",
    explanation: "Because the variable ceased to exist when the loop block closed.",
    hint: "Compiler error: cannot find symbol.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) {}\nSystem.out.println(i); // COMPILER ERROR!"
  },
  {
    question: "Can two consecutive (sibling) `for` loops use the same variable name (`int i`)?",
    shortAnswer: "Yes! Because the lifetime and scope of `i` from the first loop ends before the second loop begins.",
    explanation: "Standard idiomatic practice in Java programming.",
    hint: "Yes, because the scope of the first variable has already ended.",
    level: "basic",
    codeExample: "for (int i = 0; i < 3; i++) {}\nfor (int i = 0; i < 3; i++) {} // Perfectly legal!"
  },
  {
    question: "Can you declare a variable in a `for` header with the same name as an existing local variable in the enclosing method?",
    shortAnswer: "No! In Java, local variable shadowing within the same method is strictly prohibited, causing a compile-time error: `variable [name] is already defined in method`.",
    explanation: "Java forbids shadowing local variables to prevent subtle bug injection.",
    hint: "Illegal: cannot shadow an existing local variable in the same method.",
    level: "basic",
    codeExample: "int i = 10;\nfor (int i = 0; i < 5; i++) {} // COMPILER ERROR: duplicate variable i"
  },
  {
    question: "Can a `for` loop header variable have the same name as a Class Field (instance/static variable)?",
    shortAnswer: "Yes! A local loop variable CAN shadow a class-level field (the field can still be accessed via `this.field`).",
    explanation: "Field shadowing is permitted, though distinctive naming is recommended.",
    hint: "Yes, local loop variables can shadow class fields.",
    level: "intermediate",
    codeExample: "class Student { int id = 10; void m() { for (int id = 0; id < 5; id++) {} } }"
  },
  {
    question: "How do you preserve the final value of a loop counter after the loop terminates?",
    shortAnswer: "By declaring the counter variable BEFORE the loop header: `int i; for (i = 0; i < N; i++) { ... }`.",
    explanation: "Gives the variable method-level scope so its terminating value remains accessible.",
    hint: "Declare the variable before the loop header.",
    level: "basic",
    codeExample: "int i; for (i = 0; i < 10; i++) { if (found) break; }\nSystem.out.println(\"Stopped at: \" + i);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student search system, why is `index` declared outside the loop?",
    shortAnswer: "To preserve the matched array index after a `break`, allowing subsequent verification and display of the student's name outside the loop.",
    explanation: "Demonstrates practical search index preservation.",
    hint: "Preserves index to verify student name after loop.",
    level: "basic",
    codeExample: "int index; for (index = 0; index < scores.length; index++) { if (...) break; }"
  },
  {
    question: "Can you declare a variable inside the loop BODY with the same name as the header variable?",
    shortAnswer: "No! Writing `int i = 5;` inside the body when `for (int i = 0; ...)` is in the header causes a compile-time error: `variable i is already defined`.",
    explanation: "The header variable is already in scope within the body.",
    hint: "Compile error: duplicate variable in scope.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) {\n    // int i = 20; // COMPILER ERROR!\n}"
  },
  {
    question: "What is the lifetime of a variable declared INSIDE the loop body (`{ int temp = compute(); }`)?",
    shortAnswer: "A new instance of `temp` is created at the start of each iteration and destroyed at the end of that iteration.",
    explanation: "Re-allocated and eligible for garbage collection per iteration.",
    hint: "Created and destroyed on every individual iteration.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) { int temp = i * 2; } // temp recreated each cycle"
  },
  {
    question: "Can multiple variables of DIFFERENT types be declared in the same `for` loop header?",
    shortAnswer: "No! All variables declared in a single `for` loop initialization clause must share the SAME data type (`for (int i = 0, j = 10; ...)`).",
    explanation: "Java grammar only permits a single type specifier per declaration statement.",
    hint: "No, all variables in the header must be of the same type.",
    level: "intermediate",
    codeExample: "// for (int i = 0, double d = 0.0; ...) // COMPILER ERROR!"
  },
  {
    question: "Can you use `var` (Local Variable Type Inference) in a `for` loop header in Java 10+?",
    shortAnswer: "Yes! E.g. `for (var i = 0; i < 10; i++)` is completely valid, inferring `i` as `int`.",
    explanation: "Supported under Java 10 JEP 286.",
    hint: "Yes, var is valid in for loop headers.",
    level: "basic",
    codeExample: "for (var i = 0; i < 5; i++) { System.out.println(i); }"
  },
  {
    question: "Can you declare multiple variables using `var` in a single `for` loop header (`for (var i = 0, j = 10; ...)` )?",
    shortAnswer: "No! `var` does not support compound/comma-separated variable declarations in Java.",
    explanation: "JEP 286 prohibits compound variable declarations with `var`.",
    hint: "No, var cannot be used in compound comma-separated declarations.",
    level: "intermediate",
    codeExample: "// for (var i = 0, j = 10; ...) // COMPILER ERROR!"
  },
  {
    question: "What happens to objects instantiated inside a `for` loop body across 1,000,000 iterations?",
    shortAnswer: "They become unreferenced at the end of each iteration and become eligible for Young Generation Garbage Collection (Eden space).",
    explanation: "Understanding memory churn in tight loops.",
    hint: "Eligible for Young Gen Garbage Collection after each iteration.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < 1_000_000; i++) { String s = new String(\"temp\"); }"
  },
  {
    question: "Why is declaring variables inside the narrowest possible scope considered an industry best practice?",
    shortAnswer: "It prevents accidental variable reuse/corruption, minimizes memory footprint, reduces mental tracking burden, and avoids namespace pollution.",
    explanation: "Core clean code guideline (Effective Java Item 57: Minimize the scope of local variables).",
    hint: "Minimizes scope, prevents accidental mutation, and improves readability.",
    level: "basic",
    codeExample: "// Declare variables in the smallest enclosing block possible"
  },
  {
    question: "Can a `for` loop header variable be marked as `final` (`for (final int i = 0; i < 5; i++)`)?",
    shortAnswer: "No! Marking `final int i = 0` causes a compile error on `i++` because a `final` variable cannot be reassigned.",
    explanation: "The update clause `i++` requires mutating `i`.",
    hint: "Compile error: final variable cannot be mutated by i++.",
    level: "basic",
    codeExample: "// for (final int i = 0; i < 5; i++) // COMPILER ERROR on i++!"
  },
  {
    question: "Can the iteration variable in an ENHANCED `for-each` loop be marked as `final` (`for (final String s : list)`)?",
    shortAnswer: "Yes! Because each iteration introduces a fresh variable binding that is never reassigned during that cycle.",
    explanation: "Useful for capturing variables in local lambdas/anonymous classes.",
    hint: "Yes, final is legal in enhanced for-each loops.",
    level: "intermediate",
    codeExample: "for (final String name : studentNames) { System.out.println(name); }"
  },
  {
    question: "What happens if a nested loop declares a variable with the same name as the outer loop (`for (int i=0;...) { for (int i=0;...) }`)?",
    shortAnswer: "Compilation error: `variable i is already defined in method`.",
    explanation: "Inner nested blocks cannot shadow variables from outer enclosing blocks.",
    hint: "Compile error: cannot redeclare outer loop variable in inner loop.",
    level: "basic",
    codeExample: "// for (int i=0; i<3; i++) { for (int i=0; i<3; i++) {} } // COMPILER ERROR!"
  },
  {
    question: "What is the conventional naming standard for nested loop variables?",
    shortAnswer: "Outer loop: `i`; second nested loop: `j`; third nested loop: `k` (or descriptive names like `row`, `col`, `layer`).",
    explanation: "Mathematical convention dating back to Fortran.",
    hint: "i for outer, j for inner, k for third.",
    level: "basic",
    codeExample: "for (int i = 0; i < rows; i++) { for (int j = 0; j < cols; j++) {} }"
  },
  {
    question: "In JVM bytecode, how are loop header variables represented in the Local Variable Table?",
    shortAnswer: "They occupy a local variable slot with a `start_pc` corresponding to the loop initialization instruction and a `length` extending to the loop termination label.",
    explanation: "Scoped precisely to bytecode instruction offsets.",
    hint: "Mapped to a local variable slot for the loop's bytecode offset range.",
    level: "advanced",
    codeExample: "// LocalVariableTable: slot 1, name i, length L_END - L_START"
  },
  {
    question: "Can two non-nested sibling loops share the same local variable slot in JVM bytecode?",
    shortAnswer: "Yes! The Java compiler reuses local variable table slots for variables whose lexical scopes do not overlap, reducing stack frame memory size.",
    explanation: "Local variable slot reuse optimization.",
    hint: "Yes, JVM reuses stack frame slots for non-overlapping variables.",
    level: "advanced",
    codeExample: "// Slot 1 reused by loop A's 'i' and loop B's 'i'"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how is variable reuse demonstrated with shift seat allocation?",
    shortAnswer: "By allocating morning shift seats using `int seatNo` in Loop A, and evening shift seats using `int seatNo` in Loop B without variable collision in Indian Rupees (₹).",
    explanation: "Demonstrates clean sibling loop variable redeclaration.",
    hint: "Morning and evening shift loops reuse seatNo cleanly.",
    level: "basic",
    codeExample: "for (int seatNo=1; seatNo<=3; seatNo++) { ... }"
  },
  {
    question: "Can you assign a value to a loop header variable from inside the loop body (`for (int i=0; i<10; i++) { i = 8; }`)?",
    shortAnswer: "Yes, it is syntactically legal, but considered a bad practice because it obfuscates the control flow and causes difficult-to-trace bugs.",
    explanation: "Violates predictable counter progression.",
    hint: "Legal but considered bad practice.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < 10; i++) { if (condition) i = 9; }"
  },
  {
    question: "What is the scope of a variable declared in a standalone block `{ int x = 5; }` before a `for` loop?",
    shortAnswer: "`x` is destroyed when the standalone block closes, so `x` can be declared again in the subsequent `for` loop header without error.",
    explanation: "Block scope limits variable visibility.",
    hint: "x is destroyed when its block closes.",
    level: "intermediate",
    codeExample: "{ int x = 5; }\nfor (int x = 0; x < 3; x++) {} // Completely legal!"
  },
  {
    question: "Can a lambda expression inside a `for` loop body capture the loop counter `i` directly?",
    shortAnswer: "No! A lambda can only capture `final` or effectively final variables; since `i` is mutated by `i++`, the compiler rejects capturing `i` directly.",
    explanation: "Requires creating an effectively final local copy: `int copy = i; Runnable r = () -> print(copy);`.",
    hint: "Cannot capture mutating counter; requires an effectively final copy.",
    level: "advanced",
    codeExample: "for (int i = 0; i < 5; i++) {\n    int copy = i; // Effectively final\n    list.add(() -> System.out.println(copy));\n}"
  },
  {
    question: "What is 'Variable Bleed' and how does header scoping prevent it?",
    shortAnswer: "Variable Bleed is when a loop counter remains accessible after the loop finishes, allowing other subsequent code to accidentally inspect or mutate stale loop state.",
    explanation: "Header scoping strictly confines the variable to the loop, preventing bleed.",
    hint: "Header scoping prevents stale counter access after loop ends.",
    level: "basic",
    codeExample: "// Header scope isolates variable, preventing accidental bleed"
  },
  {
    question: "What is the result of `int a = 0; for (int b = 0; b < 2; b++) { a += b; } System.out.println(a);`?",
    shortAnswer: "`1` (`a = 0 + 0 + 1 = 1`).",
    explanation: "`a` is in method scope and accumulates `b` values `0` and `1`.",
    hint: "Prints 1.",
    level: "basic",
    codeExample: "int a = 0; for (int b = 0; b < 2; b++) a += b;"
  },
  {
    question: "Can a loop header declare an array variable (`for (int[] arr = {1, 2}; ...; )`)?",
    shortAnswer: "Yes! Any variable declaration syntax is legal in the initialization clause.",
    explanation: "Array references can be initialized in loop headers.",
    hint: "Yes, array declarations are valid in headers.",
    level: "intermediate",
    codeExample: "for (int[] arr = {1, 2, 3}; arr[0] < 5; arr[0]++) { }"
  },
  {
    question: "What is Effective Java Item 57 recommendation for loop variable scope?",
    shortAnswer: "Always prefer `for` loops over `while` loops when iterating with a counter, because `for` loops eliminate the possibility of copy-paste scope bugs by strictly scoping the counter.",
    explanation: "Josh Bloch's classic clean code guidance.",
    hint: "Prefer for loops to confine counter variable scope.",
    level: "intermediate",
    codeExample: "// Item 57: Minimize the scope of local variables"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 2 for Java developers?",
    shortAnswer: "Variables declared in `for` loop headers have strictly bounded block scope; this prevents variable bleed, allows safe name reuse across sibling loops, and enforces immutability of the outer method namespace.",
    explanation: "Fundamental scoping mechanism in Java programming.",
    hint: "Header scoping bounds variable lifetime, preventing bleed and enabling clean reuse.",
    level: "basic",
    codeExample: "// Summary: Scope in header = clean, leak-free iteration"
  },
  {
    question: "What is the next topic (Topic 3) in Module 001_005?",
    shortAnswer: "Multiple initializations and updates in a single for loop header.",
    explanation: "Topic 3 explores comma-separated compound initializations and multi-variable updates (`for (int i=0, j=10; i<j; i++, j--)`).",
    hint: "Multiple initializations and updates in for loop headers.",
    level: "basic",
    codeExample: "// Topic 3: Multiple Initializations and Updates"
  }
];

export default questions;
