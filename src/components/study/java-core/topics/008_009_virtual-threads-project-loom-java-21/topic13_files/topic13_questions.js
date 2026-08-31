const topic13_questions = [
  {
    "question": "What are 'Scoped Values' (JEP 446) in modern Java and why are they superior to 'ThreadLocal' when working with millions of Virtual Threads?",
    "shortAnswer": "1. 'Unbounded Memory Overhead in ThreadLocal': When spawning millions of virtual threads, each thread duplicating a mutable 'ThreadLocalMap' consumes massive heap memory. 2. 'Immutability': 'ScopedValue<T>' is strictly immutable; child methods cannot overwrite the context value. 3. 'Bounded Scoping & No Leaks': Scoped Values are bound to a specific lexical scope ('ScopedValue.where(KEY, value).run(...)'). When the scope completes, the context is automatically unlinked and cleaned up, completely eliminating 'ThreadLocal.remove()' memory leak vulnerabilities.",
    "explanation": "Modern context propagation architecture in Java 21+ (JEP 446).",
    "hint": "Immutable context bound to a single execution scope; automatically cleaned up with zero ThreadLocal memory leaks.",
    "level": "Advanced",
    "codeExample": "ScopedValue.where(USER, \"Swadeep\").run(() → handleRequest());"
  }
];

export default topic13_questions;