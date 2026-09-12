const topic1_questions = [
  {
    "question": "In which version of Java was 'StringBuilder' introduced, and why?",
    "shortAnswer": "Java 1.5 (Java 5) in 2004, introduced as a faster, unsynchronized drop-in replacement for the legacy StringBuffer.",
    "explanation": "Profiling showed that over 98% of string building happened within a single thread (such as local method variables), making StringBuffer's synchronized locking pure wasted overhead.",
    "hint": "Java 5 introduced generics, annotations, and StringBuilder.",
    "level": "basic"
  },
  {
    "question": "What superclass is shared by both StringBuilder and StringBuffer?",
    "shortAnswer": "java.lang.AbstractStringBuilder.",
    "explanation": "AbstractStringBuilder is a package-private abstract class that contains the internal character/byte array, capacity management, and common mutation algorithms.",
    "hint": "The abstract base class package-private in java.lang.",
    "level": "moderate"
  },
  {
    "question": "What is the primary architectural difference between StringBuilder and StringBuffer?",
    "shortAnswer": "StringBuffer has 'synchronized' on almost all its public methods, whereas StringBuilder has no synchronization keywords.",
    "explanation": "StringBuilder avoids mutex lock acquisition, thread memory barriers, and monitor contention, making it 2x-3x faster in single-threaded workloads.",
    "hint": "One has synchronized keyword on methods; the other does not.",
    "level": "basic"
  },
  {
    "question": "What is the difference between length() and capacity() in StringBuilder?",
    "shortAnswer": "length() is the number of characters currently stored; capacity() is the total number of characters the allocated buffer can hold before needing to resize.",
    "explanation": "length() is always <= capacity(). length() increases as text is appended; capacity() only jumps when the buffer fills up or is pre-sized.",
    "hint": "Think of a cup: capacity is the cup size, length is how much water is inside.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(100);\nsb.append(\"Java\");\nSystem.out.println(sb.length());   // 4\nSystem.out.println(sb.capacity()); // 100"
  },
  {
    "question": "How do you pre-allocate a specific capacity in StringBuilder to prevent resizing overhead?",
    "shortAnswer": "Pass the desired integer capacity to the constructor: 'new StringBuilder(int initialCapacity)'.",
    "explanation": "If you know you will append roughly 1,000 characters, instantiating 'new StringBuilder(1024)' completely eliminates dynamic array reallocations and copies.",
    "hint": "Use the overloaded constructor that accepts an integer.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(5000); // starts with 5000 capacity"
  },
  {
    "question": "What is the capacity of 'new StringBuilder(\"Java\")' upon instantiation?",
    "shortAnswer": "20 characters (16 default + 4 characters in \"Java\").",
    "explanation": "When passed an initial String, the constructor reserves: str.length() + 16 = 4 + 16 = 20.",
    "hint": "The formula is string length plus the default 16.",
    "level": "moderate",
    "codeExample": "StringBuilder sb = new StringBuilder(\"Java\");\nSystem.out.println(sb.capacity()); // 20"
  },
  {
    "question": "What happens if you pass a negative integer to 'new StringBuilder(-5)'?",
    "shortAnswer": "It throws a NegativeArraySizeException at runtime.",
    "explanation": "The constructor attempts to allocate an internal array of size -5, which the JVM rejects with NegativeArraySizeException.",
    "hint": "Array dimensions in Java can never be negative.",
    "level": "moderate"
  },
  {
    "question": "How does StringBuilder achieve high throughput in single-threaded network parsers?",
    "shortAnswer": "By avoiding lock acquisitions and thread cache flushes, allowing CPU registers and L1/L2 caches to work unhindered.",
    "explanation": "Synchronized methods enforce memory barrier instructions (like MFENCE on x86). StringBuilder eliminates these, enabling tight loop pipelining by the JIT compiler.",
    "hint": "No memory barriers or monitor lock checks.",
    "level": "advanced"
  },
  {
    "question": "Can you pool StringBuilder instances across threads in a ThreadLocal?",
    "shortAnswer": "Yes, but be cautious with memory leaks: you must call sb.setLength(0) and periodically check capacity to avoid bloating the ThreadLocal.",
    "explanation": "A ThreadLocal<StringBuilder> is an advanced pattern in high-frequency trading or logging to eliminate object creation, provided it is guarded against huge memory retention.",
    "hint": "ThreadLocal keeps one instance per thread, but huge buffers can leak heap.",
    "level": "advanced"
  },
  {
    "question": "Does StringBuilder implement java.io.Serializable?",
    "shortAnswer": "Yes, StringBuilder implements Serializable (since Java 1.5) and Comparable (since Java 11).",
    "explanation": "It writes its character sequence during serialization, though serializing mutable builders over networks is uncommon compared to sending String.",
    "hint": "It implements Serializable, Comparable, and CharSequence.",
    "level": "moderate"
  },
  {
    "question": "What is the return type of sb.append(...) and why?",
    "shortAnswer": "It returns the same 'StringBuilder' reference ('this').",
    "explanation": "Returning 'this' enables fluent method chaining (e.g. sb.append(\"A\").append(\"B\");) without allocating extra reference handles.",
    "hint": "Returns 'this' for fluent chaining.",
    "level": "basic"
  },
  {
    "question": "Does 'sb1.equals(sb2)' compare the text content of two StringBuilder objects?",
    "shortAnswer": "No! It checks reference identity (sb1 == sb2) because StringBuilder does NOT override equals().",
    "explanation": "To compare the character content of two builders, compare their strings: sb1.toString().equals(sb2.toString()) or in Java 11+ use sb1.compareTo(sb2) == 0.",
    "hint": "StringBuilder inherits Object.equals() which compares memory addresses.",
    "level": "basic",
    "codeExample": "StringBuilder a = new StringBuilder(\"test\");\nStringBuilder b = new StringBuilder(\"test\");\nSystem.out.println(a.equals(b)); // FALSE!\nSystem.out.println(a.compareTo(b) == 0); // TRUE in Java 11+"
  },
  {
    "question": "How do you compare two StringBuilder instances lexicographically in Java 11+?",
    "shortAnswer": "Use the 'compareTo(StringBuilder another)' method.",
    "explanation": "In Java 11, StringBuilder implemented Comparable<StringBuilder>, allowing direct character-by-character comparison without allocating temporary String objects via toString().",
    "hint": "Introduced in Java 11 as part of Comparable.",
    "level": "moderate",
    "codeExample": "int diff = sb1.compareTo(sb2);"
  },
  {
    "question": "What is the difference between sb.setLength(0) and sb = new StringBuilder()?",
    "shortAnswer": "setLength(0) resets the logical length to 0 while keeping the allocated internal buffer array intact for reuse; 'new' allocates a brand new object and discards the old one.",
    "explanation": "setLength(0) is significantly faster in loops because it generates zero garbage and reuses existing buffer capacity.",
    "hint": "Buffer reuse vs new heap allocation.",
    "level": "moderate",
    "codeExample": "sb.setLength(0); // instant clear with zero garbage creation"
  },
  {
    "question": "What is the purpose of the trimToSize() method?",
    "shortAnswer": "It shrinks the capacity of the internal buffer to match exactly the current length().",
    "explanation": "If a builder allocated a 10,000-character buffer during processing but final content is only 50 characters, trimToSize() releases the unused 9,950 character slots to save memory.",
    "hint": "Trims excess capacity down to length.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(1000);\nsb.append(\"Done\");\nsb.trimToSize();\nSystem.out.println(sb.capacity()); // 4"
  },
  {
    "question": "What does sb.chars() return in modern Java?",
    "shortAnswer": "An IntStream of character code values from the sequence.",
    "explanation": "Inherited from CharSequence, chars() allows functional stream processing over the characters in the builder.",
    "hint": "Stream of integer char values.",
    "level": "moderate",
    "codeExample": "new StringBuilder(\"Java\").chars().forEach(c -> System.out.print((char)c + \" \"));"
  },
  {
    "question": "Is StringBuilder safe to pass across methods within the same thread?",
    "shortAnswer": "Yes. Method calls on the same thread maintain sequential consistency and do not involve concurrency hazards.",
    "explanation": "Passing a StringBuilder reference down the call stack is a common, high-performance pattern for accumulating log lines or AST nodes.",
    "hint": "As long as it stays on one thread, it is completely safe.",
    "level": "basic"
  },
  {
    "question": "What happens if two threads concurrently invoke append() on the same StringBuilder?",
    "shortAnswer": "Data corruption, lost updates, or ArrayIndexOutOfBoundsException.",
    "explanation": "Because length modification and array writing are not atomic, threads will overwrite each other's indices or write past the buffer end.",
    "hint": "Race condition on the shared index and array.",
    "level": "basic"
  },
  {
    "question": "How can you synchronize a StringBuilder externally if you must share it across threads?",
    "shortAnswer": "Wrap operations in a synchronized block locking on the builder instance: 'synchronized(sb) { sb.append(...); }'.",
    "explanation": "External synchronization ensures compound operations (like checking length and then appending) are atomic, which even StringBuffer cannot guarantee automatically.",
    "hint": "Use explicit synchronized(sb) block.",
    "level": "advanced",
    "codeExample": "synchronized(sb) {\n    sb.append(\"thread-safe update\");\n}"
  },
  {
    "question": "Why does StringBuilder.toString() sometimes avoid copying the array in modern JDKs?",
    "shortAnswer": "Modern JDKs use package-private String constructors that share the byte array if the builder is not mutated further (copy-on-write).",
    "explanation": "If the builder is modified after toString(), a defensive copy is made only when necessary, minimizing allocation overhead.",
    "hint": "Copy-on-write sharing optimization.",
    "level": "advanced"
  }
];

export default topic1_questions;
