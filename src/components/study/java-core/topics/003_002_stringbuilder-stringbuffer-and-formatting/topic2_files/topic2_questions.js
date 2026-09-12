const topic2_questions = [
  {
    "question": "What is java.lang.StringBuffer and when was it introduced in Java?",
    "shortAnswer": "StringBuffer is a peer class of String that provides a mutable, thread-safe sequence of characters. It was introduced in Java 1.0 (1996).",
    "explanation": "Because Strings in Java 1.0 were immutable, StringBuffer was the original mechanism designed for building dynamic strings, and all its mutation methods were synchronized.",
    "hint": "Part of original Java 1.0 standard library.",
    "level": "basic"
  },
  {
    "question": "How does StringBuffer achieve thread-safety across its operations?",
    "shortAnswer": "By applying the 'synchronized' keyword to virtually all its public methods, acquiring the object's intrinsic monitor lock.",
    "explanation": "Every method invocation (append, insert, delete, reverse, etc.) locks the StringBuffer instance ('this') during execution, ensuring only one thread can modify or read the internal buffer at a time.",
    "hint": "Synchronized methods on the instance monitor.",
    "level": "basic",
    "codeExample": "public synchronized StringBuffer append(String str) {\n    toStringCache = null;\n    super.append(str);\n    return this;\n}"
  },
  {
    "question": "What is the performance penalty of using StringBuffer over StringBuilder in a single thread?",
    "shortAnswer": "StringBuffer is typically 2x to 3x slower due to the overhead of acquiring and releasing JVM monitor locks and associated memory barriers.",
    "explanation": "Even though modern JVM HotSpot compilers use Biased Locking and Lock Elision optimizations, StringBuffer still incurs runtime verification penalties compared to unsynchronized StringBuilder.",
    "hint": "Locking overhead and memory sync instructions.",
    "level": "moderate"
  },
  {
    "question": "Does StringBuffer protect against race conditions during compound (check-then-act) operations?",
    "shortAnswer": "No! Individual method calls are thread-safe, but sequences of compound operations (e.g. if length() > 0 then deleteCharAt) are NOT atomic without external synchronization.",
    "explanation": "Between calling sbuf.length() and sbuf.deleteCharAt(), another thread could modify the buffer, causing StringIndexOutOfBoundsException. You must synchronize externally on the shared buffer object.",
    "hint": "Individual operations are atomic, but multi-step sequences are not.",
    "level": "advanced",
    "codeExample": "// UNSAFE despite StringBuffer:\nif (sbuf.length() > 0) {\n    // Thread switch here can cause crash!\n    sbuf.deleteCharAt(0);\n}\n\n// SAFE:\nsynchronized(sbuf) {\n    if (sbuf.length() > 0) sbuf.deleteCharAt(0);\n}"
  },
  {
    "question": "What is 'toStringCache' inside modern java.lang.StringBuffer implementation?",
    "shortAnswer": "A transient cached char/byte array containing the value of the last toString() call, cleared whenever the buffer is mutated.",
    "explanation": "When toString() is called multiple times without intervening mutations, StringBuffer reuses toStringCache to return a String without re-copying the internal buffer array.",
    "hint": "Caches the last snapshot to optimize repeated toString() calls.",
    "level": "advanced"
  },
  {
    "question": "When should modern Java developers use StringBuffer instead of StringBuilder?",
    "shortAnswer": "Almost never in modern development, except when interfacing with legacy APIs (prior to Java 5) or when a shared mutable buffer is explicitly passed across concurrent worker threads without external locks.",
    "explanation": "Modern concurrent architectures prefer immutable objects, thread-local confinement, or explicit java.util.concurrent locks over legacy synchronized collections.",
    "hint": "Legacy code compatibility or rare cross-thread shared buffer without locks.",
    "level": "basic"
  },
  {
    "question": "Does StringBuffer override equals() and hashCode() from java.lang.Object?",
    "shortAnswer": "No. Like StringBuilder, StringBuffer inherits reference identity equality (==) from Object.",
    "explanation": "Two StringBuffer instances with identical characters will return false from equals() unless they point to the exact same object reference in memory.",
    "hint": "Inherits Object.equals(), comparing memory addresses only.",
    "level": "basic",
    "codeExample": "StringBuffer sb1 = new StringBuffer(\"data\");\nStringBuffer sb2 = new StringBuffer(\"data\");\nSystem.out.println(sb1.equals(sb2)); // prints false!"
  },
  {
    "question": "What is the default initial capacity of 'new StringBuffer()'?",
    "shortAnswer": "16 characters, exactly the same as StringBuilder.",
    "explanation": "The parameterless constructor allocates an initial internal array of 16 characters. As characters are appended, it expands dynamically using the ((oldCapacity * 2) + 2) rule.",
    "hint": "Same 16-character default buffer as StringBuilder.",
    "level": "basic"
  },
  {
    "question": "What capacity is allocated for 'new StringBuffer(32)'?",
    "shortAnswer": "Exactly 32 characters.",
    "explanation": "Using the integer constructor pre-allocates an internal buffer of the specified capacity.",
    "hint": "Constructor pre-allocates the exact capacity requested.",
    "level": "basic"
  },
  {
    "question": "What capacity is allocated for 'new StringBuffer(\"Hello\")'?",
    "shortAnswer": "21 characters (5 characters from \"Hello\" + 16 default extra slots).",
    "explanation": "Like StringBuilder, the String constructor reserves str.length() + 16 characters.",
    "hint": "Initial string length plus 16.",
    "level": "moderate"
  },
  {
    "question": "Is StringBuffer.reverse() synchronized?",
    "shortAnswer": "Yes. StringBuffer.reverse() is declared as 'public synchronized StringBuffer reverse()'.",
    "explanation": "Holding the monitor lock guarantees that no other thread can observe a partially reversed or corrupted character sequence during the in-place swap.",
    "hint": "All mutation methods in StringBuffer are synchronized.",
    "level": "basic"
  },
  {
    "question": "What happens when multiple threads execute append() concurrently on a single StringBuffer?",
    "shortAnswer": "All appends complete without crashing or losing characters, although the exact interleaving order of appends depends on thread scheduling.",
    "explanation": "Because append() is synchronized, threads queue up sequentially on the monitor lock. No array indices are corrupted, ensuring all characters are safely stored.",
    "hint": "Guaranteed thread safety, but execution order depends on thread scheduling.",
    "level": "moderate"
  },
  {
    "question": "Can deadlock occur when working with two StringBuffer instances?",
    "shortAnswer": "Yes, if two threads lock two StringBuffer instances in reverse order (e.g. Thread 1 locks A then B, while Thread 2 locks B then A).",
    "explanation": "When passing one buffer to another's append(StringBuffer sb), both instances may need to be locked, creating a classic lock-ordering deadlock hazard.",
    "hint": "Lock-ordering inversion can cause deadlocks with synchronized objects.",
    "level": "advanced",
    "codeExample": "// Thread 1: synchronized(bufA) { synchronized(bufB) { ... } }\n// Thread 2: synchronized(bufB) { synchronized(bufA) { ... } } -> DEADLOCK!"
  },
  {
    "question": "Does StringBuffer implement CharSequence?",
    "shortAnswer": "Yes. StringBuffer implements CharSequence, Serializable, and Comparable (Java 11+).",
    "explanation": "Because it implements CharSequence, it can be passed to any method accepting CharSequence, regular expressions, or formatting utilities.",
    "hint": "Implements CharSequence alongside String and StringBuilder.",
    "level": "basic"
  },
  {
    "question": "How does HotSpot JIT compiler optimize synchronized methods via 'Lock Elision'?",
    "shortAnswer": "If escape analysis proves that the StringBuffer instance never escapes the local method, the JIT completely eliminates the synchronized locks at runtime.",
    "explanation": "Despite Lock Elision, you should still write clean code using StringBuilder rather than relying on compiler optimizations to fix suboptimal code.",
    "hint": "Escape analysis removes locks if object cannot be shared.",
    "level": "advanced"
  },
  {
    "question": "What is 'Biased Locking' in Java HotSpot and how did it affect StringBuffer?",
    "shortAnswer": "An optimization where a monitor lock is biased toward the first thread that acquires it, reducing the cost of uncontended synchronization.",
    "explanation": "Biased locking was designed to make legacy classes like StringBuffer and Vector faster, but it has been deprecated and disabled in modern JDKs (JEP 374) because its revocation cost is high.",
    "hint": "Biased toward the acquiring thread, now deprecated in modern JDKs.",
    "level": "advanced"
  },
  {
    "question": "How do you reset a StringBuffer for reuse in a multi-threaded pool?",
    "shortAnswer": "Call sbuf.setLength(0) inside a synchronized block.",
    "explanation": "setLength(0) clears the logical length without reallocating the underlying buffer, allowing reuse across tasks.",
    "hint": "setLength(0) resets the logical character count to zero.",
    "level": "moderate",
    "codeExample": "synchronized(sbuf) {\n    sbuf.setLength(0);\n    sbuf.append(\"New Task\");\n}"
  },
  {
    "question": "Is StringBuffer suitable for high-throughput thread logging?",
    "shortAnswer": "No, shared StringBuffer instances cause severe lock contention under heavy concurrency. Asynchronous loggers (like Log4j2 or SLF4J with LMAX Disruptor) are vastly superior.",
    "explanation": "Having 50 worker threads fight for a single StringBuffer lock serializes execution and destroys multi-core processor parallelism.",
    "hint": "Lock contention bottlenecks multi-threaded throughput.",
    "level": "moderate"
  },
  {
    "question": "What is the return type of sbuf.append(int i)?",
    "shortAnswer": "StringBuffer ('this' reference).",
    "explanation": "Like StringBuilder, all append overloads in StringBuffer return 'this' to permit method chaining.",
    "hint": "Returns 'this' reference for chaining.",
    "level": "basic"
  },
  {
    "question": "Why is StringBuffer considered a 'legacy' class in modern Java certifications (OCPJP)?",
    "shortAnswer": "Because StringBuilder replaced it for all general single-threaded string manipulations, and java.util.concurrent replaced synchronized data structures for concurrency.",
    "explanation": "Modern Java design discourages coarse-grained method synchronization in favor of lock-free concurrency, concurrent queues, or thread-confined builders.",
    "hint": "Replaced by StringBuilder in single threads and java.util.concurrent in multi-threads.",
    "level": "basic"
  }
];

export default topic2_questions;
