// topic5_files/topic5_questions.js
const questions = [
    {
        question: "What are the different ways to concatenate strings in Java?",
        shortAnswer: "+ operator, concat() method, StringBuilder/StringBuffer, String.join(), String.format().",
        explanation: "Each has different use cases: + for readability, concat() for two strings, StringBuilder for loops, join() for delimiters.",
        hint: "Choose based on number of strings and performance needs.",
        level: "basic",
        codeExample: "String a = \"Hello\" + \" World\";\nString b = \"Hello\".concat(\" World\");\nStringBuilder sb = new StringBuilder().append(\"Hello\").append(\" World\");"
    },
    {
        question: "Is using + for string concatenation efficient?",
        shortAnswer: "Yes for a few fixed strings (compiler optimizes), but not in loops.",
        explanation: "The compiler translates + into StringBuilder for simple cases. But in loops, each iteration creates a new StringBuilder and intermediate strings.",
        hint: "Use + for 2-5 strings, StringBuilder for loops.",
        level: "intermediate",
        codeExample: "// Good: String s = \"a\" + \"b\" + \"c\";\n// Bad: for(...) s += i;"
    },
    {
        question: "What is the difference between StringBuilder and StringBuffer?",
        shortAnswer: "StringBuilder is not thread-safe (faster); StringBuffer is thread-safe (slower due to synchronization).",
        explanation: "Use StringBuilder in single-threaded code. Use StringBuffer only when sharing across threads.",
        hint: "99% of the time, StringBuilder is the right choice.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder(); // preferred\nStringBuffer sbf = new StringBuffer(); // legacy"
    },
    {
        question: "Why is using + in a loop bad for performance?",
        shortAnswer: "Each iteration creates a new StringBuilder and a new String object, leading to O(n²) complexity.",
        explanation: "s += x is roughly s = new StringBuilder(s).append(x).toString(). So each iteration copies the entire accumulated string.",
        hint: "For 10,000 iterations, it creates ~10,000 intermediate strings.",
        level: "basic",
        codeExample: "// Bad\nString s = \"\";\nfor(int i=0;i<10000;i++) s += i;"
    },
    {
        question: "How does the compiler optimize the + operator?",
        shortAnswer: "It replaces simple concatenations with a single StringBuilder or with StringConcatFactory (Java 9+).",
        explanation: "For constant expressions (e.g., 'a' + 'b' + 'c'), it folds at compile time. For non-constants, it uses invokedynamic or StringBuilder.",
        hint: "You don't need to manually use StringBuilder for a few strings.",
        level: "expert",
        codeExample: "// Compiles to single string: \"abc\"\nString s = \"a\" + \"b\" + \"c\";"
    },
    {
        question: "What is the return type of concat()?",
        shortAnswer: "String (a new string).",
        explanation: "concat() returns a new String object; original unchanged.",
        hint: "Like all String methods, it returns a new string.",
        level: "basic",
        codeExample: "String result = \"Hello\".concat(\" World\");"
    },
    {
        question: "Can concat() handle null?",
        shortAnswer: "No, it throws NullPointerException.",
        explanation: "If you call concat(null), you get NPE. Use + which handles null by converting to \"null\".",
        hint: "+ is more null-friendly.",
        level: "basic",
        codeExample: "String s = \"Hi\";\ns.concat(null); // NPE"
    },
    {
        question: "What is the purpose of String.join()?",
        shortAnswer: "To join multiple strings with a delimiter.",
        explanation: "Convenient for creating CSV, paths, or any delimited list. Handles null elements gracefully.",
        hint: "Introduced in Java 8.",
        level: "intermediate",
        codeExample: "String joined = String.join(\", \", \"apple\", \"banana\", \"cherry\");"
    },
    {
        question: "How to concatenate many strings with a separator efficiently?",
        shortAnswer: "Use StringBuilder with a loop, or String.join() for collections.",
        explanation: "StringBuilder.append() is efficient. For arrays/iterables, String.join() is cleaner.",
        hint: "Avoid manual separator handling with if statements.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder();\nfor(String s : list) sb.append(s).append(\", \");\nString result = sb.toString();"
    },
    {
        question: "What is the difference between String.format() and concatenation?",
        shortAnswer: "format() uses placeholders; more readable for complex messages, but slightly slower.",
        explanation: "format() is great for logs, error messages with multiple variables. It's clearer than many + operators.",
        hint: "Use format() when you have 3+ variables.",
        level: "intermediate",
        codeExample: "String msg = String.format(\"Student %s from %s scored %d\", name, city, score);"
    },
    {
        question: "What is the default capacity of StringBuilder?",
        shortAnswer: "16 characters.",
        explanation: "When you create new StringBuilder(), it allocates an internal char array of size 16. It grows as needed.",
        hint: "Pre-size if you know the final length to avoid resizing.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder(1000); // pre-sized"
    },
    {
        question: "How to convert StringBuilder to String?",
        shortAnswer: "Using toString() method.",
        explanation: "toString() returns a new String object containing the characters from the StringBuilder.",
        hint: "Don't forget this step.",
        level: "basic",
        codeExample: "String result = sb.toString();"
    },
    {
        question: "Is String.concat() faster than + for two strings?",
        shortAnswer: "Slightly, because it avoids StringBuilder overhead.",
        explanation: "For exactly two strings, concat() creates a new char array of the right size and copies directly. + may create a StringBuilder.",
        hint: "But the difference is negligible; readability matters more.",
        level: "advanced",
        codeExample: "// concat can be a tiny bit faster\nString s = a.concat(b);"
    },
    {
        question: "What happens when you use + with a non-string?",
        shortAnswer: "Java converts the non-string to string using String.valueOf().",
        explanation: "For primitives, it's automatic. For objects, toString() is called. If the object is null, \"null\" is used.",
        hint: "Convenient but be aware of null behavior.",
        level: "basic",
        codeExample: "String s = \"Value: \" + 123; // \"Value: 123\""
    },
    {
        question: "How to efficiently concatenate strings from a list?",
        shortAnswer: "Use String.join() or StringBuilder.",
        explanation: "String.join(delimiter, list) is simplest. For custom logic, use StringBuilder loop.",
        hint: "Java 8+ streams: list.stream().collect(Collectors.joining(delimiter)).",
        level: "intermediate",
        codeExample: "String result = String.join(\", \", list);\n// or using streams\nString result = list.stream().collect(Collectors.joining(\", \"));"
    },
    {
        question: "Why is StringBuilder mutable?",
        shortAnswer: "So you can modify the same object without creating new ones, improving performance.",
        explanation: "StringBuilder's append(), insert(), delete() change the internal char array instead of creating new objects.",
        hint: "That's why it's efficient for loops.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(\"Hi\");\nsb.append(\"!\"); // same object"
    },
    {
        question: "What is the time complexity of StringBuilder.append()?",
        shortAnswer: "Amortized O(1) per append (occasional O(n) when resizing).",
        explanation: "Appending is usually constant time. When internal array is full, it doubles in size (copying all characters), which is O(n) but rare.",
        hint: "Pre-sizing reduces resizing overhead.",
        level: "advanced",
        codeExample: "// Pre-size to avoid resizes\nnew StringBuilder(estimatedLength);"
    },
    {
        question: "Can you chain StringBuilder methods?",
        shortAnswer: "Yes, because append() returns the same StringBuilder instance.",
        explanation: "Method chaining allows fluent style: sb.append(\"a\").append(\"b\").append(\"c\");",
        hint: "Improves readability.",
        level: "basic",
        codeExample: "sb.append(\"Hello\").append(\" \").append(\"World\");"
    },
    {
        question: "What is the difference between StringBuilder and String?",
        shortAnswer: "String is immutable; StringBuilder is mutable.",
        explanation: "String creates new object for each change; StringBuilder modifies in place.",
        hint: "Use StringBuilder for building strings dynamically.",
        level: "basic",
        codeExample: "String s = \"a\"; s += \"b\"; // new object\nStringBuilder sb = new StringBuilder(\"a\"); sb.append(\"b\"); // same object"
    },
    {
        question: "How to concatenate a char to a string?",
        shortAnswer: "Using + operator or StringBuilder.append().",
        explanation: "char is automatically promoted to String when using +. Or sb.append('c').",
        hint: "Both work fine.",
        level: "basic",
        codeExample: "String s = \"Hello\" + '!';\nStringBuilder sb = new StringBuilder(\"Hello\").append('!');"
    },
    {
        question: "What is the performance impact of using StringBuffer vs StringBuilder?",
        shortAnswer: "StringBuffer is slower due to synchronization overhead (2-3x slower in benchmarks).",
        explanation: "Each method in StringBuffer is synchronized. In single-threaded code, this is unnecessary overhead.",
        hint: "Never use StringBuffer unless you need thread-safety.",
        level: "intermediate",
        codeExample: "// Use StringBuilder unless shared across threads"
    },
    {
        question: "What is string concatenation via '+' compiled to in Java 9+?",
        shortAnswer: "invokedynamic with StringConcatFactory (not always StringBuilder).",
        explanation: "Java 9 introduced a more flexible approach using invokedynamic, which can choose optimal strategies at runtime.",
        hint: "Still, avoid + in loops.",
        level: "expert",
        codeExample: "// Under the hood is more sophisticated now"
    },
    {
        question: "How to repeat a string multiple times efficiently?",
        shortAnswer: "Use repeat() (Java 11+) or StringBuilder with a loop.",
        explanation: "repeat(n) is built-in and efficient. For older Java, use StringBuilder with append in a loop.",
        hint: "repeat() is the best.",
        level: "intermediate",
        codeExample: "String repeated = \"abc\".repeat(5); // Java 11+\n// or\nStringBuilder sb = new StringBuilder(); for(int i=0;i<5;i++) sb.append(\"abc\");"
    },
    {
        question: "What is the output of: String s = null; s = s + \"test\";?",
        shortAnswer: "\"nulltest\"",
        explanation: "When using + with null, it is converted to the string \"null\" before concatenation.",
        hint: "Be careful: this may not be what you expect.",
        level: "intermediate",
        codeExample: "String s = null;\nSystem.out.println(s + \"test\"); // \"nulltest\""
    },
    {
        question: "Can you use += with StringBuilder?",
        shortAnswer: "No, StringBuilder doesn't support +=. Use append().",
        explanation: "+= is defined for String, not for StringBuilder.",
        hint: "Remember: StringBuilder is not a String.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder();\nsb += \"text\"; // compile error"
    },
    {
        question: "How to efficiently build a string with conditional parts?",
        shortAnswer: "Use StringBuilder and append conditionally.",
        explanation: "Avoid creating intermediate strings with if-else inside concatenation. Just append inside conditions.",
        hint: "StringBuilder allows building piece by piece.",
        level: "intermediate",
        codeExample: "StringBuilder sb = new StringBuilder();\nif(includeName) sb.append(name);\nif(includeCity) sb.append(\", \").append(city);"
    },
    {
        question: "What is the capacity method in StringBuilder?",
        shortAnswer: "Returns the current capacity (size of internal array).",
        explanation: "Capacity is not the length; it's how many characters can be stored without resizing.",
        hint: "Useful for debugging performance.",
        level: "advanced",
        codeExample: "StringBuilder sb = new StringBuilder();\nSystem.out.println(sb.capacity()); // 16"
    },
    {
        question: "Is String.join() efficient for large lists?",
        shortAnswer: "Yes, it uses StringBuilder internally.",
        explanation: "String.join() is implemented with StringBuilder, so it's as efficient as manual StringBuilder code.",
        hint: "Prefer join() for readability.",
        level: "intermediate",
        codeExample: "// join is efficient\nString result = String.join(\", \", largeList);"
    },
    {
        question: "How to concatenate strings with a newline?",
        shortAnswer: "Use System.lineSeparator() or \"\\n\" with StringBuilder.",
        explanation: "Platform-independent: System.lineSeparator(). Or use %n in String.format().",
        hint: "Avoid hardcoding \\n unless you know the platform.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder();\nsb.append(\"line1\").append(System.lineSeparator()).append(\"line2\");"
    },
    {
        question: "What is the difference between concat() and + when one operand is null?",
        shortAnswer: "+ handles null (converts to \"null\"); concat() throws NPE.",
        explanation: "Be cautious: using + with null may produce \"null\" unexpectedly. Always check for null if that's not desired.",
        hint: "Prefer explicit null checks.",
        level: "intermediate",
        codeExample: "String s = null;\nString a = s + \"text\"; // \"nulltext\"\nString b = s.concat(\"text\"); // NPE"
    }
];

export default questions;