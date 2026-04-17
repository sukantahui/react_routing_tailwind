// topic7_files/topic7_questions.js
const questions = [
    {
        question: "What is StringBuffer in Java?",
        shortAnswer: "A mutable, thread-safe sequence of characters.",
        explanation: "StringBuffer allows modification without creating new objects. It is part of java.lang and is synchronized.",
        hint: "Think of it as a mutable version of String.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(\"Hello\");\nsb.append(\" World\");"
    },
    {
        question: "How is StringBuffer different from String?",
        shortAnswer: "String is immutable; StringBuffer is mutable.",
        explanation: "Operations on String create new objects; StringBuffer modifies the same object.",
        hint: "StringBuffer is efficient for many changes.",
        level: "basic",
        codeExample: "String s = \"Hi\"; s += \"!\"; // new object\nStringBuffer sb = new StringBuffer(\"Hi\"); sb.append(\"!\"); // same object"
    },
    {
        question: "Is StringBuffer thread-safe?",
        shortAnswer: "Yes, all its public methods are synchronized.",
        explanation: "This makes it safe to use in multi-threaded environments, but adds performance overhead.",
        hint: "For single-threaded, use StringBuilder.",
        level: "intermediate",
        codeExample: "// Safe to share across threads\nStringBuffer sb = new StringBuffer();\n// multiple threads can call sb.append()"
    },
    {
        question: "What is the default initial capacity of StringBuffer?",
        shortAnswer: "16 characters.",
        explanation: "When you create a StringBuffer with no-arg constructor, it allocates internal char array of size 16.",
        hint: "Capacity grows automatically when needed.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer();\nSystem.out.println(sb.capacity()); // 16"
    },
    {
        question: "What is the difference between length() and capacity()?",
        shortAnswer: "length() is number of characters; capacity() is size of internal array.",
        explanation: "length <= capacity always. Capacity grows automatically when length exceeds it.",
        hint: "Pre‑sizing capacity avoids resizing overhead.",
        level: "intermediate",
        codeExample: "StringBuffer sb = new StringBuffer(5);\nsb.append(\"abc\"); // length=3, capacity=5"
    },
    {
        question: "How to convert a StringBuffer to a String?",
        shortAnswer: "Using toString() method.",
        explanation: "toString() returns a new String object containing the characters from the buffer.",
        hint: "Don't forget to call toString() when a String is needed.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(\"Hello\");\nString str = sb.toString();"
    },
    {
        question: "What does the append() method do?",
        shortAnswer: "Adds the specified string (or other type) to the end of the buffer.",
        explanation: "Append returns the same StringBuffer object, allowing chaining.",
        hint: "It modifies the buffer, returns this.",
        level: "basic",
        codeExample: "sb.append(\"Hello\").append(\" \").append(\"World\");"
    },
    {
        question: "How to insert a string at a specific position?",
        shortAnswer: "Use insert(int offset, String str).",
        explanation: "Inserts the string at the specified offset, shifting subsequent characters.",
        hint: "Offset must be between 0 and length().",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(\"HelloWorld\");\nsb.insert(5, \" \"); // \"Hello World\""
    },
    {
        question: "How to delete characters from a StringBuffer?",
        shortAnswer: "Use delete(int start, int end) or deleteCharAt(int index).",
        explanation: "delete removes characters from start (inclusive) to end (exclusive).",
        hint: "deleteCharAt removes a single character.",
        level: "basic",
        codeExample: "sb.delete(2, 5); // removes indices 2-4"
    },
    {
        question: "What does reverse() do on StringBuffer?",
        shortAnswer: "Reverses the sequence of characters in the buffer.",
        explanation: "Modifies the buffer in place and returns the same object.",
        hint: "Useful for palindromes or string reversal.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(\"abc\");\nsb.reverse(); // \"cba\""
    },
    {
        question: "Can you chain methods on StringBuffer?",
        shortAnswer: "Yes, because most methods return the same StringBuffer instance.",
        explanation: "Chaining allows concise code: sb.append(\"a\").append(\"b\").reverse();",
        hint: "Fluent interface style.",
        level: "basic",
        codeExample: "sb.append(\"Hello\").insert(5, \" \").reverse();"
    },
    {
        question: "What happens if you exceed the capacity of a StringBuffer?",
        shortAnswer: "The capacity automatically increases (usually doubles, plus some).",
        explanation: "A new larger internal array is allocated and characters are copied.",
        hint: "Pre‑sizing reduces these expensive copies.",
        level: "intermediate",
        codeExample: "StringBuffer sb = new StringBuffer(2);\nsb.append(\"abc\"); // capacity increases"
    },
    {
        question: "How to ensure a minimum capacity?",
        shortAnswer: "Use ensureCapacity(int minimumCapacity).",
        explanation: "If current capacity is less than minimum, it increases capacity.",
        hint: "Call this before a large append to avoid multiple resizes.",
        level: "intermediate",
        codeExample: "sb.ensureCapacity(1000); // now can append 1000 chars efficiently"
    },
    {
        question: "What is the difference between StringBuffer and StringBuilder?",
        shortAnswer: "StringBuffer is thread-safe (synchronized); StringBuilder is not.",
        explanation: "StringBuilder is faster but not safe for multi-threaded use.",
        hint: "Use StringBuilder for single-threaded code.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder(); // preferred in single thread"
    },
    {
        question: "Is StringBuffer obsolete?",
        shortAnswer: "No, but StringBuilder is preferred for new single-threaded code.",
        explanation: "StringBuffer is still used in legacy code and when thread-safety is required.",
        hint: "New projects should use StringBuilder unless sharing across threads.",
        level: "intermediate",
        codeExample: "// Legacy code may still use StringBuffer"
    },
    {
        question: "Can StringBuffer be used as a key in HashMap?",
        shortAnswer: "Not recommended because it is mutable and hashcode may change.",
        explanation: "If you modify the buffer after adding it to a map, the key becomes lost.",
        hint: "Use String instead for map keys.",
        level: "expert",
        codeExample: "// Bad: mutable keys\nMap<StringBuffer, String> map = new HashMap<>();"
    },
    {
        question: "What is the return type of substring() on StringBuffer?",
        shortAnswer: "String (immutable), not StringBuffer.",
        explanation: "substring() returns a new String object, not a mutable buffer.",
        hint: "If you need mutable substring, create a new StringBuffer from it.",
        level: "intermediate",
        codeExample: "String sub = sb.substring(2, 5); // returns String"
    },
    {
        question: "How to replace a portion of a StringBuffer?",
        shortAnswer: "Using replace(int start, int end, String str).",
        explanation: "Replaces characters from start to end-1 with the given string.",
        hint: "The replacement string can be of different length.",
        level: "intermediate",
        codeExample: "sb.replace(0, 5, \"Hello\"); // replaces first 5 chars"
    },
    {
        question: "What is the time complexity of append()?",
        shortAnswer: "Amortized O(1) – constant time on average.",
        explanation: "Occasional O(n) when capacity increases and array is copied.",
        hint: "Pre‑sizing reduces those O(n) resizes.",
        level: "advanced",
        codeExample: "// Most appends are fast"
    },
    {
        question: "Can StringBuffer handle null?",
        shortAnswer: "append(null) converts null to the string \"null\". insert(null) also works.",
        explanation: "Similar to String concatenation, null becomes \"null\".",
        hint: "Be careful – you might get \"null\" unexpectedly.",
        level: "intermediate",
        codeExample: "StringBuffer sb = new StringBuffer();\nsb.append(null); // \"null\""
    },
    {
        question: "How to get the character at a specific index?",
        shortAnswer: "Using charAt(int index).",
        explanation: "Returns the char at the given position (0-based).",
        hint: "Throws IndexOutOfBoundsException if invalid.",
        level: "basic",
        codeExample: "char ch = sb.charAt(0);"
    },
    {
        question: "How to set a character at a specific index?",
        shortAnswer: "Using setCharAt(int index, char ch).",
        explanation: "Replaces the character at the specified index.",
        hint: "Void method – does not return the buffer.",
        level: "basic",
        codeExample: "sb.setCharAt(0, 'H');"
    },
    {
        question: "What is the indexOf() method in StringBuffer?",
        shortAnswer: "Returns the index of the first occurrence of a substring.",
        explanation: "Similar to String.indexOf(). Returns -1 if not found.",
        hint: "Also lastIndexOf() for last occurrence.",
        level: "intermediate",
        codeExample: "int pos = sb.indexOf(\"World\");"
    },
    {
        question: "Can you compare two StringBuffer objects?",
        shortAnswer: "Use toString().equals() because StringBuffer doesn't override equals().",
        explanation: "StringBuffer inherits Object.equals(), which compares references, not content.",
        hint: "Convert to String first for content comparison.",
        level: "intermediate",
        codeExample: "if(sb1.toString().equals(sb2.toString())) { ... }"
    },
    {
        question: "What is the performance impact of synchronization in StringBuffer?",
        shortAnswer: "Slower than StringBuilder (typically 2-3x in benchmarks).",
        explanation: "Each method acquires a lock, causing overhead even when not needed.",
        hint: "Avoid in performance-critical single-threaded code.",
        level: "advanced",
        codeExample: "// StringBuilder is much faster"
    },
    {
        question: "How to clear a StringBuffer?",
        shortAnswer: "sb.setLength(0); or sb.delete(0, sb.length());",
        explanation: "setLength(0) is more efficient as it just resets the length counter.",
        hint: "Both reuse the same internal array.",
        level: "intermediate",
        codeExample: "sb.setLength(0); // clears content"
    },
    {
        question: "What is the difference between delete and deleteCharAt?",
        shortAnswer: "delete removes a range; deleteCharAt removes a single character.",
        explanation: "delete is more flexible; deleteCharAt is convenient for single index.",
        hint: "delete(0, sb.length()) clears everything.",
        level: "basic",
        codeExample: "sb.deleteCharAt(5); // removes 6th character"
    },
    {
        question: "Can StringBuffer be used with try-with-resources?",
        shortAnswer: "No, it does not implement AutoCloseable.",
        explanation: "StringBuffer doesn't hold system resources that need closing.",
        hint: "No need to close it.",
        level: "basic",
        codeExample: "// Not applicable"
    },
    {
        question: "What is the purpose of getChars() in StringBuffer?",
        shortAnswer: "Copies characters from the buffer into a destination char array.",
        explanation: "Useful when you need to extract a portion into an existing array.",
        hint: "More efficient than repeated charAt() calls.",
        level: "advanced",
        codeExample: "char[] dst = new char[5];\nsb.getChars(0, 5, dst, 0);"
    },
    {
        question: "How to create a StringBuffer from a CharSequence?",
        shortAnswer: "Use new StringBuffer(CharSequence cs).",
        explanation: "Accepts any CharSequence (String, StringBuilder, etc.).",
        hint: "Allows conversion from other mutable sequences.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder(\"Hi\");\nStringBuffer sbf = new StringBuffer(sb);"
    }
];

export default questions;