// topic11_files/topic11_questions.js
const questions = [
    {
        question: "Why is using + for string concatenation in a loop bad for performance?",
        shortAnswer: "It creates O(n²) intermediate objects and copies.",
        explanation: "Each iteration creates a new StringBuilder and copies the entire accumulated string, leading to quadratic complexity.",
        hint: "For n=10,000, that's ~50 million character copies.",
        level: "intermediate",
        codeExample: "// Bad\nString s = \"\";\nfor(int i=0;i<10000;i++) s += i;"
    },
    {
        question: "What is the time complexity of StringBuilder.append()?",
        shortAnswer: "Amortized O(1) – constant time on average.",
        explanation: "Most appends are constant time; occasional resizing copies the array (O(n)) but happens rarely.",
        hint: "Pre‑sizing eliminates resizing copies.",
        level: "intermediate",
        codeExample: "// Amortized constant time"
    },
    {
        question: "How much faster is StringBuilder than String for 10,000 concatenations?",
        shortAnswer: "Typically 100-500x faster.",
        explanation: "String: ~500-1000 ms; StringBuilder: ~1-2 ms.",
        hint: "The gap grows with larger n.",
        level: "basic",
        codeExample: "// StringBuilder wins by a huge margin"
    },
    {
        question: "What is the performance cost of StringBuffer over StringBuilder?",
        shortAnswer: "StringBuffer is slower due to synchronization (typically 2-3x).",
        explanation: "Each method acquires a lock, adding overhead even when not needed.",
        hint: "Use StringBuilder unless you need thread‑safety.",
        level: "intermediate",
        codeExample: "// StringBuilder is faster"
    },
    {
        question: "Does pre‑sizing StringBuilder improve performance?",
        shortAnswer: "Yes, it avoids internal array resizing and copying.",
        explanation: "If you know the final length, pre‑sizing eliminates multiple resize operations.",
        hint: "Especially beneficial for large strings.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(10000);"
    },
    {
        question: "What is the memory overhead of a String object?",
        shortAnswer: "About 24 bytes + 2 bytes per character (plus array overhead).",
        explanation: "Each String has object header, hash code, and reference to char array. The char array itself has overhead.",
        hint: "Many small strings waste memory.",
        level: "advanced",
        codeExample: "// new String(\"a\") uses ~40+ bytes"
    },
    {
        question: "Is String interning always beneficial for performance?",
        shortAnswer: "No – it saves memory but costs CPU and can cause issues in large heaps.",
        explanation: "Interning adds strings to the pool, which can reduce duplicates but the pool lookup has overhead. Over‑interning can cause contention.",
        hint: "Use only for known repeated strings (e.g., HTTP methods).",
        level: "expert",
        codeExample: "String method = httpMethod.intern(); // OK for GET/POST"
    },
    {
        question: "What is the performance impact of using String.format()?",
        shortAnswer: "Slower than manual concatenation or StringBuilder.",
        explanation: "format() parses the format string and uses Formatter internally, which has overhead.",
        hint: "Use for readability, not for hot paths.",
        level: "intermediate",
        codeExample: "// Faster: \"a\" + b\n// Slower: String.format(\"a%s\", b)"
    },
    {
        question: "How to efficiently clear a StringBuilder for reuse?",
        shortAnswer: "Use setLength(0).",
        explanation: "setLength(0) resets the length counter but keeps the internal array, avoiding new allocation.",
        hint: "More efficient than creating a new StringBuilder.",
        level: "intermediate",
        codeExample: "sb.setLength(0); // clear"
    },
    {
        question: "Why does calling toUpperCase() on a large string multiple times hurt performance?",
        shortAnswer: "Each call creates a new String, copying all characters.",
        explanation: "If you need to check case‑insensitive equality, use equalsIgnoreCase() instead of converting both to upper/lower.",
        hint: "Avoid creating unnecessary copies.",
        level: "basic",
        codeExample: "// Bad: s.toUpperCase().equals(\"YES\")\n// Good: s.equalsIgnoreCase(\"yes\")"
    },
    {
        question: "What is the performance difference between new String(\"abc\") and \"abc\"?",
        shortAnswer: "\"abc\" is faster and uses less memory because it uses the String Pool.",
        explanation: "new String(\"abc\") always creates a new heap object, bypassing the pool.",
        hint: "Never use new String(String) unless you need a distinct object.",
        level: "basic",
        codeExample: "String s = \"abc\"; // good\nString t = new String(\"abc\"); // bad"
    },
    {
        question: "How does split() affect performance?",
        shortAnswer: "It compiles a regex each time; for repeated calls, pre‑compile the Pattern.",
        explanation: "split(String regex) compiles the regex on every call. Use Pattern.compile() and reuse.",
        hint: "For simple delimiters, use StringUtils or manual loop.",
        level: "advanced",
        codeExample: "Pattern p = Pattern.compile(\",\");\nString[] parts = p.split(str);"
    },
    {
        question: "Is it faster to use + or concat() for two strings?",
        shortAnswer: "concat() can be slightly faster for exactly two strings.",
        explanation: "concat() creates a new char array of exact size; + may use StringBuilder overhead.",
        hint: "Difference is negligible; use + for readability.",
        level: "advanced",
        codeExample: "// a.concat(b) may be a tiny bit faster than a + b"
    },
    {
        question: "What is the cost of substring() in modern Java?",
        shortAnswer: "O(n) – it creates a new string with a copy of the characters.",
        explanation: "Older Java shared the backing array, which could cause memory leaks. Now it's a copy, trading memory for safety.",
        hint: "Still fine for typical use.",
        level: "intermediate",
        codeExample: "String sub = s.substring(0,5); // copies 5 chars"
    },
    {
        question: "How to efficiently join many strings with a delimiter?",
        shortAnswer: "Use String.join() or Collectors.joining() – they use StringBuilder internally.",
        explanation: "Both are optimized and handle delimiter placement correctly.",
        hint: "Avoid manual loops with conditional delimiter logic.",
        level: "basic",
        codeExample: "String result = String.join(\", \", list);"
    },
    {
        question: "What is the performance impact of using StringBuilder's default capacity (16) for large strings?",
        shortAnswer: "It causes multiple resizes (copying the array many times), hurting performance.",
        explanation: "Each time capacity is exceeded, the array size increases (often doubled) and all characters are copied.",
        hint: "Pre‑size to avoid resizes.",
        level: "intermediate",
        codeExample: "// Bad for large strings: new StringBuilder()\n// Good: new StringBuilder(10000)"
    },
    {
        question: "How does garbage collection affect string‑heavy applications?",
        shortAnswer: "Many short‑lived strings increase GC frequency and pause times.",
        explanation: "String concatenation in loops creates many temporary objects, putting pressure on the garbage collector.",
        hint: "Use StringBuilder to reduce object churn.",
        level: "advanced",
        codeExample: "// StringBuilder creates fewer objects → less GC"
    },
    {
        question: "What is the fastest way to convert an int to a String?",
        shortAnswer: "Integer.toString(i) is fastest.",
        explanation: "Direct conversion avoids intermediate objects. \"\" + i uses StringBuilder internally.",
        hint: "Use Integer.toString(i) for performance.",
        level: "intermediate",
        codeExample: "String s = Integer.toString(123);"
    },
    {
        question: "Why is String concatenation with + at compile time optimized?",
        shortAnswer: "The compiler folds constant expressions into a single literal.",
        explanation: "String s = \"a\" + \"b\" + \"c\"; becomes \"abc\" at compile time – no runtime cost.",
        hint: "Works only with literals, not variables.",
        level: "intermediate",
        codeExample: "// Compiles to \"abc\"\nString s = \"a\" + \"b\" + \"c\";"
    },
    {
        question: "Does using charAt() in a loop have any performance issues?",
        shortAnswer: "No, it's O(1) per call and efficient.",
        explanation: "String stores characters in an array; charAt() is a simple array access.",
        hint: "Fine for most use cases.",
        level: "basic",
        codeExample: "for(int i=0;i<s.length();i++) { char c = s.charAt(i); }"
    },
    {
        question: "What is the performance cost of using replaceAll() with a simple string?",
        shortAnswer: "It compiles a regex, which is slower than replace() for literal replacement.",
        explanation: "replaceAll() treats the first argument as regex; replace() uses literal string.",
        hint: "Use replace() for literal replacements.",
        level: "intermediate",
        codeExample: "// Faster: s.replace(\"a\", \"b\")\n// Slower: s.replaceAll(\"a\", \"b\")"
    },
    {
        question: "How to measure string performance in Java?",
        shortAnswer: "Use System.nanoTime() for micro‑benchmarks or JMH for robust benchmarking.",
        explanation: "System.nanoTime() gives high‑precision timing. JMH is the standard for Java micro‑benchmarking.",
        hint: "Warm up the JVM before measuring.",
        level: "advanced",
        codeExample: "long start = System.nanoTime();\n// code\nlong end = System.nanoTime();"
    },
    {
        question: "Is it beneficial to reuse StringBuilder across multiple operations?",
        shortAnswer: "Yes, using setLength(0) to clear and reuse avoids object allocation.",
        explanation: "Reusing the same StringBuilder reduces GC pressure.",
        hint: "But be careful not to share across threads.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder();\nfor(...) { sb.setLength(0); sb.append(...); }"
    },
    {
        question: "What is the memory impact of storing many small strings (e.g., single characters)?",
        shortAnswer: "High overhead per string; consider using char[] or StringBuilder instead.",
        explanation: "Each String object has overhead. For many small strings, memory usage can be 3-5x the actual character data.",
        hint: "For large collections of small strings, consider alternative structures.",
        level: "expert",
        codeExample: "// 10,000 single‑char strings use ~400KB overhead"
    },
    {
        question: "Does using StringBuilder.append() with a char faster than with a String of length 1?",
        shortAnswer: "Slightly faster because it avoids creating a String object.",
        explanation: "append('a') directly adds the char; append(\"a\") creates a temporary String.",
        hint: "Use char literal when possible.",
        level: "advanced",
        codeExample: "sb.append('a'); // faster than sb.append(\"a\")"
    },
    {
        question: "What is the performance impact of using String.intern() on many distinct strings?",
        shortAnswer: "Can cause performance degradation and memory leaks (older JVMs).",
        explanation: "Interned strings are stored in the PermGen (Java 7-) which has limited size; excessive interning causes OutOfMemoryError. Even in modern JVMs, the pool is a hash table that can become large and slow.",
        hint: "Only intern known limited values.",
        level: "expert",
        codeExample: "// Only for small set of repeated values"
    },
    {
        question: "How does Java 9+ compact strings affect performance?",
        shortAnswer: "Reduces memory usage for strings containing only Latin‑1 characters (stores as byte[] instead of char[]).",
        explanation: "Most strings in many applications are Latin‑1, so memory is halved, improving cache efficiency.",
        hint: "Transparent to developers.",
        level: "advanced",
        codeExample: "// Enabled by default since Java 9"
    },
    {
        question: "What is the fastest way to check if a string is empty?",
        shortAnswer: "isEmpty() is fastest; checking length() == 0 is similar.",
        explanation: "Both are O(1). Avoid equals(\"\") which creates a new String object.",
        hint: "Use isEmpty() for clarity.",
        level: "basic",
        codeExample: "if (s.isEmpty()) { ... }"
    },
    {
        question: "Why does reading large files line by line with StringBuilder improve performance?",
        shortAnswer: "It avoids creating many intermediate strings and reduces GC.",
        explanation: "If you accumulate the whole file, using StringBuilder is much faster than String concatenation.",
        hint: "Read line, append to StringBuilder.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder();\nwhile((line=reader.readLine())!=null) sb.append(line).append('\\n');"
    },
    {
        question: "What is the performance trade‑off between using String and StringBuilder for small, fixed concatenations?",
        shortAnswer: "Negligible – the compiler optimizes small + expressions.",
        explanation: "For a few strings (e.g., 2-5), the compiler uses StringBuilder internally anyway.",
        hint: "Don't micro‑optimize; prioritize readability.",
        level: "basic",
        codeExample: "String s = \"a\" + \"b\" + \"c\"; // fine"
    }
];

export default questions;