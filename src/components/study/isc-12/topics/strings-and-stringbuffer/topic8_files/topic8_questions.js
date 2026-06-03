// topic8_files/topic8_questions.js
const questions = [
    {
        question: "What does it mean for a string to be immutable?",
        shortAnswer: "Once created, the content cannot be changed.",
        explanation: "Any method that appears to modify the string actually creates a new string object.",
        hint: "The original object stays the same forever.",
        level: "basic",
        codeExample: "String s = \"Hi\"; s.toUpperCase(); // s is still \"Hi\""
    },
    {
        question: "What does it mean for a string to be mutable?",
        shortAnswer: "The content can be changed after creation.",
        explanation: "Methods like append, insert, delete modify the same object without creating new ones.",
        hint: "You can edit the string in place.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(\"Hi\"); sb.append(\"!\"); // sb becomes \"Hi!\""
    },
    {
        question: "What are the mutable string classes in Java?",
        shortAnswer: "StringBuilder and StringBuffer.",
        explanation: "Both provide methods to modify the character sequence without creating new objects.",
        hint: "StringBuilder is faster; StringBuffer is thread‑safe.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); StringBuffer sbf = new StringBuffer();"
    },
    {
        question: "Why is String immutable in Java?",
        shortAnswer: "For security, String Pool caching, hashcode caching, and thread‑safety.",
        explanation: "Immutability allows strings to be shared safely and used as reliable map keys.",
        hint: "Many benefits come from this design decision.",
        level: "intermediate",
        codeExample: "// Immutable strings can be shared without defensive copying"
    },
    {
        question: "When should I use StringBuilder instead of String?",
        shortAnswer: "When you need to modify the string many times (e.g., inside loops).",
        explanation: "StringBuilder avoids creating many intermediate objects, improving performance.",
        hint: "For a few concatenations, String is fine.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); for(int i=0;i<1000;i++) sb.append(i);"
    },
    {
        question: "What is the performance difference between String and StringBuilder?",
        shortAnswer: "StringBuilder is much faster for many concatenations (O(n) vs O(n²)).",
        explanation: "String creates a new object each time; StringBuilder modifies the same object.",
        hint: "The difference grows with the number of operations.",
        level: "intermediate",
        codeExample: "// 10,000 concatenations: String ~500ms, StringBuilder ~2ms"
    },
    {
        question: "Can a mutable string be used as a HashMap key?",
        shortAnswer: "Not recommended. If the key changes, the entry becomes lost.",
        explanation: "HashCode of a mutable object can change, breaking hash‑based collections.",
        hint: "Use String (immutable) for map keys.",
        level: "intermediate",
        codeExample: "// Bad: StringBuilder key = new StringBuilder(\"a\"); map.put(key, 1); key.append(\"b\"); // now lost"
    },
    {
        question: "Is StringBuilder thread‑safe?",
        shortAnswer: "No, it is not synchronized.",
        explanation: "Use StringBuffer if you need thread‑safety; otherwise StringBuilder is faster.",
        hint: "Don't share StringBuilder across threads without external synchronization.",
        level: "basic",
        codeExample: "// Not safe: two threads calling append on same StringBuilder"
    },
    {
        question: "Is String thread‑safe?",
        shortAnswer: "Yes, because it is immutable.",
        explanation: "Since the content cannot change, multiple threads can read the same string safely.",
        hint: "No synchronization needed for reading.",
        level: "basic",
        codeExample: "// Safe to share String across threads"
    },
    {
        question: "What happens when you append to a StringBuilder?",
        shortAnswer: "The internal char array is modified (or expanded if needed).",
        explanation: "No new StringBuilder object is created; the same object is updated.",
        hint: "That's why it's efficient.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(\"a\"); sb.append(\"b\"); // same sb object"
    },
    {
        question: "How does the compiler optimize string concatenation with +?",
        shortAnswer: "For simple concatenations, it uses StringBuilder under the hood.",
        explanation: "String s = \"a\" + \"b\" + \"c\"; becomes new StringBuilder().append(...).toString();",
        hint: "But in loops, it creates a new StringBuilder each iteration.",
        level: "intermediate",
        codeExample: "// Compiler translates: String s = a + b + c; to StringBuilder"
    },
    {
        question: "Why is StringBuffer slower than StringBuilder?",
        shortAnswer: "Because its methods are synchronized (thread‑safe overhead).",
        explanation: "Each method acquires a lock, which adds overhead even in single‑threaded code.",
        hint: "Use StringBuilder unless you need thread‑safety.",
        level: "intermediate",
        codeExample: "// StringBuilder is ~2-3x faster in benchmarks"
    },
    {
        question: "Can I convert a StringBuilder to a String?",
        shortAnswer: "Yes, using toString().",
        explanation: "toString() creates a new immutable String from the mutable buffer.",
        hint: "After conversion, changes to StringBuilder don't affect the String.",
        level: "basic",
        codeExample: "String result = sb.toString();"
    },
    {
        question: "Can I convert a String to a StringBuilder?",
        shortAnswer: "Yes, using new StringBuilder(String).",
        explanation: "Creates a mutable copy of the immutable string.",
        hint: "Useful when you need to modify an existing string.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(\"Hello\");"
    },
    {
        question: "What is the default capacity of StringBuilder?",
        shortAnswer: "16 characters.",
        explanation: "When you create StringBuilder() without arguments, it allocates an internal array of size 16.",
        hint: "Pre‑size to avoid resizing.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); // capacity 16"
    },
    {
        question: "Does immutability guarantee thread‑safety?",
        shortAnswer: "Yes, for the object's state (since it never changes).",
        explanation: "Multiple threads can read an immutable object without synchronization.",
        hint: "But the variable reference can still be changed by threads.",
        level: "intermediate",
        codeExample: "// String is safe to share; the reference variable may need synchronization"
    },
    {
        question: "Why does StringBuilder return itself from append()?",
        shortAnswer: "To allow method chaining (fluent interface).",
        explanation: "Returning this lets you write sb.append(\"a\").append(\"b\").append(\"c\");",
        hint: "Improves readability.",
        level: "basic",
        codeExample: "sb.append(\"Hello\").append(\" \").append(\"World\");"
    },
    {
        question: "What is the difference between length() and capacity() in StringBuilder?",
        shortAnswer: "length() is the number of characters used; capacity() is the size of internal array.",
        explanation: "length <= capacity always. Capacity grows automatically when needed.",
        hint: "Pre‑sizing capacity avoids costly resizes.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder(100); // capacity 100, length 0"
    },
    {
        question: "How to clear a StringBuilder?",
        shortAnswer: "sb.setLength(0); or sb.delete(0, sb.length());",
        explanation: "setLength(0) is more efficient; it just resets the length counter.",
        hint: "The internal array is reused.",
        level: "intermediate",
        codeExample: "sb.setLength(0); // clears content"
    },
    {
        question: "Can I use StringBuilder with try‑with‑resources?",
        shortAnswer: "No, it doesn't implement AutoCloseable.",
        explanation: "StringBuilder doesn't hold system resources that need closing.",
        hint: "No need to close it.",
        level: "basic",
        codeExample: "// Not applicable"
    },
    {
        question: "What is the output of: String s = \"abc\"; s.concat(\"def\"); System.out.println(s);",
        shortAnswer: "abc",
        explanation: "concat() returns a new string but is not assigned, so s unchanged.",
        hint: "Immutable – original unaffected.",
        level: "basic",
        codeExample: "// Output: abc"
    },
    {
        question: "What is the output of: StringBuilder sb = new StringBuilder(\"abc\"); sb.append(\"def\"); System.out.println(sb);",
        shortAnswer: "abcdef",
        explanation: "append() modifies the same StringBuilder object.",
        hint: "Mutable – content changed.",
        level: "basic",
        codeExample: "// Output: abcdef"
    },
    {
        question: "Can we make a custom class immutable?",
        shortAnswer: "Yes, by making fields final, not providing setters, and ensuring no method can modify internal state.",
        explanation: "Also make the class final to prevent subclassing that could add mutability.",
        hint: "Follow the same pattern as String.",
        level: "advanced",
        codeExample: "public final class ImmutablePoint { private final int x, y; ... }"
    },
    {
        question: "What is the memory impact of using String vs StringBuilder?",
        shortAnswer: "String creates more objects, leading to higher GC pressure.",
        explanation: "Each String concatenation creates a new object; StringBuilder reuses the same object.",
        hint: "For many operations, StringBuilder reduces memory churn.",
        level: "intermediate",
        codeExample: "// String: many short‑lived objects; StringBuilder: few long‑lived"
    },
    {
        question: "Is there a performance difference between StringBuilder and StringBuffer in single‑threaded code?",
        shortAnswer: "Yes, StringBuilder is significantly faster.",
        explanation: "StringBuffer's synchronization adds overhead even when not needed.",
        hint: "Prefer StringBuilder for single‑threaded.",
        level: "intermediate",
        codeExample: "// StringBuilder is the default choice"
    },
    {
        question: "What happens if I call reverse() on an empty StringBuilder?",
        shortAnswer: "Nothing – it remains empty.",
        explanation: "reverse() on an empty or single‑character buffer returns the same buffer.",
        hint: "No error.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); sb.reverse(); // still empty"
    },
    {
        question: "Can I use a StringBuilder as a return value from a method?",
        shortAnswer: "Yes, but it breaks encapsulation (caller can modify internal state).",
        explanation: "Better to return a String (defensive copy) unless the caller needs mutability.",
        hint: "Returning StringBuilder is like giving out the keys to your house.",
        level: "advanced",
        codeExample: "// Return sb.toString() instead of sb"
    },
    {
        question: "What is the difference between String and char[]?",
        shortAnswer: "String is immutable, has many built‑in methods, and is a class. char[] is mutable, low‑level, and has no methods.",
        explanation: "Use String for text; use char[] only for low‑level operations or when mutability is required.",
        hint: "String is almost always better for text.",
        level: "intermediate",
        codeExample: "char[] arr = {'a','b'}; arr[0] = 'z'; // allowed"
    },
    {
        question: "How to efficiently build a string from a list of strings?",
        shortAnswer: "Use StringBuilder and append each element.",
        explanation: "For delimited strings, use String.join() which internally uses StringBuilder.",
        hint: "Avoid using += in a loop.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); for(String s : list) sb.append(s);"
    },
    {
        question: "What is the advantage of immutability in functional programming?",
        shortAnswer: "Eliminates side effects, making code easier to reason about.",
        explanation: "Immutable data ensures that functions don't accidentally modify inputs.",
        hint: "Works well with streams and lambdas.",
        level: "expert",
        codeExample: "// Immutable strings are naturally functional"
    }
];

export default questions;