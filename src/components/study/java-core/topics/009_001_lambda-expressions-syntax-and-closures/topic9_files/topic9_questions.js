const topic9_questions = [
  {
    "question": "Why does Java strictly prohibit mutating captured local variables inside lambda expressions from both memory and thread-safety perspectives?",
    "shortAnswer": "1. 'Stack Lifetime Mismatch': Local variables live on the stack and are destroyed when the enclosing method returns. Lambdas, however, live on the heap and can execute long after the enclosing method terminates (e.g. in background thread pools). Because Java captures local variables 'by value' (copying the primitive value), allowing mutations inside the lambda would mislead developers into thinking the caller's stack variable changed. 2. 'Thread Safety': Lambdas are frequently executed concurrently across parallel streams; permitting shared mutable local variables would cause race conditions and lost updates without synchronization.",
    "explanation": "Grand architectural capstone of Module 009_001.",
    "hint": "Stack variables die when methods exit while lambdas live on heap, and shared mutable stack variables would cause concurrency race conditions.",
    "level": "Advanced",
    "codeExample": "// Prohibited: int count = 0; () -> count++; // Permitted: AtomicInteger count = new AtomicInteger(); () -> count.incrementAndGet();"
  }
];

export default topic9_questions;