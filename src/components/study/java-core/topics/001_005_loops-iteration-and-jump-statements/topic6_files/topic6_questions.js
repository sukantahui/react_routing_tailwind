/**
 * Module 001_005: Topic 6: Key differences: for vs while vs do-while and when to choose which
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "When should a developer choose a standard `for` loop over `while` or `do-while`?",
    shortAnswer: "When the number of iterations or range boundaries are known in advance (e.g. iterating from 1 to $N$, array indexing, length-bounded loops).",
    explanation: "Consolidates initialization, condition, and update into a single readable header.",
    hint: "Choose 'for' when iteration count/bounds are known in advance.",
    level: "basic",
    codeExample: "for (int i = 0; i < array.length; i++) { }"
  },
  {
    question: "When should a developer choose a `while` loop over `for` or `do-while`?",
    shortAnswer: "When iteration is indefinite, event-driven, or condition-dependent (e.g. reading from a stream, digit extraction, polling until a flag changes), and 0 executions are required if the condition is initially false.",
    explanation: "Pre-test entry control protects against invalid initial states.",
    hint: "Choose 'while' for indefinite, state-driven, pre-test iteration.",
    level: "basic",
    codeExample: "while (scanner.hasNext()) { process(scanner.next()); }"
  },
  {
    question: "When should a developer choose a `do-while` loop over `for` or `while`?",
    shortAnswer: "When the loop body MUST execute at least ONCE regardless of the initial condition (e.g. interactive CLI menus, input validation retries, hardware handshakes).",
    explanation: "Post-test exit control guarantees at least one execution.",
    hint: "Choose 'do-while' when the body must run at least once.",
    level: "basic",
    codeExample: "do { showMenu(); choice = getChoice(); } while (choice != EXIT);"
  },
  {
    question: "Are `for`, `while`, and `do-while` computationally equivalent in theoretical computer science?",
    shortAnswer: "Yes! All three are Turing-equivalent; any loop written in one construct can be mathematically rewritten in another.",
    explanation: "The choice is driven by human readability, intention revelation, and clean code principles.",
    hint: "Yes, Turing-equivalent; chosen for readability and design intention.",
    level: "basic",
    codeExample: "// All 3 can perform any repetitive computation"
  },
  {
    question: "What is the minimum number of executions for `for`, `while`, and `do-while` loops?",
    shortAnswer: "`for` loop: 0; `while` loop: 0; `do-while` loop: 1 (guaranteed).",
    explanation: "Pre-test loops can skip completely; post-test loops execute at least once.",
    hint: "for (0), while (0), do-while (1).",
    level: "basic",
    codeExample: "// Minimum executions: for (0), while (0), do-while (1)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how are loop choices demonstrated across 3 scenarios?",
    shortAnswer: "1. `for` for known installment counts (3 cycles); 2. `while` for scholarship fund depletion (₹15,000 budget); 3. `do-while` for menu prompt displays in Indian Rupees (₹).",
    explanation: "Demonstrates practical domain-driven loop selection.",
    hint: "for (installments), while (fund depletion), do-while (menu prompts).",
    level: "basic",
    codeExample: "// 3 real-world scenarios illustrating optimal loop choices in ₹"
  },
  {
    question: "How does variable scope differ between a `for` loop and a `while` loop?",
    shortAnswer: "In a `for` loop, header variables are scoped strictly to the loop; in a `while` loop, counter variables must be declared in the outer enclosing method scope.",
    explanation: "Effective Java Item 57 recommends `for` to eliminate variable bleed.",
    hint: "for confines counter scope; while leaks counter to outer method.",
    level: "basic",
    codeExample: "// for (int i=0; ..) vs int i=0; while(i<N)"
  },
  {
    question: "What is the syntax for creating an infinite loop in each of the three constructs?",
    shortAnswer: "1. `for (;;) { }`; 2. `while (true) { }`; 3. `do { } while (true);`.",
    explanation: "Standard forms of unconditioned loops.",
    hint: "for(;;), while(true), do...while(true).",
    level: "basic",
    codeExample: "for(;;){} | while(true){} | do{}while(true);"
  },
  {
    question: "Why is an enhanced `for-each` loop preferred over an indexed `for` loop when index is not needed?",
    shortAnswer: "Because it completely eliminates counter variables, index bounds, and off-by-one errors (`ArrayIndexOutOfBoundsException`), producing cleaner code.",
    explanation: "Standard clean code practice since Java 5.",
    hint: "Eliminates counter boilerplate and index bounds errors.",
    level: "basic",
    codeExample: "for (Student s : students) { print(s.getName()); }"
  },
  {
    question: "When is an indexed `for` loop STILL REQUIRED over an enhanced `for-each` loop?",
    shortAnswer: "1. When array elements must be modified/reassigned (`arr[i] = newVal`); 2. When the index value is needed for calculations; 3. When traversing backward or with custom steps (`i += 2`).",
    explanation: "Scenarios requiring direct index manipulation.",
    hint: "Required for array mutation, reverse traversal, or step skipping.",
    level: "intermediate",
    codeExample: "for (int i = arr.length - 1; i >= 0; i--) { arr[i] *= 2; }"
  },
  {
    question: "What is the 'Copy-Paste Error' hazard with `while` loops described by Joshua Bloch?",
    shortAnswer: "When a developer copy-pastes a `while` loop (with `int i = 0`) to iterate a second collection, but accidentally reuses `i` instead of `j`, the second loop fails silently because `i` is already at its terminal value.",
    explanation: "A classic bug eliminated by `for` loop header scoping.",
    hint: "Copy-pasting while loops can accidentally reuse outer counter variables.",
    level: "intermediate",
    codeExample: "int i = 0; while (i < a.length) { } // Copy-paste bug if i is reused below!"
  },
  {
    question: "Can a `while` loop always be converted into a `for` loop in Java?",
    shortAnswer: "Yes! `while (condition) { body; }` is identical to `for (; condition;) { body; }`.",
    explanation: "Demonstrates direct syntactic translation.",
    hint: "Yes: for (; condition;) { body; }.",
    level: "basic",
    codeExample: "for (; isRunning;) { doWork(); }"
  },
  {
    question: "Can a `do-while` loop be converted into a `while` loop without duplicate code?",
    shortAnswer: "Yes, but it requires duplicating the body once before the loop (priming execution) or using a `while (true)` loop with a condition check at the bottom.",
    explanation: "Demonstrates why do-while exists to prevent duplicate code.",
    hint: "Requires duplicating body or using while(true) with break.",
    level: "intermediate",
    codeExample: "while (true) { doWork(); if (!condition) break; }"
  },
  {
    question: "Which loop construct is best for polling a network socket until data arrives?",
    shortAnswer: "`while` loop (e.g. `while ((bytesRead = in.read(buffer)) != -1)`).",
    explanation: "Indefinite stream-based I/O.",
    hint: "while loop is best for stream reading and polling.",
    level: "basic",
    codeExample: "while ((line = reader.readLine()) != null) { process(line); }"
  },
  {
    question: "Which loop construct is best for reversing an array in-place?",
    shortAnswer: "Standard `for` loop with two pointers: `for (int l = 0, r = len - 1; l < r; l++, r--)`.",
    explanation: "Multi-variable header provides optimal coordination.",
    hint: "Two-pointer for loop.",
    level: "basic",
    codeExample: "for (int l = 0, r = len - 1; l < r; l++, r--) swap(l, r);"
  },
  {
    question: "Which loop construct is best for asking a user: 'Enter valid age (18-60):'?",
    shortAnswer: "`do-while` loop, because the prompt must be displayed at least once before testing user input.",
    explanation: "Canonical interactive validation pattern.",
    hint: "do-while for input prompt validation.",
    level: "basic",
    codeExample: "do { age = prompt(); } while (age < 18 || age > 60);"
  },
  {
    question: "How do modern JVM JIT compilers optimize all three loop types?",
    shortAnswer: "HotSpot C2 compiler transforms all loops into an intermediate representation (Loop Tree), applying loop peeling, loop unrolling, and bounds-check elimination identically across all constructs.",
    explanation: "Zero runtime machine code performance disparity.",
    hint: "JIT normalizes all loops into optimized intermediate representations.",
    level: "advanced",
    codeExample: "// JIT performs loop unrolling and bounds check elimination"
  },
  {
    question: "What is the 'Condition Inversion' technique in do-while vs while refactoring?",
    shortAnswer: "A `do { ... } while (condition);` can be refactored into `while (true) { ... if (!condition) break; }` by inverting the condition.",
    explanation: "De Morgan's boolean transformation in loop termination.",
    hint: "Inverting condition with if (!condition) break.",
    level: "intermediate",
    codeExample: "while (true) { doWork(); if (!continueCondition) break; }"
  },
  {
    question: "Why should developers avoid writing `for (; true; )` instead of `while (true)`?",
    shortAnswer: "Because `while (true)` is the universally recognized idiomatic syntax in the Java community for intentional infinite loops, improving readability.",
    explanation: "Adheres to established Java community idioms.",
    hint: "while (true) is the universally recognized idiom.",
    level: "basic",
    codeExample: "// Prefer while (true) over for (; true;)"
  },
  {
    question: "In algorithm interviews, what is the #1 criterion for choosing between `for` and `while`?",
    shortAnswer: "Count-based bounds $\\to$ `for`; State/condition-based termination $\\to$ `while`.",
    explanation: "Quick mental heuristic for clean algorithmic design.",
    hint: "Count-based = for; State-based = while.",
    level: "basic",
    codeExample: "// Count -> for; State -> while"
  },
  {
    question: "What happens if a developer uses `do-while` for a collection traversal where the collection might be empty?",
    shortAnswer: "A `NullPointerException` or `IndexOutOfBoundsException` occurs on empty collections because `do-while` forces execution of the body before checking if the collection has items!",
    explanation: "Critical reason why `for` or `while` must be used for collection traversal.",
    hint: "Crashes on empty collections because body executes before testing size.",
    level: "intermediate",
    codeExample: "// Bad: do { process(list.get(0)); } while (!list.isEmpty()); // CRASHES on empty list!"
  },
  {
    question: "What is the recommended loop construct for Binary Search?",
    shortAnswer: "`while (low <= high)` because the bounds update dynamically based on midpoint comparisons.",
    explanation: "Standard binary search implementation idiom.",
    hint: "while (low <= high) is standard for binary search.",
    level: "basic",
    codeExample: "while (low <= high) { int mid = (low + high) / 2; ... }"
  },
  {
    question: "What is the recommended loop construct for Matrix 2D Grid traversal?",
    shortAnswer: "Nested `for` loops (`for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++)`).",
    explanation: "Exact coordinate bounds are known in advance.",
    hint: "Nested for loops for rows and columns.",
    level: "basic",
    codeExample: "for (int r=0; r<R; r++) for (int c=0; c<C; c++) { }"
  },
  {
    question: "What is the recommended loop construct for Breadth-First Search (BFS) queue processing?",
    shortAnswer: "`while (!queue.isEmpty())` because the queue size fluctuates dynamically as child nodes are discovered.",
    explanation: "Classic graph and tree traversal pattern.",
    hint: "while (!queue.isEmpty()) for dynamic queue processing.",
    level: "intermediate",
    codeExample: "while (!queue.isEmpty()) { Node curr = queue.poll(); ... }"
  },
  {
    question: "How does cyclomatic complexity increase with each loop construct?",
    shortAnswer: "Each loop construct (`for`, `while`, `do-while`) adds $+1$ to the method's cyclomatic complexity because it introduces a conditional branch decision point.",
    explanation: "Standard software engineering complexity metric.",
    hint: "Each loop adds +1 to cyclomatic complexity.",
    level: "intermediate",
    codeExample: "// Every loop increases complexity by 1"
  },
  {
    question: "What is the Decision Matrix summary for Java loops?",
    shortAnswer: "1. Fixed count/range $\\to$ `for`; 2. Read-only sequence $\\to$ `for-each`; 3. State/Event/Stream $\\to$ `while`; 4. Must run $\\ge 1$ time (Menu/Retry) $\\to$ `do-while`.",
    explanation: "The complete 4-tier decision heuristic.",
    hint: "Count = for, Sequence = for-each, State = while, Run >= 1 = do-while.",
    level: "basic",
    codeExample: "// The 4-Tier Java Loop Decision Matrix"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why are students taught to avoid mixing loop types inconsistently?",
    shortAnswer: "To keep the codebase uniform, idiomatic, and instantly readable for team members across Barrackpore and Shyamnagar.",
    explanation: "Consistency in software engineering reduces maintenance costs.",
    hint: "Consistency improves team readability and maintenance.",
    level: "basic",
    codeExample: "// Maintain consistent loop idioms across the codebase"
  },
  {
    question: "Can a loop construct be replaced by recursion?",
    shortAnswer: "Yes! Any iterative loop can be expressed recursively, though in Java recursion risks `StackOverflowError` for deep iterations because the JVM does not support tail-call optimization.",
    explanation: "Loops are safer than recursion for large iterations in Java.",
    hint: "Yes, but loops are safer against StackOverflowError.",
    level: "advanced",
    codeExample: "// Recursion vs Iteration in Java"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 6 for Java developers?",
    shortAnswer: "Choosing the correct loop construct (`for`, `while`, `do-while`, `for-each`) signals architectural intent; matching the loop construct to the problem domain (definite bounds vs indefinite state vs post-test retries) produces clean, bug-free software.",
    explanation: "Essential decision-making mastery for professional Java developers.",
    hint: "Matching the loop construct to problem domain signals clean architectural intent.",
    level: "basic",
    codeExample: "// Summary: Choose based on count, state, or post-test requirements"
  },
  {
    question: "What is the next topic (Topic 7) in Module 001_005?",
    shortAnswer: "Enhanced 'for-each' loop overview for iterating sequences and arrays.",
    explanation: "Topic 7 explores index-free iteration over arrays and `Iterable` collections using the enhanced `for-each` loop.",
    hint: "Enhanced 'for-each' loop overview for arrays and sequences.",
    level: "basic",
    codeExample: "// Topic 7: Enhanced 'for-each' loop"
  }
];

export default questions;
