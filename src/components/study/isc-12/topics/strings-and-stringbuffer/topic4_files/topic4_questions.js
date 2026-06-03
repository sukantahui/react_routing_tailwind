// topic4_files/topic4_questions.js
const questions = [
    {
        question: "What is the difference between == and .equals() for Strings?",
        shortAnswer: "== compares references (memory addresses); .equals() compares content (characters).",
        explanation: "== checks if both variables point to the exact same object. .equals() checks if the strings have the same sequence of characters.",
        hint: "Think: same person vs same name.",
        level: "basic",
        codeExample: "String a = new String(\"Hi\");\nString b = new String(\"Hi\");\na == b → false\na.equals(b) → true"
    },
    {
        question: "Why does == sometimes return true for strings with same content?",
        shortAnswer: "Because string literals are stored in the String Pool and reused.",
        explanation: "When you use literals, Java reuses the same object. So == returns true because they are the same object, not just same content.",
        hint: "Example: String a = 'Hi'; String b = 'Hi'; a == b → true",
        level: "intermediate",
        codeExample: "String x = \"Hello\";\nString y = \"Hello\";\nSystem.out.println(x == y); // true (same object)"
    },
    {
        question: "What is the correct way to compare string content?",
        shortAnswer: "Use the .equals() method.",
        explanation: "equals() compares the actual characters. Always use it for logical string comparison.",
        hint: "Never use == for content.",
        level: "basic",
        codeExample: "if (str1.equals(str2)) { /* same content */ }"
    },
    {
        question: "What happens if you call .equals() on a null reference?",
        shortAnswer: "NullPointerException.",
        explanation: "If the variable on which you call equals is null, you get an exception.",
        hint: "Place constant first: 'value'.equals(variable).",
        level: "basic",
        codeExample: "String s = null;\ns.equals(\"test\"); // NPE"
    },
    {
        question: "How to avoid NullPointerException when comparing strings?",
        shortAnswer: "Put the known non-null string first or use Objects.equals().",
        explanation: "Examples: 'constant'.equals(variable) or Objects.equals(variable1, variable2).",
        hint: "Yoda condition: 'literal'.equals(var).",
        level: "intermediate",
        codeExample: "if (\"yes\".equals(userInput)) { ... }"
    },
    {
        question: "What is the output: String s1 = new String('java'); String s2 = new String('java'); System.out.println(s1 == s2);",
        shortAnswer: "false",
        explanation: "Both are created with new, so they are different objects on the heap. == compares references, so false.",
        hint: "Different objects → false for ==.",
        level: "basic",
        codeExample: "// false"
    },
    {
        question: "What is the output: String s1 = 'java'; String s2 = 'java'; System.out.println(s1 == s2);",
        shortAnswer: "true",
        explanation: "Both are literals, so they refer to the same object in the String Pool.",
        hint: "Pooled literals → same object.",
        level: "basic",
        codeExample: "// true"
    },
    {
        question: "What does equalsIgnoreCase() do?",
        shortAnswer: "Compares content ignoring case differences.",
        explanation: "Returns true if strings are equal regardless of case (e.g., 'Java' and 'JAVA').",
        hint: "Useful for case-insensitive validation.",
        level: "basic",
        codeExample: "'Hello'.equalsIgnoreCase('HELLO') → true"
    },
    {
        question: "Is it safe to use == for string comparison in any scenario?",
        shortAnswer: "Only if you are certain both strings are interned (e.g., literals or interned). But it's still bad practice.",
        explanation: "Code may change; future modifications may introduce non-interned strings, causing bugs.",
        hint: "Never rely on == for logic.",
        level: "intermediate",
        codeExample: "// Avoid this pattern"
    },
    {
        question: "What is the purpose of Objects.equals()?",
        shortAnswer: "Null-safe equality check for any two objects, including strings.",
        explanation: "Returns true if both are null or both are equal via .equals(). Handles null gracefully.",
        hint: "Introduced in Java 7.",
        level: "intermediate",
        codeExample: "Objects.equals(s1, s2) // no NPE"
    },
    {
        question: "Can you compare a string with a non-string using equals?",
        shortAnswer: "Yes, but it will return false if the other object is not a String.",
        explanation: "equals() returns false for non-String arguments (no exception).",
        hint: "No ClassCastException.",
        level: "basic",
        codeExample: "String s = \"123\";\ns.equals(123); // false"
    },
    {
        question: "What is the output: String s = null; System.out.println('test'.equals(s));",
        shortAnswer: "false",
        explanation: "Calling equals on 'test' with null argument returns false (no NPE).",
        hint: "Literal-first prevents NPE.",
        level: "basic",
        codeExample: "// false, not exception"
    },
    {
        question: "What is the output: String s = null; System.out.println(s.equals('test'));",
        shortAnswer: "NullPointerException",
        explanation: "Calling equals on a null reference causes exception.",
        hint: "Never call methods on null.",
        level: "basic",
        codeExample: "// throws NPE"
    },
    {
        question: "How does compareTo() relate to equals()?",
        shortAnswer: "compareTo() returns 0 exactly when equals() returns true (for Strings).",
        explanation: "Lexicographic ordering: compareTo returns 0 if strings are equal. But compareTo is for sorting, not equality checks.",
        hint: "Use equals for equality, compareTo for ordering.",
        level: "intermediate",
        codeExample: "if (s1.compareTo(s2) == 0) // equivalent to equals"
    },
    {
        question: "What is string interning and how does it affect ==?",
        shortAnswer: "Interning adds a string to the String Pool, making == work across different creation methods.",
        explanation: "intern() returns a pooled reference. After interning, == may return true for equal content.",
        hint: "But still, use equals().",
        level: "expert",
        codeExample: "String a = new String(\"test\");\nString b = a.intern();\nString c = \"test\";\nb == c → true"
    },
    {
        question: "Why is string comparison with == considered a beginner mistake?",
        shortAnswer: "Because beginners often think == compares content, which works for primitives but not for objects.",
        explanation: "For primitives (int, char) == compares values. For objects, it compares references. This mismatch causes bugs.",
        hint: "Java is not JavaScript.",
        level: "basic",
        codeExample: "int x = 5; int y = 5; x == y → true (primitives)\nString a = new String(\"5\"); String b = new String(\"5\"); a == b → false (objects)"
    },
    {
        question: "What is the output of: 'Hello'.equals(new String('Hello'))?",
        shortAnswer: "true",
        explanation: "equals compares content, so true even though the new String is a different object.",
        hint: "Content is the same.",
        level: "basic",
        codeExample: "// true"
    },
    {
        question: "How to compare two strings case-insensitively?",
        shortAnswer: "Use equalsIgnoreCase().",
        explanation: "Alternatively, convert both to same case and use equals, but equalsIgnoreCase is more efficient.",
        hint: "Avoid manual case conversion.",
        level: "basic",
        codeExample: "if (s1.equalsIgnoreCase(s2)) { ... }"
    },
    {
        question: "Can == ever return true for strings created with new?",
        shortAnswer: "Yes, if they are the same object (e.g., String a = new String('x'); String b = a;).",
        explanation: "If both variables reference the exact same object, == returns true regardless of how it was created.",
        hint: "Same reference, not same content.",
        level: "intermediate",
        codeExample: "String a = new String(\"Hi\");\nString b = a;\na == b → true"
    },
    {
        question: "What is the performance difference between == and .equals()?",
        shortAnswer: "== is slightly faster (just reference compare), but the difference is negligible for most applications.",
        explanation: "equals() must compare characters, which is O(n) in worst case. But clarity is more important than micro-optimization.",
        hint: "Don't sacrifice correctness for speed.",
        level: "intermediate",
        codeExample: "// Use equals() unless you have a specific reason"
    },
    {
        question: "What is the output: String s1 = 'abc'; String s2 = s1 + ''; System.out.println(s1 == s2);",
        shortAnswer: "false (in most cases)",
        explanation: "Concatenation creates a new String object even if result is same as literal, unless optimized at compile time.",
        hint: "Runtime concatenation produces new object.",
        level: "advanced",
        codeExample: "// false (different objects)"
    },
    {
        question: "How does the JVM handle string comparison in switch statements?",
        shortAnswer: "Switch on strings uses .equals() internally, not ==.",
        explanation: "The switch statement uses the string's hashCode() and then .equals() to resolve cases.",
        hint: "Safe to use switch on strings.",
        level: "expert",
        codeExample: "switch(day) { case \"MON\": ... } // uses equals"
    },
    {
        question: "What is the difference between equals() and contentEquals()?",
        shortAnswer: "contentEquals() can compare String with CharSequence (e.g., StringBuilder).",
        explanation: "equals() only works with String; contentEquals() works with any CharSequence.",
        hint: "Rarely needed.",
        level: "expert",
        codeExample: "String s = \"abc\";\nStringBuilder sb = new StringBuilder(\"abc\");\ns.contentEquals(sb) → true"
    },
    {
        question: "Why does Java not override == for strings?",
        shortAnswer: "Because == is an operator that cannot be overloaded in Java. It always means reference equality.",
        explanation: "Unlike some languages, Java doesn't allow operator overloading. == is fixed to compare references for objects.",
        hint: "Design choice for simplicity.",
        level: "expert",
        codeExample: "// No way to change == behavior"
    },
    {
        question: "What is the output: String s1 = 'java'; String s2 = 'java'.trim(); System.out.println(s1 == s2);",
        shortAnswer: "true (in most JVMs)",
        explanation: "trim() on a string with no whitespace returns the same string (optimization).",
        hint: "Some methods return the original if no change.",
        level: "advanced",
        codeExample: "// true because no change"
    },
    {
        question: "How to compare strings for equality in a null-safe way without Objects.equals?",
        shortAnswer: "Use constant-first pattern: 'value'.equals(variable).",
        explanation: "If variable is null, equals on constant returns false, no exception.",
        hint: "Yoda condition.",
        level: "intermediate",
        codeExample: "if (\"YES\".equals(input)) { ... }"
    },
    {
        question: "What happens if you compare a string with a null using ==?",
        shortAnswer: "No exception; returns false if one is null and the other isn't; true if both null.",
        explanation: "== works with null references without throwing NPE.",
        hint: "But still, don't use == for content.",
        level: "basic",
        codeExample: "String s = null;\ns == \"test\" → false\ns == null → true"
    },
    {
        question: "What is the best practice for comparing strings from user input?",
        shortAnswer: "Normalize (trim, toLowerCase) then use equals or equalsIgnoreCase.",
        explanation: "User input may have extra spaces or inconsistent case. Clean it first.",
        hint: "Also handle null if input is optional.",
        level: "intermediate",
        codeExample: "String cleaned = input.trim().toLowerCase();\nif (cleaned.equals(\"yes\")) { ... }"
    },
    {
        question: "What is the output: 'A' == 'A'?",
        shortAnswer: "true (but that's char comparison, not String)",
        explanation: "Single quotes denote char primitives, so == compares values, which is correct for chars.",
        hint: "Don't confuse char with String.",
        level: "basic",
        codeExample: "char c1 = 'A';\nchar c2 = 'A';\nc1 == c2 → true"
    },
    {
        question: "Can you use == to compare strings returned from a database?",
        shortAnswer: "No, always use .equals(). Database strings are typically new objects, not interned.",
        explanation: "JDBC returns new String objects for each row. == would almost always be false even for equal content.",
        hint: "Never assume pooling from external sources.",
        level: "intermediate",
        codeExample: "ResultSet rs = stmt.executeQuery();\nString name = rs.getString(\"name\");\nif (name.equals(\"John\")) { ... } // correct"
    }
];

export default questions;