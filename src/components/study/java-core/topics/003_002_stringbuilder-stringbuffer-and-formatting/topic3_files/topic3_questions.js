const topic3_questions = [
  {
    "question": "What is the fundamental mutability difference between String, StringBuilder, and StringBuffer?",
    "shortAnswer": "String is strictly immutable; StringBuilder and StringBuffer are both mutable character buffers.",
    "explanation": "Once created, a String's content cannot be changed. StringBuilder and StringBuffer can append, insert, delete, and modify characters in-place without creating new objects.",
    "hint": "Immutable (constant) vs Mutable (in-place modification).",
    "level": "basic"
  },
  {
    "question": "Compare the thread-safety of String, StringBuilder, and StringBuffer.",
    "shortAnswer": "String is inherently thread-safe (due to immutability); StringBuffer is thread-safe (via synchronized methods); StringBuilder is NOT thread-safe.",
    "explanation": "Because String values cannot change, multiple threads can safely read them simultaneously with zero synchronization. StringBuffer locks its monitor. StringBuilder has no locks.",
    "hint": "Safe via immutability vs Safe via locks vs Not safe.",
    "level": "basic"
  },
  {
    "question": "Rank the three classes in order of execution speed for intensive loop text assembly.",
    "shortAnswer": "1. StringBuilder (Fastest) > 2. StringBuffer (Moderate) > 3. String '+' (Slowest).",
    "explanation": "StringBuilder has no lock overhead and modifies memory in-place. StringBuffer must acquire and release monitor locks. String '+' creates throwaway objects with O(N^2) complexity.",
    "hint": "Unsynchronized buffer > Synchronized buffer >>> String concatenation.",
    "level": "basic"
  },
  {
    "question": "Where are objects of each class stored in JVM memory?",
    "shortAnswer": "String literals live in the String Constant Pool (SCP) inside the Heap; String objects created with 'new' live in standard Heap; StringBuilder and StringBuffer instances ALWAYS live in standard Heap.",
    "explanation": "Mutable builders are never cached or interned in the SCP. Only immutable String instances can participate in the SCP.",
    "hint": "Only Strings can be in SCP; builders are always normal Heap objects.",
    "level": "moderate"
  },
  {
    "question": "How does the equals() method behave on each of the three classes?",
    "shortAnswer": "String overrides equals() to compare character values; StringBuilder and StringBuffer do NOT override equals(), so they compare reference identity (==).",
    "explanation": "String.equals() returns true if two strings have the exact same sequence of characters. StringBuilder and StringBuffer inherit Object.equals(), returning true only if both references point to the same object.",
    "hint": "Content comparison vs memory address comparison.",
    "level": "basic",
    "codeExample": "String s1 = \"hi\", s2 = \"hi\";\nSystem.out.println(s1.equals(s2)); // true\n\nStringBuilder b1 = new StringBuilder(\"hi\");\nStringBuilder b2 = new StringBuilder(\"hi\");\nSystem.out.println(b1.equals(b2)); // false!"
  },
  {
    "question": "How can you test if two StringBuilder instances contain the same text?",
    "shortAnswer": "In Java 11+, use 'sb1.compareTo(sb2) == 0', or convert to String: 'sb1.toString().equals(sb2.toString())'.",
    "explanation": "compareTo() compares characters in-place without creating intermediate String objects, making it the most efficient choice in Java 11+.",
    "hint": "compareTo() == 0 in Java 11+, or .toString().equals().",
    "level": "moderate",
    "codeExample": "boolean sameText = sb1.compareTo(sb2) == 0;"
  },
  {
    "question": "Why does String have a fixed size while StringBuilder and StringBuffer can grow?",
    "shortAnswer": "String stores characters in a final array sized exactly to its length; builders manage a capacity buffer that dynamically expands via geometric growth.",
    "explanation": "When a builder fills its internal array, it automatically allocates a larger array (usually (oldCapacity * 2) + 2) and copies existing elements over.",
    "hint": "Final fixed-length array vs resizable dynamic capacity array.",
    "level": "basic"
  },
  {
    "question": "Which of these classes can be safely used as keys in a HashMap or elements in a HashSet?",
    "shortAnswer": "Only String. StringBuilder and StringBuffer should never be used as hash map keys or set elements.",
    "explanation": "Map keys must have consistent hashCode() and equals() implementations. Since builders inherit identity equality and are mutable, mutating a builder while in a Map corrupts the bucket index.",
    "hint": "Keys must be immutable to guarantee consistent hash codes.",
    "level": "moderate"
  },
  {
    "question": "What is the common dynamic expansion formula shared by StringBuilder and StringBuffer?",
    "shortAnswer": "newCapacity = (oldCapacity * 2) + 2.",
    "explanation": "If a builder starts at capacity 16 and exceeds it, the new capacity becomes (16 * 2) + 2 = 34. If 34 is exceeded, it becomes (34 * 2) + 2 = 70.",
    "hint": "Double the old capacity plus two.",
    "level": "moderate",
    "codeExample": "StringBuilder sb = new StringBuilder(); // cap 16\nsb.append(\"12345678901234567\"); // 17 chars\nSystem.out.println(sb.capacity()); // 34"
  },
  {
    "question": "Can you convert between String, StringBuilder, and StringBuffer easily?",
    "shortAnswer": "Yes. Pass any sequence into the constructor: 'new StringBuilder(str)' or 'new StringBuffer(str)', and call '.toString()' to convert back to String.",
    "explanation": "All three implement CharSequence, so cross-conversion constructors and methods are built into the Java standard library.",
    "hint": "Use constructors to wrap, and .toString() to extract String.",
    "level": "basic",
    "codeExample": "String s = \"Java\";\nStringBuilder sb = new StringBuilder(s);\nStringBuffer sbuf = new StringBuffer(sb.toString());\nString back = sb.toString();"
  },
  {
    "question": "Why is String preferred for method parameters and domain model fields?",
    "shortAnswer": "Because immutability guarantees security, caching, thread safety, and prevents accidental external modifications (side effects).",
    "explanation": "If a User object exposed a mutable StringBuilder for its username, any caller could alter the username without the User object knowing. String guarantees integrity.",
    "hint": "Immutability protects data integrity and prevents unintended side effects.",
    "level": "moderate"
  },
  {
    "question": "When is it appropriate to use String '+' concatenation instead of StringBuilder?",
    "shortAnswer": "For constant expressions, simple single-line concatenations, or when joining 2 to 3 strings outside of any loops.",
    "explanation": "Single-line statements are automatically optimized by javac (via invokedynamic in Java 9+), keeping the code clean and readable without manual boilerplate.",
    "hint": "Short single-line expressions where readability is key.",
    "level": "basic",
    "codeExample": "String greeting = \"Hello, \" + user.getName() + \"!\"; // Perfectly fine!"
  },
  {
    "question": "Do String, StringBuilder, and StringBuffer all support the '+' operator?",
    "shortAnswer": "No. The '+' operator is syntactic sugar defined exclusively for String operands. It cannot be used directly between two StringBuilder objects.",
    "explanation": "Writing 'sb1 + sb2' causes a compilation error unless at least one operand is coerced to String.",
    "hint": "The '+' operator only works with String operands.",
    "level": "basic"
  },
  {
    "question": "In what year and Java version was each of the three classes introduced?",
    "shortAnswer": "String: Java 1.0 (1996); StringBuffer: Java 1.0 (1996); StringBuilder: Java 1.5 (2004).",
    "explanation": "For the first 8 years of Java's history, developers had to use StringBuffer for mutable text. Java 5 introduced StringBuilder to remove the locking overhead.",
    "hint": "Java 1.0 for String/StringBuffer, Java 5 for StringBuilder.",
    "level": "basic"
  },
  {
    "question": "How does memory consumption compare between String and StringBuilder in Java 9+?",
    "shortAnswer": "Both benefit from Compact Strings (byte[]), but StringBuilder incurs additional overhead from its unused capacity slots.",
    "explanation": "A String allocates exactly length bytes/chars. A StringBuilder allocates capacity bytes/chars (e.g. 16 minimum), which may leave unused memory until trimmed.",
    "hint": "Unused capacity buffer slots consume heap memory.",
    "level": "moderate"
  },
  {
    "question": "Can StringBuilder or StringBuffer be extended (subclassed)?",
    "shortAnswer": "No, both classes are declared 'public final class', so neither can be subclassed.",
    "explanation": "Making them final allows the JVM to perform aggressive inlining and optimization without worrying about polymorphic method overrides.",
    "hint": "Both classes are marked final in java.lang.",
    "level": "moderate"
  },
  {
    "question": "What happens if you concatenate a StringBuilder with a String using '+'?",
    "shortAnswer": "The compiler invokes StringBuilder.toString() and performs string concatenation.",
    "explanation": "Because one operand is a String, the other operand is converted to a String via String.valueOf(sb) which calls sb.toString().",
    "hint": "The builder's toString() is called automatically.",
    "level": "basic",
    "codeExample": "StringBuilder sb = new StringBuilder(\"World\");\nString res = \"Hello \" + sb;\nSystem.out.println(res); // \"Hello World\""
  },
  {
    "question": "Why does String implement Comparable<String> while StringBuilder only implemented Comparable in Java 11?",
    "shortAnswer": "Because historically StringBuilder was viewed strictly as a temporary scratchpad buffer, not a value object intended for sorting or ordered collections.",
    "explanation": "In Java 11, Comparable<StringBuilder> was added to simplify natural sorting and lexicographical comparisons without intermediate String allocations.",
    "hint": "Comparable was added to StringBuilder in Java 11.",
    "level": "advanced"
  },
  {
    "question": "Which of the three classes is best suited for building an SQL query dynamically?",
    "shortAnswer": "StringBuilder (or modern Java 15+ Text Blocks for static templates).",
    "explanation": "StringBuilder allows conditional appends (like adding WHERE clauses) without intermediate garbage. Remember to use PreparedStatement parameters for values!",
    "hint": "StringBuilder handles dynamic conditional query clauses cleanly.",
    "level": "basic"
  },
  {
    "question": "Summary: What is the 1-sentence decision guide for choosing between the three?",
    "shortAnswer": "Use String for immutability and data modeling; use StringBuilder for single-threaded assembly and loops; use StringBuffer only for legacy API compatibility.",
    "explanation": "Following this simple rule ensures your Java applications remain robust, thread-safe, and highly performant.",
    "hint": "String for data, StringBuilder for building, StringBuffer for legacy.",
    "level": "basic"
  }
];

export default topic3_questions;
