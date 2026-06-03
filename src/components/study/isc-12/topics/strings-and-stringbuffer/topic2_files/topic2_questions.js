// topic2_files/topic2_questions.js
const questions = [
    {
        question: "What does it mean that String is immutable?",
        shortAnswer: "Once a String object is created, its value cannot be changed.",
        explanation: "Any operation that seems to modify the string (like toUpperCase, replace, concat) actually creates a brand new String object. The original remains unchanged.",
        hint: "Think of it as read-only after creation.",
        level: "basic",
        codeExample: "String s = \"hi\";\ns.toUpperCase(); // s still \"hi\""
    },
    {
        question: "How can we 'change' a String if it's immutable?",
        shortAnswer: "You can't change it; you create a new String with the modified value and assign it to the variable.",
        explanation: "You reassign the variable to the new String returned by the method. The original object remains unchanged and may be garbage collected if no longer referenced.",
        hint: "Example: s = s.toUpperCase();",
        level: "basic",
        codeExample: "String s = \"hello\";\ns = s.toUpperCase(); // now s = \"HELLO\""
    },
    {
        question: "Why are Strings immutable in Java?",
        shortAnswer: "For security, String pooling, caching hashcodes, and thread-safety.",
        explanation: "Immutability allows strings to be shared safely (String Pool), makes them reliable as HashMap keys, and prevents security issues (e.g., file path changes after validation).",
        hint: "Many benefits from a single design decision.",
        level: "intermediate",
        codeExample: "// Immutability allows this to be safe\nString path = getSecurityCheckedPath();\n// path cannot be changed by other code"
    },
    {
        question: "Does immutability affect performance?",
        shortAnswer: "It can both help and hurt. It helps by caching hashcodes and enabling pooling; it hurts when many intermediate strings are created (e.g., in loops).",
        explanation: "For heavy manipulation, StringBuilder is faster. But for general use, immutability's benefits outweigh costs.",
        hint: "Use StringBuilder for loops.",
        level: "intermediate",
        codeExample: "// Bad: creates many objects\nString s = \"\";\nfor(int i=0;i<1000;i++) s += i;"
    },
    {
        question: "What is the output of: String s = 'Java'; s.concat(' is fun'); System.out.println(s);",
        shortAnswer: "Java",
        explanation: "concat() returns a new string but is not assigned, so s still refers to the original 'Java'.",
        hint: "The result is lost.",
        level: "basic",
        codeExample: "// Output: Java"
    },
    {
        question: "How do you correctly change a string to uppercase?",
        shortAnswer: "Assign the result of toUpperCase() to a variable (can be the same or different).",
        explanation: "String upper = str.toUpperCase(); or str = str.toUpperCase();",
        hint: "Don't forget the assignment.",
        level: "basic",
        codeExample: "String name = \"Swadeep\";\nname = name.toUpperCase();"
    },
    {
        question: "Can immutability be broken using reflection?",
        shortAnswer: "Technically yes, but it's extremely dangerous and should never be done in production.",
        explanation: "Reflection can access the internal char array and modify it. This breaks JVM assumptions and can cause unpredictable behavior (e.g., hash codes cached).",
        hint: "Never do this.",
        level: "expert",
        codeExample: "// Don't use reflection to mutate strings"
    },
    {
        question: "What is the difference between String and StringBuilder regarding immutability?",
        shortAnswer: "String is immutable; StringBuilder is mutable.",
        explanation: "StringBuilder provides methods like append, insert, delete that modify the same object, avoiding extra allocations.",
        hint: "Use StringBuilder for many concatenations.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder(\"Hi\");\nsb.append(\" there\"); // sb modified"
    },
    {
        question: "Does String immutability mean that s = s + '!' creates a new object?",
        shortAnswer: "Yes, it creates a new String object containing the concatenated result.",
        explanation: "The '+' operator creates a new String (or uses StringBuilder under the hood) and returns it. The original is unchanged.",
        hint: "The variable s is reassigned to the new object.",
        level: "basic",
        codeExample: "String s = \"Hi\";\ns = s + \"!\"; // new object created"
    },
    {
        question: "Why is String immutable but char[] is mutable?",
        shortAnswer: "Design choice: Strings are meant to be treated as values, not buffers. char[] is low-level and mutable by design.",
        explanation: "String hides the internal char array and doesn't provide mutator methods. char[] is a primitive array that can be modified.",
        hint: "If you need mutable characters, use char[] or StringBuilder.",
        level: "intermediate",
        codeExample: "char[] chars = {'a','b'};\nchars[0] = 'z'; // allowed"
    },
    {
        question: "What is the benefit of caching hashcode for immutable strings?",
        shortAnswer: "Hashcode can be computed once and reused, improving performance in hash-based collections.",
        explanation: "Since the string never changes, its hashcode is constant. String caches the hashcode after first computation.",
        hint: "This makes String excellent as HashMap keys.",
        level: "intermediate",
        codeExample: "String key = \"name\";\nmap.put(key, value); // hashcode cached"
    },
    {
        question: "Does substring() create a new string or share the char array?",
        shortAnswer: "In modern Java (7u6+), substring() always creates a new string with a new char array (copy).",
        explanation: "Older versions shared the backing array, which could cause memory leaks. Now it's a copy, trading memory for safety.",
        hint: "No need to worry about memory leaks from substring anymore.",
        level: "expert",
        codeExample: "String s = \"abcdef\";\nString sub = s.substring(2,4); // new string"
    },
    {
        question: "What happens to the original string when you reassign the variable?",
        shortAnswer: "The original object becomes eligible for garbage collection if no other references point to it.",
        explanation: "Example: String s = 'hello'; s = 'world'; The 'hello' object is now unreachable and can be GC'd.",
        hint: "Immutability doesn't prevent variable reassignment.",
        level: "basic",
        codeExample: "String s = \"abc\";\ns = \"def\"; // \"abc\" may be GC'd"
    },
    {
        question: "Can two String objects with same content be considered equal after one is 'modified'?",
        shortAnswer: "They remain equal in content because 'modification' creates a new object.",
        explanation: "Since the original is unchanged, and the new object has different content, they are not equal unless the new content happens to be the same.",
        hint: "Immutability ensures predictable equality.",
        level: "basic",
        codeExample: "String a = \"Hi\";\nString b = a;\na = a + \"!\";\nSystem.out.println(a.equals(b)); // false"
    },
    {
        question: "What is the memory impact of immutability?",
        shortAnswer: "It can increase memory usage because each modification creates a new object, but pooling reduces duplication.",
        explanation: "For many short-lived strings, GC overhead can be high. But literals are shared, reducing memory. Use StringBuilder to mitigate.",
        hint: "Balance: use literals for constants, StringBuilder for building.",
        level: "intermediate",
        codeExample: "// Creates 1001 string objects\nString s = \"\";\nfor(int i=0;i<1000;i++) s += i;"
    },
    {
        question: "Is String the only immutable class in Java?",
        shortAnswer: "No. Wrapper classes (Integer, Double, etc.), LocalDate, BigInteger, and many others are immutable.",
        explanation: "Java encourages immutability for value-based classes. You can also create your own immutable classes by making fields final and not providing setters.",
        hint: "Immutability is a design pattern.",
        level: "intermediate",
        codeExample: "Integer i = 5; // immutable\nLocalDate date = LocalDate.now(); // immutable"
    },
    {
        question: "How does String's immutability help with security?",
        shortAnswer: "Prevents malicious code from changing sensitive strings after validation.",
        explanation: "Example: A method receives a file path, checks permissions, then uses the path. If String were mutable, another thread could change the path after the check but before use.",
        hint: "Secure systems rely on immutability.",
        level: "expert",
        codeExample: "void readFile(String path) {\n  if(isSafe(path)) {\n    // path cannot be changed now\n    Files.read(path);\n  }\n}"
    },
    {
        question: "What is the output of: String s = 'abc'; String t = s.replace('a', 'z'); System.out.println(s + ' ' + t);",
        shortAnswer: "abc zbc",
        explanation: "replace() returns a new string; s remains 'abc'.",
        hint: "Original unchanged.",
        level: "basic",
        codeExample: "// Output: abc zbc"
    },
    {
        question: "Why doesn't String have methods like setCharAt()?",
        shortAnswer: "Because String is designed to be immutable; such methods would break immutability.",
        explanation: "If you need to modify characters, use StringBuilder or char[].",
        hint: "Different tool for different job.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(\"abc\");\nsb.setCharAt(1, 'z'); // 'azc'"
    },
    {
        question: "Can immutable objects cause performance issues?",
        shortAnswer: "Yes, if you create many intermediate objects (e.g., in loops or repeated concatenation).",
        explanation: "Each operation creates a new object, increasing GC pressure. That's why StringBuilder exists.",
        hint: "Profile your code; only optimize if needed.",
        level: "intermediate",
        codeExample: "// Slow: many objects\nString res = \"\";\nfor (String w : words) res += w;"
    },
    {
        question: "What does the final keyword on String class mean?",
        shortAnswer: "String is declared final, meaning it cannot be subclassed.",
        explanation: "This prevents overriding methods that could break immutability. It's part of the design to ensure all String objects are truly immutable.",
        hint: "Final class = cannot be extended.",
        level: "intermediate",
        codeExample: "public final class String { ... }"
    },
    {
        question: "Is the following code safe for multithreading: String shared = 'value';?",
        shortAnswer: "Yes, because String is immutable, it is inherently thread-safe.",
        explanation: "Multiple threads can read the same String object without synchronization; no thread can change it.",
        hint: "Immutability = thread safety by design.",
        level: "intermediate",
        codeExample: "// Safe to share across threads"
    },
    {
        question: "What happens if you try to modify a String using the returned value without reassigning?",
        shortAnswer: "The modification is lost, and the original remains unchanged.",
        explanation: "The new String object is created but not referenced, so it becomes eligible for garbage collection immediately.",
        hint: "Don't ignore return values.",
        level: "basic",
        codeExample: "\"hello\".toUpperCase(); // does nothing useful"
    },
    {
        question: "How does String's immutability affect equals() and hashCode()?",
        shortAnswer: "They are consistent because the state never changes. hashcode can be cached.",
        explanation: "If a string could change, its hashcode would change, breaking hash-based collections. Immutability guarantees stability.",
        hint: "That's why strings are good HashMap keys.",
        level: "intermediate",
        codeExample: "Map<String, Integer> map = new HashMap<>();\nmap.put(\"key\", 1); // safe"
    },
    {
        question: "What is the difference between String immutability and variable final?",
        shortAnswer: "Immutability means the object itself cannot change; final means the variable cannot be reassigned to a different object.",
        explanation: "final String s = 'hi'; s = 'bye'; // compile error. But s.toUpperCase() still creates new string (which cannot be reassigned to s if final).",
        hint: "Final is about reference, immutability about content.",
        level: "intermediate",
        codeExample: "final String s = \"abc\";\ns = s.toUpperCase(); // error: cannot assign to final"
    },
    {
        question: "Why is StringBuffer mutable but String is not?",
        shortAnswer: "Different design goals: String for immutable text values, StringBuffer for mutable text buffers (thread-safe).",
        explanation: "StringBuffer was created for scenarios where many modifications are needed. StringBuilder is the faster non-thread-safe version.",
        hint: "Choose the right tool.",
        level: "intermediate",
        codeExample: "StringBuffer sb = new StringBuffer(\"Hi\");\nsb.append(\"!\"); // mutable"
    },
    {
        question: "Can you create a mutable string in Java without using StringBuilder?",
        shortAnswer: "Yes, by using char[] or byte[] and managing it yourself.",
        explanation: "But that's error-prone. StringBuilder is the standard way.",
        hint: "Use built-in classes.",
        level: "expert",
        codeExample: "char[] chars = new char[10];\n// manually manage"
    },
    {
        question: "What is the output of: String s = 'abc'; s.toUpperCase(); System.out.println(s);",
        shortAnswer: "abc",
        explanation: "toUpperCase() returns a new string but is not assigned, so s unchanged.",
        hint: "Classic beginner mistake.",
        level: "basic",
        codeExample: "// Output: abc"
    },
    {
        question: "Does immutability mean that all String objects are stored in the String Pool?",
        shortAnswer: "No. Only literals (and interned strings) are in the pool. Strings created with new are on the heap but still immutable.",
        explanation: "Immutability is a property of the class, not where it's stored. Both pooled and non-pooled strings are immutable.",
        hint: "Don't confuse immutability with pooling.",
        level: "intermediate",
        codeExample: "String a = new String(\"Hi\"); // immutable but not pooled"
    },
    {
        question: "What is the advantage of immutability in functional programming?",
        shortAnswer: "It eliminates side effects, making code easier to reason about and test.",
        explanation: "Immutable data ensures that functions don't accidentally modify inputs, aligning with functional programming principles.",
        hint: "Java streams work well with immutable objects.",
        level: "expert",
        codeExample: "// Immutable strings work seamlessly with streams"
    }
];

export default questions;