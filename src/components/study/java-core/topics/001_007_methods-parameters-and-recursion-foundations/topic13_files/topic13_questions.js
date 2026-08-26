/**
 * Module 001_007: Topic 13: Understanding the Call Stack and Stack Frames during method invocation
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the JVM Call Stack (Java Thread Stack)?",
    shortAnswer: "A private per-thread memory structure created when a thread starts that stores active method execution frames in strict LIFO (Last-In-First-Out) order (JVMS §2.5.2).",
    explanation: "Core definition of the JVM Call Stack.",
    hint: "Per-thread LIFO memory structure storing active method frames.",
    level: "basic",
    codeExample: "// Each thread has its own private Call Stack in the JVM"
  },
  {
    question: "What are the 3 primary components of a JVM Stack Frame according to JVMS §2.6?",
    shortAnswer: "1. **Local Variable Array (LVA)**, 2. **Operand Stack (OS)**, and 3. **Frame Data** (Constant Pool reference, Exception Table, and Return/PC Address).",
    explanation: "The 3 anatomical parts of a JVM stack frame.",
    hint: "Local Variable Array, Operand Stack, and Frame Data.",
    level: "basic",
    codeExample: "// Stack Frame = [Local Variables Array | Operand Stack | Frame Data]"
  },
  {
    question: "What is stored in the Local Variable Array (LVA) of a stack frame?",
    shortAnswer: "The `this` reference (slot 0 for instance methods), all formal parameter values, and all local variables declared inside the method body.",
    explanation: "Local variable array structure.",
    hint: "Stores 'this', formal parameters, and local method variables.",
    level: "basic",
    codeExample: "// Slot 0: this | Slot 1: param1 | Slot 2: localVar1"
  },
  {
    question: "How many slots do `long` and `double` occupy in the Local Variable Array?",
    shortAnswer: "Two consecutive 32-bit slots (64 bits total), indexed by the first slot index.",
    explanation: "64-bit primitive storage in JVM bytecode.",
    hint: "2 consecutive slots (64 bits).",
    level: "intermediate",
    codeExample: "// Slot 1 and Slot 2 allocated together for double feeBalance"
  },
  {
    question: "What is the Operand Stack (OS) within a stack frame?",
    shortAnswer: "A LIFO workspace used by bytecode instructions to push values, pop arguments, execute arithmetic operations (e.g. `dadd`, `imul`), and prepare return values.",
    explanation: "Operand stack function during bytecode execution.",
    hint: "Bytecode calculation workspace where values are pushed and popped.",
    level: "intermediate",
    codeExample: "iload_1; iload_2; iadd; ireturn; // Pushes 2 ints, adds them, returns"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee engine, what was the call stack depth when `applyTax()` executed?",
    shortAnswer: "Depth 4: `main()` &rarr; `processStudentFeeInvoice()` &rarr; `applyScholarshipDiscount()` &rarr; `applyTax()` in Indian Rupees (₹).",
    explanation: "Stack frame call depth trace.",
    hint: "Depth 4: main -> processInvoice -> applyDiscount -> applyTax.",
    level: "basic",
    codeExample: "main() -> processStudentFeeInvoice() -> applyScholarshipDiscount() -> applyTax()"
  },
  {
    question: "How is memory reclaimed when a Java method returns?",
    shortAnswer: "The JVM pops the top Stack Frame off the Call Stack; stack memory is reclaimed INSTANTLY in $O(1)$ time with **zero Garbage Collection overhead**.",
    explanation: "Stack frame deallocation mechanics.",
    hint: "Frame is popped instantly in O(1) time without GC.",
    level: "basic",
    codeExample: "// Stack frame memory is reclaimed immediately upon method return"
  },
  {
    question: "Does the Garbage Collector (GC) manage Stack Frame memory?",
    shortAnswer: "NO! Garbage Collection strictly manages the **Heap**; Stack memory is managed deterministically by push and pop instructions following thread execution flow.",
    explanation: "Stack vs Heap memory management distinction.",
    hint: "No, GC only manages Heap; Stack memory is freed deterministically on frame pop.",
    level: "basic",
    codeExample: "// Stack is deterministic LIFO; Heap is managed by GC"
  },
  {
    question: "How can a developer programmatically capture the current Call Stack trace in Java?",
    shortAnswer: "`Thread.currentThread().getStackTrace()` returns an array of `StackTraceElement` objects detailing active class names, method names, and line numbers.",
    explanation: "Programmatic stack trace inspection API.",
    hint: "Thread.currentThread().getStackTrace().",
    level: "basic",
    codeExample: "StackTraceElement[] frames = Thread.currentThread().getStackTrace();"
  },
  {
    question: "What happens to the Call Stack when an unhandled exception is thrown?",
    shortAnswer: "The JVM unwinds the Call Stack frame-by-frame (popping each frame) searching for an enclosing `try-catch` block; if none is found, the thread terminates and prints the Stack Trace.",
    explanation: "Exception stack unwinding mechanics.",
    hint: "Unwinds stack frames looking for a catch block; terminates thread if uncaught.",
    level: "intermediate",
    codeExample: "// Exception causes stack unwinding until caught or thread ends"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was Swadeep's final fee after 10% scholarship and 18% GST?",
    shortAnswer: "Base: ₹20,000 &minus; 10% (₹2,000) = ₹18,000 taxable + 18% GST (₹3,240) = ₹21,240.00 in Indian Rupees (₹).",
    explanation: "Multi-level invoice computation trace.",
    hint: "₹21,240.00.",
    level: "basic",
    codeExample: "processStudentFeeInvoice(\"Swadeep\", 20000.0, 10.0); // ₹21,240.00"
  },
  {
    question: "What is the 'Frame Data' section of a stack frame?",
    shortAnswer: "It stores references to the runtime Constant Pool for dynamic linking, exception handler dispatch tables, and return address information for the calling method.",
    explanation: "Frame Data architectural role.",
    hint: "Stores constant pool link, exception table, and return address.",
    level: "advanced",
    codeExample: "// Frame Data supports dynamic linking and normal/abrupt method completion"
  },
  {
    question: "Are Stack Frames shared between different Threads?",
    shortAnswer: "NO! Every thread has its own completely independent, private JVM Call Stack; threads cannot read or access each other's stack frames.",
    explanation: "Thread stack isolation and thread safety.",
    hint: "No, stacks are strictly private to each individual thread.",
    level: "basic",
    codeExample: "// Local variables on stack are inherently thread-safe"
  },
  {
    question: "Why are method local variables inherently 'Thread-Safe' in Java?",
    shortAnswer: "Because local variables reside inside the thread's private Stack Frame; no other thread has access to that stack memory.",
    explanation: "Local variable thread safety guarantee.",
    hint: "Because they reside on private thread stacks inaccessible to other threads.",
    level: "intermediate",
    codeExample: "// Local variables require no synchronization"
  },
  {
    question: "What determines the maximum stack depth a thread can achieve before throwing `StackOverflowError`?",
    shortAnswer: "The configured thread stack size (`-Xss`), the size of each stack frame (number of local variables and operand stack depth), and the depth of nested/recursive invocations.",
    explanation: "Stack overflow factors.",
    hint: "Configured -Xss stack size divided by individual frame byte size.",
    level: "advanced",
    codeExample: "java -Xss1m (typically allows ~5,000 to ~10,000 nested frames)"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what line of code triggered `printActiveStackFrames`?",
    shortAnswer: "Inside `applyTax()`, capturing frames while all 4 methods were concurrently active on the Call Stack in Indian Rupees (₹).",
    explanation: "Deepest stack frame capture.",
    hint: "Inside applyTax() at depth 3.",
    level: "basic",
    codeExample: "printActiveStackFrames(\"Inside applyTax() [Depth 3]\");"
  },
  {
    question: "What is the 'Program Counter' (PC Register) associated with each thread stack?",
    shortAnswer: "A per-thread register that holds the memory address of the JVM bytecode instruction currently being executed by that thread.",
    explanation: "PC register role in JVM execution.",
    hint: "Holds the address of the current executing bytecode instruction.",
    level: "advanced",
    codeExample: "// PC register points to current instruction in method bytecode"
  },
  {
    question: "What is the difference between a 'HotSpot Stack Frame' and a 'Compiled Stack Frame'?",
    shortAnswer: "Interpreted frames use full JVM stack data structures; JIT-compiled C2 frames are compiled into native machine code where local variables and operands are mapped directly to CPU physical registers.",
    explanation: "JIT compilation register allocation.",
    hint: "JIT-compiled frames map variables directly to CPU hardware registers.",
    level: "advanced",
    codeExample: "// HotSpot C2 compiler maps stack frame slots to CPU registers (RAX, RBX, etc.)"
  },
  {
    question: "What happens if a method passes an object reference to another method regarding Stack vs Heap?",
    shortAnswer: "A new reference pointer is pushed onto the new method's Stack Frame, but both pointers refer to the exact same shared object instance on the Heap.",
    explanation: "Stack frame pointer to heap object relation.",
    hint: "Copies reference pointer on the stack pointing to the same Heap object.",
    level: "basic",
    codeExample: "// Stack frame holds pointer 0x40A0 -> Heap holds StudentAccount object"
  },
  {
    question: "Why does Java not allocate Object instances directly on the Stack (by default)?",
    shortAnswer: "Java objects have dynamic lifecycles that often outlive the method that created them (Heap allocation); however, JIT Escape Analysis can stack-allocate objects if they do not escape the method.",
    explanation: "Escape analysis and stack allocation optimization.",
    hint: "Objects live on Heap; JIT Escape Analysis stack-allocates non-escaping objects.",
    level: "advanced",
    codeExample: "// -XX:+DoEscapeAnalysis allows JIT to allocate short-lived objects on stack"
  },
  {
    question: "In the Coder & AccoTax Barrackpore system, which method was at the bottom (root) of the Call Stack?",
    shortAnswer: "`main()` method, serving as the entry point frame for the main thread in Indian Rupees (₹).",
    explanation: "Root stack frame identification.",
    hint: "main() method.",
    level: "basic",
    codeExample: "Frame 0: CallStackAndStackFramesDemo.main()"
  },
  {
    question: "What is a 'Native Method Stack' in the JVM?",
    shortAnswer: "A separate stack used by the JVM to execute C/C++ native code via JNI (Java Native Interface), distinct from the Java Call Stack.",
    explanation: "Native method stack distinction (JVMS §2.5.6).",
    hint: "Separate stack for C/C++ JNI native code execution.",
    level: "advanced",
    codeExample: "// C/C++ native methods execute on the Native Method Stack"
  },
  {
    question: "Can a Stack Frame grow or shrink dynamically in size during its execution?",
    shortAnswer: "NO! The maximum Local Variable Array size and maximum Operand Stack depth are computed at compile-time and fixed in the classfile bytecode.",
    explanation: "Fixed compile-time frame size in bytecode.",
    hint: "No, frame sizes (max_locals, max_stack) are fixed at compile-time.",
    level: "advanced",
    codeExample: "// Bytecode specifies: max_stack = 4, max_locals = 5"
  },
  {
    question: "Why is stack memory allocation significantly faster than heap memory allocation?",
    shortAnswer: "Because stack allocation is simply moving the Stack Pointer register (a single CPU instruction in $O(1)$ time), whereas heap allocation requires memory pool searches, thread-local allocation buffers (TLAB), and garbage collection.",
    explanation: "Allocation speed comparison: Stack pointer adjustment vs Heap allocation.",
    hint: "Stack allocation is a single CPU pointer increment in O(1) time.",
    level: "intermediate",
    codeExample: "// Stack: pointer move (O(1)) | Heap: free-list search + GC overhead"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how did the call stack unwind after `applyTax()` returned?",
    shortAnswer: "`applyTax()` popped &rarr; `applyScholarshipDiscount()` popped &rarr; `processStudentFeeInvoice()` popped &rarr; control returned to `main()` in Indian Rupees (₹).",
    explanation: "Stack unwinding sequence verification.",
    hint: "Popped in reverse order of invocation (LIFO).",
    level: "basic",
    codeExample: "applyTax -> applyDiscount -> processInvoice -> main"
  },
  {
    question: "What is a 'Tail Call' and how does it relate to stack frames?",
    shortAnswer: "A method call that occurs as the final action of a method; if the compiler supports Tail Call Elimination, it reuses the current stack frame instead of pushing a new one.",
    explanation: "Tail call frame reuse concept.",
    hint: "Reuses the existing stack frame for the final call instead of pushing a new frame.",
    level: "advanced",
    codeExample: "return factHelper(n - 1, acc * n);"
  },
  {
    question: "What information is captured in a Java `StackTraceElement`?",
    shortAnswer: "Declaring Class name, Method name, Source File name, and Line number of the execution point.",
    explanation: "StackTraceElement fields and API.",
    hint: "Class name, Method name, File name, and Line number.",
    level: "basic",
    codeExample: "frame.getClassName(), frame.getMethodName(), frame.getLineNumber()"
  },
  {
    question: "What is the ultimate takeaway of Module 001_007 Topic 13 for Java developers?",
    shortAnswer: "Every method invocation pushes a private Stack Frame containing the Local Variable Array, Operand Stack, and Frame Data onto the thread's Call Stack. Returning pops the frame in $O(1)$ time with zero GC overhead.",
    explanation: "Mastery of the JVM call stack and stack frames.",
    hint: "Method calls push Stack Frames (LVA + OS + Frame Data); returns pop them in O(1) time.",
    level: "basic",
    codeExample: "// Summary: Push Frame on Invoke -> Execute LVA/OS -> Pop Frame on Return"
  },
  {
    question: "What is the next topic (Topic 14) in Module 001_007?",
    shortAnswer: "Visualizing recursive execution trees and stack unwinding.",
    explanation: "Topic 14 builds visual recursion trees (Fibonacci branch splits) and traces multi-branch stack unwinding.",
    hint: "Visualizing recursive execution trees and stack unwinding.",
    level: "basic",
    codeExample: "// Topic 14: Recursive Execution Trees & Multi-Branch Unwinding"
  },
  {
    question: "How does Java 21 Virtual Threads (Project Loom) revolutionize Call Stack management?",
    shortAnswer: "Virtual Threads unmount their call stack from the OS carrier thread and store stack frames in the Heap when blocked on I/O, allowing millions of concurrent lightweight threads.",
    explanation: "Project Loom virtual thread stack storage in Heap.",
    hint: "Virtual threads store stack frames in Heap when blocked, allowing millions of concurrent threads.",
    level: "advanced",
    codeExample: "Thread.startVirtualThread(() -> processStudentFeeInvoice(...));"
  }
];

export default questions;
