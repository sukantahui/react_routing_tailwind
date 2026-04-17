// topic9_files/topic9_questions.js
const questions = [
    {
        question: "What does the append() method do in StringBuffer?",
        shortAnswer: "Adds data to the end of the buffer.",
        explanation: "append() is overloaded for all primitive types, String, char[], and Object. It returns the same StringBuffer for chaining.",
        hint: "It modifies the existing buffer.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(\"Hello\"); sb.append(\" World\"); // \"Hello World\""
    },
    {
        question: "How to insert text at a specific position in StringBuffer?",
        shortAnswer: "Using insert(int offset, data).",
        explanation: "Inserts data at the specified offset; existing characters shift right.",
        hint: "Offset must be between 0 and length().",
        level: "basic",
        codeExample: "sb.insert(5, \" beautiful \");"
    },
    {
        question: "What is the difference between delete() and deleteCharAt()?",
        shortAnswer: "delete() removes a range; deleteCharAt() removes a single character.",
        explanation: "delete(start,end) removes indices start to end-1. deleteCharAt(index) removes one character.",
        hint: "Use deleteCharAt for single index.",
        level: "basic",
        codeExample: "sb.delete(2,5); sb.deleteCharAt(0);"
    },
    {
        question: "What does reverse() do to a StringBuffer?",
        shortAnswer: "Reverses the character sequence in place.",
        explanation: "The buffer itself is modified; no new object is created.",
        hint: "Useful for palindromes.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(\"abc\"); sb.reverse(); // \"cba\""
    },
    {
        question: "What is the difference between length() and capacity()?",
        shortAnswer: "length() is number of characters used; capacity() is size of internal array.",
        explanation: "length ≤ capacity always. Capacity grows automatically when needed.",
        hint: "Pre‑sizing capacity avoids resizing.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(50); // capacity 50, length 0"
    },
    {
        question: "How to increase the capacity of a StringBuffer?",
        shortAnswer: "Using ensureCapacity(int minCapacity).",
        explanation: "If current capacity is less than minCapacity, it increases capacity (usually doubled plus some).",
        hint: "Call before many appends to avoid repeated resizing.",
        level: "intermediate",
        codeExample: "sb.ensureCapacity(1000);"
    },
    {
        question: "Can we set the length of a StringBuffer manually?",
        shortAnswer: "Yes, using setLength(int newLength).",
        explanation: "If newLength < current length, truncates; if greater, pads with null characters ('\\0').",
        hint: "Use setLength(0) to clear the buffer.",
        level: "intermediate",
        codeExample: "sb.setLength(5); // keeps first 5 chars"
    },
    {
        question: "What is the return type of append()?",
        shortAnswer: "StringBuffer (the same object).",
        explanation: "Returning this allows method chaining.",
        hint: "That's why you can write sb.append(\"a\").append(\"b\").",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer().append(\"Hello\").append(\" World\");"
    },
    {
        question: "What happens if you append null to a StringBuffer?",
        shortAnswer: "It appends the string \"null\".",
        explanation: "append(null) calls String.valueOf(null) which returns \"null\".",
        hint: "Be careful: you might get literal \"null\" in your output.",
        level: "intermediate",
        codeExample: "sb.append(null); // sb becomes \"null\""
    },
    {
        question: "What exception does insert() throw for invalid offset?",
        shortAnswer: "StringIndexOutOfBoundsException.",
        explanation: "If offset < 0 or offset > length(), exception is thrown.",
        hint: "Valid range: 0 to length() inclusive.",
        level: "basic",
        codeExample: "sb.insert(100, \"x\"); // exception if length < 100"
    },
    {
        question: "How to replace a portion of a StringBuffer?",
        shortAnswer: "Using replace(int start, int end, String str).",
        explanation: "Replaces characters from start (inclusive) to end (exclusive) with the given string.",
        hint: "The replacement can be of different length.",
        level: "intermediate",
        codeExample: "sb.replace(0, 5, \"Hello\");"
    },
    {
        question: "What is the effect of reverse() on an empty buffer?",
        shortAnswer: "Nothing; buffer remains empty.",
        explanation: "Reverse on empty or single‑character buffer has no effect.",
        hint: "No error.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(); sb.reverse(); // still empty"
    },
    {
        question: "Can we use append() with integer?",
        shortAnswer: "Yes, append(int i) converts the integer to string and appends.",
        explanation: "All primitive types are supported.",
        hint: "No need to convert manually.",
        level: "basic",
        codeExample: "sb.append(123); // appends \"123\""
    },
    {
        question: "How to get a substring from a StringBuffer?",
        shortAnswer: "Use substring(int start) or substring(int start, int end).",
        explanation: "Returns a new String (immutable), not a StringBuffer.",
        hint: "Does not modify the buffer.",
        level: "basic",
        codeExample: "String sub = sb.substring(2, 5);"
    },
    {
        question: "What is the default capacity of a StringBuffer created with new StringBuffer()?",
        shortAnswer: "16 characters.",
        explanation: "The no‑arg constructor allocates an internal char array of size 16.",
        hint: "Capacity grows automatically.",
        level: "basic",
        codeExample: "StringBuffer sb = new StringBuffer(); // capacity 16"
    },
    {
        question: "How to clear a StringBuffer efficiently?",
        shortAnswer: "sb.setLength(0);",
        explanation: "Resets length to 0; the internal array is reused, avoiding new allocation.",
        hint: "Better than sb = new StringBuffer();",
        level: "intermediate",
        codeExample: "sb.setLength(0);"
    },
    {
        question: "What is the output: sb.append(\"Hello\").insert(5, \" \").reverse(); if sb starts empty?",
        shortAnswer: "\"olleH \" (note trailing space after reversal)",
        explanation: "Steps: \"Hello\" → insert space at index 5 → \"Hello \" → reverse → \" olleH\".",
        hint: "Reverse flips everything including spaces.",
        level: "intermediate",
        codeExample: "// Output: \" olleH\" (space then olleH)"
    },
    {
        question: "Can we chain delete() and append()?",
        shortAnswer: "Yes, because delete() returns the StringBuffer itself.",
        explanation: "All methods that return StringBuffer support chaining.",
        hint: "sb.delete(0,2).append(\"Hi\");",
        level: "basic",
        codeExample: "sb.delete(2,5).append(\"abc\").reverse();"
    },
    {
        question: "What is the time complexity of append() on average?",
        shortAnswer: "Amortized O(1).",
        explanation: "Most appends are constant time; occasional resizing copies all characters (O(n)).",
        hint: "Pre‑sizing reduces the O(n) resizes.",
        level: "advanced",
        codeExample: "// Average case is fast"
    },
    {
        question: "How does ensureCapacity() help performance?",
        shortAnswer: "It reduces the number of internal array resizes and copies.",
        explanation: "If you know you'll append many characters, pre‑allocating avoids multiple growth cycles.",
        hint: "Call it once before a large loop.",
        level: "intermediate",
        codeExample: "sb.ensureCapacity(10000); for(...) sb.append(...);"
    },
    {
        question: "What is the difference between setLength() and delete()?",
        shortAnswer: "setLength() truncates or pads; delete() removes a range.",
        explanation: "setLength(0) clears; delete(0, length()) also clears but setLength is more efficient.",
        hint: "Use setLength for clearing.",
        level: "intermediate",
        codeExample: "sb.setLength(0); // clear"
    },
    {
        question: "What happens if we delete with start == end?",
        shortAnswer: "Nothing; no characters are removed.",
        explanation: "delete(start, start) is a no‑op.",
        hint: "Valid but pointless.",
        level: "basic",
        codeExample: "sb.delete(2,2); // no change"
    },
    {
        question: "Can we insert a char array into StringBuffer?",
        shortAnswer: "Yes, insert(int offset, char[] str).",
        explanation: "Inserts the entire char array at the specified offset.",
        hint: "Also insert(offset, char[], offset2, len).",
        level: "intermediate",
        codeExample: "char[] arr = {'a','b'}; sb.insert(0, arr);"
    },
    {
        question: "What is the return type of deleteCharAt()?",
        shortAnswer: "StringBuffer.",
        explanation: "Returns the same buffer to allow chaining.",
        hint: "You can chain deleteCharAt with other methods.",
        level: "basic",
        codeExample: "sb.deleteCharAt(0).append(\"X\");"
    },
    {
        question: "How to get the character at a specific index without converting to String?",
        shortAnswer: "Use charAt(int index).",
        explanation: "Returns the char at the given position (0‑based).",
        hint: "Similar to String.charAt().",
        level: "basic",
        codeExample: "char ch = sb.charAt(3);"
    },
    {
        question: "Can we use StringBuffer in a for‑each loop?",
        shortAnswer: "No, because it does not implement Iterable.",
        explanation: "You can convert to String or char array, or use traditional for loop.",
        hint: "for(int i=0; i<sb.length(); i++) { char c = sb.charAt(i); }",
        level: "basic",
        codeExample: "for(int i=0; i<sb.length(); i++) { ... }"
    },
    {
        question: "What is the difference between StringBuffer and StringBuilder for these methods?",
        shortAnswer: "Method signatures are identical; only thread‑safety differs.",
        explanation: "StringBuilder has the same append, insert, delete, reverse, capacity methods but is not synchronized.",
        hint: "Use StringBuilder in single‑threaded code.",
        level: "basic",
        codeExample: "StringBuilder sb = new StringBuilder(); // same methods"
    },
    {
        question: "How to find the index of a substring in StringBuffer?",
        shortAnswer: "Use indexOf(String str) or lastIndexOf().",
        explanation: "Returns the first/last occurrence index, or -1 if not found.",
        hint: "Works like String.indexOf().",
        level: "intermediate",
        codeExample: "int pos = sb.indexOf(\"World\");"
    },
    {
        question: "What is the output of: sb = new StringBuffer(5); sb.append(\"abcdefgh\"); System.out.println(sb.capacity());",
        shortAnswer: "At least 5, but likely larger (e.g., 12 or 18) after growth.",
        explanation: "When initial capacity is exceeded, JVM increases capacity (often doubles +2).",
        hint: "Capacity grows automatically.",
        level: "intermediate",
        codeExample: "// Exact value depends on JVM, but >5"
    },
    {
        question: "Can we use reverse() to create a palindrome checker?",
        shortAnswer: "Yes, but you must copy the buffer first to preserve original.",
        explanation: "StringBuffer reversed = new StringBuffer(original).reverse(); then compare with original.toString().",
        hint: "Don't reverse the original if you need it later.",
        level: "intermediate",
        codeExample: "boolean isPal = new StringBuffer(str).reverse().toString().equals(str);"
    }
];

export default questions;