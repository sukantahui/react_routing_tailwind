const topic13_questions = [
  {
    "question": "How does the Java 8 'updateAndGet(IntUnaryOperator updateFunction)' method simplify complex lock-free mutations on AtomicInteger?",
    "shortAnswer": "Before Java 8, performing custom mathematical transformations (e.g. multiplying by 2 or capping at maximum value) required developers to write manual boilerplate CAS retry loops ('do { prev = get(); next = transform(prev); } while (!compareAndSet(prev, next));'). Java 8's 'updateAndGet(operator)' abstracts this entirely: it accepts a lambda expression and internally handles the CAS spin-retry loop until the update succeeds atomically without lock contention boilerplate.",
    "explanation": "Java 8 functional enhancements to java.util.concurrent.atomic.",
    "hint": "Encapsulates the CAS retry loop internally using a lambda expression.",
    "level": "Intermediate",
    "codeExample": "atomicInt.updateAndGet(x → Math.min(x + 10, MAX_LIMIT));"
  }
];

export default topic13_questions;