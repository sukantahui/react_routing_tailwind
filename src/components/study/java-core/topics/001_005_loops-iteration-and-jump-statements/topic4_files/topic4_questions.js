/**
 * Module 001_005: Topic 4: Entry-controlled loops: 'while' loop syntax, condition validation, and use cases
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Entry-Controlled loop in Java (JLS §14.12)?",
    shortAnswer: "A loop that evaluates its boolean condition BEFORE executing the body statements on every iteration cycle.",
    explanation: "`while` and `for` are entry-controlled loops in Java.",
    hint: "Evaluates condition before body execution.",
    level: "basic",
    codeExample: "while (condition) { /* Body */ }"
  },
  {
    question: "What is the standard syntax of a `while` loop in Java?",
    shortAnswer: "`while (BooleanExpression) { Statement(s) }`",
    explanation: "The condition must evaluate to a primitive `boolean` or `Boolean` wrapper.",
    hint: "while (booleanCondition) { ... }",
    level: "basic",
    codeExample: "int count = 0; while (count < 5) { count++; }"
  },
  {
    question: "How many times does a `while` loop execute if the condition is `false` initially?",
    shortAnswer: "Exactly 0 times (zero executions).",
    explanation: "Because the condition is checked prior to entering the body.",
    hint: "Zero times if condition is initially false.",
    level: "basic",
    codeExample: "int x = 100; while (x < 10) { print(\"Never prints\"); }"
  },
  {
    question: "What happens if the loop body never updates the variables tested in the `while` condition?",
    shortAnswer: "An Infinite Loop occurs, causing the program to hang or consume 100% CPU on that thread.",
    explanation: "The condition remains perpetually true.",
    hint: "Causes an infinite loop.",
    level: "basic",
    codeExample: "int i = 0;\nwhile (i < 5) {\n    System.out.println(i);\n    // Missing i++ causes infinite loop!\n}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab wallet simulator, how does the `while` loop operate?",
    shortAnswer: "It deducts hourly lab charges (₹400) as long as `studentWalletBalance >= hourlyLabCharge` in Indian Rupees (₹).",
    explanation: "Demonstrates practical event-driven wallet balance depletion.",
    hint: "Deducts hourly lab fee until wallet balance is exhausted.",
    level: "basic",
    codeExample: "while (wallet >= hourlyRate) { wallet -= hourlyRate; }"
  },
  {
    question: "How does the classic Number Digit Extraction algorithm work using a `while` loop?",
    shortAnswer: "By extracting the last digit with `num % 10` and stripping the last digit with `num /= 10` while `num > 0`.",
    explanation: "Foundational arithmetic algorithm in programming.",
    hint: "num % 10 extracts last digit; num /= 10 removes it.",
    level: "basic",
    codeExample: "while (n > 0) { int d = n % 10; sum += d; n /= 10; }"
  },
  {
    question: "What is an Indefinite Loop and why is `while` ideal for it?",
    shortAnswer: "A loop where the exact number of iterations is unknown in advance and depends on external events, user input, or state flags.",
    explanation: "`while` shines in state-driven and stream-reading scenarios.",
    hint: "Number of iterations is determined by dynamic runtime state.",
    level: "basic",
    codeExample: "while (scanner.hasNextLine()) { process(scanner.nextLine()); }"
  },
  {
    question: "What is the canonical syntax for an infinite `while` loop in Java?",
    shortAnswer: "`while (true) { ... }`",
    explanation: "Standard pattern for server listeners, GUI event loops, and game engines.",
    hint: "while (true).",
    level: "basic",
    codeExample: "while (true) { Socket s = server.accept(); handle(s); }"
  },
  {
    question: "Can an integer literal be used directly in a `while` condition (`while (1)`) like in C/C++?",
    shortAnswer: "No! Java requires an explicit `boolean` expression (`while (1)` causes a compile-time error: `incompatible types: int cannot be converted to boolean`).",
    explanation: "Java enforces strict type safety for boolean conditions.",
    hint: "Compile error: Java requires boolean, not integer.",
    level: "basic",
    codeExample: "// while (1) // COMPILER ERROR in Java! Use while (true)"
  },
  {
    question: "What happens if a semicolon is accidentally placed after the `while` condition (`while (i < 5); { i++; }`)?",
    shortAnswer: "An Infinite Loop occurs! The semicolon acts as an empty body executed repeatedly while `i` remains unchanged at `0`.",
    explanation: "The block `{ i++; }` is never reached.",
    hint: "Creates an infinite loop executing the empty semicolon statement.",
    level: "basic",
    codeExample: "int i = 0;\nwhile (i < 5); // INFINITE LOOP!\n{ i++; }"
  },
  {
    question: "What is a Sentinel Value in a `while` input loop?",
    shortAnswer: "A designated special value (e.g. `-1`, `\"QUIT\"`, `\"END\"`) used to signal termination of user or stream input.",
    explanation: "Allows dynamic stream termination without knowing item counts.",
    hint: "Special value that signals the loop to terminate.",
    level: "basic",
    codeExample: "while ((input = reader.readLine()) != null && !input.equals(\"QUIT\")) { }"
  },
  {
    question: "How does the Java compiler verify Reachability after a `while (true)` loop without a `break`?",
    shortAnswer: "Statements written immediately after an unbroken `while (true)` loop cause a compile-time error: `unreachable statement`.",
    explanation: "Definite assignment and reachability analysis (JLS §14.21).",
    hint: "Compile error: unreachable statement.",
    level: "intermediate",
    codeExample: "while (true) { }\n// System.out.println(\"Unreachable!\"); // COMPILER ERROR!"
  },
  {
    question: "How does the Java compiler handle `while (false) { ... }`?",
    shortAnswer: "Compilation error: `unreachable statement` (the loop body can never execute).",
    explanation: "Java compiler rejects unreachable blocks for literal false conditions.",
    hint: "Compile error: unreachable statement in loop body.",
    level: "intermediate",
    codeExample: "// while (false) { doWork(); } // COMPILER ERROR!"
  },
  {
    question: "What is the difference between `while` and `do-while` in boundary testing?",
    shortAnswer: "`while` tests the boundary BEFORE execution (0 or more times); `do-while` tests the boundary AFTER execution (1 or more times).",
    explanation: "Pre-test vs post-test loop semantics.",
    hint: "while is 0 or more; do-while is 1 or more.",
    level: "basic",
    codeExample: "// while (pre-test) vs do-while (post-test)"
  },
  {
    question: "Can multiple boolean conditions be combined in a `while` header (`while (x > 0 && !isDone)`)?",
    shortAnswer: "Yes! Using standard logical operators `&&`, `||`, and `!`.",
    explanation: "Full support for compound boolean expressions.",
    hint: "Yes, combined with logical operators.",
    level: "basic",
    codeExample: "while (balance >= fee && hoursLeft > 0) { deduct(); }"
  },
  {
    question: "What is the bytecode instruction structure emitted for a `while` loop?",
    shortAnswer: "An unconditional `goto` jump to the condition check label, an `if_icmp` branch to the body label if true, and a return to the condition check.",
    explanation: "Loop rotation optimization in bytecode.",
    hint: "Uses goto to condition and conditional jump to body.",
    level: "advanced",
    codeExample: "// Bytecode: goto L_COND -> L_BODY: ... -> L_COND: if_icmplt L_BODY"
  },
  {
    question: "In algorithm design, how is a `while` loop used to Reverse a Number mathematically?",
    shortAnswer: "`int rev = 0; while (n > 0) { rev = rev * 10 + n % 10; n /= 10; }`.",
    explanation: "Builds the reversed number digit by digit.",
    hint: "rev = rev * 10 + n % 10; n /= 10.",
    level: "basic",
    codeExample: "int rev = 0;\nwhile (n > 0) {\n    rev = rev * 10 + (n % 10);\n    n /= 10;\n}"
  },
  {
    question: "How does a `while` loop check if a number is a Palindrome Number?",
    shortAnswer: "By reversing the number using `while (n > 0)` and checking if `originalNumber == reversedNumber`.",
    explanation: "Standard interview coding question.",
    hint: "Reverses number via while loop and compares with original.",
    level: "basic",
    codeExample: "boolean isPalin = (original == reversed);"
  },
  {
    question: "What is a 'Spin Lock' or 'Busy Wait' using a `while` loop?",
    shortAnswer: "A loop that continuously checks a volatile boolean flag (`while (!isReady);`) without yielding CPU cycles.",
    explanation: "Common in low-latency lock-free concurrency, though consumes CPU.",
    hint: "Continuously checking a condition in a tight loop.",
    level: "advanced",
    codeExample: "while (!flag.get()) { Thread.onSpinWait(); }"
  },
  {
    question: "Can a `while` loop body declare local variables?",
    shortAnswer: "Yes! Variables declared inside the body `{ int temp = ...; }` are scoped strictly to that single iteration.",
    explanation: "Re-allocated per iteration.",
    hint: "Yes, scoped to the individual iteration body.",
    level: "basic",
    codeExample: "while (hasMore()) {\n    String line = readLine();\n}"
  },
  {
    question: "What is the Time Complexity of a `while` loop halving a number (`while (n > 0) n /= 2;`)?",
    shortAnswer: "$O(\\log_2 N)$ logarithmic time complexity.",
    explanation: "Divides problem size by 2 on every cycle.",
    hint: "O(log N) logarithmic time.",
    level: "intermediate",
    codeExample: "while (n > 0) { n /= 2; } // O(log N) iterations"
  },
  {
    question: "How does a `while` loop process an `Iterator<T>` in the Java Collections Framework?",
    shortAnswer: "`while (iterator.hasNext()) { T item = iterator.next(); }`.",
    explanation: "Foundational pattern for iterating collections prior to enhanced for-each.",
    hint: "while (iterator.hasNext()) { iterator.next(); }.",
    level: "basic",
    codeExample: "Iterator<Student> it = list.iterator();\nwhile (it.hasNext()) { process(it.next()); }"
  },
  {
    question: "What happens if an exception is thrown inside a `while` loop body without a `try-catch`?",
    shortAnswer: "The loop terminates abruptly, and the exception unwinds up the call stack.",
    explanation: "Uncaught exceptions exit loops immediately.",
    hint: "Loop terminates abruptly and propagates exception.",
    level: "basic",
    codeExample: "while (running) { throw new RuntimeException(); } // Abrupt exit"
  },
  {
    question: "Can a `while` loop be used with a `break` statement inside an `if` block?",
    shortAnswer: "Yes! `if (exitCondition) break;` is the standard way to exit early from a `while` loop.",
    explanation: "Common for complex multi-point termination logic.",
    hint: "Yes, break exits while loops immediately.",
    level: "basic",
    codeExample: "while (true) { if (isDone()) break; }"
  },
  {
    question: "What is the difference between converting `for (int i=0; i<N; i++)` to `while`?",
    shortAnswer: "In `while`, `int i = 0` must be declared before the loop, and `i++` must be manually placed at the end of the body.",
    explanation: "Translating between loop constructs.",
    hint: "Initialization sits outside, update sits inside body.",
    level: "basic",
    codeExample: "int i = 0;\nwhile (i < N) {\n    doWork();\n    i++;\n}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student registration system, how are digit sums computed?",
    shortAnswer: "By extracting registration code digits using `digit = temp % 10; sum += digit; temp /= 10;` in a `while (temp > 0)` loop.",
    explanation: "Demonstrates practical digit summing.",
    hint: "Extracts and sums digits via while (temp > 0).",
    level: "basic",
    codeExample: "while (temp > 0) { sum += temp % 10; temp /= 10; }"
  },
  {
    question: "What is the 'Liveness' hazard in while loops?",
    shortAnswer: "When a thread becomes trapped indefinitely in a while loop waiting for a state change that never occurs (livelock/infinite loop).",
    explanation: "Key concept in concurrent systems.",
    hint: "Thread trapped waiting for a condition that never becomes true.",
    level: "advanced",
    codeExample: "while (!isComplete) { /* Livelock if isComplete is never set */ }"
  },
  {
    question: "How do you defensively protect a `while` loop against runaway execution in production?",
    shortAnswer: "By introducing a safety timeout or maximum iteration guard: `if (++safetyCount > MAX_ITER) throw new TimeoutException();`.",
    explanation: "Enterprise resilience best practice.",
    hint: "Add a maximum iteration counter ceiling.",
    level: "intermediate",
    codeExample: "while (status != READY) { if (++attempts > 100) break; }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 4 for Java developers?",
    shortAnswer: "The `while` loop is an entry-controlled, pre-test construct ideal for indefinite, state-driven, and event-driven iterations; it safely executes 0 times if the condition is initially false and requires careful state mutations to avoid infinite loops.",
    explanation: "Fundamental workhorse of event-driven and stream-based programming.",
    hint: "Entry-controlled loop for indefinite state-driven iterations.",
    level: "basic",
    codeExample: "// Summary: while (condition) { doWork(); updateState(); }"
  },
  {
    question: "What is the next topic (Topic 5) in Module 001_005?",
    shortAnswer: "Exit-controlled loops: 'do-while' loop syntax and guaranteed single execution.",
    explanation: "Topic 5 explores post-test `do-while` loops and guaranteed minimum single execution.",
    hint: "Exit-controlled loops: 'do-while' loop syntax.",
    level: "basic",
    codeExample: "// Topic 5: Exit-controlled 'do-while' loops"
  }
];

export default questions;
