// src/components/study/java-core/topics/003_001_string-immutability-and-string-constant-pool/topic1_files/topic1_questions.js

const topic1_questions = [
  {
    question: "What is the fundamental difference between 'String s = \"hello\";' and 'String s = new String(\"hello\");'?",
    shortAnswer: "'String s = \"hello\";' retrieves or creates the literal in the String Constant Pool (SCP) for shared reuse, whereas 'String s = new String(\"hello\");' explicitly allocates a brand-new object on the general Heap in addition to ensuring the literal exists in the SCP.",
    explanation: "String literals leverage the JVM's String Constant Pool to prevent duplicate allocations. When you instantiate with 'new String()', the JVM allocates an independent object in normal Heap memory with its own identity, completely bypassing the memory optimization benefits of pooling.",
    hint: "Literal points to shared pool memory; constructor forces a separate Heap allocation.",
    level: "Beginner",
    codeExample: "String s1 = \"hello\";             // Uses SCP\nString s2 = new String(\"hello\"); // Forces new Heap object\nSystem.out.println(s1 == s2);     // false"
  },
  {
    question: "How many objects are created by 'String s = new String(\"Java\");' if '\"Java\"' does not exist in the SCP?",
    shortAnswer: "Exactly two objects are created: one literal object in the String Constant Pool (SCP), and one new object on the normal Heap referenced by the variable 's'.",
    explanation: "The literal \"Java\" inside the parentheses causes the JVM to register the literal in the String Constant Pool during class loading or first execution. The 'new' keyword then instantiates a distinct second object on the Heap that copies the contents.",
    hint: "1 in SCP for the literal + 1 on Heap for 'new'.",
    level: "Beginner",
    codeExample: "// If \"Java\" is seen for the first time:\nString s = new String(\"Java\"); // 2 objects created"
  },
  {
    question: "How many objects are created by 'String s = new String(\"Java\");' if '\"Java\"' already exists in the SCP?",
    shortAnswer: "Only one object is created: the new instance on the general Heap. The pool literal is simply reused during constructor execution.",
    explanation: "Because the literal \"Java\" was already present in the String Constant Pool, the JVM does not create another SCP entry. It merely creates the new instance on the standard Heap via the constructor.",
    hint: "Only the Heap object is created; the SCP already contains the literal.",
    level: "Beginner",
    codeExample: "String s1 = \"Java\";             // 1 object in SCP\nString s2 = new String(\"Java\"); // 1 new object on Heap (SCP reused)"
  },
  {
    question: "Why is 'new String(\"...\")' considered an anti-pattern in Java?",
    shortAnswer: "Because it wastes memory by creating redundant Heap objects holding identical text and creates extra garbage collection overhead without any functional benefit.",
    explanation: "Using 'new String()' defeats Java's built-in string deduplication via the String Constant Pool. In high-throughput applications, millions of duplicate string objects can trigger frequent GC pauses and lead to OutOfMemoryError.",
    hint: "It causes memory bloat and unnecessary garbage collector pressure.",
    level: "Beginner",
    codeExample: "// BAD (Anti-pattern):\nString status = new String(\"ACTIVE\");\n\n// GOOD (Idiomatic & Optimized):\nString status = \"ACTIVE\";"
  },
  {
    question: "What JVM bytecode instruction is executed when loading a string literal?",
    shortAnswer: "The 'ldc' (load constant) bytecode instruction, which pushes a reference to the string literal from the run-time constant pool onto the operand stack.",
    explanation: "When javac compiles a string literal, it places a CONSTANT_String_info entry in the .class file's constant pool. At runtime, the JVM uses the 'ldc' bytecode instruction to resolve and push that pooled object reference.",
    hint: "Look for 'ldc' (load constant) in javap disassembly.",
    level: "Intermediate",
    codeExample: "// Java Code:\nString s = \"Barrackpore\";\n\n// Bytecode (javap -c):\n// 0: ldc #2 // String Barrackpore\n// 2: astore_1"
  },
  {
    question: "What sequence of bytecode instructions is generated for 'new String(\"hello\")'?",
    shortAnswer: "'new #class java/lang/String', 'dup', 'ldc #constant (hello)', and 'invokespecial #Method java/lang/String.<init>:(Ljava/lang/String;)V'.",
    explanation: "The JVM first allocates uninitialized memory for the new String object ('new'), duplicates the reference on the stack ('dup'), loads the literal from the constant pool ('ldc'), and invokes the constructor ('invokespecial'). This clearly illustrates the two distinct object references involved.",
    hint: "new -> dup -> ldc -> invokespecial.",
    level: "Advanced",
    codeExample: "// Bytecode trace:\n// 0: new           #2  // class java/lang/String\n// 3: dup\n// 4: ldc           #3  // String hello\n// 6: invokespecial #4  // Method java/lang/String.\"<init>\":(Ljava/lang/String;)V\n// 9: astore_1"
  },
  {
    question: "What does 's1 == s2' evaluate to when both are defined as string literals with the same value?",
    shortAnswer: "It evaluates to 'true' because both variables point to the exact same shared object in the String Constant Pool.",
    explanation: "The equality operator '==' evaluates reference identity (memory addresses). Because the JVM canonicalizes string literals in the SCP, both variables hold identical memory pointers.",
    hint: "Same literals -> same SCP memory address -> true.",
    level: "Beginner",
    codeExample: "String s1 = \"Shyamnagar\";\nString s2 = \"Shyamnagar\";\nSystem.out.println(s1 == s2); // true"
  },
  {
    question: "What does 's1 == s2' evaluate to when one is a literal and the other is created with 'new String()'?",
    shortAnswer: "It evaluates to 'false' because '==' checks memory addresses, and 'new String()' creates a distinct object on the Heap with a different address.",
    explanation: "Even though both strings contain the exact same characters, 's1' holds the memory address of the pooled object in the SCP while 's2' holds the address of the independent heap object. Therefore, reference equality fails.",
    hint: "'==' compares memory pointers, not string contents.",
    level: "Beginner",
    codeExample: "String s1 = \"Naihati\";\nString s2 = new String(\"Naihati\");\nSystem.out.println(s1 == s2); // false"
  },
  {
    question: "Why does 's1.equals(s2)' return true for 'String s1 = \"Java\"; String s2 = new String(\"Java\");'?",
    shortAnswer: "Because the 'equals()' method in String overrides Object.equals() to compare characters sequentially rather than comparing memory addresses.",
    explanation: "The implementation of String.equals() first checks reference identity (this == obj). If different, it checks length and then iterates over each character/byte. Since both represent 'J', 'a', 'v', 'a', it returns true.",
    hint: "equals() validates character-by-character value equality.",
    level: "Beginner",
    codeExample: "String s1 = \"Java\";\nString s2 = new String(\"Java\");\nSystem.out.println(s1.equals(s2)); // true"
  },
  {
    question: "What does the 'intern()' method do when called on a heap String object?",
    shortAnswer: "It searches the String Constant Pool for an equivalent string. If found, it returns the pooled reference; otherwise, it registers this string in the pool and returns it.",
    explanation: "Calling .intern() aligns a heap-allocated string with the JVM's canonical SCP instance. This allows subsequent reference equality comparisons ('==') against string literals to succeed.",
    hint: "intern() fetches or inserts the canonical pointer in the SCP.",
    level: "Intermediate",
    codeExample: "String s1 = new String(\"Ichapur\");\nString s2 = s1.intern(); // Reclaims canonical SCP pointer\nString s3 = \"Ichapur\";\nSystem.out.println(s2 == s3); // true"
  },
  {
    question: "Does calling 's.intern()' mutate the calling variable 's'?",
    shortAnswer: "No. Because Strings are immutable, 's.intern()' cannot alter the caller's reference. You must explicitly reassign: 's = s.intern();'.",
    explanation: "A common beginner error is calling 's.intern();' without assignment. Since String objects never mutate, the pooled address is returned and discarded unless captured in a variable.",
    hint: "Must assign the returned reference: s = s.intern();",
    level: "Intermediate",
    codeExample: "String s = new String(\"Kolkata\");\ns.intern(); // WRONG: return value ignored!\nSystem.out.println(s == \"Kolkata\"); // false\n\ns = s.intern(); // CORRECT\nSystem.out.println(s == \"Kolkata\"); // true"
  },
  {
    question: "How does the Java compiler handle string concatenation involving only literals ('\"a\" + \"b\"')?",
    shortAnswer: "It performs compile-time constant folding, resolving the expression into the single literal '\"ab\"' at compile time, placing only '\"ab\"' in the SCP.",
    explanation: "Because both operands are constants, javac computes the concatenation during compilation. The compiled bytecode contains only the resulting combined literal without any runtime StringBuilder or concatenation overhead.",
    hint: "Constant folding resolves literal math and literal concatenation at compile time.",
    level: "Intermediate",
    codeExample: "String s1 = \"Java\" + \"Core\"; // Compiled directly as \"JavaCore\"\nString s2 = \"JavaCore\";\nSystem.out.println(s1 == s2); // true"
  },
  {
    question: "Why does runtime concatenation with variables ('s1 + s2') NOT create an object in the SCP?",
    shortAnswer: "Because variable values are dynamic and computed at runtime; the JVM allocates the combined string as a new object on the normal Heap without interning it into the SCP.",
    explanation: "At runtime, expressions like 's1 + s2' use invokedynamic (StringConcatFactory) or StringBuilder.append(). The resulting String instance is a standard Heap object whose lifecycle is governed by standard GC rules.",
    hint: "Runtime variables create new Heap objects, not SCP literals.",
    level: "Intermediate",
    codeExample: "String a = \"Java\";\nString b = \"Core\";\nString s = a + b; // Created on Heap at runtime\nSystem.out.println(s == \"JavaCore\"); // false"
  },
  {
    question: "How does declaring variables as 'final' affect string concatenation?",
    shortAnswer: "If both variables are 'final' and initialized with compile-time constants, the compiler treats their concatenation as a constant expression, folding it into the SCP.",
    explanation: "Because 'final' guarantees the variable values can never change, the compiler can safely resolve the concatenation at compile time just like raw literals.",
    hint: "'final' makes variables compile-time constants.",
    level: "Intermediate",
    codeExample: "final String a = \"Java\";\nfinal String b = \"Core\";\nString s = a + b; // Constant folded by javac!\nSystem.out.println(s == \"JavaCore\"); // true"
  },
  {
    question: "How many objects are created by: 'String s = new String(new char[]{'J','a','v','a'});'?",
    shortAnswer: "Exactly 1 object is created on the Heap (the String object). No entry is added to the String Constant Pool.",
    explanation: "Because no string literal is written in double quotes, the compiler does not emit any string constant pool references. Only the Heap object initialized with the character array is created.",
    hint: "No literal in quotes means no entry in the SCP.",
    level: "Intermediate",
    codeExample: "char[] chars = {'J', 'a', 'v', 'a'};\nString s = new String(chars); // 1 Heap object only\nSystem.out.println(s == \"Java\"); // false"
  },
  {
    question: "What is the memory impact of 'String s = new String();'?",
    shortAnswer: "It creates a useless empty String object on the Heap, whereas the literal '\"\"' reuses the single shared empty string already in the SCP.",
    explanation: "Instantiating an empty string via new String() allocates a Heap instance and object header when the immutable empty literal \"\" is already available for zero-cost sharing in the pool.",
    hint: "Always write '\"\"' instead of 'new String()'.",
    level: "Beginner",
    codeExample: "String s1 = \"\";             // Reuses pooled empty string\nString s2 = new String();   // Unnecessary Heap allocation\nSystem.out.println(s1 == s2); // false"
  },
  {
    question: "How does Compact Strings (JEP 254 in Java 9+) optimize memory for String objects?",
    shortAnswer: "It replaces the 16-bit char[] buffer with an 8-bit byte[] buffer plus a 1-byte coder flag, cutting memory consumption in half for Latin-1 strings.",
    explanation: "Historical Java stored all characters as 2-byte UTF-16 chars. Analysis showed over 90% of strings in most applications contain only ISO-8859-1 (Latin-1) characters requiring only 1 byte. Compact Strings saves 50% memory across both literals and heap strings.",
    hint: "char[] (2 bytes per char) changed to byte[] (1 byte per char for Latin-1).",
    level: "Advanced",
    codeExample: "// In Java 8:  \"Java\" -> 4 chars * 2 bytes = 8 bytes\n// In Java 9+: \"Java\" -> 4 bytes (LATIN1) + 1 byte coder = 5 bytes"
  },
  {
    question: "Why did earlier Java versions (Java 1.0 to 6) share backing char arrays in 'new String(original)' and why was it removed?",
    shortAnswer: "Java 1-6 shared the backing char[] with an offset and count for O(1) performance, but this caused severe memory leaks when small substrings held large parent arrays in memory.",
    explanation: "In Java 6, 'largeString.substring(0, 5)' retained the entire 1MB character array in memory. To prevent this leak, Java 7u6 removed the offset and count fields and made all String constructors and substrings copy their own character arrays.",
    hint: "Java 7u6 removed offset sharing to prevent memory leaks.",
    level: "Expert",
    codeExample: "// In Java 6: Substring held reference to full source char[]\n// In Java 7+: Substring copies its exact byte[] slice"
  },
  {
    question: "What is JVM G1 Garbage Collector String Deduplication (-XX:+UseStringDeduplication)?",
    shortAnswer: "An automated feature in the G1 GC that scans live Heap String objects and points duplicates to share the exact same underlying byte[] array, reducing memory without modifying code.",
    explanation: "Unlike intern(), which places references into the StringTable, G1 String Deduplication operates transparently in the background during garbage collection cycles on Heap objects created via 'new' or dynamic operations.",
    hint: "Transparent heap deduplication handled by the garbage collector.",
    level: "Expert",
    codeExample: "// Enable in JVM args:\n// java -XX:+UseG1GC -XX:+UseStringDeduplication MyApp"
  },
  {
    question: "What does 'System.identityHashCode(s)' verify when comparing string variables?",
    shortAnswer: "It returns the default object memory identity hash code regardless of whether the class overrides hashCode(), proving whether two references point to the exact same physical memory location.",
    explanation: "String overrides .hashCode() to return a value based purely on character contents. System.identityHashCode(s) bypasses this override and reveals the actual JVM reference identity, proving if two variables share the identical SCP object.",
    hint: "identityHashCode() inspects memory address identity, ignoring .hashCode().",
    level: "Intermediate",
    codeExample: "String s1 = \"Barrackpore\";\nString s2 = \"Barrackpore\";\nString s3 = new String(\"Barrackpore\");\n\nSystem.out.println(System.identityHashCode(s1) == System.identityHashCode(s2)); // true\nSystem.out.println(System.identityHashCode(s1) == System.identityHashCode(s3)); // false"
  },
  {
    question: "What is the output of 's1.intern() == s2.intern()' for any two strings with identical content?",
    shortAnswer: "It is guaranteed to return 'true' because 'intern()' always returns the single canonical instance stored in the String Constant Pool for that character sequence.",
    explanation: "Regardless of how s1 and s2 were created (literal, new String, substring, file read), calling intern() retrieves the single shared reference from the SCP, guaranteeing reference equality.",
    hint: "intern() always resolves to the single canonical SCP instance.",
    level: "Intermediate",
    codeExample: "String s1 = new String(\"Tuhina\");\nString s2 = new String(\"Tuhina\");\nSystem.out.println(s1 == s2);                   // false\nSystem.out.println(s1.intern() == s2.intern()); // true"
  },
  {
    question: "How does String.valueOf(char[] data) allocate memory compared to 'new String(data)'?",
    shortAnswer: "'String.valueOf(data)' internally delegates directly to 'new String(data)'. Both allocate a new String object on the Heap with a copy of the character array.",
    explanation: "Checking the JDK source code reveals: 'public static String valueOf(char data[]) { return new String(data); }'. There is no difference in memory allocation between the two.",
    hint: "String.valueOf(char[]) literally calls new String(char[]).",
    level: "Beginner",
    codeExample: "char[] data = {'a', 'b', 'c'};\nString s1 = String.valueOf(data); // calls new String(data)\nString s2 = new String(data);\nSystem.out.println(s1.equals(s2)); // true\nSystem.out.println(s1 == s2);     // false"
  },
  {
    question: "How many total objects are created in: 'String a = \"X\"; String b = \"X\"; String c = new String(\"X\"); String d = c.intern();'?",
    shortAnswer: "Exactly 2 objects: 1 in the String Constant Pool (shared by 'a', 'b', and 'd'), and 1 on the Heap referenced by 'c'.",
    explanation: "'a' creates/finds \"X\" in the SCP (1 object). 'b' reuses it (0 objects). 'c' creates a new Heap object and reuses the SCP literal (1 object). 'd' receives the existing SCP reference from intern() (0 objects). Total: 2 objects.",
    hint: "Count unique allocations: 1 in SCP + 1 on Heap = 2.",
    level: "Advanced",
    codeExample: "String a = \"X\";             // 1 in SCP\nString b = \"X\";             // 0 (SCP reused)\nString c = new String(\"X\"); // 1 on Heap\nString d = c.intern();       // 0 (SCP returned)\nSystem.out.println(a == b);  // true\nSystem.out.println(a == c);  // false\nSystem.out.println(a == d);  // true"
  },
  {
    question: "How does escaping double quotes affect string literal creation in the SCP?",
    shortAnswer: "Escape sequences like '\\\"', '\\n', and '\\\\' are parsed by the compiler into single character bytes; the literal registered in the SCP contains the decoded characters directly.",
    explanation: "Escape sequences are a syntactic representation in Java source code. The Java compiler translates '\\\"' into the ASCII character code 34 before embedding the literal in the constant pool.",
    hint: "Escapes are decoded at compile time into raw character codes.",
    level: "Beginner",
    codeExample: "String s1 = \"Hello \\\"World\\\"\";\nSystem.out.println(s1.length()); // 13 (not 15!)"
  },
  {
    question: "What is the key takeaway rule for junior developers regarding String creation?",
    shortAnswer: "Always create strings using literals (String s = \"value\";). Never use 'new String()' unless you have an explicit, documented architectural requirement for distinct heap memory references.",
    explanation: "Literals ensure automatic memory reuse through the String Constant Pool, minimize garbage collection overhead, enable faster equality checks via interning, and keep source code clean and idiomatic.",
    hint: "Use literals by default; avoid 'new String()' entirely.",
    level: "Beginner",
    codeExample: "// Teacher Sukanta Hui's golden rule:\nString bestPractice = \"Clean, Fast, Pooled\";"
  }
];

export default topic1_questions;
