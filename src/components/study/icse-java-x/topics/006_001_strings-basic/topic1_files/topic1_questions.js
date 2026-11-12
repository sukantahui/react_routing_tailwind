/**
 * Questions for Topic 1: String Creation Using Literals vs New Keyword
 * Module 006_001: Strings Basic & Core Concepts
 * Coder & AccoTax - Sukanta Hui
 */

const questions = [
  {
    "id": 1,
    "question": "How many objects are created when you write: String s = \"Barrackpore\";?",
    "shortAnswer": "At most 1 object is created in the String Constant Pool (0 if it already exists).",
    "explanation": "The JVM checks the String Constant Pool (SCP). If 'Barrackpore' is already present, no new object is created and 's' points to the existing object. If absent, exactly 1 object is created in SCP.",
    "hint": "Literal creation utilizes pool caching.",
    "level": "basic",
    "options": [
      "2 objects",
      "At most 1 object in SCP",
      "0 objects always",
      "1 object in Stack memory"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = \"Barrackpore\";"
  },
  {
    "id": 2,
    "question": "How many objects are created when you write: String s = new String(\"Shyamnagar\"); (assuming the literal is not in SCP)?",
    "shortAnswer": "2 objects: one on the Heap and one in the String Constant Pool.",
    "explanation": "The 'new' operator always forces the creation of a new object in the general Heap area. In addition, the string literal \"Shyamnagar\" passed as argument is placed in the String Constant Pool for future reuse.",
    "hint": "One in Heap, one in SCP.",
    "level": "intermediate",
    "options": [
      "1 object only",
      "2 objects (one in Heap, one in SCP)",
      "3 objects",
      "0 objects"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = new String(\"Shyamnagar\");"
  },
  {
    "id": 3,
    "question": "What is the result of evaluating: String s1 = \"ICSE\"; String s2 = \"ICSE\"; s1 == s2?",
    "shortAnswer": "true, because both variables point to the exact same pooled literal in SCP.",
    "explanation": "Java compiler places string literals into the SCP. When s2 is initialized with \"ICSE\", JVM finds \"ICSE\" already in SCP and returns the same memory address.",
    "hint": "Both point to the same memory slot.",
    "level": "basic",
    "options": [
      "false",
      "true",
      "Compilation error",
      "NullPointerException"
    ],
    "correctAnswer": 1,
    "codeExample": "String s1 = \"ICSE\";\nString s2 = \"ICSE\";\nSystem.out.println(s1 == s2); // true"
  },
  {
    "id": 4,
    "question": "What is the output of: String s1 = \"Java\"; String s2 = new String(\"Java\"); System.out.println(s1 == s2);?",
    "shortAnswer": "false, because s1 points to the SCP whereas s2 points to a distinct object in general Heap.",
    "explanation": "The '==' operator compares object reference addresses. Since s1 resides in SCP and s2 is a newly allocated Heap object, their addresses are different.",
    "hint": "Reference addresses differ between SCP and Heap.",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile-time error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "String s1 = \"Java\";\nString s2 = new String(\"Java\");\nSystem.out.println(s1 == s2); // false"
  },
  {
    "id": 5,
    "question": "Which constructor of String creates an object from a character array?",
    "shortAnswer": "new String(char[] value)",
    "explanation": "The String class has an overloaded constructor: public String(char[] value) which constructs a new String initialized with the character sequence from the array.",
    "hint": "Pass the char array directly to new String().",
    "level": "basic",
    "options": [
      "new String(char[] value)",
      "new String(int[] value)",
      "String.fromChar(char[])",
      "char[].toString()"
    ],
    "correctAnswer": 0,
    "codeExample": "char[] ch = {'J', 'a', 'v', 'a'};\nString s = new String(ch);"
  },
  {
    "id": 6,
    "question": "What does the constructor new String(char[] value, int offset, int count) do?",
    "shortAnswer": "It creates a String from a sub-array of characters starting at 'offset' for 'count' elements.",
    "explanation": "This overloaded constructor extracts 'count' characters starting from index 'offset'. For example, if ch = {'N','a','i','h','a','t','i'}, new String(ch, 0, 3) yields \"Nai\".",
    "hint": "Extracts a contiguous slice of the char array.",
    "level": "intermediate",
    "options": [
      "Creates an array of strings",
      "Extracts 'count' characters starting from 'offset'",
      "Reverses the character array",
      "Throws an exception if count > offset"
    ],
    "correctAnswer": 1,
    "codeExample": "char[] c = {'N','a','i','h','a','t','i'};\nString s = new String(c, 0, 4); // \"Naih\""
  },
  {
    "id": 7,
    "question": "Why does Java favor string literals over new String() for standard programming?",
    "shortAnswer": "String literals conserve memory and improve performance by sharing instances in the String Constant Pool.",
    "explanation": "Using new String() unnecessarily duplicates string objects in memory, increasing memory footprint and garbage collection overhead. Pool sharing makes literal creation instantaneous and memory-efficient.",
    "hint": "Pool sharing saves RAM.",
    "level": "intermediate",
    "options": [
      "Literals are faster to type",
      "Literals reuse pool memory, saving Heap space and reducing GC overhead",
      "new String() is not supported in BlueJ",
      "Literals can be modified after creation"
    ],
    "correctAnswer": 1,
    "codeExample": "// Recommended:\nString s = \"Tuhina\";"
  },
  {
    "id": 8,
    "question": "What is the output of: String s = new String(); System.out.println(s.length());?",
    "shortAnswer": "0 (empty string).",
    "explanation": "The default no-argument constructor public String() initializes a newly created String object so that it represents an empty character sequence with length() == 0.",
    "hint": "Empty string has zero characters.",
    "level": "basic",
    "options": [
      "null",
      "0",
      "1",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = new String();\nSystem.out.println(s.length()); // 0"
  },
  {
    "id": 9,
    "question": "What happens when you execute: String s = new String((String)null);?",
    "shortAnswer": "A java.lang.NullPointerException is thrown at runtime.",
    "explanation": "Passing null explicitly to the String(String original) constructor throws a NullPointerException because the constructor attempts to read the length and contents of the null reference.",
    "hint": "Passing null reference to constructor throws NPE.",
    "level": "advanced",
    "options": [
      "Creates string \"null\"",
      "Throws NullPointerException at runtime",
      "Creates empty string \"\"",
      "Fails at compile time"
    ],
    "correctAnswer": 1,
    "codeExample": "// String s = new String((String)null); // NullPointerException!"
  },
  {
    "id": 10,
    "question": "What is the output of: char[] ch = {'I','C','S','E'}; String s = new String(ch, 1, 2); System.out.println(s);?",
    "shortAnswer": "\"CS\"",
    "explanation": "Starting from offset index 1 ('C'), it takes 2 characters ('C' and 'S'). Hence the resulting string is \"CS\".",
    "hint": "Start at index 1, length is 2.",
    "level": "intermediate",
    "options": [
      "\"IC\"",
      "\"CS\"",
      "\"SE\"",
      "\"ICS\""
    ],
    "correctAnswer": 1,
    "codeExample": "char[] ch = {'I','C','S','E'};\nString s = new String(ch, 1, 2); // \"CS\""
  },
  {
    "id": 11,
    "question": "Can two different string literals in Java ever have the same memory address in SCP?",
    "shortAnswer": "Yes, identical string literals in the same JVM always share the exact same memory address in SCP.",
    "explanation": "String interning ensures that all compile-time constant string literals with identical character sequences resolve to a single canonical instance in the String Constant Pool.",
    "hint": "Identical literals share one instance.",
    "level": "intermediate",
    "options": [
      "No, each file gets its own pool",
      "Yes, identical literals share one canonical instance in SCP",
      "Only if declared static",
      "Only if declared final"
    ],
    "correctAnswer": 1,
    "codeExample": "String p = \"Ichapur\";\nString q = \"Ichapur\";\n// p == q is always true"
  },
  {
    "id": 12,
    "question": "What is the return type of the intern() method in java.lang.String?",
    "shortAnswer": "String (the canonical representation from the String Constant Pool).",
    "explanation": "public String intern() searches the SCP for a string equal to this String object. If found, the pooled reference is returned; otherwise, this String object is added to the pool and returned.",
    "hint": "Returns the pooled String reference.",
    "level": "advanced",
    "options": [
      "void",
      "boolean",
      "String",
      "int"
    ],
    "correctAnswer": 2,
    "codeExample": "String s1 = new String(\"Naihati\");\nString s2 = s1.intern(); // Points to SCP"
  },
  {
    "id": 13,
    "question": "What is the result of: String s1 = new String(\"Barrackpore\").intern(); String s2 = \"Barrackpore\"; System.out.println(s1 == s2);?",
    "shortAnswer": "true",
    "explanation": "Calling .intern() on the Heap String returns the reference of \"Barrackpore\" from the SCP. Since s2 also refers to the SCP instance, s1 == s2 evaluates to true.",
    "hint": "intern() pulls the reference into SCP.",
    "level": "advanced",
    "options": [
      "false",
      "true",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "String s1 = new String(\"Barrackpore\").intern();\nString s2 = \"Barrackpore\";\nSystem.out.println(s1 == s2); // true"
  },
  {
    "id": 14,
    "question": "Which of the following creates an immutable String object?",
    "shortAnswer": "Both String literals and new String() create immutable objects.",
    "explanation": "In Java, every instance of java.lang.String is completely immutable regardless of whether it was instantiated as a literal, via new String(), or returned from a method.",
    "hint": "All String objects in Java are immutable.",
    "level": "basic",
    "options": [
      "Only literals",
      "Only new String()",
      "Both literals and new String()",
      "Neither"
    ],
    "correctAnswer": 2,
    "codeExample": "String a = \"A\";\nString b = new String(\"B\");\n// Both 'a' and 'b' are immutable"
  },
  {
    "id": 15,
    "question": "What is the output of: String s = \"Abhronila\"; s = new String(\"Debangshu\"); System.out.println(s);?",
    "shortAnswer": "\"Debangshu\"",
    "explanation": "The variable 's' is a reference variable. Reassigning it points 's' to the new object \"Debangshu\". The original object \"Abhronila\" remains untouched in memory.",
    "hint": "Variable reference reassignment.",
    "level": "basic",
    "options": [
      "\"Abhronila\"",
      "\"Debangshu\"",
      "\"AbhronilaDebangshu\"",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = \"Abhronila\";\ns = new String(\"Debangshu\");\nSystem.out.println(s); // \"Debangshu\""
  },
  {
    "id": 16,
    "question": "What is the memory overhead of creating strings with 'new String(\"test\")' repeatedly in a loop?",
    "shortAnswer": "It wastes Heap memory by generating redundant duplicate objects that require garbage collection.",
    "explanation": "Every loop iteration forces allocation of a new Heap object even though the text is identical, degrading application speed and filling the garbage collector queue.",
    "hint": "Unnecessary object creation burdens GC.",
    "level": "intermediate",
    "options": [
      "It has zero overhead",
      "It creates redundant Heap objects and triggers frequent GC",
      "It causes stack overflow immediately",
      "It crashes the JVM compiler"
    ],
    "correctAnswer": 1,
    "codeExample": "// BAD PRACTICE:\nfor(int i = 0; i < 1000; i++) {\n    String s = new String(\"fixed\");\n}"
  },
  {
    "id": 17,
    "question": "Is 'String s = 1234 + \"\";' considered literal creation or dynamic creation?",
    "shortAnswer": "It is dynamic creation at runtime evaluated using StringBuilder.",
    "explanation": "Expressions involving concatenation with non-constant expressions or primitive conversions are resolved dynamically at runtime by creating a new String instance on the Heap.",
    "hint": "Concatenation produces a new Heap object.",
    "level": "intermediate",
    "options": [
      "Literal creation in SCP",
      "Dynamic creation on Heap at runtime",
      "Compile-time error",
      "Primitive conversion only"
    ],
    "correctAnswer": 1,
    "codeExample": "int roll = 101;\nString s = roll + \"\"; // Dynamic Heap object"
  },
  {
    "id": 18,
    "question": "What is the output of: byte[] b = {65, 66, 67}; String s = new String(b); System.out.println(s);?",
    "shortAnswer": "\"ABC\"",
    "explanation": "The byte array constructor public String(byte[] bytes) decodes the ASCII/byte numbers into characters: 65 -> 'A', 66 -> 'B', 67 -> 'C'.",
    "hint": "65, 66, 67 are ASCII for A, B, C.",
    "level": "intermediate",
    "options": [
      "\"656667\"",
      "\"ABC\"",
      "\"abc\"",
      "Compile-time error"
    ],
    "correctAnswer": 1,
    "codeExample": "byte[] b = {65, 66, 67};\nString s = new String(b); // \"ABC\""
  },
  {
    "id": 19,
    "question": "In ICSE Board examination programming questions, which string creation method should students use by default?",
    "shortAnswer": "String literals (e.g. String name = \"Swadeep\"; or reading via in.nextLine()).",
    "explanation": "ICSE Computer Applications syllabus emphasizes clear, clean, idiomatic Java. Unless specifically asked to demonstrate constructors with char arrays, standard literal assignment or Scanner input is expected.",
    "hint": "Use straightforward literals.",
    "level": "basic",
    "options": [
      "new String() always",
      "String literals (String s = \"...\")",
      "StringBuffer only",
      "System.in.read()"
    ],
    "correctAnswer": 1,
    "codeExample": "String city = \"Barrackpore\";"
  },
  {
    "id": 20,
    "question": "What will happen if you compare two strings created via Scanner using '=='?",
    "shortAnswer": "It will almost always return 'false' because Scanner dynamically allocates a new String object on the Heap.",
    "explanation": "Strings returned by Scanner methods (next(), nextLine()) are dynamically created at runtime outside the SCP. Comparing them with == compares distinct Heap addresses rather than textual values.",
    "hint": "Scanner objects are dynamically constructed on Heap.",
    "level": "expert",
    "options": [
      "Always true",
      "Usually false because they are distinct Heap objects; .equals() must be used",
      "Compiler error",
      "Stack overflow"
    ],
    "correctAnswer": 1,
    "codeExample": "Scanner sc = new Scanner(System.in);\nString input = sc.nextLine();\n// input == \"Barrackpore\" is FALSE! Use input.equals(\"Barrackpore\")"
  },
  {
    "id": 21,
    "question": "What does: String s = new String(new char[]{'O','K'}); do?",
    "shortAnswer": "It initializes an anonymous char array and creates a String object \"OK\".",
    "explanation": "Anonymous array syntax new char[]{'O','K'} creates a temporary char array on the Heap, which is then passed to the String constructor to yield \"OK\".",
    "hint": "Anonymous char array passed to constructor.",
    "level": "intermediate",
    "options": [
      "Syntax error",
      "Creates String \"OK\"",
      "Creates String \"O,K\"",
      "Prints 'O' then 'K'"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = new String(new char[]{'O','K'});"
  },
  {
    "id": 22,
    "question": "What is the difference between String s = null; and String s = new String(\"\");?",
    "shortAnswer": "null points to no memory; new String(\"\") allocates an empty String object with length 0.",
    "explanation": "null is a literal representing an unassigned reference. new String(\"\") creates an actual instance on Heap which has its methods intact and length() == 0.",
    "hint": "Null has no object; \"\" has a valid object.",
    "level": "basic",
    "options": [
      "No difference",
      "null has no object; new String(\"\") creates a valid object with length 0",
      "new String(\"\") has length -1",
      "null can invoke .equals()"
    ],
    "correctAnswer": 1,
    "codeExample": "String s1 = null; // No object\nString s2 = new String(\"\"); // Valid object"
  },
  {
    "id": 23,
    "question": "Can you pass a StringBuffer to the String constructor?",
    "shortAnswer": "Yes, public String(StringBuffer buffer) is a valid overloaded constructor.",
    "explanation": "The String class has constructors accepting StringBuffer and StringBuilder to convert mutable character sequences back into immutable String objects.",
    "hint": "Converts mutable buffer to immutable String.",
    "level": "intermediate",
    "options": [
      "No, incompatible types",
      "Yes, public String(StringBuffer buffer) converts it",
      "Only in Java 17+",
      "Only via toString()"
    ],
    "correctAnswer": 1,
    "codeExample": "StringBuffer sb = new StringBuffer(\"Barrackpore\");\nString s = new String(sb);"
  },
  {
    "id": 24,
    "question": "What is the output of: String a = \"Hello\"; String b = \"Hel\" + \"lo\"; System.out.println(a == b);?",
    "shortAnswer": "true, because constant expression \"Hel\" + \"lo\" is evaluated at compile time and interned into SCP.",
    "explanation": "The Java compiler performs compile-time constant folding on String literal concatenation. \"Hel\" + \"lo\" is computed at compile-time as \"Hello\" and resolved to the SCP instance, so a == b is true.",
    "hint": "Compiler folds string literal constants.",
    "level": "expert",
    "options": [
      "false",
      "true",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 1,
    "codeExample": "String a = \"Hello\";\nString b = \"Hel\" + \"lo\"; // Constant folding!\nSystem.out.println(a == b); // true"
  },
  {
    "id": 25,
    "question": "What is the output of: String a = \"Hello\"; String c = \"lo\"; String b = \"Hel\" + c; System.out.println(a == b);?",
    "shortAnswer": "false, because concatenation with variable 'c' is evaluated dynamically at runtime on the Heap.",
    "explanation": "Because variable 'c' can change, the compiler cannot perform constant folding. It executes StringBuilder append at runtime, returning a new Heap object. Therefore, a == b is false.",
    "hint": "Variables prevent compile-time constant folding.",
    "level": "expert",
    "options": [
      "true",
      "false",
      "Compile error",
      "NullPointerException"
    ],
    "correctAnswer": 1,
    "codeExample": "String a = \"Hello\";\nString c = \"lo\";\nString b = \"Hel\" + c; // Evaluated at runtime!\nSystem.out.println(a == b); // false"
  }
];

export default questions;
