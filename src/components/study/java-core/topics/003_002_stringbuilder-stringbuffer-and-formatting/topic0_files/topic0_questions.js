const topic0_questions = [
  {
    "question": "Why does repeated String concatenation with '+' inside a loop degrade performance so severely?",
    "shortAnswer": "Because Strings in Java are immutable. Every '+' operation creates an entirely new String object on the Heap, copying all prior characters. In a loop of N iterations, this causes quadratic O(N^2) time complexity and massive GC churn.",
    "explanation": "If a loop concatenates 10,000 times, roughly 10,000 intermediate throwaway String objects are created and approximately 50 million characters are copied in memory.",
    "hint": "Think about immutability: old text cannot be modified, so the whole string must be re-copied every step.",
    "level": "basic",
    "codeExample": "// BAD:\nString s = \"\";\nfor(int i = 0; i < 1000; i++) s += i;\n\n// GOOD:\nStringBuilder sb = new StringBuilder();\nfor(int i = 0; i < 1000; i++) sb.append(i);"
  },
  {
    "question": "What is the Big-O time complexity of concatenating N single characters using '+' versus StringBuilder?",
    "shortAnswer": "String '+' inside a loop takes O(N^2) time, whereas StringBuilder takes amortized linear O(N) time.",
    "explanation": "With '+', step 1 copies 1 char, step 2 copies 2 chars... step N copies N chars. The sum 1 + 2 + ... + N = N(N+1)/2 = O(N^2). StringBuilder appends to an internal array in O(1) amortized time per character, yielding O(N) total.",
    "hint": "Sum of first N integers gives N^2 vs single continuous buffer growth.",
    "level": "moderate",
    "codeExample": "// O(N^2) vs O(N) benchmark difference is often 15 seconds vs 2 milliseconds!"
  },
  {
    "question": "What happens to the intermediate String objects created during loop concatenation?",
    "shortAnswer": "They become unreachable 'garbage' almost immediately after creation and must be collected by the JVM Garbage Collector (Young Gen / Minor GC).",
    "explanation": "This leads to severe GC thrashing, increased CPU cycles spent on memory management, Stop-The-World latency spikes, and potential OutOfMemoryError in high-throughput services.",
    "hint": "References are overwritten on each iteration, leaving old objects unreferenced.",
    "level": "basic"
  },
  {
    "question": "Does the Java compiler optimize 'String s = \"A\" + \"B\" + \"C\";' using StringBuilder?",
    "shortAnswer": "No, it does something even faster: compile-time constant folding into a single literal \"ABC\".",
    "explanation": "The javac compiler identifies string literal constants at compile-time and folds them directly into a single string constant placed into the class file constant pool. No StringBuilder or runtime concatenation is executed.",
    "hint": "Constant expressions are computed by the compiler, not the JVM at runtime.",
    "level": "moderate",
    "codeExample": "String s = \"A\" + \"B\" + \"C\"; // Compiled to: String s = \"ABC\";"
  },
  {
    "question": "How did Java 9 (JEP 280) change the way the compiler handles non-constant string concatenation?",
    "shortAnswer": "Java 9 replaced bytecode StringBuilder chaining with 'invokedynamic' calling java.lang.invoke.StringConcatFactory.",
    "explanation": "Before Java 9, javac translated 'a + b' into 'new StringBuilder().append(a).append(b).toString()'. Java 9+ emits an 'invokedynamic' instruction, allowing the JVM runtime to choose the fastest strategy (such as pre-sizing byte arrays).",
    "hint": "Look up invokedynamic and StringConcatFactory.",
    "level": "advanced"
  },
  {
    "question": "If Java 9+ uses StringConcatFactory, do we still need StringBuilder for loops?",
    "shortAnswer": "Yes, absolutely! The compiler only optimizes single-line expressions. It cannot optimize concatenations spanning loop iterations.",
    "explanation": "Across loop iterations, the compiler would create a brand new concatenation call on every single cycle, failing to reuse the buffer. StringBuilder remains mandatory for loops and iterative builders.",
    "hint": "Compilers cannot look across loop boundaries to hoist a shared buffer automatically.",
    "level": "basic"
  },
  {
    "question": "What common interface do String, StringBuilder, and StringBuffer all implement?",
    "shortAnswer": "java.lang.CharSequence.",
    "explanation": "CharSequence is the standard readable sequence of char values. It defines length(), charAt(int), subSequence(int, int), and chars(). Accepting CharSequence in methods allows flexible polymorphic text handling.",
    "hint": "It's the general interface for any sequence of characters in java.lang.",
    "level": "basic",
    "codeExample": "void printSummary(CharSequence cs) {\n    System.out.println(\"Length: \" + cs.length());\n}"
  },
  {
    "question": "What is the memory layout difference between String and StringBuilder in the JVM?",
    "shortAnswer": "String is immutable and can reside in the String Constant Pool (SCP) or standard Heap. StringBuilder is always a normal mutable Heap object and never resides in SCP.",
    "explanation": "StringBuilder instances are never pooled or canonicalized. Every 'new StringBuilder()' creates a distinct Heap instance containing a mutable internal backing array.",
    "hint": "SCP only holds interned immutable String literals.",
    "level": "moderate"
  },
  {
    "question": "How did Java 9 Compact Strings (JEP 254) change the internal storage of StringBuilder?",
    "shortAnswer": "It replaced 'char[]' (2 bytes per char) with 'byte[]' plus a 'coder' flag (LATIN-1 vs UTF-16).",
    "explanation": "Since most real-world strings contain only Latin-1 characters (ASCII range), Compact Strings cuts the heap memory consumption of String and StringBuilder in half (1 byte per char instead of 2).",
    "hint": "Latin-1 chars only require 8 bits instead of 16 bits.",
    "level": "advanced"
  },
  {
    "question": "What is the 'Whiteboard Analogy' when explaining String vs StringBuilder to junior developers?",
    "shortAnswer": "String is like a printed sheet of paper (must print a brand new sheet to add a word); StringBuilder is like an erasable whiteboard (modify in place on the same surface).",
    "explanation": "This mental model cleanly communicates why StringBuilder has zero garbage overhead during continuous edits.",
    "hint": "Think printed paper vs erasable marker board.",
    "level": "basic"
  },
  {
    "question": "Can StringBuilder be used as a key in a java.util.HashMap? Why or why not?",
    "shortAnswer": "No, it should never be used as a Map key because it does not override equals() or hashCode() from Object, and it is mutable.",
    "explanation": "StringBuilder inherits Object.equals() (identity comparison ==). Two builders with identical content return false. Furthermore, mutating a key corrupts the bucket hashcode, losing the entry.",
    "hint": "Map keys must be immutable and implement value-based equals() and hashCode().",
    "level": "moderate",
    "codeExample": "StringBuilder sb1 = new StringBuilder(\"key\");\nStringBuilder sb2 = new StringBuilder(\"key\");\nSystem.out.println(sb1.equals(sb2)); // prints false!"
  },
  {
    "question": "What happens if you pass a null String to sb.append(null)?",
    "shortAnswer": "It appends the four literal characters 'n', 'u', 'l', 'l' without throwing a NullPointerException.",
    "explanation": "StringBuilder.append(String str) internally checks: if (str == null) return appendNull(); which writes the characters 'n','u','l','l'.",
    "hint": "It behaves safely like String.valueOf(null).",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"User: \");\nString name = null;\nsb.append(name);\nSystem.out.println(sb); // User: null"
  },
  {
    "question": "What happens if you pass a null char array like sb.append((char[]) null)?",
    "shortAnswer": "It throws a NullPointerException!",
    "explanation": "Unlike append(String) or append(Object), append(char[]) directly accesses the array length, triggering a NullPointerException if null is passed.",
    "hint": "The char[] overload does not convert to \"null\" characters.",
    "level": "moderate"
  },
  {
    "question": "How does StringBuilder prevent memory allocation when adding primitive numbers like integers?",
    "shortAnswer": "It writes digits directly into its internal byte/char buffer using Integer.getChars() without creating Integer wrapper objects.",
    "explanation": "Calling sb.append(100) avoids both boxing to Integer and creating a temporary String \"100\", making it extremely efficient for data serialization.",
    "hint": "Direct digit extraction without heap objects.",
    "level": "moderate"
  },
  {
    "question": "What is 'Memory Thrashing' in the context of string operations?",
    "shortAnswer": "A condition where rapid allocation and deallocation of millions of temporary objects forces the Garbage Collector to run continuously, starving the application CPU.",
    "explanation": "When concatenation runs in high-frequency web threads, Young Gen GC (Eden space) fills up in milliseconds, causing latency spikes and high response times.",
    "hint": "CPU spends more time collecting garbage than running application code.",
    "level": "advanced"
  },
  {
    "question": "What is the recommended rule of thumb for when to switch from String '+' to StringBuilder?",
    "shortAnswer": "Use String '+' for static constants and simple 1-3 step concatenations on a single line; use StringBuilder for any loop, conditional branches, or dynamic document generation.",
    "explanation": "Single-line concatenations are cleanly handled by the compiler. Loops and multi-statement assemblies always demand StringBuilder.",
    "hint": "Single line vs loops and dynamic branches.",
    "level": "basic"
  },
  {
    "question": "Is StringBuilder thread-safe?",
    "shortAnswer": "No. StringBuilder methods are unsynchronized to provide maximum execution speed in single-threaded contexts.",
    "explanation": "If multiple threads modify the same StringBuilder concurrently, race conditions will corrupt the internal buffer. Use StringBuffer or local variables instead.",
    "hint": "Fast because it has no synchronization locks.",
    "level": "basic"
  },
  {
    "question": "Why is thread-confinement (using local variables) the best practice with StringBuilder?",
    "shortAnswer": "Because local variables live on the thread stack and cannot be accessed by other threads, guaranteeing 100% thread safety without locking overhead.",
    "explanation": "Keeping StringBuilder inside the method where it is instantiated guarantees thread isolation with zero synchronization cost.",
    "hint": "Method local variables are isolated to the executing thread's stack frame.",
    "level": "moderate"
  },
  {
    "question": "What is the default initial capacity of a newly constructed 'new StringBuilder()'?",
    "shortAnswer": "16 characters.",
    "explanation": "The parameterless constructor allocates an initial buffer capable of holding 16 characters without resizing.",
    "hint": "16 characters by default.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder();\nSystem.out.println(sb.capacity()); // 16\nSystem.out.println(sb.length());   // 0"
  },
  {
    "question": "Can StringBuilder be converted back to an immutable String when assembly is finished?",
    "shortAnswer": "Yes, by calling the .toString() method.",
    "explanation": "toString() returns a standard immutable String representing the accumulated characters. In modern JVMs, this uses optimized buffer copying or sharing where safe.",
    "hint": "Always finish buffer assembly with .toString().",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"Hello\");\nsb.append(\" World\");\nString finalResult = sb.toString();"
  }
];

export default topic0_questions;
