// topic10_files/topic10_questions.js
const questions = [
    {
        question: "What is the main difference between String and StringBuilder?",
        shortAnswer: "String is immutable; StringBuilder is mutable.",
        explanation: "String creates a new object for each change; StringBuilder modifies the same object.",
        hint: "Choose StringBuilder for many modifications.",
        level: "basic",
        codeExample: "String s = \"Hi\"; s += \"!\"; // new object\nStringBuilder sb = new StringBuilder(\"Hi\"); sb.append(\"!\"); // same object"
    },
    {
        question: "What is the difference between StringBuffer and StringBuilder?",
        shortAnswer: "StringBuffer is thread-safe (synchronized); StringBuilder is not.",
        explanation: "StringBuffer methods are synchronized, making it safe for multi‑threaded use but slower. StringBuilder is faster but not thread‑safe.",
        hint: "Use StringBuilder in single‑threaded code.",
        level: "intermediate",
        codeExample: "StringBuffer sbf = new StringBuffer(); // thread-safe\nStringBuilder sb = new StringBuilder(); // not thread-safe"
    },
    {
        question: "Which is fastest: String, StringBuffer, or StringBuilder?",
        shortAnswer: "StringBuilder is fastest, then StringBuffer, then String (for many operations).",
        explanation: "StringBuilder has no synchronization overhead. String is slowest for many concatenations because it creates many objects.",
        hint: "For loops, always use StringBuilder.",
        level: "basic",
        codeExample: "// StringBuilder > StringBuffer > String (for many concats)"
    },
    {
        question: "When should I use String instead of StringBuilder?",
        shortAnswer: "When the string does not change or changes very infrequently.",
        explanation: "String is simpler, thread‑safe, and can be pooled. Use it for constants, map keys, return values.",
        hint: "Default to String unless you need mutability.",
        level: "basic",
        codeExample: "String name = \"Swadeep\"; // fine for fixed value"
    },
    {
        question: "When should I use StringBuilder instead of String?",
        shortAnswer: "When you need to modify the string many times (e.g., in loops, building dynamic content).",
        explanation: "StringBuilder avoids creating many intermediate objects, improving performance dramatically.",
        hint: "Any loop with string concatenation should use StringBuilder.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); for(int i=0;i<1000;i++) sb.append(i);"
    },
    {
        question: "Is StringBuffer obsolete?",
        shortAnswer: "No, but StringBuilder is preferred for new single‑threaded code.",
        explanation: "StringBuffer is still used in legacy code and when thread‑safety is required.",
        hint: "Only use StringBuffer if you need synchronization.",
        level: "intermediate",
        codeExample: "// Use StringBuilder unless sharing across threads"
    },
    {
        question: "Can I use StringBuilder as a key in a HashMap?",
        shortAnswer: "Not recommended – it is mutable and hashcode can change.",
        explanation: "If you modify the StringBuilder after inserting it into a map, the entry becomes lost.",
        hint: "Use String as key.",
        level: "intermediate",
        codeExample: "// Bad: map.put(sb, value); sb.append(...); // key lost"
    },
    {
        question: "Why is String immutable but StringBuilder mutable?",
        shortAnswer: "Design choice: String for security, pooling, and thread‑safety; StringBuilder for performance when many changes are needed.",
        explanation: "Immutability has many benefits (caching, sharing). Mutability is needed for efficiency in dynamic building.",
        hint: "Different tools for different jobs.",
        level: "intermediate",
        codeExample: "// String: safe to share; StringBuilder: efficient to change"
    },
    {
        question: "What happens if I use String concatenation inside a loop?",
        shortAnswer: "It creates many intermediate String objects, leading to poor performance and GC pressure.",
        explanation: "Each iteration creates a new StringBuilder and a new String, copying the entire accumulated string each time (O(n²) complexity).",
        hint: "Always use StringBuilder in loops.",
        level: "basic",
        codeExample: "// Bad: for(...) s += i;"
    },
    {
        question: "Which class should I use for building a SQL query dynamically?",
        shortAnswer: "StringBuilder (or StringBuffer if multi‑threaded, but usually StringBuilder).",
        explanation: "SQL queries are built dynamically and often involve many appends.",
        hint: "StringBuilder is the standard choice.",
        level: "basic",
        codeExample: "StringBuilder sql = new StringBuilder(\"SELECT * FROM users WHERE \"); sql.append(\"name = '\").append(name).append(\"'\");"
    },
    {
        question: "Can I convert between String and StringBuilder?",
        shortAnswer: "Yes: new StringBuilder(str) converts String to StringBuilder; sb.toString() converts StringBuilder to String.",
        explanation: "Conversion is straightforward and commonly used.",
        hint: "Don't forget toString() when you need an immutable result.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(\"Hello\"); String str = sb.toString();"
    },
    {
        question: "Which is more memory efficient for many changes: String or StringBuilder?",
        shortAnswer: "StringBuilder is much more memory efficient.",
        explanation: "String creates a new object for each change; StringBuilder reuses the same internal array.",
        hint: "Less garbage collection with StringBuilder.",
        level: "basic",
        codeExample: "// StringBuilder: one object; String: many objects"
    },
    {
        question: "Is String thread‑safe?",
        shortAnswer: "Yes, because it is immutable.",
        explanation: "Since the content cannot change, multiple threads can read the same String without synchronization.",
        hint: "Immutable objects are inherently thread‑safe.",
        level: "basic",
        codeExample: "// Safe to share String across threads"
    },
    {
        question: "Is StringBuilder thread‑safe?",
        shortAnswer: "No, it is not synchronized.",
        explanation: "If multiple threads access the same StringBuilder concurrently, data corruption can occur.",
        hint: "Use external synchronization or StringBuffer.",
        level: "basic",
        codeExample: "// Not safe: two threads calling append on same StringBuilder"
    },
    {
        question: "What is the performance overhead of StringBuffer compared to StringBuilder?",
        shortAnswer: "StringBuffer is slower (typically 2-3x) due to synchronization.",
        explanation: "Each method acquires a lock, adding overhead even in single‑threaded code.",
        hint: "Avoid StringBuffer unless you need thread‑safety.",
        level: "intermediate",
        codeExample: "// StringBuilder is much faster"
    },
    {
        question: "Can I use String for a large JSON generation?",
        shortAnswer: "Not recommended; use StringBuilder for efficiency.",
        explanation: "JSON generation involves many appends; String would create many intermediate objects.",
        hint: "Use StringBuilder for any dynamic building.",
        level: "basic",
        codeExample: "StringBuilder json = new StringBuilder(\"{\"); json.append(\"\\\"name\\\":\\\"Swadeep\\\"}\");"
    },
    {
        question: "What is the default capacity of StringBuilder?",
        shortAnswer: "16 characters.",
        explanation: "When created with no-arg constructor, internal char array size is 16.",
        hint: "Pre‑size if you know the final length.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); // capacity 16"
    },
    {
        question: "Does StringBuffer have the same methods as StringBuilder?",
        shortAnswer: "Yes, the method signatures are identical.",
        explanation: "Both have append, insert, delete, reverse, capacity, etc. Only thread‑safety differs.",
        hint: "You can replace StringBuffer with StringBuilder in single‑threaded code.",
        level: "basic",
        codeExample: "// Both have sb.append(), sb.insert(), etc."
    },
    {
        question: "Why was StringBuilder introduced in Java 1.5?",
        shortAnswer: "To provide a faster, non‑synchronized alternative to StringBuffer.",
        explanation: "StringBuffer's synchronization was often unnecessary, so StringBuilder was added for single‑threaded performance.",
        hint: "Most string building doesn't need thread‑safety.",
        level: "intermediate",
        codeExample: "// StringBuilder is the default choice since Java 1.5"
    },
    {
        question: "What happens if I return a StringBuilder from a method?",
        shortAnswer: "It breaks encapsulation because the caller can modify the internal state.",
        explanation: "Better to return sb.toString() to provide an immutable copy.",
        hint: "Defensive copying is a good practice.",
        level: "advanced",
        codeExample: "// Bad: return sb; // Good: return sb.toString();"
    },
    {
        question: "Which class should I use for a shared log buffer accessed by multiple threads?",
        shortAnswer: "StringBuffer (or use StringBuilder with external synchronization).",
        explanation: "StringBuffer's methods are synchronized, making it safe for concurrent appends.",
        hint: "StringBuffer is designed for this scenario.",
        level: "intermediate",
        codeExample: "StringBuffer log = new StringBuffer(); // shared across threads"
    },
    {
        question: "Can I use + with StringBuilder?",
        shortAnswer: "No, + is only for String. Use append() for StringBuilder.",
        explanation: "StringBuilder does not support the + operator.",
        hint: "Use sb.append(x).append(y).",
        level: "basic",
        codeExample: "// sb + \"text\" // error\nsb.append(\"text\"); // correct"
    },
    {
        question: "What is the time complexity of concatenating n strings using String vs StringBuilder?",
        shortAnswer: "String: O(n²), StringBuilder: O(n).",
        explanation: "String creates a new object each iteration copying all previous characters. StringBuilder appends in amortized constant time.",
        hint: "Quadratic vs linear – huge difference for large n.",
        level: "advanced",
        codeExample: "// String: 10,000 operations → ~50 million copies"
    },
    {
        question: "Is it safe to use StringBuilder in a web application (servlet) that handles multiple requests?",
        shortAnswer: "Yes, if each request creates its own StringBuilder (local variable).",
        explanation: "Local variables are not shared across threads. Only shared instances need synchronization.",
        hint: "Keep StringBuilder local to method scope.",
        level: "intermediate",
        codeExample: "public void doGet(...) { StringBuilder sb = new StringBuilder(); // safe }"
    },
    {
        question: "What is the difference between String.join() and StringBuilder?",
        shortAnswer: "String.join() is a convenience method for joining strings with a delimiter; it uses StringBuilder internally.",
        explanation: "String.join() is simpler for delimited lists; StringBuilder gives more control.",
        hint: "Use join() for simple delimiter cases.",
        level: "basic",
        codeExample: "String joined = String.join(\", \", list); // uses StringBuilder internally"
    },
    {
        question: "Can I use StringBuffer in a try‑with‑resources block?",
        shortAnswer: "No, it does not implement AutoCloseable.",
        explanation: "StringBuffer doesn't hold system resources that need closing.",
        hint: "No need to close it.",
        level: "basic",
        codeExample: "// Not applicable"
    },
    {
        question: "How to clear a StringBuilder efficiently?",
        shortAnswer: "sb.setLength(0);",
        explanation: "Resets length to 0; the internal array is reused.",
        hint: "More efficient than creating a new StringBuilder.",
        level: "intermediate",
        codeExample: "sb.setLength(0); // clear"
    },
    {
        question: "What is the output of: String s = null; StringBuilder sb = new StringBuilder(s);",
        shortAnswer: "NullPointerException.",
        explanation: "StringBuilder constructor does not accept null; it throws NPE.",
        hint: "Check for null before constructing.",
        level: "basic",
        codeExample: "// Throws NPE"
    },
    {
        question: "Which class would you use to implement a string cache that is shared across threads?",
        shortAnswer: "String (immutable) is best for caching because it is safe and can be pooled.",
        explanation: "Immutable strings can be shared without synchronization and are ideal for caches.",
        hint: "Use String for cached values.",
        level: "advanced",
        codeExample: "Map<String, Data> cache = new ConcurrentHashMap<>();"
    },
    {
        question: "What is the difference in memory usage between String and StringBuilder for 10,000 concatenations?",
        shortAnswer: "String creates ~10,000 objects; StringBuilder creates 1 object (plus a few internal array resizes).",
        explanation: "Each String concatenation creates a new object; StringBuilder reuses the same object.",
        hint: "StringBuilder drastically reduces GC pressure.",
        level: "intermediate",
        codeExample: "// String: high memory churn; StringBuilder: low"
    }
];

export default questions;