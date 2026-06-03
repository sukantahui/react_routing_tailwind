// topic3_files/topic3_questions.js
const questions = [
    {
        question: "What does the length() method return?",
        shortAnswer: "The number of characters in the string.",
        explanation: "length() returns an int. For empty string, returns 0. Note: it's a method, not a property (unlike arrays).",
        hint: "Try 'Java'.length() -> 4",
        level: "basic",
        codeExample: "String s = \"Swadeep\";\nint len = s.length(); // 7"
    },
    {
        question: "How do you get the first character of a string?",
        shortAnswer: "Using charAt(0).",
        explanation: "charAt(index) returns the character at the given index (0-based). Valid indices: 0 to length()-1.",
        hint: "First index is 0.",
        level: "basic",
        codeExample: "String name = \"Tuhina\";\nchar first = name.charAt(0); // 'T'"
    },
    {
        question: "What is the difference between equals() and compareTo()?",
        shortAnswer: "equals() returns boolean (true/false); compareTo() returns int (negative, zero, positive) for ordering.",
        explanation: "equals checks equality; compareTo gives lexicographic ordering, useful for sorting.",
        hint: "compareTo is like a three-way comparison.",
        level: "intermediate",
        codeExample: "String a = \"apple\";\nString b = \"banana\";\nSystem.out.println(a.compareTo(b)); // negative"
    },
    {
        question: "What does substring(2,5) return on 'Hello World'?",
        shortAnswer: "'llo' (characters at indices 2,3,4).",
        explanation: "substring(beginIndex, endIndex) returns characters from beginIndex (inclusive) to endIndex (exclusive).",
        hint: "Remember: endIndex is exclusive.",
        level: "basic",
        codeExample: "String s = \"Hello World\";\nString sub = s.substring(2,5); // \"llo\""
    },
    {
        question: "How to convert a string to lowercase?",
        shortAnswer: "Using toLowerCase() method.",
        explanation: "Returns a new string with all characters converted to lowercase. Original unchanged.",
        hint: "Example: 'JAVA'.toLowerCase() -> 'java'",
        level: "basic",
        codeExample: "String lang = \"JAVA\";\nString lower = lang.toLowerCase();"
    },
    {
        question: "What does trim() do?",
        shortAnswer: "Removes leading and trailing whitespace (spaces, tabs, newlines).",
        explanation: "Returns a new string. Does not remove spaces in the middle.",
        hint: "Useful for cleaning user input.",
        level: "basic",
        codeExample: "String input = \"  Abhronila  \";\nString cleaned = input.trim(); // \"Abhronila\""
    },
    {
        question: "How do you replace all 'a' with 'o' in a string?",
        shortAnswer: "Using replace('a', 'o') or replace(\"a\", \"o\").",
        explanation: "replace(char old, char new) replaces all occurrences. For strings, use replace(CharSequence target, CharSequence replacement).",
        hint: "replace() replaces all, not just first.",
        level: "basic",
        codeExample: "String s = \"banana\";\nString r = s.replace('a', 'o'); // \"bonono\""
    },
    {
        question: "What is the difference between replace() and replaceAll()?",
        shortAnswer: "replace() replaces literal characters/substrings; replaceAll() uses regex.",
        explanation: "replaceAll(String regex, String replacement) treats the first argument as a regular expression. For simple literal replacement, replace() is simpler and faster.",
        hint: "If you need regex (like \\d+), use replaceAll.",
        level: "intermediate",
        codeExample: "String s = \"abc123\";\ns.replaceAll(\"\\\\d+\", \"#\"); // \"abc#\""
    },
    {
        question: "What does contains() check?",
        shortAnswer: "Whether the string contains a given sequence of characters.",
        explanation: "Returns boolean. Useful for searching substrings. Case-sensitive.",
        hint: "Equivalent to indexOf(s) != -1 but more readable.",
        level: "basic",
        codeExample: "String s = \"Barrackpore\";\nboolean has = s.contains(\"rack\"); // true"
    },
    {
        question: "How to check if a string starts with a prefix?",
        shortAnswer: "Using startsWith(String prefix).",
        explanation: "Returns true if the string begins with the specified prefix.",
        hint: "Also has overload with offset: startsWith(prefix, offset).",
        level: "basic",
        codeExample: "String city = \"Shyamnagar\";\ncity.startsWith(\"Shy\"); // true"
    },
    {
        question: "What is the return type of indexOf()?",
        shortAnswer: "int – the index of the first occurrence, or -1 if not found.",
        explanation: "indexOf(String s) returns the starting index. Use lastIndexOf() for last occurrence.",
        hint: "Returns -1 when not found.",
        level: "basic",
        codeExample: "String s = \"Ichapur\";\nint idx = s.indexOf(\"cha\"); // 2"
    },
    {
        question: "How to split a comma-separated string?",
        shortAnswer: "Using split(\",\").",
        explanation: "split(regex) returns a String[]. Be careful with regex special characters (like . |).",
        hint: "For CSV, split(\",\") works for simple cases.",
        level: "intermediate",
        codeExample: "String data = \"apple,banana,grape\";\nString[] fruits = data.split(\",\");"
    },
    {
        question: "What is the difference between isEmpty() and isBlank()?",
        shortAnswer: "isEmpty() true only if length == 0; isBlank() true if empty or only whitespace.",
        explanation: "isBlank() (Java 11+) is more forgiving for user input validation.",
        hint: "'   '.isEmpty() -> false; '   '.isBlank() -> true",
        level: "intermediate",
        codeExample: "String s = \"   \";\nSystem.out.println(s.isBlank()); // true"
    },
    {
        question: "Can you chain string methods?",
        shortAnswer: "Yes, because each transformation method returns a new String.",
        explanation: "Example: s.trim().toLowerCase().replace(\" \", \"-\") is valid and efficient.",
        hint: "Chaining improves readability.",
        level: "basic",
        codeExample: "String result = \" Hello World \".trim().toUpperCase(); // \"HELLO WORLD\""
    },
    {
        question: "What exception does charAt() throw for invalid index?",
        shortAnswer: "StringIndexOutOfBoundsException.",
        explanation: "Thrown if index < 0 or index >= length().",
        hint: "Always check index < length().",
        level: "basic",
        codeExample: "String s = \"Hi\";\ns.charAt(2); // exception"
    },
    {
        question: "How to compare strings ignoring case?",
        shortAnswer: "Using equalsIgnoreCase() or compareToIgnoreCase().",
        explanation: "Both ignore case differences for comparison.",
        hint: "Useful for usernames or emails.",
        level: "basic",
        codeExample: "String a = \"Java\";\nString b = \"JAVA\";\na.equalsIgnoreCase(b); // true"
    },
    {
        question: "What does substring(3) on 'abcdef' return?",
        shortAnswer: "'def' (from index 3 to end).",
        explanation: "substring(beginIndex) returns from beginIndex to the end of the string.",
        hint: "No need to specify end index.",
        level: "basic",
        codeExample: "String s = \"abcdef\";\nString sub = s.substring(3); // \"def\""
    },
    {
        question: "How to get a character array from a string?",
        shortAnswer: "Using toCharArray() method.",
        explanation: "Returns a new char[] containing the characters of the string.",
        hint: "Useful when you need to modify individual characters.",
        level: "basic",
        codeExample: "String s = \"Naihati\";\nchar[] chars = s.toCharArray();"
    },
    {
        question: "What is the result of 'abc'.compareTo('abd')?",
        shortAnswer: "Negative (specifically -1, but depends on implementation).",
        explanation: "Compare lexicographically: 'c' vs 'd' -> 'c' is less, so negative.",
        hint: "Returns 0 if equal, <0 if first < second, >0 if first > second.",
        level: "intermediate",
        codeExample: "int cmp = \"abc\".compareTo(\"abd\"); // negative"
    },
    {
        question: "How to check if a string contains only whitespace?",
        shortAnswer: "Using isBlank() (Java 11+) or trim().isEmpty() in older Java.",
        explanation: "isBlank() returns true for empty or whitespace-only strings.",
        hint: "isBlank() is the cleanest.",
        level: "intermediate",
        codeExample: "boolean onlySpaces = \"   \".isBlank(); // true"
    },
    {
        question: "What does replaceAll(\"\\\\s+\", \" \") do?",
        shortAnswer: "Replaces multiple whitespace characters with a single space.",
        explanation: "\\\\s+ matches one or more whitespace characters. Useful for normalizing spaces.",
        hint: "Remember to escape backslash in regex.",
        level: "expert",
        codeExample: "String s = \"Hello    world\";\ns.replaceAll(\"\\\\s+\", \" \"); // \"Hello world\""
    },
    {
        question: "Can substring() cause memory leaks?",
        shortAnswer: "In modern Java (7u6+), no – substring creates a new char array copy.",
        explanation: "Older Java versions shared backing array, but now it's a copy, so no memory leak.",
        hint: "No need to worry anymore.",
        level: "expert",
        codeExample: "// Safe in modern Java"
    },
    {
        question: "What is the difference between concat() and + operator?",
        shortAnswer: "concat() only accepts String arguments; + can handle any type (converted to string).",
        explanation: "Both create new strings. + is more convenient and often optimized by compiler.",
        hint: "Use + for readability.",
        level: "basic",
        codeExample: "String s = \"Hello \".concat(\"World\");\nString t = \"Hello \" + \"World\";"
    },
    {
        question: "How to repeat a string n times?",
        shortAnswer: "Using repeat(n) (Java 11+).",
        explanation: "repeat(int count) returns a string concatenated count times.",
        hint: "Useful for padding or generating patterns.",
        level: "intermediate",
        codeExample: "String stars = \"*\".repeat(5); // \"*****\""
    },
    {
        question: "What is the purpose of strip() vs trim()?",
        shortAnswer: "strip() (Java 11+) removes Unicode whitespace; trim() removes ASCII whitespace (<= U+0020).",
        explanation: "strip() is Unicode-aware and generally preferred.",
        hint: "Use strip() for modern code.",
        level: "expert",
        codeExample: "String s = \"\\u2000Hello\\u2000\";\ns.trim().length(); // different from s.strip().length()"
    },
    {
        question: "How to check if a string is empty?",
        shortAnswer: "Using isEmpty() or checking length() == 0.",
        explanation: "isEmpty() is more readable and performs the same.",
        hint: "Don't use equals(\"\") – it's less efficient.",
        level: "basic",
        codeExample: "if (str.isEmpty()) { /* handle empty */ }"
    },
    {
        question: "What does indexOf('a', 3) do?",
        shortAnswer: "Searches for 'a' starting from index 3.",
        explanation: "The second parameter is the starting index (inclusive).",
        hint: "Useful for finding subsequent occurrences.",
        level: "intermediate",
        codeExample: "String s = \"banana\";\nint idx = s.indexOf('a', 2); // 3"
    },
    {
        question: "What is the output of 'Hello'.substring(0,5)?",
        shortAnswer: "'Hello' (indices 0-4).",
        explanation: "endIndex (5) is exclusive, so it's valid.",
        hint: "substring(0, length()) returns the whole string.",
        level: "basic",
        codeExample: "String s = \"Hello\";\ns.substring(0,5); // \"Hello\""
    },
    {
        question: "How to convert a string to title case?",
        shortAnswer: "Java doesn't have a built-in method; you can split, capitalize first letter, and join.",
        explanation: "Example: Character.toUpperCase(str.charAt(0)) + str.substring(1).toLowerCase() for first word.",
        hint: "Use Apache Commons WordUtils.capitalize() for full support.",
        level: "intermediate",
        codeExample: "String name = \"swadeep\";\nString title = Character.toUpperCase(name.charAt(0)) + name.substring(1);"
    },
    {
        question: "What is the time complexity of length()?",
        shortAnswer: "O(1) – constant time.",
        explanation: "String caches the length as a field, so retrieval is instant.",
        hint: "No performance penalty.",
        level: "intermediate",
        codeExample: "// length is cached internally"
    }
];

export default questions;