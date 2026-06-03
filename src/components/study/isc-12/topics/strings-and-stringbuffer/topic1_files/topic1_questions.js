// topic1_files/topic1_questions.js
const questions = [
    {
        question: "What are the two ways to create a String in Java?",
        shortAnswer: "Using string literal (e.g., String s = 'Hi';) or the new keyword (e.g., String s = new String('Hi');).",
        explanation: "The literal way uses double quotes directly and stores the string in the String Pool. The new keyword always creates a new object on the heap outside the pool.",
        hint: "Think about memory efficiency.",
        level: "basic",
        codeExample: "String a = \"Hello\";\nString b = new String(\"Hello\");"
    },
    {
        question: "Where are string literals stored?",
        shortAnswer: "In the String Pool (a special area inside the Heap).",
        explanation: "The String Pool is a cache that stores unique string literals. When you create a literal, JVM checks the pool first. If it exists, the reference is reused.",
        hint: "This is why literals are memory efficient.",
        level: "basic",
        codeExample: "// Both refer to same pooled object\nString s1 = \"Barrackpore\";\nString s2 = \"Barrackpore\";"
    },
    {
        question: "What is the difference between String literal and new String() in terms of memory?",
        shortAnswer: "Literals are stored in the String Pool (reused); new String() always creates a new object on the heap (outside pool).",
        explanation: "The literal reuses existing objects if the same content exists. The new keyword forces creation of a brand new object regardless of existing content, potentially wasting memory.",
        hint: "Imagine a library with multiple copies of the same book vs sharing one copy.",
        level: "intermediate",
        codeExample: "String x = \"Java\";\nString y = new String(\"Java\");\nSystem.out.println(x == y); // false"
    },
    {
        question: "Does new String() ever use the String Pool?",
        shortAnswer: "No, unless you explicitly call .intern() on it.",
        explanation: "new String() creates an object outside the pool. You can manually add it to the pool using .intern(), but that's rarely needed.",
        hint: "Use literals instead of new + intern.",
        level: "intermediate",
        codeExample: "String s = new String(\"Hi\").intern(); // now in pool"
    },
    {
        question: "Why should we prefer string literals over new String()?",
        shortAnswer: "For memory efficiency and better performance.",
        explanation: "Literals are reused, reducing memory usage. They also make == comparison potentially reliable (though still not recommended). new String() creates unnecessary objects, increasing garbage collection overhead.",
        hint: "In large applications, this can save megabytes of memory.",
        level: "basic",
        codeExample: "// Good\nString status = \"SUCCESS\";\n// Bad (unless required)\nString status = new String(\"SUCCESS\");"
    },
    {
        question: "What happens when we write String s = new String('test')?",
        shortAnswer: "Two objects may be created: one in the heap (the new object) and possibly the literal 'test' in the pool if not already present.",
        explanation: "The constructor new String('test') receives the literal 'test', which is already a pooled string. Then it creates a separate heap copy. So two objects exist.",
        hint: "That's wasteful – the literal alone would suffice.",
        level: "expert",
        codeExample: "// Avoid this\nString s = new String(\"test\");"
    },
    {
        question: "Can we manually add a string to the String Pool?",
        shortAnswer: "Yes, using the intern() method.",
        explanation: "intern() returns a canonical representation. If the pool already contains an equal string, returns that; otherwise adds this string to the pool and returns it.",
        hint: "Useful when you have many duplicate strings from external sources.",
        level: "intermediate",
        codeExample: "String s1 = new String(\"hello\");\nString s2 = s1.intern();\nString s3 = \"hello\";\nSystem.out.println(s2 == s3); // true"
    },
    {
        question: "Is there any scenario where using new String() is necessary?",
        shortAnswer: "Rarely. One example is when you need a distinct string object for synchronization (locking on a string).",
        explanation: "If you lock on a string literal, other parts of code using the same literal could also lock, causing unintended contention. A new String gives you a unique lock object.",
        hint: "But for ordinary data, avoid new String().",
        level: "expert",
        codeExample: "private static final String LOCK = new String(\"LOCK\");"
    },
    {
        question: "How does the JVM decide to reuse string literals?",
        shortAnswer: "At compile time, identical literals are merged. At runtime, the String Pool ensures reuse.",
        explanation: "When the class is loaded, all string literals are placed into the pool. If the same literal appears multiple times, all references point to the same pool entry.",
        hint: "This is done by the JVM automatically.",
        level: "intermediate",
        codeExample: "String a = \"abc\";\nString b = \"abc\"; // same object"
    },
    {
        question: "What is the output of: String s1 = 'Hi'; String s2 = new String('Hi'); System.out.println(s1 == s2);",
        shortAnswer: "false",
        explanation: "s1 is a literal (pooled), s2 is a new heap object. They are different objects, so == returns false even though content is equal.",
        hint: "Use equals() for content.",
        level: "basic",
        codeExample: "System.out.println(s1.equals(s2)); // true"
    },
    {
        question: "Does the String Pool get garbage collected?",
        shortAnswer: "Yes, but only if the string is no longer referenced and the pool is eligible (implementation dependent).",
        explanation: "In modern JVMs, the String Pool is part of the heap and can be garbage collected if the string is not referenced anywhere. However, interned literals often stay for the lifetime of the class.",
        hint: "Don't rely on GC of pooled strings for memory management.",
        level: "expert",
        codeExample: "// Not a concern for typical code"
    },
    {
        question: "What is the size limit of the String Pool?",
        shortAnswer: "It's not fixed; it grows as needed, but performance degrades with huge number of distinct strings.",
        explanation: "The pool is implemented as a hash table. Too many distinct strings (e.g., millions) can lead to collisions and slower lookups.",
        hint: "Avoid interning dynamically generated strings in bulk.",
        level: "expert",
        codeExample: "// Not recommended for random unique strings"
    },
    {
        question: "How to check if two strings refer to the same object?",
        shortAnswer: "Use the == operator.",
        explanation: "== compares references (memory addresses). It returns true only if both variables point to the exact same String object.",
        hint: "Don't use == for content comparison.",
        level: "basic",
        codeExample: "if (s1 == s2) { /* same object */ }"
    },
    {
        question: "What is the default behavior when concatenating literals?",
        shortAnswer: "The compiler often concatenates them at compile time into a single literal, which is then pooled.",
        explanation: "String s = 'Hello' + ' ' + 'World'; becomes 'Hello World' at compile time, so only one pooled string exists.",
        hint: "This is efficient.",
        level: "intermediate",
        codeExample: "String s = \"abc\" + \"def\"; // becomes \"abcdef\""
    },
    {
        question: "Are strings created with new String() mutable?",
        shortAnswer: "No. All Strings in Java are immutable, regardless of creation method.",
        explanation: "Immutability is a property of the String class itself, not of how it's created. Both literals and new produce immutable strings.",
        hint: "Immutability is separate from pooling.",
        level: "basic",
        codeExample: "String s = new String(\"Hi\");\ns.toUpperCase(); // s unchanged"
    },
    {
        question: "What is the output of: String s1 = 'Java'; String s2 = 'Java'; System.out.println(s1 == s2);",
        shortAnswer: "true",
        explanation: "Both are literals, so they refer to the same pooled object.",
        hint: "This is the rare case where == works for content.",
        level: "basic",
        codeExample: "// true because same object"
    },
    {
        question: "How many objects are created by: String s = new String('xyz');?",
        shortAnswer: "One or two. The literal 'xyz' (if not already in pool) and the new heap object.",
        explanation: "If 'xyz' is not already in the pool, it is added when the class loads. Then new String creates a separate heap object. So total two objects.",
        hint: "That's why new String() is wasteful.",
        level: "intermediate",
        codeExample: "// Two objects if 'xyz' not pooled before"
    },
    {
        question: "Can we use new String() to create an empty string?",
        shortAnswer: "Yes: new String() creates an empty string (\"\").",
        explanation: "The no-argument constructor creates a string with no characters. But it's still better to use literal \"\".",
        hint: "Literals are always preferable.",
        level: "basic",
        codeExample: "String empty = new String(); // same as \"\""
    },
    {
        question: "What is the purpose of String constructor taking char[]?",
        shortAnswer: "To create a new String from a character array.",
        explanation: "This is useful when you have mutable char data that you want to convert to an immutable String. It creates a new heap object (not pooled).",
        hint: "Useful for security (clearing char array after use).",
        level: "intermediate",
        codeExample: "char[] chars = {'A','B'};\nString s = new String(chars);"
    },
    {
        question: "Why does Java have both literal and new ways?",
        shortAnswer: "Historical reasons and flexibility: literals for convenience and performance; new for explicit object creation when needed.",
        explanation: "Java wanted to treat strings as objects but also provide syntactic sugar (literals). The new keyword allows creating strings from other data sources (char arrays, byte arrays, etc.) and gives control over object identity.",
        hint: "In practice, 99% of the time use literals.",
        level: "expert",
        codeExample: "// new is needed for char[] or byte[] sources"
    },
    {
        question: "What is the difference between String s = null and String s = new String()?",
        shortAnswer: "null means no object; new String() creates an empty string object.",
        explanation: "null is a reference that points to nothing. new String() creates an actual object (with empty content). Methods called on null cause NullPointerException; on empty string they work.",
        hint: "Always check for null before calling methods unless you're sure.",
        level: "basic",
        codeExample: "String a = null;\nString b = new String();\nSystem.out.println(b.length()); // 0\nSystem.out.println(a.length()); // NPE"
    },
    {
        question: "Does Java allow string literals to be modified via reflection?",
        shortAnswer: "Technically yes, but it's extremely dangerous and should never be done.",
        explanation: "Reflection can break immutability, but doing so can cause undefined behavior because other parts of code may rely on the string being unchanged (e.g., hash codes cached).",
        hint: "Never try to mutate literals.",
        level: "expert",
        codeExample: "// Don't do this!"
    },
    {
        question: "What is the effect of using new String() inside a loop?",
        shortAnswer: "It creates many unnecessary objects, leading to memory pressure and GC overhead.",
        explanation: "Each iteration creates a new String object. If the content is the same, it's wasteful. Use literals or StringBuilder instead.",
        hint: "Performance can degrade significantly.",
        level: "intermediate",
        codeExample: "for (int i=0;i<10000;i++) {\n  String s = new String(\"hi\"); // BAD\n}"
    },
    {
        question: "How does Java treat string literals with the same content across different classes?",
        shortAnswer: "They are shared via the String Pool across all classes.",
        explanation: "The String Pool is global. If two different classes use the same literal, they refer to the same pooled object.",
        hint: "Great for constants like error messages.",
        level: "intermediate",
        codeExample: "// Class A: String s = \"common\";\n// Class B: String t = \"common\";\n// s == t (true)"
    },
    {
        question: "What is the return type of the intern() method?",
        shortAnswer: "String (the canonical representation).",
        explanation: "It returns a string from the pool. If the string was already in pool, that reference; otherwise adds this string to pool and returns it.",
        hint: "Can be used to force pooling of dynamically created strings.",
        level: "intermediate",
        codeExample: "String pooled = myString.intern();"
    },
    {
        question: "Is the String Pool present in all Java versions?",
        shortAnswer: "Yes, since early Java versions, but its implementation has improved.",
        explanation: "The concept of interning string literals has been present from Java 1.0. Modern JVMs have more efficient pool implementations (like G1's deduplication).",
        hint: "Always rely on literals.",
        level: "expert",
        codeExample: "// Still relevant today"
    },
    {
        question: "Can a string literal be garbage collected?",
        shortAnswer: "Yes, if the class that defines it is unloaded and no other references exist.",
        explanation: "String literals are strongly referenced by the Class object. When the class is unloaded (rare in typical apps), the literal may become eligible for GC.",
        hint: "For most applications, literals stay forever.",
        level: "expert",
        codeExample: "// Not a concern for typical code"
    },
    {
        question: "What is the output of: String s1 = 'ab' + 'c'; String s2 = 'abc'; System.out.println(s1 == s2);",
        shortAnswer: "true",
        explanation: "Compile-time constant folding turns 'ab' + 'c' into 'abc', so both refer to the same pooled string.",
        hint: "The + operator on literals is optimized.",
        level: "intermediate",
        codeExample: "// true because same literal after folding"
    },
    {
        question: "What is the difference between String s = '' and String s = new String()?",
        shortAnswer: "Functionally both create empty strings, but the literal is pooled and new creates a heap object.",
        explanation: "'' is a literal empty string, stored in pool. new String() creates a new empty string on the heap. For practical purposes, use the literal.",
        hint: "Literals are always better.",
        level: "basic",
        codeExample: "String empty1 = \"\";\nString empty2 = new String();\nSystem.out.println(empty1 == empty2); // false"
    },
    {
        question: "Can we create a string without using quotes or new?",
        shortAnswer: "Yes, using methods like String.valueOf() or char[].",
        explanation: "String.valueOf(123) returns a string representation. Also, you can use StringBuilder.toString(). But under the hood, these eventually create string objects (often literals not involved).",
        hint: "But these are not creation syntax.",
        level: "intermediate",
        codeExample: "String num = String.valueOf(100); // \"100\""
    }
];

export default questions;