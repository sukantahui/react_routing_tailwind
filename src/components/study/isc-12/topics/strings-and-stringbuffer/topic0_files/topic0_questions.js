// topic0_files/topic0_questions.js
const questions = [
    {
        question: "What is a String in Java?",
        shortAnswer: "A String is a sequence of characters and a built-in class in java.lang package.",
        explanation: "Strings represent text. Unlike primitives, String is an object that provides methods to manipulate text. Examples: 'Hello', 'Swadeep', '123 Main St'.",
        hint: "Think of a String as a labeled box containing a line of text.",
        level: "basic",
        codeExample: "String name = \"Tuhina\";"
    },
    {
        question: "Is String a primitive data type?",
        shortAnswer: "No, String is a class (reference type) in Java.",
        explanation: "Primitive types are int, double, boolean, char, etc. String is a predefined class in java.lang, which means String variables hold references to objects.",
        hint: "Primitives are single values; String can hold many characters and has methods.",
        level: "basic",
        codeExample: "String s = \"hello\"; // s is a reference to a String object"
    },
    {
        question: "How to find the length of a String?",
        shortAnswer: "Using the length() method.",
        explanation: "The length() method returns the number of characters in the String. Note: length is a method, not a property (unlike arrays).",
        hint: "Try: 'Java'.length() → 4",
        level: "basic",
        codeExample: "String str = \"Barrackpore\";\nint len = str.length(); // 10"
    },
    {
        question: "What is the String Pool?",
        shortAnswer: "A special memory area inside the Heap that stores unique string literals to reuse them.",
        explanation: "When you create a string literal, JVM checks the pool first. If the same literal exists, it reuses the reference. This saves memory and improves performance.",
        hint: "Think of a shared notebook where everyone writes common phrases only once.",
        level: "intermediate",
        codeExample: "String s1 = \"Ichapur\";\nString s2 = \"Ichapur\"; // s1 == s2 (same object)"
    },
    {
        question: "What does the charAt() method do?",
        shortAnswer: "Returns the character at a given index (0-based).",
        explanation: "Useful for iterating through a string or checking specific positions. Index must be between 0 and length-1.",
        hint: "Observe: 'Hello'.charAt(1) → 'e'",
        level: "basic",
        codeExample: "String city = \"Naihati\";\nchar ch = city.charAt(3); // 'h'"
    },
    {
        question: "Are Strings mutable in Java?",
        shortAnswer: "No, Strings are immutable – once created, they cannot be changed.",
        explanation: "Any operation that seems to modify a string (toUpperCase, concat, replace) actually creates a brand new String object. The original remains unchanged.",
        hint: "Try changing a string and printing the original – it stays the same.",
        level: "basic",
        codeExample: "String s = \"cat\";\ns.toUpperCase();\nSystem.out.println(s); // still 'cat'"
    },
    {
        question: "What is the difference between String literal and new String()?",
        shortAnswer: "Literal reuses from String Pool; new always creates a new object on the Heap (outside pool).",
        explanation: "String literal: String a = 'Hi'; String b = 'Hi'; → a and b refer to same object. new String('Hi') forces a distinct object even if content is same.",
        hint: "Using new is rarely needed; literals are better for memory.",
        level: "intermediate",
        codeExample: "String x = \"Hello\";\nString y = new String(\"Hello\");\nSystem.out.println(x == y); // false"
    },
    {
        question: "How to convert a string to uppercase?",
        shortAnswer: "Use the toUpperCase() method.",
        explanation: "Returns a new string with all characters converted to uppercase. Original is unchanged due to immutability.",
        hint: "Works with locale-sensitive rules if needed: toUpperCase(Locale.ROOT).",
        level: "basic",
        codeExample: "String lang = \"java\";\nString upper = lang.toUpperCase(); // 'JAVA'"
    },
    {
        question: "What does the trim() method do?",
        shortAnswer: "Removes leading and trailing whitespace from a string.",
        explanation: "Whitespace includes spaces, tabs, newlines. Useful for cleaning user input. Returns a new string.",
        hint: "Try: '  Swadeep  '.trim() → 'Swadeep'",
        level: "basic",
        codeExample: "String input = \"  Abhronila  \";\nString cleaned = input.trim();"
    },
    {
        question: "Why is String immutable?",
        shortAnswer: "For security, caching (String Pool), thread-safety, and performance of hash-based collections.",
        explanation: "Immutable strings can be shared safely, their hashcode is cached, and no one can alter a string after creation (preventing security issues like changing file paths).",
        hint: "Think about why you wouldn't want a filename to change unexpectedly.",
        level: "expert",
        codeExample: "// Immutability allows String to be used as HashMap keys safely"
    },
    {
        question: "How to check if two strings have the same content?",
        shortAnswer: "Use the equals() method, not ==.",
        explanation: "equals() compares character by character. == compares memory addresses (references). Always use equals() for content.",
        hint: "Even if two strings look the same, == may be false if they are different objects.",
        level: "basic",
        codeExample: "String a = \"Hi\";\nString b = new String(\"Hi\");\nSystem.out.println(a.equals(b)); // true"
    },
    {
        question: "What is the substring() method used for?",
        shortAnswer: "Extracts a portion of a string (from beginIndex to endIndex-1).",
        explanation: "Returns a new string. Overloaded: substring(start) or substring(start, end).",
        hint: "Remember: endIndex is exclusive.",
        level: "intermediate",
        codeExample: "String str = \"Shyamnagar\";\nString sub = str.substring(0, 5); // 'Shyam'"
    },
    {
        question: "Can a String be null?",
        shortAnswer: "Yes, because String is a reference type.",
        explanation: "A String variable that doesn't refer to any object is null. Calling methods on a null String causes NullPointerException.",
        hint: "Always check for null before calling methods unless you are certain.",
        level: "basic",
        codeExample: "String s = null;\nif(s != null) { System.out.println(s.length()); }"
    },
    {
        question: "What is the difference between isEmpty() and isBlank()?",
        shortAnswer: "isEmpty() returns true only if length == 0; isBlank() (Java 11+) returns true if string is empty or contains only whitespace.",
        explanation: "Use isBlank() to consider spaces as 'empty' for validation.",
        hint: "'   '.isEmpty() → false; '   '.isBlank() → true",
        level: "intermediate",
        codeExample: "String s = \"   \";\nSystem.out.println(s.isBlank()); // true"
    },
    {
        question: "How to concatenate strings efficiently?",
        shortAnswer: "Use StringBuilder (or StringBuffer for thread-safety) inside loops, otherwise + operator is fine for simple cases.",
        explanation: "Using + in a loop creates many intermediate strings, hurting performance. StringBuilder is mutable and optimized.",
        hint: "For a few fixed strings, + is optimized by compiler anyway.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder();\nfor(int i=0;i<100;i++) sb.append(i);\nString result = sb.toString();"
    },
    {
        question: "What is the return type of toLowerCase()?",
        shortAnswer: "Returns a new String.",
        explanation: "Original string unchanged; returns a new string with all characters lowercased.",
        hint: "Immutability means you must assign the result to a variable.",
        level: "basic",
        codeExample: "String orig = \"JAVA\";\nString low = orig.toLowerCase();\nSystem.out.println(orig); // JAVA"
    },
    {
        question: "How does String compareTo() work?",
        shortAnswer: "Compares strings lexicographically (dictionary order). Returns negative, zero, or positive.",
        explanation: "Based on Unicode values of characters. Returns 0 if equal, <0 if first string comes before second, >0 otherwise.",
        hint: "Useful for sorting collections of strings.",
        level: "intermediate",
        codeExample: "int cmp = \"apple\".compareTo(\"banana\"); // negative"
    },
    {
        question: "What is the purpose of String.intern()?",
        shortAnswer: "Manually adds a string to the String Pool and returns the canonical representation.",
        explanation: "If the pool already contains an equal string, returns that reference; otherwise adds this string to pool. Useful for memory optimization.",
        hint: "Modern JVM optimizations often make intern() less necessary.",
        level: "expert",
        codeExample: "String s1 = new String(\"test\");\nString s2 = s1.intern();\nString s3 = \"test\";\nSystem.out.println(s2 == s3); // true"
    },
    {
        question: "What exception is thrown when charAt index is invalid?",
        shortAnswer: "StringIndexOutOfBoundsException.",
        explanation: "Thrown if index is negative or >= length().",
        hint: "Always check index < length() before charAt.",
        level: "basic",
        codeExample: "String s = \"Hi\";\ns.charAt(2); // throws exception"
    },
    {
        question: "How to replace characters in a String?",
        shortAnswer: "Using replace() or replaceAll() methods (both return new String).",
        explanation: "replace(char old, char new) replaces all occurrences. replaceAll uses regex.",
        hint: "Original string is never modified.",
        level: "intermediate",
        codeExample: "String s = \"catt\";\nString r = s.replace('t', 'r'); // 'carr'"
    },
    {
        question: "What is the difference between String and StringBuffer?",
        shortAnswer: "String is immutable; StringBuffer is mutable and thread-safe.",
        explanation: "StringBuffer methods (append, insert, delete) modify the same object, avoiding extra object creation. It is synchronized, making it slower than StringBuilder.",
        hint: "For single-threaded scenarios, use StringBuilder (faster).",
        level: "intermediate",
        codeExample: "StringBuffer sb = new StringBuffer(\"Hi\");\nsb.append(\" there\"); // sb modified"
    },
    {
        question: "Can we use String in switch statements?",
        shortAnswer: "Yes, starting from Java 7.",
        explanation: "Switch works with String by comparing the string's content (using equals). Efficiently implemented.",
        hint: "Null values cause NullPointerException in switch.",
        level: "intermediate",
        codeExample: "String day = \"MON\";\nswitch(day) { case \"MON\": ... }"
    },
    {
        question: "What is the default value of a String field in a class?",
        shortAnswer: "null.",
        explanation: "Since String is an object reference, instance variables default to null unless initialized.",
        hint: "Local variables must be initialized before use.",
        level: "basic",
        codeExample: "class Student { String name; } // name is null"
    },
    {
        question: "How to split a string into parts?",
        shortAnswer: "Using the split(regex) method, returns a String[] array.",
        explanation: "Splits the string around matches of the given regular expression. Common: split(\",\") for CSV.",
        hint: "Be careful with regex special characters (like dot . or pipe |). Escape them: split(\"\\\\.\").",
        level: "intermediate",
        codeExample: "String data = \"apple,banana,grape\";\nString[] fruits = data.split(\",\");"
    },
    {
        question: "What is the memory impact of many duplicate string literals?",
        shortAnswer: "Virtually none because literals are interned in the String Pool.",
        explanation: "All identical literals refer to the same object, so 1000 times \"Hello\" uses memory of just one string object.",
        hint: "That's why using new String() carelessly can waste memory.",
        level: "expert",
        codeExample: "// Literals are memory efficient"
    },
    {
        question: "How to join multiple strings with a delimiter?",
        shortAnswer: "Use String.join(delimiter, elements) or Collectors.joining().",
        explanation: "Java 8 introduced String.join for arrays/iterables. Cleaner than manual loops.",
        hint: "String.join(\", \", \"A\", \"B\") → 'A, B'",
        level: "intermediate",
        codeExample: "String joined = String.join(\"-\", \"2025\", \"04\", \"14\"); // '2025-04-14'"
    },
    {
        question: "What is the purpose of the repeat() method?",
        shortAnswer: "Returns a string repeated n times (Java 11+).",
        explanation: "Convenient for generating padding or repeated patterns.",
        hint: "Useful for ASCII art or test data.",
        level: "intermediate",
        codeExample: "String stars = \"*\".repeat(5); // '*****'"
    },
    {
        question: "Can you explain String interning with an example?",
        shortAnswer: "Interning ensures that equal strings share the same memory reference via the String Pool.",
        explanation: "When you intern a string, JVM adds it to the pool. Any future literal equal to it will refer to the same object.",
        hint: "Literals are automatically interned.",
        level: "expert",
        codeExample: "String a = new String(\"java\").intern();\nString b = \"java\";\nSystem.out.println(a == b); // true"
    },
    {
        question: "What is the time complexity of length()?",
        shortAnswer: "O(1) – constant time.",
        explanation: "String stores its length as a field, so retrieving it is instantaneous, not a character count loop.",
        hint: "No performance penalty for calling length() repeatedly.",
        level: "intermediate",
        codeExample: "// length is cached internally"
    },
    {
        question: "How do you convert a char array to a String?",
        shortAnswer: "Using new String(charArray) or String.valueOf(charArray).",
        explanation: "Both create a new String from the characters. Useful when you have mutable char[] data.",
        hint: "Reverse conversion: toCharArray().",
        level: "basic",
        codeExample: "char[] chars = {'J','a','v','a'};\nString str = new String(chars);"
    }
];

export default questions;