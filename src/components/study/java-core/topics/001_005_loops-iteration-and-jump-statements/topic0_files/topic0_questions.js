/**
 * Module 001_005: Topic 0: Concept of iteration and why loops are fundamental to programming
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the concept of Iteration in computer programming?",
    shortAnswer: "The repeated execution of a block of code instructions until a specified boolean condition is satisfied or becomes false.",
    explanation: "Allows software to automate repetitive tasks without duplicating code.",
    hint: "Repetitive execution of a block of code.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) { doWork(); }"
  },
  {
    question: "What is the Böhm-Jacopini Structure Theorem?",
    shortAnswer: "A foundational computer science theorem proving that any computable algorithm can be expressed using only three control structures: Sequence, Selection (if-else/switch), and Iteration (loops).",
    explanation: "Proved in 1966, establishing the theoretical basis for all modern structured programming.",
    hint: "Sequence, Selection, and Iteration are sufficient for any algorithm.",
    level: "basic",
    codeExample: "// 1. Sequence -> 2. Selection (if) -> 3. Iteration (loops)"
  },
  {
    question: "What are the 4 fundamental phases present in every loop structure?",
    shortAnswer: "1. Initialization (setting starting counter value); 2. Loop Condition (boolean check); 3. Loop Body (statements executed); 4. Update Expression (incrementing/decrementing counter).",
    explanation: "All loop constructs (`for`, `while`, `do-while`) rely on these four phases.",
    hint: "Initialization, Condition, Body, and Update.",
    level: "basic",
    codeExample: "for (/* 1. Init */; /* 2. Cond */; /* 4. Update */) {\n    /* 3. Body */\n}"
  },
  {
    question: "Why is manual code duplication (WET principle) an anti-pattern compared to loops?",
    shortAnswer: "Because copy-pasting code increases file size, creates maintenance nightmares, makes changes error-prone, and cannot scale to dynamic input sizes.",
    explanation: "Violates the DRY (Don't Repeat Yourself) principle.",
    hint: "WET increases bugs and cannot scale dynamically.",
    level: "basic",
    codeExample: "// Bad: print 1000 lines manually -> Good: loop 1000 times"
  },
  {
    question: "What is an Infinite Loop?",
    shortAnswer: "A loop whose termination condition never evaluates to `false`, causing the loop to run indefinitely unless terminated externally by an exception, break, or process kill.",
    explanation: "Can be caused by bugs (forgetting counter update) or designed intentionally (event loops, servers).",
    hint: "A loop whose condition never becomes false.",
    level: "basic",
    codeExample: "while (true) { /* Runs forever unless break is called */ }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee engine, why are loops essential?",
    shortAnswer: "To automate processing of tuition installment receipts (₹5,000 each) across thousands of enrolled students across Barrackpore and Shyamnagar without writing duplicate code.",
    explanation: "Demonstrates batch financial transaction processing in Indian Rupees (₹).",
    hint: "Processes thousands of student tuition receipts in ₹.",
    level: "basic",
    codeExample: "for (Student s : enrolledStudents) { issueReceipt(s); }"
  },
  {
    question: "What is an Accumulator Variable in loop processing?",
    shortAnswer: "A variable initialized before a loop that accumulates running values (e.g. running sum, product, or concatenated string) across iterations.",
    explanation: "Commonly used for totals, averages, and statistical aggregations.",
    hint: "Holds a running total updated on each iteration.",
    level: "basic",
    codeExample: "double total = 0.0;\nfor (double fee : fees) total += fee;"
  },
  {
    question: "What is a Loop Counter (or Iteration Variable)?",
    shortAnswer: "A variable (traditionally `i`, `j`, `k`, or `index`) that tracks the current iteration number and is evaluated against the termination condition.",
    explanation: "Maintains loop progression state.",
    hint: "Variable tracking the number of iterations.",
    level: "basic",
    codeExample: "for (int i = 0; i < 10; i++) { }"
  },
  {
    question: "What are the three primary loop constructs in the Java programming language?",
    shortAnswer: "1. `for` loop (and enhanced `for-each`); 2. `while` loop; 3. `do-while` loop.",
    explanation: "Each tailored for specific iteration needs.",
    hint: "for, while, and do-while.",
    level: "basic",
    codeExample: "// for, while, do-while"
  },
  {
    question: "What is the difference between an Entry-Controlled loop and an Exit-Controlled loop?",
    shortAnswer: "An Entry-Controlled loop (`for`, `while`) checks the condition BEFORE executing the body; an Exit-Controlled loop (`do-while`) checks the condition AFTER executing the body, guaranteeing at least one execution.",
    explanation: "Fundamental operational distinction in loop control.",
    hint: "Entry checks before body; exit checks after body.",
    level: "basic",
    codeExample: "// while (cond) { } vs do { } while (cond);"
  },
  {
    question: "What happens if the condition of an entry-controlled loop is `false` initially?",
    shortAnswer: "The loop body is NEVER executed; control skips past the loop immediately (0 executions).",
    explanation: "Pre-condition evaluation prevents execution on invalid states.",
    hint: "Body executes 0 times if condition starts false.",
    level: "basic",
    codeExample: "int x = 10;\nwhile (x < 5) { print(\"Never runs\"); }"
  },
  {
    question: "What happens if the condition of an exit-controlled loop is `false` initially?",
    shortAnswer: "The loop body executes EXACTLY ONCE before checking the condition and exiting.",
    explanation: "Guaranteed single execution in do-while.",
    hint: "Body executes at least once.",
    level: "basic",
    codeExample: "int x = 10;\ndo { print(\"Runs once!\"); } while (x < 5);"
  },
  {
    question: "Why do computers execute loops with exceptional speed compared to human manual calculation?",
    shortAnswer: "Because modern CPU instruction pipelines can execute billions of arithmetic and branch instructions per second with zero fatigue or transcription errors.",
    explanation: "Underlying physical reason for automation in computing.",
    hint: "Billions of instructions per second with zero fatigue.",
    level: "basic",
    codeExample: "// 1,000,000 loop cycles in < 5 milliseconds"
  },
  {
    question: "What is an Off-By-One Error (OBOE) in loop design?",
    shortAnswer: "A common logic bug where a loop iterates one time too many or one time too few (e.g. using `<= length` instead of `< length` on a 0-indexed array).",
    explanation: "Often causes `ArrayIndexOutOfBoundsException` in Java.",
    hint: "Iterating one time too many or one time too few.",
    level: "basic",
    codeExample: "for (int i = 0; i <= arr.length; i++) // BUG: IndexOutOfBoundsException!"
  },
  {
    question: "What is Loop Unrolling in compiler optimization?",
    shortAnswer: "A technique where the compiler replaces a loop with repeated sequential statements to eliminate loop branch overhead and improve CPU instruction pipelining.",
    explanation: "Performed automatically by HotSpot C2 JIT compiler for small loop bounds.",
    hint: "Replacing loop with repeated sequential code to boost speed.",
    level: "advanced",
    codeExample: "// JIT turns: for (i=0; i<4; i++) a[i]=0; into: a[0]=0; a[1]=0; a[2]=0; a[3]=0;"
  },
  {
    question: "What is the Time Complexity of a single loop iterating from 1 to $N$?",
    shortAnswer: "$O(N)$ linear time complexity.",
    explanation: "Execution time scales linearly with input size $N$.",
    hint: "O(N) linear time.",
    level: "basic",
    codeExample: "for (int i = 0; i < N; i++) { /* O(1) op */ } // Total: O(N)"
  },
  {
    question: "What is a 'Definite Loop' vs an 'Indefinite Loop'?",
    shortAnswer: "A Definite Loop is one where the exact number of iterations is known before entering (typically a `for` loop); an Indefinite Loop continues until an unpredictable event occurs (typically a `while` loop).",
    explanation: "Distinguishes counter-driven loops from event-driven loops.",
    hint: "Known iteration count (for) vs event-driven iteration count (while).",
    level: "intermediate",
    codeExample: "// Definite: for (i=0; i<10; i++) | Indefinite: while (scanner.hasNext())"
  },
  {
    question: "What happens if you modify the loop counter variable inside the loop body unexpectedly?",
    shortAnswer: "It can cause unpredictable iteration counts, skipped values, or accidental infinite loops.",
    explanation: "Best practice: let the loop header manage the counter exclusively.",
    hint: "Avoid modifying loop counters inside the body.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < 10; i++) { i += 2; // Dangerous counter mutation! }"
  },
  {
    question: "Can loops in Java be executed concurrently across multiple CPU threads?",
    shortAnswer: "Yes! In modern Java, loops over collections can be parallelized using Parallel Streams (`list.parallelStream().forEach(...)`) or `ForkJoinPool`.",
    explanation: "Explored in advanced multithreading modules.",
    hint: "Parallel streams and thread pools execute iterations concurrently.",
    level: "advanced",
    codeExample: "students.parallelStream().forEach(this::processPayment);"
  },
  {
    question: "What is a Sentinel-Controlled Loop?",
    shortAnswer: "A loop that continues reading input until a special designated value (the sentinel, such as `-1` or `\"EXIT\"`) is encountered, signaling termination.",
    explanation: "Standard pattern for user-driven input loops.",
    hint: "Loop continues until a sentinel value (e.g. -1) is entered.",
    level: "basic",
    codeExample: "while ((input = scanner.nextInt()) != -1) { process(input); }"
  },
  {
    question: "What is the role of the `break` statement in loop control?",
    shortAnswer: "To immediately terminate the loop and jump past its closing curly brace `}`.",
    explanation: "Topic 12 explores jump statements in depth.",
    hint: "Immediately terminates the loop.",
    level: "basic",
    codeExample: "if (found) break;"
  },
  {
    question: "What is the role of the `continue` statement in loop control?",
    shortAnswer: "To skip the remainder of the current iteration and jump directly to the loop's update/condition evaluation for the next cycle.",
    explanation: "Topic 13 explores `continue` mechanics.",
    hint: "Skips remainder of current iteration.",
    level: "basic",
    codeExample: "if (isInvalid) continue;"
  },
  {
    question: "Can a loop exist with zero statements in its body (`for (int i=0; i<1000; i++);`)?",
    shortAnswer: "Yes! An empty statement `;` is legal, though often a bug when accidentally typed after the header.",
    explanation: "Can be used as a busy-wait delay, though discouraged in production.",
    hint: "Legal, but usually an accidental bug.",
    level: "basic",
    codeExample: "for (int i = 0; i < 100; i++); // Empty loop body"
  },
  {
    question: "What is the difference between iterating with a traditional index loop vs an enhanced for-each loop?",
    shortAnswer: "A traditional index loop provides direct access to the integer index (`i`), allowing modification of array elements; an enhanced for-each loop provides clean, read-only iteration without index boilerplate.",
    explanation: "Topic 7 covers enhanced for-each in detail.",
    hint: "Indexed access vs clean sequence iteration.",
    level: "basic",
    codeExample: "for (int i=0; i<arr.length; i++) vs for (int val : arr)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why are students asked to trace loops on paper?",
    shortAnswer: "To build mental model accuracy by writing out Iteration Trace Tables showing the state of all variables after each iteration step.",
    explanation: "Foundational pedagogical technique for mastering algorithmic thinking.",
    hint: "Iteration trace tables reveal exact variable state transitions.",
    level: "basic",
    codeExample: "// Trace: Iteration 1: i=1, sum=5000 | Iteration 2: i=2, sum=10000"
  },
  {
    question: "What is the Maximum Iteration Bound principle in safety-critical software?",
    shortAnswer: "Ensuring that every loop has a hard maximum iteration ceiling (`if (++iterations > MAX_LIMIT) throw new TimeoutException();`) to prevent runaway infinite loops.",
    explanation: "Standard defensive coding practice in financial and aerospace systems.",
    hint: "Hard maximum limit preventing runaway infinite loops.",
    level: "intermediate",
    codeExample: "if (++loopCount > 100000) throw new IllegalStateException(\"Limit exceeded\");"
  },
  {
    question: "Can a loop run backwards (decrementing)?",
    shortAnswer: "Yes! By initializing with a high value and using `--` in the update expression (`for (int i = 10; i >= 1; i--)`).",
    explanation: "Common for countdowns, reverse array traversal, and stack operations.",
    hint: "Decrementing counter: for (int i = 10; i >= 1; i--).",
    level: "basic",
    codeExample: "for (int i = 10; i >= 1; i--) { print(i); }"
  },
  {
    question: "How does the JVM JIT compiler handle loops with invariant calculations inside the body?",
    shortAnswer: "It performs Loop-Invariant Code Motion (LICM), hoisting constant calculations outside the loop so they execute only once.",
    explanation: "Automatic performance optimization.",
    hint: "Hoists invariant calculations outside the loop body.",
    level: "advanced",
    codeExample: "// JIT hoists: int limit = arr.length; outside the loop"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 0 for Java developers?",
    shortAnswer: "Iteration is the third pillar of structured programming; loops automate repetitive computation without code duplication, requiring careful management of initialization, condition checking, body execution, and counter updates.",
    explanation: "Foundational concept for all algorithmic software development.",
    hint: "Loops automate repetition cleanly via Init, Condition, Body, and Update.",
    level: "basic",
    codeExample: "// Summary: Loops transform manual duplication into scalable automation"
  },
  {
    question: "What is the next topic (Topic 1) in Module 001_005?",
    shortAnswer: "Standard 'for' loop: initialization, boolean condition, update expression, and execution lifecycle.",
    explanation: "Topic 1 explores the exact execution step-by-step lifecycle of the traditional for loop in Java.",
    hint: "Standard 'for' loop syntax and execution lifecycle.",
    level: "basic",
    codeExample: "// Topic 1: Standard 'for' loop lifecycle"
  }
];

export default questions;
