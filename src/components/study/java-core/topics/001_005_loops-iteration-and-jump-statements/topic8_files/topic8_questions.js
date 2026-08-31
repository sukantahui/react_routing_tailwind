/**
 * Module 001_005: Topic 8: Infinite loops (for(;;), while(true)): legitimate use cases and accidental causes
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Infinite Loop in Java?",
    shortAnswer: "A loop whose termination condition never evaluates to `false`, causing the loop body to execute indefinitely until interrupted externally or by an internal `break`/`return`/exception.",
    explanation: "Can be designed intentionally or caused accidentally by logic bugs.",
    hint: "A loop whose condition never becomes false.",
    level: "basic",
    codeExample: "while (true) { doWork(); }"
  },
  {
    question: "What are the two canonical syntax forms of an intentional infinite loop in Java?",
    shortAnswer: "1. `while (true) { ... }`; 2. `for (;;) { ... }`.",
    explanation: "Both are widely recognized idiomatic infinite loop constructs.",
    hint: "while (true) and for (;;).",
    level: "basic",
    codeExample: "while (true) { } // or for (;;) { }"
  },
  {
    question: "What are the primary legitimate production use cases for infinite loops?",
    shortAnswer: "1. Network server listeners (`ServerSocket.accept()`); 2. GUI event dispatch threads; 3. Game engine render loops; 4. Background worker daemons.",
    explanation: "Essential architecture for persistent services.",
    hint: "Server listeners, event dispatchers, game engines, and worker daemons.",
    level: "basic",
    codeExample: "while (true) { Request req = queue.take(); process(req); }"
  },
  {
    question: "What is the most common ACCIDENTAL cause of an infinite loop in beginner code?",
    shortAnswer: "Forgetting to update the loop counter or state variable inside the loop body (`int i = 0; while (i < 5) { print(i); }` without `i++`).",
    explanation: "The counter remains 0 perpetually, keeping the condition permanently true.",
    hint: "Forgetting the update statement inside the loop body.",
    level: "basic",
    codeExample: "int i = 0;\nwhile (i < 5) {\n    System.out.println(i); // Missing i++!\n}"
  },
  {
    question: "What happens when a loop counter is decremented instead of incremented in an ascending loop (`for (int i = 0; i < 10; i--)`)?",
    shortAnswer: "An accidental infinite loop occurs because `i` becomes negative and remains `< 10` indefinitely (until integer underflow).",
    explanation: "Counter moves in the opposite direction from the boundary.",
    hint: "Counter diverges from the termination condition.",
    level: "basic",
    codeExample: "for (int i = 0; i < 10; i--) { /* Infinite loop */ }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore payment listener, how is the infinite loop terminated gracefully?",
    shortAnswer: "By monitoring an incoming shutdown signal or batch threshold and executing an explicit `break;` statement in Indian Rupees (₹).",
    explanation: "Demonstrates graceful termination of daemon loops.",
    hint: "Graceful termination via internal break on shutdown signal.",
    level: "basic",
    codeExample: "if (eventCount >= maxEvents) break;"
  },
  {
    question: "What is the 'Numeric Overflow Infinite Loop Trap' (e.g. with `byte` or `short`)?",
    shortAnswer: "Writing `for (byte b = 0; b <= 127; b++)` causes an infinite loop because when `b` reaches 127, incrementing it overflows and wraps around to `-128`, which is still `<= 127`!",
    explanation: "Classic two's complement integer overflow bug.",
    hint: "byte wraps from 127 to -128, never exceeding 127.",
    level: "intermediate",
    codeExample: "for (byte b = 0; b <= 127; b++) { /* Never terminates! */ }"
  },
  {
    question: "How does the Java compiler treat code written immediately after an unbroken `while (true)` loop?",
    shortAnswer: "It generates a compile-time error: `unreachable statement` because the compiler proves that control can never reach past the infinite loop.",
    explanation: "Definite assignment and reachability analysis (JLS §14.21).",
    hint: "Compile error: unreachable statement.",
    level: "basic",
    codeExample: "while (true) { }\n// System.out.println(\"Unreachable!\"); // COMPILER ERROR!"
  },
  {
    question: "Why does `for (;;)` with an internal `if (cond) break;` compile cleanly without unreachable statement errors?",
    shortAnswer: "Because the compiler detects the `break` statement as a valid exit path, marking subsequent code as reachable.",
    explanation: "Compiler path analysis recognizes break statements.",
    hint: "Break statement provides a valid reachable exit path.",
    level: "intermediate",
    codeExample: "for (;;) { if (done) break; }\nSystem.out.println(\"Reachable!\"); // Compiles cleanly!"
  },
  {
    question: "What happens to CPU utilization when an accidental infinite loop executes on a thread without sleeping?",
    shortAnswer: "The thread will consume 100% of a single CPU core, leading to high power draw, fan spin-up, and potential thermal throttling.",
    explanation: "Tight busy-waiting without thread yield/sleep.",
    hint: "Consumes 100% CPU on that core.",
    level: "basic",
    codeExample: "while (true) { /* Busy-wait burns CPU */ }"
  },
  {
    question: "How do production background worker daemons prevent 100% CPU burn inside `while (true)` loops?",
    shortAnswer: "By blocking on a thread-safe queue (`queue.take()`), sleeping (`Thread.sleep(100)`), or using `LockSupport.park()`.",
    explanation: "Puts the thread into a WAITING state with 0% CPU consumption.",
    hint: "Blocking queues, Thread.sleep(), or wait/notify.",
    level: "intermediate",
    codeExample: "while (running) { Task t = queue.take(); process(t); }"
  },
  {
    question: "What is a 'Livelock' involving infinite loops?",
    shortAnswer: "A concurrent scenario where multiple threads continuously respond to each other in infinite loops, changing state but making no forward progress.",
    explanation: "Active starvation state in multithreaded systems.",
    hint: "Threads actively changing state in loops without forward progress.",
    level: "advanced",
    codeExample: "// Threads continuously yielding to each other"
  },
  {
    question: "Can an infinite loop be terminated by a `return` statement?",
    shortAnswer: "Yes! A `return value;` statement inside the loop immediately terminates both the infinite loop and the enclosing method.",
    explanation: "Standard pattern for finding and returning search results.",
    hint: "Yes, return terminates both loop and method.",
    level: "basic",
    codeExample: "while (true) { if (found(x)) return x; }"
  },
  {
    question: "Can an infinite loop be terminated by throwing an exception?",
    shortAnswer: "Yes! Throwing an exception (`throw new IllegalStateException()`) abruptly terminates the loop and unwinds the call stack.",
    explanation: "Standard error recovery termination.",
    hint: "Throwing an exception aborts the loop immediately.",
    level: "basic",
    codeExample: "while (true) { if (timeout) throw new TimeoutException(); }"
  },
  {
    question: "What is the difference between `while (true)` and `while (1)` in Java vs C++?",
    shortAnswer: "In C++, `while (1)` is valid; in Java, `while (1)` is a compile error because integers are not booleans.",
    explanation: "Java strict boolean type safety.",
    hint: "Java requires boolean true, rejecting integer 1.",
    level: "basic",
    codeExample: "// while (1) // ERROR in Java → Use while (true)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore ledger settlement, how does `for (;;)` clear balances?",
    shortAnswer: "By deducting installments of ₹5,000 until `simulatedBalance < monthlyInstallment`, then breaking cleanly in Indian Rupees (₹).",
    explanation: "Demonstrates practical multi-exit settlement loop.",
    hint: "Deducts installments until balance is cleared, then breaks.",
    level: "basic",
    codeExample: "for (;;) { if (bal < fee) break; bal -= fee; }"
  },
  {
    question: "What is an 'Accidental Empty Body' infinite loop caused by a misplaced semicolon?",
    shortAnswer: "Writing `while (i < 5);` where the semicolon acts as an empty body executed endlessly because `i` is never updated.",
    explanation: "Common syntax slip causing application freeze.",
    hint: "Misplaced semicolon creates an empty infinite body.",
    level: "basic",
    codeExample: "int i = 0;\nwhile (i < 5); // INFINITE LOOP!"
  },
  {
    question: "How do Watchdog Timers detect and kill accidental infinite loops in safety-critical systems?",
    shortAnswer: "A hardware or software timer must be reset ('kicked') by the loop periodically; if a loop hangs and fails to reset the timer before expiry, the watchdog resets the system.",
    explanation: "Standard fault tolerance architecture in embedded and enterprise systems.",
    hint: "Watchdog timer expires and resets system if loop hangs.",
    level: "advanced",
    codeExample: "// Watchdog.reset() called per iteration"
  },
  {
    question: "Can an infinite loop be written with `do-while`?",
    shortAnswer: "Yes: `do { doWork(); } while (true);`.",
    explanation: "Executes the body at least once and repeats endlessly.",
    hint: "do { } while (true);",
    level: "basic",
    codeExample: "do { pollSensor(); } while (true);"
  },
  {
    question: "Why do some developers prefer `for (;;)` over `while (true)` in bytecode history?",
    shortAnswer: "In very early Java compilers (1990s), `for (;;)` produced 1 fewer bytecode instruction than `while (true)` because `while(true)` loaded a constant boolean; in modern Java, both compile to identical optimal bytecode.",
    explanation: "Historical trivia in JVM compiler development.",
    hint: "Early compilers saved 1 instruction; modern JIT compiles both identically.",
    level: "advanced",
    codeExample: "// Historical bytecode quirk; identical in modern Java"
  },
  {
    question: "What is a 'Heartbeat Mechanism' in infinite daemon loops?",
    shortAnswer: "A periodic log, network ping, or metric counter increment emitted by an infinite loop to prove to monitoring systems that the thread is healthy and not deadlocked.",
    explanation: "Production observability standard.",
    hint: "Periodic ping proving the loop is healthy and executing.",
    level: "intermediate",
    codeExample: "while (true) { sendHeartbeat(); doWork(); }"
  },
  {
    question: "What happens if an infinite loop repeatedly instantiates new objects without releasing references?",
    shortAnswer: "The JVM heap fills up rapidly, leading to frequent Garbage Collection pauses and eventually terminating with `java.lang.OutOfMemoryError: Java heap space`.",
    explanation: "Memory leak hazard in long-running loops.",
    hint: "Causes OutOfMemoryError: Java heap space.",
    level: "intermediate",
    codeExample: "while (true) { list.add(new byte[1024 * 1024]); } // OOM Error!"
  },
  {
    question: "How can unit tests verify that a method does not get stuck in an infinite loop?",
    shortAnswer: "Using test timeout annotations like `@Test(timeout = 1000)` in JUnit 4 or `@Timeout(1)` in JUnit 5.",
    explanation: "Fails the unit test if execution exceeds the specified duration.",
    hint: "@Timeout annotation in JUnit.",
    level: "intermediate",
    codeExample: "@Test\n@Timeout(value = 2, unit = TimeUnit.SECONDS)\nvoid testLoop() { ... }"
  },
  {
    question: "What is a 'Graceful Shutdown Hook' in Java infinite server loops?",
    shortAnswer: "Registering a shutdown handler (`Runtime.getRuntime().addShutdownHook(...)`) that sets a `volatile boolean running = false;` flag to allow the infinite loop to exit cleanly when SIGTERM is received.",
    explanation: "Standard enterprise microservice shutdown pattern.",
    hint: "Shutdown hook flips running flag to false on exit.",
    level: "advanced",
    codeExample: "Runtime.getRuntime().addShutdownHook(new Thread(() → running = false));"
  },
  {
    question: "What happens if a loop condition checks `double d = 0.0; while (d != 1.0) d += 0.1;`?",
    shortAnswer: "Infinite loop! Because `0.1` cannot be represented exactly in IEEE 754 floating-point, `d` will jump from `0.9999999999999999` to `1.0999999999999999`, never equaling `1.0` exactly.",
    explanation: "Classic floating-point precision hazard.",
    hint: "Floating point precision error misses exact != 1.0 equality.",
    level: "intermediate",
    codeExample: "double d = 0.0; while (d != 1.0) d += 0.1; // INFINITE LOOP!"
  },
  {
    question: "Can an infinite loop be used with a labeled break to exit multiple nested loops?",
    shortAnswer: "Yes! E.g. `OUTER: while (true) { while (true) { if (ready) break OUTER; } }`.",
    explanation: "Clean exit mechanism from deep multi-tier hierarchies.",
    hint: "break OUTER; exits out of nested infinite loops.",
    level: "basic",
    codeExample: "OUTER: while (true) { while (true) { break OUTER; } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what defensive coding rule is taught for all unbounded loops?",
    shortAnswer: "Always include a Maximum Iteration Ceiling (Safety Counter) to guarantee termination in case external conditions fail.",
    explanation: "Prevents runaway CPU freeze during student debugging.",
    hint: "Include a maximum iteration safety counter ceiling.",
    level: "basic",
    codeExample: "if (++safetyCounter > 100000) throw new TimeoutException();"
  },
  {
    question: "What is the difference between an intentional daemon loop and a runaway CPU loop?",
    shortAnswer: "An intentional daemon loop blocks/yields when idle and has a graceful exit mechanism; a runaway loop spins continuously without yielding and has no functional exit path.",
    explanation: "Architectural distinction between resilient servers and buggy code.",
    hint: "Daemon loops yield/block when idle; runaway loops spin 100% CPU with no exit.",
    level: "basic",
    codeExample: "// Daemon: blocks on queue; Runaway: spins 100% CPU without exit"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 8 for Java developers?",
    shortAnswer: "Intentional infinite loops (`while(true)`, `for(;;)` ) are the foundation of servers, daemons, and event dispatchers; they must always include graceful break/return paths, avoid floating-point/overflow bugs, and yield CPU cycles when idle.",
    explanation: "Essential foundation of systems and service architecture.",
    hint: "Intentional loops power servers with graceful break paths; accidental loops must be avoided.",
    level: "basic",
    codeExample: "// Summary: while (true) { if (shutdown) break; process(); }"
  },
  {
    question: "What is the next topic (Topic 9) in Module 001_005?",
    shortAnswer: "Loop counter manipulation, accumulators, running sums, and running products.",
    explanation: "Topic 9 explores algorithmic accumulators, running aggregates, state multipliers, and counter stepping techniques.",
    hint: "Loop counter manipulation, accumulators, and running sums.",
    level: "basic",
    codeExample: "// Topic 9: Accumulators and Running Sums"
  }
];

export default questions;
